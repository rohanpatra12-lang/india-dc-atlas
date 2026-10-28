<!-- Report 17 of the India Data Centre Atlas research series (Reducing water use in AI data centres: a journal-by-journal review). Produced with AI-assisted web research, 12 Oct 2026, and kept as written at the time. The atlas standards register (src/data/standards.js) is authoritative where figures differ (for example India grid water 2.9 L/kWh and grid CO₂ 0.675 t/MWh after the October 2026 corrections). -->

# Reducing Water Use in AI Data Centres: A Journal-by-Journal Review and Recommendations for India

The literature broadly agrees on the main point. Total water per unit of AI work comes down mostly by burning less electricity per useful computation and by buying low-water electricity. On-site water comes down by moving heat rejection away from evaporation, using liquid cooling with warm water and dry or hybrid coolers, and by swapping potable water for treated sewage. In India, almost every data-centre kilowatt-hour already carries roughly 2 litres of power-plant water, so it is a mistake to optimise on-site WUE alone.

## TL;DR

- **What works:** Cold-plate and immersion liquid cooling cut life-cycle blue water by 31–52% versus air cooling in Microsoft's 2025 *Nature* LCA. Hybrid "wet when hot, dry when not" heat rejection halved on-site water at NREL's HPC centre with no energy penalty. In Jiang et al.'s peer-reviewed ACM WaterWise study (Google Borg trace, five AWS regions), water-aware scheduling beat the baseline by at least 14.78% on water and 21.91% on carbon. Its water savings ranged from about 10% to 26% depending on data and settings. Server efficiency and grid water intensity outrank cooling type as drivers of water per workload (Lei et al. 2025, *Resources, Conservation & Recycling*).
- **The main conflict:** Dry or air cooling removes on-site evaporation but raises electricity use, which shifts water to power plants. In Phoenix, an air-cooled facility had a 13% higher PUE but a 66% lower source WUE. A 2026 University of Michigan model of a 200 MW IT facility found that air cooling cut total water by 44%, from 10.93 to 6.12 million m³. It also raised electricity use and indirect water by 32% each. Carbon-optimal and water-optimal scheduling often pull in opposite directions.
- **What this means for India:** India's grid consumed about 2.09 m³ of freshwater per MWh in 2014, excluding hydro. Indian coal plants operate under limits of 3.0–3.5 m³/MWh. So Indian AI campuses should do four things together: low PUE, renewable procurement, closed-loop liquid cooling with dry or hybrid rejection, and treated sewage as the only evaporative make-up in Bengaluru, Chennai and Hyderabad. Regulators should mandate metered site and source WUE, publish an official grid water-intensity factor, and tie incentives to water-scarcity-weighted performance rather than to PUE alone.

## 1. Scope, method and evidence labels

This review groups papers under the journal or venue that published them, then synthesises across journals. Each entry is labelled as follows:
- **[J]** peer-reviewed journal article
- **[C]** peer-reviewed conference paper or ACM magazine article
- **[P]** preprint (arXiv, engrXiv), not yet peer reviewed
- **[G]** grey literature (national-lab technical reports, think-tank or policy reports, news)

Most rigorous quantitative work comes from the US. It covers either general cloud or HPC facilities, or CPU servers. Very little peer-reviewed work measures water at 100+ kW/rack GPU clusters or in tropical hot-humid climates, so the findings below often have to be transferred to AI facilities by inference. These inferences are flagged.

## 2. Journal-wise review

### 2.1 *Nature*

**Alissa, H. et al. (Microsoft/WSP), "Using life cycle assessment to drive innovation for sustainable cool clouds," *Nature* 641, 331–338 (2025). DOI: 10.1038/s41586-025-08832-3. [J]**
- **Method:** Cradle-to-grave LCA from virtual machine through server, building and grid.
- **Strategies compared:** Air cooling, cold plates, single-phase immersion and two-phase immersion.
- **Results:** Advanced cooling cut GHG emissions by 15–21%, energy demand by 15–20% and blue-water consumption by 31–52% versus air cooling. Secondary coverage gives per-technology water ranges of 31–50% (cold plate), 45–80% (single-phase) and 48–82% (two-phase). These differ from the 31–52% headline because scenario boundaries differ; treat the headline range as authoritative. Switching from a typical grid to 100% renewables cut GHG by 85–90% whatever the cooling technology.
- **AI relevance:** The study covers general-purpose CPU servers, not GPUs. A follow-up on AI chips has been reported but not published.
- **Takeaway:** Liquid cooling saves water and energy at the same time. For AI this is the rare case with no water–energy trade-off.

### 2.2 *npj Clean Water* (Nature Portfolio)

**Mytton, D., "Data centre water consumption," *npj Clean Water* 4, 11 (2021). DOI: 10.1038/s41545-021-00101-w; correction DOI: 10.1038/s41545-021-00140-3. [J]**
- **Method:** Review.
- **Findings:**
  - US data centres consume about 1.7 billion litres/day, against 1,218 billion litres/day of total US water use.
  - In some cases 57% of the water is potable.
  - Fewer than a third of operators measure water consumption.
  - A small 1 MW data centre using traditional evaporative or adiabatic cooling can use about 25.5 million litres a year.
- **Recommendations:** Prefer free cooling. Where water is needed, recycled and non-potable water should make up the majority of withdrawals. Direct liquid, rack or room cooling is most efficient but needs owners of the IT equipment and the facility to work closely together.
- **Takeaway:** The foundational call for measurement, non-potable sourcing and liquid cooling.

### 2.3 *Environmental Research Letters* (IOP)

**Siddik, M.A.B., Shehabi, A. & Marston, L., "The environmental footprint of data centers in the United States," *ERL* 16, 064017 (2021). DOI: 10.1088/1748-9326/abfba1. [J]**
- **Method:** Spatial footprint model at sub-basin (HUC8) scale.
- **Findings:**
  - Data centres were about 1.8% of US electricity.
  - The industry draws water directly or indirectly from 90% of US watersheds.
  - Indirect (electricity-related) water was about 383 billion litres in 2018.
  - The paper maps water footprint and water-scarcity footprint intensity for a hypothetical 1 MW facility placed in each of 2,110 sub-basins.
