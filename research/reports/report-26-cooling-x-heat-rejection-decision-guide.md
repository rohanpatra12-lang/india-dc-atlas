<!-- Report 26 of the India Data Centre Atlas research series (Cooling technology × heat rejection: PUE, WUE and a decision guide). Produced with AI-assisted web research, Oct 2026, and kept as written at the time. The atlas standards register (src/data/standards.js) is authoritative where figures differ (for example India grid water 2.9 L/kWh and grid CO₂ 0.675 t/MWh after the October 2026 corrections). -->

# Cooling Technology × Heat Rejection: Measured PUE/WUE, Feasibility and a Decision Guide for India and Bengaluru

For Bengaluru and most of India, warm-water direct-to-chip (DLC) or immersion cooling with dry or adiabatic-hybrid coolers gives the lowest total water use and the lowest carbon per MWh of IT. That holds even after counting the extra grid electricity of not evaporating water. Open cooling towers save a few points of PUE but are the worst option for total water at both 2.0 and 5.0 L/kWh grid intensity. Use them only on treated wastewater, and only where a PUE target such as Karnataka's 1.00–1.20 incentive band cannot otherwise be met.

## TL;DR

- **Heat rejection sets WUE; cooling technology sets the temperature that decides which heat rejection is possible.** On-site WUE runs from about 0.05 L/kWh with dry coolers, to 0.25–0.55 with adiabatic hybrids, to 1.2–2.9 with towers. Reported figures for evaporative sites are 1.24–1.55 L/kWh (NTT, Equinix 2024–2026) and up to 2.93 historically. Warm-water DLC at 32–45 °C lets dry or adiabatic coolers reject heat with no chiller in Bengaluru almost all year. Air halls at 18–24 °C chilled water still need compressors or evaporation for many hours.
- **Total water ranking (on-site + grid at 2.0 L/kWh, Bengaluru estimates):** DLC/immersion with dry coolers comes to about 2.2–2.4 m³ per MWh IT. Indirect evaporative and air-cooled free-cooling chillers come to about 2.75–2.95. Towers come to about 4.0–4.3. The ranking holds at the all-India 5.0 L/kWh. Towers only beat dry systems on total water if grid water intensity exceeds about 17 L/kWh, which is far above any Indian grid figure. On carbon, the dry-cooled penalty versus towers is only about 0.03–0.07 t CO₂/MWh IT.
- **Policy fit:** Karnataka's Rs 20 crore PUE band of 1.00–1.20 and the WUE incentive band of 0.7–1.3 L/kWh push toward liquid cooling with adiabatic or dry rejection on treated water. Germany's 1.2 PUE rule for new builds (now proposed at 1.3), China's 1.25 for new large sites, Singapore's 1.3 target and Malaysia's 1.4 can be met by DLC with dry or hybrid rejection. Air halls with air-cooled chillers (PUE 1.35–1.6) fail all of them and struggle with MeitY's PUE <1.35.

## Key Findings

1. **Measured fleet data confirms the energy–water trade-off, but averages hide the technology mix.** Google's fleet PUE was 1.09 in 2024–2025, with a consumptive WUE (ISO Category 2) of 1.15 L/kWh, and the company states it uses water cooling "to improve our energy efficiency in certain geographies." Microsoft reported a withdrawal WUE of 0.30 L/kWh in FY2024 (0.49 in 2021; 0.27 in 2025) and moved all new designs from August 2024 to closed-loop chip-level cooling with zero evaporation. It explicitly expects PUE to rise and offsets this with "economizing chillers with elevated water temperatures." AWS reports PUE 1.14 and withdrawal WUE 0.12 L/kWh for 2025, down from 0.15 in 2024. Equinix reported PUE 1.39 and WUE 0.95 (all sites) / 1.55 (evaporative sites) for 2024, and 0.91 / 1.41 for 2025. NTT GDC reported 0.72 / 1.42 in its 2025 report and 0.38 / 1.24 in its 2026 report. NTT DATA's evaporative-only WUE fell from 2.93 (FY22) to 2.77 (FY23) to 1.42 (FY24).
2. **The "evaporative-sites-only" figures are the right real-world anchor for towers: about 1.2–1.6 L/kWh after optimisation, and about 2.8–2.9 before.** Water treatment alone moves this a lot. NTT's UK campus cut its tower-site WUE from 1.8 to 1.2 L/kWh after adding reverse osmosis (more than 95% of salts removed, 15% raw-water blend-back) between June 2023 and July 2024.
3. **Indirect evaporative cooling (IEC) has the best measured pPUE among air-cooled options, but the evidence is mostly vendor case studies in temperate climates.** Munters reports a cooling pPUE of 1.06 and project PUE of 1.2 at Equinix ME1/LD6 (20 °C supply). It also reports PUE 1.12 and pPUE 1.06 at DigiPlex Fetsund (Norway), and pPUE 1.07 with PUE below 1.2 at Sabey Quincy. Vertiv puts IEC peak power savings at 10–30% versus an air-cooled chiller, depending on climate.
4. **Modelled studies agree on direction and roughly on size.** In a 2026 University of Michigan model of a 200 MW IT site, switching from water-cooled to air-cooled chillers cut direct water by 97% (6.45 → 0.21 million m³) and raised electricity by 32% (3.08 → 4.06 TWh). Total water still fell 44%, from 10.93 to 6.12 million m³. A hybrid economiser/chiller had the lowest electricity at 2.76 TWh, but used the economiser only 25% of the year. LBNL's 2024 US report (Shehabi et al.) gives simulated PUE/WUE ranges by cooling and heat-rejection system, a US average PUE of about 1.40 for 2023, and an average site WUE that "stays just over 0.36 L/kWh through 2023."
5. **Industry baselines are flat.** Uptime's 2025 survey of 800+ owners and operators (April–May 2025) shows a weighted average PUE of 1.54 for the sixth straight year. Facilities commissioned since about early 2020 average 1.48, and sites of 20 MW and above average 1.44. More than 80% of Uptime's respondents say their facility has no racks above 30 kW, and the average modal rack density is almost 9 kW.
6. **India has no site-level WUE disclosures.** A Down To Earth review of Nxtra, AdaniConneX, STT, NTT, CtrlS and Sify ESG reports found no published WUE for the Indian operators. CtrlS reported total water of 409,037 kL in 2023–24, against 468,330 kL the year before. Indian PUE figures are design claims, for example Nxtra Chennai "<1.5", Princeton Digital CH1 "<1.4" and CtrlS Kolkata "1.4". The SBI sector report (April 2026) notes that MeitY AI-cloud tenders require PUE below 1.35.
7. **Climate data for the Atlas (from IS 7896:2001, ISHRAE/TERI lineage; via research subagent).** Bengaluru's 0.4% design is 34.7 °C dry-bulb with a mean coincident wet-bulb of 19.6 °C, and its 0.4% evaporation wet-bulb is 23.5 °C. Chennai's is 38.4/26.2 with a 29.1 evaporation wet-bulb, and Kolkata's evaporation wet-bulb is 29.5. Bengaluru therefore has about 5–6 K more evaporative headroom than the coastal metros, and the lowest dry-cooler outlet temperatures of the major hubs.

