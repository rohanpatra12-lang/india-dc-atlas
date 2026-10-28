<!-- Report 22 of the India Data Centre Atlas research series (How India serves AI demand today, and whether evaporative cooling suits it). Produced with AI-assisted web research, Oct 2026, and kept as written at the time. The atlas standards register (src/data/standards.js) is authoritative where figures differ (for example India grid water 2.9 L/kWh and grid CO₂ 0.675 t/MWh after the October 2026 corrections). -->

# How India Serves AI Demand Today, and Whether Evaporative Cooling Is a Good Way to Cool It

Most AI prompts from Indian users are probably still answered by GPUs outside India, and Indian data centres carry only a small share of the load. Where AI does run in India, cooling towers are a poor answer on water but a modest win on carbon. On India's grid, towers raise total water use per kWh compared with dry or liquid-to-chip systems, and they put that water use in the most stressed city basins. They are defensible only when the make-up water is non-potable, such as treated sewage or seawater.

## TL;DR

- **Where prompts are answered:** No company publishes how many Indian prompts are served from inside India. The disclosures that do exist suggest most consumer prompts are answered abroad.
  - OpenAI offers India *data-at-rest* residency only for enterprise, education and API customers. It lists in-region *inference* only for Europe, the US and the UAE.
  - Meta's first Indian site (168 MW at Jamnagar) is still being built.
  - In-India inference exists mainly as opt-in enterprise options: Google Vertex AI in Mumbai and Delhi, AWS Bedrock's India-geography inference across Mumbai and Hyderabad, and Azure's India regions. It also runs on sovereign and IndiaAI GPU clouds such as Yotta, E2E, Tata Communications and NxtGen.
  - The IndiaAI GPU pool (38,000+ GPUs) is reported to be under-used.
- **Where Indian AI hardware sits and how it is cooled:** Most of it is in existing colocation campuses. They were designed for roughly 5–15 kW per rack and have been partly retrofitted with rear-door heat exchangers or direct-to-chip liquid cooling.
  - The newest Blackwell clusters are liquid-cooled: Yotta, NxtGen, E2E, Sify's DGX-ready halls and Tata Communications' Vayu.
  - The binding limits are power and rack density, more than chips.
- **Verdict on evaporative cooling:** It is "good" only on electricity and carbon. It saves about 0.2 PUE points versus air-cooled chillers, roughly 0.14 tCO₂ per MWh of IT load.
  - On water, a cooling tower uses about 1.8 L/kWh on site to avoid only 0.4–1.0 L/kWh at the power station. Total water rises 9–39% across Indian grid water intensities of 2–5 L/kWh.
  - For GPU racks, warm-water direct-to-chip cooling with dry coolers beats both towers and air-cooled chillers on water *and* carbon.

## Key Findings

1. **India's AI demand is mostly met by imported inference.** India has more than 100 million weekly ChatGPT users, according to Sam Altman as reported by TechCrunch in February 2026. Yet OpenAI's help centre lists India only for storage-at-rest residency. In-region GPU inference is limited to Europe, the US and the UAE.
   - The global cloud providers now offer in-India inference, but only to customers who choose it:
     - **Google:** Vertex AI's generative AI processes requests "within the specific region… where the request is made," with Mumbai (asia-south1) listed. Google has announced that Gemini Flash and Gemini Enterprise can run entirely in India.
     - **AWS:** Bedrock added India-geography inference for OpenAI GPT-5.6 in August 2026 and for Claude models in September 2026. Requests are routed only between Mumbai (ap-south-1) and Hyderabad (ap-south-2).
   - Consumer apps (ChatGPT, Meta AI) give no such guarantee.
2. **Indian-hosted AI is still small and skewed towards training and sovereign work.** The IndiaAI Compute Portal lists more than 38,000 GPUs, mostly H100 and H200. Our atlas estimates that at about 45–57 MW, roughly 2–3% of live IT load.
   - Communications Today reported on 22 July 2026 that the pool "has built far more compute than anyone is using." It said Jio Platforms and CtrlS "have lagged badly on installation timelines, according to government disclosures," and that only about ₹400 crore of the ₹10,371.92 crore outlay had been released.
   - The flagship sovereign model shows how this capacity is used: Sarvam trained its 30B and 105B models on 4,096 H100 SXM GPUs at Yotta.
