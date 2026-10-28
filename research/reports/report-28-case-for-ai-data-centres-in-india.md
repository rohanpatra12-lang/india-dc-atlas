<!-- Report 28 of the India Data Centre Atlas research series (The case for AI data centres in India: need, dividends, counterfactuals). Produced with AI-assisted web research, Oct 2026, and kept as written at the time. The atlas standards register (src/data/standards.js) is authoritative where figures differ (for example India grid water 2.9 L/kWh and grid CO₂ 0.675 t/MWh after the October 2026 corrections). -->

# The Case for AI Data Centres in India: Need, Dividends, Counterfactuals and What Matters (framing chapter, India Data Centre Atlas)

India does need much more AI-capable data-centre capacity. The case rests on three things: the gap between how much India uses digital services and how much compute it hosts, the need to run state and regulated workloads at home, and the price of relying on foreign compute. The case for building *anywhere and at any cost* is much weaker. The public payoff is concentrated in construction, the supply chain and strategic capability, not in permanent jobs. The binding risks are power, water (acute in Bengaluru) and under-utilisation. What decides whether India gains or loses is how and where capacity is built, more than how much.

## TL;DR

- **Need: real, but the headline statistics are softer than they look.** India's live IT capacity is roughly 1.8–1.9 GW. Credible 2030 forecasts range from ~4 GW (Economic Survey 2025–26) to 7–7.5 GW (KPMG) to 12 GW (Wood Mackenzie), and AI is expected to make up the majority of new capacity. The popular claim that India produces "20% of the world's data but hosts 3% of its capacity" is directionally right, but MeitY has told Parliament that global datasets do not support the 20% figure and that the 3% is indicative only.
- **Dividends: large in capital, modest in permanent jobs.** Committed investment exceeds US$120 bn (KPMG, to March 2026), and the construction and equipment value chain could be worth ~US$30 bn by FY30. But permanent staffing is roughly 0.2–2.6 jobs per MW. Andhra Pradesh's own government orders commit 1,250 jobs for a 486 MW campus, against political claims of 188,000 jobs for Google's Vizag hub. The strongest benefits are strategic (sovereign compute, compliance, GCC competitiveness) and system-level (anchor demand for renewables and the grid).
- **Counterfactual and priorities.** If India under-builds, its AI demand is still met, just from Singapore, Johor, the Gulf or the US. That brings latency, compliance and forex costs, plus exposure to export controls. If it over-builds or builds badly, it gets stranded GPUs, grid stress and water conflict. Public compute is already under-used: the Takshashila Institution found the IndiaAI Compute Portal had just 144 users in September 2025, when it offered more than 34,000 GPUs. On the grid side, the Ministry of Power projects 26.3 GW of AI data-centre load by 2031–32. Rank priorities as: firm clean power and time-to-power first; then demand certainty and utilisation; then water-light cooling and siting; then design for 100 kW+ racks.

## Key Findings

1. **Demand is real but forecasts spread three-fold.** For 2030, the estimates are ~4 GW (Economic Survey), 6.5 GW (Rubix), >7 GW (Savills), 7–7.5 GW (KPMG), ~10 GW (Deloitte with NITI Aayog) and 12 GW (Wood Mackenzie). OmniScience Capital's 19–23 GW is an investment-house outlier. AI's share of capacity is expected to reach ~55% by FY30 and ~65% by FY35 (KPMG). Wood Mackenzie sees AI-dedicated capacity rising from 275 MW to 6,546 MW.
2. **The power system is moving faster than the IT forecasts.** In a written reply to the Rajya Sabha, Minister of State for Power Shripad Naik said that "an additional load of 26.3 GW from artificial intelligence (AI) data centres is projected by 2031-32". The figure is a Central Electricity Authority projection, as of 14 May 2026, covering 11 major states, and it nearly doubles the ministry's March estimate of 13.56 GW. According to the same reply, about 17 GW of that load has already lodged connectivity applications with State Transmission Utilities, and 9.3 GW has not. Not all of this will materialise. But it means grid planning, not land or capital, is now the gating factor, a conclusion Wood Mackenzie also reaches.
3. **Sovereignty is the strongest non-commercial argument, and it is about compute, not storage.** In 2025 the US AI Diffusion Rule would have placed India in "Tier 2", with caps on GPU imports. It was rescinded on 13 May 2025, before it took effect, but the underlying chip controls (ECCN 3A090) remain. Access now depends on bilateral arrangements. Domestic capacity is a hedge against that exposure, but it does not remove it, because the GPUs themselves are still imported.
4. **The jobs case is the most over-claimed.** Independent evidence from the US and UK puts permanent operational jobs at roughly 0.15–2 per MW. Indian government orders imply 1.2–2.6 per MW. Political and property-industry claims run from 20 to 188 jobs per MW.
5. **International hosts have moved from courting data centres to conditioning them.** Ireland (22% of metered electricity in 2024), Singapore (2019–22 moratorium, then PUE ≤1.25 tenders), Johor (water tariff, reclaimed-water mandate, pause on water-cooled projects) and Virginia (US$928.6 m sales-tax exemption in FY23) all show the same pattern: investment is welcomed, but on terms that protect households and the grid. India, and Karnataka in particular, is at the start of that curve.
6. **Bengaluru is the hardest test case.** It has ~31 of Karnataka's 32 private data centres, mostly in water-stressed eastern and south-eastern corridors. WELL Labs hydrologist Shashank Palur estimates that Bengaluru's data centres use about 20 million litres a day, assuming about 26 million litres per MW per year (Newslaundry, April 2026). In Devanahalli, groundwater extraction stands at 169% of the permissible limit, the highest in Bengaluru Rural district, according to the Report on Dynamic Ground Water Resources of Karnataka 2024 from the Karnataka Ground Water Department and the Central Ground Water Board. Karnataka's 2026–31 policy is right to tie incentives to PUE and WUE and to map resources. Its treated-water incentive (capped at ₹8 lakh a year) is too small to change cooling choices.

