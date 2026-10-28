<!-- Report 4 of the India Data Centre Atlas research series (Campus calculator, grid and city scale (Bengaluru); atlas chapter 12.8). Produced with AI-assisted web research, October 2026, and kept as written at the time. Some figures were corrected later (notably India grid water 4.5 → 2.9 L/kWh and grid CO₂ 0.71 → 0.675 t/MWh, October 2026); the atlas standards register (src/data/standards.js) is authoritative where they differ. -->

# Water and Power for a Bengaluru Data Centre: Calculations, Industry Comparisons, Scarcity Risk and Policy (October 2026)

Citywide, data centre water use will not cause Bengaluru's water scarcity. Locally, it can make it worse. If 1 GW of new IT load used evaporative cooling on fresh water, it would take about 32 MLD, roughly 1% of the city's ~3,000 MLD supply. But one 50 MW evaporative facility drawing borewells in Whitefield or Devanahalli would use about 1.4 MLD, the domestic water of ~10,000 people. Power is the bigger strain: a single 100 MW AI campus needs about 840 MU a year and ~140 MVA of 220 kV supply, more than 5% of all household electricity used in Karnataka.

## TL;DR
- **Per facility (central case):** a 20 MW colocation site uses ~178 MU/yr and ~0.62 MLD of on-site water (about 4,600 people's supply). A 50 MW hyperscale site uses ~444 MU/yr and 0.39–1.47 MLD, depending on cooling. A 100 MW direct-liquid-cooled (DLC) AI site uses ~841 MU/yr but only 0.13–0.41 MLD on site. For efficient sites, the water used to generate their grid power (~1.5 L/kWh, mostly at coal plants in the Krishna basin) is larger than the water they use on site.
- **Scarcity verdict:** at Bengaluru's current ~162 MW, data centres probably use 2–5 MLD. That is under 0.2% of city supply and about 1% of industrial groundwater draw. Even 1 GW added on fresh water with cooling towers would be about 1%. The real risks are three. Freshwater or groundwater use in over-exploited taluks (Bangalore East at 378.85% in Karnataka's Dynamic Ground Water Resources report, and 395.0% in IN-GRES 2025-26 data; Devanahalli at 169%). Summer peaks that coincide with tanker shortages. And the ~35 MLD of power-plant water a 1 GW fleet would cause elsewhere in Karnataka.
- **What to do:** the new Karnataka Sustainable Data Centre Policy 2026–31 targets 1 GW and adds PUE/WUE reporting, but its water incentives are weak. Its WUE band of 0.7–1.3 L/kWh and its Rs 8 lakh/yr cap on treated-water reimbursement are both too lenient. Karnataka should require non-potable treated wastewater (or near-zero-water designs) for all cooling. It should ban groundwater for cooling in over-exploited taluks, cap WUE at ≤0.4 L/kWh and PUE at ≤1.3 for new builds, require metered public disclosure, and steer large AI campuses to treated-water and renewable-supplied parks (Hoskote and beyond) with 24×7 green power.

## Key Findings

