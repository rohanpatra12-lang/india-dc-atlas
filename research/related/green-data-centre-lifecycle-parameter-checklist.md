<!-- Related research from an earlier conversation ("Data centre infrastructure requirements in India"), Oct 2026, that informed the atlas. Kept as written at the time. The atlas standards register (src/data/standards.js) is authoritative where figures differ (for example India grid water 2.9 L/kWh and grid CO₂ 0.675 t/MWh after the October 2026 corrections). -->

# Designing and Building a Green Data Centre in India: Full-Lifecycle Considerations and Master Parameter Checklist

Your model already covers what drives most of the cost and carbon: cooling choice, power sourcing with banking, water and salt balance, hazards, NPV/CVaR and Scope 1–3. What it most likely lacks is the set of **binding constraints and coupling variables**:
- **Redundancy topology** (N+1, 2N, block) and the Uptime "12 hours of fuel at N load" rule.
- **Rack density**, which drives floor loading and the split between liquid and air cooling.
- **Part-load PUE**, measured where the standards measure it.
- **India's permitting thresholds**: EIA at 20,000 m² built-up, CGWA NOC, CPCB IV+ for DG sets up to 800 kW, CRZ, fire NOC and the electrical inspectorate.
- **Lead-time and schedule risk** for transformers, generators and switchgear.
- **End-of-life obligations** under the E-Waste and Battery Waste Management Rules 2022.

The parameters below are tagged **[I]** (a site or project input you choose or measure) or **[C]** (a constraint set by a standard, regulation or physics). Where a value is a market or rule-of-thumb figure rather than a standard, it is marked *indicative*.

## TL;DR
- A data centre design is a coupled system of roughly 150 parameters across 17 domains. The decisions that matter most for an Indian green-siting model are:
  - **IT load and rack density**: Uptime Institute's 2025 Global Data Center Survey puts average rack density at 7.5 kW (up from 6.8 kW in 2024; outliers of 30 kW and above excluded). AI racks such as the NVIDIA GB200 NVL72 draw about 120–135 kW.
  - **Availability target**: Uptime Tier, TIA-942 Rated or EN 50600 Availability Class 1–4.
  - **Climate envelope**: ASHRAE TC9.9 recommended inlet 18–27°C, plus the W-classes for liquid cooling.
  - **Power-sourcing rules**: the Green Energy Open Access Rules 2022 (≥100 kW eligibility, banking at least monthly and at least 30% of monthly consumption) and the CEA grid factor of 0.710 tCO₂/MWh for FY2024-25.
- India-specific constraints that early models often miss:
  - EIA prior environmental clearance for built-up area ≥20,000 m².
  - The CGWA groundwater NOC under the 2020 guidelines.
  - CPCB IV+ genset norms (July 2023, ≤800 kW).
  - The seismic code: the IS 1893:2025 revision was withdrawn in March 2026, so IS 1893 (Part 1):2016 zones II–V apply.
  - CERT-In 6-hour incident reporting with 180-day log retention, and DPDP Rules 2025.
  - The Union Budget 2026–27 tax holiday to 2047 for foreign cloud providers using Indian data centres.
- Economics anchor: Turner & Townsend's Data Centre Construction Cost Index 2025–26 puts Mumbai at US$6.64/W, 51st of 52 markets (second-cheapest), benchmarked on a 30–50 MW air-cooled hyperscale build. It also finds US liquid-cooled facilities cost 7–10% more to build than equivalent air-cooled ones. To be decision-ready, the model should add:
  - Part-load efficiency curves.
  - Redundancy-driven capex multipliers.
  - Long-lead schedule risk.
  - Water-permit feasibility as a hard gate.
  - End-of-life and EPR flows.

---

## Key Findings

1. **Availability class is the largest single capex multiplier and should be a decision variable, not a fixed input.**
   - EN 50600 / ISO/IEC 22237 define Availability Classes 1–4. These map approximately onto Uptime Tier I–IV and TIA-942 Rated-1 to Rated-4: basic, redundant components, concurrently maintainable, fault tolerant.
   - Uptime's Tier Standard: Topology requires a minimum of 12 hours of on-site fuel at N load for all Tiers, with the fuel system meeting the Tier objective (Concurrently Maintainable or Fault Tolerant).
   - For Tier III and IV, engine generators must have continuous, derated-prime or unlimited-runtime standby ratings.
   - Where evaporative cooling is used, Uptime also expects about 12 hours of on-site make-up water storage. This links your water mass balance directly to the Tier target.
2. **Cooling choice is constrained by IT equipment classes, not just by climate.**
   - The ASHRAE TC9.9 recommended envelope is 18–27°C for classes A1–A4.
   - Allowable ranges are 15–32°C (A1), 10–35°C (A2), 5–40°C (A3) and 5–45°C (A4).
   - High-density class H1 needs a narrower 18–22°C.
   - Altitude derating is 1°C per 300 m above 900 m.
   - Liquid-cooling facility water classes run from W17 to W+.
   - The industry is moving to high-density liquid cooling. Turner & Townsend reports rack densities of 100–150 kW per rack for AI.
3. **PUE averages have plateaued, so the benchmark should be design PUE at part load.**
   - Uptime's 2025 survey reports a weighted-average PUE of 1.54, unchanged for six years.
   - Per the Uptime 2025 survey as reported by DCD, facilities commissioned in the last five years average 1.48, and those larger than 20 MW are around 1.44.
   - IGBC's Green Data Centre rating requires new data centres to show design PUE ≤1.5 at one-third (33%) IT load, with IT energy measured at PDU level.
   - Part-load PUE at 33% load is where many Indian facilities perform worst during the utilisation ramp.
4. **India's power-procurement rules shape green feasibility as much as resource quality does.**
   - The GEOA Rules 2022 lower open-access eligibility to 100 kW.
   - They permit banking at least monthly, for at least 30% of monthly consumption.
   - They limit charges to transmission, wheeling, cross-subsidy surcharge, standby and banking charges.
   - States implement these differently, and IEEFA flags state deviations on eligibility, approval timelines and charges.
   - CEEW and SYSTEMIQ's February 2026 study, based on consultations with 24 stakeholders, reports renewable developers' view that up to about 80% renewable supply is feasible with geographically diversified solar–wind portfolios plus battery storage. It also finds that DG sets remain "an indispensable asset for meeting uptime and reliability requirements."
5. **Permitting is a hard gate and a schedule risk.**
   - EIA Notification 2006 item 8(a) applies to built-up area ≥20,000 m² and <1,50,000 m²; item 8(b) applies at ≥1,50,000 m² or ≥50 ha.
   - Since the 2016 amendment, environmental conditions for 20,000–1,50,000 m² projects are integrated with building permission.
   - Groundwater abstraction needs a CGWA NOC under the 24 September 2020 guidelines (S.O. 3289(E)), with abstraction charges that vary by area category.
   - CEEW reports that, despite single-window provisions, stakeholders face delays in land acquisition, building approvals, grid connectivity and fire safety clearances.
6. **The market is scaling fast, and supply-chain risk is real.**
   - Savills India's Year End 2025 Market Watch puts operational stock at 1,520 MW IT, up 34%. Additions rose 103% to a record 387 MW IT, and absorption was 427 MW IT. CBRE reports about 1,530 MW as of September 2025.
   - Global data centre construction cost inflation averaged 5.5% in 2025 per Turner & Townsend.

---

## Details by Lifecycle Domain

### 1. Business and Requirements (Strategy Phase)

