<!-- Related research from an earlier conversation ("CSTEP_DATA CENTRE"), 2 Oct 2026, that informed the atlas. Kept as written at the time. The atlas standards register (src/data/standards.js) is authoritative where figures differ (for example India grid water 2.9 L/kWh and grid CO₂ 0.675 t/MWh after the October 2026 corrections). -->

# Data Centres, AI, Energy and Water in India: An Evidence Brief on CSTEP's 13 Components, with Inputs for a Site-Planning Dashboard

**Bottom line:** India's data-centre build-out is a power problem first and a water problem second. That order flips at the district level. It also flips once you count the water used to generate grid electricity. Today the sector is roughly 1.25–1.5 GW of IT capacity, heavily clustered in Mumbai, Chennai and NCR. The public evidence is strong on capacity, grid carbon factors, tariffs and policy incentives. It is weak, and in places missing, on facility-level PUE/WUE, water sources and cooling technology. A dashboard should therefore combine regulator-grade inputs (CEA, CGWB, SERC tariff orders, CGWA charges, MoEFCC thermal water norms) with explicitly labelled engineering assumptions for cooling performance.

## TL;DR

- **Scale and location.** India had about 1,250 MW of third-party data-centre capacity in FY2025, per ICRA. ICRA expects 2,400–2,500 MW by FY2028; consultancies project 4–6.5 GW by 2030. Mumbai holds roughly 34–50% of capacity, depending on the source and definition. Around 95% sits in six cities. Data centres use about 0.5% of national electricity (Cornell 2025, cited by CEEW–Systemiq; IEEFA cites Nomura for the same 0.5% estimate, which it says could reach 3% by 2030). Water-use estimates exist but are weak: the widely cited "~150 billion litres/year" traces back to a market-research firm.
- **Energy and water vary with location and cooling.** A median Gemini text prompt uses 0.24 Wh and 0.26 mL of on-site water. India's grid emits 0.710 tCO2/MWh (FY2024-25), and coal plants are allowed to consume up to 3.0–3.5 m³ of water per MWh. As a result, the water and carbon embedded in grid electricity can exceed on-site cooling water several-fold. Cooling choices trade water for electricity, so siting must model both together.
- **Unit economics.** Electricity is roughly 60–70% of operating cost. HT industrial energy charges in major data-centre states run about Rs 6.4–8.1 per kWh/kVAh before demand charges. Mumbai construction costs about US$6.64/W, around Rs 59 crore per MW. IndiaAI subsidised GPUs cost about Rs 65 per GPU-hour. The largest data gaps are facility-level PUE/WUE, water source, substation headroom and land prices. These must be collected directly.

---

## Key Findings

1. **Capacity figures conflict because the definitions differ.** The sources variously measure IT load or installed capacity, third-party colocation or total, and operational or "live". Published figures for 2025 range from 1,250 to 1,600 MW.
2. **Policy is state-led.** India has no notified national data-centre policy. A 2020 draft was never notified, and a 2025 draft circulated for consultation. Fifteen states offer incentives, and only 5 of the 15 state policies include sustainability provisions. Gujarat's 2026–29 policy is the first to *require* renewable energy: at least 51% RE for incentive-eligible projects of 150 MW or more.
3. **No Indian standard requires PUE or WUE disclosure.** Most large operators are privately held, which puts them outside SEBI's BRSR reporting. Where Indian operators do report, the numbers are sparse and often global.
4. **Indirect (grid) water is the largest and least visible part of the footprint.** This holds in the US literature, and the effect is plausibly stronger in India because the grid is coal-heavy.

---

## 1. Where are data centres?

**Plain-language summary.** Operators locate where they can get reliable, large power connections; fibre and subsea-cable access; land; water or a viable dry-cooling option; low climate-hazard risk; nearby users (for latency); and state incentives. In India, subsea cable landings and power reliability explain most of the clustering in Mumbai and Chennai. Policy incentives and power availability are now pulling new capacity toward Hyderabad, NCR (Noida/Greater Noida), Visakhapatnam, Gujarat (Dholera/GIFT City) and Kolkata.

**General / global evidence.**
- The IEA estimates global data-centre electricity use at about 415 TWh in 2024, roughly 1.5% of global electricity. Its Base Case projects about 945 TWh by 2030 and about 1,200 TWh by 2035. Electricity use has grown about 12% per year since 2017. The US and China account for nearly 80% of projected growth.
- The CEEW–Systemiq white paper lists the main siting criteria: 24/7 power, water, connectivity (fibre and subsea landings), climate risk (flood, seismic, heat), utilities and scalability. Its stakeholders rank power economics and grid stability above land costs and fiscal incentives.
- About 43% of global data centres operate in areas of high water stress (S&P Global, cited by CEEW). About 6% sit in zones highly exposed to climate hazards and 16% in moderate-risk zones (XDI, cited by CEEW).

**India-specific evidence.**
- **Capacity.** These estimates are not directly comparable, because each source uses a different definition:
  - ICRA: 1,250 MW operational in FY2025, rising to 2,400–2,500 MW by FY2028, with about Rs 90,000 crore of investment over FY2026–FY2028. Mumbai holds about 50%, and about 95% is in six cities.
  - Savills (via DD News): 1,520 MW IT operational in 2025 (+34% year on year), with Mumbai 34%, Delhi-NCR 20% and Chennai 19%. Absorption was 427 MW. Savills projects more than 4 GW by 2030.
  - Colliers (via Deccan Herald): 1,263 MW as of April 2025, with Mumbai 41%, Chennai 23% and NCR 14%. Colliers projects more than 4,500 MW by 2030.
  - CEEW/Systemiq: about 520 MW in 2020, about 1.5 GW by mid-2025 and 4.5–6.5 GW by 2030. It counts about 271 data centres as of January 2026, about a quarter of them in Mumbai.
- **Pipeline.** The Mumbai pipeline is very large: one secondary source cites 1,543 MW committed and 2,209 MW at an early stage. Chennai has about 191.5 MW live in 2025 and about 1,040 MW in its early-stage pipeline. Kolkata has about 23 MW live.
- **Hyperscale projects announced** (as cited by CEEW):
  - Google: US$15 bn AI data centre in Andhra Pradesh (Visakhapatnam).
  - Meta–Sify: 500 MW.
  - TCS: about US$6.5 bn for a 1 GW network.
  - OpenAI: reportedly planning at least 1 GW (secondary source, unconfirmed).
- **Connectivity.** India has about 17 international subsea cables at 14 landing stations, in Mumbai, Chennai, Kochi, Tuticorin and Thiruvananthapuram (CEEW).
- **National policy status.**
  - The 2020 MeitY draft policy was never notified.
  - Data centres above 5 MW received infrastructure status in 2022, which eases access to long-tenor finance.
  - Union Budget 2026 announced a long-term tax holiday for data-centre and cloud investment, extending to 2047.
  - The 2025 draft National Data Centre Policy (seen by Business Standard; not notified) proposes:
    - up to 20 years of tax exemption, conditional on capacity, PUE and job targets;
    - GST input tax credit on capital assets;
    - permanent-establishment comfort for foreign firms operating or leasing at least 100 MW;
    - state-earmarked land and Data Centre Economic Zones.
- **State policies.**
  - **Gujarat** notified the Viksit Gujarat Data Centre Policy 2026–29 on 7 August 2026:
    - target of 7.5 GW;
    - minimum 150 MW IT load to qualify for incentives;
    - at least 51% renewable/green electricity;
    - 2.5% capital subsidy in Dholera;
    - interest subsidy of up to 4%, capped at Rs 25 crore per year;
    - support for captive desalination.
  - **Maharashtra:** MERC classifies data centres as Industrial for tariff purposes. Data centres meeting 100% of demand from green power get a 10% wheeling discount.
  - **Uttar Pradesh:** UPERC has approved dedicated tariffs for the New Integrated Data Centre Park in Greater Noida.
  - **Other states:** CEEW maps policy levers across AP, Bihar, Chhattisgarh, Gujarat, Haryana, Karnataka, Maharashtra, MP, Odisha, Punjab, Rajasthan, Telangana, Tamil Nadu, UP and West Bengal. It finds that only 5 of these 15 embed sustainability provisions.

