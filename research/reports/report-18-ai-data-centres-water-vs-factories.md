<!-- Report 18 of the India Data Centre Atlas research series (AI data centres: capacity to 2030, direct and indirect water, comparison with factories; atlas chapter 8.3, 10.3). Produced with AI-assisted web research, 13 Oct 2026, and kept as written at the time. The atlas standards register (src/data/standards.js) is authoritative where figures differ (for example India grid water 2.9 L/kWh and grid CO₂ 0.675 t/MWh after the October 2026 corrections). -->

# AI Data Centres in India: Anatomy, Capacity to 2030, Direct and Indirect Water Use, and How They Compare with Factories

A 100 MW (IT) AI data centre in India uses roughly 3–11 MLD of water in total. Most of that is indirect water evaporated at power plants, not water used on site. With evaporative cooling, direct use is about 3.5 MLD. That is less than a mid-size paper mill or an integrated steel plant, and similar to a 5 Mtpa cement plant. What makes AI campuses a water risk is where they are built (water-stressed metros) and how fast they are being added, not their intensity per unit.

## TL;DR
- **Water:** At the atlas's Bengaluru cooling-tower WUE of 1.8 L/kWh and 80% load, a 100 MW-IT AI campus consumes about 1.26 billion L/yr on site (≈3.5 MLD). Its electricity carries another ≈4.6–6.9 MLD of power-plant water at the atlas grid factors (Karnataka 2.0 to India 3.0 L/kWh). Choosing dry or closed-loop liquid cooling cuts the on-site share almost to zero, but the electricity water remains. So grid mix matters more than cooling choice once the cooling is efficient.
- **Capacity:** India had 1,789 MW of operational IT capacity in H1 2026 (Cushman & Wakefield), with 3,860 MW more in the pipeline to 2030. Published 2030 forecasts range from about 4.2 GW to 12 GW. The atlas's 4.66 GW is a defensible, conservative-central case. At that level, data centres would draw roughly 40–45 TWh/yr, the same range Mint reports the Central Electricity Authority is now reassessing demand for. On our estimate they would also use about 160–185 billion L/yr of water including indirect use.
- **Comparison:** Per MLD, a 1 GW coal plant (≈54–63 MLD), a 10 Mtpa integrated steel plant (≈41–96 MLD) and a 50k-wafer/month fab (≈17.5 MLD) all use far more water than a 100 MW AI DC. Per ₹ invested, an AI DC uses roughly half the direct water of the Tata–PSMC fab, because GPUs dominate its capex. Policy should therefore target siting, cooling-water source (treated wastewater) and the grid mix, rather than treat DCs as uniquely water-hungry.

## Key Findings

1. **Indirect water dominates.** The IEA puts global data-centre water consumption at about 560 billion L in 2023: two-thirds indirect (power generation, ≈373 bn L), a quarter direct cooling (≈140 bn L), and the rest embodied in chips and hardware (≈47 bn L). The IEA projects ~1,200 bn L by 2030. Meta's FY2024 disclosure shows the same pattern at company level: 2,974 ML consumed directly by its data centres versus 72,207 ML of "embedded water in purchased electricity," about 24 times more.
2. **US benchmarks (LBNL 2024).** US data centres consumed 66 bn L directly in 2023 and roughly 800 bn L indirectly, on 176 TWh (4.4% of US electricity). LBNL projects 325–580 TWh by 2028, and its 2025 update projects 11.8% of US electricity by 2030 (range 9.5–15.3%).
3. **Hyperscalers report much lower WUE than the atlas's 1.8 L/kWh.** Reported fleet averages are:
   - AWS: 0.15 L/kWh (2024), 0.12 (2025), withdrawal basis
   - Microsoft: 0.30 (FY2024, withdrawal), 0.27 (FY2025)
   - Meta: 0.19 (withdrawal)
   - Digital Realty: 0.59 (2025)
   - Equinix: 0.95 (2024), with 1.55 at its evaporative sites
   
   The atlas's 1.8 L/kWh is right for a cooling-tower site in Bengaluru's climate. It should not be used as a fleet-wide India average, because many Indian colo halls use air-cooled chillers.
4. **India's water figures conflict sharply.** The widely repeated "150 bn L in 2025 → 358 bn L by 2030" comes from Mordor Intelligence, a market-research product with an undisclosed method. It is roughly 2.5 times what a bottom-up estimate gives (≈55–60 bn L in 2025 including indirect). Bengaluru-level claims range from "over 26 million litres annually" (Dialogue Earth, cited by WION) to "approximately 20 million litres per day". The second figure comes from WELL Labs hydrologist Shashank Palur, as reported by Newslaundry, and assumes ~26 million L per MW per year. That is a 280-fold spread, so treat both with caution.
5. **Rack density is the main driver of facility design.** In Uptime's 2025 survey, 82% of respondents said their highest-density rack was below 30 kW, and only 9% had a rack of 50 kW or more. The average rack was 8 kW in 2024 and 7.5 kW (excluding outliers) in 2025. Meanwhile NVIDIA's roadmap goes from GB200/GB300 NVL72 (~120–140 kW), to Vera Rubin (2H 2026, reported at 120–230 kW depending on configuration), to Kyber/Rubin Ultra NVL576 (2H 2027, ~600 kW on 800 VDC with 100% liquid cooling).

