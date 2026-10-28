<!-- Related research from an earlier conversation ("Data centre infrastructure requirements in India"), Oct 2026, that informed the atlas. Kept as written at the time. The atlas standards register (src/data/standards.js) is authoritative where figures differ (for example India grid water 2.9 L/kWh and grid CO₂ 0.675 t/MWh after the October 2026 corrections). -->

# Designing Green Data Centres in Indian Cities: An Optimization Model and a Site-Selection Framework

**Bottom line:** India's best green data centre plan is a two-stage design. First, an MCDM screen picks the city. Then a mixed-integer linear program (MILP) chooses the cooling technology, energy mix and capacity at that site. In that sequence, **power-and-renewables-led sites (Jamnagar, Visakhapatnam) win for AI training. Mumbai wins only when latency and interconnection dominate. Hyderabad is the most robust "no-regret" choice, ranking top-three under every weighting tested.** India publishes a single national grid emission factor (0.710 tCO₂/MWh for FY2024-25). So differences in carbon between cities come almost entirely from **access to renewable procurement (captive or open access)**, not from the local grid. Water and cooling differences come from **climate and the choice of cooling technology**.

## TL;DR

- **Model:** Treat green data centre design as a multi-objective MILP over sites × cooling technologies × energy sources × representative hours. It minimises lifecycle cost, CO₂ and total (direct + indirect) water, subject to power balance, climate-dependent PUE/WUE, a ≥70–80% renewable-energy (RE) share, Tier redundancy, water caps, latency, land and sanctioned-grid limits. If PUE/WUE are pre-tabulated per city and technology, it stays linear and solvable with Gurobi/CPLEX/HiGHS via Pyomo. Generate the Pareto front with the ε-constraint method. Use NSGA-II or stochastic/robust variants when chiller curves or weather/demand uncertainty make it nonlinear.
- **Site criteria that move the decision most:** (1) deliverable power and transmission timelines, (2) RE/open-access availability and tariff, (3) subsea cable/IXP proximity, (4) water security, (5) hazard exposure. Climate matters less than commonly assumed for AI halls, because direct-to-chip liquid cooling decouples PUE from ambient air.
- **Rankings (illustrative weighted-sum analysis, estimates):** AI training: Jamnagar 4.18 > Visakhapatnam 3.95 > Hyderabad 3.48. Latency-sensitive colocation: Mumbai 3.81 > Delhi NCR 3.43 > Chennai 3.37. Sovereign cloud: Hyderabad 3.61 > Bengaluru 3.45 > Mumbai 3.36. Kolkata ranks last under every profile until its cable and RE ecosystem matures.

---

## Part 1 — Mathematical optimization model

### 1.1 What the literature offers

| Stream | Representative work | What it contributes to an Indian model |
|---|---|---|
| Geographic load balancing (GLB) | Liu, Lin, Wierman, Low & Andrew, "Greening geographical load balancing" (ACM SIGMETRICS 2011); Liu et al., "Renewable and cooling aware workload management" (2012) | Routing load across sites to exploit spatial variation in price, carbon and renewables. This is the operational layer of the siting model. |
| Water-aware GLB | "Towards Environmentally Equitable AI via Geographical Load Balancing" (arXiv 2307.05494); "Balancing Bits and Drops: Stress-Adjusted Water Management" (arXiv 2607.22617) | Weights water by local stress, not just volume. Stress-aware scheduling cut stress-adjusted water by up to 25% while also cutting carbon by up to 25%. |
| Microgrid/energy sizing | "Optimizing Microgrid Composition for Sustainable Data Centers" (arXiv 2508.04284); carbon-aware compute–power MILP (arXiv 2605.03751) | Sizing wind/solar/battery shares against both embodied and operational carbon. Joint MILP of workload routing, cooling-adjusted power, storage and grid import. |
| Cooling-technology MILP | MILP selecting tower-sink, free cooling and chillers for data centres in wind-turbine towers (ScienceDirect, 2026) — built in Pyomo, solved with Gurobi at 0.1% MIP gap | Direct template for binary cooling selection + sizing + hourly operation across scenarios. |
| Multi-energy carbon-aware operation | ACM e-Energy 2025 MILP for a 1 MW data centre in Istanbul with PV, CCHP, batteries, TES and heat pumps | Shows waste-heat/district-heat coupling and time-varying emission signals in a MILP. |
| Network siting & capacity | "Multi-Layer Network Optimization of Data Centers Siting and Capacity Development" (MDPI Network, 2026) | Couples a power-network layer, a cooling layer (water availability, conservation limits) and a GPU-capacity layer. Includes a scenario cutting renewables availability by 50%. |
| Uncertainty | Distributionally robust carbon-aware cloud scheduling with battery storage (J. Cloud Computing, 2026); two-stage MILP + RL for multi-zonal data centres (Energies, 2026) | Methods for renewable and demand uncertainty. |
| Location MCDM + optimization hybrids | PiF-SWARA + PiF-VIKOR data centre location with renewable integration (Renewable Energy, 2025), which also cites a bi-objective cost/carbon expansion model | Supports the two-stage "screen then optimize" architecture recommended here. |

**Gap:** No published model is calibrated for Indian cities. The formulation below fills it with Indian parameters: the CEA factor, SERC tariffs, GEOA banking, CGWB categories, IS 1893 zones and IGBC/ASHRAE limits.

### 1.2 Sets and indices

| Symbol | Meaning |
|---|---|
| i ∈ I | Candidate sites/cities (Mumbai, Chennai, Noida/NCR, Bengaluru, Hyderabad, Pune, Kolkata, Visakhapatnam, Jamnagar, tier-2) |
| k ∈ K | Cooling technologies: AC (air-cooled chiller), WC (water-cooled chiller + cooling tower), IEC (indirect evaporative/adiabatic), ECO (air/water-side economiser + chiller backup), DLC (direct-to-chip liquid + dry cooler), IMM (immersion) |
| s ∈ S | Energy sources: GRID, GOA (green open access RE), PV (onsite solar), CAP (captive/group-captive wind–solar hybrid), BESS, DG (diesel/HVO backup) |
| t ∈ T | Representative hours (e.g., 4 seasons × 24 h = 96, or 12 typical days × 24 h), with weights ω_t (Σω_t = 8,760) |
| m ∈ M | Months (for GEOA banking settlement) |
| d ∈ D | Demand regions (user/enterprise clusters) |
| ξ ∈ Ξ | Weather/demand/RE scenarios with probabilities π_ξ (stochastic version) |

### 1.3 Parameters (with Indian sources)