| Parameter | Unit | Typical value / range | Source / standard | I/C |
|---|---|---|---|---|
| Workload type | category | Colocation (retail/wholesale), hyperscale self-build, AI training, AI inference, enterprise, edge, sovereign/government cloud | Market segmentation (CBRE, JLL) | I |
| Critical IT load (final build-out) | MW IT | Edge <1; enterprise 1–5; colo 5–50; hyperscale campus 50–500+ | Market reports; CEEW notes small operators (<5 MW) use municipal water | I |
| Phasing | MW per phase, phases | 4–20 MW blocks; 3–6 phases over 5–10 yrs (*indicative*) | Industry practice | I |
| Utilisation ramp | % of built capacity sold/used over time | e.g., 30% yr1 → 85% yr4 (*indicative*) | Operator business plans | I |
| Mean rack density | kW/rack | Average 7.5 kW (Uptime 2025; up from 6.8 kW in 2024; excludes ≥30 kW outliers); general-purpose 5–15; AI 40–150+ | Uptime Institute 2025; Turner & Townsend 2025 | I |
| Rack density distribution | % racks by band | Must be modelled as a distribution, not a mean | Design brief | I |
| Availability target | Tier / Rated / Class | Tier III / Rated-3 / AC3 is the commercial norm; Tier IV for financial/sovereign | Uptime Tier Standard; TIA-942-C; EN 50600-1 / ISO/IEC 22237 | I→C |
| Schedule | months to RFS | 18–36 months per phase (*indicative*), constrained by long-lead items | §13 | I/C |

**Interactions:**
- Workload type sets the density distribution.
- Density sets the cooling technology (air practical to about 30–40 kW per rack; DLC or immersion above that).
- Cooling technology sets the water and PUE profile, and the availability class sets the redundancy multiplier on every plant item.

### 2. Site Selection

**Power**

| Parameter | Unit | Typical / threshold | Source | I/C |
|---|---|---|---|---|
| Grid capacity available at nearest EHV substation | MVA | ≥1.3–1.6 × IT MW × PUE (*indicative headroom*) | STU/DISCOM load-flow studies | I |
| Supply voltage | kV | 33 kV (<~20 MW), 66/110/132 kV (20–100 MW), 220 kV+ (hyperscale) (*indicative; state supply codes set thresholds*) | State Electricity Supply Code / SERC | C |
| Dual independent feeds | number, from different substations | 2 for Tier III/IV preferred | Uptime (utility not counted in Tier, but affects operational risk) | I |
| Grid reliability | SAIFI/SAIDI, outages/yr, hrs/yr | Site-specific; Uptime treats utility as an economic, not reliability, source | Uptime Tier Standard; DISCOM data | I |
| Open-access eligibility | kW contract demand | ≥100 kW (GEOA) | GEOA Rules 2022 | C |
| Banking | period; % | At least monthly; ≥30% of monthly consumption | GEOA Rules 2022 Rule 8 | C |
| OA charges | ₹/kWh | Transmission, wheeling, CSS, additional surcharge, standby, banking charges (state-specific) | GEOA Rule 9; SERC orders | C |
| RE resource | CUF % (solar, wind) | Solar 19–25%, wind 30–40% (*indicative*) | MNRE/NIWE data | I |
| Grid emission factor | tCO₂/MWh | 0.710 (FY2024-25, CEA v21.0); 0.727 (FY2023-24, v20.0) | CEA CO₂ Baseline Database | C |

**Water**

| Parameter | Unit | Typical | Source | I/C |
|---|---|---|---|---|
| Source options | — | Municipal, groundwater (CGWA NOC), STP-treated sewage, desalinated or seawater, rainwater | CGWA 2020; state policy | I |
| CGWA assessment-unit category | Safe / Semi-critical / Critical / Over-exploited | Determines permissibility and abstraction charges | CGWA Guidelines 2020 (S.O. 3289(E)) | C |
| Raw water quality | TDS, hardness, chloride, silica (mg/L) | Drives achievable CoC (see §6) | Site testing (NABL lab) | I |

**Climate**

| Parameter | Unit | Typical in Indian metros | Source | I/C |
|---|---|---|---|---|
| Design dry-bulb (0.4% / extreme) | °C | 38–46 (Delhi, Hyderabad, Nagpur higher); 33–36 (Mumbai, Chennai) (*indicative*) | ASHRAE Handbook—Fundamentals climatic design conditions; IMD | I |
| Design wet-bulb (0.4% / extreme) | °C | 27–30 coastal; drives evaporative and tower approach | ASHRAE climatic data | I |
| Dew point | °C | Coastal monsoon 24–27 (exceeds ASHRAE recommended 15°C DP max, so dehumidification or a closed loop is needed) | ASHRAE TC9.9 | C |
| Hourly TMY (8,760 h) | °C, RH | Needed for economiser hours and PUE simulation | ISHRAE/ASHRAE weather files | I |
| Climate-change shift | °C by 2050 | +1–2°C design shift for heat stress (*indicative*) | IPCC AR6/IMD; CEEW notes operators factor heat stress | I |
| Corrosive gases | ISA-71.04 severity | G1 required for IT; urban/industrial India often G2–GX, which affects airside economiser viability | ANSI/ISA-71.04; ASHRAE (50% RH limit where corrosive gases present) | C |

**Hazards**

| Hazard | Parameter | Governing standard | I/C |
|---|---|---|---|
| Seismic | Zone II–V; zone factor Z = 0.10/0.16/0.24/0.36; importance factor I = 1.5 for critical facilities (*check code*) | IS 1893 (Part 1):2016, reinstated after the IS 1893:2025 revision was withdrawn via a 3 March 2026 gazette notification | C |
| Wind / cyclone | Basic wind speed Vb 33–55 m/s | IS 875 (Part 3):2015 | C |
| Flood | 100-yr / 500-yr flood level; plinth above HFL + freeboard | Local development control regulations; CWC/NDMA flood maps | C |
| Storm surge / sea-level rise | m | NDMA cyclone guidelines; CRZ setback | C |
| Landslide | Susceptibility class | GSI landslide maps | I |
| Lightning | Flash density Ng (flashes/km²/yr); risk assessment | IS/IEC 62305 | C |
| Industrial hazards | Distance to MAH units, pipelines, fuel depots | MSIHC Rules 1989; PESO | C |
| Aviation | Height limits near airports; obstruction lighting | AAI NOC (Colour-Coded Zoning Maps) | C |

**Land, connectivity, people**

| Parameter | Unit | Typical | Source | I/C |
|---|---|---|---|---|
| Land area | acres per MW IT | 0.2–0.5 multi-storey; 1–2 single-storey campus with on-site substation (*indicative*) | Industry practice. CEEW 2026, citing CBRE, counts about 271 data centres occupying about 23 million m² of land as of January 2026; note that CBRE's own report gives the figure as 23 million sq ft | I |
| Zoning / land use | — | Many state policies allow data centres in any zone (e.g., Maharashtra 2023) | State DC/IT policies | C |
| Fibre route diversity | number of diverse paths, km to IXP | ≥2 physically diverse routes; metro proximity to IXPs and cable landing stations | TIA-942 | I |
| Cable landing proximity | km | Mumbai and Chennai host most CLS; about 90% of capacity sits in Mumbai, Chennai, Delhi-NCR and Bengaluru | CBRE 2025 | I |

### 3. Architecture and Civil/Structural

| Parameter | Unit | Typical | Source | I/C |
|---|---|---|---|---|
| Building type | — | Single-storey (land-rich), multi-storey (2–8 floors, urban), modular or prefab | Design | I |
| White-space floor live load | kN/m² | 12–20 general; ≥20–25 for AI liquid-cooled rows (*indicative*). An NVL72 rack weighs about 1.36 t, over 2,000 kg/m² point load | IS 875 (Part 2) minimum; OEM data | C/I |
| Raised floor vs slab | — | Slab-on-grade with overhead distribution is now common; raised floor 600–900 mm if used | TIA-942 / BICSI 002 | I |
| Clear height (white space) | m | 4.5–6.0 to underside of structure (*indicative*) | BICSI 002 | I |
| White:grey space ratio | ratio | About 1:1 to 1:2 (white:support) (*indicative*); rises with 2N | Design | I |
| Column grid | m | 9–12 × 9–12 (*indicative*), aligned to rack pitch | Design | I |
| Seismic design | R, I, Z factors | IS 1893:2016; IS 13920 ductile detailing; non-structural bracing of racks and pipes | BIS | C |
| Roof plant loads | kN/m² | 7.5–15+ for chillers, dry coolers, towers (*indicative*) | Design | I |
| Plinth level | m above HFL | Above highest flood level + freeboard (e.g., 0.6–1.0 m) (*indicative*) | Local bye-laws, NDMA | C |
| Setbacks, FAR/FSI, ground coverage | m, ratio | Per state DCR; some states relax FAR for data centres | State development control rules | C |
| Delivery and equipment paths | door height, lift capacity | ≥3 m doors; freight lift ≥3–5 t for AI racks (*indicative*) | OEM (NVL72 ships in four components; compute rack about 1,500 kg) | C |

