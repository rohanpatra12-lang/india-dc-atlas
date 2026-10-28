<!-- Report 2 of the India Data Centre Atlas research series (Anatomy of consumption, AI vs conventional; atlas chapter 3). Produced with AI-assisted web research, October 2026, and kept as written at the time. Some figures were corrected later (notably India grid water 4.5 → 2.9 L/kWh and grid CO₂ 0.71 → 0.675 t/MWh, October 2026); the atlas standards register (src/data/standards.js) is authoritative where they differ. -->

# Anatomy of Data Centre Consumption and AI vs Conventional Data Centres: A Deep Analysis (October 2026)

Data centres used about 415 TWh of electricity in 2024, roughly 1.5% of global demand. Servers take about 60% of a typical facility's power and cooling takes anywhere from about 7% to over 30%. AI data centres are not simply bigger conventional facilities. They are a different class of industrial plant: racks draw 10–20 times more power, liquid cooling is mandatory, power architecture is moving to 800 VDC, campuses run at gigawatt scale, and fit-out costs about three times as much per MW. Their load behaviour is now a recognised grid-reliability risk.

## TL;DR

- **Where the power goes:** in an efficient hyperscale or AI facility (PUE about 1.1), roughly 90% of electricity reaches IT equipment, and in AI facilities most of that goes to the accelerators. In a legacy or enterprise site (PUE 1.5–2.0), 30–50% is lost to cooling and power conversion. The industry-average PUE has been stuck at 1.54 for six years (Uptime Institute, 2025), while Google reports a 2025 fleet average of 1.09, which it says means 83% less overhead energy than the industry average. The IEA projects global data-centre demand rising from 415 TWh in 2024 to about 945 TWh by 2030, with AI (accelerated) servers growing about 30% a year against about 9% for conventional servers.
- **Per-query footprints are small; aggregate demand and local impacts are not:** a median Gemini text prompt uses about 0.24 Wh and 0.26 mL of on-site water (Google, May 2025), and a GPT-4o query is about 0.3 Wh (Epoch AI). The concern is the aggregate: the IEA's estimated 560 billion litres of global data-centre water use in 2023, two-thirds of it (373 billion litres) indirect, from power generation, plus gigawatt campuses and synchronised AI training load swings that led NERC to issue a Level 3 "Essential Actions" alert on 4 May 2026.
- **AI vs conventional:** conventional halls run at about 5–15 kW per rack with air cooling, Tier III redundancy and latency-first siting. AI halls run at about 120–142 kW per rack today (GB200/GB300 NVL72), with roughly 600 kW to 1 MW racks on Nvidia's roadmap from 2027. They use direct-to-chip liquid cooling and 800 VDC power, and they site power-first. In India, the SBI sector report (April 2026) puts a standard Tier III air-cooled build at INR 50–55 crore per MW and an AI/immersion or Tier IV build at up to INR 75 crore per MW. Developers should build "AI-ready" shells (liquid-cooling loops, floor loading, high-voltage power) now rather than retrofit later.

---

## Section 1: Anatomy of Data Centre Consumption

### 1.1 Electricity breakdown by subsystem

The IEA's *Energy and AI* report (April 2025) gives the canonical modern split:

- **Servers:** about 60% of electricity in modern data centres on average. This rises to about 75% in large AI-optimised hyperscale sites, where chips draw 2–4 times more power than conventional ones.
- **Storage:** about 5%.
- **Networking:** up to 5%.
- **Cooling and environmental control:** about 7% in efficient hyperscale sites, rising to over 30% in less-efficient enterprise sites.
- **Remainder:** power conversion and distribution losses (UPS, transformers, PDUs), lighting and building loads.

CEEW's India study (February 2026), citing the IEA, notes that servers and cooling together take nearly 70% of electricity. The SBI report says cooling can account for up to 40% of energy use in Indian facilities.

**Diagram in words: the power chain in a conventional facility**
Grid (e.g. 33/66/132 kV) → step-down transformer (about 1–2% loss) → switchgear → double-conversion UPS (about 3–8% loss in legacy units, about 2–4% in modern ones) → PDU/RPP (about 1–3%) → server PSU (AC to 12 V, about 4–10%) → voltage regulators on the board → chip. In parallel: chillers, CRAH/CRAC fans, pumps and cooling towers, plus lighting, security and offices.

**Typical percentage splits by facility class.** These are the author's synthesis, derived from PUE ranges and the IEA component shares. They are indicative, not measured.

| Subsystem | Legacy/small enterprise (PUE about 1.8–2.0) | Typical enterprise/colo (PUE about 1.5–1.6) | Hyperscale cloud (PUE about 1.1–1.2) | AI liquid-cooled (PUE about 1.1–1.3) |
|---|---|---|---|---|
| IT load (servers, storage, network) | 50–55% | 62–67% | 83–91% | 77–90% |
| Cooling (chillers, CRAH/CRAC, pumps, towers, fans) | 30–40% | 25–30% | 5–10% | 7–15% (CDUs, pumps, dry coolers, residual air) |
| Power conversion and distribution losses (UPS, transformers, PDUs) | 8–12% | 6–8% | 2–5% | 3–6% |
| Lighting and other (security, offices, humidification) | 2–5% | 1–3% | about 1% | about 1% |

A useful cross-check comes from Google's own Gemini serving measurement. For a median prompt, TPUs used 58% of energy, host CPU and DRAM 25%, idle reserve machines 10%, and data-centre overhead (cooling and power conversion) only 8%. That is consistent with a fleet PUE of about 1.09.

### 1.2 Inside the IT load: CPUs, GPUs, memory, storage and networking

Applying the IEA shares to IT load alone, a typical facility's IT power splits about 85% servers, about 7% storage and about 7% networking. Within a server, the split depends on the class:

| Component | Conventional CPU server (indicative) | AI accelerated server/rack |
|---|---|---|
| CPUs | about 40–55% of server power | about 10–15% (host CPUs, e.g. Grace) |
| GPUs/accelerators | 0% (or a small inference card) | about 60–75% (e.g. 72 × B200 at about 1.0–1.2 kW = about 72–86 kW of a 120 kW NVL72 rack) |
| Memory (DRAM/HBM) | about 15–25% | HBM is counted in the GPU package; host DRAM is a few % |
| Local storage (SSD/HDD) | about 5–10% | a few % |
| Fans, PSU losses, NICs | about 10–20% | Switch trays (NVLink), NICs/DPUs and PSU losses about 10–15%; fans are minimal with liquid cooling |

The Gemini figures (TPUs 58%, host 25%) illustrate the accelerator-dominant profile in production.