**Key numbers**

| Parameter | Value | Year | Source (type) |
|---|---|---|---|
| India operational DC capacity | 1,250 MW → 2,400–2,500 MW (FY28) | FY2025 | ICRA, https://www.icra.in/Rating/DownloadResearchSummaryReport?id=6543 (rating agency, secondary) |
| India operational IT stock | 1,520 MW IT; Mumbai 34%, NCR 20%, Chennai 19% | 2025 | Savills via DD News, https://ddnews.gov.in/en/indias-data-centre-capacity-more-than-doubled-in-2025/ (consultancy) |
| Installed capacity | 1,263 MW; Mumbai 41%, Chennai 23%, NCR 14% | Apr 2025 | Colliers via Deccan Herald, https://www.deccanherald.com/amp/story/business%2Flocal-protests-sink-googles-1-bn-us-data-centre-plan-india-eyes-25-bn-boom-by-2030-3769717 (consultancy) |
| Capacity trajectory | 520 MW (2020) → ~1.5 GW (2025) → 4.5–6.5 GW (2030) | 2026 | CEEW–Systemiq, https://www.ceew.in/sites/default/files/ceew-data-centre-study-web-ready-final.pdf (think-tank, citing consultancies) |
| Number of DCs | ~271 | Jan 2026 | CEEW (from public datacentre map) |
| Global DC electricity | 415 TWh (2024) → 945 TWh (2030) → ~1,200 TWh (2035) | 2025 | IEA, https://www.iea.org/reports/energy-and-ai/executive-summary (primary) |
| Gujarat policy RE requirement | ≥51% RE; ≥150 MW eligibility; 7.5 GW target | Aug 2026 | ANI, https://aninews.in/news/national/general-news/gujarat-notifies-data-center-policy-2026-29-targets-75-gw-green-ai-capacity20260807230226/ (press; obtain the gazette copy) |
| Draft national policy incentives | Up to 20-yr tax exemption; GST ITC; PE for ≥100 MW | Sep 2025 | Business Standard, https://www.business-standard.com/industry/news/govt-20yr-tax-holiday-gst-credit-data-centre-policy-125091400441_1.html (press; draft not public) |

---

## 2. Types of data centres

**Plain-language summary.** The main types are:
- **Hyperscale:** owned by cloud/AI firms; usually 50–200+ MW campuses.
- **Colocation:** space and power leased to many tenants, either retail (racks) or wholesale (MW halls).
- **Enterprise:** an organisation's own facility, often small and less efficient.
- **Edge:** small sites (often under 1–5 MW) placed close to users for low latency.
- **AI/HPC:** very high rack density and usually liquid-cooled.

These size bands are industry convention, not a formal standard. The type matters because it largely determines rack density, cooling design, PUE and water use.

**General / global evidence.**
- The IEA finds that servers account for about 60% of electricity demand in modern data centres, and that the split varies by type. AI servers were about 24% of server electricity and about 15% of total data-centre electricity in 2024.
- Accelerated servers drive almost half of the net growth in consumption to 2030, against about 20% for conventional servers.
- Average rack density has risen from about 1–3 kW in the early 2000s to about 8 kW today (Uptime 2024, cited by CEEW).
- Turner & Townsend reports that advanced AI facilities now run at 100–150 kW per rack, and that AI-ready, liquid-cooled designs raise capital costs by up to 40%.

**India-specific evidence.**
- About a quarter of capacity is dedicated to hyperscalers and about 10% to enterprise users; the rest is mixed-use (Savills, via CEEW).
- The top five operators (STT, NTT, Sify, CtrlS, Nxtra) hold about 66% of operational capacity (JM Financial, via CEEW).
- Colocation services backed by hyperscalers make up 85–90% of revenue for major developers (ICRA).
- Stakeholders expect colocation and hyperscale, rather than edge, to drive growth (CEEW).
- Small operators (under 5 MW) rely mainly on municipal water for cooling (CEEW). This makes them the segment most exposed to urban water competition.

**Key numbers**

| Parameter | Value | Year | Source (type) |
|---|---|---|---|
| Server share of DC electricity | ~60% | 2024 | IEA, https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai (primary) |
| AI share of DC electricity | ~15% (24% of server load) | 2024 | IEA via Scientific American, https://www.scientificamerican.com/article/ai-will-drive-doubling-of-data-center-energy-demand-by-2030/ |
| Average rack density | ~8 kW (from 1–3 kW) | 2024 | Uptime via CEEW (secondary) |
| AI rack density | 100–150 kW/rack | 2025 | Turner & Townsend via Construction Week, https://www.constructionweekonline.in/business/mumbai-second-most-cost-efficient-for-data-centre-construction-worldwide-study |
| India market split | ~25% hyperscale, ~10% enterprise, rest mixed | 2025 | Savills via CEEW |
| Colocation share of revenue | 85–90% | 2025 | ICRA |

---

## 3. Why does AI consume so much computation?

**Plain-language summary.** Bigger models trained on more data need more floating-point operations. That means more GPU-hours and more energy. Training is intense, concentrated and episodic: a single run can draw more than 100 MW for months. Inference is light per query, but it repeats billions of times a day, so it becomes the larger aggregate load as usage grows.

**General / global evidence.**
- **Compute growth.** Training compute for frontier models has grown 4–5× per year since 2010, and about 5× per year for frontier language models since 2020 (Epoch AI). Pre-training compute efficiency is improving about 3× per year.
- **Training cost.** The cost of training frontier models has risen about 3.5× per year since 2020 (Epoch AI).
- **Training power.** Power for frontier training runs grows about 2.2× per year, and runs now exceed 100 MW. Epoch projects 4–16 GW per run by 2030 if trends continue (a projection, not an observation). Epoch also estimates that AI power demand currently splits roughly equally between training, experiments and inference.
- **Measured inference energy (Google, 2025).** The median Gemini Apps text prompt (May 2025) used:
  - 0.24 Wh of energy;
  - 0.03 gCO2e (market-based);
  - 0.26 mL of water (on-site only).
  
  Google reports energy per median prompt fell 33× and carbon 44× over 12 months. A narrower measurement boundary (accelerator only) gives 0.10 Wh, so a full-system boundary is about 2.4× larger. Critics note three limits: the prompt length is not specified, the carbon figure is market-based, and the water figure excludes water used in electricity generation.
- **Other inference figures.**
  - OpenAI's CEO has stated about 0.34 Wh per average ChatGPT query. This is a blog claim and has not been independently verified. It is also an average, while Google's figure is a median, so the two are not comparable.
  - Luccioni, Jernite and Strubell (FAccT 2024) benchmarked 88 models. Per 1,000 inferences: text classification about 0.002 kWh, text generation about 0.047 kWh, image generation about 2.9 kWh. Image generation is more than 1,000× text classification.
- **Projections.** The IEA projects AI-server electricity growing about 30% per year, accounting for almost half the net increase in data-centre demand to 2030.

**India-specific evidence.**
- The IndiaAI Mission was approved in March 2024 with Rs 10,371.92 crore over five years.
- It has onboarded more than 38,000 GPUs, against an initial target of 10,000, at a subsidised rate of about Rs 65 per GPU-hour (PIB).
- In February 2026 the government announced 20,000 more GPUs.
- Press reports suggest:
  - utilisation is lagging;
  - only about Rs 400 crore had been released by mid-2026 (Communications Today; secondary, unverified);
  - provider rates range from Rs 65 to Rs 92 per hour, with H100s at about Rs 92 (secondary).
- The Economic Survey 2025-26 frames India's path as "frugal AI": application-led and resource-efficient (as cited by CEEW).

**Key numbers**