## 1. Anatomy of an AI data centre vs a conventional/cloud data centre

### Electrical anatomy
- **Grid connection.** Hyperscale AI campuses connect at high voltage, typically 132–220 kV in India and 230–400 kV for gigawatt campuses, through owned or dedicated substations. Conventional colo sites connect at 11–33 kV.
- **Power chain.** The conventional chain is: utility → HV/MV transformers → MV switchgear → LV transformers (415 V in India) → UPS (with BESS increasingly replacing VRLA) → busway/PDUs → rack PSUs → 48/54 V in-rack. Diesel generators provide N+1 or 2N backup.
- **800 VDC.** NVIDIA's reference design for Rubin Ultra converts medium-voltage AC to 800 VDC at facility level and distributes it on DC busways to racks, where it is stepped down to 12 VDC. This removes rack-level AC PDUs and PSUs, and claims up to ~5% end-to-end efficiency gains. Solid-state transformers for MV-AC→800 VDC are still pre-production at most vendors. Power shelves and energy storage move into "sidecar" racks.
- **Rack density.** Kyber is expected in 2H 2027 at ~600 kW per rack, with some sources citing up to 1 MW. Vera Rubin NVL72/NVL144 power figures differ across secondary sources: one puts NVL72 at 120–130 kW and NVL144 at ~190 kW, another puts the flagship at 190–230 kW. **Flag:** treat Rubin-generation rack power as 120–230 kW until NVIDIA publishes final specifications.

### Thermal anatomy
- **Liquid cooling is now standard for AI racks.** Direct-to-chip cold plates are served by CDUs, with facility water at ASHRAE W32–W45 classes. These warm-water loops allow chiller-free heat rejection through dry coolers for most of the year, even in hot climates. Residual air cooling (memory, PSUs, networking) is typically 10–30% of rack heat on GB200-class racks. Rear-door heat exchangers bridge legacy halls, and immersion remains niche.
- **Heat rejection sets the direct water use:**
  - Evaporative cooling towers: lowest energy, highest water. The atlas uses ~1.8 L/kWh at Bengaluru climate.
  - Adiabatic/hybrid dry coolers: water only on hot days.
  - Pure dry coolers or air-cooled chillers: near-zero water, with a higher PUE penalty.
- **Indian examples.** Google says its 1 GW Visakhapatnam hub will use "advanced air cooling," limiting water to restrooms and kitchens. Microsoft's zero-water-for-cooling design (launched August 2024) is said to avoid "more than 125 million liters of water per year per datacenter."

### Energy breakdown and PUE
- **Industry PUE.** The Uptime 2025 weighted average is 1.54, flat for six years and matching the atlas standard. Facilities commissioned in the last five years average 1.48, those over 20 MW about 1.44, and APAC excluding China 1.52. Hyperscalers report much lower: Google's fleet PUE was 1.09 in 2025, and Equinix's global average was 1.39 in 2024. The IEA estimates cooling at about 7% of energy in efficient hyperscale sites versus over 30% in enterprise sites.
- **What an AI facility's power goes to.** Google's production measurement of a Gemini prompt is the best primary split available. Of the energy, 58% went to active AI accelerators, 25% to host CPU/DRAM, 10% to idle provisioned machines, and 8% to data-centre overhead. The full-system figure (0.24 Wh) is 2.4 times the accelerator-only accounting (0.10 Wh).
- **Utilisation.** Training clusters run near nameplate for weeks, with synchronised power swings. Inference fleets follow diurnal demand and keep idle headroom. For atlas modelling, use a 70–85% average IT load factor for AI training campuses and 50–65% for cloud/colo. **Note:** these are analyst assumptions, not sourced constants. LBNL 2024 models idle-versus-active server power explicitly; we did not extract its coefficients in this pass.
- **AI's share of data-centre power.** The IEA estimates AI servers used 24% of server electricity and 15% of total data-centre energy in 2024.

### Size, footprint and examples
- **Google–AdaniConneX–Nxtra (Visakhapatnam).** About 1 GW across three campuses on ~600 acres (≈1.7 MW per acre including setbacks and on-site infrastructure). Investment is $15 bn over 2026–2030, and ground was broken on 28 April 2026. Google calls it its largest AI hub outside the US, to scale to "multiple gigawatts."
- **AdaniConneX** has a 2.6 GW development pipeline, according to Wood Mackenzie.
- **Gaps.** We did not re-verify details for xAI Colossus, Stargate Abilene, Meta Hyperion, Microsoft Fairwater, Reliance Jamnagar, Yotta, CtrlS, Sify or NTT in this pass, so they are omitted rather than quoted from memory.