## Details

### (a) Master matrix: cooling technology × heat rejection

Legend: **R** = reported/measured by an operator; **V** = vendor case study; **M** = modelled (peer-reviewed or LBNL-type); **E** = engineering estimate by this report or the Atlas. PUE/WUE values are annualised. WUE is on-site, in L/kWh IT.

**Table A1: Technical envelope**

| # | Cooling tech (room/server) | Heat rejection | Feasible? | Practical rack density | Supply temperature | Refrigerant in loop | Relative capex (cooling plant) |
|---|---|---|---|---|---|---|---|
| 1 | DX CRAC | Air-cooled condensers | Yes, legacy and small edge only | 3–10 kW | Air 18–24 °C | Yes (R-410A/R-32/R-454B) | Low |
| 2 | Chilled-water CRAH | Air-cooled chillers, no free-cooling coil | Yes | 5–20 kW (≤30 with containment) | CHW 7–14 °C (legacy) | Yes (R-134a/R-513A/R-1234ze) | Low–medium |
| 3 | CRAH / fan walls | Air-cooled chillers + free-cooling coils, CHW 18–24 °C | Yes, best dry air option | 10–30 kW | CHW 18–24 °C | Yes | Medium |
| 4 | CRAH | Water-cooled chillers + open towers (WSE) | Yes, but water-intensive | 10–30 kW | CHW 14–24 °C | Yes | Medium |
| 5 | CRAH | Water-cooled chillers + adiabatic/hybrid fluid coolers | Yes | 10–30 kW | CHW 18–24 °C | Yes | Medium–high |
| 6 | Direct evaporative outside air (DEC) | Building is the rejector | Bengaluru/Pune/Hyderabad dry season only; **not** coastal monsoon | 5–20 kW | Air 22–27 °C | Trim DX optional | Low–medium |
| 7 | Indirect evaporative units (IEC) | Integrated (scavenger air + trim DX/CHW) | Yes in most Indian cities; trim size rises in humid coasts | 10–30 kW | Air 20–27 °C | Small trim DX | Medium |
| 8 | Rear-door HX (active/passive) or in-row | Any CHW source (rows 3–5) or CDU | Yes; good retrofit bridge | 20–50 kW (active doors higher) | CHW 14–20 °C | Via chiller | Medium |
| 9 | DLC cold plate (W32–W45) + residual air 15–25% | Dry coolers only, plus trim chiller for the air share | Yes; W40+ fully dry in Bengaluru | 50–140 kW (NVL72-class ≈ 120 kW) | Facility water 32–45 °C | Only in trim chiller | Medium–high |
| 10 | DLC | Adiabatic/hybrid dry coolers | Yes; most robust Indian option | 50–140 kW | 30–40 °C | Trim only | High |
| 11 | DLC | Open towers, chiller-less | Yes, lowest PUE but high WUE | 50–140 kW | 30–35 °C | None or trim | Medium–high |
| 12 | Single-phase immersion | Dry/adiabatic coolers | Yes | 50–100+ kW per tank | 30–45 °C | None | High |
| 13 | Two-phase immersion | Dry coolers | Technically yes; fluid (PFAS) and regulatory risk | 100–250 kW | 40–50 °C condenser | None, but fluorinated dielectric | Very high |
| 14 | Any liquid | Seawater once-through / desal make-up | Coastal only (Mumbai, Chennai, Vizag, Jamnagar); permits and corrosion | n/a | Sea at about 28–31 °C limits CHW to ≥32 °C | Varies | High |
| 15 | DLC/immersion | District heat or heat reuse | Germany-style ERF is feasible technically; India has little heat demand | n/a | Return 45–60 °C | Heat pump | High |