### 4. Electrical

| Parameter | Unit | Typical | Source | I/C |
|---|---|---|---|---|
| Main transformers | MVA, impedance %, losses | 10–80 MVA; BEE/IS 1180 efficiency levels for distribution transformers | IS 1180; IS 2026 / IEC 60076 | C |
| MV/LV switchgear | kV, kA fault level | 11/22/33 kV MV; 415 V LV; 50–100 kA LV | IS/IEC 62271, IEC 61439 | C |
| Redundancy topology | — | N, N+1, 2N, 2N+1, distributed redundant (3/2, 4/3), block redundant with catcher | Uptime; TIA-942; EN 50600-2-2 | I |
| UPS type and efficiency | % | Double-conversion 94–97%; eco-mode ~99%; rotary/DRUPS (*indicative*) | IEC 62040-3; vendor data | I |
| Battery technology and autonomy | min | VRLA, Li-ion (LFP preferred for fire profile), NiZn; 5–10 min at full load (*indicative*) | UL 9540A; NFPA 855 | I |
| Generators | kVA, rating type | 2–3.5 MVA HV or LV units; continuous or unlimited-standby for Tier III/IV | Uptime ATD paper on ratings | C |
| Fuel storage | hours at N load | ≥12 h (Uptime minimum for all Tiers); many Indian operators specify 24–48 h (*indicative*) | Uptime Tier Standard: Topology | C |
| DG emission norm | g/kWh | CPCB IV+ for gensets up to 800 kW (from 1 July 2023); larger units under separate CPCB norms with stack-height rules | CPCB / MoEFCC GSR notifications | C |
| NCR special rule | — | Dual-fuel (70% gas + 30% diesel) or RECD (≥70% PM capture) for in-use DG sets in NCR per CAQM | CAQM 2023 directions | C |
| DG stack height | m | Formula H = h + 0.2√kVA; minimum 30 m cited for ≥800 kW (*verify with SPCB*) | CPCB guidelines | C |
| Busway / PDU / RPP | A, kW per rack feed | 400–1,600 A overhead busway; 415 V three-phase to AI racks | IEC 61439-6 | I |
| Power quality / harmonics | THDv %, TDD % | THDv ≤5% at PCC (*IEEE 519-2022 limits; CEA connectivity standards require harmonic compliance*) | IEEE 519; CEA (Technical Standards for Connectivity) Regulations | C |
| Lightning protection | LPL I–IV | Risk-assessment based | IS/IEC 62305 | C |
| Arc flash | cal/cm² | Incident-energy study; PPE categories | IEEE 1584; NFPA 70E | C |
| Electrical safety | — | CEA (Measures relating to Safety and Electric Supply) Regulations, 2023; inspectorate approval before energisation | CEA | C |
| Metering for PUE | level | Level 1 (UPS output), Level 2 (PDU output), Level 3 (IT input); IGBC requires PDU-level IT metering | ISO/IEC 30134-2; The Green Grid; IGBC | C |
| BESS for energy shifting | MWh, C-rate | Sized to banking/ToD economics | CEA BESS guidelines; NFPA 855 | I |
| AI load transients | MW step, ramp ms | Synchronised GPU training can swing load by tens of percent within seconds; needs UPS or BESS buffering and DISCOM coordination | OEM guidance; emerging grid-code issue | C |

**Interactions:**
- Topology multiplies UPS, generator and transformer counts.
- UPS efficiency plus transformer losses set the electrical share of PUE overhead, roughly 0.05–0.12 (*indicative*).
- The DG norm (CPCB IV+ ≤800 kW) pushes large campuses toward >800 kW HV sets with different compliance routes.

### 5. Mechanical and Cooling

| Parameter | Unit | Typical | Source | I/C |
|---|---|---|---|---|
| IT inlet air temperature | °C | Recommended 18–27; allowable A1 15–32, A2 10–35, A3 5–40, A4 5–45; H1 18–22 | ASHRAE TC9.9, 5th ed. (2021) | C |
| Humidity | DP, RH | Recommended −9°C DP to 15°C DP and 60% RH (50% where corrosive gases are present); allowable A1 8–80% RH, up to 17°C DP | ASHRAE TC9.9 | C |
| Liquid-cooling facility water class | °C supply | W17, W27, W32, W40, W45, W+ (supply ≤ class number) | ASHRAE TC9.9 Liquid Cooling Guidelines | C |
| DLC coolant conditions | °C in, ΔT | e.g., NVL72 about 25°C inlet, +20°C rise; about 2 L/s per rack (*OEM figures*) | NVIDIA/OEM | C |
| Airflow | m³/s per kW | about 0.08–0.12 m³/s per kW at 10–12 K ΔT (physics: Q = P / (ρ·cp·ΔT)) | Physics | C |
| Chillers | kWr, COP/kW/TR | Water-cooled centrifugal COP 6–7+; air-cooled screw 3–4 at Indian design temperatures (*indicative*); ECBC minimums apply | ECBC 2017; AHRI 550/590 | C |
| Chilled water supply | °C | 14–20°C elevated CHW for data centres (vs 6–7°C comfort) | ASHRAE TC9.9 / design | I |
| Cooling tower approach / range | K | Approach 3–5 K over WB; range 5–8 K (*indicative*) | CTI standards | I |
| Economiser hours | h/yr | Waterside economiser useful only where WB < about 12–15°C; limited in most Indian metros (*indicative*) | TMY simulation | I |
| Indirect evaporative cooling | WB effectiveness | 60–80% (*indicative*); limited by monsoon wet-bulb | Vendor data | I |
| Once-through seawater | m³/h, ΔT discharge | Requires CRZ clearance and discharge consent; thermal-discharge limits typically ≤5–7°C above ambient at the mixing zone (*analogy with CPCB thermal power norms; verify*) | CRZ Notification 2019; E(P) Rules; SPCB | C |
| Heat rejection redundancy | N+X | N+1 (Tier III) to 2N (Tier IV) | Uptime | C |
| Filtration | ISO 16890 / MERV | ePM1 50–70% (≈MERV 13) for outside air; ISO 14644-1 Class 8 room cleanliness | ASHRAE TC9.9; ISO 16890 | C |
| Gaseous contamination | Å/month copper/silver | G1: Cu <300 Å/month, Ag <200 Å/month | ANSI/ISA-71.04; ASHRAE | C |
| Refrigerant | GWP, class | Transition toward low-GWP (R-1234ze, R-513A, R-32, natural refrigerants) | Kigali Amendment; India Cooling Action Plan | C |
| HFC phase-down (India) | % of baseline | Baseline = average of 2024–26 plus 65% of HCFC-22 baseline; freeze 1 Jan 2028; −10% 2032, −20% 2037, −30% 2042, −85% 2047 | MoEFCC OM 1 April 2026; Kigali Amendment | C |
| ICAP targets | % by 2037-38 | Cooling demand −20–25%, refrigerant demand −25–30%, cooling energy −25–40% | India Cooling Action Plan (MoEFCC Ozone Cell, 2019) | C (policy) |
| Waste heat reuse | °C grade, kW | 30–60°C from DLC; limited district-heating demand in India (process heat, absorption chilling, desalination are options) | Design | I |
| Noise at boundary | dB(A) | Day/night limits by zone (industrial 75/70, commercial 65/55, residential 55/45) | Noise Pollution (Regulation & Control) Rules 2000 | C |

### 6. Water