### Capex per MW
- **Global facility cost.** JLL puts shell-and-core at $10.7m/MW in 2025 and $11.3m/MW in 2026, up from $7.7m in 2020 (~7% CAGR). AI-optimised liquid-cooled halls cost about $15–25m/MW excluding IT. Epoch AI (May 2026) models a 1 GW GB200 campus at about $38 bn upfront (≈$38m/MW), with servers about 60% of annualised cost.
- **India facility cost.** JM Financial (March 2025) estimates India's average colo capex at ₹46.5 crore/MW ($5.4m), among the world's lowest. Press estimates show cost rising from ₹40–45 crore to ₹60–70 crore/MW. AI-ready builds are quoted at ₹70–95 crore/MW and frontier-density builds at ₹150–200 crore/MW; these last figures come from a low-quality newsletter, so treat them as indicative.
- **Capital needs.** Cushman & Wakefield estimates India needs US$29.9 bn of development capital through 2030.
- **Implication.** For an AI campus, the building is roughly 15–40% of capex and GPUs/servers are the majority. This is why water per ₹ invested looks low for AI DCs.

## 2. Capacity forecast

### Global
- **IEA (Energy and AI, April 2025).** About 415 TWh in 2024 (~1.5% of global electricity), rising to ~945 TWh by 2030 (just under 3%) and ~1,200 TWh by 2035 in the Base Case. A high-efficiency case plateaus around 700 TWh. The US accounts for 45%, China 25% and Europe 15%. Data centres make up about a tenth of global demand growth to 2030, but nearly half of US growth.
- **LBNL 2024 (US).** 176 TWh in 2023, projected at 325–580 TWh by 2028. The 2025 update projects 11.8% of US electricity by 2030.
- **Not covered in this pass:** Goldman Sachs, McKinsey, BloombergNEF, SemiAnalysis, Schneider Electric and EPRI forecasts were not retrieved from primary sources. The atlas should add them as a separate layer rather than rely on secondary paraphrases.

### India: operational IT capacity (Cushman & Wakefield, H1 2026, top-7 markets)

| City | Operational (MW) | Upcoming supply to 2030 (MW) |
|---|---|---|
| Mumbai | 890 | 1,726 |
| Chennai | 214 | 368 |
| Delhi NCR | 183 | 387 |
| Bengaluru | 162 | 100 |
| Hyderabad | 151 | 710 |
| Pune | 133 | 258 |
| Kolkata | 22 | 84 |
| **Total** | **1,789** (147 DCs, 33 providers; 178 MW added in H1 2026) | **3,860** (509 under construction + 3,351 planning) |

Visakhapatnam is not yet in the C&W base. Colocation vacancy was 14.9%.

### India 2030 forecasts (range)

| Source | Base year capacity | 2030 forecast | Note |
|---|---|---|---|
| Cushman & Wakefield (2025) | ~1.3 GW (2025) | ~4.2 GW | Since raised: 1,789 MW operational + 3,860 MW pipeline ≈ 5.65 GW if all delivered |
| Colliers (May 2025) | 1,263 MW (Apr 2025) | >4,500 MW; $20–25 bn | Mumbai and Hyderabad +1,000–1,200 MW each |
| JLL | 1,123 MW (H1 2025) | ~2.1 GW by 2027 | — |
| CBRE | ~1.7 GW (2025) | 1.7 GW end-2026 view | — |
| S&P Global | — | up to 6.5 GW | — |
| Jefferies | — | ~8 GW | AI-led |
| Wood Mackenzie | 2.2 GW (2025) | 12 GW; AI-dedicated 275 MW → 6,546 MW | 10 TWh (2025) → 191 TWh (2040), 7% of demand |
| **Atlas** | 1,789 MW | **4.66 GW** | Sits in the Colliers–C&W central band |

**Methodology warning.**
- Some sources measure IT MW (C&W, Colliers, JLL); others likely measure gross or facility MW, or include captive and enterprise capacity (Wood Mackenzie's 2.2 GW base is about 25% above C&W's).
- "Planning stage" MW are announcements, not commitments.
- Grid-connection MW are typically 1.3–1.6 times IT MW.

The atlas should label every number as IT, facility or grid MW, and as operational, under construction or announced.

### Power implications (our estimate)
At 4.66 GW IT, a 75% load factor and a blended PUE of 1.4, consumption is ≈43 TWh/yr. That fits S&P Global Commodity Insights' projection that India's data-centre electricity use will grow from about 13 TWh (0.8% of national demand) at end-2024 to 57 TWh by 2030 (~2.6% of demand). At 0.71 tCO2/MWh (CEA) it implies ≈30 MtCO2/yr if grid-supplied, which is why the RE-PPA share is the key mitigation lever. On our rough estimate this is about 2% of India's electricity demand in 2030, but heavily concentrated in Maharashtra, Telangana, Tamil Nadu and Andhra Pradesh.

### State policies on water
Water is largely absent from state DC policies. Down to Earth found only five of 15 state DC policies contain sustainability parameters, and none require centralised water disclosure. Secondary reviews (Schneider Electric, 2026) find:
- Maharashtra promises uninterrupted MIDC water and only "encourages" recycling.
- Tamil Nadu's 2021 policy does not address water.
- Telangana promises "continuous water supply for heavy duty cooling," and the Hyderabad water board is developing treated-greywater supply to DC corridors.
- UP's 2026 draft reportedly promises 24/7 water.
- Rajasthan (2025) is the only one found with wastewater recycling, ZLD and recharge requirements.
- No water clause was found for Karnataka or Andhra Pradesh.

