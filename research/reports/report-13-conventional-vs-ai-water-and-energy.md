<!-- Report 13 of the research series. Produced with AI-assisted web research, October 2026. Figures here may predate later atlas corrections (for example India grid water 4.5 → 2.9 L/kWh, grid CO₂ 0.71 → 0.675 t/MWh); the atlas standards register is authoritative. -->

# Water and Energy: Conventional Data Centres vs AI Data Centres — Global Evidence and India Focus (Part 13)

AI data centres use far more energy per site and per rack than conventional data centres, but not necessarily more water per unit of IT energy: a liquid-cooled AI campus on dry coolers can have a lower on-site WUE than an Indian colo running cooling towers, while its total water footprint — dominated in India by water evaporated at coal plants — is several times larger simply because it burns 4–5× more electricity. For India, the decisive water variable is therefore the grid, not the cooling tower; the decisive design choice at site level is whether heat is rejected by evaporation or by dry/closed-loop systems.

**Label key used throughout:** **[R]** = measured/reported by the operator or official statistics; **[E]** = estimated/modelled by researchers or analysts; **[D]** = design value or target, not an operating result; **[A]** = this report's own assumption/calculation.

## TL;DR

- **Energy:** A representative 100 MW (IT) AI campus consumes roughly 790–850 GWh/yr versus about 160–175 GWh/yr for a 20 MW conventional colo [A] — about 5× more per site, but similar per MW of IT capacity (≈7,900–8,500 MWh/MW-yr) because the AI site's higher utilisation is offset by a lower PUE. Globally, the IEA estimates data centres used 415 TWh in 2024 (~1.5% of world electricity), rising to ~945 TWh by 2030, with accelerated (AI) server electricity growing ~30%/yr versus ~9%/yr for conventional servers [E].
- **Water:** On-site WUE ranges from ~0–0.1 L/kWh (closed-loop/dry) to ~1.4+ L/kWh (evaporative); hyperscalers report 0.12–0.30 L/kWh fleet-wide [R]. In India, indirect water from thermal generation (≈2.6 L/kWh grid-average, [A] from the 3.0–3.5 m³/MWh norms) typically exceeds on-site water by 3–60×, so the 100 MW AI campus carries ≈2.0–2.2 billion litres/yr of grid water regardless of cooling design [A].
- **Liquid cooling verdict:** Direct-to-chip liquid cooling lowers water *per kWh* by enabling warmer coolant and dry heat rejection, but it does not automatically lower water *per site*; when paired with cooling towers it remains water-intensive (LBNL), and dry-only designs trade water for a higher PUE and ~8% more CO₂. In humid coastal Indian hubs (Mumbai, Chennai, Vizag) the trade-off favours closed-loop/dry or seawater-desalinated designs; in Bengaluru the PUE penalty for going dry is smallest.

## Key Findings

1. **The industry average has stalled; AI builds are pulling the frontier.** Uptime Institute's 2025 survey reports a weighted-average PUE of 1.54, the sixth year of near-stagnation; facilities built in the last five years average 1.48 and sites over 20 MW about 1.44 [R, survey]. Hyperscalers report 1.08–1.15 (Google fleet 1.09 for 2025; AWS 1.15 for 2024 and 1.14 for 2025; Meta 1.08) [R]. India's operating fleet sits closer to ~1.5–1.75 (Sify 1.7554 FY2024-25 [R]; an unnamed data-centre executive quoted by The Economic Times said "the PUE of data centres in India is now about 1.5", and a Noida executive told The Secretariat that "a PUE of 1.5-1.6 was considered good in a tropical climate like India's" [E]).
2. **Rack density is the structural difference.** Uptime finds typical racks shifting into the 10–30 kW band with "few facilities" above 30 kW [R]. AI racks are an order of magnitude denser: NVIDIA GB200 NVL72 ≈120 kW (NVIDIA reference) to 132 kW (HPE: 115 kW liquid + 17 kW air); GB300 NVL72 up to 142 kW; Microsoft Fairwater Atlanta is built for ~140 kW per rack and 1,360 kW per row [R/D]. Hashrate Index estimates Vera Rubin VR200 NVL72 racks at ~190–230 kW, though DCD notes NVIDIA "has yet to disclose" Rubin rack power [E, third-party]; NVIDIA's Jensen Huang said at GTC 2025 that Rubin Ultra "Kyber" racks will reach 600 kW in 2027 [D, vendor statement].
3. **Per-query energy has fallen sharply and is small; aggregate demand is not.** Google measured 0.24 Wh, 0.03 gCO₂e and 0.26 mL water for the median Gemini Apps text prompt (May 2025), a 33× energy reduction in 12 months [R, company]. OpenAI's CEO stated 0.34 Wh per average ChatGPT query [R, unaudited statement]; Epoch AI estimates ~0.3 Wh for a GPT-4o query, rising to ~2.5 Wh at 10k input tokens and ~40 Wh at 100k [E].
4. **Water-per-query numbers differ by up to ~170× because of scope, not error.** Google's 0.26 mL counts only on-site cooling water at its fleet WUE; Mistral's 45 mL per 400-token response is a life-cycle figure including electricity-generation water and hardware manufacturing; Li et al.'s "500 mL per 10–50 responses" (≈10–50 mL each) combines on-site and scope-2 water for GPT-3-era hardware [E].
5. **In India, grid water dominates.** Indian coal plants are legally capped at 3.5 m³/MWh (pre-2017) and 3.0 m³/MWh (post-2017) of specific water consumption, with seawater-cooled plants exempt [R, regulation]; the CEA has noted historic consumption of 5–7 m³/MWh [R]. At India's grid mix this implies roughly 2.6 L per kWh consumed [A] — about 2× a cooling-tower data centre's on-site WUE and ~25–50× a closed-loop AI site's.
6. **India is moving from ~1.4–2.2 GW to 8–12 GW by 2030, with AI the fastest-growing slice.** Wood Mackenzie projects operational capacity from 2.2 GW (2025) to 12 GW (2030) and AI-dedicated capacity from 275 MW to 6,546 MW; S&amp;P Global estimates 13 TWh of data-centre electricity in 2024 (0.8% of demand) rising to 57 TWh by 2030 (2.6%) [E].
7. **Indian disclosure is thin.** Only a handful of operators publish absolute PUE/WUE; STT GDC India's 0.58 L/kWh (FY2025, DNV limited assurance) is the only audited portfolio WUE found [R]. Karnataka's 2026–31 policy and the IndiaAI PUE &lt; 1.35 tender clause — a MeitY corrigendum issued in the final week of September 2024 requiring bidders to affirm a PUE "not greater than 1.35" — are the first policy hooks on efficiency and water.

