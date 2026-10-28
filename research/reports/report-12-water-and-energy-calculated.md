<!-- Report 12 of the India Data Centre Atlas research series (Water and energy, calculated; atlas chapter 8.2). Produced with AI-assisted web research, October 2026, and kept as written at the time. Some figures were corrected later (notably India grid water 4.5 → 2.9 L/kWh and grid CO₂ 0.71 → 0.675 t/MWh, October 2026); the atlas standards register (src/data/standards.js) is authoritative where they differ. -->

# India Data-Centre Water & Energy: Parameters, Formulas and Worked Calculations (Part 12)

For an Indian data centre, cooling technology decides the on-site (direct) water bill, but the grid decides the total water footprint. A dry-cooled 100 MW AI campus on the average Indian grid still carries about 1.5 billion litres a year of off-site water, mostly at coal plants. That is more than six times the direct water of a 20 MW evaporative colo in Mumbai. So procurement (RE-RTC, group captive) matters more than cooling choice for total water. Cooling choice matters most for local peak water demand and for securing water permits.

## TL;DR
- **Direct water:** evaporative towers in Indian climates run at about 1.6–2.5 L/kWh of IT energy [Proxy: tower physics; NTT evaporative sites 1.42–2.93 L/kWh]. Adiabatic/IEC hyperscale designs run at 0.2–0.6 L/kWh annually but spike to about 1.5 L/kWh on April–May afternoons. Closed-loop direct-to-chip with dry coolers runs below 0.05 L/kWh. Microsoft reports a fleet WUE of 0.27 L/kWh (FY25), and LBNL's US average is about 0.36 L/kWh.
- **Indirect water dominates:** the Indian grid's consumptive water intensity models at about 2.3–4.4 L/kWh delivered (default 3.0) [Model: CEA FY25 mix × plant intensities]. Li et al. use 3.445 L/kWh for India. Source WUE = site WUE + PUE × grid intensity, which comes to 6.5 L/kWh for a Mumbai evaporative colo and 2.3 L/kWh for a Bengaluru dry-cooled AI campus. Firm RE (SECI FDRE-RTC at ₹5.25/kWh) is the only lever that cuts total water by more than 90%.
- **Energy and cost:** facility energy = IT kW × utilisation × 8,760 × PUE (Uptime 2025 global average 1.54). Contract demand ≈ peak facility kW ÷ PF. Landed grid power in the worked examples is ₹7.5–11.2/kWh on DISCOM HT tariffs. Group-captive RE-RTC lands at about ₹6.5–7.5/kWh, while third-party ISTS open access often lands at ₹8.5–10/kWh once CSS, the additional surcharge and residual demand charges are added. Model each state, because data-centre tariff category (industrial vs commercial) swings costs by ₹1–2.5/kWh.

## How to read the labels

- **[Verified: source]** means a figure from a primary or authoritative document fetched or confirmed in this research. "Verified-secondary" means it came from a secondary summary of a primary document.
- **[Proxy: basis]** means an analogue, engineering rule or other-country range, adjusted for India.
- **[Model: formula]** means a value computed in this report.

Source codes used in labels:
- LBNL24 — Shehabi et al., 2024 US Data Center Energy Usage Report: https://eta-publications.lbl.gov/sites/default/files/2024-12/lbnl-2024-united-states-data-center-energy-usage-report_1.pdf
- UPT25 — Uptime Institute Global Data Center Survey 2025: https://datacenter.uptimeinstitute.com/rs/711-RIA-145/images/2025.Annual.Survey.Report.pdf?version=0
- GOOG25 — Elsworth et al., Measuring the environmental impact of delivering AI at Google Scale: https://arxiv.org/pdf/2508.15734 ; Google PUE: https://datacenters.google/efficiency/
- MSFT — Microsoft datacenter efficiency: https://datacenters.microsoft.com/sustainability/efficiency/
- LI — Li, Yang, Islam & Ren, Making AI Less "Thirsty": https://dl.acm.org/doi/10.1145/3724499
- NTT — NTT DATA ESG environment data: https://www.nttdata.com/global/en/about-us/sustainability/esg-data/environment-data
- DTE — Down To Earth, India's digital thirst: https://www.downtoearth.org.in/science-technology/indias-digital-thirst-what-data-centre-giants-arent-saying-about-their-water-use
- CEEW — Scaling India's Data Centre Ecosystem: https://www.ceew.in/sites/default/files/ceew-data-centre-study-web-ready-final.pdf
- KADC — Karnataka Sustainable Data Centre Policy 2026–31 (TNM): https://www.thenewsminute.com/karnataka/karnatakas-new-data-centre-policy-puts-water-energy-in-focus-what-does-it-say
- MOEF15 — MoEFCC S.O. 3305(E), 7 Dec 2015 (CPCB): https://cpcb.nic.in/uploads/Thermal_Power_Plant_overview.pdf ; amendments: https://powerline.net.in/2026/09/04/water-stress-thermal-power-plants-take-steps-to-optimise-consumption/
- SD23 — Vulnerability assessment of thermal power plants in India under water stress: https://www.sciencedirect.com/science/article/abs/pii/S0360544223009477
- WRI — WRI, India's thermal plants in water-scarce areas: https://www.wri.org/insights/40-indias-thermal-power-plants-are-water-scarce-areas-threatening-shutdowns
- NREL — Macknick et al., operational water factors: https://docs.nrel.gov/docs/fy11osti/50900.pdf
- MNRE25 — MNRE Renewable Energy Statistics 2024-25: https://cdnbbsr.s3waas.gov.in/s3716e1b8c6cd17b771da77391355749f3/uploads/2025/11/202511061627678782.pdf
- CREA — FY25 generation: https://www.deccanherald.com/amp/story/india%2Fthermal-generation-growth-slowest-in-fy-2024-25-since-covid-3497645
- EU24 — Delegated Regulation (EU) 2024/1364: https://www.eudca.org/documents/content/_wU9NIdhRn2O7FEPP-YZ2Qo33?download=0 ; rating scheme: https://www.philiplee.ie/eu-publishes-draft-mandatory-sustainability-rating-scheme-for-data-centres/
- NERC — NERC/FERC large loads: https://www.ferc.gov/sites/default/files/2025-04/Presentation%20NERC%20Seeks%20to%20Address%20Reliability%20Impacts%20from%C2%A0Large%20Load%20Integration_1.pdf
- IEX — https://www.saurenergy.com/solar-energy-news/iex-dam-prices-drop-nearly-18-yoy-despite-rising-demand-11176360 ; FY25: https://www.business-standard.com/amp/markets/capital-market-news/iex-records-highest-ever-electricity-traded-volumes-in-fy25-125040400233_1.html ; intraday: https://earthsync.io/resources/iex-dam-gdam-rtm-explained
- SECI — FDRE-RTC: https://www.pv-magazine.com/2026/08/10/secis-1-gw-fdre-rtc-power-tender-discovers-inr-5-25-kwh-tariff/ ; FDRE-IX: https://www.pv-magazine.com/2026/08/24/seci-discovers-inr-5-99-kwh-tariff-for-4-hour-peak-renewable-power/
- ISTS — MoP ISTS waiver phase-out: https://www.tndindia.com/waiver-of-ists-charges-on-renewable-energy-to-be-phased-out/
- MERC — MSEDCL MYT press note: https://merc.gov.in/wp-content/uploads/2025/03/Press-Note_MSEDCL-MYT-Order_English.pdf ; TPC-D: https://merc.gov.in/wp-content/uploads/2025/03/Press-Note_MYT-Order_TPC_English.pdf
- TGERC — TGSPDCL FY26 tariff schedule: https://tgsouthernpower.org/resources/PDF/Tariffs/63tarifffile.pdf
- KERC — KERC Tariff Order 2025 schedule: https://hrecs.co.in/app/documents/TariffRates2026-27-28.pdf
- TNERC — TN Tariff Order 6/2025 summary: https://www.ecloudsenergy.com/news-details.php?nid=52
- GEOA — GEOA Rules 2022 gazette: https://www.acma.in/uploads/ciculer-attachement/Electricity%20(Promoting%20Renewable%20Energy%20through%20Green%20Energy%20Open%20Access)%20Rules,2022.pdf ; FOR model: https://forumofregulators.gov.in/Data/Reports/Revised%20Model%20regulation%20GEOA.pdf
- NVDA — NVIDIA DGX B200 guide: https://docs.nvidia.com/dgx/dgxb200-user-guide/introduction-to-dgxb200.html ; GB200 NVL72: https://pantheon.run/learn/nvidia-gb200-nvl72-power-and-cooling

---

## Key Findings