India has no notified national DC policy and no binding WUE rule.

## 3. Water use: direct, indirect and embodied

### Definitions
- **Withdrawal** is water taken from a source. **Consumption** is the part not returned, mostly evaporated.
- **WUE (The Green Grid)** is site water ÷ IT energy (L/kWh). Operators variously use withdrawal (AWS, Meta, Microsoft FY24) or consumption, so reported WUEs are not strictly comparable.
- **Source WUE** adds the water intensity of electricity (EWIF × PUE).
- **Embodied water** covers chip and hardware manufacturing (IEA: ~8% of the DC total).

### Direct use: what operators report

| Operator | Year | Metric | Basis |
|---|---|---|---|
| AWS | 2025 | WUE 0.12 L/kWh; ~2.5 bn gal (~9,460 ML) withdrawn | Withdrawal |
| Microsoft | FY2024 / FY2025 | WUE 0.30 / 0.27 L/kWh (from 0.49 in 2021) | Withdrawal / not stated |
| Meta | 2024 | DC withdrawal 4,145 ML; consumption 2,974 ML (72%); WUE 0.19 | Both |
| Equinix | 2024 | Withdrawal 5,440 ML; consumption 4,180 ML (77%); WUE 0.95 (1.55 evaporative); 2025 WUE 0.91 | Both |
| Digital Realty | 2025 | WUE 0.59; 45% non-potable sources | Not stated |
| Google | 2024 | ~8.1 bn gal (~30.7 bn L) consumed; US/Canada DCs withdrew 7.8 bn gal with 78% consumed; replenished 64% | Consumption |
| Nxtra (Airtel) | FY2025-26 | 124,306 KL total (118,501 KL large DCs), third-party assured | Consumption (scope changed from 216,357 KL prior year) |
| CtrlS | 2023-24 | 409,037 KL (from 468,330 KL) | Consumption |
| Sify | 2023-24 → 2024-25 | 6,132,323 KL → 306,916 KL | Implausible jump; likely a scope or unit change |

**Insight.** Consumption-to-withdrawal ratios cluster at 72–78% (Meta, Equinix, Google). This is consistent with evaporative cooling at roughly 4–5 cycles of concentration: evaporation is about 75–80% of make-up water and blowdown the rest. Raising cycles (through better treatment, or using treated sewage with RO) cuts blowdown but not evaporation, which is set by physics at about 1.5–1.8 L per kWh of heat rejected evaporatively. No Indian operator publishes a WUE figure; Down To Earth found "None of these reports provide data centre-level details."

### Indirect use: water intensity of electricity
- **Indian coal-plant norms.** The MoEFCC notification of 7 December 2015 required once-through-cooled plants to install cooling towers and all existing cooling-tower plants to meet ≤3.5 m³/MWh. New plants after 1 January 2017 were set at 2.5 m³/MWh with zero discharge, relaxed in June 2018 to 3.0 m³/MWh. The Environment (Protection) Third Amendment Rules, 2025 allow exemptions from cooling-tower installation for some (e.g., seawater) plants. Compliance gaps are documented. The Citizen consumer and civic Action Group (CAG) found that the 1,720 MW Raichur Thermal Power Plant used 2,04,889 KLD in 2016-17, 87% above what the 3.5 m³/MWh limit allows.
- **By technology.** Literature medians (Macknick et al. 2011/2012, NREL) give coal with cooling towers at roughly 2.5–3.8 m³/MWh consumed, nuclear with towers similar, and gas CCGT with towers about a third of coal. Once-through systems withdraw tens of times more but consume less. Solar PV and wind have the lowest operational water use. A China review finds closed-loop coal at a median of 3.16 m³/MWh.
- **The atlas's grid factors are consistent with these norms.** India's average of ~2.6 L/kWh at the plant equals roughly a 75% thermal share at ~3.5 L/kWh. Grossing up for T&D losses gives ~3.0 L/kWh at the meter. Li et al. independently use 3.445 L/kWh for India. LBNL's US national figure is about 4.52 L/kWh. **Flag:** India's hydro reservoir evaporation is excluded from the atlas factors; including it would raise state values for hydro-heavy Karnataka.

### Per-unit metrics
- **Google Gemini (May 2025).** 0.24 Wh, 0.26 mL and 0.03 gCO2e per median text prompt, or 0.10 Wh and 0.15 mL on a narrow boundary. This excludes off-site electricity water. Applying India's 3.0 L/kWh would add ≈0.72 mL, roughly tripling the footprint.
- **Mistral LCA.** About 45 mL per 400-token response, including training and hardware.
- **Li, Yang, Islam & Ren (CACM 2025).** Training GPT-3 in Microsoft's US data centres consumed 700,000 L on site and 5.4 million L in total. Inference used 500 mL per 10–50 medium-length responses (10–50 mL each, not 500 mL per prompt). Their India row shows 19.7 mL per request, all of it off-site.
- **Per MW (our estimate).** At WUE 1.8 and 80% load, direct use is 12.6 ML per MW-IT per year (≈34.5 m³/day/MW). The IEA states that an average 100 MW US DC consumes about 2 MLD.