## 1. Definitions and Archetypes

| Archetype | Typical rack density | Typical facility size (IT) | Utilisation / load profile | Cooling norm |
|---|---|---|---|---|
| Enterprise / on-prem | 3–10 kW | &lt;1–5 MW | Server utilisation ~11% (2014) rising to ~20% (2027) in LBNL's model [E]; flat, low | CRAC/DX, air-cooled chillers |
| Retail / wholesale colocation | 5–15 kW (10–30 kW growing) | 5–50 MW per building | Server utilisation 21%→35% (LBNL) [E]; facility load factor often 50–70% of contracted IT [A] | Chilled water + cooling towers or air-cooled chillers |
| Hyperscale cloud | 10–30 kW | 50–300 MW campuses | Server utilisation 45%→50% (LBNL) [E]; diurnal, smooth | Air-side economiser + adiabatic, evaporative; increasingly liquid |
| AI training | 40 kW (H100, air) to 120–142 kW (GB200/GB300, liquid); ~190–230 kW next generation | 100 MW to &gt;1 GW | LBNL assumes 80% operational time at ~70% of rated power [E]; synchronous "square-wave" swings | Direct-to-chip liquid (closed loop) + dry coolers/chillers or towers |
| AI inference | 20–130 kW | 10–300 MW, nearer users | LBNL assumes 40% operational time and half of training power [E]; spiky, demand-following | Mixed air/liquid |

**What "flat vs spiky" means in practice.** LBNL's measurements of Llama-70B training across eight H100 nodes show a "characteristic square-wave pattern" with regular simultaneous power drops at synchronisation points [R, measured], which grid operators find taxing. Conventional colo loads change slowly and average far below nameplate. LBNL measured 8×H100 DGX nodes at an average of 7.9 kW (~78% of rated 10.2 kW) under saturating training workloads and idle at ~18% of rated power [R, measured]; it models the US data-centre fleet on 50% average capacity utilisation [E].

**Server power.** LBNL sets a typical 2023 dual-socket conventional server at 600 W operational, rising to 782 W by 2028, with annual average draw below 0.8 kW; an 8-GPU AI server exceeds a 5 kW annual average by 2026 [E]. Rated server power: A100-class 6.5 kW, H100-class 10.2 kW, B100-class 12.2 kW [R, vendor/Omdia]. At rack scale, a single GB200 NVL72 (~120–132 kW) draws as much as roughly 150–200 conventional servers [A].

## 2. Energy

### 2.1 PUE by archetype

| Type / operator | PUE | Status |
|---|---|---|
| Global survey average (Uptime 2025) | 1.54 (1.56 in 2024; 1.58 in 2023) | [R, survey] |
| New builds (&lt;5 yrs) / &gt;20 MW sites (Uptime 2025) | 1.48 / ~1.44 | [R, survey] |
| US fleet average (LBNL) | 1.6 (2014) → 1.4 (2023) → 1.15–1.35 (2028) | [E, modelled] |
| Google global fleet (2025) | 1.09 | [R] |
| AWS global (2024 / 2025) | 1.15 / 1.14 | [R] |
| Meta | 1.08 | [R] |
| IDC estimate for on-prem enterprise (cited by AWS) | 1.63 | [E] |
| India operator: Sify (FY2024-25) | 1.7554 | [R] |
| India operator: CtrlS | 1.35 | [R, unaudited claim] |
| India operator: Yotta NM1 / D1 / GIFT City | 1.4 / 1.4 / ~1.6 | [D] |
| India operator: STT GDC India new builds | &lt;1.5 | [D] |
| IndiaAI GPU tender requirement | &lt;1.35 | [D, procurement criterion] |

AI-specific facilities rarely publish operating PUE. Microsoft has disclosed design features for Fairwater (closed-loop liquid cooling for &gt;90% of capacity) but not an operating PUE; Meta has not disclosed PUE for Prometheus or Hyperion, nor OpenAI/Oracle for Stargate Abilene, nor xAI for Colossus. Treat any "PUE ~1.1–1.2" quoted for these sites as an estimate.

### 2.2 Where the energy goes

- **IT vs overhead:** At the Uptime average PUE of 1.54, 35% of facility energy is non-IT (cooling, power conversion, lighting); at a hyperscale PUE of 1.09–1.15 the overhead is 8–13% [A, arithmetic]. LBNL estimates US infrastructure energy fell from 40% of the total in 2014 to 30% in 2023 [E].
- **Servers vs the rest of IT:** The IEA says servers account for around 60% of electricity demand in modern data centres, with the rest split among storage, networking and cooling/overhead [E].
- **Inside an AI workload:** In Google's Gemini measurement, the AI accelerators (TPUs) accounted for only 58% of the 0.24 Wh per prompt; host CPU/DRAM, idle provisioned capacity and facility overhead made up the rest [R]. A "chip-only" methodology gives 0.10 Wh — less than half the comprehensive figure.

### 2.3 National and global totals