1. **Direct water is a cooling-design choice, and the gap between designs is about 50×.** Year-round evaporative cooling (chillers with open towers) puts Indian sites at about 1.6–2.5 L/kWh. NTT's evaporative-only sites reported 2.93, 2.77 and 1.42 L/kWh in FY2022–24 [Verified: NTT]. Air-side economiser with adiabatic assist or IEC brings that to 0.2–0.6 L/kWh, and closed-loop liquid cooling with dry coolers to below 0.05 L/kWh. Microsoft's Asia-Pacific WUE jumped from 0.03 L/kWh (FY24) to 0.25 L/kWh (FY25), which shows how quickly regional numbers move as new sites enter the fleet [Verified: MSFT].
2. **Indirect water is 2–60× the direct water, and Indian disclosures ignore it.** LBNL estimates that the roughly 176 TWh used by US data centres in 2023 consumed "nearly 800 billion liters" (about 211 billion gallons) at power plants, or 4.52 L/kWh, against 66 billion litres direct [Verified: LBNL24]. India's coal-heavy grid (thermal was about 75% of the FY25 generation of 1,824 BU) gives a modelled 2.3–4.4 L/kWh at the consumer meter [Model].
3. **Peak water, not annual water, is the binding constraint for adiabatic designs.** A Hyderabad adiabatic hyperscale site draws about 2.1× its annual-average daily water on a May design day, and about 3.7× its average hourly rate at 14:00–15:00 [Model, Example B]. Tower-based Mumbai colos peak at only about 1.5× [Model, Example A]. Size supply connections and storage to the peak-day figure.
4. **Water peaks at solar noon, when power is cheapest; electricity is dearest in the evening.** June 2026 IEX averages bottomed at ₹1.17/kWh at 11:00 and peaked at ₹9.90/kWh at 22:30 [Verified-secondary: IEX/earthsync]. Running chillers "dry" during midday water peaks trades cheap kWh for scarce litres. This is the core co-optimisation for Indian sites.
5. **India's disclosure base is thin.** DTE found that Nxtra and CtrlS publish no WUE, and CtrlS reported only total water (409,037 kL in 2023-24) [Verified: DTE]. Karnataka's 2026–31 policy is the first to require plant-wise PUE and WUE reporting, with a water-charge reimbursement for a WUE of 0.7–1.3 L/kWh [Verified: KADC].
6. **Firm RE is now priced near or below coal.** SECI's FDRE-RTC tender cleared at ₹5.25/kWh, and 4-hour assured peak power at ₹5.99/kWh [Verified: SECI]. Coal PPAs signed in 2025 started at ₹5.38–6.30/kWh [Verified-secondary: IECC via SaurEnergy]. ISTS-charge waivers fall to zero for projects commissioned after July 2028 [Verified: ISTS]. For a data centre, landed cost depends on state surcharges more than on generation price.

---

## 1. Direct (on-site) water

### 1.1 Definitions and metrics

| Term | Definition | Unit | Label |
|---|---|---|---|
| Withdrawal | Water taken from any source (municipal, groundwater, tanker, STP-treated) | kL, m³ | [Verified: LBNL24; WRI] |
| Consumption | Withdrawal minus discharge; mostly evaporation and drift | kL | [Verified: LBNL24 — "permanently removed from the immediate water cycle"] |
| Discharge | Blowdown, RO reject, sanitary sewage returned | kL | [Proxy: water-balance convention] |
| WUE (site) | Annual site water ÷ annual IT energy. Microsoft: "annual liters of water used for humidification and cooling" ÷ IT kWh | L/kWh_IT | [Verified: MSFT; LBNL24] |
| WUE (source) | Site WUE plus water used to generate the electricity consumed | L/kWh_IT | [Verified: LBNL24 — "source WUE accounts for the water required to generate the electricity"] |
| Basis caveat | NTT computes WUE as withdrawal ÷ IT energy; Microsoft's 0.30 is described as a "withdrawal WUE" | — | [Verified: NTT; MSFT blog] |
| ISO/IEC 30134-9 | International WUE standard (site and source categories) | — | [Proxy: text not reviewed — obtain from ISO/BIS] |
| EU EED reporting (Delegated Reg. 2024/1364) | Sites ≥500 kW IT report total water input (W_IN, m³) and potable water input (W_IN-POT, m³); first returns due 15 Sep 2024, then 15 May 2025 and yearly | m³ | [Verified: EU24] |
| EU rating scheme (draft) | A–G energy and water labels auto-generated from 15 Aug 2027; water grade from freshwater intake ÷ IT energy | — | [Verified-secondary: EU24] |

**Calculator recommendation:** store withdrawal, consumption and discharge separately; compute WUE_withdrawal and WUE_consumption; keep potable and non-potable apart (as the EU requires). Indian operator numbers may be on either basis, so never compare them without checking.

### 1.2 Components and physics

| Component | Formula / rule | Low | Typical | High | Unit | Label |
|---|---|---|---|---|---|---|
| Latent heat of vaporisation | h_fg | 2,257 (100 °C) | 2,430 (30 °C) | 2,450 (20 °C) | kJ/kg | [Proxy: steam tables] |
| Pure-evaporation water per kWh of heat | 3,600 ÷ h_fg | 1.47 | 1.48 | 1.60 | L/kWh_th | [Model] |
| Latent share of tower heat rejection | f_lat | 0.75 | 0.85 | 0.95 | — | [Proxy: tower practice] |
| Evaporation | E = Q_rej × f_lat × 3,600/h_fg | 1.1 | 1.26 | 1.5 | L/kWh_th | [Model] |
| Heat rejected per kWh IT (water-cooled chillers) | 1 + compressor + pump/fan heat | 1.15 | 1.25 | 1.35 | kWh_th/kWh_IT | [Proxy: chiller COP 5–7] |
| Blowdown | B = E ÷ (CoC − 1) | E/9 (CoC 10) | E/3 (CoC 4) | E/1 (CoC 2, hard water) | L/kWh_th | [Model] |
| Drift | 0.001–0.005% of circulation (~86 L/kWh_th at ΔT 10 K) | 0.0009 | 0.002 | 0.004 | L/kWh_th | [Model: 3,600/(4.19×10)] |
| Tower make-up | M = E + B + D | 1.3 | 1.7 | 3.0 | L/kWh_th | [Model] |
| Tower-based WUE | M × Q_rej/IT | 1.5 | 2.1 | 3.5 | L/kWh_IT | [Model]; NTT evaporative 1.42–2.93 [Verified: NTT] |
| Humidification (air-cooled halls) | — | 0 | 0.01 | 0.05 | L/kWh_IT | [Proxy: LBNL24 "occasional humidification"] |
| RO reject | feed × (1 − recovery); recovery 65–80% | 0.25 | 0.4 | 0.55 | L per L permeate | [Proxy] |
| Domestic/sanitary | 45 L/person/day × staff | 0.005 | 0.01 | 0.02 | L/kWh_IT at >10 MW | [Proxy: NBC/CPHEEO norms] |
| Landscaping | 2–5 L/m²/day of green area | — | — | — | — | [Proxy; use STP water] |
| DG radiator cooling | Closed loop | 0 | ~0 | ~0 | — | [Proxy] |
| Fire systems | One-time fill plus tests; storage per NBC/TAC | — | — | — | kL storage | [Proxy: NBC Part 4] |

**What this means:** the "1.8 L/kWh" figure often quoted fits towers at a CoC of about 4 in a hot-humid climate. Raising CoC from 3 to 8 (softening or RO make-up) cuts make-up by about 25–35%. That is the cheapest retrofit lever for existing tower sites in Mumbai and Chennai.

### 1.3 Published WUE and water values

| Entity / scope | Value | Year | Label |
|---|---|---|---|
| US all data centres, average site WUE | ~0.36 L/kWh through 2023; 0.45–0.48 after 2023 | 2023 / 2028 | [Verified: LBNL24] |
| US direct water consumption | 66 billion L (2023); 21.2 billion L (2014); hyperscale 60–124 billion L in 2028 | — | [Verified: LBNL24] |
| US hyperscale aggregate median WUE | 0.32 L/kWh (0.40 if adiabatic runs at 0.2) | 2023 | [Verified: LBNL24] |
| Hyperscale adiabatic systems (self-reported) | 0.1–0.3 L/kWh | — | [Verified: LBNL24] |
| Microsoft global WUE / PUE | 0.30 / 1.16 (FY24); 0.27 / 1.17 (FY25) | FY24–25 | [Verified: MSFT] |
| Microsoft Asia-Pacific WUE / PUE | 0.03 / 1.25 (FY24); 0.25 / 1.28 (FY25) | FY24–25 | [Verified: MSFT] |
| Microsoft zero-water-for-cooling design | Avoids >125 million L/yr per datacenter | from Aug 2024 | [Verified: MSFT blog] |
| Microsoft India sites | On-site WUE 0.000 L/kWh (dry cooling) in Li et al.'s table | — | [Verified: LI] |
| Google fleet PUE | 1.09 (2025) | 2025 | [Verified: GOOG25] |
| Google WUE used in Gemini analysis | 1.15 L/kWh (fleet) | 2024 | [Verified-secondary: MDPI reconstruction of GOOG25] |
| NTT DATA WUE, whole portfolio | 1.01 / 0.65 / 0.72 L/kWh | FY22 / 23 / 24 | [Verified: NTT] |
| NTT DATA WUE, evaporative sites | 2.93 / 2.77 / 1.42 L/kWh | FY22 / 23 / 24 | [Verified: NTT] |
| NTT DATA PUE | 1.40 / 1.38 / 1.38 | FY22 / 23 / 24 | [Verified: NTT] |
| Equinix global / evaporative sites WUE | 0.91 / 1.41 L/kWh | 2025 | [Verified-secondary: Equinix 2025 report via Wikipedia] |
| CtrlS total water | 409,037 kL (2023-24) vs 468,330 kL (2022-23); no WUE | — | [Verified: DTE] |
| Nxtra, CtrlS | No published WUE | 2025 | [Verified: DTE] |
| Yotta | Claims "extremely low WUE", no number | 2025 | [Verified: DTE] |
| India sector | DCs ≈ 0.5% of national electricity (2025); ~271 DCs (Jan 2026); a 100 MW hyperscale "can take ~2 million litres of water per day" | 2025–26 | [Verified: CEEW] |
| India sector share of water | ~0.02–0.03% of national water demand | 2025 | [Verified-secondary: CEEW author in Scroll] |
| India siting | ~75% of DCs in water-stressed regions; ~25 million L per MW per year | 2026 | [Verified-secondary: DTE Apr 2026 via Substack] |

