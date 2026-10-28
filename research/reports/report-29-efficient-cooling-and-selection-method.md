<!-- Report 29 of the India Data Centre Atlas research series (Efficient cooling and a formula-based cooling-selection method). Produced with AI-assisted web research, Oct 2026, and kept as written at the time. The atlas standards register (src/data/standards.js) is authoritative where figures differ (for example India grid water 2.9 L/kWh and grid CO₂ 0.675 t/MWh after the October 2026 corrections). -->

# Efficient Data-Centre Cooling and a Formula-Based Cooling-Selection Method for the India Data Centre Atlas (Bengaluru focus)

The most effective way to cut cooling energy and water is to make the heat leave the building as hot as possible. That means containing airflow, raising supply air and water temperatures, and for AI halls running warm-water (W40–W45) direct liquid cooling into dry coolers, with evaporation used only as a peak-hour assist. The right cooling system can be chosen with one decision function: hard feasibility filters, then PUE/WUE/CUE per MWh of IT, then TCO with shadow prices for water and carbon. Running that function on the atlas data gives three answers: DLC with dry coolers (with an optional adiabatic assist) for Bengaluru AI halls; water-cooled towers for a Chennai colo only if water is valued below roughly ₹520/kL; and cooling towers losing to dry systems on total (site + grid) water in every case tested.

## TL;DR
- **Strategies:** The biggest proven levers are airflow containment, higher setpoints, economisation, variable-speed equipment with good controls, warm-water liquid cooling and removing idle IT. Reported figures: containment cuts fan energy 20–25%; each +1 °C of supply temperature saves 2–5% of cooling energy (IMDA, SS 697); Google's 2016 DeepMind blog says ML control "consistently" achieved a 40% cut in cooling energy, equal to a 15% cut in PUE overhead; cold plates and immersion cut life-cycle water 31–52% versus air (Microsoft, *Nature* 2025).
- **Selection formula:** Choose the option that minimises annualised cost = CRF × capex + energy × tariff + kVA × demand charge + on-site water × water shadow price + facility energy × grid factor × carbon price, among options that pass the density, climate, water and OEM filters. Use weighted MCDA (AHP/TOPSIS) only for criteria that cannot be priced, such as reliability and footprint.
- **Worked results:**
  - **10 MW and 100 MW Bengaluru AI halls:** DLC + adiabatic beats DLC + dry while water costs less than about ₹1,100/kL (about ₹1,670/kL at a ₹8,000/t carbon price). DLC + towers wins only below about ₹95/kL.
  - **20 MW Chennai colo:** the winner changes with the water price. Towers win at ₹99/kL, indirect evaporative cooling (IEC) at ₹500/kL, and air-cooled free-cooling chillers at ₹2,000/kL.
  - **Total water:** with Karnataka grid water at 2.0 L/kWh, dry DLC always uses the least total water.

## Key Findings

1. **Air management comes first; it makes every other saving possible.** LBNL/FEMP guidance is that hot/cold aisle separation and containment can cut fan energy by 20–25% and chiller energy by about 20%. Schneider reports that retrofitting hot-aisle containment into a raised-floor hall can save 40% of annual cooling energy, a 13% cut in annualised PUE. Containment does not save energy by itself. It "enables" savings that are then "realised" by raising supply temperature and slowing fans.
2. **Setpoint increases are the cheapest lever, but sources disagree on the size per degree.**
   - IMDA's SS 697 claims 2–5% cooling-energy savings per +1 °C.
   - Digital Realty raised two 4.5 MW Singapore halls by 2 °C, which IMDA (June 2023) said cut total energy use in those halls by approximately 2–3% over the trial period (total energy, not cooling energy).
   - An older ENERGY STAR figure, cited by LBNL, says 4–5% of energy cost per 1 °F at the server intake.
   - Chiller-only rules of thumb are 1–2% per °F for constant-speed chillers and 2–4% per °F for variable-speed chillers.
   - The atlas should use 2–4% of cooling energy per °C as a central range. The upside stops where server fans speed up: DOE notes a 30% fan-speed rise from 25 °C to 33 °C inlet, which more than doubles server fan power.
3. **Bengaluru's climate suits warm-water dry cooling.** With W45 liquid (about 41 °C facility water) and a 5–8 K dry-cooler approach, heat can be rejected dry whenever outdoor dry-bulb is at or below about 33–36 °C. Bengaluru's 0.4% design dry-bulb is 34.7 °C, so dry rejection is feasible in practically all hours (estimate; confirm with hourly bins). Evaporation is needed only as a short peak assist.
4. **Liquid cooling is mandatory for current AI racks, and the warm water it uses is what removes chillers.** NVIDIA specifies its MGX racks (GB200 to Vera Rubin) for coolant at up to 45 °C at the rack inlet, returning at about 55 °C. The Vera Rubin POD design includes valves that bypass the chiller plant entirely. About 20% of rack heat still goes to air: a Chilldyne NVL72 reference design splits 126 kW as 100 kW liquid and 26 kW air. Residual air handling is therefore not optional.
5. **On total water, cooling towers lose almost everywhere in India's current grid.** Break-even grid water intensity, (WUE_wet − WUE_dry)/(PUE_dry − PUE_wet), is:
   - 35 L/kWh for DLC + towers versus DLC + dry;
   - 6.7 L/kWh for DLC + adiabatic versus DLC + dry;
   - 14.6 L/kWh for towers versus air-cooled chillers in Chennai.
   All are well above Karnataka's 2.0 and India's 5.0 L/kWh. Dry systems therefore use less total water even though they draw more grid power.
6. **The local water picture is severe, which justifies a high water shadow price.**
   - Bengaluru Urban district's groundwater stage of extraction was 186.7% (over-exploited), second only to Kolar (193.35%), according to Deccan Herald's 8 Oct 2025 report on CGWB's 2024 assessment; the Karnataka state average was 68.44%.
   - Chennai district's was 127.47% (2023).
   - India's national average was 59.26% (CGWB 2023) and 60.63% in the 2025 assessment.