- **Strategy:** Water- and scarcity-aware siting.
- **Takeaway:** Where a facility is sited can change its water-scarcity footprint more than any single cooling choice.

**Macknick, J. et al., "Operational water consumption and withdrawal factors for electricity generating technologies: a review of existing literature," *ERL* 7, 045802 (2012). DOI: 10.1088/1748-9326/7/4/045802. [J]** The standard source for water factors by generation technology, used to compute scope-2 water. PV and wind are near zero in operation; thermal plants with cooling towers are high.

**Shehabi, A. et al., "Data center growth in the United States: decoupling the demand for services from electricity use," *ERL* 13, 124030 (2018). [J]** Background on efficiency-driven decoupling, the energy lever behind indirect water.

### 2.4 *Resources, Conservation & Recycling* (Elsevier)

**Lei, N., Lu, J., Shehabi, A. & Masanet, E., "The water use of data center workloads: A review and assessment of key determinants," *RCR* 219, 108310 (2025). DOI: 10.1016/j.resconrec.2025.108310. [J]**
- **Method:** Review plus parametric assessment.
- **Findings:**
  - Water use per workload varies more than 10,000-fold. This is driven by more than 1,000-fold differences in water per kWh of server electricity and about 10-fold differences in server workload efficiency.
  - Determinants are ranked: server efficiency, grid water consumption factors, server utilisation, cooling system type, infrastructure efficiency, climate zone, inactive server share, refresh cycle.
  - On-site solar PV can be effective in reducing overall water use.
  - "There is no single recipe": the best outcome depends on tailored combinations.
- **AI relevance:** High. GPU efficiency, utilisation and idle capacity are first-order water levers.

**Lei, N. & Masanet, E., "Climate- and technology-specific PUE and WUE estimations for U.S. data centers using a hybrid statistical and thermodynamics-based approach," *RCR* 182, 106323 (2022). DOI: 10.1016/j.resconrec.2022.106323. [J]**
- **Method:** Thermodynamic model with Sobol sensitivity analysis.
- **Findings:** Across technology, efficiency and climate, PUE varied by 62% and WUE by 100%.
- **Takeaway:** WUE benchmarks must be climate-specific. One national WUE target is physically inappropriate.

**Karimi, L. et al., "Water-energy tradeoffs in data centers: A case study in hot-arid climates," *RCR* 181, 106194 (2022). DOI: 10.1016/j.resconrec.2022.106194. [J]**
- **Method:** Measured operating data from two colocation data centres in Phoenix.
- **Results:** DC1 (air-cooled chillers) had an average PUE about 13% higher than DC2 (water-cooled chillers plus evaporative cooling), but its source WUE was 66% lower.
- **Takeaway:** On the US Southwest grid, "dry" wins on total water despite the energy penalty.

### 2.5 *Applied Thermal Engineering* (Elsevier)

**Karimi, L. et al., "Energy and water dynamics in data center cooling: Insights from a modeling study in hot-arid climates," *Applied Thermal Engineering* (2025), PII S1359431125013948. [J]**
- **Method:** Hourly simulation for Phoenix.
- **Findings:**
  - Economisers and evaporative cooling save energy and water only in limited hours.
  - Adding evaporative pre-cooling to air-cooled chillers saves energy but increases on-site water.
  - Evaporative cooling "can be water intensive and not applicable in hot-humid climates because of the high outdoor air wet-bulb temperature."
- **Takeaway:** Directly relevant to coastal India. Evaporative cooling loses its edge as wet-bulb temperature rises.

### 2.6 *Renewable and Sustainable Energy Reviews* (Elsevier)

**Jin, Y., Behrens, P., Tukker, A. & Scherer, L., "Water use of electricity technologies: A global meta-analysis," *RSER* 115, 109391 (2019). DOI: 10.1016/j.rser.2019.109391. [J]** Meta-analysis of life-cycle blue-water consumption and withdrawal by generation and cooling type. It shows that over the life cycle crystalline-silicon PV can reach up to 794 L/MWh. That is far below thermal generation, but not zero. Used to build scope-2 factors.

**Ebrahimi, K., Jones, G.F. & Fleischer, A.S., "A review of data center cooling technology, operating conditions and the corresponding low-grade waste heat recovery opportunities," *RSER* 31, 622–638 (2014). DOI: 10.1016/j.rser.2013.12.007. [J]** A foundational review of liquid and warm-water cooling and of low-grade heat recovery, including absorption cooling.

**"Waste heat recoveries in data centers: A review," *RSER* 188, 113777 (2023). [J]** Reviews heat recovery from exhaust air, circulating water and coolants for heating, district heating, absorption cooling and industrial or agricultural uses.

**Thermosyphon and free-cooling reviews in RSER** (e.g., "A review on thermosyphon and its integrated system with vapor compression for free cooling of data centers," *RSER* 81, 2018; "Principles of loop thermosyphon and its application in data center cooling systems," *RSER* 150, 2021). [J] Background for refrigerant-based dry heat rejection.

### 2.7 *Applied Energy* (Elsevier): India power-sector water

**Srinivasan, S., Kholod, N., Chaturvedi, V. et al., "Water for electricity in India: A multi-model study of future challenges and linkages to climate change mitigation," *Applied Energy* 210, 673–684 (2018). ScienceDirect PII S0306261917304725. [J]**
- **Method:** Five energy-economic models projecting to 2050.
- **Findings:**
  - Thermal plants account for about 88% of India's industrial water demand.
  - About 84% of coal plants by count used freshwater (CSTEP, 2010).
  - Focusing on wind and solar reduces both consumption and withdrawals. Nuclear increases both. Hydro may increase evaporative losses.
- **Takeaway:** Indian decarbonisation through wind and solar also removes data-centre scope-2 water.

### 2.8 *Environmental Science & Technology* (ACS)