**Interpretation:** CEEW's 2 million L/day for 100 MW works out to 0.83 L/kWh at full load. That fits a hybrid/adiabatic design, not year-round towers (about 5 million L/day). DTE's 25 million L/MW/yr implies about 2.9 L/kWh, high-end tower territory. Treat both as screening values, not design values.

### 1.4 Water per AI query

| Estimate | Energy | Water | Scope | Label |
|---|---|---|---|---|
| Google Gemini median text prompt (May 2025) | 0.24 Wh | 0.26 mL (0.15 mL narrow method); 0.03 gCO₂e | On-site only | [Verified: GOOG25] |
| OpenAI average ChatGPT query (Altman, Jun 2025) | 0.34 Wh | ~0.32 mL | Undisclosed method | [Verified-secondary: Towards Data Science] |
| Li et al., GPT-3 medium request, India | — | 19.7 mL (0 on-site + 19.7 off-site); 25.4 requests per 500 mL; PUE 1.430, EWIF 3.445 L/kWh | On-site + grid | [Verified: LI] |
| Gemini-like prompt, dry-cooled Indian DC | 0.24 Wh | 0.24×10⁻³ kWh × (0.03 + 3.0) = 0.73 mL | On-site + grid | [Model] |
| Same, evaporative Indian DC | 0.24 Wh | 0.24×10⁻³ × (2.0 + 3.0) = 1.2 mL | On-site + grid | [Model] |

**Interpretation:** for India the grid term (~0.72 mL) is about three times Google's whole on-site figure. Per-query claims that leave out electricity understate India's footprint by 70–98%.

---

## 2. Indirect (off-site) water

### 2.1 Water intensity of generation

| Technology | Consumption | Withdrawal | Label |
|---|---|---|---|
| Indian coal, once-through (legacy) | small | 70–200 m³/MWh (CSE); 80–160 m³/MWh | [Verified: PowerLine/CSE; SD23] |
| Indian coal, closed-loop towers (actual) | 2.8–3.4 m³/MWh, about twice the world average of 1.2–1.5 | ~4 m³/MWh average (CSE) | [Verified: SD23; PowerLine/CSE] |
| MoEFCC norm, existing CT plants | ≤3.5 m³/MWh (by 7 Dec 2017) | — | [Verified: MOEF15] |
| MoEFCC norm, plants after 1 Jan 2017 | 2.5 m³/MWh with ZLD (2015), relaxed to 3.0 m³/MWh in June 2018 | — | [Verified: MOEF15 amendments] |
| FGD additional consumption | ~0.3 m³/MWh | — | [Verified: PowerLine/CSE] |
| Coal with air-cooled condenser | 0.45–0.65 m³/MWh | — | [Verified: SD23] |
| Nuclear with towers (US median) | 672 gal/MWh = 2.54 L/kWh | higher than coal | [Verified: NREL] |
| Tower-cooled thermal, upper bound | ~1,000 gal/MWh ≈ 3.8 L/kWh | — | [Verified: NREL] |
| Gas CCGT with tower | ~0.7–0.8 L/kWh | ~1 L/kWh | [Proxy: NREL medians via secondary sources] |
| Hydro, reservoir evaporation (contested) | ~17 L/kWh gross; NREL excludes hydro "due to the wide range of estimates" | — | [Verified-secondary: NREL caption + citing literature] |
| Solar PV (cleaning) | <0.19 L/kWh; Indian dry robots lower | — | [Verified-secondary: NREL-derived] |
| Wind | ~0 | ~0 | [Verified: NREL] |
| Coastal seawater once-through plants | Freshwater ≈ 0 | Seawater 70–200 L/kWh | [Proxy: per plant] |

Context: WRI (Tianyi Luo, 16 Jan 2018) found that "40 percent of the country's thermal power plants are located in areas facing high water stress" and that "70 percent of India's thermal power plants will face high water stress by 2030"; about 90% of thermal generation depends on freshwater, and "14 of India's 20 largest thermal utilities experienced at least one shutdown due to water shortages between 2013-2016, costing the companies $1.4 billion" [Verified: WRI].

### 2.2 Indian grid-average water intensity

Generation base for FY2024-25: total 1,824 BU, thermal 1,363 BU (74.7%) [Verified: CREA], and RE 403.64 BU (22.13%, which appears to include large hydro) [Verified: MNRE25]. Nuclear is the residual, about 3%; large hydro about 8% [Proxy: residual allocation].

| Source | Share | Consumption intensity (L/kWh) | Contribution (L/kWh generated) |
|---|---|---|---|
| Coal and lignite | 73% | 3.0 (2.8–3.4) | 2.19 |
| Gas | 1.5% | 0.7 | 0.01 |
| Nuclear | 3% | 2.5 | 0.08 |
| Solar, wind, bio | 14% | 0.1 | 0.01 |
| Large hydro | 8% | 0 (operational) – 17 (gross evaporation) | 0 – 1.36 |
| **Total at busbar** | 100% | — | **2.29 – 3.65** |
| **At consumer meter** (÷ (1 − 17% losses) [Proxy]) | — | — | **2.76 – 4.40** |

**Default for calculators:** 3.0 L/kWh consumption (range 2.3–4.4). It sits inside Li et al.'s 3.445 L/kWh for India [Verified: LI] and below LBNL's US data-centre figure of 4.52 [Verified: LBNL24]. Withdrawal intensity for closed-loop coal is about 4 L/kWh.

**State proxies** (replace with SLDC/CEA mix and plant water data):

| State | Grid water proxy (L/kWh delivered) | Basis | Label |
|---|---|---|---|
| Karnataka | 1.5–2.2 | RE was 48.10% of state generation in 2024-25 | [Verified: MNRE25 share]; [Proxy: intensity] |
| Tamil Nadu | 1.8–2.6 | High wind/solar; seawater-cooled coastal plants | [Proxy] |
| Andhra Pradesh | 2.0–3.0 | Coastal seawater plus inland coal | [Proxy] |
| Maharashtra | 2.8–3.4 | Coal-heavy MSEDCL portfolio | [Proxy] |
| Telangana | 2.8–3.4 | Coal-heavy | [Proxy] |
| Uttar Pradesh | 3.0–3.6 | Coal-heavy, inland freshwater | [Proxy] |

Electrons come from the regional grid, not the state fleet. For contracted RE, use the contract mix; LBNL notes PPAs "could significantly affect water consumption" [Verified: LBNL24].

### 2.3 Source WUE formula

- Source WUE (L/kWh_IT) = WUE_site + PUE × EWIF_grid [Model; structure per LBNL24/LI]
- Total annual water (L) = E_IT (kWh) × Source WUE
- Contracted mix: EWIF_eff = Σ (share_i × EWIF_i); RE-RTC (solar + wind + BESS) ≈ 0.05–0.15 L/kWh [Proxy: NREL]

| Case | WUE_site | PUE | EWIF | Source WUE |
|---|---|---|---|---|
| Mumbai evaporative colo, grid | 2.0 | 1.50 | 3.0 | 6.5 |
| Hyderabad adiabatic hyperscale, grid | 0.45 | 1.30 | 2.8 | 4.09 |
| Bengaluru DLC dry-cooled AI, grid | 0.03 | 1.25 | 1.8 | 2.28 |
| Same, 90% RE-RTC (0.1) + 10% grid (1.8) → EWIF 0.27 | 0.03 | 1.25 | 0.27 | 0.37 |

### 2.4 Embedded water (scope 3), order of magnitude

| Item | Value | Label |
|---|---|---|
| Global DC water 2023 (IEA): 560 billion L = 373 indirect + 140 direct + 47 hardware manufacturing | — | [Verified-secondary: IEA via gpusmith] |
| Hardware manufacturing share | ~8% | [Model: 47/560] |
| Concrete for a 100 MW campus | ~100,000–200,000 m³ × ~150–200 L/m³ ≈ 15–40 ML, one-time | [Proxy: construction norms] |
| Takeaway | Embedded water ≈ 1–3 years of a dry-cooled site's direct water, but under 5% of its grid water | [Model] |