3. **AI racks mostly sit in retrofitted conventional halls, with a fast shift to liquid cooling for Blackwell.**
   - L&T's Chennai facility, which hosts E2E's B200s, was "initially designed for rack densities of around 12.5 kW" and had to be retrofitted for H100 and H200 GPUs.
   - CtrlS says "traditional colocation is engineered for 5-10 kW per rack" and that air cooling hits "its thermal ceiling around 35 kW per rack."
   - New AI clusters are liquid-cooled: Yotta's 20,736 Blackwell Ultra GPUs in Greater Noida, NxtGen's 4,000+ Blackwell GPUs on Vertiv coolant distribution units, Sify's DGX-ready halls (130 kW per rack, direct-to-chip) and Tata Communications' Vayu direct-to-chip (PUE 1.6 → 1.2).
4. **Evaporative cooling does not pass the total-water test on India's grid.** Under MoEFCC notification S.O. 3305(E) of December 2015, existing cooling-tower thermal plants must keep specific water consumption to a maximum of 3.5 m³/MWh. G.S.R. 593(E) of June 2018 set a 3.0 m³/MWh maximum for plants installed after 1 January 2017, and seawater-cooled plants are exempt. Our atlas uses 2.0–5.0 L/kWh for grid water intensity.
   - Swapping air-cooled chillers for cooling towers saves only about 0.2 × (grid water intensity) of off-site water, but adds about 1.8 L/kWh on site.
   - The break-even grid water intensity is about 9 L/kWh, far above India's.
   - Towers do cut carbon by about 12% at a grid factor of 0.710 tCO₂/MWh. That is the provisional FY2024-25 weighted average in CEA's CO2 Baseline Database v21.0 (December 2025): 1,234.19 Mt of CO₂ over 1,739.06 BU, down from 0.727 in FY2023-24.
5. **Local water stress is the deciding factor for Bengaluru.** Deccan Herald (9 October 2025), citing official state data, put groundwater extraction at 186.7% of recharge in Bengaluru Urban and 147.05% in Bengaluru Rural. BWSSB, the city water board, ordered a 20% cut to bulk users in March 2024. Neither BWSSB nor the state pollution control board (KSPCB) tracks data-centre water separately; the state IT department's informal estimate is about 4,000 KL/day for the state's 32 data centres.
   - Karnataka's Sustainable Data Centre Policy 2026–31, approved in September 2026, rewards treated-water use and low WUE.
   - The direction is clear: towers only on treated water, and dry or liquid-to-chip systems for GPU halls.

## Details

### 1. How AI prompts from India are actually served (2025–2026)

**No public data gives the share of prompts served in India versus abroad.** The table below lists what each provider has disclosed. Our inference follows it.

| Service | What is disclosed about India serving | Implication |
|---|---|---|
| ChatGPT (consumer/Plus) | No India residency for consumers. India is listed only for enterprise/edu/API data *at rest*. Inference residency covers only Europe, the US and the UAE. Requests from India-residency workspaces may still run on GPUs elsewhere; even in inference-residency regions, routing and CPU processing can occur outside the region. | Consumer prompts are almost certainly answered abroad (US and other OpenAI/Azure/Stargate capacity). |
| OpenAI in-country plans | Tata HyperVault: 100 MW first phase, eyeing 1 GW (Feb 2026). TechCrunch says this "will allow OpenAI to run its most advanced models within India." Whether OpenAI is investing or leasing was not disclosed. | Future in-India inference, not shown to be live yet. |
| OpenAI via AWS Bedrock | GPT-5.6 Terra/Luna with an India-geography profile across Mumbai and Hyderabad (Aug 2026). | In-India inference for enterprise customers who choose it. |
| Claude via AWS Bedrock | Claude Opus 5, Sonnet 5 and Haiku 4.5 with an India-geography profile (Sept 2026). Earlier only "global" routing was offered from Mumbai. AWS's own model table still shows some models as global-only in Mumbai. | Enterprise opt-in only. Default global profiles route anywhere. |
| Gemini / Vertex AI | Generative AI processing in Mumbai is listed. GPUs: Mumbai has H100, L4, T4 and H200; Delhi has H200 and RTX PRO 6000. Gemini Flash and Gemini Enterprise processed in India. Global endpoints "don't provide… data residency guarantees." | Enterprise in-India inference exists. Consumer Gemini app serving location is not disclosed. |
| Azure OpenAI | Deployments exist in South India (Chennai). There is a new India South Central region in Hyderabad. Data Zone and Global deployments can process data outside India. | Partial. Depends on deployment type. |
| Meta AI | First India site: Jamnagar, 168 MW, "delivered within two years," cooled with desalinated seawater, serving "Meta's global infrastructure." | Today, served abroad. |
| Sarvam | Trained on 4,096 H100s via Yotta (Navi Mumbai and Greater Noida). Hosted in India. | Served in India. |
| Krutrim | Runs its own cloud in Bengaluru and Hyderabad (about 20 MW, with a 1 GW target by 2028). Halted its chip and model programmes in late 2025 to focus on cloud. | Served in India, small scale. |
| Perplexity, Copilot consumer, Airtel/Jio bundles | No India serving disclosure found. | Assume served abroad unless stated otherwise. |

