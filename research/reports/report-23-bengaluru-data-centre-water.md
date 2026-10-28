<!-- Report 23 of the India Data Centre Atlas research series (Bengaluru data-centre water: prices, demand, sources and a treated-wastewater blueprint; atlas chapter 12). Produced with AI-assisted web research, Oct 2026, and kept as written at the time. The atlas standards register (src/data/standards.js) is authoritative where figures differ (for example India grid water 2.9 L/kWh and grid CO₂ 0.675 t/MWh after the October 2026 corrections). -->

# Bengaluru Data-Centre Water: Prices, Demand Scenarios, Rack Density, Sources and a Treated-Wastewater Supply Blueprint

Bengaluru's data centres are small water users by volume, but they matter a lot by location: even a full 1 GW build-out on cooling towers would evaporate only about 30–33 MLD (≈1.5–1.7% of BWSSB's ~1,935 MLD delivered supply), and an AI fleet on dry coolers would need under 1 MLD. Because most facilities today sit in groundwater-overdrawn eastern and northern belts and are not separately metered, the policy priority is to (1) push AI capacity onto closed-loop, warm-water, dry or adiabatic heat rejection, and (2) supply any evaporative capacity with tertiary-treated wastewater through shared, utility-owned non-potable mains rather than dedicated single-customer pipes.

## TL;DR

- **Your atlas numbers hold up.** 1 GW conventional on towers ≈ 29.6 MLD on-site (1.53% of 1,935 MLD); 1 GW AI (NVL72-class) on towers ≈ 32.6 MLD; on adiabatic ≈ 5.4 MLD; on dry coolers ≈ 1.0 MLD. Today's 162 MW probably uses ~3.4–4.8 MLD on-site, which matches the IT department's ~4,000 kL/day statewide estimate; WELL Labs' ~20 MLD uses a higher per-MW factor applied to ~292 MW. Rack density does not change water per MWh of heat on a given heat-rejection system. What it changes is which system is feasible: ≥100 kW liquid-cooled racks at 45 °C inlet make chiller-less dry cooling viable in Bengaluru, cutting on-site water by ~95–97%.
- **Water is cheap relative to power, so price will not drive behaviour.** BWSSB's top non-domestic slab is ₹99/kL (April 2025, +3%/yr, so ≈₹102 in 2026–27). Tankers run ₹83–238/kL, BWSSB treated water ₹10–15/kL (ad hoc), and groundwater charges ₹1–35/m³. A 1 GW AI campus on towers would pay ~₹118 crore/yr at ₹99, roughly 2% of its electricity bill. The state's ₹8 lakh/yr treated-water reimbursement cap is immaterial at campus scale.
- **Treated wastewater is plentiful but not "free".** Bengaluru generates ~2,200–2,300 MLD of sewage, treats ~1,200–1,350 MLD, and reuses ~820–855 MLD, mostly for lake filling in Kolar/Chikkaballapur. A full-cost tertiary (UF/RO) supply works out to ~₹60–90/kL, comparable to potable, and the Chennai TTRO plants show that stranded capacity is a real risk (90 MLD built; Chennai Metrowater sources said in 2024 that "nearly 40 MLD of water is conveyed from both the plants"). Build shared, utility-owned purple-pipe trunks with take-or-pay, capacity-reservation and successor-assignment clauses, keep a metered potable fallback capped in drought, and route Hoskote off the existing KC Valley corridor.

## Key Findings

1. **Measurement is the binding gap.** BWSSB has not tracked data-centre supply as a category (chairman Ram Prasath Manohar said the board "had only recently been instructed to begin gathering this information"); its records, cited by Down To Earth, show five data centres together receiving only ~129,000 L/month (≈4.3 kL/day) at ₹99/kL, and BWSSB notes that where data centres sit inside larger buildings "the entire premises… is supplied under one connection." That implies most cooling water comes from borewells, tankers or shared building connections. KSPCB has no consolidated cooling-water accounting. The IT department's ~4,000 kL/day for 32 facilities came from "informal conversations with operators."
2. **The physics is simple.** Evaporative heat rejection consumes ≈1.5 L per kWh of heat (latent heat of water ≈2,400 kJ/kg), plus blowdown. That is why towers sit at ~1.7–1.9 L/kWh of IT regardless of rack density, and why removing evaporation (dry coolers) is the only way to get on-site WUE toward ~0.05.
3. **Scale versus BWSSB is modest; locality is not.** Even 1 GW on towers is <2% of BWSSB supply. But Devanahalli's groundwater stage of extraction is 169%, the highest in Bengaluru Rural district (GWD–CGWB Dynamic Ground Water Resources of Karnataka 2024), and Bengaluru Urban's is 186.7% (National Compilation on Dynamic Ground Water Resources of India 2024), so a 3–5 MLD campus drawing from local aquifers is a material local stressor.
4. **Indirect (power-station) water is equal to or larger than on-site water for any low-WUE design.** At the atlas's 2.0 L/kWh Karnataka grid factor, 1 GW of AI load implies ~46–48 MLD-equivalent at power stations whatever the cooling choice. This argues for pairing low-water cooling with renewable PPAs (the Hoskote park's Pavagada solar link).
5. **The Hoskote 60 MLD allocation is ~2.7× what a 500 MW AI park on towers would need (≈22 MLD of secondary feed), and ~100× what a dry-cooled park would need.** The allocation should be tied to the cooling design, not reserved by default.

## Part 1 — Water pricing and data-centre water demand

### (a) Bengaluru tariff and price table

