<!-- Report 16 of the India Data Centre Atlas research series (Cooling technologies: power, water and AI-readiness). Produced with AI-assisted web research, 11 Oct 2026, and kept as written at the time. The atlas standards register (src/data/standards.js) is authoritative where figures differ (for example India grid water 2.9 L/kWh and grid CO₂ 0.675 t/MWh after the October 2026 corrections). -->

# Data Centre Cooling Technologies: Power, Water, AI-Readiness, Cost, Feasibility and Status (Global, with an India Lens) — October 2026

AI racks of 130 kW and more cannot be air-cooled. They need warm-water direct-to-chip (DTC) liquid cooling, paired with dry coolers or air-cooled chillers. For India's hot and humid metros, this is the only cooling path that gets low energy use and near-zero on-site water use at the same time. Conventional data centres below about 15–20 kW per rack can still be served well by containment, chilled water and economisers. In those facilities, the water-versus-power trade-off is decided by climate and by the heat-rejection plant, not by the white-space equipment.

## TL;DR
- **AI racks have moved past what air can cool.** NVIDIA's GB300 NVL72 draws 132–142 kW nominal per rack (about 155 kW peak), with about 90% of the heat going to liquid. NVIDIA says Vera Rubin will be "100% liquid-cooled" with 45°C supply water and "doesn't need a chiller". Single-phase DTC with coolant distribution units (CDUs) is the default. Immersion is a niche. Two-phase cooling is held back by the PFAS problem after 3M stopped making the fluids at the end of 2025.
- **Water is set by how heat leaves the site.** Cooling towers and evaporative systems give the lowest power use but the highest water use. Air-cooled chillers and dry coolers use near-zero water but more power. LBNL puts the average US site WUE at about 0.36 L/kWh through 2023, plus 4.52 L/kWh of indirect water from power generation. Indian sources quote about 25–25.5 million litres per MW per year for evaporative designs. Mordor Intelligence estimates India's data centres used 150.3 billion litres in 2025 and projects 358.66 billion litres by 2030, growth of more than 19% a year (WION, 2026; CEEW gives the same figures).
- **For India, build greenfield AI capacity on W32–W45 warm-water liquid cooling, with dry or hybrid coolers and magnetic-bearing chillers as trim.** Mumbai's 0.4% design wet-bulb is 27.9°C, Chennai's is 29.1°C and Delhi's is 28.4°C, so evaporative and indirect-evaporative cooling gain little and cost a lot of water there. Hyderabad, Pune and Bengaluru (24–25.6°C wet-bulb) are better suited to indirect-evaporative or adiabatic designs. MeitY's IndiaAI GPU tender already requires PUE below 1.35. The Indian fleet averages about 1.4–1.6.

## Key Findings

1. **Global efficiency has stalled, while new builds and hyperscalers pull ahead.** Uptime Institute's 15th Global Data Center Survey (more than 800 operators, run in April–May 2025) found a global average PUE of 1.54 across 681 responses. Uptime says PUE has "virtually stood still" for the sixth year in a row. Regional averages are 1.52 for Asia-Pacific excluding China, 1.50 for Europe, 1.49 for North America and 1.4 for China. Sites above 20 MW average about 1.44 (DCD, 30 July 2025). Facilities commissioned in the previous five years averaged 1.48. Google says "In 2025, the average annual power usage effectiveness for our global fleet of data centers was 1.09." That is overhead of 0.09, which Google puts 83% below the industry average. LBNL estimates US average PUE fell from 1.6 (2014) to 1.4 (2023), and projects 1.15–1.35 by 2028 as liquid-cooled AI grows. LBNL also says cooling and other infrastructure fell from 40% of US data centre electricity in 2014 to 30% in 2023.
2. **Power and water pull in opposite directions.** LBNL (December 2024) finds that water-cooled chillers without economisers have the highest site WUE. It also says: "While air-cooled chillers use no water, they use more energy." Hyperscalers using airside economisers with adiabatic assist report WUE of 0.1–0.3 L/kWh.
3. **Liquid cooling is now mainstream for AI.** Dell'Oro Group's 8 January 2026 release says "The Liquid Cooling market is expected to roughly double in 2025, reaching close to $3 billion in revenue, before continuing to scale toward approximately $7 billion by 2029." Its Research Director, Alex Cordovil, says "Liquid cooling has crossed a critical threshold." Single-phase DTC stays dominant, and Vertiv leads. Dell'Oro reported direct liquid cooling revenue up 156% year on year in 2Q 2025.
4. **Two-phase cooling has a chemistry problem.** 3M announced on 20 December 2022 that it would leave PFAS manufacturing by the end of 2025, which ended Novec supply. Chemours' replacement, Opteon 2P50, is a hydrofluoroolefin (HFO). Chemours says it is not a PFAS, but that is disputed under broad definitions. Single-phase immersion and water-glycol DTC are not affected.
5. **Indian operators are marketing 100–300 kW/rack readiness, but fleet efficiency still trails.** SBI's April 2026 sector report says leading Indian operators report PUE of 1.4–1.5. Schneider Electric (July 2026) puts India's average at about 1.5–1.6.

## Master Comparison Table

Notes on this table. "Water" means on-site (site) WUE only. To convert, 1 L/kWh at full IT load is about 8.76 million litres per MW per year. Power figures are cooling-only pPUE or facility PUE, as marked. The ranges combine vendor claims (flagged) with independent sources.