**Our estimate:** most consumer AI prompts from Indian users, plausibly a large majority, are served from data centres outside India.
- Three facts drive this: the largest consumer apps (ChatGPT, Meta AI, likely the Gemini app) have no India inference guarantee; AI hardware is only about 2–3% of India's live IT load; and the in-India options are enterprise opt-ins.
- This is an inference, not a measured figure.
- For the atlas, the water and carbon of most Indian prompts today largely falls on US or other grids and basins, not on Bengaluru's.

### 2. Where AI capacity sits in India

| Operator / site | Location | GPUs / MW (reported) | Rack density & cooling (reported) |
|---|---|---|---|
| Yotta NM1 | Navi Mumbai | First 4,000+ H100s arrived Mar 2024. Site claims 8,000+ H100s; earlier statements said 16,384. About 50 MW IT. | Third-party listing: max 15 kW per rack, PUE 1.5 (legacy design). CEO (Jan 2024): the traditional building "will not work," so Yotta moved to "liquid cooling and immersion cooling that can handle 40-50 kilowatt per rack." Marketing pages list rear-door units for 50–60 kW and direct-to-chip for up to 80 kW. |
| Yotta D1/D2 | Greater Noida | D1: 28.8–30 MW IT. Plan for 20,736 liquid-cooled Blackwell Ultra GPUs, expected live Aug 2026 (D2, about 60 MW). | D1 listing: "Air & Liquid," PUE 1.4–1.65. Blackwell Ultra hall "advanced liquid-cooling." No kW per rack disclosed. |
| E2E Networks @ L&T Vyoma | Chennai (also Delhi NCR) | 1,024 B200s (Jan 2026; Inc42 later reports 2,000 B200s). About 2,048 H200 + 1,000 H100 across sites (secondary). | Hall designed for about 12.5 kW per rack, retrofitted for H100/H200. B200 cooling method not disclosed. About 14 kW per 8-GPU B200 system (broker estimate). |
| Sify | Navi Mumbai (Rabale), Chennai, Noida | Not disclosed | NVIDIA DGX-Ready liquid-cooling certification: 130 kW per rack (Rabale, 2024). Chennai and Noida stated as up to 200 kW in one release, 130 kW in another. Noida 02: 130 kW per rack, direct-to-chip. |
| Tata Communications Vayu | India | H100, H200, L40S | Direct-to-chip liquid cooling, PUE "1.6 to 1.2." No kW per rack disclosed. |
| CtrlS | Hyderabad, Mumbai, Noida, Bengaluru | IndiaAI provider (installation lagged) | Claims 30–100+ kW, up to 250 kW per rack. Airflow design up to 45 kW. Planned Chandanvelly campus: 135 kW direct-to-chip, 300 kW immersion. Switched from water-cooled to air-cooled. |
| NxtGen | Bengaluru (Bidadi) | 4,000+ Blackwell GPUs; Bidadi can host up to 12,000 GPUs | Dell XE9685L liquid-cooled servers. Vertiv coolant distribution units plus perimeter cooling and heat-rejection units. |
| Krutrim | Bengaluru, Hyderabad | About 20 MW; H100/A100 | Not disclosed |
| Reliance Intelligence / Jio | Jamnagar | GB300 deployment reported, about 120 MW "sovereign AI backbone" (secondary) | Not disclosed |
| Meta (leased from Reliance) | Jamnagar | 168 MW, delivery within about 2 years | Desalinated seawater cooling, renewable power |
| IndiaAI pool (about a dozen providers) | Multiple | 38,000+ GPUs, mostly H100/H200 | Varies by host |
| Google Cloud | Mumbai, Delhi | H100, H200, RTX PRO 6000, L4, T4 (plus TPUs) | Not disclosed for India |
| AWS / Azure | Mumbai, Hyderabad / Pune, Chennai, Hyderabad | Not disclosed | Not disclosed |

