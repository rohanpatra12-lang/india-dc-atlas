<!-- Report 5 of the India Data Centre Atlas research series (Every TWh is not the same; atlas chapter 7). Produced with AI-assisted web research, October 2026, and kept as written at the time. Some figures were corrected later (notably India grid water 4.5 → 2.9 L/kWh and grid CO₂ 0.71 → 0.675 t/MWh, October 2026); the atlas standards register (src/data/standards.js) is authoritative where they differ. -->

# Every TWh Is Not the Same: Source, Timing, Location, Carbon and Water Intensity of Data-Centre Electricity — with an India/Karnataka Lens

The same 1 TWh of data-centre electricity can carry anywhere from about 10,000 tCO₂ (nuclear, wind, or a 24/7-matched clean portfolio) to roughly 1,000,000 tCO₂ (marginal Indian coal at the evening peak), and from almost zero to more than 3.5 billion litres of consumed freshwater. A ~100× spread in carbon and an even wider spread in water means that for an Indian operator, *where, when and from what* power is bought matters more to the footprint than almost any efficiency gain inside the building.

## TL;DR

- **Carbon:** At India's grid average (CEA v21: 0.710 tCO₂/MWh, FY2024-25), 1 TWh emits about 0.71 MtCO₂, or about 0.77 Mt once network losses are added. Marginal evening-peak coal pushes this to about 1.0–1.1 Mt. Karnataka's cleaner mix (about 37% RE in procurement, plus hydro) gives about 0.4–0.55 Mt. Hourly-matched solar+wind+storage brings it to about 0.04–0.11 Mt on a lifecycle basis. Nuclear/Nordic-hydro grids give about 0.01–0.06 Mt.
- **Water:** Indian coal plants consume about 3–4 m³/MWh, against legal limits of 3.5 for existing plants and 3.0 for post-2017 plants. Many self-reported plants exceed these limits. The non-hydro grid average is about 2 L/kWh. So 1 TWh embeds about 1.5–4 billion litres, much of it drawn in water-stressed basins such as the Krishna (Raichur). Solar PV and wind embed under 0.1–0.3 billion litres. Nuclear is the counter-example: very low carbon but about 2.5 billion litres per TWh with cooling towers.
- **What to do:** Data-centre operators in India should buy 24/7 (hourly-matched), deliverable, additional RE through green open access or group captive, backed by batteries. They should move flexible AI/batch loads into solar hours, site away from water-stressed basins, and report location-based, market-based and water (site + source) footprints. Regulators (CEA, KERC, MoEFCC) should publish hourly and marginal emission factors and plant-level water intensity. They should also adopt a Karnataka version of the rule Andhra Pradesh IT Minister Nara Lokesh announced in September 2026, that "a minimum 70 per cent of the energy used by data centres must come from renewable sources", framed as an hourly CFE requirement rather than an annual one.

---

## Key Findings

1. **Source is the dominant factor.** Lifecycle medians (IPCC AR5 Annex III) run from 820 gCO₂e/kWh for pulverised coal down to 11–12 for wind and nuclear. That is a 70× range before timing or location are considered.
2. **Timing matters more each year in India.** Ember finds India's fossil generation fell to around 125 GW at 1 pm in H1 2026 (from 135 GW in H1 2023) but peaked at 174 GW at 7 pm. The nearly 50 GW midday-to-evening swing, equivalent to more than 70 modern coal units, is mostly coal ramping. Keeping coal above its technical minimum forced the curtailment of around 2.1 TWh (1.3%) of renewable generation in FY2025–26, according to Ember. Moving load from 7 pm to 1 pm cuts *average*-intensity emissions, and on curtailment days it also cuts *marginal* emissions.
3. **Location is mostly about the margin, not the average.** India has one synchronous national grid, and coal sits at the margin in almost all hours. So a new Bengaluru data centre drawing grid power raises coal output somewhere in India, even though Karnataka's own mix is far cleaner than the national mix. State-level averages are useful for attributional reporting. Marginal factors are the right basis for siting and procurement decisions.
4. **India's carbon intensity is falling but remains among the world's highest.** CEA's weighted average fell from 0.774 to 0.710 tCO₂/MWh over a decade. Ember's Global Electricity Review 2026 puts India at 670 gCO₂e/kWh in 2025, down from 705 in 2024, against an Asian average of 544 and a global 458. The National Electricity Plan pathway implies about 430 g by FY2031-32.
5. **Water is the hidden half.** Indirect water from electricity often exceeds a data centre's on-site cooling water several-fold. LBNL's December 2024 US report finds the 176 TWh used by US data centres in 2023 consumed about 800 billion litres of water indirectly (≈4.5 L/kWh), against 66 billion litres consumed on site. In India, WRI's *Parched Power* found 40% of thermal power plants experience high water stress, and water shortages have shut plants at Raichur, Parli, Farakka and elsewhere.
6. **Market-based claims can hide real grid impact.** Microsoft's location-based Scope 2 rose 130% from FY20 to FY24 (4.33 to 9.96 MtCO₂e), while its market-based figure fell 43%. Google's 2025 Environmental Report shows 66% hourly CFE globally but 12% in Asia-Pacific, against roughly 70% in North America and 92% in Latin America. Annual REC matching is ending as a credible claim: the GHG Protocol's October 2025 Scope 2 consultation proposes hourly matching and deliverability.

---

## 1. SOURCE — What Generates the Electron

### 1.1 Lifecycle carbon intensity by technology

| Source | IPCC AR5 lifecycle median (min–max), gCO₂e/kWh | UNECE 2021 range, gCO₂e/kWh | Direct (combustion) share | India-specific note |
|---|---|---|---|---|
| Coal (pulverised) | 820 (740–910) | 751 (IGCC, US) – 1,095 (PC, China) | Direct 760 (670–870) | Indian subcritical units on high-ash coal: about 0.9–1.1 tCO₂/MWh at the busbar; UNECE notes a plant-by-plant global study at about 1,130 g |
| Oil | ~720 (secondary compilations) | — | Mostly direct | Negligible in Indian grid |
| Gas CCGT | 490 (410–650) | 403–513 (92–220 with CCS) | Direct 370 (350–490) | Indian gas fleet runs at low PLF; mostly peaking/balancing |
| Biomass (dedicated) | 230 (130–420) | — | Biogenic accounting contested | Bagasse co-gen in Karnataka/Maharashtra |
| Solar PV (utility) | 48 (18–180) | 8–83 | 0 direct | Upstream manufacturing mostly on coal-heavy Chinese grid |
| CSP | 27 (AR5) | 27–122 | 0 | Marginal in India |
| Geothermal | 38 (6–79) | — | Some CO₂ from geofluid | Not deployed |
| Hydropower | 24 (1–2,200) | 6–147 | 0 | Tropical reservoirs can emit large biogenic CH₄; upper tail is real for shallow, warm reservoirs |
| Wind onshore / offshore | 11 / 12 | 7.8–16 / 12–23 | 0 | Karnataka and Tamil Nadu are major onshore wind states |
| Nuclear | 12 (3.7–110) | 5.1–6.4 | 0 | NPCIL fleet incl. Kaiga (Karnataka) |

