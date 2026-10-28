<!-- Report 31 of the India Data Centre Atlas research series (Scope 1, 2 and 3 water for Indian data centres; atlas chapter 9). Produced with AI-assisted web research, 22 Oct 2026, and kept as written at the time. The atlas standards register (src/data/standards.js) is authoritative where figures differ (for example India grid water 2.9 L/kWh and grid CO₂ 0.675 t/MWh after the October 2026 corrections). -->

# Scope 1, 2 and 3 Water Consumption for Indian Data Centres: Framework, Factors and Worked Calculations

For an Indian data centre, Scope 2 water (water evaporated at power stations, mostly at coal plants, to make the electricity the site buys) is the largest of the three scopes in every case modelled: about 75–96% of total consumption. Scope 1 (on-site) water only matters when the site uses evaporative cooling towers, where it is about 20–23%. Scope 3 (supply chain: chips, servers, building, upstream coal) comes to about 2–3%, even for a GPU-dense AI hall. In India, switching from cooling towers to dry or closed-loop cooling saves water overall, because the grid would need a water intensity above about 13–16 L/kWh before the extra electricity cost more water than the cooling towers evaporate. The Indian grid is roughly 2.5–9.4 L/kWh. Two results follow for the atlas: dry cooling is the right default, and the biggest remaining lever is clean-power procurement, not WUE.

## TL;DR
- **What dominates:** Scope 2 is the largest scope, at about 4.2 m³ consumed per MWh delivered from India's national grid (central case, hydro counted at net evaporation). A 50 MW AI hall in Bengaluru at 80% load consumes about 1.8 million m³/yr in total with dry cooling, or about 2.1 million m³/yr with cooling towers. Scope 1 ranges from about 0.06 L/kWh IT (dry) to about 1.3 L/kWh IT (cooling towers). Scope 3 hardware water is less than 1% of the total, even with GB200-class GPUs replaced every five years.
- **Why dry cooling wins:** A cooling-tower site saves about 7% of electricity, but that saving avoids far less grid water than the towers evaporate on site. The ranking only flips if the grid's water intensity exceeds about 13–16 m³/MWh. Weighting for water stress makes dry cooling look even better: on-site water in Bengaluru, Chennai or Delhi NCR is drawn from more stressed sources than the average grid power station.
- **The biggest uncertainty is how hydropower is counted:** scoring reservoir evaporation as zero, as net, or as gross moves India's grid factor from about 2.5 to 4.2 to 9.4 L/kWh. In Karnataka, where hydro has a large share, the swing is even larger. The atlas should report all three hydro conventions, plus consumption and withdrawal separately and an AWARE-weighted figure, and should not merge them into one number.

## Key Findings

1. **Scope 2 dominates.** Most Indian electricity comes from coal: 73% in FY2024-25 (1,332 of 1,826 BU, CEA provisional data compiled by Vasudha Foundation). Most of that coal capacity uses wet cooling towers.
   - The MoEFCC's December 2015 notification (S.O. 3305(E)) caps specific water consumption at 3.5 m³/MWh for older plants. For plants built after 1 January 2017 the cap was 2.5 m³/MWh, relaxed to 3.0 m³/MWh in June 2018, with a zero-liquid-discharge requirement.
   - Compliance is weak. CSE's 2021 report *Water Inefficient Power* surveyed over 154 GW across 132 coal plants (about 75% of Indian coal capacity) and found 59 GW non-compliant against 64 GW compliant, with about half of freshwater-based plants failing; around 65% of the non-compliant capacity was state-owned, and Uttar Pradesh and Maharashtra were the worst states. Fitting flue-gas desulphurisation adds about 0.3 m³/MWh.
   - Indian closed-loop coal plants consume roughly 2.8–3.4 m³/MWh, about twice the world average of 1.2–1.5 m³/MWh; CSE's 2021 report likewise states that Indian power plants with cooling towers consume twice as much water as their global counterparts.

2. **Hydro accounting is the biggest unresolved issue.** The estimates for reservoir evaporation span more than an order of magnitude:
   - Mekonnen and Hoekstra's 35-plant average is 68 m³/GJ, about 245 m³/MWh, and their global average is 22 m³/GJ, about 79 m³/MWh.
   - Herath's net-evaporation method gives 1.55–6.05 m³/GJ, about 5.6–21.8 m³/MWh.
   - A 2021 *Environmental Research Letters* study of 143 multipurpose US reservoirs (1985–2014) found an average of about 26.2 m³/MWh, with individual reservoirs ranging from 0.02 to 1,200 m³/MWh.
   - Allocating evaporation to irrigation, flood control and drinking-water uses shrinks the hydro share further.

3. **Withdrawal and consumption diverge at both the site and the power plant.**
   - **On site:** with cooling towers at 4 cycles of concentration, withdrawal is about 1.33× consumption. The difference leaves the site as blowdown.
   - **At the plant:** once-through coal plants withdraw 70–200 m³/MWh (CSE), against about 4 m³/MWh for cooling-tower plants.
   - Of the reporting metrics, Green Grid WUE and the EU WUE (water input ÷ IT energy) both measure *water input*. They are closer to withdrawal than to consumption.

4. **Scope 3 is real but small in India.**
   - TSMC used 129 million m³ of water in 2024 for 12.9 million 12-inch-equivalent wafers. That is about 10 m³ per wafer, or about 14 L per cm². Its unit water use was 161.0 L per wafer-layer, up 14.3% against a target of −2.7%.
   - Morrison et al. (ICLR 2025) put fab water at 100.4 L per H100 die, using 12.33 L/cm².
   - Our bottom-up estimate for each GB200 GPU, including its share of HBM, the Grace CPU, the rack and upstream inputs, is about 2.6 m³. At India's grid water intensity, that is about 1% of the GPU's operational water over five years.
   - Upstream coal mining and washing (TERI: 0.25 m³/t for opencast mines, 0.22 m³/t of washed coal) adds about 0.16 m³ per MWh of grid power. That is larger than the hardware term.