**Idle versus active power and utilisation.** Conventional servers are poorly energy-proportional: many still draw roughly a third to half of peak power at idle, and enterprise fleets often run at 10–30% average CPU utilisation. That is why consolidation and virtualisation remain the cheapest efficiency lever. AI fleets differ by workload:

- **Training clusters** run near full power for weeks.
- **Inference clusters** are bursty and often lightly loaded. Epoch AI assumed about 10% utilisation for inference clusters in its ChatGPT estimate.
- **Idle reserve** is a measurable cost even at Google, where idle capacity kept for failover was 10% of per-prompt energy.

### 1.3 Efficiency metrics: PUE, WUE, CUE and ERE

| Metric | Definition | Benchmarks |
|---|---|---|
| **PUE** (Power Usage Effectiveness) | Total facility energy ÷ IT energy | Uptime 2025 global weighted average 1.54 (1.58 in 2023, 1.56 in 2024). Facilities built in the last five years: 1.48. Sites over 20 MW: about 1.44. Many new high-latitude sites: 1.3 or better. Google fleet: 1.09 (2025). MeitY AI-cloud tenders in India require below 1.35. |
| **WUE** (Water Usage Effectiveness) | Site water (L) ÷ IT energy (kWh) | Microsoft FY24: 0.30 L/kWh, down 39% from 0.49 in 2021. Microsoft's regional values range from about 1.52 (Arizona) to 0.02 (Singapore), as reported secondhand. |
| **CUE** (Carbon Usage Effectiveness) | kgCO₂e ÷ IT kWh | Determined mainly by the grid mix and whether emissions are counted location-based or market-based |
| **ERE** (Energy Reuse Effectiveness) | (Total energy − reused energy) ÷ IT energy | Can fall below 1.0 with district-heat export, which matters for liquid-cooled AI halls producing 40–60 °C return water |

**Trend.** Uptime's 2025 survey (15th edition, fielded April–May 2025) found the weighted average PUE of 1.54 had "virtually stood still" for the sixth consecutive year. Legacy infrastructure and hot or humid climates hold the average up, even as new large sites improve.

**Limitations of PUE.**
- It ignores IT efficiency: wasteful idle servers can make PUE look better.
- It ignores water. Swapping evaporative cooling for chillers lowers WUE but raises PUE, as Microsoft acknowledges for its zero-water designs.
- It is climate-dependent and self-reported, and measurement boundaries vary.
- It says nothing about carbon or embodied impacts.
- Uptime itself stresses that it was designed to track a single site over time, not to compare sites.

The rise of liquid cooling also blurs the boundary, because CDU pumps and server fans can move between the "facility" and "IT" sides of the ratio.

### 1.4 Water consumption: direct and indirect

**Global (IEA).** Data centres consumed about 560 billion litres of water in 2023, possibly about 1,200 billion litres by 2030. A peer-reviewed analysis of the IEA figures breaks the 2023 total down as:
- about 373 billion L (two-thirds) indirect, from electricity generation;
- about 140 billion L direct, on site;
- about 47 billion L in hardware manufacturing.

Bloomberg, reporting on the IEA, notes that a typical 100 MW US data centre consumes about 2 million litres a day.

**United States (LBNL 2024, as reported).** Direct consumption was about 66 billion litres in 2023, with hyperscale direct use projected at 60–124 billion litres by 2028. Indirect use through electricity was about 800 billion litres in 2023.

**Litres per kWh.** Direct (WUE) runs from near 0 for dry, closed-loop or free-air sites to above 1.5 L/kWh for evaporative sites in hot, dry climates. Indirect intensity depends on the grid; one study applies about 3.4 L/kWh. The total water footprint per kWh is therefore usually dominated by the power plant, not the cooling tower.