**Interpretation.**
- **Fossil fuels.** Combustion makes up almost all of their lifecycle emissions: 760 of 820 g for coal, 370 of 490 g for gas. Upstream methane is the main addition, mattering most for gas.
- **Renewables and nuclear.** Their emissions are almost entirely embodied in manufacturing and construction, so they fall as manufacturing grids decarbonise.
- **Two contested figures:**
  - *Coal.* UNECE argues the IPCC 820 g median rests on an optimistic efficiency assumption that "made its way to the IPCC AR5 report." Real-world coal fleets, including India's, sit nearer 1,000–1,100 g.
  - *Hydro.* The IPCC maximum of 2,200 g reflects reservoir methane in a few tropical cases. Indian reservoir hydro should not be assumed to sit at the 24 g median without site data.

**Operational vs lifecycle.** Grid factors used for Scope 2 (CEA, Ember) are *operational CO₂ only* (CEA) or *operational CO₂e* (Ember GER 2026). They count solar, wind, hydro and nuclear as zero. Lifecycle factors are right for comparing technologies and for procurement. Operational factors are what reporting regimes currently require. Mixing the two is a common error.

### 1.2 Water: withdrawal vs consumption by source

- **Withdrawal** is water taken from a source, much of it returned warmer.
- **Consumption** is water evaporated or otherwise not returned.

Once-through cooling withdraws a great deal but consumes relatively little. Cooling towers withdraw less but evaporate more.

| Technology / cooling | Consumption, L/MWh (approx., NREL Macknick et al. 2012 medians, converted from gal/MWh) | Withdrawal, L/MWh | Comment |
|---|---|---|---|
| Coal, cooling tower | ~1,800–2,600 (US); **2,800–4,000+ actual in India** | ~2,500–4,000 (US); ~4,000 India | NREL notes tower-cooled plants sit near the ~1,000 gal/MWh (~3,800 L) upper bound |
| Coal, once-through | ~400–1,000 | **70,000–200,000** (CSE, India) | High thermal-pollution and intake impacts |
| Coal/gas, dry cooling | ~0–450 (India dry-cooled coal: 450–650 L/MWh) | Low | Efficiency penalty (higher CO₂/MWh) |
| Nuclear, cooling tower | ~2,500–2,700 | ~4,000–5,000 | Lowest carbon, among highest water |
| Nuclear, once-through / seawater | ~1,000 (largely seawater) | ~100,000–170,000 | Coastal sites (Kudankulam, Tarapur) avoid freshwater stress |
| Gas CCGT, cooling tower | ~700–1,000 | ~1,000 | Only the steam cycle (about one-third of output) needs cooling |
| Gas CCGT, dry | ~10 | ~10 | |
| Solar PV | ~20–100 (panel cleaning; higher in dusty Indian conditions) | same | Robotic dry cleaning cuts this further |
| Wind | ~0–5 | ~0 | |
| CSP (trough, wet tower) | ~3,000–3,500 | ~3,500 | Wettest renewable |
| Biopower (steam, tower) | ~2,000 (operations; crop irrigation can add orders of magnitude) | — | |
| Hydro (reservoir evaporation) | **~13,000 (China avg) to ~245,000 (Mekonnen & Hoekstra 35-plant avg)**; global mean ~79,000 | Not meaningful | Highly contested (see below) |

**Hydro allocation caveat.** The definition you choose drives the result:
- **Global average gross evaporation:** Mekonnen & Hoekstra report 68 m³/GJ (≈245 m³/MWh) for 35 plants, and 22 m³/GJ (≈79 m³/MWh) as a global average.
- **Net and allocated approaches:** subtracting pre-dam evapotranspiration and allocating to multipurpose reservoirs gives a median of 17 m³/GJ (≈61 m³/MWh).
- **China:** a study of 209 Chinese reservoirs finds only 3.6 m³/GJ (≈13 m³/MWh).

The 5,000–60,000 L/MWh range often quoted in data-centre literature therefore sits at the *low* end of the published spread. Irrigation-led Indian dams such as Krishnaraja Sagar or Almatti should not have all their evaporation charged to electricity. Run-of-river hydro is effectively zero.

### 1.3 Indian regulatory norms and actual performance

**MoEFCC water norms (Environment (Protection) Amendment Rules, 7 Dec 2015; amended 28 June 2018):**
- Once-through plants must install cooling towers and meet **3.5 m³/MWh**. Existing cooling-tower plants must also meet 3.5 m³/MWh, both within two years (by Dec 2017).
- New plants commissioned after 1 Jan 2017 were first held to **2.5 m³/MWh** with zero liquid discharge. This was diluted to **3.0 m³/MWh** in June 2018, still with ZLD. Seawater-based plants are exempt.

**Actual performance:**
- *CSE survey.* CSE analysed self-reported data for FY2017-18 to FY2019-20 covering 154 GW. About half of non-seawater capacity (59 GW across 54 plants) was **non-compliant**: 42 GW of cooling-tower plants and 17 GW still on freshwater once-through. A typical non-compliant plant ran at about 4 m³/MWh. Named plants included Paras (5.24), Nashik (4.09), Koradi (4.0) and NTPC Solapur (3.72). CSE warns of a "high probability of data manipulation, under-reporting."
- *CEA-linked research.* Indian closed-loop plants use 2.8–3.4 m³/MWh, "twice the world's average of 1.2–1.5 m³/MWh."
- *Raichur (Karnataka).* The plant consumed 204,889 kL/day in 2016-17, **87% above** the 3.5 m³/MWh limit at 76% PLF. In January 2019, units were shut for lack of water, cutting output to 600 MW. Raichur sits in the Krishna basin.
- *Flue-gas desulphurisation.* FGD adds about 0.3 m³/MWh, so tightening SO₂ norms raises water use.

**CEA CO₂ Baseline Database (latest):**
- **Version 21.0 (Dec 2025):** provisional FY2024-25 weighted average emission factor (WAEF, incl. RE) of **0.710 tCO₂/MWh**.
- **Version 20.0:** FY2023-24 WAEF of **0.727**, build margin (BM) of **0.552** (first version to include RE in BM), and combined margin (CM, 50:50 OM/BM) of **0.757 tCO₂/MWh**.
- **Decade trend:** WAEF fell from 0.774 ten years ago.
- **Scope:** CEA factors are CO₂-only (no CH₄/N₂O), calculated on *net* generation, and follow the CDM tool ACM0002. CCTS Scope 2 calculations use the WAEF. The OM and CM are for offset baselines.

