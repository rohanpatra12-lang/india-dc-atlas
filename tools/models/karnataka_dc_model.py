"""
Hourly LP: lowest-water solar+wind+hydro+BESS mix for a 50 MW-IT data centre in Karnataka.
Illustrative example - synthetic but Karnataka-shaped resource profiles, 2026 Indian cost benchmarks.
Run: python3 karnataka_dc_model.py
"""
import numpy as np, scipy.sparse as sp
from scipy.optimize import linprog

rng = np.random.default_rng(42)
T = 8760
hrs = np.arange(T); hod = hrs % 24; doy = hrs // 24
month = np.minimum((doy / 30.42).astype(int), 11)
hours_in_month = np.bincount(month, minlength=12)

# ---------------- Load ----------------
IT_MW, PUE = 50.0, 1.30
L = np.full(T, IT_MW * PUE)                      # 65 MW flat

# ---------------- Solar (Pavagada/Tumakuru-like) ----------------
shape = np.clip(np.sin(np.pi * (hod - 6) / 12), 0, None)          # 06-18 h
clear = np.array([.95,.98,1.0,.98,.92,.62,.55,.58,.68,.78,.85,.90])[month]   # monsoon dip
daily = np.repeat(np.clip(rng.normal(1, .12, 365), .3, 1.2), 24)
S = shape * clear * daily
S *= 0.205 / S.mean()                           # target annual CF ~20.5 %
S = np.clip(S, 0, 1)

# ---------------- Wind (Chitradurga/Gadag-like, monsoon-driven) ----------------
wm = np.array([.18,.17,.16,.20,.38,.62,.66,.60,.40,.20,.16,.18])[month]
diurnal = 1 + 0.25 * np.sin(2 * np.pi * (hod - 10) / 24)          # evening peak
ar = np.zeros(T); e = rng.normal(0, .08, T)
for t in range(1, T): ar[t] = .97 * ar[t-1] + e[t]
W = np.clip(wm * diurnal * (1 + ar), 0, 1)
W *= 0.33 / W.mean(); W = np.clip(W, 0, 1)       # target CF ~33 %

# ---------------- Hydro (reservoir PPA, monthly energy budget) ----------------
hydro_cf_m = np.array([.45,.40,.30,.25,.25,.45,.80,.85,.85,.75,.60,.50])
H_MAX = 40.0                                     # MW of hydro realistically contractable

# ---------------- Costs (₹ crore per year, per MW / MWh) ----------------
r = 0.10
crf = lambda n: r*(1+r)**n/((1+r)**n-1)
solar_ann = 3.8*crf(25) + 3.8*0.015              # capex ₹3.8 cr/MW
wind_ann  = 7.0*crf(25) + 7.0*0.015              # capex ₹7.0 cr/MW
bess_ann  = 3.5e5*12/4/1e7                       # ₹3.5 lakh/MW/month for 4-h unit -> per MWh
hydro_tariff = 4.5                               # ₹/kWh take-or-pay on available energy
hydro_ann = hydro_tariff * (hydro_cf_m*np.array([hours_in_month[m] for m in range(12)])).sum()*1e3/1e7
grid_tariff = 7.0                                # ₹/kWh, HT incl. fixed charges (approx)
oa_adder = 1.0                                   # ₹/kWh wheeling+transmission+losses on RE delivered

# ---------------- Water intensities (L/kWh, consumptive) ----------------
w_s, w_w, w_b = 0.10, 0.0, 0.0
w_g = 2.0                                        # Karnataka grid mix (coal cooling towers)
W_H = {"base": 10.0, "run-of-river": 0.0, "high": 20.0}

