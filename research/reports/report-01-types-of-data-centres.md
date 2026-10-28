<!-- Report 1 of the India Data Centre Atlas research series (Types of data centre, global and Indian; atlas chapter 2.2). Produced with AI-assisted web research, October 2026, and kept as written at the time. Some figures were corrected later (notably India grid water 4.5 → 2.9 L/kWh and grid CO₂ 0.71 → 0.675 t/MWh, October 2026); the atlas standards register (src/data/standards.js) is authoritative where they differ. -->

# Types of Data Centres: A Global Deep Analysis and an Indian Perspective (as of October 2026)

Hyperscale facilities run by cloud and AI giants are now the main type of data centre in the world. They hold roughly half of global capacity (about 48% in Synergy Research's April 2026 data) and are on track for about two-thirds by 2031. Third-party colocation is the main way everyone else gets capacity, and enterprise on-premises capacity is flat in absolute terms and shrinking as a share. India should not try to copy the US mix. It should build a "hyperscale-plus-colocation core" in a few coastal and inland metro hubs, make every new large build AI-ready and liquid-cooled, and add a thin, policy-backed layer of sovereign and edge capacity. Water-light cooling and renewable power contracts should be required from the start.

## TL;DR
- **Globally, scale wins.** Hyperscale has grown to about 48% of capacity (Synergy, Apr 2026), colocation holds about 20% and on-premises about 32%. That is down from 56% on-premises in 2018. Total capacity of about 103 GW in 2025 is projected to nearly double to about 200 GW by 2030 (JLL, Jan 2026). The IEA projects data centre electricity use rising from 415 TWh (2024) to about 945 TWh (2030). AI, power scarcity and data-localisation rules are the forces behind this, and they favour large, dense, liquid-cooled campuses.
- **India is small but growing very fast.** It has about 1.5 GW operational per MeitY/PIB (2025), and private estimates run from 1,123 MW (JLL, H1 2025) to about 1.7 GW (CBRE, end-2025) and 1,789 MW (Cushman & Wakefield, H1 2026). A 3.86 GW pipeline runs to 2030, and announced AI campuses would add several GW on top: Google–AdaniConneX–Airtel at Vizag, Reliance at Jamnagar, and the Microsoft and AWS expansions. Mumbai holds about half of operational capacity. The market is led by colocation operators, with hyperscalers taking 60–70% of new colocation demand (SBI sector report, Apr 2026).
- **What India should build, in priority order.** (1) Hyperscale/wholesale colocation campuses in Mumbai, Chennai, Hyderabad, Noida and Vizag, all built AI-ready at 30–130 kW/rack with direct-to-chip liquid cooling. (2) Sovereign and government AI/cloud capacity using the IndiaAI PPP "empanel-and-subsidise" model. (3) Renewable-backed campuses with round-the-clock power contracts, placed close to where renewables are generated. (4) Modular edge nodes in Tier-2/3 cities for 5G, UPI/fintech, OTT and Indian-language AI inference. Underwater and other experimental designs should not be priorities.

---

## 1. Types of Data Centre

### 1.1 Deep analysis of the types: what exists, what dominates globally, and why

#### 1.1.1 The classification schemes

Data centres are classified along four independent axes. A single facility can be "hyperscale + Tier III + direct-to-chip-cooled + AI factory" all at once:

1. **Ownership/business model:** enterprise on-premises, colocation (retail/wholesale), hyperscale (self-built or leased), managed services/cloud, edge/micro.
2. **Workload/purpose:** general-purpose cloud, AI/HPC "AI factories" and GPU clusters, sovereign/government.
3. **Physical form and location:** traditional built, modular/containerised/prefabricated, underground, underwater.
4. **Resilience rating:** Uptime Institute Tier I–IV and ANSI/TIA-942 Rated 1–4. **Cooling:** air, rear-door/hybrid, direct-to-chip, immersion.

#### 1.1.2 Types by ownership and business model

| Type | How it works | Typical scale / density | Cost structure | Advantages | Disadvantages | Typical users |
|---|---|---|---|---|---|---|
| **Enterprise / on-premises** | Organisation owns and runs its own facility (server room up to a corporate campus) | Under 1 MW to about 20 MW; modal rack about 7.5 kW (Uptime 2025) | All capex borne by the owner; opex for power, staff and maintenance; low utilisation is common | Full control, data sovereignty, custom compliance | Poor economies of scale, older and less efficient plant, hard to upgrade for AI density | Banks, government, defence, large manufacturers, hospitals |
| **Retail colocation** | Operator leases racks, cages or suites with power, cooling and security; tenant brings servers | Facilities of 5–50 MW; customers take 1 rack to under 1 MW | Tenant pays monthly rent per rack/kW plus interconnection; operator carries building capex | Converts capex to opex, carrier-neutral interconnection, fast deployment | Higher per-kW price, less control, contract lock-in | Enterprises, BFSI, network operators, SaaS firms |
| **Wholesale colocation / build-to-suit** | Operator leases whole halls or buildings, often to a single hyperscaler on long leases | 10–100+ MW per building, campuses of hundreds of MW to GW | Operator funds the build (often project-financed against an anchor lease); tenant often pays power at cost plus rent | Speed to market for hyperscalers, bankable long-term cash flows | Concentrated tenant risk, thin margins, power-procurement exposure | AWS, Microsoft, Google, Meta, Oracle, AI labs, neoclouds |
| **Hyperscale (self-built)** | Cloud/internet giants design, own and operate their own campuses | Single buildings of 30–100+ MW; campuses of 1 GW+; AI halls at 50–130+ kW/rack | Huge capex funded from balance sheet; lowest unit cost thanks to scale | Lowest cost per MW, custom hardware, best PUE (larger sites average about 1.44, per Uptime 2025) | Very concentrated power and water demand, local opposition, long grid queues | AWS, Microsoft, Google, Meta, Alibaba, Tencent, Oracle |
| **Managed services / cloud** | Provider runs the infrastructure and sells compute or storage "as a service" (IaaS/PaaS, managed hosting, GPU-as-a-Service) | Sits on top of hyperscale or colocation capacity | Customer pays per use; provider absorbs capex | Elastic, no hardware ownership, fast access to GPUs | Egress costs, vendor lock-in, data-residency questions | Start-ups, digital natives, enterprises moving to hybrid |
| **Edge / micro** | Small facilities close to users or devices (telecom central offices, towers, factory floors, cities) | 50 kW to about 5 MW; micro/containerised units at single-rack scale | Low capex per site but high cost per kW; many sites to manage | Low latency, data reduction, local resilience | Hard to operate at scale, uneven demand, limited GPU density | Telcos (5G/MEC), CDNs/OTT, retail, payments, industrial IoT |

**Reading the table.** Moving down from enterprise to hyperscale, cost per kW falls and efficiency rises, but control is lost and concentration risk grows. The same economics have driven every capacity shift of the past decade.

#### 1.1.3 Newer and purpose-based categories

- **AI/HPC data centres ("AI factories") and GPU clusters.** These are facilities designed around thousands to hundreds of thousands of tightly networked accelerators, for training and increasingly for inference. Their design differs from cloud facilities in three ways: rack density, floor loading and cooling. JLL's 2026 outlook says AI training facilities demand about **10 times the power density** of traditional data centres and command **60% lease-rate premiums**. JLL estimates AI was about **a quarter of data centre workloads in 2025** and could be **half by 2030**, with inference becoming the main driver. The IEA estimates AI servers accounted for **24% of server electricity demand and 15% of total data centre energy demand in 2024**, and accelerated-server electricity use is growing about 30% per year against about 9% for conventional servers. The cost structure is dominated by IT: GPUs can outweigh the building several times over. Their main disadvantages are the risk of rapid hardware obsolescence and very large single-site power draws.
- **Sovereign/government data centres.** These are facilities, or dedicated cloud regions, where the hardware, operations, keys or data must stay under national jurisdiction. Examples include national informatics clouds, defence clouds and "sovereign AI" compute. JLL attributes EMEA's 10% CAGR partly to strong demand for sovereign AI clouds driven by privacy regulation. The advantage is legal certainty. The disadvantages are higher cost, smaller scale and slower access to frontier hardware.
- **Modular, containerised and prefabricated data centres.** Factory-built power, cooling and IT modules (from shipping-container units to full prefabricated halls) are assembled on site. They cut construction time, suit edge and remote sites, and allow phased capex. They are also increasingly how hyperscale campuses are built. AFCOM's 2025 State of the Data Center Report found 83% of respondents planned to deploy prefabricated cooling modules, up from 72% in its 2024 report, though AFCOM's 2026 report puts planned cooling-module deployment at 69% (and power modules at 77%). Downsides are design rigidity and transport and logistics limits.
- **Underground and underwater (experimental or niche).** Underground sites in mines and bunkers (common in Scandinavia) get stable temperatures and physical security. Underwater is still experimental. Microsoft's Project Natick ran 855 servers on the seabed off Scotland for just over 25 months and reported failure rates about one-eighth of the land-based control group. But Microsoft confirmed to DCD that "I'm not building subsea data centers anywhere in the world." China has gone further: Highlander deployed a 1,433-ton commercial underwater unit off Hainan, and a Shanghai Lin-gang project with a 2.3 MW first phase claims PUE below 1.15 using offshore-wind power. **Conclusion:** these designs show what passive cooling can do, but they cannot be serviced, refreshed or scaled the way AI hardware cycles require.

#### 1.1.4 Classification by resilience: Uptime Tiers and TIA-942

| Uptime Tier | Redundancy | Concurrently maintainable? | Fault tolerant? | Design-intent availability | Approx. annual downtime | Typical use |
|---|---|---|---|---|---|---|
| Tier I – Basic capacity | N, single path | No | No | 99.671% | ~28.8 hours | Small business, dev/test |
| Tier II – Redundant components | N+1 components, single path | No | No | 99.741% | ~22 hours | Non-critical enterprise |
| Tier III – Concurrently maintainable | N+1, multiple paths (one active) | Yes | No | 99.982% | ~1.6 hours | Colocation baseline, cloud, BFSI production |
| Tier IV – Fault tolerant | 2N / 2(N+1), multiple active paths | Yes | Yes | 99.995% | ~26 minutes | Trading, critical health, national systems |

Uptime Institute certifies its own Tiers (Roman numerals), and these focus on power and cooling topology. ANSI/TIA-942 uses **Rated 1–4** (Arabic numerals), audited by accredited third parties. It also covers telecom cabling, architecture, fire protection and physical security. TIA dropped the word "Tier" in its 2014 revision at Uptime's request. The availability percentages are customary design-intent figures, not contractual SLAs. **In practice, Tier III / Rated 3 is the commercial standard worldwide and in India.** Tier IV is used selectively, because it typically costs much more per kW. The SBI sector report (Apr 2026) puts AI or Tier IV builds in India at up to INR 75 crore/MW, against INR 50–55 crore/MW for standard Tier III air-cooled builds.

#### 1.1.5 Classification by cooling approach

| Cooling approach | How it works | Practical rack density | Efficiency | Water use | Status |
|---|---|---|---|---|---|
| **Air (CRAC/CRAH, hot/cold aisle, economisers)** | Chilled or outside air moved through racks | Up to about 15–20 kW/rack (SBI notes air nears its limits beyond about 15 kW) | Fleet average PUE 1.54 (Uptime 2025); new sites about 1.48 | High if evaporative towers are used; low with dry coolers | Still most of the installed base: about 75% use perimeter air (Uptime 2025) |
| **Rear-door heat exchangers / hybrid** | Liquid-cooled coil on the rack door removes heat from the exhaust air | About 20–50 kW | Better than room air | Moderate | Most common "first step" into liquid |
| **Direct-to-chip (DLC)** | Cold plates on CPUs/GPUs; coolant loop to a CDU; residual air cooling | 30–130+ kW | PUE about 1.1–1.25 achievable | Low with closed loops and dry coolers | Becoming the standard for AI; about 22% of operators used direct liquid cooling in 2025 (Uptime) |
| **Single-phase immersion** | Servers submerged in a dielectric fluid | 50–150+ kW | Very low cooling overhead | Very low | Niche; suits edge, crypto and HPC |
| **Two-phase immersion** | Fluid boils at the chip and condenses | 100–250+ kW | Lowest overhead | Very low | Early stage; fluid cost and environmental concerns |

The key takeaway from Uptime's 2025 survey is that the **average** facility is still air-cooled at a modal density of about **7.5 kW/rack** (6.8 kW in 2024), and few sites exceed 30 kW. AI halls, by contrast, start at 30 kW and run past 100 kW. The market has split into two classes: legacy and enterprise facilities on one side, AI-native campuses on the other. Global PUE has been stuck at about 1.5 for six years because the large air-cooled legacy fleet holds the average down, even as new large sites (over 20 MW) average about 1.44.

#### 1.1.6 Global market share and installed capacity by type (2024–2026)

| Metric | Value | Source and date |
|---|---|---|
| Global data centre capacity | ~103 GW (2025) → ~200 GW (2030), 14% CAGR; ~100 GW added 2026–30 | JLL 2026 Global Data Center Outlook (Jan 2026) |
| Hyperscale share of capacity | 41% (2024) → 44% (Q1 2025) → nearly half, about 48% (early 2026) → 67% projected by 2031 | Synergy Research (2024; Jun 2025; Apr 2026) |
| Non-hyperscale colocation share | 22% (2024–25) → 20% (2026); absolute capacity still growing | Synergy Research |
| Enterprise on-premises share | 56% (2018) → 34% (Q1 2025) → 32% (2026) → 19% by 2031; absolute capacity stable and slightly boosted by on-prem GPUs | Synergy Research |
| Number of hyperscale data centres | 1,189 (Q1 2025); about 800 more in the known pipeline (2026) | Synergy Research |
| Concentration | 20 metro/state markets hold 60% of hyperscale capacity; Northern Virginia 11%, Beijing 6% | Synergy Research (Aug 2026) |
| Big three cloud providers' share of hyperscale capacity | 58% | Synergy Research (Q3 2025) |
| Hyperscale quarterly capex | ~$142 bn in Q3 2025 | Synergy Research via The Register (Dec 2025) |
| Global occupancy | ~97%; 77% of capacity under construction pre-leased | JLL (Jan 2026) |
| APAC capacity | 32 GW → 57 GW by 2030; colocation growing ~19% CAGR; on-prem declining 6% | JLL (Jan 2026) |
| Liquid-cooling adoption | ~22% of operators use direct liquid cooling; ~75% perimeter air | Uptime Institute 2025 survey |

**Electricity demand (IEA, *Energy and AI*, April 2025):**
- Data centres used about **415 TWh in 2024**, about 1.5% of global electricity.
- Base case: about **945 TWh by 2030**, "slightly more than Japan's total electricity consumption today." That is about 15% annual growth.
- Base case: about **1,200 TWh by 2035**, within a scenario range of 700–1,700 TWh.
- The US and China account for nearly 80% of growth to 2030.
- In the US, data centres account for nearly half of electricity-demand growth to 2030.
- Globally, data centres account for only about a tenth of demand growth, less than EVs or air-conditioning.
- Renewables meet about half of the growth in data centre demand, and natural gas expands by 175 TWh.

These are projections, not outcomes. The IEA's own scenario range is wide, and Sightline Climate (now Currence) estimated in February 2026 that 30–50% of the roughly 16 GW slated to come online in 2026 may be delayed, after 26% of expected capacity slipped in 2025.

#### 1.1.7 Why certain types dominate

1. **Economies of scale.** Hyperscale and wholesale campuses spread fixed costs (substations, cooling plant, security, staff) over hundreds of MW. In India, cost per MW falls from INR 50–55 crore at standard Tier III to INR 35–45 crore at scale (SBI, Apr 2026). Newer and larger facilities also run at lower PUE (Uptime 2025), which compounds the cost advantage, since electricity is the largest opex line.
2. **Cloud adoption.** Synergy notes that in 2012 enterprises spent about twelve times as much on their own data centre hardware and software as on cloud services. That ratio has since reversed. Enterprises keep only the workloads that must stay on-premises, put the rest into colocation, and rent elastic compute from hyperscalers.
3. **AI workloads.** Training needs contiguous, very high-density, liquid-cooled halls with tens to hundreds of MW on one network fabric, and only hyperscalers, neoclouds and large wholesale operators can build these. Inference is spreading back toward metros and the edge, which supports colocation and edge demand.
4. **Latency.** Interconnection-rich metro colocation (for cloud on-ramps, exchanges and CDNs) and edge sites survive because physics caps how far some workloads can be from users.
5. **Regulation and data localisation.** Privacy and sovereignty rules push in-country builds and sovereign clouds. This favours domestic colocation and local hyperscale regions over offshore capacity.
6. **Energy.** Power has become the binding constraint, and it decides location more than land or tax does. Large players can sign PPAs, self-generate, or move to "power-first" frontier sites. Smaller enterprises cannot.

#### 1.1.8 Leading hubs and their constraints

- **Northern Virginia (US).** It is still the world's largest market, with 4,496.5 MW of inventory in H1 2026. Vacancy is about 0.2% and all 2026 deliveries are pre-committed (CBRE, H1 2026). Atlanta has overtaken it in capacity under construction (2,882 MW). Across North America's primary markets, supply hit a record 10,903 MW while vacancy fell to 1.4%. Local approvals are tightening too: DCD reported in September 2026 that Loudoun County's board voted to pause new data centre applications.
- **Dublin (Ireland).** Dublin has about 1,150 MW in operation (mid-2025), and data centres used 22% of metered national electricity in 2024. A de facto grid-connection moratorium ran from 2021 until the CRU's new Large Energy User policy in December 2025. Under that policy, new data centres must bring on-site or nearby generation or storage able to match their demand.
- **Singapore.** A moratorium imposed in 2019, when data centres used about 7% of national electricity, was replaced by a selective allocation regime that sets strict PUE and green-energy conditions.
- **Frankfurt, London, Amsterdam, Paris.** These are capped by grid capacity. Frankfurt colocation vacancy was 3.1% in mid-2026, the tightest in the FLAP-D group against a 6.4% average, per JLL's EMEA mid-year 2026 report, which also notes Frankfurt's 24-month-plus lead times.
- **Beijing, Tokyo, Sydney, Mumbai.** These are the big APAC hubs. CBRE named Mumbai as one of the new hotspots that benefit from power constraints in older hubs.

**The common lesson for India:** hubs grow until power, water or local politics stop them. The winners plan grid, water and land ahead of demand.

---

### 1.2 Indian perspective: which types to build, why, and how

#### 1.2.1 Current state of the market

**India vs. global capacity**

| Metric | India | Global | Source and date |
|---|---|---|---|
| Operational capacity | ~1.5 GW (MeitY/PIB, 2025); 1,123 MW (JLL, H1 2025); ~1.7 GW (CBRE, end-2025); 1,789 MW in top seven markets (C&W, H1 2026) | ~103 GW (2025) | PIB 13 Mar 2026; JLL; CBRE Apr 2026; C&W Sep 2026 |
| Growth | 375 MW (2020) → ~1.5 GW (2025); 440 MW added in 2025; ~500 MW expected in 2026 | 14% CAGR to 2030 | PIB; CBRE |
| 2030 outlook | 3,860 MW pipeline (509 MW under construction, 3,351 MW planned) to 2030 (C&W); total of ~4.5–6.5 GW (CEEW base cases), ~6.5 GW colocation (SBI), up to ~8 GW (Jefferies) | ~200 GW | C&W; CEEW; SBI; JLL |
| Development capital needed | US$29.9 bn through 2030 | Up to US$3 trn by 2030 | C&W; JLL |
| Share of national electricity | ~0.5–0.8% (2024) → ~2.6% (2030) | ~1.5% (2024) → under 3% (2030) | CEEW; IEA |
| Penetration | ~825,333 people per MW of capacity, among the lowest in APAC | n/a | C&W (Sep 2026) |
| Colocation vacancy | 14.9% (H1 2026) | ~3% (97% occupancy, per JLL) | C&W; JLL |

The private estimates differ because they count different things: colocation only vs. colocation plus hyperscaler self-builds, top seven cities vs. national, and IT load vs. facility load. The direction is clear in all of them. India has roughly 1.5–1.8 GW today, and it will have 4–8 GW by 2030 if announced projects deliver. That would still be only a few per cent of global capacity, for a country of more than 1.4 billion people. India's higher vacancy (about 15%) compared with global hubs means supply is currently arriving ahead of absorption in some submarkets. That is a healthy buffer, but it is also a warning against speculative builds.

**Key hubs (Cushman & Wakefield, H1 2026)**

| Hub | Operational (MW) | Share of 3,860 MW pipeline | Why it is there |
|---|---|---|---|
| Mumbai / Navi Mumbai | 890 (about 50%; expected to pass 1 GW by end-2026) | 45% (1,726 MW) | Most subsea cables, BFSI demand, power availability |
| Chennai | 214 | 9% (368 MW) | Second subsea cable hub; Tamil Nadu policy |
| Delhi NCR / Noida | 183 | 10% (387 MW) | Northern demand centre, government, UP incentives |
| Bengaluru | 162 | 3% (100 MW) | IT/SaaS demand; constrained by water and land |
| Hyderabad | 151 | 18% (710 MW) | Inland, low seismic risk, Telangana power policy, Microsoft/AWS regions |
| Pune | 133 | 7% (258 MW) | Mumbai overflow, AWS/Microsoft presence |
| Kolkata | 22 | 2% | Eastern gateway; WB policy promotes edge |
| Visakhapatnam (emerging) | Small today | Gigawatt-scale campuses announced | New east-coast subsea gateway, Andhra Pradesh incentives |

**Major players**
- **Colocation leaders.** STT GDC India, CtrlS, NTT, Nxtra (Airtel), Yotta and Sify together account for more than 1 GW installed and plan more than 4.5 GW more (SBI, Apr 2026). Market-intelligence vendor figures for 2025 put the portfolios at roughly: STT GDC about 400 MW, Yotta about 434 MW, NTT about 268 MW, CtrlS about 250 MW and Nxtra over 200 MW. These are vendor estimates and may count planned capacity. Other entrants named by SBI include AdaniConneX, Digital Connexion, Equinix, CapitaLand, RMZ–Colt and L&T Vyoma, plus Web Werks (now Iron Mountain).
- **Hyperscaler commitments.**
  - **Google:** about US$15 bn over 2026–2030 for its first AI hub, a gigawatt-scale campus at Visakhapatnam with AdaniConneX and Airtel. It includes a new international subsea gateway, and Google calls it its largest AI hub investment outside the US (Oct 2025).
  - **Microsoft:** US$17.5 bn over four years for cloud and AI infrastructure, with a new hyperscale region due by mid-2026 (Dec 2025).
  - **Amazon:** more than US$35 bn across all its India businesses by 2030 (Dec 2025). This builds on AWS's US$12.7 bn cloud-infrastructure commitment for Maharashtra and Telangana.
- **Domestic AI campuses.**
  - **Reliance:** a Jamnagar AI campus targeting up to 3 GW, with an estimated US$20–30 bn cost per Bloomberg, built on Nvidia Blackwell chips and an adjacent green-energy complex. It has also announced a 1 GW twin campus in Andhra Pradesh.
  - **Adani:** about US$100 bn by 2035 for renewable-powered data centres, targeting 5 GW for AdaniConneX.
  - **Tata:** TCS's HyperVault (about ₹18,000 crore for more than 1 GW). OpenAI and Tata have announced 100 MW, scaling to 1 GW.
  - **Caveat:** these are announcements and targets. Many are multi-year, and some depend on power and financing that are not yet secured.

**Demand drivers.**
- **Digital public infrastructure.** Aadhaar, UPI and ONDC generate huge transaction volumes. RBI's 2018 payments data-localisation circular requires that data to be stored in India.
- **BFSI.** Banks and insurers are moving from captive data centres to colocation for compliance and cost reasons (SBI).
- **OTT, e-commerce and mobile.** CBRE identifies hyperscalers as 50–55% of market activity.
- **AI adoption.** This comes from enterprises, start-ups (for example Sarvam AI, which trained its models on IndiaAI compute) and Indian-language foundation models.
- **Global capability centres and SaaS exporters.**
- **5G.** By 2027 more than 75% of Indians are expected to have internet access, and 5G will push edge demand (SBI).

#### 1.2.2 Policy drivers

- **DPDP Act 2023 and DPDP Rules (notified 14 Nov 2025).** The regime is conditional and risk-based. Cross-border transfers are allowed except to jurisdictions the government restricts. Significant Data Fiduciaries carry extra obligations, and the government can require local storage for specified data. Combined with sector rules from RBI (payments) and SEBI, this pushes regulated data into Tier III/IV domestic facilities.
- **Draft National Data Centre Policy (MeitY, Nov 2020).** It proposed infrastructure status, single-window clearances and four Data Centre Economic Zones, but **it was never notified.** MeitY has restarted consultations, and is also working on national standards for AI data centres. As of October 2026, **India still has no binding national data centre policy**, and 15 states have their own policies (CEEW).
- **Infrastructure status (2022).** Data centres (CEEW specifies those above 5 MW) were added to the Harmonised Master List of infrastructure sub-sectors. This opened access to longer-tenor infrastructure debt, ECBs and infrastructure debt funds.
- **Union Budget 2026–27 and Finance Act 2026.** These created an income-tax exemption, available until 2047, for foreign companies' income from procuring data centre services from a "specified data centre" in India and serving Indian customers through local resellers. It is aimed squarely at deepening hyperscaler commitments.
- **IndiaAI Mission (approved March 2024; ₹10,372 crore over five years; ₹4,563 crore for compute).** It uses a PPP model in which the government empanels private GPU operators and subsidises access at about ₹65/GPU-hour instead of building state data centres. **38,231 GPUs** were onboarded through 14 empanelled providers as of March 2026 (PIB). At the India AI Impact Summit in February 2026, MeitY announced about 20,000 more under "AI Mission 2.0." Press reporting suggests actual spending has lagged the headline allocation: a Daily Pioneer op-ed (2026) says the previous year's ₹2,000 crore budget "saw actual utilisation nearer Rs 800 crore," and Outlook Business reported about ₹111.85 crore in GPU subsidies disbursed; both are secondary press sources.
- **Efficiency rules.** MeitY tenders for AI cloud infrastructure require PUE below 1.35. Leading Indian operators report PUE of 1.4–1.5. Other levers are BEE/ECBC benchmarks, SEBI BRSR Core disclosures and the IGBC Green Data Centre rating (SBI).

**State policies (key terms)**

| State | Policy | Key incentives | Notes |
|---|---|---|---|
| Maharashtra | IT/ITeS Policy 2023 (data centres treated as IT units, with essential-service status) | 100% stamp-duty exemption; electricity-duty exemption (described as permanent in 2023, while a June 2026 notification cites 20 years); ₹1/unit power subsidy for 5 years outside Zone I; renewable open access | Hosts about 50% of capacity; green data centre parks policy reported |
| Tamil Nadu | Data Centre Policy 2021 | Eligibility above ₹500 crore and at least 30% renewables; 100% electricity-tax subsidy for 5 years; dual grid for 50 MW+; land and stamp-duty concessions | Policy window ended March 2026; no extension notified as of April 2026 |
| Telangana | Data Centres Policy 2016 | Power at cost of generation; dual grid; exemption from power cuts; renewable open access; building-fee and lease-rental rebates | S&P Global rates it India's most attractive data centre policy package |
| Uttar Pradesh | DC Policy 2021 → **new policy approved 6 Jul 2026** | 2021: capital and interest subsidies, 100% stamp duty, 10-year electricity-duty waiver, wheeling/transmission relief (about ₹21,343 crore of projects approved). 2026: targets 2 GW and more than ₹2 trillion, covers edge data centres, AI-compute and green incentives, 50% renewables target by 2030 | Noida is the main northern hub |
| West Bengal | DC Policy 2021 | 100% stamp duty and registration; 5-year electricity-duty waiver; industrial tariff; dual grid; preferential incentives for edge data centres in IT/industrial parks | 5-year term ran to about September 2026 |
| Andhra Pradesh | DC Policy 4.0 (2024–29) | 100% net SGST reimbursement or 10% capital subsidy; 100% stamp duty; industrial tariff; dual grid via PPP with VGF; custom packages for mega projects over 50 MW | Target given as 200 MW in the G.O. and "up to 1 GW" in the annexure; Vizag is the anchor |
| Gujarat | IT/ITeS Policy 2022–27 | Capex support of 25% up to ₹150 crore for greenfield Tier III+ data centres; ₹1/unit power subsidy for 5 years; 100% electricity-duty reimbursement for 5 years | Jamnagar mega-campus |

#### 1.2.3 Constraints and enablers

- **Power.** This is the main long-term constraint. Data centres used about 13 TWh in 2024 (0.8% of demand), and CEEW projects about 57 TWh (2.6%) by 2030. The Ministry of Power estimates data centre electricity demand could reach **13.56 GW by 2031–32** (PIB, Mar 2026). A data centre can be built in about two years, but transmission takes longer. The main enabler is that India added a record 44.5 GW of renewable capacity in 2025 (CBRE). The difficulty is converting variable solar and wind into the round-the-clock, 99.98%-reliable supply a Tier III site needs. That requires firm-and-dispatchable contracts, storage, green open access and dual-grid feeds. Cost is driven by state tariffs, cross-subsidy surcharges and open-access charges, which is why state power concessions matter so much.
- **Water and climate.** CEEW estimates data centres used about 150 billion litres in 2025, which could more than double by 2030. The underlying estimate comes from Mordor Intelligence. A 100 MW hyperscale facility using evaporative cooling can use about 800,000 litres a day. Bengaluru, Chennai and Gurugram are water-stressed. India's high temperatures and, on the coasts, high humidity limit free-air economisation and make evaporative cooling both thirsty and less effective. This is a strong argument for closed-loop liquid cooling and dry coolers.
- **Land.** Land in Mumbai and Chennai is scarce and expensive, which is pushing builds to the periphery (Navi Mumbai, Panvel, Oragadam) and to new hubs (Vizag, Jamnagar).
- **Submarine cable landings.** India has about 17–18 international cables at 14 landing stations in five cities: Mumbai, Chennai, Kochi, Thoothukudi and Thiruvananthapuram. Carnegie India counted 18 cables across 23 distinct landings in 2025. **Fifteen of 17 cables land within about 6 km of Versova beach in Mumbai, and about 95% of international bandwidth comes through Mumbai.** That is a serious single-point-of-failure risk. Singapore, by comparison, has 26–28 cables. New east-coast landings (SEA-ME-WE 6 at Chennai in 2025, and Google's Vizag gateway) are the most important connectivity enabler for India's next phase.
- **Seismic risk.** Under India's BIS seismic zoning, Delhi NCR sits in a higher-hazard zone than the Deccan plateau. Hyderabad is among the lowest-risk major metros, which is one reason it is a natural inland disaster-recovery and hyperscale hub. Mumbai and Chennai are in moderate zones. Developers should check site-specific hazard against the current BIS map, including coastal flooding and cyclone exposure in Chennai and Vizag.
- **Skills and supply chain.** SBI flags gaps in local manufacturing of power systems, HVAC, lithium-ion storage and modular construction, which raise import dependence, costs and timelines. The workforce needs electrical, mechanical, liquid-cooling and DCIM skills at the scale of tens of thousands of technicians.

#### 1.2.4 Recommendations: which types India should prioritise, and why

**Priority 1: Hyperscale and wholesale colocation campuses in four or five hubs (the core).**
*Why:* This is where global scale economics, India's localisation rules and hyperscaler demand all point. According to SBI's April 2026 sector report, "Hyperscalers contribute 60–70% of new demand in co-location centres." Concentrating builds also lets the grid, water and fibre be planned once rather than piecemeal.
*Where:* Mumbai/Navi Mumbai and Chennai for cables, Hyderabad for inland low-seismic power, Noida for the north, and Vizag as the second coastal gateway. Use paired-region siting: a coastal cable hub plus an inland availability zone about 300–700 km away (Mumbai–Pune/Hyderabad, Chennai–Hyderabad/Bengaluru, Vizag–Hyderabad).

**Priority 2: Build every new large facility AI-ready.**
*Why:* AI is heading toward half of global workloads by 2030 (JLL). Retrofitting air-cooled halls costs far more than building them right the first time.
*How:*
- Design structure and electrical systems for 30–130 kW/rack in at least part of each campus: higher floor loading, taller ceilings, liquid distribution and larger busways.
- Standardise on **direct-to-chip liquid cooling with closed loops and dry coolers**, with immersion reserved for specialised HPC and edge.
- Require PUE of 1.35 or lower, matching the MeitY AI-tender benchmark.
- Budget INR 60–75 crore/MW for AI-grade builds rather than INR 50–55 crore.
- Avoid speculative GPU halls without anchor tenants. SBI itself warns that more efficient models (the "DeepSeek effect") can lower density needs.

**Priority 3: Sovereign and government cloud/AI capacity, using PPP rather than state-built facilities.**
*Why:* DPDP, RBI and SEBI rules, defence and national-security workloads, and Indian-language AI all need assured domestic compute. The IndiaAI "empanel-and-subsidise" model reached 38,000+ GPUs without the state taking hardware-obsolescence risk.
*How:*
- Extend that model to sovereign cloud regions run by Indian-controlled operators in Tier III/IV facilities with MeitY empanelment.
- Use NIC/MeghRaj for core government systems.
- Tie subsidy to utilisation and openness, not to the number of GPUs procured.

**Priority 4: Green, renewable-powered campuses, placed near renewables where latency allows.**
*Why:* Data centres could take about 2.6% of national demand by 2030. Carbon intensity matters to both hyperscaler buyers and SEBI BRSR disclosures, and RE-rich states (Gujarat, Rajasthan, AP, Tamil Nadu, Karnataka) have surplus green power.
*How:*
- Use round-the-clock hybrid PPAs (solar + wind + storage) under green open access, plus captive or group-captive plants. Jamnagar's adjacent green-energy complex and Adani's renewable-linked campuses are the template.
- Site latency-tolerant AI *training* inland or near RE parks. Keep latency-sensitive *inference* and interconnection in metros.
- Make state incentives conditional on renewable share. Tamil Nadu's 30% threshold and UP's 50%-by-2030 target are good models.

**Priority 5: Modular edge data centres for Tier-2/3 cities.**
*Why:* 5G, UPI and fintech, OTT and CDN caching, gaming, and Indian-language AI inference all benefit from sub-20 ms latency to the next 500 million users. Edge is real but small in MW terms: Nxtra already runs 120+ edge facilities across 65+ cities, and the UP 2026 and West Bengal policies explicitly cover edge.
*How:*
- Use prefabricated 0.1–2 MW modules at telecom exchanges, towers and government IT parks, run as networks by telcos (Airtel/Nxtra, Jio, BSNL partnerships) and CDN/colocation operators.
- Design for heat with sealed liquid- or immersion-cooled pods that do not depend on local water.
- Do not over-invest: edge is a complement to the core, and its share of global capacity is not growing.

**What not to prioritise:** new large enterprise-owned data centres (move them to colocation and hybrid cloud), Tier IV everywhere (use it only for truly critical systems), and underwater or other experimental formats.

#### 1.2.5 How: the implementation playbook

1. **Financing.**
   - Use infrastructure-status debt (long tenor, ECBs, InvITs and REITs for stabilised assets) and anchor-tenant project finance.
   - SBI's sector report recommends debt-service coverage covenants, margin ratchets linked to PUE, escrowed cash flows, fixed-price EPC, and anchor commitments for a significant share of initial capacity.
   - Sustainability-linked loans and green bonds should be tied to PUE, WUE and RE share.
   - Data centre EBITDA margins of 40–55% (SBI) make the sector bankable if underwriting avoids speculative builds.
2. **PPP.** Use VGF-backed dual-grid and shared substations in data centre parks, as Andhra Pradesh already offers. Use PPP sovereign cloud and GPU capacity through the IndiaAI model. Use state data centres under MeitY schemes for e-governance.
3. **Policy.**
   - Notify a binding National Data Centre Policy. It should create Data Centre Economic Zones with pre-cleared land, grid and water, set uniform standards for security, fire and disaster recovery, and include a national spatial plan for siting.
   - Harmonise state incentives around performance (PUE, WUE, RE share) rather than a race to the bottom on subsidies. Renew the lapsed Tamil Nadu and West Bengal policies.
   - Clarify DPDP localisation categories early so investment can be sized correctly.
4. **Power.**
   - Plan transmission to data centre parks 3–5 years ahead.
   - Standardise green open access and banking rules.
   - Allow behind-the-meter storage and gas or green-hydrogen backup instead of diesel.
   - Consider an Irish-style "bring-your-own-firming" rule for very large loads.
5. **Cooling and water.**
   - Make closed-loop liquid cooling plus dry or adiabatic coolers the default for new builds.
   - Require treated wastewater or recycled water (not potable supply) for any evaporative use, with Zero Liquid Discharge.
   - Mandate WUE disclosure.
   - Use elevated chilled-water temperatures so chiller-free hours can be extended even in hot climates.
6. **Connectivity.** Speed up permits for new cable landing stations outside Versova: Chennai, Vizag, Kochi, and possibly Odisha or Gujarat. Build diverse terrestrial routes between hubs and promote neutral interconnection exchanges in Tier-2 cities.
7. **Skills and supply chain.**
   - Create a data centre skills mission (through NSDC and ITIs/polytechnics) for critical-facility technicians, liquid-cooling and electrical engineers.
   - Use PLI-style incentives for domestic manufacture of UPS, switchgear, CDUs, chillers, Li-ion BESS and prefabricated modules.

---

## Caveats

- **Capacity figures differ by methodology.** MeitY/PIB (~1.5 GW, 2025), JLL (1,123 MW, H1 2025), CBRE (~1.7 GW, end-2025) and C&W (1,789 MW, H1 2026) measure different scopes. A figure of "1.57 GW in 2026" appears in some media but could not be confirmed in an official release. Global figures (JLL's 103 GW; Synergy's shares) are also model-based estimates.
- **Projections are not outcomes.** IEA 2030 and 2035 figures, JLL's 200 GW, India's 4–10 GW range, and the hyperscaler and conglomerate pledges (Reliance 3 GW, Adani 5 GW, Google 1 GW+) are forward-looking. Sightline Climate (now Currence) estimated in February 2026 that 30–50% of the capacity slated for 2026 globally may be delayed, after 26% slipped in 2025.
- **Some figures are secondhand or vendor-sourced.** These include operator portfolio MW, India's water-use estimate (originally Mordor Intelligence), liquid-cooling market shares, and the IndiaAI disbursement claims. They should be treated as indicative.
- **State policy terms change often.** Several state policies (Tamil Nadu, West Bengal, UP 2021) expired or were replaced in 2026, and some incentive figures differ between official texts and summaries. Check against the latest gazette notification before making investment decisions.

## Sources

1. <https://www.datacenterdynamics.com/en/news/hyperscale-operators-now-account-for-nearly-half-of-all-data-center-capacity-worldwide/>
2. <https://datacentremagazine.com/news/data-centre-capacity-to-hit-200gw-by-2030-as-ai-demand-grows>
3. <https://theideafarm.com/markets/annual-reports/2026-global-data-center-outlook/>
4. <https://www.scientificamerican.com/article/ai-will-drive-doubling-of-data-center-energy-demand-by-2030/>
5. <https://arxiv.org/pdf/2606.21064>
6. <https://www.jll.com/en-us/insights/market-outlook/data-center-outlook>
7. <https://www.techzine.eu/news/infrastructure/121637/microsoft-halts-undersea-data-centers/>
8. <https://www.datacenterdynamics.com/en/news/microsoft-confirms-project-natick-underwater-data-center-is-no-more/>
9. <https://www.techradar.com/pro/forget-project-natick-china-says-it-has-trumped-microsoft-and-launched-its-first-underwater-data-center>
10. <https://metrocoloadvisory.com/data-center-tiers/>
11. <https://atalnetworks.com/data-center-tiers/>
12. <https://coloprice.com/guides/data-center-tiers-explained/>
13. <https://en.wikipedia.org/wiki/Data_center_tiers>
14. <https://sbi.bank.in/documents/57189647/58231607/Sector+Report+DataCentre.pdf/f1919592-ee66-b50b-ea20-75fbb27c9bb5?t=1779885206866>
15. <https://www.dober.com/direct-to-chip-cooling>
16. <https://www.upsite.com/blog/data-center-cooling-trends-for-2025/>
17. <https://datacenter.uptimeinstitute.com/rs/711-RIA-145/images/2025.Annual.Survey.Report.pdf?version=0>
18. <https://www.datacenterknowledge.com/energy-power-supply/uptime-institute-data-center-industry-faces-management-crisis-amid-ai-transformation>
19. <https://mgrid.org/2026/02/13/data-center-pue-plateau-liquid-cooling-19-percent-adoption/>
20. <https://www.datacenterdynamics.com/en/news/roughly-one-third-of-data-center-owners-and-operators-doing-ai-training-or-inference-uptime-institute/>
21. <https://thenetworkinstallers.com/blog/data-center-growth-statistics/>
22. <https://baxtel.com/news/hyperscalers-make-up-nearly-half-of-global-data-center-capacity>
23. <https://www.datacenterdynamics.com/en/news/twenty-markets-account-60-percent-of-hyperscale-data-center-capacity-synergy/>
24. <https://www.theregister.com/2025/12/22/ai_hyperscale_capex_research/>
25. <https://www.ceew.in/publications/how-is-data-centre-infrastructure-in-india-shaping-power-and-water-use>
26. <https://www.iea.org/reports/energy-and-ai/executive-summary>
27. <https://iea.blob.core.windows.net/assets/de9dea13-b07d-42c5-a398-d1b3ae17d866/EnergyandAI.pdf>
28. <https://www.datacenterdynamics.com/en/news/hyperscalers-account-for-41-of-worldwide-data-center-capacity-synergy-research-group/>
29. <https://www.currence.ai/blog/data-center-outlook>
30. <https://motioncre.com/resources/data-center-development-northern-virginia>
31. <https://www.cbre.com/insights/books/north-america-data-center-trends-h1-2026>
32. <https://www.datacenterfrontier.com/site-selection/news/55401462/cbre-record-data-center-construction-fails-to-ease-capacity-crunch>
33. <https://www.lexology.com/library/detail.aspx?g=c12b5598-62db-415f-807a-47a1ce86bb11>
34. <https://www.energyconnects.com/news/utilities/2025/december/ireland-ends-moratorium-on-new-power-links-to-data-centers/>
35. <https://www.datacentres.com/news/singapore-lifts-data-centre-moratorium>
36. <https://www.cbre.com/insights/reports/global-data-center-trends-2025>
37. <https://www.constructionworld.in/latest-construction-technology/india---s-data-centre-capacity-reaches-1-789-mw-in-h1-2026/97528>
38. <https://www.deccanherald.com/amp/story/opinion/what-ai-prompts-cost-power-water-noise-challenges-in-the-age-of-ai-4167429>
39. <https://www.aninews.in/news/business/india-to-add-3860-mw-data-centre-capacity-by-2030-require-usd-299-bn-investment-report20260916122224/>
40. <https://readingroomindia.substack.com/p/the-environmental-bill-for-indias>
41. <https://www.ceew.in/blogs/why-is-water-based-cooling-a-big-issue-for-ai-data-centres-in-india>
42. <https://rallies.ai/news/cushman-wakefield-sees-india-data-center-pipeline-reaching-3860-mw-by-2030-ef229421de8a2a39>
43. <https://www.indiagazette.com/news/279310038/india-to-add-3860-mw-data-centre-capacity-by-2030-require-usd-299-bn-investment-report>
44. <https://www.voicendata.com/data-centre/indias-data-centre-pipeline-touches-386-gw-mumbai-leads-12540883>
45. <https://www.cushmanwakefield.com/en/india/news/2026/09/india-data-centre-h1-2026-update>
46. <https://dmc-education.com/2026/10/02/indias-67b-data-centre-boom-the-rise-of-ai-hyperscale-infrastructure-2026-2030/>
47. <https://en.wikipedia.org/wiki/Data_centre_industry_in_India>
48. <https://www.blackridgeresearch.com/blog/latest-list-of-new-upcoming-data-center-projects-in-india>
49. <https://www.cbinsights.com/investor/rmz-corp>
50. <https://www.indexbox.io/blog/reliance-industries-plans-1-gigawatt-ai-data-center-in-andhra-pradesh/>
51. <https://blog.google/intl/en-in/company-news/our-first-ai-hub-in-india-powered-by-a-15-billion-investment/>
52. <https://gulfnews.com/business/google-picks-india-for-15-billion-ai-super-hub-its-biggest-outside-the-us-2-1.500306759>
53. <https://goelite.com/blogs/big-tech-bets-on-india-for-ai-supremacy>
54. <https://www.business-standard.com/technology/tech-news/amazon-india-tech-ai-investments-microsoft-google-meta-gccs-us-trade-talks-125121000400_1.html>
55. <https://www.niftytrader.in/markets/india-biggest-datacentre-reliance-jv-1gw/>
56. <https://techcrunch.com/2025/01/23/reliance-plans-world-biggest-ai-data-centre-in-india-report-says>
57. <https://finance.yahoo.com/news/adani-group-invests-100bn-india-100616665.html>
58. <https://tradebrains.in/money/3-mega-ai-data-centre-investments-driving-indias-9-gw-vision-by-2032/>
59. <https://www.mexc.com/news/750838>
60. <https://letsdatascience.com/news/india-data-centres-reach-3-gw-capacity-by-2028-c2b2116c>
61. <https://www.kapyn.app/blog/indiaai-mission-explained-2026>
62. <https://en.wikipedia.org/wiki/Digital_Personal_Data_Protection_Rules,_2025>
63. <https://ecorpit.com/karnataka-data-centre-policy-gcc-ai-infrastructure-2026/>
64. <https://www.bwlegalworld.com/article/meity-resumes-national-data-centre-policy-talks-experts-seek-global-alignment-567223>
65. <https://india.entrepreneur.com/technology/india-to-update-data-centre-policies-for-ai-consumption/501280>
66. <https://www.ahlawatassociates.com/blog/india-data-centre-policy-by-state>
67. <https://beaconfiling.com/blog/india-data-center-boom-fdi-incentives>
68. <https://www.pib.gov.in/PressReleasePage.aspx?PRID=2239616&reg=48&lang=2>
69. <https://www.eetimes.com/india-to-add-20000-gpus-as-ai-mission-2-0-expands-compute-and-chip-push/>
70. <https://en.wikipedia.org/wiki/India_AI_Impact_Summit_2026>
71. <https://cloudnews.tech/ais-hidden-cost-in-india-more-electricity-and-growing-pressure-on-water/>
72. <https://www.businesstoday.in/technology/story/india-data-centre-capacity-to-jump-30-in-2026-500-mw-supply-boost-expected-cbre-report-523529-2026-04-01>
73. <https://thebetterindia.com/conservation/nature/ai-water-consumption-india-data-centres-12502489>
74. <https://www.business-standard.com/industry/news/india-eyes-potential-to-become-a-hub-for-submarine-cables-global-backbone-125030900648_1.html>
75. <https://carnegieindia.org/india/research/2026/07/indias-stake-in-the-global-subsea-cable-race>
76. <https://www.businessworld.in/article/india-cheap-internet-undersea-cable-vulnerability-war-zones-2026-598929>
77. <https://www.wirecable.in/indias-potential-to-become/>
78. <https://en.wikipedia.org/wiki/National_Informatics_Centre>
79. <https://www.mercomindia.com/uttar-pradesh-offers-incentives-for-data-centers-using-renewable-energy>
80. <https://www.datacenterdynamics.com/en/news/indias-tamil-nadu-government-releases-data-center-policy/>
81. <https://www.voicendata.com/cloud-datacenter/nxtra-strengthens-tier-3-4-cities-with-edge-data-centres-9368710>
82. <https://www.convergence-now.com/artificial-intelligence/up-clears-startup-policy-2026-and-ai-ready-data-centre-policy-to-accelerate-innovation-and-the-semiconductor-ecosystem/>
83. <https://wbxpress.com/west-bengal-data-centre-policy-2021/>
84. <https://apiic.in/wp-content/themes/custom-theme/assets/Pdfs/2024ITC_33902_MS6.pdf>
85. <https://www.ceew.in/sites/default/files/ceew-data-centre-study-web-ready-final.pdf>
86. <https://www.gktoday.in/uttar-pradesh-approves-data-centre-policy-2026/>