| Category / source | Rate | Notes / source |
|---|---|---|
| Domestic (individual houses), 0–8 kL/month | ₹8.50/kL (was ₹7) | BWSSB revision notified 10 Apr 2025, first since 2014; Citizen Matters |
| Domestic 8–25 kL | ₹14/kL (was ₹11) | same |
| Domestic 25–50 kL | ₹34/kL (was ₹26) | same |
| Domestic >50 kL | ₹55/kL (was ₹45) | same |
| Apartments (new slab model replacing ₹22 bulk rate) | ₹25 (≤2 lakh L), ₹28 (2–5 lakh L), ₹32 (5–10 lakh L) per kL | Apr 2025; revised Sept 2025 to a per-family allowance of 200 L/day at ₹32/kL (Deccan Herald) |
| Non-domestic / commercial / industrial 0–10 kL | ₹60/kL (was ₹50) | Citizen Matters table of BWSSB order |
| Non-domestic 10–25 kL | ₹70/kL | same |
| Non-domestic 25–50 kL | ₹80/kL | same |
| Non-domestic 50–75 kL | ₹95/kL | same |
| Non-domestic 75–100 kL | ₹98/kL | same |
| Non-domestic >100 kL (where all DC volume falls) | ₹99/kL (was ₹87) | Down To Earth also reports "BWSSB supplies water to industries at a rate of Rs 99 per kilolitre" |
| Annual indexation | +3% every 1 April | BWSSB; 2026–27 top slab ≈ ₹101.97/kL per a third-party calculator (not a BWSSB publication) |
| Sanitary charge on borewells/wells | +₹30 (domestic), +₹125 (non-domestic) per month vs prior | Deccan Herald, Apr 2025; full non-domestic sanitary schedule not verified here |
| Private tanker caps (DC order, 7 Mar 2024) | 6,000 L: ₹600 (≤5 km)/₹750 (5–10 km); 8,000 L: ₹700/₹850; 12,000 L: ₹1,000/₹1,200 | ≈ ₹83–125/kL; incl. GST; Bengaluru Urban DC K A Dayananda |
| Actual tanker market, 2024 crisis | ₹1,800–3,000 per 12,000 L; BAF survey median ₹131/kL, high ₹238/kL (RR Nagar), low <₹100/kL (Electronic City) | Caps were widely not enforced (The Hindu, Deccan Herald) |
| BWSSB secondary-treated water | ₹10/kL (Hebbal STP; construction users 2024) | Builders also pay transport; tanker of 6,000 L delivered ≤5 km at ₹360 (₹60/kL delivered) |
| BWSSB tertiary-treated water | ₹15/kL (Nayandahalli, Cubbon Park STPs) | Ad hoc offer, Mar 2024 |
| Apartment STP water sold via BAF | ₹8/kL | BAF–BWSSB MoU |
| Planned tertiary pipeline to Peenya industries | "50% of the prevailing tariff" (≈ ₹31–51/kL inferred) | 27-km HDPE line from 4 MLD Nagasandra STP; ₹20–27 crore; stated intent, no notified rate |
| Groundwater charges (Karnataka, from July 2025) | ₹1–35/m³ above 25 m³/day; digital metering + NOC mandatory | Application ₹500/borewell + ₹3,000 survey; industrial registration ₹500 |
| KGWA NOC example (safe taluk) | ₹4,002.5/day for 1,601 m³/day ≈ ₹2.5/m³ | JSW, Ballari NOC; Bengaluru taluks are over-exploited and charges would be higher |
| Atlas values | Potable ₹99; treated ₹40; borewell ₹20 (all-in pumping+charges) | ₹40 sits between the ad hoc ₹10–15 and a full-cost tertiary ₹60–90 (see Part 3) |

**What BWSSB itself spends.** BWSSB reports spending ~₹200 crore/month to supply water against ~₹120 crore collected, with ~₹90 crore/month on electricity to pump Cauvery water ~90–110 km and 300–450 m uphill (Citizen Matters, citing BWSSB). Dividing by ~1,935 MLD (≈58 million kL/month) gives an estimated production cost of ~₹34/kL, about ₹47/kL per billed kL after 26.5% non-revenue water, of which ~₹15.5/kL is electricity. The ₹99 industrial slab therefore cross-subsidises households. That is fair, but it also means data-centre use of potable water is profitable to BWSSB, which weakens the utility's incentive to push DCs onto treated water.

**What data centres likely pay, by cluster (estimate).**
- **Whitefield/ITPL, K R Puram, Electronic City Phase I (inside the BWSSB network):** ₹99–102/kL plus sanitary charge if on a Cauvery connection. In practice the reported BWSSB billing is tiny, which points to borewells plus tankers at ₹83–238/kL in summer.
- **Yelahanka:** BWSSB or groundwater. Treated-water precedent: the Yelahanka gas power plant takes ~15 MLD from the Jakkur STP.
- **Hoskote, Devanahalli (KIADB areas outside the core BWSSB network):** KIADB supply or groundwater (KIADB tariff not verified here) plus groundwater charges; Hoskote park water would come from the 60 MLD BWSSB secondary allocation plus tenant-run tertiary treatment.

### (b) Reported data-centre water figures today

| Source | Figure | What it actually measures |
|---|---|---|
| Karnataka IT department (Newslaundry/TNM, Apr 2026) | ~4,000 kL/day (4 MLD) for 32 facilities (31 in Bengaluru) | Informal operator inputs |
| WELL Labs (Shashank Palur) | ~20 MLD | 26 ML/MW/yr factor × capacity; IT department says 18 of 32 centres total 292.27 MW → 292 × 26 ML ≈ 7,600 ML/yr ≈ 20.8 MLD |
| IT Minister Priyank Kharge (Assembly, Mar 2026) | 25 ML per MW per year ("each mega watt demands 25 million litres of water a year"; called DCs "heavy water and energy guzzlers") | Implies ~2.85 L/kWh at full load |
| BWSSB billing (Down To Earth) | ~129,000 L/month for five DCs | Only DCs with separate connections |
| Down To Earth permissions estimate | Reported as ~812.9 ML/yr (≈2.2 MLD) in one version and ~4.93 MLD in a syndicated version | Internal inconsistency; treat as 2–5 MLD of permissions |
| Single allotment example | ETL Secure Space: 650 kL/day allotted | Government order |
| Deloitte (via DTE) | 20 MW DC ≈ 1.4 MLD | ≈70 kL/MW/day, the same order as WELL Labs |

**Atlas estimate from capacity (162 MW live IT).** Formula: On-site MLD = IT MW × utilisation × 24 h × WUE (L/kWh) ÷ 1,000.
- All on cooling towers (u = 0.65, WUE 1.9): 162 × 0.65 × 24 × 1.9 ÷ 1,000 = **4.80 MLD**.
- 70% towers / 30% air-cooled chillers (WUE 0.1): **3.44 MLD**.
- All air-cooled chillers: **0.25 MLD**.