**Table A2: Performance (annualised), by climate**

| # | Combination | PUE (temperate/Bengaluru) | Cooling pPUE | WUE Bengaluru (E) | Hot-humid coast (Mumbai/Chennai/Kolkata/Vizag) | Hot-dry/composite (Delhi/Ahmedabad/Hyderabad) | Real-world anchors |
|---|---|---|---|---|---|---|---|
| 1 | DX + air-cooled condensers | 1.6–1.8 (E) | 1.35–1.5 | ≈0.05 | PUE 1.7–2.0, WUE ≈0 | PUE 1.7–2.0 | Legacy Indian enterprise rooms; Uptime industry average of 1.54 includes many such sites |
| 2 | CRAH + air-cooled chiller | 1.4–1.5 (E) | 1.25–1.35 | ≈0.05 | 1.45–1.6 | 1.45–1.6 | Nxtra Chennai design "<1.5" (R, design) |
| 3 | CRAH + free-cooling air-cooled chiller at 18–24 °C | 1.3–1.4 (E) | 1.18–1.28 | ≈0.05 | 1.4–1.5 (few free-cooling hours) | 1.35–1.45 | Microsoft "economizing chillers" in zero-water designs (R, qualitative) |
| 4 | CRAH + water-cooled chiller + towers | 1.2–1.3 (E) | 1.1–1.18 | **1.8** (Atlas; 1.2–2.5 range with cycles of concentration) | WUE 2.0–2.9, PUE 1.25–1.35 | WUE 2.0–2.9 | Equinix evaporative sites 1.41–1.55, NTT 1.24–1.42, NTT DATA FY22 2.93 (R) |
| 5 | CRAH + WCC + hybrid coolers | 1.25–1.35 (E) | 1.12–1.22 | 0.3–0.6 | 0.5–0.9 | 0.4–0.8 | Tetra Tech Houston/El Paso model (M) |
| 6 | Direct evaporative OA | 1.1–1.2 | 1.05–1.12 | 0.3–0.8 (E) | Infeasible in monsoon (humidity) | 0.5–1.2 | AWS/Meta-style designs; AWS reports water use "for less than" part of the year (R, qualitative) |
| 7 | IEC units | 1.15–1.25 | 1.06–1.12 | **0.55** (Atlas, air path) | PUE 1.25–1.35, WUE 0.6–1.0 | PUE 1.2–1.3, WUE 0.6–1.0 | Equinix ME1/LD6 pPUE 1.06 and PUE 1.2; DigiPlex 1.12 / 1.06; Sabey pPUE 1.07 (V) |
| 8 | RDHx/in-row + rows 3–5 | Inherits plant ±0.03 | — | Inherits plant | — | — | Schneider recommends hybrid RDHx/DLC for mixed-density Indian colo (V) |
| 9 | DLC + dry coolers | 1.1–1.2 | 1.04–1.10 | **≈0.05** | 1.12–1.2 (W40+) | 1.15–1.25 (adiabatic trim advised) | Microsoft zero-water design ("near zero" WUE, R, design) |
| 10 | DLC + adiabatic hybrid | 1.08–1.15 | 1.03–1.08 | **0.25** (Atlas, liquid path) | 0.3–0.5 | 0.3–0.6 | AirTrunk JHB2 Johor liquid-cooled design PUE 1.25 (R, design) |
| 11 | DLC + towers, chiller-less | 1.06–1.12 | 1.02–1.06 | 1.5–1.9 | 1.8–2.5 | 1.8–2.5 | Google fleet 1.09 / 1.15 consumptive (mixed technologies, R) |
| 12 | 1-phase immersion + dry | 1.03–1.10 | 1.02–1.05 | ≈0.05 | 1.05–1.12 | 1.05–1.15 | Firmus at STT GDC Singapore "partial PUE <1.02" (V) |
| 13 | 2-phase immersion + dry | 1.02–1.08 | 1.01–1.04 | ≈0.05 | similar | similar | Pilots only; vendor claims |
| 14 | Seawater / desal | 1.1–1.2 | — | ≈0 freshwater (desal adds energy) | Coastal only | n/a | No Indian disclosures |

Important reading notes:
- **PUE flatters air and penalises liquid at the server.** Removing server fans cuts IT power, which raises measured PUE. A semianalysis review notes a liquid-cooled server "might show a higher PUE despite consuming less total power." Compare total facility kWh per unit of compute, not PUE alone.
- **Capex indications.** Turner & Townsend's Data Centre Construction Cost Index 2025 (300+ projects in 20+ countries, benchmarked against a 30–50 MW air-cooled hyperscale build) reports that "latest available benchmark data from US liquid-cooled data centres indicates an average cost premium of 7-10 percent", with mechanical cost rising from about 22% to about 33% of construction; the premium is US-only data, so apply it to India with care. JLL uses about 10%. STL Partners (May 2026) estimates liquid-cooling retrofits at about $2M per MW, against more than $11M per MW for greenfield liquid-cooled capacity. A Schneider like-for-like analysis found $7.02/W for air and $6.98/W for liquid at 10 kW/rack, falling to $6.02/W for liquid at 40 kW/rack. At an assumed ₹88/$, JLL's 2026 Global Data Center Outlook figure of $11.3M/MW for average shell-and-core cost (citing Turner & Townsend) is about ₹99 crore/MW, and the 7–10% liquid premium adds about ₹7–10 crore/MW. Lower-quality consultant estimates put a 1 MW immersion block at $2.5–3.5M. Treat all per-MW numbers as screening values (E).