| Parameter | Symbol | Indian value / source |
|---|---|---|
| Grid emission factor | EF | 0.710 tCO₂/MWh weighted average FY2024-25 (CEA CO₂ Baseline Database v21.0, provisional). 0.727 in FY2023-24; 0.774 in FY2013-14. Combined margin 0.757 (FY2023-24) is for offset baselines, not Scope 2. |
| Indirect water of grid power | IWF_GRID | ≈ fossil share × 3.0–3.5 m³/MWh ≈ 2.2–2.7 m³/MWh at a 73–78% fossil grid (from prior report) |
| Energy tariff (HT industrial) | p_i | See Table 1.4 (SERC orders FY2025-26/27) |
| Demand charge | pd_i | ₹270–608/kVA/month (Table 1.4) |
| Solar capacity factor | CF_PV,i,t | Annual 16–20% (CERC 2011: ~20% in Rajasthan/Gujarat); ~1,550–1,650 kWh/kWp Gujarat, 1,500–1,600 Karnataka, 1,700–1,800 western Rajasthan (industry estimates) |
| Wind capacity factor | CF_W,i,t | Peaks in the summer monsoon; highest off the southern coast, the Western Ghats and Gujarat (Hunt et al., Meteorological Applications 2024) |
| Free-cooling hours | FCH_i,k | Engineering estimates: Bengaluru ~6,200 h/yr (71%), Pune ~5,800 (66%), Delhi ~5,200 (59%) at dry-bulb below 27°C / 35°C dry-cooler setpoint. Coastal Mumbai/Chennai/Vizag/Kolkata are much lower (humid wet-bulb). **Validate with ISHRAE/ASHRAE hourly weather files.** |
| Thermal envelope | T_in | ASHRAE TC9.9: recommended 18–27°C inlet; A1 allowable 15–32°C; H1 (high-density) 18–22°C, allowable to 25°C. IGBC encourages ≥24°C. |
| PUE by city × tech | PUE_i,k,t | Derived (§1.5); IGBC "ideal" 1.4–1.5, green designs 1.25–1.4 vs conventional 1.6–1.8 |
| WUE by city × tech | WUE_i,k,t | 0.05–1.8 L/kWh (prior report); adiabatic in temperate Bengaluru/Pune 0.2–0.5 L/kWh (engineering estimate) |
| Water availability cap | Wmax_i | Zero groundwater where the CGWB block is Over-exploited/Critical. Otherwise municipal/STP/TTRO/desal allocation. |
| Water tariff | pw_i,source | Municipal vs tertiary-treated sewage vs desalinated (site quotes) |
| Land cost & area | cl_i, A_i | Market quotes; area per MW a_MW |
| Latency | RTT_d,i | Measured; feasibility if RTT ≤ L_max (e.g., 5–10 ms for trading/colo) |
| Grid sanctioned capacity & lead time | Gmax_i, τ_i | Discom/STU feasibility letters; transmission timelines |
| Incentives | inc_i | Capex subsidy, electricity-duty waiver, open-access charge concessions (Table 1.4); central tax holiday to 2047 for eligible foreign cloud providers |
| Seismic zone factor | Z_i | IS 1893:2016 zone factors 0.10/0.16/0.24/0.36 (Zones II–V); used as a structural-cost multiplier |
| Capital recovery factor | CRF | r(1+r)^n/((1+r)^n−1) per asset life n |
| Renewable share target | ρ | 0.70–0.80 (annual) or hourly-matched (24/7 CFE) |
| GEOA banking | β | Banking allowed for ≥30% of monthly consumption under the GEOA Rules 2022 |
| Redundancy | R_k | N+1 (Tier III) / 2N (Tier IV) multipliers on cooling and power capacity |

### 1.4 Indicative HT tariffs and state data centre power incentives (illustrative inputs)

| State (DISCOM) | Demand charge (₹/kVA/mo) | Energy charge | Data-centre power incentive | Data status |
|---|---|---|---|---|
| Maharashtra (MSEDCL) | 555 | ₹8.10/kVAh at HT (₹7.48 + ₹0.62 wheeling), FY2025-26 | Electricity duty permanently exempted for registered data centres; ₹1/unit subsidy for 5 years outside Zone I; open access allowed (IT/ITeS Policy 2023) | Check against June 2025 MERC review order |
| Tamil Nadu (TNPDCL) | 608 | ₹7.50/kWh (from 1 July 2025) | Industrial tariff; 100% electricity-tax waiver for 5 years; open-access charges at 50%; dual grid at ≥50 MW (DC Policy 2021) | Good |
| Telangana (TGSPDCL) | 500 | ₹7.65 (11 kV) / ₹7.15 (33 kV), FY2025-26 | Power "at the cost of generation", dual grid, RE open access (DC Policy 2016) | Good |
| Karnataka (BESCOM) | 365 | ₹6.70/unit (HT-2a, post-review) | Electricity duty exemption for 5 years (DC Policy 2022-27) | Conflicting figures; verify |
| Uttar Pradesh (UPPCL) | 270 (data centre park, HV-2) | ₹6.95/kVAh at the Greater Noida data centre park tariff, FY2026-27 | 50% wheeling concession for 25 years; 100% intra-state transmission concession; dual grid for first 3 parks; 100% duty exemption for 10 years (DC Policy 2021) | Good |
| Andhra Pradesh (APEPDCL) | ~475 (unconfirmed) | ₹6.70/kWh | Industrial tariff (DC Policy 4.0, 2024-29); MoU-level duty exemption + ₹1/unit discount reported for Google Vizag; plan to allow >300 MW users their own distribution licence | Partly unverified |
| Gujarat (DGVCL etc.) | Stepped, up to ₹475; ₹555 for excess demand | 400–430 paise/kWh + FPPPA fuel surcharge (₹2.77 in FY2024-25) | No data-centre-specific power incentive found | Verify demand steps |
| West Bengal (WBSEDCL) | ~320 | ~399–403 paise/kWh (seasonal), plus 50 paise/kWh green tariff option | Duty waived for 5 years; dual grid (DC Policy 2021) | Table parsing uncertain |

Note that MSEDCL, UPPCL and Telangana bill in kVAh, while the others bill in kWh. None of these figures include duty, fuel surcharges or time-of-day adjustments. Treat them as model inputs to be refreshed from the latest SERC order.

### 1.5 Climate-dependent PUE and WUE (keeping the model linear)

Pre-compute, per city i, technology k and representative hour t, the cooling-energy ratio from hourly dry-bulb (T_db) and wet-bulb (T_wb) temperatures:

$$\eta_{i,k,t} = \begin{cases} \eta^{free}_k & \text{if } T^{wb}_{i,t} \le T^{sw}_k \text{ (or } T^{db}_{i,t}\le T^{sw}_k \text{ for dry economisers)}\\ \eta^{mech}_k(T_{i,t}) & \text{otherwise}\end{cases}$$

$$PUE_{i,k,t} = 1 + \delta^{elec} + \eta_{i,k,t} + \delta^{misc}$$

$$WUE_{i,k,t} = \text{evaporation} + \text{drift} + \text{blowdown}\; \propto\; \text{heat rejected}/h_{fg}\cdot(1 + 1/(CoC-1))$$

Here δ^elec is UPS/transformer loss (~0.05–0.10), T^sw_k is the switchover temperature, and CoC is cycles of concentration. Because these coefficients are parameters, the model stays an MILP.