**Company disclosures.**
- **Google:**
  - 2024: about 8.1 billion gallons consumed; 4.5 billion gallons (64%) replenished.
  - 2025: total consumption rose 34% to 10.9 billion gallons, more than double 2021 levels, with data centres accounting for most of the increase (Axios, 30 June 2026, on Google's 2026 Environmental Report); 7.7 billion gallons (78%) replenished.
  - 87% of 2025 freshwater withdrawals came from low or medium-risk sources.
  - Target: 120% replenishment by 2030.
  - Google argues that water cooling cuts energy use about 10% compared with air.
- **Microsoft:**
  - WUE 0.30 L/kWh (FY24).
  - All designs since August 2024 use closed-loop "zero-water evaporation" chip-level cooling, avoiding more than 125 million litres per data centre per year.
  - Pilots in Phoenix and Mt Pleasant from 2026, coming online from late 2027.

**Per-AI-query water: a contested range.**

| Estimate | Water per query | Scope |
|---|---|---|
| UC Riverside, "Making AI Less Thirsty" (Li, Yang, Islam, Ren) | 500 mL per about 10–50 medium GPT-3 responses (about 10–50 mL each); GPT-3 training about 5.4 million L total, of which 700,000 L on site | Scope 1 + 2, GPT-3-era hardware, Microsoft US data centres |
| Google Gemini (May 2025) | 0.26 mL (0.15 mL under a narrower method) | On-site cooling only |
| OpenAI (Altman, June 2025) | about 0.32 mL | Unspecified, likely on-site |
| Mistral Le Chat LCA | about 45 mL per 400-token response | Full lifecycle |

The often-quoted "a bottle per query" misreads the UC Riverside paper by a factor of 10–50. Google's 0.26 mL excludes power-plant water, which critics argue can raise the figure to roughly 1–2 mL. The paper also projects global AI water withdrawal of 4.2–6.6 billion m³ by 2027.

### 1.5 Backup power and other resources

- **Diesel generators:** still the default backup. CEEW's 2026 India stakeholder study found DG sets "remain an indispensable asset" for uptime. They run few hours a year but have air-permit, fuel-storage and emissions implications. HVO (renewable diesel), gas gensets and BESS are emerging alternatives.
- **Batteries:** UPS batteries have shifted from valve-regulated lead-acid (VRLA) to lithium-ion. AI sites add grid-scale BESS for load smoothing, and Nvidia's 800 VDC reference places energy storage on the DC bus.
- **Refrigerants:** chillers and DX units use HFCs with high global-warming potential. The Kigali Amendment, EU F-gas rules and India's Cooling Action Plan are pushing operators toward low-GWP refrigerants. Liquid cooling with dry coolers reduces refrigerant dependence.
- **Land:** India's roughly 271 data centres occupy about 23 million m² (CEEW). Meta's 5 GW Hyperion campus is described as a footprint comparable to a large part of Manhattan.
- **Embodied carbon (Scope 3):** construction (concrete, steel, copper) and above all IT hardware manufacturing (chips, HBM, servers) make up a growing share of lifecycle emissions as operational power decarbonises. Google's per-prompt figure of 0.03 gCO₂e explicitly includes embodied hardware emissions. Hardware manufacturing also accounts for about 8% of the IEA's water estimate. Hyperscalers' rising Scope 3 emissions are the main reason their net-zero trajectories have slipped. Quantification is weak and methods vary, so treat any single number with caution.

### 1.6 Global and regional electricity consumption

**IEA *Energy and AI* (April 2025), Base Case:**
- **2024:** about 415 TWh, about 1.5% of global electricity. The US accounts for about 45% of global data-centre consumption.
- **Growth:** about 12% a year since 2019, accelerating to about 15% a year to 2030, more than four times the growth of other demand.
- **2030:** about 945 TWh, just under 3% of global electricity. The "Lift-Off" case exceeds 1,260 TWh by 2030.
- **2035:** about 1,200 TWh.
- **AI share:** accelerated (AI) servers were about 24% of server electricity and about 15% of total data-centre demand in 2024. They grow about 30% a year, against about 9% for conventional servers, and account for almost half of the net increase to 2030; conventional servers account for about 20%.
- **Regions:**
  - China and the US together account for nearly 80% of growth.
  - The US adds about 240 TWh (+130%) by 2030.
  - Europe adds about 45 TWh (+70%).
- **Supply:** renewables meet about half of incremental demand to 2030. Natural gas expands by about 175 TWh to 2035. In 2024, US data centres drew over 40% of their power from gas, about 24% from renewables, about 20% from nuclear and about 15% from coal (Pew, citing the IEA).
- **Emissions:** about 182 Mt CO₂ from data-centre electricity in 2024.

**LBNL 2024 *United States Data Center Energy Usage Report* (December 2024):**

| Year | US data-centre electricity | Share of US electricity |
|---|---|---|
| 2014 | 58 TWh | — |
| 2018 | 76 TWh | 1.9% |
| 2023 | 176 TWh | 4.4% |
| 2028 (scenarios) | 325–580 TWh | 6.7–12.0% |

LBNL attributes the post-2017 doubling largely to AI servers. Estimates diverge widely: the IEA 4E critical review (2025) found 2030 projections ranging nearly 40-fold across more than 50 publications, and put AI data-centre energy at a plausible 200–400 TWh in 2030.

### 1.7 Energy per workload

| Workload | Energy | Source/notes |
|---|---|---|
| Google web search | about 0.3 Wh | Google's oft-cited 2009 figure; likely lower today |
| Median Gemini Apps text prompt | 0.24 Wh (0.10 Wh active-chip-only), 0.03 gCO₂e | Google, May 2025; 33× lower energy and 44× lower carbon than May 2024. Not independently verified, and prompt length is undisclosed. |
| ChatGPT average query | about 0.34 Wh | Sam Altman, June 2025; no methodology |
| GPT-4o typical query (500 output tokens) | about 0.3 Wh | Epoch AI, February 2025 (replacing the 2023 figure of about 3 Wh) |
| Long-input query (10k / 100k tokens) | about 2.5 Wh / about 40 Wh | Epoch AI |
| Reasoning/agentic queries | several to tens of Wh | Third-party benchmarks; high uncertainty |

**Training versus inference.**
- **Llama 3.1 (Meta model card, July 2024):** 39.3 million H100-80GB GPU-hours (700 W TDP) across the family. The 405B model alone took 30.84 million GPU-hours and 8,930 tCO₂e location-based (0 market-based). At full TDP that implies an IT-only upper bound of about 21.6 GWh (the author's calculation).
- **GPT-4:** no official disclosure. Widely cited estimates are about 50–62 GWh, based on about 25,000 A100s running for 90–100 days; MIT Technology Review used about 50 GWh. Epoch AI says GPT-4o-class training runs drew about 20–25 MW for about three months. Epoch estimates Grok 4 training used about 310 GWh.
- **Inference is now larger than training in aggregate:** at about 0.3 Wh per query and 1 billion messages a day, ChatGPT inference alone needs about 12.5 MW of continuous power (Epoch AI). Inference runs indefinitely, while a training run is a one-off. The IEA expects AI server growth to be "predominantly inference".

### 1.8 Carbon footprint and grid impacts

- **Load profile:** conventional data centres are flat 24/7 baseloads with high load factors, which suits utilities but concentrates demand. The IEA notes a 100 MW facility can consume as much electricity as 100,000 households. Clustering (Northern Virginia, Dublin, Mumbai) concentrates stress on local grids.
- **AI training swings:** thousands of GPUs alternate in lockstep between compute and communication or checkpoint phases, producing synchronised swings of tens to hundreds of MW within seconds. NERC's July 2025 Large Loads white paper documents:
  - one data centre falling from about 450 MW to 40 MW in 36 seconds;
  - a July 2024 Eastern Interconnection event in which a 230 kV fault caused about 1,500 MW of data-centre load to switch to backup at once, pushing frequency to about 60.047 Hz.
- **Regulatory escalation:** NERC issued a **Level 3 "Essential Actions" Alert on 4 May 2026** on computational loads, setting seven required actions with registered-entity responses due by 3 August 2026. It is developing a "Computational Load Entity" registration category for facilities of at least 20 MW aggregate, connected at 60 kV or above, with more than 1 MW of IT load.
- **Power quality:** large power-electronic loads raise concerns about harmonics, oscillations and ride-through. Mitigations include rack-level energy storage, GPU power smoothing in firmware, BESS and grid-forming inverters.
- **Carbon:** market-based figures (with PPAs and certificates) can be close to zero, as with Llama 405B's 0 market-based emissions, while location-based figures remain material. Decision-makers should ask for both.

### 1.9 The Indian angle

- **Scale:**
  - Capacity rose from about 520 MW in 2020 to about 1.5 GW by mid-2025. Other estimates: JLL 1,123 MW operational (H1 2025), Cushman & Wakefield about 1.3 GW, CBRE about 1.7 GW.
  - Projections: 4.5–6.5 GW by 2030; Jefferies is more bullish at about 8 GW.
  - Committed investment of about USD 95 billion (2019–25).
- **Footprint:** about 0.5% of national electricity and about 150 billion litres of water in 2025 (Mordor Intelligence via CEEW). Both are expected to more than double by 2030; Mordor projects about 359 billion litres. WRI India mapping shows more than half of India's data centres sit in water-stressed regions. Small operators (under 5 MW) rely mainly on municipal water.
- **Efficiency:** the SBI report says Indian industry leaders achieve PUE below 1.5, and MeitY AI-cloud tenders since 2024 require below 1.35. Hot, humid climates (Mumbai, Chennai) limit free cooling, which is one reason Indian PUEs sit above Nordic levels. Andhra Pradesh promotes seawater cooling for coastal sites.
- **Policy gaps:** there is no binding national data-centre policy. 15 states have dedicated policies, but only 5 embed sustainability provisions, and most lack PUE or WUE standards. Renewable developers say up to about 80% renewable supply is feasible using diversified solar–wind portfolios plus storage (CEEW).
- **Implication:** India's binding constraints will be local water and grid capacity in the Mumbai and Chennai clusters, not national energy totals. Water-free liquid cooling, treated-wastewater sourcing and renewable-energy-linked siting should be conditions of state incentives.

---

## Section 2: AI Data Centre vs Conventional Data Centre

### 2.1 Master comparison table

| Attribute | Conventional (enterprise/colo/cloud) | AI data centre (training/inference) |
|---|---|---|
| Primary workloads | Web, databases, ERP, storage, virtualised and cloud VMs, streaming | Large-model training (synchronous, weeks to months); inference (latency-sensitive, bursty); fine-tuning |
| Compute | x86/Arm CPU servers, about 300–1,000 W per server | GPUs/TPUs/ASICs: H100 700 W; B200 1,000–1,200 W; B300 about 1.4 kW; 8-GPU HGX node about 5.6–10 kW |
| Rack density | about 5–15 kW (Uptime: few above 30 kW; average about 7–8 kW) | about 40 kW (H100 air-cooled) → 120–132 kW (GB200 NVL72) → 135–142 kW (GB300) → about 190–230 kW (Vera Rubin, 2026) → about 600 kW to 1 MW (Kyber, from 2027) |
| Cooling | Air (CRAH/CRAC, hot/cold aisle containment), chillers, evaporative towers | Direct-to-chip liquid (CDUs, facility water loops), rear-door heat exchangers, immersion; residual air about 10–15% |
| Power distribution | 400/415 V AC to rack, 12 V server PSUs, centralised UPS | 415/480 V AC with 54 VDC busbars and power shelves now; 800 VDC from about 2027; BESS for smoothing; on-site gas generation and nuclear PPAs |
| Networking | North–south dominant; 10–100 GbE; leaf–spine | East–west dominant; NVLink scale-up (72 → 576 GPUs); InfiniBand or Ultra Ethernet scale-out at 400–800G per GPU; optics-heavy; many times more fibre |
| Facility | 1–50 MW (the IEA treats 25 MW as conventional); raised floors | 100 MW to multi-GW campuses; slab floors with rack positions over 1.3 t; taller halls for overhead busways and piping |
| Siting | Latency-first, close to users and internet exchanges | Power-first for training (cheap, available GW); metro or edge for inference |
| Capex per MW | JLL shell and core about $11.3m/MW (2026 global average). India: INR 50–55 crore/MW (SBI) | Plus up to $25m/MW tenant AI fit-out (JLL), before GPUs. India: up to INR 75 crore/MW (SBI) |
| Reliability | Tier III/IV, 2N power, concurrent maintainability | Training: increasingly N+1 or Tier II/III-like, relying on checkpoints. Inference: Tier III+ |
| Load profile | Flat, diurnal and variable; low utilisation | Training: sustained near-peak with sub-second synchronised swings. Inference: bursty |
| PUE | 1.5–1.6 average; 1.1–1.2 hyperscale | 1.1–1.3 achievable with liquid cooling; IT share about 75% or more |
| Water | Evaporative towers can mean WUE above 1 L/kWh | Closed-loop liquid cooling can reach near-zero WUE but may raise PUE; indirect water rises with load |
| Obsolescence | Hardware refreshed every 5–7 years; shell lasts 15–20+ years | GPU generations every year; economic life about 3–6 years (contested); shells risk stranding on density |
| Grid and regulatory exposure | Moderate | High: NERC Level 3 alert, large-load tariffs, interconnection queues, local opposition |

### 2.2 Purpose and workloads

- **Training:** one job spans tens of thousands to hundreds of thousands of accelerators. It is throughput-bound, tolerant of location and latency, and runs at sustained high utilisation.
- **Inference:** serving tokens to users. It is latency-sensitive, scales with adoption, is bursty, and increasingly dominates AI electricity use.
- **Conventional:** a mix of many small, independent workloads with modest density and high availability requirements. Most enterprise and colocation halls are built for this.

### 2.3 Compute hardware and power

| Platform | Power | Notes |
|---|---|---|
| Nvidia H100 SXM | 700 W | 8-GPU node about 5.6 kW (GPUs) to about 10 kW (node); racks about 30–40 kW |
| Nvidia B200 | 1,000 W (HGX) to 1,200 W (NVL72) | Air-cooled HGX B200 racks about 60 kW |
| GB200 NVL72 | about 120 kW (Nvidia); 132 kW nominal (HPE: 115 kW liquid + 17 kW air); peak electrical design power about 192 kW | 72 GPUs + 36 Grace CPUs; about 1.36 t; eight 33 kW power shelves |
| GB300 NVL72 | 135 kW (Nvidia Mission Control); 142 kW (Nvidia/Vertiv reference) | B300 at about 1.4 kW per GPU |
| Vera Rubin NVL144 (2026) | about 190–230 kW (industry reports) | Transitional AC/54 VDC or 800 VDC input |
| Rubin Ultra / Kyber (2027+) | about 600 kW (GTC 2025), designed for up to 1 MW racks | Kyber redesigned at GTC 2026; SemiAnalysis reports a possible slip to 2028 |
| Google TPU (Trillium, Ironwood); AWS Trainium | Lower per chip than Nvidia's flagships; liquid-cooled pods at scale | Google says Ironwood is 30× more efficient than its first TPU |
| Conventional CPU server | about 300–1,000 W | 2-socket x86; 5–15 kW per rack |

### 2.4 Rack power density

The trajectory runs from about 7–8 kW (industry-average rack) to about 40 kW (Hopper, 2023), about 120–132 kW (Blackwell, 2024–25), about 135–142 kW (Blackwell Ultra, 2025–26), about 200+ kW (Rubin, 2026) and about 600 kW to 1 MW (Rubin Ultra Kyber, 2027–28). That is a roughly 100-fold rise in about five years. The practical implication is that a facility built in 2023 for 30 kW racks is already stranded for frontier training. The SBI report notes air cooling "approaching physical limits" above about 15 kW per rack.

### 2.5 Cooling

- **Air** (CRAH/CRAC, containment, economisers): practical to about 20–30 kW per rack, about 40 kW with rear-door heat exchangers.
- **Direct-to-chip (DLC):** cold plates on GPUs and CPUs. In-row or in-rack CDUs exchange heat between the technology cooling system (TCS) loop and the facility water system (FWS). Supply water can be warm (about 30–45 °C), which allows dry coolers and chiller-free operation in many climates. It is mandatory for NVL72 (about 85–90% of heat goes to liquid).
- **Immersion** (single or two-phase dielectric): the highest density and near-silent operation, but less mature, with heavier tanks and service complexity. The SBI report associates it with the INR 75 crore per MW tier.
- **Heat reuse:** warm return water makes district heating and ERE below 1.0 feasible, mostly relevant in Nordic and European markets.
- **Cost:** benchmarks cited by Archdesk put air-cooled heat rejection at about $1.8m/MW against $4.5–5.2m/MW for liquid-cooled AI halls. Turner & Townsend cites a 7–10% total premium for liquid-cooled builds. These are secondary benchmarks.

### 2.6 Power architecture

**Diagram in words: Nvidia's 800 VDC target chain.** Utility 13.8 kV AC → solid-state transformer or rectifier at the facility perimeter → 800 VDC busway (with BESS on the DC bus) → in-rack 800 V to 12 V DC-DC conversion (64:1) → GPU core voltage.

Nvidia says this:
- removes multiple AC/DC stages;
- avoids "up to 200 kg of copper busbar" per 1 MW rack, which 54 VDC would require;
- frees up to 64U of rack space otherwise consumed by power shelves;
- targets up to 30% lower total cost of ownership;
- begins full-scale production with Kyber in 2027.

Schneider Electric argues that 400 V three-phase AC and 48 VDC become "impossible" at about 400 kW per rack.

**Other changes:**
- busways replace whips;
- UPS moves to lithium-ion and is increasingly paired with BESS;
- busways must be provisioned for peak design power, about 1.5× TDP per HPE.

**On-site generation and firm power:**
- **Gas turbines:** OpenAI's Stargate Abilene has gas turbines capable of up to 300 MW (IEEE Spectrum). xAI's Colossus was criticised for running unpermitted gas turbines.
- **Nuclear PPAs:**
  - Microsoft–Constellation: 20-year PPA to restart Three Mile Island Unit 1 as the 835 MW Crane Clean Energy Center, targeted for 2027.
  - Amazon–Talen Susquehanna: originally a 960 MW co-located campus, restructured in 2025 into a reported PPA of up to 1.92 GW.
  - Google–Kairos Power: 500 MW of small modular reactors by about 2030.

### 2.7 Networking

AI clusters need a non-blocking east–west fabric:
- **Scale-up:** NVLink inside a rack domain (72 GPUs for NVL72, up to 576 for Kyber) over copper backplanes.
- **Scale-out:** InfiniBand or Ultra Ethernet/RoCE at 400–800 Gb/s per GPU, organised as rail-optimised fat trees.
- **Front-end:** a separate network for storage and users.

The result is several times more optical transceivers and fibre per MW than in cloud halls, structured-cabling plants with very high fibre counts, and a coming move to co-packaged optics (Nvidia's Feynman generation, about 2028). Networking's share of power rises accordingly, though it remains small next to the GPUs.

### 2.8 Facility design and campus scale

- **Structure:** an NVL72 rack weighs about 1.36 t. Liquid-filled 600 kW racks concentrate several tonnes per position, requiring slab-on-grade or reinforced floors. Halls need greater clear height for overhead busways, cable trays and piping, plus space for CDUs and secondary piping.
- **Campus examples:**
  - xAI's Colossus (Memphis): built in 122 days. Colossus 2 is designed for more than 550,000 GPUs at about 1 GW+.
  - OpenAI's Stargate Abilene: more than 450,000 GB200s planned, about 1.2 GW (reported). The Stargate programme overall had 5.5 GW+ across six sites as of September 2025.
  - Meta: Prometheus (New Albany, Ohio), 1 GW, due in 2026; Hyperion (Louisiana), 2 GW by 2030 scaling to 5 GW.
- **Location logic:** training goes where large, cheap, fast power exists (Texas, Louisiana, the Midwest, the Gulf, Nordics). Conventional and inference capacity stays near users and exchanges.

### 2.9 Cost

- **Shell and core (JLL):** global average rose from $7.7m/MW (2020) to $10.7m (2025), with $11.3m forecast for 2026 (7% CAGR). 57% of projects were delayed by three months or more in 2025.
- **AI tenant fit-out:** up to $25m/MW on top (JLL), covering high-voltage distribution, CDUs and liquid loops, and network. GPUs and servers are extra and dominate the total: at roughly $3–4m per NVL72 rack (industry estimates), IT equipment can be several times the building cost.
- **The investment split is inverted:** in conventional data centres the building and mechanical/electrical plant are the majority of capex; in AI data centres IT is the majority, and the building is roughly 20–30% of total capex.
- **India (SBI, April 2026):** standard Tier III air-cooled INR 50–55 crore/MW; AI/immersion or Tier IV up to INR 75 crore/MW; large-scale campuses INR 35–45 crore/MW. EBITDA margins are 40–55%. India builds at roughly half the per-MW cost of US markets.
- **Opex:** electricity is about 50–70% of operating cost (CEEW cites 60–70%), so PUE and tariffs drive margins.
- **Depreciation:** hyperscalers book servers over about 5–6 years. Annual GPU cadence and falling rental prices argue for 3–4 years of economic life. This is a live, contested accounting debate.
- **Lease rates:** not independently verified here. Sources indicate AI or liquid-ready capacity commands a premium over standard colocation.

### 2.10 Utilisation and load profiles

```
Conventional:  ~~~~/‾‾‾‾\~~~~/‾‾‾‾\~~~~   (gentle diurnal swing, 30–60% of peak)
AI training:   ‾|_|‾‾|_|‾‾‾‾|____|‾‾‾‾   (near-peak plateau, sub-second synchronised dips at
                                          communication or checkpoint phases; full drop on job failure)
AI inference:  _/\_/\/\__/\/\/\_/\___   (bursty, follows user demand)
```

Training is good for utilisation economics but hard on grids and on-site electrical gear. Mitigations include GPU power capping and smoothing, rack-level energy storage and site BESS (the IEA envisages about 20–25 GW of data-centre-paired storage by 2030, as reported secondhand).

### 2.11 Efficiency and obsolescence

- **PUE:** liquid-cooled AI halls can reach 1.1–1.2. Even so, Uptime's survey shows the global average is not falling.
- **Performance per watt** improves dramatically each generation. Google reports more than three times more compute per unit of energy than five years ago, and a 33× fall in per-prompt energy over a single year, driven by software and model efficiency more than by facilities.
- **Obsolescence risk:** the same rapid improvement erodes the value of last year's GPUs and of facilities sized for them. Shells should be designed with 2–3 generations of density headroom.

### 2.12 Reliability requirements

- **Training:** periodic checkpointing means a power event costs minutes to hours of recomputation, not lost data. Some operators are therefore building training halls with reduced redundancy (N+1 rather than 2N UPS, partial generator backup), trading resilience for cost and speed.
- **Inference:** customer-facing and revenue-critical, so it needs Tier III+.

This is an emerging industry practice, not a standard. In India, uptime expectations and DPDP-driven enterprise demand still favour Tier III/IV.

### 2.13 Water usage differences

AI facilities can use less water per kWh than conventional evaporative sites if they use closed-loop DLC with dry coolers; Microsoft's zero-water design is an example. The trade-off is higher PUE in hot weather. Because AI campuses draw far more electricity, their indirect (power-plant) water and absolute totals are much larger. Google's 34% jump in water consumption in 2025 shows the AI build-out outrunning efficiency gains.

### 2.14 Environmental and grid impacts, and the regulatory response

- **United States:** the NERC Level 3 Alert (May 2026) and the proposed registration category; DOE support for on-site generation and flexibility; large-load tariffs and interconnection reforms at utilities; local opposition to new data centres, with a March 2026 Gallup poll finding 71% of US adults oppose an AI data centre in their local area, including 48% strongly opposed.
- **India:** state data-centre policies (15 states); MeitY's PUE below 1.35 tender requirement; SEBI BRSR Core disclosure for the top 150 listed firms; IGBC Green Data Centre ratings; renewable-energy-linked incentives (e.g. Tamil Nadu above 30% renewables); the Budget 2026–27 tax holiday to 2047 for foreign cloud providers serving India through local entities.

### 2.15 Inference versus training data centres

| | Training DC | Inference DC |
|---|---|---|
| Location | Power-rich, remote, cheap land | Metro or edge, near users (latency of tens of ms) |
| Size | 300 MW to 5 GW single campus | 10–200 MW, distributed |
| Network | Massive internal fabric; little external | Strong external connectivity and peering |
| Redundancy | Lower (checkpointing) | Higher (Tier III+) |
| Hardware | Newest flagship GPUs | Mix, including older GPUs, inference ASICs and L40S-class cards |
| Trend | Fewer, larger campuses | Growth of metro or edge AI zones and retrofitted colocation |

The SBI report likewise notes that training ("model grounding") stays in core data centres while inference moves to the edge. As inference becomes the majority of AI electricity, metro capacity (Mumbai, Chennai, Noida in India) becomes the competitive battleground.

### 2.16 Retrofit challenges

Converting a conventional hall to AI-ready means dealing with:
1. **Power:** a 10× density jump means the hall's MW capacity supports only a fraction of the floor area, and upstream transformers and switchgear may need replacing.
2. **Cooling:** adding a facility water loop, CDUs, leak detection and secondary piping into live, raised-floor space.
3. **Structure:** floor loading above 1.3 t per rack.
4. **Height and routing:** overhead busway and piping clearances.
5. **Network:** fibre pathways for many times more strands.
6. **Downtime and tenant disruption.**

The practical route is usually hybrid: dedicate certain halls to liquid-assisted 30–60 kW racks (rear-door or DLC with liquid-to-air CDUs) and reserve 120 kW+ for new builds. Developers should design new shells "liquid-ready" from day one.

### 2.17 The Indian angle: AI-ready builds

- **IndiaAI Mission:**
  - INR 10,300 crore allocation.
  - 38,231 GPUs onboarded on the common compute portal, at a subsidised rate of about ₹65 per GPU-hour (Lok Sabha reply, 25 March 2026). This was up from 34,333 in May 2025.
  - An additional 20,000 GPUs were announced at the February 2026 AI Impact Summit, which would take the total above 58,000, but onboarding was unconfirmed as of March 2026.
  - The pool includes about 1,050 Google Trillium TPUs.
- **Yotta Shakti Cloud:**
  - NM1 (Navi Mumbai): Tier IV, 52 MW IT load, PUE below 1.5, more than 7,000 racks, with 8,192 H100s and 1,024 L40S GPUs live.
  - 8,192 B200s empanelled under IndiaAI.
  - In February 2026, Yotta announced 20,736 liquid-cooled Blackwell Ultra (B300) GPUs at its 60 MW D2 site in Greater Noida (more than $2 billion, targeted live by August 2026; not yet confirmed). It also has a DGX Cloud deal with Nvidia worth more than $1 billion.
  - Plans for more than 80,000 GPUs by FY27–28, including at the 75 MW NM2.
  - Published GPU counts vary by source.
- **Reliance Jamnagar:**
  - Gigawatt-scale, green-powered AI data centres announced in August 2024. Bloomberg reported a 3 GW plan costing $20–30 billion with Nvidia chips.
  - Reliance Intelligence and a Google AI-cloud partnership (August 2025).
  - More than 120 MW expected online in H2 2026 (February 2026).
  - A Meta built-to-suit lease announced on 10 June 2026, reported at about 168 MW.
- **Costs:** INR 50–55 crore/MW (standard) versus up to INR 75 crore/MW (AI or Tier IV), per SBI (April 2026). Other Indian advisory benchmarks put AI-ready liquid-cooled builds at INR 70–95 crore/MW, so treat SBI's 75 crore as a mid-point, not a ceiling.

---

## Recommendations

1. **For planners and investors:** underwrite new Indian capacity as "AI-ready" (DLC loops, more than 1.5 t floors, 415 V or higher distribution, and space for future 800 VDC) even when it is leased for cloud. The roughly 35–40% capex premium (INR 75 vs 50–55 crore/MW) is cheaper than a retrofit or a stranded shell.
2. **Measure beyond PUE:** require WUE (direct and indirect), location- and market-based CUE, and IT utilisation in contracts and state incentives. Tie Indian state subsidies to PUE of 1.35 or below and WUE thresholds in water-stressed basins.
3. **Water:** in Mumbai, Chennai and Hyderabad, prefer closed-loop or dry-cooled liquid designs and treated wastewater. Accept a small PUE penalty in exchange for near-zero evaporative use.
4. **Grid:** co-plan with transmission utilities, deploy BESS and GPU power-smoothing for training loads, and design for ride-through. NERC's experience is a preview of what Indian grids will face as GW campuses arrive.
5. **Separate training from inference:** site training at power-rich, renewable-heavy locations and inference in metros. Price redundancy accordingly.

## Caveats

- Subsystem splits by facility class (section 1.1) and within-server splits (section 1.2) are indicative syntheses, not measured averages.
- Per-query energy and water figures are company-reported (Google, OpenAI) or modelled (Epoch AI, UC Riverside). They are not independently audited and differ in scope by orders of magnitude.
- GPT-4 training energy is an unofficial estimate.
- Global and Indian capacity forecasts vary widely (e.g. India 2030 at 4.2–8 GW). IEA projections are scenarios, not forecasts.
- Several hardware roadmap figures (Rubin, Kyber timing and power) come from vendor keynotes and secondary reporting and have already shifted. Treat 600 kW to 1 MW racks as a direction of travel, not a delivery date.
- Some figures (Microsoft regional WUE, Uptime average rack kW, Google's 2025 water total, LBNL water volumes, Amazon–Talen capacity, IEA BESS) were obtained via secondary reporting.
- Yotta and IndiaAI GPU counts differ across sources and announcements may not reflect deployed capacity.

## Sources

1. <https://ourworldindata.org/grapher/data-centers-share-electricity-demand>
2. <https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai>
3. <https://www.pewresearch.org/short-reads/2025/10/24/what-we-know-about-energy-use-at-us-data-centers-amid-the-ai-boom/>
4. <https://www.brookings.edu/articles/global-energy-demands-within-the-ai-regulatory-landscape/>
5. <https://www.ceew.in/publications/how-is-data-centre-infrastructure-in-india-shaping-power-and-water-use>
6. <https://sbi.bank.in/documents/57189647/58231607/Sector+Report+DataCentre.pdf/f1919592-ee66-b50b-ea20-75fbb27c9bb5?t=1779885206866>
7. <https://www.implicator.ai/google-says-a-prompt-uses-0-24-wh-researchers-say-the-math-is-incomplete/>
8. <https://datacenters.google/efficiency/>
9. <https://particle.news/story/google-details-geminis-perprompt-energy-carbon-and-water-use-as-researchers-question-scope>
10. <https://www.spheron.network/blog/nvidia-gb200-nvl72-guide/>
11. <https://pantheon.run/learn/nvidia-gb200-nvl72-specs>
12. <https://en.wikipedia.org/wiki/IT_energy_management>
13. <https://arxiv.org/pdf/1910.00731>
14. <https://epoch.ai/gradient-updates/how-much-energy-does-chatgpt-use>
15. <https://www.datacenterdynamics.com/en/news/roughly-one-third-of-data-center-owners-and-operators-doing-ai-training-or-inference-uptime-institute/>
16. <https://journal.uptimeinstitute.com/large-data-centers-are-mostly-more-efficient-analysis-confirms/>
17. <https://www.ashb.com/public_research/is-2025-107-uptime-institute-global-data-center-survey-2024/>
18. <https://www.microsoft.com/en-us/microsoft-cloud/blog/2024/12/09/sustainable-by-design-next-generation-datacenters-consume-zero-water-for-cooling/>
19. <https://introl.com/blog/water-usage-efficiency-wue-ai-data-center-cooling-guide-2025>
20. <https://intelligence.uptimeinstitute.com/resource/uptime-institute-global-data-center-survey-2025>
21. <https://www.networkenvironments.com/key-insights-uptime-institute-2025-global-data-center-survey/>
22. <https://www.datacenterdynamics.com/en/news/microsofts-upcoming-data-centers-to-use-closed-loop-zero-water-evaporation-design/>
23. <https://assets.publishing.service.gov.uk/media/688cb407dc6688ed50878367/Water_use_in_data_centre_and_AI_report.pdf>
24. <https://www.bloomberg.com/graphics/2025-ai-impacts-data-centers-water-data/>
25. <https://pmc.ncbi.nlm.nih.gov/articles/PMC12827721/>
26. <https://www.esgdive.com/news/google-commits-to-replenish-more-water-than-it-uses-by-2030/822021/>
27. <https://www.sciencedirect.com/science/article/pii/S2666389925002788>
28. <https://datacentremagazine.com/news/google-environmental-report-2025-the-data-centre-impact>
29. <https://sustainability.google/operations/>
30. <https://qz.com/google-water-replenishment-data-centers-2030-060426>
31. <https://redmondmag.com/articles/2024/12/09/microsoft-rolls-out--water-saving-datacenter-design.aspx>
32. <https://build.inc/insights/zero-water-cooling-data-centers>
33. <https://dl.acm.org/doi/10.1145/3724499>
34. <https://arxiv.org/pdf/2508.15734>
35. <https://felloai.com/how-much-water-does-chatgpt-use/>
36. <https://arxiv.org/pdf/2512.11863>
37. <https://kanaky.xyz/blog/ai-water-consumption/>
38. <https://blog.andymasley.com/p/an-example-of-what-i-consider-a-misleading>
39. <https://arxiv.org/pdf/2304.03271>
40. <https://www.szsanyi.com/en/blog/nvidia-hvdc>
41. <https://forklog.com/en/meta-to-develop-5-gw-data-center/>
42. <https://theaiinsider.tech/2025/07/16/meta-releases-hyperion-and-prometheus-to-power-ai-ambitions-with-5gw-data-center-buildout/>
43. <https://crbonfree.com/blog/how-much-energy-does-gemini-use>
44. <https://cryptobriefing.com/iea-ai-data-center-power-demand-double-2030/>
45. <https://aimultiple.com/ai-energy-consumption>
46. <https://iea.blob.core.windows.net/assets/86ed1178-4d77-45ac-ab38-28e849f3b93f/EnergyandAI.pdf>
47. <https://arxiv.org/pdf/2605.18935>
48. <https://www.scientificamerican.com/article/ai-will-drive-doubling-of-data-center-energy-demand-by-2030/>
49. <https://arxiv.org/pdf/2606.21064>
50. <https://www.energy.gov/articles/doe-releases-new-report-evaluating-increase-electricity-demand-data-centers>
51. <https://www.belfercenter.org/research-analysis/ai-data-centers-us-electric-grid>
52. <https://techxplore.com/news/2025-01-electricity-demand-centers.html>
53. <https://bies.lbl.gov/news/berkeley-lab-report-evaluates-increase-electricity-demand-data-centers>
54. <https://www.iea-4e.org/wp-content/uploads/2025/05/Data-Centre-Energy-Use-Critical-Review-of-Models-and-Results.pdf>
55. <https://arxiv.org/abs/2508.15734>
56. <https://towardsdatascience.com/lets-analyze-openais-claims-about-chatgpt-energy-use/>
57. <https://verdalytics.com/posts/how-much-energy-chatgpt-use-real-numbers>
58. <https://www.offsetai.app/methodology-transparency-calculations>
59. <https://felloai.com/how-much-energy-does-chatgpt-use/>
60. <https://catalog.ngc.nvidia.com/orgs/nvidia/teams/nemo/models/llama-3_1-8b-instruct-nemo>
61. <https://huggingface.co/Undi95/Meta-Llama-3.1-8B-Instruct-OAS>
62. <https://www.technologyreview.com/2025/05/20/1116327/ai-energy-usage-climate-footprint-big-tech/>
63. <https://epoch.ai/data-insights/grok-4-training-resources>
64. <https://arxiv.org/pdf/2310.15274>
65. <https://epochai.substack.com/p/how-much-energy-does-chatgpt-use>
66. <https://deluair.com/consultancy/insights/frontier-ai-training-cost-2026>
67. <https://keentelengineering.com/nerc-large-loads-grid-reliability>
68. <https://arxiv.org/pdf/2512.21295>
69. <https://eepower.com/news/nerc-warns-ai-data-centers-threaten-grid-reliability/>
70. <https://arxiv.org/pdf/2510.05437>
71. <https://genviss.in/hidden-water-behind-ai-india-data-centres/>
72. <https://www.sahi.com/blogs/meta-reliance-jamnagar-data-center-india-ai-infrastructure>
73. <https://cloudnews.tech/ais-hidden-cost-in-india-more-electricity-and-growing-pressure-on-water/>
74. <https://treelife.in/reports/india-budget-2026-data-centres-it-tech-global-ai/>
75. <https://india.mongabay.com/2026/05/india-bets-on-data-centres-even-as-water-energy-use-concerns-mount/>
76. <https://www.moduledge.com/blog/nvidia-blackwell>
77. <https://gpusmith.com/articles/en/nvidia-kyber-rack-scale-system-explained>
78. <https://www.fibermall.com/blog/nvidia-gb200-superchip.htm>
79. <https://datacenterscope.com/ai-infrastructure/gpu-rack-power/>
80. <https://www.moduledge.com/blog/nvidia-vera-rubin>
81. <https://www.jll.com/content/dam/jllcom/en/global/documents/reports/research-reports/26-research-global-data-center-outlook-new.pdf>
82. <https://rax.ae/knowledge-center/articles/nvidia-blackwell-gb200-nvl72-data-center-guide.html>
83. <https://apxml.com/models/llama-3-1-405b>
84. <https://buy.hpe.com/us/en/compute/rack-scale-system/nvidia-nvl-system/nvidia-gb200-nvl72-by-hpe/p/1014890104>
85. <https://www.hpe.com/us/en/collaterals/collateral.a50009224enw.html>
86. <https://pantheon.run/learn/nvidia-gb200-nvl72-power-and-cooling>
87. <https://x.com/TheValueist/status/1984753651148050467>
88. <https://lecompute.fr/en/silicon/800-vdc-ai-data-center-power/>
89. <https://archdesk.com/blog/global-ai-data-center-construction-2026>
90. <https://smartbarrel.io/blog/data-center-construction-costs/>
91. <https://developer.nvidia.com/blog/nvidia-800-v-hvdc-architecture-will-power-the-next-generation-of-ai-factories/>
92. <https://blog.se.com/datacenter/2025/10/16/the-1-mw-ai-it-rack-is-coming-and-it-needs-800-vdc-power/>
93. <https://spectrum.ieee.org/5gw-data-center>
94. <https://jasperbernaers.com/ai-gigawatts/>
95. <https://datacentremagazine.com/critical-environments/microsoft-constellation-restarting-a-nuclear-reactor>
96. <https://www.constellationenergy.com/about/locations/crane-clean-energy-center.html>
97. <https://constellationenergy.gcs-web.com/news-releases/news-release-details/one-year-later-crane-clean-energy-center-still-spotlight-and>
98. <https://smrintel.com/nuclear-data-center-deals/>
99. <https://sherwood.news/tech/clash-of-the-titans-here-are-the-biggest-ai-data-center-projects/>
100. <https://economymiddleeast.com/news/meta-unveils-multi-billion-dollar-plans-for-prometheus-ai-data-center-a-1-gw-supercluster/>
101. <https://thetechnologyexpress.com/metas-mark-zuckerberg-announces-ambitious-5gw-ai-data-center-build/>
102. <https://mexicobusiness.news/infrastructure/news/jll-rejects-data-center-bubble-fears-amid-ai-boom>
103. <https://www.coradvisors.net/2026/06/ai-data-center-development-costs-2026.html>
104. <https://masllp.com/how-to-set-up-a-data-centre-in-india-a-simple-2026-guide-for-foreign-companies/>
105. <https://www.imarcengineering.com/blog/data-center-development-in-india>
106. <https://www.aicerts.ai/news/iea-warns-ai-energy-demand-to-double-data-centre-power-by-2030/>
107. <https://gpusmith.com/articles/en/how-much-water-do-data-centers-use>
108. <https://letsdatascience.com/news/nerc-issues-level-3-alert-on-data-center-loads-5b6e48df>
109. <https://www.pib.gov.in/PressNoteDetails.aspx?ModuleId=3&NoteId=156786&lang=1&reg=3>
110. <https://www.pib.gov.in/PressReleasePage.aspx?PRID=2229397&reg=48&lang=2>
111. <https://www.newsgram.com/business/2026/03/25/indiaai-mission-onboards-38231-gpus-190-projects-approved-jitin-prasada>
112. <https://www.pib.gov.in/PressReleasePage.aspx?PRID=2132817&reg=48&lang=2>
113. <https://en.wikipedia.org/wiki/India_AI_Impact_Summit_2026>
114. <https://ai.icai.org/articles_details.php?id=258>
115. <https://yotta.com/data-center-in-india/>
116. <https://www.prnewswire.com/news-releases/yotta-data-services-receives-frost--sullivans-2026-indian-company-of-the-year-recognition-for-leadership-in-sovereign-ai-infrastructure-302806131.html>
117. <https://www.cbinsights.com/company/cyfuture>
118. <https://www.hpcwire.com/off-the-wire/yotta-plans-2b-nvidia-blackwell-ultra-supercluster-deployment-in-india/>
119. <https://www.datacenterdynamics.com/en/news/yotta-data-services-to-invest-2bn-in-20000-nvidia-blackwell-deployment-in-noida-india/>
120. <https://tele.net.in/yotta-to-deploy-nvidia-blackwell-hgx-b300-superclusters-with-over-20000-nvidia-blackwell-ultra-gpus/>
121. <https://www.datacenterdynamics.com/en/news/reliance-industries-to-build-gw-scale-ai-data-center-in-gujurat-india/>
122. <https://techcrunch.com/2025/01/23/reliance-plans-world-biggest-ai-data-centre-in-india-report-says>
123. <https://techcrunch.com/2025/08/29/billionaire-ambani-taps-google-meta-to-build-indias-ai-backbone>
124. <https://www.business-standard.com/markets/reliance-industries-ltd-share-price-476/news/page-4>
125. <https://techcrunch.com/?p=3094292>
126. <https://www.ril.com/sites/default/files/2026-06/10062026_MR_Reliance_and_Meta_to_Develop_AI-Enabled_Data_Centre_in_Jamnagar_Gujarat.pdf>