| Metric | Value | Status / source |
|---|---|---|
| Global DC electricity 2024 | ~415 TWh (~1.5% of world) | [E] IEA Energy and AI (2025) |
| Global DC electricity 2025 | ~485 TWh; AI-focused DCs +50% in 2025 | [E] IEA Key Questions on Energy and AI update |
| Global DC electricity 2030 | ~945–950 TWh (just under 3%) | [E] IEA Base Case |
| Growth by server type, 2024–30 | Accelerated +30%/yr; conventional +9%/yr | [E] IEA |
| Share of net increase | Accelerated servers ~half; conventional ~20% | [E] IEA |
| US DC electricity | 58 TWh (2014) → 176 TWh (2023, 4.4%) → 325–580 TWh (2028, 6.7–12%) | [E] LBNL 2024 |
| US AI vs conventional server electricity | AI servers &lt;2 TWh (2017) → &gt;40 TWh (2023); conventional ~30 → ~60 TWh | [E] LBNL 2024 |
| India DC electricity | ~13 TWh (2024, 0.8%) → 57 TWh (2030, 2.6%) | [E] S&amp;P Global |
| India DC electricity (alt.) | 10 TWh (2025) → 191 TWh (2040, ~7%) | [E] Wood Mackenzie |

The IEA notes a typical AI-focused data centre consumes as much electricity as 100,000 households, with the largest under construction consuming 20 times as much [E].

### 2.4 Energy per query, token and training run

| Measure | Value | Scope | Status |
|---|---|---|---|
| Gemini Apps median text prompt (May 2025) | 0.24 Wh; 0.03 gCO₂e (market-based); 0.26 mL | Accelerators + host + idle + PUE 1.09; water at fleet WUE | [R, company technical paper] |
| Same, chip-only method | 0.10 Wh; 0.02 g; 0.12 mL | Active TPU/GPU only | [R] |
| ChatGPT average query (Altman, June 2025) | 0.34 Wh; ~0.000085 gal (~0.32 mL) | Undisclosed | [R, unaudited statement] |
| GPT-4o typical query (Epoch AI, Feb 2025) | ~0.3 Wh; ~2.5 Wh (10k-token input); ~40 Wh (100k) | Modelled, H100 | [E] |
| Older ChatGPT estimate (EPRI) | 2.9 Wh vs 0.3 Wh for a web search | A100-era assumptions | [E, now considered high] |
| Mistral Large 2, 400-token response | 1.14 gCO₂e; 45 mL water; 0.16 mg Sb eq | Full life-cycle (ADEME/Carbone 4) | [R, peer-reviewed LCA] |
| Mistral Large 2, training + 18 months use | 20.4 ktCO₂e; 281,000 m³ water; 660 kg Sb eq | Life-cycle | [R] |
| GPT-3 training | 1,287 MWh | Literature estimate | [E] |
| GPT-4 / frontier training | Not disclosed by OpenAI | — | Data gap |

**Interpretation:** Per-query energy has converged around 0.2–0.4 Wh for short text prompts, but reasoning models, long contexts, image and video generation can be 10–100× higher, and none of the disclosed medians include them. The efficiency gains (33× in a year at Google) are real but are being outrun by volume, which is why IEA and LBNL still project demand doubling.

## 3. Water

### 3.1 Withdrawal vs consumption, site vs source

- **Withdrawal** = water taken from a source; **consumption** = water not returned (mainly evaporated). A study of US data centres converts withdrawal-based WUE to consumption using a consumptive ratio of ~0.75 for data centres [E]; Shaolei Ren has said data centres typically evaporate about 80% of the water they draw [E].
- **Mixed definitions matter:** AWS's WUE is *withdrawal* per kWh of IT load; Microsoft's 0.30 L/kWh is a *withdrawal* WUE; Meta's WUE is withdrawal divided by IT electricity; LBNL's WUE is *consumption*. Comparing them directly overstates or understates by ~25%.
- **Site WUE vs source WUE:** LBNL defines site WUE as on-site water and source WUE as water used to generate the electricity, warning that "low site WUEs" are not "necessarily good" because waterless cooling raises energy use.

### 3.2 WUE by cooling type

| Cooling system | Site WUE (L/kWh IT) | PUE tendency | Status / note |
|---|---|---|---|
| Air-cooled chiller / DX (CRAC) | ~0 (humidification only) | Highest | [E] LBNL: "use no water, they use more energy" |
| Air-side economiser + occasional adiabatic (hyperscale) | Modelled very low; hyperscalers report 0.1–0.3 | Low | [E/R] LBNL notes its simulations may be low |
| Dry cooler + adiabatic assist | Low–moderate; highest of non-tower systems | Low–moderate | [E] LBNL |
| Water-cooled chiller + cooling towers (no economiser) | Highest; up to ~2.5 L/kWh cited for evaporative | Low | [E] |
| Equinix sites using evaporative cooling (2025) | 1.41 | — | [R, Equinix 2025 Sustainability Report; verify against PDF] |
| Liquid IT cooling + waterside economiser (towers) | Lower than air-cooled towers but "consumes substantial amounts of water" | Very low | [E] LBNL |
| Liquid IT cooling + dry cooler (closed loop) | Near zero operationally; one-time fill | Low–moderate | [E/D] |
| Immersion + dry cooler | Near zero | Very low | [E] |

### 3.3 Reported hyperscaler and operator water