**Zhang, C., Yang, J., Urpelainen, J., Chitkara, P., Zhang, J. & Wang, J., "Thermoelectric Power Generation and Water Stress in India: A Spatial and Temporal Analysis," *ES&T* 55(8) (2021). DOI: 10.1021/acs.est.0c08724. [J]**
- **Method:** Plant-level geodatabase, with projections from the SWITCH-India model.
- **Findings:**
  - Thermal-plant freshwater withdrawal was 14–16 billion m³/yr over 2009–2018.
  - Thermal generation is projected to rise from 1,106 TWh (2018) to 1,617 TWh (2027).
  - Thermal power is not a major source of water stress in most basins up to 2027.
  - Withdrawal in extremely high-stress areas is projected to fall about 40% from 2018 to 2027.
- **Takeaway:** Much of an Indian data centre's scope-2 water is consumed in coal-belt basins, not in the city that hosts the facility. This matters for scarcity weighting.

### 2.9 *Energy* and *Environment, Development and Sustainability*: India coal-plant water

**"Vulnerability assessment of thermal power plants in India under water stress conditions," *Energy* (2023), PII S0360544223009477. [J]**
- About 30% of India's coal plants are in regions where freshwater availability is trending down.
- Closed-loop Indian plants use 2.8–3.4 m³/MWh, about twice the world average of 1.2–1.5 m³/MWh.

**"Energy-water nexus for thermal power generation in India: challenges and opportunities," *Environment, Development and Sustainability* (2023). DOI: 10.1007/s10668-023-03075-6. [J]**
- Life-cycle water use at three Indian coal plants was 2.5–3.5 L/kWh, against a global average of 1.75 L/kWh.
- Air-cooled and seawater-cooled condensers are proposed as reduction routes.

### 2.10 *Communications of the ACM*, ACM conferences and IEEE Transactions (computing venues)

**Li, P., Yang, J., Islam, M.A. & Ren, S., "Making AI Less 'Thirsty'," *Communications of the ACM* 68(7) (July 2025). DOI: 10.1145/3724499. Preprint: arXiv:2304.03271 (2023). [C/P]**
- **Method:** Estimation framework covering scope 1 (on-site), scope 2 (electricity) and scope 3 (embodied).
- **Findings:**
  - Training GPT-3 in Microsoft's US data centres could directly evaporate 700,000 litres of clean freshwater.
  - Global AI demand could account for 4.2–6.6 billion m³ of withdrawal in 2027. This is a projection, not a measurement.
  - "When" and "where" a model is trained or served can significantly cut the water footprint because WUE varies hour by hour.
- **Recommendations:** Water-wise scheduling, transparency, and reporting withdrawal as well as consumption.

**Jiang, Y., Roy, R.B., Kanakagiri, R. & Tiwari, D., "WaterWise: Co-optimizing Carbon- and Water-Footprint Toward Environmentally Sustainable Cloud Computing," ACM conference proceedings (2025). DOI: 10.1145/3710848.3710891. Preprint: arXiv:2501.17944. [C]**
- **Method:** Scheduler for geo-distributed parallel jobs with delay tolerance.
- **Results:**
  - On a Google Borg trace across five AWS regions, WaterWise beat the baseline "by at least 21.91% and 14.78% in terms of carbon and water footprint."
  - Water savings were 11% using WRI data and 10.2% at doubled request rates. They reached 26% only "under a 10% variation in embodied carbon and 50% delay tolerance."
  - Against single-objective optima, the compromise cost "only 6.62% carbon footprint increase with respect to Carbon-Greedy-Opt and 4.77% water footprint increase with respect to Water-Greedy-Opt."
  - It finds that carbon and water sustainability "are at odds."

**Islam, Ren and co-authors: "Exploiting Spatio-Temporal Diversity for Water Saving in Geo-Distributed Data Centers," *IEEE Transactions on Cloud Computing* 6(3), 734–746 (2018); "Water-constrained geographic load balancing in data centers," *IEEE TCC* 5(2), 208–220. [J]** Early formal demonstrations of water-aware geographical load balancing.

**Liu, Z. et al., "Greening Geographical Load Balancing," *IEEE/ACM Transactions on Networking* 23(2), 657–671 (2015). DOI: 10.1109/TNET.2014.2308295. [J]** The carbon-side precursor to water-aware load balancing.

**"FlexCoolDC: Datacenter Cooling Flexibility for Harmonizing Water, Energy, Carbon, and Cost Trade-offs," ACM e-Energy (2024). DOI: 10.1145/3632775.3661936. [C]**
- Hourly switching between cooling modes.
- Dry cooling in California saved an average of 4.34 million gallons/month for only a 0.7% increase in total cost of ownership (TCO).
- In France, saving water raised TCO by up to 3.9 times more than in California.
- **Takeaway:** The economics of saving water depend on the site.

### 2.11 *Joule* (Cell Press)

**Masanet, E., Lei, N. & Koomey, J., "To better understand AI's growing energy use, analysts need a data revolution," *Joule* 8, 2427–2436 (2024). [J]** Argues that site-specific cooling parameters and temperature set points are needed to estimate PUE and WUE for new AI configurations, and that these configurations are "not well-understood."

### 2.12 *Energy and Buildings* (Elsevier)

**"Energy performance evaluation in a data center with water-side free cooling," *Energy and Buildings* (2023), PII S037877882300508X. [J]** A field measurement in which full water-side free cooling cut PUE from 1.59 to 1.46, but with a measured gap between ideal and actual savings. Lower PUE also lowers scope-2 water.

### 2.13 MDPI journals (*Buildings*, *Energies*)

**"Performance and Applicability Analysis of Indirect Evaporative Cooling Units in Data Centers Across Various Humidity Regions," *Buildings* 14(11), 3623 (2024). [J]** TRNSYS simulation across humidity zones. Indirect evaporative cooling (IEC) used less power and water than a water-cooled chiller system, and both fell in drier, cooler regions.

**"Evaporative Cooling Across Building Types and World Climate Zones," *Energies* 19(20), 4801 (2026). [J]**
- Reviews 27 case studies.
- A data-centre IEC unit saved 39–57% energy, kept PUE below 1.3, and used 69–78% less water than a water-cooled chiller plant.
- Theoretical evaporation is about 1.5 L per kWh of heat removed, before blowdown.
- In humid zones (Cfa, Aw), dehumidification or compressors were still needed.

### 2.14 *Water Practice & Technology* (IWA)

