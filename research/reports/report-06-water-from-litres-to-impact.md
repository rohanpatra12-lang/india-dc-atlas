<!-- Report 6 of the India Data Centre Atlas research series (From litres used to water impact; atlas chapter 8.1). Produced with AI-assisted web research, October 2026, and kept as written at the time. Some figures were corrected later (notably India grid water 4.5 → 2.9 L/kWh and grid CO₂ 0.71 → 0.675 t/MWh, October 2026); the atlas standards register (src/data/standards.js) is authoritative where they differ. -->

# Water: From "Litres Used" to "Water Impact" — Understanding, measuring and contextualising water use in data centres

A modelled 50 MW evaporatively cooled data centre in Bengaluru would withdraw about 1.6–2.1 million litres a day (MLD). That is less than 0.1% of the roughly 1,935 MLD BWSSB currently supplies. Drawn from groundwater in Bangalore East taluk, though, the same volume equals about 4% of that taluk's sustainable groundwater, and its power plants consume more water than the site itself. So "litres used" does not measure "water impact". What matters is the source, the location, the season and the off-site electricity water, and India's disclosure regime currently captures none of these.

## TL;DR

- **Volume depends mostly on cooling design and accounting, not size.** Per MW of IT capacity, a Bengaluru facility ranges from about 0.35 million litres a year (closed-loop dry cooling) to about 13 million litres (evaporative towers at five cycles of concentration). The widely quoted WELL Labs figure of about 26 million L/MW/year is roughly double our engineering estimate and should be treated as an upper bound. In every case about 80% of withdrawal is consumed (evaporated) and only blowdown returns to the sewer.
- **Impact depends on context.** The same 50 MW evaporative plant is immaterial against city supply (0.09%) but material against an over-exploited local aquifer (about 4% of Bangalore East's extractable groundwater). Off-site water in the electricity supply (about 1.5 L/kWh on the Karnataka grid, 3–8 L/kWh at Raichur's coal units) matches or exceeds on-site use. Scarcity weighting and seasonal peaks (summer demand is 1.3–3.5× the annual average) change the ranking of options.
- **India's disclosure is not decision-grade.** Operators report company-wide totals, inconsistently (Sify's withdrawal fell twentyfold in a year with no explanation). Karnataka's own estimates range from about 4 MLD (IT department) to about 20 MLD (WELL Labs). The new Karnataka Sustainable Data Centre Policy 2026–31 requires plant-wise WUE reporting, which is a start. It should be extended to a minimum set of seven metrics: withdrawal by source, consumption, discharge, site WUE, source WUE, scarcity-weighted footprint and monthly profile. Groundwater use for evaporative cooling should be barred in over-exploited taluks.

---

## Executive summary

This report follows the series' earlier reports on consumption anatomy, cooling, Bengaluru water and power, and "Every TWh is not the same". It moves from volumes to impact:

1. **How much.** Evaporation physics sets a floor of about 1.5 L per kWh of heat rejected. Cycles of concentration (CoC) change withdrawal and discharge but barely change consumption. A 50 MW Bengaluru hyperscale facility at 80% load withdraws 1.58–2.08 MLD and consumes about 1.39 MLD at any CoC.
2. **Water balance.** Make-up = Evaporation + Blowdown + Drift, and Consumption = Withdrawal − Discharge. Balances are given at CoC 3, 5 and 8, with an RO and zero-liquid-discharge (ZLD) variant, and for a 100 MW AI facility with direct liquid cooling (DLC) and adiabatic dry coolers (about 0.13 L/kWh on site, peak-to-average about 3.5).
3. **Metrics.** WUE is necessary but not sufficient. Per-GPU-hour and per-prompt metrics swing over two orders of magnitude depending on boundary: Google's 0.26 mL per prompt (on-site, derived by applying its 2024 fleetwide WUE) against Mistral's 45 mL (life cycle).
4. **Local context.** Cauvery capacity is 2,225 MLD but about 1,935 MLD is delivered. Bengaluru Urban groundwater extraction rose from 600 MLD (2020) to 1,457 MLD (2024). Every taluk is over-exploited.
5. **Stress.** Scarcity weighting, materiality ratios and a five-dimension scorecard show that dry or DLC cooling with renewable power cuts the scarcity-weighted footprint by more than half compared with evaporative cooling on groundwater, even though dry cooling raises electricity use.

**Recommendation in one line:** regulate on *consumption by source, location and season*, not on annual WUE alone.

---

## 1. How much water?

### 1.1 Withdrawal vs consumption: definitions and why both matter

| Framework | Withdrawal | Consumption | Other key terms |
|---|---|---|---|
| **USGS** | Water removed from ground or surface sources | Water evaporated, transpired, incorporated into products or otherwise removed from the immediate water environment | Return flow |
| **GRI 303 (2018)** | 303-3: all water drawn from all sources, split freshwater (≤1,000 mg/L TDS) and "other" | 303-5: **withdrawal − discharge** (± storage change) | 303-4 discharge by destination and treatment; all broken out for water-stressed areas |
| **ISO 14046 (2014)** | Water use | Water not returned to the drainage basin (evaporated, integrated, transferred) | Water scarcity footprint |
| **Water Footprint Network** | — | **Blue**: surface or groundwater consumed. **Green**: soil rainwater. **Grey**: virtual dilution volume for pollutants | — |

**Why report both:**

- **Withdrawal** measures pressure on suppliers and infrastructure: BWSSB mains, tankers, borewell drawdown.
- **Consumption** measures what is *lost to the basin*, which is the quantity used in scarcity footprints.
- **Discharge** measures quality burden: concentrated blowdown and RO reject.

**Contrast:**

- **Once-through cooling** (seawater or river; possible for coastal Chennai or Mumbai sites): huge withdrawal (tens of L/kWh), near-zero consumption, thermal and ecological impact.
- **Evaporative towers:** moderate withdrawal (about 1.6–2.2 L/kWh of IT energy), of which 65–90% is consumed.