### 1.4 Other impacts (brief)

- **Air pollutants.** Coal is by far the largest emitter of SO₂, NOx, PM and mercury per TWh. India's 2015 stack norms (SO₂ 100–600 mg/Nm³ by vintage) have had their deadlines extended repeatedly. FGD retrofit status therefore matters for the health footprint of a coal-heavy TWh.
- **Land.** Solar uses roughly 1.5–2.5 ha/MW of direct footprint (~1–2 km² per TWh/yr in India). Wind's total spaced footprint is larger, but its direct footprint is under 5% of that. Coal's land use is dominated by open-cast mining and ash ponds. Nuclear has the smallest footprint.
- **Materials.** UNECE finds nuclear, wind and PV have low lifecycle metal and mineral intensity per kWh in absolute terms. PV and wind shift impacts toward copper, silicon, steel and concrete, and batteries toward lithium, nickel and cobalt (LFP avoids the last two).

---

## 2. TIMING — When the Load Occurs

### 2.1 Diurnal and seasonal patterns in India

- **Diurnal.** Ember's 2026 analysis (H1 2026 vs H1 2023):
  - Fossil generation at 1 pm fell 10 GW, to about 125 GW.
  - Between 5 pm and 7 am it *rose* 22 GW, to an average of about 168 GW, peaking near **174 GW at 7 pm**.
  - The resulting ~50 GW intraday swing is equivalent to more than 70 modern coal units cycling.
  - Keeping coal above its technical minimum forced the curtailment of around 2.1 TWh (1.3%) of renewable generation in FY2025–26, according to Ember, which says India needs around 10 GWh of battery storage immediately.
- **Trend.** A decade ago the IEA found India's hourly CO₂ intensity varied by only a factor of 1.2 between midday and the evening peak, with variable RE at 6% of generation. It projected that the spread would widen sharply as solar grows. That widening is now happening.
- **Seasonal (Karnataka/South).**
  - Wind is strongest in the southwest monsoon (roughly June–September).
  - Hydro peaks in and after the monsoon (Aug–Nov).
  - Solar is strongest in the dry season (Feb–May), when demand also peaks from agricultural pumping and cooling.
  - Monsoon months therefore have the lowest intensity in Karnataka. The pre-monsoon evening is the dirtiest window.

**Chart in words — illustrative Karnataka day (dry season), state-mix average:**
- *00:00–06:00:* ~550–600 g. Coal and some wind.
- *09:00–16:00:* falls to ~200–300 g as solar dominates.
- *18:00–22:00:* climbs back to ~550–600+ g. Coal ramps, hydro is dispatched for the peak, and imports rise.

A third-party modelled dashboard (energymap.in, built on CEA v18 lifecycle factors and *modelled* state fuel mix, so treat as indicative) shows a 90-day Karnataka mean of about 410 g with a range of about 210–603 g. That is roughly a 3× daily spread.

### 2.2 Average vs marginal at different hours

The **average** intensity at 1 pm is low. The **marginal** generator, though, is usually still a coal unit backing down or ramping, because coal sets the margin in the merit order in almost all hours. In practice:
- **Evening peak (18:00–23:00).** Marginal coal, sometimes gas or peaking hydro. Marginal emission factor ≈ 0.95–1.1 tCO₂/MWh, worse at part load because of heat-rate penalties.
- **Solar hours on normal days.** Still marginal coal (≈0.9–1.0), because coal is backed down rather than solar curtailed. The *system* benefit of moving load to noon comes from making room for more solar build and flattening the evening ramp.
- **Solar hours on curtailment days.** The marginal unit is curtailed RE, so the marginal factor approaches **~0**. Here, load shifting truly cuts emissions.

**Caveat on methods.** Marginal emission factors are contested and method-dependent. Short-run marginal (WattTime-style, statistical or dispatch-model) and long-run marginal (build margin, e.g. CEA BM 0.552 or NREL Cambium) can differ by 2× or more. No official hourly marginal factor exists for India.

### 2.3 Data sources for hourly intensity

- **Electricity Maps and WattTime** provide hourly average and marginal signals for many grids. Indian coverage is national or regional and model-based.
- **Grid-India (formerly POSOCO)** publishes real-time and daily generation by source, from which hourly average intensity can be derived.
- **Ember** publishes monthly state-level generation and emissions for 36 states/UTs, plus periodic hourly analyses.
- **IEA** maintains a real-time CO₂ database covering average and marginal hourly intensity.

### 2.4 Implications and instruments for data centres

- **Carbon-aware computing.** Google's carbon-intelligent computing platform shifts flexible, non-urgent compute across hours and locations according to grid carbon intensity. In August 2025, Google signed its first demand-response agreements targeting **machine-learning workloads**, with **Indiana Michigan Power** (Fort Wayne data centre) and the **Tennessee Valley Authority**. Under these, ML workloads are curtailed or shifted during grid stress. Google itself cautions that flexibility "is still in the early stages" and only available at certain sites.
- **India's ToD tariff mandate.** The Electricity (Rights of Consumers) Amendment Rules, 2023 (MoP notification of 14 June 2023) make ToD tariffs mandatory for C&I consumers above 10 kW from **1 April 2024**, and for all other consumers except agriculture from 1 April 2025.
  - **Peak tariff:** ≥1.20× normal for C&I.
  - **Solar-hour tariff (8 hours set by the SERC):** **at least 20% below** normal.
  - **Result:** a spread of about 40% or more between solar-hour and peak energy charges, which strongly rewards shifting load and adding batteries.
  - **Implementation is uneven.** Telangana's regulator held in 2026 that solar-hour rebates require a full tariff proceeding. KERC applies ToD to HT categories through its annual combined tariff order. Operators should check the current order's slot definitions and rebates.
- **Data-centre flexibility in practice.** Training jobs, batch inference, video transcoding and backups are shiftable, with a typical 10–30% flexible share in hyperscale fleets. Latency-critical inference is not. A 100 MW Bengaluru campus with 20 MW shiftable from 19:00–23:00 into 10:00–15:00 moves about 29 GWh/yr into solar hours. At a ~0.3 t/MWh average-intensity differential, that avoids about 9,000 tCO₂/yr on an average-factor basis. On curtailment days the marginal benefit is larger.

### 2.5 Annual vs hourly matching