| Parameter | Unit | Typical | Source | I/C |
|---|---|---|---|---|
| Evaporation | L per kWh heat rejected | About 1.5–1.6 L/kWh theoretical (latent heat about 2,260 kJ/kg); practical 1.2–1.6 | Physics | C |
| Drift | % of circulating flow | 0.0005–0.005% with modern eliminators (*indicative*) | CTI / vendor | C |
| Cycles of concentration (CoC) | — | 3–6 typical; up to 8–10 with softening/RO make-up; limited by silica (~150 mg/L), chloride and LSI (*indicative*) | Water-treatment practice | C |
| Blowdown | m³/h | B = E/(CoC−1) − D | Mass balance | C |
| Make-up | m³/h | M = E + B + D | Mass balance | C |
| Salt balance | kg/day TDS | TDS_make-up × M = TDS_blowdown × (B + D) | Mass balance | C |
| Storage autonomy | hours | ≥12 h make-up storage for evaporative systems (Uptime); Indian practice often 24–72 h (*indicative*) | Uptime Tier Standard | C |
| WUE | L/kWh IT | 0 (air-cooled dry/closed-loop) to about 1.8+ (evaporative) (*indicative*) | ISO/IEC 30134-9 | I |
| ZLD | — | Often a CTO condition in water-stressed states; adds RO/MEE capex and energy | SPCB consent conditions | C |
| Discharge | mg/L limits | Discharge standards under E(P) Rules / SPCB consent; sewer or land disposal limits | Water Act 1974; SPCB | C |
| CGWA NOC | — | Mandatory for groundwater abstraction; fee ₹10,000 fresh; abstraction charges by quantum and area category; flowmeters, piezometers; water audit every 2 years if >100 KL/day (*secondary sources; verify on NOCAP*) | CGWA Guidelines 24.09.2020 | C |
| Alternative water | — | STP-treated water and rainwater harvesting; often required by state DCR | State policies; NBC | I |

### 7. Fire and Life Safety

| Parameter | Unit / type | Typical | Source | I/C |
|---|---|---|---|---|
| Occupancy classification | — | Business/storage/industrial (state interpretation varies); high-rise if >15 m | NBC 2016 Part 4 | C |
| Detection | — | Aspirating smoke detection (VESDA-type), Class A sensitivity in white space | NFPA 75/76; NBC Part 4; IS 2189 | C |
| Suppression (white space) | — | Pre-action sprinklers (double interlock), clean agent (NFPA 2001 / ISO 14520: FK-5-1-12, inert gas), water mist (NFPA 750) | NFPA 75; NBC | I/C |
| Clean agent design concentration | % | Per agent (e.g., FK-5-1-12 about 4.2–5.9%) (*indicative*); room integrity test | NFPA 2001 | C |
| Battery rooms (Li-ion) | — | Thermal-runaway risk; UL 9540A test data, NFPA 855 spacing, off-gas detection, deflagration venting | NFPA 855; UL 9540A | C |
| Compartmentation | h FRR | 2 h typical between data halls, UPS/battery rooms and generator rooms (*indicative*) | NBC Part 4; EN 50600-2-1 | C |
| Fire NOC | — | State Fire Services; renewals | State Fire Acts | C |

### 8. Security

| Parameter | Typical | Source | I/C |
|---|---|---|---|
| Protection classes | EN 50600 Protection Classes 1–4 by space (public → restricted); at least three classes against unauthorised access | EN 50600-2-5 | C/I |
| Perimeter and access | Crash-rated fence/bollards, layered zones, mantraps, biometrics, anti-tailgating | EN 50600; TIA-942; ISO 27001 Annex A | I |
| Cyber / OT | IEC 62443 for BMS/EPMS/DCIM; network segmentation | IEC 62443 | C |
| Certifications | ISO/IEC 27001, SOC 2, PCI-DSS, ISO 22301 | Customer-driven | I |
| Government cloud | MeitY empanelment of cloud service offerings and STQC audit for government workloads | MeitY guidelines | C |
| CERT-In | Report incidents within 6 hours; keep ICT logs for a rolling 180 days within India; sync clocks to NIC/NPL NTP | CERT-In Directions 28 April 2022 | C |
| DPDP | DPDP Act 2023 and DPDP Rules 2025 (notified 13 Nov 2025): breach intimation to the Data Protection Board and data principals; mostly falls on customers (data fiduciaries), with processor obligations by contract | MeitY | C |

### 9. Network and IT Infrastructure

| Parameter | Typical | Source | I/C |
|---|---|---|---|
| Entrance facilities | ≥2 diverse building entry points, ≥20 m apart (*indicative*) | TIA-942-C | C |
| Meet-me rooms | ≥2 MMRs for carrier-neutral colo | TIA-942 | I |
| Structured cabling | TIA-568 / ISO 11801; single-mode OS2 backbone; MPO for AI fabrics | TIA-568; ISO/IEC 11801 | C |
| DCIM / BMS / EPMS | Points per MW, metering granularity, ISO/IEC 30134 KPI reporting | ISO/IEC 30134 | I |

### 10. Sustainability and Efficiency Metrics

| Metric | Definition | Typical / target | Standard | I/C |
|---|---|---|---|---|
| PUE | Total facility energy / IT energy | Global average 1.54 (2025); new builds 1.48; >20 MW 1.44; IGBC new ≤1.5 at 33% load | ISO/IEC 30134-2; Uptime 2025; IGBC | C/I |
| pPUE / part-load PUE | PUE at 25/50/75/100% load | Model as a curve | ISO/IEC 30134-2 | I |
| WUE | Site water / IT energy (L/kWh) | See §6 | ISO/IEC 30134-9 | I |
| CUE | CO₂ / IT energy (kgCO₂/kWh) | ≈ PUE × grid EF; e.g., 1.4 × 0.710 ≈ 0.99 for grid-only | ISO/IEC 30134-8 | C |
| REF | Renewable energy / total energy | 0–1 | ISO/IEC 30134-3 | I |
| ERF | Reused energy / total energy | 0–0.1 typical in India | ISO/IEC 30134-6 | I |
| ITUE / TUE | IT-internal overhead (fans, PSUs) | ITUE 1.1–1.3 (*indicative*) | The Green Grid | I |
| Scope 1 | DG diesel, refrigerant leakage (GWP × kg leaked) | Leak rate 1–5%/yr (*indicative*) | GHG Protocol | I |
| Scope 2 | Location-based (CEA 0.710) vs market-based (GEOA green attributes) | Dual reporting | GHG Protocol Scope 2 Guidance; CEA | C |
| Scope 3 | Embodied carbon (steel, concrete, IT hardware), fuel and T&D losses, transport, end-of-life | Embodied often 20–50% of lifecycle in RE-powered sites (*indicative*) | GHG Protocol Scope 3; EN 15978 | I |
| Green rating | IGBC Green Data Centre, LEED v4.1 BD+C Data Centers, GRIHA | IGBC: new PUE ≤1.5, existing ≤3.0 (mandatory requirement); points for lower PUE | IGBC Pilot 2016 / Addenda-1 2017 | C/I |
| Energy code | ECBC 2017 / ECSBC for commercial buildings | Chiller COP, envelope, lighting LPD minimums | BEE | C |
| Indian carbon market | CCTS obligations (currently energy-intensive sectors; data centres not yet designated as obligated entities) | — | BEE / CCTS 2023 | C (watch) |

### 11. Regulatory and Approvals in India