**"Wastewater reuse for industrial cooling towers: a full-scale case study," *Water Practice & Technology* 21(5), 2061 (2026). [J]**
- A full-scale petrochemical complex in Tarragona, Spain, blended up to 40% RO-treated municipal wastewater into cooling-tower make-up.
- Cycles of concentration rose from 4 to up to 7.
- Total make-up demand fell 22% and blowdown fell 50%.
- **Takeaway:** High-quality treated sewage both replaces freshwater and allows higher cycles. The result transfers directly to data-centre cooling towers.

### 2.15 *AGU Advances* and *PLOS Water*

**Privette et al., "Data Centers Water Footprint: The Need for More Transparency," *AGU Advances* (2026). DOI: 10.1029/2025AV002140. [J]** Warns that single average values or sector benchmarks can significantly underestimate true water footprints.

**"Four water insecurity concerns about datacenters driving the AI revolution," *PLOS Water* (2025). DOI: 10.1371/journal.pwat.0000500. [J]** Frames the risks to local water insecurity.

### 2.16 Preprints [P]

**Alston, G., Love, N. & Haider, R., "Data center cooling choices shift water impacts across the grid," arXiv:2609.25437 (Sept 2026). [P]**
- **Method:** Hourly economic-dispatch model of Michigan, linked to generator-level water use and subbasin depletion.
- **Findings:**
  - For a 200 MW IT facility in Oakland County, switching from evaporative to air cooling cut total water "by 44%, from 10.93 to 6.12 million m3."
  - The same switch raised electricity "by 32%, from 3.08 to 4.06 TWh" and indirect water "by 32%, from 4.48 to 5.91 million m3."
  - The indirect share rose from 41% (water-cooled chiller) to 96.6% (air-cooled chiller).
  - Indirect water intensity varies by about 50% across months.
  - A hybrid configuration gave the lowest electricity use (2.76 TWh) and the lowest indirect water.
  - Indirect water should be attributed to the basins of the generators that actually respond to the load.

**Spatio-temporal shifting of FaaS workloads across Azure regions, arXiv:2512.08725. [P]** Optimising for carbon cut emissions by up to about 85% but raised the water footprint by about 40%. Optimising for water (about 50% reduction) raised carbon significantly.

**GreenDirector, arXiv:2609.12602. [P]** Carbon-greedy placement raised carbon efficiency by 74.71% but cut water-scarcity efficiency by 35.75%.

**"Reclaiming Cooling: Wastewater Reuse as a Strategic Resource for Data Center Water Management," engrXiv preprint 7240. [P]**
- An LCA of reclaimed wastewater (depth filtration, GAC, chlorination) as cooling-tower make-up.
- It had about twice the GWP of the freshwater case, with treatment energy accounting for about 80% of the difference.
- It carried an indirect water penalty of about 0.93 L per m³.
- The GWP penalty falls as the grid decarbonises.

**"Not All Water Consumption Is Equal: A Water Stress Weighted Metric for Sustainable Computing," arXiv:2506.22773. [P]** Argues for metrics weighted by water stress.

### 2.17 Grey literature [G]

**Sickinger, D., Van Geet, O. et al., NREL/TP-2C00-72196 (2018), "Thermosyphon Cooler Hybrid System for Water Savings in an Energy-Efficient HPC Data Center: Results from 24 Months."**
- **Facility:** NREL's warm-water liquid-cooled, chiller-less HPC data centre (PUE about 1.034–1.06) added a refrigerant thermosyphon dry cooler upstream of its cooling towers.
- **Water savings:** 1.16 million gallons in year one, 2.10 million gallons over two years, and 6,533,647 gallons over five years. On-site water was roughly halved with no energy penalty.
- **WUE:** About 0.7 L/kWh, against 1.42 L/kWh with towers only. Source WUE was 5.4 L/kWh, or 4.9 L/kWh counting on-site PV, using a Colorado electricity water factor of 4.542 L/kWh.
- **Takeaway:** This is the clearest real-world evidence for warm-water liquid cooling plus hybrid heat rejection at HPC density. It also shows that source water can be about 7 times on-site water on a fossil-heavy grid.

**IRENA & WRI, "Water Use in India's Power Generation: Impact of Renewables and Improved Cooling Technologies to 2030" (Jan 2018).**
- In 2014, India's freshwater consumption intensity for electricity (thermal plus non-hydro renewables) was 2.09 m³/MWh, and withdrawal intensity was 15.93 m³/MWh.
- IRENA's press release of 16 January 2018 states that solar PV, wind and better cooling could "lower annual water consumption intensity by 25%" by 2030 against 2014. They could cut withdrawal intensity by "as much as an 84%." The corresponding projected consumption intensities are 1.57–1.94 m³/MWh by 2027–2030.
- Solar PV is about 0.08 m³/MWh, about 0.5% of the thermal average.

**Other grey literature**
- **WRI, "Parched Power" (2018):** Thermal utilities' freshwater consumption grew 43% from 2011 to 2016, from 1.5 to 2.1 billion m³/yr.
- **PNNL-34788 (2023):** Reviews alternative sources for cooling-tower make-up: HVAC condensate, rainwater, stormwater, greywater, reclaimed wastewater, blowdown recovery and desalination.

## 3. Cross-journal comparison of strategies