- **Annual matching** (buying RECs equal to annual MWh) lets 2 pm solar certificates "cover" 9 pm coal-fired consumption.
- **24/7 carbon-free energy (CFE)** matches every hour in the same grid. Google reports **66% hourly CFE** in 2024, up from 64%, with 9 of 20 grid regions at ≥80%. Its Asia-Pacific regional CFE was **12%** in 2024 (vs ~70% in North America and 92% in Latin America, per its 2025 Environmental Report), which shows how hard Asia is. The UN-backed 24/7 Carbon-Free Energy Compact promotes this standard.
- **GHG Protocol Scope 2 revision.** The October 2025 public consultation (closed 19 Dec 2025) proposes:
  - hourly matching for market-based claims, with exemption thresholds for smaller reporters;
  - deliverable market boundaries;
  - load-profile approximations for consumers without interval data;
  - a legacy clause for existing contracts.
  
  Finalisation is expected around 2027. Firms such as EY argue hourly matching should start as optional, given data gaps.
- **EU RFNBO (green hydrogen) rules** (Delegated Regulation 2023/1184) provide a working precedent. They require additionality (new RE, generally commissioned no earlier than 36 months before the electrolyser), geographic correlation (same bidding zone), and temporal correlation (monthly until end-2029, hourly from 1 January 2030).

---

## 3. LOCATION — Which Grid, Which Margin, Which Basin

### 3.1 Country grids (operational, annual average)

| Grid | Approx. intensity, gCO₂(e)/kWh | Source/year | 1 TWh ≈ |
|---|---|---|---|
| India | 670 (2025); 708 (2024, CO₂-only) | Ember GER 2026/2025 | 0.67–0.71 MtCO₂ |
| China | ~550 | Ember (approx.) | ~0.55 Mt |
| Asia average | 544 | Ember 2025 | 0.54 Mt |
| World | 458 (2025); 473 (2024) | Ember | 0.46 Mt |
| United States | ~370 | Ember (approx.) | ~0.37 Mt |
| EU-27 | ~210–240 | Ember (approx.) | ~0.22 Mt |
| France | ~30–60 | Ember/RTE (approx.) | ~0.03–0.06 Mt |
| Norway | ~20–30 | (approx.) | ~0.02–0.03 Mt |

Ember's GER 2026 switched from CO₂ to CO₂e, which accounts for part of India's apparent 705/708 → 670 drop. The real 2025 decline (−2.9% emissions) was driven by record solar and wind, strong hydro and milder weather.

### 3.2 Within India: state mixes on a single grid

- **Karnataka.** Ember/IEEFA's SET 2026 ranks Karnataka first on decarbonisation, with about **37% RE in its procurement mix** and low power-sector intensity. Ember's EV study likewise finds Karnataka led with 37.6% of its FY2025 mix from solar, wind and hydro clean sources. Karnataka's remaining supply is mainly state and central coal (RTPS Raichur, BTPS Ballari, Yermarus, Udupi), some hydro and Kaiga nuclear.
  - **Estimate (flagged):** consumption-mix intensity is about **0.40–0.55 tCO₂/MWh**, central **~0.50**. That is about 30% below the national average.
- **Coal-heavy states** (Jharkhand, Chhattisgarh, Odisha, West Bengal, UP) generate at about 0.85–1.0 t/MWh. Hydro-rich states such as Himachal and Kerala, and wind-rich Tamil Nadu, are much lower on a generation basis.
- **Generation-based vs consumption-based state factors.** Chhattisgarh exports coal power. Karnataka imports some. A consumption-based factor (generation adjusted for net imports) is the right one for a Bengaluru load. CEA does not yet publish one.

### 3.3 Average vs marginal; attributional vs consequential

| Metric | Value (India) | Use |
|---|---|---|
| Weighted average (WAEF), FY24-25 | 0.710 t/MWh | Location-based Scope 2; CCTS |
| Operating margin (OM), FY23-24 | ~0.9+ t/MWh (fossil-only) | Short-run displacement |
| Build margin (BM), FY23-24 | 0.552 t/MWh | What new capacity looks like |
| Combined margin (CM), FY23-24 | 0.757 t/MWh | Offset baselines |
| Short-run marginal at evening peak | ~0.95–1.1 t/MWh (est.) | Consequential impact of new load |

**Why the margin matters for data centres.** A new 100 MW Bengaluru campus is *new* load. In the short run, coal plants somewhere in the national grid ramp up to meet it, whatever Karnataka's average says. In the long run, the BM shows that new capacity is now about half RE, which is why *additional*, contracted RE matters. Attributional (average) accounting answers "what share of today's emissions is mine?" Consequential (marginal) accounting answers "what changes because I exist?" The GHG Protocol has opened a parallel consultation on electricity-sector consequential accounting.

### 3.4 Location-based vs market-based Scope 2; instruments and their quality

- **Location-based:** grid-average factor (CEA 0.710 for India).
- **Market-based:** contractual instruments such as I-RECs, Indian RECs, green tariffs, PPAs, and open-access/group-captive supply. The remainder is covered by a residual-mix factor, which India lacks. That gap means market-based figures in India are typically computed with the full grid average, which double-counts clean energy.
- **Quality hierarchy (best to weakest):**
  1. On-site or adjacent RE plus storage.
  2. Hourly-matched, additional, same-grid PPA/group captive.
  3. Annual-matched new-build PPA.
  4. Discom green tariff (Green Energy Open Access Rules 2022).
  5. Bundled RECs from existing plants.
  6. Unbundled RECs/I-RECs from old hydro or wind.
  
  The last tier rarely changes what is built. Microsoft stopped counting unbundled RECs in FY25, and its market-based Scope 2 jumped to 2.71 MtCO₂e as a result.
- **Deliverability.** In India, an RE plant in Rajasthan and a load in Bengaluru are on the same synchronous grid, so physical deliverability is plausible. Transmission congestion and the GHG Protocol's proposed "market boundary" definition could still narrow this.

### 3.5 Local water stress: the same litre is not the same

- WRI's *Parched Power* (2018) finds:
  - 90% of India's thermal plants are freshwater-cooled, and **40% experience high water stress**.
  - Plants in high-stress areas run at a **21% lower capacity factor**.
  - Water shortage was the fifth-largest cause of forced outages in 2013–16.
  - 14 of the top 20 utilities lost about **$1.4 billion** in potential revenue.
  - Thermal freshwater consumption rose 43% between 2011 and 2016, from 1.5 to 2.1 billion m³/yr. A 2021 ES&T study puts it at 2.39 billion m³ in 2018.
- **Plants shut for water shortages:** Raichur (Karnataka), Parli (Maharashtra), Farakka (WB), Rihand (UP) and Ennore (TN).
- **Methods for weighting water by scarcity.** ISO 14046 (water footprint) and the **AWARE** characterisation factor, which ranges from 0.1 to 100 m³-world-eq per m³ (world average = 1), weight consumption by the remaining water available after human and ecosystem demand. A litre evaporated at Raichur (Krishna basin, high to extremely high stress) is far more damaging than a litre in Norway or coastal seawater.
- **Bengaluru context.** Bengaluru draws Cauvery water pumped about 100 km and up about 300 m. Its own groundwater is overdrawn. The *grid* water linked to its data centres is mostly evaporated in the Krishna and Godavari basins and in coal states further north.