Two practical cautions:
- **DLC/IMM reduce sensitivity to climate.** Warm-water loops (ASHRAE W-classes) can reject heat through dry coolers for most hours even in Chennai.
- **Predicted free-cooling hours often fail to materialise.** The Infosys Bangalore case study (IGBC/LBNL) found the "percent of free cooling is much less than anticipated, and the compressors run almost all the time", because of indoor temperature and air-management problems. Add a de-rating factor (e.g., 0.6–0.8) on FCH in the base case.

### 1.6 Decision variables

| Variable | Type | Meaning |
|---|---|---|
| y_i | binary | Open site i |
| x_i,k | binary | Use cooling technology k at site i (one primary per site, optional hybrid) |
| n_i | integer | Number of modular IT blocks (e.g., 10 MW each); C_i = n_i·B |
| C_i,k | continuous ≥0 | IT capacity at site i served by tech k (linearises x·C) |
| K^PV_i, K^CAP_i, K^GOA_i | continuous ≥0 | Onsite PV, captive RE and contracted GOA capacity (MW) |
| E^B_i, P^B_i | continuous ≥0 | Battery energy (MWh) and power (MW) capacity |
| K^DG_i | continuous ≥0 | Backup generation capacity |
| P^s_i,t | continuous ≥0 | Power drawn from source s in hour t |
| ch_i,t, dis_i,t, SoC_i,t | continuous ≥0 | Battery operation |
| bank_i,m | continuous ≥0 | GEOA energy banked in month m |
| λ_d,i,t | continuous [0,1] | Share of region d's load served from site i (GLB layer) |
| H_i | continuous ≥0 | Waste heat exported (MWth), if an offtaker exists |

### 1.7 Objectives

**(O1) Lifecycle cost (annualised TCO, ₹/yr):**

$$\min\; Z_{cost} = \sum_i \Big[ CRF\big(c^{land}_i a_{MW} C_i + c^{shell}_i(1+\kappa Z_i) C_i + \sum_k c^{cool}_k R_k C_{i,k} + c^{PV}K^{PV}_i + c^{CAP}K^{CAP}_i + c^{E}E^B_i + c^{P}P^B_i + c^{DG}K^{DG}_i\big) - inc^{capex}_i\Big]$$
$$+ \sum_i\sum_t \omega_t\big[(p_i - inc^{duty}_i)P^{GRID}_{i,t} + (p^{GOA}_i + oa_i) P^{GOA}_{i,t} + p^{CAP}P^{CAP}_{i,t} + p^{DG}P^{DG}_{i,t} + \sum_k pw_i\, WUE_{i,k,t}\,L_{i,k,t}\big] + \sum_i 12\,pd_i\,\overline{P}_i - \sum_i\sum_t \omega_t\, p^{heat} H_{i,t}$$

**(O2) Operational carbon (tCO₂/yr), optionally plus embodied carbon:**

$$\min\; Z_{CO2} = \sum_i\sum_t \omega_t\big(EF_t\,P^{GRID}_{i,t} + EF^{DG}P^{DG}_{i,t}\big) + \sum_i \big(e^{PV}K^{PV}_i + e^{B}E^B_i + e^{build}C_i\big)/n$$

Use EF = 0.710 for annual accounting. Use hourly or marginal signals if available, for 24/7 matching.

**(O3) Total water (m³/yr), optionally stress-weighted:**

$$\min\; Z_{W} = \sum_i \sigma_i \sum_t \omega_t\Big[\sum_k WUE_{i,k,t} L_{i,k,t} + IWF^{GRID}P^{GRID}_{i,t} + \sum_s IWF_s P^s_{i,t}\Big]$$

Here σ_i is a water-stress weight: for example 1.0 for a Safe CGWB block, 2.0 for Semi-critical, 3.0 for Critical, and infeasible for Over-exploited groundwater use.

**Multi-objective handling:**
- **ε-constraint (recommended).** Minimise Z_cost subject to Z_CO2 ≤ ε₁ and Z_W ≤ ε₂, sweeping ε to trace the Pareto surface. This handles non-convex fronts and produces regulator-friendly "cost of the next tonne/litre" curves.
- **Weighted sum.** Minimise w₁Z̃_cost + w₂Z̃_CO2 + w₃Z̃_W on normalised objectives. It is quick, but misses non-supported Pareto points.
- **Carbon/water pricing.** Add CCTS-style carbon prices (₹/tCO₂) and shadow water prices to O1.

### 1.8 Constraints