1. **The power is the bigger issue, not the water.** A 100 MW IT AI campus needs ~841 GWh/yr. That is ~0.9% of Karnataka's ~92,550 MU FY2024-25 energy requirement, ~2.3% of BESCOM's estimated ~37,000 MU sales, and ~5% of Karnataka's 16,089 MU household consumption (2023-24). The state's 1 GW target, built as AI capacity, would add ~8,400 MU/yr (~9% of today's state demand) and ~1.3 GW of firm peak. That is about 6.5% of the record 20,094 MW peak on 11 September 2026 (News Karnataka; Deccan Herald reports 20,093 MW, a 7.7% rise on the previous summer).
2. **On-site water depends mostly on the cooling technology.** For the same IT energy, evaporative cooling towers use about 1.8 L/kWh, adiabatic/hybrid about 0.4, and dry/closed-loop DLC about 0.05. That is a ~36× spread. Choosing the cooling technology matters more than choosing the site.
3. **Bengaluru's current data centre water use is small but poorly measured.** Estimates range from ~2.2 MLD of permitted volumes (Down To Earth's estimate of roughly 812.9 million litres a year of permissions, from 2013–2025 government meeting minutes and BWSSB data), to ~4 MLD (the Karnataka IT department's estimate of ~4,000 kL/day for the state's 32 data centres, based on informal operator inputs), to ~20 MLD (WELL Labs hydrologist Shashank Palur's estimate, which assumes ~26 million litres per MW per year). My bottom-up model (162 MW, mixed cooling) gives 2–5 MLD, which supports the lower figures. Neither BWSSB nor KSPCB tracks data centre water separately.
4. **Many comparable users are larger.** JSW Vijayanagar's water allocation (330 MLD) equals more than 200 hyperscale data centres. A 1,000-flat apartment complex uses about the same water as the 20 MW colocation site. A 10 million sq ft IT campus uses about 9× the colocation site's water for similar electricity. Data centres are unusual because they are *power-dense*, not because they are *water-dense*.
5. **Treated wastewater is abundant enough to supply all of this.** BWSSB has ~1,348.5 MLD of STP capacity. It sends 440 MLD (K&C Valley) and 210 MLD (H-N Valley) of secondary-treated water to Kolar and Chikkaballapur tanks, and reuses only ~30 MLD commercially. Even a 1 GW evaporative fleet would need ~43 MLD of feed water to RO.

## 1. Assumptions

| Parameter | Case A: Colo/enterprise | Case B: Hyperscale/cloud | Case C: AI campus |
|---|---|---|---|
| Design IT load | 20 MW | 50 MW | 100 MW |
| Cooling | Water-cooled chillers + cooling towers (with water-side economiser) | B1: chillers + cooling towers; B2: adiabatic/hybrid dry coolers | DLC (~80% to liquid) + dry coolers with adiabatic assist |
| Annual PUE (central / range) | 1.45 / 1.30–1.60 | 1.35 / 1.25–1.45 | 1.20 / 1.15–1.25 |
| Average utilisation of design IT | 70% / 60–85% | 75% / 65–85% | 80% / 70–90% |
| Design-day PUE (for contract demand) | 1.60 | 1.50 | 1.30 |
| On-site WUE (L/kWh IT) | 1.8 / 1.5–2.0 | B1: 1.6; B2: 0.4 | Dry 0.05; adiabatic 0.2; (evaporative alt. 1.6) |
| Staff on site | ~150 | ~300 | ~300 |
| Grid water intensity | 1.5 L/kWh (range 1.0–2.5) | same | same |

Other constants: 8,760 h/yr. Per-capita water benchmark 135 LPCD (CPHEEO/BWSSB norm for sewered cities). Office/staff use 45 LPCD. Bengaluru household electricity 150 kWh/month = 1,800 kWh/yr. That household figure is an estimate: Gruha Jyothi caps free supply at 200 units, and Bengaluru Urban has the lowest enrolment because many homes exceed 200 units, so the city average is plausibly 150–250 units/month.

## 2. Power calculations

**Formulas**
- IT energy (MWh/yr) = Design IT (MW) × Utilisation × 8,760
- Facility energy (MWh/yr) = IT energy × PUE  (1 GWh = 1 MU)
- Average grid draw (MW) = Facility energy ÷ 8,760
- Contract demand (MVA) ≈ Design IT × design-day PUE ÷ power factor (0.95), plus ~3–5% for offices and losses

| | Case A (20 MW) | Case B (50 MW) | Case C (100 MW) |
|---|---|---|---|
| IT energy | 20×0.70×8,760 = **122.6 GWh** | 50×0.75×8,760 = **328.5 GWh** | 100×0.80×8,760 = **700.8 GWh** |
| Facility energy (central) | 122.6×1.45 = **177.8 MU** | 328.5×1.35 = **443.5 MU** | 700.8×1.20 = **841.0 MU** |
| Sensitivity range | 136.7–238.3 MU | 355.9–539.8 MU | 705.2–985.5 MU |
| Average draw | 20.3 MW | 50.6 MW | 96.0 MW |
| Design peak | 32 MW | 75 MW | 130 MW |
| Contract demand | ~34–35 MVA | ~80 MVA | ~140 MVA |
| Supply voltage (KERC norms) | 110 kV | 220 kV | 220 kV, dedicated substation, dual feed |
| Installed transformer capacity (2N) | ~70 MVA | ~160 MVA | ~280 MVA |
| Bengaluru household equivalent (1,800 kWh/yr) | ~98,800 | ~246,400 | ~467,200 |
| Share of Karnataka energy (92,550 MU, FY25) | 0.19% | 0.48% | 0.91% |
| Share of BESCOM sales (~37,000 MU, est.) | 0.48% | 1.2% | 2.3% |
| Share of state household use (16,089 MU) | 1.1% | 2.8% | 5.2% |
| Share of 2026 state peak (20,094 MW) | 0.17% | 0.40% | 0.67% |
| Energy bill at HT-2a (Rs 6.70/kWh + Rs 365/kVA/month) | ~Rs 134 cr/yr | ~Rs 332 cr/yr | ~Rs 625 cr/yr |

**How to read this**
- **Redundancy:** Tier III/IV sites use 2N utility feeds and transformers, so installed MVA is about twice contract demand. Diesel or other backup is sized for the full facility load. Redundancy doubles the network assets KPTCL/BESCOM must build, but not the energy drawn.
- **Voltage thresholds:** under the KERC Conditions of Supply, 66 kV covers up to 20 MVA. 110 kV covers up to 35 MVA, raised to 55 MVA in June 2025 subject to technical feasibility and ₹10 lakh/MVA augmentation charges. Loads above 20 MVA can take 220 kV. So Case A fits at 110 kV. Cases B and C need 220 kV bays, typically fed by two independent 220 kV circuits from different 400/220 kV grid stations. Multi-phase AI campuses of 300 MW or more will push toward 400 kV.
- **The load is flat.** Data centres run at a high load factor (~75–90%) all day and all year. Karnataka's demand peaks in Jan–Mar daytime and is swinging sharply: daily consumption ran 310–350 MU in August 2026 against ~200 MU in August 2025. A large flat block of data centre load raises firm-capacity needs even when the energy share looks small.
- **Grid mix:** about 63% of Karnataka's power requirement is met from renewables including hydro (2024). Of contracted capacity, 32% is fossil (CEA). The state's KPCL coal stations at Raichur, Yermarus and Ballari total 5,020 MW.

## 3. Water calculations

### 3.1 Evaporation physics, checked against WUE
- Latent heat of water ≈ 2,400 kJ/kg, and 1 kWh = 3,600 kJ. So evaporating water rejects heat at **3,600 ÷ 2,400 = 1.5 L per kWh of heat**.
- Cooling towers reject IT heat plus compressor and pump work, about **1.2 × IT energy** in a chilled-water plant. That gives ~1.8 L per kWh of IT if all heat is rejected by evaporation.
- About 15% of tower heat is rejected sensibly, so evaporation E ≈ 1.8 × 0.85 ≈ **1.53 L/kWh IT**.
- **Blowdown** B = E ÷ (CoC − 1), where CoC is cycles of concentration. Drift is <0.005% of circulation and negligible. **Make-up water** M = E + B = E × CoC ÷ (CoC − 1).
  - At CoC 4: M = 1.53 × 4/3 = **2.04 L/kWh**
  - At CoC 5: M = **1.91 L/kWh**
  - At CoC 6 (needs soft feed water such as RO-treated wastewater): M = **1.84 L/kWh**
- This matches the 1.5–2.0 L/kWh evaporative WUE range. I use **1.8** as the central value.
- Higher CoC (enabled by RO-treated feed) saves 10–15% of water. Moving away from evaporation saves 75–97%.

### 3.2 On-site water by case
Formula: annual on-site water (L) = IT energy (kWh) × WUE + staff × 45 L × 365 + landscaping. MLD = annual ML ÷ 365. Population equivalent = MLD × 10⁶ ÷ 135.

| Case / cooling | Cooling water | Domestic + landscaping | Total on-site | Range | People at 135 LPCD |
|---|---|---|---|---|---|
| A (WUE 1.8) | 122.6 GWh×1.8 = 220.8 ML/yr = 0.605 MLD | ~0.02 MLD | **~0.62 MLD** (226 ML/yr) | 0.43–0.82 MLD | ~4,600 |
| B1 evaporative (1.6) | 525.6 ML/yr = 1.44 MLD | ~0.03 MLD | **~1.47 MLD** | 1.1–1.9 MLD | ~10,900 |
| B2 adiabatic (0.4) | 131.4 ML/yr = 0.36 MLD | ~0.03 MLD | **~0.39 MLD** | 0.2–0.6 MLD | ~2,900 |
| C dry/closed-loop (0.05) | 35.0 ML/yr = 0.096 MLD | ~0.03 MLD | **~0.13 MLD** | 0.06–0.2 MLD | ~930 |
| C adiabatic assist (0.2) | 140.2 ML/yr = 0.38 MLD | ~0.03 MLD | **~0.41 MLD** | 0.3–0.6 MLD | ~3,050 |
| C if built with cooling towers (1.6) | 1,121 ML/yr = 3.07 MLD | ~0.03 MLD | ~3.10 MLD | 2.6–3.6 MLD | ~23,000 |

**Tanker equivalent:** at 6,000 L per tanker, B1 = ~245 tanker loads a day. In Whitefield, one apartment complex of 100 homes reports needing 4–5 tankers a day at Rs 1,600 each.

**Climate effect:** Bengaluru's design wet-bulb of ~23 °C and mild dry-bulb temperatures (rarely above ~35 °C) suit dry coolers with brief adiabatic assist. That is why Case C's adiabatic WUE can stay near 0.2. In March–May, evaporative sites use 20–30% more water than their annual average, exactly when borewells fail.

### 3.3 Indirect water embedded in grid electricity
- Grid water intensity ≈ Σ (generation share × water consumption per MWh):
  - Coal ~38% × 3.5 m³/MWh (MoEFCC 2015 limit for existing cooling-tower plants; new plants 2.5) = 1.33
  - Nuclear ~3% × 2.7 = 0.08
  - Solar/wind ≈ 0.01
  - Hydro: 0–0.6, depending on whether reservoir evaporation is allocated to power or to irrigation (contested)
  - **Total ≈ 1.4–2.0; central 1.5 L/kWh**
- Using Raichur's reported actual of ~4.9 m³/MWh would push this towards 2.5. Raichur sits on the Krishna and has been shut during water shortages.

| | Case A | Case B | Case C |
|---|---|---|---|
| Indirect water (1.5 L/kWh) | 177.8 GWh → 267 ML/yr = **0.73 MLD** | 443.5 GWh → 665 ML/yr = **1.82 MLD** | 841 GWh → 1,262 ML/yr = **3.46 MLD** |
| Total footprint (on-site + indirect) | ~1.35 MLD | B1 ~3.3 / B2 ~2.2 MLD | dry ~3.6 / adiabatic ~3.9 MLD |
| With 100% solar/wind supply | ~0.62 MLD | B1 1.47 / B2 0.39 | 0.13–0.41 |

**What this means:** for DLC and adiabatic designs, ~90% of the water footprint sits at power plants in the Krishna/Tungabhadra basin, not in Bengaluru. Round-the-clock renewable supply is therefore a water policy as well as a carbon policy.

## 4. Comparison with other Bengaluru and Karnataka users

| User (illustrative scale) | Water (MLD) | Per-unit norm | Power (MU/yr) | Source / status |
|---|---|---|---|---|
| **Case A, 20 MW colo** | 0.62 | 1.8 L/kWh IT | 178 | This model |
| **Case B1, 50 MW evaporative** | 1.47 | 1.6 L/kWh IT | 444 | This model |
| **Case C, 100 MW DLC** | 0.13–0.41 | 0.05–0.2 L/kWh IT | 841 | This model |
| IT campus, 10 million sq ft (Manyata/ITPL scale, ~100,000 staff) | ~5.5–6.5 (4.5 domestic at 45 LPCD + HVAC towers) | 45 LPCD/employee | ~185 (≈200 kWh/m²/yr) | Estimate from norms |
| Apartment complex, 1,000 flats | ~0.61 | 135 LPCD × 4.5 persons | ~18 | Norm-based |
| 500-bed hospital | ~0.23 | ~450 L/bed/day (NBC) | ~15–25 | Norm-based estimate |
| 300-room luxury hotel | ~0.3 | ~1,000 L/room/day | ~10–15 | Industry-typical estimate |
| Large mall, ~1 million sq ft | ~0.3–0.5 | — | ~25–35 | Estimate |
| Brewery, 2 million hl/yr | ~1.7 | UBL: 2.93 kL/kL (FY24), 3.10 kL/kL (FY25) | ~15–20 | UBL reports; plant size illustrative |
| Soft-drink bottler, 1 million kL/yr | ~4–6 | ~1.5–2.2 L/L industry-typical | ~20–30 | Estimate |
| Toyota Kirloskar, Bidadi (capacity ~342,000 vehicles) | ~4.7 total (1.73 million m³/yr), ~89–90% recycled or rainwater | 2.94 m³/vehicle (2016-17) | 100% renewable since FY2021 | TKM disclosures |
| BEL (Bengaluru) | ~2 MLD of BWSSB treated water | — | — | Deccan Herald via BWSSB |
| 18-hole golf course (dry season) | ~1.5–2.5 | ~5 mm/day on ~40–50 ha | <5 | Estimate |
| Garment factory (cut-make-trim), 2,000 workers | ~0.1 | Domestic-type use; wet processing 100–200 L/kg elsewhere | ~5–10 | Estimate |
| BMRCL Namma Metro (96 km) | Small (stations, depot washing) | — | ~65 lakh units/month in 2018-19 (~78 MU/yr); now plausibly ~200 MU; Blue Line alone projected at 152 GWh | BMRCL (2019), IISc–BMRCL study |
| JSW Steel Vijayanagar (12–17.5 MTPA) | **330 MLD allocated** (Tungabhadra 32 MGD + Almatti 40 MGD) | ~10 m³/t on allocation basis | Captive ~860 MW plants | JSW environmental clearance filing |
| Raichur TPS (1,720 MW) | ~110–150 at 3.5–4.9 m³/MWh | MoEFCC norm 3.5 | Generator | CPCB / reported data |
| Pharma/biotech (Biocon), HAL | Not publicly disaggregated | — | — | Data gap |

**What the comparison shows**
- **Per MLD, data centres are mid-sized water users.** An evaporative 50 MW site is comparable to a large brewery or a third of Toyota Bidadi.
- **Per MU, they are extreme power users.** Case C uses ~4× Namma Metro's likely consumption and ~4.5× a 10 million sq ft IT campus.
- **Per unit of value, the gap is widest.** A 100 MW DLC site uses less water than one large hotel cluster, but as much electricity as ~467,000 Bengaluru homes.
- The best Bengaluru-region manufacturers (Toyota at ~90% recycled, BEL on treated water) show that non-potable sourcing is already standard practice for comparable industry. Data centres can meet it.

## 5. Where Bengaluru data centres get water today

| Source | Status for data centres | Key facts |
|---|---|---|
| BWSSB Cauvery (Stages I–V) | Used for a few; poorly metered | Stages I–IV ~1,450 MLD; Stage V adds 775 MLD (commissioned Oct 2024), but connection uptake is slow (<1.2 lakh of 4 lakh targeted connections after 18 months). Cauvery allocation is capped. BWSSB industrial tariff Rs 99/kL. Five data centres receive ~129 kL/month in BWSSB records. |
| Groundwater/borewells | Likely the dominant source (WELL Labs view) | All Bengaluru Urban and Rural assessment units are over-exploited. Bangalore East is at 378.85% (Karnataka Dynamic Ground Water Resources report; 395.0% in IN-GRES 2025-26 data), Devanahalli at 169%, with "no net groundwater available for future use". The whole area is notified under the Karnataka Ground Water Act 2011, so every borewell needs a KGWA/BWSSB permit. |
| Private tankers | Back-up; unregulated | Tanker water is mostly borewell water from peri-urban villages, which moves the depletion elsewhere. |
| Treated wastewater (STP/tertiary) | Under-used; no mandate | BWSSB STP capacity ~1,348.5 MLD. Reuse ~825 MLD environmental and ~30 MLD commercial. K&C Valley sends 440 MLD and H-N Valley 210 MLD (secondary treated) to Kolar and Chikkaballapur. Treated water sells at Rs 10–15/kL. Apartment STPs may sell 50% of their output. BWSSB's chair has said there is no mandate for data centres to use recycled water. |
| Rainwater harvesting / on-site STP | Supplementary | Useful for domestic use and landscaping. Too small and seasonal for evaporative cooling. |

**Operator evidence is thin and inconsistent.**
- The Iron Mountain/Web Werks 4 MW Whitefield site sought just 10 kL/day from BWSSB, implying ~0.15 L/kWh, i.e. air-cooled. BWSSB says it does not supply that site.
- ETL Secure Space was allotted 650 kL/day at Devanahalli, likely from panchayat borewells, with no groundwater permit specified in the order.
- One major operator's 2025 ESG report, reviewed by Down To Earth, showed 216,357 kL of total use, including 9,876 kL of groundwater and 191,152 kL from third parties.
- Yotta says Karnataka's policy prioritises air-cooled and closed-loop systems and requires non-potable water. Down To Earth found the policy text does not support this.

**Bengaluru's share of Indian capacity.**
- Cushman & Wakefield (H1 2026): 162 MW operational, 8 MW under construction and 92 MW planned in Bengaluru. That is ~9% of India's 1,789 MW operational but only ~2.6% of the 3,860 MW pipeline (509 MW under construction, 3,351 MW planned). Hyderabad alone has 668 MW planned.
- Other trackers give different Bengaluru figures (e.g. 78 MW in a 2025 Houlihan Lokey compilation) because they define capacity differently, so treat 162 MW as Cushman's colo-plus-hyperscale definition.
- The lag reflects several factors: no submarine-cable landing (Mumbai and Chennai have them), expensive land in the core, hyperscalers' preference for states with surplus power and incentive packages (the SBI April 2026 sector report highlights Mumbai, Chennai and Noida), and growing awareness of water stress. Latency is not the constraint for Bengaluru.

## 6. Will data centre water cause scarcity?

### 6.1 City balance
- Supply: Cauvery ~2,225 MLD of capacity (less in practice while Stage V connections lag), plus groundwater of ~800 MLD (BWSSB study). Groundwater extraction in Bengaluru Urban district has been estimated as high as 1,457 MLD in 2024, a drought year.
- Freshwater demand: ~2,632 MLD (WELL Labs), of which domestic is ~1,890 MLD.
- BWSSB projects demand of ~4,100 MLD by 2051 against the Cauvery cap, a shortfall of ~2,650 MLD.
- Experts put total current availability at ~3,100 MLD. I use **3,000 MLD** as the denominator.

### 6.2 Scenarios (75% utilisation; IT energy = 18,000 kWh/day per MW)

| Added IT capacity | Evaporative, WUE 1.8 | Adiabatic, WUE 0.4 | Dry/DLC, WUE 0.05 | Indirect (PUE 1.3, 1.5 L/kWh), outside city |
|---|---|---|---|---|
| 100 MW | 3.2 MLD (0.11%) | 0.7 MLD (0.02%) | 0.09 MLD | 3.5 MLD |
| 500 MW | 16.2 MLD (0.54%) | 3.6 MLD (0.12%) | 0.45 MLD | 17.6 MLD |
| 1 GW | 32.4 MLD (1.1%) | 7.2 MLD (0.24%) | 0.9 MLD | 35.1 MLD |
| People equivalent, 1 GW | ~240,000 | ~53,000 | ~6,700 | ~260,000 |
| 1 GW as share of BWSSB STP capacity (1,348.5 MLD) | 2.4% (≈43 MLD RO feed) | 0.5% | ~0 | — |

Percentages in brackets are shares of 3,000 MLD city supply.

**Interpretation**
- **Citywide:** even the worst case (1 GW evaporative) is about 1% of supply. That is less than the commercial reuse already happening, and about a tenth of JSW Vijayanagar's allocation.
- **Against the deficit:** 32 MLD is about 1.2% of the projected 2051 shortfall. It is also roughly the domestic supply for one or two large peri-urban wards, which is *not* trivial in a city where 80 wards are rated at risk of severe scarcity.
- **Against industrial groundwater:** OpenCity reports Bengaluru industry drew ~13,700 ha-m of groundwater in 2025 (~375 MLD), about 25% of the city's groundwater availability. Today's data centres, at 2–5 MLD, are ~1% of that. A 1 GW evaporative fleet on groundwater would add ~9%.
- **Locally, the risk is real.** Whitefield, Mahadevapura and Devanahalli host most data centres and are the most over-drawn aquifers. There, deep borewells (beyond 2,000 ft) are dry and residents buy tankers. A 1.4 MLD groundwater draw equals the entire domestic use of ~10,000 people concentrated in one aquifer cell. Restoring a lake elsewhere cannot offset that.
- **Timing:** evaporative demand peaks in March–May, coinciding with tanker price spikes. The 2024 crisis came after the deficient 2023 monsoon.
- **Equity:** data centres can pay Rs 99/kL or tanker prices. The households, dhobi ghats and villages competing for the same aquifer often cannot.
- **Elsewhere in Karnataka:** a 1 GW fleet on today's grid would consume ~35 MLD at thermal plants in the Krishna basin, which already competes with irrigation. According to the CGWB's Dynamic Ground Water Resources Assessment, 88% of Karnataka's groundwater goes to irrigation, and the region already sends treated city sewage to Kolar's farm tanks.

**Conclusion:** data centre water will not be a primary cause of Bengaluru's scarcity. It becomes a material *local* stressor if freshwater or groundwater feeds evaporative cooling in over-exploited taluks. A treated-water and low-WUE mandate removes nearly all of the in-city risk at modest cost.

## 7. Policy context

- **Karnataka Data Centre Policy 2022–27:**
  - Promised 24×7 water to investors but was silent on sustainable water use.
  - Targeted Rs 10,000 crore of investment and 200 MW by 2025.
  - Offered concessional industrial tariffs, electricity-duty exemption and land and stamp-duty benefits. Incentives outside Bengaluru included a 10% land subsidy and a 7% capital subsidy.
  - A 2025 amendment removed the 5 MW cap on green-power tariff reimbursement, retaining Rs 0.50/unit for sites with more than 50% renewable supply.
- **Karnataka Sustainable Data Centre Policy 2026–31 (released 30 September 2026):**
  - Targets 1 GW of IT load and a 10–12% share of India's AI-ready capacity.
  - Requires plant-wise PUE and WUE reporting.
  - Pays Rs 20 crore for sustained PUE of 1.00–1.20 over three years.
  - Reimburses 100% of treated-water charges up to Rs 8 lakh/yr for five years.
  - Reimburses water charges up to Rs 30 lakh/yr for a WUE of 0.7–1.3.
  - Plans a power and water "resource heat map".
  - Proposes parks at Hoskote, Mangaluru and Mysuru totalling ~1,000 MW. Hoskote is planned at 500 MW with Pavagada solar and 60 MLD of secondary treated water.
- **Critique of the 2026 policy:**
  - At Rs 10–15/kL, Rs 8 lakh buys only 53,000–80,000 kL/yr (0.15–0.22 MLD), under a sixth of Case B1's need.
  - A WUE band of 0.7–1.3 rewards designs that DLC and adiabatic systems already beat four-fold. Johor and Singapore use a 1.8 ceiling, which is lax for Bengaluru's mild climate.
  - The price signal matters more than the subsidy. Fresh BWSSB water for B1 would cost ~Rs 5.2 crore/yr (525,600 kL × Rs 99), against ~Rs 0.8 crore for treated water.
- **National level:** the draft national Data Centre Policy (2020) has still not been finalised. MeitY AI-cloud tenders require PUE below 1.35. SEBI BRSR Core requires water disclosure by the top 150 listed firms. The IGBC Green Data Centre rating is voluntary. The CGWA/KGWA permit regimes exist, but enforcement and borewell metering are weak.

## Recommendations

### A. Water
1. **Mandate non-potable sourcing for cooling.** Every new or expanded data centre above 1 MW IT in BBMP/GBA, BMRDA and the peri-urban taluks should source 100% of process and cooling make-up from treated wastewater (BWSSB tertiary water, apartment or KIADB STPs, or an on-site STP+RO plant) or use near-zero-water cooling. Potable or Cauvery water should be limited to domestic use (~45 LPCD × staff).
2. **Ban groundwater for cooling in over-exploited taluks.** No new KGWA/BWSSB borewell NOCs for data centre cooling in Bengaluru Urban, Bengaluru Rural, Kolar or Chikkaballapur. Existing borewells should be metered with telemetry and phased out of cooling within 3 years.
3. **Cap WUE.** New builds from 2027: WUE ≤0.4 L/kWh IT annual, and ≤0.2 for liquid-cooled AI halls. Existing sites: ≤1.0 by 2029, with any evaporative cooling fed by treated water. Tie the cap to the KSPCB Consent to Establish/Operate.
4. **Issue water budgets with the permit.** A KSPCB/BWSSB consent should state an annual and peak-month allocation (kL/day) by source. Exceeding it should trigger escalating charges.
5. **Use tiered pricing.** Data centre tariff for potable water ≥Rs 150–200/kL (above the Rs 99 industrial rate; Johor applies a dedicated, higher data centre tariff). Treated water at Rs 10–20/kL with long-term take-or-pay contracts to finance tertiary and RO plants. Move incentive money from reimbursement to pipelines and plants.
6. **Drought rules.** When BWSSB declares a shortage, sites with evaporative systems must switch to dry or adiabatic mode or to stored treated water. Potable top-up should be prohibited from March to May in drought years.
7. **Accounting integrity.** Disallow offset claims such as lake restoration elsewhere against local aquifer depletion. Require reporting of withdrawal by source alongside "recycled" claims.

### B. Power
8. **Cap PUE.** ≤1.30 annual for new air-cooled builds, ≤1.20 for liquid-cooled AI halls, and ≤1.45 for existing sites by 2029. Keep the Rs 20 crore PUE incentive but pay it only after metered verification.
9. **Plan grid connections.** Treat any connection above 55 MVA as a KPTCL transmission-planning item: 220 kV dual-circuit from two separate 400/220 kV sources, with the developer funding dedicated bays and substations. Publish a 5-year *hosting-capacity map* of available 220/400 kV capacity, building on the policy's resource heat map. Co-locate the 1 GW parks with 400 kV grid stations.
10. **24×7 renewable requirement.** Require ≥70% annual renewable supply, hourly-matched where possible, through green open access, group captive or Pavagada-type banking, for any campus above 50 MW. This also cuts the ~1.5 L/kWh of indirect water.
11. **Demand flexibility and storage.** Require BESS and/or dispatchable backup sized to ride through and shift load during the Jan–Mar and Sep evening peaks. Offer ToD tariffs and demand-response contracts. Replace diesel gensets with cleaner backup over time.
12. **Heat reuse and efficiency.** Require heat-reuse feasibility studies for campuses above 20 MW. Give incentives for DLC/immersion, warm-water cooling and dry coolers. Adopt BEE/ECBC data centre benchmarks as mandatory.

### C. Siting
13. **Zoning.** Large campuses (>50 MW) should go to designated parks with assured treated-water supply and 400/220 kV access: Hoskote with 60 MLD treated water, and Tumakuru, Mysuru and Mangaluru. No evaporative cooling should be approved in Bangalore East, Mahadevapura or Devanahalli. Edge and enterprise sites (<10 MW, air-cooled) can stay in the city.
14. **Coastal options.** Treat desalination- or seawater-linked campuses at Mangaluru on their own merits. The 2026 policy already lists desalination plants as eligible for customised packages.

### D. Transparency and enforcement
15. **Disclosure.** Require monthly metered PUE, WUE (by source), CUE and renewable share per facility, published on a KITS/KSPCB portal. This mirrors the EU Energy Efficiency Directive's database for data centres ≥500 kW.
16. **Enforcement.** Annual third-party audits, IoT flow meters on all sources, and consent suspension for repeat breaches. Coordinate KITS, KSPCB, BWSSB, KGWA, KPTCL and BESCOM through one data centre resource cell.

### E. National
17. MeitY should finalise the national Data Centre Policy with water clauses (non-potable cooling, WUE reporting). CGWA should exclude data centre cooling from NOCs in over-exploited blocks. BEE should notify a data centre star-labelling scheme with PUE/WUE thresholds.

### International precedents (background)
- **Johor (Malaysia):** stopped approving Tier 1/2 data centres, requires reclaimed water, applies a WUE threshold of 1.8 with approval still subject to local water availability, and charges a dedicated RM5.33/m³ tariff. Operators there now run their own reclamation plants (Bridge Data Centres treats ~5 MLD).
- **Singapore:** uses the same 1.8 WUE benchmark and NEWater-style reuse.
- **Others:** Ireland (Dublin grid-connection limits), Amsterdam (moratorium followed by zoning), Chile and Uruguay (projects redesigned to air cooling after drought objections), and US states such as Arizona (water-use scrutiny). These were not re-verified in this research cycle and should be checked before being cited in a formal submission.

### Phased roadmap
| Phase | Timing | Actions |
|---|---|---|
| 1 | Q4 2026–2027 | Operational guidelines for the 2026–31 policy. Mandatory metering and disclosure. Groundwater-for-cooling ban in over-exploited taluks. Data centre water tariff. Publish hosting-capacity map. |
| 2 | 2027–2028 | WUE ≤0.4 and PUE ≤1.3 written into consent conditions for new builds. Treated-water pipelines to Hoskote and Whitefield clusters. ≥70% renewable rule for >50 MW. BESS and demand-response contracts. |
| 3 | 2029–2031 | Existing-fleet WUE ≤1.0 and PUE ≤1.45. Hourly renewable matching. Independent audits. Review the 1 GW target against grid and water heat-map outcomes. |

## Caveats
- **Current-use estimates conflict.** For Bengaluru data centre water: ~2.2 MLD (Down To Earth's estimate of roughly 812.9 million litres a year of permitted use, covering Bengaluru plus one Ramanagara site), ~4 MLD (the IT department's ~4,000 kL/day for 32 data centres, from informal operator inputs) and ~20 MLD (WELL Labs hydrologist Shashank Palur's estimate, based on ~26 million litres per MW per year, which implies WUE near 3 L/kWh at full load and looks high). A widely repeated claim of "26 million litres annually" for the whole city appears to be a mis-statement of the per-MW figure.
- **Several key figures are estimates.** BESCOM sales (~37,000 MU) are inferred from KERC's FY25 true-up (Rs 2,068 crore ÷ Rs 0.56/unit). The 1,800 kWh household figure, the grid water intensity (especially hydro allocation) and the comparison-industry figures marked "estimate" are norm-based, not plant data.
- **Bengaluru capacity figures differ by source and definition** (Cushman 162 MW, others 78 MW or less).
- **Policy details** for the 2026–31 policy come from press reporting of the policy text. Operational guidelines are not yet issued.
- **Supply-voltage thresholds** come from a KERC presentation and a June 2025 amendment as reported. Specific connections depend on KPTCL feasibility studies.

## Sources

1. <https://www.deccanherald.com/amp/story/india%2Fkarnataka%2Fpower-use-rose-1135-in-first-year-of-gruha-jyothi-scheme-3328414>
2. <https://www.wrpc.gov.in/allfile/230520251426084745LGBR_2025_26.pdf>
3. <https://www.newslaundry.com/2026/04/16/in-bengalurus-water-stressed-areas-sit-most-of-its-data-centres>
4. <https://www.thenewsminute.com/amp/story/karnataka/karnatakas-new-data-centre-policy-puts-water-energy-in-focus-what-does-it-say>
5. <https://environmentclearance.nic.in/DownloadPfdFile.aspx?FileName=7i/g47yADhs9B1o3JSTt240Uc3HnYhglwPFPH/UuSsoMxXBzcza6BcgN0DG1v0HG5AC6vRT9mgeGubY60SuxccBdrUIK/+GfqQU8C+mlWGc%3D&FilePath=93ZZBm8LWEXfg+HAlQix2fE2t8z/pgnoBhDlYdZCxzWF1OLE6RXe5MiAhSH8vdQ1>
6. <https://india.mongabay.com/2023/08/should-rural-india-drink-urban-wastewater/>
7. <https://www.deccanherald.com/india/karnataka/top-court-stays-hc-order-711857.html>
8. <https://smartcity.eletsonline.com/bengalurus-water-transformation-how-bwssb-is-rewriting-urban-water-governance/>
9. <https://billunits.in/state-calculators/bescom-bill-calculator/>
10. <https://www.deccanherald.com/india/karnataka/at-79-gruha-jyothi-coverage-lowest-in-bescom-limits-3323812>
11. <https://theprint.in/india/kerc-increases-electricity-tariffs-for-commercial-industrial-consumers/2869823/>
12. <https://kebea.org/assets/img/seminars/Conditions%20of%20Power%20Supply%2004.07.2024.pdf>
13. <https://www.teamleaseregtech.com/updates/article/44813/kerc-notified-regarding-the-increase-in-the-limit-of-contract-demand-c/>
14. <https://cea.nic.in/wp-content/uploads/resource_adequacy_st/2024/08/Karnataka.pdf>
15. <https://english.hindusthansamachar.in/Encyc/2026/8/16/Karnataka-turns-thermal-power-.php>
16. <https://www.deccanherald.com/amp/story/india%2Fkarnataka%2Fbengaluru%2Fbwssb-sells-treated-water-for-rs-360-per-tanker-750358.html>
17. <https://www.downtoearth.org.in/science-technology/indias-digital-thirst-how-bengalurus-tech-dreams-are-colliding-with-a-worsening-water-crisis>
18. <https://powerline.net.in/2026/09/04/water-stress-thermal-power-plants-take-steps-to-optimise-consumption/>
19. <https://www.indiaspend.com/barely-regulated-thermal-power-plants-use-up-more-water-than-permitted-rti-data-show>
20. <https://grokipedia.com/page/Raichur_Thermal_Power_Station>
21. <https://www.unitedbreweries.com/sites/united-breweries/files/united-breweries/sustainability/statutory-information-annexure-a/Sustainability-Report-FY-23-24.pdf>
22. <https://www.unitedbreweries.com/pdf/InvestorReport/Annual%20Report%202024-2025.pdf>
23. <https://www.toyotabharat.com/news/2017/toyota-kirloskar-motor-honored-for-its-excellence-in-water-management.html>
24. <https://blog.gaadikey.com/toyota-kirloskar-motor-advances-sustainability-on-biodiversity-day-2026>
25. <https://www.v3cars.com/press-release/toyota-kirloskar-motor-environmental-commitment>
26. <https://www.deccanherald.com/india/karnataka/bengaluru/bwssb-powers-up-finances-with-green-energy-and-biogas-3597066>
27. <https://swarajyamag.com/news-brief/bengaluru-metro-blue-line-could-run-entirely-on-solar-power-iisc-study-finds-annual-savings-may-cross-rs-2600-crore>
28. <https://www.metrorailnews.in/bangalore-metro-say-no-to-fare-hike/>
29. <https://www.gem.wiki/JSW_Steel_Vijayanagar_steel_plant>
30. <https://cpcb.nic.in/uploads/thermal_power_plant_overview.pdf>
31. <https://www.deccanherald.com/india/karnataka/bengaluru/bengalurus-water-demand-will-go-up-in-summer-but-we-can-handle-it-bwssb-chief-953580.html>
32. <https://www.propnewz.com/blog/bwssb-cauvery-stage-5-water-buyer-checklist-2026-05-25>
33. <https://www.deccanherald.com/amp/story/india%2Fkarnataka%2Fbengaluru%2Fbwssb-added-276-lakh-water-connections-since-2014-3488920>
34. <https://www.pressreader.com/india/the-hindu-bangalore-9WW1/20240403/281651080121605>
35. <https://www.deccanherald.com/amp/story/india%2Fkarnataka%2Fbengaluru%2Fbwssb-engineers-visit-crisis-hit-dhobi-ghats-offer-treated-water-2942293>
36. <https://www.downtoearth.org.in/science-technology/indias-digital-thirst-what-data-centre-giants-arent-saying-about-their-water-use>
37. <https://earthjournalism.net/stories/what-data-center-giants-arent-saying-about-their-water-use-in-india>
38. <http://cdn.hl.com/pdf/2025/real-estate-highlight-data-center-india-edition.pdf>
39. <https://sbi.bank.in/documents/57189647/58231607/Sector+Report+DataCentre.pdf/f1919592-ee66-b50b-ea20-75fbb27c9bb5?t=1779885206866>
40. <https://citizenmatters.in/compulsory-cauvery-connections-wont-solve-bengaluru-water-crisis-citizens-experts/>
41. <https://opencity.in/bengaluru-and-ground-water/>
42. <https://citizenmatters.in/promise-of-cauvery-stage-v-bengalureans-to-be-worry-free/>
43. <https://smartcity.eletsonline.com/bwssb-powering-the-ai-driven-future-of-water-management/>
44. <https://www.thehansindia.com/news/cities/bengaluru/bengalurus-groundwater-depletes-as-extraction-hits-100-942949>
45. <https://community.nasscom.in/communities/public-policy/analysing-data-centre-policies-india>
46. <https://www.ahlawatassociates.com/blog/india-data-centre-policy-by-state>
47. <https://www.businessworld.in/article/karnataka-lifts-cap-on-green-power-tariff-reimbursement-for-data-centres-551925>
48. <https://thesun.my/news/malaysia-news/johor-data-centre-projects-face-rigorous-water-and-power-assessments/>
49. <https://www.malaymail.com/news/malaysia/2026/01/05/how-johor-vets-data-centres-water-efficiency-utilities-and-location/204328>
50. <https://asiadaily.org/news/10940/>
51. <https://www.wionews.com/india-news/data-centres-are-not-optional-so-who-s-responsible-for-the-damage-part-2-1783461918187>
52. <https://www.nst.com.my/amp/news/nation/2025/11/1324188/johor-shuts-door-water-guzzling-data-centres-tightens-approval-rules>
53. <https://w.media/opinion-stressing-over-johors-water-stress/>
54. <https://w.media/johor-stops-approving-tier-1-and-tier-2-data-centers-due-to-water-overuse/>
55. <https://www.reccessary.com/en/news/india-ai-data-center-water-crisis>
56. <https://powerpeakdigest.com/kerc-concludes-fy25-apr-cycle-with-mixed-true-up-outcomes-across-all-licensees/>
