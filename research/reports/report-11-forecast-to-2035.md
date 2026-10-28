<!-- Report 11 of the India Data Centre Atlas research series (India data centres to 2035; atlas chapter 13.1). Produced with AI-assisted web research, October 2026, and kept as written at the time. Some figures were corrected later (notably India grid water 4.5 → 2.9 L/kWh and grid CO₂ 0.71 → 0.675 t/MWh, October 2026); the atlas standards register (src/data/standards.js) is authoritative where they differ. -->

# India data centres to 2035: a forecast (Part 11)

**Bottom line:** In our base case, India's operational data-centre capacity reaches about 4.7 GW (IT) by end-2030 and about 10.8 GW by end-2035. That is roughly 28% below the median published 2030 forecast (about 6.5 GW). The haircut is deliberate: consultants have historically delivered only 58–78% of the capacity additions they forecast. By 2035 data centres would use about 83 TWh a year (about 2.5% of national electricity), emit about 18 MtCO₂ after renewable procurement, and require about ₹8 lakh crore (about US$90 bn) of cumulative facility capex. On-site water use plateaus at about 60 MLD nationally, provided liquid and dry cooling spread as modelled.

**Labels used throughout:** **[R]** = reported by a named source; **[E]** = analyst estimate or assumption; **[M]** = model output from the formulas in this report. All US$ figures are converted at ₹89/US$ [E] unless the source gives its own conversion. Capacity means operational IT MW in the major colocation and hyperscale markets unless stated otherwise.

---

## TL;DR

- **Capacity:**
  - Base path [M]: 2.0 GW (2026) → 4.7 GW (2030) → 10.8 GW (2035).
  - Low / high [M]: 3.6 / 6.4 GW in 2030 and 6.8 / 18.8 GW in 2035.
  - Cushman & Wakefield's H1 2026 Update (16 Sep 2026) puts the pipeline to 2030 at 3,860 MW, covering both colocation and hyperscaler self-built facilities. It converts at about 60% for planned projects and about 95% for projects under construction. This "pipeline-conversion" view sets the 2030 anchor. A logistic curve with a 25 GW ceiling carries the forecast to 2035.
- **Power and carbon:**
  - Data-centre electricity rises from about 14 TWh (2026) to about 35 TWh (2030) and about 83 TWh (2035) [M].
  - Share of national electricity: 1% in 2028, 2% in 2033 and about 2.5% in 2035 [M]. In the high case the share reaches 3% by about 2032.
  - Net emissions go from about 7 Mt to about 18 MtCO₂/yr [M]. This assumes the grid factor falls from 0.710 (CEA v21, FY25) to about 0.535 by 2035 and operators' clean-power share rises to 60%.
- **Costs, water and location:**
  - Build costs are *rising*, not following Wright's law. Air-cooled shell: about ₹58 → ₹72 crore/MW by 2035 [M]. AI or liquid-cooled facilities: about 1.5× that.
  - H100-class rental should fall about 20%/yr, from about ₹220 to about ₹90 per GPU-hour by 2030 [M].
  - Water is a local, not national, problem. The pinch points are Mumbai/Navi Mumbai (more than 40% of new MW in a city already about 500 MLD short), Chennai, and Visakhapatnam's small 384 MLD system.

---

## Key Findings

1. **History, harmonised [E from R].** Operational IT capacity grew from about 375 MW (2019) to 1,611 MW (end-2025). A log-linear fit gives g = 27.9%/yr with R² ≈ 0.99 [M]. The 1,611 MW figure is derived from Cushman & Wakefield's (C&W) H1 2026 total of 1,789 MW minus 178 MW added in H1 2026.
2. **Sources disagree by about ±7% on today's stock:**
   - C&W: 1,789 MW (H1 2026) [R].
   - JLL: 1,637 MW (about 1.64 GW) at June 2026, per its India Data Centre 2026 Mid-Year Report [R]. JLL projects 6 GW by 2029, needing US$110 bn.
   - PIB factsheet (14 Sep 2026): 1.57 GW "as of August 2026", up from about 375 MW in 2020 [R].
   - The calculator should use C&W as the anchor because its city split is the most complete.
3. **Track record on forecasts:**
   - Measured as delivered additions ÷ forecast additions, past consultant forecasts delivered 0.58–0.74.
   - Measured as actual level ÷ forecast level, they delivered 0.78–0.87.
   - Projects already under construction deliver close to 100% within 4–5 years.
   - This supports a 25–35% haircut on headline forecasts of additions.
4. **Published 2030 forecasts range from 4 GW (CareEdge) to 12 GW (Wood Mackenzie); the median is about 6.5 GW** [R]. Our base of 4.7 GW sits close to the delivered pipeline.
5. **Demand-driver regressions point lower still (2.5–4.9 GW in 2030)** [M]. Consumer and fintech drivers (UPI, mobile data) are decelerating. The gap between those drivers and the supply-side forecasts is AI, hyperscale and sovereign compute, which these regressions cannot see.
6. **Electricity is the binding constraint at the high end.**
   - A PIB factsheet (14 Sep 2026) states: "According to the Central Electricity Authority (CEA), Ministry of Power, demand could reach 17 GW by 2031–32" [R]. The Ministry of Power's March 2026 estimate was 13.56 GW [R]. In a 29 July 2026 written reply to Parliament, MoS Power Shripad Naik cited "an additional load of 26.3 GW from artificial intelligence data centres" by 2031–32 (Business Standard) [R], which is above even our high case.
   - Those figures match our *high* case for connected facility load (about 14 GW in 2032) [M], not our base (about 9.6 GW).
7. **Cost per MW is rising.**
   - Turner & Townsend reports a 5.5% global inflation in data-centre construction costs in 2025 (9.0% in 2024) [R].
   - CareEdge reports 50–70% cumulative cost increases in Indian data-centre construction [R].
   - Like-for-like learning (b ≈ 0.10, i.e. about 7% cheaper per doubling) [E] is swamped by inflation and the premium for AI density.

---

## 1. Capacity (MW IT): data, three models, comparison, backtest

### 1.1 Historical series