### 2.5 Scarcity weighting

- Scarcity-weighted water = Σ (water_i × CF_i), with CF from AWARE (0.1–100) or the WRI Aqueduct baseline water-stress class [Proxy: method].
- Most Indian metros (Chennai, Bengaluru, Delhi, Hyderabad, Mumbai) fall in Aqueduct "high" to "extremely high" baseline stress [Proxy: pull per catchment from Aqueduct 4.0].
- CGWB's stage of groundwater extraction (>100% means over-exploited) should gate any bore-well use [Proxy: pull block-level data].

---

## 3. Water by cooling technology

Annual averages for Indian climates [Proxy: engineering ranges cross-checked against LBNL24's ranking and operator data where noted].

| Technology | WUE site (L/kWh_IT) | Annual PUE (India) | Energy penalty | Climate driver | Capex | Maturity |
|---|---|---|---|---|---|---|
| Water-cooled chillers + open towers | 1.5–2.5 (to 3.5 at low CoC) | 1.35–1.60 | baseline | Wet-bulb (coastal design WB ~28–29 °C) | baseline | Mature; highest WUE per LBNL24 |
| Waterside economiser + towers (liquid IT) | 1.0–2.0 | 1.15–1.35 | lower | Wet-bulb | +0–10% | Mature; LBNL: "consumes substantial amounts of water" |
| Air-cooled chillers | ~0–0.05 | 1.45–1.75 | +8–15% | Dry-bulb; 45 °C+ Delhi peaks derate | −5 to −10% | Mature; LBNL: "use no water, they use more energy" |
| Dry coolers (no adiabatic) + chiller trim | ~0–0.05 | 1.30–1.55 air IT; 1.10–1.25 liquid IT | + air IT; ~0 W32–W45 | Dry-bulb | +5–15% | Mature |
| Adiabatic / hybrid dry coolers | 0.2–0.8 | 1.20–1.40 | small | Wet mode above ~26–30 °C dry-bulb | +10–20% | Mature |
| Direct evaporative (air-side) | 0.3–1.2 | 1.10–1.25 | low | Needs low WB and clean air | +0–10% | Limited Indian fit |
| Indirect evaporative (IEC) | 0.3–1.0 | 1.15–1.30 | low | WB; no outside air in hall | +15–30% | Mature |
| Rear-door heat exchangers | per heat-rejection plant | 1.20–1.40 | — | Facility water temperature | +per rack | Mature to 40–70 kW/rack |
| Direct-to-chip single-phase + dry coolers | 0–0.05 | 1.10–1.25 | low | Dry-bulb vs W32–W45 | +15–30% | Mainstream for GB200 (NVL72 ~120 kW/rack) [Verified: NVDA] |
| Direct-to-chip two-phase | 0–0.05 | 1.08–1.20 | low | Dry-bulb | Higher | Early commercial |
| Immersion single-phase | 0–0.05 | 1.05–1.15 | lowest fans | Dry-bulb | +20–40% | Growing |
| Immersion two-phase | 0–0.05 | 1.03–1.10 | lowest | Dry-bulb | Highest; fluorocarbon risk | Niche |
| Seawater / lake once-through | ~0 freshwater | 1.15–1.30 | low | Sea 27–31 °C off India | High (CRZ, intake/outfall) | CEEW: coastal hyperscalers "leverage seawater cooling" [Verified: CEEW] |
| Air-side economiser (free cooling) | ~0 | 1.15–1.30 in Bengaluru/Pune winters | — | Dry-bulb below ~24–27 °C | Low | Limited hours |

**Hours of adiabatic/IEC wet mode per year** (above ~28 °C dry-bulb) [Proxy: climatology; replace with ISHRAE TMY]:

| City | Wet-mode hours/yr | Tower design WB (0.4%) | Notes |
|---|---|---|---|
| Bengaluru | 1,000–1,800 | ~23–24 °C | Best Indian climate for dry/adiabatic |
| Pune | 1,800–2,800 | ~24–25 °C | Good |
| Hyderabad | 3,000–4,000 | ~25–26 °C | Dry heat suits adiabatic; spiky April–May |
| Delhi NCR | 3,000–3,800 | ~28 °C | 45 °C+ peaks; humid monsoon |
| Mumbai | 3,500–5,000 | ~28 °C | Humidity cuts adiabatic gain |
| Chennai | 5,000–6,500 | ~28–29 °C | STP/seawater key |
| Kolkata | 3,500–4,500 | ~29 °C | Hot-humid |
| Visakhapatnam | 4,500–6,000 | ~28–29 °C | Seawater option |

**Decision rule:** in hot-humid coastal cities, adiabatic gains are small because wet-bulb depression is small. Choose towers on STP/recycled water at high CoC, or liquid cooling with dry coolers. In Hyderabad, Bengaluru and Pune, adiabatic or dry designs are the right default.

---

## 4. Peak water demand

### 4.1 Peak factors (calculator inputs)

| System | Peak-month / avg | Peak-day / avg | Peak-hour / avg hour | Peak season | Label |
|---|---|---|---|---|---|
| Towers, Mumbai/Chennai | 1.10–1.25 | 1.3–1.6 | 1.5–1.9 | Apr–May; Oct | [Model: Example A] |
| Adiabatic/hybrid, Hyderabad/Delhi | 1.8–2.5 | 2.0–2.5 | 3.5–5.0 | Apr–Jun | [Model: Example B] |
| Adiabatic, monsoon months | 0.3–0.6 | — | — | Jul–Sep | [Model] |
| Dry/DLC (domestic only) | 1.0–1.1 | 1.1–1.3 | 2–3 | — | [Proxy] |

### 4.2 Storage and connection sizing

- Supply connection (kL/day) = peak-day water × 1.1 [Model]
- Make-up storage (kL) = peak-hour water × storage hours [Model]
- Common practice is 12–72 h of make-up storage, with 24–48 h typical for Tier III designs [Proxy: industry practice]. Uptime Tier certification asks for on-site make-up water and fuel autonomy aligned to design, often cited as ≥12 h [Proxy: verify against Tier Standard: Topology].
- In India, add tanker contingency and STP-treated water contracts. Karnataka's policy focuses on treated water to reduce freshwater dependence [Verified: KADC].

### 4.3 Permit and allocation examples

We found no verified Indian EIA or water-allocation figures for named data-centre projects (Navi Mumbai, Chennai, Hyderabad, Visakhapatnam, Greater Noida, Hoskote). The screening values available are:

- CEEW's ~2 million L/day per 100 MW hyperscale [Verified: CEEW]
- Microsoft's >125 million L/yr avoided per zero-water datacenter, about 342 kL/day [Verified: MSFT blog; Model: ÷365]

US, UK and Singapore permit examples are left for follow-up (see Data gaps).

---

## 5. Hourly water and electricity profiles

### 5.1 IT load profile archetypes

| Archetype | Avg / design IT | Diurnal swing | Sub-minute behaviour | Label |
|---|---|---|---|---|
| Enterprise/colo | 60–80% (lease fill); colo server utilisation 21% (2014) → 35% (2027) | ±3–8% | Smooth | [Verified: LBNL24]; [Proxy: fill] |
| Hyperscale cloud | 70–85%; utilisation 45% → 50% | ±5–10% | Smooth | [Verified: LBNL24]; [Proxy] |
| AI training | 80% operational time at ~70% of rated; saturated 8×H100 node 7.9 kW (~78%) | Flat | "Square-wave" drops at synchronisation | [Verified: LBNL24] |
| AI inference | 40% operational time; power half of training | Diurnal | Bursty | [Verified: LBNL24] |
| Idle floor | AI ~20% of rated; conventional 36% of max (2023) → 27% (2028) | — | — | [Verified: LBNL24] |

**Grid risk:** on 10 July 2024 a 230 kV fault led to about 1,500 MW of data-centre load disconnecting across 60 load points and 25 substations in Virginia, and a 1,800 MW load loss followed in February 2025 [Verified: NERC]. About 1,260 MW did not return for hours [Verified-secondary: POWER]. NERC's July 2025 white paper documents a site dropping from about 450 MW to 40 MW in 36 seconds [Verified-secondary: Keentel]. For India, specify UPS/BESS ride-through and ramp-rate limits in connection agreements for loads above 100 MW.

### 5.2 Hourly PUE and WUE functions

- PUE(T_db) = PUE_base + k_P × max(0, T_db − T_0); adiabatic defaults PUE_base 1.22, k_P 0.015/K, T_0 25 °C [Model]
- WUE(T_db) = 0 below 26 °C; above it, 0.1 + 0.107 × (T_db − 26), capped at 1.6 L/kWh [Model]
- Towers: WUE(t) ≈ [1 + 1/(CoC − 1)] × f_lat × 3,600/h_fg × Q_rej(t)/IT(t), nearly flat at 1.9–2.3 L/kWh [Model]
- Water(t) = IT(t) × WUE(t); electricity(t) = IT(t) × PUE(t)

### 5.3 Hot-day profile: 50 MW hyperscale, Hyderabad, adiabatic (Example B), May design day

IT is held at a flat 42 MW [Proxy]. Temperatures follow a sinusoid from 27 °C at 05:00 to 40 °C at 15:00 [Proxy: replace with ISHRAE TMY]. IEX prices are shaped to June 2026 averages: trough ₹1.17 at 11:00, peak ₹9.90 at 22:30, 08–16 h average ₹1.63, 18–23 h average ₹8.10 [Verified-secondary: earthsync; Proxy: shape]. Shown every two hours; totals come from the full 24-hour model.

| Hour | T_db (°C) | PUE | Facility MW | WUE (L/kWh_IT) | Water (kL/h) | IEX DAM proxy (₹/kWh) |
|---|---|---|---|---|---|---|
| 00 | 31 | 1.31 | 55.0 | 0.64 | 26.9 | 6.0 |
| 02 | 29 | 1.28 | 53.8 | 0.42 | 17.6 | 4.0 |
| 04 | 27.5 | 1.26 | 52.8 | 0.26 | 10.9 | 3.8 |
| 06 | 28 | 1.27 | 53.1 | 0.31 | 13.0 | 4.5 |
| 08 | 32 | 1.33 | 55.7 | 0.74 | 31.1 | 2.2 |
| 10 | 36 | 1.39 | 58.2 | 1.17 | 49.1 | 1.3 |
| 12 | 38.5 | 1.42 | 59.7 | 1.44 | 60.5 | 1.2 |
| 14 | 40 | 1.45 | 60.7 | 1.60 | 67.2 | 1.5 |
| 16 | 39 | 1.43 | 60.1 | 1.49 | 62.6 | 3.0 |
| 18 | 35.5 | 1.38 | 57.9 | 1.12 | 47.0 | 6.5 |
| 20 | 33 | 1.34 | 56.3 | 0.85 | 35.7 | 9.0 |
| 22 | 32 | 1.33 | 55.7 | 0.74 | 31.1 | 9.9 |
| **Day (24 h)** | — | **avg 1.347** | **1,357.7 MWh** | **avg 0.90** | **905.9 kL** | — |

[Model: daily water = 42 MW × Σ WUE (21.57) = 905.9 kL; daily energy = 42 × Σ PUE (32.325) = 1,357.7 MWh]

**Interpretation:** about 55% of the day's water is drawn between 10:00 and 17:00, exactly when exchange power is cheapest. When water is constrained, switching adiabatic pads off and running chillers between 11:00 and 16:00 costs extra kWh at about ₹1.2–2/kWh. It avoids the most water-intensive hours and halves peak-hour demand (about 67 down to about 30 kL/h). This "dry at noon" strategy is the main co-optimisation lever for India.

### 5.4 Tariff time structures

| State | ToD rule for HT | Label |
|---|---|---|
| Telangana (FY26) | +₹1.00/unit 06–10 and 18–22; −₹1.50/unit 22–06 | [Verified: TGERC] |
| Maharashtra (FY26–30) | HT industrial/commercial ToD charge 25%; solar-hour rebates from −15% (FY26) | [Verified: MERC] |
| Grid emission factor | Lowest in solar hours, highest in evening; India weighted average declined from 0.774 tCO₂/MWh (FY2013-14) to 0.710 tCO₂/MWh in FY2024-25 (1,234.19 MT ÷ 1,739.06 BU) | [Verified: CEA CO2 Baseline Database User Guide V21.0, Nov 2025] |

---

## 6. Grid electricity options in India

### 6.1 DISCOM HT/EHT tariffs (FY2025-26 unless noted)

| State / DISCOM | Category | Energy charge | Demand charge | Other | Label |
|---|---|---|---|---|---|
| Maharashtra MSEDCL | HT-I(A) industry | ₹7.48/kVAh (FY26); then 7.27, 7.11 | ₹555/kVA/mo (then 560, 565) | Wheeling ~₹0.62 HT; 10% wheeling discount for DCs on OA or green tariff | [Verified: MERC]; a secondary claim of ₹8.68/kVAh after the Mar 2026 review is unverified |
| Maharashtra MSEDCL | HT-II commercial | ₹9.26 + ₹0.62 = ₹9.88/kVAh | ₹555/kVA/mo | — | [Verified: MERC] |
| Mumbai TPC-D | HT-II / EHV commercial | ₹5.89 + ₹0.69 wheeling / ₹5.89 | ₹300/kVA/mo | Green power tariff ₹0.25/kWh | [Verified: MERC TPC-D] |
| Telangana TGSPDCL | HT-I(A) industry | ₹7.65 / 7.15 / 6.65 per kVAh (11 / 33 / ≥132 kV) | ₹500/kVA/mo | Green tariff ₹0.66/unit | [Verified: TGERC] |
| Telangana TGSPDCL | HT-II(A) commercial | ₹8.80 / 8.00 / 7.80 per kVAh | ₹500/kVA/mo | — | [Verified: TGERC] |
| Karnataka (all ESCOMs) | HT-2(a) industry | 660 paise/kWh (FY26, FY27); 650 (FY28) | ₹345 / 350 / 355 per kVA/mo | P&G surcharge 36 paise (FY26), 35 (FY27); BESCOM true-up +56 paise (May 2026–Apr 2027) | [Verified: KERC; true-up Verified-secondary] |
| Tamil Nadu TNPDCL | HT-I (incl. IT) / HT-III commercial | ₹7.50 / ₹9.40 per kWh | ₹608/kVA/mo | Wheeling HT ₹1.04/kWh | [Verified-secondary: TNERC summary] |

**Key judgment:** check whether the state DC/IT policy grants industrial tariff status. In Maharashtra, commercial versus industrial is a ₹1.78/kVAh difference [Model: 9.88 − (7.48 + 0.62)].

### 6.2 Open access and procurement options

| Option | Key conditions | Generation price | Adders | Carbon / water | Label |
|---|---|---|---|---|---|
| DISCOM green tariff | Premium over normal tariff | — | +₹0.25 (TPC-D), +₹0.66 (Telangana) | RE attribute; physical grid water unchanged unless additional RE | [Verified: MERC TPC-D; TGERC] |
| GEOA Rules 2022 | Threshold 100 kW; CSS may not rise >50% over 12 years from grant year; additional surcharge not applicable if consumer pays fixed charges; monthly banking ≥30% of consumption | — | CSS, wheeling, transmission, losses, banking | Additional RE → EWIF ~0.1 | [Verified: GEOA gazette]; 100 kW [Proxy: verify amendment] |
| FOR model GEOA regulations | CSS shall not exceed 20% of tariff or ABR | — | — | — | [Verified: GEOA FOR] |
| CSS, Telangana FY26 | HT-I ₹1.82 / 1.56 / 1.46; HT-II(A) ₹2.15 / 1.86 / 1.79 per kWh (11 / 33 / 132 kV) | — | — | — | [Verified: TGERC] |
| CSS, Tamil Nadu | Industrial ₹1.99/kWh; commercial ₹2.57/kWh | — | — | — | [Verified-secondary: TNERC summary] |
| Additional surcharge, Karnataka | BESCOM proposed ₹1.65/kWh (not approved) | — | — | — | [Verified-secondary: SolarQuarter] |
| TN banking | 8% of banked energy, in kind (TN GEOA Regs 2025) | — | — | — | [Verified-secondary: SolarQuarter] |
| Group captive | ≥26% equity, ≥51% consumption (Electricity Rules 2005); CSS/AS exempt | ₹4.0–5.25 | Wheeling, transmission, losses, banking | Near-zero water if RE | [Proxy: rules]; TN exemption [Verified-secondary] |
| ISTS RE / FDRE via third party | ISTS charges levied at 25% for COD Jul 2025–Jun 2026, 50%, 75%, then 100% after 1 Jul 2028; waiver worth ₹0.4–1.8/unit per industry | FDRE-RTC ₹5.25; 4-h peak ₹5.99; RTC-IV ₹5.06–5.07; SJVN FDRE-3 ₹4.82–4.91 | ISTS + state charges + CSS + AS | Near-zero water | [Verified: ISTS; SECI; SaurEnergy] |
| IEX G-DAM | FY25 weighted avg ₹4.01/unit; Jan 2026 ₹4.06; Feb 2026 ₹3.43 | — | OA charges + fees | RE attribute | [Verified: IEX] |
| IEX DAM | Jan 2026 ₹3.86; Feb 2026 ₹3.58 | — | — | Grid mix | [Verified: IEX] |
| On-site solar | Rooftop ≈ 0.1–0.3 MWp per MW IT; negligible for large sites | ₹3–4.5/kWh | Maharashtra GSC ₹1.40/unit HT | — | [Proxy]; GSC [Verified-secondary: MERC order] |
| Captive gas / DG | Backup only; DG ₹25–35/kWh (diesel ~₹90/L × 0.27 L/kWh) | — | — | High CO₂ | [Model] |
| RECs / I-RECs | Unbundled; no physical additionality | — | — | No physical water change | [Proxy] |
| Carbon Credit Trading Scheme | DCs not yet obligated entities (as understood) | — | — | — | [Proxy: verify with BEE] |

### 6.3 Reliability and connection

| MW (facility) | Typical supply voltage | Label |
|---|---|---|
| <5 MVA | 11 kV | [Proxy: state supply codes] |
| 5–20 MVA | 33 kV | [Proxy] |
| 20–60 MVA | 66/110/132 kV | [Proxy] |
| 60–200 MVA | 132/220 kV | [Proxy] |
| >200 MVA | 220/400 kV, ISTS or dedicated substation | [Proxy] |

- **Redundancy:** dual feeds from separate grid substations, N+1 transformers, 2N UPS for Tier III/IV [Proxy].
- **Timelines:** 18–36 months for ≥220 kV; transformer lead times 12–24+ months [Proxy: request from STU/CTUIL].
- **Regulation:** CEA connectivity regulations and state grid codes apply; NERC-style ride-through requirements are absent in India today [Proxy].

---

## 7. Energy calculations

### 7.1 Core formulas

1. IT design load (kW) = racks × kW/rack
2. Average IT (kW) = IT design × utilisation (lease fill × server load factor)
3. IT energy (kWh/yr) = average IT × 8,760; MU = kWh ÷ 10⁶
4. Facility energy = IT energy × PUE_annual
5. Non-IT split ≈ cooling 60–75%, UPS/transformer losses 15–30%, lighting/other 3–8% of (PUE − 1) [Proxy]
6. Peak facility kW = IT design × PUE_peak (hot hour)
7. Contract demand (kVA) = peak facility kW ÷ PF (0.95–0.99) × diversity (0.9–1.0)
8. DG fuel (L/h) = facility kW × 0.26–0.28 L/kWh; storage (L) = L/h × hours [Proxy: genset datasheets]
9. UPS battery (kWh) = IT kW × minutes/60 ÷ (DoD × η); 5–10 min typical for Li-ion [Proxy]
10. Landed cost (₹/yr) = facility kWh × energy rate + contract kVA × demand rate × 12 + surcharges

### 7.2 Typical parameter values

| Parameter | Low | Typical | High | Label |
|---|---|---|---|---|
| Global average PUE | 1.54 (2025) | 1.56 (2024) | 1.58 (2023) | [Verified: UPT25; Uptime blog] |
| New facilities / >20 MW | 1.44 (>20 MW) | 1.48 (last 5 yrs) | — | [Verified: UPT25 — "Facilities commissioned within five years of the survey (from around early 2020) achieved an average PUE of 1.48"] |
| US modelled average PUE | 1.15–1.35 (2028) | 1.4 (2023) | 1.6 (2014) | [Verified: LBNL24] |
| Hyperscaler fleets | 1.09 (Google 2025) | 1.17 (Microsoft FY25) | 1.28 (MSFT APAC FY25) | [Verified: GOOG25; MSFT] |
| Indian colo PUE | 1.35 | 1.45–1.55 | 1.7 | [Verified: Uptime Field Report 183 — Asia-Pacific (excl. China) average annual PUE 1.52 (n=79) vs global 1.54; Proxy for India range] |
| UPS efficiency | 77–85% (edge) | 80–94% (colo) | 90–99% (hyperscale/AI) | [Verified: LBNL24] |
| Transformer loss per stage | 0.5% | 1.0% | 1.5% | [Proxy] |
| Power factor | 0.95 | 0.98 | 0.99 | [Proxy] |
| Rack density | most 10–30 kW; few >30 kW | — | AI 120–142 kW | [Verified: UPT25; NVDA] |
| DGX H100 (8 GPU) rated | 10.2 kW | — | — | [Verified: LBNL24] |
| DGX B200 max | 14.3 kW | — | — | [Verified: NVDA] |
| GB200 NVL72 rack | ~120 kW (NVIDIA) | 132 kW (HPE nominal) | GB300: 135–142 kW | [Verified-secondary: NVDA summaries] |
| AI annualised power | 60–80% of rated | 70% | — | [Verified: LBNL24] |
| Energy per AI prompt | 0.10 Wh (narrow) | 0.24 Wh (Gemini) | 0.34 Wh (ChatGPT avg) | [Verified: GOOG25; secondary for OpenAI] |

Per-GPU (NVL72): 120 kW ÷ 72 = 1.67 kW IT; × PUE 1.25 = 2.08 kW; × 8,760 h = 18.2 MWh/yr at full load [Model].

### 7.3 Scale snapshot

| Archetype | IT design | Utilisation | IT MU/yr | PUE | Facility MU/yr | Contract MVA | DG fuel at full load (L/h) |
|---|---|---|---|---|---|---|---|
| 5 MW enterprise (Pune) | 5 MW | 60% | 26.3 | 1.60 | 42.0 | 9 | 2,300 |
| 20 MW colo (Mumbai) | 20 MW | 70% | 122.6 | 1.50 | 184.0 | 35 | 8,600 |
| 50 MW hyperscale (Hyderabad) | 50 MW | 80% | 350.4 | 1.30 | 455.5 | 76 | 18,900 |
| 100 MW AI campus (Bengaluru) | 100 MW | 75% | 657.0 | 1.25 | 821.3 | 150 | 35,100 |

[Model. 5 MW: 5×0.6×8,760 = 26,280 MWh; ×1.6 = 42,048 MWh; peak 5×1.7 = 8.5 MW ÷ 0.95 ≈ 9 MVA; DG 8,500 kW × 0.27 ≈ 2,300 L/h.]

---

## 8. Worked examples

### Example A: 20 MW IT colocation, Mumbai (Navi Mumbai), water-cooled chillers + open cooling towers

| Step | Calculation | Result | Label |
|---|---|---|---|
| Average IT | 20 MW × 70% | 14 MW | [Proxy: colo fill] |
| IT energy | 14 × 8,760 | 122,640 MWh = 122.6 MU | [Model] |
| PUE | Hot-humid tower plant | 1.50 | [Proxy: Uptime 1.54 avg] |
| Facility energy | 122,640 × 1.5 | 183,960 MWh ≈ 184 MU | [Model] |
| Site WUE | 1.25 × 0.85 × 1.48 = 1.57 evaporation + CoC-4 blowdown 0.52 ≈ 2.1 → use 2.0 | 2.0 L/kWh | [Model; NTT 1.42–2.93 Verified] |
| Direct water | 122.64 M kWh × 2.0 | 245,280 kL/yr = 0.67 MLD average | [Model] |
| Indirect water | 183.96 M kWh × 3.0 | 551,880 kL/yr | [Model] |
| Total water | — | 797,160 kL/yr (source WUE 6.5) | [Model] |
| Peak day | 20 MW × 24 h × 2.2 L/kWh | 1,056 kL/day (1.57× average) | [Model] |
| Peak hour | 20,000 kWh × 2.3 | 46 kL/h | [Model] |
| Storage (48 h at peak) | 46 × 48 | ~2,200 kL | [Model] |
| Contract demand | 20 × PUE_peak 1.65 = 33 MW ÷ 0.95 | ~35 MVA (110/220 kV) | [Model] |
| DG fuel | 33,000 kW × 0.26 | 8,580 L/h; 24 h = 206 kL | [Model] |

**Hot-day profile (tower):** WUE stays nearly flat at 2.0–2.3 L/kWh, so water tracks IT load (≈28–46 kL/h); facility power swings only ±5% as chiller lift rises with wet-bulb [Model].

**Landed electricity cost (184 MU; 35,000 kVA):**

| Option | Calculation | ₹ crore/yr | ₹/kWh | Label |
|---|---|---|---|---|
| 1. MSEDCL HT-I industry (if DC gets industrial status) | 184 × (7.48 + 0.62) = 149.0 + demand 35,000 × 555 × 12 = 23.3 | 172.3 | 9.37 | [Model on MERC rates; excl. duty, ToD] |
| 1b. MSEDCL HT-II commercial | 184 × 9.88 = 181.8 + 23.3 | 205.1 | 11.15 | [Model] |
| 2. HT-I + green tariff (₹0.25 TPC-D benchmark) | +184 × 0.25 = 4.6 | 176.9 | 9.62 | [Model; MSEDCL premium not confirmed] |
| 3. Group-captive RE-RTC (intra-state) | 5.25 + wheeling 0.62 + transmission/losses ~0.6 + banking ~0.2 = 6.67 × 184 = 122.7 + 23.3 | 146.0 | 7.94 | [Model; adders Proxy] |
| 4. Third-party ISTS FDRE | 5.25 + ISTS ~0.6 + 0.62 + CSS ~1.8 [Proxy] + losses 0.4 = 8.67 × 184 = 159.5 + 23.3 | 182.8 | 9.94 | [Model] |

**Carbon and water by option:** options 1 and 2 keep grid water at about 552 ML/yr. Option 3 or 4 at 90% RE cuts indirect water to about 72 ML/yr and total water from 797 to about 317 ML/yr [Model: 184 M × (0.9×0.1 + 0.1×3.0) = 71.8 ML].

### Example B: 50 MW IT hyperscale, Hyderabad, air-side economiser / adiabatic-assisted cooling

| Step | Calculation | Result | Label |
|---|---|---|---|
| Average IT | 50 × 80% | 40 MW | [Proxy] |
| IT energy | 40 × 8,760 | 350,400 MWh | [Model] |
| PUE annual | — | 1.30 | [Proxy: MSFT APAC 1.25–1.28 Verified] |
| Facility energy | 350,400 × 1.30 | 455,520 MWh | [Model] |
| Site WUE annual | LBNL hyperscale 0.32–0.40; MSFT APAC 0.25 | 0.45 L/kWh | [Proxy: ~3,000–4,000 wet-mode hours] |
| Direct water | 350.4 M × 0.45 | 157,680 kL/yr (432 kL/d avg) | [Model] |
| Indirect water | 455.52 M × 2.8 | 1,275,456 kL/yr | [Model] |
| Total water | — | 1,433,136 kL/yr (source WUE 4.09) | [Model] |
| Peak day (Section 5.3) | 42 MW × Σ WUE | 906 kL/day (2.1× average) | [Model] |
| Peak hour | 42,000 × 1.60 | 67.2 kL/h (3.7× the 18 kL/h average hour) | [Model] |
| Storage | 24 h at peak-day rate | ~900 kL; 48 h ≈ 1,800 kL | [Model] |
| Contract demand | 50 × 1.45 = 72.5 MW ÷ 0.95 | ~76 MVA (220 kV) | [Model] |
| DG fuel | 72,500 × 0.26 | 18,850 L/h | [Model] |

**Landed electricity cost (455.5 MU; 76,000 kVA → demand ₹45.6 cr/yr = ₹1.00/kWh):**

| Option | Calculation | ₹/kWh | Label |
|---|---|---|---|
| 1. TGSPDCL HT-I(A) ≥132 kV + ToD | 6.65 + 1.00 demand − 0.17 ToD net (flat load: +1.00 × 8 h, −1.50 × 8 h) | 7.48 (₹340.7 cr) | [Model on TGERC rates] |
| 1b. HT-II(A) commercial ≥132 kV | 7.80 + 1.00 − 0.17 | 8.63 | [Model] |
| 2. HT-I + green tariff | 7.48 + 0.66 | 8.14 | [Model; TGERC Verified] |
| 3. Group captive RE-RTC | 5.25 + ISTS/STU ~0.6 + wheeling ~0.4 [Proxy] + losses 0.3 + demand 1.00 (CSS/AS exempt) | 7.55 | [Model] |
| 4. Third-party OA FDRE | 5.25 + 0.6 + 0.4 + CSS 1.46 (HT-I 132 kV) + AS ~0.5 [Proxy] + 0.3 + 1.00 | 9.51 | [Model; CSS Verified] |

### Example C: 100 MW IT AI campus, Bengaluru (alt.: Visakhapatnam), direct-to-chip liquid cooling + dry coolers

| Step | Calculation | Result | Label |
|---|---|---|---|
| Racks | 100,000 kW ÷ 120 kW (NVL72) | ~833 racks ≈ 60,000 GPUs | [Model; NVDA] |
| Average IT | 100 × 75% | 75 MW | [Proxy: LBNL training 80% × 70% rated, plus inference] |
| IT energy | 75 × 8,760 | 657,000 MWh | [Model] |
| PUE annual | Mild climate; ~80% heat to liquid at W32–W40 | 1.25 | [Proxy] |
| Facility energy | 657,000 × 1.25 | 821,250 MWh | [Model] |
| Site WUE | Closed loop; domestic + humidification | 0.03 L/kWh | [Proxy; Microsoft zero-water design Verified] |
| Direct water | 657 M × 0.03 | 19,710 kL/yr (54 kL/d) | [Model] |
| Indirect water | 821.25 M × 1.8 (Karnataka proxy) | 1,478,250 kL/yr | [Model] |
| Total water | — | 1,497,960 kL/yr (source WUE 2.28) | [Model] |
| With 90% RE-RTC | 821.25 M × 0.27 + 19.7 ML | ~241,400 kL/yr | [Model] |
| Peak water day | Domestic-driven; ~1.2× | ~65 kL/d (+ one-time loop fill) | [Model] |
| Hot-day electricity | April afternoon 34–35 °C → PUE 1.35 at 100 MW | 135 MW | [Model] |
| Contract demand | 135 ÷ 0.95 ≈ 142 → 150 MVA | 220/400 kV | [Model] |
| Load swings | Training square-wave drops | Specify BESS/UPS smoothing and ride-through | [Verified: LBNL24 Fig 3.4; NERC] |
| DG fuel | 135,000 × 0.26 | 35,100 L/h; 24 h ≈ 842 kL | [Model] |

**Landed electricity cost (821.25 MU; 150,000 kVA → demand ₹62.1 cr = ₹0.76/kWh):**

| Option | Calculation | ₹/kWh | Label |
|---|---|---|---|
| 1. KERC HT-2(a) via BESCOM | 6.60 + 0.76 demand + 0.36 P&G + 0.56 true-up | 8.28 (₹679.7 cr) | [Model on KERC rates; P&G/true-up applicability to HT Proxy] |
| 2. Intra-state group captive (solar + wind + BESS) | 4.5–5.25 + wheeling/transmission 0.8–1.2 [Proxy] + banking 0.2 + demand 0.76 | 6.3–7.4 | [Model] |
| 3. Third-party ISTS FDRE | 5.25 + ISTS 0.6–1.0 + CSS ~1.5 [Proxy] + AS 0–1.65 (BESCOM proposal; GEOA exempts if fixed charges paid) + wheeling 0.5 + 0.76 | 8.6–10.7 | [Model] |

**Visakhapatnam variant:** seawater heat rejection gives freshwater WUE ≈ 0, but PUE is about 1.2–1.3 at 28–30 °C sea temperatures. CRZ clearance and intake/outfall capex apply. APERC tariffs were not retrieved [Proxy].

**Bottom line across the three examples:**

| Metric | A: Mumbai colo | B: Hyderabad hyperscale | C: Bengaluru AI |
|---|---|---|---|
| Direct water (ML/yr) | 245.3 | 157.7 | 19.7 |
| Indirect water (ML/yr) | 551.9 | 1,275.5 | 1,478.3 |
| Total (ML/yr) | 797.2 | 1,433.1 | 1,498.0 |
| Direct L per facility kWh | 1.33 | 0.35 | 0.02 |
| Cheapest modelled landed ₹/kWh | 7.94 (captive) | 7.48 (HT-I) | 6.3–7.4 (captive) |

---

## Recommendations

1. **Calculator defaults:** EWIF India 3.0 L/kWh (state overrides from Section 2.2), PUE 1.30–1.55 by design, and WUE 2.0 (towers), 0.45 (adiabatic) or 0.03 (DLC + dry). Always output direct, indirect, peak-day and peak-hour water.
2. **Siting:** in Chennai, Mumbai, Kolkata and Vizag, avoid freshwater towers; use STP-treated or seawater sources, or liquid cooling with dry coolers. In Hyderabad and Delhi, adiabatic designs need storage of at least 2× the average day and a "dry at noon" control mode.
3. **Procurement:** treat group-captive RE-RTC as the base case above 20 MW. It is the cheapest option in two of three examples and cuts total water by 70–85%. Reach COD before July 2027 to keep part of the ISTS waiver.
4. **Tariff category:** secure industrial classification under state DC/IT policies before connection; it is worth ₹1–2.5/kWh.
5. **Grid code readiness:** for AI loads above 100 MW, contract for ride-through and ramp limits now, ahead of Indian equivalents of NERC's large-load standards.

## Data gaps and how to close them

| Gap | Request from | Instrument |
|---|---|---|
| Site WUE (withdrawal/consumption), source split, CoC | Nxtra, CtrlS, Yotta, Sify, STT GDC, AdaniConneX, NTT India | ESG/BRSR requests; Karnataka plant-wise PUE/WUE filings [Verified: KADC] |
| Water allocations and consents | State PCBs (CTE/CTO), MIDC, CMWSSB, HMWSSB, BWSSB, GVMC | RTI for CTO water quantities and STP/ZLD conditions |
| EIA water figures | MoEFCC PARIVESH | Portal downloads |
| CSS, AS, wheeling (MSEDCL, KERC); MSEDCL green tariff | MERC Tables 446–447; KERC tariff/OA orders | Regulator PDFs |
| Hourly DC load data | Grid-India / SLDCs, DISCOM AMR | Data-sharing MoU |
| Hourly climate | ISHRAE TMY for eight cities | Licence |
| Plant-level water intensity | CEA, plant CTO returns, WRI India | RTI; WRI satellite method |
| US/EU permit examples | The Dalles, Mesa, Goodyear/Quincy, Irish/Dutch permits | Follow-up research |
| Uptime Tier water/fuel autonomy text | Uptime Institute | Tier Standard: Topology |

## Caveats

- Several tariff figures (TN, BESCOM true-up, GB200 power) come from secondary summaries and are marked as such. Confirm against final tariff orders before investment decisions. A secondary blog claims MSEDCL energy charges were revised to ₹8.68/kVAh in March 2026, which conflicts with the press note; this is unresolved.
- Including hydro reservoir evaporation in grid water intensity is contested and moves the Indian figure by about 1.4 L/kWh.
- Climate-hour counts, peak factors and hourly functions are models, not measurements. Replace them with ISHRAE TMY data and operator metering.
- Operator WUEs mix withdrawal and consumption bases (NTT and Microsoft use withdrawal). Do not rank Indian operators on mixed-basis numbers.
- Per-prompt AI figures are company disclosures with undisclosed prompt lengths; Google's 0.24 Wh excludes grid water.

## Sources

1. <https://www.datacenterdynamics.com/en/news/roughly-one-third-of-data-center-owners-and-operators-doing-ai-training-or-inference-uptime-institute/>
2. <https://www.nttdata.com/global/en/about-us/sustainability/esg-data/environment-data>
3. <https://datacenters.microsoft.com/sustainability/efficiency/>
4. <https://www.deccanherald.com/amp/story/india%2Fthermal-generation-growth-slowest-in-fy-2024-25-since-covid-3497645>
5. <https://earthsync.io/resources/iex-dam-gdam-rtm-explained>
6. <https://earthjournalism.net/stories/what-data-center-giants-arent-saying-about-their-water-use-in-india>
7. <https://www.downtoearth.org.in/science-technology/indias-digital-thirst-what-data-centre-giants-arent-saying-about-their-water-use>
8. <https://www.thenewsminute.com/karnataka/karnatakas-new-data-centre-policy-puts-water-energy-in-focus-what-does-it-say>
9. <https://www.pv-magazine.com/2026/08/10/secis-1-gw-fdre-rtc-power-tender-discovers-inr-5-25-kwh-tariff/>
10. <https://www.pv-magazine.com/2026/08/24/seci-discovers-inr-5-99-kwh-tariff-for-4-hour-peak-renewable-power/>
11. <https://www.saurenergy.com/solar-energy-news/secis-525kwh-fdre-tender-shows-solar-storage-can-mimic-coal-iecc-12425151>
12. <https://www.tndindia.com/waiver-of-ists-charges-on-renewable-energy-to-be-phased-out/>
13. <https://eta-publications.lbl.gov/sites/default/files/2024-12/lbnl-2024-united-states-data-center-energy-usage-report_1.pdf>
14. <https://www.microsoft.com/en-us/microsoft-cloud/blog/2024/12/09/sustainable-by-design-next-generation-datacenters-consume-zero-water-for-cooling/>
15. <https://datacenter-forum.ro/en/new-reporting-requirements-for-data-center-operators-introduced-by-the-delegated-regulation-eu-2024-1364/>
16. <https://www.philiplee.ie/eu-publishes-draft-mandatory-sustainability-rating-scheme-for-data-centres/>
17. <https://www.lexology.com/library/detail.aspx?g=0f48c5f8-ff1f-4dc7-8827-fdd7c6bae17c>
18. <https://rpmwes.com/blog/how-much-water-data-center-use/>
19. <https://gpusmith.com/articles/en/pdfs/how-much-water-do-data-centers-use.pdf>
20. <https://dl.acm.org/doi/10.1145/3724499>
21. <https://kanaky.xyz/blog/ai-water-consumption/>
22. <https://datacenters.google/efficiency/>
23. <https://www.mdpi.com/3042-9242/1/2/8>
24. <https://en.wikipedia.org/wiki/Water_usage_effectiveness>
25. <https://www.ceew.in/sites/default/files/ceew-data-centre-study-web-ready-final.pdf>
26. <https://scroll.in/article/1092827/water-energy-use-concerns-grow-with-more-india-data-centres-in-the-pipeline>
27. <https://akhileshwarsahay.substack.com/p/neither-watts-nor-water-what-the>
28. <https://arxiv.org/pdf/2508.15734>
29. <https://towardsdatascience.com/is-googles-reveal-of-geminis-impact-progress-or-greenwashing/>
30. <https://nriglobe.com/technology/how-much-water-ai-uses-per-prompt-2026-chatgpt-gemini-claude-real-numbers-data-center-sustainability/>
31. <https://powerline.net.in/2026/09/04/water-stress-thermal-power-plants-take-steps-to-optimise-consumption/>
32. <https://www.sciencedirect.com/science/article/abs/pii/S0360544223009477>
33. <https://cpcb.nic.in/uploads/Thermal_Power_Plant_overview.pdf>
34. <https://www.researchgate.net/publication/312470509_A_review_of_operational_water_consumption_and_withdrawal_factors_for_electricity_generating_technologies>
35. <https://www.researchgate.net/figure/Operational-water-consumption-factors-for-electricity-generating-technologies-IGCC_fig1_255041970>
36. <https://docs.nrel.gov/docs/fy11osti/50900.pdf>
37. <https://cdnbbsr.s3waas.gov.in/s3716e1b8c6cd17b771da77391355749f3/uploads/2025/11/202511061627678782.pdf>
38. <https://pantheon.run/learn/nvidia-gb200-nvl72-power-and-cooling>
39. <https://www.ferc.gov/sites/default/files/2025-04/Presentation%20NERC%20Seeks%20to%20Address%20Reliability%20Impacts%20from%C2%A0Large%20Load%20Integration_1.pdf>
40. <https://www.whitecase.com/insight-alert/nerc-tees-plan-assess-grid-risks-associated-data-centers>
41. <https://www.powermag.com/bringing-a-power-plants-worth-of-load-onto-the-grid-nercs-interconnection-reckoning/>
42. <https://keentelengineering.com/nerc-large-loads-grid-reliability>
43. <https://tgsouthernpower.org/resources/PDF/Tariffs/63tarifffile.pdf>
44. <https://merc.gov.in/wp-content/uploads/2025/03/Press-Note_MSEDCL-MYT-Order_English.pdf>
45. <https://www.hrawi.com/(S(ecgvxkqnnngmltkotnjrevx1))/pdf/Press-Note_MYT-Order_MSEDCL_English-2.pdf>
46. <https://pwrnxt.in/blog/merc-myt-order-maharashtra-ci-regulatory-insight.html>
47. <https://merc.gov.in/wp-content/uploads/2025/03/Press-Note_MYT-Order_TPC_English.pdf>
48. <https://www.easyevplug.com/ev-charger-installation-karnataka>
49. <https://www.deccanherald.com/amp/story/india%2Fkarnataka%2Fhike-in-fixed-charge-to-raise-power-bill-in-karnataka-3466600>
50. <https://hrecs.co.in/app/documents/TariffRates2026-27-28.pdf>
51. <https://menafn.com/1110999711/KERC-Issues-True-Up-Tariff-Order-BESCOM-Consumers-To-Pay-56-Paise-More-Per-Unit>
52. <https://www.ecloudsenergy.com/news-details.php?nid=52>
53. <https://www.argus-p.com/updates/updates/electricity-promoting-renewable-energy-through-green-energy-open-access-rules-2022/>
54. <https://www.lexology.com/library/detail.aspx?g=34ed24d5-2614-44b2-a05e-d18081672c31>
55. <https://www.khaitanco.com/thought-leaderships/Green-Energy-Open-Access-Rules-A-breather-for-RE-Participants>
56. <https://forumofregulators.gov.in/Data/Reports/Revised%20Model%20regulation%20GEOA.pdf>
57. <https://solarquarter.com/2025/10/14/bescom-seeks-kerc-approval-to-levy-%E2%82%B91-65-per-unit-additional-surcharge-on-open-access-consumers-in-karnataka/>
58. <https://solarquarter.com/2025/09/26/tnerc-issues-new-regulations-2025-for-green-energy-open-access-2025-in-tamil-nadu/>
59. <https://www.saurenergy.com/solar-energy-news/cerc-adopts-tariff-for-secis-420-mw-round-the-clock-renewable-energy-projects-10814151>
60. <https://www.saurenergy.com/solar-energy-news/waiver-of-ists-charges-will-power-ministry-oblige-re-developers>
61. <https://www.saurenergy.com/solar-energy-news/iex-jan-26-update-trades-rise-196-yoy-as-average-dam-price-falls-129-11073685>
62. <https://www.saurenergy.com/solar-energy-news/iex-dam-prices-drop-nearly-18-yoy-despite-rising-demand-11176360>
63. <https://www.business-standard.com/amp/markets/capital-market-news/iex-records-highest-ever-electricity-traded-volumes-in-fy25-125040400233_1.html>
64. <https://journal.uptimeinstitute.com/large-data-centers-are-mostly-more-efficient-analysis-confirms/>
65. <https://www.ashb.com/public_research/is-2025-107-uptime-institute-global-data-center-survey-2024/>
66. <https://www.dcpostmea.com/2025/08/uptime-institute-release-15th-annual-global-data-center-survey-2025/>
67. <https://docs.nvidia.com/dgx/dgxb200-user-guide/introduction-to-dgxb200.html>