**Is inference mostly in retrofitted air halls?**
- For Hopper-generation capacity (H100/H200), largely yes. Indian colocation halls were built for about 5–15 kW per rack. One 8-GPU HGX H100 server draws about 10 kW, so a legacy 12.5–15 kW rack holds only one or two servers before running out of cooling and power. The usual fixes are rear-door heat exchangers, in-row cooling, partial direct-to-chip cooling and leaving floor space empty.
- For Blackwell (B200/GB200/GB300), no. These are being deployed liquid-cooled. Schneider Electric's reference design (press release, 1 October 2025) supports GB300 NVL72 clusters "with a maximum rack density of 142kW," a design maximum rather than a measured draw.
- The SBI Data Centres sector report (April 2026) says air cooling hits limits "particularly beyond 15 kW per rack, leading to early-stage adoption of direct-to-chip." It expects AI-ready racks to exceed 30 kW.
- CBRE South Asia's "Beyond Growth" report (6 October 2026) says India added "approximately 130 MW of new capacity" in H1 2026 and is "on track to reach 2 GW by the end of the year"; Construction World reports 1,789 MW operational at H1 2026.

### 3. Issues and constraints

**Power and density**
- AI racks need 40 to 140+ kW against legacy designs of 5–15 kW. Retrofits are "a power project disguised as a cooling project": new busways, feeds and transformers.
- STL Partners (via secondary reporting) estimates a liquid-cooling retrofit at about $2M per MW, against $11M+ per MW for a new liquid-cooled build.
- SBI puts a conventional air-cooled Tier III build at ₹50–55 crore per MW.
- Grid connection delays, tariffs and renewable-power procurement remain constraints. We did not find new quantitative 2026 India data on connection lead times.

**Cooling and water**
- Indian facilities are estimated at 1.5–2.5 L/kWh WUE (tele.net, 2026), but "no major Indian operator publishes a numeric WUE."
- Down To Earth (Nov 2025) found no published WUE from Nxtra, AdaniConneX or CtrlS. STT (0.73) and NTT (0.72 portfolio, 1.42 at evaporative sites) publish global figures, not Indian ones.
- Reported volumes:

| Operator | Water volume | Year |
|---|---|---|
| Nxtra | 216,357 KL consumption | 2025 |
| CtrlS | 409,037 KL consumption | 2023-24 |
| STT GDC India | 419,204 KL withdrawal | 2023 |
| Sify | 306,916 KL withdrawal | 2024-25 |

- Sify's figure is down from 6.13 million KL the year before, a drop we cannot explain.
- CEEW notes that state data-centre policies have no PUE or WUE standards, and most operators are outside the scope of BRSR, SEBI's mandatory sustainability report for listed companies.

**Bengaluru specifically**
- Groundwater extraction runs at 186.7% of recharge in Bengaluru Urban and 147.05% in Bengaluru Rural (Deccan Herald, 9 October 2025, citing official state data).
- BWSSB imposed a 20% bulk cut in March 2024.
- BWSSB deployed tankers to 448 high-alert pockets this summer, including the eastern corridor where data centres cluster.
- The state IT Minister said in March 2026 that hyperscale data centres "may not be suitable for Bengaluru" because of water.
- Treated wastewater exists at scale: BWSSB cited 1,300 MLD in 2024. The Boson–BWSSB pilot at Kadubeesanahalli supplies 70,000 L/day of tertiary-treated water for cooling towers. Thermal plants within 50 km of Bengaluru already must use treated water.

**Other constraints**
- **Data localisation:** The DPDP Act 2023 and its 2025 rules drive storage-residency demand more than inference demand.
- **Export controls:** The US AI diffusion rule, which would have capped India as a "Tier 2" country, was rescinded in May 2025. Export controls remain a risk to supply.
- **IndiaAI pool:** Reports of under-use, a seven-day lease cap and onerous eligibility rules.
- **Equipment and skills:** Coolant distribution units and cold plates are largely imported (for example from Vertiv and Schneider). Liquid-cooling operations skills are thin.
- **Buildings:** Floor loading for liquid-filled racks and immersion tanks is a constraint in multi-storey Mumbai buildings.

### 4. Is evaporative cooling "good" for AI inference in Indian conventional halls?