| Approval / instrument | Trigger / content | Authority | Timeline (*indicative*) |
|---|---|---|---|
| State DC policy registration | Eligibility for incentives (e.g., Maharashtra IT/ITES Policy 2023: 100% stamp duty exemption, permanent electricity duty exemption, ₹1/unit tariff subsidy for 5 yrs outside Zone I, open access, essential-service status) | State IT/Industries dept | 1–3 months |
| National policy status | No binding national DC policy; MeitY Draft Data Centre Policy 2020 never finalised; infrastructure status granted; 15 states have DC or IT policies | MeitY / DEA | — |
| Union tax | Tax holiday to 31 March 2047 for notified foreign companies providing global cloud services from Indian data centres (Indian customers served via an Indian reseller); 15% cost-plus safe harbour for related-party DC services | Finance Act 2026 / CBDT | — |
| Land use conversion and title | NA conversion, zoning; stamp duty (often exempted) | Revenue dept / development authority | 3–9 months |
| Building permission | DCR/FSI compliance, structural safety | ULB / development authority | 2–6 months |
| Environmental clearance | Built-up ≥20,000 m² and <1,50,000 m² → item 8(a) (integrated with building permission per 2016 amendment); ≥1,50,000 m² or ≥50 ha → 8(b), Category B1 | SEIAA / ULB | 3–9 months |
| CTE / CTO | Water Act 1974 and Air Act 1981 consents (DG sets, STP, cooling-tower blowdown); SPCB category varies by state | SPCB | 1–4 months each |
| CGWA NOC | Groundwater abstraction | CGWA / state GW authority | Up to 4 months |
| CRZ clearance | Coastal sites, seawater intake/outfall | SCZMA / MoEFCC under CRZ 2019 | 6–12 months |
| Fire NOC | Provisional at plan stage; final before occupancy | State Fire Services | 1–3 months |
| Electrical inspectorate | Approval of HV installations before energisation under CEA Safety Regulations 2023 | Chief Electrical Inspector (state) / CEA | 1–2 months |
| Grid connectivity | Feasibility, load sanction, bay allocation at substation | DISCOM / STU | 6–24 months (often critical path) |
| Open access / GEOA | Application through nodal agency, approved within 15 days per GEOA Rules | State nodal agency / GEOA portal | Weeks to months in practice |
| DG set approvals | CPCB type approval/COP (≤800 kW), SPCB consent, stack height | CPCB / SPCB | — |
| Fuel storage | PESO licence | PESO | 1–3 months |
| AAI height NOC | Near airports | AAI | 1–2 months |
| Labour | BOCW registration and cess (1%), contract labour licence, Shops & Establishments; new Labour Codes | State labour dept | — |
| Occupancy certificate | After fire and structural completion | ULB | 1–3 months |

### 12. Economics

| Parameter | Unit | Typical | Source | I/C |
|---|---|---|---|---|
| Construction cost (excl. land and IT) | US$/W IT | Mumbai 6.64 (2025); Tokyo 15.2; Singapore 14.5; Silicon Valley 13.3 | Turner & Townsend DCCCI 2025 | I |
| India range | US$M/MW | 5.9–9.0 (five major cities) ≈ ₹56–86 crore/MW | Cushman & Wakefield APAC 2026 (via secondary source) | I |
| AI premium | % | 7–10% higher for liquid-cooled vs equivalent air-cooled facilities of similar IT capacity (US data) | Turner & Townsend 2025 | I |
| Cost inflation | %/yr | 5.5% (2025), down from 9.0% (2024) | Turner & Townsend | I |
| Capex split | % | Electrical 40–50%, mechanical 15–25%, building/civil 15–25%, fit-out/BMS/fire/security 10–15% (*indicative*) | QS benchmarks | I |
| Power tariff | ₹/kWh | Mumbai about US$0.0671/kWh (₹~5.9–6) cited by T&T; HT industrial typically ₹6–10 incl. duties; OA landed RE cost depends on charges | T&T 2025; SERC orders | I |
| O&M | % of capex/yr | 1.5–3% (*indicative*) | Industry | I |
| Insurance | % of insured value/yr | 0.1–0.3% (*indicative*); higher in seismic/cyclone zones | Market | I |
| Colocation pricing | ₹ or US$ per kW/month | Wholesale about US$80–130/kW/month (*indicative; verify with current market data*) | Brokers | I |
| Depreciation | years / rate | Companies Act Schedule II useful lives (buildings 30–60 yrs, plant 15 yrs, computers 3–6 yrs); IT Act block rates | Companies Act 2013; Income Tax Act | C |
| GST | % | 18% on most equipment and services; input credit on immovable property restricted | GST law | C |
| Financing | WACC % | 9–12% INR (*indicative*); infrastructure status eases lending | RBI harmonised master list | I |
| Risk metrics | NPV, IRR, CVaR | Monte Carlo on tariff, utilisation, capex overrun, water-permit risk | Model | I |

### 13. Construction and Delivery

| Parameter | Typical | Source | I/C |
|---|---|---|---|
| Procurement route | EPC/turnkey, design-build, EPCM, multi-package; owner-furnished long-lead equipment | Industry | I |
| Long-lead items | HV power transformers 12–36 months; MV switchgear 9–18; generators 12–24; chillers 6–12; UPS 6–12 (*indicative; volatile*) | Market | C |
| Schedule | Shell and core 9–15 months; fit-out 6–9 months per hall (*indicative*) | Industry | I |
| Commissioning levels | L1 factory acceptance → L2 site inspection/installation → L3 pre-functional/start-up → L4 functional performance → L5 integrated systems test (IST) with load banks | ASHRAE Guideline 0; Uptime; IGBC mandatory commissioning plan | C |
| IST | Full-load load-bank test, pull-the-plug utility failure, failure-mode scenarios | Uptime Tier Certification of Constructed Facility | C |
| Construction safety and dust | BOCW Act; IS 7969; C&D waste rules; dust-control norms (NCR GRAP) | BIS; MoEFCC; CAQM | C |

### 14. Operations and Maintenance

| Parameter | Typical | Source | I/C |
|---|---|---|---|
| Staffing model | 24×7 shift; critical engineers per shift scaled to MW | Uptime M&O Stamp of Approval; Tier Operational Sustainability | I |
| Maintenance strategy | Preventive, predictive (thermography, oil analysis, battery impedance), reliability-centred | NFPA 70B; vendor | I |
| SOPs / EOPs / MOPs | Documented procedures for every critical change | Uptime M&O | C |
| Generator testing | Monthly no-load or loaded runs; annual full-load bank test; DG run-hours capped by consent conditions (*verify SPCB*) | NFPA 110 (reference); SPCB | C |
| Capacity management | Power, cooling, space, weight tracked against stranded capacity | DCIM | I |
| Incident management | Root-cause analysis; CERT-In 6-hour reporting for cyber incidents | CERT-In | C |
| Outage frequency | About one in ten outages still causes serious or severe disruption (Uptime 2025) | Uptime 2025 | I |

### 15. Risk and Resilience

| Risk | Parameter | Source | I/C |
|---|---|---|---|
| Climate change | Shift in design DB/WB, flood return periods, cyclone intensity over a 25–30 yr asset life | IPCC AR6; IMD; CEEW notes siting now considers heat, flood and seismic risk | I |
| Single points of failure | Fault-tree / FMEA on every path; Tier "weakest subsystem" rule | Uptime | C |
| Supply chain | Lead-time distribution, single-source OEMs | Turner & Townsend warns of AI supply-chain strain | I |
| Regulatory change | E.g., IS 1893 revision issued and then withdrawn within about 3 months; NBC revision underway; HFC freeze 2028 | BIS; MoEFCC | I |
| Water permit risk | Probability of NOC denial or curtailment in critical/over-exploited units | CGWA | I |
| Grid curtailment | DISCOM load-shedding, OA curtailment, banking rule changes | SERC | I |

### 16. AI-Specific Design Considerations

| Parameter | Unit | Typical | Source | I/C |
|---|---|---|---|---|
| Rack power | kW | GB200 NVL72 about 120 kW (NVIDIA); 125–135 kW (Supermicro); HPE 132 kW nominal (115 liquid + 17 air); GB300 up to about 142 kW | OEM data via secondary sources | C |
| Liquid fraction | % heat to liquid | About 85–90% DLC, remainder air (HPE split 115/17 kW) | OEM | C |
| Rack weight | t | About 1.36 t; compute rack about 1,500 kg | OEM | C |
| Rack power delivery | V | 415 V three-phase to power shelves; about 50–54 V DC busbar in-rack | NVIDIA/OCP | C |
| CDU sizing | kW, N+1 | In-rack or in-row CDUs; facility water W32–W45 enables dry-cooler heat rejection | ASHRAE W-classes | I |
| Power transients | % swing, ms | Synchronised training steps; requires UPS/BESS sizing and DISCOM coordination | Emerging | C |
| Network fabric | Fibre counts, cable trays | Very high density; rack adjacency limits (copper NVLink reach) | OEM | C |
| Hybrid halls | % air vs liquid racks | Design for convertibility (manifold stubs, floor load, chilled-water taps) | Design | I |