| Strategy | Best-quantified evidence (venue) | On-site water effect | Energy/PUE effect | Cost signal | Maturity | Climate suitability |
|---|---|---|---|---|---|---|
| Cold-plate direct-to-chip liquid cooling | Alissa et al., *Nature* 2025 | −31% to −52% life-cycle blue water (all liquid options) | −15% to −20% energy | Not quantified; enables denser, smaller buildings | Commercial; standard for current GPUs | All; biggest gain where it enables dry rejection |
| Single/two-phase immersion | Alissa et al., *Nature* 2025 | Within −31% to −52% (secondary sources: up to −80%) | −15% to −20% | Higher fluid/hardware cost; fluid (PFAS) concerns for two-phase | Early commercial | All |
| Warm-water cooling + hybrid "wet when hot, dry when not" | NREL TP-72196 (2018) [G] | About −50% on-site (WUE 1.42 → 0.7 L/kWh) | No penalty (PUE ≈ 1.03–1.06) | Paid back through water/sewer savings | Demonstrated at about 1 MW IT | Strong in moderate and hot-dry; useful in hot-humid |
| Air-cooled chillers / dry coolers | Karimi et al., *RCR* 2022; Alston et al. 2026 [P] | Near-zero on-site | PUE +13% (Phoenix); electricity and indirect water each +32% (Michigan) | FlexCoolDC: +0.7% TCO in California, much higher in France | Mature | Best where grid is low-water or renewable |
| Indirect evaporative cooling | *Energies* 2026 review; *Buildings* 2024 | 69–78% less than water-cooled chillers | −39% to −57% energy, PUE < 1.3 | Moderate | Mature | Hot-dry; weaker in humid (Cfa/Aw) |
| Evaporative pre-cooling of air-cooled chillers | Karimi et al., *Appl. Therm. Eng.* 2025 | Increases on-site water | Saves energy | Low | Mature | Only useful for limited hours in hot-arid |
| Water-side economiser / free cooling | *Energy and Buildings* 2023 | Indirect reduction via lower PUE | PUE 1.59 → 1.46 measured | Low | Mature | Cool seasons; limited in tropics |
| Higher cycles + reclaimed/RO water make-up | *Water Pract. Technol.* 2026 | −22% make-up, −50% blowdown; freshwater displaced 1:1 | Treatment energy adds GWP (≈2×, engrXiv [P]) | Needs nearby STP and pipelines | Mature in industry | All, especially water-stressed cities |
| Water-aware scheduling / geo load balancing | WaterWise (ACM 2025); IEEE TCC 2018 | −11% to −26% water footprint | Can raise carbon (trade-off) | Software; latency limits | Research/early deployment | Needs multi-region fleets |
| Server/model efficiency, utilisation, idle reduction | Lei et al., *RCR* 2025 | Ranked #1 determinant (≈10× spread) | Direct energy cut | Usually saves money | Mature | All |
| Renewable (PV/wind) procurement | Lei et al. 2025; Srinivasan et al. 2018; IRENA/WRI 2018 | Cuts scope-2 water toward ≈0.08 m³/MWh | Neutral | PPA economics | Mature | All; decisive on coal grids |
| Siting by water scarcity | Siddik et al., *ERL* 2021 | Large change in scarcity footprint | Varies | Land/power constraints | Planning tool | All |
| Heat reuse / absorption cooling | *RSER* 2014, 2023 reviews | Indirect | Raises the energy reuse factor (ERE) | Needs heat demand | Niche in the tropics | Mainly cold climates; absorption cooling possible in the tropics |

## 4. Consensus, disagreements and gaps