1. **Site–capacity linking:** C_i = n_i·B; C^min y_i ≤ C_i ≤ C^max_i y_i.
2. **Technology choice:** Σ_k x_i,k ≥ y_i; C_i,k ≤ C^max_i x_i,k; Σ_k C_i,k = C_i. This is the big-M linearisation of x·C.
3. **IT load and demand coverage (GLB):** L^IT_i,t = Σ_d λ_d,i,t D_d,t·u; L^IT_i,t ≤ C_i; Σ_i λ_d,i,t = 1. Latency: λ_d,i,t = 0 if RTT_d,i > L_max,d.
4. **Facility power:** L^fac_i,t = Σ_k PUE_i,k,t · L_i,k,t, with Σ_k L_i,k,t = L^IT_i,t and L_i,k,t ≤ C_i,k.
5. **Power balance:** P^GRID + P^GOA + P^PV + P^CAP + dis − ch + P^DG = L^fac_i,t + P^export_i,t.
6. **RE availability:** P^PV_i,t ≤ CF_PV,i,t K^PV_i; P^CAP_i,t ≤ CF_hyb,t K^CAP_i; onsite PV ≤ roof/land area.
7. **Storage dynamics:** SoC_i,t+1 = SoC_i,t + η_c ch − dis/η_d; SoC ≤ E^B_i; ch, dis ≤ P^B_i; cyclic over representative days.
8. **GEOA banking:** monthly settlement Σ_t∈m (P^GOA_gen − P^GOA_used) = bank_i,m − bank_i,m−1, with bank_i,m ≤ β Σ_t∈m L^fac_i,t (β = 0.30).
9. **Renewable share:** Σ_t ω_t (P^GOA + P^PV + P^CAP)_i,t ≥ ρ Σ_t ω_t L^fac_i,t, with ρ = 0.70–0.80. Hourly CFE variant: the same inequality for every t with ρ_t.
10. **PUE/WUE caps (benchmarks):** annual PUE_i ≤ 1.4 (IGBC-aligned design target at 33% load); WUE_i ≤ WUE^max.
11. **Water availability:** Σ_t ω_t Σ_k WUE·L ≤ Wmax_i y_i; groundwater = 0 if the CGWB block is Over-exploited/Critical.
12. **Grid sanctioned capacity & timing:** P^GRID_i,t ≤ Gmax_i; y_i = 0 if the transmission lead time τ_i exceeds the project deadline.
13. **Redundancy/reliability:** Σ_k R_k C_i,k ≤ installed cooling; K^DG_i + P^B_i ≥ (1+r) max_t L^fac_i,t (Tier III N+1; Tier IV 2N on the critical path); dual-grid feed binary where policy provides it.
14. **Land:** a_MW C_i + a_PV K^PV_i ≤ A_i.
15. **Thermal envelope:** supply/inlet setpoints within ASHRAE TC9.9 (18–27°C recommended; H1 18–22°C), enforced through the η^free switchover temperatures.
16. **Hazard screening:** y_i = 0 for sites in 100-year flood polygons or IS 1893 Zone V (or apply a cost multiplier κZ_i).
17. **Budget:** annualised capex ≤ budget.
18. **Waste heat:** H_i,t ≤ φ·L^IT_i,t·offtake_i (only where an industrial/cold-chain or absorption-chiller offtaker exists; in India's climate this is rarely a district-heating case).

### 1.9 Classification and solution approach

- **Deterministic version with pre-tabulated PUE/WUE:** an **MILP**. Binaries y, x; integers n; continuous dispatch. With about 10 sites × 6 technologies × 96–288 hours it solves in minutes with **Gurobi, CPLEX or open-source HiGHS/CBC** via **Pyomo** or PuLP.
- **MINLP** arises when chiller COP depends on load and ambient (COP = f(PLR, T_wb)), when setpoints are decision variables, or when PUE depends on capacity. Options: piecewise-linearise (SOS2) back to MILP; solve with BARON/Couenne; or use **NSGA-II/NSGA-III (pymoo)** for direct Pareto generation.
- **Uncertainty:** use **two-stage stochastic MILP**, with first-stage siting/sizing and second-stage hourly dispatch per weather/RE/demand scenario ξ, solved by Benders/L-shaped decomposition. Use **robust optimisation** with budgeted uncertainty sets on RE CF and PUE. Use **distributionally robust** formulations for monsoon-year RE variability.
- **Time-series reduction:** k-medoids clustering of 8,760 h into 12–24 typical days per city.

### 1.10 Pyomo skeleton

```python
import pyomo.environ as pyo
m = pyo.ConcreteModel()
m.I, m.K, m.S, m.T, m.D, m.M = [pyo.Set(initialize=v) for v in (sites, techs, sources, hours, regions, months)]

# Parameters (dicts loaded from CSV): PUE[i,k,t], WUE[i,k,t], CFpv[i,t], CFhyb[i,t], tariff[i], dem_chg[i],
# EF=0.710, IWF_grid=2.4, Wmax[i], Gmax[i], RTT[d,i], Lmax[d], A[i], w[t], CRF, capex coefficients ...

m.y   = pyo.Var(m.I, within=pyo.Binary)
m.x   = pyo.Var(m.I, m.K, within=pyo.Binary)
m.n   = pyo.Var(m.I, within=pyo.NonNegativeIntegers)
m.Cik = pyo.Var(m.I, m.K, within=pyo.NonNegativeReals)
m.Lik = pyo.Var(m.I, m.K, m.T, within=pyo.NonNegativeReals)
m.P   = pyo.Var(m.I, m.S, m.T, within=pyo.NonNegativeReals)
m.Kpv, m.Kcap, m.EB, m.PB = [pyo.Var(m.I, within=pyo.NonNegativeReals) for _ in range(4)]
m.lam = pyo.Var(m.D, m.I, m.T, bounds=(0,1))

m.cap   = pyo.Constraint(m.I, rule=lambda m,i: sum(m.Cik[i,k] for k in m.K) == B*m.n[i])
m.open_ = pyo.Constraint(m.I, rule=lambda m,i: B*m.n[i] <= Cmax[i]*m.y[i])
m.tech  = pyo.Constraint(m.I, m.K, rule=lambda m,i,k: m.Cik[i,k] <= Cmax[i]*m.x[i,k])
m.cover = pyo.Constraint(m.D, m.T, rule=lambda m,d,t: sum(m.lam[d,i,t] for i in m.I) == 1)
m.lat   = pyo.Constraint(m.D, m.I, m.T, rule=lambda m,d,i,t:
            m.lam[d,i,t] == 0 if RTT[d,i] > Lmax[d] else pyo.Constraint.Skip)
m.itld  = pyo.Constraint(m.I, m.T, rule=lambda m,i,t:
            sum(m.Lik[i,k,t] for k in m.K) == sum(m.lam[d,i,t]*Dem[d,t] for d in m.D))
m.lk    = pyo.Constraint(m.I, m.K, m.T, rule=lambda m,i,k,t: m.Lik[i,k,t] <= m.Cik[i,k])
m.bal   = pyo.Constraint(m.I, m.T, rule=lambda m,i,t:
            sum(m.P[i,s,t] for s in m.S) == sum(PUE[i,k,t]*m.Lik[i,k,t] for k in m.K))
m.pv    = pyo.Constraint(m.I, m.T, rule=lambda m,i,t: m.P[i,'PV',t] <= CFpv[i,t]*m.Kpv[i])
m.grid  = pyo.Constraint(m.I, m.T, rule=lambda m,i,t: m.P[i,'GRID',t] <= Gmax[i]*m.y[i])
m.res   = pyo.Constraint(m.I, rule=lambda m,i:
            sum(w[t]*(m.P[i,'GOA',t]+m.P[i,'PV',t]+m.P[i,'CAP',t]) for t in m.T)
            >= rho*sum(w[t]*sum(m.P[i,s,t] for s in m.S if s!='BESS') for t in m.T))
m.water = pyo.Constraint(m.I, rule=lambda m,i:
            sum(w[t]*WUE[i,k,t]*m.Lik[i,k,t] for k in m.K for t in m.T) <= Wmax[i]*m.y[i])
# + storage SoC, GEOA monthly banking, DG/redundancy, land, budget constraints

cost   = capex_expr(m) + sum(w[t]*tariff[i]*m.P[i,'GRID',t] for i in m.I for t in m.T) + ...
carbon = sum(w[t]*EF*m.P[i,'GRID',t] for i in m.I for t in m.T)
water  = sum(w[t]*(sum(WUE[i,k,t]*m.Lik[i,k,t] for k in m.K) + IWF_grid*m.P[i,'GRID',t])
             for i in m.I for t in m.T)

# epsilon-constraint loop
m.obj = pyo.Objective(expr=cost, sense=pyo.minimize)
m.eps_c = pyo.Constraint(expr=carbon <= eps_c); m.eps_w = pyo.Constraint(expr=water <= eps_w)
for eps_c_val in carbon_grid:
    m.eps_c.set_value(carbon <= eps_c_val)
    pyo.SolverFactory('gurobi').solve(m, options={'MIPGap':0.001})
    record_pareto_point(m)
```

### 1.11 Worked numerical example (illustrative estimates)

The example below is for a 100 MW IT facility at 80% average utilisation (700.8 GWh IT energy per year), grid-only, energy charge only (demand charges, duty and fuel surcharges excluded). The CEA factor is 0.710 tCO₂/MWh. Indirect water is 2.4 m³/MWh of grid power. PUE/WUE are the author's design estimates for a modern hybrid design in each climate.

| City | Assumed cooling | PUE (est.) | Facility energy (GWh) | Energy cost (₹ crore/yr) | CO₂, grid-only (kt) | CO₂ at 75% RE (kt) | Direct water (million m³, WUE × IT) | Indirect water, grid-only (million m³) |
|---|---|---|---|---|---|---|---|---|
| Bengaluru | Adiabatic + economiser | 1.30 | 911 | 610 (₹6.70) | 647 | 162 | 0.21 (0.3 L/kWh) | 2.19 |
| Hyderabad | IEC + chiller | 1.38 | 967 | 691 (₹7.15, 33 kV) | 687 | 172 | 0.35 (0.5) | 2.32 |
| Noida (NCR) | Economiser + WC chiller | 1.45 | 1,016 | 706 (₹6.95/kVAh) | 721 | 180 | 0.56 (0.8) | 2.44 |
| Mumbai | WC chiller + tower | 1.50 | 1,051 | 851 (₹8.10/kVAh) | 746 | 187 | 1.26 (1.8) | 2.52 |
| Chennai | WC chiller + tower | 1.50 | 1,051 | 788 (₹7.50) | 746 | 187 | 1.26 (1.8) | 2.52 |
| Visakhapatnam | DLC + dry cooler/chiller | 1.50 | 1,051 | 704 (₹6.70) | 746 | 187 | 0.14 (0.2) | 2.52 |
| Jamnagar | DLC + seawater/desal loop | 1.40 | 981 | 694 (₹4.30 + ₹2.77 FPPPA) | 697 | 174 | 0.07 (0.1, desal) | 2.35 |

What the numbers mean:
- **Carbon is driven by procurement, not geography.** Moving from Mumbai to Bengaluru cuts CO₂ by ~13% through PUE alone. Contracting 75% RE cuts it by ~75% anywhere. The optimizer will therefore value open-access/captive RE far above climate.
- **For a grid-powered site, indirect water exceeds direct cooling water**, often by 2–10×. Water-free cooling in a coal-heavy grid can still have a large water footprint. RE procurement is also the biggest water lever.
- **Tariff spreads of ₹1.5–2/kWh (~₹150–240 crore/yr per 100 MW) outweigh PUE differences of 0.1–0.2.** This explains why AI campuses chase captive power (Jamnagar, Vizag) rather than cool climates.

---

## Part 2 — Site-selection criteria for upcoming Indian data centres

### 2.1 Market context

- India had about 1,530 MW operational in September 2025 (CII-CBRE): Mumbai ~53%, Chennai 20%, Delhi NCR 10%, Bengaluru 7%. Savills reports 1,520 MW IT with different shares (Mumbai 34%, Delhi NCR 20%, Chennai 19%). **Consultancy shares conflict, so use them as ranges.**
- Mumbai and Chennai together took ~70% of 2025 absorption (Savills).
- CII-CBRE projects Mumbai's share of installed capacity across Tier-I markets rising from 52% (H1 2026) to 68% by 2030. This is a projection, not an outcome.
- AI giga-campuses:
  - **Visakhapatnam:** Google's $15 bn, ~1 GW AI hub with AdaniConneX and Airtel, including a subsea cable gateway. Reliance's reported $17 bn, 1.5 GW cluster with ~9,000 MWp captive solar + battery. Digital Connexion's 1 GW MoU (26 November 2025). In August 2026, Andhra Pradesh's IT minister told the Assembly the state had secured allocations for a proposed 6.5 GW data centre ecosystem (a project pipeline, not operating capacity).
  - **Jamnagar:** Reliance's reported 3 GW AI campus (Bloomberg estimate $20–30 bn). Meta's 168 MW lease (announced 10 June 2026), to be cooled with desalinated seawater and run on renewable energy.

### 2.2 Criteria, sub-criteria and how they move the decision

| # | Criterion | Key sub-criteria / metrics | Direction & magnitude of effect | Indian evidence |
|---|---|---|---|---|
| C1 | **Power availability & scalability** | Sanctioned load, substation distance, 220/400 kV access, transmission lead time, dual-grid feed, outage hours | **Highest weight for hyperscale/AI.** A site that cannot energise 100+ MW within 24–36 months is eliminated regardless of other scores. | AP is allowing >300 MW users to seek their own distribution licence; UP, TN, Telangana and WB policies offer dual grid. Vizag and Jamnagar are explicitly power-led. |
| C2 | **Electricity cost** | HT energy + demand charges, duty, open-access charges (CSS, additional surcharge, wheeling), ToD | Power is the largest opex line. ₹1/kWh ≈ ₹70–100 crore/yr per 100 MW IT. | MSEDCL ₹8.10/kVAh vs UP data centre park ₹6.95/kVAh vs Gujarat 400–430 paise/kWh + FPPPA (Table 1.4). Duty waivers in MH, TN, UP, WB, Karnataka. |
| C3 | **RE access & carbon** | GEOA eligibility and banking, captive/group-captive, state RE resource, CEA factor | Determines whether 70–100% RE is achievable. This is the dominant carbon lever, since the national factor is uniform (0.710). | GEOA Rules 2022 cut the open-access threshold to 100 kW with ≥30% banking. Gujarat/Rajasthan solar ~20% CUF; TN/Gujarat/Karnataka wind. Alongside Jamnagar, Meta contracted nearly 1 GW of new renewable energy in India (Meta newsroom, June 2026), including 837 MW of new solar and wind in Rajasthan and Karnataka via CleanMax. |
| C4 | **Water security** | CGWB block category, municipal allocation, STP/TTRO availability, desal access, drought history | A high-stress site forces air/dry or liquid cooling (higher PUE) or costly TTRO/desal. It also carries reputational and permitting risk. | Chennai "Day Zero" in June 2019. Chennai's 45 MLD Koyambedu TTRO plant (CMWSSB, commissioned November 2019) now supplies 40 MLD of treated water to industries in Sriperumbudur, Oragadam and nearby clusters. Bengaluru data centres cluster in water-stressed eastern corridors. CEEW (2026) estimates Indian data centres use about 150 bn litres of water a year, expected to more than double by 2030. CEEW/Systemiq (2026) finds that only 5 of 15 state data centre policies explicitly embed sustainability provisions. |
| C5 | **Climate / free cooling** | Hourly T_db/T_wb, humidity, free-cooling hours, extreme heat days | Shifts PUE by 0.1–0.25 for air-cooled halls. Much less for DLC/immersion AI halls. | Bengaluru (~920 m altitude) ~71% and Pune ~66% free-cooling hours (estimates). Direct evaporative cooling suits only dry climates such as Hyderabad and Delhi; hybrid systems save up to 75% (Purdue/IHPBC simulation). |
| C6 | **Natural hazards** | IS 1893 seismic zone, flood (100/500-yr), cyclone track, storm surge, heat | Usually a screening filter plus a structural-cost premium. Critical for sovereign/BFSI DR sites. | Hyderabad and Bengaluru are Zone II; Mumbai, Chennai and Kolkata Zone III; Delhi Zone IV (IS 1893:2016). East-coast sites (Vizag, Chennai, Kolkata) face cyclone/flood exposure. The IS 1893:2025 map adding Zone VI was **withdrawn on 3 March 2026** in favour of the 2016 standard. |
| C7 | **Connectivity** | Subsea cable landing stations (CLS), IXPs, fibre diversity, carrier neutrality | Decisive for colocation, CDN, cloud on-ramps and international traffic. Weak for training clusters. | India's ~17–19 international cables land in Mumbai, Chennai, Kochi, Tuticorin and Thiruvananthapuram. A 2026 BBC report found at least 13 of 18 come ashore within ~6 km of Versova, Mumbai, carrying up to 95% of international bandwidth to Europe, Africa and West Asia (a concentration risk). New gateways: Vizag (Google; Meta's project; Airtel CLS) and Digha (Bengal). |
| C8 | **Latency / proximity to demand** | RTT to enterprise/user clusters, BFSI and government proximity | Hard constraint for trading, payments, gaming, real-time inference (<5–10 ms). | Mumbai (BFSI) and NCR (government, enterprise) dominate latency-sensitive demand. |
| C9 | **Land** | Price/acre, contiguous parcels (50–200 acres for campuses), zoning, data centre park status | High land cost pushes vertical builds (Mumbai) or out-of-metro campuses. | Navi Mumbai/Thane–Belapur/Panvel absorb Mumbai growth; Vizag/Jamnagar offer large parcels. |
| C10 | **Ecosystem, talent & policy** | Hyperscaler presence, operator density, skilled workforce, single-window approvals, essential-service status, capex/stamp-duty incentives, tax regime | Reduces execution risk and time-to-revenue. | Budget 2026-27 tax holiday until 2047 for foreign cloud providers serving global customers from Indian data centres (Indian reseller required) + 15% cost-plus safe harbour. State policies in UP, TN, MH, Telangana, AP, WB, Karnataka. |
| C11 | **Data localisation & security** | DPDP Act compliance, sectoral localisation (RBI payments), MeitY empanelment, physical security | Pulls sovereign/BFSI workloads onshore. Favours low-hazard inland sites for DR pairs. | Sovereign cloud and government workloads favour Hyderabad/NCR/Bengaluru plus a geographically separated DR site. |