### 17. End of Life and Circularity

| Parameter | Value | Source | I/C |
|---|---|---|---|
| E-Waste (Management) Rules 2022 | Notified 2 Nov 2022; effective 1 April 2023 | MoEFCC / PIB | C |
| Producer EPR recycling targets | 60% of waste generation (FY2023-24 and FY2024-25), 70% (FY2025-26 and FY2026-27), 80% from FY2027-28 | CPCB FAQ (23 Jan 2024) | C |
| Bulk consumer duty | An entity using ≥1,000 units of Schedule I EEE in a financial year must hand e-waste only to registered producers, recyclers or refurbishers (no portal registration needed) | CPCB FAQ | C |
| Battery Waste Management Rules 2022 | Published 24 Aug 2022; UPS/ESS batteries are "industrial batteries" | MoEFCC Gazette | C |
| Industrial battery collection targets (producers) | 40% (2022-23) → 50% (2023-24) → 60% (2024-25) → 70% (2025-26 onwards) of quantity placed on market three years earlier | BWMR 2022 Schedule II | C |
| Recycler material recovery (industrial) | 55% (2024-25), 60% (2025-26 onwards) | BWMR 2022 Rule 10(4) | C |
| Recycled content (industrial) | 35% (2027-28), 35% (2028-29), 40% (2029-30 onwards), per the 2024 amendment | BWMR (Second Amendment) 2024 (secondary confirmation) | C |
| Refurbishment / reuse | IT asset disposition, secure data wiping (NIST 800-88), reuse of switchgear and chillers | Industry | I |
| Decommissioning | Refrigerant recovery, fuel tank cleaning, site remediation | ODS Rules; SPCB | C |

---

## Consolidated Master Parameter Checklist

| Category | Parameter | Unit | Typical range / limit | Governing standard / source | I/C |
|---|---|---|---|---|---|
| Business | Workload segment | category | colo / hyperscale / AI / enterprise / edge / sovereign | Market | I |
| Business | Final IT load; phase size × count | MW | 1–500+; 4–20 MW × 3–6 | Business plan (*indicative*) | I |
| Business | Utilisation ramp | %/yr | 30→85% over 3–5 yrs | *indicative* | I |
| Business | Rack density distribution | kW/rack | mean 7.5; AI 40–150+ | Uptime 2025; T&T 2025 | I |
| Business | Availability class | Tier/Rated/AC | III/3 typical | Uptime; TIA-942; EN 50600 | I→C |
| Business | Latency target | ms | <5 edge; <10 metro | SLA | I |
| Site-power | Substation headroom; supply voltage; feeds | MVA; kV; n | ≥ IT × PUE × 1.2–1.5; 33–220; 2 | STU/DISCOM; supply code | I/C |
| Site-power | Grid reliability | SAIDI h/yr | site-specific | DISCOM | I |
| Site-power | GEOA eligibility; banking | kW; % | ≥100; ≥monthly, ≥30% | GEOA Rules 2022 | C |
| Site-power | OA charges | ₹/kWh | state-specific | SERC | C |
| Site-power | Grid EF | tCO₂/MWh | 0.710 (FY25) | CEA v21.0 | C |
| Site-water | GW unit category; raw water TDS/silica/Cl | class; mg/L | Safe→Over-exploited; site test | CGWA 2020; NABL | C/I |
| Site-climate | 0.4% DB / WB; max DP; TMY | °C; 8,760 h | DB 33–46; WB 27–30; DP 24–27 coastal | ASHRAE; ISHRAE | I |
| Site-climate | Climate shift 2050 | °C | +1–2 | IPCC/IMD (*indicative*) | I |
| Site-air | Corrosivity | ISA class | G1 required | ISA-71.04 | C |
| Hazard | Seismic zone / Z | — | II–V / 0.10–0.36 | IS 1893(1):2016 | C |
| Hazard | Basic wind speed | m/s | 33–55 | IS 875(3) | C |
| Hazard | Flood level / plinth; surge / SLR | m | HFL + freeboard | DCR; NDMA; CRZ | C |
| Hazard | Lightning; MAH/pipeline/airport distance | /km²/yr; km | site | IS/IEC 62305; MSIHC; AAI | C |
| Land | Area per MW; land cost | acre/MW; ₹ cr/acre | 0.2–2; site | *indicative*; market | I |
| Land | Zoning / FAR / setbacks | — | state DCR | State | C |
| Connectivity | Diverse fibre routes / IXP / CLS | n, km | ≥2 | TIA-942 | I |
| Policy | State incentives | ₹, % | stamp duty, ED, tariff subsidy | State policies | I |
| Arch | White-space live load | kN/m² | 12–25+ | IS 875(2); OEM | C/I |
| Arch | Clear height; column grid; white:grey | m; ratio | 4.5–6; 9–12; 1:1–1:2 | BICSI 002; practice (*indicative*) | I |
| Arch | Containment; roof plant load | —; kN/m² | hot-aisle; 7.5–15 | ASHRAE; design | I |
| Arch | Plinth above HFL; equipment lift | m; t | +0.6–1.0; ≥3–5 | Bye-laws; OEM | C |
| Elec | Topology | — | N+1, 2N, DR, BR | Uptime/TIA/EN 50600-2-2 | I |
| Elec | Transformer rating; fault level | MVA; kA | 10–80; 50–100 LV | IS 1180 / IEC 60076; IEC 61439 | C |
| Elec | UPS efficiency; battery autonomy | %; min | 94–99; 5–10 | IEC 62040-3; UL 9540A; NFPA 855 | I |
| Elec | Genset rating; fuel autonomy | —; h at N | continuous/unlimited standby; ≥12 | Uptime Tier Standard | C |
| Elec | DG emission norm; stack height | —; m | CPCB IV+ ≤800 kW; 0.2√kVA + h | CPCB | C |
| Elec | THDv; earthing; LPS; arc flash | %; Ω; LPL; cal/cm² | ≤5; ≤1; I–IV; study | IEEE 519; IS 3043; IS/IEC 62305; IEEE 1584 | C |
| Elec | PUE metering level | L1–L3 | PDU-level for IGBC | ISO/IEC 30134-2; IGBC | C |
| Elec | BESS size; AI load step | MWh; % | economics; tens of % | CEA; NFPA 855; OEM | I/C |
| Mech | IT inlet temp; humidity | °C; °C DP | 18–27 rec.; −9 to 15 DP, ≤60% RH | ASHRAE TC9.9 | C |
| Mech | Liquid W-class | °C | W17–W+ | ASHRAE | C |
| Mech | Air ΔT; CHW supply | K; °C | 10–20; 14–20 | Design | I |
| Mech | Chiller COP | — | 3–7+ | ECBC; AHRI | C |
| Mech | Tower approach/range; economiser hours | K; h/yr | 3–5 / 5–8; TMY | CTI; simulation | I |
| Mech | Cooling redundancy | N+X | N+1 / 2N | Uptime | C |
| Mech | Filtration | ISO 16890 | ePM1 50–70% | ISO 16890 | C |
| Mech | Refrigerant GWP / phase-down | % | freeze 2028; −85% by 2047 | Kigali; MoEFCC | C |
| Mech | Boundary noise | dB(A) | 75/70 industrial; 55/45 residential | Noise Rules 2000 | C |
| Mech | Seawater ΔT discharge | °C | ≤5–7 (*verify*) | CRZ 2019; SPCB | C |
| Water | Evaporation; drift; CoC | L/kWh_heat; %; — | 1.2–1.6; 0.0005–0.005; 3–10 | Physics; CTI; chemistry | C |
| Water | Make-up storage | h | ≥12 | Uptime | C |
| Water | WUE | L/kWh IT | 0–1.8+ | ISO/IEC 30134-9 | I |
| Water | ZLD; CGWA NOC / charges | y/n; ₹ | SPCB condition; area-dependent | SPCB; CGWA 2020 | C |
| Fire | Detection; suppression | — | aspirating; pre-action / clean agent / mist | NFPA 75/76, 2001, 750; NBC Part 4 | C/I |
| Fire | Separation rating; Li-ion ESS | h | 2; UL 9540A, NFPA 855 | NBC; EN 50600-2-1; NFPA | C |
| Security | Protection classes | 1–4 | per space | EN 50600-2-5 | C/I |
| Security | CERT-In reporting / logs; DPDP; MeitY empanelment | h / days | 6 / 180; Rules 2025; govt workloads | CERT-In 2022; MeitY | C |
| Network | Entrance rooms / MMRs; cabling | n | ≥2; TIA-568 / ISO 11801 | TIA-942; ISO | C/I |
| Metrics | Design PUE (annual and at 33% load) | — | ≤1.5 IGBC; 1.3–1.45 best-in-class India (*indicative*) | IGBC; ISO/IEC 30134-2 | C/I |
| Metrics | CUE; REF / ERF | kgCO₂/kWh; 0–1 | ≈ PUE × EF | ISO/IEC 30134-8/-3/-6 | C/I |
| Carbon | Scope 1; Scope 2 (location vs market); Scope 3 embodied | tCO₂e | CEA EF vs GEOA; embodied 20–50% (*indicative*) | GHG Protocol; EN 15978 | I/C |
| Approvals | EIA trigger | m² built-up | ≥20,000 (8(a)); ≥1,50,000 (8(b)) | EIA 2006 | C |
| Approvals | CTE/CTO; CRZ; fire NOC; inspectorate; PESO; AAI | — | — | SPCB; CRZ 2019; State/CEA/PESO/AAI | C |
| Approvals | Grid connection lead time | months | 6–24 | DISCOM/STU | C |
| Econ | Construction cost; AI premium; escalation | US$/W; %; %/yr | 6.64 Mumbai; 7–10; 5.5 | T&T 2025 | I |
| Econ | Tariff (grid, OA landed) | ₹/kWh | 6–10 | SERC | I |
| Econ | O&M, staff, insurance | %capex, FTE/MW | 1.5–3%; 0.5–2; 0.1–0.3% | *indicative* | I |
| Econ | Colo price; WACC | US$/kW/month; % | 80–130; 9–12 (*indicative*) | Brokers | I |
| Econ | Depreciation / GST; tax holiday | yrs / %; year | Sch. II; 18%; to 2047 | Companies Act; GST; Budget 2026-27 | C |
| Delivery | Long-lead times | months | transformers 12–36 | Market (*indicative*) | C |
| Delivery | Commissioning L1–L5 + IST | — | full-load IST | ASHRAE G0; Uptime | C |
| O&M | Generator test regime / run-hour caps; staffing | h/yr; FTE | SPCB conditions | SPCB; Uptime M&O | C/I |
| Risk | Climate-shifted design conditions; permit-denial probability | °C; % | — | IPCC/IMD; CGWA/SPCB | I |
| AI | Rack power / weight; liquid fraction | kW / t; % | 120–142 / 1.36; 85–90 | OEM | C |
| EoL | E-waste EPR target; bulk-consumer duty | %; units | 60→70→80; ≥1,000 EEE | E-Waste Rules 2022; CPCB | C |
| EoL | Battery collection / recovery / recycled content | % | 70 / 60 / 35–40 | BWMR 2022 + 2024 amendment | C |