### Totals
- **Global.** The IEA puts the 2023 total at 560 bn L, rising to ~1,200 bn L by 2030. Rystad estimates direct use alone at 222 bn L in 2025, reaching 644 bn L by 2030 (388–543 bn L with water-saving measures). **Conflict:** Rystad's 2025 direct figure is about 60% above the IEA's 2023 direct figure. A *Patterns* (Cell) analysis argues the IEA may significantly underestimate indirect water: applying 3.40 L/kWh would give ~1,225 bn L of indirect water alone.
- **India (our bottom-up estimate).**
  - 2025: about 1.5 GW IT × 70% load gives 9.2 TWh of IT energy. Direct water at WUE 1.8 is ≈16.5 bn L. At PUE 1.5 the facility uses 13.8 TWh, and at 3.0 L/kWh the indirect water is ≈41 bn L. The total is ≈58 bn L, versus Mordor's 150 bn L.
  - 2030 at the atlas's 4.66 GW: direct ≈31–55 bn L (84–151 MLD, at a blended WUE of 1.0–1.8) and indirect ≈129 bn L (≈353 MLD). The total is ≈160–185 bn L/yr (≈440–500 MLD). Indirect falls proportionally as RE PPAs grow.
- **City stress.**
  - Bengaluru: groundwater extraction is at 177% of recharge (CGWB 2025 dynamic resources, per OpenCity). The city draws ~2,000 MLD from the Cauvery against demand of up to 3,000 MLD. Down To Earth estimates its DCs hold permissions for ~813 million L/yr (≈2.2 MLD).
  - Our cross-check: 162 MW × 70% × WUE 1.8 gives ≈4.9 MLD if every site were evaporative. That bounds the plausible range and rules out both the Dialogue Earth "26 million litres annually" figure and WELL Labs' "20 million litres per day" figure.
  - Down To Earth reports a projected Hyderabad deficit of 870 MLD by 2027. Deccan Chronicle gives a higher figure: a domestic and industrial shortfall of 909 MLD (240 MGD) by 2027-28.
  - WRI India finds more than half of India's ~271 DCs are in water-stressed regions, and S&P projects 60–80% will face high stress this decade.

## 4. Comparison with factories and other industries (core table)

All figures are annual unless noted. "Reported" means a primary or regulatory number. "Est." means our calculation from the stated intensity and an assumed scale.

| Facility (assumed scale) | Water intensity | Annual water | MLD | Basis / source | Type |
|---|---|---|---|---|---|
| **AI DC 100 MW-IT, evaporative towers** (80% load, PUE 1.2) | WUE 1.8 L/kWh-IT | Direct 1.26 bn L; indirect 1.68 (KA) – 2.52 (India) bn L | Direct 3.5; total 8.1 (KA) – 10.4 (India) | Atlas WUE; atlas grid factors | Est. |
| **AI DC 100 MW-IT, DLC + adiabatic/hybrid** | WUE ~0.3 | Direct 0.21 bn L + indirect 1.7–2.5 bn L | Direct 0.6; total 5.2–7.5 | Hyperscaler WUE range (Microsoft 0.27–0.30) | Est. |
| **AI DC 100 MW-IT, DLC + dry coolers / air (Google Vizag-type)** (PUE 1.3) | WUE ≈0.05 (domestic only) | Direct ~0.04 bn L + indirect 1.8–2.7 bn L | Direct 0.1; total 5.1–7.6 | Google "advanced air cooling" | Est. |
| **Conventional colo 20 MW-IT** (60% load, PUE 1.54) | WUE 1.8 | Direct 0.19 bn L + indirect 0.49 bn L | 0.5 direct; 1.85 total | Uptime PUE; atlas factors | Est. |
| **Semiconductor fab: Tata–PSMC Dholera** (50k wafers/month, ₹91,000 cr) | ≈10,700 L per wafer start (withdrawal) | 6.4 bn L | **17.5** (of which 6.6 MLD reportedly specified separately) | Company environmental-appraisal file via *The Statesman*; Narmada sourced | Reported (secondary) |
| **TSMC (entire company, 2024)** | 161 L per 12-inch wafer-equivalent mask layer | 129 million m³ | ≈353 | TSMC 2024 Annual Report | Reported |
| **Coal power plant 1,000 MW** (75% PLF) | 3.0–3.5 m³/MWh (MoEFCC cap) | 19.7–23.0 million m³ | **54–63** | MoEFCC 2015/2018 norms | Est. from norm |
| **Integrated steel 10 Mtpa** | 3.49 m³/tcs (Tata Steel FY25); <1.5 target by 2030 | 15–35 million m³ | **41–96** | Tata Steel IR FY2024-25 | Reported intensity |
| **Cement 5 Mtpa (dry process)** | 0.56 m³/t total (0.19 plant only) | 2.8 million m³ | 7.7 | NCB/plant footprint study | Est. |
| **Pulp & paper 1,000 tpd (agro-based integrated)** | 26–29 m³/t (benchmark, from 60) | ~10 million m³ | ~28 | Naini Papers / CPCB Charter | Est. |
| **Sugar mill 10,000 TCD** | 0.4 m³/t cane (CPCB discharge standard) | — | ~4 (discharge) | E(P) Rules Schedule | Norm (discharge, not intake) |
| **Textile wet-processing cluster** (Faridabad–Ballabgarh) | — | 73 million m³ | 200 | CKinetics via SIWI | Reported (cluster) |
| **Municipal: town of 1 lakh people** | 135 LPCD | 4.9 million m³ | 13.5 | CPHEEO norm | Norm |