7. **Monetised TCO and MCDA can disagree.** Weighted-sum scoring that gives energy, carbon and cost separate weights counts energy twice and favours the low-PUE evaporative option even at ₹2,000/kL. The fix: price everything that can be priced, and use AHP/TOPSIS only for what cannot.

## Part 1 — Strategies for efficient cooling

### 1.1 Airflow management
- **Containment.** Use hot-aisle or cold-aisle containment with blanking panels and sealed cable cut-outs. Hot-aisle containment gives a hotter return, which means more economiser hours and lets the hall itself act as the cold plenum. Cold-aisle containment is usually easier to retrofit. Partial measures help too: LBNL notes "enough" containment, such as baffles above racks, can stop bypass and recirculation without full enclosure.
- **Raised floor vs overhead.** DOE recommends at least 24 inches of clear under-floor height, perforated tiles only in cold aisles and matched to IT demand, and regular cable mining. Overhead supply should use diffusers that "dump" air straight down, which reduces cold-aisle stratification compared with under-floor supply. High under-floor velocity can create negative pressure at tiles near CRAH units.
- **Central air handlers beat distributed CRACs.** DOE's comparison of two adjacent large facilities found the central-AHU site used almost two-thirds of its power on IT, versus just over one-third for the site with distributed CRACs. It recommends low-pressure-drop air paths. Airflow-efficiency benchmarks are 1.25 W/cfm (standard), 0.75 (good) and 0.5 (better).
- **Fan affinity.** A 20% airflow reduction gives about 50% fan-power savings (P ∝ N³), so containment should always be paired with fan VFDs or EC fans.
- **CFD and the Rack Cooling Index (RCI)** confirm inlet compliance: RCI of 100% means no inlet above the recommended range, and below 90% is poor. Control supply temperature on IT inlet temperature, not return temperature.

### 1.2 Temperature and humidity setpoints
- **ASHRAE TC 9.9 (5th ed., 2021).** Recommended inlet range is 18–27 °C for classes A1–A4. Allowable dry-bulb ranges are A1 15–32 °C, A2 10–35 °C, A3 5–40 °C and A4 5–45 °C. Humidity limits run from 8% RH up to 80–90% RH depending on class, with the recommended maximum of 70% RH falling to 50% where corrosive gases are present. Class H1 covers high-density air-cooled equipment with tighter limits.
- **Liquid classes** are now named W17, W27, W32, W40, W45 and W+.
- **DOE practice.** Target the most demanding inlet at about 25–26 °C (a 77–79 °F supply setpoint), specify A2-or-higher equipment, and raise temperatures only after air management is in place.
- **Humidity.** Run coils above the dew point (chilled water above about 10 °C) to stop "phantom" dehumidification. Stop neighbouring units fighting each other with centralised humidity control. Where humidification is still needed, use adiabatic or ultrasonic units: about 30 W per lb of water versus about 430 W for electric resistance.
- **Tropical guidance.** Singapore's SS 697:2023 gives a roadmap to 26 °C and above. SS 715:2025 requires covered IT equipment to run safely at up to 35 °C. India has no equivalent; the atlas should recommend adopting SS 697-style practice for hot-humid Indian cities.

### 1.3 Economisation
- **Airside.**
  - Direct outside air uses the least energy where air quality and humidity allow. It needs MERV 13 filtration and dew-point lockouts.
  - Indirect air-to-air or IEC units avoid contamination.
  - For Indian cities with high PM and monsoon humidity, indirect is the safer default (estimate).
  - Airside economisers are hard to retrofit because of duct size.
- **Waterside.** DOE says waterside free cooling suits climates with wet-bulb below 55 °F (12.8 °C) for 3,000 or more hours a year, which Bengaluru and Chennai do not have for conventional 7–10 °C chilled water. Raising chilled water to 10–15 °C significantly increases economiser hours (Schneider WP132). Schneider's comparative modelling found full-economiser hours ranging from 4,705 to 7,074 depending on architecture. The economiser heat exchanger should sit in series, upstream of the chillers, so partial economisation also counts.
- **Practical implication for India.** Economisation pays mainly through warm-water liquid loops (W32–W45), not cold air or water. With facility water at 30–41 °C, dry coolers handle most or all Bengaluru hours.

### 1.4 Efficient equipment
- **Chillers and plant.**
  - Use VFD water-cooled chillers with condenser-water reset.
  - Oversized towers with VFD fans give a smaller approach.
  - A 5–7 °F approach tower plant works well.
  - Chiller efficiency improves 1–2% per degree of lower condenser water.
  - Cooling-system benchmarks are 1.1 kW/ton (standard), 0.8 (good) and 0.6 (better).
  - Magnetic-bearing (oil-free) centrifugal chillers improve part-load kW/ton. No independent quantified source was gathered for this report, so treat vendor claims as unverified.
- **Pumps.** Use primary-only variable flow, 2-way valves, differential-pressure setpoint reset, untrimmed impellers with VFDs, and run redundant pumps at lower speed.
- **Fans.** Use EC/VFD fans and fan walls, and control on under-floor or containment differential pressure.
- **Adiabatic pre-cooling** on dry coolers or air-cooled condensers: leaving air temperature ≈ DB − ε(DB − WB), with ε ≈ 0.7–0.9 (estimate).
- **Refrigerants.** Prefer low-GWP refrigerants. EU taxonomy-aligned criteria require attention to refrigerant GWP. India's HFC phase-down under Kigali points the same way.

### 1.5 Liquid cooling and warm-water design
- **Technology classes (DOE).**
  - Rear-door heat exchangers and close-coupled in-row/overhead coils.
  - Cold plates, which need a CDU.
  - Single-phase and two-phase immersion.