**Key trade-offs:**
- **Connectivity vs. resilience:** Mumbai's cable cluster is both its moat and a single point of failure.
- **Climate vs. water:** evaporative cooling in dry Hyderabad/Delhi lowers PUE but raises WUE.
- **Power vs. latency:** Vizag and Jamnagar have power and RE, but are far from the BFSI and government demand centres.

### 2.3 MCDM methods for data centre siting

| Method | Use in data centre siting | Strengths / weaknesses |
|---|---|---|
| **AHP** (Saaty) | Daim, Bhatla & Mansour (Int. J. Sustainable Engineering, 2013): the canonical data centre siting model, with expert-weighted criteria | Transparent; consistency ratio check. Subjective, and suffers rank reversal. |
| **Fuzzy AHP / fuzzy TOPSIS** | ANP + fuzzy TOPSIS for big-data-centre sustainability (Environ. Sci. Pollut. Res., 2020). Fuzzy AHP is the most-applied method in energy-related site selection reviews | Handles linguistic uncertainty. Adds complexity. |
| **SWARA/VIKOR (picture-fuzzy)** | PiF-SWARA + PiF-VIKOR renewable-integrated data centre location (Renewable Energy, 2025) | Compromise ranking; good for renewables-led siting. |
| **DEMATEL + EDAS** | Fuzzy DEMATEL weights + EDAS ranking of 81 Turkish provinces for data centres | Captures interdependence between criteria. |
| **WSM / TOPSIS / VIKOR comparison** | European NUTS-2 data centre screening across four weighting scenarios with rank-stability analysis (IJGI, 2026) | Directly analogous to the sensitivity design below. |
| **Multi-criteria set covering** | Selects data centre sets covering all demand within a radius while maximising sustainability utility | Bridges MCDM and the MILP of Part 1. |
| **GIS-MCDA** | Weighted overlay with AHP weights (e.g., Iskandar Puteri, Malaysia data centre study, 2025) | Best for parcel-level screening (flood, seismic, substation buffers). |
| **Entropy / CRITIC / BWM** | Objective (entropy, CRITIC) or reduced-comparison (Best-Worst Method) weighting | Entropy rewards data dispersion, not importance. BWM needs fewer pairwise judgements than AHP. |