### (b) Climate and Indian-city tables

**Table B1: Design conditions and derived heat-rejection limits.** Design data are from IS 7896:2001 (ISHRAE/TERI dataset, 0.4% annual), via the research subagent. The derived columns are this report's estimates. Dry cooler: fluid ≈ dry-bulb + 5 K. Adiabatic: air ≈ WB + 0.15 × (DB − WB) at the 0.4% evaporation wet-bulb hour, then + 5 K. Tower: water ≈ WB + 4 K.

| City | ECBC/NBC zone | 0.4% DB / MCWB (°C) | 0.4% evap WB (°C) | Dry-cooler fluid at peak (E) | Adiabatic-hybrid fluid at humid peak (E) | Tower water at peak (E) | Chiller-free DLC with dry/adiabatic? (E) | Direct evaporative outside air? |
|---|---|---|---|---|---|---|---|---|
| Bengaluru | Temperate | 34.7 / 19.6 | 23.5 (Simha: ≈25 in practice) | ≈39.7 → W40 fully dry | ≈29.3 (≈30.8 if WB 25) → **W32 OK** | ≈27.5 | **Yes: W32 adiabatic, W40 dry** | Partial (dry season); risky in monsoon and urban pollution |
| Pune | Warm-humid (official table; often called temperate) | 38.4 / 20.5 | 24.8 | ≈43.4 → W45 | ≈30.7 → W32 OK | ≈28.8 | Yes (W32 adiabatic) | Partial |
| Hyderabad | Composite | 40.4 / 22.5 | 25.6 | ≈45.4 → W45 marginal | ≈31.8 → W32 marginal | ≈29.6 | Yes with W35+ or trim | Partial (Mar–May) |
| Mumbai | Warm-humid | 35.3 / 22.8 | 27.9 | ≈40.3 → W40 marginal | ≈33.5 → **W35–W40 needed** | ≈31.9 | Yes at W40 | **No** |
| Chennai | Warm-humid | 38.4 / 26.2 | 29.1 | ≈43.4 → W45 | ≈34.8 → W40 | ≈33.1 | Yes at W40–W45 | **No** |
| Kolkata | Warm-humid | 37.2 / 25.4 | 29.5 | ≈42.2 → W45 | ≈34.8 → W40 | ≈33.5 | Yes at W40–W45 | **No** |
| Visakhapatnam | Warm-humid | 36.4 / 26.5 | 29.2 | ≈41.4 → W45 | ≈34.9 → W40 | ≈33.2 | Yes at W40–W45 | **No** |
| Delhi NCR | Composite | 41.8 / 23.6 | 28.4 | ≈46.8 → **not dry at W45** | ≈34.1 → W40 | ≈32.4 | W40 with adiabatic trim | Pre-monsoon only |
| Ahmedabad (Jamnagar proxy) | Hot-dry | 42.3 / 24.1 | 28.7 | ≈47.3 → not dry | ≈34.5 → W40 | ≈32.7 | W40 with adiabatic trim | Pre-monsoon only |
| Jamnagar | not in ECO-NIWAS table | 37.1 / 24.4 | 39.2 (**misprint**; likely ≈29.2) | ≈42.1 | ≈35 (E) | ≈33 (E) | W40–W45 | No (coastal) |

What this means:
- **Bengaluru is India's best major hub for chiller-free warm-water cooling.** It is the only metro where W32 liquid loops can run all year on adiabatic coolers, and W40 on purely dry coolers.
- **Humid coastal hubs gain little from evaporation at their peaks.** Tower water at about 32–34 °C is barely colder than adiabatic-hybrid output, so the water spent buys little.
- **Delhi and Gujarat are the only places where dry coolers fail at peak** even for W45. That is exactly where adiabatic trim on a small number of peak hours is the right answer.

**Table B2: Free-cooling and economiser hours (sourced only; gaps flagged)**

| City | Metric | Hours/yr | Source and quality |
|---|---|---|---|
| Bengaluru | Wet-bulb ≤19 / ≤20 / ≤21 / ≤22 / ≤23 / ≤24 °C | ≈3,478 / 5,259 / 6,973 / 8,002 / 8,494 / 8,710 | Simha (ISHRAE journal, 2016), Table 5, from WeDCo hourly data. Simha himself argues this dataset understates wet-bulb, so these may overstate free cooling |
| Delhi NCR | Hours below 20 °C | ≈2,400 | IBM/IIT Delhi hybrid-cooling case study (LBNL-hosted, 2019); vendor estimate, dry-bulb or wet-bulb not stated |
| Delhi NCR | Waterside economiser at 26/19 °C CHW | 1,173 full + 3,619 partial (≈36% of cooling load) | Same IBM case study |
| Delhi / Pune / Mumbai | Dry-cooler free cooling at ≈35 °C fluid setpoint | ≈5,200 / 5,800 / 2,400 | kvrm.in blog; unsourced, low quality |
| Chennai, Hyderabad, Kolkata, Vizag, Jamnagar | — | **Not found** | The Atlas should compute these from ISHRAE hourly files |