---

## Recommendations for Your Model (What to Add First)

1. **Make availability class a decision variable with an explicit topology-to-cost mapping.** Map N+1, 2N and block redundancy onto equipment counts for transformers, UPS, gensets, chillers and CDUs. Add the 12-hour fuel and make-up-water storage constraints, sized at N load with redundant tanks excluded.
2. **Model rack density as a distribution and split heat by medium.** Air and liquid fractions should drive the cooling-technology choice per hall, not per site. Hybrid halls are the realistic AI case.
3. **Replace annual PUE with part-load PUE curves.** Use 8,760-hour TMY simulation at 25/50/75/100% IT load, aligned to the utilisation ramp. Report PUE at 33% load, because that is the IGBC test point.
4. **Add hard feasibility gates before optimisation:** CGWA assessment-unit category, EIA built-up threshold, CRZ applicability (for once-through seawater), CPCB IV+ applicability by genset size, seismic zone under IS 1893:2016, and AAI height limits.
5. **Couple the power model to the regulations.** Represent the GEOA banking cap (≥30% of monthly consumption, at least monthly settlement), state-specific OA charges, standby charges and curtailment risk. Report Scope 2 on both a location basis (CEA 0.710 tCO₂/MWh) and a market basis.
6. **Add schedule risk as a stochastic variable.** Include long-lead equipment and grid-connection lead times, so that NPV and CVaR capture delayed revenue.
7. **Close the water–salt balance with chemistry limits.** Cap CoC by silica, chloride and LSI for each raw-water source. Include ZLD capex and energy where SPCB conditions require it.
8. **Add Scope 1 refrigerant leakage and Scope 3 embodied carbon.** Include the HFC freeze in 2028 as a refrigerant-choice constraint.
9. **Add end-of-life cash flows.** Cover IT refresh cycles (3–6 years), battery replacement (VRLA 5–7 years, Li-ion 10–15 years, *indicative*), EPR-compliant disposal and residual values.

---

## Items Most Commonly Missed in Early-Stage Design Models

- **Part-load inefficiency during the ramp.** Facilities spend years at 20–50% load, where PUE is far worse than design.
- **Redundant capacity excluded from usable capacity.** For example, fuel and water storage counted at gross instead of N.
- **Dew point and gaseous contamination.** Coastal Indian monsoon dew points (24–27°C) and urban corrosivity often rule out airside economisers, regardless of dry-bulb.
- **Floor loading and delivery paths for AI racks.** That means about 1.36 t racks, freight lifts and door heights.
- **Grid-connection lead time and substation bay availability.** This is frequently the critical path, ahead of construction.
- **Make-up water storage, blowdown disposal and ZLD costs.** These are separate from WUE.
- **DG regulatory regime by size.** CPCB IV+ ≤800 kW versus larger sets, NCR dual-fuel or RECD, stack height and run-hour limits.
- **Seismic code volatility.** IS 1893:2025 was issued and then withdrawn within about three months, so designs should test sensitivity to a future zone upgrade.
- **Scope 2 market-based versus location-based divergence, and banking-period mismatch.** Monthly banking does not equal 24×7 carbon-free energy.
- **Refrigerant phase-down and leakage emissions.**
- **End-of-life EPR obligations and battery replacement capex.**
- **Cyber and regulatory operating obligations.** CERT-In 6 hours and 180-day logs, and DPDP, which affect SOC staffing and opex.

---

## Caveats

- **Indicative values.** Values marked *indicative* are engineering rules of thumb or market estimates, not standard-mandated limits. Calibrate them with project-specific vendor data, quantity surveyor benchmarks and state tariff orders.
- **Uptime's percentage-availability figures** (Tier I 99.671% to Tier IV 99.995%) are widely quoted in secondary sources but are not part of the current Uptime Tier Standard. Some secondary sources claim 72 or 96 hours of fuel for Tier III/IV. That conflicts with Uptime's own statement of a 12-hour minimum for all Tiers; treat longer autonomy as an owner choice.
- **Market-size figures differ by source and definition.** JLL reported 1,123 MW for H1 2025, CBRE about 1,530 MW for 9M 2025 and Savills 1,520 MW for end-2025.
- **Some values were confirmed only via secondary sources:** the Cushman & Wakefield India cost range, CGWA fee and audit details, DG stack-height minimums, the 2024 Battery Rules recycled-content table, and thermal-discharge limits for seawater cooling. Verify these against the original report, Gazette or SPCB before relying on them for compliance.
- **The regulatory landscape is moving.** This includes NBC revision, DPDP implementation, possible national data centre policy and CCTS scope expansion. Re-check approvals and incentives at the time of each phase decision.

## Sources