| Year-end | Harmonised base series used for fitting (MW IT) | Reported points (source) | Label |
|---|---|---|---|
| 2019 | 375 | 350 (JLL); about 400 (C&W) | E from R |
| 2020 | 450 | 375 (MeitY, Parliament reply, Mar 2026); 520 (JM Financial via CEEW, broader definition) | E from R |
| 2021 | 560 | 499 at H1 2021 (JLL); 824 at end-2021 (C&W, colocation stock, inconsistent with C&W's later series) | E from R |
| 2022 | 720 | 722 (JLL) | R |
| 2023 | 977 | 977 at H2 2023 (C&W; 258 MW built in 2023, +105% YoY); 950 in FY24 (ICRA) | R |
| 2024 | 1,200 | 1,030 (JLL); about 1,150 in Dec 2024 (ICRA); 1,255 (CBRE) | E from R |
| H1 2025 | – | 1,280 (C&W); 1,263 in Apr 2025 (Colliers); 1,123 (JLL) | R |
| 2025 | 1,611 | 1,789 − 178 (C&W, derived); about 1,500 (MeitY); about 1.7 GW (CBRE); 387 MW added in 2025 (Rubix) | E from R |
| H1 2026 | 1,789 | C&W: 1,789 across 7 markets, 147 facilities, 33 providers, 14.9% vacancy; JLL: 1,637 MW (2026 Mid-Year Report, June 2026); PIB factsheet (14 Sep 2026): 1.57 GW as of Aug 2026 | R |
| 2026E | 2,000 | CBRE: about 2 GW by end-2026; C&W: Mumbai to exceed 1 GW by end-2026 | E |

**Definitional cautions:**
- JLL counts "IT design power load" for colocation.
- C&W covers the top 7 markets and appears to include hyperscale self-builds more fully.
- MeitY's figure is national.
- Wood Mackenzie's 2.2 GW for 2025 uses a broader base.
- Some sources quote gross (facility) MW.
- JLL's claim of a "60% CAGR since 2021" does not reconcile with its own 350 MW (2019) → 1,030 MW (2024) series, which is about 24% a year. We treat it as a CAGR of *supply additions*.

### 1.2 Model (a): CAGR, C(t) = C₀(1+g)^t

**Fit [M]:** OLS of ln C on year, 2019–2025, n = 7.
- Slope = 0.2461, so g = e^0.2461 − 1 = **27.9%**. R² ≈ 0.99.
- Arithmetic check: the end-point CAGR over 2019–2025 is (1,611/375)^(1/6) − 1 = 27.5%.

**Forward scenarios from C₀ = 1,611 MW (end-2025) [M]:**

| g | 2027 | 2028 | 2030 | 2033 | 2035 |
|---|---|---|---|---|---|
| Low 18% | 2,243 | 2,647 | 3,686 | 6,055 | 8,431 |
| Base 25% | 2,517 | 3,146 | 4,916 | 9,602 | 15,003 |
| High 32% | 2,807 | 3,705 | 6,456 | 14,849 | 25,872 |

Constant CAGR is a poor tool beyond 2030: the base case would reach 15 GW by 2035 with no deceleration. We use it only as a cross-check up to 2030.

### 1.3 Model (b): logistic S-curve, C(t) = K / (1 + e^(−r(t − t₀)))

**Choosing the ceiling K [E]:**
- India today has about 1.2 W of data-centre capacity per person: 1,789 MW across about 1.46 bn people.
- CareEdge gives 1.2 MW per million internet users [R].
- The global average is about 12 W per person: the IEA puts global data-centre capacity at "almost 100 GW" [R], spread over about 8.2 bn people.
- One secondary source cites about 51 MW per million users for the US and about 4 for China [R, secondary; the China figure looks too low and is not used].
- **Base K = 25 GW** is about 16 W per person on a 2040 population of about 1.6 bn, which is roughly the global average in the mid-2020s. It also sits just above the CEA's 17 GW data-centre demand for 2031-32, before PUE.
- **Low K = 12 GW**: the constraints are power and connection queues.
- **High K = 45 GW**: India becomes a regional AI export hub.

**Solving for t₀:** t₀ is fixed so that the curve passes through C(2025) = 1,611:

  t₀ = 2025 + ln(K/1,611 − 1) / r

| Parameter | Low | Base | High |
|---|---|---|---|
| K (MW) | 12,000 | 25,000 | 45,000 |
| r (/yr) | 0.24 | 0.26 | 0.30 |
| t₀ | 2032.8 | 2035.3 | 2036.0 |

r is anchored on the observed log-growth of 0.246 (because r ≈ g_log when C ≪ K).

**Logistic output (MW) [M]:**

| Year | Low | Base | High |
|---|---|---|---|
| 2026 | 1,975 | 2,051 | 2,146 |
| 2027 | 2,403 | 2,596 | 2,850 |
| 2028 | 2,897 | 3,266 | 3,763 |
| 2029 | 3,457 | 4,077 | 4,936 |
| 2030 | 4,076 | 5,044 | 6,417 |
| 2031 | 4,745 | 6,171 | 8,249 |
| 2032 | 5,447 | 7,458 | 10,465 |
| 2033 | 6,166 | 8,884 | 13,062 |
| 2034 | 6,879 | 10,425 | 16,008 |
| 2035 | 7,568 | 12,030 | 19,215 |

**Caveat:** with seven points all in the early exponential phase, K and t₀ are *not* statistically identified by the history. K is a judgement constrained by power, land and demand. This is why it gets a wide prior in the Monte Carlo (section 9).

### 1.4 Model (c): pipeline conversion, C(t+1) = C(t) + Σ P_stage(t − L) × c_stage

**Current pipeline (C&W India Data Centre H1 2026 Update, press release 16 Sep 2026) [R]:** 3,860 MW to 2030, of which 509 MW is under construction (UC) and 3,351 MW is planned. The pipeline "includes both colocation facilities and self-built infrastructure" by hyperscalers and needs US$29.9 bn of development capital.

**Conversion evidence:**

| Source and date | Forecast | Outcome | Ratio | Label |
|---|---|---|---|---|
| JLL H1 2021 update | 499 → 1,008 MW by 2023 (+509) | JLL's 2023 figure was not published in our sources. Interpolated between 722 (2022) and 1,030 (2024) it is about 875; C&W reports 977 | Additions about 0.74; level about 0.87 | E |
| JLL (about 2023) | +681 MW to 1,318 MW by end-2024 | 1,030 MW (JLL 2024) | Additions 0.58; level 0.78 | R/M |
| C&W, Feb 2022 | "over 1.0 GW incremental … in various stages of construction, expected to start operations over the next 4–5 years" | About 1,070 MW added from end-2022 to H1 2026 | About 1.0 within 4.5 years | R/M |
| ICRA, Oct 2024 | 950 MW (FY24) → 2,000–2,100 MW by Mar 2027 | On track on C&W's basis (1,789 at H1 2026); marginal on JLL's basis (1,637 MW at June 2026) | About 0.9–1.0 (provisional) | M |
| Arizton / ResearchAndMarkets | 3.5 GW by 2030 (Feb 2025), revised to 4.8 GW (Jul 2025) | Forecast inflated by 37% in 5 months | n/a | R |
| CEEW / Systemiq | "Only about 50% of the USD ~95 bn worth of capital committed … between 2019 and 2025 has a …" (text truncated in source) | Treated as a conversion ceiling for announcements of about 50% | about 0.5 | R (partial) |

**Parameters [E]:**

| Stage | Conversion c | Lag L |
|---|---|---|
| Under construction | Low 0.85 / Base 0.95 / High 1.0 | 1–2 years |
| Planned | Low 0.40 / Base 0.60 / High 0.80 | 2–4 years (base 3) |
| MoU / announced only | 0.2–0.5 | 3–5 years |

Typical construction lead times are 18–30 months per 20–50 MW block [E]. JLL notes that blocks have grown from 20 MW to 50+ MW and that prefabricated steel is shortening build times [R].

**Output to 2030 [M]:**
- Base: 1,789 + 509 × 0.95 + 3,351 × 0.60 = **4,284 MW**.
- Low: 1,789 + 433 + 1,340 = **3,562 MW**.
- High: 1,789 + 509 + 2,681 = 4,979 MW, plus about 1,000 MW of gigawatt-campus phases outside C&W's 7 markets (Visakhapatnam, Jamnagar) [E] = **about 6,000 MW**.

| Path (MW) | 2026 | 2027 | 2028 | 2029 | 2030 |
|---|---|---|---|---|---|
| Low | 1,950 | 2,250 | 2,650 | 3,100 | 3,560 |
| Base | 1,990 | 2,450 | 3,050 | 3,650 | 4,280 |
| High | 2,050 | 2,800 | 3,800 | 4,900 | 6,000 |

### 1.5 Integrated capacity path

**Construction of the path [M]:**
- 2026–2030: the mean of the pipeline model and the logistic model.
- 2031–2035: the logistic model, with the base case trimmed by about 10% to stay consistent with the conversion haircut.

| MW IT | 2026 | 2027 | 2028 | 2029 | 2030 | 2031 | 2032 | 2033 | 2034 | 2035 |
|---|---|---|---|---|---|---|---|---|---|---|
| Low | 1,950 | 2,250 | 2,650 | 3,100 | 3,600 | 4,200 | 4,800 | 5,450 | 6,100 | 6,800 |
| **Base** | **2,000** | **2,500** | **3,100** | **3,850** | **4,700** | **5,700** | **6,850** | **8,100** | **9,450** | **10,800** |
| High | 2,100 | 2,850 | 3,800 | 4,950 | 6,400 | 8,200 | 10,300 | 12,800 | 15,600 | 18,800 |

Implied base CAGR: 2025–30 = 23.9%; 2030–35 = 18.1% [M].

### 1.6 Published forecasts compared

| Forecaster | 2026–27 | 2028–29 | 2030 | 2031–35 | Label |
|---|---|---|---|---|---|
| ICRA | 2,000–2,100 MW by Mar 2027; edge capacity 200–210 MW by 2027 | – | – | 3.0–3.5 GW pipeline over 7–10 years, ₹2.0–2.3 lakh crore | R |
| JLL | about 2.1 GW (2027); earlier 1,825 MW (2027) | 6 GW (2029) | – | – | R |
| CBRE | about 2 GW (end-2026); about 500 MW of supply in 2026 | – | – | – | R |
| C&W | – | – | 1,789 + 3,860 pipeline = about 5.6 GW if fully delivered; US$29.9 bn | – | R |
| Colliers | – | – | more than 4,500 MW (top 7 cities) | – | R |
| CareEdge | – | – | about 4 GW (FY30), about ₹1.5 lakh crore | – | R |
| Arizton (via ResearchAndMarkets) | – | – | 4.8 GW | – | R |
| Rubix | – | – | 6.5 GW | – | R |
| Macquarie | 2× by 2027 | – | 5× by 2030 (about 6.5–7.5 GW implied) | – | R/E |
| Jefferies | – | – | 8 GW; US$30 bn capex | – | R |
| PIB factsheet (14 Sep 2026) | – | – | "nearly 8 GW"; US$70 bn ongoing plus US$90 bn announced | – | R |
| Wood Mackenzie | – | – | 12 GW (from 2.2 GW in 2025); AI capacity 275 → 6,546 MW | – | R |
| CEA / Ministry of Power (demand, GW of power) | – | – | – | 17 GW (CEA) / 13.56 GW (MoP, Mar 2026) by 2031-32; 26.3 GW additional AI data-centre load (MoS Power, Jul 2026) | R |
| **This report (base)** | 2.0 / 2.5 GW | 3.1 / 3.85 GW | **4.7 GW** | 6.85 GW (2032); **10.8 GW (2035)** | M |

**Coverage gaps:** we found no public, source-verifiable India MW forecasts from Morgan Stanley, Bernstein, Nomura, Goldman, CRISIL, NASSCOM or the IEA (country-level). They are omitted rather than guessed. The IEA's critical review does cite Nomura as estimating that data centres "currently consume 8.4 TWh" in India [R].

**Haircut test [M]:** the median of the nine 2030 point forecasts is about 6.5 GW. Our base of 4.7 GW is 0.72× that median, which sits inside the historical delivered-to-forecast range of 0.58–0.87.

---

## 2. Electricity (TWh) and share of the grid

**Formulas:**
- IT energy (TWh) = MW × u × 8,760 ÷ 10⁶
- Facility energy (TWh) = IT energy × PUE

**Utilisation u [E]:**
- Colocation vacancy is 14.9% (C&W) [R], so about 85% of capacity is leased.
- Leased load typically draws about 65% of contracted power while it ramps.
- So u ≈ 0.55 in 2026 [E]. It rises to 0.65 by 2035 as AI training and inference, which run at high load factors, grow to more than 60% of new capacity.

**PUE [E/R]:**
- tele.net reports that Indian data centres "typically run at a PUE of around 1.45–1.55" [R].
- CtrlS reports a company-wide design PUE of 1.35 [R].
- Takshashila assumes 1.6 for 2024 [R].
- SBI's sector report says "Industry leaders are achieving PUE values below 1.5" [R].
- Karnataka's 2026–31 policy pays incentives for PUE of 1.00–1.20 [R].
- Base path: 1.50 (2026) → 1.42 (2030) → 1.35 (2035).

**Calibration check [M]:** for 2024, 1,200 MW × 0.55 × 1.52 × 8.76 ≈ 8.8 TWh. That matches Nomura's 8.4 TWh [R]. For 2025 the model gives about 10 TWh, about 0.57% of demand, which agrees with CEEW's "about 0.5% of national electricity consumption" [R].

**National denominator [R]:**
- Electrical energy requirement was 1,694 BU in FY2024-25 (CEA LT-NRAP).
- The mid-term review of the 20th Electric Power Survey projects 3,365 BU and a 459 GW peak in 2035-36, a CAGR of 6.41%.
- Model path: 1,694 × 1.0641^n [M].
- The NEP 2022-32 figure was 2,473.8 BU for 2031-32 [R].
- Downside risk: peak demand was flat in FY26 (about 245 GW against a projected 270 GW) [R].

**Base case [M]** (calendar-year data-centre energy against the matching fiscal year's requirement; year-end MW basis, so use the mid-year average to get figures about 8–10% lower):

| Year | MW | u | PUE | IT TWh | Facility TWh | India requirement (BU) | Data-centre share |
|---|---|---|---|---|---|---|---|
| 2026 | 2,000 | 0.55 | 1.50 | 9.6 | 14.5 | 1,918 | 0.75% |
| 2027 | 2,500 | 0.56 | 1.48 | 12.3 | 18.2 | 2,041 | 0.89% |
| 2028 | 3,100 | 0.57 | 1.46 | 15.5 | 22.6 | 2,172 | **1.04%** |
| 2029 | 3,850 | 0.58 | 1.44 | 19.6 | 28.2 | 2,311 | 1.22% |
| 2030 | 4,700 | 0.60 | 1.42 | 24.7 | 35.1 | 2,459 | 1.43% |
| 2031 | 5,700 | 0.61 | 1.41 | 30.5 | 43.0 | 2,617 | 1.64% |
| 2032 | 6,850 | 0.62 | 1.40 | 37.2 | 52.1 | 2,785 | 1.87% |
| 2033 | 8,100 | 0.63 | 1.38 | 44.7 | 61.7 | 2,963 | **2.08%** |
| 2034 | 9,450 | 0.64 | 1.37 | 53.0 | 72.6 | 3,153 | 2.30% |
| 2035 | 10,800 | 0.65 | 1.35 | 61.5 | 83.0 | 3,355 | 2.47% |

**Scenarios [M]:**

| Scenario | 2030 TWh | 2030 share | 2035 TWh | 2035 share | Year share reaches 1% / 2% / 3% |
|---|---|---|---|---|---|
| Low (u 0.50→0.58; PUE 1.52→1.42) | 24.7 | 1.0% | 49.1 | 1.5% | 2030 / not reached / not reached |
| Base | 35.1 | 1.4% | 83.0 | 2.5% | 2028 / 2033 / after 2035 |
| High (u 0.60→0.72; PUE 1.50→1.30) | 51.0 | 2.1% | 154.2 | 4.6% | 2027 / 2030 / about 2032 |

**Context on other estimates:**
- The IEA puts global data-centre use at 415 TWh (2024) → about 945 TWh (2030) [R]. Its 2026 update gives 485 → 950 TWh [R].
- India's base case would be about 3.7% of global data-centre electricity in 2030 [M].
- A trade-press figure of 191 TWh for Indian AI data centres (GreentechLead) has no stated year or method. Treat it as an unverified outlier.

**State-level shares, base case [M; state denominators are E].** These are approximate state requirements, extrapolated about 6%/yr from FY25. Replace them with the state tables of the 20th EPS mid-term review before publishing.

| State (data-centre cities) | 2030 DC TWh | ≈ State BU 2030 [E] | Share | 2035 DC TWh | ≈ State BU 2035 [E] | Share |
|---|---|---|---|---|---|---|
| Maharashtra (Mumbai/Navi Mumbai, Pune) | 17.9 | 250 | 7.2% | 39.9 | 330 | 12.1% |
| Telangana (Hyderabad) | 4.8 | 120 | 4.0% | 12.2 | 160 | 7.6% |
| Tamil Nadu (Chennai) | 3.5 | 175 | 2.0% | 11.0 | 230 | 4.8% |
| Andhra Pradesh (Visakhapatnam) | 1.9 | 105 | 1.8% | 4.9 | 140 | 3.5% |
| Karnataka (Bengaluru, Mysuru) | 1.7 | 120 | 1.4% | 3.9 | 160 | 2.4% |
| Uttar Pradesh (Noida/Greater Noida, about 70% of NCR) | 2.4 | 210 | 1.1% | 5.5 | 280 | 2.0% |

Maharashtra is the clear grid-stress state. Data centres would take about 1 in 8 units there by 2035 in the base case. This is consistent with the CEA's Maharashtra resource-adequacy study, which already shows 4.1% unserved energy in 2031-32 without additional capacity [R].

---

## 3. Carbon trajectory

**Formula:** CO₂ (Mt) = facility TWh × EF(t) [tCO₂/MWh] × (1 − clean(t))

**Grid emission factor history (CEA CO₂ Baseline Database, weighted average including renewables) [R]:**

| Fiscal year | EF (tCO₂/MWh) |
|---|---|
| FY14 | 0.774 |
| FY21 | 0.703 (COVID year) |
| FY23 | 0.716 |
| FY24 | 0.727 |
| FY25 | **0.710** (v21: 1,234.19 Mt ÷ 1,739.06 BU) |

**Projections:**
- NEP 2022-32 [R]: 0.548 (2026-27) and 0.430 (2031-32).
- The NEP numbers are kg/kWh_net. The draft plan gave 0.524 / 0.441.
- **The NEP path is already about 0.15 off track.** FY25 came in at 0.710, so we do not use NEP as the base.
- CEA LT-NRAP [R]: non-fossil sources reach 70% of installed capacity by 2035-36, against 52% in January 2026. Renewables supplied about 27% of generation in FY26.

**EF paths (tCO₂/MWh) [E]:**

| Year | Slow | Base | Fast |
|---|---|---|---|
| 2026 | 0.71 | 0.70 | 0.69 |
| 2030 | 0.69 | 0.62 | 0.55 |
| 2035 | 0.65 | 0.535 | 0.45 |

Between these years the paths are linear. Base runs at about −2.7%/yr; fast is NEP delayed by about 4 years.

**Operators' clean-power position [R]:**
- Nxtra (Airtel): about 70% renewables for core data centres, targeted for 2027; net zero by 2031. Its 2024 wheeling deal for 140,208 MWh/yr cut about 99,547 tCO₂e.
- CtrlS: 100% renewables and carbon neutral by 2030; renewables tie-up of up to 2 GW with NTPC Green.
- AdaniConneX: "up to 100% renewable energy"; US$1.44 bn of sustainability-linked financing.
- Yotta: exploring wind, solar and pumped storage for round-the-clock power.
- Meta: about 1 GW of renewables procurement in India.
- CB Insights notes that data centres make up 13.6% of India's open-access demand.

**Fleet clean share [E]:**
- About 30% in 2026.
- Low: 25% → 40%. Base: 30% → 43% (2030) → 60% (2035). High: 35% → 85%.

**Emissions, base case [M]:**

| Year | Facility TWh | EF | Clean share | Net MtCO₂ | Location-based Mt (clean = 0) |
|---|---|---|---|---|---|
| 2026 | 14.5 | 0.70 | 0.30 | 7.1 | 10.1 |
| 2027 | 18.2 | 0.68 | 0.33 | 8.3 | 12.3 |
| 2028 | 22.6 | 0.66 | 0.37 | 9.4 | 14.9 |
| 2029 | 28.2 | 0.64 | 0.40 | 10.8 | 18.0 |
| 2030 | 35.1 | 0.62 | 0.43 | 12.4 | 21.7 |
| 2031 | 43.0 | 0.60 | 0.47 | 13.7 | 25.8 |
| 2032 | 52.1 | 0.58 | 0.50 | 15.1 | 30.2 |
| 2033 | 61.7 | 0.565 | 0.53 | 16.4 | 34.9 |
| 2034 | 72.6 | 0.55 | 0.57 | 17.2 | 39.9 |
| 2035 | 83.0 | 0.535 | 0.60 | 17.8 | 44.4 |

**Range in 2035 [M]:**
- Low: about 3 Mt (low capacity, fast EF, 85% clean).
- High: about 60 Mt (high capacity, slow EF, 40% clean).

The "clean share" is market-based (PPAs, open access, RECs) and rarely matched hour by hour. Location-based emissions are the honest upper bound.

---

## 4. Costs: build cost per MW and GPU-hour prices

### 4.1 Build cost

**Data points:**

| Source | Figure | Implied ₹ crore/MW | Label |
|---|---|---|---|
| Turner & Townsend 2025 index | Mumbai US$6.64/W (₹589/W per IBEF); 51st of 52 markets. Tokyo US$15.2, Singapore US$14.5. Global +5.5% in 2025, +9.0% in 2024 | about 58.4 | R |
| ICRA (Oct 2024) | ₹50,000–55,000 crore for about 1,100 MW (FY25–27) | about 47 | R/M |
| ICRA (Mar 2025) | ₹2.0–2.3 lakh crore for a 3.0–3.5 GW pipeline | about 62–70 | R/M |
| C&W (Sep 2026) | US$29.9 bn for 3,860 MW | about 69 (US$7.75m/MW) | R/M |
| Jefferies | US$4–5m/MW | 36–45 | R |
| C&W 2026 APAC guide (via secondary source) | US$5.9–9.0m/MW across India's five major cities | 52–80 | R (secondary) |
| CareEdge | 4 GW by FY30 needs about ₹1.5 lakh crore; costs up 50–70% recently | about 54 | R/M |
| US AI vs standard (Quartz, citing industry) | US$20m+/MW vs US$10–12m/MW | AI premium ×1.7–2.0 | R |

**Wright's-law diagnosis [M]:**
- ICRA's figure of about ₹47 crore/MW at about 1,000 MW cumulative, against C&W's about ₹69 crore/MW at 1,789 MW, implies b = −ln(69/47)/ln(1.789) ≈ −0.66.
- That is *negative* learning: unit cost rose with cumulative volume.
- The aggregate data do not support a cost-decline curve. We therefore split the model into parts:

  cost(t) = C₂₀₂₅ × (X_t/X₂₀₂₅)^(−b) × (1+π)^(t−2025) × (1 + a × AI_share(t))

**Parameters [E]:**
- C₂₀₂₅ = ₹58.4 crore/MW (Turner & Townsend shell and core plus M&E; excludes land and IT).
- b = 0.10, so the learning rate is 1 − 2^(−0.10) = 6.7% per doubling.
- π = 4%/yr inflation in electrical and cooling equipment.
- a = 0.5 (AI facility = 1.5× air-cooled).
- AI share of new builds: 40% (2026) → 60% (2030) → 70% (2035).

**Cost path [M]:**

| ₹ crore/MW | 2026 | 2027 | 2028 | 2029 | 2030 | 2032 | 2035 |
|---|---|---|---|---|---|---|---|
| Air-cooled facility | 59.4 | 60.4 | 61.5 | 62.6 | 63.8 | 66.5 | 71.5 |
| AI / liquid-cooled facility (×1.5) | 89 | 91 | 92 | 94 | 96 | 100 | 107 |
| Blended new build | 71.3 | 74.0 | 76.9 | 79.8 | 82.9 | 87.8 | 96.5 |

**Ranges [M]:**
- Low (b = 0.15, π = 2%, a = 0.3): air-cooled about ₹58 crore/MW in 2030.
- High (b = 0.05, π = 7%, a = 0.8): about ₹80 crore/MW air-cooled and about ₹145 crore/MW AI in 2030.

**Cumulative facility capex, base case (2026 onward; excludes land and IT/GPU hardware) [M]:**

| Year | ΔMW | Annual ₹ crore | Cumulative ₹ lakh crore | Cumulative US$ bn |
|---|---|---|---|---|
| 2026 | 389 | 27,700 | 0.28 | 3.1 |
| 2027 | 500 | 37,000 | 0.65 | 7.3 |
| 2028 | 600 | 46,100 | 1.11 | 12.5 |
| 2029 | 750 | 59,900 | 1.71 | 19.2 |
| 2030 | 850 | 70,500 | 2.42 | 27.2 |
| 2031 | 1,000 | 85,300 | 3.27 | 36.7 |
| 2032 | 1,150 | 101,000 | 4.28 | 48.1 |
| 2033 | 1,250 | 113,000 | 5.41 | 60.8 |
| 2034 | 1,350 | 126,000 | 6.67 | 75.0 |
| 2035 | 1,350 | 130,300 | 7.97 | 89.6 |

Cross-check: our 2026–30 total of US$27 bn for 3.1 GW is close to C&W's US$29.9 bn for 3.86 GW [R].

### 4.2 GPU-hour prices

**Data [R]:**
- Global H100 on-demand peaked at about US$8/hr in early 2024 (Neysa, citing Value Add VC and Thunder Compute). The median is now about US$2.50–3.50.
- SemiAnalysis reports a rebound from US$1.70 (October 2025) to US$2.35 (early 2026) as supply tightened.
- India commercial rates:

| Provider | H100 rate |
|---|---|
| JarvisLabs | ₹217.89/hr (US$2.69) |
| Cyfuture | ₹219/hr (SXM) |
| Neysa | ₹395/hr on demand; about ₹219/hr on a 36-month commitment |
| Hyperscalers in India (8-GPU instances) | about ₹850–1,050 per GPU-hour |

- IndiaAI tender L1 rates: ₹115.85 (standard) and ₹150 (high-end) per GPU-hour.
- IndiaAI subsidised rates: about ₹65–67 average and about ₹92 for H100.
- IndiaAI has 38,231 GPUs onboarded across 14 providers (PIB, March 2026). At about 1.0–1.4 kW of IT per GPU [E], that is only about 40–55 MW, or about 3% of national capacity.

**Fitted decline [M]:**
- From US$8 to about US$2.4 over about 2.25 years: ln(0.30)/2.25 = −0.535, i.e. **−41%/yr** for a single generation after launch.
- The 2025–26 rebound shows this is not a stable trend.
- We use −20%/yr as the base for an H100-class hour from 2026.

| ₹ per GPU-hour (India commercial on-demand) | 2026 | 2027 | 2028 | 2029 | 2030 |
|---|---|---|---|---|---|
| H100-class, base (−20%/yr) | 220 | 176 | 141 | 113 | 90 |
| H100-class, low decline (−10%/yr) | 220 | 198 | 178 | 160 | 144 |
| H100-class, high decline (−30%/yr) | 220 | 154 | 108 | 75 | 53 |
| Frontier class (B200/GB200 → successors) [E] | about 450–550 | about 450–550 | about 450–550 | about 450–550 | about 450–550 |

**Frontier class:** we found no verified Indian B200 list price. The estimate assumes a launch price of about 2× H100. The price per *frontier* hour stays roughly flat because each new generation resets it. The price per unit of compute falls about 30–40%/yr [E]. IndiaAI subsidies will keep a floor of about ₹65–92 for eligible users and will pull down commercial prices.

---

## 5. Water demand by city (MLD)

**Formulas:**
- Water (L) = IT kWh × WUE_mix(t)
- WUE_mix = s_evap × 1.8 + s_adiab × 0.5 + s_dry/liquid × 0.1 (L/kWh)
- MLD = IT TWh × WUE × 2.7397

**WUE values:**
- tele.net estimates Indian facilities at 1.5–2.5 L/kWh, against a global average of about 1.8–1.9 [R, estimate].
- Adiabatic cooling uses 0.2–0.8 L/kWh [R, trade guide].
- Karnataka's policy incentivises WUE of 0.7–1.3 L/kWh [R].
- Operator disclosure is thin. Down To Earth found no published WUE for Nxtra, AdaniConneX or CtrlS. STT GDC India reports only a 29% WUE reduction in FY24 [R].
- Calibration [M]: the IEA's "about 2 million litres per day for a 100 MW hyperscale facility" [R] works out to 0.83–1.4 L/kWh at u = 0.6–1.0. This is consistent with our WUE_mix of 1.14 in 2025.

**Cooling mix in 2025 [E]:** 55% evaporative, 25% adiabatic, 20% dry/closed-loop or direct liquid cooling.

**Bass diffusion of the dry/liquid share:**

  L(t) = L₀ + (m − L₀) × F(t), with F(t) = (1 − e^(−(p+q)t)) / (1 + (q/p)e^(−(p+q)t))

- t = year − 2025; L₀ = 0.20; m = 0.85; **p = 0.03; q = 0.40** [E].
- **Analogue evidence [R]:**
  - Dell'Oro: direct liquid cooling grows from US$1.1 bn (2024) to US$5.8 bn (2029).
  - Dell'Oro: liquid-cooling revenue roughly doubles in 2025 to about US$3 bn and approaches US$7 bn by 2029.
  - Dell'Oro: direct liquid cooling grew 156% YoY in Q2 2025.
  - Turner & Townsend: 26–50% of projects use liquid-cooled environments for AI.
  - That is a fast imitation-driven curve, so q ≫ p.
- The evaporative share of the non-dry remainder falls from 69% to 50% by 2035 [E].

| Year | Dry/liquid share | WUE_mix (L/kWh) | National on-site water, base (MLD) |
|---|---|---|---|
| 2026 | 22% | 1.09 | 28.7 |
| 2027 | 26% | 1.03 | 34.5 |
| 2028 | 30% | 0.95 | 40.4 |
| 2029 | 36% | 0.87 | 46.5 |
| 2030 | 43% | 0.77 | 52.4 |
| 2031 | 50% | 0.68 | 56.3 |
| 2032 | 57% | 0.58 | 59.1 |
| 2033 | 64% | 0.50 | 60.6 |
| 2034 | 70% | 0.43 | 61.7 |
| 2035 | 74% | 0.37 | 62.3 |

**Scenarios [M]:**
- Low: low capacity with fast diffusion. About 30 MLD (2030) and about 24 MLD (2035).
- High: high capacity with slow diffusion (q = 0.25). About 95 MLD (2030) and about 210 MLD (2035).

**Discrepancy flag:** CEEW, citing Mordor Intelligence, gives about 150 bn litres/yr in 2025 (about 410 MLD) [R]. That is about 20 L per IT kWh, roughly 15× any plausible on-site WUE. It must include water embedded in power generation and possibly semiconductors, which CEEW lists as separate components. It is not comparable with on-site WUE. Mongabay reports CEEW finding data centres at about 0.02–0.03% of national water demand [R].

**City water, base case [M]:**
- Intensity: 11.1 MLD per GW in 2030 (u = 0.60, WUE = 0.774); 5.8 MLD per GW in 2035 (u = 0.65, WUE = 0.370).
- City supply figures are [R] via the subagent's sources.

| City | MW 2030 | MLD 2030 | MW 2035 | MLD 2035 | City supply (MLD) | Data-centre share 2030 / 2035 | High-case 2035 MLD |
|---|---|---|---|---|---|---|---|
| Mumbai MMR | 2,083 | 23.2 | 4,499 | 26.0 | BMC about 4,100, against 4,600 demand (Oct 2026) | 0.57% / 0.63% | about 85 |
| Hyderabad | 641 | 7.1 | 1,587 | 9.2 | HMWSSB 545 MGD ≈ 2,478 | 0.29% / 0.37% | about 30 |
| Chennai | 468 | 5.2 | 1,426 | 8.2 | Metrowater 1,245 (Apr 2025, incl. tankers) | 0.42% / 0.66% | about 27 |
| Delhi NCR | 452 | 5.0 | 1,025 | 5.9 | DJB about 1,002 MGD target ≈ 4,555 (Delhi only) | 0.11% / 0.13% | about 19 |
| Pune | 311 | 3.5 | 692 | 4.0 | PMC about 1,222 (older figure) | 0.29% / 0.33% | about 13 |
| Bengaluru | 232 | 2.6 | 510 | 2.9 | BWSSB about 1,935 supplied (2,225 capacity) | 0.13% / 0.15% | about 10 |
| Kolkata | 80 | 0.9 | 147 | 0.85 | KMC 1,654–2,045 (sources conflict) | about 0.05% | about 3 |
| Visakhapatnam | 250 | 2.8 | 637 | 3.7 | GVMC 84.44 MGD = 383.86 | 0.73% / 0.96% | about 17 (4.4%) |

**Stress points:**

1. **Navi Mumbai/Thane.** Most "Mumbai" capacity sits in Navi Mumbai and on the Thane–Belapur belt, which are served by NMMC, CIDCO and MIDC rather than the BMC. So the 0.6% share of BMC supply understates the local share.
2. **Chennai.** The city already runs a structural deficit, and data-centre water use rises about 60% between 2030 and 2035 in the base case.
3. **Visakhapatnam.** A single 1 GW AI campus on an evaporative design would need about 17 MLD, about 4–5% of the city's supply. Yovizag reports that the Google AI data centre is part of the reason demand is projected to reach 726 MLD by 2040 [R].
4. **Policy lever.** Mandating dry, adiabatic or recycled-water cooling in these three locations removes most of the high-case risk.

---

## 6. Where new capacity goes, city by city

**Allocation formula:**

  share_i = α × s_i(t−1) + (1 − α) × score_i^k / Σ_j score_j^k

- s_i(t−1) is the incumbency share.
- score is the chapter-10 composite.
- For 2026–2030, the allocation uses the *revealed* pipeline (C&W upcoming MW by city) with stage conversion. The softmax-plus-incumbency blend is used for 2030–2035.

**Calibration evidence [R]:**
- Mumbai's share of operational capacity was 45% (JLL, H1 2021) and is 49.7% now (C&W: 890/1,789). Incumbency has *strengthened*.
- The pipeline shares (C&W, on the 3,633 MW city-sum basis) are below.

| City | Pipeline MW | Share of pipeline |
|---|---|---|
| Mumbai | 1,726 | 47.5% |
| Hyderabad | 710 | 19.5% |
| NCR | 387 | 10.7% |
| Chennai | 368 | 10.1% |
| Pune | 258 | 7.1% |
| Bengaluru | 100 | 2.8% |
| Kolkata | 84 | 2.3% |

- The city figures sum to 3,633 MW, against C&W's 3,860 MW total. The 227 MW gap is unexplained in the press materials.
- Hyderabad's pipeline share (19.5%) is about 2.3× its stock share (8.4%), so it is the main share-gainer.
- **Fitting k:** if scores alone had to reproduce Mumbai's 4.7× pipeline lead over Chennai, k would have to be about 25. That is implausible, and it shows that incumbency (α) does most of the work. Matching the pipeline with α ≈ 0.5 needs k ≈ 6–10. We use **k = 8, α = 0.5** [E].
- Illustrative scores used [E; substitute the chapter-10 values]:

| City | Score |
|---|---|
| Mumbai | 85 |
| Chennai | 80 |
| Hyderabad | 78 |
| NCR | 72 |
| Visakhapatnam | 70 |
| Pune | 68 |
| Bengaluru | 65 |
| Kolkata | 50 |

- The resulting softmax shares are: Mumbai 34.5%, Chennai 21.4%, Hyderabad 17.3%, NCR 9.1%, Visakhapatnam 7.3%, Pune 5.8%, Bengaluru 4.1%, Kolkata 0.5% [M].

**City forecast, base case [M]:**
- 2030: 400 MW goes to sites outside the 7 markets (Visakhapatnam about 250, Jamnagar/other about 150) [E]. The remaining 2,511 MW is allocated by pipeline share.
- 2035: the 6,100 MW increment is allocated with α = 0.5, k = 8.

| City | H1 2026 [R] | 2030 base | 2035 base | 2035 high (indicative) | Share of national, 2035 base |
|---|---|---|---|---|---|
| Mumbai MMR (incl. Navi Mumbai) | 890 | 2,083 | 4,499 | about 7,700 | 41.7% |
| Hyderabad (incl. periphery) | 151 | 641 | 1,587 | about 2,900 | 14.7% |
| Chennai | 214 | 468 | 1,426 | about 2,600 | 13.2% |
| Delhi NCR (incl. Noida/Greater Noida) | 183 | 452 | 1,025 | about 1,800 | 9.5% |
| Pune | 133 | 311 | 692 | about 1,200 | 6.4% |
| Visakhapatnam | 0 | 250 | 637 | about 1,500 | 5.9% |
| Bengaluru (incl. Mysuru spill-over) | 162 | 232 | 510 | about 850 | 4.7% |
| Kolkata | 22 | 80 | 147 | about 250 | 1.4% |
| Other (Jamnagar etc.) | – | 150 | 248 | about 0 (inside the figures above) | 2.3% |
| **Total** | **1,789** | **about 4,670** | **about 10,770** | **about 18,800** | 100% |

Mumbai's share drifts from 50% to about 42%. Hyderabad and Chennai together approach 28%. Visakhapatnam becomes a top-6 market if its announced gigawatt campus delivers even one-third of its capacity.

---

## 7. Demand drivers (regression)

**Driver series [R]:**
- UPI annual volume (NPCI via PIB): 24,162 crore transactions in FY26, +30% YoY, so FY25 = 18,586 crore [M].
- Earlier fiscal years used: FY20 1,250; FY21 2,233; FY22 4,597; FY23 8,375; FY24 13,116 crore. These are NPCI figures as widely reported, not re-verified in this round [E].
- Ericsson data per smartphone in India: 13 GB (2019), 14.6 GB (2020), 26 GB (2022, after a methodology revision), 32–36 GB (2024, revised), 37 GB (2025). Forecast: 70 GB by 2031 (11% CAGR).
- Gartner India public cloud: US$13.7 bn (2025) → US$17.5 bn (2026), +28.1%. IaaS grows +40%.
- Policy step-changes: RBI payment-data localisation (2018) and the DPDP Act (2023) with its 2025 Rules.

**Regression 1 [M]:** ln MW_t on ln UPI_FY(t+1), 2019–2025, n = 7.
- ln MW = 2.462 + **0.471** × ln UPI.
- **R² = 0.958**.
- Elasticity: 1% more UPI volume goes with 0.47% more data-centre MW.

**Regression 2 (cloud intensity) [M]:**
- 2025 intensity is 117.6 MW per US$ bn of public cloud spend.
- With cloud spend growing 25%/yr to US$41.8 bn in 2030 [E], elasticity 1.0 gives 4.9 GW and elasticity 0.8 gives 3.9 GW.

**Regression 3 (traffic) [E/M]:**
- Historical capacity growth (about 28%/yr) against mobile-traffic growth (about 20%/yr) implies an elasticity of about 1.3.
- Ericsson's path implies traffic growth of about 14%/yr.
- That gives about 18%/yr, or about 3.7 GW in 2030.

**Driver-based forecasts for 2030 [M]:**

| Driver model | 2030 MW |
|---|---|
| UPI (UPI +20%/yr) | 2.5 GW |
| Traffic | 3.7 GW |
| Cloud | 3.9–4.9 GW |
| **Mean** | **about 3.7 GW** |

**Interpretation:** consumer and enterprise drivers support about 3.7 GW by 2030. The supply-side base of 4.7 GW and the consultant median of 6.5 GW therefore assume roughly 1–3 GW of capacity driven by AI and hyperscalers' export demand. This is consistent with Wood Mackenzie's AI estimate (275 → 6,546 MW) and with JLL's 2026 Mid-Year Report, which found that pre-committed hyperscale capacity accounted for 82% of the 101 MW absorbed in H1 2026, "primarily driven by high-density AI computing workloads". That AI tranche is the most cyclical part of the forecast.

**Caveats:**
- n = 7 with five degrees of freedom.
- Every regressor trends upward, so multicollinearity makes multivariate coefficients meaningless.
- There is spurious-regression risk with trending series, and first differences leave too few points.
- The definitions of the dependent variable vary across sources.
- Treat the elasticities as descriptive, not causal.

---

## 8. Integrated base-case table (2026–2035) [M]

| Year | MW low / base / high | IT TWh | Facility TWh | % of India | Net MtCO₂ | Water, national MLD | Water, Mumbai / Chennai / Hyderabad MLD | Cumulative capex ₹ lakh crore (US$ bn) | ₹ crore/MW (air / AI) | ₹/GPU-hr H100-class |
|---|---|---|---|---|---|---|---|---|---|---|
| 2026 | 1,950 / 2,000 / 2,100 | 9.6 | 14.5 | 0.75% | 7.1 | 28.7 | 14 / 3.5 / 2.0 | 0.28 (3.1) | 59 / 89 | 220 |
| 2027 | 2,250 / 2,500 / 2,850 | 12.3 | 18.2 | 0.89% | 8.3 | 34.5 | 16 / 4.0 / 3.0 | 0.65 (7.3) | 60 / 91 | 176 |
| 2028 | 2,650 / 3,100 / 3,800 | 15.5 | 22.6 | 1.04% | 9.4 | 40.4 | 19 / 4.4 / 4.3 | 1.11 (12.5) | 62 / 92 | 141 |
| 2029 | 3,100 / 3,850 / 4,950 | 19.6 | 28.2 | 1.22% | 10.8 | 46.5 | 21 / 4.8 / 5.7 | 1.71 (19.2) | 63 / 94 | 113 |
| 2030 | 3,600 / 4,700 / 6,400 | 24.7 | 35.1 | 1.43% | 12.4 | 52.4 | 23 / 5.2 / 7.1 | 2.42 (27.2) | 64 / 96 | 90 |
| 2031 | 4,200 / 5,700 / 8,200 | 30.5 | 43.0 | 1.64% | 13.7 | 56.3 | 24 / 6.0 / 7.6 | 3.27 (36.7) | 65 / 98 | 72 |
| 2032 | 4,800 / 6,850 / 10,300 | 37.2 | 52.1 | 1.87% | 15.1 | 59.1 | 25 / 6.8 / 8.1 | 4.28 (48.1) | 67 / 100 | 58 |
| 2033 | 5,450 / 8,100 / 12,800 | 44.7 | 61.7 | 2.08% | 16.4 | 60.6 | 25 / 7.4 / 8.5 | 5.41 (60.8) | 68 / 102 | 46 |
| 2034 | 6,100 / 9,450 / 15,600 | 53.0 | 72.6 | 2.30% | 17.2 | 61.7 | 26 / 7.8 / 8.9 | 6.67 (75.0) | 70 / 104 | 37 |
| 2035 | 6,800 / 10,800 / 18,800 | 61.5 | 83.0 | 2.47% | 17.8 | 62.3 | 26 / 8.2 / 9.2 | 7.97 (89.6) | 72 / 107 | 30 |

Notes:
- City water for intermediate years is linearly interpolated between the modelled years 2026, 2030 and 2035.
- GPU prices after 2030 extrapolate the −20%/yr trend and are increasingly speculative.
- Capex excludes land and IT/GPU hardware. Including servers would multiply AI capex several-fold.

---

## 9. Parameter table for the calculator, with Monte Carlo distributions

| Parameter | Symbol | Low | Base | High | Suggested distribution | Basis |
|---|---|---|---|---|---|---|
| Starting capacity (end-2025) | C₀ | 1,500 | 1,611 | 1,700 | Uniform | R (MeitY / C&W / CBRE) |
| CAGR | g | 0.18 | 0.25 | 0.32 | Triangular(0.15, 0.25, 0.33) | M (fitted 0.279) |
| Logistic ceiling | K (MW) | 12,000 | 25,000 | 45,000 | Lognormal, median 25 GW, 90% CI 12–45 GW | E |
| Logistic rate | r | 0.24 | 0.26 | 0.30 | Uniform(0.22, 0.32) | M |
| Logistic midpoint | t₀ | 2032.8 | 2035.3 | 2036.0 | Derived: t₀ = 2025 + ln(K/C₀ − 1)/r | M |
| Conversion, under construction | c_UC | 0.85 | 0.95 | 1.00 | Beta(19, 1.5) | R/M |
| Conversion, planned | c_P | 0.40 | 0.60 | 0.80 | Beta(6, 4) | R/M |
| Conversion, MoU / announced | c_A | 0.2 | 0.35 | 0.5 | Uniform | R (CEEW) / E |
| Lag | L (years) | 2 | 3 | 4 | Discrete {2: 0.4, 3: 0.45, 4: 0.15} | E |
| Forecast haircut (delivered/forecast) | h | 0.58 | 0.70 | 0.87 | Triangular | M (backtest) |
| Utilisation | u(2026→2035) | 0.50→0.58 | 0.55→0.65 | 0.60→0.72 | Triangular on the 2030 value (0.52, 0.60, 0.68) | E |
| PUE | PUE(2026→2035) | 1.52→1.42 | 1.50→1.35 | 1.50→1.30 | Triangular on 2030 (1.32, 1.42, 1.50) | R/E |
| Grid emission factor | EF (2026 / 2030 / 2035) | 0.71 / 0.69 / 0.65 | 0.70 / 0.62 / 0.535 | 0.69 / 0.55 / 0.45 | Triangular on 2030 (0.55, 0.62, 0.69) | R (CEA) / E |
| Clean share | c_clean (2026 / 2030 / 2035) | 0.25 / 0.32 / 0.40 | 0.30 / 0.43 / 0.60 | 0.35 / 0.60 / 0.85 | Triangular on 2030 | R (operators) / E |
| Learning exponent | b | 0.15 | 0.10 | 0.05 | Uniform(0.05, 0.15); LR = 1 − 2^(−b) | E |
| Equipment inflation | π | 0.02 | 0.04 | 0.07 | Triangular | R (T&T 5.5–9%) / E |
| Base build cost | C₂₀₂₅ (₹ crore/MW) | 50 | 58.4 | 69 | Triangular | R (T&T, C&W) |
| AI premium | a | 0.3 | 0.5 | 0.8 | Uniform | R (US) / E |
| GPU price decline | d (%/yr) | 10% | 20% | 30% | Triangular(0.10, 0.20, 0.30) | M |
| H100-class price, 2026 | P₀ (₹/hr) | 150 | 220 | 395 | Triangular | R |
| Bass innovation | p | 0.01 | 0.03 | 0.05 | Uniform | E (Dell'Oro analogue) |
| Bass imitation | q | 0.25 | 0.40 | 0.55 | Uniform | E |
| Dry/liquid ceiling | m | 0.70 | 0.85 | 0.95 | Uniform | E |
| WUE, evaporative | L/kWh | 1.5 | 1.8 | 2.5 | Triangular | R |
| WUE, adiabatic | L/kWh | 0.2 | 0.5 | 0.8 | Uniform | R |
| WUE, dry / liquid | L/kWh | 0.0 | 0.1 | 0.2 | Uniform | E |
| Allocation exponent | k | 4 | 8 | 12 | Uniform | M |
| Incumbency weight | α | 0.3 | 0.5 | 0.7 | Uniform | M |
| National demand growth | g_grid | 4.5% | 6.41% | 7.3% | Triangular | R (CEA EPS; 7.35% FY21–25) |
| FX rate | ₹/US$ | 88 | 89 | 92 | Uniform | E |

**Monte Carlo guidance:**
- Correlate K with u (ρ ≈ +0.5): both rise with AI.
- Correlate EF with c_clean (ρ ≈ −0.3).
- Correlate p/q with the AI share (ρ ≈ +0.6).
- Draw capacity from a 50/50 mixture of the logistic and pipeline models to 2030, and the logistic model thereafter.

---

## 10. Risks and swing factors, ranked by impact on 2035 MW

1. **Power and grid connection (largest swing, ±5 GW).**
   - The CEA has set up a committee, which includes the Central Transmission Utility and Nasscom, because data-centre load could reach 17 GW by 2031-32 (PIB factsheet, 14 Sep 2026) [R].
   - Wood Mackenzie's VP Research Rashika Gupta says "Land and capital are no longer the limiting factors for data centre developers in India" (DataCenterNews Asia, 29 Jul 2026) [R]. The binding constraint is access to electricity.
   - Maharashtra already shows unserved energy in the CEA's adequacy study.
   - Transformer lead times (128–144 weeks, per Wood Mackenzie Q2 2025) [R] put a floor on how fast projects can be delivered.
2. **The AI demand cycle (±3–6 GW).**
   - JLL's 2026 Mid-Year Report says pre-committed hyperscale capacity "accounted for 82% of total absorption" of 101 MW in H1 2026, "primarily driven by high-density AI computing workloads" [R], so demand depends on a few buyers.
   - The 2025–26 rebound in GPU rental prices points to tightness today, not a guarantee of future demand.
3. **GPU export controls and supply.** Restrictions under any US AI-diffusion framework, or limits on Blackwell allocation, would slow AI-density builds. They would also raise the GPU-hour price path to the low-decline case.
4. **Policy.**
   - Positive levers: infrastructure status, state incentives (for example Karnataka's PUE and WUE-linked incentives), tax holidays, and the localisation requirements of the DPDP Rules 2025.
   - Negative: tariff or open-access reversals.
5. **Water and local licence to operate.** Protests over a facility said to need 12 million litres a day (The Better India) [R] are a sign of what may follow. Evaporative designs in Chennai, Navi Mumbai and Visakhapatnam carry permitting risk.
6. **Forecast inflation in the source data.** Arizton raised its 2030 forecast by 37% in five months, and JLL's "60% CAGR" cannot be reconciled with its own series. Rebase the model every six months to C&W's or JLL's actuals.

---

## Recommendations

- **For the calculator:**
  - Default to the integrated base path.
  - Expose K, c_P, u and EF as the four headline sliders; together they explain most of the output variance.
  - Show the backtested haircut h explicitly next to any consultant forecast.
- **For planners and utilities:**
  - Plan for the **high** case for connected load (about 14 GW in 2032), not the base case.
  - Over-planning transmission is cheap; stranding a 1 GW campus is not.
- **For investors:**
  - Underwrite at no more than 0.7× of announced pipeline.
  - Model ₹ crore/MW as *rising* 2–4%/yr in nominal terms, not falling.
- **For state governments:**
  - Make dry or recycled-water cooling a condition of approval in Chennai, Navi Mumbai and Visakhapatnam.
  - Tie incentives to measured, published WUE and PUE. Most operators publish neither today.

## Caveats

- Historical capacity series mix definitions (colocation vs total, IT vs gross, 7 cities vs national). The harmonised series is an estimate.
- Several inputs come from trade press, aggregators or vendor blogs and are labelled accordingly:
  - GPU prices.
  - C&W's 2026 APAC cost guide (seen via a secondary source).
  - Some city water figures.
- State electricity denominators and the earlier UPI years were not re-verified in this round.
- We did not find public India MW forecasts from several banks named in the brief; we did not invent them.
- The NEP emission-factor path is already off track, so carbon outcomes depend heavily on how fast the grid actually decarbonises.

## Sources

1. <https://www.freepressjournal.in/mumbai/bmc-says-mumbai-could-recover-nearly-400-mld-water-by-cutting-distribution-losses-10-per-cent>
2. <https://www.tribuneindia.com/news/business/india-to-add-3860-mw-data-centre-capacity-by-2030-require-usd-29-9-bn-investment-report>
3. <https://www.constructionworld.in/latest-construction-technology/india---s-data-centre-capacity-reaches-1-789-mw-in-h1-2026/97528>
4. <https://www.woodmac.com/press-releases/india-data-centre-capacity-to-reach-12-gw-by-2030/>
5. <https://reports.turnerandtownsend.com/data-centre-construction-cost-index-2025/data-centre-cost-trends>
6. <https://thebetterindia.com/conservation/nature/ai-water-consumption-india-data-centres-12502489>
7. <https://www.business-standard.com/article/technology/india-s-data-centre-industry-capacity-to-double-by-2023-to-1-008-mw-report-121082400662_1.html>
8. <https://www.icra.in/CommonService/OpenMediaS3?Key=b08638cb-2a72-433a-8406-3778bc208a75>
9. <https://yourstory.com/2025/03/india-data-centre-capacity-to-nearly-double-by-2027-icra>
10. <https://www.jll.com/en-in/insights/market-dynamics/india-data-centers>
11. <https://medium.com/@azha.khan.6/the-rise-of-data-centres-in-india-history-drivers-and-whos-building-them-3216744781d5>
12. <https://www.spglobal.com/energy/en/news-research/latest-news/electric-power/041025-global-data-center-power-demand-to-double-by-2030-on-ai-surge-iea>
13. <https://en.wikipedia.org/wiki/Data_centre_industry_in_India>
14. <https://www.businesswire.com/news/home/20250220696747/en/India-Existing-Upcoming-Data-Center-Portfolio-2025-Around-1.6GW-of-Power-Capacity-is-Expected-to-be-Added-by-the-End-of-2025-with-a-Total-of-3.5GW-Projected-by-2030---ResearchAndMarkets.com>
15. <https://www.icra.in/CommonService/OpenMediaS3?Key=e3133ab1-16d9-4f77-b70b-85ba6ecd2a2a>
16. <https://www.icra.in/CommonService/OpenMediaS3?Key=104d0d7b-9b81-40a6-9f0d-a807f95c331c>
17. <https://www.business-standard.com/topic/macquaire-india>
18. <https://www.cbinsights.com/company/nxtra-by-airtel>
19. <https://www.whalesbook.com/news/English/energy/CEA-Forms-Panel-to-Manage-Data-Center-Power-Surge-to-17-GW/6abc14615aacb956d0854d61>
20. <https://www.iea-4e.org/wp-content/uploads/2025/05/Data-Centre-Energy-Use-Critical-Review-of-Models-and-Results.pdf>
21. <https://tele.net.in/telefocus/building-smarter-efficiency-and-sustainability-emerge-as-key-pillars-of-data-centre-expansion-12226383>
22. <https://takshashila.org.in/content/publications/20251029-Building-Indias-Data-Centres.html>
23. <https://sbi.bank.in/documents/57189647/58231607/Sector+Report+DataCentre.pdf/f1919592-ee66-b50b-ea20-75fbb27c9bb5?t=1779885206866>
24. <https://www.thenewsminute.com/karnataka/karnatakas-new-data-centre-policy-puts-water-energy-in-focus-what-does-it-say>
25. <https://india.mongabay.com/2026/05/india-bets-on-data-centres-even-as-water-energy-use-concerns-mount/>
26. <https://www.ceew.in/publications/how-is-data-centre-infrastructure-in-india-shaping-power-and-water-use>
27. <https://cea.nic.in/wp-content/uploads/notification/2026/04/Long_term_National_Resource_Adeqaucy_Plan2026_27_to_2035_36.pdf>
28. <https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=1928750&reg=48&lang=2>
29. <https://iea.blob.core.windows.net/assets/3179f7f8-01f6-4dd6-bffa-c9f7b73f1dc9/KeyQuestionsonEnergyandAI.pdf>
30. <https://greentechlead.com/power/india-ai-data-centres-to-drive-191-twh-power-demand-creating-huge-renewable-energy-opportunity-54896>
31. <https://cea.nic.in/wp-content/uploads/notification/2024/07/Maharashtra_Report.pdf>
32. <https://psuwatch.com/latestnews/india-needs-35-gw-more-coal-based-capacity-by-fy32-draft-national-electricity-plan>
33. <https://www.whalesbook.com/news/English/tech/NTPC-Green-Energy-to-Supply-Renewable-Power-to-Nxtra-Data-Centers/69c2a7ffb3510476c350391f>
34. <https://www.bharti.com/press-release-2023-2024-nxtra-to-procure-140208-mwh-renewable-energy-for-its-data-centres.html>
35. <https://www.forbesindia.com/article/take-one-big-story-of-the-day/are-indias-ai-and-sustainable-energy-ambitions-compatible/95466/1>
36. <https://resources.adaniconnex.com/press-release>
37. <https://www.linkedin.com/company/adani-connex>
38. <https://www.cbinsights.com/company/nxtra>
39. <https://neysa.ai/blog/h100-price-in-india/>
40. <https://www.mexc.com/news/1002560>
41. <https://abhs.in/blog/indiaai-mission-34000-gpus-cheap-compute-developers-2026>
42. <https://www.timlig.com/posts/cheapest-gpus-in-the-world/>
43. <https://techdodo.in/articles/india-ai-impact-summit-2026-gpu-access-guide>
44. <https://www.pib.gov.in/PressReleasePage.aspx?PRID=2239616&reg=3&lang=1>
45. <https://www.netsolwater.com/water-requirement-for-data-centers-in-india.php?blog=7289>
46. <https://www.datacentres.com/guides/data-centre-water-usage>
47. <https://earthjournalism.net/stories/what-data-center-giants-arent-saying-about-their-water-use-in-india>
48. <https://www.sttelemediagdc.com/in-en/resources/green-data-centres-how-stt-gdc-india-driving-sustainability>
49. <https://www.delloro.com/news/ai-build-out-to-propel-data-center-physical-infrastructure-market-to-63-1-billion-by-2029/>
50. <https://www.delloro.com/news/data-center-liquid-cooling-market-to-approach-7-billion-by-2029-as-ai-deployments-accelerate/>
51. <https://www.connectmoney.com/stories/ai-boom-fuels-surge-in-data-center-liquid-cooling-market/>
52. <https://www.delloro.com/market-at-the-boiling-point-is-the-cdu-space-becoming-saturated/>
53. <https://datastorageasia.com/turner-townsend-report-singapore-no-2-globally-in-data-centre-construction-cost/>
54. <https://questionofcities.org/the-new-challenge-rising-heat-and-worsening-water-access-in-cities/>
55. <https://en.wikipedia.org/wiki/Water_management_in_Chennai>
56. <https://www.yovizag.com/water-security-plan-visakhapatnam-gvmc-hosts-global-workshop/>
57. <https://baxtel.com/news/indian-data-center-boom-to-see-industry-capacity-double-by-2023>
58. <https://www.cushmanwakefield.com/en/india/news/2026/09/india-data-centre-h1-2026-update>
59. <https://www.pib.gov.in/PressReleasePage.aspx?PRID=2302657&reg=48&lang=2>
60. <https://www.ericsson.com/en/press-releases/2/2023/6/ericsson-mobility-report-global-5g-growth-continues---india-leading-the-way>
61. <https://www.ericsson.com/en/reports-and-papers/mobility-report/dataforecasts/mobile-traffic-forecast>
62. <https://www.techradar.com/news/5g-yet-to-arrive-but-indias-5g-users-predicted-to-touch-330-million-by-2026>
63. <https://www.business-standard.com/amp/industry/news/india-public-cloud-spending-gartner-ai-infrastructure-2026-126060200602_1.html>
64. <https://infotechlead.com/cloud/india-public-cloud-spending-to-reach-17-5-bn-in-2026-as-ai-infrastructure-demand-accelerates-gartner-96209>
65. <https://qz.com/data-center-construction-costs-rising-inflation-050526>
66. <https://www.businesswire.com/news/home/20250717364824/en>