| Technology | Power (PUE / pPUE / cooling share) | On-site water (WUE) | Max rack density | Conventional vs AI fit | Capex / opex | India climate feasibility | Maturity / status (date) |
|---|---|---|---|---|---|---|---|
| CRAC (DX), raised floor | Highest energy; mostly small/legacy rooms, which drive higher PUEs (LBNL 2024) | ~0 (humidification only) | ~5–15 kW | Conventional/edge only | Lowest first cost; high opex | Works everywhere but inefficient in 35–42°C heat | Mature, declining |
| CRAH + chilled water + hot/cold aisle containment | Facility PUE ~1.4–1.6 typical (Uptime 2025 avg 1.54) | Depends on chiller: ~0 (air-cooled) to highest (towers) | ~15–30 kW with containment | Conventional; AI only with liquid add-ons | Moderate | Standard Indian design today | Mature, dominant |
| In-row coolers | Lower fan energy than room units | As per plant | Up to ~30 kW (STT GDC India) | Conventional/HD; bridge for H100 air racks | Moderate | Good | Mature |
| Rear-door HX (passive/active) | Low fan energy; uses chilled water | As per plant | Passive ~20 kW, active ~50 kW (STT GDC India) | Bridge for 20–50 kW; residual heat for DTC racks | Moderate | Good; needs chilled water | Mature; used in xAI Colossus 1 |
| Overhead cooling / fan walls | Fan walls give large-scale low-pressure airflow | As per plant | ~20–40 kW (air physics ceiling, indicative) | Conventional hyperscale; residual air for AI | Moderate | Good | Mature |
| Air-cooled chillers | Higher energy than water-cooled (LBNL); air-cooled mag-bearing COP ~3.9 full load (Mitsubishi) | ~0 | Plant-level | Both; key for zero-water AI | Lower first cost; higher kWh | Viable; efficiency falls in 40°C+ heat | Mature; Microsoft zero-water and Colossus 2 (119 units) |
| Water-cooled chillers + cooling towers | Most efficient compressor option; mag-bearing ~0.5 kW/ton | Highest WUE (LBNL); ~25.5 ML/MW-yr cited for India | Plant-level | Both | Moderate capex; water treatment opex | Efficient, but uses a lot of water in water-stressed metros | Mature, widespread |
| Magnetic-bearing / oil-free chillers | ~0.5 kW/ton full load; IPLV 0.29–0.51 | As per heat rejection | Plant-level | Both; supports warm-water AI loops | Premium; lower maintenance | Strong fit | Mature |
| Absorption / adsorption (waste heat, CHP) | Low electric input; thermal COP low | Usually tower-cooled (water use) | Plant-level | Niche; trigeneration | High capex | Yotta planned gas CHP for chilled water | Niche |
| Thermal energy storage (chilled water/ice) | Shifts load, small net efficiency gain | Small | Plant-level | Both (ride-through) | Moderate | Useful with time-of-day tariffs | Mature |
| Direct airside economiser | Very low cooling energy in cool, dry climates | Low (adiabatic hours only) | ~20–30 kW | Conventional hyperscale | Low | Poor: dust, humidity, monsoon | Mature (cold climates) |
| Indirect evaporative (Munters Oasis, KyotoCooling) | pPUE 1.06–1.07; PUE 1.12–1.2 (Munters cases) | Low–moderate (one-third of conventional economiser water flow, per Munters) | ~20–30 kW air | Conventional; residual air for AI | Moderate–high | Good in Hyderabad/Pune/Bengaluru; weak in Mumbai/Chennai | Mature |
| Direct evaporative / adiabatic | Very low energy | 0.1–0.3 L/kWh reported by hyperscalers | Air-limited | Conventional hyperscale | Low | Dry-season only; humidity risk | Mature |
| Waterside economiser | Cuts chiller hours | Tower-based; high | Plant-level | Both; strong with warm-water liquid | Moderate | Few free hours at 28–29°C wet-bulb | Mature |
| Dry coolers / adiabatic-hybrid dry coolers | Near-chillerless at W40–W45 | ~0 dry; some in adiabatic mode | Plant-level | Best match for AI liquid | Moderate; large footprint | Good with 40–45°C water; needs trim chillers in the hottest hours | Mature, growing fast |
| Single-phase DTC (cold plate) + CDU | Liquid-cooled facilities modelled at PUE 1.15–1.35 by 2028 (LBNL) | ~0 with dry coolers; high with towers | 80–150+ kW; Schneider/NVIDIA reference design up to 227 kW | Mandatory for GB200/GB300/Rubin | Capex parity or better at density (Schneider WP282) | Best option for India AI | Mainstream (Dell'Oro: majority of liquid market) |
| Two-phase DTC | Higher heat flux capacity | ~0 closed loop | 150 kW+ | Future high-TDP chips | Premium | Same as DTC | Early commercial; PFAS fluid risk |
| Single-phase immersion | PUE ~1.02–1.1 (vendor/secondary) | ~0 (dry coolers) | 100–300 kW (STT 150 kW, CtrlS 300 kW) | Niche AI, crypto, edge | Higher; fluid cost | Good; preferred by IndiaAI | Selective adoption (<25% of liquid market by Dell'Oro forecast) |
| Two-phase immersion | Lowest pPUE claims | ~0 | 200 kW+ | Niche | High; fluid supply risk | Fluid availability issues | Stalled after 3M exit |
| Precision/spray (chassis immersion, Iceotope) | Low | ~0 | 30–100 kW | Edge/HPC niche | Comparable capex at 10 kW (Schneider) | Good | Early commercial |
| Seawater/lake/river | Very low PUE possible | No freshwater; thermal discharge | Plant-level | Both | High intake capex; corrosion | Promoted by Andhra Pradesh; used by coastal hyperscalers (CEEW) | Proven, site-specific |
| Underwater (Natick, Highlander) | PUE 1.07 (Natick) | 0 freshwater | Module-limited | Experimental | Unproven at scale | Coastal possible; regulatory hurdles | Microsoft stopped 2024; China commercial |
| Heat reuse / district heating | Improves ERE, not PUE | — | — | Better with warm-water AI | Needs offtaker | Limited heat demand in India | Mandated in EU (>1 MW) |
| Microfluidic in-chip | Up to 3x heat removal vs cold plates (Microsoft, lab) | ~0 | Chip-level | Future AI chips | Unknown | — | Lab/prototype (Sept 2025) |
| Thermoelectric / solid-state | Low COP; hotspot use only | 0 | — | Niche | — | — | R&D |

## Details by Technology Family

### 1. Air-based cooling (white space)

| Item | Data point | Source and date |
|---|---|---|
| Global average PUE | 1.54 weighted average; 1.48 for sites built in the last five years | Uptime Institute Global Survey, 2025 |
| Air-cooling ceiling per rack | Legacy air cooling "approaching their physical limits, particularly beyond 15 kW per rack" | SBI Data Centre sector report, April 2026 |
| Average rack density | ~15 kW/rack today; AI needs 60–120 kW/rack | Dell'Oro, February 2025 |
| Average rack density (alternative) | ~8 kW/rack | Uptime 2024, cited by CEEW, February 2026 |
| In-row cooling | Up to 30 kW/rack | STT GDC India Pune Innovation Lab |
| Rear-door HX | Passive ~20 kW, active ~50 kW per rack | STT GDC India Pune Innovation Lab |
| CRAC (DX) role | Common in small to midsize facilities "because of their simplicity and cost-effectiveness" | LBNL, December 2024 |

**Interpretation.** The two average rack density figures conflict (8 kW from Uptime and 15 kW from Dell'Oro). This is because Uptime counts all racks and Dell'Oro weights by new shipments. For Indian conventional colocation, 6–15 kW is still typical. Yotta NM1, for example, is listed at a 15 kW/rack maximum and PUE 1.5 on a third-party directory, not a primary source. CRAC/DX rooms are the least efficient choice. LBNL also notes that real-world PUEs are worse than designed because CRAC units often "fight" each other, with some humidifying while others dehumidify. Containment plus higher supply-air temperatures, within ASHRAE's 18–27°C recommended envelope, is the cheapest efficiency gain for India's existing fleet. Rear-door heat exchangers and in-row coolers are the right bridge for air-cooled H100/H200 HGX racks at about 30–45 kW. They also handle the about 10% residual air heat from DTC racks.

### 2. Chiller plants and heat rejection

| Technology | Efficiency metric | Water | Source and date |
|---|---|---|---|
| Water-cooled mag-bearing centrifugal | 0.52 kW/ton full load (COP 6.8); IPLV 0.29 kW/ton | Tower water | Daikin HXE datasheet |
| Variable-speed oil-free mag-bearing (field study) | 0.51 kW/ton IPLV rating; outperformed a rotary-screw baseline | Tower water | US GSA Green Proving Ground, 2013 |
| ASHRAE 90.1 minimum, water-cooled centrifugal | 0.577–0.634 kW/ton full load | — | Cx Associates summary of ASHRAE 90.1 |
| Air-cooled mag-bearing (MECH-iC) | COP 3.95 (0.89 kW/RT) full load; ≤0.5 kW/ton part load (vendor) | Zero | Mitsubishi Electric, accessed 2026 |
| York YMC² | "below 0.100 kW/ton at part load" (marketing claim at very low lift) | Tower water | Johnson Controls/York |
| Daikin WME-E | Leaving water up to 85°F (29°C), condenser up to 140°F, for dry-cooler systems up to 1,200 tons | Low/zero | Daikin Applied, accessed 2026 |
| Water-cooled chiller without economiser | Highest site WUE of all systems modelled | High | LBNL, December 2024 |

**Interpretation.** Water-cooled plants are about twice as efficient at the compressor as air-cooled plants (0.5 versus about 0.9 kW/ton at full load, from the vendor data above), but they evaporate water. Microsoft has explicitly accepted a PUE penalty to stop evaporating water. Since August 2024 its new designs use closed-loop chip-level cooling and "high efficiency economizing chillers with elevated water temperatures". Microsoft's "Sustainable by design" Cloud blog (9 December 2024) says "this design will avoid the need for more than 125 million liters of water per year per datacenter", and reports a fleet WUE of 0.30 L/kWh for the last fiscal year. The pilots are in Phoenix and Mount Pleasant, starting in 2026 and online from late 2027. A June 2026 Microsoft blog says its fleet WUE has improved by nearly 90% since the early 2000s. In those designs, adiabatic water is used only when outside air is above 85°F. Absorption chillers and thermal storage are niche in data centres. Yotta's 2020 NM1 launch release described plans for gas-based combined heat and power to produce chilled water and bring design PUE to 1.2. That is a stated ambition, not a reported result. No authoritative 2023–2026 performance data for data centre absorption plants turned up in this research.

### 3. Economisers and free cooling

| System | Measured result | Source and date |
|---|---|---|
| Munters Oasis indirect evaporative cooling, Equinix ME1 Melbourne / LD6 Slough | Cooling pPUE below 1.06; project PUE 1.2 at 20°C supply air | Munters case study |
| Munters Oasis, DigiPlex Fetsund (Oslo), 10 MW, 52 units | PUE 1.12; cooling pPUE 1.06; one-third the water flow of conventional economisers | Munters case study |
| Munters Oasis, Sabey (USA) | pPUE 1.07 | Munters case study |
| Airside economiser plus adiabatic (hyperscale) | WUE 0.1–0.3 L/kWh reported | LBNL, December 2024 |
| Dry cooler with adiabatic assist | Highest water use among non-tower systems; water used only in wet mode | LBNL, December 2024 |

**Interpretation for India.** The IS 7896:2001 design data (Bureau of Indian Standards, in ASHRAE format, read by the research subagent from a garbled PDF, so check against the original table) shows why one design cannot fit all Indian cities:

| City | 0.4% dry-bulb / MCWB (°C) | 0.4% wet-bulb (°C) | Implication |
|---|---|---|---|
| Mumbai | 35.3 / 22.8 | 27.9 | Humid; evaporative gains small, water use high; favour dry coolers with warm-water liquid, or seawater |
| Chennai | 38.4 / 26.2 | 29.1 | Most humid; same as Mumbai; cyclone and flood risk |
| Delhi | 41.8 / 23.6 | 28.4 | Very hot pre-monsoon and humid monsoon; dry coolers lose capacity in 42°C+ heat |
| Hyderabad | 40.4 / 22.5 | 25.6 | Hot-dry; indirect evaporative and adiabatic work well in the dry season; water stress (projected deficit of 870 million litres/day by 2027, per Down to Earth) |
| Pune | 38.4 / 20.5 | 24.8 | Moderate; good for indirect evaporative and economisers |
| Bengaluru | 34.7 / 19.6 | 23.5 | Most favourable thermally; severe water stress |

R.V. Simha (ISHRAE Journal, 2016) cautions that the low published design wet-bulbs for Bengaluru, Mumbai and Pune understate field practice. He says practitioners use 24–25°C for Bengaluru. Designers should therefore add margin. Direct airside economisation is a poor fit for India because of dust, monsoon humidity and pollution. Indirect systems keep outdoor air out of the data hall, which matters here.

### 4. Liquid cooling

| Item | Data point | Source and date |
|---|---|---|
| GB300 NVL72 rack power | 132–142 kW nominal, ~155 kW peak; ~90% liquid / ~10% air (~13–14 kW to air) | HPE/Supermicro specs via secondary compilations, 2025–2026 |
| GB300 NVL72 water class | Operating water 2–50°C (ASHRAE W45 compliant); air 5–40°C (A3) | Lenovo Press product guide |
| GB200 NVL72 split | 115 kW liquid + 17 kW air | HPE QuickSpecs via Moduledge |
| Vera Rubin NVL72 | 45°C supply; "100% liquid-cooled"; "doesn't need a chiller" (Jensen Huang, CES, January 2026). NVIDIA's Ali Heydari says chillers may be needed for "maybe 1% of the year" in some climates | Facilities Dive; Edgen |
| Rubin reference design | Up to 227 kW per rack | Schneider Electric / NVIDIA reference design |
| ASHRAE liquid classes | W17, W27, W32, W40, W45, W+, named for the maximum facility-water supply temperature (°C); W40 added in the 2022 update | ASHRAE TC 9.9 via CIBSE Journal (2025) and DCD |
| Industry convergence | Facility water around 32°C (Uptime); Meta uses 30°C | DCD analysis |
| Market | ~$3B in 2025 → ~$7B by 2029; Vertiv leads; CoolIT, nVent, Boyd strong | Dell'Oro, January 2026 |
| CDU vendors | Around 40 vendors entering the CDU market | Dell'Oro, 2025 |
| Capex | 2 MW at 10 kW/rack: air $7.02/W vs liquid (chassis immersion) $6.98/W; $6.33/W at 20 kW; $6.02/W at 40 kW | Schneider Electric White Paper 282, 2020 |

**Liquid-to-air vs liquid-to-liquid CDUs.** Liquid-to-air sidecar CDUs reject heat into the room air. They are roughly 60–80 kW per unit (Moduledge), and one GB300 secondary compilation cites up to 200 kW. They let a retrofit host a few AI racks without facility water, but they load the existing air plant. Liquid-to-liquid CDUs, either in-rack (up to about 250 kW) or in-row (up to about 1.8 MW across eight racks, per a GB300 compilation), connect to the facility water system. They are needed at cluster scale. Treat the CDU capacity figures as indicative, because they come from secondary compilations of OEM guidance.

**Interpretation.** Warm-water DTC is the anchor technology for AI. It is required by the hardware, it fits the ASHRAE W32–W45 classes, and it is the only route to both low PUE and low WUE. The ASHRAE class is a facility-water number, not a chip temperature. A GB300 designed for 45°C water still works on 25–30°C water. The trade-off is fewer chiller-free hours. Schneider's capex study is from 2020 and modelled chassis immersion, not current cold-plate DTC. Treat "capex parity" as directional. On top of this sits India-specific cost data: JM Financial (March 2025) estimates average Indian capex at ₹46.5 crore (US$5.4 million) per MW. IMARC Engineering (2026) estimates ₹50–65 crore/MW for Tier III and ₹70–95 crore/MW for AI-ready liquid-cooled builds, with mechanical systems at 18–28% of capex. Black Ridge Research puts cooling infrastructure at about ₹6 crore per MW of cooling load.

**Immersion and two-phase.** Single-phase immersion supports 100–300 kW in Indian operator claims. STT GDC India cites up to 150 kW, and CtrlS cites up to 300 kW at its Chandanvelly campus. It suits greenfield halls with tank-compatible servers, but it complicates OEM warranties and servicing. The IndiaAI portal favours single-phase immersion over two-phase on PFAS and safety grounds. It quotes MeitY's Abhishek Singh calling for cooling that can "realize a PUE less than 1.1". That is an aspiration, not a rule.

On two-phase, ZutaCore moved from Novec to Chemours Opteon SF33 and has committed to PFAS-free fluid in 2026. Chemours' Opteon 2P50 is an HFO with a reported GWP of 10. Chemours claims up to 90% lower cooling energy and an upper-bound emission rate of 2% per year. These are company claims. The EU has signalled a broad PFAS restriction. In the US, the EPA's TSCA PFAS reporting deadline has been pushed to 31 January 2027 (Schneider Electric, May 2026). Dell'Oro expects two-phase DTC to grow "gradually" once chip heat flux exceeds what single-phase can handle.

### 5. Alternative and emerging approaches

| Technology | Data point | Status | Source and date |
|---|---|---|---|
| Underwater (Microsoft Natick, Orkney) | PUE 1.07; 6 of 855 servers failed vs 8 of 135 on land (one-eighth the rate) | Microsoft ended the programme in 2024; China runs commercial subsea DCs off Hainan and Shanghai | DCD; Microsoft; Columbia Business School |
| Seawater cooling | Coastal Indian hyperscalers "leverage seawater cooling"; Andhra Pradesh policy promotes it | Site-specific; corrosion and discharge permits | CEEW, February 2026 |
| Microfluidic in-chip cooling | Up to 3x better heat removal than cold plates; 65% lower peak GPU temperature rise; built with Corintis | Lab-scale prototype (23 September 2025) | Microsoft Source |
| Heat reuse | EU Energy Efficiency Directive requires waste-heat recovery for sites above 1 MW and reporting above 500 kW | Regulatory driver in EU; weak heat demand in tropical India | CEEW citing EUDCA, 2026 |
| Geothermal/ground-source, thermoelectric, spray | No authoritative 2023–2026 performance data gathered | Niche / R&D | — |

**Interpretation.** For India, seawater and once-through coastal cooling is the most relevant "alternative" for Mumbai, Chennai and Visakhapatnam. Heat reuse has a weak business case in India because there is little demand for space heating. Absorption-chiller offtake or industrial process heat is the more plausible route. Microfluidics is three or more years from data centre relevance. Underwater data centres are technically proven but have failed commercially at Microsoft.

### 6. Hyperscaler, AI operator and Indian deployments

| Operator | Cooling deployment | Source and date |
|---|---|---|
| Microsoft | WUE 0.30 L/kWh (39% better than 2021); zero-water closed-loop DTC designs from August 2024; DTC fleet rollout across Azure from July 2025 (secondary report) | DCD, December 2024; Introl |
| Google | Fleet overhead ~0.09 vs 1.54 industry average | Google data centres site |
| xAI Colossus 1 (Memphis) | Supermicro 4U liquid-cooled HGX H100, 64 GPUs/rack, in-rack CDU plus rear-door HX; cooling towers plus chillers; up to 1.3 million gallons/day reported (secondary); $80M wastewater recycling plant | ServeTheHome; Introl; Measured AI |
| xAI Colossus 2 | 119 air-cooled chillers, ~200 MW of cooling, by August 2025 | Introl citing SemiAnalysis |
| CtrlS (Hyderabad Chandanvelly, 600 MW plan) | DTC up to 135 kW/rack, immersion up to 300 kW/rack; design PUE 1.12–1.32 | CtrlS press release, 20 January 2025 |
| CtrlS (fleet) | 370 MW operational; 2 GW roadmap by 2030; air, DLC and immersion "all live" | CtrlS blog, 2026 |
| STT GDC India | 4–120 kW/rack; in-row, RDHx, DTC, immersion; dry coolers and elevated water temperatures; Kolkata 25 MW AI-ready campus | STT GDC India, 2025 |
| Yotta (Navi Mumbai, GIFT City) | DTC up to 80 kW/rack; immersion; air-cooled chillers plus adiabatic and free cooling; thousands of H100s live | Yotta blogs and website |
| Sify (Rabale) | India's first NVIDIA DGX-Ready site with liquid cooling; up to 130 kW/rack (site also claims 200+ kW designs) | Sify website, accessed 2026 |
| NTT India (Navi Mumbai 1) | First production liquid immersion and DCLC in India; "up to 30% more energy efficient" | NTT press release, 25 January 2023 |
| Nxtra (Airtel) | Pune PUE <1.55; DLC and immersion readiness; ~250 MW across 14 hyperscale DCs | Nxtra website; The Tech Capital, 2026 |
| Iron Mountain (Web Werks), Delhi-NCR | Refrigerant-based underfloor plus liquid cooling options | Iron Mountain website |
| IndiaAI Mission | GPU tender (10,000+ GPUs) requires PUE below 1.35 | Schneider Electric blog, July 2026; SBI, April 2026 |
| AdaniConneX, Tata Communications | Liquid/DTC "integration" announced; no verified rack-kW or PUE figures found; a reported Tata–Schneider cooling deal is unconfirmed | RCR Wireless, 2025 |

## Water: Conventional vs AI Data Centres in Numbers

| Metric | Value | Source and date |
|---|---|---|
| US direct DC water | 66 billion litres (2023), up from 21.2 billion (2014); hyperscale alone 60–124 billion litres by 2028 | LBNL, December 2024 |
| US indirect (power) water | ~800 billion litres; 4.52 L/kWh | LBNL, December 2024 |
| US average site WUE | ~0.36 L/kWh to 2023, rising to 0.45–0.48 as liquid-cooled systems on towers grow | LBNL, December 2024 |
| India DC water | 150.3 billion litres (2025) → 358.66 billion litres (2030), growth of more than 19% a year | Mordor Intelligence, via WION (2026) and CEEW (February 2026) |
| Per-MW (evaporative) | 25.5 million litres/MW/yr (Uptime, cited by Business Standard); 25 million (Karnataka IT Minister, March 2026) | Business Standard; Down to Earth |
| 100 MW hyperscale | ~2 million litres/day | IEA 2025 via CEEW |
| Global DC water | ~560 billion litres/yr | IEA 2025 via CEEW |

**Conflict flag.** The Indian figure of 25–25.5 million litres per MW per year works out to about 2.9 L/kWh at full load. That is roughly eight times LBNL's US average site WUE (0.36 L/kWh) and above the 100 MW ≈ 2 million L/day IEA figure (about 7.3 million L/MW/yr, or about 0.83 L/kWh). The gap reflects India's hotter climate, cooling-tower-heavy designs, and possibly the inclusion of blowdown or withdrawal rather than consumption alone. Use about 7–25 million L/MW/yr as the plausible Indian range for evaporative plants, and about 0–1 million L/MW/yr for dry-cooled warm-water liquid designs.

## Recommendations for India

1. **Greenfield AI halls (100–250 kW/rack).** Specify single-phase DTC with liquid-to-liquid CDUs, a facility loop designed for W32–W40 (with the ability to rise to W45), adiabatic-hybrid dry coolers, and air-cooled magnetic-bearing chillers as trim. Size trim capacity for Delhi's 42°C and Chennai's 29°C wet-bulb extremes, not for averages. Target PUE ≤1.3 to clear the IndiaAI ≤1.35 threshold, and WUE ≤0.2 L/kWh.
2. **Conventional colocation (5–20 kW/rack).** Retrofit containment, raise supply-air setpoints within ASHRAE's 18–27°C recommended envelope, and replace screw chillers with magnetic-bearing units. Add rear-door HX for pockets of 20–50 kW. In Hyderabad, Pune and Bengaluru, evaluate indirect evaporative units (pPUE about 1.06–1.07 in Munters cases) using treated or recycled water.
3. **Coastal metros.** Mumbai and Chennai should prioritise non-potable water (treated sewage or seawater) for any evaporative plant, as Rajasthan's zero-liquid-discharge policy already requires. They should also pursue seawater heat rejection where permits allow.
4. **Policy.** States should add PUE and WUE disclosure and benchmarks. CEEW finds only 5 of 15 state policies include sustainability provisions. States should also tie incentives to measured WUE, following the EU model.
5. **Avoid two-phase PFAS fluids** for new Indian deployments until supply and regulation settle. Choose water-glycol DTC or single-phase hydrocarbon or ester immersion.

## Key Takeaways

- Air cooling is still the right and cheapest choice for ordinary enterprise and cloud racks below about 15–20 kW, but it cannot cool modern AI racks, which now draw 130 kW or more each.
- Direct-to-chip liquid cooling has become the industry standard for AI because NVIDIA's Blackwell and Rubin systems are built to need it, and because it can run on warm water that does not need a chiller for most of the year.
- Saving electricity and saving water usually pull in opposite directions, because cooling towers save power by evaporating water, while dry coolers and air-cooled chillers save water by using more power.
- Warm-water liquid cooling is the one approach that saves both electricity and water at the same time, which makes it especially valuable in water-stressed Indian cities.
- Mumbai, Chennai and Delhi are humid enough that evaporative cooling gains little efficiency there while still using a lot of water. Hyderabad, Pune and Bengaluru are drier and can benefit more from indirect evaporative cooling, if non-potable water is used.
- Mordor Intelligence estimates that India's data centres used 150.3 billion litres of water in 2025 and projects 358.66 billion litres by 2030, unless new facilities move away from evaporative cooling.
- Indian operators such as CtrlS, STT GDC India, Sify, Yotta and NTT now advertise liquid-cooled capacity of 80 to 300 kW per rack, but the average Indian facility still runs at a PUE of about 1.4 to 1.6.
- Two-phase immersion cooling has stalled because its main fluids were PFAS "forever chemicals", and 3M stopped making them at the end of 2025.
- Liquid cooling does not have to cost more to build. Schneider Electric found the capital cost roughly equal to air cooling at 10 kW per rack and lower at higher densities, although that study is from 2020.

## Caveats

- **Dates matter.** Rack power for NVIDIA systems comes from 2025–2026 OEM specifications. Rubin figures come from CES (January 2026) statements and may change when the systems ship.
- **Vendor claims.** These are not independently verified: Chemours (90% energy reduction), CtrlS (95% cooling energy reduction), York (<0.1 kW/ton), Munters cases, immersion PUEs of about 1.02–1.05, and Microsoft's microfluidics (lab-scale).
- **Secondary sources.** The xAI water use (1.3 million gallons/day), Colossus 2 chillers, Microsoft's July 2025 DTC rollout, and the Yotta NM1 PUE and kW figures come from secondary compilations.
- **Indian design temperatures** come from IS 7896:2001, which the research subagent read from a garbled PDF extraction. They should be checked against the original table and against current ASHRAE 2021 climate data. They are not extreme-condition values.
- **Gaps.** No authoritative 2023–2026 figures were found for absorption chillers, geothermal, thermoelectric or spray cooling in data centres, or for AdaniConneX and Reliance/Jio cooling designs. The Indian cost-per-MW figures (₹35–95 crore) vary widely by scope.

## Sources

1. moduledge — https://www.moduledge.com/blog/gb300-nvl72
2. secondwatt — https://secondwatt.com/equipment/gpus/nvidia-gb300-nvl72
3. lbl — https://eta-publications.lbl.gov/sites/default/files/2024-12/lbnl-2024-united-states-data-center-energy-usage-report_1.pdf
4. bank — https://sbi.bank.in/documents/57189647/58231607/Sector+Report+DataCentre.pdf/f1919592-ee66-b50b-ea20-75fbb27c9bb5?t=1779885206866
5. se — https://blog.se.com/datacenter/2026/07/30/planning-liquid-cooling-for-new-ai-data-centre-builds-in-india/
6. delloro — https://www.delloro.com/market-at-the-boiling-point-is-the-cdu-space-becoming-saturated/
7. thecoolingreport — https://thecoolingreport.com/intel/pfas-two-phase-immersion-cooling-crisis.html
8. datacenterdynamics — https://www.datacenterdynamics.com/en/news/chemours-launches-two-phase-immersion-cooling-fluid/
9. heatmap — https://heatmap.news/climate/data-centers-pfas
10. datacenterdynamics — https://www.datacenterdynamics.com/en/news/two-phase-cooling-will-be-hit-by-epa-rules-and-3ms-exit-from-pfas-forever-chemicals/
11. usmadesupply — https://usmadesupply.com/resources/guides/data-center-liquid-cooling-spill-response
12. sttelemediagdc — https://www.sttelemediagdc.com/in-en/pune-innovation-lab
13. Substack — https://measuredai.substack.com/p/xai-colossus-data-center-cluster
14. mitsubishicritical — https://mitsubishicritical.com/data-center-cooling-solutions/chillers/
15. introl — https://introl.com/blog/xai-memphis-colossus-100000-gpu-supercomputer-infrastructure
16. business-standard — https://www.business-standard.com/industry/news/data-centres-turn-to-air-cooling-to-ease-india-s-water-woes-is-it-enough-126090701498_1.html
17. gsa — https://www.gsa.gov/system/files/GPG_Mag_Lev_FullReport_508_6-17-13.pdf
18. daikinlatam — https://daikinlatam.com/wp-content/uploads/2018/11/Water-Cooled-Magnetic-Centrifugal-Chiller-HXE.pdf
19. yotta — https://yotta.com/press-releases/yotta-infrastructure-inaugurates-asias-largest-and-worlds-second-largest-uptime-institute-tier-iv-certified-data-center-yotta-nm1-at-navi-mumbai/
20. munters — https://www.munters.com/en-us/knowledge-bank/case-studies/casestudy-2498/
21. munters — https://www.munters.com/en-us/knowledge-bank/case-studies/casestudy-2494/
22. munters — https://datacenter.munters.com/resources/case-studies/oasis-delivers-optimal-climate-control-for-equinix/
23. se — https://www.se.com/us/en/work/solutions/data-centers-and-networks/liquid-cooling/
24. se — https://blog.se.com/?p=64321
25. delloro — https://www.delloro.com/news/data-center-liquid-cooling-market-to-approach-7-billion-by-2029-as-ai-deployments-accelerate/
26. ctrls — https://www.ctrls.com/press-release-ctrls-unveils-plans-for-new-datacenter-park-on-a-40-acre-land-parcel-near-hyderabad/
27. networkworld — https://www.networkworld.com/article/3477590/data-center-liquid-cooling-market-heats-up.html
28. se — https://blog.se.com/datacenter/2026/05/22/pfas-phase-out-liquid-cooling-us-data-center-operators-must-do/
29. hbcytech — https://www.hbcytech.com/resources/liquid-cooling-vs-air-cooling-in-the-data-center.html
30. ceew — https://www.ceew.in/publications/how-is-data-centre-infrastructure-in-india-shaping-power-and-water-use
31. datacenterdynamics — https://www.datacenterdynamics.com/en/analysis/project-natick-microsofts-underwater-voyage-discovery/
32. columbia — https://business.columbia.edu/milstein-center/sinking-cloud-why-underwater-data-centers-deserve
33. cooltekreviews — https://cooltekreviews.com/panthalassa-ocean-3-the-floating-ai-data-center-examined/
34. microsoft — https://news.microsoft.com/source/features/innovation/microfluidics-liquid-cooling-ai-chips/
35. datacenterknowledge — https://www.datacenterknowledge.com/cooling/microsoft-touts-ai-backed-cooling-faster-networking-for-data-center
36. uptimeinstitute — https://datacenter.uptimeinstitute.com/rs/711-RIA-145/images/2025.Annual.Survey.Report.pdf?version=0
37. delloro — https://www.delloro.com/news/delloro-group-raises-market-forecast-for-data-center-liquid-cooling-and-rack-power-distribution/
38. datacentermap — https://www.datacentermap.com/india/mumbai/yotta-nm1/specs/
39. cx-associates — https://buildingenergy.cx-associates.com/magnetic-bearing-chillers-proven-efficiency-and-reliability
40. york — https://www.york.com/products-and-solutions/chilled-water-systems/water-cooled-chillers/ymc2_ap/ymc-magnetic-bearing-centrifugal-chiller
41. daikinapplied — https://www.daikinapplied.com/products/chiller-products/magnitude
42. datacenterdynamics — https://www.datacenterdynamics.com/en/news/microsofts-upcoming-data-centers-to-use-closed-loop-zero-water-evaporation-design/
43. redmondmag — https://redmondmag.com/articles/2024/12/09/microsoft-rolls-out--water-saving-datacenter-design.aspx
44. microsoft — https://blogs.microsoft.com/blog/2026/06/24/inside-microsofts-two-decade-push-to-cut-water-intensity-while-scaling-for-growth/
45. resource — https://law.resource.org/pub/in/bis/S08/is.7896.2001.pdf
46. downtoearth — https://www.downtoearth.org.in/water/india-is-using-water-to-build-the-machines-that-tell-us-we-are-running-out-of-it
47. ishrae — https://ishrae.in/docin/Content/Article_File/tn3izd0pgxm.pdf
48. lenovo — https://lenovopress.lenovo.com/lp2357-lenovo-nvidia-gb300-nvl72-rack-scale-ai
49. moduledge — https://www.moduledge.com/blog/nvidia-blackwell
50. facilitiesdive — https://www.facilitiesdive.com/news/no-chillers-needed-for-vera-rubin-server-racks-nvidia-ceo/809216/
51. edgen — https://www.edgen.tech/news/post/nvidia-rubin-runs-45c-liquid-cooling-cutting-water-use-to-near-zero
52. cibsejournal — https://www.cibsejournal.com/cpd/modules/2025-09-lcdca/
53. datacenterdynamics — https://www.datacenterdynamics.com/en/analysis/hot-water-cold-water/
54. prnewswire — https://www.prnewswire.com/news-releases/data-center-liquid-cooling-market-to-approach-7-billion-by-2029-as-ai-deployments-accelerate-according-to-delloro-group-302655848.html
55. moduledge — https://www.moduledge.com/blog/liquid-cooling-data-center
56. aithority — https://aithority.com/data-center-and-co-location/schneider-electric-releases-white-paper-on-capital-cost-comparison-of-data-centre-liquid-cooling/
57. jmflresearch — https://jmflresearch.com/JMnew/JMCRM/analystreports/pdf/Data-Centre-101_27Mar25.pdf
58. imarcengineering — https://www.imarcengineering.com/blog/data-center-development-in-india
59. blackridgeresearch — https://www.blackridgeresearch.com/blog/large-colocation-data-center-construction-cost-in-india-complete-capex-opex-breakdown
60. indiaai — https://indiaai.gov.in/article/next-generation-of-make-in-india-single-phase-dielectric-coolant-immersion-cooling-solution-for-ai-workloads-on-cloud
61. networkworld — https://www.networkworld.com/article/4062381/microsofts-new-cooling-tech-targets-ais-thermal-bottleneck-as-hyperscalers-hit-power-ceilings.html
62. datacenters — https://datacenters.google/efficiency/
63. servethehome — https://www.servethehome.com/inside-100000-nvidia-gpu-xai-colossus-cluster-supermicro-helped-build-for-elon-musk/
64. glennklockwood — https://www.glennklockwood.com/garden/systems/colossus
65. macperformanceguide — https://macperformanceguide.com/blog/2025/20250227_1515-xAI-Grok3-GPUs.html
66. ctrls — https://www.ctrls.com/blogs-7-questions-choosing-ai-ready-datacenter/
67. ameztrix — https://ameztrix.com/technology/ai-data-centers-in-india/
68. telecomtalk — https://telecomtalk.info/sttgdc-india-launches-ai-datacentre-in-kolkata/992388/
69. sttgdc — https://www.sttgdc.com/in-en/resources/leading-the-charge-with-sustainable-ai-ready-data-centres
70. yotta — https://yotta.com/data-center/
71. yotta — https://colocation.yotta.com/blog/leveraging-existing-air-cooling-infrastructure-to-enable-liquid-cooling-in-data-centers
72. yotta — https://colocation.yotta.com/blog/role-of-advanced-cooling-technologies-in-modern-data-centers/
73. sifytechnologies — https://www.sifytechnologies.com/data-center/
74. businesswire — https://www.businesswire.com/news/home/20260120884410/en
75. global — https://services.global.ntt/en-us/newsroom/ntt-leads-the-way-for-green-technologies-in-data-centers
76. group — https://group.ntt/en/sustainability/sustainability-action/story/interview16.html
77. nxtra — https://www.nxtra.in/data-center-pune
78. thetechcapital — https://thetechcapital.com/airtel-deepens-data-centre-push-with-1gw-capacity-target/
79. ironmountain — https://www.ironmountain.com/data-centers/locations/delhi-ncr-data-center
80. rcrwireless — https://rcrwireless.com/20250425/fundamentals/top-five-ai-data-center-india