Applying the Bengaluru wet-bulb hours (E):
- **Tower-fed waterside economiser for an air hall at 24 °C CHW** needs WB ≤ about 18–19 °C, so roughly 3,000–3,500 full free-cooling hours plus partial hours.
- **Towers serving W32 DLC** need WB ≤ about 26–27 °C, so effectively all 8,760 h are chiller-free.
- This is why tower water buys much more in liquid plants. It is also why a dry or adiabatic plant achieves almost the same result in Bengaluru without the water.

### (c) Decision guide: where and when to use each combination

**By workload**

| Workload | Default in India | Avoid |
|---|---|---|
| Conventional colo/enterprise (5–15 kW) | Row 3 (free-cooling air-cooled chillers, CHW 18–22 °C, containment) or Row 7 (IEC) in Bengaluru, Pune and Hyderabad | New DX halls; towers on potable or borewell water |
| Cloud/hyperscale (10–30 kW, growing) | Row 7 (IEC) or Row 3 plus provision for Row 8/10 CDUs | Direct evaporative in coastal cities |
| AI training (80–140 kW) | Row 10 (DLC + adiabatic hybrid), or Row 9 at W40+ in Bengaluru | Air-only; RDHx as a permanent solution above about 50 kW |
| AI inference (20–60 kW, mixed) | Row 8 (RDHx) bridging to Row 9/10; shared facility-water loop at 24–32 °C | Separate chilled-water and warm-water plants |
| Edge (<500 kW) | Row 2/3 or packaged IEC | Towers (they need treatment staff) |

**By water stress and source**
- **Freshwater or borewell only:** dry-first (rows 3, 9, 12). Allow adiabatic trim only with metered annual caps, for example ≤0.3 L/kWh.
- **Treated wastewater available (such as Hoskote, where BWSSB has indicated "no difficulty in supplying 60 MLD of secondary treated water", with industries doing tertiary treatment themselves):** adiabatic hybrids (rows 5, 10) qualify. Towers are acceptable only with a tertiary/RO side-stream, cycles of concentration ≥5, and a Legionella programme (ASHRAE 188-type).
- **Seawater (Mumbai, Chennai, Vizag, Jamnagar):** possible for once-through condenser duty with titanium heat exchangers. Warm sea temperatures (about 28–31 °C) limit it to warm-water loops, and coastal regulation and outfall permits dominate (E).

**By grid**
- At Karnataka's hourly mean of 0.47 t/MWh, each 0.10 PUE costs about 0.047 t CO₂ per MWh IT. Moving an air hall from towers (PUE 1.25, WUE 1.8) to free-cooling air-cooled chillers (1.35, 0.05) saves about 1.55 m³ of total water per MWh IT at 2.0 L/kWh. That is roughly 30 kg CO₂ per m³ saved, or about 57 kg/m³ at all-India factors (CEA CO2 Baseline Database: weighted average 0.727 t/MWh for FY2023-24 in v20.0, and 0.710 provisional for FY2024-25 in v21.0; a secondary source reports v22.0 at 0.675 for FY2025-26, unconfirmed).
- With renewable PPAs the carbon penalty approaches zero, which strengthens the dry case further.

**By land and retrofit**
- **Dry coolers need much more plant area than towers** (roughly 2–3× by footprint, E), and they bring more fan noise. Adiabatic pre-cooling shrinks the peak-day footprint and fan speed.
- **Retrofits in dense estates** (Whitefield, Electronic City):
  - Raise CHW to 18–20 °C.
  - Add free-cooling coils or adiabatic kits to air-cooled chillers.
  - Deploy RDHx or CDUs off the existing chilled-water loop for AI pods. STL Partners puts this at about $2M/MW versus more than $11M/MW greenfield.
  - Convert any towers to treated water with RO.

**Bengaluru sub-market recommendations**

| Location | Context | Recommended combination | Notes |
|---|---|---|---|
| Whitefield | Dense estate, retrofit-heavy, tanker/borewell exposure | Row 3 + Row 8 (RDHx) retrofit; Row 9 for new AI pods | No new towers; target WUE ≤0.3 |
| Electronic City | Same, plus older enterprise DX stock | Replace DX (Row 1) with Row 3/7; IEC where roof allows | Big PUE win (≈1.7 → 1.3) |
| Hoskote (planned 500 MW park) | Land plus 60 MLD treated water, Pavagada solar | Row 10 (DLC W32–W40 + adiabatic hybrids on treated water), Row 9 for W40+ halls | Best fit for Karnataka's PUE 1.00–1.20 band |
| Devanahalli / north Bengaluru | Land available, water supply less assured | Row 9 (dry-first) with adiabatic trim on stored treated/rain water | Design for W40 so trim runs only a few hundred hours |

**Seasonal and hourly operating modes for Bengaluru (E; tune to commissioning data)**

For a DLC plant (W32 supply, Rows 9/10):
- **Dry-bulb ≤ about 26 °C** (all of Oct–Feb nights and most monsoon hours): fully dry, with fan speed modulated.
- **Dry-bulb about 26–35 °C** (Mar–May afternoons, low humidity): switch on adiabatic pads or sprays. Expected wet-hours are a few hundred to about 1,500 per year, giving roughly 0.1–0.3 L/kWh.
- **Dry-bulb above about 35 °C, or adiabatic water unavailable:** let supply float to 35–40 °C within the ASHRAE W-class, or bring on a trim chiller for the 15–25% air-side load.