1. greencalculus — https://greencalculus.com/standards/iso-iec-22237-en-50600-data-centre-design/
2. uptimeinstitute — https://journal.uptimeinstitute.com/fuel-system-design-reliability/
3. uptimeinstitute — https://uptimeinstitute.com/resources/asset/accredited-tier-designer-technical-paper-series-engine-generator-ratings
4. constructandcommission — https://constructandcommission.com/data-center-uptime-tiers-explained/
5. simscale — https://www.simscale.com/blog/ashrae-90-4-data-center-standards/
6. ashrae — https://xp20.ashrae.org/datacom1_4th/ReferenceCard.pdf
7. ashrae — https://www.ashrae.org/file%20library/technical%20resources/bookstore/ashrae_tc0909_power_white_paper_22_june_2016_revised.pdf
8. greencalculus — https://greencalculus.com/standards/ashrae-tc-9-9-thermal-guidelines/
9. turnerandtownsend — https://www.turnerandtownsend.com/news/ai-data-centre-rush-raises-alarm-over-construction-supply-chain/
10. constructionweekonline — https://www.constructionweekonline.in/business/mumbai-second-most-cost-efficient-for-data-centre-construction-worldwide-study
11. datacenterdynamics — https://www.datacenterdynamics.com/en/news/roughly-one-third-of-data-center-owners-and-operators-doing-ai-training-or-inference-uptime-institute/
12. greenbusinesscentre — https://dcs.greenbusinesscentre.com/assets/files/2.pdf
13. lbl — https://datacenters.lbl.gov/sites/default/files/2_IGBC%20DC%20Rating%20System_Gen%20Presentation%2013%20Feb%2019_Mr%20Shivraj%20DHaka.pdf
14. ieefa — https://ieefa.org/resources/impact-green-energy-open-access-rules-2022
15. argus-p — https://www.argus-p.com/updates/updates/electricity-promoting-renewable-energy-through-green-energy-open-access-rules-2022/
16. solarquarter — https://solarquarter.com/2022/06/07/power-ministry-issues-green-energy-open-access-rules-2022/
17. environmentclearance — https://environmentclearance.nic.in/writereaddata/EIA_notifications/2006_09_14_EIA.pdf
18. pib — https://www.pib.gov.in/newsite/PrintRelease.aspx?relid=155550
19. bhoojalsurvey — https://bhoojalsurvey.in/cgwa-noc-maharashtra.php
20. fao — https://faolex.fao.org/docs/pdf/IND209982.pdf
21. ceew — https://www.ceew.in/publications/how-is-data-centre-infrastructure-in-india-shaping-power-and-water-use
22. Wikipedia — https://en.wikipedia.org/wiki/Data_center_tiers
23. fibermall — https://www.fibermall.com/blog/nvidia-gb200-superchip.htm
24. attom — https://attom.tech/wp-content/uploads/2019/11/Tier-Standard-For-Micro-Data-Center.pdf
25. acma — https://www.acma.in/uploads/ciculer-attachement/Electricity%20(Promoting%20Renewable%20Energy%20through%20Green%20Energy%20Open%20Access)%20Rules,2022.pdf
26. reclimatize — https://reclimatize.in/india-grid-emission-factor-cea-ccts/
27. carbonneeti — https://carbonneeti.com/blog/cea-grid-emission-factors-explained
28. drishtiias — https://www.drishtiias.com/daily-updates/daily-news-analysis/rollback-of-seismic-code-of-2025
29. visionias — https://visionias.in/current-affairs/upsc-daily-news-summary/article/2026-03-07/the-economic-times/environment/bis-revokes-new-seismic-map-with-high-risk-zone-vi
30. scribd — https://www.scribd.com/document/879968761/It-Policy-2023-Maharashtra-promotion-of-Data-Centers
31. cbre — https://www.cbre.co.in/insights/reports/india-s-data-centre-market-in-a-new-era
32. moduledge — https://www.moduledge.com/blog/nvidia-blackwell
33. introl — https://introl.com/blog/gb200-nvl72-deployment-72-gpu-liquid-cooled
34. svaainfo — https://svaainfo.com/2025/09/17/think-your-dg-set-installation-is-compliant-heres-what-you-must-know-about-approval-requirements/
35. radiantpower — https://www.radiantpower.in/understanding-cpcb-iv-norms-what-they-mean-for-diesel-generator-users-in-india/
36. sudhirpower — https://www.sudhirpower.com/sudhir-power-ltd-blogarticle-analysis-by-experts-2/
37. continuumlabs — https://training.continuumlabs.ai/infrastructure/servers-and-chips/nvidia-gb200-nvl72
38. parivesh — https://parivesh.nic.in/publicdocument/UPLOAD_OM_NOTIFICATION/IA_DOCS/1002_07042026062522.pdf
39. climatepolicydatabase — https://climatepolicydatabase.org/policies/cooling-action-plan-icap
40. realenviroservices — https://realenviroservices.com/understanding-cgwa-regulations-applicability-compliance-and-requirements/
41. tuv-nord — https://www.tuv-nord.com/us/en/services/data-centers/en50600/
42. epi-certification — https://www.epi-certification.com/services/1/3/126/
43. ardentprivacy — https://www.ardentprivacy.ai/blog/how-to-comply-with-the-cert-in-6-hours-timeline/
44. adayptus — https://www.adayptus.com/blog/cert-in-6-hour-incident-reporting
45. complydp — https://www.complydp.com/articles/dpdp-compliance-for-cert-in-aligned-companies
46. osto — https://www.osto.one/resources/guides/cert-in-incident-reporting/
47. cybersigmacs — https://cybersigmacs.com/national-cyber-compliance-india/
48. sirilawllp — https://sirilawllp.com/a-comprehensive-guide-to-indias-cert-in-6-hour-cyber-incident-reporting-mandate/
49. veritect — https://veritect.ai/digital-data-ai-law/cert-in-6-hour-incident-reporting-sop
50. energy — https://www1.eere.energy.gov/manufacturing/datacenters/pdfs/task_force_metrics_recommendations.pdf
51. mondaq — https://www.mondaq.com/india/real-estate/1360458/it-ites-policy-of-maharashtra-2023-pivotal-for-it-industry
52. x — https://x.com/kishanreddybjp/status/2018195343352189059
53. kpmg — https://assets.kpmg.com/content/dam/kpmgsites/in/pdf/2026/02/technology-pov-union-budget-2026-27.pdf
54. realtynmore — https://realtynmore.com/mumbai-worlds-second-cost-effective-region-for-data-centre-construction-in-2025-says-turner-townsend/
55. techi — https://www.techi.com/data-center-cost-by-country/
56. irei — https://irei.com/news/turner-townsen-releases-data-center-construction-cost-index/
57. uptimeinstitute — https://intelligence.uptimeinstitute.com/resource/uptime-institute-global-data-center-survey-2025
58. digitechspire — https://digitechspire.com/data-center-tiers-behind-the-numbers/
59. pantheon — https://pantheon.run/learn/nvidia-gb200-nvl72-power-and-cooling
60. insidedeeptech — https://www.insidedeeptech.com/gb200-nvl72-nvidia-ai-rack-full-guide/
61. Substack — https://axautikgroupllc.substack.com/p/here-is-how-much-power-we-expect
62. azbpartners — https://www.azbpartners.com/bank/e-waste-management-rules-notified/
63. cpcb — https://cpcb.nic.in/uploads/Projects/E-Waste/FAQ_ewaste_23012024.pdf
64. pib — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2205804&reg=3&lang=1
65. gemrecycling — https://gemrecycling.com/wp-content/uploads/2023/04/Battery-Waste-Mgmnt-Rules-2022.pdf
66. alephindia — https://alephindia.in/battery-waste-management-second-amendment-rules.php
67. carbonneeti — https://carbonneeti.com/blog/bee-emission-factors-2024-2025-reference
68. igbc — https://igbc.in/frontend-assets/html_pdfs/IGBC%20Green%20Data%20Centre%20rating%20_adenda_1_2017.pdf
69. spheron — https://www.spheron.network/blog/nvidia-gb200-nvl72-guide/
70. datatrustindia — https://datatrustindia.com/frameworks/cert-in
71. backuppower — https://backuppower.ai/data-centers/uptime-institute-tier-requirements/