**India-specific literature:** I found no peer-reviewed India-specific data centre siting MCDM study. GIS-AHP/TOPSIS studies exist for Indian hospital, dam and urban siting, and these supply transferable GIS layers and methods. This is a genuine research gap.

### 2.4 Proposed weights and illustrative city scoring

Scores run 1 (poor) to 5 (excellent). They are the author's judgement from the evidence above and **should be replaced by measured data plus expert AHP/BWM elicitation**.

| City | C1 Power | C2 Cost | C3 RE | C4 Water | C5 Climate | C6 Hazard | C7 Connect | C8 Latency | C9 Land | C10 Ecosystem |
|---|---|---|---|---|---|---|---|---|---|---|
| Mumbai (MMR) | 3 | 2 | 3 | 2 | 1 | 3 | 5 | 5 | 1 | 5 |
| Chennai | 3 | 3 | 4 | 1 | 1 | 2 | 4 | 4 | 3 | 4 |
| Delhi NCR (Noida) | 3 | 4 | 2 | 2 | 2 | 2 | 3 | 5 | 3 | 4 |
| Bengaluru | 3 | 3 | 4 | 1 | 5 | 5 | 2 | 4 | 2 | 4 |
| Hyderabad | 4 | 3 | 3 | 3 | 3 | 5 | 2 | 3 | 4 | 4 |
| Pune | 3 | 2 | 3 | 3 | 4 | 4 | 3 | 3 | 3 | 3 |
| Kolkata | 3 | 4 | 1 | 4 | 1 | 2 | 2 | 3 | 4 | 2 |
| Visakhapatnam | 5 | 4 | 5 | 3 | 1 | 2 | 4 | 2 | 5 | 2 |
| Jamnagar | 5 | 5 | 5 | 4 | 2 | 3 | 2 | 1 | 5 | 2 |

**Weight profiles (%):**

| Profile | C1 | C2 | C3 | C4 | C5 | C6 | C7 | C8 | C9 | C10 |
|---|---|---|---|---|---|---|---|---|---|---|
| A. AI training campus | 25 | 15 | 15 | 10 | 5 | 5 | 5 | 2 | 10 | 8 |
| B. Latency-sensitive colocation | 12 | 8 | 5 | 5 | 3 | 7 | 20 | 20 | 5 | 15 |
| C. Sovereign / government cloud | 15 | 8 | 7 | 8 | 4 | 18 | 10 | 10 | 5 | 15 |
| D. Balanced "green" | 15 | 10 | 15 | 15 | 10 | 8 | 8 | 7 | 5 | 7 |

Aggregation (weighted sum): $S_i = \sum_j w_j s_{ij}$, with Σw_j = 1. For TOPSIS, normalise r_ij = s_ij/√Σ_i s_ij² and compute closeness CC_i = d_i⁻/(d_i⁺ + d_i⁻).