**Interpretation.** The IT department's 4 MLD is physically consistent with a mostly water-cooled 160–290 MW fleet at realistic utilisation. WELL Labs' 20 MLD is plausible only if you assume full-load operation, high blowdown, or a factor that already bundles some indirect use. The factors in circulation (NVIDIA's 2.6 million gallons/MW/yr for towers ≈ 1.1 L/kWh at full load; Kharge's 25 ML ≈ 2.85; WELL Labs' 26 ML ≈ 2.97) span nearly 3×. The atlas should show 3.4–4.8 MLD as the central range and 20 MLD as an upper bound.

### (c) Growth scenarios — formulas and results

**Formulas**
- IT energy (GWh/yr) = IT MW × u × 8,760 ÷ 1,000
- Facility energy (GWh/yr) = IT energy × PUE
- On-site water (MLD) = IT MW × u × WUE × 0.024; ML/yr = MLD × 365
- Power-station water (ML/yr) = facility GWh × grid water factor (L/kWh) (Karnataka 2.0; India 5.0)
- Annual water cost (₹ crore) = ML/yr × price (₹/kL) ÷ 10,000
- Share of BWSSB = on-site MLD ÷ 1,935

**Assumptions (estimates).**
- Conventional (6–12 kW air racks): u = 0.65. Water-cooled chillers + towers at PUE 1.45, WUE 1.9; air-cooled chillers at PUE 1.6, WUE 0.1.
- AI (132–600 kW liquid racks): u = 0.8 (midpoint of 0.7 inference and 0.9 training). Towers at PUE 1.20, WUE 1.7; adiabatic dry coolers at PUE 1.22, WUE 0.28; dry coolers at PUE 1.25, WUE 0.05.
- PUE context: Uptime Institute's 2025 survey puts the global weighted average PUE at 1.54, flat for a sixth consecutive year, with facilities commissioned in the last five years averaging 1.48 and those over 20 MW about 1.44 (its 2026 survey reports 1.52, with 23% of respondents below 1.3); Google reports its 2025 global fleet averaged 1.09.

**Table C1 — On-site water, energy, indirect water and share of BWSSB**

| Scenario | IT MW | On-site MLD | On-site ML/yr | Facility GWh/yr | Power-station water, KA grid (ML/yr; MLD) | Share of BWSSB 1,935 MLD |
|---|---|---|---|---|---|---|
| Conventional, towers | 100 | 2.96 | 1,082 | 826 | 1,651; 4.5 | 0.15% |
| Conventional, air-cooled chillers | 100 | 0.16 | 57 | 911 | 1,822; 5.0 | 0.01% |
| AI, towers | 100 | 3.26 | 1,191 | 841 | 1,682; 4.6 | 0.17% |
| AI, adiabatic | 100 | 0.54 | 196 | 855 | 1,710; 4.7 | 0.03% |
| AI, dry | 100 | 0.10 | 35 | 876 | 1,752; 4.8 | 0.005% |
| Conventional, towers | 600 | 17.8 | 6,491 | 4,954 | 9,907; 27.1 | 0.92% |
| Conventional, air-cooled chillers | 600 | 0.94 | 342 | 5,466 | 10,932; 30.0 | 0.05% |
| AI, towers | 600 | 19.6 | 7,147 | 5,046 | 10,092; 27.6 | 1.01% |
| AI, adiabatic | 600 | 3.23 | 1,178 | 5,130 | 10,260; 28.1 | 0.17% |
| AI, dry | 600 | 0.58 | 210 | 5,256 | 10,512; 28.8 | 0.03% |
| Conventional, towers | 1,000 | 29.6 | 10,819 | 8,256 | 16,513; 45.2 | 1.53% |
| Conventional, air-cooled chillers | 1,000 | 1.56 | 569 | 9,110 | 18,221; 49.9 | 0.08% |
| AI, towers | 1,000 | 32.6 | 11,914 | 8,410 | 16,819; 46.1 | 1.69% |
| AI, adiabatic | 1,000 | 5.38 | 1,962 | 8,550 | 17,100; 46.8 | 0.28% |
| AI, dry | 1,000 | 0.96 | 350 | 8,760 | 17,520; 48.0 | 0.05% |

On the all-India grid factor (5.0 L/kWh), multiply the power-station column by 2.5. For example, 1 GW AI on towers implies ~115 MLD-equivalent off-site.

**Table C2 — Annual on-site water cost (₹ crore/yr)**

| Scenario | ML/yr | @ ₹99 potable | @ ₹102 (2026–27) | @ ₹40 treated | @ ₹20 borewell | @ ₹131 tanker median |
|---|---|---|---|---|---|---|
| 100 MW conv. towers | 1,082 | 10.7 | 11.0 | 4.3 | 2.2 | 14.2 |
| 100 MW AI towers | 1,191 | 11.8 | 12.1 | 4.8 | 2.4 | 15.6 |
| 100 MW AI dry | 35 | 0.35 | 0.36 | 0.14 | 0.07 | 0.46 |
| 600 MW conv. towers | 6,491 | 64.3 | 66.2 | 26.0 | 13.0 | 85.0 |
| 600 MW AI towers | 7,147 | 70.8 | 72.9 | 28.6 | 14.3 | 93.6 |
| 1 GW conv. towers | 10,819 | 107.1 | 110.4 | 43.3 | 21.6 | 141.7 |
| 1 GW AI towers | 11,914 | 117.9 | 121.5 | 47.7 | 23.8 | 156.1 |
| 1 GW AI adiabatic | 1,962 | 19.4 | 20.0 | 7.8 | 3.9 | 25.7 |
| 1 GW AI dry | 350 | 3.5 | 3.6 | 1.4 | 0.7 | 4.6 |

**What this means.** At ~₹7/kWh, 1 GW of AI load (8,410 GWh) costs ~₹5,900 crore/yr in electricity, so even potable water at ₹99 is ~2% of the power bill. Switching from towers to dry coolers raises energy use by ~4% (≈350 GWh/yr, ~₹245 crore) to save ~31 MLD. Operators will not make that trade on water price alone. Siting conditions, groundwater NOCs and WUE caps must do the work. The 2026–31 policy's treated-water reimbursement (100% of charges, capped at ₹8 lakh/yr for five years) covers ~1.7% of a 100 MW tower campus's ₹4.8 crore treated-water bill at ₹40/kL. Its WUE-linked reimbursement (up to ₹30 lakh/yr for two years, for WUE 0.7–1.3 L/kWh) is likewise small, and read literally it excludes dry-cooled sites below 0.7.

### (d) Rack density versus water and energy

**The core principle.** One kWh of IT electricity becomes one kWh of heat whatever the rack density, so water per MWh is set by the heat-rejection path, not by kW per rack. Density matters indirectly, through six channels:
1. **Feasibility.** Above roughly 30–50 kW air becomes impractical. NVL72-class racks (≈120–132 kW GB200; up to ~142 kW GB300) require direct-to-chip liquid cooling, and GB200/GB300 still shed roughly 10–15% of heat to air (the atlas's 0.85 liquid share). Vera Rubin generation trays are described as fully liquid-cooled; the atlas's 0.9 is conservative.
2. **Coolant temperature.** NVIDIA specifies 45 °C inlet (≈55–65 °C return) for all MGX racks. ASHRAE's W-classes (W32–W45+) define this warm-water regime.
3. **Chiller versus chiller-less.** With 45 °C supply and a ~10 °C approach, dry coolers can reject heat until ambient reaches ~35 °C. NVIDIA says chillers may be needed only ~1% of the year in some climates and calls its DSX reference design "zero water consumption."
4. **Fan and compressor energy.** Liquid capture removes server fans and CRAH load, so PUE falls from ~1.45–1.6 to ~1.15–1.25.
5. **Free-cooling hours.** Bengaluru's design wet-bulb (~19.4 °C, atlas) is mild. The useful threshold for a 45 °C loop is dry-bulb, and Bengaluru's summer maxima are typically mid-30s °C (atlas estimate; verify with ISHRAE hourly data). That gives near-year-round dry operation with adiabatic assist on peak afternoons.
6. **Concentration.** The same 1 GW needs ~125,000 racks at 8 kW (Uptime's 2024 average typical density), ~7,600 at 132 kW, or ~1,700 at 600 kW. Water demand therefore lands at a few large meters, which makes treated-water supply easier to plumb but locally more intense.

**Table D1 — Rack density vs cooling, PUE, WUE and water per rack (estimates; formula: L/rack/day = kW × u × 24 × WUE)**

| Rack class | Typical cooling | Liquid share | PUE (typ.) | WUE L/kWh (towers / adiabatic / dry) | Water per rack per day (towers / dry) | Racks per 100 MW |
|---|---|---|---|---|---|---|
| 6 kW enterprise/colo | Raised floor CRAH, chilled water + towers | 0 | 1.5–1.6 | 1.9 / – / 0.1 (air-cooled chiller) | 178 L / 9 L | 16,700 |
| 12 kW hot/cold-aisle containment | Chilled water + towers or air-cooled chillers | 0 | 1.4–1.5 | 1.8 / – / 0.1 | 337 L / 19 L | 8,300 |
| 50 kW air + rear-door HX | RDHx on chilled water | 0 (atlas) | 1.3–1.4 | 1.7 / 0.3 / 0.1 | 1,530 L / 90 L | 2,000 |
| 132 kW GB200 NVL72 | DLC 45 °C + residual air | 0.85 | 1.15–1.25 | 1.7 / 0.28 / 0.05 | 4,310 L / 127 L | 760 |
| 190 kW Vera Rubin | DLC, (near-)fully liquid | 0.9 | 1.12–1.2 | 1.7 / 0.25 / 0.05 | 6,200 L / 182 L | 530 |
| 600 kW Kyber | Fully liquid | 1.0 | ~1.1–1.15 | 1.7 / 0.25 / 0.05 | 19,580 L / 576 L | 170 |

(u = 0.65 for 6–12 kW, 0.75 for 50 kW, 0.8 for AI.)

**Reading the table.** Per rack, water rises roughly in proportion to kW. Per MWh it is flat on towers (~1.7–1.9 kL/MWh). Density therefore matters only if the operator takes the chiller-less, dry-cooler option that warm-water liquid cooling unlocks. The same NVL72 hall costs 4.3 kL/rack/day on towers and 0.13 kL on dry coolers, a ~97% cut for roughly a 4% energy penalty (and often no penalty versus legacy air-cooled designs).

## Part 2 — Sources of Bengaluru's water

### (b) Water balance (MLD, 2024–2026)

| Item | MLD | Basis / source | Confidence |
|---|---|---|---|
| Cauvery Stages I–IV capacity | ~1,450 | DK Shivakumar, Sept 2024 | Reported |
| Cauvery Stage V (inaugurated 16 Oct 2024) | +775 | ₹4,336–5,550 crore (JICA); 110 villages; 104 connected by 2025 | Reported |
| Cauvery WTP capacity | 2,225–2,293 | BWSSB (Elets, Apr 2026: 2,293 MLD across six WTPs) | Reported |
| Cauvery actually delivered | ~1,935 | Legislative Council, Aug 2026 (atlas) | Reported |
| Non-revenue water | 26.5% (≈510 MLD of delivered) | BWSSB: down from 51% in 2013 | Reported |
| Groundwater (BWSSB + private borewells) | ~600–1,000 | ~40% of city relies on it; ~1,000 MLD rough estimate (SANDRP/Biome) | Estimate |
| Industrial groundwater draft (Bengaluru, 2025) | ~375 | 13,700 ham/yr (OpenCity from CGWB 2025) | Derived |
| TG Halli (Arkavathy) | 0 now (diluted 1:20 with Cauvery); 110 planned | Awaits 1.7 TMC from Yettinahole | Reported |
| Hesaraghatta | 0 | ~1,000 mcft storage, not used for supply | Reported |
| Sewage generated | 2,200–2,300 (some reports 2,580) | BWSSB/DH 2025; Vijay Karnataka via Urban Acres 2026 | Reported, varies |
| BWSSB STP capacity / treated | 1,348.5 capacity; ~1,200–1,350 treated | 33–34 STPs; plus ~370 MLD private STPs; ~580 MLD untreated (DH 2025) | Reported |
| Treated water reused | ~820–855 | 825 environmental + 30 commercial (BWSSB, 2026); mostly KC/HN Valley lakes | Reported |
| KC Valley actual supply | ~290 of 440 design | Deccan Herald (Phase II launch) | Reported |
| HN Valley | 210 design | ₹948 crore, 137 km | Reported |
| Decentralised apartment STP reuse | ~47 | ~3,000 plants | Estimate |
| Demand (freshwater) | ~2,600–2,632 (higher-end 3,400) | BWSSB/Biome estimates | Estimate |
| Gap | ~500 | Commonly cited deficit | Estimate |

**Cauvery allocation.** The Supreme Court's 16 Feb 2018 verdict raised Karnataka's share from 270 to 284.75 TMC, including 4.75 TMC "for drinking and domestic purposes including such need for the whole city of Bengaluru." Reported Bengaluru totals conflict: TNM says 18.25 rising to 23 TMC, while then BWSSB chairman Tushar Girinath said the city draws ~29 TMC (10 tribunal + 9 state + 10 unallocated). At 1 TMC/yr ≈ 77.6 MLD, 23 TMC ≈ 1,785 MLD and 29 TMC ≈ 2,250 MLD, so Stage V essentially uses up the allocation. Stage VI (~500 MLD, with partially solar-powered pumping) faces approval hurdles. Mekedatu's status was not verified in this research.

**Pumping energy (estimate).** Lifting water ~350 m at ~75% wire-to-water efficiency takes ≈1.27 kWh/kL before friction losses over ~100 km. BWSSB's ~₹90 crore/month power bill implies ~2 kWh/kL all-in. For a cooling tower on Cauvery water, the embedded pumping energy adds only ~0.4% to facility energy. The real cost is the opportunity cost of drinking water, not energy.

**Groundwater.** Of 14,781 BWSSB/BMRDA borewells, 6,997 had stopped yielding in 2024. The city has an estimated ~3 lakh borewells, government and private. Extraction-stage figures disagree: ~187% (CGWB/GWD 2024, Deccan Herald), 186.7% (National Compilation on Dynamic Ground Water Resources of India 2024, per Deccan Herald, Oct 2025), 177% (OpenCity, 2025), and "almost 10 times" recharge (Newslaundry, citing a CGWB document, probably a ward-level or core-city figure). Use ~180–187% for Bengaluru Urban and flag the outlier. Devanahalli is at 169%, the highest in Bengaluru Rural district (GWD–CGWB 2024). Since its 2019 inception the state groundwater authority has granted only 205 NOCs in Bengaluru and issued 400+ notices to violators.

**Tankers.** In 2024 the district administration enlisted ~200 private tankers on contract. In summer 2026 BWSSB deployed 1,260 mini-tanks and 117 tankers across 448 high-alert pockets, many in the same eastern corridor that hosts most data centres. Tankers mostly move groundwater around, so they are not a separate source.

## Part 3 — Supplying treated wastewater to data centres

### (e) Engineering components

1. **Source quality.** BWSSB's Hoskote offer is secondary-treated water, with tenants to "undertake tertiary treatment." Secondary effluent can carry ~35 mg/L ammonia-N, 25 mg/L BOD and 35 mg/L TSS. Cooling-tower make-up targets are roughly TSS 5–30 mg/L, ammonia-N 1–5 mg/L and total P <1–5 mg/L (Chemical Engineering). Ammonia above 0.5 mg/L corrodes copper alloys and promotes biofilm (San Diego County Water Authority guidance).
2. **Tertiary train (central or campus).** Coagulation/filtration or MBR → UF → partial or full RO → UV/chlorine disinfection, followed by on-site side-stream filtration, softening, biocide dosing, and a Legionella water-management plan (ASHRAE Standard 188 practice).
3. **Cycles of concentration.** Raw reclaimed water forces low cycles (~3), so make-up = 1.5× evaporation. RO-polished water allows 6–8+ cycles. One operator nearly doubled cycles and cut make-up ~50% through better pH and dosing control (Lux Research/Veolia example).
4. **Energy.** UF+RO uses ~0.8–1.2 kWh/m³ (Pearce 2008), with a literature range of 0.7–2.3 kWh/m³ (IWA). Pumping over 10–30 km adds ~0.1–0.5 kWh/m³ (estimate). At 1.7 L/kWh this adds ~0.2–0.3% to facility energy, which is negligible.
5. **Network.** A separate purple-pipe (non-potable) main plus a pumping station at the STP. Size for 1–5 MLD per campus, roughly DN300–DN500 HDPE/DI (estimate). Include 2–3 days of storage on-site and a metered, valved potable or borewell fallback.
6. **Reject and blowdown disposal.** RO reject plus blowdown runs to ~30–35% of feed at high TDS. Disposal options are a return to BWSSB sewer under consent (simplest where the STP can accept the salinity), evaporation ponds (land-hungry), or ZLD (very energy-intensive). This must be written into KSPCB consent.
7. **Cost benchmarks (reported).**
   - Peenya: 27 km HDPE, 4 MLD, ₹20–27 crore (≈₹0.75–1.0 crore/km incl. overhead tank).
   - HN Valley: ₹948 crore for 210 MLD and 137 km (incl. pumping).
   - KC Valley Phase 1: ₹1,270–1,342 crore for 440–448 MLD.
   - Chennai Kodungaiyur TTRO: 45 MLD, ₹235 crore plant (₹255 crore incl. ~28 km pipes), 15-yr O&M ₹205 crore.
   - Chennai Koyambedu TTRO: 45 MLD, ₹396.5 crore estimate / ₹482–486 crore as awarded/commissioned incl. ~60 km main; 15-yr O&M ₹197.6 crore.
   - KIADB Devanahalli: 18.5 km pipe from a ₹105 crore 40 ML STP.
8. **Unit-cost derivation (estimate).** Plant capex ≈ ₹5.2–8.8 crore per MLD. O&M ≈ ₹8/kL (Chennai 15-yr O&M ÷ volume). Energy ≈ ₹8–12/kL.

**Worked example 1 — a 100 MW AI campus on towers (Whitefield/Kadubeesanahalli).**
- Make-up: 3.26 MLD. At 6 cycles, evaporation ≈ 2.72 MLD and blowdown ≈ 0.54 MLD.
- Secondary feed at 75% RO recovery: ≈4.35 MLD; RO reject ≈1.1 MLD.
- Infrastructure: a 4.35 MLD tertiary skid (₹23–38 crore); ~10 km main to the nearest STP. BWSSB is planning a 50 MLD Kadubeesanahalli STP, and the Boson pilot there already produces 70 kL/day, so ₹10–30 crore at ₹1–3 crore/km. Add 7–10 ML of storage.
- Levelised cost (10%, 15 yr): capital ≈ ₹25/kL (plant) + ₹16/kL (pipe), O&M + energy ≈ ₹18/kL, secondary water ₹10–15/kL, so **≈ ₹70–75/kL of product**. Chennai's Koyambedu revenue (₹29.25 lakh/day on 40 MLD ≈ ₹73/kL) independently confirms this level.
- Conclusion: at full cost, tertiary water is roughly as expensive as ₹99 potable. The atlas's ₹40/kL is realistic only with shared trunk infrastructure or public capex.
- Dry-cooled alternative: 0.10 MLD, which can be met by tanker-delivered tertiary water or a small branch line.

**Worked example 2 — Hoskote 500 MW park.**
- Need: AI on towers 16.3 MLD make-up (≈22 MLD secondary feed); conventional on towers 14.8 MLD; AI dry 0.48 MLD. The 60 MLD allocation is ~2.7× the worst case.
- Route: the KC Valley main already runs ~300+ MLD of secondary water "via Hoskote Road to Kolar," so the cheapest option is a tap-off plus a common 20–25 MLD tertiary plant (₹105–220 crore) run by KIADB/BWSSB or a DBO concessionaire. That avoids a dedicated 30–40 km line from city STPs.
- Water bill: ~₹24 crore/yr at ₹40/kL for the tower case.
- Allocation trade-off: every MLD diverted from KC Valley is an MLD not reaching Kolar's tanks (which already receive only ~290 of 440 MLD). Reserve only what the cooling design needs and release the rest.

**Indicative STP–cluster pairings (distances are map-based estimates; verify).**
- Whitefield/ITPL: Kadubeesanahalli and K R Puram STPs (~5–10 km).
- Electronic City: the KC Valley STP cluster at Bellandur/Agara (~10–15 km).
- Yelahanka: Jakkur STP (<5 km; already serving 15 MLD to the gas plant).
- Devanahalli: HN Valley corridor or the KIADB 18.5 km line.
- Hoskote: KC Valley main tap.

**Global precedents.**
- Google Douglas County (Georgia): a Google-financed sidestream plant ~5 miles away; just 13.2 million of 422 million gallons withdrawn in 2021 was potable, and in 2023 over 90% of 345.6 million gallons was recycled.
- Google uses non-potable water at >25% of campuses and has committed >$500 million to water and reuse infrastructure.
- Microsoft Quincy (Washington): a water-reuse utility cut potable use 97%.
- AWS/Loudoun Water (Virginia): first approval to use reclaimed water with direct evaporative cooling.
- Singapore NEWater supplies industry, including data centres.
- Indian industrial precedents: Chennai TTRO (2019, DBO with 15-yr O&M; ₹80/kL direct and ₹65/kL to SIPCOT; freshwater to industry ₹132/kL); Navi Mumbai (tertiary at ₹18.50/m³ vs MIDC ₹22.50, 50 MLD MoU, ₹494 crore over 15 years); Narasapura KIADB (dual potable + tertiary pipelines).

### (f) Pipeline lifetime, closure and risk allocation

**Mismatch of lives.**
- IT refresh: ~4–6 years.
- DC buildings: ~15–25 years (industry norm).
- Pipelines: 30–50+ years.
- Park land leases: 30+30 years under the 2026–31 policy.

A single-customer pipe is therefore a stranded-asset risk. Chennai is the cautionary case: 90 MLD of TTRO capacity was built and only ~40 MLD was conveyed in 2024, per Chennai Metrowater sources quoted by EA Water ("nearly 40 MLD of water is conveyed from both the plants", distributed to companies via SIPCOT), with Koyambedu <20 MLD at one point, because industrial demand lagged. The Kodungaiyur plant now needs a >₹1,000 crore refurbish-operate PPP (aggregator-reported; verify against WABAG filings).

**Design so closure is a non-event.**
1. **Shared trunk, private branch.** BWSSB/KIADB owns and operates looped non-potable trunks along utility corridors serving multiple users (DCs, other industry, construction, parks, lakes, district cooling). Each DC pays for only a short branch plus its meter. When a DC closes, the trunk keeps serving others and only the branch is capped.
2. **Repurposing menu.** Other KIADB tenants; construction (BWSSB saw demand jump to ~6 MLD in 2024 once potable use for construction was banned); landscaping and parks; lake top-up; district cooling for adjacent office parks; groundwater recharge structures.
3. **Contracts.**
   - Take-or-pay at 70–80% of reserved capacity for the debt tenor, typically 10–15 years.
   - Capacity-reservation fee for unused allocation, so the 60 MLD is not hoarded.
   - Assignment and successor clauses tied to the KIADB lease, so obligations pass to the next occupant.
   - Early-termination payment equal to the undepreciated branch and dedicated tertiary capex.
   - Decommissioning bond or escrow (sized at ~10–15% of branch capex) covering capping, flushing and site restoration.
   - Step-in rights for the utility to take over an on-site tertiary plant on exit.
   - Indexation aligned with BWSSB's 3% annual escalation.
4. **Who carries what.** The utility carries the trunk risk, priced into a postage-stamp tariff. The customer carries branch and dedicated-plant risk through take-or-pay and termination payments. The state carries policy risk (reallocation in drought) through explicit curtailment rules.

### (g) Policy concerns and recommended package

**Allocation priorities.** Treated water already has claimants. KC/HN Valley lake-filling supports agriculture and groundwater in Kolar and Chikkaballapur (274 lakes rejuvenated), and ~45% of treated water is released into water bodies (WELL Labs). Industrial demand in Bengaluru is ~150–155 MLD that could all be served by tertiary water (WELL Labs). Selling treated water to private DCs is equitable only if it displaces potable or groundwater use and is priced at full cost. Avoid a subsidised transfer from farmers' tanks to hyperscalers.

**Recommended package.**
1. **Meter and disclose.** Create a "data centre" tariff and consent category at BWSSB and KSPCB. Require monthly metered withdrawals by source (Cauvery, borewell, tanker, treated). Publish site-level PUE/WUE as the 2026–31 policy now requires. Fold this into the policy's water-energy "heat map."
2. **Hydrology-first siting.** Following the October 2026 national framework (20–30-year seasonal catchment water balances; protect existing users' dependable supply), make treated-water access or dry cooling a precondition for new DC approvals in over-exploited taluks. Bar new groundwater NOCs for DC cooling in Bengaluru Urban and Devanahalli.
3. **Performance standards, not only incentives.** Set a site WUE ceiling for new Bengaluru builds (for example ≤0.3 L/kWh on potable/groundwater; towers allowed only on tertiary water). Fix the WUE incentive band so sub-0.7 performers are not excluded.
4. **Cost-reflective treated-water tariff.** Price tertiary water near full cost (~₹60–90/kL) but below potable. Raise the ₹8 lakh cap or convert it into capex support for shared trunks, which is where the real cost sits.
5. **Shared non-potable grids with risk-allocation contracts.** Use the shared-trunk model, contract clauses and bond structure described in (f). Start with Hoskote (KC Valley tap) and Whitefield (Kadubeesanahalli).
6. **Drought rules.** Allow potable fallback only through a metered, capped connection with a pre-agreed curtailment ladder: during declared drought DCs shift to dry or adiabatic mode or reduce load, before households lose supply.
7. **Reject and blowdown governance.** KSPCB consent should specify the disposal route and TDS limits. Discourage ZLD's energy cost where sewer return is feasible.
8. **Governance.** Set up a single window joining the IT department (policy), KIADB (land and trunks in parks), BWSSB (STP output, trunks in city), KSPCB (consent), the groundwater authority (NOCs) and GBA (building approvals), with a published treated-water allocation register.

## (h) Caveats and where sources disagree

- **DC water today:** 4 MLD (IT department) vs ~20 MLD (WELL Labs). The difference is mostly the per-MW factor (1.1–3.0 L/kWh equivalents in circulation) and the capacity base (162 MW live vs 292 MW for 18 centres). Down To Earth's permissions estimate appears as both ~2.2 MLD and ~4.9 MLD in different versions.
- **Cauvery entitlement:** 23 TMC (TNM) vs ~29 TMC (BWSSB, 2018). Distance and lift are variously reported as 90–110 km and 300–450 m.
- **Groundwater stage:** 177%, 186.7%, ~187%, and "10×" recharge, depending on source and spatial unit.
- **Sewage and STP figures:** generation 2,200–2,580 MLD; capacity 1,348.5 MLD (BWSSB) vs ~1,523 MLD (WELL Labs, incl. others); reuse 750–855 MLD.
- **Tariff:** the 2026–27 escalated rates come from a third-party calculator, not a BWSSB schedule. The non-domestic sanitary schedule and KIADB water tariffs were not verified.
- **Modelled values:** utilisation, PUE and WUE are engineering estimates. Bengaluru dry-bulb hour distributions should be confirmed with ISHRAE/IMD hourly data before publishing chiller-less claims. NVIDIA's "zero water" and "300× water efficiency" are vendor marketing figures.
- **Chennai:** tariff (₹80/₹65) and utilisation (~40 MLD) come from secondary news sources. Kodungaiyur's >₹1,000 crore PPP is aggregator-reported.
- **Forward-looking claims:** STP additions (26 STPs/+470 MLD by June 2026; 9 STPs/475 MLD at ₹2,071 crore), Stage VI, TG Halli's 110 MLD and Hoskote timelines are plans, not delivered capacity.

## Sources

1. newslaundry — https://www.newslaundry.com/2026/04/16/in-bengalurus-water-stressed-areas-sit-most-of-its-data-centres
2. citizenmatters — https://citizenmatters.in/should-bengalureans-really-worry-about-the-cauvery-water-tariff-hike/
3. deccanherald — https://www.deccanherald.com/amp/story/india%2Fkarnataka%2Fbengaluru%2Fbwssb-cuts-apartment-water-rates-pg-sanitary-charges-3713119
4. downtoearth — https://www.downtoearth.org.in/science-technology/indias-digital-thirst-how-bengalurus-tech-dreams-are-colliding-with-a-worsening-water-crisis
5. uppclbillcalculator — https://uppclbillcalculator.com/bwssb-water-bill-calculator/
6. deccanherald — https://www.deccanherald.com/amp/story/india%2Fkarnataka%2Fbengaluru%2Fbengalureans-will-now-have-to-shell-more-for-water-bills-rates-revised-after-11-yrs-3486983
7. thenewsminute — https://www.thenewsminute.com/karnataka/bengaluru-district-administration-introduces-fixed-rates-for-water-tankers
8. pressreader — https://www.pressreader.com/india/the-hindu-international-9BN2/20240314/281676849885283
9. deccanherald — https://www.deccanherald.com/amp/story/india%2Fkarnataka%2Fbengaluru%2Fbengaluru-water-crisis-government-caps-water-tanker-prices-in-the-city-2926362
10. deccanherald — https://www.deccanherald.com/amp/story/india%2Fkarnataka%2Fbengaluru%2Fbengaluru-water-crisis-scarcity-worsens-tanker-prices-surge-up-to-rs-2850-2913143
11. deccanherald — https://www.deccanherald.com/amp/story/india%2Fkarnataka%2Fbengaluru%2Fbwssb-engineers-visit-crisis-hit-dhobi-ghats-offer-treated-water-2942293
12. pressreader — https://www.pressreader.com/india/the-hindu-bangalore-9WW1/20240403/281651080121605
13. constructionworld — https://www.constructionworld.in/urban-infrastructure/wastewater-and-sewage-treatment/bengaluru-baf-inks-mou-with-bwssb-for-treated-water-sale/53866
14. deccanherald — https://www.deccanherald.com/amp/story/india/karnataka/bengaluru/bengalurus-peenya-industrial-area-to-get-treated-water-through-dedicated-pipeline-by-april-end-3909302
15. newsfirstprime — https://newsfirstprime.com/bengaluru/bwssb-floats-tenders-to-supply-ultra-pure-treated-water-for-peenya-industries-10968618
16. watertoday — https://magazine.watertoday.org/news/national/bengaluru-peenya-industrial-area-ultra-pure-recycled-water-bwssb-bwssb-peenya-treated-water-project-bengaluru-industrial-water-sustainability-recycled-water-supply-peenya-industries-cauvery-water-conservation-bengaluru
17. citizenmatters — https://citizenmatters.in/borewell-digging-in-bengaluru-faqs-on-groundwater-extraction/
18. propsoch — https://www.propsoch.com/blogs/karnatakas-groundwater-policy-what-home-buyers-in-bangalore-must-know/
19. environmentclearance — https://environmentclearance.nic.in/DownloadPfdFile.aspx?FileName=KQ8AggkMseTDiQ24LwqhiAafPw8iHI8V1f6GrBsTnoj6+U94Asqcp28oTVVhl4lhsDfgjSEZ6ZuldAOOTA7AveGVYm3lC93ZXRjeYpqulCk%3D&FilePath=93ZZBm8LWEXfg+HAlQix2fE2t8z%2FpgnoBhDlYdZCxzX9idZhiSneADGLNdt3P8O8Mee71C%2Ft6x7+n5fSf0zymA+1FZzhh+z1NzNHjILnx2Q%3D
20. w — https://w.media/karnataka-plans-three-sustainable-data-center-parks-with-combined-capacity-of-1-gw/
21. earthjournalism — https://earthjournalism.net/stories/indias-tech-boom-collides-with-deepening-water-crisis-in-bengaluru
22. downtoearth — https://www.downtoearth.org.in/science-technology/thirsty-data-centres-thin-regulation-who-is-watching-indias-water
23. nvidia — https://blogs.nvidia.com/blog/liquid-cooling-ai-factories/
24. newslaundry — https://www.newslaundry.com/2026/10/01/karnatakas-new-data-centre-policy-puts-water-energy-in-focus-what-does-it-say
25. pantheon — https://pantheon.run/learn/nvidia-gb200-nvl72-power-and-cooling
26. supercomputing — https://www.supercomputing.news/emerging/nvidia-45c-warm-water-cooling-mgx-data-center
27. datacenterdynamics — https://www.datacenterdynamics.com/en/news/nvidia-announces-liquid-cooled-gb200-nvl72-system-with-72-blackwell-gpus/
28. qct — https://blog.qct.io/wp-content/uploads/2025/04/QCT-Qoolrack-Stand-Alone_Advanced-Liquid-Cooling-for-NVIDIA-GB200-NVL72-Systems.pdf
29. uptimeinstitute — https://datacenter.uptimeinstitute.com/rs/711-RIA-145/images/2024.GlobalDataCenterSurvey.Report.pdf
30. thewaterdigest — https://thewaterdigest.com/bengaluru-cauvery-stage-v-project-to-be-launched-on-vijayadashami/
31. citizenmatters — https://citizenmatters.in/promise-of-cauvery-stage-v-bengalureans-to-be-worry-free/
32. thehansindia — https://www.thehansindia.com/karnataka/legal-hurdles-delay-cauvery-stage-v-project-1039329
33. deccanherald — https://www.deccanherald.com/amp/story/india%2Fkarnataka%2Fbengaluru%2Fbwssb-to-launch-stage-v-of-cauvery-water-supply-scheme-on-oct-16-3224963
34. deccanherald — https://www.deccanherald.com/amp/city/bwssb-completes-65-work-at-tk-halli-plant-1148247.html
35. eletsonline — https://egov.eletsonline.com/2026/04/building-bengalurus-water-future-technology-climate-resilience-and-citizen-centric-governance/
36. thewaterdigest — https://thewaterdigest.com/bengaluru-water-authority-plans-to-build-17-new-sewage-treatment-plants/
37. sandrp — https://sandrp.in/2025/03/05/2024-bengaluru-groundwater-top-ten-reports-problems-causes-solutions/
38. akshayakalpa — https://gfm.akshayakalpa.org/read/feature-article/bengaluru-is-fated-to-run-out-of-water-when-will-the-crisis-hit
39. opencity — https://opencity.in/bengaluru-is-extracting-more-groundwater-than-nature-can-replenish/
40. deccanherald — https://www.deccanherald.com/amp/story/india%2Fkarnataka%2Fbengaluru%2Fbwssb-awaits-water-from-yettinahole-to-sustain-tg-halli-reservoir-3566221
41. deccanherald — https://www.deccanherald.com/india/karnataka/bengaluru/rising-water-level-revives-hesaraghatta-2220533
42. deccanherald — https://www.deccanherald.com/india/karnataka/bengaluru/bengaluru-to-add-26-more-stps-by-june-2026-to-expand-treated-water-capacity-3397653
43. urbanacres — https://urbanacres.in/bengaluru-wastewater-plan-targets-a-1215-mld-treatment-gap/
44. dailyhunt — https://m.dailyhunt.in/news/india/english/deccan+herald-epaper-deccan/bwssb+to+nearly+double+treated+water+capacity+by+2029-newsid-n722134055
45. deccanherald — https://www.deccanherald.com/amp/story/india%2Fkarnataka%2Fkarnataka-cm-siddaramaiah-launches-kc-valley-phase-ii-project-to-fill-30-lakes-in-kolar-3714282
46. deccanherald — https://www.deccanherald.com/amp/story/india%2Fkarnataka%2Fbengaluru%2Fhn-valley-project-to-rejuvenate-65-tanks-by-november-998319.html
47. sandrp — https://sandrp.in/2025/03/21/world-water-day-2025-smart-cities-rain-sewage/
48. propnewz — https://www.propnewz.com/blog/bengaluru-water-crisis-cauvery-stage-v-buyer-checklist-2026
49. neerain — https://neerain.com/bengaluru-water-crisis/
50. thenewsminute — https://www.thenewsminute.com/karnataka/cauvery-verdict-how-much-water-will-bengaluru-receive-76559
51. anantamias — https://anantamias.com/cauvery-water-dispute/
52. sandrp — https://sandrp.in/2018/02/16/supreme-court-judgment-on-cauvery-dispute-does-it-change-anything/
53. theweek — https://www.theweek.in/wire-updates/national/2024/10/16/mds18-ka-cauvery-water-project.html
54. grokipedia — https://grokipedia.com/page/Bangalore_Water_Supply_and_Sewerage_Board
55. deccanherald — https://www.deccanherald.com/india/karnataka/bengaluru/bwssb-to-adopt-solar-power-for-cauvery-stage-vi-pumping-stations-3816533
56. deccanherald — https://www.deccanherald.com/india/karnataka/bengaluru/growing-water-deficit-2374771
57. sandrp — https://sandrp.in/2026/04/01/groundwater-govts-actions-to-recharge-regulate-in-2025-in-india/
58. theprint — https://theprint.in/india/karnataka-approves-data-parks-in-three-cities-to-boost-digital-infrastructure/2918786/
59. chemengonline — https://www.chemengonline.com/treating-wastewater-industrial-reuse/
60. sdcwa — https://www.sdcwa.org/sites/default/files/files/water-management/recycled/techinfo-cooling-towers.pdf
61. eaiwater — https://eaiwater.com/water-treatment-trends/
62. luxresearchinc — https://luxresearchinc.com/blog/3-innovation-opportunities-in-data-center-water-management/
63. academia — https://www.academia.edu/47485344/UF_MF_pre_treatment_to_RO_in_seawater_and_wastewater_reuse_applications_a_comparison_of_energy_costs
64. iwaponline — https://iwaponline.com/jwrd/article/11/4/705/84646/A-techno-economic-analysis-of-membrane-based
65. deccanherald — https://www.deccanherald.com/amp/story/india%2Fkarnataka%2Fbengaluru%2Fbengalurus-peenya-industrial-area-to-get-high-quality-treated-water-3849970
66. paani — https://paani.earth/regions/bengaluru_homepage/koramangala-challaghatta-watershed-homepage/kc-valley-project-homepage/kc-valley-project/
67. deccanherald — https://www.deccanherald.com/amp/story/india%2Fkarnataka%2Fcabinet-okays-rs-455cr-for-kc-valley-project-phase-2-738567.html
68. dtnext — https://www.dtnext.in/news/chennai/first-ttro-plant-to-be-functional-in-two-weeks
69. dmeo — https://dmeo.gov.in/sites/default/files/2021-08/Package4_UrbanTransformation_CaseStudy20.pdf
70. dtnext — https://www.dtnext.in/news/chennai/new-plant-in-koyambedu-opened-will-supply-treated-waste-water-to-industries
71. indianinfrastructure — https://indianinfrastructure.com/2019/12/17/koyambedu-tertiary-treatment-plant-commissioned/
72. wabag — https://www.wabag.com/news-event/wabag-successfully-executes-one-of-the-largest-and-technologically-advanced-water-reuse-plants-in-india/
73. deccanherald — https://www.deccanherald.com/india/karnataka/bengaluru/kiadb-fund-construction-sewage-treatment-2298862
74. eawater — https://www.eawater.com/regulars/waternews/bengaluru-water-authority-plans-to-build-17-new-sewage-treatment-plants/
75. deccanherald — https://www.deccanherald.com/india/karnataka/bengaluru/treated-water-from-city-to-fill-tanks-in-kolar-chikkaballapur-455951.html
76. watereuse — https://watereuse.org/educate/types-of-reuse/artificial-intelligence-reuse/
77. trellis — https://trellis.net/article/sip-or-guzzle-heres-how-googles-data-centers-use-water/
78. ketos — https://ketos.co/data-centers-water-usage-myths
79. blog — https://blog.google/company-news/outreach-and-initiatives/sustainability/new-water-stewardship-commitments/
80. epiccleantec — https://epiccleantec.com/blog/looking-at-waters-role-in-digital-infrastructure
81. eawater — https://www.eawater.com/regulars/waternews/chennai-metrowater-exploring-possibilities-to-supply-treated-wastewater-from-perungudi-stp-to-ease-industrial-demand/
82. pressreader — https://www.pressreader.com/india/the-free-press-journal/20220415/281762747798485
83. Wikipedia — https://en.wikipedia.org/wiki/Narasapura_Industrial_Area
84. cbinsights — https://www.cbinsights.com/company/apcotex-industries
85. etvbharat — https://www.etvbharat.com/en/technology/indias-data-centre-boom-new-framework-flags-power-water-risks-calls-for-water-planning-enn26101505208
86. citizenmatters — https://bengaluru.citizenmatters.in/should-bengalureans-be-grateful-for-bwssb-s-water-rates-6907