- **Microsoft's peer-reviewed cradle-to-grave LCA** (*Nature*, 2025) found cold plates and both immersion types cut GHG by 15–21%, energy demand by 15–20% and blue water by 31–52% versus air cooling. Teresa Nick, Microsoft's director of natural systems and sustainability, said: "It was interesting to see that cold plates could be as good as the two immersion cooling methods." The study covered CPU servers, not AI GPUs. Microsoft does not use immersion in production, partly because two-phase fluids are PFAS.
- **Flow and temperatures in practice.** One vendor's NVL72 rack (QCT) removes 75 kW at 110 L/min (about 1.47 L/min per kW), 45 °C maximum inlet and 65 °C maximum return.
- **Capex.** Schneider WP282 found immersion capex comparable to air at 10 kW/rack, about 10% lower at 20 kW/rack and 14% lower at 40 kW/rack, for a 2 MW site.
- **Design rule.** For AI halls, design the facility loop for W40–W45 so heat can be rejected dry, without chillers. Keep a small trim chiller or adiabatic assist for the residual air load and peak hours.

### 1.6 Controls and operations
- **AI optimisation.** Google's 2016 DeepMind blog says the ML system was able to "consistently achieve a 40 percent reduction in the amount of energy used for cooling, which equates to a 15 percent reduction in overall PUE overhead". Since 2018 the system has controlled cooling directly, with operator oversight. Results depend on dense sensing and site-specific models, so treat 40% as an upper bound for other sites, not a typical value.
- **Other controls.**
  - Reset supply temperature from IT inlet sensors.
  - Control fan speed on differential pressure.
  - Reset chilled water upward at low load.
  - Optimise chiller and tower staging for part-load operation.
- **Commissioning and retro-commissioning, metering and DCIM.** "You cannot manage energy without monitoring energy" (LBNL). Sensor accuracy matters: ±1.5 °F sensors are useless for measuring a 5 °F ΔT.
- **Uptime context.** Uptime Institute's 2025 Global Data Center Survey (800+ respondents, April–May 2025) reported a weighted-average PUE of 1.54, flat for six years, and its 2026 survey reports an industry average of 1.52. Facilities built in the last five years averaged 1.48, and those over 20 MW about 1.44. Google's fleet averaged 1.09 in 2025.

### 1.7 Water efficiency
- **Basic water balance.** Evaporation carries 75–80% of a tower's heat load. Makeup = evaporation + drift + blowdown, and blowdown = E/(CoC − 1).
- **Raising cycles of concentration** from 3 to 6 cuts makeup by 20% (from 1.5E to 1.2E). This needs softening/RO pretreatment and better scale and corrosion control.
- **Other measures.**
  - Use municipal treated wastewater (₹40–75/kL) instead of potable water.
  - Reuse blowdown after RO.
  - Harvest rainwater.
  - Run hybrid/adiabatic coolers "dry-first", spraying only above a dry-bulb threshold.
- **LBNL (Lei et al., 2025)** ranks the drivers of water use per workload as server efficiency, grid water intensity and other factors. Off-site grid water usually exceeds on-site water for dry and adiabatic designs.

### 1.8 Heat reuse, thermal storage and load shifting
- **Heat reuse.** ERF and ERE capture it. The EU Energy Efficiency Directive requires data centres above 1 MW to use waste heat where technically and economically feasible. In Bengaluru there is little demand for space heating, so the realistic heat users are process heat, absorption chilling for nearby offices, and pre-heating domestic hot water (estimate).
- **Thermal storage (TES).** DOE notes that chilled-water TES cuts peak demand, improves reliability, can be charged by towers in cool, dry nights, and doubles as backup makeup water. Under the KERC ₹365/kVA-month demand charge, each 1,000 kVA of peak avoided saves ₹43.8 lakh a year.