For an air hall (CHW 20/30 °C, Row 3):
- **Partial free cooling whenever dry-bulb is below about 28 °C**, which covers most of the year.
- **Full free cooling only below about 14–16 °C**, which is rare in Bengaluru.
- Raise supply air toward 26–27 °C, following SS 697's tropical guidance of 2–5% cooling energy saved per +1 °C.

For towers, where they already exist:
- Run them only on treated water.
- Hold cycles of concentration at 5 or more.
- Use the waterside economiser when wet-bulb is ≤ about 18–19 °C (about 3,000+ h/yr).
- Consider "dry-first" control (towers as trim) if hybrid coils are added.

### (d) Total water and CO₂ per MWh IT (Bengaluru representative values, E)

Formulas:
- Total water (m³ per MWh IT) = on-site WUE + PUE × grid water intensity.
- CO₂ (t per MWh IT) = PUE × grid emission factor.

| Combination | PUE (E) | On-site WUE | Total water at 2.0 (Karnataka) | Total water at 5.0 (India) | CO₂ at 0.47 (Karnataka hourly) | CO₂ at 0.71 (CEA) |
|---|---|---|---|---|---|---|
| 1. DX + condensers | 1.70 | 0.05 | 3.45 | 8.55 | 0.80 | 1.21 |
| 2. CRAH + air-cooled chiller | 1.45 | 0.05 | 2.95 | 7.30 | 0.68 | 1.03 |
| 3. CRAH + free-cooling chiller (18–24 °C) | 1.35 | 0.05 | 2.75 | 6.80 | 0.63 | 0.96 |
| 4. CRAH + WCC + towers | 1.25 | 1.80 | **4.30** | 8.05 | 0.59 | 0.89 |
| 6. Direct evaporative OA | 1.15 | 0.60 | 2.90 | 6.35 | 0.54 | 0.82 |
| 7. IEC units | 1.20 | 0.55 | 2.95 | 6.55 | 0.56 | 0.85 |
| 9. DLC + dry coolers | 1.15 | 0.05 | **2.35** | **5.80** | 0.54 | 0.82 |
| 10. DLC + adiabatic hybrid | 1.12 | 0.25 | 2.49 | 5.85 | 0.53 | 0.80 |
| 11. DLC + towers, chiller-less | 1.10 | 1.80 | 4.00 | 7.30 | 0.52 | 0.78 |
| 12. 1-phase immersion + dry | 1.08 | 0.05 | **2.21** | **5.45** | **0.51** | **0.77** |

Interpretation:
- **Towers never win on total water in India.** Against a free-cooling air-cooled chiller, a tower saves 0.10 PUE but costs 1.75 L/kWh on-site, so it only breaks even if grid water intensity exceeds about 17.5 L/kWh.
- **Liquid cooling with dry or adiabatic rejection dominates on all four columns.**
- **Scale check:**
  - 100 MW IT on towers at 1.8 L/kWh consumes about 1.58 million m³/yr, or about 4.3 MLD. That is more than twice the 1.964 MLD reported for twelve Bengaluru data centres at peak capacity.
  - Karnataka's 1 GW target on towers would need about 43 MLD, against about 1.2 MLD on dry DLC.

### Trade-offs beyond PUE/WUE

- **Water quality.** WUE scales with cycles of concentration: makeup ≈ evaporation × CoC/(CoC−1). Going from CoC 3 to 6 cuts makeup by about 20%. Indian borewell water is often hard or high-TDS and limits CoC to about 2–3 without softening or RO. Tetra Tech's model assumes 3 cycles. NTT's RO case shows a 33% WUE cut.
- **Legionella.** Open towers and adiabatic spray or wetted media are Legionella risks. Adiabatic systems wet only for hours, not continuously, which lowers but does not remove the risk. India has no data-centre-specific code, so adopt an ASHRAE 188-style water management plan.
- **Refrigerants.** Rows 1–5 and the trim chillers carry HFCs (R-410A GWP ≈2,088; R-134a ≈1,430). The low-GWP route is R-32, R-454B, R-513A or R-1234ze. India's Kigali schedule (Article 5, Group 2) freezes HFC consumption in 2028 with stepped cuts after that (E: verify current MoEFCC notifications). Chiller-less liquid designs largely remove the refrigerant risk. Two-phase immersion fluids raise PFAS concerns.
- **Reliability.** Dry and adiabatic plants avoid water-supply single points of failure, a real risk during Chennai's 2019 crisis and with Bengaluru tankers. Liquid loops add leak-detection and CDU-redundancy requirements.
- **Heat reuse.** DLC returns at 45–60 °C are reusable, which is why Germany mandates an Energy Reuse Factor of 10% (2026), 15% (2027) and 20% (2028) for new sites. India's limited heat demand makes this mostly a future option, such as absorption chilling or industrial preheat, rather than a design driver.

### (e) Policy benchmarks and how combinations map