**Principle.** Cooling water per kWh is a property of the cooling plant, not the workload. A kWh of GPU inference in a cooling-tower hall evaporates the same water as a kWh of web hosting. AI changes the answer in three ways:
- **Density:** Hot spots in air halls need colder supply air and colder chilled water. That lowers chiller efficiency and cuts the hours when outside air can do the cooling, which raises both PUE and tower evaporation.
- **Liquid cooling:** It allows 30–45 °C warm-water loops. Heat at those temperatures can be rejected by dry coolers for most hours even in Indian climates (engineering estimate; Bengaluru's mild wet-bulb of about 19–20 °C also favours towers, which is why the choice is close there).
- **Utilisation:** Steady GPU load makes annual water use predictable and large.

**Assumptions for the comparison** (estimates unless noted):
- On-site WUE is per kWh of IT energy.
- Off-site water = PUE × grid water intensity.
- CO₂ = PUE × 0.710 t/MWh (CEA FY2024-25, reported).
- Grid water intensities of 2.0 (Karnataka atlas), 3.445 (Li et al., India) and 5.0 L/kWh (India atlas). The 3.0–3.5 m³/MWh thermal-plant norms bracket the middle value.

| Cooling option (Indian climate, annualised) | PUE (est.) | On-site WUE L/kWh IT | Off-site L/MWh IT @2.0 / 3.445 / 5.0 | Total water L/MWh IT @2.0 / 3.445 / 5.0 | tCO₂/MWh IT |
|---|---|---|---|---|---|
| Water-cooled chillers + cooling towers (conventional) | 1.50 | 1.8 (range 1.5–2.5) | 3,000 / 5,168 / 7,500 | **4,800 / 6,968 / 9,300** | 1.07 |
| Air-cooled chillers, no economiser | 1.70 | ~0 | 3,400 / 5,857 / 8,500 | **3,400 / 5,857 / 8,500** | 1.21 |
| Air-cooled chillers + free cooling + adiabatic assist | 1.45 | 0.3 | 2,900 / 4,995 / 7,250 | **3,200 / 5,295 / 7,550** | 1.03 |
| Direct-to-chip (warm water) + dry coolers with adiabatic trim | 1.25 | 0.2 | 2,500 / 4,306 / 6,250 | **2,700 / 4,506 / 6,450** | 0.89 |
| Direct-to-chip + dry coolers only (closed loop) | 1.20 | ~0 | 2,400 / 4,134 / 6,000 | **2,400 / 4,134 / 6,000** | 0.85 |
| Single-phase immersion + dry coolers | 1.10 | ~0 | 2,200 / 3,790 / 5,500 | **2,200 / 3,790 / 5,500** | 0.78 |

**Per-prompt consequences** at 0.3 Wh of IT energy per prompt (estimate).
- On-site mL = 0.3 × WUE.
- Total mL = on-site + 0.3 × PUE × grid water intensity.
- CO₂ uses 0.71 g/Wh.

| Option | On-site mL/prompt | Total mL/prompt @2.0 / 3.445 / 5.0 | g CO₂/prompt |
|---|---|---|---|
| Cooling towers | 0.54 | 1.44 / 2.09 / 2.79 | 0.32 |
| Air-cooled chillers | ~0 | 1.02 / 1.76 / 2.55 | 0.36 |
| Air + adiabatic assist | 0.09 | 0.96 / 1.59 / 2.27 | 0.31 |
| Direct-to-chip + dry coolers with adiabatic trim | 0.06 | 0.81 / 1.35 / 1.94 | 0.27 |
| Direct-to-chip + dry coolers | ~0 | 0.72 / 1.24 / 1.80 | 0.26 |
| Immersion + dry coolers | ~0 | 0.66 / 1.14 / 1.65 | 0.23 |

How these figures compare with published ones:
- **Google (Aug 2025, reported):** a median Gemini Apps prompt uses 0.24 Wh and 0.26 mL. That is on-site water only, at about 1.09 fleet PUE.
- **Li et al., "Making AI Less Thirsty" (reported):** for India they assumed PUE 1.43, zero on-site WUE and 3.445 L/kWh off-site. That gives about 19.7 mL per GPT-3-era request, because of much higher per-request energy.
- **Atlas range:** our 1–3 mL per prompt total sits between these two.

**What the numbers say:**
- **Water:** Towers versus air-cooled chillers trade about 1.8 L/kWh on site for 0.4–1.0 L/kWh avoided off-site. Total water is 41% higher at Karnataka's 2.0 L/kWh, 19% higher at 3.445 and 9% higher at 5.0. The break-even grid water intensity is about WUE ÷ ΔPUE = 1.8 ÷ 0.2 ≈ 9 L/kWh. Towers win on total water only if the alternative is a very inefficient air system with a PUE gap of 0.4 or more.
- **Carbon and electricity:** Towers save about 0.14 tCO₂ per MWh of IT versus plain air-cooled chillers, roughly 12%. This is their real merit on a coal-heavy grid. A good air-cooled plant with free cooling and adiabatic assist matches it.
- **Where the water is lost:** Off-site water is spread across power plants, often outside the city's basin; seawater-cooled coastal plants are exempt from the norms. On-site tower water comes from Cauvery supply, borewells or tankers in a basin where Bengaluru Urban's groundwater extraction is at 186.7% of recharge (Deccan Herald, citing official state data). Water stress is local, so a litre evaporated in Whitefield costs more than a litre at a Raichur thermal plant.
- **AI makes towers in air halls worse, not better:** Partially filled GPU racks in air halls push PUE up through fan energy and colder chilled-water setpoints. Direct-to-chip with warm water cuts both PUE and water, and dominates every row of the table.

**Verdict.** Evaporative cooling in conventional Indian halls serving AI inference is:
- **Acceptable** when the make-up water is tertiary-treated sewage (Bengaluru's STP reuse, Karnataka's Hoskote park with 60 MLD of treated water) or seawater/desalinated water (Jamnagar). It also needs high cycles of concentration, managed blowdown, Legionella control and a WUE of 1.5 L/kWh or less.
- **Not good** when it draws potable municipal water or groundwater in over-exploited areas (Bengaluru, Chennai, Hyderabad, much of Delhi NCR), or relies on tankers in summer. It is also a reliability risk then: summer wet-bulb peaks coincide with supply cuts.
- **Inferior for GPU halls** in all cases, compared with direct-to-chip warm-water loops on dry coolers with adiabatic trim only on peak days.

**Peak-season and water-quality issues (engineering estimates).**
- Indian make-up water is often high in dissolved solids and hardness. That limits cycles of concentration to about 3–5, so 20–33% of make-up becomes blowdown that needs treatment.
- Hot-dry pre-monsoon months (Delhi, Hyderabad) push tower WUE towards 2.5 L/kWh or more, exactly when municipal supply is cut.

## Recommendations

1. **For GPU and AI halls:** Use direct-to-chip liquid cooling with warm-water supply (about 30–40 °C) and dry coolers. Use adiabatic or evaporative trim only on peak days and only on non-potable water. Target PUE of 1.25 or less and WUE of 0.2 L/kWh or less.
2. **For existing conventional halls absorbing inference:** Contain hot spots with rear-door heat exchangers (up to about 50–60 kW, per Yotta). Raise chilled-water setpoints. Convert towers to tertiary-treated sewage make-up. Where water is scarce, add air-cooled chillers with free cooling and adiabatic assist rather than more towers.
3. **Siting:** Put training and batch inference outside water-stressed metros, in coastal or seawater-served and renewable-rich sites such as Jamnagar or Hoskote with treated water. Keep latency-sensitive inference in metros only with dry or liquid-to-chip cooling.
4. **Disclosure for the atlas:** Ask operators for site-level annual WUE, make-up water source split (potable, groundwater, treated, tanker) and PUE. Karnataka's 2026–31 policy already monitors PUE and WUE, reimburses 100% of treated-water charges (capped at ₹8 lakh a year) and reportedly offers up to ₹30 lakh a year for WUE of 0.7–1.3 L/kWh.
5. **Policy:**
   - States (Karnataka, Maharashtra, Tamil Nadu, Telangana, UP) should require non-potable make-up water for towers in stressed districts and mandate WUE reporting.
   - MeitY should consider a WUE ceiling. Johor (Malaysia) uses 1.8 L/kWh alongside a water-availability test, a useful model.
   - Track AI hardware separately in capacity statistics.
6. **Per-prompt framing:** Present total water per prompt (on-site plus off-site) in the atlas, with location attached. Most Indian users' prompts are answered abroad today. That will change as Tata HyperVault, Reliance–Meta and Google–Adani Vizag come online, and the cooling choices made there now will set India's AI water footprint.

## Caveats

- **Prompt share:** The in-India versus abroad split is our estimate. No provider publishes it, and consumer serving locations for the Gemini app, Copilot and Perplexity are undisclosed.
- **Conflicting GPU counts:** Yotta H100 (8,000+ vs 16,384), E2E B200 (1,024 vs 2,000) and Sify rack ratings (130 vs 200 kW) all have inconsistent figures. Several IndiaAI figures (45,000+ GPUs, 93 lakh GPU-hours) come from weaker secondary sites.
- **Rack-density figures:** Most are what operators say they can support, not measured loads in named halls.
- **Cooling table:** PUE and WUE values are engineering estimates for Indian climates, not measured site data. Results are sensitive to the PUE gap between options. If the tower-versus-air gap is 0.35 or more and grid water intensity is near 5 L/kWh, total water roughly breaks even.
- **Literature:** We did not verify specific figures from Mytton, Lei & Masanet, or Karimi et al. in this pass. Li et al. (3.445 L/kWh) and Google's Gemini paper are the anchors used.
- **The 0.3 Wh/prompt assumption:** Treated here as IT energy. If it is total facility energy (as Google's 0.24 Wh is), divide the off-site figures by PUE.
- **Policy details:** Karnataka incentive amounts come from secondary summaries of the approved policy; confirm against the gazetted text.

## Sources

1. businesstoday — https://www.businesstoday.in/magazine/cover-story/story/the-sarvam-moment-how-the-local-ai-start-up-could-reshape-indias-tech-push-520734-2026-03-16
2. avidclan — https://www.avidclan.com/blog/sarvam-ai-sovereign-language-tax/
3. alphasignal — https://alphasignal.ai/news/sarvam-ai-s-indus-wins-maharashtra-putting-sovereign-ai-to-work-for-2-500
4. inc42 — https://inc42.com/features/inside-lt-vyomas-plan-to-build-indias-ai-infrastructure-giant/
5. ctrls — https://www.ctrls.com/blogs-7-questions-choosing-ai-ready-datacenter/
6. tatacommunications — https://www.tatacommunications.com/cloud/cloud-ai
7. sifyinfinitspaces — https://sifyinfinitspaces.com/data-center/noida-data-center/
8. hiranandaniltd — https://hiranandaniltd.com/updates/hiranandani-backed-yotta-data-services-announces-2-billion-nvidia-blackwell-ultra-gpu-supercluster-one-of-asia-s-largest-ai-infrastructure-deployments/
9. analyticsindiamag — https://analyticsindiamag.com/ai-news/nxtgen-plans-4000-nvidia-blackwell-gpu-ai-factory-with-vertiv-infrastructure
10. inkl — https://www.inkl.com/news/karnatakas-new-data-centre-policy-puts-water-energy-in-focus-what-does-it-say
11. arusgrid — https://arusgrid.com/policy/india
12. microsoft — https://learn.microsoft.com/en-us/answers/questions/2238706/request-for-clarification-on-azure-openai-global-s
13. microsoft — https://learn.microsoft.com/en-us/azure/reliability/regions-list
14. TechCrunch — https://techcrunch.com/2026/06/10/meta-signs-first-ai-data-center-deal-in-india-with-reliance/
15. iot-now — https://iot-now.com/2026/06/16/157006-reliance-and-meta-to-develop-ai-enabled-data-centre-in-jamnagar-gujarat/
16. forbesindia — https://www.forbesindia.com/article/take-one-big-story-of-the-day/inside-olas-notsoelectric-ride-with-krutrim-ai/95666/1
17. datacenterdynamics — https://www.datacenterdynamics.com/en/news/indias-krutrim-plans-three-chips-and-1gw-cloud-expansion-from-2026/
18. swadeshiapps — https://swadeshiapps.com/development/krutrim-ai-studio
19. yotta — https://yotta.com/press-releases/yotta-receives-indias-first-ever-consignment-of-nvidia-h100-the-fastest-gpus-in-the-world-at-its-nm1-data-center-park/
20. datacenterdynamics — https://www.datacenterdynamics.com/en/news/yotta-data-services-launches-nvidia-gpu-based-cloud-in-india/
21. shakticloud — https://shakticloud.ai/
22. businesstoday — https://www.businesstoday.in/technology/news/story/how-pm-modis-meeting-with-nvidia-ceo-jensen-huang-helped-yotta-obtain-large-h100-tensor-gpus-order-411604-2024-01-02
23. yotta — https://colocation.yotta.com/blog/role-of-advanced-cooling-technologies-in-modern-data-centers/
24. datacentermap — https://www.datacentermap.com/india/mumbai/yotta-nm1/specs/
25. techtimes — https://www.techtimes.com/articles/327395/20260912/indias-yotta-plans-80000-vera-rubin-gpus-world-leaks-hacked-customer-server.htm
26. ocolo — https://www.ocolo.io/colocation/yotta/d1-greater-noida/
27. digitalterminal — https://digitalterminal.in/tech-companies/yotta-to-deploy-one-of-asias-largest-nvidia-blackwell-ultra-gpu-superclusters-with-20736-gpus-in-india
28. datacenterdynamics — https://www.datacenterdynamics.com/en/news/e2e-networks-acquires-1024-nvidia-b200-gpu-cluster-for-chennai-data-center/
29. intuitionlabs — https://intuitionlabs.ai/articles/nvidia-hgx-data-center-requirements
30. niveshaay — https://niveshaay.com/wp-content/uploads/2026/06/Niveshaay_E2E_Networks.pdf
31. swadeshiapps — https://swadeshiapps.com/development/e2e-cloud
32. gurufocus — https://www.gurufocus.com/news/2832816/sifys-chennai-and-noida-data-center-facilities-achieve-nvidia-dgxready-certification-for-liquid-cooling-sify-stock-news
33. sifytechnologies — https://www.sifytechnologies.com/news/sify-becomes-first-in-india-to-achieve-nvidia-dgx-ready-data-center-certification-for-liquid-cooling-to-enable-breakthrough-ai-performance/
34. Seeking Alpha — https://seekingalpha.com/pr/20110424-sify-announces-pay-per-use-colocation-pricing-at-all-nvidia-certified-ai-ready-hyperscale
35. communicationstoday — https://www.communicationstoday.co.in/38000-gpus-one-big-problem-indias-ai-mission-cant-find-enough-users/
36. ctrls — https://www.ctrls.com/ai-ready-datacenter-infrastructure/
37. ctrls — https://www.ctrls.com/press-release-ctrls-unveils-plans-for-new-datacenter-park-on-a-40-acre-land-parcel-near-hyderabad/
38. dqindia — https://www.dqindia.com/interview/inside-the-shift-to-high-density-ai-ready-data-centres-11099094
39. businessworld — https://www.businessworld.in/article/nxtgen-in-talks-with-four-strategic-investors-for-400-mn-round-plans-second-bluru-data-centre-561899
40. nxtgen — https://nxtgen.com/
41. myaiguide — https://myaiguide.co/tools/ola-krutrim
42. firstreport — https://firstreport.news/business/what-is-reliance-intelligence-ambani-ai-plan/
43. fb — https://about.fb.com/news/2026/06/meta-partners-with-reliance-on-ai-enabled-data-center-in-india/
44. google — https://docs.cloud.google.com/vertex-ai/docs/general/locations
45. bank — https://sbi.bank.in/documents/57189647/58231607/Sector+Report+DataCentre.pdf/f1919592-ee66-b50b-ea20-75fbb27c9bb5?t=1779885206866
46. superkalam — https://superkalam.com/current-affairs/articles/ai-data-centre-cooling-in-india-managing-power-water-and-policy
47. datacenterscope — https://datacenterscope.com/ai-infrastructure/data-center-retrofit-cost/
48. tele — https://tele.net.in/telefocus/building-smarter-efficiency-and-sustainability-emerge-as-key-pillars-of-data-centre-expansion-12226383
49. earthjournalism — https://earthjournalism.net/stories/what-data-center-giants-arent-saying-about-their-water-use-in-india
50. downtoearth — https://www.downtoearth.org.in/science-technology/indias-digital-thirst-what-data-centre-giants-arent-saying-about-their-water-use
51. ceew — https://www.ceew.in/sites/default/files/ceew-data-centre-study-web-ready-final.pdf
52. downtoearth — https://www.downtoearth.org.in/water/india-is-using-water-to-build-the-machines-that-tell-us-we-are-running-out-of-it
53. pressreader — https://www.pressreader.com/india/the-hindu-bangalore-9WW1/20240322/281569475719827
54. newslaundry — https://www.newslaundry.com/2026/04/16/in-bengalurus-water-stressed-areas-sit-most-of-its-data-centres
55. opencity — https://opencity.in/bengaluru-is-extracting-more-groundwater-than-nature-can-replenish/
56. thecsruniverse — https://thecsruniverse.com/articles/boson-whitewater-and-bwssb-launch-pilot-to-supply-70-000-litres-of-recycled-water-daily-in-bengaluru
57. reclimatize — https://reclimatize.in/india-grid-emission-factor-cea-ccts/
58. acm — https://dl.acm.org/doi/10.1145/3724499
59. downtoearth — https://www.downtoearth.org.in/water/widespread-non-compliance-as-thermal-power-plants-don-t-meet-water-use-norms-65391
60. stratobuilds — https://stratobuilds.com/how-much-energy-does-an-ai-prompt-use/
61. arxiv — https://arxiv.org/abs/2508.15734
62. medianama — https://www.medianama.com/2026/09/223-karnataka-sustainable-data-centre-policy/
63. deccanchronicle — https://www.deccanchronicle.com/southern-states/karnataka/karnataka-approves-sustainable-data-centre-policy-20262031-1988661
64. scroll — https://scroll.in/article/1092827/water-energy-use-concerns-grow-with-more-india-data-centres-in-the-pipeline
65. malaymail — https://www.malaymail.com/news/malaysia/2026/01/05/how-johor-vets-data-centres-water-efficiency-utilities-and-location/204328