Withdrawal-based WUE (Microsoft, AWS, Meta) is not directly comparable with consumption-based WUE (Google's per-prompt figure, ISO "Category 2": input minus returned).

### 1.2 Cooling water

| System | Mechanism | Site water (L/kWh of IT energy) | Notes |
|---|---|---|---|
| Open cooling towers + water-cooled chillers | Latent heat (about 2,400 kJ/kg → about 1.5 L per kWh of heat) | 1.4–2.5 withdrawal; 1.1–1.8 consumption | Bengaluru's moderate wet-bulb suits towers; lowest PUE |
| Direct / indirect evaporative air handlers | Evaporation into air | 0.3–1.5 | Seasonal |
| Adiabatic hybrid dry coolers | Dry coils; sprays above about 28–32°C | 0.05–0.4 | Low average, high peaks |
| Air-cooled chillers / dry coolers | Sensible heat only | ≈0–0.05 | PUE higher by about 0.1–0.2 |
| Closed-loop DLC + dry coolers | Warm water (35–45°C) to cold plates | 0.01–0.15 | One-time fill about 1.5–3 L/kW (often 25% propylene glycol) |
| Chilled-water make-up | Closed-loop losses | <0.01 | Quality matters more than volume |

LBNL's 2024 *United States Data Center Energy Usage Report* puts industry-average site WUE at just over 0.36 L/kWh, ranging from near zero (air-cooled) to well over 1 L/kWh (water-cooled). Equinix reports 1.41 L/kWh at evaporative sites against 0.91 portfolio-wide (2025).

### 1.3 Non-cooling water

| Use | 50 MW campus magnitude | Comment |
|---|---|---|
| Domestic / staff (about 300 people at the 45 L per head per day office norm) | ≈13.5 m³/day | About 80% returns as sewage; on-site STP reuse |
| Cleaning, housekeeping | 3–10 m³/day | — |
| Humidification | 0–20 m³/day, seasonal | Dry months (January–March, relative humidity 25–40%) need humidification; the monsoon needs dehumidification, which yields recoverable condensate |
| Landscaping | 5–20 m³/day | Should use STP or rainwater |
| Fire suppression | Hundreds of m³ stored; 1–5 m³/week testing | Storage, not consumption |
| Diesel generator cooling | Closed radiator loops; negligible | — |
| RO reject | 20–35% of RO feed | Raises withdrawal and discharge, not consumption |
| Construction | Tens of thousands of m³ over 18–36 months (estimate) | Meta reports construction water separately; Yotta's Greater Noida site had a 50 KLD STP-water connection for construction (DTE) |

**Rule of thumb:** non-cooling uses add about 20–50 m³/day (about 0.03–0.05 L/kWh). That is trivial for evaporative sites but most of the water at a dry site.

### 1.4 Freshwater vs recycled water

| Source | Bengaluru status | Cooling-tower issues | Implications |
|---|---|---|---|
| BWSSB potable (Cauvery) | Industrial tariff about ₹99/kL | Low TDS allows high CoC | Diverts drinking water; last resort |
| Groundwater (borewell or tanker) | All Bengaluru Urban taluks over-exploited | TDS 500–1,500 mg/L; silica 20–60 mg/L limits CoC to about 3–4 | Highest local impact; KGWA permits |
| Tertiary treated wastewater (TTW) | Growing; K&C Valley already sends treated water to Kolar and Chikkaballapur tanks | Ammonia, phosphate, biofouling; needs UF/RO | Has downstream claimants |
| Rainwater | About 900 mm/yr; a 10 ha roof yields about 80,000 m³/yr | Ideal make-up | About 13% of a 50 MW evaporative plant's need |
| Seawater | Not available in Bengaluru | Corrosion | Coastal sites only |

**Indicative recirculating-water limits** (typical engineering guidance; vendor limits vary):

- **TDS:** 1,500–2,500 mg/L. Groundwater at 600 mg/L allows CoC of about 3–4; RO permeate allows CoC above 10.
- **Silica:** 150 mg/L. Make-up at 40 mg/L allows CoC of about 3.7, often the binding limit for Deccan groundwater.
- **Chlorides:** 250–500 mg/L.
- **Calcium hardness:** 600–1,000 mg/L as CaCO₃, with inhibitors.

The first constituent to hit its limit sets the CoC, which is why quality drives impact.

### 1.5 Daily and annual demand: worked examples

**Assumptions:** 80% average load, so 1 MW = 19.2 MWh/day = 7,008 MWh/yr of IT energy. WUE is withdrawal-based (L/kWh = m³/MWh).

| IT capacity | Evaporative, CoC 5 (WUE 1.80) | Adiabatic (0.40) | Dry / DLC (0.05) | WELL Labs basis (26 ML/MW/yr) |
|---|---|---|---|---|
| **1 MW** | 34.6 m³/d · 12.6 ML/yr | 7.7 m³/d · 2.8 ML/yr | 1.0 m³/d · 0.35 ML/yr | 71 m³/d · 26 ML/yr |
| **20 MW** | 0.69 MLD · 252 ML/yr | 154 m³/d · 56 ML/yr | 19 m³/d · 7 ML/yr | 1.42 MLD · 520 ML/yr |
| **50 MW** | 1.73 MLD · 631 ML/yr | 384 m³/d · 140 ML/yr | 48 m³/d · 17.5 ML/yr | 3.56 MLD · 1,300 ML/yr |
| **100 MW** | 3.46 MLD · 1,261 ML/yr | 768 m³/d · 280 ML/yr | 96 m³/d · 35 ML/yr | 7.12 MLD · 2,600 ML/yr |

**Interpretation.** WELL Labs' about 26 ML/MW/yr (similar to a Deloitte-cited 68,500 L/MW/day) implies a WUE of about 3 L/kWh at full load. That is plausible for low-CoC towers on hard groundwater or if total campus water is included, but it is about twice our central case. These figures are consistent with the series' earlier assumptions (WUE 1.8, 1.6, 0.4 and 0.05).

**Peak vs average.** Evaporation tracks heat load and wet-bulb temperature, which peaks in April–May.

- **Illustrative monthly multiples:** January 0.85, February 0.95, March 1.15, **April 1.30, May 1.30**, June 1.00, July–August 0.90, September–October 0.95, November–December 0.85.
- **Design peak day:** about 1.35× the average, or **2.3 MLD** for 50 MW. Afternoon hourly peaks are about 1.5–1.7× the daily average.
- **Coincidence:** the peak falls when tanker demand and borewell failures peak.

**Storage.** Indian Tier III and IV practice commonly provides 24–72 h of make-up storage. We could not verify a fixed Uptime Institute mandate; this is a design-basis choice. For 50 MW at peak, that is 2.3 ML (24 h), 4.7 ML (48 h) or 7.0 ML (72 h, about 3 Olympic pools). Dry or DLC sites need only domestic and fire storage.

---

## 2. Water balance

### 2.1 Water balance in words

1. **SOURCE.** BWSSB potable, borewell or tanker, TTW, rainwater.
2. **TREATMENT.** Softening (brine about 2–5%) and/or UF + RO (70–80% recovery, so reject is 20–30% of feed).
3. **USES:**
   - **Cooling towers:** evaporation (70–85% of make-up), drift (<0.005% of circulation) and blowdown (12–35%).
   - **Humidification:** consumed.
   - **Domestic:** about 80% returned as sewage.
   - **Cleaning and landscaping.**
4. **REUSE.** Blowdown to side-stream RO with permeate returned to make-up; sewage to STP for flushing and landscaping; ZLD (evaporator or crystalliser, salts to hazardous landfill).
5. **DISCHARGE.** To the BWSSB sewer under KSPCB consent. CPCB general standards for inland surface water include pH 5.5–9.0, BOD ≤30 mg/L, TSS ≤100 mg/L and oil and grease ≤10 mg/L; limits for public sewers are looser. Blowdown TDS and biocides are the usual issue.

### 2.2 Formulas

- **Make-up:** M = E + B + D
- **Evaporation, energy method:** E ≈ Q (kWh) × 3,600 ÷ 2,400 ≈ **1.5 L/kWh of heat** if all heat is rejected as latent heat. With 80–90% latent, use **1.25–1.35 L/kWh of heat**.
- **Evaporation, rule of thumb:** E (gpm) ≈ 0.00085 × circulation (gpm) × ΔT (°F)
- **Blowdown:** B = E ÷ (CoC − 1)
- **Drift:** D ≈ 0.001–0.005% of circulation
- **Consumption:** C = Withdrawal − Discharge = E + D + humidification + other losses
- **Heat to towers:** Q ≈ 1.15 × IT load (adds chiller compressor work)

### 2.3 Worked balance: 50 MW Bengaluru hyperscale facility (evaporative)

**Inputs:**

- 50 MW IT × 80% load = 40 MW average = **350,400 MWh/yr** of IT energy.
- Heat to towers 46 MW. Evaporation 1.25 × 1.15 = **1.44 L/kWh of IT energy** = 504.6 ML/yr (1.38 MLD).
- Cross-check: circulation at a 5.6 K range is about 7.06 ML/h. 0.85% evaporation = 60 m³/h = 1.44 MLD, which agrees with the energy method.
- Drift 0.002% gives **1.2 ML/yr**. Non-cooling 40 m³/d = 14.6 ML/yr (80% returned).

**Annual balance (ML/yr):**

| Stream | CoC 3 (hard borewell) | CoC 5 (potable or softened) | CoC 8 | CoC 8 on TTW + RO (75% recovery) | ZLD |
|---|---|---|---|---|---|
| Evaporation | 504.6 | 504.6 | 504.6 | 504.6 | 504.6 |
| Blowdown | 252.3 | 126.2 | 72.1 | 72.1 | 0 |
| Drift | 1.2 | 1.2 | 1.2 | 1.2 | 1.2 |
| **Tower make-up** | **758.1** | **632.0** | **577.9** | **577.9** | ≈506 |
| RO reject | — | — | — | 192.6 | 0 |
| Non-cooling | 14.6 | 14.6 | 14.6 | 14.6 | 14.6 |
| **Withdrawal** | **772.7 (2.12 MLD)** | **646.6 (1.77 MLD)** | **592.5 (1.62 MLD)** | **785.1 (2.15 MLD)** | **≈525 (1.44 MLD)** |
| Discharge | 264.0 | 137.9 | 83.8 | 276.4 | ≈0 |
| **Consumption** | **508.7 (1.39 MLD)** | **508.7** | **508.7** | **508.7** | **≈525** |
| Consumption ÷ withdrawal | 66% | 79% | 86% | 65% | ≈100% |
| Site WUE, withdrawal | 2.21 | 1.85 | 1.69 | 2.24 | 1.50 |
| Site WUE, consumption | 1.45 | 1.45 | 1.45 | 1.45 | 1.50 |

**Daily at CoC 5:** withdrawal 1.77 MLD, consumption 1.39 MLD, discharge 0.38 MLD; peak day about 2.4 MLD.

**Insight.** Raising CoC from 3 to 8 cuts withdrawal by 23% and discharge by 68%, but **consumption is unchanged**. Treated-wastewater RO raises gross withdrawal while shifting it off freshwater. ZLD removes discharge but makes everything consumption and adds 20–70 kWh/m³ of energy plus salt waste. Each option wins on a different metric, so all three flows must be reported.

### 2.4 Worked balance: 100 MW AI facility (DLC + adiabatic dry coolers)

**Inputs:** 100 MW × 85% = **744,600 MWh/yr** of IT energy; PUE 1.15; all heat to dry coolers. Adiabatic sprays run about 1,000 h/yr (an illustrative assumption, mostly March–May afternoons) at about 1.0 L/kWh.

| Item | Calculation | Annual |
|---|---|---|
| Adiabatic water | 85,000 kW × 1,000 h × 1.0 L/kWh | 85 ML |
| Non-cooling | 30 m³/d | 11 ML |
| Coolant top-up | — | ≈1 ML |
| **Total withdrawal** | — | **≈97 ML/yr (0.27 MLD)** |
| **Site WUE** | 97 ML ÷ 744,600 MWh | **≈0.13 L/kWh** |
| Consumption | — | ≈80 ML |
| One-time fill | 1.5–3 L/kW × 100 MW | 150–300 m³ |
| **Peak day (May)** | 10 h × 90 MW × 1.0 + 30 m³ | **≈0.93 MLD (peak ÷ average ≈ 3.5)** |
| **Off-site (grid)** | 744,600 × 1.15 × 1.5 L/kWh | **≈1,284 ML/yr (3.5 MLD), about 13× on-site** |

**Interpretation.** On site, DLC is about 13 times less water-intensive than evaporative cooling. But its demand is peaky and its footprint is dominated by electricity, so power sourcing is a water decision.

### 2.5 Measurement and accounting standards

**Meters:** M1 intake by source (borewell telemetry, tanker logs); M2 RO permeate and reject; M3 tower make-up; M4 blowdown; M5 humidifier feed; M6 domestic and STP; M7 reuse; M8 final discharge. Add conductivity for continuous CoC and 15-minute logging.

| Standard | What it requires | Relevance |
|---|---|---|
| **ISO 46001:2019** | Water-efficiency management system (baselines, indicators, Plan-Do-Check-Act) | Management wrapper |
| **AWS Standard 2.0** | Site + catchment stewardship, certification | Best fit for "impact" |
| **GRI 303** | Withdrawal, discharge, consumption by source and stressed area | Used company-wide, not per site |
| **CDP Water Security** | Facility-level data in stressed basins | Few Indian respondents |
| **SEBI BRSR Core** | Assured withdrawal by source, consumption, intensity, discharge | Listed companies only (for example Bharti Airtel, parent of Nxtra) |
| **EU Delegated Regulation 2024/1364** | Sites ≥500 kW report total water input (W_IN) and potable input (W_IN-POT); WUE = W_IN ÷ E_IT; annually by 15 May | Template. The 2024 EU average WUE was 0.58 against the Climate Neutral Data Centre Pact target of 0.4. |
| **ISO/IEC 30134-9:2022** | WUE KPI with withdrawal-type and consumption-type categories | Like-for-like if category declared |
| **The Green Grid WUE** | Site and source WUE | Original definition |

---

## 3. Water intensity metrics

### 3.1 L/MWh and WUE

- **Site WUE** = site water ÷ IT energy (declare withdrawal or consumption basis).
- **Source WUE** = (site water + electricity water) ÷ IT energy.
- **Total WUE ≈ site WUE + PUE × EWIF** (EWIF = energy water intensity factor, L/kWh).
- **L/MWh = WUE × 1,000.** For example, 1.80 → 1,800 L per MWh of IT energy, or 1,385 L per MWh of facility energy at PUE 1.30.

**Worked example (50 MW, CoC 5, Karnataka EWIF 1.5):** site 1.80 (withdrawal) or 1.45 (consumption) + off-site 1.30 × 1.5 = 1.95, giving **3.75 or 3.40 L/kWh**. If marginal power comes from Raichur Thermal Power Station (CAG norm 3.08 m³/MWh; actual 5.1–7.9 in 2013–17), off-site becomes 4.0–10.3 L/kWh.

**Benchmarks (L/kWh):**

- AWS: 0.12 (2025), 0.15 (2024), withdrawal
- Meta: 0.19 (2024), withdrawal
- Microsoft: 0.30 (FY2024), down from 0.49 (2021), withdrawal
- LBNL US average: about 0.36, site
- EU average: 0.58 (2024)
- Equinix: 0.91 global; 1.41 at evaporative sites
- Industry average quoted by AWS (de Vries-Gao 2025): 0.56 consumption, 0.84 withdrawal
- LBNL US grid indirect: 4.52

### 3.2 L/MW (per MW of IT capacity)

**L/MW/yr = WUE × 8,760 × load factor × 1,000.**

| Case | WUE | Annual per MW | Daily per MW |
|---|---|---|---|
| Evaporative, CoC 5 | 1.80 | 12.6 ML | 34.6 m³ |
| Evaporative, CoC 3 | 2.21 | 15.5 ML | 42.4 m³ |
| WELL Labs heuristic | ≈3.0 (100% load) | 26 ML | 71 m³ |
| Adiabatic | 0.40 | 2.8 ML | 7.7 m³ |
| Dry | 0.05 | 0.35 ML | 1.0 m³ |

Capacity metrics suit allocations (for example, 650 KLD allotted to ETL Secure Space) but hide utilisation.

### 3.3 L/server-hour

**L/server-hour = server power (kW) × WUE** (plus P × PUE × EWIF for the total).

- **0.5 kW server:** 0.90 L (evaporative) or 0.025 L (dry), plus about 1.0–1.1 L off-site.
- **1.0 kW server:** 1.80 L or 0.05 L, plus about 2.0–2.2 L off-site.

### 3.4 L/GPU-hour

**Assumptions (approximate vendor figures, not independently verified):**

- **H100:** 700 W TDP; about **1.0 kWh of IT energy per GPU-hour** including host share.
- **B200:** 1,000 W; about **1.4 kWh per GPU-hour**.
- **GB200 NVL72:** about 120 kW per rack (72 GPUs).

| Accelerator | On-site, evaporative (1.80) | On-site, DLC (0.13) | Off-site (PUE × 1.5) | Total (evaporative / DLC) |
|---|---|---|---|---|
| H100 per GPU-hour | 1.8 L | 0.13 L | 1.95 / 1.73 L | 3.75 / 1.86 L |
| B200 per GPU-hour | 2.5 L | 0.18 L | 2.7 / 2.4 L | 5.2 / 2.6 L |
| GB200 NVL72 per rack-hour | n/a (requires DLC) | 15.6 L | 207 L | ≈223 L (≈3.1 L per GPU-hour) |

A 30-day, 10,000-GPU H100 run in a Bengaluru DLC facility uses about 0.9 ML on site and 12.5 ML off site.

### 3.5 L/inference and training

| Source | Figure | Boundary |
|---|---|---|
| **Google** (August 2025) | **0.26 mL** per median Gemini Apps text prompt (0.24 Wh); narrow approach 0.12–0.15 mL | On-site consumption; fleet-average WUE; excludes electricity water; prompt length unspecified |
| **Sam Altman** (June 2025) | ≈0.32 mL; 0.34 Wh | Method undisclosed |
| **Li, Yang, Islam & Ren** (UC Riverside), *Making AI Less Thirsty* | 500 mL per **10–50** GPT-3 responses. The paper's India column: **19.7 mL per request**, all off-site (on-site WUE 0, EWIF 3.445). | On-site + off-site |
| **Mistral AI LCA** (Carbone 4, ADEME) | **45 mL** per 400-token response; 1.14 gCO₂e | Full life cycle; training + inference = 91% of water |
| **GPT-3 training** | 5.4 ML total incl. 0.7 ML on-site (US); India case 6.34 ML | Li et al. |
| **Mistral Large 2** | 281,000 m³ (training + 18 months of use) | LCA |

**Bengaluru calculation (0.3 Wh prompt):**

- On-site: 0.3 ÷ 1.30 × 1.80 = **0.42 mL** (evaporative) or 0.3 ÷ 1.15 × 0.13 = **0.03 mL** (DLC).
- Off-site: 0.3 × 1.5 = **0.45 mL** (about 1.5 mL on coal).
- **Total: 0.5–0.9 mL**, up to about 2 mL on coal. That is 2–7× Google's headline but 10–50× below GPT-3-era estimates.

**Image and video (indicative only):**

- Image at about 2.9 Wh: **about 8 mL** (on-site + off-site).
- 5-second video at about 3.4 MJ: **about 2.7 L per clip**.

**GPT-3 trained in Bengaluru (evaporative):** 1,287 MWh × 1.80 = 2.3 ML on site + 2.5 ML off site = **about 4.8 ML**.

### 3.6 Which metric for which audience, pitfalls and normalisation

| Audience | Best metrics |
|---|---|
| Operator | Monthly site WUE, CoC, make-up per tower cell |
| Regulator / utility (BWSSB, KGWA, KSPCB) | Withdrawal by source (MLD, peak day), consumption, discharge quality |
| Customer | Source WUE, L/GPU-hour, L/inference with declared boundary |
| Citizen | Share of ward or taluk supply, people-equivalents, scarcity-weighted footprint |
| Investor | Consumption in stressed areas; replenishment vs consumption |

**Pitfalls:**

1. Functional unit ("per prompt" without tokens).
2. Boundary: on-site vs off-site vs life cycle. Hardware manufacturing water is usually excluded.
3. Withdrawal vs consumption WUE (ratio 1.2–1.5×).
4. Utilisation effects on per-MW metrics.
5. Annual averages hide peaks. Ren: WUE "does not reflect peak water demand".
6. Location blindness.

**Normalise** by reporting withdrawal, consumption and discharge × source × month, then derive intensities from that.

### 3.7 Single comparison table: Bengaluru scenarios

| Metric | S1: 20 MW colocation, evaporative (PUE 1.40, 70%) | S2: 50 MW hyperscale, evaporative, CoC 5 (PUE 1.30, 80%) | S3: 50 MW dry (PUE 1.45, 80%) | S4: 100 MW AI DLC + adiabatic (PUE 1.15, 85%) |
|---|---|---|---|---|
| IT energy (GWh/yr) | 122.6 | 350.4 | 350.4 | 744.6 |
| Site withdrawal (ML/yr; MLD) | 221; 0.60 | 647; 1.77 | 17.5; 0.05 | 97; 0.27 |
| Peak day (MLD) | 0.81 | 2.4 | 0.05 | 0.93 |
| Site WUE / L per MWh | 1.80 / 1,800 | 1.85 / 1,850 | 0.05 / 50 | 0.13 / 130 |
| Off-site (PUE × 1.5) | 2.10 | 1.95 | 2.18 | 1.73 |
| **Total / source WUE** | **3.90** | **3.80** | **2.23** | **1.86** |
| ML/MW/yr (site) | 11.0 | 12.9 | 0.35 | 0.97 |
| L per server-hour (0.5 kW), site / total | 0.90 / 1.95 | 0.93 / 1.90 | 0.025 / 1.11 | 0.065 / 0.93 |
| L per H100-hour, site / total | 1.8 / 3.9 | 1.85 / 3.8 | 0.05 / 2.2 | 0.13 / 1.9 |
| mL per 0.3 Wh prompt, site / total | 0.39 / 0.84 | 0.43 / 0.88 | 0.01 / 0.46 | 0.03 / 0.48 |

---

## 4. Local context

### 4.1 Data centre use against Bengaluru's water availability

**Supply:**

- **Cauvery.** Stages I–IV supply about 1,450 MLD. Stage V (commissioned 16 October 2024) adds 775 MLD, for 2,225 MLD of capacity. The government told the Legislative Council on 20 August 2026 that about **1,935 MLD** is actually supplied: Stage V delivers about 485 MLD, with 290 MLD to be phased in "in accordance with the demand in the 110 villages". Stage VI (500 MLD) is at DPR stage.
- **Groundwater.** Bengaluru Urban district extraction reached **1,457 MLD in 2024**, up from 600 MLD in 2020 (OpenCity, from the state's *Dynamic Ground Water Resources* report). The corporation area accounted for 547 MLD and Anekal about 295 MLD. 2024 followed a drought.
- **Total and demand.** Experts quoted by Deccan Herald estimate about **3,100 MLD** in total. WELL Labs (*How Water Flows Through Bengaluru*, October 2023) estimates total freshwater demand at about 2,632 MLD. The domestic norm alone (about 14 million people × 135 LPCD) is about 1,890 MLD before losses (historically about 30–40% unaccounted-for water). The deficit is concentrated in borewell-dependent peripheral zones (Mahadevapura, KR Puram, the 110 villages).

**Groundwater (CGWB/KGWA categories):**

- Karnataka: 68.44% stage of extraction (2024), 45 of 237 taluks over-exploited; 66.49% in 2025.
- All Bengaluru Urban taluks are over-exploited.
- **Bangalore East: 305% (2024)**, extracting 138.46 MLD against about 45 MLD of sustainable use.
- Devanahalli: 169%.
- **Conflict:** the 379–395% figures used earlier in this series reflect earlier assessments or boundaries. The corporation area has been assessed separately since 2022.

**Where data centres sit.** Whitefield and Mahadevapura host about 120 MW across seven major facilities. The other clusters (east and south-east, Devanahalli–Hoskote) are all in over-exploited, tanker-dependent zones.

**Sector use: estimates disagree fivefold:**

| Estimate | Value | Basis |
|---|---|---|
| Karnataka IT department (2026) | ≈4 MLD across 32 facilities statewide | Informal "industry-wide approximation" |
| WELL Labs (Shashank Palur) | ≈20 MLD | 26 ML/MW/yr × capacity (about 292 MW across 18 centres) |
| DTE permissions (2013–2025) | ≈812.9 ML/yr (≈2.2 MLD) | Allocations, not use |
| BWSSB billing | 129,000 L/month for five centres | Shared meters make it meaningless |
| **This report** | 292 MW × 70% × 24 h × 1.8 ≈ **8.8 MLD** if all evaporative; about 4–5 MLD if half air-cooled | Cooling mix explains the gap |

The 4–20 MLD range is itself the finding. KSPCB officials told reporters they could not quantify data centre water use.

**S2 (50 MW evaporative, 1.77 MLD) as a share of local resources:**

- BWSSB delivered supply (1,935 MLD): 0.09%
- City total (≈3,100 MLD): 0.06%
- District groundwater extraction (1,457 MLD): 0.12%
- **Bangalore East sustainable groundwater (≈45 MLD): ≈3.9%**
- Undelivered Stage V balance (290 MLD): 0.6%

### 4.2 Household, agricultural and industrial demand

- **Bengaluru Urban groundwater use (2024):** about half irrigation (peri-urban), about 30% domestic, the rest industrial. Within the corporation area: 73% domestic, 27% industrial.
- **Karnataka:** about 88% of groundwater extraction is for irrigation (CGWB); irrigation is about 85–90% of total water use.
- **Treated wastewater is already allocated.** K&C Valley and related schemes pump treated water to Kolar and Chikkaballapur tanks for aquifer recharge, so it has existing claimants.

### 4.3 Equivalence metrics (S2, 50 MW evaporative)

| Equivalence | Result |
|---|---|
| People at 135 LPCD (1.77 MLD) | ≈13,100 people |
| Households (675 L/d) | ≈2,600 households |
| Paddy (≈12,500 m³/ha per season, typical value) vs 508,700 m³ consumed | ≈41 ha |
| Ragi (≈4,000 m³/ha) | ≈127 ha |
| WELL Labs framing, 20 MLD sector-wide | "drinking water for around 1.3 lakh people" |
| Karnataka's 1 GW target, all evaporative at S2 intensity | ≈12.9 GL/yr ≈ 35 MLD (about 1.8% of BWSSB delivered supply); about 71 MLD at WELL Labs intensity |
| 1 GW, DLC or dry | ≈1–3 MLD on site |
| 1 GW off-site (80% load, PUE 1.3, 1.5 L/kWh) | ≈37 MLD, regardless of cooling |

A 50 MW evaporative site consumes about as much as a mid-sized brewery or bottling plant and far less than a coal plant (3–5 m³/MWh). The meaningful comparison is with local renewable supply.

### 4.4 Temporal context

- **Monsoon.** Most rain falls June–October (about 900 mm/yr). Cauvery inflows depend on the Kodagu and Wayanad catchments and the KRS reservoir. A failed monsoon hits the following summer.
- **2024 crisis.** About 6,997 of 14,781 public borewells failed (Deputy Chief Minister, March 2024). BWSSB banned non-essential potable use, city groundwater extraction quadrupled, tanker prices surged and authorities capped them.
- **Peak coincidence.** Evaporative demand peaks in April–May at 1.3× average, the tanker-scarcity window.
- **2026.** DTE warned of an El Niño-weakened monsoon.
- **Implication.** Permits need peak-month numbers and drought-curtailment plans.

---

## 5. Water stress

### 5.1 Frameworks

| Framework | Definition | Scale | Bengaluru / India |
|---|---|---|---|
| **WRI Aqueduct 4.0 baseline water stress** | Withdrawal ÷ available renewable supply (sub-basin) | Low <10%, low–medium 10–20%, medium–high 20–40%, high 40–80%, extremely high >80% | WRI lists India among the 25 "extremely high" countries (2023); a 2026 preprint scores it 3.05 ("high"). **Conflict flagged.** WRI India finds more than half of India's data centres in high or extremely-high stress areas. S&P Global Sustainable1 (September 2025) projects that "60% to 80%" of India's operating data centres will face high water stress this decade, with an average data centre water stress index of 62. Sub-basin scores for Bengaluru, Cauvery, Krishna (Raichur) and Pennar were not verifiable from text sources. |
| **AWARE (WULCA)** | CF = world-average available water remaining per area ÷ regional value | 0.1–100 m³ world-eq/m³; consumption-weighted world averages **43 (unspecified), 20 (non-agricultural), 46 (agricultural)** | India sub-national CFs exist in AWARE 1.2; AWARE 2.0 (2025) generally lowers CFs. **India and basin values not verified here.** Scenario values are used below. |
| **WWF Water Risk Filter** | Composite basin physical, regulatory and reputational risk | 1–5 | Portfolio screening |
| **CGWB stage of extraction** | Extraction ÷ extractable recharge | Safe <70, semi-critical 70–90, critical 90–100, over-exploited >100% | Most relevant locally: Bangalore East 305%, Devanahalli 169% |
| **Falkenmark** | Renewable m³/person/year | <1,700 stress; <1,000 scarcity; <500 absolute | India near or below 1,700 nationally (approximate). Bengaluru's delivered water is about 80 m³/person/year, almost all imported Cauvery water. |

### 5.2 Methods

1. **Scarcity-weighted footprint (ISO 14046).** WSF = Σ consumptionᵢ × CFᵢ, for on-site and off-site (power-plant basin) consumption, monthly where possible.
2. **Materiality thresholds** (proposed by this report):

| Ratio | Disclose | Significant | Material |
|---|---|---|---|
| Consumption ÷ catchment renewable availability | >0.1% | >1% | >5% |
| Withdrawal ÷ ward or zone supply | >1% | >5% | >10% |
| Groundwater withdrawal ÷ taluk recharge | any (over-exploited) | >0.5% | >1% or any evaporative use in over-exploited taluks |
| Peak-month withdrawal ÷ summer deficit | >0.5% | >2% | >5% |

3. **Contextual targets** (CEO Water Mandate / WRI contextual water targets; SBTN freshwater targets). Set targets by the basin's required reduction. Bangalore East (305%) needs about a two-thirds cut, so new users should target **net-zero groundwater consumption plus recharge**.
4. **Stewardship (AWS Standard).** Catchment study, stakeholder engagement (BWSSB, lake groups, Kolar farmers), and replenishment **in the same catchment and season**.

### 5.3 Applying the methods to Bengaluru scenarios (50 MW, annual)

**Illustrative CFs (not verified AWARE values):**

- Over-exploited aquifer: 100.
- BWSSB potable: 60.
- Reclaimed water: 30 (60 × 0.5 opportunity factor for K&C Valley users).
- Off-site grid / Krishna basin: 50.

Off-site consumption is facility energy × 1.5 L/kWh: 683 ML/yr for evaporative and 762 ML/yr for dry. A renewable PPA has an EWIF of about 0.1.

| Scenario | On-site consumption (ML/yr) | CF | On-site WSF (Mm³-eq) | Off-site (ML/yr) | Off-site WSF | **Total WSF** | Materiality |
|---|---|---|---|---|---|---|---|
| **A.** Evaporative, Bangalore East groundwater | 508.7 | 100 | 50.9 | 683 | 34.2 | **85.0** | 3.9% of taluk recharge: **material** |
| **B.** Evaporative, BWSSB potable | 508.7 | 60 | 30.5 | 683 | 34.2 | **64.7** | 0.09% of city supply, but drinking water: **significant** |
| **C.** Evaporative, TTW + RO | 508.7 | 30 | 15.3 | 683 | 34.2 | **49.4** | Competes with K&C Valley: disclose |
| **D.** Dry, municipal top-up | 17.5 | 60 | 1.1 | 762 | 38.1 | **39.2** | Immaterial on site |
| **E.** Dry + renewable PPA | 17.5 | 60 | 1.1 | 51 | 2.5 | **3.6** | Immaterial |
| **F.** 100 MW AI DLC on TTW | ≈80 | 30 | 2.4 | 1,284 | 64.2 | **66.6** (13.6 with PPA) | Off-site dominated |

**Findings:**

1. Moving from A to D cuts the scarcity-weighted footprint by **54%**, even though off-site water rises about 12%. Adding renewables (E) cuts it by about 96%.
2. Reclaimed water helps less than claimed: consumption is unchanged and it has claimants.
3. **The off-site Krishna-basin term is the largest single component in every non-groundwater case.** Raichur units have shut in droughts for lack of Krishna water, and actual consumption there (5.1–7.9 m³/MWh) is about double the norm. Procurement is water policy.
4. The ranking is robust for CFs from 20 to 100; absolute values must be recomputed with official AWARE factors.

### 5.4 Water impact scorecard

Scores run from 1 (low) to 5 (high impact); weights in brackets.

| Dimension (weight) | A. Evaporative, groundwater | B. Evaporative, potable | C. Evaporative, TTW + RO | D. Dry | F. AI DLC on TTW | E. Dry + PPA |
|---|---|---|---|---|---|---|
| **Volume** (20%): consumption per MW | 5 | 5 | 5 | 1 | 2 | 1 |
| **Source** (25%): over-exploited groundwater 5 … none 1 | 5 | 4 | 3 | 2 | 3 | 2 |
| **Timing** (15%): peak and summer coincidence | 4 | 4 | 4 | 1 | 4 | 1 |
| **Location / stress** (25%) | 5 | 4 | 4 | 4 | 4 | 4 |
| **Off-site** (15%) | 3 | 3 | 3 | 4 | 3 | 1 |
| **Weighted score** | **4.6** | **4.0** | **3.8** | **2.6** | **3.3** | **1.9** |
| **Decision** (≥4 refuse/redesign; 3–4 conditional; <3 acceptable) | **Refuse** | **Redesign** | **Conditional** | **Acceptable** | **Conditional** (peak cap, PPA) | **Preferred** |

---

## Hyperscaler and Indian operator water reporting: practices and gaps

| Company | Latest disclosures | Gaps |
|---|---|---|
| **Google** | 2024 consumption 8.1 billion gallons (+28%); replenished 4.5 billion gallons = **64%** (18% in 2023); original target 120% by 2030. Secondary summaries of the 2026 report show 2025 consumption of about 10.9 billion gallons (+34%) and more than 7 billion gallons replenished. The June 2026 pledge is to replenish more than it consumes at its sites by 2030 (165 projects, 97 watersheds). | Consumption growing faster than replenishment; replenishment not necessarily in the same catchment; per-prompt figure excludes electricity water |
| **Microsoft** | WUE **0.30** (FY2024, withdrawal), down from 0.49 (2021); zero-water-evaporation designs since August 2024 (pilots at Phoenix and Mt Pleasant from 2026, coming online from late 2027), which Microsoft's VP of Datacenter Infrastructure Engineering Steve Solomon says will save more than 125 million litres of water per datacenter per year | "Nominal" energy increase; claims not independently reviewed; legacy fleet still evaporative |
| **AWS** | WUE **0.15** (2024) and **0.12** (2025); **53% → 75%** toward water positive by 2030; claims water positive in India (returned 120% in 2025) | No Indian site volumes or sources; relies on replenishment accounting |
| **Meta** | WUE **0.19** (2024); consumption 3,123 ML; restores 200% (high stress) and 100% (medium stress); 1.6 billion gallons restored in 2024; construction water reported separately | US-centric |

**Indian operators** (DTE, November 2025):

- **Nxtra:** FY2025 consumption 216,357 KL (9,876 KL groundwater; 191,152 KL third-party); 15,329 KL recycled; no prior-year data.
- **STT GDC:** global withdrawal 1,149,020 KL (2024). India was 419,204 KL in 2023 (40% of global); no 2024 India split.
- **NTT:** withdrew 413,779 KL and consumed 203,297 KL (2023); omitted in 2025.
- **Sify:** 6,132,323 KL (FY2024) fell to 306,916 KL (FY2025), unexplained.
- **CtrlS:** 409,037 KL (FY2024) against 468,330 KL; claims a 119,662 KL/yr saving from air cooling without facility counts.
- **AdaniConneX:** no standalone report.
- **Yotta:** no figures; advocates "air-cooled + liquid-cooled + closed-loop systems, not water-cooled towers".

**Systemic gaps:**

1. No facility-level data.
2. Withdrawal and consumption confused.
3. Inconsistent WUE.
4. Recycling claimed without the matching freshwater withdrawal.
5. Private operators fall outside BRSR. CEEW and SYSTEMIQ (February 2026) found water risk systematically underestimated, most state policies lacking PUE and WUE standards, and about 271 data centres (January 2026). Press coverage cites an industry estimate of about 150 billion litres used in 2025, rising to nearly 358 billion litres by 2030. That is about 100 ML/MW across about 1.5 GW, about four times the WELL Labs heuristic, so it likely includes off-site water. Clarify its boundary before quoting it.

---

## Recommendations

### A. Minimum measurement and disclosure framework (all sites ≥500 kW IT)

| # | Metric | Granularity | Basis |
|---|---|---|---|
| 1 | Withdrawal by source (potable, groundwater, tanker, TTW, rainwater) | m³, **monthly**, per site | GRI 303-3; EU 2024/1364 |
| 2 | Consumption (withdrawal − discharge, cross-checked by CoC) | m³, monthly | GRI 303-5; ISO 14046 |
| 3 | Discharge volume and quality | m³, mg/L | GRI 303-4; CPCB / KSPCB |
| 4 | Site WUE, withdrawal **and** consumption (ISO/IEC 30134-9 category declared) | L/kWh, monthly and annual | The Green Grid |
| 5 | Source WUE (location-based and market-based) | L/kWh | The Green Grid |
| 6 | Scarcity-weighted footprint (on-site + off-site) | m³ world-eq (AWARE version declared) | ISO 14046 |
| 7 | Seasonal profile | Peak-day MLD, peak-month ÷ average, storage hours | — |
| + | Context ratios | Share of taluk groundwater and ward supply | CGWB / BWSSB |

Reporting should be site-level, assured and public. Recycled-water claims must sit alongside gross freshwater withdrawal; replenishment should be reported separately and counted only within the same catchment.

### B. Regulatory adoption

- **Karnataka Sustainable Data Centre Policy 2026–31** (approved September 2026; 1 GW target; ₹1,300.45 crore outlay):
  - It mandates **plant-wise PUE and WUE reporting** and "Data Centre Resource Heat Mapping" for siting. That is welcome.
  - Its treated-water incentive (100% reimbursement, **capped at ₹8 lakh per year**) is too small. At ₹99/kL it buys about 22 m³/day, about 1% of a 50 MW evaporative plant's make-up. Scale it to volume or replace it with a mandate.
  - Press coverage reports no numeric WUE ceiling. We suggest:
    - New builds in Bengaluru Urban and Rural: **consumption WUE ≤0.2 and no groundwater or potable water for cooling**.
    - Elsewhere: **≤0.5**.
    - Existing sites: **≤1.0 by 2028**.
- **KGWA:** no new groundwater abstraction for cooling in over-exploited taluks; public telemetry on data centre borewells.
- **BWSSB:** dedicated metered data centre connections; summer-curtailment clauses; price TTW below potable and tanker water; allocate reclaimed water transparently against K&C Valley commitments.
- **KSPCB:** tie consents to the water balance, blowdown and RO-reject management, and drought plans. Bring campuses above about 20 MW under environmental assessment, closing the IT/ITeS exemption.
- **MeitY:** make the seven-metric disclosure mandatory nationally, regardless of listing status, with an EU-style database.
- **SEBI BRSR:** a sector annex with site-level WUE and stressed-area consumption for listed parents.

### C. Suggested thresholds

| Indicator | Green | Amber | Red |
|---|---|---|---|
| Site consumption WUE (L/kWh) | ≤0.2 | 0.2–1.0 | >1.0 |
| Groundwater for cooling, over-exploited taluks | 0% | — | >0% |
| Withdrawal ÷ taluk recharge | <0.5% | 0.5–1% | >1% |
| Peak ÷ average without curtailment plan | <1.5 | 1.5–3 | >3 |
| Source WUE (L/kWh) | <1.0 | 1.0–2.5 | >2.5 |
| Scorecard | <3 | 3–4 | ≥4 |

---

## Caveats

- **Modelled, not metered.** Balances rest on stated assumptions; real sites can differ by ±30–50%, as the twofold gap with WELL Labs shows.
- **AWARE and Aqueduct values are illustrative.** Official India and basin AWARE factors and Aqueduct sub-basin scores for Bengaluru and Raichur could not be verified from text sources. Rankings are robust; absolute m³-eq values are not. India's national Aqueduct rating is reported inconsistently.
- **Sector totals are contested.** Bengaluru estimates (4, about 9, 20 MLD) and the national 150 GL figure use different boundaries; none is metered.
- **Groundwater figures shift with year and boundary.** Bangalore East was 305% in 2024 against 379–395% in earlier assessments; 2024 followed a drought.
- **Corporate data are self-reported.** Some 2025 Google figures come from secondary summaries. Withdrawal-based and consumption-based WUEs are not comparable.
- **AI per-unit estimates move fast.** GPU, image, video and prompt energy figures are indicative; Google reports that energy per median Gemini text prompt fell 33x between May 2024 and May 2025.
- **Equivalences and limits are typical values.** Crop water, per-capita norms, water-quality limits and CPCB limits are used for scale, not site determinations.
- **Policy details** come from press reports of the cabinet approval; the notified text may differ.

## Sources

1. <https://nammaward.in/wardpulse/cauvery-5th-stage-is-supplying-485-mld-of-its-775-mld-capacity>
2. <https://www.deccanherald.com/amp/story/india%2Fkarnataka%2Fbengaluru%2Fin-bankrolling-more-pipeline-projects-govt-losing-sight-of-water-3244062>
3. <https://opencity.in/bengaluru-and-ground-water/>
4. <https://www.deccanherald.com/india/karnataka/86-taluks-contaminated-bengaluru-over-exploited-groundwater-report-3961002>
5. <https://services.google.com/fh/files/misc/measuring_the_environmental_impact_of_delivering_ai_at_google_scale.pdf>
6. <https://noxtel.mx/the-water-your-data-center-does-not-use-according-to-the-provider-why-the-reported-wue-is-half-of-the-real-one/>
7. <https://gpusmith.com/articles/en/how-much-water-do-data-centers-use>
8. <https://en.wikipedia.org/wiki/Water_usage_effectiveness>
9. <https://sustainability.atmeta.com/wp-content/uploads/2025/10/Meta_2025-Environmental-Data-Index.pdf>
10. <https://www.downtoearth.org.in/science-technology/indias-digital-thirst-data-centres-are-rising-in-water-scarce-regions-and-locals-are-paying-the-price>
11. <https://www.downtoearth.org.in/science-technology/indias-digital-thirst-how-bengalurus-tech-dreams-are-colliding-with-a-worsening-water-crisis>
12. <https://www.newslaundry.com/2026/04/16/in-bengalurus-water-stressed-areas-sit-most-of-its-data-centres>
13. <https://ibcworldnews.com/2026/02/22/data-centre-boom-deepens-water-crisis-in-bluru/>
14. <https://datacenter-forum.ro/en/new-reporting-requirements-for-data-center-operators-introduced-by-the-delegated-regulation-eu-2024-1364/>
15. <https://scienceshot.com/post/eu-data-centre-reporting-eed>
16. <https://energy.ec.europa.eu/document/download/8a87a5fe-0260-462a-b165-09f1496d1aa0_en?filename=COM_2026_500_1_EN_ACT_part1_v4.pdf>
17. <https://cag.gov.in/uploads/download_audit_report/2018/Chapter_2_Performance_Audits_relating_to_Government_Companies_of_Report_No_3_of_2018_-_Public_Sector_Undertakings_Government_of_Karnataka.pdf>
18. <https://sustainability.aboutamazon.com/stories/takeaways-from-the-amazon-sustainability-report>
19. <https://aws.amazon.com/sustainability/>
20. <https://www.microsoft.com/en-us/microsoft-cloud/blog/2024/12/09/sustainable-by-design-next-generation-datacenters-consume-zero-water-for-cooling/>
21. <https://sustainability.aboutamazon.com/products-services/aws-cloud?waterType=true>
22. <https://rpmwes.com/blog/how-much-water-data-center-use/>
23. <https://apstechadvisors.com/data-center-water-consumption-in-the-us-challenges-trends-and-market-opportunities-for-2025-2030/>
24. <https://blog.andymasley.com/p/an-example-of-what-i-consider-a-misleading>
25. <https://kanaky.xyz/blog/ai-water-consumption/>
26. <https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference>
27. <https://arxiv.org/pdf/2508.15734>
28. <https://medium.com/@macplanet2012/how-much-water-does-ai-use-per-prompt-5-drops-or-a-bottle-d38c90f22122>
29. <https://arxiv.org/pdf/2304.03271>
30. <https://the-decoder.com/mistral-ai-publishes-the-first-comprehensive-life-cycle-assessment-of-a-large-language-model/>
31. <https://www.devoteam.com/expert-view/ai-water-consumption/>
32. <https://x.com/DeepLearningAI/status/1962621715797725487>
33. <https://www.downtoearth.org.in/science-technology/indias-digital-thirst-what-data-centre-giants-arent-saying-about-their-water-use>
34. <https://www.deccanherald.com/amp/story/india%2Fkarnataka%2Fbengaluru%2Fbwssb-added-276-lakh-water-connections-since-2014-3488920>
35. <https://www.njsei.com/success-stories/karnataka-government-announces-cauvery-stage-vi-project-to-cater-to-water-demand-of-bengaluru/>
36. <https://www.deccanherald.com/amp/story/india%2Fkarnataka%2Fbengaluru%2Fbwssb-plans-to-draw-500-mld-water-under-cauvery-6th-phase-3364603>
37. <https://www.propnewz.com/blog/bwssb-cauvery-stage-5-water-buyer-checklist-2026-05-25>
38. <https://cgwb.gov.in/cgwbpnm/public/uploads/documents/17482455401275100516file.pdf>
39. <https://www.downtoearth.org.in/water/india-is-using-water-to-build-the-machines-that-tell-us-we-are-running-out-of-it>
40. <https://www.deccanherald.com/amp/story/india%2Fkarnataka%2Fkolars-groundwater-over-exploited-in-karnataka-report-says-1121670.html>
41. <https://neerain.com/bengaluru-water-crisis/>
42. <https://www.theweek.in/news/india/2024/03/12/bengaluru-water-crisis-how-over-exploitation-of-groundwater-caused-scarcity.html>
43. <https://reliefweb.int/report/world/aqueduct-40-updated-decision-relevant-global-water-risk-indicators>
44. <https://bharatnotes.com/subjects/geography/indian-geography/water-resources-irrigation-india/>
45. <https://arxiv.org/pdf/2607.13443>
46. <https://www.etvbharat.com/en/bharat/india-ai-data-centre-boom-heads-for-water-stressed-regions-raising-fresh-concerns-over-resource-security-enn26080706691>
47. <https://wulca-waterlca.org/what-is-aware/>
48. <https://nexus.openlca.org/ws/files/36467>
49. <https://onlinelibrary.wiley.com/doi/10.1111/jiec.70023>
50. <https://www.manglai.io/en/glossary/water-scarcity-footprint-aware>
51. <https://www.constructionworld.in/urban-infrastructure/wastewater-and-sewage-treatment/RTPS-39s-four-units-get-reservoir-water/4460>
52. <https://grokipedia.com/page/Raichur_Thermal_Power_Station>
53. <https://www.rcrwireless.com/20250704/ai-infrastructure/data-center-energy>
54. <https://sustainability.google/google-2025-environmental-report/>
55. <https://axis-intelligence.com/wp-content/dashboard/ai-data-center-water-usage-dashboard.html>
56. <https://qz.com/google-water-replenishment-data-centers-2030-060426>
57. <https://blog.google/company-news/outreach-and-initiatives/sustainability/new-water-stewardship-commitments/>
58. <https://policyreview.info/articles/news/big-techs-2025-sustainability-reports/2027>
59. <https://www.datacenterdynamics.com/en/news/microsofts-upcoming-data-centers-to-use-closed-loop-zero-water-evaporation-design/>
60. <https://refindustry.com/news/microsoft-introduces-zero-water-cooling-for-next-generation-datacenters/>
61. <https://sustainability.aboutamazon.com/natural-resources/water>
62. <https://sustainability.atmeta.com/water/>
63. <https://www.wionews.com/india-news/data-centres-are-not-optional-so-who-s-responsible-for-the-damage-part-2-1783461918187>
64. <https://www.deccanherald.com/india/karnataka/karnataka-targets-1gw-data-centre-capacity-rs-1300-crore-policy-outlay-4151500>
65. <https://www.newslaundry.com/2026/10/01/karnatakas-new-data-centre-policy-puts-water-energy-in-focus-what-does-it-say>
66. <https://flipit.money/flips/karnataka-clears-data-centre-policy-2026-31-aims-for-1-gw-by-2031>
67. <https://www.thenewsminute.com/amp/story/karnataka/karnatakas-new-data-centre-policy-puts-water-energy-in-focus-what-does-it-say>