| Parameter | Value | Year | Source (type) |
|---|---|---|---|
| Frontier training compute growth | 4–5×/yr | 2024 | Epoch AI, https://epoch.ai/blog/training-compute-of-frontier-ai-models-grows-by-4-5x-per-year (research org) |
| Frontier training power | >100 MW; growing 2.2×/yr | 2025 | Epoch AI, https://epoch.ai/blog/power-demands-of-frontier-ai-training |
| Median Gemini prompt | 0.24 Wh; 0.03 gCO2e; 0.26 mL | May 2025 | Google, https://arxiv.org/abs/2508.15734 (company technical report) |
| Inference energy by task | 0.002 (classification) to 2.9 (image gen) kWh per 1,000 | 2024 | Luccioni et al., https://arxiv.org/html/2311.16863v3 (peer-reviewed) |
| IndiaAI GPUs and price | 38,000 GPUs; Rs 65/GPU-hr; Rs 10,371.92 cr outlay | 2025 | PIB, https://www.pib.gov.in/PressNoteDetails.aspx?ModuleId=3&NoteId=156786&lang=1&reg=3 (primary) |

---

## 4. Anatomy of data-centre consumption

**Plain-language summary.** Electricity flows to:
- **IT equipment:** GPUs/CPUs, memory, storage and networking. This is the "useful" load.
- **Power conversion and distribution losses:** transformers, UPS and PDUs.
- **Cooling:** chillers, CRAH/CRAC units, pumps, fans and cooling towers.
- **Lighting and auxiliary systems.**
- **Backup generators:** mostly idle, apart from testing.

Water is used for evaporative heat rejection (cooling towers), blowdown, humidification and domestic use.

**General / global evidence.**
- The IEA finds that servers take about 60% of electricity, and servers plus cooling together take about 70%. The split varies widely by facility type.
- The IEA's *Energy and AI* report ("Energy demand from AI" chapter) states that cooling's share of total data-centre consumption ranges from about 7% in efficient hyperscale data centres to over 30% in less-efficient enterprise ones.
- Google states on its data-centre efficiency page that its global fleet's average annual PUE in 2024 was 1.09, meaning about 9% overhead above IT load. Its 2025 Environmental Report describes this as the first time in six years the figure has fallen below 1.10.
- Power-conversion losses (UPS and transformers) are commonly cited as a few percent of IT load. No primary source was retrieved for this, so treat it as an engineering assumption.

**India-specific evidence.**
- Typical Indian facilities report PUEs of about 1.45–1.55 (tele.net; secondary). With PUE = 1.5, about a third of total energy is non-IT overhead.
- CtrlS states a design PUE of 1.35, and Nxtra claims a 10% reduction in average PUE against 2021 (secondary).
- Diesel generator sets remain an "indispensable" design requirement in India for SLA compliance (CEEW stakeholders).

**Key numbers**

| Parameter | Value | Year | Source (type) |
|---|---|---|---|
| Servers' share of electricity | ~60% | 2024 | IEA (primary) |
| Servers + cooling share | ~70% | 2024 | IEA via CEEW |
| Hyperscale fleet PUE (Google) | 1.09 | 2024 | Google, datacenters.google/efficiency (company primary) |
| Typical Indian PUE | ~1.45–1.55 | 2025 | tele.net, https://tele.net.in/telefocus/building-smarter-efficiency-and-sustainability-emerge-as-key-pillars-of-data-centre-expansion-12226383 (press) |

---

## 5. Energy and water baseline (7-day inventory)

**Plain-language summary.** CSTEP's 7-day inventory has ten fields: IT load, total electricity, cooling load, PUE, water withdrawal, water consumption, WUE, peak demand, cooling type and ambient temperature. This matches what international reporting schemes ask for. In India, almost none of it is published facility by facility.

**Standards and methods.**
- **PUE** = total facility energy ÷ IT energy (The Green Grid; codified in ISO/IEC 30134-2).
- **WUE** = annual site water ÷ IT energy, in L/kWh (The Green Grid, since about 2011; ISO/IEC 30134-9).
- **LBNL's 2024 report separates two WUE figures:**
  - site WUE, which is mostly cooling;
  - source WUE, which is the water consumed in generating the electricity.
  
  LBNL says both are needed to capture the "true water cost".
- **EU Delegated Regulation (EU) 2024/1364** (14 March 2024; in force 6 June 2024) applies to operators of data centres with installed IT power demand of at least 500 kW, according to EUR-Lex. The first reports were due by 15 September 2024, and reports are due annually by 15 May after that. The KPIs cover energy, power utilisation, temperature set points, waste heat, water and renewables. Text: https://eur-lex.europa.eu/eli/reg_del/2024/1364/oj.
- **ASHRAE TC9.9** sets the IT inlet temperature and humidity envelopes that determine how many free-cooling hours are possible.

**What operators disclose.**
- Mytton (npj Clean Water, 2021) found that fewer than a third of data-centre operators measure water consumption.
- LBNL says its analysis is limited by the "lack of direct energy data".

**India-specific evidence.**
- There is no binding national PUE or WUE standard (SBI sector report, 2026). The only national guidance is a 2010 BEE compilation of energy-efficiency best practices (CEEW). The 2025 draft policy links incentives to PUE benchmarks, but it is not notified.
- **Disclosures found** (Down To Earth / Earth Journalism Network review of ESG reports, 2025):
  - STT GDC: WUE 0.73 (2024, apparently global and unit-ambiguous); India withdrawal 419,204 kL in 2023 (40% of its global total).
  - Nxtra: 216,357 kL consumed in FY25, including 9,876 kL of groundwater and 191,152 kL from third parties.
  - CtrlS: 409,037 kL in FY24; reports saving 119,662 kL a year by switching from water-cooled to air-cooled systems.
  - Yotta does not publish WUE. AdaniConneX and CtrlS publish no WUE.
- None of these disclosures give IT MWh by site, so a WUE cannot be derived.

