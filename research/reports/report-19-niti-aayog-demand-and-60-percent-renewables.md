<!-- Report 19 of the India Data Centre Atlas research series (Demand forecasts, NITI Aayog outlook and a 60% renewable target; atlas chapter 18). Produced with AI-assisted web research, 13 Oct 2026, and kept as written at the time. The atlas standards register (src/data/standards.js) is authoritative where figures differ (for example India grid water 2.9 L/kWh and grid CO₂ 0.675 t/MWh after the October 2026 corrections). -->

# India Data Centres, NITI Aayog Demand Outlook and a 60% Renewable Target: Forecasts, Calculations and Realistic Portfolios (October 2026)

A 60% renewable share for Indian data centres by 2030 is achievable on an annual-matching basis in the central case (≈25 TWh of RE, ≈10–11 GW of solar-wind hybrid capacity, under 4% of one year's national solar additions per year of build-out), but it becomes a wind-and-storage-constrained stretch if demand follows the government's own 26.3 GW-by-2031-32 load projection, and 60% on an hourly (24×7) basis requires firm RE (FDRE/RTC) or co-located storage rather than solar PPAs. Contrary to the earlier lead, NITI Aayog *has* now published a data-centre electricity projection (in its February 2026 Viksit Bharat/Net Zero buildings volume), and it is far higher than the market consensus.

## TL;DR
- **Demand is the swing variable, not RE supply.** Data-centre electricity in 2030 ranges from ≈35 TWh (C&W ~4.2 GW IT) to ≈41 TWh (atlas central 4.66 GW) to ≈56–57 TWh (S&P ~6.5 GW) and ≈100 TWh (Wood Mackenzie 12 GW); NITI Aayog's buildings volume implies ≈90 TWh (16 GW IT × 40% utilisation × PUE 1.6), and the Ministry of Power's 26.3 GW of additional AI data-centre load by 2031-32 implies ≈140–175 TWh — 5–6% of CEA's 2,703 BU requirement for that year.
- **60% RE is affordable on an annual basis, expensive on an hourly basis.** Central case: 60% = ≈25 TWh, met by ≈6.5 GW solar + ≈4 GW wind via group captive/open access at an indicative landed ₹4.5–5.5/kWh; 60% hourly needs either ≈3.3–3.6 GW of contracted FDRE-RTC (SECI benchmark ₹5.25/kWh before transmission and open-access charges) or an overbuilt hybrid with ≈2 GW/8 GWh of batteries.
- **The binding constraints are wind, storage, open-access rules and transmission — not solar.** In the MoP 26.3 GW case, data centres would need ≈17 GW of new wind by FY32, about half of India's record FY26 wind additions (6.05 GW) every year; meanwhile the ISTS waiver phases out by July 2028 and states are moving to 8% in-kind banking charges with monthly settlement.

## Key Findings

1. **NITI Aayog has published a data-centre electricity projection — but only inside a non-policy scenario study.** *Scenarios Towards Viksit Bharat and Net Zero – Sectoral Insights: Buildings (Vol. 5)* (February 2026) projects India's IT load at 16 GW by 2030, 64 GW by 2050 and 105 GW by 2070, with electricity demand of "around 10 GW" (≈90 TWh) in 2030, ≈45 GW (≈390 TWh) in 2050 and ≈80 GW (≈700 TWh) in 2070, using Electricity = IT load × utilisation × PUE. The report carries a disclaimer that it "is not a statement of policy". The earlier article by NITI staff Nitin Bajpai and Venugopal Mothkoor (Indian Infrastructure, 10 December 2025) used S&P's 13 → 57 TWh instead, so NITI-affiliated numbers are internally inconsistent.
2. **Government load estimates have doubled within a year.** MeitY told the Rajya Sabha on 13 March 2026 that "electricity demand from data centres is estimated to reach 13.56 GW by 2031–32"; the Ministry of Power's written reply to Rajya Sabha Unstarred Question No. 956 on 27 July 2026 (MoS Shripad Naik) stated "an additional load of 26.3 GW from Artificial Intelligence (AI) Data Centres is projected by 2031–32, which is expected to be integrated into the grid and primarily served by renewable energy capacity." Separately, the Central Electricity Authority has set up a dedicated committee (with the Central Transmission Utility and Nasscom as members) to manage data-centre load "projected… from roughly 1.6 gigawatts currently to an estimated 17 gigawatts by the 2031-32 fiscal year" (Whalesbook, 2026; secondary source).
3. **The 26.3 GW is grid (facility) load, not IT capacity.** At PUE 1.4 it implies ≈19 GW of IT load by FY32 — roughly 4× the atlas central 2030 forecast and above even Wood Mackenzie's 12 GW for 2030. Treat it as a planning upper bound built from connection requests, not a demand forecast.
4. **National demand is growing ~6.4% a year and RE is being added at a record pace.** CEA's midterm review of the 20th EPS puts energy requirement at 2,388 BU (2029-30) and 2,703 BU (2031-32), versus 2,473.8 BU for 2031-32 in the original 20th EPS/NEP 2023; India added a record 55.3 GW of non-fossil capacity in FY2025-26, reaching 283.46 GW non-fossil (274.68 GW RE; 150.26 GW solar; ≈56 GW wind) on 31 March 2026.
5. **Firm RE prices have fallen to grid-competitive levels.** SECI discovered ₹5.25/kWh for 1 GW of FDRE round-the-clock power (August 2026) and ₹5.99–6.00/kWh for 4-hour assured peak power (FDRE-IX, 1.5 GW/6 GWh, August 2026), down from ₹6.27–6.28/kWh in FDRE-VII (February 2026).

## 1. Data Centre Growth and Capacity Forecast

### 1.1 Current operational capacity (2025–2026)

| Source | Date | Operational capacity | Notes |
|---|---|---|---|
| **Cushman & Wakefield (atlas standard)** | H1 2026 | **1,789 MW** (178 MW added in H1 2026) | Top 7 markets; pipeline 3,860 MW to 2030 (509 MW under construction + 3,351 MW planning); 147 DCs, 33 providers; $29.9 bn development capital needed to 2030 |
| MeitY (PIB, Rajya Sabha reply) | 13 Mar 2026 | ~1,500 MW (2025), up from ~375 MW in 2020 | Government figure |
| MeitY factsheet (DD India) | Aug 2026 | 1.57 GW installed | Projects ~8 GW by 2030; ~$70 bn investment underway + $90 bn announced |
| Industry report via DD News | End-2025 | 1,520 MW IT | 387 MW added in 2025 vs 191 MW in 2024; >4 GW IT by 2030 (23% CAGR) |
| CBRE (via SBI sector report) | 2025 | ~1.7 GW stock | ~500 MW of supply expected in 2026 |
| Wood Mackenzie | 2025 | 2.2 GW | Broader definition; 12 GW by 2030 |
| DC Market Insights tracker | Oct 2026 | 2,002 MW (119 operational facilities) | 4,443 MW pipeline; operator splits look unreliable (e.g., CtrlS 34.5 MW) |
| Ministry of Power reply (via PSU Watch) | 2026 | "approximately 1 GW" power requirement | Grid draw, not IT capacity; "details of electricity consumed by data centres are not centrally maintained" |

**Reconciliation:** the 1.5–2.2 GW spread is definitional (top-7 cities vs national; colocation vs colocation + hyperscale self-build; IT MW vs grid draw). The atlas standard of 1,789 MW is consistent with MeitY's 1.57 GW and CBRE's ~1.7 GW; Wood Mackenzie's 2.2 GW is the outlier. The Ministry of Power's "~1 GW" is an actual grid draw and is consistent with ~1.5–1.8 GW of partly leased IT capacity.

**By city (C&W H1 2026, IT MW):**

| City | Operational | Upcoming supply |
|---|---|---|
| Mumbai | 890 | 1,726 |
| Chennai | 214 | 368 |
| Bengaluru | 162 | 100 |
| Pune | 133 | 258 |
| Kolkata | 22 | 84 |
| Hyderabad + Delhi NCR (residual) | ≈368 | not itemised in the release |

Mumbai holds ≈50% of operational capacity; Wood Mackenzie notes Maharashtra and Tamil Nadu together account for ~65% of installed IT load, with the next wave spreading to Andhra Pradesh, Telangana, Uttar Pradesh and Karnataka. C&W flags Visakhapatnam as a new AI-focused destination.

**By operator (reported, mixed dates; IT MW):** STT GDC India ~390 MW across 30 DCs; NTT ~290 MW; CtrlS ~250 MW; Nxtra (Airtel) ~200 MW; Sify ~190 MW (Houlihan Lokey, Dec 2025) versus ~129 MW operational as of March 2026 (Blackridge) — a conflict likely reflecting built vs operational definitions. AdaniConneX describes an "existing 2 GW" platform (Reuters, Feb 2026), which almost certainly includes contracted and under-construction capacity rather than operating IT load.

### 1.2 Pipeline and announced mega-projects (announced ≠ committed)

| Project | Scale | Status | Power plan |
|---|---|---|---|
| Google AI hub, Visakhapatnam (with AdaniConneX, Airtel/Nxtra) | ~1 GW; ~$15 bn over 2026–2030 | Ground broken 28 April 2026; operations targeted ~2028 (secondary) | Co-investment in new transmission, clean generation and storage in Andhra Pradesh; Adani links supply to Khavda RE park |
| Adani Group AI data-centre plan | 2 GW → 5 GW; $100 bn by 2035 | Announced Feb 2026 | Renewable-powered; Khavda >10 GW operational of 30 GW planned; $55 bn more in RE incl. storage |
| Reliance Jamnagar | Multi-GW; >120 MW online H2 2026; $110 bn AI plan over 7 years | Under construction | 10 GW of "surplus" green power from Gujarat and Andhra Pradesh solar |
| Reliance–Meta, Jamnagar | 168 MW | Announced June 2026 | "Powered entirely by renewable energy"; desalinated seawater cooling; Meta has ~1 GW clean energy contracted in India |
| TCS HyperVault (TPG $1 bn) | ~1.2 GW initial phase | Announced Nov 2025 | Not specified |
| OpenAI–TCS | 100 MW → option to 1 GW | Announced Feb 2026 | Not specified |
| Microsoft | $3 bn cloud/AI (Jan 2025); Adani partnership in Hyderabad and Pune | Ongoing | Not specified in sources reviewed |
| AWS | $12.7 bn cloud investment to 2030 (2023 commitment) | Ongoing | Not specified in sources reviewed |
| Andhra Pradesh state target | Up to 6 GW DC capacity by 2030 (IT Minister Nara Lokesh) | Policy aspiration | AP Integrated Clean Energy Policy 2024 targets ~160 GW RE + pumped storage |

Summing announced gigawatt campuses (Google 1 GW, Reliance multi-GW, Adani to 5 GW, TCS 1.2 GW, OpenAI 1 GW) gives 10+ GW — well above C&W's 3.86 GW tracked pipeline. Most of this is announced, not committed; IT MW and campus "power" MW are routinely mixed in press releases.

### 1.3 Forecasts by source

| Source | Year | Forecast | Unit / basis |
|---|---|---|---|
| Cushman & Wakefield | 2030 | ~4.2 GW (1.3 GW 2025 + 2.9 GW); now 1,789 + 3,860 MW ≈ 5.6 GW if the full pipeline delivers | IT MW |
| Industry report via DD News | 2030 | >4 GW | IT MW |
| Colliers (via CEEW) | 2030 | >4.5 GW | IT MW |
| CEEW (citing Colliers, S&P) | 2030 | 4.5–6.5 GW | IT MW |
| S&P Global | 2030 | up to ~6.5 GW; 13 TWh (2024) → 57 TWh (~2.6% of demand) | IT MW / TWh |
| SBI sector report (Apr 2026) | 2030 | colocation >6.5 GW; JLL-type estimate ~2.1 GW by 2027 | IT MW |
| **Atlas central** | 2030 | **4.66 GW** | IT MW |
| MeitY factsheet | 2030 | ~8 GW | "power capacity" |
| Jefferies | 2030 | ~8 GW | IT MW |
| IEEFA | 2030 | 1.4 GW (2024) → 9 GW; ~3% of electricity | capacity |
| Wood Mackenzie | 2030 / 2040 | 12 GW (AI-dedicated 275 MW → 6,546 MW); 191 TWh by 2040 | operational capacity / TWh |
| **NITI Aayog Buildings Vol. 5** | 2030 / 2050 / 2070 | **16 / 64 / 105 GW IT** | IT GW; demand ≈10 / 45 / 80 GW average |
| MeitY (citing MoP), Mar 2026 | 2031-32 | 13.56 GW | grid demand |
| CEA (via MeitY/DD India) | 2031-32 | ~17 GW | grid demand |
| **MoP, RS Q956, 27 Jul 2026** | 2031-32 | **26.3 GW additional** | grid load |

Other houses named in the request (JLL, Knight Frank, ICRA, CRISIL, Avendus, Moody's, Arizton, NASSCOM, Deloitte, EY, BCG, McKinsey, TERI, Ember) were not verified in this pass, and no source reviewed gave a credible 2035 or 2047 IT-capacity number other than NITI's 2050/2070 path; this is a gap for the atlas.

**Interpretation:** the atlas central 4.66 GW sits at the conservative end and tracks the physical pipeline (what is actually under construction or in planning). The government numbers (13.56 → 17 → 26.3 GW) track connection requests, which historically overstate delivery. A credible secondary briefing (Telborg, 16 Aug 2026; not verified against the primary reply) states that, as of 14 May 2026, ≈17 GW of the 26.3 GW had lodged connectivity applications with State Transmission Utilities across 11 states and 9.3 GW had not — which would reconcile the 17 GW and 26.3 GW figures.

## 2. NITI Aayog Estimates and Other Demand Forecasts

### 2.1 What NITI Aayog has published

**(a) Data-centre-specific figures**

| NITI document | Date | Data-centre content |
|---|---|---|
| *Scenarios Towards Viksit Bharat and Net Zero – Sectoral Insights: Buildings (Vol. 5)* | Feb 2026 | IT load 16 GW (2030) at 40% utilisation and PUE 1.6 → "around 10 GW" demand; 12%/yr IT growth 2030–2050 to 64 GW (UF 50%, PUE 1.4 → ~45 GW); 6%/yr to 105 GW by 2070 (UF 60%, PUE 1.3 → ~80 GW); "pushing overall data centre electricity demand toward 700 TWh" |
| *Scenarios Towards Viksit Bharat and Net Zero: An Overview (Vol. 1)* | 9 Feb 2026 | Section 5.4.4 "Emerging Load: Data Centre Facilities"; Figure 5.14 projects DC electricity (TWh) for 2030/2050/2070 using the same formula |
| *Sectoral Insights: Power (Vol. 7)* | 10 Feb 2026 | Terms of reference (vii): "examine changes in load pattern considering… new emerging loads such as data centres"; DC demand is embedded in commercial demand, not shown separately |
| Bajpai & Mothkoor, "Powering the AI Era: Why efficiency standards must guide India's data centre build-out" (Indian Infrastructure) | 10 Dec 2025 | Personal views; cites S&P 13 → 57 TWh, "roughly 2.6–3 per cent of national generation"; formula energy ≈ IT load × utilisation × PUE |

**Converting NITI's figures to TWh (own calculation):** E = IT GW × UF × PUE × 8,760 h.
- 2030: 16 × 0.40 × 1.6 = 10.24 GW → **≈89.7 TWh**
- 2050: 64 × 0.50 × 1.4 = 44.8 GW → **≈392 TWh**
- 2070: 105 × 0.60 × 1.3 = 81.9 GW → **≈717 TWh**

NITI's 2030 IT capacity (16 GW) is 3.4× the atlas central figure, but its low utilisation (40%) means its implied consumption (~90 TWh) lands between Jefferies and Wood Mackenzie. Neither the Overview nor the Buildings volume reconciles with the S&P-based figure used by its own modelling staff a few weeks earlier.

**(b) Economy-wide electricity demand and supply (NITI Power Vol. 7, Table E.1)**

| Indicator | 2023-24 | CPS 2050 | CPS 2070 | NZS 2050 | NZS 2070 |
|---|---|---|---|---|---|
| Electricity consumption (TWh) | 1,541 | 6,544 | 9,718 | 8,070 | 12,997 |
| Per-capita consumption (kWh) | 1,400 | ~4,800 | ~7,400 | ~6,400 | ~10,000 |
| Total capacity incl. captive (GW) | 523 | 2,500–2,800 | 4,650–4,750 | 3,800–3,830 | 6,800–7,350 |
| VRE (solar + wind) capacity (GW) | 136 | 1,890–2,200 | 4,150–4,200 | 3,150–3,200 | 6,150–6,700 |
| Non-fossil share of capacity | 40% | 81–83% | 94–95% | 89% | 98% |
| Grid emission factor (kgCO₂/kWh) | 0.727 | 0.328 | 0.067 | 0.257 | 0.0 |
| BESS (GW) | <0.5 | 420–520 | 1,300–1,400 | 900–1,150 | 2,500–3,000 |
| Pumped hydro (GW) | 3.3 | 117 | 131–163 | 117 | 150–165 |
| Investment (USD trillion) | — | 3.5 (2025–50) | 5.2 (2050–70) | 5.15 (2025–50) | 9 (2050–70) |

Other headline numbers from the series: consumption grew from 874 TWh (2013-14) to 1,540 TWh (2023-24) at 5.8% CAGR; electricity's share of final energy rises from ~21% (2025) to ~40% (CPS) or ~60% (NZS) by 2070; non-fossil generation rises from 23% to 80–85%+ by 2070; nuclear scales from 8.8 GW to 100 GW by 2047 and >300 GW by 2070; cumulative power-sector investment is USD 8.79 trillion (CPS) or 14.23 trillion (NZS) to 2070, within an economy-wide USD 22.7 trillion. The Overview puts commercial-building electricity at ~137 TWh in 2025, residential at 385 TWh (→1,290 CPS / 925 NZS in 2070), and NZS green-hydrogen demand at 1,392 TWh (2050) and 2,764 TWh (2070). The Power volume models only 2050 and 2070 milestones — it does **not** publish 2030, 2035 or 2047 TWh, peak or RE-share figures, so it cannot be used directly for a 2030 data-centre test.

**Internal inconsistency to flag:** the Overview gives NZS 2070 commercial demand (excluding data centres) as 428 TWh, while the Buildings volume gives 476 TWh.

**(c) Earlier NITI 2030 work.** *A Report on Energy Efficiency and Energy Mix in the Indian Energy System 2030 Using India Energy Security Scenarios 2047* (posted July 2025) gives, per the user's lead (not re-verified line-by-line here), 2030 demand of 2,239 TWh, generation of 2,803 TWh, 562 GW installed and RE of 170 GW/15% of generation. Its RE assumption is already obsolete: actual RE capacity was 274.68 GW by March 2026. The IESS 2047 tool explicitly states its scenarios "do not constitute an official forecast of NITI Aayog in any manner."

### 2.2 CEA, MoP and MNRE comparison

| Source | 2026-27 | 2029-30 | 2031-32 | 2035-36 |
|---|---|---|---|---|
| 20th EPS / NEP 2023 (CEA) | 277.2 GW; 1,907.8 BU | — | 366.4 GW; 2,473.8 BU (consumption 2,133.4 BU) | — |
| **Midterm review of 20th EPS (CEA, via MoP RS Q953/Q956, 27 Jul 2026)** | 289 GW; 1,929 BU | 345 GW; 2,388 BU | 388 GW; 2,703 BU | 459 GW; 3,365 BU (lower case 446 GW; 3,215 BU) |
| NEP 2023 capacity | 609.6 GW | — | 900.4 GW (596.3 GW RE; BESS 47.24 GW/236.22 GWh; total storage 73.93 GW/411.4 GWh) | — |
| CEA Long-term National Resource Adequacy Plan (Mar 2026) | ~270 GW adequacy peak (vs EPS 289 GW) | — | — | 1,121 GW installed (solar ~509, wind ~155, coal ~315 GW); storage ~174 GW/888 GWh (secondary) |

Key points:
- The midterm review raised 2031-32 energy by **+229 BU (+9.3%)** and peak by **+21.6 GW** over the original EPS. CEA cites "emerging loads like data centres, green hydrogen production" but publishes no explicit data-centre line; whether the 26.3 GW sits inside or on top of the 388 GW peak is not stated (the MoP reply calls it "additional").
- Energy requirement grows at a **6.41% CAGR** (2024-25 to 2035-36) and peak at **5.58%**.
- The CEA adequacy plan's ~270 GW peak for 2026-27 conflicts with the EPS 289 GW; it appears to be an adjusted coincident peak, basis unverified.
- MNRE: 283.46 GW non-fossil and 274.68 GW RE at 31 March 2026; FY26 generation 1,845.9 BU, of which non-fossil 538.97 BU (29.2%); record 6.05 GW of wind and ~44.6 GW of solar added in FY26 (JMK), including 16.31 GW of distributed solar. Later secondary reports cite 300.50 GW non-fossil (31 July 2026) and 304.33 GW, with 168.04 GW solar and 58.52 GW wind (31 August 2026).
- Reaching **500 GW non-fossil by 2030** from ~304 GW needs ~196 GW in ~3.3 years (~59 GW/yr) — slightly above the FY26 record pace. Data centres will compete for this pipeline rather than sit on top of a slack system.
- IEA, BNEF, Ember, TERI and IEEFA long-run India power outlooks were not re-verified in this pass. IEA's global *Energy and AI* base case (415 TWh in 2024 → ~945 TWh by 2030, just under 3% of global demand) is a useful benchmark: India at 41–57 TWh in 2030 would be ~4–6% of global data-centre use.

## 3. Feasibility of 60% Renewable for Data Centres

### 3.1 Data-centre electricity scenarios (own calculations)

**Formula:** E (TWh) = IT capacity (GW) × utilisation/load factor × PUE × 8.76. Share of demand uses CEA midterm EPS energy requirement: 2,388 BU (FY2029-30) and 2,703 BU (FY2031-32). (1 TWh = 1 BU = 1,000 MU.)

| Scenario | IT GW | UF | PUE | TWh | Avg facility load (GW) | % of national demand |
|---|---|---|---|---|---|---|
| Today (atlas 1,789 MW, run-rate) | 1.79 | 0.70 | 1.54 | 16.9 | 1.9 | ~1.0% of FY26 generation |
| 2030 Low (C&W) | 4.2 | 0.65 | 1.45 | 34.7 | 4.0 | 1.5% |
| **2030 Central (atlas)** | **4.66** | **0.70** | **1.45** | **41.4** | **4.7** | **1.7%** |
| 2030 S&P-consistent | 6.5 | 0.70 | 1.40 | 55.8 | 6.4 | 2.3% |
| 2030 High (Jefferies) | 8.0 | 0.75 | 1.35 | 71.0 | 8.1 | 3.0% |
| 2030 NITI Buildings Vol. 5 | 16.0 | 0.40 | 1.60 | 89.7 | 10.2 | 3.8% |
| 2030 Very high (Wood Mackenzie) | 12.0 | 0.75 | 1.30 | 102.5 | 11.7 | 4.3% |
| FY32 MoP 13.56 GW (grid load) | — | LF 0.75 | — | 89.1 | 10.2 | 3.3% |
| FY32 CEA ~17 GW (grid load) | — | LF 0.75 | — | 111.7 | 12.8 | 4.1% |
| **FY32 MoP 26.3 GW (grid load)** | — | LF 0.60–0.75 | — | **138–173** | 15.8–19.7 | **5.1–6.4%** |

S&P's published 57 TWh is reproduced by 6.5 GW × 0.70 × 1.40. Reported vs estimated: the 13 TWh, 57 TWh, 13.56 GW, 17 GW and 26.3 GW figures are reported; all TWh conversions above are estimates.

### 3.2 What 60% RE means in energy and capacity

**Formulas:**
- RE energy needed: E_RE = 0.60 × E_DC
- Annual matching: Σ RE allocated ≥ 0.60 × Σ load over the year (in practice, monthly under Indian banking rules)
- Hourly (24×7 CFE) score: CFE = Σₕ min(RE_h, L_h) ÷ Σₕ L_h ≥ 0.60
- Capacity: P (GW) = E (TWh) ÷ (CUF × 8.76)

**CUF assumptions (Indian ranges):** solar 22% (19–25%) → 1.93 TWh per GW-yr; wind 35% (30–40%) → 3.07 TWh/GW-yr; FDRE-RTC contracted capacity at ~85% delivered → 7.4 TWh per contracted GW-yr. Open-access transmission/wheeling losses (typically several percent) and banking deductions (8% in kind where applicable) push requirements up by ~5–12%; the figures below are at the generator bus and should be grossed up accordingly.

| Scenario | E_DC (TWh) | 60% RE (TWh) | Solar-only (GW) | 50/50 hybrid: solar + wind (GW) | FDRE-RTC contracted (GW) |
|---|---|---|---|---|---|
| 2030 Low | 34.7 | 20.8 | 10.8 | 5.4 + 3.4 | 2.8 |
| **2030 Central** | **41.4** | **24.9** | **12.9** | **6.5 + 4.1** | **3.4** |
| 2030 S&P | 55.8 | 33.5 | 17.4 | 8.7 + 5.5 | 4.5 |
| 2030 High | 71.0 | 42.6 | 22.1 | 11.1 + 6.9 | 5.8 |
| 2030 Wood Mackenzie | 102.5 | 61.5 | 31.9 | 16.0 + 10.0 | 8.3 |
| FY32 MoP 26.3 GW (LF 0.75) | 172.8 | 103.7 | 53.7 | 26.9 + 16.9 | 14.0 |

**Share of national RE generation (estimate):** with ~500 GW non-fossil by 2030, RE generation is roughly 900–1,000 TWh (own estimate). Central-case data-centre RE (≈25 TWh) is ≈2.5–2.8% of that; the MoP 26.3 GW case (≈104 TWh by FY32) is ≈9–11%.

### 3.3 Annual vs hourly matching — why the difference matters

- **Solar alone cannot exceed roughly 40–45% hourly CFE** for a flat 24×7 data-centre load, however much is built, because it delivers only in daylight hours; the surplus is either banked (annual/monthly accounting) or curtailed.
- **Annual 60% with solar-heavy portfolios** is a paper outcome that relies on banking: under the Green Energy Open Access Rules framework consumers can bank at least 30% of monthly consumption, and the Forum of Regulators model regulation sets banking charges "in kind @ 8% of the energy banked" with at least monthly settlement.
- **Hourly 60%** for the central case (≈4.7 GW average load) needs ≈2.8 GW of clean supply in every hour. Two practical routes:
  - **FDRE-RTC:** SECI's August 2026 RTC contract requires a demand fulfilment ratio of 90% in peak hours, 80% off-peak (70% for two monsoon months) and 90% annually. ≈3.3–3.6 GW contracted at ~85% delivers ≈24–25 TWh with an hourly profile that gets close to 60% CFE on its own (estimate).
  - **Overbuilt hybrid plus BESS:** ≈8 GW solar + ≈5 GW wind (≈30.7 TWh gross, ≈1.23× the 60% target) plus ≈2 GW/8 GWh of 4-hour storage to shift midday surplus into the evening peak. Indicative CFE ≈60%; it should be validated with hourly site data.

### 3.4 Costs, tariffs and charges (₹)

| Item | Value | Source / status |
|---|---|---|
| Solar auction tariffs | ~₹2–3/kWh | NITI Power Vol. 7 |
| Wind auction tariffs | ~₹3–4/kWh | NITI Power Vol. 7 |
| FDRE-RTC (1 GW, 25-yr PPA) | ₹5.25–5.26/kWh | SECI, Aug 2026 |
| FDRE 4-h assured peak (FDRE-IX, 1.5 GW/6 GWh) | ₹5.99–6.00/kWh | SECI, Aug 2026 |
| FDRE 4-h peak (FDRE-VII, 1.2 GW/4.8 GWh) | ₹6.27–6.28/kWh | SECI, Feb 2026 |
| ISTS charges if not waived | ~₹1–2/kWh; waiver at 25% of charges for projects commissioned Jul 2025–Jun 2026, rising 25%/yr to full charges from Jul 2028 | Business India; Construction World |
| Net open-access charges, ISTS green OA, top-10 C&I states | ~₹2–3.5/kWh (with waivers) | JMK Research, Mar 2025 |
| Banking | 8% in kind (FoR model; Tamil Nadu from 1 Oct 2025; UP); Gujarat ₹1.50/kWh interim, draft ₹1/kWh with ₹0.50–1.50 band | TNERC; UPERC; GERC |
| Tamil Nadu specifics | Monthly settlement; no banking for third-party OA; unused banked energy bought at 75% of RE tariff | TNERC GEOA Regulations 2025 |

**Indicative landed cost (own estimates):**
- Group-captive solar-wind hybrid, annual matching: generation ₹3.0–3.5 + OA/transmission/banking ₹1.5–2.0 → **₹4.5–5.5/kWh**.
- FDRE-RTC via bilateral or discom green-tariff pass-through: ₹5.25 + ₹1–2 → **₹6.3–7.3/kWh**.
- Hybrid + BESS for hourly 60%: **₹5.5–6.5/kWh**.
- For comparison, in Maharashtra (the largest data-centre state) MERC's MSEDCL multi-year tariff order sets the HT II commercial energy charge at ₹9.26/unit for FY2025-26 and ₹8.72/unit for FY2026-27, plus a ₹565/kVA/month demand charge, and HT I(A) industry at ₹7.11/unit for FY2026-27 (kVAh-billed where applicable). Firm green power is therefore at or below grid parity for most large consumers.

**Indicative capex (unverified unit costs: solar ₹4.0–4.5 crore/MW, wind ₹7–8 crore/MW, BESS ₹1.2–1.8 crore/MWh), central case:**
- Annual-matching hybrid (6.5 GW solar + 4.1 GW wind): ≈₹27,600 crore + ≈₹30,500 crore ≈ **₹58,000 crore**.
- Hourly hybrid (8 GW solar + 5 GW wind + 8 GWh BESS): ≈₹34,000 + ₹37,500 + ₹12,000 crore ≈ **₹84,000 crore**.
- **Land:** ~4–5 acres/MW for ground-mount solar → 6.5 GW ≈ 26,000–32,500 acres (≈105–130 km²); wind's direct footprint is small but site-constrained.

### 3.5 Feasibility against the national RE pipeline

**Required build per year vs FY26 national additions (solar ~44.6 GW; wind 6.05 GW), annual-matching 50/50 hybrid:**

| Scenario | Solar GW/yr | % of FY26 solar adds | Wind GW/yr | % of FY26 wind adds |
|---|---|---|---|---|
| 2030 Central (4-yr build) | 1.6 | 3.6% | 1.0 | 17% |
| 2030 High (Jefferies) | 2.8 | 6% | 1.7 | 29% |
| 2030 Wood Mackenzie | 4.0 | 9% | 2.5 | 41% |
| FY32 MoP 26.3 GW (~5.5-yr build) | 4.9 | 11% | 3.1 | **51%** |

Existing contracts reduce the incremental need: Nxtra reports 390+ MW of RE capacity, Sify has contracted 231+ MW, Meta ~1 GW, and CtrlS signed an MoU with NTPC Green Energy for ~2 GW (Nov 2025).

**Storage:** the central hourly portfolio's ~8 GWh is ≈3% of NEP 2023's 236 GWh of BESS for 2031-32; the MoP case (~33 GWh) is ≈14%. CEA's adequacy work already calls for 6 GW/24 GWh of BESS in 2026-27 alone (MoP RS Q952).

**Transmission and rules:**
- The NEP plans ≈₹9.16 lakh crore of transmission spending over 2022–32; 154 ISTS projects are under construction (MoP RS reply, 27 Jul 2026).
- The ISTS waiver for solar/wind ended for projects commissioned after 30 June 2025 (phased reinstatement to 100% by July 2028); the waiver for pumped storage and co-located BESS was extended to 30 June 2028.
- A CERC draft Fifth Amendment (31 July 2026, secondary report) proposes relief for transmission-delayed projects and extends the waiver for storage integrated with RE plants from 12 to 25 years.
- NITI's Power volume argues for viability gap funding instead of blanket transmission waivers and for bringing captive consumption "within the grid supply framework" — a signal that group-captive economics may tighten.
- CCTS currently obligates energy-intensive sectors; data centres are not obligated, so RECs and voluntary offsets remain the only compliance-free instruments.

**State considerations:**

| State | Data-centre role | Notes for 60% RE |
|---|---|---|
| Maharashtra (Mumbai, Pune) | ~1,023 MW operational of 1,789 MW; 1,984 MW upcoming | Largest load centre; RE must be imported or banked. A Government Resolution of 9 June 2026 expanded Green Integrated Data Centre Parks from 3 to 20 (statewide) and, per Power Peak Digest (15 June 2026), "reduces the mandatory green energy usage requirement for core data center activities from 100% to 51%". It adds a ₹1/unit tariff subsidy for 10 years on ₹30,000-crore investments and targets "30–40 GW of green-energy-based data center capacity" by 2047 |
| Tamil Nadu (Chennai) | 214 MW + 368 MW upcoming | Strong wind; but 8% banking, monthly settlement and no banking for third-party OA since Oct 2025 favour captive or group-captive structures |
| Telangana (Hyderabad) | Part of ≈368 MW residual; fast growth expected | Telangana 20th EPS requirement 1,20,549 MU by 2031-32 |
| Karnataka (Bengaluru) | 162 MW + 100 MW | RE policy 2022–27 targets +10 GW |
| Uttar Pradesh (Noida) | Growing (Adani, Yotta campuses) | Banking capped at the higher of 25% of injection or 30% of consumption; off-peak-banked energy usable only off-peak |
| Andhra Pradesh (Vizag) | Google 1 GW; state target 6 GW by 2030 | ~160 GW RE + pumped storage policy; best placed for co-located hourly-matched campuses |
| Gujarat (Jamnagar) | Reliance/Meta campuses | Khavda and Reliance RE; banking ₹1.50 → draft ₹1/kWh |

**Nuclear:** the SHANTI Act 2025 opens nuclear to private participation (100 GW by 2047; five indigenous SMRs by 2033 with a ₹20,000 crore outlay). Draft rules reportedly allow captive nuclear for data centres (secondary). This is irrelevant for 2030 and at best a post-2033 firm-power option.

### 3.6 Realistic portfolios to reach 60% (2030 central case: 41.4 TWh load; 24.9 TWh RE)

| # | Portfolio | Indicative build | Matching achieved | Landed ₹/kWh | 2030 feasibility | Pros / cons |
|---|---|---|---|---|---|---|
| **P1** | Group-captive/OA solar-wind hybrid with banking | 6.5 GW solar + 4.1 GW wind | 60% annual; ~40–45% hourly | 4.5–5.5 | **High** | Cheapest; proven route. Exposed to banking caps and 8% charges, ISTS reinstatement, state OA friction |
| **P2** | FDRE-RTC PPAs (SECI-style or bilateral) | 3.3–3.6 GW contracted (≈9–11 GW RE + 2–3 GW/8–12 GWh storage behind it, estimate) | ~60% hourly and annual | 6.3–7.3 | **Medium** | Best hourly quality; SECI power flows to discoms, so data centres need green tariffs or bilateral FDRE; delivery risk on new FDRE projects |
| **P3** | Overbuilt hybrid + co-located/near-site BESS | 8 GW solar + 5 GW wind + 2 GW/8 GWh | ~60% hourly; ~74% annual | 5.5–6.5 | **Medium** (strong for AP/Gujarat AI campuses) | Physical 24×7 credibility; highest capex (~₹84,000 crore); land and connectivity |
| **P4** | Blended: P1 at 40% + discom green tariff / G-DAM / G-TAM 10% + RECs ≤10% | ≈4.3 GW solar + 2.7 GW wind + market purchases | 60% annual (paper) | 4.5–5.5 | **High** | Fast and flexible; REC/unbundled portion has weak additionality; reputational risk |
| **P5** | P1 + pumped-storage capacity contracts (later nuclear/SMR) | P1 + 1–2 GW PSP contracts | 60–70% hourly post-2030 | 5.5–7 | **Low by 2030** | Long-duration firming; the PSP pipeline (about 7.2 GW across 10 projects in operation and 11.6 GW across 10 projects under construction as of December 2025, per CEA's "Roadmap to 100 GW of Hydro Pumped Storage Projects", Jan 2026) is mostly utility-contracted; nuclear post-2033 |

**Recommended mix:** P1 as the base (≈60% of the RE requirement) plus P2 for ≈30–40% gets the sector to 60% annual and ≈50–55% hourly at ≈₹5–6/kWh. P3 is the right template for new gigawatt AI campuses in Andhra Pradesh and Gujarat. Cap RECs at ≤10%.

**Scaling:** multiply the build column by ≈1.7× for the Jefferies case, ≈2.5× for Wood Mackenzie and ≈4.2× for the MoP 26.3 GW FY32 case (≈27 GW solar + ≈17 GW wind, or ≈14 GW of RTC contracts).

### 3.7 Carbon and water implications (central 2030 case)

- **Carbon (0.71 tCO₂/MWh, CEA/atlas):** all-grid 41.4 TWh → **29.4 MtCO₂/yr**; at 60% RE the residual is 16.6 TWh → **11.8 MtCO₂**, avoiding ≈**17.6 MtCO₂/yr**. In the MoP FY32 case (172.8 TWh), all-grid emissions would be ≈122.7 Mt, and 60% RE avoids ≈73.6 Mt. Avoided emissions are only real if the RE is additional and, ideally, hourly-matched. Note NITI's grid factor of 0.727 for 2023-24 versus Argus's reported 0.72 for 2025 and the atlas 0.71 — immaterial differences.
- **Water at the meter (grid ~3.0 L/kWh; solar/wind ~0.05–0.1 L/kWh):** all-grid 41.4 TWh → ≈**124 million m³/yr**; at 60% RE → 16.6 TWh × 3.0 + 24.9 TWh × 0.075 ≈ **51.6 million m³**, saving ≈**72.6 million m³/yr**. This excludes on-site cooling water (WUE), which can be comparable in magnitude and is not affected by the power mix.

## 4. Recommendations

**For the atlas:**
1. Replace the line "NITI has no DC estimate" with: NITI Buildings Vol. 5 (Feb 2026) projects 16 GW IT and ~10 GW (~90 TWh) by 2030, flagged as a scenario-study figure with a non-policy disclaimer.
2. Show three demand bands: market (35–57 TWh), NITI (~90 TWh) and government load (MoP 26.3 GW → 140–175 TWh by FY32). Always label IT MW versus grid MW.
3. Add a "60% RE requirement" layer: TWh, GW of solar/wind, and GWh of storage per scenario, with both annual and hourly metrics.

**For policymakers:**
1. **Mandate data-centre energy disclosure** (BEE/CEA) — the Ministry of Power concedes data-centre consumption is "not centrally maintained".
2. **Create a data-centre green-tariff/FDRE pass-through product** so data centres can buy SECI-style RTC power through discoms without open-access friction. There is already a state precedent: MERC approved ₹5.90/kWh for MSEDCL's long-term purchase of 2,500 MW of round-the-clock power (Adani Power won the 17 March 2026 e-reverse auction), explicitly to meet "increasing demand for traceable green energy from sectors such as data centers" (SolarQuarter, 4 June 2026).
3. **Standardise banking** around the FoR 8%-in-kind model while allowing time-of-day banking for storage-backed RE.
4. **Use the CEA connectivity queue (~17 GW applied) to plan wind-solar-storage zones and transmission** in Andhra Pradesh, Tamil Nadu, Gujarat and Maharashtra.
5. **Set PUE/WUE standards for new builds**, as NITI-affiliated authors argue; every 0.1 drop in PUE in the central case saves ≈2.9 TWh/yr.

**For operators:**
1. Lock in group-captive hybrid capacity before full ISTS reinstatement (July 2028).
2. Add FDRE-RTC for hourly quality.
3. Report hourly CFE alongside annual RE %.

## 5. Caveats, Data Gaps and Disagreements

- **IT vs grid MW confusion is pervasive:** MeitY's "1.57 GW installed power capacity", MoP's "26.3 GW load" and consultancy IT MW are not comparable without PUE and load-factor assumptions.
- **Unverified primary details:** the "14 May 2026 / 11 states / 17 GW applied vs 9.3 GW" breakdown and any state-wise split of the 26.3 GW were found only in secondary briefings. The CEA adequacy plan PDF could not be retrieved, so the storage and capacity mix for 2035-36 rely on media summaries.
- **NITI internal inconsistencies:** NITI Buildings (16 GW IT, ~90 TWh in 2030) versus NITI staff citing S&P (57 TWh); Overview versus Buildings commercial 2070 demand (428 vs 476 TWh); the IESS-2030 report's 170 GW RE is already exceeded.
- **CEA inconsistencies:** midterm EPS 289 GW versus adequacy plan ~270 GW for 2026-27.
- **Operator capacities conflict** (e.g., Sify 190 vs 129 MW), and the AdaniConneX "2 GW existing" figure likely includes pipeline.
- **All capex, land, landed-cost and hourly-CFE figures in Section 3 are indicative engineering estimates**, not quotes; hourly CFE requires site-specific 8,760-hour modelling.
- **Forecasts not verified in this pass:** JLL, Knight Frank, ICRA, CRISIL, Avendus, Moody's, Arizton, NASSCOM, Deloitte, EY, BCG, McKinsey, TERI, Ember and IEA India-specific forecasts, and the state data-centre policy capacity targets beyond Andhra Pradesh.

## Sources

1. niti — https://www.niti.gov.in/sites/default/files/2026-02/Scenarios-Towards-Viksit-Bharat-and-Net-Zero-Sectoral-Insights-Buildings.pdf
2. niti — https://www.niti.gov.in/sites/default/files/2026-02/Scenarios-Towards-Viksit-Bharat-and-Net-Zero-Sectoral-Insights-Power.pdf
3. indianinfrastructure — https://indianinfrastructure.com/2025/12/10/powering-the-ai-era-why-efficiency-standards-must-guide-indias-data-centre-build-out/
4. pib — https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=1928750&reg=48&lang=2
5. pib — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2250039&lang=1&reg=3
6. testbook — https://testbook.com/question-answer/according-to-the-ministry-of-new-and-renewable-ene--69d8a911910e59751c104934
7. powermin — https://www.powermin.gov.in/static/uploads/2026/07/f59419a881df9acc24bed8753f6d9fda.pdf
8. mvapulse — https://www.mvapulse.com/seci-discovers-%E2%82%B95-99-kwh-tariff-for-4-hour-peak-power/
9. energy-box — https://www.energy-box.com/post/seci-awards-1-gw-round-the-clock-renewable-energy-tender-at-record-low-tariff-of-inr-5-25-kwh
10. now — https://now.solar/2026/02/06/solar-energy-corporation-of-india-seci-awards-4-8-gwh-power-supply-contracts-in-fdre-auction-constructionreviewonline-com/
11. solarquarter — https://solarquarter.com/2026/04/07/mnre-india-achieves-record-6-05-gw-wind-capacity-addition-in-fy-2025-26-cumulative-capacity-crosses-56-gw/
12. newkerala — https://www.newkerala.com/news/a/indias-data-center-capacity-surges-1789-mw-jan-june-969.htm
13. cushmanwakefield — https://www.cushmanwakefield.com/en/india/news/2026/09/india-data-centre-h1-2026-update
14. cushmanwakefield — https://www.cushmanwakefield.com/en/india/news/2026/09/gautam-saraf-in-conversation-with-zee-business-on-india-data-centre-expansion
15. pib — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2239616&reg=48&lang=2
16. ddindia — https://ddindia.co.in/2026/09/indias-data-centre-capacity-surges-to-1-57-gw-set-to-reach-8-gw-by-2030/
17. sansad — https://sansad.in/getFile/lsapps/loksabhaquestions/annex/188/AU2990_SqOT7j.pdf
18. ddnews — https://ddnews.gov.in/en/indias-data-centre-capacity-more-than-doubled-in-2025/
19. bank — https://sbi.bank.in/documents/57189647/58231607/Sector+Report+DataCentre.pdf/f1919592-ee66-b50b-ea20-75fbb27c9bb5?t=1779885206866
20. woodmac — https://www.woodmac.com/press-releases/india-data-centre-capacity-to-reach-12-gw-by-2030/
21. business-standard — https://www.business-standard.com/amp/industry/news/ai-data-centres-add-26-3-gw-india-power-demand-fy32-govt-126072900236_1.html
22. dcmarketinsights — https://www.dcmarketinsights.com/data/data-centers/india/
23. psuwatch — https://psuwatch.com/newsupdates/india-a-preferred-destination-for-data-centres-no-shortage-of-power-piyush-goyal
24. w — https://w.media/indias-dc-capacity-almost-touched-1-5-gw-in-2025-it-ministry/
25. cushmanwakefield — https://www.cushmanwakefield.com/en/india/insights/india-data-centre-update
26. hl — http://cdn.hl.com/pdf/2025/real-estate-highlight-data-center-india-edition.pdf
27. blackridgeresearch — https://www.blackridgeresearch.com/blog/list-of-top-ten-largest-data-center-companies-in-india
28. Yahoo Finance — https://finance.yahoo.com/news/indias-adani-invest-100-billion-070737912.html
29. edgeconnex — https://www.edgeconnex.com/news/press-releases/adani-and-google-partner-to-build-indias-largest-data-centre-campus-in-visakhapatnam/
30. startupfeed — https://startupfeed.in/google-breaks-ground-vizag-ai-hub-adani-airtel-15-billion/
31. Yahoo Finance — https://finance.yahoo.com/news/adani-group-invests-100bn-india-100616665.html
32. TechCrunch — https://techcrunch.com/?p=3094292
33. crnasia — https://www.crnasia.com/india/news/2026/reliance-becomes-meta-s-ai-infrastructure-partner-in-india-with-first-data-centre-build
34. latestly — https://www.latestly.com/technology/meta-reliance-partnership-tech-giants-unveil-indias-1st-ai-enabled-data-centre-in-jamnagar-7467321.html/amp
35. TechCrunch — https://techcrunch.com/2025/11/20/indias-tcs-gets-tpg-to-fund-half-of-2b-ai-data-center-project
36. malaymail — https://www.malaymail.com/news/money/2026/02/19/openai-tcs-to-build-ai-data-centre-infrastructure-in-india/209659
37. nationalheraldindia — https://www.nationalheraldindia.com/business/google-adani-to-invest-usd-15-billion-in-indias-largest-ai-hub-in-andhra-pradesh
38. ceew — https://www.ceew.in/publications/how-is-data-centre-infrastructure-in-india-shaping-power-and-water-use
39. thehansindia — https://www.thehansindia.com/tech/indias-data-centre-capacity-likely-to-touch-8-gw-by-2030-1121779
40. ieefa — https://ieefa.org/resources/indias-power-hungry-data-centre-sector-crossroads
41. indiablooms — https://www.indiablooms.com/life/minister-reveals-indias-data-centre-capacity-exploded-from-375-mw-to-1575-mw-in-just-six-years/details
42. telborg — https://telborg.com/datacentre-briefings/256
43. niti — https://www.niti.gov.in/node/2162
44. newsonair — https://www.newsonair.gov.in/niti-aayog-releases-4-study-reports-on-scenarios-towards-viksit-bharat-and-net-zero
45. tribuneindia — https://www.tribuneindia.com/news/india/power-share-in-energy-consumption-to-hit-60-by-2070-niti-aayog-report/
46. argusmedia — https://www.argusmedia.com/en/news-and-insights/latest-market-news/2786864-india-needs-22.7-trillion-to-hit-net-zero-niti-aayog
47. madhyamamonline — https://madhyamamonline.com/india/india-needs-1423-trillion-investment-for-net-zero-power-transition-by-2070-niti-aayog-1493744
48. downtoearth — https://www.downtoearth.org.in/energy/niti-aayog-report-urges-bold-energy-reforms-to-achieve-30-trillion-gdp-by-2047-net-zero-by-2070
49. ddnews — https://ddnews.gov.in/en/viksit-bharat-by-2047-achievable-alongside-net-zero-by-2070-niti-aayog-study/
50. niti — https://www.niti.gov.in/sites/default/files/2025-07/A-Report-on-Energy-Efficiency-and-Energy-Mix-in-the-Indian-Energy-System-2030-Using-India-Energy-Security-Scenarios-2047.pdf
51. iess2047 — https://iess2047.gov.in/_/theme/documents/IESS_v3_one_pagers.pdf
52. telanganatoday — https://telanganatoday.com/telangana-electrical-energy-requirement-to-touch-120549-mu-in-2031-32
53. thegk247 — https://www.thegk247.com/ceas-20th-electric-power-survey-eps-midterm-review/
54. downtoearth — https://www.downtoearth.org.in/energy/indias-power-capacity-to-double-to-1121-gw-by-2035-36-as-solar-leads-energy-transition-ceas-20th-electric-power-survey-midterm-review
55. powerline — https://powerline.net.in/2023/06/01/national-electricity-plan-volume-i-generation-cea/
56. cea — https://cea.nic.in/wp-content/uploads/notification/2026/04/Long_term_National_Resource_Adeqaucy_Plan2026_27_to_2035_36.pdf
57. renewablewatch — https://renewablewatch.in/2026/04/15/strategic-framework-cea-releases-the-national-adequacy-plan-up-to-2035-36/
58. jmkresearch — https://jmkresearch.com/india-installs-record-44-gw-solar-and-6-gw-wind-capacity-in-fy2026/
59. karmactive — https://www.karmactive.com/india-h1-2026-solar-wind-record-26-gw/
60. freereports — https://freereports.online/reports/india-renewable-energy
61. Wikipedia — https://en.wikipedia.org/wiki/Environmental_impact_of_AI
62. iea — https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai
63. saurenergy — https://www.saurenergy.com/solar-energy-news/gerc-proposes-lower-banking-charges-for-green-energy-open-access-12062017
64. forumofregulators — https://forumofregulators.gov.in/Data/Reports/Revised%20Model%20regulation%20GEOA.pdf
65. pv-magazine-india — https://www.pv-magazine-india.com/2026/08/07/secis-1-gw-fdre-rtc-power-tender-discovers-inr-5-25-kwh-tariff/
66. pv-magazine — https://www.pv-magazine.com/2026/08/10/secis-1-gw-fdre-rtc-power-tender-discovers-inr-5-25-kwh-tariff/
67. renewablewatch — https://renewablewatch.in/2026/08/24/seci-announces-winners-of-6-gwh-assured-peak-power-tender/
68. thebatterymagazine — https://www.thebatterymagazine.com/seci-awards-peak-power-fdre-contracts-to-adyant-enersol-serentica-ampin-acme-solar/
69. constructionworld — https://www.constructionworld.in/energy-infrastructure/power-and-renewable-energy/waiver-of-ists-charges-waon-re-projects-could-grow-open-access-projects/32236
70. businessindia — https://businessindia.co/magazine/focus/indias-green-ambitions-at-risk-ists-charge-waiver-expiry-threatens-renewable-projects
71. pv-magazine-india — https://www.pv-magazine-india.com/2025/03/18/in-india-ists-connected-green-open-access-market-to-add-40-gw-capacity-by-2030/
72. neufin — https://neufin.co/blog/tamil-nadu-open-access-regulation-2025-for-business/
73. optenpower — https://feeds.optenpower.com/blog/uttar-pradesh-open-access-regulation
74. researchandmarkets — https://www.researchandmarkets.com/report/india-data-centers-market?w=12
75. reslink — https://www.reslink.org/blogs/cerc-ists-waiver-relief/