### 3.6 Transmission and distribution losses

CEA factors are per unit *generated*. A consumer needs more generation than it meters:

> **Effective intensity at meter = EF_generation ÷ (1 − loss fraction)**

- **National AT&C losses:** 16.16% in FY2025 (MoP). PFC's 14th Integrated Rating puts them at 15.04%. Part of these are commercial (theft and billing) losses, not physical.
- **Physical losses for HT customers:** an HT data centre at 66/220 kV faces much lower physical losses, about 4–8% across inter-state and intra-state transmission.
- **Worked example:** 0.710 ÷ (1 − 0.08) = **0.77 tCO₂/MWh at the meter**. The same 8% gross-up applies to water: 2.0 → 2.17 L/kWh.

---

## 4. CARBON INTENSITY — Definitions, Trajectory and Data-Centre Metrics

### 4.1 Definitions

- **gCO₂/kWh vs gCO₂e/kWh.** CEA is CO₂-only. Ember GER 2026 and lifecycle data are CO₂e (incl. CH₄, N₂O). The difference is a few percent for coal and more for gas, because of upstream methane.
- **Generation- vs consumption-based.** Consumption-based intensity adjusts for imports and exports between states or countries. Production-based intensity flatters exporters of clean power and penalises exporters of coal power.
- **Average, marginal, residual-mix.** Each answers a different question (see §3.3).

### 4.2 Global and Indian trajectory

- **Global:** 533 g (2015) → **458 gCO₂e/kWh (2025)**, a 2.7% fall in 2025 alone, the largest in two decades. Renewables (33.8%) overtook coal in 2025.
- **India:** coal is still about 71% of generation (Ember 2025). Power-sector emissions were 1,395 MtCO₂e in 2025, down 2.9%, as coal generation fell 44 TWh. Solar overtook hydro as India's largest clean source in 2025.
- **CEA WAEF:** 0.774 (a decade ago) → 0.727 (FY23-24) → **0.710 (FY24-25, provisional)**.
- **2030–32 projection:** if the NEP-14 targets and 500 GW of non-fossil capacity are delivered, clean energy reaches about 50% of generation and the grid factor falls to **~0.43 tCO₂/MWh by FY2031-32** (Ember citing CEA/NEP). This is a projection that depends on storage and transmission being built, not an outcome.

### 4.3 Data-centre carbon metrics (worked)

> **CUE (Carbon Usage Effectiveness) = Total facility CO₂ ÷ IT energy = PUE × EF_grid (for grid-only supply)**

- **Bengaluru, grid supply:**
  - *National EF:* PUE 1.5 × 0.77 t/MWh (national, at meter) = **1.16 kgCO₂/kWh_IT**.
  - *Karnataka mix:* 1.5 × 0.50 = **0.75 kgCO₂/kWh_IT**.
- **Same facility on 90% hourly CFE:** 1.5 × (0.9×0.04 + 0.1×0.77) ≈ **0.17 kgCO₂/kWh_IT**.
- **1 TWh of facility load:**
  - *India:* ≈ 0.71–0.77 MtCO₂.
  - *France:* ≈ 0.03–0.06 MtCO₂, a **~15–25× difference** for the same compute.

### 4.4 Hyperscaler disclosures: location-based vs market-based

| Company | Disclosure | Location-based | Market-based | Takeaway |
|---|---|---|---|---|
| Microsoft (2025 report, FY24) | Scope 2, tCO₂e | 4,328,916 (FY20) → **9,955,368** (FY24), **+130%**; +23% y/y | 456,119 → **259,090**, **−43%** | Electricity use 10.77 → 29.83 TWh. Market-based fell while location-based more than doubled. Asia location-based Scope 2 rose from 0.91 to 2.51 Mt |
| Microsoft (2026 report, FY25) | Scope 2 | **12,030,556** | **2,707,428** | Market-based jump reflects dropping unbundled RECs; not comparable with earlier years |
| Google (2025 report, CY2024) | Data-centre electricity +27% y/y | (location-based rose with load) | Data-centre energy emissions **−12%** | 66% hourly CFE; ~12% in APAC; >25 clean projects (2.5 GW) came online |

Amazon and Meta also report large location/market gaps driven by annual REC/PPA matching. Gaps of this kind are the main reason the GHG Protocol is moving to hourly matching.

---

## 5. WATER INTENSITY — The Grid's Hidden Water

### 5.1 Definitions

- **Withdrawal:** water abstracted.
- **Consumption:** water evaporated or embodied.
- **EWIF (energy water intensity factor):** litres consumed per kWh *generated*. It should be stated as consumption, with or without hydro evaporation, and freshwater-only or including seawater.

### 5.2 Grid-average water intensity

| Grid | Consumption intensity | Basis |
|---|---|---|
| India, all thermal + non-hydro RE (2014) | **2.09 L/kWh** (withdrawal 15.9 L/kWh) | IRENA/WRI 2018; *excludes hydro* |
| India 2027–2030 projections | 1.57–1.94 L/kWh | IRENA/CEA scenarios |
| India, freshwater thermal only (2018) | ~1.8 L/kWh | Derived: 2.39 bn m³ ÷ ~1,300 TWh (estimate) |
| India incl. hydro evaporation | Several L/kWh, highly allocation-dependent | One multi-model study says hydro is about one-third of Indian power-sector water consumption |
| Karnataka mix (used in this series) | **~1.5 L/kWh** (excl. hydro) | Estimate: ~45–50% coal at ~3.3 L/kWh + small PV cleaning |
| US data-centre-weighted indirect (2023) | **~4.5 L/kWh** (incl. hydro evaporation) | LBNL 2024 US Data Center Energy Usage Report, as widely cited |

**What these numbers show.** India's thermal plants are about twice as water-hungry per MWh as global peers. India's grid-average EWIF excluding hydro (~2 L/kWh) is therefore comparable to or higher than the US thermal-only figure, despite a less water-intensive gas share. As solar displaces coal, EWIF falls roughly in proportion to the coal share. This is the largest water co-benefit of decarbonisation, and it is rarely counted.

### 5.3 Combining site and source water (The Green Grid / LBNL method)

> **Total water footprint per kWh_IT = WUE_site + PUE × EWIF**
> **Scarcity-weighted footprint = Σ (water_i × CF_i)**, with CF from AWARE or Aqueduct for the basin where the water is lost