### 1.9 IT-side measures
- **Zombie servers.** Koomey and Taylor (Koomey Analytics/Anthesis, using TSO Logic data) found 30% of about 4,000 enterprise servers across five facilities comatose in their 2015 study. Their 2017 follow-up, with about 16,000 servers, found "zombie servers are 25% of the total", and about 30% of virtual machines were also comatose.
- **Efficient servers.** ENERGY STAR servers are on average about 30% more efficient. Doubling utilisation from 20% to 30% raises server efficiency by about 50%.
- **Power chain.** Moving UPS efficiency from 90% to 95% saved 768,421 kWh a year in DOE's 1.5 MW example.
- **Other measures.** Higher-temperature-rated IT (A3/A4, SS 715's 35 °C) and power capping both reduce the cooling peak.

### 1.10 Site, building and phasing
- Place intakes on the shaded side, use cool roofs and shading, and allow adequate dry-cooler yard or roof area (dry coolers need far more area than towers).
- Build in modules so cooling plant runs near its design load rather than at 20–30% part load.

### 1.11 India-specific notes
- **Temperate upland (Bengaluru, ASHRAE 169 zone ~1A, estimate).**
  - Use W40–W45 DLC with dry coolers and an adiabatic assist.
  - For air halls, use CRAH with free-cooling air-cooled chillers at 10–15 °C chilled water.
  - Monsoon wet-bulb limits evaporative gain (design evaporation WB 23.5 °C).
- **Hot-humid coastal (Chennai and Mumbai, zone ~0A, estimate).**
  - High wet-bulb weakens IEC.
  - Towers are energy-efficient but face severe water stress.
  - Corrosive and saline air argues for indirect systems and gas-phase filtration.
- **Hot-dry interior (Hyderabad, Nagpur, Delhi summer).** Adiabatic and evaporative systems perform well but water is scarce, so use dry-first hybrids.
- **Policy.**
  - ECBC applies to data centres; LBNL published an ECBC user guide for data centres in 2021.
  - BEE has PUE benchmarks under ECBC and Super-ECBC.
  - MeitY AI-cloud tenders have required PUE below 1.35 since 2024. Leading Indian operators report PUE of 1.4–1.5 (SBI sector report, April 2026).
- **Air quality.** Use MERV 13 or better, plus gas-phase filtration where corrosion coupons show high reactivity.

### 1.12 Strategy table

| Strategy | Typical savings (reported unless marked est.) | Cost / payback | Climate and retrofit applicability | Source |
|---|---|---|---|---|
| Hot/cold aisle containment + blanking + sealed cut-outs | Fan energy −20–25%; chiller −~20%; HAC retrofit −40% cooling energy, −13% PUE | Low–moderate; payback typically <2 yr (est.) | All climates; retrofit and new | LBNL/FEMP; Schneider |
| VFD/EC fans on containment ΔP | −20% flow ≈ −50% fan power | Low; <2 yr (est.) | All; retrofit | LBNL "Small DCs" |
| Raise supply air to 25–27 °C (SS 697 ≥26 °C) | 2–5% of cooling energy per °C; DLR Singapore +2 °C → ~2–3% total energy (IMDA) | Near zero | All; retrofit after containment | IMDA SS 697; DCD |
| Raise chilled water to 10–15 °C / reset | Chiller 1–2%/°F (constant speed), 2–4%/°F (VSD); more economiser hours | Low | All | ACHR News; Schneider WP132/WP227 |
| Waterside economiser | Large where WB <12.8 °C for 3,000+ h; small in Bengaluru/Chennai at low CHW | Moderate | Cool/dry; marginal in Indian cities unless warm water | DOE 2024 guide |
| Eliminate tight humidity control; adiabatic humidifiers | 430 W → 30 W per lb water humidified | Low | All | DOE 2024 guide |
| Central AHU vs distributed CRAC | IT share of power ~2/3 vs ~1/3 in a paired comparison | New build | All; new | DOE 2024 guide |
| ML/AI plant optimisation | Cooling −40% ("consistently", Google 2016); PUE overhead −15% | Software + sensors | All; best on large plants | Google DeepMind |
| Direct liquid cooling (cold plate) | Life-cycle GHG −15–21%, energy −15–20%, water −31–52% vs air (incl. immersion) | Comparable capex ≥20 kW/rack (immersion data) | All; new halls, mandatory for NVL72 | Microsoft/Nature 2025; Schneider WP282 |
| W40–W45 warm water + dry coolers (chiller-less) | WUE ≈ 0.05 L/kWh; PUE ~1.15 (atlas est.) | Dry cooler area/capex up; chiller capex down | Bengaluru excellent; hot-humid good | NVIDIA MGX spec; atlas |
| Raise tower CoC 3 → 6 (with RO/softening) | Makeup −20% | Treatment opex | Tower sites | Water balance (derived) |
| Treated wastewater for makeup | Potable demand −~100% for towers; cost ₹40–75/kL vs ₹99 | Pipeline/treatment | Cities with STP supply | Atlas tariffs |
| Chilled-water TES | Peak kVA cut; ₹43.8 lakh/yr per 1,000 kVA at KERC | Tank capex | All; best with ToD tariffs | DOE; KERC (derived) |
| Remove zombie servers | 25% of ~16,000 servers (2017); 30% of ~4,000 (2015); ~30% of VMs | Very low | All | Koomey & Taylor |
| ENERGY STAR / higher utilisation | ~30% server efficiency; ~50% at 20→30% util. | Procurement | All | DOE 2024 guide |
| UPS 90→95% | 768,421 kWh/yr in 1.5 MW example | Replacement cycle | All | DOE 2024 guide |

## Part 2 — Formula compendium

### 2.1 Thermal formulas
- **Heat load:** Q_cool (kW) = P_IT + P_UPS/PDU losses + lighting + envelope/solar gains + people + (fan heat for air systems). For DLC: Q_liquid = f_liq × P_IT, and Q_air = (1 − f_liq) × P_IT + other gains. Typical f_liq is 0.75–0.85; Chilldyne's NVL72 design uses 100/126 = 0.79.
- **Airflow:** CFM = 3.16 × W / ΔT(°F) at sea level. In SI, V (m³/s) = Q / (ρ c_p ΔT), with ρ ≈ 1.2 kg/m³ and c_p ≈ 1.005 kJ/kg·K. Example: 1 kW at ΔT 12 K needs 0.069 m³/s (≈146 CFM). At Bengaluru's ~920 m elevation, ρ is about 10% lower, so airflow rises by ~10% (estimate).
- **Liquid flow:** L/min per kW = 60 / (ρ c_p ΔT) with ρ in kg/L and c_p in kJ/kg·K. Water at ΔT 10 K gives ≈1.43 L/min/kW; PG25 (c_p ≈ 3.9) gives ≈1.5. This matches QCT's 1.47 L/min/kW.
- **Chiller:** COP = Q_evap/P_input, and kW/ton = 3.517/COP. A COP of 5.86 equals 0.6 kW/ton.
- **Fan and pump affinity laws:** Q ∝ N, ΔP ∝ N², P ∝ N³.
- **Approaches:**
  - Dry cooler: T_fluid,out = T_db + approach (typically 5–8 K).
  - Adiabatic: T_air,in = T_db − ε (T_db − T_wb), then add the dry approach.
  - Tower: T_cw = T_wb + approach (typically 3–4 K for oversized towers, 5–7 °F per DOE).
  - CDU: T_facility = T_rack,inlet − CDU approach (typically 2–4 K).
- **Free-cooling hours:** H_fc = Σ_h 1[T_amb,h ≤ T_supply − Σ approaches], using DB for dry and WB for evaporative systems. Partial hours count when T_amb < T_return.
- **Climate feasibility test (design-day):** T_db,0.4% + approach_dry ≤ T_facility,supply means dry-only is feasible. Otherwise check T_wb,evap + approach_wet. Otherwise mechanical trim is required.

### 2.2 Efficiency metrics
- **PUE** = E_facility/E_IT = 1 + c_cool + c_elec + c_misc, where each c is that load's energy divided by IT energy.
- **Cooling partial PUE:** pPUE_cool = (E_IT + E_cool)/E_IT.
- **ASHRAE 90.4 annualised MLC** = Σ(mechanical energy at 25/50/75/100% load − heat recovered)/Σ(IT energy at the same loads). It must not exceed the climate-zone maximum. MLC + ELC is roughly PUE − 1, but ASHRAE warns the two are not comparable to PUE. Example maxima: IECC 2021 adopts annualised MLC of 0.18 for zone 1A and 0.19 for zone 0A.
- **Airflow efficiency** = fan W / CFM. **Cooling efficiency** = cooling kW / tons of load.
- **ERE** = (E_facility − E_reuse)/E_IT = PUE × (1 − ERF), where ERF = E_reuse/E_facility.

### 2.3 Water formulas
- **WUE_site** = annual site water (L) / E_IT (kWh).
- **WUE_source** (total) = WUE_site + PUE × EWIF, where EWIF is grid water intensity in L/kWh (Karnataka 2.0, India 5.0).
- **Total water per MWh IT** (m³) = WUE + PUE × EWIF.
- **Tower evaporation:**
  - E ≈ 0.00085 × flow(gpm) × range(°F), i.e. about 1% of flow per 10 °F (5.5 °C) of range.
  - Per unit of heat: E ≈ 26.55 gal/day per ton ≈ 1.19 L per kWh_th rejected.
  - Thermodynamic bound: E = Q/h_fg ≈ 3,600/2,430 ≈ 1.48 L/kWh_th at 100% latent rejection, about 1.1–1.2 at 75–80% latent.
- **Makeup** M = E + D + B, with B = E/(CoC − 1) − D, so M ≈ E × CoC/(CoC − 1). Drift D is about 0.02% of flow for modern eliminators.
- **Check against the atlas.** A water-cooled chiller plant rejects about 1.2 kWh_th per kWh IT. At CoC 4 that gives 1.2 × 1.19 × 4/3 ≈ 1.9 L/kWh IT, consistent with the atlas tower WUE of 1.8.
- **Break-even grid water intensity** (dry vs wet): EWIF* = (WUE_wet − WUE_dry)/(PUE_dry − PUE_wet).
- **Scarcity weighting:** WSF (m³ world-eq) = Σ V_i × CF_AWARE,i. AWARE factors run from 0.1 to 100. The world consumption-weighted averages are 43 (unknown use) and 20 (non-agricultural). India and Cauvery-basin factors were not confirmed for this report and must be read from the WULCA dataset; use non-agricultural, basin-level and preferably monthly values.
- **Proposed local shadow-price rule (atlas convention, not a published standard).** Set p_w by CGWB category: safe ≈ tariff (₹99); semi-critical ₹250; critical ₹500; over-exploited ₹1,000–2,000/kL.

### 2.4 Carbon formulas
- **CUE** = (E_facility × EF)/E_IT = PUE × EF for an all-grid site.
- **CO₂** = Σ_h E_facility,h × EF_h. Prefer hourly factors: Karnataka's hourly mean is about 0.47 t/MWh, and adiabatic or chiller trim runs in sunny afternoons when EF_h is lower (estimate).
- **CEA weighted-average factors.** CEA v20.0 gives 0.727 t/MWh for FY 2023-24, and V21.0 gives 0.7117 for FY 2024-25. CEA's baseline database page lists Version 22.0. Carbon Neeti (updated 7 Oct 2026) reports it as 1,189.04 million tonnes of CO₂ over 1,761.28 billion units, or 0.675 t/MWh for FY 2025-26; this has not yet been checked against CEA's own files. The atlas's 0.71 sits between these values.

### 2.5 Economic formulas
- **Capital recovery factor:** CRF = i(1+i)^n/((1+i)^n − 1). At i = 10% and n = 15, CRF = 0.1315, and the present value of ₹1/yr is 7.606.
- **Annual cost:** AC = CRF × Capex + O&M + E_facility × tariff + kVA_peak × ₹365 × 12 + V_site × p_w + CO₂ × p_c. kVA_peak ≈ P_IT,design × PUE_peak / pf.
- **Levelised cost of cooling (LCOC)** = (CRF × Capex_cool + O&M_cool + E_cool × tariff + water) / annual heat removed (₹/kWh_th), or divided by kW IT for ₹ per kW-IT-year.
- **Payback** = ΔCapex/ΔAnnual savings. NPV = −Capex + Σ CF_t/(1+i)^t.
- **Maximum justified capex premium:** ΔCapex_max = ΔAC_opex / CRF.
- **Marginal abatement cost:** MAC_CO₂ = ΔAC/ΔCO₂ (₹/t). MAC_water = ΔAC/ΔV_water (₹/kL).
- **Break-even water price** between options i and j: p_w* = [(E_i − E_j) × tariff + ΔkVA × 4,380 + (CO₂_i − CO₂_j) × p_c] / (V_j − V_i).

### 2.6 Decision formulas
- **Weighted sum:** S_k = Σ w_c × n_ck, with min-max normalisation n = (worst − x)/(worst − best).
- **AHP:** derive weights from pairwise comparison matrices and require consistency ratio < 0.1.
- **TOPSIS:** closeness C_k = d⁻/(d⁺ + d⁻), the distance from the ideal and anti-ideal solutions.
- **PROMETHEE:** outranking based on pairwise preference functions.
- **Multi-objective optimisation:** build a Pareto front on (cost, water, carbon) and pick the knee point or apply shadow prices.
- **Recent literature.** A 2026 *Systems* study (T-spherical fuzzy MEREC-EDAS, Vietnam) ranked direct-to-chip and immersion as a "robust leading technology tier", with AI energy management close behind. Its sensitivity tests showed the top rank can change across scenarios. Hybrid fuzzy AHP/TOPSIS is the common pattern in technology-selection studies generally.
- **Avoid double counting.** Weight a criterion separately only if it is not already priced inside TCO.

## Part 3 — Cooling-selection decision function

**Step 1 — Feasibility filters (any "fail" eliminates the option).**
1. **Density.** Air with containment is OK up to about 20 kW/rack. Above 20 kW use rear-door HX or DLC. Above about 40 kW, DLC or immersion is required (vendor rule of thumb). NVL72-class racks of about 120–132 kW require DLC.
2. **OEM support.** NVL72/Vera Rubin require cold-plate DLC, so immersion fails unless the OEM warrants it. Two-phase immersion fails on PFAS policy risk.
3. **Climate.** Dry-only is feasible if T_db,0.4% + approach_dry ≤ T_facility. Evaporative is feasible if T_wb,evap + approach ≤ T_supply. IEC is penalised where design WB exceeds about 26 °C.
4. **Water.** V_site,peak-day ≤ secured supply (treated wastewater contract + rainwater + storage). Do not use groundwater in CGWB "over-exploited" units.
5. **Site.** Check dry-cooler area against yard/roof area, floor loading (immersion tanks), noise, and refrigerant rules (low-GWP).

**Step 2 — Performance.** For each surviving option, take PUE and WUE by climate (atlas matrix or hourly simulation), then compute E_facility, kVA_peak, V_site, total water = WUE + PUE × EWIF, and CO₂ = PUE × EF (hourly if available).

**Step 3 — Economics.** AC_k = CRF × Capex_k + O&M_k + energy + demand + V_site × p_w + CO₂ × p_c.

**Step 4 — Residual MCDA.** Score only the non-priced criteria (reliability/redundancy, footprint, OEM ecosystem, operational complexity) with AHP weights, e.g. reliability 0.5, OEM/ecosystem 0.3, footprint 0.2. Combine as Score = AC_normalised × 0.8 + MCDA × 0.2, or use MCDA to break ties within 5% on AC.

**Step 5 — Select and test sensitivity.** Vary p_w (₹99/500/2,000), p_c (₹0/2,000/8,000), EF (0.47 vs 0.71), tariff (±20%), utilisation and the PUE/WUE uncertainty (±0.03 PUE, ±30% WUE). Report the break-even p_w* and the maximum justified capex premium.

## Part 4 — Worked examples (estimates using atlas inputs)

**Common assumptions (estimated):**
- KERC tariff ₹6,700/MWh; demand ₹365/kVA-month on kVA = IT design × annual PUE / 0.95 (annual PUE used as a proxy for peak).
- Water priced on on-site WUE only.
- Capex differences are not priced. Instead the maximum justified capex premium is reported, because no reliable Indian capex data were found.
- Atlas PUE/WUE are taken as given.

### 4.1 Bengaluru AI hall, 10 MW IT (80% load factor → 70,080 MWh IT/yr)
- **Step 1.** Racks at about 120 kW mean air options A–C fail. Single-phase immersion (G, PUE 1.08) fails the NVL72 OEM filter. Survivors: D (DLC + dry, 1.15/0.05), E (DLC + adiabatic, 1.12/0.25) and F (DLC + towers, 1.10/1.8).
- **Climate check.** W45 means about 41 °C facility water. Bengaluru's 0.4% DB of 34.7 °C plus a 6 K approach gives 40.7 °C, so D is feasible on the design day, just barely; E adds margin. Adiabatic leaving air is about 34.7 − 0.8 × (34.7 − 19.6) ≈ 22.6 °C.
- **Step 2.** Per MWh IT, total water (m³) is D 2.35, E 2.49, F 4.00. CO₂ at 0.47 is D 0.541 t, E 0.526 t, F 0.517 t.

| Option | Facility MWh/yr | Energy ₹ cr | Demand ₹ cr | On-site kL/yr | Opex @₹99 | @₹500 | @₹2,000 | CO₂ t/yr (0.47) |
|---|---|---|---|---|---|---|---|---|
| D DLC+dry | 80,592 | 54.00 | 5.30 | 3,504 | 59.33 | 59.47 | 60.00 | 37,878 |
| E DLC+adiabatic | 78,490 | 52.59 | 5.16 | 17,520 | 57.93 | 58.63 | 61.26 | 36,890 |
| F DLC+towers | 77,088 | 51.65 | 5.07 | 126,144 | 57.97 | 63.03 | 81.95 | 36,231 |

- **Break-even water prices.**
  - E vs D: ₹1.547 cr / 14,016 kL = ₹1,104/kL. Including carbon at ₹8,000/t, it is ₹1,667/kL at EF 0.47 and ₹1,956/kL at EF 0.71.
  - F vs E: ₹95/kL.
  - F vs D: ₹210/kL.
- **Interpretation.** Towers win only with treated wastewater below about ₹95/kL. At a scarcity price of ₹500/kL, E saves ₹0.84 cr/yr versus D, which justifies up to about ₹6.4 cr of extra capex (7.606 × 0.84). At ₹2,000/kL, D wins.
- **Total water and carbon.** D has the lowest total water (break-even EWIF of 6.7 L/kWh versus Karnataka's 2.0). Carbon differences are small, about 1,000 t/yr between D and E.

### 4.2 Bengaluru AI hall, 100 MW IT (700,800 MWh IT/yr)
- **Costs.** Results scale linearly. Opex is D ₹593.3 cr, E ₹579.3 cr, F ₹579.7 cr at ₹99/kL; ₹594.7 / 586.3 / 630.3 cr at ₹500/kL; and ₹600.0 / 612.6 / 819.5 cr at ₹2,000/kL.
- **The water filter now decides.** Annual on-site water would be:
  - D: 35,040 kL (96 kL/day)
  - E: 175,200 kL (480 kL/day)
  - F: 1,261,440 kL (about 3,456 kL/day)
  Bengaluru Urban's groundwater is over-exploited (186.7%), so F fails Step 1 unless a dedicated treated-wastewater supply of about 3.5 ML/day is contracted.
- **Residual MCDA trap (illustrative).** Weights were energy 0.20, water 0.25, carbon 0.15, cost 0.25, reliability 0.10 and footprint 0.05. E scores 0.78 versus D 0.55 at ₹500/kL, and still 0.77 versus 0.60 at ₹2,000/kL. This happens because energy and carbon are weighted separately even though they are already in cost. With monetised TCO, D wins at ₹2,000/kL.
- **Recommendation.** Build D hardware (W45 DLC + dry coolers) with adiabatic pads used "dry-first" only above about 32 °C DB. This captures most of E's peak benefit at a WUE close to D's: an estimated PUE of about 1.13 and WUE of about 0.08–0.10 L/kWh, to be verified by hourly simulation. At ₹500/kL, a full adiabatic retrofit is worth up to about ₹64 cr of extra capex.

### 4.3 Chennai colocation, 20 MW IT, air-cooled racks of 7–15 kW (60% load → 105,120 MWh IT/yr)
- **Inputs.** Hot-humid climate adjustments to atlas values (estimates): A (CRAH + free-cooling air-cooled chillers) 1.40/0.05; B (water-cooled + towers) 1.28/1.8; C (IEC) 1.30/0.70. EF is 0.71 (CEA, atlas) and EWIF is 5.0 (India). The KERC tariff is used as a placeholder; TNERC rates differ.

| Option | Facility MWh | Energy+demand ₹ cr | On-site kL/yr | Opex @₹99 | @₹500 | @₹2,000 | CO₂ t/yr | Total water m³/MWh IT |
|---|---|---|---|---|---|---|---|---|
| A air-cooled FC chillers | 147,168 | 111.51 | 5,256 | 111.56 | 111.77 | 112.56 | 104,489 | 7.05 |
| B towers | 134,554 | 101.95 | 189,216 | 103.83 | 111.41 | 139.79 | 95,533 | 8.20 |
| C IEC | 136,656 | 103.55 | 73,584 | 104.28 | 107.23 | 118.27 | 97,026 | 7.20 |

- **Break-even water prices.** B vs A ₹520/kL; C vs A ₹1,165/kL; B vs C ₹138/kL. The winner flips from B (₹99) to C (₹500) to A (₹2,000).
- **Adding carbon at ₹8,000/t** (A costs ₹7.2 cr/yr more than B and ₹6.0 cr more than C):
  - ₹500/kL: C ₹184.9 cr, B ₹187.8 cr, A ₹195.4 cr.
  - ₹2,000/kL: A ≈ C (about ₹196 cr) and B ₹216 cr.
- **Recommendation.** Use C with treated-water makeup if IEC performance is verified at Chennai wet-bulb. Otherwise use A with 10–15 °C chilled water and containment. Avoid towers on potable water because Chennai district's groundwater is at 127.47%.

## Uncertainties and source disagreements
- **Setpoint savings per °C:** 2–5% of cooling energy (IMDA), 4–5% of energy cost per °F (ENERGY STAR, via LBNL), and 1–4% of chiller energy per °F (chiller rules of thumb). The ranges mix denominators (cooling vs total; °C vs °F).
- **DeepMind's 40%** is reported by Google itself ("consistently" achieved, per its 2016 blog), not independently audited, and the PUE-overhead reduction was 15%.
- **Microsoft's LCA** covers CPU servers and cradle-to-grave water, not on-site WUE, so it is not directly comparable with atlas WUE values.
- **Grid emission factor:** CEA v20.0 gives 0.727 (FY24) and V21.0 gives 0.7117 (FY25). Carbon Neeti (7 Oct 2026) reports v22.0 at 0.675 for FY 2025-26, which has not yet been checked against CEA's own files. The atlas uses 0.71, while Karnataka's hourly mean is about 0.47. The choice moves carbon-adjusted break-evens by about 15–20%.
- **Groundwater figures:** Bengaluru Urban's 186.7% comes from Deccan Herald's 8 Oct 2025 coverage of CGWB's 2024 assessment, not from the CGWB district table itself, and a journal paper cites 193–217% for "the city". Chennai's 127.47% is from 2023.
- **AWARE factors** for India and the Cauvery basin were not retrieved; do not use placeholder values.
- **Atlas PUE/WUE values** are estimates. The immersion PUE of 1.08 and the Chennai adjustments are assumptions. Capex differences were not priced; the maximum justified capex premium was reported instead.
- **ASHRAE 90.4:** the design-MLC path was removed in 2019. Zone maxima vary by edition and by local adoption (e.g. IECC 2021 values).
- **Tariffs:** KERC ToD multipliers were not retrieved, and Chennai should use TNERC and CMWSSB tariffs.

## Recommendations for the atlas
1. Add the break-even water price p_w* and the maximum justified capex premium as standard outputs alongside the existing EWIF* formula.
2. Set water shadow prices by CGWB category (₹1,000–2,000/kL for over-exploited units such as Bengaluru Urban and Chennai) and show results at ₹99, ₹500 and ₹2,000/kL.
3. For Bengaluru AI halls, default to W45 DLC with dry coolers and a dry-first adiabatic assist. Treat towers as feasible only with contracted treated wastewater.
4. Replace annual-mean emission factors with hourly ones when timing differs between options (adiabatic trim runs in solar hours).
5. Use monetised TCO as the main aggregator, and apply AHP/TOPSIS only to reliability, OEM ecosystem and footprint.

## Sources

1. lbl — https://datacenters.lbl.gov/sites/default/files/eedatacenterbestpractices.pdf
2. se — https://blog.se.com/government/2016/09/16/comply-with-dcoi/
3. lbl — https://datacenters.lbl.gov/sites/default/files/USER%20GUIDE%20FOR%20IMPLEMENTING%20ECBC_v9.2_06_May%202021_0.pdf
4. lbl — https://datacenters.lbl.gov/sites/default/files/Air%20Management%20Webinar_0.pdf
5. imda — https://www.imda.gov.sg/how-we-can-help/green-dc-roadmap/tropical-dc-standard
6. techwireasia — https://techwireasia.com/2026/08/singapore-liquid-cooling-standard-ai-data-centres/
7. ekkosense — https://www.ekkosense.com/resources/industry-insight/challenges-in-managing-tropical-data-centres-a-guide-to-the-singapore-green-mark-certification-and-other-singapore-data-centre-standards/
8. lbl — https://datacenters.lbl.gov/sites/default/files/DCOI_BestPractices92016.pdf
9. achrnews — https://www.achrnews.com/articles/92941-maximizing-chiller-efficiency
10. energy — https://www.energy.gov/sites/default/files/2024-07/best-practice-guide-data-center-design_0.pdf
11. supercomputing — https://www.supercomputing.news/emerging/nvidia-45c-warm-water-cooling-mgx-data-center
12. chilldyne — https://chilldyne.com/wp-content/uploads/2025/03/Chilldyne-Reference-Design-for-AI-NVIDIA-NVL72-X.3.pdf
13. dtnext — https://www.dtnext.in/news/tamilnadu/9-dists-overexploit-groundwater-756724
14. pib — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2206073&reg=3&lang=1
15. usthadian — https://www.usthadian.com/dynamic-groundwater-resource-assessment-report-2025/
16. jalshakti-dowr — https://www.jalshakti-dowr.gov.in/static/uploads/2024/05/20231206209724415.pdf
17. lbl — https://datacenters.lbl.gov/sites/default/files/Small%20Data%20Centers,%20Big%20Energy%20Savings.pdf
18. simscale — https://www.simscale.com/blog/ashrae-90-4-data-center-standards/
19. greencalculus — https://greencalculus.com/standards/ashrae-tc-9-9-thermal-guidelines/
20. birtech — https://www.birtech.com/en/blog/data-center/ashrae-a1-a2-a3-a4-classes
21. dataguidance — https://www.dataguidance.com/news/singapore-imda-announces-new-data-centre-standard
22. globalvalidity — https://globalvalidity.com/singapore-new-standard-mandates-energy-efficiency-for-data-centre-it-equipment/
23. facilitiesnet — https://www.facilitiesnet.com/microsite/energy-efficient-data-center-strategies/pdf/WhitePaper132.pdf
24. se — https://blog.se.com/datacenter/architecture/2012/06/12/metrics-and-economizer-mode-data-center-cooling/
25. lbl — https://datacenters.lbl.gov/sites/default/files/Design%20Brief_Chiller%20Efficiency.pdf
26. techreg — https://techreg.org/article/download/19844/24487/56761
27. esgnews — https://esgnews.com/microsoft-nature-study-reveals-full-life-cycle-impacts-of-datacenter-cooling-technologies/
28. edie — https://www.edie.net/microsoft-assesses-environmental-impact-of-data-centre-cooling/
29. qct — https://blog.qct.io/wp-content/uploads/2025/04/QCT-Qoolrack-Stand-Alone_Advanced-Liquid-Cooling-for-NVIDIA-GB200-NVL72-Systems.pdf
30. prnewswire — https://www.prnewswire.com/news-releases/schneider-electric-releases-white-paper-on-capital-cost-comparison-of-data-centre-liquid-cooling-vs-traditional-air-cooling-301086834.html
31. lbl — https://datacenters.lbl.gov/sites/default/files/airflow-doe-femp.pdf
32. datacenters — https://datacenters.google/efficiency/
33. uspto — https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/9227864
34. h2ocooling — https://h2ocooling.com/cooling-tower-blowdown-calculation/
35. osti — https://www.osti.gov/servlets/purl/2572888
36. danfoss — https://www.danfoss.com/en/industries/buildings-commercial/shared/data-centers/data-center-policies-in-the-eu/
37. lbl — https://datacenters.lbl.gov/indian-data-centers-initiative
38. bank — https://sbi.bank.in/documents/57189647/58231607/Sector+Report+DataCentre.pdf/f1919592-ee66-b50b-ea20-75fbb27c9bb5?t=1779885206866
39. csemag — https://www.csemag.com/ashraes-new-energy-standard-for-data-centers/
40. csemag — https://www.csemag.com/articles/ashraes-energy-standard-for-data-centers-turns-three/
41. iccsafe — https://codes.iccsafe.org/content/IECC2021P1/chapter-4-ce-commercial-energy-efficiency
42. deltacooling — https://deltacooling.com/resources/faqs/how-do-you-calculate-water-loss-in-a-cooling-tower
43. missrifka — https://missrifka.com/utility-system/cooling-tower-makeup-water.html
44. wulca-waterlca — https://wulca-waterlca.org/what-is-aware/
45. openlca — https://www.openlca.org/wp-content/uploads/2018/04/Documentation_AWARE_20180411.pdf
46. manglai — https://www.manglai.io/en/glossary/water-scarcity-footprint-aware
47. mdpi — https://www.mdpi.com/2073-4441/11/12/2634
48. doi — https://doi.org/10.3390/systems14091039
49. researchgate — https://www.researchgate.net/publication/383197928_An_Integrated_Approach_of_Fuzzy_AHP-TOPSIS_for_Multi-Criteria_Decision-Making_in_Industrial_Robot_Selection
50. springer — https://link.springer.com/article/10.1186/s40064-016-1888-z
51. noxtel — https://noxtel.mx/free-cooling-vs-adiabatic-cooling-vs-chilled-water-how-to-choose-the-right-system/
52. drpranayjha — https://drpranayjha.com/nvidia-gpu-power-cooling-liquid-density/
53. rax — https://rax.ae/knowledge-center/articles/nvidia-blackwell-gb200-nvl72-data-center-guide.html
54. tonecooling — https://tonecooling.com/nvidia-gb200-nvl72-cooling-requirements/
55. deccanherald — https://www.deccanherald.com/india/karnataka/86-taluks-contaminated-bengaluru-over-exploited-groundwater-report-3961002
56. deccanherald — https://www.deccanherald.com/amp/story/india%2Fkarnataka%2Fbengaluru%2Fbengaluru-urban-among-5-districts-with-100-plus-groundwater-extraction-3757568
57. datacenterdynamics — https://www.datacenterdynamics.com/en/news/singapores-imda-launches-tropical-data-center-sustainability-standard/
58. microsoft — https://news.microsoft.com/source/features/sustainability/microsoft-quantifies-environmental-impacts-of-datacenter-cooling-from-cradle-to-grave-in-new-nature-study/
59. wa — https://sbcc.wa.gov/sites/default/files/2021-07/235_Rev3_MLC_072221.pdf