| Operator | Metric | Value | Status |
|---|---|---|---|
| AWS | Global WUE (withdrawal) | 0.15 (2024); 0.12 (2025); 0.06 in N. Virginia 2025 | [R] |
| Microsoft | Global WUE (withdrawal), FY2024 | 0.30 L/kWh (0.49 in 2021) | [R] |
| Meta | WUE (2023 data) | 0.18 L/kWh | [R] |
| Meta | DC withdrawal (2023) | 3,881 ML; 1,360 ML from high-stress areas | [R] |
| Meta | Direct DC consumption vs water embedded in purchased electricity (2024) | 2,974 ML vs 72,207 ML (~24×) | [R] |
| Google | Total water consumption | ~8.1 bn gal (2024); 10.9 bn gal (2025, +34%, "more than double 2021 levels", with data centres accounting for most of the increase, per Axios on Google's 2026 Environmental Report) | [R] |
| Google | Replenishment | 4.5 bn gal (64%, 2024); more than 7 bn gal per Google, or 7.7 bn gal (78%) per secondary trackers (2025) | [R] |
| Equinix | Global WUE (2025) | 0.91 L/kWh | [R, Equinix 2025 Sustainability Report; verify against PDF] |
| STT GDC India | Portfolio WUE FY2025 | 0.58 L/kWh (1.34 in FY21) | [R, DNV limited assurance] |
| Sify Infinit Spaces | Water withdrawal FY2024-25 | 296,279 kL; no WUE published | [R] |
| Nxtra by Airtel | Water consumption FY2025 | 216,357 kL; no WUE published | [R] |
| CtrlS | Water consumption FY2023-24 | 409,037 kL | [R] |

**US totals (LBNL):** US data centres directly consumed about 66 billion litres in 2023 and indirectly ~800 billion litres via electricity [E]; hyperscale direct use could reach 60–124 billion litres by 2028 [E]. US average site WUE was ~0.36 L/kWh through 2023, rising to 0.45–0.48 L/kWh by 2028 because of the shift to hyperscale and liquid-cooled systems on evaporative heat rejection [E]. The IEA's Energy and AI report (April 2025) puts global data-centre water consumption at "around 560 billion litres per year", rising to "around 1200 billion litres per year in 2030" [E]; De Vries-Gao (Patterns, 2025) splits the 560 billion litres into ~373 billion indirect (electricity), ~140 billion direct (on-site) and ~47 billion from hardware manufacturing [E].

### 3.4 Zero-water and closed-loop AI designs

- **Microsoft:** From August 2024 all new designs use chip-level closed-loop cooling with "zero water for cooling", avoiding more than 125 million litres per data centre per year; pilots in Phoenix and Mt. Pleasant (Wisconsin) from 2026, with designs coming online from late 2027 [D]. Microsoft and trade press acknowledge that replacing evaporation with mechanical cooling slightly increases PUE.
- **Fairwater (Wisconsin/Atlanta):** &gt;90% of capacity on a closed loop filled once; initial fill equal to ~20 homes' annual use; the remaining ~10% uses outdoor air, switching to water only on the hottest days; Wisconsin is supported by the "second largest water-cooled chiller plant on the planet" [R/D]. QTS describes ~600,000 gallons of one-time fill per building over a 50-year life [D, secondary].
- **Stargate Abilene (OpenAI/Oracle/Crusoe):** closed-loop water cooling with an initial fill of ~8 million gallons of city water, against the city's average use of 22 million gallons per day [R, local utility].
- **xAI Colossus (Memphis):** an xAI engineer said the open loop "needs 3 million gallons a day" [R]; the local utility reports a request for up to 3.7 million gallons/day for the first two sites, and an activist group says the contract caps use at 1.2 million gallons/day [R, conflicting]. A planned ~$80m, 13-million-gallon-per-day wastewater recycling plant broke ground in October 2025, but construction was paused in 2026; the Memphis mayor says xAI committed to restart in Q1 2027 [D, not operating].

### 3.5 Indirect (scope 2) water — the India-specific factor

- **Regulation:** MoEFCC's 2015 notification (amended 2018) caps specific water consumption at 3.5 m³/MWh for existing cooling-tower plants and 3.0 m³/MWh for plants installed after 1 January 2017, with zero liquid discharge; seawater-cooled plants are exempt [R]. FGD adds about 0.3 m³/MWh [E]. Air-cooled condensers cut this to 0.45–0.65 m³/MWh; NTPC's 1,980 MW North Karanpura (June 2025) is India's first supercritical plant with ACC [R].
- **Compliance is unverified:** Down To Earth reports no public plant-level compliance data, and the CEA noted actual consumption of 5–7 m³/MWh in 2012 [R].
- **Grid-average estimate:** With coal/lignite supplying roughly three-quarters of generation (CEA: 1,739 BU total, 255 BU renewable in FY2024-25) and plants at ~3–3.5 m³/MWh, this report uses **2.6 L/kWh** as India's grid-average consumptive water intensity [A]. It excludes hydro reservoir evaporation (which would raise it) and assumes norm compliance (actual may be higher). For comparison, a study of US hyperscalers' US data centres derived 3.4 L/kWh including hydro evaporation [E].

### 3.6 Water per AI query and training run

- **Li, Yang, Islam and Ren (UC Riverside), "Making AI Less Thirsty":** training GPT-3 in Microsoft's US data centres could directly evaporate ~700,000 L on-site and ~5.4 million L in total including electricity water; GPT-3 "drinks" a 500 mL bottle per roughly 10–50 medium-length responses; global AI could account for 4.2–6.6 billion m³ of withdrawal in 2027 [E].
- **Critiques:** The figures depend on assumed WUE/grid water factors and GPT-3-era hardware; Epoch AI and Google's data imply per-response energy 10× or more lower today; the 500 mL headline combines scope-1 and scope-2 water and is often misquoted as on-site use. The 2027 withdrawal projection is not a consumption figure.
- **Google 0.26 mL:** on-site consumption only, at a fleet-wide 2024 WUE, for a median text prompt — it excludes electricity-generation water, which in India would add roughly 0.6 mL at 2.6 L/kWh [A].
- **Mistral 45 mL:** full life cycle, including electricity and manufacturing, as in an LCA.

### 3.7 Embedded water in chips (scope 3)

Quantitative disclosure is weak. Li et al. note "very limited data" on embodied water in chipmaking [E]. Mistral's LCA attributes 91% of life-cycle water to training and inference, implying ≤9% to manufacturing, data-centre construction and other phases, while hardware manufacturing dominates material depletion (61%) [R]. Meta separately reported 1,019 ML withdrawn for data-centre *construction* in 2024 [R]. Treat chip-fab water as a known unknown for India's atlas.

## 4. Does Liquid Cooling for AI Raise or Lower Water Use?

**Bottom line: it lowers water per kWh, can lower water per site if paired with dry heat rejection, and raises water per site if paired with cooling towers at higher absolute heat loads.**

1. **Why liquid helps.** Direct-to-chip cooling operates at much warmer facility water (LBNL models AI liquid cooling at ASHRAE W45 class), so dry coolers can reject heat without evaporation for more hours; LBNL notes the higher operating temperature "facilitates better water and energy efficiency/performance (less chiller run hours and less adiabatic assist)" [E].
2. **Why it can still be thirsty.** LBNL's base case for liquid-cooled AI is a waterside economiser on cooling towers, which "consumes substantial amounts of water, like all evaporative cooling systems"; it projects US average site WUE *rising* to 0.45–0.48 L/kWh by 2028 partly because of liquid-cooled systems [E].
3. **Absolute heat load.** A 100 MW AI campus rejects ~5× the heat of a 20 MW colo. Even at a lower WUE, if it uses towers (≈1.0 L/kWh) it consumes ~657 ML/yr on-site, versus ~147 ML/yr for a tower-cooled colo [A].
4. **PUE–WUE trade-off.** Evaporative systems are "generally more energy efficient" than air-cooled chillers (LBNL). Microsoft acknowledges a slight PUE penalty for zero-water designs [R]. In India, each extra kWh carries ~2.6 L of grid water and 0.71 kg CO₂, so a dry design that adds 0.1 to PUE costs ~65,700 MWh, ~171 ML of grid water and ~47 kt CO₂ per year at a 100 MW AI campus — but saves ~624 ML of on-site water, a net water win of ~450 ML/yr and a carbon loss [A].
5. **Climate dependence (qualitative).** Evaporative and adiabatic cooling work best when wet-bulb temperature is low; dry coolers work best when dry-bulb is low.
   - **Mumbai, Chennai, Vizag (coastal, humid):** high wet-bulb most of the year limits both economiser hours and evaporative effectiveness; closed-loop liquid with chillers, or seawater/desalinated make-up, is favoured. Reliance–Meta's 168 MW Jamnagar design uses desalinated seawater [D].
   - **Bengaluru (elevated plateau, milder):** the most hours of free/dry cooling among Indian hubs, so the smallest PUE penalty for going waterless — but severe groundwater stress and tanker dependence make on-site water politically costly.
   - **Hyderabad and NCR (hot, dry pre-monsoon):** adiabatic cooling is very effective in dry heat but peaks in water use exactly when supply is tightest; high summer dry-bulb temperatures degrade dry coolers and push chiller hours.
   - The Part 12 hourly adiabatic model should quantify these hours by city using typical meteorological year data, as LBNL did for 965 US weather stations.

## 5. Side-by-Side Comparison

### 5.1 Assumptions [A]

| Parameter | 20 MW conventional colo | 100 MW AI campus |
|---|---|---|
| IT capacity | 20 MW | 100 MW |
| Average IT load factor | 60% (12 MW) | 75% (75 MW) — LBNL training: 80% time at ~70% rated power |
| IT energy | 105,120 MWh/yr | 657,000 MWh/yr |
| Case "wet" (cooling towers) | PUE 1.50, WUE 1.4 L/kWh | PUE 1.20, WUE 1.0 L/kWh (DLC + towers) |
| Case "dry" (air-cooled / closed-loop) | PUE 1.65, WUE 0.1 L/kWh | PUE 1.30, WUE 0.05 L/kWh (DLC + dry coolers) |
| Grid water intensity | 2.6 L/kWh consumed | 2.6 L/kWh consumed |
| Grid emission factor | 0.71 tCO₂/MWh (CEA v21.0, FY2024-25) | 0.71 tCO₂/MWh |

### 5.2 Per facility (annual)

| Metric | Colo – wet | Colo – dry | AI – wet | AI – dry |
|---|---|---|---|---|
| Facility energy | 157.7 GWh | 173.4 GWh | 788.4 GWh | 854.1 GWh |
| On-site water | 147 ML (0.40 MLD) | 10.5 ML (0.03 MLD) | 657 ML (1.80 MLD) | 33 ML (0.09 MLD) |
| Indirect (grid) water | 410 ML (1.12 MLD) | 451 ML (1.24 MLD) | 2,050 ML (5.62 MLD) | 2,221 ML (6.08 MLD) |
| Total water | 557 ML | 462 ML | 2,707 ML | 2,254 ML |
| Indirect share of total | 74% | 98% | 76% | 99% |
| CO₂ (location-based) | 112 kt | 123 kt | 560 kt | 606 kt |

### 5.3 Per MW of IT capacity (annual)

| Metric | Colo – wet | Colo – dry | AI – wet | AI – dry |
|---|---|---|---|---|
| Facility energy | 7,884 MWh | 8,672 MWh | 7,884 MWh | 8,541 MWh |
| On-site water | 7.4 ML | 0.53 ML | 6.6 ML | 0.33 ML |
| Indirect water | 20.5 ML | 22.5 ML | 20.5 ML | 22.2 ML |
| CO₂ | 5.6 kt | 6.2 kt | 5.6 kt | 6.1 kt |

**What this shows.** (1) Per MW of IT, AI and conventional sites are similar on energy; AI's impact comes from scale and density, not from worse efficiency. (2) Per site, the AI campus uses ~5× the energy and water. (3) Going dry cuts on-site water by 93–95% but raises CO₂ by 8–10% and grid water by ~10%; total water still falls by 17–20%. (4) In every case, India's grid water exceeds on-site water — so procurement of renewable power (solar PV and wind consume almost no operational water) cuts water more than any cooling choice.

## 6. India Specifics

### 6.1 Capacity and electricity

- **Capacity estimates conflict by definition:** 1.4 GW IT load as of Q2 2025 (S&amp;P Global 451 Research) vs 2.2 GW operational capacity in 2025 (Wood Mackenzie) [E]. 2030 projections range from ~8.12 GW (India Capital Management) and 9–17 GW to 12 GW (Wood Mackenzie) [E]. A Ministry of Power assessment cited by activists puts upcoming data-centre demand at 5,640 MW by FY2031-32 [E, secondhand].
- **AI share:** Wood Mackenzie projects AI-dedicated capacity rising ~24× from 275 MW (2025) to 6,546 MW (2030) — over half of the 2030 total [E]. S&amp;P estimates the IndiaAI GPUs alone add ~2 TWh/yr, ~10% of 2025 data-centre demand [E].

### 6.2 AI data-centre announcements

| Project | Scale | Cooling/water disclosure | Status |
|---|---|---|---|
| Google AI hub, Visakhapatnam (with AdaniConneX, Airtel/Nxtra) | ~1 GW initially, "multiple gigawatts" later; US$15bn 2026–30; three campuses (Adivivaram 120 acres, Tarluvada 200, Rambilli–Achyutapuram 160) | Google cites "advanced air cooling"; state guaranteed water for 20 years; protests and court challenges over water and an adjacent wildlife sanctuary | Ground broken 28 April 2026 [R] |
| Reliance–Meta, Jamnagar | 168 MW; Reliance Intelligence targets first 120 MW by end-2026 | 100% renewable; desalinated seawater for cooling; no PUE/WUE published | Announced June 2026 [D] |
| CoreWeave–AdaniConneX, Taloja (Navi Mumbai) | 240 MW | Direct liquid cooling; non-evaporative chilled water | Announced [D] |
| AdaniConneX pipeline | 2.6 GW | PUE-linked US$1.44bn sustainability loan; targets not public | [R/D] |
| IndiaAI Mission compute | Target 10,000 GPUs; cumulative ~29,000 after second round; Yotta empanelled for 8,192 B200s | Tender clause PUE &lt; 1.35 | Rs 10,372 crore mission [R] |
| Yotta NM1 (Navi Mumbai) / D1 (Greater Noida) | Hyperscale campuses | Design PUE 1.4; no WUE; claims to "avoid reliance on freshwater entirely" | [D] |

### 6.3 Water stress and policy

- **Karnataka Sustainable Data Centre Policy 2026–31:** Rs 1,300.45 crore outlay; 1 GW cumulative IT load by 2031; 10–12% of India's AI-ready capacity; incentives linked to power and water efficiency; PUE and WUE monitoring; treated water; mapping of water and energy availability before expansion; Sustainable Data Centre Zones outside Bengaluru [R]. Neither BWSSB nor KSPCB separately tracked data-centre water use before this policy (TNM) [R]; twelve Bengaluru data centres could consume up to 1.964 million litres/day at peak [E, secondary].
- **MeitY/IndiaAI:** the PUE &lt; 1.35 clause, added by a MeitY corrigendum to the IndiaAI GPU tender in the final week of September 2024 (bidders must affirm a PUE "not greater than 1.35"), drew industry objections that legacy sites "will not be able to handle this PUE"; an unnamed executive quoted by The Economic Times said India's data centres run at "about 1.5" [R, press]. SBI's April 2026 sector report notes that "since 2024, MeitY tenders for AI cloud infrastructure require data centres to maintain a PUE below 1.35". It is the first national efficiency requirement on AI compute, but it has no WUE counterpart.
- **Disclosure gap:** Down To Earth (November 2025) found that "Not every company discloses its WUE" and "None of these reports provide data centre-level details" [R].

## 7. Uncertainty, Disputes and Data Gaps

1. **Contested per-query numbers.** 0.24 Wh (Google), 0.34 Wh (OpenAI) and 0.3 Wh (Epoch) are not comparable: medians vs averages, different scopes, undisclosed prompt mixes; none cover reasoning, image or video. Google's per-prompt water excludes scope-2 water and uses market-based carbon.
2. **Capacity definitions.** IT load vs operational vs contracted vs announced MW explains most of the 1.4 vs 2.2 GW and 8 vs 12 GW gaps in India.
3. **WUE definitions.** Withdrawal-based (AWS, Microsoft, Meta) vs consumption-based (LBNL) differ by ~25%; few operators report site-level or seasonal figures; peak-day demand (critical for municipal supply) is almost never disclosed.
4. **Modelled vs measured.** LBNL warns simulated PUEs assume systems "operate as designed", which "is rarely the case", and that its hyperscale WUE simulations may be low.
5. **AI-specific facility data.** No operating PUE or WUE has been published for Fairwater, Stargate Abilene, Meta Prometheus/Hyperion or xAI Colossus; the xAI water figures conflict.
6. **India grid water.** Thermal plant compliance with water norms is unverified; this report's 2.6 L/kWh is an assumption.
7. **Forecast spread.** LBNL's 2028 range spans 325–580 TWh; Indian forecasts differ by factors of 2–3. Treat all forecasts as scenarios, not predictions.
8. **Scope 3.** Embodied water and energy in GPUs, HBM and construction are largely undisclosed.

## Recommendations for the Atlas and Series

1. **Report three water numbers per site:** on-site consumption, grid (scope-2) water at 2.6 L/kWh with a sensitivity of 2.0–3.5, and total; never show WUE alone.
2. **Use the per-MW-of-IT table (5.3) as the atlas's default normaliser,** with load factor stated, because per-site comparisons mainly reflect scale.
3. **Treat AI sites in coastal hubs as "dry-or-seawater by default"** and flag any Bengaluru, Hyderabad or NCR proposal relying on evaporative cooling or groundwater as high-risk.
4. **Score policy on WUE as well as PUE:** recommend that MeitY add a WUE or source-water requirement alongside PUE &lt; 1.35, and that Karnataka publish facility-level PUE/WUE.
5. **Pair every water claim with a renewable-sourcing claim:** in India, shifting from coal to solar/wind power cuts more water than any cooling technology.

## Caveats

All site-level comparison figures in Section 5 are this report's own modelled values from stated assumptions, not measurements of any real facility. Hyperscaler PUE/WUE values are self-reported, fleet-wide and partly unaudited. Several figures (Equinix WUE, global IEA water totals, Google 2025 water, Vera Rubin rack power, Karnataka peak water) come via secondary sources and should be checked against primary documents before publication in the atlas. Climate implications for Indian cities are qualitative and should be quantified in the Part 12 hourly model.

Sources:
1. datacenterdynamics — https://www.datacenterdynamics.com/en/news/roughly-one-third-of-data-center-owners-and-operators-doing-ai-training-or-inference-uptime-institute/
2. amazon — https://aws.amazon.com/sustainability/
3. datacenterdynamics — https://www.datacenterdynamics.com/en/news/meta-data-center-electricity-consumption-hits-14975gwh-leased-data-center-use-nearly-doubles/
4. datacenters — https://datacenters.google/efficiency/
5. dcpostmea — https://www.dcpostmea.com/2025/08/uptime-institute-release-15th-annual-global-data-center-survey-2025/
6. datacenterdynamics — https://www.datacenterdynamics.com/en/news/microsoft-launches-atlanta-fairwater-data-center-two-stories-no-ups-or-gen-sets/
7. pantheon — https://pantheon.run/learn/nvidia-gb200-nvl72-power-and-cooling
8. hpe — https://buy.hpe.com/my/en/options/server-accelerators/nvidia-ai-accelerated-computing/nvidia-ai-accelerated-computing/nvidia-gb200-nvl72-by-hpe/p/1014890104
9. crbonfree — https://crbonfree.com/blog/how-much-energy-does-ai-use
10. technologyreview — https://www.technologyreview.com/2025/08/21/1122288/google-gemini-ai-energy/
11. google — https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference?hl=en
12. towardsdatascience — https://towardsdatascience.com/is-googles-reveal-of-geminis-impact-progress-or-greenwashing/
13. epoch — https://epoch.ai/gradient-updates/how-much-energy-does-chatgpt-use
14. greenly — https://greenly.earth/en-us/leaf-media/data-stories/ai-efficiency-a-gemini-reality-check-with-greenly
15. arxiv — https://arxiv.org/pdf/2508.15734
16. arxiv — https://arxiv.org/pdf/2304.03271
17. felloai — https://felloai.com/how-much-water-does-ai-use/
18. cpcb — https://cpcb.nic.in/uploads/Industry-Specific-Standards/Effluent/TPP_Effluent_Norms.pdf
19. downtoearth — https://www.downtoearth.org.in/water/widespread-non-compliance-as-thermal-power-plants-don-t-meet-water-use-norms-65391
20. thehawk — https://www.thehawk.in/news/economy-and-business/indias-data-centre-capacity-likely-to-surge-40-pc-annually-to-12-gw-by-2030-report
21. spglobal — https://www.spglobal.com/en/research-insights/special-reports/india-forward/shifting-horizons/will-data-center-growth-india-propel-country-global-hub-status
22. sttelemediagdc — https://assets.sttelemediagdc.com/sttgdc/global_en/public/2026-03/STT-GDC-India-ESG-Report-FY2025.pdf
23. lbl — https://eta-publications.lbl.gov/sites/default/files/2024-12/lbnl-2024-united-states-data-center-energy-usage-report_1.pdf
24. uptimeinstitute — https://journal.uptimeinstitute.com/large-data-centers-are-mostly-more-efficient-analysis-confirms/
25. ashb — https://www.ashb.com/public_research/is-2025-107-uptime-institute-global-data-center-survey-2024/
26. marketscreener — https://www.marketscreener.com/quote/stock/AMAZON-COM-INC-12864605/news/Amazon-com-2024-Amazon-Sustainability-Report-AWS-Summary-2024-amazon-sustainability-report-aws-50528004/
27. yotta — https://colocation.yotta.com/data-center/
28. yotta — https://yotta.com/data-center/
29. communicationstoday — https://www.communicationstoday.co.in/indiaai-missions-sustainability-push-sparks-data-center-cost-concerns/
30. mlq — https://mlq.ai/news/v2/microsoft-deploys-closed-loop-cooling-at-fairwater-campus-claims-restaurant-level-water-use/
31. iea — https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai
32. iea — https://www.iea.org/reports/energy-and-ai/executive-summary
33. Wikipedia — https://en.wikipedia.org/wiki/Data_center
34. windows — https://iea.blob.core.windows.net/assets/3179f7f8-01f6-4dd6-bffa-c9f7b73f1dc9/KeyQuestionsonEnergyandAI.pdf
35. energy — https://www.energy.gov/articles/doe-releases-new-report-evaluating-increase-electricity-demand-data-centers
36. energynews — https://energynews.pro/en/india-to-reach-12-gw-of-data-centre-capacity-by-2030
37. euronews — https://www.euronews.com/next/2025/08/23/using-googles-ai-prompt-akin-to-five-drops-of-water-or-the-energy-needed-to-watch-9-second
38. techbytehaven — https://techbytehaven.com/how-much-electricity-does-chatgpt-actually-use/
39. hhc — https://www.hhc.earth/knowledge-base/articles/french-mistral-ai-sets-new-environmental-standard-with-comprehensive-lca-report
40. the-decoder — https://the-decoder.com/mistral-ai-publishes-the-first-comprehensive-life-cycle-assessment-of-a-large-language-model/
41. acm — https://cacm.acm.org/sustainability-and-computing/making-ai-less-thirsty/
42. arxiv — https://arxiv.org/html/2603.02705v2
43. aboutchromebooks — https://www.aboutchromebooks.com/ai-data-center-water-usage-statistics/
44. microsoft — https://www.microsoft.com/en-us/microsoft-cloud/blog/2024/12/09/sustainable-by-design-next-generation-datacenters-consume-zero-water-for-cooling/
45. aboutamazon — https://sustainability.aboutamazon.com/products-services/aws-cloud
46. atmeta — https://sustainability.atmeta.com/wp-content/uploads/2025/10/Meta_2025-Environmental-Data-Index.pdf
47. Wikipedia — https://en.wikipedia.org/wiki/Water_usage_effectiveness
48. redmondmag — https://redmondmag.com/articles/2024/12/09/microsoft-rolls-out--water-saving-datacenter-design.aspx
49. stanford — https://ojs.stanford.edu/ojs/index.php/surj/article/download/4407/1933/13349
50. techtarget — https://www.techtarget.com/it-infrastructure/news/366650693/A-shadow-water-problem-AIs-power-demand-shifts-consumption-upstream
51. sifyinfinitspaces — https://sifyinfinitspaces.com/wp-content/uploads/2025/09/Sify-Infinit-Spaces-Limited_Sustainability-Report-2024-25.pdf
52. earthjournalism — https://earthjournalism.net/stories/what-data-center-giants-arent-saying-about-their-water-use-in-india
53. downtoearth — https://www.downtoearth.org.in/science-technology/indias-digital-thirst-what-data-centre-giants-arent-saying-about-their-water-use
54. esgdive — https://www.esgdive.com/news/google-commits-to-replenish-more-water-than-it-uses-by-2030/822021/
55. smartwatermagazine — https://smartwatermagazine.com/news/smart-water-magazine/microsoft-unveils-next-generation-datacenters-zero-water-cooling
56. techradar — https://www.techradar.com/pro/did-extreme-overclockers-inspire-microsoft-to-develop-closed-loop-liquid-cooling-for-data-centers-id-like-to-think-so
57. networkworld — https://www.networkworld.com/article/3631084/microsoft-raises-bar-with-water-saving-data-center-design.html
58. datacentremagazine — https://datacentremagazine.com/news/microsoft-inside-the-worlds-first-ai-superfactory
59. microsoft — https://blogs.microsoft.com/blog/2025/09/18/inside-the-worlds-most-powerful-ai-datacenter/
60. Substack — https://measuredai.substack.com/p/microsoft-fairwater-atlanta-data-center
61. texastribune — https://www.texastribune.org/2025/09/25/texas-data-center-water-use/
62. governing — https://www.governing.com/resilience/wastewater-will-cool-this-memphis-data-center
63. wreg — https://wreg.com/news/local/xai-to-resume-construction-on-wastewater-recycling-facility-memphis-mayor-says/
64. The Cool Down — https://www.thecooldown.com/green-tech/musk-ai-water-recycling-project-memphis/
65. yahoo — https://www.yahoo.com/news/articles/xai-puts-water-recycling-project-163519747.html
66. wwdmag — https://www.wwdmag.com/wastewater-treatment/news/55386236/xai-commits-to-restarting-memphis-wastewater-recycling-project-in-2027
67. powerline — https://powerline.net.in/2026/09/04/water-stress-thermal-power-plants-take-steps-to-optimise-consumption/
68. downtoearth — https://www.downtoearth.org.in/pollution/it-is-imperative-to-improve-water-efficiency-in-india-s-coal-fired-thermal-power-plants-89484
69. scribd — https://www.scribd.com/document/989264277/CEA-Indian-Grid-Emission-Factor
70. sciencedirect — https://www.sciencedirect.com/science/article/pii/S2666389925002788
71. arxiv — https://arxiv.org/abs/2304.03271
72. researchgate — https://www.researchgate.net/publication/369855581_Making_AI_Less_Thirsty_Uncovering_and_Addressing_the_Secret_Water_Footprint_of_AI_Models
73. sinkproject — https://www.sinkproject.com/company/mistral-ai
74. countercurrents — https://countercurrents.org/2026/10/people-need-decentralized-distributed-data-centres-not-hyperscale-centralized-ones
75. latestly — https://www.latestly.com/technology/meta-reliance-partnership-tech-giants-unveil-indias-1st-ai-enabled-data-centre-in-jamnagar-7467321.html/amp
76. psuconnect — https://www.psuconnect.in/corporate-news/reliance-meta-to-build-india-first-ai-data-centre-in-jamnagar-168-mw-powered-by-renewable-energy
77. vaidicslucknow — https://www.vaidicslucknow.com/current-affair/data-centres-in-karnataka-sustainability-concerns-sustainable-data-centre-policy-2026-31-t/
78. reclimatize — https://reclimatize.in/india-grid-emission-factor-cea-ccts/
79. thebatterymagazine — https://www.thebatterymagazine.com/indias-data-centre-capacity-set-to-surge-nearly-sixfold-to-12-gw-by-2030-wood-mackenzie/
80. woodmac — https://www.woodmac.com/press-releases/india-data-centre-capacity-to-reach-12-gw-by-2030/
81. re24 — https://re24.energy/india-data-centre-boom-digital-infrastructure/
82. enterpriseam — https://enterpriseam.com/mena-india/2025/12/24/ai-to-drive-20-of-indias-incremental-power-demand-by-2030/
83. constructionworld — https://www.constructionworld.in/energy-infrastructure/power-and-renewable-energy/india-data-centres-to-consume-191-twh-by-2040-driving-renewables/95229
84. thenextweb — https://thenextweb.com/news/google-india-data-centre-water-wildlife-visakhapatnam
85. datacenterdynamics — https://www.datacenterdynamics.com/en/news/google-confirms-15bn-data-center-project-in-andhra-pradesh-india/
86. adani — https://www.adani.com/newsroom/media-releases/google-breaks-ground-on-india-ai-hub-launching-a-national-industrial-ecosystem
87. TechCrunch — https://techcrunch.com/2025/10/14/google-to-invest-15b-in-indian-ai-infrastructure-hub
88. voicendata — https://www.voicendata.com/data-centre/reliances-sovereign-ai-push-exposes-indias-model-compute-gap-12544068
89. inc42 — https://inc42.com/buzz/coreweave-enters-india-partners-adaniconnex-for-240-mw-data-centre-capacity/
90. tele — https://tele.net.in/smart-energy-management-role-of-technology-and-green-policy-mandates-in-building-sustainable-data-centres/
91. bank — https://sbi.bank.in/documents/57189647/58231607/Sector+Report+DataCentre.pdf/f1919592-ee66-b50b-ea20-75fbb27c9bb5?t=1779885206866
92. cbinsights — https://www.cbinsights.com/company/cyfuture
93. cbinsights — https://www.cbinsights.com/investor/netmagic-solutions
94. indiaai — https://www.indiaai.gov.in/article/union-minister-of-electronics-it-railways-and-i-b-announces-the-availability-of-18-000-affordable-ai-compute-units
95. medianama — https://www.medianama.com/2026/09/223-karnataka-sustainable-data-centre-policy/
96. newslaundry — https://www.newslaundry.com/2026/10/01/karnatakas-new-data-centre-policy-puts-water-energy-in-focus-what-does-it-say