**Worked example, Bengaluru campus:**
- *Inputs:* evaporative cooling WUE_site = 1.8 L/kWh_IT, PUE = 1.5, Karnataka EWIF = 1.5 L/kWh.
- *Result:* total = 1.8 + 1.5 × 1.5 = **4.05 L/kWh_IT**. About 55% of this is *off-site*, in power plants.
- *Hybrid/dry cooling:* WUE_site = 0.2, PUE = 1.35 → 0.2 + 1.35 × 1.5 = **2.2 L/kWh_IT**. Grid water is now 90% of the total.
- *Same dry-cooled campus on 90% hourly RE:* 0.2 + 1.35 × (0.9 × 0.1 + 0.1 × 1.5) = **0.52 L/kWh_IT**.

The lesson: once a site goes dry-cooled, **power procurement becomes its main water lever**.

---

## SYNTHESIS — "Every TWh Is Not the Same": Worked Matrix

**Formulas (per 1 TWh = 1,000,000 MWh delivered to the data centre):**
- CO₂ (t) = EF (tCO₂/MWh) × 1,000,000 ÷ (1 − loss)
- Water (litres) = EWIF (L/kWh) × 10⁹ ÷ (1 − loss)
- Scarcity-weighted water = Water × W, where W is an *illustrative* stress weight: 1 = low, 2 = low-medium, 3 = medium-high, 4 = high, 5 = extremely high (WRI Aqueduct baseline water-stress classes; not AWARE CFs)

For grid cases, losses are 8% for HT supply. For on-site/adjacent supply, losses are about 3–4% (ignored below for simplicity).

| # | Scenario | EF used (t/MWh) | CO₂ per TWh | EWIF (L/kWh) | Water consumed per TWh | Stress weight (basin where water is lost) | Scarcity-weighted (bn L-eq) |
|---|---|---|---|---|---|---|---|
| a | **Indian grid average** (CEA WAEF 0.710, +8% losses) | 0.77 | **~770,000 t** | 2.17 | **~2.2 bn L** | 4 (mixed; ~40% of thermal in high stress) | ~8.7 |
| b | **Karnataka consumption mix** (est. 0.50, +8%) | 0.54 | **~540,000 t** (range 430–600k) | 1.6 | **~1.6 bn L** | 4–5 (Krishna/Raichur, Ballari) | ~6.5–8 |
| c | **Marginal coal, Indian evening peak** (1.0 at part load, +8%) | 1.09 | **~1,090,000 t** | 3.8–4.3 (3.5–4.0 at plant) | **~3.8–4.3 bn L** | 4–5 | ~15–21 |
| d | **Karnataka solar hours, grid** — average basis (~0.25–0.30) / marginal basis (coal backing down, ~0.95) | 0.30 / 1.03 | **~300,000 t (avg)** / ~1,000,000 t (marginal); **~0 on curtailment days** | ~0.8 (avg) | **~0.8 bn L** (avg) | 4–5 | ~3–4 |
| e | **24/7 hybrid RE + BESS via group captive/open access** (90% hourly CFE; lifecycle ~40 g for the RE part; 10% residual grid at 0.77) | ~0.11 lifecycle (~0.08 operational) | **~110,000 t lifecycle**; 100% CFE → ~40,000 t | 0.09 RE + 0.22 residual | **~0.3 bn L** | 4–5 (residual only) | ~1.2 |
| f1 | **France (nuclear-dominant grid)** | 0.03–0.06 | **~30,000–60,000 t** | ~1–2.5 (many plants on rivers/sea) | **~1–2.5 bn L** | 2–3 (Rhône/Loire summer stress) | ~3–6 |
| f2 | **Nordic hydro (Norway)** | 0.02–0.03 | **~20,000–30,000 t** | 0 (run-of-river) to >10 (gross-evaporation allocation) | **contested: ~0–10+ bn L** | 1 | ~0–10 |
| g | **US PJM / Northern Virginia** (~0.37–0.40) | 0.38 | **~380,000–420,000 t** | ~2 (thermo-electric) to 4.5 (LBNL DC-weighted incl. hydro) | **~2–4.5 bn L** | 2 | ~4–9 |
| h | **Gas CCGT** (IPCC lifecycle 490; direct ~370) | 0.49 | **~490,000 t** (direct ~370,000) | 0.75 (tower) / 0.01 (dry) | **~0.75 bn L** (tower) | site-specific (2–5) | ~1.5–3.8 |
| i | **Nuclear with cooling towers** | 0.006–0.012 | **~6,000–12,000 t** | 2.5–2.7 | **~2.5–2.7 bn L** | site-specific; inland Indian sites 4–5 | ~10–13 |
| — | Wind only (reference) | 0.011 | ~11,000 t | ~0 | ~0 | — | ~0 |
| — | Solar PV only (reference) | 0.048 | ~48,000 t | 0.02–0.1 | ~0.02–0.1 bn L | 4–5 | ~0.1–0.5 |

**Ranges shown by the matrix:**
- **Carbon:** about 1,090,000 t (marginal Indian coal) down to about 6,000–12,000 t (nuclear/wind). That is a **~100× spread**.
- **Water:** about 4.3 billion litres (Indian coal) down to about 0 (wind). Scarcity-weighted, the gap is wider still: ~20 vs ~0.
- **Decoupling of carbon and water:**
  - *Nuclear with towers* scores among the best on carbon but near coal on water (row i).
  - *Gas CCGT* is mid-carbon but relatively low-water (row h).
  - *Hydro's* water burden depends on an allocation choice (row f2).

  Only **wind and dry-cleaned solar**, firmed by batteries, are low on both.
- **India's middle ground.** A Bengaluru data centre on the plain grid (rows a/b) sits at 0.5–0.8 MtCO₂ and about 1.6–2.2 billion litres per TWh. Hourly-matched RE (row e) cuts both by about **80–90%**. No efficiency upgrade inside the building comes close to that.

**Chart in words — CO₂ per TWh (log scale):** marginal coal ≈ 1.1 Mt ▸ India avg 0.77 ▸ Karnataka 0.54 ▸ gas 0.49 ▸ PJM 0.40 ▸ Karnataka solar-hours avg 0.30 ▸ 24/7 RE (90%) 0.11 ▸ France 0.05 ▸ solar 0.048 ▸ Norway 0.025 ▸ wind/nuclear ~0.01.

### Five-factor scorecard (for a site or procurement decision)

Score each factor 1 (worst) to 5 (best). Weight them by your priorities; a default is carbon 30%, water 25%, source 20%, timing 15%, location 10%.