5. **Per prompt,** an India-hosted LLM query using 0.20 Wh of IT energy (comparable to Google's measured median Gemini prompt) consumes about **1.0 mL with dry cooling** and **about 1.2 mL with cooling towers**. More than 75% of that is Scope 2. Google's published 0.26 mL counts on-site water only, with no Scope 2 or Scope 3.

6. **Disclosure in India is thin and uses inconsistent boundaries.**
   - Nxtra by Airtel publishes assured site-level volumes. Its FY2025-26 report gives 124,306 KL total consumption, of which large data centres account for 118,501 KL.
   - A Down To Earth review found that AdaniConneX, CtrlS and Nxtra publish no WUE. STT reported 0.73 L/kWh and NTT 0.72 L/kWh across its portfolio (1.42 at evaporative sites) in 2024.
   - No Indian operator that we found reports Scope 2 or Scope 3 water.

## 1. Framework and Definitions

### 1.1 Scope boundaries, by analogy with the GHG Protocol

| Scope | Included | Typical Indian sources | Notes |
|---|---|---|---|
| **Scope 1 – direct on-site** | Cooling-tower make-up (evaporation, drift, blowdown); adiabatic and evaporative pads; indirect evaporative coolers; humidification; domestic use (staff and canteen); landscaping; fire-system testing and top-up; diesel generator (DG) radiator top-up and testing; STP and RO reject | Municipal supply (BWSSB, MCGM, CMWSSB, HMWSSB), CGWA-permitted borewells, private tankers, treated sewage (TSE) | Report withdrawal by source, discharge and consumption separately. Treated wastewater still counts as withdrawal, but at a lower stress weight. |
| **Scope 2 – purchased energy** | Water consumed and withdrawn at power stations to generate the electricity bought: thermal cooling, boiler make-up, ash handling, FGD, hydro reservoir evaporation, PV module cleaning; also purchased chilled water or steam | DISCOM grid supply, open-access green PPAs, captive or group-captive RE, RECs/I-RECs | Report both location-based and market-based figures, as for carbon. Include T&D losses by grossing up delivered kWh to generated kWh. |
| **Scope 3 – value chain** | Upstream: fab water for logic, HBM/DRAM and NAND; PCB and assembly; metals (copper, steel, aluminium); concrete and cement; construction-site water; batteries (lithium brine or spodumene); diesel refining; coal mining and washing for Scope 2 electricity (the analogue of GHG Category 3). Downstream: end-of-life recycling, and tenant IT for colocation operators | Taiwan (Hsinchu, Tainan, Taichung), Korea (Icheon, Pyeongtaek), Arizona, Malaysia (Penang, Kulim), Indian cement and steel belts, Indian coalfields (Odisha, Chhattisgarh, Jharkhand) | Amortise over asset life: IT 4–6 years, M&E 15 years, building 25–30 years. For colocation operators, tenant IT is Scope 3 (downstream leased assets). |

Li, Yang, Islam and Ren ("Making AI Less Thirsty", arXiv 2304.03271; *Communications of the ACM*, 2025) set out this convention: on-site cooling water is scope 1, off-site electricity-generation water is scope 2, and supply-chain water from server manufacturing is scope 3. Their scope-2 figures are location-based. They estimate that training GPT-3 in Microsoft's US data centres could consume 5.4 million litres, of which 700,000 litres is scope 1. They project global AI withdrawal of 4.2–6.6 billion m³ and consumption of 0.38–0.60 billion m³ in 2027. Their total-water formula is Σ e_t·[WUE_site + PUE·EWIF] + (T/T₀)·W_embodied.

### 1.2 Competing frameworks and metrics

| Framework / metric | What it measures | Relevance to Scopes 1/2/3 |
|---|---|---|
| **The Green Grid WUE (site)** | Annual site water ÷ IT energy (L/kWh) | Scope 1 only. Measures input, so it is closer to withdrawal. |
| **Green Grid WUE_source** | (Site water + water for energy generation) ÷ IT energy | Scope 1 + Scope 2. Rarely reported. |
| **EN 50600-4-9 / EU Delegated Reg. 2024/1364** | WUE = total water input W_IN (m³) ÷ E_IT (MWh); potable water input reported separately | Scope 1 input. Mandatory for EU sites of 500 kW IT or more. Annual reporting by 15 May for the previous calendar year. |
| **EU rating scheme (draft delegated act, 2026)** | A–G classes for PUE and WUE. WUE class A ≤ 0.10, G > 1.00. Counts freshwater only. | Commentators report an EU average of 0.58 m³/MWh for the 2024 reporting year, and flag a unit inconsistency (kWh vs MWh) in the draft formula. |
| **ISO 14046** | LCA-based water footprint: water scarcity footprint, eutrophication and other indicators | Scope 1 + 2 + 3 with impact weighting, usually AWARE |
| **Water Footprint Network** | Blue (surface and ground) / green (rain) / grey (dilution) water | Blue water ≈ consumption. Hoekstra's hydro footprint counts gross evaporation. |
| **GRI 303 (2018)** | 303-3 withdrawal, 303-4 discharge, 303-5 consumption; split for water-stressed areas | Operational boundary, mainly Scope 1 |
| **ESRS E3 (CSRD)** | Total consumption, consumption in water-risk areas, recycled and stored water, intensity per €m | Scope 1, plus value-chain risk narrative |
| **CDP Water Security** | Withdrawal, discharge and consumption by facility and basin; supply-chain engagement | Scope 1, with Scope 3 engagement |
| **SBTN Freshwater** | Basin-specific targets on quantity and quality for material sites | Scope 1 plus key upstream sites (fabs) |
| **SEBI BRSR (Principle 6)** | Withdrawal by source (surface, ground, third party, sea, other); consumption; intensity per ₹ turnover and per PPP-adjusted turnover; discharge by treatment level | Scope 1 only. BRSR Core requires reasonable assurance for the largest listed companies. |
| **AWARE (WULCA)** | Characterisation factor of 0.1–100 per m³ consumed (m³ world-eq) | Weights every scope by local scarcity |
| **WRI Aqueduct** | Baseline water stress score of 0–5 | Screening of locations |
| **SCARF / AWI (Wu, Hua & Ding, HotCarbon'25)** | Adjusted Water Impact = consumption × water stress factor, varying by place and time | Designed for computing: LLM serving, data centres and fabs |

**Hyperscaler practice.**
- Microsoft reports a WUE of 0.30 L/kWh for FY24 and 0.27 L/kWh for FY25. Its FY25 PUE is 1.17. Its WUE counts water for humidification and cooling only. Its new AI designs use zero water for cooling, avoiding an estimated 125,000 m³ a year per facility.
- Equinix reports a global WUE of 0.91 L/kWh in 2025, and 1.41 at evaporative sites.
- Meta has reported WUE values of 0.18–0.22 L/kWh and has begun publishing Scope 2 water consumption.
- Google's per-prompt figure uses the formula Water = (E_total − E_overhead) × WUE, which is on-site water only.
- Mistral's LCA covers all three scopes.

**LBNL 2024 benchmark.** Shehabi et al. estimate that US data centres consumed 66 billion litres of water directly in 2023, up from 21.2 billion litres in 2014; 84% of the direct total was at hyperscale sites. Indirect consumption through electricity was about 800 billion litres, roughly twelve times the direct figure. US data centres used 176 TWh that year, 4.4% of US electricity. The Indian picture in this report has the same structure: indirect (Scope 2) water dominates.

## 2. Factor Table

Evidence labels: **[M]** measured or regulatory/reported data; **[P]** peer-reviewed estimate; **[V]** vendor or company claim; **[E]** our engineering estimate, to be replaced with site data.

### 2.1 Scope 1 (L per kWh of IT energy unless stated)

| Item | Range | Central value used | Evidence / source |
|---|---|---|---|
| Chilled water + open cooling towers (CRAH) | 1.8–2.4 withdrawal | 2.1 withdrawal / 1.6 consumption (CoC 4) | [E] from latent heat (~1.1–1.2 L evaporated per kWh of heat rejected); consistent with Equinix's 1.41 and NTT's 1.42 at evaporative sites [V] |
| DLC warm-water + cooling towers | 1.5–2.0 withdrawal | Bengaluru 1.73 W / 1.30 C (CoC 4); Mumbai 1.68 W / 1.40 C (CoC 6) | [E] |
| Adiabatic-assisted dry coolers | 0.25–0.9 | 0.05 (Bengaluru, peak hours only) | [E]; LBNL finds dry coolers with adiabatic assist use the most water of the low-water options |
| Indirect evaporative coolers | 0.55–0.8 | – | [E] |
| Air-cooled chillers / dry coolers, closed loop | 0–0.05 | 0.01–0.02 top-up | [V] Microsoft zero-water design; Nxtra uses air-cooled chillers |
| Hyperscaler fleet WUE | 0.18–0.91 | – | [V] Microsoft 0.27–0.30; Meta 0.18–0.22; Equinix 0.91 |
| Indian operator WUE | 0.72–1.0 | – | [V] STT 0.73 and NTT 0.72 (2024); Sify 1 (per DTE) |
| Cycles of concentration (CoC) | 3–6 | Bengaluru borewell/TSE: 4; Mumbai municipal: 6 | [E]. Make-up = Evap × CoC/(CoC−1); blowdown = Evap/(CoC−1) |
| Domestic use | 45 L/person/day | – | [E], Indian building-code norm for offices |
| Landscaping, fire system, DG radiators, humidification | 2,000–3,500 m³/yr (10 MW) to 6,500 m³/yr (50 MW) | – | [E]. DG sets are radiator-cooled, so water is negligible. |

### 2.2 Scope 2 (m³ per MWh generated, freshwater)

| Source | Consumption | Withdrawal | Evidence / source |
|---|---|---|---|
| Coal, cooling towers (India) | 2.8–3.4 (norm 3.0–3.5; regional 2.8–4.2) | ~4 | [M] MoEFCC 2015/2018 norms; [P] Energy (2023); TERI/Singh & Tayal (2021); CSE |
| Coal + FGD | +0.3 | +0.3 | [M] PowerLine/CEA |
| Coal, once-through (freshwater) | ~1 | 70–200 (Indian plants: 80–160) | [P] CSE; WRI |
| Coal fleet average (2016) | 2.2 | 18.9 | [P] WRI *Parched Power* (2018). Includes once-through plants; data are dated. |
| Coal, dry-cooled (air-cooled condenser) | 0.45–0.65 | ≈ consumption | [P] Energy (2023); CEEW/NITI |
| Coal, seawater-cooled (coastal Tamil Nadu, Maharashtra, Gujarat) | ~0 freshwater | ~0 freshwater | [M] CSE: 17% of surveyed capacity is seawater-based |
| Gas CCGT, cooling tower | ~0.75 | ~1 | [P] Macknick et al. (NREL TP-6A20-50900; ERL 2012) |
| Nuclear, cooling tower / seawater | ~2.5 / ~0 | ~4 / ~0 | [P] Macknick et al. Tarapur, Kudankulam and Kalpakkam are seawater-cooled. |
| Hydro (reservoir evaporation) | 0 (allocated away) / 5.6–21.8 (net) / 79–245 (gross) | Not counted (water passes through) | [P] Mekonnen & Hoekstra (2012); Herath; Bakken et al. (2013); US multipurpose reservoirs 26.2 |
| Solar PV (module cleaning) | 0.02–0.15 (central 0.1) | ≈ consumption | [P] Macknick et al. [E] for Indian dust conditions |
| Wind | ~0 | ~0 | [P] |
| T&D gross-up for HT-connected data centres | ×1.08 | ×1.08 | [E]. Data centres take supply at 33–220 kV, so losses are below DISCOM averages. |

**Derived grid factors (delivered, freshwater, location-based).**
- **Generation mix [E]:** CEA FY2024-25 provisional data give coal 73%. The other shares are our approximations: hydro ~8%, solar ~8%, wind ~5%, nuclear ~3%, gas ~2%, other ~2%.

| Grid | Consumption, hydro excluded | Consumption, hydro at net evaporation (**central**) | Consumption, hydro at gross evaporation | Withdrawal (hydro excluded) |
|---|---|---|---|---|
| **All-India (recommended headline)** | 2.5 | **4.2** | 9.4 | 3.4 (once-through high case ~15) |
| Karnataka (Bengaluru) [E] | 1.5 | 4.75 | 14.5 | ~2.0 |
| Maharashtra (Mumbai, Pune) [E] | 2.4 | 3.5 | 7.7 | ~3.3 |
| Tamil Nadu (Chennai) [E] | 0.9 | 2.0 | 5.3 | ~1.3 |
| Telangana (Hyderabad) [E] | 2.8 | 3.9 | 7.2 | ~3.6 |
| Uttar Pradesh (Noida / Delhi NCR) [E] | 2.7 | 4.4 | 9.6 | ~3.5 |

**Why a national factor for the headline.**
- India runs a single synchronised national grid, and CEA's carbon baseline already uses one national grid emission factor.
- State figures depend on assumed import shares. Replace them with Ember's state-level generation data and the CEA plant-wise data in the atlas.
- In Karnataka, where hydro has a large share, the choice of hydro method changes the factor about tenfold.

**Market-based factors.**
- Wind–solar hybrid PPA: about 0.05 m³/MWh.
- 70% annually matched RE: about 0.7 × 0.05 + 0.3 × 4.2 ≈ 1.3.
- 24/7 hourly-matched clean energy: about 0.1.

### 2.3 Scope 3

| Item | Factor | Evidence / source |
|---|---|---|
| TSMC fab water usage | 161.0 L per 12-inch-eq wafer-layer (2024); 129 million m³ for 12.9 million wafers ≈ 10 m³/wafer ≈ 14 L/cm² | [M] TSMC 2024 Sustainability Report and Annual Report. "Usage" includes city and reclaimed water, so it is closer to withdrawal. |
| Leading-edge logic per cm² | 12.33 L/cm² → 100.4 L per H100 die; +2.2 L for rare-earth mining | [P] Morrison et al. (ICLR 2025), citing a Semiconductor Digest trade estimate |
| Node trend | UPW per wafer up 2.3× from 28 nm to 2 nm | [P] imec (IEDM 2023) |
| GB200 per-GPU embodied water (GPU dies, HBM3e, half a Grace CPU with LPDDR5X, NVLink/NIC share, rack copper and steel, upstream inputs) | ~2.6 m³ (range 1–10) | [E], from ~30 cm² logic × 14 L + ~105 cm² DRAM × 8 L + 20% other + 0.6 m³ rack materials + 0.5 m³ upstream |
| General-purpose server | ~2.8 m³ (range 1–6) | [E], from silicon area (CPU, 1 TB DRAM, 8 TB NAND) |
| Unverified web claim | 15,000–30,000 L per H100 | Low-quality blog with no method. Not used. |
| NVIDIA PCFs | HGX H100 baseboard 1,312 kgCO₂e; HGX B200 2,274 kgCO₂e (32 kg) | [V] Carbon only, **no water**. NVIDIA, Dell and Google TPU LCAs publish no per-product water figure. |
| Mistral Large 2 LCA | Hardware manufacturing/transport/end-of-life = 5% of water; training + inference = 91%; construction <1%; total 281,000 m³ | [V/P] Mistral, Carbone 4, ADEME (2025) |
| Building + M&E (concrete ~2,000 m³/MW × 0.5; steel ~300 t/MW × 4 m³/t; copper ~30 t/MW × 80 m³/t; site water ~1,000 m³/MW) | ~5,600 m³ per MW IT, over 25 years | [E] |
| Coal mining | 0.25 m³/t opencast; 1.7 m³/t underground | [P] Singh & Tayal (TERI), *Environ. Monit. Assess.* (2021) |
| Coal washing | 0.22 m³/t washed coal | [P] same |
| Upstream coal water per grid MWh | ~0.16 m³/MWh (0.7 t/MWh × [0.25 + 0.3 × 0.22] × 73%) | [E] |
| Diesel for DG testing | ~1–2.5 L water per L diesel; ~200 m³/yr for 50 MW | [E], negligible |

### 2.4 Water-stress weights (AWARE, m³ world-eq per m³)

| Location | Indicative AWARE CF used | Supporting stress evidence |
|---|---|---|
| Bengaluru (Urban/Rural) | 70 | Aqueduct "extremely high" baseline stress; groundwater depletion |
| Chennai | 80 | Aqueduct-based composite stress 4.5 (arXiv 2607.13443) |
| Delhi NCR / Noida | 90 | Extremely high |
| Hyderabad | 60 | High to extremely high |
| Mumbai | 40 | Stress 4.0 (arXiv 2607.13443); monsoon-fed lakes |
| Pune | 50 | High |
| Central-India coal belt (grid water) | 30 | India average stress 3.05; 43.4% of sub-regions "extremely high" |
| Taiwan (Hsinchu/Tainan), Korea, Malaysia, Arizona | 15 / 10 / 2 / 80 | Taiwan's 2021 drought; Arizona's arid basins |

**All AWARE values in this table are illustrative placeholders [E].** Replace them with WULCA AWARE 2.0 basin-level, non-agricultural factors before publishing. The AWARE scale runs from 0.1 to 100; the consumption-weighted world average for non-agricultural use is 20. What matters is the ratio of the on-site weight to the grid weight, about 2:1 in the southern metros, rather than the absolute values.

## 3. Formulas

Let E_IT be annual IT energy (MWh), PUE the annual PUE, and E_fac = E_IT × PUE.

- **Scope 1 consumption:** S1_C = E_IT × WUE_evap + V_noncool,C
- **Scope 1 withdrawal:** S1_W = E_IT × WUE_evap × CoC/(CoC−1) + V_noncool,W
- **Scope 1 discharge:** D = S1_W − S1_C (blowdown plus sewage)
- **Scope 2, location-based:** S2_LB = E_fac × (1 + λ_T&D) × Σ_s (g_s × EWIF_s), where g_s is the generation share and EWIF_s the water factor of source s
- **Scope 2, market-based:** S2_MB = E_fac × [f_clean × EWIF_clean + (1 − f_clean) × EWIF_residual]
  - Use hourly matching where possible. With annual matching, solar-heavy contracts leave night-time demand on the grid.
- **Scope 3:** S3 = Σ_i (W_i / L_i) + E_fac × EWIF_fuel-upstream + V_diesel
  - W_i is the embodied water of item i (GPUs, servers, network, batteries, building, M&E); L_i is its life in years.
- **Water-stress weighting:** AWI = Σ_scope Σ_location (V × CF_AWARE)
- **Per MWh IT:** total ÷ E_IT
- **Per prompt:** e_IT,prompt × [WUE_S1 + PUE × EWIF_S2 + S3/E_IT]
- **Dry vs tower break-even grid factor:** EWIF* = ΔS1_C / ΔE_fac. Dry cooling wins whenever the grid factor is below EWIF*.

## 4. Worked Examples

Common assumptions:
- All-India central Scope 2 factors: 4.2 m³/MWh consumption and 3.4 m³/MWh withdrawal, delivered.
- Scope 3 consumption is taken as 50% of Scope 3 withdrawal-basis usage [E], because fab "usage" figures are mostly recycled or discharged water.
- Volumes are in m³ (1 m³ = 1 kL).

### 4(a) 10 MW colocation hall, Bengaluru, 75% load: E_IT = 65,700 MWh/yr

| | a1: CRAH + water-cooled chillers + cooling towers (PUE 1.30) | a2: air-cooled chillers with free cooling (PUE 1.42) |
|---|---|---|
| Facility energy (MWh) | 85,410 | 93,294 |
| **Scope 1** withdrawal / consumption (kL) | 142,000 / 108,100 | 5,300 / 4,250 |
| **Scope 2** withdrawal / consumption (kL) | 290,400 / 358,700 | 317,200 / 391,800 |
| **Scope 3** withdrawal / consumption (kL): IT 7,600 + building 2,240 + coal upstream + diesel | 23,600 / 11,800 | 24,800 / 12,400 |
| **Total** withdrawal / consumption (kL) | **456,000 / 478,600** | **347,300 / 408,450** |
| m³ per MWh IT (W / C) | 6.94 / 7.28 | 5.29 / 6.22 |
| Share of consumption (S1 / S2 / S3) | 22.6% / 74.9% / 2.5% | 1.0% / 95.9% / 3.0% |
| AWARE-weighted (m³ world-eq) | 18.6 million (283 per MWh IT) | 12.3 million (187 per MWh IT) |

- **What a2 saves:** 70,150 kL of consumption (−15%) and 108,700 kL of withdrawal (−24%).
- **Stress-weighted saving:** −34%, because the water saved is Bengaluru water.
- **Break-even:** the grid factor would have to exceed 13.2 m³/MWh for a1 to use less water.
- **Colocation boundary:** tenant IT (7,600 kL/yr) is Scope 3 for the operator.

### 4(b) 50 MW AI hall (GB200/GB300 NVL72), 80% load: E_IT = 350,400 MWh/yr

IT assumptions:
- About 322 NVL72 racks at roughly 132 kW, holding about 23,200 GPUs at 2.6 m³ each.
- About 6,000 non-GPU servers at 2.8 m³ each.
- Hardware refreshed every 5 years, giving IT embodied water of about 15,500 kL/yr.
- Building and M&E: 11,200 kL/yr.

| | b1-B: DLC + dry coolers, Bengaluru (PUE 1.18) | b2-B: DLC + cooling towers, Bengaluru (PUE 1.10) | b1-M: DLC + dry coolers, Mumbai (PUE 1.20) | b2-M: DLC + cooling towers, Mumbai (PUE 1.12) |
|---|---|---|---|---|
| Facility energy (MWh) | 413,472 | 385,440 | 420,480 | 392,448 |
| **Scope 1** W / C (kL) | 24,000 / 21,800 | 612,700 / 459,800 | 13,500 / 11,300 | 595,200 / 494,900 |
| **Scope 2** W / C (kL) | 1,405,800 / 1,736,600 | 1,310,500 / 1,618,800 | 1,429,600 / 1,766,000 | 1,334,300 / 1,648,300 |
| **Scope 3** W / C (kL) | 93,100 / 46,600 | 88,600 / 44,300 | 94,200 / 47,100 | 89,700 / 44,850 |
| **Total** W / C (kL) | **1,522,900 / 1,805,000** | **2,011,800 / 2,122,900** | **1,537,300 / 1,824,400** | **2,019,200 / 2,188,050** |
| m³ per MWh IT (W / C) | 4.35 / 5.15 | 5.74 / 6.06 | 4.39 / 5.21 | 5.76 / 6.24 |
| Share of consumption (S1 / S2 / S3) | 1.2% / 96.2% / 2.6% | 21.7% / 76.3% / 2.1% | 0.6% / 96.8% / 2.6% | 22.6% / 75.3% / 2.0% |
| AWARE-weighted (million m³ world-eq; per MWh IT) | 54.6 (156) | 81.7 (233) | 54.4 (155) | 70.1 (200) |

**Interpretation.**
- In Bengaluru, dry cooling cuts total consumption by about 318,000 kL/yr (−15%), withdrawal by about 489,000 kL/yr (−24%), and stress-weighted impact by 33%. The break-even grid factor is 15.6 m³/MWh.
- In Mumbai the savings are similar in volume (−364,000 kL consumption). They are smaller once stress-weighted (−22%), because Mumbai is less water-stressed than Bengaluru.
- Of the Scope 3 total, upstream coal mining and washing (about 62,000–67,000 kL/yr) is about four times the GPU fab and assembly term.

**At city scale.** About 1.8 million kL/yr is roughly 4,900 kL/day. Scope 1 of the cooling-tower option alone, about 1,680 kL/day withdrawn, is close to the 1.964 million L/day that the 12 Bengaluru data centres with BWSSB data are reported to need at peak capacity; Karnataka's IT department estimated roughly 4,000 kL/day across all 32 facilities (Newslaundry, April 2026), while WELL Labs hydrologist Shashank Palur estimated about 20 million L/day. That reported figure comes from a secondary source.

**Cost.** Karnataka's policy reimburses 100% of treated-water costs, capped at ₹8 lakh a year. At an assumed ₹50–100 per kL for TSE [E], b2-B's 612,700 kL would cost ₹3–6 crore a year, so the cap covers only about 1–3%.

### 4(c) Water per LLM prompt (India-hosted, 0.20 Wh IT energy per prompt)

| mL per prompt | b1-B dry: withdrawal | b1-B dry: consumption | b2-B towers: withdrawal | b2-B towers: consumption |
|---|---|---|---|---|
| Scope 1 | 0.014 | 0.012 | 0.35 | 0.26 |
| Scope 2 | 0.80 | 0.99 | 0.75 | 0.92 |
| Scope 3 | 0.053 | 0.027 | 0.05 | 0.025 |
| **Total** | **0.87** | **1.03** | **1.15** | **1.21** |
| Long reasoning prompt (3 Wh IT, ×15) | 13 | 15.5 | 17 | 18.2 |

**Benchmarks.**
- **Google Gemini (May 2025):** median 0.24 Wh, 0.03 gCO₂e and 0.26 mL per prompt, on-site water only. A narrower accelerator-only boundary gives 0.10 Wh and 0.12 mL. Google reports a 33× fall in energy per prompt over one year.
- **OpenAI:** In his June 2025 blog post "The Gentle Singularity", Sam Altman wrote that the average query uses about 0.34 Wh and about 0.000085 gallons of water (about 0.32 mL), without stating the boundary.
- **Mistral Large 2 (full LCA):** 45 mL and 1.14 gCO₂e per 400-token response.
- **Li et al. (2023, GPT-3):** about 500 mL per 10–50 responses.

Our India figures are about four times Google's because they add Scope 2 water from a coal-heavy, wet-cooled grid. They are far below Mistral's, because 45 mL also includes amortised training and Mistral's allocation choices.

## 5. Sensitivity Findings

| Lever (case b1-B unless stated) | Change | Total consumption (kL/yr) | Effect |
|---|---|---|---|
| Hydro convention | Excluded (2.5) / net (4.2) / gross (9.4) | ~1.10 million / 1.81 million / 3.95 million | **Largest single uncertainty, 3.6×** |
| State vs national grid | Karnataka ex-hydro 1.5 → Karnataka gross 14.5 | ~0.69 million → ~6.1 million | Hydro method dominates in Karnataka; Tamil Nadu's seawater-cooled coal lowers its factor |
| Clean power, market-based | 0% / 70% annual RE / 24/7 hourly | 1.81 million / ~0.61 million / ~0.13 million | **Largest controllable lever, −66% to −93%** |
| Cooling choice | Dry vs towers | −15% consumption, −24% withdrawal, −33% AWARE | Dry wins unless the grid exceeds ~16 L/kWh |
| PUE | 1.18 → 1.10 at constant WUE | −2.4% | Each 0.01 of PUE ≈ 14,700 kL/yr |
| Hardware refresh | 7 / 5 / 3 years | Scope 3 IT 11,100 / 15,500 / 25,800 | Under 1% of total; under 5% even at 10 m³/GPU and a 3-year refresh |
| Embodied factor per GPU | 1 → 10 m³ | Scope 3 IT ~6,000 → ~50,000 | Second-order |
| Cycles of concentration | 3 → 6 (towers) | Scope 1 withdrawal 683,000 → 546,000 | Changes withdrawal only, not consumption |
| City stress | Bengaluru vs Mumbai (towers) | AWARE 81.7 million vs 70.1 million | On-site stress amplifies the cost of towers |

## 6. India Context and Reporting

**Operator disclosure.**
- **Nxtra by Airtel** is the most transparent Indian operator, but its figures are hard to reconcile.
  - Its FY2025-26 report gives 124,306 KL consumption, with large data centres at 118,501 KL (third-party assured). It reports against GRI 303-4 and BRSR P6.
  - Its FY2025 ESG report was cited for 216,357 KL "consumption", including 9,876 KL of groundwater and 191,152 KL bought from third parties. That makes it likely the FY2025 figure is a withdrawal number.
  - It recycled 15,329 KL and contracted 482,800 MWh of renewable energy.
  - Bharti Airtel's BRSR for FY2025-26 shows 128 Mn L withdrawn, 82 Mn L consumed and 46 Mn L discharged. That is the format the atlas should copy.
- **STT GDC** (0.73) and **NTT** (0.72 portfolio / 1.42 evaporative) publish WUE.
- **Sify** reports 1.
- **AdaniConneX** and **CtrlS** publish no WUE.
- **Yotta** is unlisted, outside BRSR, and has published no verified water data.
- We found no Scope 2 or Scope 3 water disclosure from **Web Werks/Iron Mountain** in this research.

**Regulation.**
- **SEBI BRSR (Principle 6)** requires withdrawal by source, consumption, intensity and discharge, as Scope 1 only.
- **Karnataka's Sustainable Data Centre Policy 2026–31**, approved in September 2026:
  - targets 1 GW of IT load by 2031, with a ₹1,300.45 crore budget;
  - requires plant-wise PUE and WUE reporting;
  - reimburses treated-water costs up to ₹8 lakh a year.
- **Groundwater:** borewell abstraction needs a CGWA No Objection Certificate (or a state-authority NOC where the state regulates groundwater), with metering and water-conservation charges.
- **MeitY:** to our knowledge, no binding national WUE standard exists.
- **Thermal plants:** Down To Earth reports that India's power regulator has ordered annual water audits at thermal plants, and CSE estimates about 48% of the coal fleet sits in water-scarce regions. The Environment (Protection) Third Amendment Rules, 2025 allow exemptions from the cooling-tower mandate, which could raise freshwater withdrawal in Scope 2.

### Recommended reporting template (per site, annual)

| Block | Fields |
|---|---|
| Site | Name, district, IT capacity (MW), E_IT, E_fac, PUE, cooling architecture, CoC, AWARE CF and Aqueduct score |
| Scope 1 | Withdrawal by source (municipal / ground with CGWA NOC number / tanker / TSE / rainwater harvesting); potable vs non-potable; discharge by destination and treatment; consumption; WUE (input, Green Grid / EU basis); WUE_consumption; non-cooling uses broken out |
| Scope 2 | Location-based EWIF (national and state), consumption and withdrawal; hydro convention stated (excluded / net / gross); market-based EWIF with RE contract type and matching granularity (annual / monthly / hourly); WUE_source |
| Scope 3 | IT embodied water (method, factor per GPU/server, refresh years); building/M&E (25-year amortisation); upstream fuel (coal mining and washing, diesel); tenant IT, flagged for colocation |
| Impact | AWARE-weighted totals per scope; share of withdrawal in high-stress basins (GRI 303 / ESRS E3) |
| Intensities | m³ per MWh IT; kL per ₹ crore revenue (BRSR); mL per prompt or per GPU-hour for AI halls |
| Assurance | Metering class (EN 50600-4-9 category), assurance provider, restatements |

## 7. Recommendations

1. **Scope 1:**
   - Default to closed-loop DLC with dry coolers for AI halls, and air-cooled free-cooling chillers for colocation halls.
   - Where towers are unavoidable, run them on TSE or rainwater, at CoC of 6 or more with side-stream treatment, and recover blowdown with RO.
   - Report consumption and withdrawal separately.
2. **Scope 2:** This is the biggest lever.
   - Contract wind–solar hybrid or round-the-clock RE through Karnataka, Tamil Nadu or Maharashtra green open access, and move to hourly matching.
   - Favour sites supplied by seawater-cooled or dry-cooled thermal plants.
   - Each 10 percentage points of clean share cuts about 170,000 kL/yr for a 50 MW AI hall.
3. **Scope 3:**
   - Extend hardware life to 6 years where performance per watt allows.
   - Ask NVIDIA, OEMs and memory suppliers for ISO 14046 water data.
   - Use low-clinker or blended cement and recycled steel.
   - Count upstream coal water. It is larger than fab water.
4. **Siting:**
   - Use AWARE weighting in the atlas. Coastal Chennai and Mumbai with dry cooling and RE PPAs score best.
   - Bengaluru and Delhi NCR sites with cooling towers score worst.
5. **Atlas method:**
   - Adopt the national grid factor of 4.2 L/kWh (net hydro) as the headline.
   - Publish the 2.5 and 9.4 figures as bounds, plus state factors.
   - Update annually from CEA/Ember data.

## 8. Caveats and Disagreements

- **Hydro allocation:**
  - Mekonnen and Hoekstra attribute gross evaporation to hydropower.
  - Bakken et al. argue for net, system-boundary methods, and the "water collector" view argues for multipurpose allocation.
  - The resulting factors range from 0 to more than 245 m³/MWh.
- **Consumption vs withdrawal:**
  - WUE (Green Grid and the EU) measures input.
  - BRSR and GRI distinguish withdrawal, discharge and consumption, but Indian operators mix the terms. Nxtra's two figures, 216,357 KL in FY2025 and 124,306 KL in FY2026, may follow different definitions.
- **Embodied chip water:** No GPU maker publishes water data. Estimates range from 0.1 m³ (Morrison, die only) to about 2.6 m³ (ours, full board and rack). A blog figure of 15–30 m³ is unsupported. TSMC's "usage" figure is mostly recycled water, so its consumption basis is uncertain.
- **State mixes and AWARE factors:** both are our estimates and placeholders. India's generation shares other than coal are approximate.
- **Dated or weak data:** the WRI fleet figures are from 2016. The figure of 150 billion litres of Indian data-centre water in 2025 comes from Mordor Intelligence, cited by WION, and is weak evidence.
- **Draft regulation:** the EU WUE unit inconsistency in the draft rating act is unresolved.
- **Policy status:** Karnataka's policy is newly approved. Its implementing rules for WUE thresholds have not been published, as far as we can tell.

## Sources

1. vasudha-foundation — https://www.vasudha-foundation.org/wp-content/uploads/Indias-Energy-Overview-year-end-report-of-FY-2024-25.pdf
2. powerline — https://powerline.net.in/2026/09/04/water-stress-thermal-power-plants-take-steps-to-optimise-consumption/
3. cpcb — https://cpcb.nic.in/uploads/thermal_power_plant_overview.pdf
4. niti — https://www.niti.gov.in/sites/default/files/2019-08/Research%20Study%20on%20Energy%20Water%20Nexus%20&%20Efficient%20Water%20Cooling%20Technologies%20for%20thermal%20Power%20Plants%20in%20India_CEEW_New%20Delhi.pdf
5. copernicus — https://hess.copernicus.org/preprints/8/8355/2011/hessd-8-8355-2011.pdf
6. researchgate — https://www.researchgate.net/publication/303553025_Evaporation_from_reservoirs_and_the_hydropower_water_footprint
7. utwente — https://essay.utwente.nl/fileshare/file/71946/Knook%20L.%201490753%20_%20openbaar.pdf
8. researchgate — https://www.researchgate.net/figure/Global-average-water-footprint-of-electricity-from-hydropower-compared-to-the-water_fig3_237733192
9. downtoearth — https://www.downtoearth.org.in/energy/as-water-stress-deepens-india-asks-thermal-power-plants-to-account-for-every-drop
10. datacenter-forum — https://datacenter-forum.ro/en/new-reporting-requirements-for-data-center-operators-introduced-by-the-delegated-regulation-eu-2024-1364/
11. dce-academy — https://www.dce-academy.com/en/en-50600/part-4-9-wue
12. tsmc — https://investor.tsmc.com/static/annualReports/2024/english/ebook/files/basic-html/page159.html
13. tsmc — https://investor.tsmc.com/sites/ir/annual-report/2024/2024%20Business%20Overview_0.pdf
14. tsmc — https://esg.tsmc.com/file/public/e-APractitionerofGreenPower_2.pdf
15. arxiv — https://arxiv.org/pdf/2503.05804
16. researchgate — https://www.researchgate.net/publication/353400819_Assessment_of_regional_water_demand_for_coal-based_power_plants_in_India_exploring_its_regional_impact_on_other_cross-sectoral_water_stress
17. google — https://services.google.com/fh/files/misc/measuring_the_environmental_impact_of_delivering_ai_at_google_scale.pdf
18. greencalculus — https://greencalculus.com/data/ai-water-usage/
19. airtel — https://assets.airtel.in/nxtra/pdf/Financial-Documents/Nxtra_SR_FY_2025_26.pdf
20. earthjournalism — https://earthjournalism.net/stories/what-data-center-giants-arent-saying-about-their-water-use-in-india
21. acm — https://cacm.acm.org/research/making-ai-less-thirsty/
22. arxiv — https://arxiv.org/html/2304.03271v5.pdf
23. arxiv — https://arxiv.org/pdf/2304.03271
24. acm — https://cacm.acm.org/sustainability-and-computing/making-ai-less-thirsty/
25. arxiv — https://arxiv.org/html/2304.03271v4
26. scienceshot — https://scienceshot.com/post/eu-data-centre-reporting-eed
27. fly — https://interactdc-web.fly.dev/insights/inside-the-eu-data-centre-rating-scheme
28. scienceshot — https://scienceshot.com/post/eu-data-centre-rating-scheme-label-2027
29. airtel — https://assets.airtel.in/static-assets/cms/investor/docs/annual_results_2025_26/BRSR.pdf
30. researchgate — https://www.researchgate.net/publication/332919446_Improving_regional_water_scarcity_footprint_characterization_factors_of_an_available_water_remaining_AWARE_method
31. manglai — https://www.manglai.io/en/glossary/coeficiente-de-escasez-aware
32. arxiv — https://arxiv.org/pdf/2506.22773
33. microsoft — https://datacenters.microsoft.com/sustainability/efficiency/
34. microsoft — https://blogs.microsoft.com/on-the-issues/2025/05/29/environmental-sustainability-report/
35. Wikipedia — https://en.wikipedia.org/wiki/Water_usage_effectiveness
36. stanford — https://ojs.stanford.edu/ojs/index.php/surj/article/download/4407/1933
37. arxiv — https://arxiv.org/pdf/2508.15734
38. carbone4 — https://carbone4.com/en/news/ia-generative-mission-mistral-ai
39. arxiv — https://arxiv.org/pdf/2512.11863
40. datacenterdynamics — https://www.datacenterdynamics.com/en/news/doe-data-centers-consumed-44-of-us-power-in-2023-could-hit-12-by-2028/
41. gpusmith — https://gpusmith.com/articles/en/how-much-water-do-data-centers-use
42. lbl — https://eta-publications.lbl.gov/sites/default/files/2024-12/lbnl-2024-united-states-data-center-energy-usage-report_1.pdf
43. microsoft — https://www.microsoft.com/en-us/microsoft-cloud/blog/2024/12/09/sustainable-by-design-next-generation-datacenters-consume-zero-water-for-cooling/
44. sciencedirect — https://www.sciencedirect.com/science/article/abs/pii/S0360544223009477
45. wri — https://www.wri.org/insights/identifying-global-coal-industrys-water-risks
46. amazonaws — https://wriorg.s3.amazonaws.com/s3fs-public/parched-power-india-0130.pdf
47. downtoearth — https://www.downtoearth.org.in/pollution/it-is-imperative-to-improve-water-efficiency-in-india-s-coal-fired-thermal-power-plants-89484
48. osti — https://www.osti.gov/biblio/1219149
49. copernicus — https://hess.copernicus.org/articles/17/3983/2013/hess-17-3983-2013.pdf
50. iop — https://iopscience.iop.org/article/10.1088/1748-9326/abd78d
51. researchgate — https://www.researchgate.net/publication/312470509_A_review_of_operational_water_consumption_and_withdrawal_factors_for_electricity_generating_technologies
52. ember-energy — https://ember-energy.org/data/india-electricity-data/
53. imec-int — https://www.imec-int.com/en/articles/environmental-footprint-logic-cmos-technologies
54. eetimes — https://www.eetimes.com/the-environmental-footprint-of-logic-cmos-technologies/2/
55. aiinsightsnews — https://aiinsightsnews.net/how-much-water-does-chatgpt-use/
56. projetcelsius — https://projetcelsius.com/en/blog/why-ai-is-bad-for-the-environment/
57. nvidia — https://images.nvidia.com/aem-dam/Solutions/documents/HGX-B200-PCF-Summary.pdf
58. interactdc — https://interactdc.com/posts/understanding-gpus-energy-and-environmental-impact-part-i/
59. simonwillison — https://simonwillison.net/2025/Jul/22/mistral-environmental-standard/
60. deeplearning — https://www.deeplearning.ai/the-batch/french-ai-startup-discloses-full-lifecycle-consumption-and-emissions-for-mistral-large-2
61. springer — https://link.springer.com/article/10.1007/s10661-021-09298-2
62. arxiv — https://arxiv.org/pdf/2607.13443
63. amazonaws — https://s3.eu-central-1.amazonaws.com/interconnectedrisks/reports/2022/Case-studies/TR_220830_TaiwanDrought.pdf
64. wulca-waterlca — https://wulca-waterlca.org/what-is-aware/
65. thenewsminute — https://www.thenewsminute.com/karnataka/karnatakas-new-data-centre-policy-puts-water-energy-in-focus-what-does-it-say
66. emergentmind — https://www.emergentmind.com/papers/2508.15734
67. arxiv — https://arxiv.org/abs/2508.15734
68. x — https://x.com/sophiamyang/status/1947665332803416114
69. nation — https://nation.ai/how-much-water-does-ai-really-consume/
70. downtoearth — https://www.downtoearth.org.in/science-technology/indias-digital-thirst-what-data-centre-giants-arent-saying-about-their-water-use
71. wionews — https://www.wionews.com/india-news/data-centres-are-not-optional-so-who-s-responsible-for-the-damage-part-2-1783461918187
72. wionews — https://www.wionews.com/india-news/karnataka-unveils-sustainable-data-centre-policy-for-efficient-water-power-use-1789985097703
73. newslaundry — https://www.newslaundry.com/2026/10/01/karnatakas-new-data-centre-policy-puts-water-energy-in-focus-what-does-it-say
74. springer — https://link.springer.com/article/10.1007/s11269-015-1104-x
75. arxiv — https://arxiv.org/pdf/2605.01158
76. acm — https://dl.acm.org/doi/10.1145/3724499