## 1. The need for AI data centres in India

### 1.1 The structural gap

| Indicator | Value | Source / quality |
|---|---|---|
| Live IT capacity | ~1.79 GW (H1 2026); ~1.8 GW (Savills, H1 2026); ~1.9 GW FY26 (KPMG) | Industry trackers; consistent with each other |
| Capacity added in 2025 | 387 MW, +103% y/y | Rubix Data Sciences |
| Share of global data | "~20%" | Widely cited (KPMG, Economic Survey, ORF). **MeitY told Parliament's External Affairs committee that standard global datasets do not support the 20% figure** |
| Share of global capacity | 2–3% (KPMG); "about 3% by count" vs 73% in high-income countries (Economic Survey) | MeitY calls 3% "indicative rather than precise" and says it **does not officially maintain data-centre capacity data** |
| Global capacity | 90–100 GW (KPMG FY26); "almost 100 GW" (IEA) | Good |
| Per-capita capacity (atlas estimate) | India ≈1.2–1.3 W per person (1.8 GW ÷ ~1.45 bn); US ≈50 W per person (Yotta CEO's figure of ~17 GW ÷ ~350 m); Singapore ≈230 W per person (1.4 GW ÷ ~6 m) | Own arithmetic on cited figures. The US figure is an industry quote, and other US estimates are higher. Treat as order-of-magnitude only |

**Interpretation.** The gap of 40× or more in per-capita capacity is the most robust form of the "under-served" argument, more robust than the 20%/3% slogan. Even so, per-capita comparisons overstate the need. Much of the US and Singapore capacity serves the world, and India's demand includes very low-value-per-byte traffic (video, social media) that does not require local AI compute.

### 1.2 Demand drivers

- **Consumer AI.** India is among the largest user bases for global chatbots. In a Times of India column in February 2026, OpenAI CEO Sam Altman said India has 100 million weekly active ChatGPT users across free and paid tiers, making it ChatGPT's second-largest market after the US. Most of these prompts are served from data centres abroad. In late 2025, ChatGPT, Google and Perplexity offered free tiers to millions of Indian users (CNBC), which raises demand for inference but not yet local hosting.
- **Enterprise AI and cloud.** KPMG puts India's AI market at US$18–20 bn by 2027 and the cloud market at ~US$70 bn by 2032 (20%+ CAGR). It estimates AI workloads need 400–600 MW of incremental capacity by 2027. These are consultancy projections, not measured demand.
- **GCCs.** India hosts 2,117 global capability centres (3,728 units) employing 2.36 m people, with US$98.4 bn in revenue in FY26 (Nasscom–Zinnov). More than 1,200 GCCs have embedded AI/ML capabilities. Bengaluru holds 900+ GCC units, 34–39% of the national market. These are the most bankable source of enterprise AI workloads, because their parent firms already buy hyperscale cloud.
- **DPI and AI on DPI.** UPI handles over 630 m transactions a day (PIB, cited by KPMG), and Aadhaar, DigiLocker, ONDC and Bhashini all sit on domestic infrastructure. Microsoft's US$17.5 bn pledge explicitly includes AI upgrades to e-Shram and the National Career Service. The government frames this as moving "from digital public infrastructure to AI public infrastructure".
- **IndiaAI Mission.** The mission has an outlay of ₹10,371.92 crore. More than 38,000 GPUs have been onboarded at subsidised rates of ~₹65–67 per GPU-hour, against an original target of 10,000. Foundation-model grants have gone to Sarvam, Soket, Gnani and Gan, among others. The government announced 20,000+ more GPUs at the February 2026 AI Impact Summit and is targeting ~100,000.
- **Data localisation.**
  - RBI's 2018 payment-data mandate is a hard localisation driver. So are sectoral rules from SEBI and IRDAI and the requirement for MeitY-empanelled government cloud.
  - **Caveat:** KPMG states that the DPDP Act "mandates onshore storage for personal data" and adds 1,800–2,000 MW of demand by 2027. That overstates the law. DPDP restricts cross-border transfer by notified negative list, not by a blanket localisation rule. Treat the DPDP-driven MW figure as industry advocacy.
- **Latency.** KPMG's design benchmarks are <5 ms intra-city, <30 ms national and <50 ms India–Singapore round trip. Chat-style inference tolerates 50–150 ms. Real-time voice, fraud scoring, trading and agentic workflows do not. Latency is therefore a real but *segment-specific* driver. It argues for distributed inference capacity in India, not for siting every training cluster there.
- **Sovereignty and export controls.** See Finding 3. India was in Tier 2 of the rescinded Diffusion Rule, alongside Singapore, the UAE and Saudi Arabia, with a no-licence threshold of roughly 1,700 H100-class chips. Its access is now negotiated bilaterally. Strategic autonomy in compute is therefore a live policy concern, not a hypothetical one.

### 1.3 Forecasts compared

| Source (type) | 2030 capacity | AI share / notes |
|---|---|---|
| Economic Survey 2025–26 (Govt) | ~4 GW | Flags power, water, GPU and finance constraints |
| Rubix Data Sciences (research firm) | 6.5 GW | From 1.5 GW in 2025 |
| Savills (real-estate industry) | >7 GW | |
| KPMG India, Jul 2026 (consultancy) | 7.0–7.5 GW (FY30); 16–18 GW (FY35) | AI ~55% FY30, ~65% FY35; market US$1.7 bn to US$6.8 bn |
| Parliamentary committee (citing estimates) | >8 GW | |
| Deloitte with NITI Aayog | ~10 GW | DC power 2.5–3% of national demand by 2030; +40–45 TWh |
| Wood Mackenzie (energy consultancy) | 12 GW | AI 275 MW to 6,546 MW |
| OmniScience Capital (investment firm) | 19–23 GW | Advocacy; ~150–170 TWh; US$350–435 bn capex |
| MoP / CEA (Govt, power side) | 26.3 GW additional AI DC load by FY32 | Grid-planning number (facility power, not IT load); 17 GW already filed |

**Reading the spread.** The low-end government figure (4 GW) and the power ministry's grid figure (26.3 GW) come from the same government and differ by more than 6×. Part of the gap is definitional: IT load versus facility load, and installed versus applied-for capacity. Part is speculative connection queuing. For atlas purposes, use KPMG's ~7–7.5 GW as a central case, the Economic Survey as a downside and Wood Mackenzie as an upside. Treat the 26.3 GW as a grid-stress scenario, not as a demand forecast.

## 2. Dividends of data centres

### 2.1 Dividends table

| Dividend | Quantified estimate | Who claims it | Evidence quality |
|---|---|---|---|
| **Investment** | >US$120 bn committed to Mar 2026: hyperscalers US$50–55 bn; Indian conglomerates US$40–50 bn; global DC operators US$19–20 bn; Indian operators US$10–11 bn. Headline pledges: Microsoft US$17.5 bn (2026–29), Google US$15 bn (Vizag, ~1 GW), Amazon >US$35 bn by 2030 | KPMG; company announcements | Medium. Pledges are not capex. Amazon's US$35 bn covers *all* India businesses (retail, logistics, AWS), not just data centres |
| **Construction / supply chain** | Construction value chain ~US$30 bn by FY30 and ~US$90 bn by FY35: cooling ~US$24 bn, design and construction ~US$27 bn, in-DC power ~US$18 bn | KPMG | Medium (consultancy model). Localisation is high for civil works, transformers and fibre; **liquid cooling is "almost entirely imported"** and BESS is highly import-dependent |
| **Permanent jobs** | 0.15–0.35 FTE per MW in operations (Hamm Institute, US); ~1.12 per MW in Virginia (Food & Water Watch); 0.56 per MW for a 720 MW UK campus; AP orders imply 1.2–2.6 per MW | Independent and government | **High confidence that permanent jobs are few** |
| **Construction jobs** | 2.5–3.6 workers per MW at peak (US projects); Google says a typical campus employs ~4,200 construction workers a year for 3–5 years | Hamm; Google | Medium. Real but temporary |
| **GDP (sector)** | Virginia: 74,000 jobs, US$5.5 bn labour income, US$9.1 bn GDP a year (~1% of state), **80% of it from construction** | JLARC (Virginia legislature) | High (best independent study). No Indian equivalent exists |
| **GDP (AI adoption)** | US$500–600 bn added to GDP by 2035 (manufacturing US$85–100 bn; financial services US$50–55 bn). The NITI CEO separately claimed "at least US$2 trillion" | NITI Aayog roadmap | Low to medium. Scenario modelling; attributes to AI *adoption*, not to data centres; the CEO's figure is inconsistent with the report |
| **Tax / state revenue** | Virginia localities: DC revenue from <1% to 31% of local revenue; but the state's sales-tax exemption cost US$928.6 m in FY23 and ~US$1 bn in FY24 | JLARC | High. In India, the Budget 2026 tax holiday to 2047 for foreign cloud firms and state subsidies shrink the fiscal dividend |
| **Startup / research access** | IndiaAI GPUs at ~₹65–67 per GPU-hour with up to 40% subsidy (~US$0.8/hr per KPMG) | Govt | Medium. Price is real; take-up is weak (see §3.2) |
| **Strategic** | Sovereign model training (Sarvam, BharatGen), government AI, compliance-ready hosting for BFSI and GCCs | Govt; industry | Qualitative; strong logic |
| **Energy system** | Data-centre operators hold 3+ GW of RE PPAs (~15% of announced RE PPAs) and account for 13.6% of open-access demand; developers often fund substation and feeder upgrades (~US$12 bn of "outside-DC" power infrastructure by FY35) | KPMG; CB Insights summary | Medium. Anchor demand is real; whether it adds clean energy or crowds out other users depends on rules (see Ireland) |
| **Heat / water reuse** | Heat reuse is marginal in India's climate. Treated-wastewater markets are a genuine opportunity (Johor now requires reclaimed water) | International cases | Low (India). Opportunity rather than evidence |

### 2.2 The jobs debate in India: claims versus commitments

| Claim | Implied jobs per MW | Nature |
|---|---|---|
| AP government order, 486 MW Vizag campus: "employment commitment of 1250 jobs, within a timeline of 10 years" | ~2.6 | Binding commitment (strongest evidence) |
| Sify / Meta Vizag, 500 MW: ~600 jobs | ~1.2 | Government approval |
| Google on its own projects: "hundreds of specialist on-site jobs" once operational | <1 | Company |
| TCS HyperVault, 1 GW Telangana: ~7,000 direct and indirect | ~7 | Company / state |
| UP Data Centre Policy 2026: 50,000 direct and indirect for 2 GW | ~25 | State advocacy |
| Union Minister Jitendra Singh: ~1 lakh (100,000) engineering jobs from 1.5 GW to 6.5 GW | ~20 | Government advocacy |
| Square Yards: 4.33 lakh (433,000) "ecosystem" jobs from a 9,030 MW pipeline | ~48 | Property-industry advocacy (it concedes direct jobs are "lean") |
| AP government on the Google–Adani Vizag hub: 188,000 direct and indirect | ~188 | Political claim, no method; Minister Lokesh has also cited "five lakh" (500,000) |

**Takeaway.** The headline Vizag figure is 70–150× what the same state's own government orders imply for comparable campuses. For atlas readers, the honest framing is this: data centres create a construction boom and a modest number of skilled permanent jobs. Their employment case rests on what they *enable* (GCCs, AI services, the supply chain), not on on-site headcount. Incentive packages should be judged per permanent job. In the 486 MW AP order, that works out to roughly ₹47 crore of investment per committed job, alongside a capital subsidy capped at ₹1,800 crore and power discounts capped at ₹4,800 crore.

### 2.3 Do host communities benefit? International evidence

- **Virginia.** JLARC finds real benefits, mostly during construction, plus large local property-tax receipts. Against that sit the state's largest tax exemption by far, grid-overbuild risk that could be stranded on ratepayers, and typical residential bills potentially rising by US$14–37 a month by 2040 if demand is met unconstrained.
- **Ireland.** Data centres used 22% of metered electricity in 2024 (6,969 GWh), up from 5% in 2015 (CSO). That is more than all urban households combined, and EirGrid's median scenario reaches 31% by 2034. Dublin had a de facto connection moratorium from 2022. The CRU's December 2025 decision now requires new data centres to bring generation or storage matching their demand.
- **Singapore.** A moratorium from 2019 to 2022 was followed by a 2023 pilot round of just 80 MW. The May 2024 Green DC Roadmap released ≥300 MW and set a PUE target of ≤1.3. In August 2026, 200 MW was awarded to four operators (50 MW each, Jurong Island), conditional on PUE ≤1.25 and ≥50% green energy. A Digital Infrastructure Bill (first reading 8 September 2026) would license every facility of 3 MW or more.
- **Johor.** Capacity went from 10 MW in early 2021 to 5.7 GW planned. The state now charges a data-centre water tariff of RM5.33/m³ (from August 2025). Since November 2025 it has halted Tier 1/2 approvals, mandated reclaimed water and asked operators to defer water-cooled expansions until around mid-2027. It applies a WUE threshold of 1.4 and rejects nearly 30% of applications. Actual power draw was ~55% of approved capacity in 2025, prompting a rule that operators must use 85% of booked power.
- **Lesson for India.** The benefits are real but front-loaded and diffuse. The costs (grid, water, tariffs) are local and long-lived. Social licence depends on making data centres pay for, and bring, their own resources.

## 3. What happens if data centres are not built: the counterfactual

### 3.1 Under-build risks

1. **Workloads go abroad, not away.** Indian AI demand would be served from Singapore, Johor, the Gulf and the US. Singapore is already capacity-rationed, so Johor and the Gulf would be the marginal beneficiaries. KPMG's cost data suggest India is structurally cheaper to build in: Mumbai ranks second globally for construction cost efficiency, and Singapore and Tokyo cost nearly double. So the loss would be a policy and power failure, not a market verdict.
2. **Latency and compliance.** Real-time and regulated workloads (payments, BFSI fraud scoring, health records, government AI) either cannot move offshore or face legal friction. Under-building pushes these onto smaller, less efficient enterprise facilities.
3. **Forex and value capture.** India would pay for cloud and AI services as imports and lose the domestic share of the value chain (~US$30 bn of construction spend to FY30). It would also lose the Budget 2026 strategy of exporting cloud services from Indian data centres.
4. **Export-control and dependency risk.** Without domestic GPU clusters, sovereign model training (Sarvam, BharatGen) and government AI depend on foreign capacity that can be repriced, rationed or controlled.
5. **GCC competitiveness.** India's 2,117 GCCs are moving from delivery work to AI ownership. Lack of nearby compliant AI capacity weakens Bengaluru's and Hyderabad's pitch relative to hubs with local GPU access.
6. **Environmental leakage.** Not building does not remove AI's footprint. It shifts it to other grids, which may be dirtier or more water-stressed: Malaysia's grid emits ~0.74 kgCO₂/kWh, and Johor is water-constrained. The global environmental gain from India abstaining is close to zero. The local gain is real only if India's own build would have been badly sited.

### 3.2 Over-build and bad-build risks

1. **Under-used public compute.** IndiaAI has "built far more compute than anyone is using" (Communications Today, July 2026). The Takshashila Institution's report "Building India's Data Centres" (October 2025) found the Compute Portal "severely underutilised, with just 144 users as of September 2025", when it offered more than 34,000 GPUs. Reported causes include portal friction, seven-day lease caps for fine-tuning and eligibility hurdles. GPUs depreciate over 3–5 years whether or not they are used.
2. **Speculative grid queues.** Of the 26.3 GW of projected AI data-centre load, 9.3 GW has not yet applied for connection. Malaysia's experience (actual draw ~55% of approved capacity) shows how booked-but-unused capacity distorts grid planning and can push costs onto other consumers.
3. **Technology obsolescence.** Only 25–30% of India's existing capacity can be upgraded to AI standards (KPMG). Facilities built today for 20–40 kW racks may be stranded as Blackwell, Vera Rubin and Kyber-class systems push rack densities past 100 kW and toward the megawatt scale.
4. **Bubble dynamics.** Cushman & Wakefield (an industry source) argues that power shortages make an infrastructure bubble unlikely. But in a Reuters interview in December 2025, Sharad Agarwal, CEO of the Indian operator Sify Infinit Spaces, said AI is not a technology bubble while warning that "herd mentality could spur overbuilding and create a capacity glut". An academic review (arXiv, 2026) compares the risk to the early-2000s telecom fibre overbuild: useful assets, wrong capital structure and timing.
5. **Resource conflict.** India's data centres are estimated to use ~150 bn litres of water in 2025, rising to ~358 bn by 2030 (Mordor Intelligence, a market-research estimate widely recycled in media). Building in already-stressed aquifers converts a national benefit into a local cost, which is exactly the trigger for the Johor and Dublin interventions.

**Net judgement.** The asymmetry favours building, but in a disciplined way. Under-building costs India strategic capability and value capture that are hard to recover. Over-building costs mostly fall on investors, except where grid, water or subsidy costs are socialised. Policy should therefore leave the speculative capital risk with developers while protecting ratepayers and water users.

## 4. What matters, and why: a prioritised framework for India

| Rank | Factor | Why it matters in India | Evidence |
|---|---|---|---|
| 1 | **Firm, clean power and time-to-power** | Power is now the binding constraint, ahead of land and capital. AI racks need round-the-clock (RTC) supply, and AI training loads swing, threatening grid stability (Economic Survey). Connection queues already total 17 GW | MoP / CEA; Wood Mackenzie; Economic Survey |
| 2 | **Demand certainty and utilisation** | GPU assets depreciate fast. Anchor tenants (hyperscalers, GCCs, IndiaAI) and pre-leasing determine viability. IndiaAI under-use is a warning | KPMG; Communications Today; Malaysia's 85% rule |
| 3 | **Water and cooling choice** | ~75% of Indian data centres sit in water-stressed regions. Evaporative cooling uses ~25–26 million litres per MW per year (Karnataka IT Minister; WELL Labs). Dry and liquid cooling cut water use but raise energy use in hot climates | CEEW; DTE; Planet Tracker |
| 4 | **Design for future density** | Liquid cooling is now essential for GPUs. Floor loading >2,000 kg/m², 7 m slab-to-slab heights and 30–150 kW racks are needed (KPMG), with headroom for Rubin/Kyber | KPMG |
| 5 | **Capital cost and financing structure** | ~US$1 bn per 150 MW (TCS estimate via Breakingviews), excluding GPUs. Cost of capital and GPU depreciation dominate returns | Reuters Breakingviews; arXiv |
| 6 | **Supply chain and GPU access** | Transformer shortages are a key timeline risk. Liquid cooling, chillers and BESS are import-dependent. GPU supply is subject to US policy | KPMG; BIS rescission coverage |
| 7 | **Location, connectivity and hazard** | India has 14 cable landing stations at 5 locations (~1% of the global total). Coastal hubs (Mumbai, Chennai, Vizag) need flood and cyclone design; inland hubs need heat and water resilience | KPMG |
| 8 | **Policy and regulation** | State incentives, open access and ISTS waivers, the Budget 2026 tax holiday (to 2047) and 15% safe harbour, and DPDP clarity all shape where capacity goes | PIB; state policies |
| 9 | **Disclosure and social licence** | No major state policy has required centralised water disclosure (DTE). Johor and Ireland show that opposition follows opacity | DTE; Johor; Ireland |
| 10 | **Talent** | Cost-advantaged (software engineer ~US$20k a year), but AI-data-centre design depth is thin. Design is dominated by international firms (KPMG) | KPMG |
| 11 | **Security and resilience** | Tier III/IV design, ISO 27001/22301 and cyber-physical integration are table stakes for BFSI and government workloads | KPMG |

### 4.1 Bengaluru-specific notes

- **Water is the first constraint in Bengaluru, not power.** Karnataka has 32 private data centres, 31 of them in Bengaluru, concentrated in the water-stressed east and south-east. WELL Labs hydrologist Shashank Palur estimates that the city's data centres use about 20 million litres a day, assuming about 26 million litres per MW per year (Newslaundry, April 2026). That is equivalent to drinking water for ~1.3 lakh (130,000) people. If the state's 1 GW target were met with evaporative cooling at ~25 million litres per MW per year, that would mean ~25 bn litres a year, or ~68 MLD (atlas arithmetic). That is more than three times today's estimated draw.
- **The Karnataka 2026–31 policy has the right architecture but weak price signals.**
  - Its main elements are: 1 GW by 2031; a 10–12% share of India's AI-ready capacity; an outlay of ₹1,300.45 crore; plant-wise PUE/WUE reporting; PUE-linked incentives; resource heat-mapping; and new corridors outside Bengaluru.
  - But its 100% treated-water reimbursement is capped at ₹8 lakh a year. For a 10 MW evaporative site using ~250 ML a year, that covers only ~₹3 per kilolitre (atlas arithmetic). It is too little to change cooling design.
  - **Recommendation:** make treated or reclaimed water mandatory for new Bengaluru builds above a threshold, as Johor does. Set WUE ceilings (Johor uses 1.4; Singapore's median is 2.2 m³/MWh, with a target of 2.0). Steer GPU-dense training clusters to corridors with surface water or RTC renewables, and keep latency-sensitive inference in the city.
- **The demand side favours Bengaluru for inference, not training.** With 900+ GCC units and the densest AI talent pool, Bengaluru is the natural home for low-latency enterprise inference and fine-tuning. Large training campuses fit better near coastal cable landings and renewable-rich grids (Vizag, Jamnagar, Chennai).
- **Make power procurement show additionality.** Require data-centre RE PPAs to show new RTC renewables-plus-storage, not reshuffled existing green power. That is the lesson of Ireland's "bring your own generation" rule.

### 4.2 Checklist for evaluating an AI data-centre project in India

1. Is grid connection secured, with a date, and is RTC clean supply contracted (with % additionality and storage)?
2. Is there an anchor tenant or pre-lease, and what is the minimum utilisation commitment?
3. What is the cooling design (closed-loop liquid, dry, evaporative), and what is the design WUE at peak summer wet-bulb?
4. What is the water source: treated or reclaimed versus municipal or groundwater? What is the local aquifer's stage of extraction?
5. Can the facility take 100 kW+ racks (structure, liquid-cooling loops, power distribution) without a rebuild?
6. What are the design and reported PUE, WUE and CUE, and will they be disclosed publicly plant by plant?
7. What are the hazard exposures (flood, cyclone, heat, seismic zone), and what is the Tier rating?
8. How far is it from cable landing stations, and are there diverse fibre routes?
9. Are incentives tied to verified permanent jobs and resource performance, not to headline investment?
10. Who bears grid-upgrade costs, and is there a use-it-or-lose-it rule for booked capacity?
11. What share of the supply chain is local (transformers, switchgear, cooling)?
12. Is there a community benefit plan (water offsets, local hiring, tax-sharing with local bodies)?

## 5. Uncertainties and where sources disagree

- **20% of data / 3% of capacity.** It is repeated by KPMG, the Economic Survey, ORF and industry CEOs. But MeitY itself told Parliament that the 20% is unsupported and the 3% only indicative. Use these figures as rhetoric, not as data.
- **Capacity baselines.** 1.5 GW (Rubix, 2025), 1.8 GW (Savills), 1.9 GW (KPMG FY26) and 2.2 GW (Wood Mackenzie, 2025) differ by definition (IT versus facility power; installed versus operational). The government keeps no official count.
- **2030 forecasts** range from 4 GW to 12 GW (and 23 GW from an investment house). The power-side 26.3 GW is not comparable.
- **Jobs per MW** range from 0.15 to 188, a thousand-fold spread driven by mixing construction, indirect and "ecosystem" jobs with permanent posts. Prefer government-order commitments and independent studies.
- **GDP from AI.** NITI's US$500–600 bn (2035) and its CEO's US$2 trillion are scenario claims about AI *adoption*. Neither isolates the contribution of domestic data centres.
- **Water.** Per-MW estimates vary with cooling technology and climate. The national 150/358 bn litre figures trace to a market-research firm, not to measured disclosure. Bengaluru needs metered data.
- **Export controls.** The Diffusion Rule's rescission was announced, but at least one compliance source says no formal Federal Register removal had been published by 2026. The regime remains fluid.
- **Bubble risk.** The view that a bubble is "unlikely" comes from real-estate brokers with a commercial interest. Independent evidence of under-utilisation exists both at IndiaAI and in Malaysia.

## Recommendations for the atlas framing

1. **Lead with "build, but on conditions".** The demand and sovereignty case is strong. The case for unconditional subsidies is weak.
2. **Present jobs honestly.** Show the 1.2–2.6 per MW commitment figures alongside the headline claims.
3. **Treat power and water as the decisive metrics.** Make plant-level PUE, WUE and water-source disclosure the atlas's core accountability layer for Bengaluru.
4. **Separate inference from training geographically.** Keep latency-sensitive inference in Bengaluru, and put water- and power-heavy training on coastal or renewable-rich corridors.
5. **Flag every forecast by source type** (government, consultancy, broker, investor, advocacy group). Show ranges, not point estimates.

## Sources

1. omnisciencecapital — https://www.omnisciencecapital.com/ai-power-play-india-data-centercapacity-could-surge-to-19-23-gw-by-2030/
2. kpmg — https://assets.kpmg.com/content/dam/kpmgsites/in/pdf/2026/07/india-data-centre-opportunity-from-emerging-demand-hub-to-integrated-data-centre-powerhouse.pdf
3. thehawk — https://www.thehawk.in/news/economy-and-business/indias-data-centre-capacity-likely-to-surge-40-pc-annually-to-12-gw-by-2030-report
4. indianinfrastructure — https://indianinfrastructure.com/2026/07/28/indias-data-centre-capacity-to-reach-12-gw-by-2030-says-industry-report/
5. ecorpit — https://ecorpit.com/ai-regulation-export-controls-enterprise-models-2026/
6. roctelecom — https://roctelecom.com/insights/ai-diffusion-rule-itad/
7. foodandwaterwatch — https://www.foodandwaterwatch.org/wp-content/uploads/2026/01/RB_2601_DataCenterJobs.pdf
8. hamminstitute — https://hamminstitute.org/site-files/documents/data_center_workforce.pdf
9. bricks-bytes — https://bricks-bytes.com/blog/data-center-jobs-per-megawatt-verdant-techuk-construction/
10. waterwastewaterasia — https://waterwastewaterasia.com/higher-costs-tighter-rules-johors-data-centres-turn-to-reclaimed-water/
11. arusgrid — https://arusgrid.com/policy/malaysia
12. cso — https://www.cso.ie/en/releasesandpublications/ep/p-dcmec/datacentresmeteredelectricityconsumption2024/keyfindings/
13. thenewsminute — https://www.thenewsminute.com/karnataka/karnatakas-new-data-centre-policy-puts-water-energy-in-focus-what-does-it-say
14. spglobal — https://www.spglobal.com/commodity-insights/en/news-research/latest-news/electric-power/041025-global-data-center-power-demand-to-double-by-2030-on-ai-surge-iea
15. CNBC — https://www.cnbc.com/2025/12/11/big-tech-microsoft-amazon-google-india-billions-in-investment.html
16. awfis — https://www.awfis.com/inspiration/workplace-insights/articles/evolution-of-gccs-in-india
17. flexiple — https://flexiple.com/gcc/statistics
18. Substack — https://filtercoffee.substack.com/p/microsoft-goes-all-in-with-175b-india
19. careerindia — https://www.careerindia.com/news/indiaai-mission-2026-access-subsidized-gpus-boost-ai-careers-scale-startups-011-66885.html
20. communicationstoday — https://www.communicationstoday.co.in/38000-gpus-one-big-problem-indias-ai-mission-cant-find-enough-users/
21. medianama — https://www.medianama.com/2025/09/223-niti-aayog-ai-report-600b-gdp-boost/
22. outlookindia — https://respawn.outlookindia.com/gaming/gaming-news/india-gpu-rental-market-grows-as-ai-compute-access-lags
23. Wikipedia — https://en.wikipedia.org/wiki/India_AI_Impact_Summit_2026
24. gpusmith — https://gpusmith.com/articles/en/nvidia-gpu-export-restrictions
25. coopercenter — https://www.coopercenter.org/research/jlarc-report-data-centers-virginia
26. mts — https://drops.mts.now/ai-capex/wiki/documents/jlarc-virginia-2024/
27. virginiabusiness — https://virginiabusiness.com/virginia-data-centers-tax-exemption-2-7-billion/
28. pwcva — https://www.pwcva.gov/assets/2024-12/JLARC%20Report%20Summary_12-16-2024.pdf
29. wric — https://www.wric.com/news/taking-action/jlarc-report-data-centers-virginia/
30. pib — https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2227953&reg=3&lang=2
31. cbinsights — https://www.cbinsights.com/company/nxtra
32. stopdirtydatacenters — https://stopdirtydatacenters.org/media/resources/files/2026ITC_43620_MS56_E.pdf
33. safeguard — https://safeguard.sh/resources/blog/virginia-data-center-tax-exemption-jlarc-findings-power-costs
34. kpmg — https://kpmg.com/ie/en/insights/energy-utilities-telecoms/irelands-data-centre-policy-reset.html
35. scienceblog — https://scienceblog.com/j-ireland-data-centres-22pct-2024-electricity/
36. dcmarketinsights — https://www.dcmarketinsights.com/data/power-policy/ireland
37. morganlewis — https://www.morganlewis.com/pubs/2026/03/singapore-announces-data-center-capacity-allocation-call
38. arusgrid — https://arusgrid.com/policy/singapore
39. mayerbrown — https://www.mayerbrown.com/en/insights/publications/2024/08/singapores-green-data-centre-roadmap-representing-a-necessary-intersection-between-digital-infrastructure-and-sustainability
40. university-365 — https://www.university-365.com/post/sovereign-ai-race-singapore-2026
41. thestar — https://www.thestar.com.my/news/nation/2025/08/02/johor039s-water-tariff-adjustment-data-centres-would-have-to-pay-more
42. threads — https://www.threads.com/@freemalaysiatoday/post/DcDfAmgAR8y/johor-already-rejects-nearly-of-applications-for-failing-sustainability/
43. dcmarketinsights — https://www.dcmarketinsights.com/data/power-policy/malaysia
44. negaraku — https://negaraku.md/en/technology/data-centre-boom-malaysia/
45. marketresearchmalaysia — https://marketresearchmalaysia.com/insights/article/water-not-just-power-malaysia-data-centre-water-use-and-the-new-sustainability-reality
46. telborg — https://telborg.com/datacentre-briefings/256
47. arxiv — https://arxiv.org/pdf/2606.01575
48. mordorintelligence — https://www.mordorintelligence.com/industry-reports/study-of-data-center-water-consumption-in-india
49. Substack — https://aiafterhours.substack.com/p/compared-to-what
50. systemiq — https://www.systemiq.earth/wp-content/uploads/2026/02/Scaling-Indias-Data-Centre-Ecosystem.pdf
51. downtoearth — https://www.downtoearth.org.in/water/india-is-using-water-to-build-the-machines-that-tell-us-we-are-running-out-of-it
52. newslaundry — https://www.newslaundry.com/2026/04/16/in-bengalurus-water-stressed-areas-sit-most-of-its-data-centres
53. forbesindia — https://www.forbesindia.com/article/budget-2026/budget-2026-push-for-data-centres-with-30-year-tax-holiday/2990956/1
54. downtoearth — https://www.downtoearth.org.in/science-technology/thirsty-data-centres-thin-regulation-who-is-watching-indias-water
55. dig — https://dig.watch/updates/karnataka-sustainable-data-centre-policy
56. medianama — https://www.medianama.com/2026/10/223-india-data-storage-gaps-parliament-panel/
57. convergence-now — https://www.convergence-now.com/artificial-intelligence/indias-data-centre-capacity-jumps-59-in-h1-2026-set-to-cross-7-gw-by-2030-report/
58. thehawk — https://www.thehawk.in/news/science/indias-data-centre-capacity-likely-to-quadruple-to-65-gw-by-2030-report
59. upstox — https://upstox.com/news/business-news/latest-updates/accelerated-adoption-of-ai-can-contribute-500-600-billion-to-india-s-gdp-by-2035-niti-aayog-report/article-181341/
60. tribuneindia — https://www.tribuneindia.com/news/business/ai-to-create-new-job-opportunities-add-usd-2-trillion-extra-to-economy-by-2035-niti-aayog-ceo
61. thebestai — https://www.thebestai.co/chapters/ch-49.html
62. computelaw — https://computelaw.blog/deals/export-control-compliance-advanced-ai-chips/
63. communicationstoday — https://www.communicationstoday.co.in/indias-ai-data-centre-boom-unlikely-to-create-oversupply-cushman-wakefield/
