<!-- Report 7 of the India Data Centre Atlas research series (Unit economics; atlas chapter 15.2). Produced with AI-assisted web research, October 2026, and kept as written at the time. Some figures were corrected later (notably India grid water 4.5 → 2.9 L/kWh and grid CO₂ 0.71 → 0.675 t/MWh, October 2026); the atlas standards register (src/data/standards.js) is authoritative where they differ. -->

# Unit Economics of Data Centres — What does a data centre cost?

A Tier III colocation data centre in India costs about ₹56 crore per MW of IT load to build (≈US$6.2M/MW, excluding land) or about ₹61 crore with land. A 50 MW hyperscale build-to-suit costs about ₹39–42 crore/MW. A 100 MW AI campus costs about ₹72 crore/MW for the facility, but roughly ₹340 crore/MW once the GPUs are included. For AI, the building is only about a fifth of the bill, and electricity is under 5% of the cost of a GPU-hour.

**TL;DR**
- **Capex.** India is among the cheapest places in the world to build a data centre. Turner & Townsend's 2025 index puts Mumbai at US$6.64/W, 51st of 52 markets, against US$14.5/W in Singapore and US$15.2/W in Tokyo. Our bottom-up models land at ₹56 crore/MW (Tier III colo), ₹39 crore/MW (hyperscale build-to-suit) and ₹72.5 crore/MW (liquid-cooled AI facility), all excluding land. Electrical systems take about 39–46% of facility cost, cooling 18–23% and land only 4–8%. For an AI campus, GPUs and networking add about ₹266 crore/MW, or 3.7× the facility.
- **Opex and returns.** Electricity is about 74% of colo opex. Yet it is only about 39% of the full cost per IT-kWh (₹29.7/kWh in our 20 MW case), because capex recovery is the bigger slice. At an 11% WACC, a new ₹61 crore/MW Tier III colo needs about ₹7,700–8,200/kW/month to earn its cost of capital. Cushman & Wakefield reports Mumbai 1–5 MW deals at ₹6,500–8,000/kW/month, so a new mid-size colo earns roughly its WACC (unlevered IRR about 9.5% in our base case). Pre-leased hyperscale build-to-suit does better, at about 14–15%. Hyperscalers building their own capacity save roughly 13–27% versus leasing.
- **GPUs.** A fully loaded H100 in India costs about ₹145/GPU-hour at 100% utilisation and ₹177 at 80% (5-year life, 11% WACC, ₹90/$). E2E Networks lists ₹255.55 on-demand and Yotta ₹356, which leaves margin. The IndiaAI L1 rate of ₹150 covers cost only at about 86–96% utilisation. Utilisation matters more than any other variable. A GB300-class campus breaks even at about ₹308/GPU-hour at 80% utilisation, but about ₹598 at 40%. A neocloud's unlevered IRR swings from about 21% to negative across that range.

---

## Key Findings

1. **India's cost advantage is real but narrower than headline indices suggest.** Construction is about 45–55% cheaper than in Singapore, Tokyo or Silicon Valley. Rents are proportionally lower too: Houlihan Lokey puts India at about US$80–100/kW/month, against US$160–225 in the US and US$300–475 in Singapore. India's rent-to-capex ratio is therefore the thinnest of the three markets. India's case rests on demand growth and scale, not fat unit margins.
2. **For colo and hyperscale, the facility is a capital-recovery business.** Of every ₹100 of lifetime cost per IT-kWh in a 20 MW colo, about ₹47 is capex recovery, ₹39 electricity and ₹14 other opex. Utilisation, cost of capital and build cost per MW move returns more than the tariff, because electricity is usually passed through to tenants.
3. **For AI, the GPU is the business.** In a GB300-class campus at 80% utilisation, a ₹308 GPU-hour splits into roughly ₹242 of GPU and network capex (79%), ₹31 of facility capex (10%), ₹20 of other opex (6.5%) and ₹14 of electricity (4.6%). A ₹1/kWh change in tariff moves the GPU-hour by only about ₹3. A 20-point change in utilisation moves it by ₹95–195.
4. **Green power is now roughly at par with southern grid tariffs, not a big saving.** SECI's 1 GW round-the-clock tranche V auction (August 2026) cleared at ₹5.25–5.26/kWh across seven winners, fixed for 25 years. Delivered to a data centre, that becomes about ₹6.25–6.75 after transmission and losses, with grid demand charges still payable. That is cheaper than Maharashtra (₹7.27) or Tamil Nadu (₹7.50) energy charges. It is close to Telangana at 132 kV (₹6.65) and Karnataka (₹6.70). Third-party open access that pays cross-subsidy surcharge (CSS) is uneconomic in Tamil Nadu (CSS ₹1.99–2.06/kWh).
5. **Valuations price Indian platforms near replacement cost plus pipeline.** Nxtra's March 2026 raise valued it at US$3.1 billion post-money, about US$2.1 billion pre-money, on about 300 MW. That is roughly US$7M (₹63 crore) per operating MW pre-money, close to our ₹56–61 crore/MW replacement cost. Houlihan Lokey's Indian cap rates of 7.5–8.5% imply about 12–13× EBITDA for stabilised assets.

---

## 1. CAPEX (₹)

### 1.1 Global and Indian benchmarks

**Turner & Townsend Data Centre Construction Cost Index 2025–26** (52 markets, traditional air-cooled cloud data centre, US$ per watt; construction only):

| Market | US$/W | ₹ crore/MW (at ₹90/$) | Comment |
|---|---|---|---|
| Tokyo | 15.2 | 137 | Most expensive |
| Singapore | 14.5 | 131 | 2nd |
| Zurich | 14.2 | 128 | 3rd |
| Silicon Valley | 13.3 | 120 | Largest US premium |
| New Jersey | 12.9 | 116 | |
| Oslo | 12.4 | 112 | 7th |
| London | 12.0 | 108 | |
| Frankfurt | 11.6 | 104 | |
| Atlanta | 9.9 | 89 | |
| Phoenix / Columbus | 9.8 | 88 | |
| Charlotte | 9.5 | 86 | |
| **Mumbai** | **6.64** | **60** | 51st of 52 |

Turner & Townsend recorded 5.5% global cost inflation for traditional data centres in 2025, down from 9.0% in 2024; it links the slowdown to construction overall, where its 2025 market intelligence report showed average inflation of 4.2%, and 60% of its survey respondents expect a 5–15% rise in 2026. It notes that cost data for AI-specific builds remains too thin for a global benchmark. Its Northern Virginia, Chennai and Hyderabad figures were not captured in this research. Treat Chennai and Hyderabad as broadly in line with or slightly below Mumbai, which is our estimate.

**Other benchmarks**

- **Cushman & Wakefield, Asia Pacific Data Centre Construction Cost Guide 2026.** Total construction across India's five main cities is US$5.9–9.0M/MW (about ₹53–81 crore at ₹90/$). The guide's April 2026 release gives India at US$5.9M (low), US$7.4M (mid) and US$9.0M (high) per MW, up 3.8% year-on-year; Cushman & Wakefield's Andrew Green notes that construction cost inflation "diverges sharply, with some markets seeing increases above 15% while others remain below 5%."
- **Cushman & Wakefield, US 2026 guide.** US/Canada builds average US$17.6M/MW, and per-MW construction costs are up 21% since the previous edition. Powered land in primary US markets averages US$584,000 per MW.
- **Houlihan Lokey India edition, December 2025** (drawing on Cushman & Wakefield, CBRE and others). Development cost is US$5.5–8.5M/MW in India, US$9–12M in the US and US$9–14.5M in Singapore.
- **SBI sector report, April 2026 (prior reports).**
  - Tier III air-cooled: ₹50–55 crore/MW (shell plus M&E, excluding IT).
  - AI, immersion or Tier IV: up to ₹75 crore/MW.
  - Large campuses: ₹35–45 crore/MW.
- **Jefferies** has cited about US$4–5M per MW for Indian capacity, which is at the low end and likely reflects large-campus or powered-shell scope.
- **Anant Raj** reports about ₹26 crore/MW for brownfield conversion of buildings it already owns. That is not a greenfield benchmark.

The indices cover different scopes. Turner & Townsend covers construction only. Cushman & Wakefield's development figures include land. SBI excludes IT. All of them land Indian Tier III facilities in the **₹50–65 crore/MW** band before land.

### 1.2 Land and buildings

**Land prices per acre in Indian data centre hubs.** Transaction-based figures are labelled. The rest are estimates or come from low-quality sources.