**Recommended 7-day inventory template** (for the dashboard's data-collection module): hourly IT kW (UPS output) and facility kW (utility meter), giving daily MWh, PUE and peak MW; sub-metered cooling plant kWh; make-up and blowdown water meters (consumption = make-up − discharge); water source split (municipal, groundwater with CGWA NOC number, tanker, recycled STP water); dry- and wet-bulb temperature; cooling technology and set-points.

**Key numbers**

| Parameter | Value | Year | Source (type) |
|---|---|---|---|
| WUE definition (site and source) | L/kWh IT | 2024 | LBNL, https://eta-publications.lbl.gov/sites/default/files/2024-12/lbnl-2024-united-states-data-center-energy-usage-report_1.pdf (primary) |
| Operators measuring water | <1/3 | 2021 | Mytton, https://davidmytton.blog/data-centre-water-consumption/ (peer-reviewed in npj Clean Water) |
| STT GDC WUE | 0.73 (scope unclear) | 2024 | DTE/EJN, https://earthjournalism.net/stories/what-data-center-giants-arent-saying-about-their-water-use-in-india (press review of ESG reports) |
| Nxtra water consumed | 216,357 kL | FY25 | Nxtra ESG, https://www.nxtra.in/esg-reports/ (company) |

---

## 6. Cooling: the energy–water interface

**Plain-language summary.** The main cooling options and their trade-offs:
- **Air-cooled chillers / DX:** little water, more electricity.
- **Water-cooled chillers with cooling towers:** efficient on electricity, but evaporate water.
- **Direct or indirect evaporative cooling:** very low electricity in dry climates; uses water; struggles in humid heat.
- **Direct-to-chip liquid cooling:** needed above about 50 kW per rack; allows warm-water loops and dry coolers.
- **Immersion cooling:** lowest overhead; still niche.

**General / global evidence.**
- Microsoft's on-site WUE varies with climate, as used in "Making AI Less Thirsty" (Li et al.):
  - Arizona: 2.24 L/kWh (PUE 1.223)
  - Washington: 1.09 L/kWh (PUE 1.156)
  - Virginia: 0.17 L/kWh (PUE 1.144)
- On-site water therefore varies more than 10× with climate even within one operator.
- The IEA estimates that a typical 100 MW hyperscale facility consumes about 2 million litres a day for on-site cooling (cited by CEEW).
- LBNL notes that airside economisers can reduce water use.
- Turner & Townsend reports that 26–50% of projects now include liquid-cooled environments for AI.

**Indicative PUE/WUE by cooling type.** These are engineering ranges, not primary measurements, and need validation:

| Cooling technology | Typical PUE | Typical site WUE (L/kWh) |
|---|---|---|
| Air-cooled chillers | 1.4–1.8 | ~0–0.3 |
| Water-cooled chillers + cooling towers | 1.2–1.5 | 1.0–2.5 |
| Direct/indirect evaporative | 1.1–1.3 | 0.2–2+ (climate-dependent) |
| Direct-to-chip liquid with dry coolers | 1.05–1.2 | ~0–0.5 |
| Immersion | 1.02–1.1 | ~0 |

**India-specific evidence.**
- High ambient temperature and humidity in tropical regions reduce the efficiency of air-cooled systems (CEEW).
- Coastal hyperscale sites in Mumbai and Chennai reportedly use seawater cooling (CEEW). This makes freshwater accounting site-specific.
- Advanced liquid cooling is slowed by cost, supply-chain issues, limited vendors and maintenance complexity (CEEW).
- **Climate fit for the dashboard:**
  - **Hot-humid coast (Mumbai, Chennai, Visakhapatnam, Kolkata):** high wet-bulb temperatures limit evaporative cooling gains. Air-cooled systems and liquid-to-dry-cooler designs pay an energy penalty.
  - **Hot-dry / composite (NCR, Ahmedabad/Dholera, Rajasthan):** evaporative cooling works very well but pulls on stressed groundwater.
  - **Moderate plateau (Bengaluru, Pune, Hyderabad):** the most free-cooling hours, but municipal water is contested.
  
  No published Indian dataset of free-cooling hours by district was found. This is a gap; it can be built from IMD or ERA5 wet-bulb data.

**Key numbers**

| Parameter | Value | Year | Source (type) |
|---|---|---|---|
| WUE by climate (Microsoft) | 0.17–2.24 L/kWh | 2023 | Li et al., https://arxiv.org/abs/2304.03271 (peer-reviewed in CACM 2025) |
| 100 MW hyperscale cooling water | ~2 ML/day | 2025 | IEA via CEEW (primary via think-tank) |
| Liquid-cooling share of new projects | 26–50% | 2025 | Turner & Townsend, https://datastorageasia.com/turner-townsend-report-singapore-no-2-globally-in-data-centre-construction-cost/ |

---

## 7. Water: from "litres used" to "water impact"

**Plain-language summary.**
- **Withdrawal** is the water taken in. **Consumption** is the water evaporated or otherwise not returned. Impact depends on consumption *relative to local availability*.
- **Water balance:** source (municipal, groundwater, tanker or STP-recycled) → data centre → cooling-tower evaporation + blowdown + humidification/domestic use → discharge or reuse.
- Indirect water from power generation must be added on top.

**General / global evidence.**
- The global data-centre industry uses about 560 bn litres a year (IEA, via CEEW).
- **United States (LBNL 2024):**
  - direct water consumption about 66 bn L (2023);
  - indirect water through electricity about 800 bn L, at an average of about 4.52 L/kWh;
  - hyperscale direct use projected at 60–124 bn L by 2028.
  
  The direct and indirect figures come via a secondary summary; verify them in the LBNL PDF.
- **Mytton (2021):** US data centres use about 1.7 bn L/day, against 1,218 bn L/day total US consumption. In some cases 57% of operator water is potable. Electricity generation is the largest contributor to the water footprint.
- **Siddik, Shehabi and Marston (ERL, 2021)** produced the first spatially detailed US carbon, water and water-scarcity footprints. They showed that the same 1 MW facility can have very different scarcity-weighted footprints depending on the subbasin. This is the methodological template for a district-level Indian dashboard.

**India-specific evidence.**
- **Sector-level figures.**
  - India has 18% of the world's population and 4% of its water resources (World Bank, via CEEW).
  - Data centres used about 150 bn litres in 2024 (CEEW, citing **Mordor Intelligence**, a market-research firm). Treat this as weak.
  - The 150 bn L figure is also implausible against capacity: 150 bn L ÷ 365 ≈ 410 ML/day. At the IEA's 2 ML/day per 100 MW, that would imply more than 20 GW of evaporative-cooled capacity. India has about 1.5 GW, so the figure is likely an overestimate or uses a different boundary.
- **Groundwater status (CGWB Dynamic Ground Water Resources 2024; primary):**
  - 751 of 6,746 assessment units are over-exploited (11.1%), 206 critical (3.05%), 711 semi-critical (10.5%) and 127 saline.
  - National stage of extraction is 60.47%.
  - Karnataka: 45 of 237 taluks over-exploited (18.99%).
  - Andhra Pradesh: 9 of 679 mandals over-exploited (1.32%).
  - Rajasthan (2023): 216 of 302 blocks over-exploited.
- **CGWA rules (2020 guidelines, 24 September 2020; primary):**
  - Categories by stage of extraction: Safe <70%, Semi-critical 70–90%, Critical 90–100%, Over-exploited >100%.
  - New industries in over-exploited units generally do not get NOCs, except for drinking/domestic use.
  - Abstraction charges for general industry range from Rs 1–5 per m³ (Safe) to Rs 4–10 per m³ (Critical), depending on volume. Restoration charges in OE units are Rs 6–20 per m³.
  - Water audits are mandatory above 500 m³/day (Safe/Semi-critical) or 200 m³/day (Critical/OE).
  - A June 2021 notice allows annual payment of charges.
- **Industrial and recycled water prices** (relevant to opex and STP-reuse siting):
  - **MIDC industrial water** (2021 rate sheet): Rs 21.50 per m³ (Hinjewadi/Chakan), Rs 22.50 (TTC/Taloja), Rs 38 (Kharadi), Rs 13–19 elsewhere. The sheet is dated; check for later revisions.
  - **Bengaluru:** secondary-treated water for industry Rs 25/kL, against Rs 90/kL for freshwater (CEEW).
  - **Chennai:** CPCL tertiary treatment about Rs 45/kL, against an earlier industrial freshwater tariff of Rs 60/kL (CEEW).
  - Average treated-water tariff across six cities: Rs 51.37/kL (CEEW).
- **Thermal power water norms (MoEFCC, 7 December 2015, amended 28 June 2018):**
  - existing plants: ≤3.5 m³/MWh;
  - plants built after 1 January 2017: ≤3.0 m³/MWh (originally 2.5) plus zero liquid discharge;
  - seawater once-through plants are exempt;
  - flue-gas desulphurisation adds about 0.3 m³/MWh;
  - compliance has been widely reported as poor (Down To Earth).
- **Transparency.** Down To Earth found that Indian operators routinely claim recycled-water use without disclosing how much freshwater they still withdraw.
- **Local context.** The CPHEEO/MoUD Service Level Benchmarking Handbook sets an urban supply benchmark of 135 litres per capita per day. At that rate, a 100 MW evaporative-cooled campus's ~2 ML/day equals the domestic demand of about 15,000 people. CPHEEO recommends 150 lpcd for metropolitan and mega cities; on that basis the equivalent is about 13,300 people.

**Key numbers**

| Parameter | Value | Year | Source (type) |
|---|---|---|---|
| Groundwater OE units | 751/6,746 (11.1%) | 2024 | PIB/CGWB, https://www.pib.gov.in/PressReleasePage.aspx?PRID=2089039 (primary) |
| CGWA abstraction charge (general industry) | Rs 1–10/m³ (by category and volume); OE restoration Rs 6–20/m³ | 2020 | Jal Shakti deck to NGT, https://www.greentribunal.gov.in/sites/default/files/news_updates/MINISTRY%20OF%20JAL%20SHAKTI-Material%20for%20reference%20in%20OA%20No.%20176%20of%202015%20in%20the%20matter%20of%20Shailesh%20Singh%20Vs.%20Hotel%20Holiday%20Regency.pdf (primary) |
| Thermal plant water norm | 3.5 (existing) / 3.0 (post-2017) m³/MWh | 2015/2018 | CEA, https://cea.nic.in/old/reports/cea-jcoal/presentation/Environment%20Norms%20Progress.pdf (primary) |
| MIDC industrial water | Rs 13–38/m³ | 2021 | MIDC, https://www.midcindia.org/wp-content/uploads/2021/11/Water_Rates_Revised.pdf (primary) |
| Global DC water | ~560 bn L/yr | 2025 | IEA via CEEW |
| India DC water | ~150 bn L/yr (weak) | 2024 | Mordor Intelligence via CEEW (market research) |
| Global DCs in high water stress | ~43% | 2025 | S&P Global via CEEW |

---

## 8. Energy–water trade-offs

**Plain-language summary.** Switching from evaporative to air-cooled systems saves on-site water but raises electricity use. On a thermal-heavy grid, extra electricity brings extra *indirect* water. Whether the switch saves water overall depends on the grid's water intensity and the local scarcity weighting.

**General / global evidence.**
- Li et al.'s table shows the trade-off directly:
  - **Virginia:** low on-site WUE (0.17 L/kWh) but grid water intensity of 2.385 L/kWh.
  - **Washington:** on-site WUE 1.09 L/kWh, but grid water intensity of 9.5 L/kWh, because of evaporation from hydropower reservoirs.
  
  Total water per inference ranged from about 11.6 mL in Virginia to about 48.3 mL in Washington.
- Their headline estimate is a 500 mL bottle per roughly 10–50 medium GPT-3 responses, counting on-site plus off-site water. It is widely misquoted as "500 mL per query".
- GPT-3 training directly evaporated about 700,000 L in Microsoft's US data centres (Li et al.).
- Mytton and Siddik et al. both conclude that indirect (generation) water dominates. Lei and Masanet (2022) quantify climate-driven trade-offs in cooling choice. That paper was not retrieved in this session, so verify it before citing numbers.

**India-specific evidence.**
- CEEW stakeholders describe the trade-off directly: air-cooled chillers use little water but more energy, while water-based systems are more energy-efficient but depend on water.
- CtrlS's switch from water-cooled to air-cooled saved about 119,662 kL a year (DTE). The electricity penalty is not disclosed.
- **Illustrative calculation (analyst estimate, not a published figure).** Assume:
  - about 70% of India's generation is fossil, inferred from the CEA grid factor of 0.71 against about 1.0 tCO2/MWh for coal;
  - thermal plants consume about 3.0–3.5 L/kWh under the MoEFCC norms.
  
  Then grid-average indirect water is roughly 2.1–2.5 L per kWh delivered (generation basis, excluding transmission losses). At PUE 1.5, that is about 3.2–3.7 L per IT kWh, which already exceeds the on-site WUE of most cooling-tower designs. Moving a 10 MW IT facility from PUE 1.3 (evaporative) to PUE 1.6 (air-cooled) adds about 26 GWh a year. That means about 55–65 million litres a year of indirect water, more than half of which is consumed in coal-belt basins far from the data centre.

---

## 9. Every TWh is not the same

**Plain-language summary.** The carbon and water cost of a kWh depends on what generates it (coal, gas, nuclear, hydro, solar or wind), when it is drawn (solar hours versus evening peak) and where (which plant responds to marginal demand).

**General / global evidence.**
- **Water per MWh by generation technology** (Macknick et al., NREL TP-6A20-50900, 2011; primary). Once-through cooling withdraws 10–100× more than recirculating systems, but consumes less than half as much. PV and wind consume almost no water.
- **Indicative median consumption factors.** These are recalled from the report tables and should be verified before dashboard use:

| Technology | Median consumption (gal/MWh) | Approx. L/MWh |
|---|---|---|
| Coal, cooling tower | ~687 | ~2,600 |
| Nuclear, cooling tower | ~672 | ~2,540 |
| Gas combined cycle, cooling tower | ~198 | ~750 |
| CSP trough, cooling tower | ~906 | ~3,430 |
| PV and wind | ~0–26 | ~0–100 |

- Google uses market-based emission factors. Critics note that location-based accounting would give much higher per-prompt carbon.
- Some operators have committed to hourly (24/7) carbon-free energy matching, ahead of GHG Protocol revisions (CEEW).

**India-specific evidence.**
- **Grid emission factor (CEA CO2 Baseline Database).**
  - Version 21.0, FY2024-25: weighted average 0.710 tCO2/MWh, calculated as 1,234.19 Mt ÷ 1,739.06 BU.
  - Build margin: 0.512 tCO2/MWh.
  - Trend: 0.727 in FY2023-24 (V20.0), 0.774 in FY2013-14.
  - Combined margin, FY2023-24: 0.757 tCO2/MWh (secondary summary of V20).
  - Some secondary sites quote 0.7117 for V21; this reflects rounding or variant definitions.
  - India now operates a single national grid. Regional factors are historical, so the dashboard should use the national factor and treat state generation mix as a separate layer.
- **Renewable procurement routes:**
  - **Gujarat:** at least 51% RE is mandatory for incentive-eligible data centres.
  - **Maharashtra:** Green Power Tariff of Rs 0.25/kWh, plus a 10% wheeling discount for 100% green data centres.
  - **Uttar Pradesh:** Green Energy Tariff of +Rs 0.34/unit for HV consumers.
  - **RE share:** developers say up to about 80% RE is feasible with diversified solar–wind plus battery storage. They see 100% 24/7 as technically challenging (CEEW).
- **Time-of-day tariffs:**
  - Telangana: +Re 1/unit at peak (6–10 am and 6–10 pm).
  - Tamil Nadu: +25% at peak, −5% at night.
- **Grid constraints.** Discoms worry about stranded capacity when data centres contract full grid capacity but self-supply through open access. Evacuation constraints exist in the main clusters (CEEW).

**Key numbers**

| Parameter | Value | Year | Source (type) |
|---|---|---|---|
| India grid emission factor | 0.710 tCO2/MWh (weighted avg); BM 0.512 | FY2024-25 | CEA V21.0, https://cea.nic.in/wp-content/uploads/baseline/2025/12/User_Guide_V_21.0.pdf (primary) |
| Previous year | 0.727 tCO2/MWh | FY2023-24 | CEA V20.0 (primary) |
| Water factors by technology | see table above | 2011 | NREL, https://docs.nlr.gov/docs/fy11osti/50900.pdf (primary) |
| Gujarat RE floor | 51% | 2026 | Saur Energy, https://www.saurenergy.com/solar-energy-news/gujarat-becomes-first-state-to-make-renewable-power-mandatory-for-ai-data-centers-12246135 (press) |

---

## 10. Unit economics of data centres

**Plain-language summary.**
- **Capital cost** is dominated by electrical (MEP) and cooling plant, plus the building and land. Servers and GPUs are usually the tenant's cost in colocation.
- **Operating cost** is dominated by electricity. In India this matters more than land.

**General / global evidence.**
- **Turner & Townsend 2025–26 index (52 markets):**
  - Silicon Valley US$13.3/W, London US$12.0/W, Frankfurt US$11.6/W, Singapore US$14.53/W.
  - Cost inflation of 5.5% in 2025.
- **Cushman & Wakefield's 2025 APAC guide** assumes colocation rents of US$120 per kW per month for Mumbai and other tier-1 APAC markets.

**India-specific evidence.**
- **Build cost.**
  - Turner & Townsend puts Mumbai at **US$6.64/W**, about Rs 589/W or about Rs 59 crore per MW, ranking 51st of 52 markets (second-cheapest).
  - Cushman & Wakefield's 2026 guide gives US$5.9–9.0 million per MW for India's five major cities, about Rs 56–86 crore (secondary summary).
  - Consultancy blogs give Rs 50–65 crore per MW for Tier III and Rs 70–95 crore per MW for AI-ready liquid-cooled facilities, excluding land (IMARC; weak).
  - ICRA's Rs 90,000 crore for about 1,150–1,250 MW of additions implies about Rs 72–78 crore per MW (analyst calculation, all-in).
- **Opex.** Energy is 60–70% of operating cost (DCD 2025, via CEEW).
- **HT industrial tariffs, FY2025-26** (energy charge; demand charges are extra):

| State | Category | Energy charge | Demand charge | Notes |
|---|---|---|---|---|
| Maharashtra (MSEDCL) | HT-I(A) | Rs 7.48/kVAh + Rs 0.62 wheeling | Rs 555/kVA/month | Data centres classed as Industrial; a June 2025 review order may revise this to ~Rs 8.68 (unverified) |
| Tamil Nadu | HT I-A | Rs 7.50/kWh | Rs 608/kVA/month | Effective July 2025 |
| Telangana | HT-I(A) | Rs 7.65 (11 kV) / 7.15 (33 kV) / 6.65 (132 kV) per kVAh | Rs 500/kVA/month | |
| Karnataka (BESCOM) | HT-2(a) | 660 paise/kWh | Rs 345/kVA/month | Plus surcharges |
| Uttar Pradesh | HV-2 | Rs 7.10 / 6.80 / 6.40 per kVAh, by voltage | | NIDP data-centre park: Rs 6.95–8.00/kVAh (FY27) |
| Gujarat, Andhra Pradesh | | Not retrieved | | |

- **Colocation pricing:**
  - Wholesale: about US$120/kW/month, roughly Rs 10,000 (Cushman & Wakefield assumption).
  - Retail: vendor blogs quote Rs 12,000–25,000 per kW per month and Rs 25,000–60,000 per rack per month (Cyfuture; weak, vendor marketing).
  - Revenue: Rs 10–18 lakh per kW per year (IMARC; weak).
- **Tax and finance.**
  - Infrastructure status since 2022.
  - Budget 2026 tax holiday to 2047.
  - A secondary source describes the Income-tax Act 2025 Schedule IV exemption for foreign companies buying services from notified Indian-owned data centres.
- **Land prices:** no reliable public data was found.

**Key numbers**

| Parameter | Value | Year | Source (type) |
|---|---|---|---|
| Mumbai build cost | US$6.64/W (~Rs 59 cr/MW) | 2025 | Turner & Townsend, https://www.turnerandtownsend.com/insights/data-centre-construction-cost-index-2025-2026/ (consultancy) |
| India build cost range | US$5.9–9.0 M/MW | 2026 | Cushman & Wakefield via https://www.techi.com/data-center-cost-by-country/ (secondary) |
| Mumbai tariff in T&T model | 6.71 US c/kWh | 2025 | Business Standard, https://www.business-standard.com/technology/tech-news/india-among-top-data-centre-markets-mumbai-costs-among-lowest-globally-125111001095_1.html |
| Energy share of opex | 60–70% | 2025 | DCD via CEEW |
| MSEDCL HT-I(A) | Rs 7.48/kVAh + 0.62 wheeling; Rs 555/kVA | FY26 | MERC, https://merc.gov.in/wp-content/uploads/2025/03/Press-Note_MSEDCL-MYT-Order_English.pdf (primary) |
| Telangana HT-I(A) | Rs 6.65–7.65/kVAh; Rs 500/kVA | FY26 | TGERC, https://tgsouthernpower.org/resources/PDF/Tariffs/63tarifffile.pdf (primary) |
| Colocation wholesale rent | ~US$120/kW/month | 2025 | Cushman & Wakefield, https://cushwake.cld.bz/asiapacificdatacentreconstructioncostguide-01-2025-apac-regional-en-content-datacentres (consultancy) |

---

## 11. Unit economics of AI

**Plain-language summary.**
- **Training cost** ≈ GPU-hours × (hardware depreciation + energy × PUE + facility rent).
- **Inference cost** ≈ energy per query × tariff, plus amortised hardware and facility cost, which depend heavily on utilisation.

**General / global evidence.**
- Frontier training costs grow about 3.5× per year (Epoch AI). Current frontier runs cost in the hundreds of millions of dollars, and possibly soon more than US$1 bn (arXiv 2409.13168). These cost projections are speculative.
- Per-inference energy ranges over three orders of magnitude depending on task and model (Luccioni et al.). Measured production values are about 0.24 Wh per median text prompt (Google).

**India-specific estimates (analyst calculations from cited inputs; label them as such in the dashboard):**
- **Per median text prompt** (0.24 Wh):
  - Electricity at Rs 8/kWh ≈ Rs 0.002 per prompt.
  - Location-based CO2 at 0.710 kg/kWh ≈ 0.17 g, about 6× Google's market-based 0.03 g.
  - Indirect water at about 2.1–2.5 L/kWh ≈ 0.5–0.6 mL, roughly double Google's on-site 0.26 mL.
- **Per GPU-hour:**
  - NVIDIA's H100 product page gives a maximum thermal design power of up to 700 W (configurable) for the H100 SXM. The H100 NVL (PCIe) is 350–400 W.
  - At PUE 1.5, an SXM card at full TDP is about 1.05 kWh of facility energy per GPU-hour, costing about Rs 8–9 at Rs 8/kWh.
  - Against the IndiaAI price of Rs 65 per GPU-hour, electricity is only about 13% of the subsidised price. Hardware depreciation dominates AI unit cost; electricity dominates the cost of running the building.

---

## 12. Quantum computing and the future of data centres

**Plain-language summary.** Quantum computers are expected to *complement*, not replace, classical computing, acting as accelerators for specific problems (simulation, optimisation, cryptography) inside hybrid quantum-classical workflows. Their energy profile is dominated by cryogenics and control electronics, not the qubits. Near-term data-centre implications are niche: dedicated rooms with vibration isolation, cryogenic plant and helium supply, co-located with HPC. There is no credible evidence yet that quantum will materially change data-centre energy or water totals before 2035.

**Evidence status.** This session did not retrieve primary sources on quantum energy. Pull directly: NREL's work on quantum data-centre energy; Jaschke and Montangero (2023), "Is quantum computing green?", Quantum Science and Technology; the Quantum Energy Initiative; and LRZ hybrid-integration studies. On India, PIB states that the Cabinet approved the National Quantum Mission on 19 April 2023 at a total cost of Rs 6,003.65 crore for 2023-24 to 2030-31. It targets intermediate-scale quantum computers with 50–1,000 physical qubits within 8 years.

**Dashboard implication.** Treat quantum as a scenario flag, not a demand driver.

---

## 13. Research gaps

**What remains unstudied:**
1. **Integrated, spatial water–energy–compute modelling for India.** No Indian equivalent of Siddik et al. (2021) exists. CEEW explicitly calls for a "data-driven decision-support siting tool" and land–water–energy nexus planning.
2. **Facility-level data.** India has no mandatory PUE/WUE disclosure, and most operators are private and outside BRSR. Independent journalism (DTE) finds recycled-water claims without freshwater totals. CEEW recommends phased disclosure, then enforceable efficiency standards.
3. **Indirect water and carbon of Indian grid power.** This needs plant-level water data. CPCB and SPCB consent conditions exist, but compliance data is sparse.
4. **Demand uncertainty and rebound.** Google's 33× per-prompt efficiency gain sits alongside sharply rising aggregate demand, which is a Jevons-type pattern. The IEA's 2035 range spans 700–1,700 TWh across scenarios.
5. **Methodological boundaries.** Per-query figures differ by more than 100× depending on boundary: on-site versus source water, market-based versus location-based carbon, median versus mean.
6. **Emerging technology.** It is unclear how liquid cooling, BESS-firmed RE and quantum or other new architectures will change future requirements.

**Recommendations for the dashboard:** file RTIs with MeitY, CGWA and SPCBs for data-centre NOCs and consents, which list permitted water volumes; use location-based CEA factors by default, with a market-based toggle; and show on-site and indirect water separately, weighted by CGWB block status.

---

## Consolidated dashboard input table

| Parameter | Value (low / typical / high) | Unit | Year | Source | Confidence |
|---|---|---|---|---|---|
| PUE, air-cooled chillers | 1.4 / 1.6 / 1.8 | ratio | eng. est. | Engineering range; India typical 1.45–1.55 (tele.net) | Low–Med |
| PUE, water-cooled + tower | 1.2 / 1.35 / 1.5 | ratio | eng. est. | Engineering range; CtrlS design 1.35 | Low–Med |
| PUE, direct liquid / immersion | 1.03 / 1.1 / 1.2 | ratio | eng. est. | Engineering range | Low |
| Site WUE, evaporative/tower | 0.2 / 1.1 / 2.2 | L/kWh IT | 2023 | Li et al. (Microsoft 0.17–2.24) | Med |
| Site WUE, air-cooled / DLC | 0 / 0.1 / 0.3 | L/kWh IT | eng. est. | Engineering range | Low |
| 100 MW hyperscale cooling water | ~2 | ML/day | 2025 | IEA via CEEW | Med |
| Water consumption, coal (tower) | ~2,600 (≤3,500 Indian norm) | L/MWh | 2011/2015 | NREL Macknick; MoEFCC norm | Med–High |
| Water consumption, gas CC | ~750 | L/MWh | 2011 | NREL | Med |
| Water consumption, nuclear (tower) | ~2,540 | L/MWh | 2011 | NREL | Med |
| Water consumption, PV/wind | ~0–100 | L/MWh | 2011 | NREL | Med |
| India grid emission factor | 0.710 (BM 0.512) | tCO2/MWh | FY25 | CEA V21.0 | High |
| HT industrial energy charge | 6.40 / 7.2 / 8.10 | Rs/kWh or kVAh | FY26 | MERC, TNERC, TGERC, KERC, UPERC | High (state-specific) |
| HT demand charge | 345 / 500 / 608 | Rs/kVA/month | FY26 | Same | High |
| Capex per MW (ex-land) | 50 / 59 / 86 (AI-ready up to ~95) | Rs crore/MW | 2025–26 | T&T; Cushman & Wakefield; IMARC | Med |
| Wholesale colocation rent | ~10,000 (US$120) | Rs/kW/month | 2025 | Cushman & Wakefield | Med |
| Retail colocation (power) | 12,000–25,000 | Rs/kW/month | 2025 | Vendor blogs | Low |
| GPU-hour price (IndiaAI) | 52 / 65 / 92 | Rs/GPU-hr | 2025–26 | PIB; press | Med–High |
| Groundwater abstraction charge | 1–10 (OE restoration 6–20) | Rs/m³ | 2020 | CGWA | High |
| Industrial water tariff (MIDC) | 13 / 21.5 / 38 | Rs/m³ | 2021 | MIDC | Med (dated) |
| Treated sewage water (industry) | 25 / 45 / 51 | Rs/kL | ~2020–22 | CEEW | Med |
| Thermal plant water norm (benchmark industry) | 3.0–3.5 | m³/MWh | 2015/18 | MoEFCC/CEA | High |
| Urban domestic norm (benchmark) | 135 (150 for metro/mega cities) | L/person/day | — | CPHEEO/MoUD Service Level Benchmarking Handbook | High |
| Land prices in industrial parks | — | Rs/acre | — | Not found | Gap |

## Conflicting or weakly sourced figures

- **India capacity in 2025:** 1,250 MW (ICRA), 1,263 MW (Colliers), 1,520 MW IT (Savills), ~1.5 GW (CEEW) and 1.6 GW (secondary).
- **Mumbai's share:** 34% (Savills), 41% (Colliers), ~50% (ICRA) and ~25% of facility *count* (CEEW).
- **India data-centre water at ~150 bn L/yr:** this comes from Mordor Intelligence, a market-research firm. It is implausible relative to installed MW.
- **India's share of global capacity:** ~3% (ICRA; Turner & Townsend) versus ~1.2% (CEEW citing Savills).
- **Gujarat installed power:** 74 GW (ANI) versus 69 GW including 47 GW RE (policy document via a secondary source).
- **Per-query AI figures:**
  - 0.24 Wh (Google, median) versus 0.34 Wh (OpenAI, mean, unverified).
  - Water: 0.26 mL (on-site only) versus 10–50 mL (on-site plus off-site, GPT-3 era).
- **MSEDCL HT tariff after the June 2025 review:** Rs 7.48 versus ~Rs 8.68/kVAh.
- **WUE units:** STT GDC's 0.73 and Sify's "1" have unclear units and scope.
- **Recalled values to verify before use:** the NREL generation water factors. The IEA cooling-share range, the EU 2024/1364 thresholds, the CPHEEO norm, the National Quantum Mission figures and the H100 TDP have now been confirmed against IEA, EUR-Lex, CPHEEO, PIB and NVIDIA sources respectively.

## Data not publicly available (must be obtained directly)

- **Power network:** substation-level spare capacity and transmission evacuation headroom (STUs/discoms, CEA/CTU connectivity queues); feeder reliability statistics.
- **Connectivity:** fibre routes, dark-fibre availability and latency to cable landing stations (telecom operators, BharatNet).
- **Facility metrics:** facility-level PUE, WUE, water source and cooling type (operators, CGWA NOCs, SPCB consent-to-operate documents via RTI).
- **Land:** land prices and availability in industrial parks (state IDCs such as MIDC, TIDCO, TSIIC, UPSIDA, GIDC; often only on request).
- **Water supply:** municipal and STP treated-water supply commitments and volumes (BWSSB, CMWSSB, HMWSSB, MCGM).
- **Missing tariffs:** the AP and Gujarat HT tariffs and the BESCOM tariff PDF (APERC, GERC and KERC orders).
- **Climate:** district-level wet-bulb and free-cooling hours (build from IMD/ERA5).
- **Operator economics:** actual colocation contract prices and hyperscale lease rates (brokers; ICRA/CRISIL rating rationales; DRHPs of listed operators).

## Sources

1. ceew — https://www.ceew.in/sites/default/files/ceew-data-centre-study-web-ready-final.pdf
2. saurenergy — https://www.saurenergy.com/solar-energy-news/gujarat-becomes-first-state-to-make-renewable-power-mandatory-for-ai-data-centers-12246135
3. wionews — https://www.wionews.com/india-news/data-centres-are-not-optional-so-who-s-responsible-for-the-damage-part-2-1783461918187
4. davidmytton — https://davidmytton.blog/data-centre-water-consumption/
5. iea — https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai
6. iea — https://www.iea.org/reports/energy-and-ai/executive-summary
7. icra — https://www.icra.in/Rating/DownloadResearchSummaryReport?id=6543
8. ddnews — https://ddnews.gov.in/en/indias-data-centre-capacity-more-than-doubled-in-2025/
9. deccanherald — https://www.deccanherald.com/amp/story/business%2Flocal-protests-sink-googles-1-bn-us-data-centre-plan-india-eyes-25-bn-boom-by-2030-3769717
10. tradebrains — https://tradebrains.in/money/indias-data-centre-capacity-grows-5x-in-10-years-check-how-property-prices-have-changed-in-top-cities-like-bengaluru-chennai-hyderabad-12580907
11. hl — http://cdn.hl.com/pdf/2025/real-estate-highlight-data-center-india-edition.pdf
12. indianinfrastructure — https://indianinfrastructure.com/2025/09/15/draft-national-data-centre-policy-offers-20-year-tax-exemption-to-spur-investments/
13. business-standard — https://www.business-standard.com/industry/news/govt-20yr-tax-holiday-gst-credit-data-centre-policy-125091400441_1.html
14. aninews — https://aninews.in/news/national/general-news/gujarat-notifies-data-center-policy-2026-29-targets-75-gw-green-ai-capacity20260807230226/
15. angelone — https://www.angelone.in/news/economy/gujarat-unveils-data-centre-policy-2026-29-with-target-of-6-lakh-crore-investment
16. etvbharat — https://www.etvbharat.com/en/bharat/gujarat-unveils-data-centre-policy-hyperscale-ai-data-centre-enn26070905875
17. sarkaritel — https://www.sarkaritel.com/mahavitaran-consumers-to-get-relief-from-april-1-as-power-tariff-reduced-by-10-pc/
18. powerpeakdigest — https://powerpeakdigest.com/uperc-retains-fy27-power-tariffs-raises-subsidy-and-expands-ev-benefits/
19. aimultiple — https://aimultiple.com/ai-energy-consumption
20. Scientific American — https://www.scientificamerican.com/article/ai-will-drive-doubling-of-data-center-energy-demand-by-2030/
21. constructionweekonline — https://www.constructionweekonline.in/business/mumbai-second-most-cost-efficient-for-data-centre-construction-worldwide-study
22. datastorageasia — https://datastorageasia.com/turner-townsend-report-singapore-no-2-globally-in-data-centre-construction-cost/
23. epoch — https://epoch.ai/trends
24. Substack — https://epochai.substack.com/p/power-demands-of-frontier-ai-training
25. particle — https://particle.news/story/google-details-geminis-perprompt-energy-carbon-and-water-use-as-researchers-question-scope
26. greenly — https://greenly.earth/en-gb/leaf-media/data-stories/ai-efficiency-a-gemini-reality-check-with-greenly
27. medium — https://medium.com/@macplanet2012/how-much-water-does-ai-use-per-prompt-5-drops-or-a-bottle-d38c90f22122
28. moduledge — https://www.moduledge.com/blog/ai-water-usage
29. memeburn — https://memeburn.com/ai-water-consumption-statistics-2026-and-key-findings/
30. arxiv — https://arxiv.org/abs/2508.15734
31. ioplus — https://ioplus.nl/en/posts/google-measures-and-shares-the-environmental-cost-of-ai-prompts
32. arxiv — https://arxiv.org/pdf/2508.15734
33. geekvibesnation — https://geekvibesnation.com/chatgpt-water-usage-ai-data-centers/
34. towardsdatascience — https://towardsdatascience.com/is-googles-reveal-of-geminis-impact-progress-or-greenwashing/
35. arxiv — https://arxiv.org/html/2311.16863v3
36. tiptreesystems — https://lacuna.tiptreesystems.com/work/power-hungry-processing-watts-driving-the-cost-of-ai-deployment/wrk_3c8dd26254f1173b7980ccdf80779e6f
37. brookings — https://www.brookings.edu/articles/global-energy-demands-within-the-ai-regulatory-landscape/
38. pib — https://www.pib.gov.in/PressNoteDetails.aspx?ModuleId=3&NoteId=156786&lang=1&reg=3
39. eetimes — https://www.eetimes.com/india-to-add-20000-gpus-as-ai-mission-2-0-expands-compute-and-chip-push/
40. communicationstoday — https://www.communicationstoday.co.in/38000-gpus-one-big-problem-indias-ai-mission-cant-find-enough-users/
41. techdodo — https://techdodo.in/articles/india-ai-impact-summit-2026-gpu-access-guide
42. epoch — https://epoch.ai/blog/training-compute-of-frontier-ai-models-grows-by-4-5x-per-year
43. tele — https://tele.net.in/telefocus/building-smarter-efficiency-and-sustainability-emerge-as-key-pillars-of-data-centre-expansion-12226383
44. peacefulpeculiar — https://www.peacefulpeculiar.org/uploads/1/5/0/3/150368424/s41545-021-00101-w.pdf
45. virtusdatacentres — https://virtusdatacentres.com/blog/data-centre/data-centre-water-usage-is-attracting-increasing-scrutiny
46. lbl — https://eta-publications.lbl.gov/sites/default/files/2024-12/lbnl-2024-united-states-data-center-energy-usage-report_1.pdf
47. github — https://github.com/davidmytton/paper-data-centre-water-consumption
48. blogspot — https://greenrisks.blogspot.com/2026/04/2024-us-data-center-energy-usage-report.html?m=1
49. tele — https://tele.net.in/smart-energy-management-role-of-technology-and-green-policy-mandates-in-building-sustainable-data-centres/
50. beaconfiling — https://beaconfiling.com/blog/india-data-center-boom-fdi-incentives
51. earthjournalism — https://earthjournalism.net/stories/what-data-center-giants-arent-saying-about-their-water-use-in-india
52. arxiv — https://arxiv.org/pdf/2402.01646
53. escholarship — https://escholarship.org/content/qt32d6m0d1/qt32d6m0d1.pdf
54. rpmwes — https://rpmwes.com/blog/how-much-water-data-center-use/
55. utexas — https://wrp.beg.utexas.edu/episode/increasing-water-consumption-in-data-centers-amplifies-local-water-scarcity
56. semanticscholar — https://www.semanticscholar.org/paper/The-environmental-footprint-of-data-centers-in-the-Siddik-Shehabi/a3e99c61a0e1834d4a20cd7be9e4179bc72d303d
57. ceew — https://www.ceew.in/publications/how-is-data-centre-infrastructure-in-india-shaping-power-and-water-use
58. khanglobalstudies — https://www.khanglobalstudies.com/current-affairs/daily-current-affairs/posts/ground-water-resource-assessment-report-for-2024
59. cgwb — https://cgwb.gov.in/cgwbpnm/public/uploads/documents/17482455401275100516file.pdf
60. cgwb — https://cgwb.gov.in/cgwbpnm/public/uploads/documents/1748236616187388804file.pdf
61. cgwb — https://cgwb.gov.in/cgwbpnm/download/1238
62. greentribunal — https://www.greentribunal.gov.in/sites/default/files/news_updates/MINISTRY%20OF%20JAL%20SHAKTI-Material%20for%20reference%20in%20OA%20No.%20176%20of%202015%20in%20the%20matter%20of%20Shailesh%20Singh%20Vs.%20Hotel%20Holiday%20Regency.pdf
63. iiaonline — https://www.iiaonline.in/Uploads/Notification/Notification-1624510292453.pdf
64. midcindia — https://www.midcindia.org/wp-content/uploads/2021/11/Water_Rates_Revised.pdf
65. ceew — https://www.ceew.in/publications/water-reuse-and-sustainable-financing-for-india-water-crisis
66. powerline — https://powerline.net.in/2026/09/04/water-stress-thermal-power-plants-take-steps-to-optimise-consumption/
67. vindhyabachao — https://vindhyabachao.org/embeds/thermal/Thermal_Plant_Emission_Notification_Dec_2015.pdf
68. cea — https://cea.nic.in/old/reports/cea-jcoal/presentation/Environment%20Norms%20Progress.pdf
69. cag — https://www.cag.org.in/newsletters/public-newsense/water-consumption-data-thermal-power-plants
70. downtoearth — https://www.downtoearth.org.in/water/widespread-non-compliance-as-thermal-power-plants-don-t-meet-water-use-norms-65391
71. kanaky — https://kanaky.xyz/blog/ai-water-consumption/
72. felloai — https://felloai.com/how-much-water-does-chatgpt-use/
73. wiley — https://agupubs.onlinelibrary.wiley.com/doi/10.1029/2025AV002140
74. nlr — https://docs.nlr.gov/docs/fy11osti/50900.pdf
75. researchgate — https://www.researchgate.net/publication/312470509_A_review_of_operational_water_consumption_and_withdrawal_factors_for_electricity_generating_technologies
76. scribd — https://www.scribd.com/document/989264277/CEA-Indian-Grid-Emission-Factor
77. reclimatize — https://reclimatize.in/india-grid-emission-factor-cea-ccts/
78. batchwise — https://batchwise.ai/methodology/cea-grid-emission-factors/all-india/
79. merc — https://merc.gov.in/wp-content/uploads/2025/03/Press-Note_MYT-Order_BEST_English.pdf
80. telangana — https://www.tgerc.telangana.gov.in/file_upload/uploads/Tariff%20Orders/Current%20Year%20Orders/2025/TGERC%20ToD%20Order%202025-26%2015112025.pdf
81. pwrnxt — https://pwrnxt.in/blog/tamil-nadu-ci-tariff-decoded
82. tristarenergy — https://www.tristarenergy.in/blog/tangedco-electricity-tariff-rates-2026
83. realtynmore — https://realtynmore.com/mumbai-worlds-second-cost-effective-region-for-data-centre-construction-in-2025-says-turner-townsend/
84. irei — https://irei.com/news/turner-townsen-releases-data-center-construction-cost-index/
85. cld — https://cushwake.cld.bz/asiapacificdatacentreconstructioncostguide-01-2025-apac-regional-en-content-datacentres
86. ibef — https://www.ibef.org/news/india-among-top-data-centre-markets-mumbai-costs-among-lowest-globally
87. techi — https://www.techi.com/data-center-cost-by-country/
88. imarcengineering — https://www.imarcengineering.com/blog/data-center-development-in-india
89. cyfuture — https://cyfuture.cloud/kb/colocation/colocation-hosting-pricing-across-indian-data-center-providers
90. turnerandtownsend — https://www.turnerandtownsend.com/insights/data-centre-construction-cost-index-2025-2026/
91. business-standard — https://www.business-standard.com/technology/tech-news/india-among-top-data-centre-markets-mumbai-costs-among-lowest-globally-125111001095_1.html
92. arxiv — https://arxiv.org/pdf/2409.13168
