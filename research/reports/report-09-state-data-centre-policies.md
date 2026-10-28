<!-- Report 9 of the India Data Centre Atlas research series (State-wise data centre policies; atlas chapter 17.2). Produced with AI-assisted web research, October 2026, and kept as written at the time. Some figures were corrected later (notably India grid water 4.5 → 2.9 L/kWh and grid CO₂ 0.71 → 0.675 t/MWh, October 2026); the atlas standards register (src/data/standards.js) is authoritative where they differ. -->

# India's State Data Centre Policies: A State-by-State Deep Dive (October 2026)

As of October 2026, no national data-centre law is in force. The real rulebook is about 16 state regimes, and for a large project the deciding factors are power price, renewable access and reliability, connectivity and policy stability, not headline subsidies. On those factors Maharashtra, Telangana, Andhra Pradesh, Tamil Nadu and Uttar Pradesh lead. Karnataka's new 2026–31 policy is the only one that pays for measured efficiency (PUE/WUE). A wave of 2026 policies — Uttar Pradesh, Gujarat, Karnataka and Maharashtra's amended parks policy — has raised the incentive ceiling. The same wave has started to attach green conditions to incentives, though usually soft ones.

## TL;DR
- **Where to build in 2026:** Maharashtra (Mumbai/Navi Mumbai) is still the lowest-risk choice for interconnection-heavy and hyperscale capacity. Telangana (Hyderabad) and Andhra Pradesh (Visakhapatnam) are the fastest-growing AI/hyperscale alternatives. Uttar Pradesh (Noida) leads in the north, and Gujarat (Dholera) is the most aggressive new incentive bidder. Tamil Nadu's 2021 policy lapsed on 31 March 2026, which creates a policy gap despite Chennai's subsea-cable advantage.
- **States are bidding up incentives:** they now offer 20-year electricity-duty waivers (Haryana, Maharashtra, Gujarat), a ₹1/unit tariff subsidy for 20 years (Gujarat, Maharashtra parks), SGST reimbursement for up to 20 years, and bespoke mega-project packages (AP: >50 MW or >₹5,000 crore). Sustainability conditions are mostly renewable-share floors (Gujarat 51%, Maharashtra cut from 100% to 51%, UP 50% by 2030, AP's stated 70%). Only Karnataka links money to PUE/WUE.
- **What's needed:** a binding national framework covering mandatory PUE/WUE/renewable-energy disclosure, siting based on water and grid capacity, and a cap on stacked state subsidies. The draft National Data Centre Policy (2020) has never been notified. The 2047 tax holiday in the 2026–27 Budget and the DPDP Rules 2025 are central levers, but they are not a siting or sustainability framework.

---

## Key Findings

1. **Count and coverage.** CEEW and SYSTEMIQ's February 2026 study, "Scaling India's Data Centre Ecosystem" (based on 24 stakeholder engagements), listed 15 states that support data centres through dedicated policies or IT/industrial frameworks: AP, Bihar, Chhattisgarh, Gujarat, Haryana, Karnataka, Maharashtra, MP, Odisha, Punjab, Rajasthan, Telangana, Tamil Nadu, UP and West Bengal. Since then Gujarat has notified a dedicated policy, UP and Karnataka have replaced theirs, and Maharashtra has overhauled its parks regime.
2. **CEEW's "5 of 15" finding is already out of date, but its diagnosis holds.** In February 2026 only Rajasthan, Odisha, Karnataka, Tamil Nadu and Andhra Pradesh embedded sustainability provisions. Since then Karnataka (PUE/WUE incentives and plant-wise reporting), UP (a PUE-linked "Green and Sustainable Operations Booster" and a 50% renewable goal) and Gujarat and Maharashtra (51% renewable floors) have added green conditions. The number has risen to roughly 8 of about 16. CEEW's three systemic gaps — weak water governance, no PUE/WUE/carbon performance standards, and weak climate-resilience framing — remain largely unaddressed.
3. **Power is what decides location.** CEEW's stakeholder consultations found electricity cost and reliability outweigh land, fiscal incentives and labour; citing DCD (2025), CEEW puts energy at typically 60–70% of operating cost. Land is a small share of build cost: about 1–3% according to Swarajya's analysis, though IMARC Engineering's 2026 guide puts it at 5–12%. That is why UP's 50% regional land subsidy drew zero data centres to Bundelkhand or Purvanchal in four years, while every operational UP facility sits in Noida or Greater Noida.
4. **Implementation is uneven and opaque.**
   - UP is the only state publishing a running tally: 644 MW proposed, ₹21,342.90 crore, 77.08 acres allotted or under consideration, about 101 MW commercialised.
   - Most states publish no data on disbursements.
   - CEEW's stakeholders report that despite single-window clearance provisions, delays persist in practice, particularly in land acquisition, building approvals, grid connectivity and fire safety clearances.
5. **Controversy has arrived.** The Google–Adani AI campus in Visakhapatnam faces:
   - a PIL by Jal Biradari in the AP High Court on water stress near the Kambalakonda Wildlife Sanctuary;
   - a PIL over 160 acres of temple endowment land;
   - protests over acquisition of assigned land held by Dalit farmers at Tarluvada.

   It is India's first major test of whether data centres need environmental scrutiny. AP's IT minister maintains that it is "a state subject" and that "due process" was followed.

---

## Part A — Central Framework

| Instrument | Status (Oct 2026) | What it does / implication |
|---|---|---|
| **Draft National Data Centre Policy** (MeitY) | Released 5 Nov 2020 for comments (deadline extended to 30 Nov 2020); **never notified**. MeitY has resumed industry consultations; one market-research release describes a "finalised draft" with up to 20-year conditional tax exemptions, but this is unverified. | Proposed four Data Centre Economic Zones (DCEZs), single-window clearance, infrastructure status, and support for indigenous servers, storage, networking and cooling. Lacked enforceable mandates. Treat "imminent" claims sceptically: it has been pending for nearly six years. |
| **Infrastructure status** | In the Harmonised Master List of Infrastructure sub-sectors since 11 Oct 2022 | Applies to data centres of at least 5 MW IT load. Eases long-tenor bank and ECB financing. The Finance Act 2026 tax-holiday definition does not use the 5 MW threshold, so a facility can qualify under one and not the other. |
| **Union Budget 2026–27** (1 Feb 2026) | Enacted in the Finance Act; **subordinate notifications on qualifying criteria still pending** (Norton Rose Fulbright) | Tax holiday until 31 March 2047 for foreign companies that provide cloud services globally using India-based data-centre services. Indian customers must be served through an Indian reseller. A 15% cost-plus safe harbour applies to related Indian data-centre service providers, and IT services generally move to a 15.5% safe harbour. This is the most important central incentive, but it benefits foreign cloud firms and Indian colocation operators indirectly and has no green conditions. |
| **DPDP Act 2023 / DPDP Rules 2025** | Rules notified 14 Nov 2025 | "Soft localisation": cross-border transfers are allowed unless the government blacklists a country. Demand for local hosting comes more from sector rules — RBI payment-data localisation (all payment data stored in India) and the SEBI Cloud Framework 2023 (data and logs on Indian servers) — than from the DPDP regime itself. |
| **MeitY cloud empanelment (GI Cloud / MeghRaj)** | Ongoing | Government workloads must use MeitY-empanelled cloud service providers hosted in audited Indian data centres. This creates steady sovereign demand, especially for Tier III facilities. *(Not re-verified in this research.)* |
| **IndiaAI Mission** | Ongoing | Subsidised GPU compute procured from private data-centre operators. It shapes demand for high-density, liquid-cooled capacity. *(Not re-verified in this research.)* |
| **Green Energy Open Access Rules 2022 (MoP)** | In force | Lowered the open-access threshold to 100 kW and capped additional surcharges, enabling corporate renewable procurement. CEEW stakeholders still name high cross-subsidy surcharge (CSS) and additional surcharge, inconsistent banking rules and sudden withdrawal of waivers as the main barriers. |
| **ISTS charges waiver** | Being phased down for projects commissioned after mid-2025 *(general knowledge, not re-verified)* | Makes inter-state renewable PPAs dearer over time, so state-level wheeling and banking concessions matter more. |
| **TRAI recommendations on data centres, CDNs and interconnect exchanges** | Issued Nov 2022 (often cited as 2023); not implemented by statute | Recommended a legal framework, a single-window system, a data-centre-specific building-code category and incentives. Industry still asks for a National Building Code category for data centres. |
| **CEA/MoP draft guidance on power for data centres** | *Not verified in this research.* | Flagged as a gap: no publicly verified central power-supply standard for data centres was found. |
| **SEZ route** | Available | Data centres can be set up in IT/ITeS SEZs, for example the 2.7 ha SEZ portion of RackBank's Nava Raipur park. The Budget's IFSC tax-holiday extension (20 of 25 years) helps GIFT City-type locations. |
| **GST** | Standard rate on data-centre/colocation services *(not re-verified)* | States compete through SGST reimbursement, which is the reason "net SGST reimbursement" appears in almost every policy. |

**Assessment:** the Centre has paid for demand (tax holiday, IndiaAI) and for financing (infrastructure status). It has not set siting, efficiency or water rules. That leaves states to compete on subsidies.

---

## Part B — State-by-State Deep Dive

### 1. Maharashtra — the incumbent hub
- **Instruments:**
  - IT/ITeS Policy 2023 (data centres get IT-unit benefits and essential-service status).
  - Integrated Green Data Centre Parks (IGDCP) policy, Government Resolution (GR) of 9 Oct 2024, amended by GR of 9 June 2026 (Cabinet Sub-Committee approval 22 April 2026).
  - Electricity-duty notification of 22 June 2026 under the Maharashtra Electricity Duty Act, 2016.
- **Nodal agencies:** Industries, Energy & Labour Department; MIDC for land. **Status:** active.
- **Targets:** the 2024 GR allowed 3 parks of at least 500 MW and at least ₹30,000 crore each, limited to the Mumbai Metropolitan Region (about 1.5 GW, about ₹1.6 lakh crore). The 2026 amendment allows **20 parks statewide**, tied to a "Developed Maharashtra 2047" ambition of 30–40 GW of green data-centre capacity. Officials have said state capacity will grow from about 500 MW to 800 MW by 2028 and want Mumbai's share to rise towards 70%.
- **Fiscal incentives:**
  - **Electricity duty:** 20-year exemption for new and existing data-centre units (June 2026 notification).
  - **Stamp duty:** 50–100% exemption by location under the IT policy; 100% on conveyance or lease for IGDCP projects.
  - **Power tariff (2026 amendment, trade-press reporting):** ₹1/unit for 10 years for ₹30,000 crore projects, and for 20 years for ₹60,000 crore or more.
  - **Investment subsidy:** Industrial Promotion Subsidy of 75% of eligible fixed capital investment for projects of ₹60,000 crore or more.
  - **Interest:** 4% subsidy on term loans for up to 10 years, capped at ₹25 crore a year.
- **Non-fiscal:** essential service; data centres allowed in any zone, including residential, no-development and green zones; additional FSI; free MIDC sub-letting. Eligibility now counts combined investment by owner, developer and park units. The 2% incubation-land rule was dropped, and the benefits apply retrospectively to projects that already hold Letters of Approval.
- **Green provisions:** the mandatory green-power share for core data-centre activity was **cut from 100% to 51%** in June 2026. This is the clearest case of sustainability conditions being diluted to win projects. CEEW notes Maharashtra informally prefers coastal and peri-urban clusters (Rabale) over water-stressed inland Nagpur, but this is not codified.
- **Implementation:** CEEW counts about 271 data centres in India as of January 2026, with Mumbai hosting nearly a quarter of them. A Lodha Palava park MoU (about 370 acres, about ₹1.3 lakh crore) is reported in secondary sources only.
- **Assessment:** strongest ecosystem (subsea cables, internet exchanges, tenants). Policy stability is good, but the green floor has been weakened. Water governance is not codified. **Rank: 1.**

### 2. Tamil Nadu — connectivity leader in a policy vacuum
- **Instrument:** Tamil Nadu Data Centre Policy 2021. Government Order dated 23.11.2021 (Finance concurrence U.O. No. 52074/Fin(Ind.)/2021), launched 26 Nov 2021 at CII Connect.
- **Nodal agencies:** IT Department/ELCOT; Guidance TN for MoUs; SIPCOT disburses fiscal incentives.
- **Validity:** data centres incorporated from 1 April 2021 to 31 March 2026. **Status: lapsed.** No extension had been notified as of April 2026 (Ahlawat & Associates). A new TVK government under CM C. Joseph Vijay took office on 10 May 2026, and no successor policy was found.
- **Eligibility:** investment above ₹500 crore and at least **30% renewable energy**.
- **Incentives:**
  - Industrial tariff.
  - 100% Electricity Tax subsidy for 5 years on TANGEDCO power, refundable if data-centre use stops within 10 years.
  - Stamp duty: 50% concession in Category A/B districts and 100% in Category C, for land from ELCOT/SIPCOT/SIDCO.
  - 50% land-cost subsidy in Category C districts.
  - Training incentive for 6 months.
  - 10% reimbursement (up to ₹10 lakh) for using Tamil Nadu MSMEs.
- **Non-fiscal:**
  - Dual power for loads of 50 MW or more.
  - Multi-level generator stacking.
  - Rooftop chillers excluded from FSI.
  - No zoning or floor-to-ceiling restrictions.
  - Lower parking and window requirements.
  - Uninterrupted water supply.
  - Sub-lease without charges.
  - Single window covering CMDA, DTCP, Fire, Police, TNPCB, CMWSSB and TWAD.
- **Implementation:** about ₹18,000 crore of data-centre MoUs in FY2020-21, plus six MoUs (Adani, L&T, STT GDC, CtrlS, Nxtra and others) around the launch. Chennai ranks second nationally by data-centre count.
- **Assessment:** it was early to set a renewable-linked eligibility rule (30% RE), and its building-code relaxations became a template for other states. The 2026 lapse is now the main risk. Former senior official Sharmila Chavaly (in an interview with The Wire) cites a Tamil Nadu minister describing a deliberate "opting out of the rat race to the bottom" in favour of a distributed model. This is secondary and unconfirmed. **Rank: 4 (would be 2 with a renewed policy).**

### 3. Karnataka — the efficiency-linked model
- **Instruments:** Karnataka Data Centre Policy 2022–27 (superseded), and the **Karnataka Sustainable Data Centre Policy 2026–31**, approved by the Cabinet in Mangaluru in September 2026.
- **Nodal agencies:** Department of Electronics, IT, BT and S&T. Entities register with KITS; Karnataka Udyoga Mitra is the single window. *G.O. number not yet located.*
- **Targets and outlay:** 1 GW cumulative IT load by 2031; 10–12% of India's AI-ready capacity; ₹1,300.45 crore over five years.
- **Coverage:** data-centre developers, park developers, operators, cloud service providers, edge data centres, submarine cables and cable landing stations. Registered office must be in Karnataka.
- **Fiscal incentives:**
  - Capital subsidies, building-fee reimbursement, land concessions, power-tariff benefits, connectivity support, electricity-duty exemption, renewable incentives and wheeling-charge reimbursement, in Bengaluru and beyond.
  - R&D support of 50% of expenditure, up to ₹15 crore per project.
  - Customised packages for strategic projects above **₹3,000 crore**, explicitly naming cable landing stations, subsea/underwater data centres and data-centre-linked desalination plants.
- **Sustainability provisions (India's first performance-linked design):**
  - **Mandatory plant-wise PUE and WUE reporting.**
  - **₹20 crore one-time support for PUE of 1.00–1.20**, sustained for three consecutive years and paid in year four.
  - **WUE of 0.7–1.3 L/kWh** sustained for three years earns 100% water-charge reimbursement up to ₹30 lakh a year for two years.
  - **Treated-water reimbursement** of up to ₹8 lakh a year for five years.
  - A state water-and-energy "resource heat map" to guide siting.
- **Parks:** Hoskote, Mangaluru and Mysuru, about 1,000 MW combined. Land on 30+30-year leases, with dual-grid connectivity and assured water. The Hoskote park is planned at about 500 MW with Pavagada solar and 60 MLD of secondary-treated water. About 350 acres have been identified at Baikampady, Mangaluru.
- **Context:** the IT department estimates (from operators' informal inputs) that Karnataka's 32 data centres use about 4,000 kL of water a day. Neither BWSSB nor KSPCB tracks data-centre water use separately.
- **Old 2022–27 policy (for legacy claims):**
  - 7% capital subsidy up to ₹10 crore outside Bengaluru Urban.
  - Industrial tariff if at least 30% of power is green.
  - Surcharge reimbursement for renewable share above 50%.
  - Special packages above ₹4,000 crore.
- **Assessment:** the best sustainability design in India. The weaknesses are that the incentive amounts are small relative to hyperscale capex (₹20 crore against multi-thousand-crore projects), that Bengaluru has grid and water constraints, and that there is no subsea landing near Bengaluru (Mangaluru is the hedge). The minister called AP's Google package "an economic disaster", which shows Karnataka is choosing not to outbid. **Rank: 7 overall; 1 on sustainability.**

### 4. Telangana — the inland AI challenger
- **Instrument:** Telangana Data Centres Policy 2016 (ITE&C Department), still the base framework and re-hosted on the state IT portal in 2025. **No new notified data-centre policy for 2026 was found**; the state relies on tailor-made packages.
- **Incentives:**
  - Data centres declared an **essential service** (24×7 operation, exemption from power cuts and certain labour provisions).
  - Exemption from the purview of the Telangana Pollution Control Act.
  - 50% building-fee rebate.
  - Land-cost subsidy on government land.
  - 25% lease-rental subsidy up to ₹5 lakh a year for 3 years.
  - Startup internet reimbursement of 25%, up to ₹2.5 lakh a year.
  - R&D grants; patent reimbursement of ₹2 lakh (Indian) or ₹10 lakh (foreign).
  - Plans for dual power grids. IT/ITeS incentives also apply.
- **Targets:** officials cite about 5 GW by 2029–30.
- **Implementation:** According to Knight Frank India's "India Data Centre Market Update 2025", Hyderabad live capacity rose from 60.9 MW (2022) to 151.4 MW (end-2025), with a 1.9 GW committed pipeline, second only to Mumbai. AWS, which runs three availability zones in the city, holds 46% of live IT capacity. Named projects:

| Project | Size / investment | Details |
|---|---|---|
| AWS | ₹60,000 crore | Foundation stone July 2026 |
| TCS HyperVault | Up to 1 GW, up to ₹70,000 crore | 264 acres, Future City; announced September 2026 |
| CtrlS | 400 MW, ₹10,000 crore | MoU 2025 |
| NTT DATA–Neysa | 400 MW, ₹10,500 crore | MoU 2025 |
| Microsoft India South Central region | — | Launched 2026 |

- **Assessment:** inland and disaster-safe, with strong hyperscaler anchoring. But it runs on a ten-year-old policy and opaque bespoke deals, with no water or efficiency provisions. **Rank: 2.**

### 5. Andhra Pradesh — the mega-deal state
- **Instrument:** **AP Data Center Policy (4.0) 2024–29, G.O.Ms.No.6, ITE&C (Promotion Wing) Dept., dated 14.11.2024.** It runs alongside Industrial Development Policy 4.0 and Green Energy Policy 4.0.
- **Validity:** 5 years from notification or until a new policy, whichever is later. Amendments apply prospectively only.
- **Target:** inconsistent within the order itself. The G.O. text says 200 MW; the annexed policy says "few hundred MWs (up to 1 GW)". The state now claims agreements for **6.5 GW**.
- **Incentives:**
  - 100% net SGST reimbursement on capital goods **or** 10% capital subsidy on plant and machinery.
  - 100% stamp duty exemption on the first sale.
  - Industrial tariff.
  - Parking relaxation.
  - Data-centre parks under the Private Industrial Parks (Plug & Play) policy, G.O. 67 dated 26.10.2024.
  - Case-by-case: generator stacking, relaxed window and common-area norms, floor-height relaxations, rooftop chillers, dual grid via PPP with viability-gap funding, transmission and wheeling concessions.
- **Mega projects:** more than **50 MW or more than ₹5,000 crore** fixed capital investment (plant and equipment only) qualify for tailor-made benefits, including land-cost discounts and PPP water and road infrastructure. These are approved by the SIPB (CM-chaired, G.O. 73 of 5.11.2024) on SIPC advice (G.O. 72). The Finance Department required land discounts to follow APLMA guidelines.
- **Green provisions:** the policy promotes seawater cooling and renewable integration. **The "70% renewable energy" rule is a ministerial statement** ("the first thumb rule…", Nara Lokesh, 2026). No notified G.O. for it was found. Water is to come from the Polavaram Left Bank Canal and desalination.
- **Implementation:**
  - **Google** ($15 bn, 2026–30, about 1 GW; SIPB earlier approved about $10 bn), with Adani.
  - Reliance (1 GW).
  - Meta–Sify (500 MW, about $1.5 bn).
  - Adani's earlier 130-acre Madhurawada allotment (₹14,634 crore claimed).
  - Karnataka's minister alleged AP's Google package is worth ₹22,000 crore, with a 25% land subsidy, a 25% water-tariff subsidy, "free electricity" and 100% SGST. This is a rival state's claim; AP has not published the package.
- **Controversies:**
  - Land: 601.4 acres across three sites, including 266.6 acres at Tarluvada, held through three SPVs (Vizag Hyperscale, Vizag Mega, Vizag Rambilli Data Center Park Ltd).
  - Acquisition of assigned land from Dalit farmers.
  - A PIL on 160 acres of endowment land.
  - Jal Biradari's water/wildlife PIL in the AP High Court (hearing listed 24 Aug 2026).
  - Matters before the NGT Southern Bench.
- **Assessment:** the most generous and fastest state for anchors, with coast, cables and renewables. Its key weakness is the opacity of bespoke packages and the litigation risk they now carry. **Rank: 3.**

### 6. Uttar Pradesh — northern hub, data-transparent
- **2021 policy** (Invest UP/UPLC; amended 2022; expired 27 Jan 2026).
  - **Targets:** 250 MW, ₹20,000 crore, 3 private parks.
  - **Eligibility:** units above 2 MW and below 40 MW.
  - **Incentives:**
    - 7% capital subsidy up to ₹20 crore (excluding land and building), paid over 10 years at up to ₹2 crore a year.
    - Park interest subsidy of 60% for 7 years, up to ₹10 crore a year and ₹50 crore per park.
    - Land subsidy of 25% (Madhyanchal/Paschimanchal) or 50% (Bundelkhand/Purvanchal), capped at 7.5% of project cost or ₹75 crore.
    - Stamp duty: 100% on the first transaction, 50% on the second.
    - 100% electricity duty exemption for 10 years.
    - Transmission and wheeling relief; dual grid.
    - CSS to be cut progressively to 20% of its opening level.
    - Sub-leasing without charges.
    - Edge incentives if at least 25 edge data centres form one proposal.
    - Proposed essential-service status under ESMA.
  - **Outcome (June 2025):** 644 MW proposed, ₹21,342.90 crore, 77.08 acres. About 101 MW commercialised. Seven operational facilities (Yotta, NTT, STT GDC, AdaniConneX, CtrlS), all in Noida/Greater Noida. The original 250 MW target was beaten on proposals, though not on commissioning.
- **2026 policy:** Cabinet approved in early July 2026 (unveiled 6 July by IT Minister Sunil Sharma). Department of IT & Electronics with Invest UP.
  - **Targets:** 2 GW additional capacity and more than ₹2 lakh crore.
  - **Incentives:** Tier III/IV focus. "AI Compute Booster": parks installing at least 700 FP64-grade AI compute units get +₹10 crore on the interest-subsidy ceiling and +₹2 crore on the annual cap; units with 350 units get +₹5 crore capital subsidy. Core incentives continue (7% capex up to ₹20 crore; 60% interest; 25%/50% land; 100% stamp duty; 10-year ED waiver).
  - **Green provisions:** "Green and Sustainable Operations Booster" linking extra interest subsidy to green certification, PUE and renewable use; at least 50% renewable sourcing for new data centres by 2030 (per the draft).
  - **Edge:** internet subsidy for edge data centres.
- **Assessment:** the most transparent state, and it first introduced AI-specific incentives. The regional land subsidy is a proven non-driver (Bundelkhand groundwater over-extraction; 14–18-hour rural supply in Purvanchal). **Rank: 5.**

### 7. Gujarat — the newest, biggest bidder
- **Instruments:** Gujarat IT/ITeS Policy 2022–27 (DST), plus a **dedicated Data Centre Policy (2026–29)** unveiled in July 2026, billed as "first-of-its-kind". *G.O. number not located.*
- **IT/ITeS 2022–27:**
  - Capex support of 25%, up to ₹150 crore per data centre.
  - ₹1/unit for 5 years.
  - Opex support of ₹20–40 crore a year.
  - Cable landing station capex of 25%, up to ₹20 crore.
  - Data centres treated as "strategic institutions".
- **Data Centre Policy 2026–29:**
  - **Targets:** 7.5 GW and ₹6 lakh crore. Officials expect 7–8 GW at Dholera alone and claim requests for about twice the target (these are projections).
  - **Incentives:**
    - 2.5% capital subsidy on eligible fixed capital investment in Dholera.
    - Interest subsidy up to 4% for 10 years, capped at ₹25 crore a year.
    - **₹1/unit for 20 years.**
    - 100% stamp duty and registration exemption.
    - **Electricity-duty reimbursement for 20 years.**
    - SGST reimbursement on plant, building and services for up to 20 years.
    - Total capped at 75% of eligible fixed capital investment over 20 years.
    - FSI and building relaxations; assured water and power.
  - **Green provision:** at least **51% renewable** for all incentive-takers.
- **Implementation:** L&T Vyoma, 250 MW and ₹25,000 crore at Dholera by 2028 (MoU February 2026). GIFT City benefits from the IFSC tax-holiday extension. *Reliance's Jamnagar AI data-centre plans were not verified in this research.*
- **Assessment:** has renewable land, cheap solar and port logistics. It lacks subsea landings at scale and a water plan for drought-prone areas, and has no measurable outcome indicators. **Rank: 6.**

### 8. Haryana — Gurugram's policy
- **Instrument:** Haryana State Data Centre Policy 2022, approved by the Cabinet on 27 June 2022 (HEPC/DITECH). The draft specified 7-year validity; *the final term should be verified.*
- **Targets:** 115–120 data centres, ₹7,500 crore.
- **Eligibility:** at least 1 MW. Parks need at least 20 MW and at least 20 acres.
- **Incentives:**
  - 100% stamp-duty reimbursement on the first transaction.
  - **100% electricity-duty exemption for 20 years.**
  - Power-bill reimbursement up to 25% of net SGST for 3 years, in exchange for equivalent government hosting through DITECH.
  - Net SGST reimbursement of 50% (A/B blocks) or 75% (C/D) for 10 years.
  - Employment subsidy of ₹48,000 per employee a year for 10 years.
  - Property tax at industrial rates.
- **Non-fiscal:** essential service under the **Haryana ESMA 1974**; separate infrastructure and energy-intensive industry status; separate building-code category with FAR relaxation; the draft earmarked about 10-acre parcels in Tier-III cities (Yamunanagar, Hisar, Panipat).
- **Assessment:** solid incentives near Delhi demand, but no green provisions and expensive Gurugram land. **Rank: 8.**

### 9. West Bengal — the eastern hub
- **Instrument:** West Bengal Data Centre Policy 2021, **Notification No. 490-ITE dated 06.09.2021**; nodal agency WEBEL.
- **Validity:** 5 years from notification, which **lapses about September 2026**. *No renewal was found; treat as expiring.*
- **Targets:** 400 MW by 2025 and 3 parks.
- **Incentives:**
  - 100% stamp duty and registration exemption.
  - Electricity-duty waiver for 5 years.
  - Industrial power status; dual grid.
  - 60% ground coverage.
  - Right of way under the WB Broadband Policy 2020.
  - Essential services.
  - Quality power and internet for **edge data centres in IT/industrial parks**.
  - 24×7 water and captive water-treatment plants.
- **Implementation:** Kolkata about 67 MW (NTT 40 MW). Adani holds 51.8 acres (₹10,000 crore) and Reliance Jio 40 acres at Bengal Silicon Valley, New Town. A Tajpur/Digha cable landing is planned.
- **Assessment:** the only eastern hub with a dedicated policy, but it is about to lapse and the 400 MW target was missed by a wide margin. **Rank: 9.**

### 10. Odisha
- **Instruments:** Odisha State Data Centre Policy 2022 (E&IT, Invest Odisha); the IT Policy 2025 has replaced the IT Policy 2022.
- **Incentives:**
  - 20% capital subsidy on fixed capital investment (excluding land), up to ₹25 crore.
  - Interest subsidy of 5%, up to ₹25 crore, for 7 years.
  - 30% power-bill subsidy for 5 years.
  - 100% electricity-duty exemption for 10 years.
  - 100% net SGST for 7 years.
  - Stamp duty: 100% on the first transaction, 50% on the second.
  - Land at IDCO concessional rates; 100% conversion-charge reimbursement.
  - **100% transmission and wheeling reimbursement for captive renewable power.**
  - Clean-and-green subsidy of 25%, up to ₹1 crore.
  - Anchor-unit incentives for the first two park units.
  - Essential service; exemption from sections 9, 10, 11 and 23 of the Odisha Shops & Commercial Establishments Act.
- **Assessment:** among the five states CEEW credits with sustainability framing (explicit carbon-footprint link). Few projects so far. **Rank: 10.**

### 11. Rajasthan
- **Instrument:** Rajasthan Data Centre Policy 2025 (DoIT&C/Rising Rajasthan).
- **Targets:** ₹20,000 crore over 5 years, 300 MW, 5 parks.
- **Incentives:**
  - Annual asset-creation incentive of ₹10–20 crore for 10 years.
  - 25% extra "sunrise" incentive for the first 3 data centres investing more than ₹100 crore.
  - 5% interest subsidy for 5 years.
  - **100% waiver of banking, transmission and wheeling charges.**
  - Exemptions on stamp duty, land conversion and electricity duty (7 years).
  - External development charge exemption up to ₹10 crore.
  - 50% skilling reimbursement.
  - **Green Solution Incentive of 50%, up to ₹12.5 crore.**
  - 50% of IPR costs, up to ₹1 crore.
  - Building by-law exemptions.
  - *(One secondary summary cites a 25% capital subsidy and ₹1–1.5/unit tariff support; these conflict with official summaries and are unverified.)*
- **Green provisions:** CEEW calls it **India's most comprehensive sustainability-oriented framework**: mandatory wastewater recycling, ZLD, rainwater harvesting, groundwater recharge, smart water management and green-building standards.
- **Assessment:** excellent renewable resources and a model water framework, but distant from connectivity and demand. **Rank: 11.**

### 12. Madhya Pradesh
- **Instrument:** MP IT/ITeS & ESDM Investment Promotion Policy 2023 (MPSEDC). No standalone data-centre policy.
- **Incentives:** the first 5 anchor data centres get 25% capex subsidy on gross fixed capital investment (excluding land) for minimum investment of ₹500 crore, capped at ₹125 crore and paid over 5 years, plus a power-tariff rebate, ED waiver and stamp-duty reimbursement. *These figures come from consultancy summaries and need checking against the PDF.*
- **Projects:** CtrlS Bhopal (₹500 crore); RackBank in Indore.
- **Rank: 12.**

### 13. Bihar
- **Instrument:** Bihar IT Policy 2024. Data centres are covered as an ancillary sector.
- **Incentives:**
  - **Either** 30% capital subsidy on fixed capital investment (including land), up to ₹30 crore (minimum ₹5 crore), **or** 10% interest subvention up to ₹40 crore.
  - 50% lease-rental subsidy for 5 years.
  - 25% power-tariff subsidy for 5 years.
  - 100% net SGST.
  - +10% for units outside Patna.
- *Validity end-date in secondary summaries (Dec 2029) needs verification.* No data-centre projects identified.

### 14. Chhattisgarh
- **Instrument:** Industrial Development Policy 2024–30. CEEW lists it as covering data centres; *the specific data-centre clauses were not verified.*
- **Project:** RackBank AI Data Centre Park, Nava Raipur — 13.5 acres including a 2.7 ha SEZ, 5 MW scalable to 150 MW, about ₹1,000 crore initial. A further ₹2,000 crore is a projection. Foundation stone laid 3 May 2025.

### 15. Punjab
- **Instruments:** Industrial & Business Development Policy 2022 (data-centre services treated as IT) and IT Policy 2022.
- **Incentives (secondary):** net SGST up to 200% of fixed capital investment for 15 years; ED and property-tax exemption; 100% stamp duty and CLU/EDC exemption; employment subsidy. No projects identified.

### 16. Long tail
- **Jharkhand:** draft IT, Data Center & BPO Investment Promotion Policy 2021 (25% land subsidy for parks). *Final notification not confirmed.*
- **Himachal Pradesh:** IT-policy incentives (100% stamp duty, 5% interest subvention up to ₹30 lakh a year, 100% net SGST for 7 years). *Policy name and G.O. not verified.*
- **Kerala:** no data-centre policy found. The IT Policy 2023 and GCC Policy 2025–30 apply. Kochi and Thiruvananthapuram subsea landings are an underused asset.
- **Assam/Northeast:** no data-centre policy found (the Assam ESDM Policy 2025 covers electronics only). Tripura reportedly positions itself on data-centre incentives (unverified).
- **Delhi, Goa, Uttarakhand, Jammu & Kashmir:** **no data-centre-specific policy found.** Delhi demand is served from Noida and Gurugram.

---

## Part C — Master Comparison Table

| State | Instrument / status | Target | Capex / interest | Power | Land / stamp | Green conditions | Validity |
|---|---|---|---|---|---|---|---|
| Maharashtra | IT/ITeS 2023 + IGDCP GRs (Oct 2024; Jun 2026) — active | 20 parks; 30–40 GW by 2047 | IPS 75% of fixed capital investment (≥₹60k cr); 4% interest, ₹25 cr/yr | ED 20 yrs; ₹1/unit 10–20 yrs | Stamp duty 100% (IGDCP); any-zone siting | 51% RE (cut from 100%) | IT policy to 2028; GR open-ended |
| Tamil Nadu | DC Policy 2021 — **lapsed 31.3.2026** | — | — | Electricity tax 100%, 5 yrs | Stamp duty 50–100%; 50% land (Cat C) | ≥30% RE eligibility | Expired |
| Karnataka | Sustainable DC Policy 2026–31 — approved Sept 2026 | 1 GW; ₹1,300.45 cr outlay | Capital subsidy; R&D 50% up to ₹15 cr | ED exemption; wheeling reimbursement | Parks on 30+30-yr lease | **PUE/WUE reporting; ₹20 cr PUE; WUE & treated-water reimbursement** | 2031 |
| Telangana | DC Policy 2016 + bespoke deals | ~5 GW by 2029–30 (stated) | Lease rental 25%; R&D | Power incentives; dual grid | Land subsidy (govt land); 50% building fee | None | Legacy |
| Andhra Pradesh | DC Policy 4.0, G.O.Ms.6 (14.11.2024) | 200 MW–1 GW (policy); 6.5 GW (claimed) | 100% SGST on capital goods **or** 10% P&M; mega >50 MW/>₹5k cr bespoke | Industrial tariff; T&W case-by-case | Stamp duty 100% first sale; land discount (mega) | Seawater cooling; "70% RE" (stated, not notified) | 2029 or new policy |
| Uttar Pradesh | DC Policy 2026 (replaced 2021) | +2 GW; ₹2 lakh cr | 7% up to ₹20 cr (+₹5 cr AI); 60% interest (+₹10 cr AI) | ED 10 yrs; T&W relief; dual grid | 25–50% land; stamp duty 100% | PUE/green-cert booster; 50% RE by 2030 | ~2031 (assumed) |
| Gujarat | DC Policy 2026–29 + IT/ITeS 2022–27 | 7.5 GW; ₹6 lakh cr | 2.5% capex (Dholera); 4% interest, ₹25 cr/yr; cap 75% of fixed capital investment | **₹1/unit 20 yrs; ED 20 yrs** | Stamp duty & registration 100% | 51% RE | 2029 |
| Haryana | DC Policy 2022 | 115–120 DCs; ₹7,500 cr | Net SGST 50–75%, 10 yrs | ED 20 yrs; power bill ≤25% of SGST | Stamp duty 100% | None | ~2029 (verify) |
| West Bengal | DC Policy 2021 (No. 490-ITE) | 400 MW by 2025 | — | ED 5 yrs; dual grid | Stamp duty & registration 100% | Captive water treatment | **Lapsing ~Sept 2026** |
| Odisha | DC Policy 2022 | — | 20% up to ₹25 cr; 5% interest | 30% bill 5 yrs; ED 10 yrs; captive-RE T&W 100% | Stamp duty 100/50% | Clean-green subsidy; carbon framing | Verify |
| Rajasthan | DC Policy 2025 | 300 MW; ₹20,000 cr | Asset-creation ₹10–20 cr/yr; 5% interest | Banking/T&W 100% waiver; ED 7 yrs | Stamp duty, conversion exemptions | **ZLD, recycling, green-building; green incentive ₹12.5 cr** | ~2030 |
| Madhya Pradesh | IT/ITeS & ESDM 2023 | — | 25% up to ₹125 cr (anchors) | Tariff rebate; ED | Stamp reimbursement | Green DC support (vague) | ~2028 |
| Bihar | IT Policy 2024 | — | 30% up to ₹30 cr or interest | 25% tariff 5 yrs | Lease subsidy | None | ~2029 |

---

## Part D — Attractiveness Index

**Methodology (author's weighted judgment, 0–10 per factor).** Weights: power cost and reliability 25%; renewable access 15%; connectivity (subsea/IX/fibre) 15%; incentives 15%; land and park readiness 10%; water security 10%; regulatory ease and policy stability 10%. Scores reflect the evidence above, not a published index.

| Rank | State | Power | RE | Connectivity | Incentives | Land | Water | Regulatory | **Weighted** |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Maharashtra | 8 | 6 | 10 | 8 | 6 | 6 | 8 | **7.8** |
| 2 | Telangana | 8 | 7 | 6 | 7 | 9 | 6 | 7 | **7.2** |
| 3 | Andhra Pradesh | 7 | 9 | 7 | 9 | 7 | 5 | 6 | **7.3** |
| 4 | Tamil Nadu | 7 | 8 | 10 | 4 | 6 | 4 | 5 | **6.8** |
| 5 | Uttar Pradesh | 7 | 5 | 6 | 8 | 7 | 6 | 8 | **6.7** |
| 6 | Gujarat | 7 | 9 | 4 | 9 | 8 | 4 | 7 | **6.8** |
| 7 | Karnataka | 6 | 8 | 5 | 6 | 6 | 4 | 7 | **6.0** |
| 8 | Haryana | 6 | 4 | 6 | 7 | 4 | 4 | 7 | **5.5** |
| 9 | West Bengal | 6 | 4 | 6 | 5 | 6 | 7 | 4 | **5.4** |
| 10 | Odisha | 7 | 6 | 4 | 7 | 7 | 7 | 6 | **6.2** |
| 11 | Rajasthan | 6 | 10 | 2 | 8 | 8 | 2 | 6 | **5.9** |
| 12 | Madhya Pradesh | 6 | 6 | 3 | 7 | 7 | 5 | 6 | **5.6** |

*Interpretation:* AP's raw score edges Telangana, but litigation risk and opaque packages put it third. Gujarat and Tamil Nadu score similarly for opposite reasons: Gujarat has incentives but little connectivity; Tamil Nadu has connectivity but no current policy. Odisha scores above its rank on paper but has little track record. The ordering reflects demonstrated execution as well as policy.

**Sustainability sub-ranking:** 1 Karnataka; 2 Rajasthan; 3 UP (2026); 4 Andhra Pradesh (stated 70% RE, seawater cooling, desalination); 5 Gujarat (51% RE); 6 Odisha; 7 Tamil Nadu (30% RE, lapsed); 8 Maharashtra (diluted to 51%). Haryana, Telangana, West Bengal, MP, Bihar and Punjab have essentially none.

---

## Part E — Competition Dynamics: Race to the Bottom vs Sustainability Conditions

- **Escalation is real.** Electricity-duty holidays have stretched from 5 years (Tamil Nadu, West Bengal) to 10 (UP, Odisha) to 20 (Haryana, Maharashtra, Gujarat). ₹1/unit subsidies have moved from 5 years (Gujarat IT 2022) to 20 years (Gujarat 2026, Maharashtra ≥₹60k crore). Bespoke packages for anchors — AP's Google deal, reportedly about ₹22,000 crore by a rival's account — set expectations that every hyperscaler will ask for.
- **Green conditions bend under competition.** Maharashtra cut its renewable mandate from 100% to 51% within 20 months. Gujarat launched at 51%, establishing a de facto national floor set by competition rather than by science or grid planning.
- **Incentives are often misdirected.** Land subsidies and regional top-ups barely move siting decisions. Power price, reliability and fibre do. Subsidy money would work better spent on substations, dual-grid connections, treated-water pipelines and cable landing stations, which is the logic behind Karnataka's and UP's park models.
- **Fiscal exposure is unmeasured.** No state publishes disbursements or tax expenditure. Twenty-year SGST and ED waivers stacked on a central tax holiday to 2047 mean the public gets data-centre growth with little direct revenue. That is defensible only if it brings jobs, a local supply chain or grid investment, and the policies rarely require any of these.
- **Water is the next flashpoint.** CEEW estimates a 100 MW hyperscale facility can use about 2 million litres a day. Visakhapatnam's PILs and Bengaluru's lack of tracking show water governance trailing capacity. Only Karnataka (WUE), Rajasthan (ZLD/recycling) and partly UP 2026 address it.

---

## Recommendations

**For the Centre (MeitY, MoP, MoEFCC):**
1. **Notify a slim National Data Centre Framework.** It should be a set of standards, not another subsidy scheme:
   - mandatory annual PUE, WUE, renewable-share and diesel-hours disclosure for facilities of 5 MW or more (matching the infrastructure-status threshold);
   - phased PUE/WUE benchmarks by climate zone;
   - a BIS/NBC building-code category for data centres.
2. **Make central benefits depend on disclosure.** Make the 2047 tax holiday and infrastructure-status lending conditional on certified reporting. This is the one lever states cannot undercut.
3. **Set up a siting decision-support tool.** It would combine CEA grid headroom, CGWB groundwater stage and climate-hazard layers, as CEEW recommends, so that states stop subsidising unbuildable regions.
4. **Fix open-access friction.** Standardise banking, cap CSS and additional surcharge for renewable-linked data-centre load, and enable revenue stacking for battery storage so diesel backup can shrink.
5. **Model state policy and limit stacking.** Publish a model state data-centre policy and consider a soft cap (for example, total state incentives at or below 50–75% of eligible fixed capital investment, as Gujarat already applies) through a GST Council or NITI Aayog forum.

**For states:**
1. **Tamil Nadu and West Bengal:** renew urgently. A lapsed policy costs more in investor uncertainty than any subsidy saves.
2. **Copy Karnataka's metrics.** Move from renewable-share floors alone to PUE/WUE-linked payouts, and raise the amounts so they matter at hyperscale (₹20 crore is symbolic for a ₹10,000 crore campus).
3. **Publish deals.** Bespoke packages above a threshold (AP's 50 MW / ₹5,000 crore) should be disclosed. This is the best defence against PILs like Visakhapatnam's.
4. **Spend on infrastructure, not land.** Fund dual-grid substations, treated-water mains, cable landing stations and parks; drop regional land top-ups for data centres.
5. **Edge in Tier-2 and Tier-3 cities:** use UP's aggregation model (25 or more edge sites per proposal) and West Bengal's IT-park edge provisions, linked to 5G and state data-centre needs, rather than hyperscale subsidies in water-stressed districts.

**For investors:** in Telangana and AP, negotiate explicit, contract-backed packages. Price in Tamil Nadu and West Bengal renewal risk. Treat Karnataka's PUE/WUE reporting as a preview of national rules.

---

## Caveats
- Several 2026 policies (Karnataka, UP, Gujarat, the Maharashtra amendment) are known from cabinet notes, press and trade reports. **Gazette G.O. numbers were not located** for Karnataka 2026, UP 2026, Gujarat 2026, Haryana 2022, Rajasthan 2025 or Odisha 2022. Verified references include AP G.O.Ms.No.6 (14.11.2024), WB No. 490-ITE (06.09.2021), the TN G.O. of 23.11.2021, the Maharashtra GRs of 9 Oct 2024 and 9 June 2026, and the Maharashtra ED notification of 22 June 2026.
- AP's 70% renewable rule, the 6.5 GW figure and the Google package value are statements or rival claims, not published instruments.
- MP, Bihar, Punjab, Himachal and Rajasthan details rely partly on consultancy and secondary summaries. Rajasthan figures conflict across sources.
- Central items marked "not re-verified" (MeghRaj, IndiaAI, ISTS, GST, CEA guidance) are from general knowledge and should be checked before citing.
- Capacity and investment targets (Gujarat 7.5 GW, UP 2 GW, Telangana 5 GW, Maharashtra 30–40 GW) are aspirations. Their sum far exceeds national demand projections — 4.5–6.5 GW by 2030 per Colliers and S&P Global (cited by CEEW), and even the higher estimates of nearly 8 GW (an August 2026 official factsheet) or 12 GW (Wood Mackenzie) — so many will not be met.
- The attractiveness index is the author's weighted judgment, not a published dataset.

## Sources

1. <https://www.ceew.in/sites/default/files/ceew-data-centre-study-web-ready-final.pdf>
2. <https://www.impriindia.com/insights/policy-update/uttar-pradesh-data-centre-policy-2026-powering-indias-ai-ready-digital-backbone/>
3. <https://uplc.up.gov.in/en/page/uttar-pradesh-data-center-policy>
4. <https://www.emirates247.com/business/google-adani-15b-india-data-centre-project-faces-protests-over-water-and-wildlife-concerns-in-visakhapatnam/4295>
5. <https://www.landconflictwatch.org/conflicts/concerns-around-acquisition-process-of-dalit-farmers-land-in-the-google-adani-data-centre-project-in-visakhapatnam>
6. <https://www.tbsnews.net/world/south-asia/giant-data-centre-over-land-belonging-dalits-sparking-protests-andhra-pradesh>
7. <https://newsable.asianetnews.com/business/andhra-pradesh-secures-deals-for-6-5-gw-data-centre-capacity-target-articleshow-wnxi2bd>
8. <https://community.nasscom.in/communities/policy-advocacy/deadline-extended-for-providing-feedback-to-draft-data-center-policy-released.html>
9. <https://ecorpit.com/karnataka-data-centre-policy-gcc-ai-infrastructure-2026/>
10. <https://www.bwlegalworld.com/article/meity-resumes-national-data-centre-policy-talks-experts-seek-global-alignment-567223>
11. <https://www.prnewswire.com/news-releases/india-data-center-market-to-grow-at-14-60-during-202632--driven-by-ai-integration-hyperscale-expansion-and-digital-infrastructure-investments--markntel-advisors-302603836.html>
12. <https://sbi.bank.in/documents/57189647/58231607/Sector+Report+DataCentre.pdf/f1919592-ee66-b50b-ea20-75fbb27c9bb5?t=1779885206866>
13. <https://www.spglobal.com/en/research-insights/special-reports/india-forward/shifting-horizons/will-data-center-growth-india-propel-country-global-hub-status>
14. <https://www.snrlaw.in/data-centres-in-india-opportunity-and-incentives/>
15. <https://www.nortonrosefulbright.com/en/knowledge/publications/8ba395bd/indias-2047-data-centre-tax-holiday-structuring-incentives-for-global-cloud-investment>
16. <https://www.mexc.com/news/610654>
17. <https://taxguru.in/income-tax/budget-2026-impact-assessment-data-centre-business-india.html>
18. <https://assets.kpmg.com/content/dam/kpmgsites/in/pdf/2026/02/technology-pov-union-budget-2026-27.pdf>
19. <https://assets.kpmg.com/content/dam/kpmgsites/uk/pdf/2026/03/international-tax-review.pdf>
20. <https://en.wikipedia.org/wiki/Digital_Personal_Data_Protection_Rules,_2025>
21. <https://www.profileits.com/data-center-policies-subsidies-approval/>
22. <https://community.nasscom.in/communities/public-policy/analysing-data-centre-policies-india>
23. <https://evertiq.com/news/2025-05-05-rackbank-inaugurates-118-million-ai-data-centre-in-raipur>
24. <https://www.ahlawatassociates.com/blog/india-data-centre-policy-by-state>
25. <https://powerpeakdigest.com/maharashtra-green-data-center-policy-expansion/>
26. <https://teamleaseregtech.com/updates/article/57168/govt-of-maharashtra-issued-a-notification-regarding-electricity-duty-e/>
27. <https://www.telecomreviewasia.com/news/network-news/4582-maharashtra-approves-green-data-centre-parks-to-boost-digital-infrastructure/>
28. <https://www.datacenterdynamics.com/en/news/indian-state-govt-approves-large-scale-sustainable-data-center-project/>
29. <https://ionanalytics.com/insights/uncategory/maharashtra-state-seeks-partnerships-for-data-centre-parks/>
30. <https://www.snrlaw.in/incentives-and-laws-for-data-centers-in-maharashtra/>
31. <https://www.rprealtyplus.com/interviews/incentives-laws-for-data-centres-in-maharashtra-118963.html>
32. <https://orbitbrief.substack.com/p/lodha-developers-data-centre-park>
33. <https://www.nsws.gov.in/s3fs/2021-12/Data%20Centre%20Policy%202021.pdf>
34. <https://it.tn.gov.in/en/Tamil_Nadu_Data_Centre_Policy_2021>
35. <https://www.datacenterdynamics.com/en/news/indias-tamil-nadu-government-releases-data-center-policy/>
36. <https://en.wikipedia.org/wiki/Tamil_Nadu_Council_of_Ministers>
37. <https://w.media/tn-government-launches-data-centre-policy-plans-to-provide-incentives-of-%E2%82%B9500-crore/>
38. <https://apiic.in/wp-content/themes/custom-theme/assets/Pdfs/2024ITC_33902_MS6.pdf>
39. <https://www.rprealtyplus.com/news-views/tamil-nadu-govt-released-data-centre-policy-102286.html>
40. <https://baxtel.com/news/india-s-tamil-nadu-government-unveils-new-policies-for-data-centers>
41. <https://www.ahlawatassociates.com/blog/tamil-nadu-data-centre-policy-benefits>
42. <https://indianinfrastructure.com/2024/12/03/taking-strides-tamil-nadu-and-himachal-pradesh-emerge-as-key-players-in-the-data-centre-space/>
43. <https://m.thewire.in/article/environment/full-transcript-india-is-welcoming-huge-data-centres-with-incentives-but-what-do-the-people-get-out-of-it>
44. <https://www.deccanchronicle.com/southern-states/karnataka/karnataka-approves-sustainable-data-centre-policy-20262031-1988661>
45. <https://www.newslaundry.com/2026/10/01/karnatakas-new-data-centre-policy-puts-water-energy-in-focus-what-does-it-say>
46. <https://www.businessworld.in/article/karnataka-approves-sustainable-data-centre-policy-targets-1-gw-it-load-by-2031-624457>
47. <https://www.mondaq.com/india/it-and-internet/1301836/data-centres-in-india-opportunity-and-incentives>
48. <https://law.asia/india-data-centre-infrastructures/>
49. <https://www.deccanherald.com/amp/story/india%2Fkarnataka%2Fandhra-pradeshs-google-incentive-package-is-economic-disaster-priyank-kharge-3765605>
50. <https://www.telangana.gov.in/wp-content/uploads/2023/05/Telangana-Data-Centres-Policy.pdf>
51. <https://assets.cushmanwakefield.com/-/media/cw/apac/india/insights/data-centre-policies-in-india-a-statewise-comparison.pdf?rev=6e0e167e39bf41f383b67eef232479f4>
52. <https://icrier.org/policy_bank/data-centre/>
53. <https://www.snrlaw.in/wp-content/uploads/2023/04/SR-Insights-Data-Centres-in-India-%E2%80%93-Opportunity-and-Incentives.pdf>
54. <https://www.tribuneindia.com/news/business/hyderabad-emerging-as-major-ai-data-centre-hub-with-usd-10-20-billion-investments-in-pipeline-telangana-govt-official/>
55. <https://iaspoint.com/indias-hyperscale-data-centre-boom/>
56. <https://www.datacenterdynamics.com/en/news/foundation-stone-laid-for-aws-data-center-development-in-telangana-india/>
57. <https://www.medianama.com/2026/09/223-tcs-hypervault-ai-data-centre-telangana/>
58. <https://egov.eletsonline.com/2026/09/telangana-announces-%E2%82%B970000-crore-ai-data-centre-in-future-city/>
59. <https://www.newsonair.gov.in/telangana-govt-signs-10000-cr-investment-digital-deal-for-establishing-advanced-ai-data-centre>
60. <https://www.newsonair.gov.in/telangana-govt-signs-mou-with-japanese-company-neysa-networks-to-set-up-ai-data-centre-cluster>
61. <https://www.deccanchronicle.com/southern-states/telangana/tgs-incentives-bringing-data-centres-to-hyderabad-report-1961074>
62. <https://www.lexology.com/library/detail.aspx?g=cb63aa2d-63ab-4c63-9234-ad46c1bf1455>
63. <https://aninews.in/news/business/andhra-pradesh-secures-agreements-for-65-gw-data-centre-capacity-projects-moving-to-execution-minister20260924140844/>
64. <https://telanganatoday.com/andhra-pradesh-mandates-70pc-renewable-energy-for-data-centres-lokesh>
65. <https://www.esgnews.earth/latest-news/andhra-mandates-70-green-energy-for-data-centers/22168.html>
66. <https://www.pakistantoday.com.pk/2026/08/06/googles-india-data-centre-faces-court-fight-over-water-and-wildlife-fears>
67. <https://www.deccanherald.com/business/companies/google-to-invest-10-billion-in-vizag-hyperscale-data-center-3757229>
68. <https://www.deccanherald.com/amp/story/india%2Fandhra-pradesh-cabinet-allots-130-acres-to-adani-for-data-centre-park-in-vizag-1045114.html>
69. <https://businessconnectindia.in/uttar-pradeshs-ai-data-center-policy/>
70. <https://bida.co.in/datacenter>
71. <https://www.business-standard.com/economy/uttar-pradesh/uttar-pradesh-data-centre-policy-2021-key-features-incentives-eligibility-and-implementation-126092800736_1.html>
72. <https://investodisha.gov.in/datacentre-policy>
73. <https://swarajyamag.com/uttar-pradesh/up-is-offering-cheap-land-to-two-regions-that-cannot-host-a-data-centre>
74. <https://www.dqindia.com/government-policy/up-data-centre-policy-2026-ai-infrastructure-12143538>
75. <https://vainetra.com/data-centre-news-india/up-data-centre-policy-2026-ai-data-centres-rs-2-lakh-crore-2gw/>
76. <https://www.esgnews.earth/latest-news/gujarat-mandates-renewable-power-for-ai-data-centers/21303.html>
77. <https://news.careers360.com/gujarat-government-launches-new-it-policy-aim-create-1-lakh-jobs-in-five-years-bhupendra-patel/amp>
78. <https://en.wikipedia.org/wiki/Gujarat_IT/ITeS_policy_2022%E2%80%932027>
79. <https://www.outlookbusiness.com/news/gujarat-launches-ambitious-data-centre-policy-eyes-more-than-6-lakh-cr-investment-in-first-phase>
80. <https://www.etvbharat.com/en/bharat/gujarat-unveils-data-centre-policy-hyperscale-ai-data-centre-enn26070905875>
81. <https://visionias.in/current-affairs/upsc-daily-news-summary/article/2026-07-16/the-indian-express/science-and-technology/explained-what-is-in-gujarats-new-data-centre-policy>
82. <https://www.newsonair.gov.in/gujarat-signs-agreement-with-larsen-toubro-vyoma-to-build-ai-data-center-in-dholera>
83. <https://policymandala.theindiahouse.org/p/48-gujarats-data-center-policy>
84. <https://www.drishtiias.com/state-pcs-current-affairs/haryana-state-data-center-policy-2022>
85. <https://www.pressreader.com/india/hindustan-times-bathinda/20220628/281724093236698>
86. <https://www.businessprocessincubator.com/content/draft-haryana-data-centre-policy/>
87. <https://theprint.in/economy/haryana-cabinet-approves-startup-and-data-centre-policies/1014871/>
88. <https://community.nasscom.in/communities/policy-advocacy/notification-haryana-state-data-centre-policy-2022>
89. <https://wbxpress.com/west-bengal-data-centre-policy-2021/>
90. <https://www.eqmagpro.com/wp-content/uploads/2021/09/West_Bengal_Data_Centre_Policy_2021_compressed.pdf>
91. <https://foxmandal.in/rise-of-data-centres-in-west-bengal/>
92. <https://en.wikipedia.org/wiki/Data_centre_industry_in_India>
93. <https://community.nasscom.in/communities/public-policy/odisha-it-policy-2025-accelerating-regional-digital-growth-forward>
94. <https://m.toppersnotes.com/current-affairs/blog/rajasthan-data-centre-policy-2025-10-feb-2025>
95. <https://psuwatch.com/newsupdates/rajasthan-data-centre-policy-to-attract-rs-20000-crore-investment-in-five-years-cm-bhajanlal-sharma>
96. <https://finraja.com/data-center-incentives-madhya-pradesh-subsidy/>
97. <https://www.datacenterdynamics.com/en/news/ctrls-breaks-new-ground-in-bhopal-india/>
98. <https://translate.google.com/translate?u=https%3A%2F%2Fpatnapress.com%2Fbihar-unveils-ambitious-it-policy-2024-to-propel-investment-and-employment-in-the-it-ites-and-esdm-sector%2F&hl=hi&sl=en&tl=hi&client=srp>
99. <https://hebe.net.in/wp-content/uploads/2025/06/Highlights_of_Bihar_IT_policy.pdf>
100. <https://www.lawtechcorp.com/blog/bihar-it-policy-2024-boosting-investment-employment-and-development/>
101. <https://www.aninews.in/news/national/general-news/chhattisgarh-cm-lays-foundation-for-indias-first-ai-data-center-park-in-nava-raipur20250504141916/>
102. <https://www.etvbharat.com/en/!state/cg-will-become-heartbeat-of-digital-india-first-ai-data-center-park-will-be-built-in-nava-raipur-enn25050305819>
103. <https://punjabinfotech.in/assets/pdf/Industrial_Policy_2022.pdf>
104. <https://investpunjabblog.com/2022/03/10/burgeoning-data-centre-industry-and-punjab-opportunity/>
105. <https://www.jharkhand.gov.in/PDepartment/ViewDoc?id=D016DO002SD00201122021011655917>
106. <https://industrialincentives.com/schemes/kerala-global-capability-centre-gcc-policy-2025-2030>
107. <https://en.wikipedia.org/wiki/Department_of_Electronics_and_Information_Technology_(Kerala)>
108. <https://teamleaseregtech.com/updates/article/44027/assam-govt-notified-regarding-the-assam-electronics-system-design-and-/>
109. <https://www.whalesbook.com/news/English/real-estate/Maharashtra-Expands-Green-Data-Centre-Policy-Investor-Impact/6a30b10ad017fdb509977cc9>
110. <https://techresearchonline.com/news/google-visakhapatnam-data-center-environmental-impact-india/>