| Jurisdiction | Requirement | Status | Combinations that comply (E) |
|---|---|---|---|
| Karnataka 2026–31 | Plant-wise PUE and WUE reporting. Rs 20 crore one-time for PUE 1.00–1.20, sustained 3 years and paid in year 4. 100% treated-water charge reimbursement up to Rs 8 lakh/yr. WUE 0.7–1.3 band: up to Rs 30 lakh/yr for 2 years (secondary source). Budget Rs 1,300.45 crore; target 1 GW by 2031 | Approved Sept 2026 | PUE band: rows 6, 7 (best case), 9–12. WUE band: rows 5 and 10 on treated water; towers (1.8) fail |
| MeitY AI-cloud tenders | PUE < 1.35 | In tenders since 2024 | Rows 3 (marginal), 4–12 |
| Singapore | Green DC Roadmap: PUE ≤1.3 at 100% IT load over 10 years; 300 MW DC-CFA allocated to projects at PUE 1.25; SS 697 pushes ≥26 °C | Roadmap and standard | Rows 4, 7, 9–12 |
| Malaysia (MIDA, Dec 2024) | Design PUE ≤1.4 hyperscale, ≤1.6 post-2020 colo, ≤1.7 older; WUE ≤2.2 m³/MWh (to 2.0 within 10 years) | Incentive condition | Most except rows 1–2 |
| Johor | WUE threshold 1.8 (one source says 1.4); reclaimed water required for new builds; data-centre water tariff RM5.33/m³ from 1 Aug 2025; ≈30% of applications rejected | In force | Towers only on reclaimed water and well-run; rows 5, 7, 9–12 |
| Germany EnEfG | New sites from 1 July 2026: PUE ≤1.2 (April 2026 draft amendment proposes ≤1.3). Existing: ≤1.5 from July 2027, ≤1.3 from July 2030. ERF 10/15/20% | Law; amendment pending | Rows 9–12; rows 4/11 with towers (Cundall: 1.2 is perhaps feasible only with evaporative towers) |
| EU EED | Delegated Regulation 2024/1364: 24 KPIs including WUE for sites ≥500 kW IT; EU-weighted PUE 1.27 across 773 reporting sites | Reporting in force | Disclosure only |
| China | New large data centres PUE ≤1.25 by 2025 (some sources say ≤1.3, with ≤1.25 or ≤1.2 at hub nodes); national average 1.48 (2023) | In force | Rows 7, 9–12 |

## Recommendations

1. **For the Atlas:** replace a single "cooling type" factor with the two-layer lookup in Table A2. Default new Bengaluru AI capacity to Row 10 (WUE 0.25, PUE 1.12). Default existing colo to Row 3 (0.05, 1.35) unless towers are known to exist (1.8, 1.25). Show total water at both 2.0 and 5.0 L/kWh, as in Table D.
2. **For Karnataka's policy design:**
   - Close the "low-WUE gap": a 0.7–1.3 band appears to reward neither dry (≈0.05) nor tower designs. Confirm the official text.
   - Require meter-based WUE by water source (potable, treated, borewell).
   - Make the treated-water reimbursement conditional on cycles of concentration ≥5.
3. **For operators in Bengaluru:**
   - Design liquid loops at W40 where IT vendors allow it. This makes the plant fully dry, and adiabatic becomes insurance.
   - If W32 is required, use adiabatic hybrids on treated water.
   - Do not build new towers on potable or borewell water.
4. **For coastal hubs** (Mumbai, Chennai, Kolkata, Vizag): accept about 0.03–0.05 higher PUE and go dry or hybrid with W40–W45. Evaporation buys little at wet-bulbs of 28–30 °C, and direct evaporative outside air is not viable.
5. **For Delhi NCR and Gujarat:** use dry plus adiabatic trim. Dry coolers alone cannot hold W45 at the 0.4% design condition.

## Caveats

- **Definitions differ.** AWS, Microsoft and NTT report withdrawal WUE. Google reports consumptive WUE (Category 2). AWS derives an "industry average" withdrawal WUE of 0.84 L/kWh from a consumption figure of 0.56 × CoC 3. Fleet figures mix technologies and climates and are not site measurements.
- **Disclosures move year to year.** Equinix reported 0.95/1.55 for 2024 and 0.91/1.41 for 2025. NTT's 2026 report (0.38/1.24) is sharply lower than 2025 (0.72/1.42). Treat single-year values cautiously.
- **The design data have known problems.** IS 7896 wet-bulb values may be about 1–1.5 K low for Bengaluru and the coastal cities, per Simha (ISHRAE). Jamnagar's 39.2 °C evaporation wet-bulb is a misprint. Pune's official ECBC zone (warm-humid) conflicts with common usage (temperate). Current ASHRAE 169 zone letters for these cities were not confirmed. Older 90.1 tables put all the listed cities in Zone 1.
- **Policy figures conflict between sources.** Johor's WUE threshold appears as 1.8 and as 1.4. China's new-build limit appears as 1.25 and as 1.3. Germany's 1.2 may become 1.3. Karnataka's WUE band and amounts come from a secondary tracker, not the gazette text.
- **Most PUE/WUE values in Tables A2 and D are engineering estimates (E)** calibrated to the sourced anchors. The IEC and immersion pPUEs are vendor case studies. Indian operators publish no site WUE, so no Indian measured value exists for any combination.
- **The Atlas tower value of 1.8 L/kWh is sensitive to cycles of concentration.** At CoC 3, near-complete evaporative rejection implies about 2.3–2.6 L/kWh (E). The Atlas value is consistent with NTT's pre-RO 1.8 but optimistic for hard borewell water.

## Sources