| Hub | ₹ crore/acre | Evidence |
|---|---|---|
| Navi Mumbai (TTC MIDC, Airoli, Mahape, Ghansoli) | 15–40 greenfield; up to ~80 for in-fill with structures | STT GDC paid ₹282 crore for 14,093 m² (~3.5 acres) with an existing 6,828 m² building (May 2026), ≈₹81 crore/acre. Brookfield paid ₹600 crore for 30 acres in Ghansoli (2021), ≈₹20 crore/acre. |
| Thane / Palava (MMR periphery) | 12–35 | AWS: ~40–45 acres at Palava for ₹500–600 crore (≈₹12–14 crore/acre). Amazon: 54 acres in Thane for ₹1,870 crore (≈₹35 crore/acre). |
| Chennai (Ambattur, Oragadam, Siruseri) | 8–15 Ambattur; 3–8 Oragadam (estimate) | A secondary blog source gives ₹8–15 crore/acre; treat as indicative. |
| Hyderabad | 2–6 | Microsoft bought 48 acres for ₹267 crore (2024), ≈₹5.6 crore/acre. |
| Noida / Greater Noida | 3–10 (estimate, not verified) | Authority allotment rates vary; check YEIDA and GNIDA schedules. |
| Bengaluru Whitefield | 10–25 (estimate, not verified) | |
| Bengaluru Devanahalli / Hoskote | 4–10 (estimate, not verified) | |
| Pune (Hinjewadi, Chakan, Talegaon) | 5–15 (estimate, not verified) | |

**Acres per MW.** Cushman & Wakefield's Asia Pacific scenarios for a 50 MW building are:

- 20 acres for a low-rise hyperscale build: **0.4 acre/MW**
- 10 acres for a multi-level build: **0.2 acre/MW**
- 5 acres for a high-rise operator build: **0.1 acre/MW**

Mumbai-area operators usually build multi-storey at 0.1–0.25 acre/MW. Hyderabad and Chennai campuses run at 0.3–0.5 acre/MW.

**Land share of capex.**

- Navi Mumbai: 0.25 acre/MW × ₹20 crore = ₹5 crore/MW, about **8%** of a ₹61 crore/MW total.
- Hyderabad: 0.4 × ₹6 crore ≈ ₹2.4 crore/MW, about **4–5%**.
- Extreme Mumbai in-fill: 0.1 × ₹80 crore = ₹8 crore/MW, about **12%**.

In absolute terms, Mumbai land per MW (₹5–8 crore) is similar to US primary-market powered land (US$584k/MW ≈ ₹5.3 crore). The big India–US gap is in construction, not land.

**Construction cost per sq ft (estimates).**

- Indian data centres typically need about 10,000–12,000 sq ft of gross built-up area per MW of IT, more for low-density colo.
- Shell and core for data-centre-grade structures runs about **₹5,500–8,000/sq ft**. These have high floor loading (~2,500 kg/m²) and about 18 ft clear height, the specs Houlihan Lokey cites for new AI-ready builds. That works out to about **₹6–8.5 crore/MW**.
- The total fitted facility is about ₹45,000–55,000/sq ft of built-up area.

### 1.3 Servers, storage and GPUs (IT capex)

