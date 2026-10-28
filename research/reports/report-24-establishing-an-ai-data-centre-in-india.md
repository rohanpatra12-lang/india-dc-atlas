<!-- Report 24 of the India Data Centre Atlas research series (Establishing an AI data centre in India). Produced with AI-assisted web research, Oct 2026, and kept as written at the time. The atlas standards register (src/data/standards.js) is authoritative where figures differ (for example India grid water 2.9 L/kWh and grid CO₂ 0.675 t/MWh after the October 2026 corrections). -->

# Establishing an AI Data Centre in India and How Conventional Data Centres Serve AI Prompts: Process, Hardware, Cost, Water and Energy (2024–2026 evidence)

Building an AI data centre in India means building a liquid-cooled power-and-heat plant for GPUs, not a bigger server room. Budget about ₹70–95 crore per MW for the facility plus ₹210–330 crore per MW for the GPU systems. Allow 18–36 months where a grid connection is already available, and 3–5 years where a new 220/400 kV connection must be built. Each MW of IT load uses about 8.8 GWh of electricity a year. On-site water ranges from about 0.35 ML a year with liquid cooling and dry coolers to about 12.6 ML a year with cooling towers. Conventional data centres can and do serve AI prompts. They do it efficiently only for small and medium models, by spreading air-cooled GPU servers thinly through halls designed for 8–15 kW per rack. Frontier-scale serving and training need purpose-built liquid-cooled halls.

## TL;DR

- **Cost and time:** Indian conventional Tier III air-cooled builds cost ₹50–55 crore/MW (SBI, April 2026). AI-ready liquid-cooled facilities cost about ₹70–95 crore/MW. GPU systems add about ₹210–330 crore/MW. A 100 MW AI campus is therefore a ₹30,000–42,500 crore (≈US$3.3–4.7 bn) project. Power connection and approvals (environmental clearance above 20,000 m² built-up, grid connectivity, fire, PCB consent) are the critical path, not construction.
- **Energy and water:** a 100 MW (IT) AI hall at 80% load and PUE 1.25 uses about 876 GWh/yr. That equals the electricity use of ~630,000 Indians at the Ministry of Power's 2023-24 per-capita figure of 1,395 kWh. With cooling towers it evaporates about 3.5 million litres/day on site. With closed-loop liquid cooling and dry coolers it uses about 0.1 MLD. The water embedded in grid electricity (1.75–4.4 billion litres/yr at 2.0–5.0 L/kWh) is larger than on-site water in every scenario.
- **Conventional DCs and prompts:** legacy Indian halls (8–12 kW/rack, air-cooled) can host CPUs, L4/L40S cards and one HGX H100/B200 server (10.2–14.3 kW) per rack. That is enough for RAG, embeddings, copilots and models up to ~70B parameters. GB200/GB300 NVL72 racks (120–142 kW) cannot be air-cooled. Serving the same prompt in an air-cooled hall on older GPUs plausibly uses ~2× the energy and ~50× the on-site water of a liquid-cooled Blackwell hall. KPMG's July 2026 India data centre report estimates that only 25–30% of existing Indian capacity can be upgraded to AI standards.

## Key Findings

1. **Power is the product.** Every capex, timeline and siting decision in an AI DC flows from securing tens to hundreds of MVA of firm, high-quality power. In a written Rajya Sabha reply in July 2026, Minister of State for Power Shripad Naik said 26.3 GW of additional AI data-centre load is projected by 2031-32 and is "expected to be integrated into the grid and primarily served by renewable energy capacity". That is almost double the 13.56 GW given in a March 2026 reply. About 17 GW of the pipeline has already applied for connectivity at State Transmission Utilities. Queues, not land, set timelines.
2. **India's facility cost advantage is real, but GPUs swamp it.** Turner & Townsend's 2025–26 index puts Mumbai at US$6.64/W, 51st of 52 markets and second cheapest after Shanghai. JLL's 2026 global shell-and-core average is $11.3 m/MW. Epoch AI's 1 GW model ($37.9 bn) allocates 56% of capex to servers. Cheap Indian concrete saves perhaps ₹30–50 crore/MW on a ₹300–425 crore/MW all-in AI project.
3. **Liquid cooling is mandatory above ~40–50 kW/rack, and it is also the water solution.** HPE's GB200 NVL72 draws 132 kW, of which 115 kW is liquid-cooled and 17 kW air-cooled. A closed-loop liquid plus dry-cooler design cuts on-site water by ~97% versus cooling towers. The cost is somewhat higher energy on hot Indian days.
4. **Approvals are lighter than people assume, but not trivial.** In a written reply to the Rajya Sabha on 6 August 2026 (Unstarred Question No. 2136), MoEFCC said AI data centres "do not, per se, require Environmental Clearance". Prior EC from the State Environment Impact Assessment Authority (SEIAA) is still triggered once built-up area exceeds 20,000 m², which our estimates suggest happens at roughly 35–50 MW of AI IT load.
5. **Conventional halls serve most Indian enterprise AI today, inefficiently.** One DGX B200 at 14.3 kW already exceeds a typical 8–12 kW Indian colocation rack. Operators strand rack space, add containment or rear-door heat exchangers, or bolt on liquid-to-air CDUs. Each step raises PUE and per-prompt energy relative to a purpose-built hall.

## Part 1 — Establishing an AI Data Centre

### 1(a) Process and timeline, step by step