**Normalised views (our estimates).**
- **People-equivalent.** A 100 MW evaporative AI DC's direct use (3.5 MLD) equals about 26,000 people at 135 LPCD. Including Karnataka-grid indirect water (8.1 MLD) it equals about 60,000 people. The Tata fab equals about 130,000 people, and a 1 GW coal plant about 400,000–470,000.
- **Per ₹1,000 crore of investment.**
  - Tata fab: ≈0.19 MLD.
  - AI DC, all-in at ~$38m/MW (≈₹33,000 crore per 100 MW at ~₹88/$): ≈0.10 MLD direct, or ≈0.31 MLD including indirect.
  - AI DC, facility-only at ₹46.5 crore/MW: ≈0.74 MLD direct.
  
  The answer depends heavily on whether GPUs are counted as "investment."
- **Per MW of electrical load.** A 100 MW-IT AI DC (≈120 MW facility) uses about 0.03 MLD per MW direct. A coal plant uses about 0.054–0.063 MLD per MW generated. The DC's indirect water is essentially the coal plant's water, so the two should not be double-counted when summing state industrial water.
- **Agriculture (rough agronomic estimate, not sourced here).** Paddy needs roughly 12,000–15,000 m³/ha per season. One MLD (365,000 m³/yr) therefore irrigates only about 25–30 ha of rice, so a 100 MW evaporative DC's direct use equals roughly 90–100 ha of paddy.

**Caveats for the table.**
- Fab and steel figures are mostly withdrawal; DC WUE may be either.
- Industrial indirect (electricity-embedded) water for steel, cement and fabs is not added here. A fab's power draw (typically 100+ MW) would add a comparable indirect footprint.
- The beverage (Coca-Cola/PepsiCo L/L), automotive, pharma, refinery (Jamnagar), fertiliser, aluminium and leather benchmarks were not retrieved from primary sources in this pass. They are listed as gaps rather than estimated.
- Jobs per MLD and value-added per m³ could not be sourced reliably for DCs.

## 5. Recommendations for the atlas and for India