| Factor | Question | 1 (poor) | 3 | 5 (best) | Example: Bengaluru grid-only | Example: Bengaluru + 24/7 group-captive hybrid + BESS + dry cooling |
|---|---|---|---|---|---|---|
| **Source** | What physically or contractually supplies each hour? | Unbundled RECs / grid coal | Annual-matched new PPA | Additional, deliverable, hourly CFE | 2 | 5 |
| **Timing** | What share of load is hourly matched? Is flexible load in solar hours? | <30% CFE, no flexibility | 50–70% CFE | >90% CFE + DR contracts | 2 | 4–5 |
| **Location** | Marginal factor of grid; consumption-based state mix; network losses | Marginal coal, high losses | Mixed grid | Low-carbon margin / on-site | 2 (national coal margin) | 4 |
| **Carbon intensity** | Location-based and hourly market-based tCO₂/MWh | >0.7 | 0.3–0.5 | <0.1 | 2 (0.54–0.77) | 5 (~0.08–0.11) |
| **Water intensity** | WUE_site + PUE × EWIF, scarcity-weighted | >4 L/kWh_IT in high-stress basin | 2–3 L/kWh_IT | <0.5 L/kWh_IT or non-stressed | 1–2 (4.05 L/kWh_IT, high stress) | 4–5 (~0.5 L/kWh_IT) |
| **Weighted score** | | | | | **≈1.8 / 5** | **≈4.6 / 5** |

---

## Recommendations

### For data-centre operators (India, especially Bengaluru)

1. **Contract for 24/7, not annual.** Use the Green Energy Open Access Rules 2022 (100 kW threshold) and group-captive structures to build solar + wind hybrids with 2–4 h BESS. Target ≥80–90% hourly CFE.
   - Karnataka's wind is strongest in the monsoon, and solar is strongest in the dry season. Pairing them, plus storage for the 18:00–23:00 window, closes most of the gap.
   - Battery costs have fallen sharply. Ember cites a 95% fall in global installed cost, to about $140/kWh in 2025.
2. **Schedule for carbon and water.**
   - Move training, batch inference and backups into the eight solar hours, where ToD gives at least a 20% discount.
   - Avoid the 18:00–23:00 peak, which carries a ≥20% premium and is the coal margin.
   - Sign interruptible or flexible-load agreements with BESCOM/KPTCL modelled on Google's I&M/TVA contracts.
3. **Site for both carbon and water.** Prefer locations near RE parks or coastal and wastewater sources, and avoid extremely high-stress basins. Use dry, hybrid or liquid cooling with treated sewage water. Remember that grid water dominates once site WUE is low.
4. **Report in full.**
   - Location-based (CEA WAEF, grossed up for losses) and market-based Scope 2, with **hourly CFE%**.
   - WUE_site and source WUE (PUE × EWIF), scarcity-weighted using AWARE/Aqueduct.
   - BRSR Core metrics: energy and water intensity, Scope 1/2.
5. **Avoid low-quality claims.** Do not rely on unbundled RECs from old hydro or wind. Prioritise additionality (new capacity), deliverability (same grid) and temporal matching. Assume the GHG Protocol's hourly rules will apply by around 2027–2028, and build legacy-clause-eligible contracts now.

### For CEA, MoP, KERC, MoEFCC and the Government of Karnataka

1. **Publish granular emission factors.** CEA should publish **hourly (or 15-minute) national and state consumption-based average factors and marginal factors**, alongside the annual baseline database. It should also publish a **residual-mix factor** so that market-based claims do not double-count. Grid-India data makes this feasible.
2. **Enforce and disclose plant water use.** Bring water into transparent compliance: plant-level, metered **specific water consumption disclosure** on a public CEA/CPCB portal, as WRI India has urged. Strictly enforce the 3.5/3.0 m³/MWh norms; CSE found about half of non-seawater capacity non-compliant. Report the extra water FGD adds.
3. **Set a Karnataka 24×7 RE standard for large data centres.** Andhra Pradesh plans to require **≥70% RE** for data centres. IT Minister Nara Lokesh announced on 24–25 September 2026 that "a minimum 70 per cent of the energy used by data centres must come from renewable sources", with solar, wind, pumped storage and battery counting. Karnataka should go further by specifying **hourly** matching, with a phased path to 70% then 90% CFE. This avoids an annual-REC loophole.
4. **Strengthen price and market signals.**
   - Implement the full solar-hour discount (≥20%) and peak premium for HT data-centre tariffs.
   - Create a **green tariff with hourly attribution**.
   - Recognise data-centre flexibility in ancillary and demand-response markets.
5. **Site by water stress.** Require data centres above a threshold (e.g. 10 MW) to submit a **five-factor assessment**, including scarcity-weighted source and site water. Steer them away from extremely high-stress taluks and toward treated wastewater.
6. **Use carbon markets carefully.** The Carbon Credit Trading Scheme (2023) uses the CEA WAEF for Scope 2. Data centres are not yet obligated entities. Bring large operators into the offset/voluntary track only with hourly-matched, additional RE, so that recycled RECs do not generate credits.
7. **Reduce network losses.** Bringing AT&C losses down from about 15–16% toward the RDSS 12–15% target directly lowers the delivered intensity of every TWh.

---

## Caveats

- **Contested and estimated figures** are flagged in the text. They include:
  - Karnataka's consumption-mix intensity (no official consumption-based factor exists);
  - hourly Karnataka profiles from a modelled third-party dashboard;
  - all marginal emission factors (no official Indian series; method choice can change results 2×);
  - France, Norway, EU, US and China intensities quoted approximately rather than from the latest Ember tables;
  - Macknick-based water values (approximate conversions from US medians).
- **Hydro water** varies by more than two orders of magnitude depending on gross vs net evaporation and multipurpose-reservoir allocation. **Tropical reservoir methane** can push hydro carbon far above the 24 g median. Indian reservoir hydro should be treated site by site.
- **Self-reported Indian plant water data** is unverified (CSE flags likely under-reporting), so actual thermal water intensity may be higher than shown.
- **Stress weights** in the synthesis are illustrative ordinal weights from Aqueduct classes, not AWARE characterisation factors. A formal ISO 14046 study would use basin-specific AWARE CFs.
- **Policy status.** The Andhra Pradesh 70% RE rule is a stated plan, not yet a notified regulation. The GHG Protocol Scope 2 revision is a consultation draft. NEP 2031-32 intensity (~0.43 t/MWh) is a projection that depends on storage and transmission build-out.
- **Corporate disclosures** (Google, Microsoft) are self-reported and have been criticised by NGOs. Microsoft's FY25 market-based figure is not comparable with earlier years because of a methodology change.

## Sources