| # | Phase | What happens | Typical India duration | Notes / global comparison |
|---|---|---|---|---|
| 1 | Demand and offtake | Secure an anchor: a hyperscaler build-to-suit, a GPU-cloud tenant (e.g., Together AI contracted L&T Vyoma's Chennai 10,000-GPU B300 cluster in a deal reported at up to $1.57 bn), or sovereign/IndiaAI demand (38,000+ GPUs onboarded; subsidised access at ~US$0.8/GPU-hour per KPMG) | 3–12 months, in parallel with site work | Lenders (SBI) favour "operator-led greenfield developments with clear tenant visibility" and anchor commitments for a significant share of initial capacity |
| 2 | Site selection | Screen for power (substation headroom, voltage, feeder path), land, water, fibre/subsea landing (17 cables at 14 landing stations, mainly Mumbai and Chennai), latency, flood/seismic/heat risk, policy incentives | 2–6 months | CEEW: power and water availability plus climate risk are the "primary parameters"; 72% of Indian districts are exposed to extreme floods and 57% face high-to-very-high heat risk |
| 3 | Land | Allotment in a state DC park/industrial estate (KIADB, MIDC, SIPCOT, TSIIC, APIIC, UPSIDA/YEIDA) or private purchase with conversion | 2–6 months in a park; 6–18 months for private land | KPMG: Maharashtra and Tamil Nadu offer 25–50% land and stamp-duty subsidies; plug-and-play parks offer single-window clearance |
| 4 | Approvals | See approvals table below | 6–12 months, run in parallel | CEEW: despite single-window systems, stakeholders report delays "in land acquisition, building approvals, grid connectivity, and fire safety clearances" |
| 5 | Power procurement | Connectivity application to DISCOM/STU (66/110/220 kV) or CTU for 400 kV ISTS; build substation and line; green open access/captive RE PPA; BESS | 12–24 months with a ready park substation; 3–5 years for a new 220/400 kV line (estimate) | KPMG: AI-native campuses use on-premise 220 kV GIS substations; operators "often partially fund upstream grid augmentation" |
| 6 | Design | Tier III/IV topology, 2N or block-redundant electrical, liquid cooling plant (CDUs, secondary loops), 7 m slab-to-slab, >2,000 kg/m² floor loading | 4–8 months (overlaps approvals) | Design must target the GPU generation 2–3 years out (Vera Rubin NVL72 ~227 kW/rack) |
| 7 | Construction | Civil/shell → MEP → electrical rooms → mechanical plant → white space | 12–18 months for the first phase | Transformers and switchgear are long-lead items; KPMG flags "transformer shortages today a key constraint" |
| 8 | Commissioning L1–L5 | L1 factory witness tests → L2 site inspection → L3 start-up → L4 functional tests → L5 integrated systems test with heat load banks (including liquid-loop flushing and leak tests) | 2–4 months | Liquid-cooled halls need water-side load banks and coolant chemistry sign-off |
| 9 | GPU procurement and export controls | Order racks; end-user due diligence under US BIS rules | 3–12 months lead time | GB200 lead times 12–24 weeks (vendor); NVIDIA's SEC filing cites "extended lead times of more than 12 months" during shortages |
| 10 | IT fit-out | Rack install, NVLink/InfiniBand/Ethernet cabling (NVL72 has 2,000+ cables per rack), storage, burn-in | 1–3 months per hall | Yotta's 20,736-GPU Blackwell Ultra cluster was slated to go live in August 2026 |
| 11 | Operations and staffing | 24×7 facility team, NOC, IT/HPC ops, security | Ongoing | Our estimate: ~25–40 staff for 10 MW, ~100–150 for 100 MW |

**Bottom line on timing:** in an Indian DC park with a ready 220 kV substation, the first powered hall can be live in 18–24 months. A greenfield site needing a new line or substation is a 3–5 year programme. Phase 1 can be accelerated with interim lower-capacity supply. Global norms are similar on construction (18–24 months) but worse on grid queues in the US and Europe.

**Approvals list (India, Karnataka emphasis)**

| Approval | Authority | Trigger / content | Indicative timing |
|---|---|---|---|
| Land allotment / conversion | KIADB (Karnataka); MIDC; SIPCOT; TSIIC; APIIC; UPSIDA | Park allotment or DC/industrial land-use conversion (Karnataka offers land-conversion exemptions per SBI) | 2–6 months |
| Building plan sanction | Local planning authority / park authority | Floor area ratio (FAR), height, setbacks | 2–4 months |
| Fire NOC (provisional and final) | State Fire & Emergency Services | Before construction and before occupancy; gas suppression, detection, hydrants | 1–3 months each |
| Environmental Clearance | SEIAA (state) | EIA Notification 2006 item 8(a): built-up area >20,000 m² and <1,50,000 m²; item 8(b): ≥1,50,000 m² or ≥50 ha. MoEFCC: AI DCs need no standalone EC otherwise | 4–8 months (estimate) |
| Consent to Establish / Operate | State PCB (KSPCB) under Water Act 1974 and Air Act 1981 | Sewage, cooling blowdown, DG emissions; projects holding an EC no longer need a separate CTE (Nov 2024 notification) | 1–3 months each |
| Groundwater NOC | CGWA (NOCAP portal) / state authority | Required for groundwater abstraction (exempt for MSMEs <10 m³/day); granted only where municipal supply is insufficient; >100 m³/day triggers annual water audit and a 20% reduction target over 3 years | 2–4 months |
| Grid connectivity | DISCOM (e.g., BESCOM) / STU (e.g., KPTCL) / CTU | Load sanction, connection agreement, bay allocation, right-of-way | 12–36+ months |
| Electrical inspectorate energisation | State Electrical Inspector under CEA safety regulations | HT/EHT installations, DG sets | Pre-commissioning |
| Green Energy Open Access | State nodal agency / national portal; SLDC | Eligibility ≥100 kW contract demand (2022 Rules); deemed approved if not processed in 15 days | ~1 month after application |
| DG sets and diesel storage | PCB consent; PESO licence for diesel storage above exempt quantities (typically) | CPCB emission norms; 48-hour fuel reserve = ~156 kL per 10 MW (our estimate) | 2–4 months |
| Aviation height NOC | AAI (NOCAS) | If near an airport | 1–2 months |
| Labour | State labour department | BOCW registration, contract labour licence, Shops & Establishments | 1–2 months |
| Telecom | DoT | Only if providing connectivity services (IP-I registration etc.) | As needed |

### 1(b) Hardware requirements and reference bill of materials

**Core components**

- **Accelerators.**
  - Hopper H100/H200: 700 W class; H200 has 141 GB HBM3e.
  - Blackwell B200: ~1,000 W; 180 GB HBM3e.
  - Blackwell Ultra B300/GB300: ~1,400 W; 288 GB HBM3e.
  - Vera Rubin: ~2,300 W per GPU per industry reporting.
  - AMD MI300X/MI355X and Google TPUs are alternatives, but almost all Indian deployments are NVIDIA.
- **Servers.**
  - HGX/DGX 8-GPU (air or liquid): DGX H100 ≈10.2 kW; DGX B200 ≈14.3 kW with six 3.3 kW PSUs and ~1,550 CFM of airflow; DGX B300 ≈14.5–15 kW.
  - Rack-scale NVL72 (liquid only): GB200 ≈120–132 kW; GB300 ≈132–142 kW; Vera Rubin NVL72 ≈227 kW. GB200 NVL72 carries 13.4 TB HBM3e and 36 Grace CPUs per rack.
- **Storage:** NVMe-based parallel file systems. Yotta's cluster pairs 20,736 GPUs with 40+ PB, i.e., ~2 PB per 1,000 GPUs.
- **Networking:**
  - Scale-up NVLink 5 at 14.4 TB/s per 8-GPU node.
  - Scale-out 800 Gb/s Quantum-X800 InfiniBand (used by Yotta) or Spectrum-X Ethernet, in rail-optimised fat-tree topologies.
  - KPMG specifies 400–800 G optical links and 2 meet-me rooms (MMRs) per floor with 4 diverse fibre entries.
- **Power chain:** 220 kV GIS → HV/MV transformers → MV switchgear → MV/LV transformers → N+N UPS with Li-ion batteries → busways → rack power shelves. 800 V DC distribution is NVIDIA's announced roadmap for Kyber-class (~600 kW) racks.
- **Cooling chain:** cold plates → in-rack manifolds → CDUs (Supermicro's in-row CDU is rated 1.3 MW) → facility water → dry coolers, adiabatic coolers or cooling towers, with chillers for the residual air load. Immersion tanks serve niche >150 kW use cases (KPMG).
- **Other systems:** BESS for ride-through and load smoothing; DG sets (48-hour diesel per KPMG); BMS/DCIM with leak detection; gas suppression; multi-layer physical security.

**Reference BOM — GB300 NVL72 liquid-cooled AI hall (our engineering estimates; assumes ~85% of IT load in compute racks at ~135 kW, the rest in network/storage/management racks; design PUE 1.3, power factor 0.95)**

| Item | 10 MW IT | 50 MW IT | 100 MW IT |
|---|---|---|---|
| NVL72 compute racks | ~63 | ~315 | ~630 |
| GPUs (Blackwell Ultra) | ~4,540 | ~22,700 | ~45,400 |
| Grace CPUs | ~2,270 | ~11,340 | ~22,680 |
| HBM3e (288 GB/GPU) | ~1.3 PB | ~6.5 PB | ~13 PB |
| Alternative: HGX B200 at 4 servers/rack (~57 kW) | ~150 racks / ~4,750 GPUs | ~750 racks / ~23,800 GPUs | ~1,500 racks / ~47,600 GPUs |
| Air-cooled network/storage/management racks (15–30 kW) | ~50–100 | ~250–500 | ~500–1,000 |
| Parallel storage (~2 PB per 1,000 GPUs) | ~9 PB | ~45 PB | ~90 PB |
| Scale-out switches (800G, 144-port) | ~95 (2-tier) | ~800 (3-tier) | ~1,600 (3-tier) |
| Optical transceivers (~2.5–4 per GPU) | ~11–18 k | ~57–90 k | ~113–180 k |
| kW per compute rack | 132–142 | 132–142 | 132–142 |
| White-space area | ~600–900 m² | ~3,000–4,500 m² | ~6,000–9,000 m² |
| Gross building area | ~4,000–6,000 m² | ~20,000–30,000 m² (crosses EIA 8(a) threshold) | ~40,000–60,000 m² |
| Peak facility load (PUE 1.3) | ~13 MW | ~65 MW | ~130 MW |
| Grid connection | ~14 MVA at 66/110 kV | ~70 MVA at 110/220 kV | ~140 MVA at 220 kV (GIS) |
| HV power transformers (N+1) | 2 × 16–20 MVA | 3 × 40–50 MVA | 3–4 × 80–100 MVA |
| MV/LV transformers (2.5–3 MVA) | ~10–12 | ~50–60 | ~100–120 |
| Heat load (≈ IT + losses) | ~10.5–11 MWth (~3,100 TR) | ~53–55 MWth (~15,600 TR) | ~105–110 MWth (~31,000 TR) |
| Of which to liquid (~87%, per HPE's 115/132 kW split) | ~7.3 MWth | ~36 MWth | ~72 MWth |
| CDUs (1.3 MW in-row, N+1) | ~7–8 | ~30–32 | ~60–64 |
| Residual air cooling (CRAH/fan walls + trim chillers) | ~1.5–2 MWth | ~8–10 MWth | ~16–20 MWth |
| DG sets (~2.5 MW each, N+1, full facility backup) | ~7 | ~28–29 | ~55–57 |
| 48-hour diesel storage | ~156 kL | ~780 kL | ~1,560 kL |
| UPS (Li-ion, 5–10 min) | ~10–11 MW | ~50–55 MW | ~100–110 MW |
| Optional grid-forming BESS for load smoothing | ~2–5 MW / 1–2.5 MWh | ~10–25 MW / 5–12 MWh | ~20–50 MW / 10–25 MWh |
| Staff (estimate) | ~25–40 | ~60–100 | ~100–150 |

As a sanity check, Yotta's 20,736 GPUs equal ~288 NVL72 racks, or ~39 MW of compute, hosted in its 60 MW D2 building. That matches the ratios above.

### 1(c) Costs

**Capex per MW of IT load (₹ at ₹90/US$; at ₹95 add ~5.5%)**

| Component / benchmark | India | Global | Source and status |
|---|---|---|---|
| Conventional Tier III air-cooled facility | ₹50–55 cr (~$5.6–6.1 m) | — | SBI sector report, April 2026 (reported) |
| Large-scale conventional facility | ₹35–45 cr | — | SBI (reported; economies of scale) |
| Construction cost index (air-cooled 30–50 MW hyperscale, excl. land/IT) | Mumbai $6.64 m (~₹60 cr); Vizag ~$6.5 m | Tokyo $15.2 m; Singapore $14.5 m; Silicon Valley $13.3 m | Turner & Townsend 2025–26 (reported) |
| India 5-city construction range | $5.9–9.0 m (₹53–81 cr) | — | Cushman & Wakefield APAC 2026, via secondary (reported) |
| India average construction benchmark | ~$7.4 m (~₹67 cr) | — | Invest India, Oct 2026 (reported) |
| AI-ready / immersion / Tier IV facility | up to ₹75 cr (SBI); ₹70–95 cr (industry guide) | Greenfield liquid-cooled >$11 m (~₹99 cr) | SBI; IMARC Engineering 2026; STL Partners May 2026 |
| Shell and core | — | $11.3 m (2026), up from $10.7 m (2025) | JLL 2026 Global Outlook (reported) |
| Facility in a 1 GW AI campus | — | $11.4 m (~₹103 cr) | Epoch AI, May 2026 (stylised model) |
| Servers | — | $21.2 m (~₹191 cr) | Epoch AI |
| Networking | — | $4.9 m (~₹44 cr) | Epoch AI |
| GPU systems, GB300 NVL72 basis (~6.3 racks/MW × $3.7–5.7 m) | ₹210–325 cr | $23–36 m | Our estimate from rack prices below |
| India GPU datapoint: E2E's 1,024 B200 at ₹600–650 cr | ~₹330–355 cr per MW of server load | — | Broker report (Niveshaay); our per-MW conversion |
| All-in AI campus | ₹300–425 cr ($33–47 m) | $37.9 m (~₹341 cr) | Our estimate; Epoch AI |
| Liquid-cooling retrofit of existing hall | ~₹18 cr | ~$2 m | STL Partners (8 interviews; Airedale-sponsored) |

**Project totals (our estimates):**

- 10 MW AI hall: ₹700–950 cr facility + ₹2,100–3,300 cr IT ≈ **₹3,000–4,250 cr**
- 50 MW: **₹15,000–21,000 cr**
- 100 MW: **₹30,000–42,500 cr**

For comparison, TCS's planning ratio cited by Reuters Breakingviews is $1 bn per 150 MW (≈$6.7 m/MW). That ratio clearly excludes GPUs.

**Indicative capex split for an Indian AI-ready facility, excluding IT (estimate):**

| Share | Item |
|---|---|
| 5–10% | Land |
| 15–20% | Civil/shell |
| 40–45% | Electrical (substation, transformers, switchgear, UPS, DGs, busway) |
| 22–33% | Mechanical/cooling |
| 5–8% | Soft costs |

Turner & Townsend data show mechanical rising from ~22% to ~33% of facility cost in liquid-cooled projects. Uptime estimates direct liquid cooling adds 5–10% to new-build capex.

**GPU and rack prices (none are list prices; NVIDIA publishes none)**

- **H100:** commonly quoted at $25–40k per GPU (not independently verified here).
- **DGX/HGX B200 8-GPU server:** ~$400–500k.
- **GB200 NVL72:**
  - ~$3 m (HSBC via Barron's).
  - ~$3.3 m (Heydemann & Maystre, SSRN).
  - $3.1 m bare / $3.9 m all-in (SemiAnalysis, via secondary).
- **GB300 NVL72:**
  - $3–4 m (analyst estimates).
  - $5.0 m to buy and $5.7 m deployed, based on purchase orders (DataGravity, August 2026).
  - $6–6.5 m (press reports).
- **Yotta:** its $2 bn for 20,736 GPUs implies ~$96k per GPU including network, storage and site.

**Opex (per MW IT per year, India; our estimates unless noted)**

| Item | ₹ crore/MW/yr | Basis |
|---|---|---|
| Electricity | 5.3–7.0 | 8.76 GWh (LF 0.8, PUE 1.25) × ₹6–8/kWh; green open access at ₹4–7 landed lowers it |
| Facility O&M | 1.1–1.9 | ~1.5–2% of facility capex |
| Staff | 0.3–0.6 | ~3–4 FTE/MW at small scale, falling with size |
| Water | ~0.1 | 12.6 ML at cooling-tower WUE × ~₹100/kL (assumption) |
| IT depreciation | 42–65 | ₹210–325 cr over 5 years (Epoch uses 5-yr IT, 14-yr facility lives) |
| Facility depreciation | 5–7 | ₹70–95 cr over 14 years |

Two things stand out. Energy is 60–70% of conventional DC opex (CEEW citing DCD), yet in an AI DC depreciation dwarfs it. Epoch's 1 GW model puts annual opex at $907 m (energy $594 m) against $5.0 bn/yr of server depreciation in an $8.5 bn annualised TCO.

**Electricity prices:**

- Turner & Townsend: Mumbai 6.71 US¢/kWh.
- KPMG: India average ~7.5–8 US¢/kWh.
- Tata Power-D HT tariff: ~₹7.46/kWh energy charge + ₹0.78 wheeling.
- ISTS-waiver phase-down: 100% for RE commissioned by 30 June 2025, 75% to June 2026, then 50%, 25%, nil after June 2028 (secondary reporting of MoP orders). This raises green-power landed cost by an estimated ₹0.5–0.6/kWh as it phases out.

**Taxes, duties and incentives:**

- **Customs:** servers, GPUs and parts under HS 8471/8473 carry 0% basic customs duty under ITA-1; 18% IGST applies but is creditable for GST-registered buyers. Network gear can attract 0–10%, and misclassification is a real risk.
- **Union Budget 2026–27:** proposes a tax holiday to 2047 for foreign cloud providers serving India via local resellers.
- **State incentives:**

| State | Main data-centre incentives |
|---|---|
| Uttar Pradesh (2026 policy) | 100% electricity-duty exemption for 10 years; dual-grid supply |
| Maharashtra | ₹1/unit tariff concession for 10 years at ₹30,000 cr investment, or 20 years at ≥₹60,000 cr |
| Gujarat (2026–29) | ₹1/unit for 20 years plus electricity-duty reimbursement |
| Karnataka (2026–31) | Capital subsidy, land, tariff, electricity-duty and wheeling-charge reimbursement; incentives linked to PUE/WUE performance and treated-water use; ₹1,300.45 cr budget; 1 GW target by 2031 |

**TCO per GPU-hour**

| Case | $/GPU-hour | Basis |
|---|---|---|
| GB300 NVL72, global purchase-order basis | 2.56–2.88 at 80–90% utilisation; 3.84 at 60% | DataGravity, August 2026 ($5.7 m deployed, $240–410k/yr opex) |
| GB300 NVL72 self-built in India (estimate) | ~2.4 at 100% → ~2.8 at 85% → ~3.9 at 60% | $5.7 m/72 GPUs over 5 yrs ($1.81) + facility (~$0.16) + power at ₹7/kWh (~$0.18 for 2.34 kW/GPU incl. PUE) + O&M/network (~$0.2–0.3) |
| Market rental benchmarks | GB200 ~$10.50 on-demand (US); E2E B200 ₹430 (~$5.05); E2E H200 ₹300; H100 class $2–3 on-demand | Secondary sources |
| IndiaAI subsidised access | ~0.8 | KPMG |

Utilisation, not electricity price, is the swing factor for Indian GPU clouds. A 25-point drop in utilisation adds more cost than doubling the power tariff.

### 1(d) Water requirement

**Formulas**

- E_IT (kWh/yr) = P_IT × LF × 8,760
- E_facility = E_IT × PUE
- On-site water = E_IT × WUE_site. WUE is defined per IT kWh, which is also Google's convention.
- Off-site (grid) water = E_facility × EWIF, the electricity water-intensity factor (atlas: India 5.0 L/kWh, Karnataka 2.0; Li et al. 3.445). CEA's 3.0–3.5 m³/MWh norm applies to thermal plants only.
- MLD = ML/yr ÷ 365

**Annual water, central case: LF 0.8, PUE 1.25 (IT energy 70.1 / 350 / 701 GWh; facility 87.6 / 438 / 876 GWh)**

| Cooling / factor | WUE or EWIF (L/kWh) | 10 MW: ML/yr (MLD) | 50 MW: ML/yr (MLD) | 100 MW: ML/yr (MLD) |
|---|---|---|---|---|
| Cooling towers, Indian climate (central) | 1.8 | 126 (0.35) | 631 (1.73) | 1,261 (3.46) |
| Cooling towers, range | 1.5–2.5 | 105–175 (0.29–0.48) | 526–876 | 1,051–1,752 (2.9–4.8) |
| Hybrid / adiabatic dry coolers (estimate) | 0.2–0.5 | 14–35 (0.04–0.10) | 70–175 | 140–350 (0.4–1.0) |
| Closed-loop liquid + dry coolers | 0.05 | 3.5 (0.01) | 17.5 (0.05) | 35 (0.10) |
| Immersion + dry coolers | ~0–0.05 | 0–3.5 | 0–17.5 | 0–35 |
| Off-site: Karnataka grid | 2.0 | 175 (0.48) | 876 (2.40) | 1,752 (4.80) |
| Off-site: Li et al. factor | 3.445 | 302 (0.83) | 1,509 (4.13) | 3,018 (8.27) |
| Off-site: India grid (atlas) | 5.0 | 438 (1.20) | 2,190 (6.00) | 4,380 (12.0) |

**Other water uses (estimates):**

- **Construction** (curing, dust suppression): on the order of 1–2 kL per m² built-up, i.e., ~5–10 ML for a 10 MW building over the build period.
- **Domestic:** ~45 L/person/day for 40–150 staff, i.e., 2–7 kL/day, negligible.
- **Fire water:** one-time storage of several hundred m³ per building.
- **DG cooling:** negligible.

**Interpretation:**

- A cooling-tower 100 MW AI hall evaporates ~3.5 MLD, the domestic need of ~23,000 people at 150 L/person/day.
- That exceeds the 1.964 MLD peak attributed to 12 Bengaluru data centres combined, and is above the IEA figure of ~2 ML/day for a "typical 100 MW hyperscale" site cited by CEEW, since that figure implies a lower WUE or load.
- For a Bengaluru-focused atlas, the policy-relevant lever is cooling choice. Karnataka's 2026–31 policy incentivises treated water and WUE.
- Even with zero on-site water, grid water (1.75 billion L/yr at Karnataka's 2.0 L/kWh) remains, and can only be cut with renewable PPAs.

### 1(e) Energy requirement

**Annual energy (GWh/yr)**

| Scenario | LF | PUE | 10 MW | 50 MW | 100 MW |
|---|---|---|---|---|---|
| Inference-heavy, efficient | 0.6 | 1.15 | 60 | 302 | 604 |
| **Central** | 0.8 | 1.25 | **88** | **438** | **876** |
| Training, hot climate / air-assisted | 0.9 | 1.4 | 110 | 552 | 1,104 |

**Grid, cost and population equivalents (central case unless noted)**

| Metric | 10 MW | 50 MW | 100 MW |
|---|---|---|---|
| Peak facility draw (PUE 1.3) | 13 MW | 65 MW | 130 MW |
| Grid connection | ~14 MVA | ~70 MVA | ~140 MVA |
| Electricity cost at ₹7/kWh (grid HT) | ~₹61 cr/yr | ~₹307 cr/yr | ~₹613 cr/yr |
| Electricity cost at ₹5/kWh (green open access) | ~₹44 cr/yr | ~₹219 cr/yr | ~₹438 cr/yr |
| Equivalent Indians at 1,395 kWh per capita (Ministry of Power, 2023-24) | ~63,000 | ~314,000 | ~628,000 |

**Per-GPU energy:**

- GB300 NVL72: ~135 kW/72 = 1.875 kW per GPU slot including CPUs and switches. With PUE 1.25 that is ~2.34 kW, or ~16.4 MWh/yr at 80% load.
- HGX H100 in an air-cooled hall: ~1.28 kW per GPU × PUE ~1.5 = ~1.9 kW.

**Power quality.** AI training produces synchronised load swings, and data-centre loads ride through faults by dropping to backup.

- NERC's January 2025 incident review: a 230 kV fault coincided with ~1,500 MW of data-centre load transferring to backup.
- NERC's Level 3 Essential Actions alert of 4 May 2026 (seven required actions, responses due 3 August 2026) names AI training loads as a forced-oscillation risk. It followed events where >1,000 MW of computational load dropped within seconds.
- CEA issued draft grid-connection technical standards in July 2026.
- **Design response:** grid-forming BESS (~20–50% of IT MW, 15–30 min; our estimate), GPU-level power smoothing, and ride-through settings agreed with the STU.

**Renewables.** RE developers told CEEW that up to ~80% renewable supply is feasible with diversified solar-wind plus battery portfolios. KPMG's AI-native template targets >50% RE. Data-centre operators have announced 3+ GW of RE PPAs.

## Part 2 — How Conventional Data Centres Manage AI Prompts

### What actually happens to a prompt

A prompt goes through these steps:

1. It hits a load balancer or API gateway.
2. It is routed to an inference server (vLLM, TensorRT-LLM or similar).
3. The model's weights are already resident in accelerator memory.
4. The **prefill** phase processes the input tokens; this is compute-bound.
5. The **decode** phase generates output tokens one at a time; this is memory-bandwidth-bound, with a growing KV cache.
6. Many users' requests are **batched** together to amortise the weight reads.

Batching is the main efficiency lever. A CMU-led study measured energy per token for a small MoE model on H200 falling 12.6× from batch 1 to larger batches. Low-traffic enterprise endpoints in conventional halls rarely batch well, so they pay a large per-token energy penalty.

Most Indian consumer prompts (ChatGPT, Gemini) are served from abroad. Indian conventional halls mainly host enterprise copilots, RAG pipelines, embeddings, BFSI fraud and credit models, speech/vision inference, and sovereign or regulated workloads that must stay onshore (DPDP Act, RBI localisation).

### How conventional halls accommodate AI hardware — the retrofit ladder

| Step | What operators do | Practical rack limit | Water/energy effect |
|---|---|---|---|
| 0. CPU inference | Run small/quantised models on Xeon (AMX) / EPYC servers already in the hall | 5–12 kW | No change; low throughput |
| 1. Low-power GPUs | Add L4 (72 W, 24 GB) or L40S (350 W, 48 GB) cards to standard servers | 8–15 kW | Minor |
| 2. Spread high-end servers | One HGX H100 (10.2 kW) or B200 (14.3 kW) per 12–15 kW rack, blanking panels, hot/cold aisle containment, 3-phase high-amp feeds | ~15–20 kW | Stranded space (8–10U used of 42U); fans run harder |
| 3. Supplemental air | Rear-door heat exchangers, in-row coolers, lower supply-air setpoints | ~30–50 kW (H100 air racks ~40 kW per SemiAnalysis) | Chillers work harder → higher PUE; more tower evaporation |
| 4. Liquid-to-air DLC | Direct-to-chip loops with sidecar liquid-to-air CDUs (e.g., Supermicro's 180/240 kW options "for facilities without cooling tower and water supply") | 50–130 kW | Heat still dumped into room air → PUE penalty |
| 5. Facility-water DLC retrofit | Tap chilled/condenser water through facility CDUs; upgrade busway, PDUs and floor loading | 100–200 kW | ~$2 m/MW (STL); PUE approaches new-build levels |
| 6. Rebuild | Purpose-built AI hall | 130–600 kW | Best PUE/WUE |

### Hardware suitability matrix

| Hardware | Unit power | Fits an 8–12 kW legacy rack? | Cooling | Model-size sweet spot | Indicative inference performance |
|---|---|---|---|---|---|
| Xeon 6 / 4th-gen Xeon with AMX (CPU only) | ~0.5–1 kW server (estimate) | Yes | Air | ≤8B quantised; embeddings; classical ML | Llama 2 7B ~230 tok/s at batch 6 on Google C3 (≈$9 per million tokens); Llama 2 70B ~12 tok/s on one Xeon 6 (Intel demo); small quantised models ~57 tok/s with AMX vs ~28 without |
| NVIDIA L4 | 72 W, 24 GB, 0.3 TB/s | Yes (several per server) | Air | ≤13B quantised; vision/speech | Excellent perf/W at low concurrency |
| NVIDIA L40S | 350 W, 48 GB, 0.86 TB/s | Yes (4–8 per server, ~2–4 kW) | Air | 7B–13B; image generation | Llama 3.1 8B: 46 tok/s at batch 1, 336 tok/s at batch 8 (Koyeb) ≈ 0.96 tok/s per W of GPU TDP |
| HGX/DGX H100 (8 GPUs) | 10.2 kW, 640 GB | One per rack, with containment | Air (or DLC) | Up to ~70B FP8; moderate MoE | Llama 3.1 8B on one H100: 99 tok/s at batch 1, 816 tok/s at batch 8 ≈ 1.17 tok/s per W |
| HGX/DGX B200 (8 GPUs) | 14.3 kW, 1,440 GB | Exceeds rack; needs a 15–20 kW position or spreading | Air (10U) or DLC (4U) | Up to 671B MoE in FP8 on one node | B200 used less energy than H100 in 79–88% of matched-latency comparisons (ML.ENERGY); vendor claims 15× H100 inference |
| GB200/GB300 NVL72 | 120–142 kW per rack | No | DLC mandatory (~87% liquid) | Frontier MoE, long context, high-throughput serving, training | Best J/token at scale; 13.4–21 TB HBM per rack |
| Vera Rubin NVL72 | ~227 kW per rack | No | Enhanced DLC | Next-generation frontier | — |

**Memory sets the hard limits:**

- A 70B model in FP16 needs ~140 GB of weights alone. It will not fit on one L40S (48 GB), fits only across several cards, and fits on one H100 only in FP8 with little KV-cache headroom.
- DeepSeek-class 671B models in FP8 need ~700 GB, i.e., an 8×B200 node (1,440 GB) or an NVL72.

**Network needs differ sharply between inference and training:**

- Inference of ≤70B models needs only ordinary 25–100 GbE front-end networking, which conventional halls already have.
- Training and multi-node serving need 400–800 G non-blocking fabrics with thousands of optics.

**When conventional DCs are adequate:**

- Embeddings, RAG retrieval, classification
- Enterprise copilots on 7–70B models
- Fine-tuning small models
- Edge/latency-sensitive inference
- Regulated BFSI workloads

**When purpose-built AI halls are needed:**

- Frontier and large-MoE serving at scale
- Reasoning models with long outputs
- Multi-node inference
- Any training beyond fine-tuning
- Any NVL72-class hardware

### Energy and water per prompt: conventional vs AI hall

Measured anchors:

- Google's median Gemini Apps text prompt (May 2025) used **0.24 Wh** and **0.26 mL** of on-site water under its "comprehensive" boundary, or 0.10 Wh under the narrower existing boundary. Accelerators accounted for 58% of the energy. Google's formula is water = (E_total − E_overhead) × WUE. The study is not peer-reviewed, and prompt length is unspecified.
- OpenAI CEO Sam Altman wrote in his 10 June 2025 blog post "The Gentle Singularity" that an average ChatGPT query uses about 0.34 Wh and "about 0.000085 gallons of water" (~0.32 mL). This is a blog figure, not a formal OpenAI report.
- GPU-only measurements show how much the model and task matter (ML.ENERGY v3, B200):
  - GPT-OSS 120B: 0.04 J/token, ~71 J per response.
  - DeepSeek-R1 on 8 B200: 2.38 J/token, ~26.8 kJ (~7.4 Wh) per reasoning response, about 100× a short chat answer.

**Illustrative comparison: same prompt needing 0.20 Wh of IT energy on B200 (our estimates)**

| Setting | IT energy | PUE | Facility energy | On-site water | Off-site water (KA 2.0 / India 5.0) |
|---|---|---|---|---|---|
| Purpose-built AI hall: B200, DLC + dry coolers (WUE 0.05) | 0.20 Wh | 1.15 | 0.23 Wh | 0.01 mL | 0.46 / 1.15 mL |
| Conventional colo: H100 air-cooled, chillers + towers (WUE 1.8) | 0.31 Wh (B200 ~35% lower energy at matched latency) | 1.5 | 0.46 Wh | 0.56 mL | 0.92 / 2.3 mL |
| Conventional colo, poorly batched enterprise endpoint | ~0.6–3 Wh (3–10× batching penalty) | 1.5 | ~0.9–4.5 Wh | ~1–5 mL | ~2–22 mL |

Serving AI in a legacy air-cooled hall roughly doubles energy per prompt. On-site water rises by about 50× when cooling-tower WUE replaces closed-loop liquid. Poor batching, which is typical of low-volume enterprise endpoints, can matter more than the hall itself.

**PUE and WUE effects:**

- Leading Indian operators report PUE of 1.4–1.5 (SBI). Liquid-cooled AI halls target <1.3 (KPMG); MeitY AI cloud tenders require <1.35.
- Hot spots and lower setpoints in retrofitted halls push chiller energy up. The DGX B200's 10–35 °C inlet envelope leaves little margin in Indian summers.
- Stranded capacity is the hidden cost: a hall designed at 8 kW/rack and filled with 14 kW servers runs out of power and cooling with half its floor empty.

### India examples

- **Yotta:**
  - 20,736 liquid-cooled Blackwell Ultra GPUs (~$2 bn) at its 60 MW D2 building in Greater Noida, expandable to 250 MW.
  - Quantum-X800 InfiniBand at 800 Gb/s and 40+ PB of storage.
  - Navi Mumbai (NM1) campus planned up to 2 GW; earlier H100 capacity was hosted there.
- **L&T Vyoma / E2E Networks (Chennai):**
  - E2E's 1,024 HGX B200 cluster (procured January 2026, ~₹600–650 cr) is hosted in L&T Vyoma's Chennai DC, expanding to 30 MW; L&T is adding 40 MW in Mumbai.
  - E2E's power load is expanding from 4.2 MW to 10.2 MW.
  - Vyoma.AI's 10,000-GPU B300 single-NVLink-fabric cluster is contracted to Together AI.
- **Sify:** India's first NVIDIA DGX-Ready certification for liquid cooling at Mumbai-Rabale (130 kW/rack). Chennai and Noida are certified up to 200 kW/rack (May 2025), with direct-to-chip and rear-door cooling.
- **CtrlS:** AI-ready environments supporting 30 to >100 kW/rack with provisions to 250 kW. Liquid readiness is built into structural layout so density can rise without rebuilds (DCD, March 2026).
- **NxtGen:** 4,096 B200 GPUs (secondary report).
- **STT GDC, NTT, Nxtra, Tata Communications (Vayu), Web Werks, AdaniConneX:** scaling AI-ready capacity, mostly within existing or new halls. STT GDC is reported at up to 120 kW/rack (weak source). Hyperscaler regions (AWS, Azure, Google) mostly serve Indian inference from conventional cloud halls with GPU instances, while Google's $15 bn Visakhapatnam AI hub (with AdaniConneX and Airtel) is the flagship purpose-built project.
- **Retrofit potential:** KPMG's July 2026 report ("India data centre opportunity: from emerging demand hub to integrated data centre powerhouse") estimates that only 25–30% of existing capacity can be upgraded to AI standards. STL Partners puts liquid retrofit at ~$2 m/MW versus >$11 m/MW for greenfield liquid-cooled builds, but warns of hidden costs such as tenant migration, downtime and lost revenue.

## Recommendations

1. **For the atlas, model AI halls with three cooling archetypes** (towers 1.8, hybrid 0.3, liquid + dry 0.05 L/kWh). Always add grid water at 2.0 (Karnataka) and 5.0 (India). Grid water dominates, so renewable sourcing is a water policy as much as a carbon policy.
2. **Treat power connection as the gating variable.** For any Karnataka site, check KPTCL substation headroom and the 220 kV bay before land. Prefer KIADB/DC-park sites with existing EHV infrastructure.
3. **Design for Vera Rubin, not Blackwell.** Plan for ~230 kW racks, 7 m slab-to-slab height and >2,000 kg/m² floors. Retrofitting a 130 kW hall later is the expensive path.
4. **Use dry or hybrid heat rejection in Bengaluru.** Its mild climate makes dry coolers viable most of the year. Karnataka's WUE-linked incentives reward this.
5. **For enterprises, keep ≤70B inference in conventional colo on L40S/H100/B200 with good batching. Move frontier/MoE serving and any training to liquid-cooled AI halls.** Consolidating endpoints to raise batch sizes cuts per-prompt energy more than any facility upgrade.
6. **Budget utilisation risk explicitly.** GPU-hour economics break below ~60% utilisation. Subsidised IndiaAI rates (~$0.8/hr) sit far below unsubsidised TCO (~$2.6–3.9/hr).

## Caveats

- **Capacity baselines disagree:**

| Source | Indian capacity figure |
|---|---|
| KPMG | ~1.9 GW installed (FY26) |
| Cushman & Wakefield (atlas) | 1.79 GW live IT (H1 2026) |
| CBRE | ~1.7 GW (2025) |
| CEEW | ~1.5 GW (mid-2025) |
| JLL | 1,123 MW (H1 2025) |

  These differ on definitions: installed vs live IT, and colocation-only vs total.
- **Rack prices vary 2×.** GB300 NVL72 estimates run from $3 m to $6.5 m depending on method: analyst model, purchase order or press.
- **Retrofit costs disagree.** STL says ~$2 m/MW (hard costs only; small interview base). Other vendor blogs cite $5–10 m/MW for GB200-grade retrofits. Uptime frames DLC as a 5–10% new-build premium.
- **Water benchmarks differ by assumption.** Our 3.46 MLD for 100 MW with towers exceeds the IEA's ~2 ML/day because of higher assumed load and WUE. KPMG's "WUE <1 L/MWh" target appears to be a unit typo for L/kWh. KPMG's "700–800 racks for 400 MW anchor halls" implies >500 kW per rack and should be treated cautiously.
- **Per-prompt figures are company-reported** (Google, OpenAI), with undisclosed prompt lengths. Older estimates (e.g., Li et al.'s 16.9 mL for GPT-3) assumed 4 Wh per response, explaining most of the gap.
- **The regulatory position is interpretive and moving:**
  - The MoEFCC no-standalone-EC position comes from a parliamentary reply, not a notification.
  - Whether data centres sit in CPCB's 2025 White category is unconfirmed.
  - US export rules have no India-specific cap after the AI Diffusion Rule was rescinded (May 2025), but no replacement rule exists as of mid-2026, and end-user parent-country checks still apply.
  - State HT tariffs were not verified against current tariff orders.
- **All BOM, timing, staffing and opex figures marked "estimate" are engineering estimates** derived from the cited per-rack, per-MW and per-GPU anchors, not reported project data.

## Sources

1. business-standard — https://www.business-standard.com/technology/tech-news/india-among-top-data-centre-markets-mumbai-costs-among-lowest-globally-125111001095_1.html
2. turnerandtownsend — https://www.turnerandtownsend.com/insights/indias-data-centres-new-engine-of-global-growth/
3. datacenterscope — https://datacenterscope.com/cooling/data-center-cooling-cost/
4. hpe — https://buy.hpe.com/my/en/options/server-accelerators/nvidia-ai-accelerated-computing/nvidia-ai-accelerated-computing/nvidia-gb200-nvl72-by-hpe/p/1014890104
5. gpusmith — https://gpusmith.com/hardware/systems/nvidia-dgx-b200
6. kpmg — https://assets.kpmg.com/content/dam/kpmgsites/in/pdf/2026/07/india-data-centre-opportunity-from-emerging-demand-hub-to-integrated-data-centre-powerhouse.pdf
7. bank — https://sbi.bank.in/documents/57189647/58231607/Sector+Report+DataCentre.pdf/f1919592-ee66-b50b-ea20-75fbb27c9bb5?t=1779885206866
8. ceew — https://www.ceew.in/sites/default/files/ceew-data-centre-study-web-ready-final.pdf
9. imarcengineering — https://www.imarcengineering.com/blog/data-center-development-in-india
10. yobitel — https://yobitel.com/knowledge-base/nvidia-gb200
11. gpusmith — https://gpusmith.com/articles/en/nvidia-gpu-lead-times-h100-h200-gb200
12. aisigint — https://aisigint.com/blog/gpu-roadmap-is-your-building-spec
13. greentribunal — https://www.greentribunal.gov.in/sites/default/files/news_updates/OA%20188%20of%202021%20Chronology%20of%20events%20by%20R8.pdf
14. theprint — https://theprint.in/environment/ai-data-centres-environment-clearance-centre-parliament/3007640/
15. pwonlyias — https://pwonlyias.com/current-affairs/no-dual-eco-clearance/
16. neer — https://neer.co.in/wp-content/uploads/2022/07/ANNEXURE-2-CGWA-GUIDELINES-FOR-WEBSITE-1.pdf?utm=
17. aakashx — https://www.aakashx.com/blog/data-center-approvals-india/
18. ieefa — https://ieefa.org/resources/impact-green-energy-open-access-rules-2022
19. blackridgeresearch — https://www.blackridgeresearch.com/blog/green-hydrogen-mission-india-policy-target-budget-details
20. simplecompute — https://www.simplecompute.ai/b300
21. intuitionlabs — https://intuitionlabs.ai/articles/nvidia-hgx-data-center-requirements
22. nvidia — https://docs.nvidia.com/dgx/dgxb300-user-guide/introduction-to-dgxb300.html
23. manufacturingtodayindia — https://www.manufacturingtodayindia.com/yottas-blackwell-supercluster
24. pny — https://www.pny.com/en-eu/nvidia/dgx/b200
25. supermicro — https://www.supermicro.com/datasheet/datasheet_SuperCluster_GB200_NVL72.pdf
26. nextmsc — https://www.nextmsc.com/industry-deep-dive/data-centre-cost-per-mw-by-region
27. techi — https://www.techi.com/data-center-cost-by-country/
28. investindia — https://static.investindia.gov.in/s3fs-public/2026-10/latest-news-India-Data-Centre-Growth-Story.pdf
29. stlpartners — https://stlpartners.com/press/liquid-cooling-retrofits-can-cost-roughly-80-less/
30. lmcic — https://lmcic.com/data-center-construction-cost-2026/
31. fourweekmba — https://fourweekmba.com/ai-epoch-ai-lambda-gigawatt-datacenter-cost-breakdown/
32. niveshaay — https://niveshaay.com/wp-content/uploads/2026/06/Niveshaay_E2E_Networks.pdf
33. stlpartners — https://stlpartners.com/research/evolution-of-liquid-cooling/
34. tradingview — https://tr.tradingview.com/news/reuters.com%2C2025%3Anewsml_L6N3W80DU%3A0-india-reserves-a-seat-at-the-global-ai-table
35. intuitionlabs — https://intuitionlabs.ai/articles/data-center-gpu-prices
36. tomshardware — https://www.tomshardware.com/pc-components/gpus/nvidias-next-gen-blackwell-ai-gpus-to-cost-up-to-dollar70000-fully-equipped-servers-range-up-to-dollar3000000-report
37. ssrn — https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7584299
38. metrocoloadvisory — https://metrocoloadvisory.com/gb200-nvl72-rental/
39. tech-insider — https://tech-insider.org/nvidia-blackwell-gpu-pricing/
40. datagravity — https://www.datagravity.dev/p/how-much-does-an-nvidia-nvl72-cost
41. axis-intelligence — https://axis-intelligence.com/wp-content/dashboard/ai-data-center-cost-per-mw-dashboard.html
42. constructionweekonline — https://www.constructionweekonline.in/business/mumbai-second-most-cost-efficient-for-data-centre-construction-worldwide-study
43. tatapower — https://www.tatapower.com/regulatory/licence-area-mumbai/regulatory-filings/distribution-business-schedule-of-electricity-tariff/Final-MYT-Order-TPC-D-Case-No.-210-of-2024.pdf
44. optenpower — https://feeds.optenpower.com/blog/india-solar-open-access-market
45. heavengreenenergy — https://www.heavengreenenergy.com/glossary/ists-charges
46. mercomindia — https://www.mercomindia.com/green-energy-open-access-ists-charges-waived-june-2025
47. rawcompute — https://rawcompute.in/blog/gst-gpu-imports-india/
48. rdp — https://rdp.in/gpu-mart/knowledge-base/ai-workstation-tco-india-duties-gst-cloud-crossover/
49. impriindia — https://www.impriindia.com/insights/policy-update/uttar-pradesh-data-centre-policy-2026-powering-indias-ai-ready-digital-backbone/
50. arusgrid — https://arusgrid.com/policy/india
51. businessworld — https://www.businessworld.in/article/karnataka-approves-sustainable-data-centre-policy-targets-1-gw-it-load-by-2031-624457
52. thenewsminute — https://www.thenewsminute.com/karnataka/karnatakas-new-data-centre-policy-puts-water-energy-in-focus-what-does-it-say
53. vaidicslucknow — https://www.vaidicslucknow.com/current-affair/data-centres-in-karnataka-sustainability-concerns-sustainable-data-centre-policy-2026-31-t/
54. publicpower — https://www.publicpower.org/periodical/article/nerc-incident-review-examines-risks-challenges-tied-integration-large-loads
55. eepower — https://eepower.com/news/nerc-warns-ai-data-centers-threaten-grid-reliability/
56. arxiv — https://arxiv.org/html/2608.28044v1
57. semianalysis — https://newsletter.semianalysis.com/p/gb200-hardware-architecture-and-component
58. datacenterscope — https://datacenterscope.com/ai-infrastructure/data-center-retrofit-cost/
59. openmetal — https://openmetal.io/resources/blog/intel-amx-ai-inference-performance/
60. theregister — https://www.theregister.com/2024/10/29/cpu_gen_ai_gpu/
61. inferenceengineering — https://inferenceengineering.tech/learn/gpu-inference/
62. koyeb — https://www.koyeb.com/docs/hardware/gpu-benchmarks
63. nvidia — https://www.nvidia.com/en-us/data-center/dgx-b200/
64. ml — https://ml.energy/blog/measurement/energy/diagnosing-inference-energy-consumption-with-the-mlenergy-leaderboard-v30/
65. spheron — https://www.spheron.network/blog/nvidia-gb200-nvl72-guide/
66. google — https://services.google.com/fh/files/misc/measuring_the_environmental_impact_of_delivering_ai_at_google_scale.pdf
67. arxiv — https://arxiv.org/pdf/2508.15734
68. greenly — https://greenly.earth/en-us/leaf-media/data-stories/ai-efficiency-a-gemini-reality-check-with-greenly
69. ml — https://ml.energy/leaderboard/
70. intuitionlabs — https://intuitionlabs.ai/articles/ai-inference-energy-joules-per-task
71. Wikipedia — https://en.wikipedia.org/wiki/Data_centre_industry_in_India
72. upstox — https://upstox.com/news/market-news/stocks/reliance-industries-l-and-t-e2-e-networks-infosys-delhivery-among-top-firms-that-partnered-with-nvidia/article-189724/
73. Substack — https://dhruva.substack.com/p/e2e-networks-limited
74. startupfortune — https://startupfortune.com/lts-vyomaai-builds-indias-largest-ai-cluster-for-together-ai-in-chennai/
75. w — https://w.media/sify-becomes-indias-first-nvidia-dgx-ready-dc-partner-certified-for-liquid-cooling/
76. globenewswire — https://www.globenewswire.com/news-release/2025/05/06/3075101/29606/en/index.html
77. datacenterdynamics — https://www.datacenterdynamics.com/en/opinions/engineering-for-ai-intensity-the-new-blueprint-for-high-density-data-centers/
78. ameztrix — https://ameztrix.com/technology/ai-data-centers-in-india/
79. datacentrereview — https://datacentrereview.com/2026/06/liquid-cooling-retrofits-could-cut-ai-data-centre-upgrade-costs-by-around-80/
80. ecorpit — https://ecorpit.com/india-data-center-capacity-2026-ai-workload-hosting/
81. steadfastoperations — https://www.steadfastoperations.com/blog/should-you-retrofit-your-data-center-for-closed-loop-liquid-cooling
82. introl — https://introl.com/blog/nvidia-b200-vs-gb200-deployment-guide
83. greencalculus — https://greencalculus.com/data/ai-water-usage/
84. countercurrents — https://countercurrents.org/2026/08/to-tell-the-parliament-that-ai-data-centres-do-not-require-environment-clearance-is-laughable/
85. hklaw — https://www.hklaw.com/en/insights/publications/2026/06/bis-publishes-guidance-license-requirements-advanced-computing-items