**Results (WSM score out of 5):**

| City | A. AI training | B. Latency colo | C. Sovereign | D. Balanced green |
|---|---|---|---|---|
| Jamnagar | **4.18 (1)** | 2.87 (8) | 3.29 (4) | **3.66 (1)** |
| Visakhapatnam | **3.95 (2)** | 3.24 (6) | 3.21 (5) | **3.46 (2)** |
| Hyderabad | **3.48 (3)** | 3.26 (4) | **3.61 (1)** | **3.35 (3)** |
| Bengaluru | 3.10 (4) | 3.25 (5) | **3.45 (2)** | 3.22 (4) |
| Chennai | 2.95 (5=) | **3.37 (3)** | 3.00 (8) | 2.79 (8) |
| Pune | 2.95 (5=) | 3.02 (7) | 3.14 (6) | 3.08 (5) |
| Delhi NCR | 2.92 (7) | **3.43 (2)** | 3.06 (7) | 2.83 (7) |
| Kolkata | 2.77 (8) | 2.60 (9) | 2.56 (9) | 2.57 (9) |
| Mumbai | 2.75 (9) | **3.81 (1)** | **3.36 (3)** | 2.89 (6) |

**Sensitivity interpretation:**
- **Mumbai swings from 1st (latency) to 9th (AI training).** Its position depends almost entirely on the combined C7 + C8 weight. At C7 + C8 ≥ ~30% it leads; below ~15% it falls to the bottom because of land, water, climate and tariff. This matches market behaviour: Mumbai keeps winning colocation while AI training migrates to power-led sites.
- **Hyderabad is the robust choice.** It ranks 1st–4th in every profile, thanks to Zone II seismicity, land availability, a dry climate and power headroom. It suits a primary sovereign region or a DR pair for Mumbai.
- **Jamnagar and Vizag dominate whenever C1 + C2 + C3 ≥ ~45%.** Their weakness is latency and ecosystem. Vizag's new cable gateways could raise its C7 to 5 and its C10 over time, lifting it into the top three for colocation as well.
- **Chennai is penalised by water (score 1) and climate.** A credible TTRO/desal supply (C4 raised to 3) lifts it about 0.1–0.3 points in every profile.
- **Kolkata ranks last everywhere** until RE access (WB's weak RE resource) and cable diversity (Digha CLS) improve.
- **Robustness test (recommended):** Monte-Carlo-perturb the weights (Dirichlet sampling around each profile) and report each city's probability of ranking in the top three. Check rank stability across WSM, TOPSIS and VIKOR, as in the European NUTS-2 study.

---

## Recommendations

1. **Use a two-stage pipeline.**
   - Stage 1: GIS screening (flood, seismic Zone V, CGWB over-exploited blocks, >X km from a 220/400 kV substation), followed by AHP/BWM weighting and TOPSIS ranking by workload profile.
   - Stage 2: run the MILP of Part 1 on the top 3–5 sites, using an ε-constraint Pareto analysis of cost vs CO₂ vs total water.
2. **Make RE procurement a first-class decision variable, not an afterthought.** At a uniform 0.710 tCO₂/MWh grid, a ≥75% RE constraint (via GEOA with 30% banking, or captive hybrid + BESS) cuts both carbon and indirect water by ~75%. That is far more than any cooling choice.
3. **Choose cooling by workload, then by climate.**
   - AI halls (>40 kW/rack): DLC + dry coolers everywhere (WUE ≈ 0–0.2), with PUE ~1.2–1.4.
   - Enterprise/colo: adiabatic/IEC + economiser in Bengaluru, Pune and Hyderabad. Water-cooled plants only where STP/TTRO/desal water is contracted (Chennai, Mumbai).
4. **Design to benchmarks:** IGBC Green Data Centre (PUE ≤1.4 at 33% load), ASHRAE TC9.9 recommended envelope (inlet 24–27°C), ECBC-compliant envelope and lighting. Monitor and disclose WUE, since current Indian ESG reporting is inconsistent.
5. **Portfolio strategy for an operator:**
   - Mumbai or NCR for interconnection-heavy colocation.
   - Hyderabad as the primary sovereign/DR region.
   - Vizag or Jamnagar (or a captive-RE tier-2 site in Gujarat/Rajasthan/Karnataka) for training clusters.
   - Use the GLB layer to shift deferrable training and batch jobs toward high-RE hours and sites.

## Caveats

- **Estimates vs data:** The PUE/WUE per city, free-cooling hours (from an engineering blog, not peer-reviewed), city scores and the worked example are illustrative estimates. Tariffs come from SERC orders and secondary reports. Karnataka, Andhra Pradesh, Gujarat demand steps and West Bengal figures still need verification against the full orders.
- **GEOA legal status:** The Karnataka High Court reportedly struck down the Green Energy Open Access Rules 2022 (reported January 2025) as exceeding central powers. State-level open-access regulations therefore govern in practice, and appeal status should be checked before relying on GEOA parameters.
- **Seismic code:** IS 1893:2025 (with Zone VI) was withdrawn in March 2026. Use IS 1893:2016 zones, but monitor any re-issue.
- **Mega-project figures** (Reliance 3 GW Jamnagar, 1.5 GW Vizag, captive solar sizes) are announcements and press estimates, not commissioned capacity.
- **Single grid factor:** CEA's national weighted average hides regional and hourly variation. 24/7 carbon-free-energy accounting needs hourly marginal factors, which India does not yet publish officially.
- **Market shares** differ across CBRE, Savills and Colliers by up to ~20 percentage points for Mumbai. Treat them as ranges.

## Sources

1. reclimatize — https://reclimatize.in/india-grid-emission-factor-cea-ccts/
2. arxiv — https://arxiv.org/html/2607.22617v1
3. arxiv — https://arxiv.org/pdf/2508.04284
4. arxiv — https://arxiv.org/pdf/2605.03751
5. sciencedirect — https://www.sciencedirect.com/science/article/pii/S2590174526004137
6. acm — https://dl.acm.org/doi/10.1145/3679240.3735104
7. acm — https://dl.acm.org/doi/pdf/10.1145/3679240.3735104
8. mdpi — https://www.mdpi.com/2673-8732/6/3/77
9. mdpi — https://www.mdpi.com/1996-1073/19/7/1736
10. sciencedirect — https://www.sciencedirect.com/science/article/abs/pii/S0960148125009322
11. scribd — https://www.scribd.com/document/989264277/CEA-Indian-Grid-Emission-Factor
12. cercind — https://cercind.gov.in/2011/Whats-New/PERFORMANCE%20OF%20SOLAR%20POWER%20PLANTS.pdf
13. heavengreenenergy — https://www.heavengreenenergy.com/blog/solar-generation-by-state
14. wiley — https://rmets.onlinelibrary.wiley.com/doi/10.1002/met.2196
15. kvrm — https://kvrm.in/data-centre-wue-cooling-tower-adiabatic-dry-cooler/
16. lbl — https://datacenters.lbl.gov/sites/default/files/2_IGBC%20DC%20Rating%20System_Gen%20Presentation%2013%20Feb%2019_Mr%20Shivraj%20DHaka.pdf
17. simscale — https://www.simscale.com/blog/ashrae-90-4-data-center-standards/
18. hvac — https://hvac.best/ashrae-tc-9-9/
19. mongabay — https://india.mongabay.com/2023/02/green-building-regulations-give-impetus-to-sustainable-data-centers-in-india/
20. ciiblog — https://ciiblog.in/powering-the-indian-tech-sector-with-green-data-centres/
21. pib — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2227953&reg=48&lang=2
22. beaconfiling — https://beaconfiling.com/blog/india-data-center-boom-fdi-incentives
23. Wikipedia — https://en.wikipedia.org/wiki/Earthquake_zones_of_India
24. solarquarter — https://solarquarter.com/2022/06/07/power-ministry-issues-green-energy-open-access-rules-2022/
25. merc — https://merc.gov.in/wp-content/uploads/2025/03/Press-Note_MSEDCL-MYT-Order_English.pdf
26. mondaq — https://www.mondaq.com/india/real-estate/1360458/it--ites-policy-of-maharashtra-2023-pivotal-for-it-industry
27. mercomindia — https://www.mercomindia.com/tamil-nadu-hikes-fy-2026-electricity-tariffs-by-3-16
28. cushmanwakefield — https://assets.cushmanwakefield.com/-/media/cw/apac/india/insights/data-centre-policies-in-india-a-statewise-comparison.pdf?rev=6e0e167e39bf41f383b67eef232479f4
29. tgsouthernpower — https://tgsouthernpower.org/resources/PDF/Tariffs/63tarifffile.pdf
30. newsdrum — https://www.newsdrum.in/national/kerc-increases-electricity-tariffs-for-commercial-industrial-consumers-11175588
31. thenewsminute — https://www.thenewsminute.com/andhra-pradesh/inside-the-subsidies-for-googles-vizag-data-centre-amid-andhra-karnataka-spar
32. powerpeakdigest — https://powerpeakdigest.com/uperc-retains-fy27-power-tariffs-raises-subsidy-and-expands-ev-benefits/
33. mercomindia — https://www.mercomindia.com/andhra-pradesh-retains-last-years-electricity-tariffs-for-fy-2026
34. theprint — https://theprint.in/india/governance/andhra-to-be-1st-state-to-give-discom-license-to-pvt-firms-outside-power-sector-amid-data-centre-boom/2911910/
35. apiic — https://apiic.in/wp-content/themes/custom-theme/assets/Pdfs/2024ITC_33902_MS6.pdf
36. gercin — https://gercin.org/viewdocument/dGFyaWZmc2NoZWR1bGVfcGRmXzE3ODYwOTcyMjFfNzk2NA==
37. giftgujarat — https://api.giftgujarat.in/public/downloads/Others/Tariff_Petition_Summary_2025.pdf
38. zerowatt — https://zerowatt.energy/knowledge-centre/discom-tariff-guide/
39. wbsedcl — https://www.wbsedcl.in/irj/go/km/docs/internet/new_website/pdf/Tariff_Volumn/Gist%20of%20Tariff%20Order%202025-26_28_03.pdf
40. lbl — https://datacenters.lbl.gov/sites/default/files/Innovation%20in%20Energy%20Efficiency%20-%20Infosys%20Bangalore%20DC_IGBC&LBNL_2020.pdf
41. igbc — https://igbc.in/frontend-assets/html_pdfs/IGBC%20Green%20Data%20Centre%20rating%20_adenda_1_2017.pdf
42. greencalculus — https://greencalculus.com/standards/ashrae-tc-9-9-thermal-guidelines/
43. convergence-now — https://www.convergence-now.com/artificial-intelligence/mumbais-data-centre-boom-is-changing-indias-urban-infrastructure-map/
44. tradebrains — https://tradebrains.in/money/major-indian-cities-with-undersea-cables-and-their-rise-as-data-center-hubs/
45. ddnews — https://ddnews.gov.in/en/indias-data-centre-capacity-more-than-doubled-in-2025/
46. downtoearth — https://www.downtoearth.org.in/water/india-is-using-water-to-build-the-machines-that-tell-us-we-are-running-out-of-it
47. datacenterdynamics — https://www.datacenterdynamics.com/en/news/google-confirms-15bn-data-center-project-in-andhra-pradesh-india/
48. sahi — https://www.sahi.com/blogs/meta-reliance-jamnagar-data-center-india-ai-infrastructure
49. TechCrunch — https://techcrunch.com/2025/01/23/reliance-plans-world-biggest-ai-data-centre-in-india-report-says
50. purdue — https://docs.lib.purdue.edu/ihpbc/283
51. visionias — https://visionias.in/current-affairs/upsc-daily-news-summary/article/2026-03-07/the-economic-times/environment/bis-revokes-new-seismic-map-with-high-risk-zone-vi
52. wirecable — https://www.wirecable.in/indias-potential-to-become/
53. communicationstoday — https://www.communicationstoday.co.in/reshaping-the-indian-subsea-landscape/
54. takshashila — https://takshashila.org.in/content/blogs/20260201-union-budget-proposes-tax-holiday-for-global-cloud-services.html
55. pib — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2221412&reg=48&lang=2
56. tandfonline — https://www.tandfonline.com/doi/full/10.1080/19397038.2012.719554
57. springer — https://link.springer.com/article/10.1007/s11356-020-11443-2
58. sciencedirect — https://www.sciencedirect.com/science/article/pii/S2211467X19300252
59. researchgate — https://www.researchgate.net/publication/263369366_Site_selection_for_a_data_centre_-_a_multi-criteria_decision-making_model
60. doi — https://doi.org/10.3390/ijgi15070294
61. worldscientific — https://www.worldscientific.com/doi/10.1142/S2345748125500216
62. springer — https://link.springer.com/article/10.1007/s10708-024-11169-5
63. researchgate — https://www.researchgate.net/publication/363274589_Integrated_approach_of_AHP_and_TOPSIS_MCDM_techniques_with_GIS_for_dam_site_suitability_mapping_a_case_study_of_Navsari_City_Gujarat_India
64. tandfonline — https://www.tandfonline.com/doi/pdf/10.1080/10106049.2024.2335249
65. downtoearth — https://www.downtoearth.org.in/science-technology/indias-digital-thirst-what-data-centre-giants-arent-saying-about-their-water-use
66. insightsonindia — https://www.insightsonindia.com/2025/01/08/electricity-promoting-renewable-energy-through-green-energy-open-access-rules-2022/
67. dqindia — https://www.dqindia.com/data-and-ai/reliance-to-invest-usd-17-bn-in-a-15-gw-data-centre-project-at-visakhapatnam-indias-largest-digital-infrastructure-push-powered-by-clean-energy-11775081
68. deccanherald — https://www.deccanherald.com/amp/story/business%2Flocal-protests-sink-googles-1-bn-us-data-centre-plan-india-eyes-25-bn-boom-by-2030-3769717