**Consensus**
1. WUE alone is an incomplete and potentially misleading metric. Site and source water must be reported together, and both withdrawal and consumption should be shown. This view is shared by Mytton 2021, Lei et al. 2025, Karimi et al. 2022, Privette et al. 2026 and Li et al. 2025.
2. Liquid cooling saves both energy and water against air cooling (*Nature* 2025). AI densities make it unavoidable anyway.
3. Electricity efficiency and the power mix dominate water per workload on fossil-heavy grids (*RCR* 2025; NREL's source WUE of 5.4 L/kWh against site WUE of 0.7).
4. Benchmarks must be climate-specific: WUE varies 100% with climate and technology (*RCR* 2022).

**Disagreements and tensions**
1. **Dry versus evaporative heat rejection.** Karimi et al. (Phoenix) and Alston et al. (Michigan) find air or dry cooling lowers total water. The Michigan model also shows indirect water rising by 32%, from 4.48 to 5.91 million m³, and shifting to other basins. A hybrid design came out best on electricity. The answer depends on the grid's water factor, the climate and the scarcity weighting. There is no universal winner, which is consistent with Lei et al.'s "no single recipe."
2. **Carbon versus water scheduling.** WaterWise reports a balanced compromise. FaaS-shifting and GreenDirector preprints report large reversals (carbon −85% with water +40%; carbon efficiency +75% with water-scarcity efficiency −36%). These magnitudes depend on the datasets used and are mostly not peer reviewed.
3. **Reclaimed water.** It saves freshwater one-for-one but may double the cooling system's GWP on today's grids (engrXiv preprint). The full-scale IWA case shows reclaimed water also enables higher cycles, which partly offsets this.
4. **Liquid-cooling magnitude.** The *Nature* headline is 31–52% water reduction; secondary press summaries give up to 82% for two-phase immersion. Use the peer-reviewed headline.

**Research gaps**
- No peer-reviewed measured WUE/PUE dataset exists for 100+ kW/rack GPU halls. The *Nature* LCA covered CPUs, and the Joule commentary says new AI configurations are "not well-understood."
- Almost no peer-reviewed data-centre water studies exist for tropical hot-humid climates (Köppen Aw/Am, e.g., Mumbai, Chennai). Indian evidence is limited to the power sector.
- There are no generator-response (marginal) water factors for India. Alston et al.'s method has not been applied there.
- Embodied (scope-3) chip-manufacturing water is acknowledged (Li et al.) but rarely quantified for GPUs.

## 5. Indian context

- **Grid water intensity:** About 2.09 m³/MWh freshwater consumption in 2014 (IRENA/WRI), excluding hydro. Indian closed-loop coal plants run at 2.8–3.4 m³/MWh (*Energy* 2023). MoEFCC's 7 December 2015 notification set 3.5 m³/MWh for existing plants and 2.5 m³/MWh for new plants; the new-plant limit was relaxed to 3.0 m³/MWh in June 2018, with zero liquid discharge retained.
  - I could not verify a state-by-state "at the meter" range of 2.0–3.3 L/kWh. Delivery losses would push at-meter values above generation-side figures.
  - **India has no official grid water-intensity factor;** CEA publishes none.
- **Illustrative calculation (author's estimate, using 2.09 L/kWh):** Consider an evaporative facility at WUE 1.5 L/kWh and PUE 1.30. It carries about 2.7 L/kWh-IT of scope-2 water, about 4.2 L/kWh-IT in total. A dry or hybrid facility at WUE about 0.1 and PUE 1.45 carries about 3.1 L/kWh-IT. With a solar-plus-wind PPA, scope-2 falls toward about 0.1–0.2 L/kWh, and on-site evaporation becomes the dominant and local term. **Implication:** on India's current grid both on-site and scope-2 water matter. As renewable procurement rises, on-site water becomes the term to attack, and it falls on stressed cities, while scope-2 water falls mostly on coal-belt basins (*ES&T* 2021).
- **Data-centre sector:**
  - CEEW and SYSTEMIQ's "Scaling India's Data Centre Ecosystem" (Tripathi et al., Feb 2026) states that "As of January 2026, India hosts ~271 data centres." It puts data centres at "around 0.5 per cent (Cornell 2025)" of national electricity.
  - The same report cites "approximately 150 billion litres (Mordor Intelligence 2025)" of annual water use. That figure comes from a market-research firm, so treat it as weak.
  - Mongabay India (May 2026), citing CEEW, reports that 15 states have their own data-centre policies and that "Most of these policies exhibit an absence of performance standards such as PUE or WUE." CEEW's Shalu puts data-centre water at "approximately 0.02-0.03% of the national demand."
  - WRI India mapping reports that more than half of India's data centres are in water-stressed regions.
- **Disclosure:** Down To Earth found no published WUE for Nxtra, AdaniConneX or CtrlS. NTT reported 0.72 L/kWh across its portfolio and 1.42 L/kWh at evaporative sites (2024). CtrlS reported 409,037 kL of water consumption in 2023–24.
- **Karnataka Sustainable Data Centre Policy 2026–31:**
  - Targets 1 GW of IT load by 2031 and a 10–12% share of India's AI-ready capacity, with about ₹13 billion allocated.
  - Requires PUE and WUE monitoring.
  - Reimburses 100% of treated-water charges, capped at ₹8 lakh/yr.
  - Offers PUE-linked incentives of up to ₹20 crore.
  - Makes desalination plants linked to data centres eligible for special packages.
  - Commits to mapping water and energy availability before expansion.
  - A planned 500 MW Hoskote park would have access to 60 MLD of secondary treated water.
  - Karnataka has 32 data centres. Neither BWSSB nor KSPCB tracks their water use separately, and twelve Bengaluru facilities may draw up to 1.964 MLD at peak.
- **CGWA Guidelines (S.O. 3289(E), 24 Sept 2020):**
  - Tamper-proof digital flow meters with telemetry are mandatory for NOC holders; extraction without them is "construed as illegal."
  - Abstraction charges rise with the block's stress category.
  - No new non-MSME industry may extract groundwater in over-exploited areas.
  - Users drawing more than 100 kL/day need a biennial water audit.
  - CGWA has found 2,833 cases of illegal or excess extraction (to February 2026).
- **IndiaAI Mission compute empanelment (RFE, 16 Aug 2024 and continuous rounds):**
  - Requires a Tier III or higher data centre and scores "PUE & other sustainability metrics."
  - The continuous RFE has a quarterly-PUE penalty clause; its worked example uses 1.35 against about 1.4.
  - An SBI sector report (April 2026) states that MeitY AI-cloud tenders require PUE below 1.35. I could not confirm a hard cap from the primary text.
  - **No WUE requirement was found.**
- **International comparator:** Johor (Malaysia) applies a WUE threshold of 1.8, the same as Singapore. It still approves projects only where water is available and directs some developers to recycled sewage effluent.

## 6. India-specific recommendations

### 6.1 For operators and designers

1. **Make closed-loop direct-to-chip liquid cooling the default for every AI hall, and design for warm water (W32–W40 class) so chillers run only as trim.** *Evidence:* *Nature* 2025 (−31–52% water, −15–20% energy); NREL warm-water chiller-less design (PUE ≈ 1.03–1.06); Ebrahimi et al. *RSER* 2014.
2. **Choose heat rejection by climate archetype, and treat all three cases as hybrids:**
   - **Bengaluru (moderate, water-stressed):** Size dry coolers or thermosyphons to carry the full load for most of the year, with evaporative assist only on peak days fed by treated sewage. *Evidence:* NREL hybrid (−50% on-site water, no energy penalty); Lei & Masanet 2022 on climate dependence.
   - **Hyderabad, Pune, Delhi NCR (hot-dry pre-monsoon, low wet-bulb):** Indirect evaporative or adiabatic-assisted dry coolers are very efficient here, but only on non-potable water. *Evidence:* *Energies* 2026 (IEC 69–78% less water than water-cooled chillers); Karimi et al. 2025 (savings limited to certain hours).
   - **Mumbai, Chennai, Visakhapatnam (hot-humid; design wet-bulb as stated in the brief, about 28–29 °C, not independently verified here):** Evaporative cooling loses much of its advantage at high wet-bulb. Favour warm-water liquid cooling with dry rejection plus mechanical trim. Use seawater or treated sewage for any evaporative stage. Evaluate seawater once-through or indirect seawater heat exchange where coastal regulation allows. *Evidence:* Karimi et al. 2025 (evaporative "not applicable in hot-humid"); *Energies* 2026 (humid zones need compressors); seawater condensers in Indian power plants (*EDS* 2023). Note that no peer-reviewed Indian data-centre measurement exists yet (gap).
3. **Never put potable water or groundwater into an evaporative system in a stressed city.** Contract STP tertiary or RO water at the siting stage and run towers at high cycles. *Evidence:* Mytton 2021; *Water Pract. Technol.* 2026 (cycles 4 → 7, −22% make-up, −50% blowdown); CGWA bans new industrial extraction in over-exploited blocks. Budget for the extra treatment energy (engrXiv preprint).
4. **Buy round-the-clock solar-plus-wind power, ideally hourly matched.** On India's grid this removes about 2 L of power-plant water per kWh, often more than any cooling change. *Evidence:* IRENA/WRI 2018 (2.09 vs 0.08 m³/MWh); Srinivasan et al. *Applied Energy* 2018; Lei et al. 2025.
5. **Treat GPU utilisation, idle capacity, model efficiency and inference optimisation as water measures.** *Evidence:* Lei et al. 2025 ranks server efficiency and utilisation above cooling type.
6. **Operators with multiple Indian regions should run water- and carbon-aware schedulers for deferrable training and batch inference,** using an explicit carbon/water weighting rather than carbon alone. *Evidence:* WaterWise (at least 14.78% water and 21.91% carbon savings versus baseline); Li et al. CACM 2025; preprints showing that carbon-only shifting can raise water by about 40%.
7. **Meter and publish monthly site WUE, source WUE (consumption and withdrawal), peak-day draw and water source mix, per facility.** *Evidence:* Mytton 2021 (fewer than a third of operators measure); Privette et al. 2026; DTE finding that leading Indian operators publish no WUE.

### 6.2 For state governments and regulators (Karnataka, Maharashtra, Telangana, Tamil Nadu, Andhra Pradesh, Uttar Pradesh)

1. **Replace PUE-only incentives with combined PUE + site-WUE + source-WUE thresholds, set by climate zone,** rather than one statewide WUE number. *Evidence:* Lei & Masanet 2022 (WUE varies 100% by climate and technology); Karimi et al. 2022 (a better PUE can mean worse source water).
2. **Make treated sewage the default supply for data-centre parks.** Pair parks with STPs, as Karnataka's Hoskote 60 MLD plan does, and fund dual pipelines. Karnataka's ₹8 lakh/yr reimbursement cap is small next to hyperscale campus water bills, so states should consider tariff-based or capital support instead. *Evidence:* Mytton 2021; *Water Pract. Technol.* 2026; Johor/Singapore practice.
3. **Grant approval subject to a water balance and allocation-availability check, and weight siting by water scarcity.** Steer evaporative-cooled campuses away from over-exploited blocks and the Bengaluru/Chennai/Hyderabad cores. *Evidence:* Siddik et al. *ERL* 2021; WRI India mapping.
4. **Require utilities (BWSSB, CMWSSB, HMWSSB and equivalents) and pollution-control boards to track data-centre water as its own category.** TNM found Karnataka does not. **Coastal states (Tamil Nadu, Andhra Pradesh, Maharashtra) should write desalination and seawater-cooling pathways into policy, with brine rules.** Karnataka already makes desalination eligible.

### 6.3 For the central government

1. **MoP/CEA:** Publish an official annual grid water-consumption and withdrawal factor (L/kWh), by state and ideally by hour or marginal unit. **MoEFCC:** Enforce the 3.0–3.5 m³/MWh coal-plant limits, since these flow straight into data-centre scope-2 water. *Evidence:* IRENA/WRI 2018; *ES&T* 2021; Alston et al. 2026 on marginal-generator attribution; Li et al. 2025.
2. **BEE with MeitY:** Create a data-centre star-rating or code that includes site WUE, source WUE, a water-scarcity-weighted metric and the reuse share alongside PUE. *Evidence:* Lei et al. 2025; Privette et al. 2026; preprints on stress-weighted metrics.
3. **MeitY/IndiaAI:** Add WUE and water-source disclosure to the next compute empanelment rounds, which today score PUE (reportedly < 1.35) and Tier III but set no water criterion. Give credit for liquid cooling and for using non-potable water. *Evidence:* *Nature* 2025; NREL 2018.
4. **CGWA / Ministry of Jal Shakti:** Classify hyperscale and AI data centres explicitly in the NOC regime. Require telemetry for all their sources, including tankers and municipal supply. Bar groundwater for evaporative cooling in over-exploited and critical blocks. *Evidence:* CGWA 2020 guidelines; Mytton 2021.
5. **Fund research (DST, MeitY, IITs) on measured WUE and PUE for GPU halls in Aw/Am climates.** This is the literature's largest gap and India's most important one.

## 7. Caveats

- Most quantitative evidence is from the US and from CPU or HPC facilities. Transferring it to Indian GPU campuses is reasoned inference, not measurement.
- India's 2.09 m³/MWh grid factor dates from 2014, excludes hydropower reservoir evaporation, and is a generation-side average, not a marginal or at-meter value.
- The global AI water projection of 4.2–6.6 billion m³ for 2027 is a scenario estimate.
- Several scheduling and reclaimed-water results come from non-peer-reviewed preprints.
- India's sector-wide water estimate of about 150 billion litres traces to market research.
- The IndiaAI PUE threshold is confirmed only by secondary sources.
- Karnataka policy details come from press coverage of the cabinet-approved policy, not the gazette text.

## Sources

1. nature — https://www.nature.com/articles/s41586-025-08832-3
2. datacenterdynamics — https://www.datacenterdynamics.com/en/news/microsoft-study-finds-liquid-cooling-can-cut-data-center-emissions-by-up-to-21/
3. networkworld — https://www.networkworld.com/article/3979105/liquid-cooling-technologies-reducing-data-center-environmental-impact.html
4. coolingpost — https://www.coolingpost.com/world-news/assessing-life-cycle-impacts-of-data-centre-cooling/
5. arxiv — https://arxiv.org/pdf/2609.23421
6. doaj — https://doaj.org/article/06d1d06402ae4521b35a9a9b2cb96233
7. nature — https://www.nature.com/articles/s41545-021-00101-w
8. semanticscholar — https://www.semanticscholar.org/paper/The-environmental-footprint-of-data-centers-in-the-Siddik-Shehabi/a3e99c61a0e1834d4a20cd7be9e4179bc72d303d
9. asce — https://www.asce.org/publications-and-news/civil-engineering-source/civil-engineering-magazine/issues/magazine-issue/article/2024/03/engineers-often-need-a-lot-of-water-to-keep-data-centers-cool
10. nih — https://pmc.ncbi.nlm.nih.gov/articles/PMC12827721/
11. utexas — https://wrp.beg.utexas.edu/episode/increasing-water-consumption-in-data-centers-amplifies-local-water-scarcity
12. lbl — https://eta-publications.lbl.gov/publications/water-use-data-center-workloads
13. osti — https://www.osti.gov/servlets/purl/2572888
14. researchgate — https://www.researchgate.net/profile/Eric-Masanet
15. sciencedirect — https://www.sciencedirect.com/author/6506501487/eric-r-masanet
16. deeprogram — https://www.deeprogram.org/library/water-energy-tradeoffs-in-data-centers-a-case-study-in-hot-arid-climates/Q358YKA4
17. sciencedirect — https://www.sciencedirect.com/science/article/abs/pii/S1359431125013948
18. universiteitleiden — https://scholarlypublications.universiteitleiden.nl/access/item:2983936/download
19. sciencedirect — https://www.sciencedirect.com/science/article/pii/S1364032119305994
20. researchgate — https://www.researchgate.net/publication/260165268_A_review_of_data_center_cooling_technology_operating_conditions_and_the_corresponding_low-grade_waste_heat_recovery_opportunities
21. repec — https://ideas.repec.org/a/eee/rensus/v188y2023ics1364032123006342.html
22. sciencedirect — https://www.sciencedirect.com/science/article/pii/S2590174526000954
23. ceew — https://www.ceew.in/publications/water-electricity-india
24. sciencedirect — https://www.sciencedirect.com/science/article/abs/pii/S0306261917304725
25. iaea — https://inis.iaea.org/records/y5xcd-0ea73
26. acs — https://pubs.acs.org/doi/10.1021/acs.est.0c08724
27. academia — https://www.academia.edu/81475511/Thermoelectric_Power_Generation_and_Water_Stress_in_India_A_Spatial_and_Temporal_Analysis?f_ri=34633
28. sciencedirect — https://www.sciencedirect.com/science/article/abs/pii/S0360544223009477
29. springer — https://link.springer.com/article/10.1007/s10668-023-03075-6
30. acm — https://cacm.acm.org/sustainability-and-computing/making-ai-less-thirsty/
31. arxiv — https://arxiv.org/abs/2304.03271
32. arxiv — https://arxiv.org/pdf/2304.03271
33. researchgate — https://www.researchgate.net/figure/Flotherm-simulation-of-airflow-speed-at-minimum-continuous-fan-speed_fig3_220781560
34. arxiv — https://arxiv.org/pdf/2510.00471
35. arxiv — https://arxiv.org/pdf/2501.17944
36. acm — https://dl.acm.org/doi/10.1145/3632775.3661936
37. sciencedirect — https://www.sciencedirect.com/science/article/pii/S2542435124003477
38. sciencedirect — https://www.sciencedirect.com/science/article/abs/pii/S037877882300508X
39. mdpi — https://www.mdpi.com/2075-5309/14/11/3623
40. mdpi — https://www.mdpi.com/1996-1073/19/20/4801
41. iwaponline — https://iwaponline.com/wpt/article-abstract/21/5/2061/111685/Wastewater-reuse-for-industrial-cooling-towers-a?redirectedFrom=fulltext
42. wiley — https://agupubs.onlinelibrary.wiley.com/doi/10.1029/2025AV002140
43. arxiv — https://arxiv.org/pdf/2609.25437
44. arxiv — https://arxiv.org/html/2609.25437v1
45. arxiv — https://arxiv.org/pdf/2512.08725
46. arxiv — https://arxiv.org/html/2609.12602
47. engrxiv — https://engrxiv.org/preprint/view/7240
48. lbl — https://datacenters.lbl.gov/sites/default/files/Fact%20Sheet_0.pdf
49. lbl — https://datacenters.lbl.gov/resources/thermosyphon-cooler-hybrid-system-0
50. nrel — https://docs.nrel.gov/docs/fy18osti/72196.pdf
51. arxiv — https://arxiv.org/pdf/2412.12355
52. nrel — https://www.nrel.gov/docs/fy19osti/74145.pdf
53. irena — https://www.irena.org/-/media/Files/IRENA/Agency/Publication/2018/Jan/IRENAIndiapowerwater2018pdf.pdf
54. wri — https://www.wri.org/parched-power-water-demands-risks-and-opportunities-indias-power-sector
55. pnnl — https://www.pnnl.gov/publications/emerging-technologies-review-water-reuse-systems-cooling-tower-applications
56. powerline — https://powerline.net.in/2017/07/11/efficient-cooling/
57. slideshare — https://www.slideshare.net/AtanuMaity5/water-efficiency-in-thermal-power-plant
58. powerline — https://powerline.net.in/2026/09/04/water-stress-thermal-power-plants-take-steps-to-optimise-consumption/
59. mongabay — https://india.mongabay.com/2026/05/india-bets-on-data-centres-even-as-water-energy-use-concerns-mount/
60. scroll — https://scroll.in/article/1092827/water-energy-use-concerns-grow-with-more-india-data-centres-in-the-pipeline
61. earthjournalism — https://earthjournalism.net/stories/what-data-center-giants-arent-saying-about-their-water-use-in-india
62. dig — https://dig.watch/updates/karnataka-sustainable-data-centre-policy
63. thenewsminute — https://www.thenewsminute.com/karnataka/karnatakas-new-data-centre-policy-puts-water-energy-in-focus-what-does-it-say
64. newslaundry — https://www.newslaundry.com/amp/story/2026%2F10%2F01%2Fkarnatakas-new-data-centre-policy-puts-water-energy-in-focus-what-does-it-say
65. medianama — https://www.medianama.com/2026/09/223-karnataka-sustainable-data-centre-policy/
66. vaidicslucknow — https://www.vaidicslucknow.com/current-affair/data-centres-in-karnataka-sustainability-concerns-sustainable-data-centre-policy-2026-31-t/
67. allegianceindia — https://www.allegianceindia.in/products/digital-water-flow-meter-25-mm/5
68. pib — https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2236957&reg=48&lang=2
69. amazonaws — https://indiaai.s3.ap-south-1.amazonaws.com/docs/rfe-for-continous-empanelment.pdf
70. amazonaws — https://indiaai.s3.ap-south-1.amazonaws.com/docs/tendernotice.pdf
71. bank — https://sbi.bank.in/documents/57189647/58231607/Sector+Report+DataCentre.pdf/f1919592-ee66-b50b-ea20-75fbb27c9bb5?t=1779885206866
72. malaymail — https://www.malaymail.com/news/malaysia/2026/01/05/how-johor-vets-data-centres-water-efficiency-utilities-and-location/204328
73. ceew — https://www.ceew.in/publications/how-is-data-centre-infrastructure-in-india-shaping-power-and-water-use