| Item | Price (USD) | India landed (₹, at ₹90/$) | Notes |
|---|---|---|---|
| CPU server, dual-socket 1U/2U cloud node | US$9–22k (estimate) | ₹8–20 lakh | Not verified; varies hugely with configuration |
| Storage | ~₹45–90 lakh per PB raw (estimate) | | Not verified |
| H100 SXM card | US$25–40k | ₹22–36 lakh | Multiple 2026 price guides |
| **H100 HGX 8-GPU server** | **US$250–320k** | **₹2.25–2.9 crore** | |
| H200 HGX 8-GPU server | ~US$300–330k (estimate) | ~₹2.7–3.0 crore | H200 cards quoted at US$30–35k |
| **B200 HGX 8-GPU server** | **US$400–500k** (DGX B200 lists ~US$515k) | **₹3.6–4.5 crore** | |
| **GB200 NVL72 rack** | **US$3.0M** (HSBC); US$3.1M bare / US$3.9M all-in (SemiAnalysis) | ₹27–35 crore | 72 GPUs, ~120–135 kW |
| **GB300 NVL72 rack** | **US$3.7–4.0M** (Loop Capital) vs **US$6.0–6.5M** (Tom's Hardware supply chain, March 2026); ~US$5.0M purchase / US$5.7M deployed (Data Gravity) | ₹33–58 crore | Estimates disagree; Supermicro datasheet lists 132–140 kW |

**India landed cost.**

- Servers and GPU systems generally attract **0% basic customs duty under the WTO Information Technology Agreement (ITA-1)**. Since basic customs duty is zero, the 10% social welfare surcharge, which is levied on that duty, is also zero.
- **18% IGST** is charged on the CIF value and is **fully creditable** for GST-registered buyers.
- The landed premium is therefore mainly freight, insurance and clearance (~1–2%), plus the **working-capital cost of IGST**.
- For our 100 MW AI campus, IGST paid at import is about ₹4,800 crore. Against about ₹2,100 crore a year of output GST on GPU revenue, that takes about 2+ years to recover. At about 9.5% cost of debt, the carrying cost is roughly ₹450–500 crore. Neoclouds selling to foreign customers (zero-rated exports) would have to use the refund route instead.
- Customs classification disputes do occur. Servers under HSN 8471 also need import authorisation.

**IT capex per MW.**

- **Cloud (CPU-heavy) halls:** about ₹90–180 crore/MW of IT capex, or **1.5–3× the facility**. This is an estimate.
- **AI halls:**
  - GB300 NVL72 at ~135 kW per rack: about 530 GPUs per MW of IT.
  - At about US$65–70k all-in per GPU (including the scale-out fabric), that is **₹265–310 crore/MW, about 3.5–5× the facility**. Our Case C comes out at 3.7×.
  - **Back-end networking** (InfiniBand or Spectrum-X Ethernet, switches and optics) is about **10–15% of cluster cost**. We use 12%.

**Refresh and depreciation.**

- CPU servers are depreciated over 5–6 years by most hyperscalers. Some shortened lives for AI-era servers back to 5 years in 2025. That comes from company disclosures not re-verified in this research.
- GPUs are contested. Accounting lives run 5–6 years, but critics argue the economic life is 3–4 years, because each Nvidia generation (Hopper → Blackwell → Rubin) cuts the market rental price of the previous one.
- We model 5 years as the base and show 4 and 6 years as sensitivities. For an H100 at 80% utilisation, the cost per GPU-hour moves from ₹204 (4 years) to ₹177 (5 years) to ₹159 (6 years).

### 1.4 Electrical infrastructure

The electrical system includes:

- HV substation (66, 110 or 220 kV for colo; 220 or 400 kV for 100 MW+ AI campuses)
- Power transformers and MV/LV switchgear
- 2N UPS (increasingly lithium-ion)
- PDUs, RPPs and overhead busway

Multiple cost benchmarks put electrical at **40–50% of hard construction cost**. In our models it is 39% of the all-in facility cost and about 46% of hard cost. That is ₹22 crore/MW for Tier III colo, ₹15.5 crore/MW for hyperscale and ₹28 crore/MW for AI.

Cushman & Wakefield's US guide shows big supply-chain price rises since Q3 2021: switchgear +50%, UPS +48%, generators +45%, transformers +44%, chillers +40%. Imported or long-lead electrical gear is the main way FX feeds into Indian capex.

### 1.5 Cooling infrastructure

- **Air-cooled Tier III:** chillers (air-cooled or water-cooled with cooling towers or adiabatic coolers), CRAH or fan walls, piping and controls. Cost is about ₹8–10 crore/MW, **15–20%** of the facility.
- **Liquid-cooled AI:** coolant distribution units (CDUs), secondary loops, dry coolers and trim chillers for residual air. Cost is about ₹15–18 crore/MW, **~23%** of the facility.
- Turner & Townsend's own November 2025 release says it has, for the first time, identified a 7–10% construction cost premium between traditional and AI data centres in the US, comparing projects of similar IT capacity.
- Morgan Stanley estimates liquid-cooling content in a GB300 NVL72 rack at about US$49,860 (+20% versus GB200), as reported by Tom's Hardware. That content sits in IT capex, not the building.

### 1.6 Backup systems

- **Diesel generators** are typically N+1 for Tier III and 2N for Tier IV. Fuel storage covers 24–48 hours.
  - Installed cost is about **₹1,500–2,500/kVA**, including synchronising panels, acoustic enclosures and fuel systems. This is an estimate, not verified.
  - A 20 MW IT colo at PUE 1.5 needs about 42 MVA of N+1 DG. At about ₹2,000/kVA that costs about **₹84 crore (₹4.2 crore/MW)**.
- **Lithium-ion UPS batteries** cost more upfront than VRLA but last about 10–15 years against 4–5, and have a smaller footprint.
- **Battery energy storage (BESS)** is increasingly specified for AI campuses. Its job is to smooth synchronous GPU load swings and support green-power firming. We include ₹6 crore/MW for DG plus BESS in Case C.

### 1.7 Networking

- **Fibre and meet-me rooms.** Carrier-neutral meet-me rooms, diverse fibre entries and structured cabling cost about ₹0.3–1 crore/MW of facility capex. Cross-connect revenue makes this one of the highest-margin lines in retail colo.
- **AI fabrics.** InfiniBand or Ethernet back-end networking is **10–15% of cluster cost**. It is part of IT capex, not the building.
- **Subsea proximity.** Mumbai and Chennai host India's cable landing stations. This is a key reason Mumbai holds about 568 MW of the country's 1.4–1.8 GW, per Savills via Houlihan Lokey. Low-latency interconnection there supports retail colo pricing.

### 1.8 Soft costs, interest during construction and contingency

| Item | Typical share | Our base |
|---|---|---|
| Design, permits, project management (PMC), commissioning | 5–8% of hard cost | 5–6% |
| Contingency | 5–10% | 5–6.5% |
| Interest during construction (IDC) | 18–24-month build; ~70% debt at ~9.5%; average 50% drawn | ≈5–6% of facility cost |

### 1.9 Breakdown tables for the three cases

**Common assumptions:** ₹90/US$; 2026 prices; IT MW is critical IT load.

**(a) 20 MW Tier III colocation** (Navi Mumbai/Chennai-type; air-cooled chilled water; 2N electrical, N+1 DG; multi-storey on 5 acres at ₹20 crore/acre)

| Item | ₹ crore/MW | ₹ crore (20 MW) | Share of facility capex |
|---|---|---|---|
| Land (0.25 acre/MW) | 5.0 | 100 | — |
| Shell and core, civil/structural | 8.5 | 170 | 15.2% |
| Electrical (substation share, transformers, switchgear, 2N UPS, PDUs, busway) | 22.0 | 440 | 39.2% |
| Cooling (chillers, towers/adiabatic, CRAH, piping) | 10.0 | 200 | 17.8% |
| Backup (DG N+1 ~42 MVA, fuel) | 4.2 | 84 | 7.5% |
| Fire, BMS/DCIM, security, low-voltage | 2.0 | 40 | 3.6% |
| Networking (meet-me rooms, fibre entry, cabling) | 1.0 | 20 | 1.8% |
| **Hard cost subtotal** | **47.7** | **954** | 85.0% |
| Design, permits, PMC (~6%) | 3.0 | 60 | 5.3% |
| Contingency (~5%) | 2.5 | 50 | 4.5% |
| Interest during construction | 2.9 | 58 | 5.2% |
| **Facility total (excl. land)** | **56.1** | **1,122** | 100% |
| **Total incl. land** | **61.1** | **1,222 (≈US$136M)** | Land = 8% |

The ₹56.1 crore/MW facility cost equals ₹561/W, or US$6.2/W. That is consistent with Turner & Townsend's Mumbai US$6.64/W and the upper half of SBI's ₹50–55 crore/MW once soft costs and IDC are added.

**(b) 50 MW hyperscale build-to-suit** (Hyderabad/Chennai-type; developer delivers shell and M&E, tenant supplies IT; 20 acres at ₹8 crore/acre)

| Item | ₹ crore/MW | ₹ crore (50 MW) | Share of facility capex |
|---|---|---|---|
| Land (0.4 acre/MW) | 3.2 | 160 | — |
| Shell and core | 5.5 | 275 | 14.0% |
| Electrical (incl. 220 kV substation) | 15.5 | 775 | 39.5% |
| Cooling | 7.5 | 375 | 19.1% |
| Backup (DG) | 3.3 | 165 | 8.4% |
| Fire, BMS, security | 1.4 | 70 | 3.6% |
| Networking / meet-me rooms | 0.3 | 15 | 0.8% |
| **Hard cost subtotal** | **33.5** | **1,675** | 85.5% |
| Soft costs (5%) | 1.7 | 85 | 4.3% |
| Contingency (5%) | 1.7 | 85 | 4.3% |
| Interest during construction | 2.3 | 115 | 5.9% |
| **Facility total** | **39.2** | **1,960** | 100% |
| **Total incl. land** | **42.4** | **2,120 (≈US$236M)** | Land = 7.5% |

A **powered-shell-only** variant would cost roughly **₹12–15 crore/MW** (estimate). That covers the building, substation and utility yard, with the hyperscaler fitting its own M&E. The returns profile is then closer to industrial real estate.

**(c) 100 MW AI campus including GPUs** (liquid-cooled; GB300 NVL72-class at ~135 kW/rack; Hyderabad/AP/Devanahalli-type land at ₹5 crore/acre)

| Item | ₹ crore/MW | ₹ crore (100 MW) | Share |
|---|---|---|---|
| Land (0.3 acre/MW, 30 acres) | 1.5 | 150 | 0.4% of total |
| Shell and core | 7.0 | 700 | 9.7% of facility |
| Electrical (400/220 kV substation, high-ampacity busway, UPS) | 28.0 | 2,800 | 38.6% |
| Cooling (CDUs, DLC loops, dry coolers, trim chillers) | 17.0 | 1,700 | 23.4% |
| Backup (DG N+1 + BESS) | 6.0 | 600 | 8.3% |
| Fire, BMS | 2.0 | 200 | 2.8% |
| Network infrastructure (meet-me rooms, fibre) | 1.0 | 100 | 1.4% |
| Soft costs / contingency / IDC | 3.5 / 4.0 / 4.0 | 350 / 400 / 400 | 15.8% |
| **Facility total (excl. land)** | **72.5** | **7,250** | 21.3% of total |
| GPU racks: ~590 × GB300 NVL72 at ~US$4.2M | 223 | 22,300 | |
| Back-end fabric (~12% of cluster) | 32 | 3,240 | |
| Storage, front-end, CPU, management | 11 | 1,080 | |
| **IT total (42,480 GPUs)** | **266** | **26,620** | 78.2% of total |
| **Campus total** | **~340** | **~34,020 (≈US$3.8 billion)** | IT/facility = 3.7× |

Per GPU, the cost is about **US$70k of IT** plus about **₹17.4 lakh (US$19k) of facility and land**. The rack price is the biggest uncertainty. At the US$6.0–6.5M Tom's Hardware figure for GB300, the campus would cost about ₹45,000 crore.

### 1.10 India vs global: what the gap means

Picture a bar chart of US$/W. Tokyo, Singapore and Zurich stand at about 14–15. London and Frankfurt are at 11.6–12. The newer US hubs (Atlanta, Phoenix, Charlotte) are at 9.5–9.9. Mumbai's bar is less than half Singapore's, at 6.64.

The cheaper build does not translate one-for-one into better returns, because Indian rents are also low (section 3.1). Cushman & Wakefield's 2026 guide puts India's construction cost inflation at 3.8% year-on-year, below Turner & Townsend's 5.5% global figure, with some Asia Pacific markets rising above 15%, so India's cost lead is holding rather than narrowing.

---

## 2. OPEX (₹)

### 2.1 Electricity

**State HT/EHT tariffs relevant to data centres** (FY2025–26 orders; energy charge plus demand charge; excludes electricity duty, ToD and fuel adjustments):

| State | Category / voltage | Energy ₹/kWh | Demand ₹/kVA/month | DC-specific relief |
|---|---|---|---|---|
| Karnataka | HT industrial (prior report) | ~6.70 | ~365 | See prior report |
| Maharashtra (MSEDCL) | HT-I(A) Industry | 7.27 | 560 | MERC: 10% wheeling-charge discount for data centres sourcing green power via open access or green tariff. State policy: ₹1/unit tariff subsidy for 5 years for certain new data centre units. MERC's March 2025 multi-year order was later subject to review; verify the current schedule. |
| Tamil Nadu (TNERC) | HT-I | 7.50 | 608 (up from 589) | 100% electricity tax subsidy for 5 years for data centres. Green tariff = 110% of category tariff. ToD: +25% peak, −5% night. |
| Telangana (TGERC) | HT-I(A) at 132 kV / 33 kV / 11 kV | 6.65 / 7.15 / 7.65 | 500 | Data centres pay 60% (wind) / 70% (solar) of conventional cross-subsidy surcharge. |
| Uttar Pradesh, Andhra Pradesh, Gujarat | HT industrial | Not verified in this research (typically ₹7–8) | — | Check UPERC, APERC and GERC orders. Andhra Pradesh hosts Google's planned US$6 billion, 1 GW project. |

**Green open access and RE PPAs.**

- **Firm round-the-clock RE (government auctions):**
  - SECI 1 GW round-the-clock tranche V (issued March 2026, results August 2026): **₹5.25–5.26/kWh** across seven winners, with Juniper Green taking the largest share (230 MW at ₹5.26), fixed for 25 years.
  - SECI RTC-IV, adopted by CERC in November 2025: ₹5.06–5.07.
  - SJVN FDRE-3: ₹4.82–4.91.
  - SECI's 4-hour assured-peak tender (FDRE-IX): ₹5.99.
- **Plain solar or hybrid C&I PPAs:** about ₹3.0–4.5/kWh at the busbar.
- **Charges stacked on top:**
  - **Wheeling:** about ₹0.60 (Maharashtra), ₹0.63 (Gujarat), ₹1.03 (Tamil Nadu).
  - **Cross-subsidy surcharge:** Tamil Nadu ₹1.99 (FY26) and ₹2.06 (FY27); Karnataka ₹2.08.
  - **Additional surcharge:** Tamil Nadu ₹0.54 for December 2024–March 2025.
  - **Banking charges** and **ISTS charges**, which rise as the ISTS waiver phases out.
- **Group captive** structures (with 26% equity in the generator) avoid cross-subsidy and additional surcharge. Landed costs are then about **₹4.5–6.5/kWh**, against about ₹5.5–7.0 for third-party open access in Maharashtra.

The practical conclusion: RE PPAs save about ₹0.8–1.5/kWh against Maharashtra and Tamil Nadu grid supply. They save little against Telangana or Karnataka EHT supply. Their main value is decarbonisation plus a 25-year price lock.

**Annual electricity cost at full design load** (₹ crore/yr; energy plus demand charges only):

- Case A: 20 MW IT × PUE 1.5 = 30 MW, 262.8 GWh, 33 MVA contract demand
- Case B: 50 MW × PUE 1.4 = 70 MW, 613 GWh, 77 MVA
- Case C: 100 MW × PUE 1.25 = 125 MW, 1,095 GWh, 138 MVA

| Tariff | Case A (20 MW colo) | Case B (50 MW hyperscale) | Case C (100 MW AI) | Effective ₹/kWh |
|---|---|---|---|---|
| Karnataka (6.70 + 365) | 190.5 | 444.5 | 794.1 | ~7.25 |
| Maharashtra (7.27 + 560) | 213.3 | 497.5 | 888.8 | ~8.1 (before ₹1 subsidy) |
| Tamil Nadu (7.50 + 608) | 221.2 | 516.1 | 922.0 | ~8.4 (≈8.9 with ToD for a flat load) |
| Telangana 132 kV (6.65 + 500) | 194.6 | 454.0 | 811.0 | ~7.4 |
| Green RTC via group captive (~6.5 + grid demand ~500) | ~190.6 | ~444.8 | ~794.6 | ~7.25 |

Turner & Townsend cites a Mumbai tariff of 6.71 US cents/kWh (about ₹6.0 at its exchange rate), against 10.09 US cents in Shanghai.

**Share of opex.** Electricity is **74%** of total opex in our stabilised colo case. In Case B it is about 84% if the pass-through is included. That is above the 50–70% often quoted, because most other Indian opex lines (labour, land, property tax) are cheap. Houlihan Lokey puts Indian electricity at about US$0.7–0.9M per MW per year (₹6.3–8.1 crore), within total opex of about US$1.0–1.2M/MW/yr. Our Case A is ₹6.45 crore/MW of electricity within ₹8.7 crore/MW of opex.

### 2.2 Water

The prior water report gave about 0.6–1.8 MLD for evaporative cases. Tariff anchors are BWSSB industrial at about ₹99/kL and treated water at ₹10–20/kL. MIDC, CMWSSB and HMWSSB tariffs were not re-verified here.

| Case | Assumed draw | kL/yr | Bill at ₹99/kL | Bill at ₹15/kL (treated) |
|---|---|---|---|---|
| A: 20 MW colo (evaporative) | 0.3 MLD | 109,500 | ₹1.08 crore | ₹0.16 crore |
| B: 50 MW hyperscale | 0.6 MLD | 219,000 | ₹2.17 crore | ₹0.33 crore |
| C: 100 MW AI (hybrid; DLC + dry coolers can be far lower) | 1.0 MLD (up to 1.8) | 365,000 (657,000) | ₹3.6 (6.5) crore | ₹0.55 (0.99) crore |

Water is **under 2% of opex**. Its cost is about the licence to operate, not the bill.

### 2.3 Cooling opex

Cooling energy sits inside the electricity line. In Case A it accounts for about a third of non-IT power, roughly ₹20–25 crore a year.

Chiller, tower and CRAH maintenance is part of the maintenance contracts (AMC). Water treatment chemicals and blowdown add about ₹0.4–0.6 crore a year for an evaporative 20–50 MW site (estimate).

### 2.4 Maintenance

- **AMC:** about **1.5–3% of M&E capex** per year. We use 2.0% (Case A, ₹15.3 crore), 1.75% (Case B, ₹24.2 crore) and 2.0% (Case C facility, ₹106 crore).
- **DG fuel and testing:** monthly load tests and annual full-load runs cost about ₹1.5–3 crore a year.
- **Lifecycle replacement:** UPS batteries, fans, VFDs and chiller overhauls. We reserve about 1% of M&E capex a year below EBITDA.

### 2.5 Personnel

**Staffing per MW (estimates).**

- About 60 FTE for a 20 MW colo (3/MW), including outsourced facility management, security and housekeeping.
- About 70 for a 50 MW hyperscale site (1.4/MW).
- About 150 for a 100 MW AI campus (1.5/MW, including GPU fleet operations).

A sanity check: provident-fund (EPFO) filings show Nxtra with only about 231–263 direct employees in 2025 for about 300 MW. Facility management and security are usually outsourced. Direct headcount therefore understates on-site staffing.

**Indian salary markers.**

| Role | Pay | Source |
|---|---|---|
| Data centre critical-facilities engineer | ~₹20.8 lakh average; ₹14.8 lakh at 1–3 years | SalaryExpert, Aug 2026; modelled, likely high |
| NOC engineer | Median ₹4.18 lakh (₹3.1–6.0 lakh interquartile) | Glassdoor India, Jun 2026 |
| NOC engineer | Median ₹4.05 lakh | PayScale, Apr 2026 |
| Data centre manager | Median ₹8.62 lakh (75th percentile ₹20 lakh) | PayScale; large-campus heads earn far more (estimate ₹30–60 lakh) |
| Security guard, Mumbai/Thane | Statutory cost ₹32,315/month per head for 8-hour duty (≈₹3.9 lakh/yr) | Maharashtra Security Guards Board wage order, Jan–Jun 2026 |

**Personnel cost.** We use a loaded average of about ₹12.5 lakh per FTE. That gives ₹7.5 crore/yr for Case A, ₹8.5 crore for Case B and ₹25 crore for Case C. Personnel is about 4–5% of colo opex.

### 2.6 Network costs

- **IP transit.** TeleGeography (September 2026) puts the weighted-median 100GigE IP transit price in Mumbai at **US$0.97/Mbps/month (≈₹87)**. That is down about 35% a year compounded over three years, but still 3.7× Singapore's US$0.26. Smaller 10G commits cost more per Mbps.
- **Enterprise leased lines.** 1 Gbps internet leased lines run about ₹70,000–2,50,000 a month (₹70–250/Mbps), per vendor sources of low quality.
- **Cross-connects.** Indian fees are not published. Global norms are US$100–300 a month, and Equinix's global average is about US$254 per interconnection per month. We assume about ₹5,000–15,000 a month in India (estimate).
- **Dark fibre** is priced per route-km on IRU terms and was not researched here.
- For the operator, network opex is small (about ₹1 crore a year in Case A). In a carrier-neutral facility, carriers pay to be present.

### 2.7 Property tax, insurance, security and SG&A

- **Insurance:** about 0.15–0.25% of replacement value. That is ₹2.2 crore (A), ₹3.5 crore (B) and ₹68 crore (C, where GPUs dominate the insured value).
- **Property tax and local levies:** about ₹1.5–5 crore (estimate; varies by municipality and SEZ status).
- **Security:** included in personnel.
- **SG&A:** about 3–5% of revenue for wholesale and colo.

### 2.8 Opex tables per case (stabilised year)

**Case A: 20 MW colo.** 90% billed (18 MW); average IT draw 70% of billed (12.6 MW); PUE 1.5; blended energy ₹6.6/kWh (grid plus partial RE).

| Line | ₹ crore/yr |
|---|---|
| Electricity (165.6 GWh × ₹6.6 = 109.3, plus demand charges 19.8) | 129.0 |
| Water | 0.6 |
| Water treatment and chemicals | 0.4 |
| AMC (2% of ₹764 crore M&E) | 15.3 |
| DG fuel and testing | 1.5 |
| Personnel (60 FTE) | 7.5 |
| Insurance | 2.2 |
| Property tax and levies | 1.5 |
| Network | 1.0 |
| SG&A | 15.0 |
| **Total opex** | **174.0** |
| **₹/kW/month (on 20 MW built)** | **₹7,250 (₹1,875 excluding power)** |

**Case B: 50 MW hyperscale.** 95% billed; IT draw 75% (35.6 MW); PUE 1.4; ₹6.2/kWh; power passed through to the tenant.

| Line | ₹ crore/yr |
|---|---|
| Electricity (437 GWh × ₹6.2 = 271, plus demand 33), passed through | 304.0 |
| Water | 1.2 |
| AMC (1.75% of ₹1,385 crore) | 24.2 |
| DG fuel and testing | 2.5 |
| Personnel (70 FTE) | 8.5 |
| Insurance / property tax / network | 3.5 / 2.5 / 0.5 |
| SG&A | 10.0 |
| PUE-overrun and SLA reserve | 5.0 |
| Chemicals | 0.6 |
| **Total opex (non-power)** | **58.5** |
| **Total including pass-through power** | **362.5** |
| **₹/kW/month** | **₹6,040 total; ₹975 non-power** |

**Case C: 100 MW AI campus.** IT draw 80%; PUE 1.25; RE-RTC-led supply at ₹6.0/kWh.

| Line | ₹ crore/yr |
|---|---|
| Electricity (876 GWh × ₹6.0 = 526, plus demand 66) | 592 |
| Water | 2 |
| Facility AMC (2% of ₹5,300 crore M&E) | 106 |
| GPU/IT support and spares (1% of IT capex) | 266 |
| Personnel (150 FTE) | 25 |
| Insurance | 68 |
| Network, backbone, transit | 20 |
| Property tax | 5 |
| SG&A | 100 |
| DG | 3 |
| **Total opex** | **1,187** |
| **₹/kW/month** | **₹9,890 (facility-only ≈ ₹7,675)** |

---

## 3. Unit economics

### 3.1 ₹ per MW: capex, revenue, EBITDA, payback, IRR, valuation

**Colocation pricing in India.**

| Segment | Price | Source |
|---|---|---|
| Mumbai, 250 kW–1 MW | ₹7,000–10,000/kW/month | Cushman & Wakefield H1 2025 (standard 5–7 kVA racks) |
| Mumbai, 1–5 MW | ₹6,500–8,000 | Cushman & Wakefield H1 2025 |
| Mumbai, 5 MW+ | ₹6,000–7,500 | Cushman & Wakefield H1 2025 |
| Chennai, 1–5 MW | ₹7,000–8,000 | Cushman & Wakefield H1 2025 |
| Sub-250 kW, secondary hubs | ₹7,000–9,500 | Cushman & Wakefield H1 2025 |
| India average rent | US$80–100/kW/month (₹7,200–9,000) | Houlihan Lokey |
| North America wholesale (250–500 kW), for comparison | US$196.25/kW/month (+6.6% year-on-year), about 2× India | CBRE, H2 2025 |

Realised revenue per MW from company data:

- Sify Infinit Spaces: FY25 revenue ₹1,428 crore and EBITDA ₹634 crore (44.4% margin) on 188 MW built and about 127 MW sold. That is ≈₹11 crore per sold MW per year, including power.
- An industry roll-up reported by Outlook Business puts Sify at about ₹5,699/kW/month and Iron Mountain at about ₹8,445/kW/month, with about ₹11,200 crore of industry revenue on 1,520 MW.
- Anant Raj's management guides colo revenue of ₹90 lakh/MW/month (₹9,000/kW) against opex of ₹15 lakh/MW/month.

**Per-MW economics by case (stabilised).**

| Metric | A: 20 MW colo | B: 50 MW hyperscale build-to-suit | C: 100 MW AI neocloud |
|---|---|---|---|
| Capex/MW, facility only | ₹56.1 crore | ₹39.2 crore | ₹72.5 crore |
| Capex/MW incl. land and IT | ₹61.1 crore | ₹42.4 crore | ~₹340 crore |
| Pricing assumption | ₹7,000/kW/mo rent + power at cost +10% | ₹6,250/kW/mo + power at cost | ₹400/GPU-hr at 80% utilisation (assumption) |
| Revenue (₹ crore/yr) | 301 (rent 151 + power 142 + other 8) | 660 (rent 356 + power 304) | 11,908 |
| Opex (₹ crore/yr) | 174 | 362.5 | 1,187 |
| EBITDA (₹ crore/yr) | 127 (42% margin) | 298 (45% of gross; 84% of rent) | 10,721 (90%) |
| EBITDA per MW per year | ₹6.35 crore | ₹5.96 crore | ₹107 crore |
| Yield on cost (EBITDA ÷ capex) | 10.4% | 14.0% | 31.5% (but GPUs last ~5 years) |
| Simple payback | ~9.6 years | ~7.1 years | ~3.2 years |
| Unlevered pre-tax IRR (method below) | **~9.5%** | **~14.7%** | **~21.5%** at 80% / ~10.5% at 60% / negative at 40% |

**IRR method.**

- Cases A and B: 15-year hold. A ramps 40% → 75% → 100%; B ramps 70% → 100%. Lifecycle reserve of 1% of M&E. Exit at an 8.5% cap rate (A) or 7.5% (B).
- Case C: 5-year GPU life. Residual value of about ₹8,160 crore (facility net book plus 10% GPU salvage).

**Interpretation.** At ₹7,000/kW/month, a new ₹61 crore/MW Tier III colo earns about its cost of capital. Each ₹1,000/kW/month of extra rent adds about ₹21.6 crore of EBITDA, about 1.8 points of yield and about 2 points of IRR:

- ₹8,000/kW/month gives an IRR of about 11.5%.
- ₹9,000/kW/month gives about 13.5%.

Pre-leased hyperscale wins on capital intensity and instant lease-up, even at lower rents. These IRRs are pre-tax and before the 20-year tax holidays proposed in the draft national data centre policy (unverified secondary source). Leverage at 8–10% debt adds little when project IRRs are only 9.5–11%.

**Valuations (EV/MW and EV/EBITDA).**

| Data point | Implied value |
|---|---|
| Nxtra, March 2026: US$1 billion raise (Alpha Wave US$435M, Carlyle US$240M, Anchorage US$35M, Airtel about US$290M) at **US$3.1 billion post-money**; before the deal Airtel held 75.96% and Carlyle the rest; about 300 MW, targeting 1 GW | ~US$7M/MW pre-money (≈₹63 crore/MW); ~US$10M/MW post-money |
| Earlier Nxtra reference points | Carlyle invested in 2020 at a US$1.2 billion valuation. April 2025 reports of Alpha Wave buying Carlyle's 24% stake implied ₹20,500 crore (US$2.4 billion) for 100%. |
| Houlihan Lokey cap rates: India 7.5–8.5%; US 4.5–6.5%; Singapore 5.0–6.5% | Stabilised Indian assets at about 12–13× EBITDA (Case A at 8% → about ₹1,590 crore of value vs ₹1,222 crore cost, 1.3×; Case B at 7.5% → about ₹3,970 crore vs ₹2,120 crore, 1.9×) |
| Sify Infinit Spaces DRHP (Oct 2025): ₹3,700 crore IPO (₹2,500 crore fresh issue); net debt ₹2,324 crore; net debt/EBITDA 3.66× | EV/EBITDA not determinable until pricing |

Lumina CloudInfra (Blackstone), STT GDC India, Yotta and CtrlS valuations were not verified in this research.

### 3.2 ₹ per rack

The facility cost per rack scales with density. The wholesale-rent column uses ₹7,500/kW/month.

| Density | Design | Facility ₹ crore/MW | Facility capex per rack | Typical IT per rack | Implied wholesale rent/rack/month |
|---|---|---|---|---|---|
| 6 kW | Air, Tier III | ~58 | ~₹35 lakh | ₹40–80 lakh of CPU servers (estimate) | ~₹45,000 |
| 10 kW | Air + containment | ~55 | ~₹55 lakh | ₹0.8–1.5 crore (estimate) | ~₹75,000 |
| 40 kW | Rear-door heat exchangers / DLC hybrid | ~62 | ~₹2.5 crore | ~4 × H100 HGX ≈ US$1.1M ≈ ₹10 crore | ~₹3.0 lakh |
| 130 kW | DLC (NVL72) | ~72.5 | ~₹9.4 crore | GB300 NVL72 ₹33–58 crore + fabric | ~₹9.75 lakh (₹10.4–11.7 lakh at ₹8,000–9,000/kW) |

**Retail rack pricing in India** (vendor price lists; low-to-medium quality):

- Full 42U racks for space alone list at about ₹25,000–60,000 a month, with power at about ₹8,000–20,000 per kVA per month extra.
- Bundled offers include a 3 kW full rack at ₹50,000 a month and a 5–10 kW Tier III rack in Ludhiana at ₹50,000.
- A 5–8 kW retail rack therefore lands at roughly **₹60,000–1,50,000 a month all-in**. That is about ₹10,000–20,000 per kW-month, **1.5–2.5× wholesale**.

### 3.3 ₹ per kWh: levelised cost of data centre capacity (LCOD)

**Formulas.**

- Annualised capex = Capex × CRF, where **CRF = r(1+r)ⁿ / [(1+r)ⁿ − 1]**.
- Facility at r = 11%, n = 20: (1.11)²⁰ = 8.062, so CRF = 0.11 × 8.062 / 7.062 = **0.1256**.
- Other CRFs used:
  - 10%/20 years: 0.1175
  - 12%/20 years: 0.1339
  - 8%/20 years: 0.1019
  - GPUs, 11%/5 years: **0.2706**
  - GPUs, 11%/4 years: 0.3223
  - GPUs, 11%/6 years: 0.2365
- **LCOD = (Annualised capex + Annual opex) ÷ IT kWh delivered.**

| Case | Annualised capex (₹ crore) | Opex (₹ crore) | IT energy (GWh) | **LCOD (₹/IT-kWh)** | Power cost (₹/IT-kWh) | Power share |
|---|---|---|---|---|---|---|
| A: 20 MW colo (12.6 MW average IT) | 1,222 × 0.1256 = 153.5 | 174.0 | 110.4 | **29.7** (~US$0.33) | 11.7 | 39% |
| B: 50 MW hyperscale, owner view | 2,120 × 0.1256 = 266.3 | 362.5 | 311.9 | **20.2** | 9.7 | 48% |
| C: AI campus, facility only | 7,400 × 0.1256 = 929.4 | ~921 | 700.8 | **26.4** | 8.45 | 32% |
| C: AI campus incl. GPUs | 929.4 + 26,620 × 0.2706 = 8,132 | 1,187 | 700.8 | **133** (~US$1.48) | 8.45 | 6% |

Picture each ₹29.7 IT-kWh in Case A as a stacked bar. About ₹14 is capex recovery, ₹11.7 is electricity and ₹4 is everything else. Running the same hall at full load (175 GWh of IT) cuts LCOD to about ₹22/kWh. Filling the building is worth more than any tariff negotiation.

**Self-build vs lease (hyperscaler view).**

- Owning Case B costs 42.4 × 0.1256 = ₹5.33 crore/MW/yr of capex, plus ₹1.17 crore/MW/yr of non-power opex. That is **≈₹5,415/kW/month**, against leasing at ₹6,250, a saving of about 13%.
- At a hyperscaler's ~8% WACC (CRF 0.1019), the cost falls to **≈₹4,575/kW/month**, a saving of about 27%.
- This explains AWS, Microsoft and Google land purchases in MMR and Hyderabad. They self-build where they can and lease for speed.

### 3.4 Cost per GPU-hour: TCO in India vs market prices

**Assumptions for a neocloud hosting in leased Indian colo.**

- ₹90/$. 5-year life at 11% WACC (CRF 0.2706).
- Server price plus 15% for networking and 3% for storage and management.
- Hosting at ₹7,000/kW/month of IT.
- Power: average draw 80% of nameplate, PUE 1.35 (1.3 for B200), ₹7.0/kWh.
- Operations, software and insurance: ₹70,000–90,000 per GPU per year.
- Formula: **GPU-hour cost at utilisation u = (capex + hosting + ops) ÷ (8,760 × u) + power per hour**.

| ₹/GPU-hour | Capex/hr (at 100%) | **100%** | **80%** | **60%** | **40%** |
|---|---|---|---|---|---|
| **H100** (US$275k HGX → ₹36.5 lakh/GPU all-in; 1.4 kW) | 112.8 | **145** | **177** (US$1.97) | **232** | **343** |
| **H200** (~US$315k HGX → ₹41.8 lakh; 1.4 kW) | 129.1 | **161** | **198** | **259** | **384** |
| **B200** (US$450k HGX → ₹59.7 lakh; 2.0 kW) | 184.5 | **229** | **281** (US$3.12) | **368** | **545** |
| **GB300 NVL72, self-built campus (Case C)** | 193.6 + 25 facility | **251** | **308** (US$3.42) | **404** | **598** |

For a GB300 GPU-hour at 80% utilisation, the ₹308 splits into ₹242 of GPU and network capex, ₹31 of facility, ₹20 of opex and ₹14 of power.

**Market prices (Oct 2026 unless stated).**

| Offer | ₹/GPU-hour | H100 breakeven utilisation vs our cost |
|---|---|---|
| IndiaAI L1 rate, high-end (H100-class); standard GPUs L1 ₹115.85. Users pay about ₹92 after a 40% subsidy, and Union Minister Ashwini Vaishnaw told the Lok Sabha that the average rate across the 34,381 GPUs onboarded from 14 providers is about ₹65/GPU-hr, with H100s at ₹92. | **150** | **~96%** (5-year life); ~86% (6-year life) |
| JarvisLabs H100 | 217.89 | ~64% |
| Global OCPI-H100 index (2 Oct 2026): US$2.79 | ~251 | ~55% |
| E2E Networks H100 on-demand | 255.55 | ~54% |
| Yotta Shakti H100, dedicated (₹1,96,113/month) | ~269 | ~52% |
| Yotta Shakti H100 on-demand | 356 | ~39% |
| E2E H200 on-demand / 3-month+ commitment | 379.05 / 189.20 | H200: ~41% / ~84% |
| B200, global neocloud on-demand, US$3.70–6.00 | ~333–540 | B200: ~67% / ~41% |
| Hyperscaler H100 on-demand (AWS/Azure/GCP), US$6–12 | ~540–1,080 | Scarcity and convenience premium |

**What this means.**

1. **IndiaAI rates sit at fully loaded cost.** Providers clear ₹150/hr only with near-full utilisation, 6-year lives, or hardware bought cheaper (at ₹83–85/$ in 2024 or at lower prices). The subsidy makes Indian sovereign compute cheap for users, but it is a thin-margin business for providers.
2. **Commercial on-demand pricing in India (₹218–356) leaves healthy margins at 50–65% utilisation.**
3. **Global prices are no longer falling uniformly.** SemiAnalysis's 1-year H100 contract index rose about 40%, from US$1.70 (October 2025) to US$2.35 (March 2026). The OCPI spot index is about US$2.5–3.0. The "steady decline" story describes 2024–25, not 2026.
4. **Why our costs run higher than some published teardowns.** Silicon Analysts estimates about US$1.45/hr all-in for an H100 at 70% utilisation, and Data Gravity about US$2.56–2.88 for GB300 at 80–90%. Those use straight-line depreciation with residual value. We use capital recovery at an 11% WACC. Indian cost of capital adds roughly US$0.3–0.5 per GPU-hour.

**Case C breakeven and returns.** The breakeven contracted price is about ₹308/hr at 80% utilisation, ₹404 at 60% and ₹598 at 40%. At an assumed ₹400/hr:

- 80% utilisation: IRR ~21.5%
- 60% utilisation: ~10.5%
- 40% utilisation: negative

The AI neocloud is a leveraged bet on utilisation and on the next-generation price curve.

### 3.5 Sensitivity analysis

| Driver | Change | Case A (colo) | Case C (GB300 GPU-hour at 80%; base ₹308) |
|---|---|---|---|
| Tariff | ±₹1/kWh | LCOD ±₹1.5/IT-kWh. EBITDA ±₹16.6 crore if power is bundled; only ±₹1.7 crore if passed through at cost +10% | ±₹2.9/hr |
| Utilisation | A billed 70% vs 90%; C 60% / 40% | EBITDA −₹34 crore (yield 7.6%); LCOD ≈ ₹35 | ₹404 / ₹598 |
| PUE | A 1.5→1.35; C 1.25→1.15 | Power −10% (≈₹12.9 crore/yr); LCOD −₹1.2 | −₹1.3/hr |
| Cost of capital | WACC 10% / 12% | LCOD ₹28.8 / ₹30.6 (annualised capex ₹143.6 / ₹163.6 crore) | ₹301 / ₹314 |
| FX | ₹90 → ₹95/$ | Facility capex +~2% (≈₹1.1 crore/MW; imported share ~35–40%, estimate) | +₹13.5/hr |
| Import duties | Hypothetical 10% basic duty + surcharge on servers; or IGST not creditable | — | +₹26.6/hr; or +₹43.6/hr |
| GPU life | 4 / 6 years (H100 at 80%) | — | H100 ₹204 / ₹159 (base ₹177) |

**Ranking the drivers.** For colo and hyperscale, the order of importance is utilisation and rent, then capex per MW and WACC, then PUE and tariff. Tariff ranks last only when power is passed through. For AI it is utilisation, then rack price and GPU life, then WACC and FX, then tariff.

### 3.6 Comparing models and markets

**India vs US vs Singapore** (Houlihan Lokey using Cushman & Wakefield/CBRE; Turner & Townsend; CBRE)

| Metric | India | US | Singapore |
|---|---|---|---|
| Build cost, Turner & Townsend (US$/W) | 6.64 (Mumbai) | 9.5–13.3 | 14.5 |
| Development cost (US$M/MW) | 5.5–8.5 | 9–12 (Cushman & Wakefield 2026 US average US$17.6M all-in) | 9–14.5 |
| Rent (US$/kW/month) | 80–100 | 160–225 (CBRE wholesale US$196) | 300–475 (retail-skewed) |
| Electricity (US$M/MW/yr) | 0.7–0.9 | ~1.22 | ~1.7 |
| Total opex (US$M/MW/yr) | 1.0–1.2 | 5.0–5.5 as reported by Houlihan Lokey (looks inconsistent; treat with caution) | 2.0–2.4 |
| Cap rate | 7.5–8.5% | 4.5–6.5% | 5.0–6.5% |
| Gross rent ÷ capex | ~15% | ~22% | very high (retail mix) |

India builds at about half the US cost. It rents at about half the US price and is valued at higher cap rates. Its unit margins are therefore thinner, not fatter. India wins on growth, data localisation under the DPDP Act, and cheaper land and labour, not on spread.

**Colo vs hyperscale self-build vs AI neocloud**

| | Colocation (A) | Hyperscale build-to-suit / self-build (B) | AI neocloud (C) |
|---|---|---|---|
| Capex intensity | ₹61 crore/MW | ₹42 crore/MW | ₹340 crore/MW |
| Revenue driver | ₹/kW rent + cross-connects | Long-term ₹/kW lease (or avoided rent) | ₹/GPU-hour × utilisation |
| Margin / return | 42% EBITDA; IRR ~9.5–13.5% depending on rent | 84% of rent; IRR ~14–15%; self-build 13–27% cheaper than leasing | 90% EBITDA but 5-year asset; IRR −ve to ~21% |
| Power share of cost | ~39% of LCOD | ~48% | ~6% |
| Key risk | Lease-up and rate pressure | Tenant concentration, pricing power | Utilisation, GPU price deflation, obsolescence |

---

## Recommendations

1. **Developers of colo (Case A-type).**
   - Underwrite to **₹7,700–8,200/kW/month or better**, or a facility cost of **≤₹50 crore/MW**.
   - Phase the M&E fit-out to match leasing rather than building all 20 MW on day one.
   - Push cross-connect and interconnection density. That is where retail colo earns its premium over the 9.5% base-case IRR.
2. **Hyperscale build-to-suit (Case B-type)** is the best risk-adjusted Indian data centre return available in this model, at about 14–15% unlevered on pre-lease. Lock the PUE caps and power pass-through clauses in contracts. Each 0.1 of PUE overrun costs the operator about ₹22 crore a year at 50 MW if it absorbs the overrun.
3. **Power procurement.**
   - In Maharashtra and Tamil Nadu, pursue **group captive RE or RTC** to avoid ₹2+/kWh of cross-subsidy and additional surcharge. Claim MERC's 10% wheeling discount and the state subsidies (₹1/unit in Maharashtra; electricity tax relief in Tamil Nadu).
   - In Telangana or Karnataka, buy RE for decarbonisation and price certainty, not for savings.
4. **AI neoclouds and GPU buyers.**
   - Do not buy GPUs without **contracted utilisation of at least 60–70%**. Below about 55%, renting from the Indian market at ₹218–256/hr beats owning an H100.
   - Model with capital recovery at your real WACC, not straight-line depreciation.
   - For IndiaAI empanelment, bid only with fully depreciated or cheaply acquired fleets. ₹150/hr is a cost-recovery price.
   - Budget the IGST working-capital drag (about 14% of IT capex carried for 2+ years in our case).
5. **Investors.** Platform deals near **US$7M per operating MW** (Nxtra pre-money) roughly equal replacement cost. Pay up only for secured power, land banks and hyperscale pre-leases. Those are the scarce inputs, not concrete and chillers.

---

## Caveats

- **The case models are illustrative bottom-up estimates.** The three cases are built from the cited benchmarks plus our own assumptions. Line items marked "estimate" were not verified against Indian tenders or filings in this research. These include DG ₹/kVA, sq-ft costs, CPU server prices, staffing ratios, H200 server price, cross-connect fees, and land in Noida, Bengaluru and Pune.
- **Contested figures.**
  - GB300 NVL72 rack price: US$3.7–6.5M, with analysts disagreeing.
  - GPU economic life: 4–6 years.
  - The Maharashtra tariff, given MERC's subsequent review order.
  - Houlihan Lokey's US opex figure, which looks internally inconsistent.
  - Chennai land prices, which come from a low-quality blog.
  - The Cushman & Wakefield (2026) India per-MW range, taken via a secondary summary.
- **Not covered here.** The following were not reviewed, and their figures should be checked before investment use:
  - Uttar Pradesh, Andhra Pradesh and Gujarat tariff orders
  - MIDC, CMWSSB and HMWSSB water tariffs
  - Lumina/Blackstone, STT GDC, Yotta and CtrlS valuations
  - ICRA, CRISIL and CareEdge reports
  - Morgan Stanley and Jefferies notes
  - Techno Electric, RailTel and Netweb filings
- **Model choices affect the results.**
  - All IRRs are pre-tax and unlevered.
  - Tax holidays under the draft national data centre policy (reported at up to 20 years, via an unverified secondary source) would raise post-tax returns materially.
  - FX is set at ₹90/$. Some 2026 sources use about ₹95.6, which would raise USD-denominated capex by about 6%.
  - GPU market prices move weekly; the H100 index moved 4.5% in a single day in early October 2026.

## Sources

1. <http://cdn.hl.com/pdf/2025/real-estate-highlight-data-center-india-edition.pdf>
2. <https://merc.gov.in/wp-content/uploads/2025/03/Press-Note_MSEDCL-MYT-Order_English.pdf>
3. <https://www.mercomindia.com/tamil-nadu-hikes-fy-2026-electricity-tariffs-by-3-16>
4. <https://tgsouthernpower.org/resources/PDF/Tariffs/63tarifffile.pdf>
5. <https://www.mercomindia.com/tamil-nadu-issues-multi-year-electricity-tariff>
6. <https://pwrnxt.in/blog/tamil-nadu-ci-tariff-decoded>
7. <https://www.outlookbusiness.com/corporate/airtels-nxtra-raises-1-bn-from-alpha-wave-carlyle-and-anchorage-capital>
8. <https://www.forbesindia.com/article/news/airtel-draws-1-billion-for-data-centre-arm-nxtra/2992685/1>
9. <https://reports.turnerandtownsend.com/data-centre-construction-cost-index-2025/data-centre-cost-trends>
10. <https://realtynmore.com/mumbai-worlds-second-cost-effective-region-for-data-centre-construction-in-2025-says-turner-townsend/>
11. <https://www.techi.com/data-center-cost-by-country/>
12. <https://www.constructionweekonline.in/business/mumbai-second-most-cost-efficient-for-data-centre-construction-worldwide-study>
13. <https://www.stocktitan.net/news/CWK/cushman-wakefield-releases-2026-data-center-development-cost-guide-xf33r13eb1oh.html>
14. <https://www.gurufocus.com/news/9066943/cushman-wakefield-releases-2026-data-center-development-cost-guide-citing-21-rise-in-permw-construction-costs>
15. <https://www.cbinsights.com/company/nxtra-by-airtel>
16. <https://www.valueresearchonline.com/stories/228694/anant-raj-data-centre-execution-delay-investment-risk/>
17. <https://firstprinciplesinvesting.substack.com/p/anant-rajs-data-centre-demerger-fact>
18. <https://recipe.finology.in/discover/premium-stock-research/anant-raj-data-center-expansion>
19. <https://www.business-standard.com/amp/industry/news/stt-global-data-centres-acquires-land-in-navi-mumbai-for-282-crore-126060500949_1.html>
20. <https://www.business-standard.com/article/companies/canada-s-brookfield-to-buy-30-acre-land-in-navi-mumbai-for-rs-600-crore-121081101870_1.html>
21. <https://www.datacenterdynamics.com/en/news/aws-to-buy-45-acres-of-land-for-data-center-near-mumbai-report/>
22. <https://www.datacenterdynamics.com/en/news/amazon-data-services-leases-4-acres-in-mumbai-in-india/>
23. <https://medium.com/kushal-dev-rathi/data-centre-land-investment-risks-india-the-complete-risk-management-blueprint-ab0dbfd85de0>
24. <https://www.cbinsights.com/investor/rmz-corp>
25. <https://www.slideshare.net/slideshow/asia-pacific-data-construction-cost-guide-2025-pdf/277700237>
26. <https://intuitionlabs.ai/articles/data-center-gpu-pricing-2026>
27. <https://www.opslyft.com/blog/nvidia-h100-gpu-pricing-2026>
28. <https://www.cloudzero.com/blog/h100-gpu-cost/>
29. <https://valueaddvc.com/blog/nvidia-h200-vs-b200-vs-gb200-which-gpu-cluster-is-worth-the-price-in-2026>
30. <https://intuitionlabs.ai/articles/data-center-gpu-prices>
31. <https://siliconanalysts.com/analysis/nvidia-b200-blackwell-cost-breakdown>
32. <https://www.spheron.network/blog/gb300-nvl72-vs-gb200-nvl72-pricing-availability-2026/>
33. <https://gpusmith.com/articles/en/nvidia-ai-gpu-price-index-trends>
34. <https://www.techspot.com/news/103994-nvidia-blackwell-server-cabinets-could-cost-somewhere-around.html>
35. <https://www.datagravity.dev/p/how-much-does-an-nvidia-nvl72-cost>
36. <https://rdp.in/gpu-mart/knowledge-base/ai-workstation-tco-india-duties-gst-cloud-crossover/>
37. <https://deepbeez.com/import-duty/import-duty-on-graphics-card-in-india>
38. <https://rawcompute.in/blog/gst-gpu-imports-india/>
39. <https://www.patronaccounting.com/blog/how-to-import-computer-hardware-in-india>
40. <https://encoradvisors.com/data-center-cost/>
41. <https://www.gigaenergy.com/blog/how-much-does-it-cost-to-build-an-ai-data-center>
42. <https://www.irecruit.co/insights/data-center-construction-cost-per-mw-2026-benchmarks-owners>
43. <https://cushwake.cld.bz/Data-Center-Development-Cost-Guide-2025/8-9/>
44. <https://silvrfish.com/blog/how-much-does-it-cost-to-build-a-data-center/>
45. <https://law.asia/india-data-centre-infrastructures/>
46. <https://www.bharatsmartservices.com/blogs/telangana-ht-electricity-tariff-2024-25>
47. <https://www.saurenergy.com/solar-energy-news/cerc-adopts-tariff-for-secis-420-mw-round-the-clock-renewable-energy-projects-10814151>
48. <https://www.pv-magazine.com/2026/08/24/seci-discovers-inr-5-99-kwh-tariff-for-4-hour-peak-renewable-power/>
49. <https://qbitsenergy.com/blog/open-access-solar-india-explained/>
50. <https://www.mercomindia.com/additional-surcharge-nadu-increased-to-%E2%82%B90-54-kwh>
51. <https://reclimatize.in/green-open-access-rules-industrial-route/>
52. <https://reclimatize.in/india-open-access-renewable-electricity-landed-cost-state/>
53. <https://tracxn.com/d/legal-entities/india/nxtra-data-limited/__PEN_luByy9cYT4bZPeX_sMhHYUdXyqCu_POBGlAspaw>
54. <https://www.thecompanycheck.com/company/nxtra-data-limited/U72200DL2013PLC254747>
55. <https://www.salaryexpert.com/salary/job/engineer-data-center-critical-facilities/india>
56. <https://www.glassdoor.co.in/Salaries/noc-engineer-salary-SRCH_KO0,12.htm>
57. <https://www.payscale.com/research/IN/Job=Network_Operations_Center_(NOC)_Engineer/Salary>
58. <https://www.payscale.com/research/IN/Job=Data_Center_Manager/Salary/45a33afe/Facility-Maintenance-%26-Coordination>
59. <https://brytegf.com/blog/security-guard-board-rates-mumbai-thane-2026/>
60. <https://resources.telegeography.com/ip-transit-pricing-trends-asia>
61. <https://internetexpress.co.in/1-gbps-leased-line-cost-in-india/>
62. <https://dgtlinfra.com/cross-connects-interconnection-services/>
63. <https://assets.cushmanwakefield.com/-/media/cw/apac/india/insights/indiadatacentreupdateh12025v4.pdf?rev=4a5dd53b2388421ea3935afb03302def>
64. <https://brightlio.com/colocation-pricing/>
65. <https://www.angelone.in/news/ipos/sify-infinit-spaces-files-drhp-for-3-700-crore-ipo-data-centre-expansion-in-focus>
66. <https://www.medianama.com/2025/10/223-sify-infinit-spaces-3700-cr-ipo-india-data-centre/>
67. <https://www.marketbeat.com/instant-alerts/sify-technologies-q3-earnings-call-highlights-2026-01-13/?.tsrc=rss>
68. <https://www.outlookbusiness.com/corporate/india-will-soon-get-its-first-listed-data-centre-sify-infinit-spaces-plans-500-mn-ipo>
69. <https://www.imarcengineering.com/blog/data-center-development-in-india>
70. <https://www.datacenterdynamics.com/en/news/alpha-wave-global-looks-to-acquire-minority-stake-in-airtels-nxtra-data-center-unit-report/>
71. <https://www.business-standard.com/article/markets/bharti-airtel-up-2-as-carlyle-grp-to-buy-25-stake-in-co-s-data-centre-bi-120070100489_1.html>
72. <https://ipowatch.in/sify-infinit-spaces-files-ipo-drhp/>
73. <https://www.businesstoday.in/markets/ipo-corner/story/data-center-firm-sify-infinit-spaces-files-drhp-with-sebi-for-rs-3700-crore-ipo-498814-2025-10-17>
74. <https://cyfuture.cloud/kb/colocation/full-rack-colocation-pricing-from-top-indian-data-centers>
75. <https://www.serverbasket.com/shop/colocation-data-center-pricing-list/>
76. <https://www.profileits.com/colocation-rackspace-data-center-in-punjab-india/>
77. <https://jarvislabs.ai/blog/h100-price-india>
78. <https://data.ornn.com/markets/h100-sxm>
79. <https://www.e2enetworks.com/blog/nvidia-h100-price-india>
80. <https://shakticloud.ai/pricing/>
81. <https://www.e2enetworks.com/gpus/nvidia-h200>
82. <https://coloprice.com/guides/h100-rental-prices/>
83. <https://seekingalpha.com/news/4572260>
84. <https://siliconanalysts.com/analysis/gpu-rental-premium-decomposition-2026>