1. **Show three water layers per site:** direct (by cooling type), indirect (atlas state grid factor × facility kWh), and embodied (optional; IEA's ~8%). Default to consumption, and label any withdrawal figures.
2. **Replace a single WUE with a cooling-technology lookup:**
   - Evaporative tower: 1.8 at Bengaluru, higher in Chennai/Mumbai humidity-adjusted cases.
   - Adiabatic/hybrid: ~0.3.
   - Dry/air-cooled: ~0.05.
   
   Also show the PUE penalty of dry cooling on the indirect layer. In Karnataka (2.0 L/kWh) the trade-off strongly favours dry cooling. In Telangana and Maharashtra (3.1 L/kWh) the indirect water still dominates, so RE procurement is the bigger lever.
3. **Keep the 4.66 GW 2030 base case,** and add a low case (~4.2 GW, C&W 2025 / Colliers) and a high case (8 GW, Jefferies; 12 GW, Wood Mackenzie as an AI-upside stress test). Count C&W's 3,351 MW "planning" pipeline as announced, not committed.
4. **Do not cite the Mordor 150/358 bn L figures as fact.** Show them alongside a bottom-up estimate (≈58 bn L in 2025; ≈160–185 bn L in 2030 at 4.66 GW) and label them as conflicting.
5. **Policy.** States (especially Karnataka, Telangana and Maharashtra) should:
   - mandate treated wastewater or non-potable sources for any evaporative cooling;
   - require dry or closed-loop cooling in CGWA over-exploited blocks (Bengaluru Urban);
   - require annual site-level WUE and withdrawal/consumption disclosure in BRSR;
   - set a cumulative basin water budget covering fabs, DCs and power plants together, such as for Narmada/Dholera and Vizag.

## Caveats and data gaps
- **Not sourced from primary documents here:** Goldman Sachs, McKinsey, BNEF, SemiAnalysis, Schneider and EPRI forecasts; ICRA, CRISIL, Avendus, Moody's, Knight Frank and Arizton India forecasts; MeitY/IndiaAI GPU counts; CGWA NOC rules for DCs; beverage, automotive, refinery and pharma water ratios; jobs per MW.
- **Conflicts flagged:**
  - Vera Rubin rack power (120–230 kW).
  - Tata Steel specific freshwater: 2.53 m³/tcs (FY24) vs 3.49 (FY25), probably a change in consolidation scope.
  - Rystad vs IEA on direct global water.
  - India and Bengaluru DC water totals.
  - Sify's and Nxtra's scope changes.
- **Ambiguity in Microsoft's reporting:** its WUE is described as withdrawal in one footnote and consumption elsewhere.
- **Status of forward-looking projects:** the Google Vizag cooling claims and Microsoft's zero-water designs (Wisconsin pilot 2026; wider rollout reportedly from late 2027) are company commitments, not measured performance.

## Sources

1. gpusmith — https://gpusmith.com/articles/en/how-much-water-do-data-centers-use
2. service — https://assets.publishing.service.gov.uk/media/688cb407dc6688ed50878367/Water_use_in_data_centre_and_AI_report.pdf
3. atmeta — https://sustainability.atmeta.com/wp-content/uploads/2025/10/Meta_2025-Environmental-Data-Index.pdf
4. blogspot — https://greenrisks.blogspot.com/2026/04/2024-us-data-center-energy-usage-report.html
5. lbl — https://datacenters.lbl.gov/modeling-forecasting
6. energy — https://www.energy.gov/articles/doe-releases-new-report-evaluating-increase-electricity-demand-data-centers
7. axis-intelligence — https://axis-intelligence.com/ai-data-center-water-usage-statistics/
8. aboutamazon — https://sustainability.aboutamazon.com/natural-resources/water
9. Yahoo Finance — https://finance.yahoo.com/sectors/technology/articles/amazon-says-data-centers-2-130000972.html
10. microsoft — https://www.microsoft.com/en-us/microsoft-cloud/blog/2024/12/09/sustainable-by-design-next-generation-datacenters-consume-zero-water-for-cooling/
11. trellis — https://trellis.net/article/behind-amazons-industry-leading-water-efficiency-score/
12. Yahoo Finance — https://finance.yahoo.com/sectors/technology/articles/digital-realty-publishes-2025-impact-200500354.html
13. equinix — https://www.equinix.com/content/dam/eqxcorp/en_us/documents/resources/data-sheets/ds_sustainability_data_en.pdf
14. mordorintelligence — https://www.mordorintelligence.com/industry-reports/study-of-data-center-water-consumption-in-india
15. medium — https://medium.com/teradata-labs/the-data-center-isnt-ready-4034e2e59161
16. x — https://x.com/TheValueist/status/1983565740939567326
17. hashrateindex — https://hashrateindex.com/blog/nvidia-vera-rubin-reference-architecture/
18. techstories — https://www.techstories.co/what-it-takes-to-support-nvidias-vera-rubin-gpu/
19. techinsights — https://library.techinsights.com/hg-content/6b430dae-412d-4533-a65d-0e33955d2943?stage=PUBLISHED
20. rdp — https://rdp.in/gpu-mart/knowledge-base/rubin-ultra-kyber-nvl576-planning-2027-flagship-rack/
21. datacenterslist — https://www.datacenterslist.com/stats/water-usage
22. ramboll — https://www.ramboll.com/insights/decarbonise-for-net-zero/how-to-use-water-wisely-in-data-centres
23. cbc — https://www.cbc.ca/news/world/ai-data-centre-google-india-9.7374345
24. tech-insider — https://tech-insider.org/google-defends-15-billion-india-ai-hub-water-2026/
25. datacenterdynamics — https://www.datacenterdynamics.com/en/news/roughly-one-third-of-data-center-owners-and-operators-doing-ai-training-or-inference-uptime-institute/
26. mgrid — https://mgrid.org/2025/10/01/uptime-institute-data-center-pue-stagnation-2025-liquid-cooling/
27. uptimeinstitute — https://intelligence.uptimeinstitute.com/sites/default/files/2025-08/UI%20Field%20report%20183_Annual%20survey%20-%20regional%20view%202025.pdf
28. datacenters — https://datacenters.google/efficiency/
29. holdfastprojects — https://www.holdfastprojects.com/us-datacentre-pue.md-2
30. equinix — https://www.equinix.com/resources/data-sheets/sustainability-data-summary
31. particle — https://particle.news/story/google-details-geminis-perprompt-energy-carbon-and-water-use-as-researchers-question-scope
32. spglobal — https://www.spglobal.com/sustainable1/en/insights/special-editorial/beneath-the-surface-water-stress-in-data-centers
33. crbonfree — https://crbonfree.com/blog/how-much-energy-does-gemini-use
34. eesel — https://www.eesel.ai/blog/energy-ai
35. ioplus — https://ioplus.nl/en/posts/google-measures-and-shares-the-environmental-cost-of-ai-prompts
36. Scientific American — https://www.scientificamerican.com/article/ai-will-drive-doubling-of-data-center-energy-demand-by-2030/
37. adani — https://www.adani.com/newsroom/media-releases/adani-and-google-partner-to-build-indias-largest-data-centre-campus-in-visakhapatnam
38. googlecloudpresscorner — https://www.googlecloudpresscorner.com/2026-04-28-Google-Breaks-Ground-on-India-AI-Hub,-Launching-a-National-Industrial-Ecosystem-Alongside-Indias-Digital-Infrastructure-Milestone
39. electronicsforyou — https://www.electronicsforyou.biz/industry-buzz/google-launches-15-billion-ai-hub-in-vizag/
40. TechCrunch — https://techcrunch.com/2025/10/14/google-to-invest-15b-in-indian-ai-infrastructure-hub
41. propertyandbuild — https://propertyandbuild.asia/story/india-s-data-centre-capacity-set-to-hit-12-gw-by-2030
42. coradvisors — https://www.coradvisors.net/2026/06/ai-data-center-development-costs-2026.html
43. axis-intelligence — https://axis-intelligence.com/wp-content/dashboard/ai-data-center-cost-per-mw-dashboard.html
44. jmflresearch — https://jmflresearch.com/JMnew/JMCRM/analystreports/pdf/Data-Centre-101_27Mar25.pdf
45. Wikipedia — https://en.wikipedia.org/wiki/Data_centre_industry_in_India
46. Substack — https://equitybypiyush.substack.com/p/data-centers-20-lac-cr-of-capex-in
47. cushmanwakefield — https://www.cushmanwakefield.com/en/india/news/2026/09/india-data-centre-h1-2026-update
48. itvoice — https://www.itvoice.in/tag/data-centre-capex
49. netlify — https://electron-economics-capex-tracker.netlify.app/
50. iea — https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai
51. iea — https://www.iea.org/reports/energy-and-ai/executive-summary
52. reccessary — https://www.reccessary.com/en/news/india-ai-data-center-water-crisis
53. downtoearth — https://www.downtoearth.org.in/science-technology/thirsty-data-centres-thin-regulation-who-is-watching-indias-water
54. se — https://blog.se.com/datacenter/2026/09/15/how-state-policies-change-cooling-decisions-across-indias-data-centre-hubs/
55. deccanchronicle — https://www.deccanchronicle.com/southern-states/telangana/telanganas-data-centre-push-faces-power-water-test-1994288
56. thehansindia — https://www.thehansindia.com/business/market-compass/will-data-centres-drain-hyderabad-dry-1128621
57. Substack — https://esgpace.substack.com/p/the-data-centre-gold-rush-has-a-water
58. se — https://blog.se.com/datacenter/2026/09/29/using-treated-and-recycled-water-in-indian-data-centre-cooling/
59. tele — https://tele.net.in/telefocus/building-smarter-efficiency-and-sustainability-emerge-as-key-pillars-of-data-centre-expansion-12226383
60. mostpolicyinitiative — https://mostpolicyinitiative.org/science-note/data-center-water-use/
61. downtoearth — https://www.downtoearth.org.in/science-technology/indias-digital-thirst-what-data-centre-giants-arent-saying-about-their-water-use
62. powerline — https://powerline.net.in/2026/09/04/water-stress-thermal-power-plants-take-steps-to-optimise-consumption/
63. researchgate — https://www.researchgate.net/publication/312470509_A_review_of_operational_water_consumption_and_withdrawal_factors_for_electricity_generating_technologies
64. mdpi — https://www.mdpi.com/2071-1050/10/4/1181
65. github — https://bra-khet.github.io/ai-water-use-report-1/
66. arxiv — https://arxiv.org/pdf/2508.15734
67. acm — https://cacm.acm.org/sustainability-and-computing/making-ai-less-thirsty/
68. macmyths — https://macmyths.com/sustainability-alert-ai-expert-claims-every-chatgpt-query-wastes-half-a-litre-of-water-urging-need-for-a-sustainable-strategy/
69. arxiv — https://arxiv.org/pdf/2304.03271
70. Bloomberg — https://www.bloomberg.com/graphics/2025-ai-impacts-data-centers-water-data/
71. esgdive — https://www.esgdive.com/news/google-commits-to-replenish-more-water-than-it-uses-by-2030/822021/
72. downtoearth — https://www.downtoearth.org.in/science-technology/data-centre-water-consumption-could-triple-to-644-billion-litres-by-2030
73. cell — https://www.cell.com/patterns/fulltext/S2666-3899(25)00278-8
74. opencity — https://opencity.in/bengaluru-is-extracting-more-groundwater-than-nature-can-replenish/
75. downtoearth — https://www.downtoearth.org.in/science-technology/indias-digital-thirst-how-bengalurus-tech-dreams-are-colliding-with-a-worsening-water-crisis
76. wionews — https://www.wionews.com/india-news/data-centres-are-not-optional-so-who-s-responsible-for-the-damage-part-2-1783461918187
77. tsmc — https://esg.tsmc.com/file/public/e-APractitionerofGreenPower_2.pdf
78. tsmc — https://investor.tsmc.com/static/annualReports/2024/english/ebook/files/basic-html/page159.html
79. tatasteel — https://www.tatasteel.com/investors/integrated-report-2024-25/index.html
80. tatasteel — https://www.tatasteel.com/investors/integrated-report-2023-24/index.html
81. smartwatermagazine — https://smartwatermagazine.com/news/smart-water-magazine/microsoft-unveils-next-generation-datacenters-zero-water-cooling