1. <https://archive.ipcc.ch/pdf/assessment-report/ar5/wg3/drafts/fgd/ipcc_wg3_ar5_final-draft_fgd_annex-iii.pdf>
2. <https://www.ipcc.ch/site/assets/uploads/2018/02/ipcc_wg3_ar5_annex-iii.pdf>
3. <https://unece.org/sites/default/files/2021-11/LCA_final.pdf>
4. <https://reclimatize.in/india-grid-emission-factor-cea-ccts/>
5. <https://ember-energy.org/latest-insights/from-fossil-to-flexible-advancing-indias-road-transport-electrification/>
6. <https://arxiv.org/pdf/2606.21760>
7. <https://apstechadvisors.com/data-center-water-consumption-in-the-us-challenges-trends-and-market-opportunities-for-2025-2030/>
8. <https://policyreview.info/articles/news/big-techs-2025-sustainability-reports/2027>
9. <https://www.ey.com/en_gl/insights/ifrs/what-the-ghg-protocol-scope-2-consultation-means>
10. <https://lowcarbonpower.org/blog/emissions>
11. <https://energyindustryreview.com/power/unece-nuclear-is-the-lowest-carbon-electricity-source/>
12. <https://assets.worldbenchmarkingalliance.org/app/uploads/2023/08/Electric-Utilities-2023-Methodology-report-1.pdf>
13. <https://www.unece.org/sites/default/files/2021-09/202109_UNECE_LCA_1.2_clean.pdf>
14. <https://en.wikipedia.org/wiki/Life-cycle_greenhouse_gas_emissions_of_energy_sources>
15. <https://www.researchgate.net/publication/252372619_The_water_footprint_of_electricity_from_hydropower>
16. <https://www.nature.com/articles/srep11446>
17. <https://hess.copernicus.org/preprints/8/8355/2011/hessd-8-8355-2011.pdf>
18. <https://www.researchgate.net/publication/305845528_Global_water_footprint_assessment_of_hydropower>
19. <https://cpcb.nic.in/uploads/thermal_power_plant_overview.pdf>
20. <https://www.downtoearth.org.in/pollution/it-is-imperative-to-improve-water-efficiency-in-india-s-coal-fired-thermal-power-plants-89484>
21. <https://cdn.cseindia.org/attachments/0.71571700_1629984459_cse-coal-power-water.pdf>
22. <https://www.sciencedirect.com/science/article/abs/pii/S0360544223009477>
23. <https://www.cag.org.in/newsletters/public-newsense/water-consumption-data-thermal-power-plants>
24. <https://www.deccanherald.com/amp/story/india%2Fkarnataka%2Fwater-shortage-hits-power-711283.html>
25. <https://powerline.net.in/2026/09/04/water-stress-thermal-power-plants-take-steps-to-optimise-consumption/>
26. <https://www.climatiq.io/data/source/government-of-india-_-central-electricity-authority>
27. <https://www.downtoearth.org.in/pollution/environment-ministry-finalises-coal-thermal-power-plant-categories-what-does-it-say-about-emission-norms-compliance-80795>
28. <https://www.downtoearth.org.in/energy/indias-solar-power-cuts-coal-use-in-the-day-but-evening-demand-keeps-fossil-fuel-running>
29. <https://www.iea.org/commentaries/empowering-electricity-consumers-to-lower-their-carbon-footprint>
30. <https://www.energymap.in/states/karnataka>
31. <https://ember-energy.org/data/india-electricity-data/>
32. <https://iea.blob.core.windows.net/assets/e604f400-037e-43c3-88de-6bcb7af3e064/Real-timeCO2emissionsfromelectricity-documentation.pdf>
33. <https://datacentremagazine.com/news/google-environmental-report-2025-the-data-centre-impact>
34. <https://www.publicpower.org/periodical/article/google-tva-enter-agreement-tied-data-center-demand-response>
35. <https://www.latitudemedia.com/news/google-expands-demand-response-to-target-machine-learning-workloads/>
36. <https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=1945236&reg=3&lang=2>
37. <https://cdnbbsr.s3waas.gov.in/s3cf05968255451bdefe3c5bc64d550517/uploads/2026/01/20260102144277158.pdf>
38. <https://www.legitquest.com/act/electricity-rights-of-consumers-amendment-rules-2023/D53E>
39. <https://powerpeakdigest.com/tgerc-rules-solar-hour-rebates-require-full-tariff-process/>
40. <https://thedailybrief.zerodha.com/p/the-new-rules-of-paying-for-electricity>
41. <https://data.opencity.in/dataset/kerc-combined-tariff-order-2025>
42. <https://hrecs.co.in/app/documents/TariffRates2026-27-28.pdf>
43. <https://energy.drax.com/intelligence/ghg-protocal-consult-scope-2/>
44. <https://ghgprotocol.org/blog/upcoming-scope-2-public-consultation-overview-revisions>
45. <https://www.insideenergyandenvironment.com/2025/11/the-greenhouse-gas-protocols-proposed-scope-2-guidance-key-changes-and-considerations-for-stakeholders/>
46. <https://greencalculus.com/standards/ghg-protocol-scope-2-guidance/>
47. <https://ember-energy.org/latest-insights/global-electricity-review-2026/electricity-demand-and-supply-trends/>
48. <https://ember-energy.org/app/uploads/2026/04/Global-Electricity-Review-2026.pdf>
49. <https://ember-energy.org/latest-insights/indian-states-electricity-transition-set-2026/>
50. <https://ember-energy.org/app/uploads/2025/07/From-fossil-to-flexible-advancing-Indias-road-transport-electrification-1.pdf>
51. <https://ghgprotocol.org/blog/frequently-asked-questions-scope-2-and-electricity-sector-consequential-accounting-public>
52. <https://www.esgdive.com/news/microsofts-data-center-expansion-drove-25-emissions-spike-2025-environmental-sustainability-report/825082/>
53. <https://www.wri.org/news/release-dependence-scarce-water-puts-indias-electricity-supply-risk>
54. <https://www.business-standard.com/article/economy-policy/water-disruption-too-caused-power-outages-world-resources-institute-118011600560_1.html>
55. <https://www.wri.org/parched-power-water-demands-risks-and-opportunities-indias-power-sector>
56. <https://pubs.acs.org/esthag/article/55/8/4314/383727/Thermoelectric-Power-Generation-and-Water-Stress>
57. <https://www.indiaspend.com/barely-regulated-thermal-power-plants-use-up-more-water-than-permitted-rti-data-show>
58. <https://www.saurenergy.com/solar-energy-news/india-reduces-atc-losses-to-1616-in-fy25-power-ministry-10894965>
59. <https://www.tndindia.com/overall-atc-losses-of-distribution-utilities-improve-to-15-04-per-cent-in-fy25/>
60. <https://www.electricalindia.in/transmission-losses-in-india/>
61. <https://ember-energy.org/latest-insights/global-electricity-review-2026/major-countries-and-regions/>
62. <https://gpusmith.com/articles/en/pdfs/how-much-water-do-data-centers-use.pdf>
63. <https://wri-india.org/blogs/how-can-india-better-regulate-water-consumption-its-thermal-power-plants>
64. <https://impressivetimes.com/business/atc-losses-reduced-rdss-reforms-power-sector-india-fy25/>
65. <https://www.sciencedirect.com/science/article/abs/pii/S0960148116306176>
66. <https://www.scielo.br/j/ambiagua/a/VnncWCmZy5jsbm5jzN4jpjb/?lang=en>