1. datacenterdynamics — https://www.datacenterdynamics.com/en/news/microsofts-upcoming-data-centers-to-use-closed-loop-zero-water-evaporation-design/
2. aboutamazon — https://sustainability.aboutamazon.com/products-services/aws-cloud
3. sec — https://www.sec.gov/Archives/edgar/data/1101239/000114036125013274/ef20047153_ars.pdf
4. Wikipedia — https://en.wikipedia.org/wiki/Water_usage_effectiveness
5. global — https://services.global.ntt/en-us/campaigns/global-data-centers-2026-sustainability-report
6. nttdata — https://www.nttdata.com/global/en/about-us/sustainability/esg-data/environment-data
7. datacenterdynamics — https://www.datacenterdynamics.com/en/news/ntt-deploys-reverse-osmosis-system-to-save-water-in-uk-data-center/
8. munters — https://datacenter.munters.com/resources/case-studies/oasis-delivers-optimal-climate-control-for-equinix/
9. munters — https://www.munters.com/en-us/knowledge-bank/case-studies/casestudy-2494/
10. munters — https://datacenter.munters.com/resources/case-studies/oasis-indirect-evaporative-cooling-treats-10mw-at-digiplex/
11. vertiv — https://www.vertiv.com/4ad73a/globalassets/documents/white-papers/vertiv-water-usage-and-sustainability-wp-en-na-web_317594_0.pdf
12. arxiv — https://arxiv.org/pdf/2609.25437
13. earthjournalism — https://earthjournalism.net/stories/what-data-center-giants-arent-saying-about-their-water-use-in-india
14. datacentermap — https://www.datacentermap.com/india/chennai/
15. blackridgeresearch — https://www.blackridgeresearch.com/blog/latest-list-of-new-upcoming-data-center-projects-in-india
16. bank — https://sbi.bank.in/documents/57189647/58231607/Sector+Report+DataCentre.pdf/f1919592-ee66-b50b-ea20-75fbb27c9bb5?t=1779885206866
17. resource — https://law.resource.org/pub/in/bis/S08/is.7896.2001.pdf
18. se — https://blog.se.com/datacenter/2026/09/15/how-state-policies-change-cooling-decisions-across-indias-data-centre-hubs/
19. semianalysis — https://newsletter.semianalysis.com/p/datacenter-anatomy-part-2-cooling-systems
20. datacenterscope — https://datacenterscope.com/ai-infrastructure/data-center-retrofit-cost/
21. arxiv — https://arxiv.org/pdf/2205.04257
22. adamsilvaconsulting — https://www.adamsilvaconsulting.com/insights/data-center-cooling-economics-2026
23. ishrae — https://ishrae.in/docin/Content/Article_File/tn3izd0pgxm.pdf
24. lbl — https://datacenters.lbl.gov/sites/default/files/CASE%20STUDY%20Hybrid%20Cooling%20IIT%20Delhi%2013.2.2019.pdf
25. kvrm — https://kvrm.in/data-centre-wue-cooling-tower-adiabatic-dry-cooler/
26. medianama — https://www.medianama.com/2026/09/223-karnataka-sustainable-data-centre-policy/
27. imda — https://www.imda.gov.sg/how-we-can-help/green-dc-roadmap/tropical-dc-standard
28. vaidicslucknow — https://www.vaidicslucknow.com/current-affair/data-centres-in-karnataka-sustainability-concerns-sustainable-data-centre-policy-2026-31-t/
29. ca-eed — https://www.ca-eed.eu/ia-document/implementing-the-eed-data-centers-and-the-german-energy-efficiency-act-germany/
30. thenewsminute — https://www.thenewsminute.com/karnataka/karnatakas-new-data-centre-policy-puts-water-energy-in-focus-what-does-it-say
31. deccanherald — https://www.deccanherald.com/india/karnataka/karnataka-targets-1gw-data-centre-capacity-rs-1300-crore-policy-outlay-4151500
32. businessworld — https://www.businessworld.in/article/karnataka-approves-sustainable-data-centre-policy-targets-1-gw-it-load-by-2031-624457
33. arusgrid — https://arusgrid.com/policy/india
34. akcp — https://www.akcp.com/2026/07/23/singapore-data-center-pue-roadmap/
35. arusgrid — https://arusgrid.com/policy/malaysia
36. cobler — https://cobler.io/blog/data-center-energy-efficiency-pue-malaysia
37. waterwastewaterasia — https://waterwastewaterasia.com/higher-costs-tighter-rules-johors-data-centres-turn-to-reclaimed-water/
38. climatereadyre — https://briefs.climatereadyre.com/p/johor-data-centers-how-tier-bans
39. marketresearchmalaysia — https://marketresearchmalaysia.com/insights/article/water-not-just-power-malaysia-data-centre-water-use-and-the-new-sustainability-reality
40. cundall — https://www.cundall.com/ideas/blog/has-the-german-energy-efficiency-act-become-a-thorn-in-the-side-of-german-data-centre-operators
41. orrick — https://www.orrick.com/en/Insights/2026/04/German-Energy-Efficiency-Act-Draft-Amendment-What-it-means-for-Companies-and-Data-Centres
42. moduledge — https://www.moduledge.com/blog/eu-data-center-regulations-2026
43. scienceshot — https://scienceshot.com/post/enefg-hearing-data-centres-expert-statements
44. rmi — https://rmi.org/wp-content/uploads/dlm_uploads/2024/11/powering_the_data_center_boom.pdf
45. huawei — https://digitalpower.huawei.com/en/blogs/next-generation-data-denters
46. faxiangongchang — https://faxiangongchang.com/en/reports/china-data-center-ai-2026
47. ecbc — https://ecbc.in/econiwas.html
48. aashe — https://stars.aashe.org/wp-content/uploads/2024/01/20081111_cztables-1-1.pdf