def solve(eps_ML=None, w_h=10.0, cost_cap=None, minimize="cost"):
    # variable layout: [Cs, Cw, Ch, E] + 6*T hourly [h, g, c, d, q, u]
    nC = 4; idx = lambda k: nC + k*T + np.arange(T)
    n = nC + 6*T
    h, g, c, d, q, u = (idx(k) for k in range(6))
    eta = np.sqrt(0.88)

    rows, cols, vals, b_eq = [], [], [], []
    def add(r_, c_, v_): rows.extend(r_); cols.extend(c_); vals.extend(v_)
    # energy balance (T rows)
    R = np.arange(T)
    add(R, np.zeros(T,int), S); add(R, np.ones(T,int), W)
    for arr, v in ((h,1),(d,1),(g,1),(c,-1),(u,-1)): add(R, arr, np.full(T, v))
    b_eq += list(L)
    # SOC (cyclic)
    R2 = T + np.arange(T); nxt = np.roll(q, -1)
    add(R2, nxt, np.ones(T)); add(R2, q, -np.ones(T)); add(R2, c, -eta*np.ones(T)); add(R2, d, np.ones(T)/eta)
    b_eq += [0]*T
    A_eq = sp.csr_matrix((vals, (rows, cols)), shape=(2*T, n))

    rows, cols, vals, b_ub = [], [], [], []; r0 = 0
    def blk(pairs, rhs):
        nonlocal r0
        R = r0 + np.arange(T)
        for arr, v in pairs:
            if np.isscalar(arr): add(R, np.full(T, arr), np.full(T, v) if np.isscalar(v) else v)
            else: add(R, arr, np.full(T, v))
        b_ub.extend(rhs); r0 += T
    blk([(q,1),(3,-1)], [0]*T)            # q <= E
    blk([(c,1),(3,-0.25)], [0]*T)         # charge <= E/4
    blk([(d,1),(3,-0.25)], [0]*T)         # discharge <= E/4
    blk([(h,1),(2,-1)], [0]*T)            # hydro <= Ch
    for m in range(12):                   # monthly hydro budget
        mask = month == m
        add([r0]*mask.sum(), h[mask], np.ones(mask.sum())); add([r0], [2], [-hydro_cf_m[m]*hours_in_month[m]])
        b_ub.append(0); r0 += 1
    # water (ML): MWh * L/kWh = m3 -> /1000 = ML
    wrow = np.zeros(n); wrow[0] = w_s*S.sum(); wrow[h] = w_h; wrow[g] = w_g; wrow /= 1000
    # cost (₹ crore): MWh * ₹/kWh * 1e3 / 1e7
    k = 1e3/1e7
    cost = np.zeros(n)
    cost[0] = solar_ann + oa_adder*S.sum()*k
    cost[1] = wind_ann + oa_adder*W.sum()*k
    cost[2] = hydro_ann; cost[h] = oa_adder*k
    cost[3] = bess_ann; cost[g] = grid_tariff*k; cost[u] = -oa_adder*k   # no OA on curtailed
    A_ub = sp.csr_matrix((vals, (rows, cols)), shape=(r0, n))
    extra = []
    if eps_ML is not None: extra.append((wrow, eps_ML))
    if cost_cap is not None: extra.append((cost, cost_cap))
    if extra:
        A_ub = sp.vstack([A_ub] + [sp.csr_matrix(e[0]) for e in extra]); b_ub += [e[1] for e in extra]
    bounds = [(0,None)]*n; bounds[2] = (0, H_MAX)
    obj = cost if minimize == "cost" else wrow
    res = linprog(obj, A_ub=A_ub, b_ub=b_ub, A_eq=A_eq, b_eq=b_eq, bounds=bounds, method="highs")
    if res.status != 0: return None
    x = res.x
    out = dict(Cs=x[0], Cw=x[1], Ch=x[2], E=x[3],
               cost=cost@x, water=wrow@x, grid=x[g].sum(), curt=x[u].sum(), hydro=x[h].sum())
    Ltot = L.sum()
    out["lcoe"] = out["cost"]*1e7/(Ltot*1e3)
    out["cfe"] = 1 - out["grid"]/Ltot
    out["L_per_kWh"] = out["water"]*1e3/Ltot   # ML -> m3 /MWh = L/kWh
    out["dispatch"] = {k_: x[a] for k_, a in dict(h=h, g=g, c=c, d=d, q=q, u=u).items()}
    return out

if __name__ == "__main__":
    Ltot = L.sum()
    print(f"Load {Ltot/1e3:.0f} GWh/yr | solar CF {S.mean():.3f} wind CF {W.mean():.3f}")
    print(f"All-grid: ₹{grid_tariff:.2f}/kWh, water {w_g*Ltot/1e3:.0f} ML/yr")
    import json
    results = {}
    for case, wh in W_H.items():
        base = solve(w_h=wh)                                        # cheapest mix
        wmin = solve(w_h=wh, minimize="water")
        rows = [base]
        for frac in [0.75, 0.5, 0.35, 0.25, 0.15, 0.10, 0.05]:
            eps = wmin["water"] + frac*(base["water"]-wmin["water"])
            r_ = solve(eps_ML=eps, w_h=wh)
            if r_: rows.append(r_)
        # true minimum-water at the lowest cost
        r_ = solve(eps_ML=wmin["water"]*1.001+0.01, w_h=wh); rows.append(r_)
        results[case] = rows
        print(f"\n=== hydro water = {wh} L/kWh ===")
        print(" Solar  Wind  Hydro  BESS(MWh) | ₹/kWh  CFE%  Water ML  L/kWh")
        for o in rows:
            print(f"{o['Cs']:6.0f}{o['Cw']:6.0f}{o['Ch']:6.0f}{o['E']:9.0f}  | {o['lcoe']:5.2f} {100*o['cfe']:5.1f} {o['water']:8.0f} {o['L_per_kWh']:6.2f}")
    json.dump(results, open("results.json","w"), indent=1, default=float)
