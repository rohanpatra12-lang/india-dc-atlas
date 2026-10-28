<!-- Report 20 of the India Data Centre Atlas research series (AI training vs AI inference data centres; atlas chapter 11). Produced with AI-assisted web research, 14 Oct 2026, and kept as written at the time. The atlas standards register (src/data/standards.js) is authoritative where figures differ (for example India grid water 2.9 L/kWh and grid CO₂ 0.675 t/MWh after the October 2026 corrections). -->

# AI Training vs AI Inference Data Centres: Hardware, Power, Cooling, Water, Cost and Grid Impact (India Atlas edition, October 2026)

At the rack level, training and inference halls now run on much the same silicon: frontier inference increasingly uses the same liquid-cooled 120–220 kW NVL72-class racks as training. The real differences are in how the load behaves, how the site is chosen and how much redundancy it carries. Training is a flat, near-100% load with sub-second synchronized swings, sited wherever cheap power is available in bulk. Inference is a diurnal load averaging roughly 60–80%, sited near users, more redundant, and over a model's life it uses most of the energy and water. For the India Data Centre Atlas, this means one "AI hall" type is no longer enough. Split it into two archetypes that differ mainly in load factor, load shape, redundancy, siting and which grid region's water intensity applies, rather than mainly in kW per rack.

## TL;DR

- **The hardware is converging; the operating profile is not.** Training clusters (16,000 to 200,000+ GPUs) run near 97% of provisioned power at peak, with megawatt-scale power swings at 0.2–3 Hz. Inference clusters peak around 79% and follow daily user demand, which leaves about 21% of power headroom that can be oversubscribed (versus about 3% for training). Inference-specific parts such as Rubin CPX, TPU Ironwood and L4/L40S-class cards widen the density range at the low end, but flagship inference now also sits in 132–220 kW liquid-cooled racks.
- **Inference dominates lifetime energy and water.** Per query the numbers are tiny: 0.24 Wh and 0.26 mL on-site water for the median Gemini prompt; about 0.3 Wh for GPT-4o (Epoch AI). Repeated billions of times a day, that adds up. Training Llama 3.1 405B took about 21.6 GWh at GPU TDP (my estimate). At 1 billion queries a day and 0.3 Wh each, inference matches that in roughly 10 weeks. Projections put inference at 20.9 GW versus 23.1 GW for training in 2025, rising to 93.3 GW versus 62.2 GW by 2030 (McKinsey).
- **India's AI build-out so far leans towards inference.** The IndiaAI Mission has 38,000+ subsidised GPUs at ₹65/GPU-hour and is inference-heavy by request count. Reliance targets the "world's lowest AI inferencing cost". The Google–Adani 1 GW Visakhapatnam hub also serves Search and YouTube. Sovereign training (e.g., Sarvam on 4,096 H100s) still uses most GPU-hours today: Abhijeet Kate, co-founder of digiCloud Solutions, told Business Standard (30 June 2026) that "training still accounts for around 80 per cent of total GPU hours consumed". The Atlas should model inference halls near metros (Mumbai, Chennai, Hyderabad) with high redundancy and a 0.6–0.8 load factor. Training halls belong at renewable-rich coastal or inland sites with about a 0.9 load factor and a near-flat profile.

## Key Findings

1. **Rack density no longer separates training from inference.** GB200 NVL72 draws about 120–132 kW. GB300 NVL72 draws up to 142 kW nominal (peaks around 155 kW). Vera Rubin NVL72 is put at about 190 kW (Max-Q) to 230 kW (Max-P) by analyst Ming-Chi Kuo, and at "180kW-220kW" by SemiAnalysis, which says "TDP up to 220kW for the 2300W Rubin TDP SKU". The inference-specific Vera Rubin NVL144 CPX rack is about 370 kW. All of these serve both workloads. The low-density tail (air-cooled 8-GPU HGX at 10–14 kW per chassis, L4/L40S/RTX PRO servers) exists mainly in inference and enterprise halls.
2. **What really separates them is load shape.** Microsoft/OpenAI/NVIDIA production data show synchronized training swings of "tens or hundreds of megawatts", with spectral energy concentrated at 0.2–3 Hz. NERC rates these as "high likelihood, high impact". On 4 May 2026 it issued a Level 3 Essential Action Alert, "Computational Load Modeling, Studies, Instrumentation, Commissioning, Operations, Protection, and Control", with responses due 3 August 2026. Inference follows a diurnal pattern. An Azure-derived trace in Wilkins, Kazhamiaka & Rajagopal's "From Servers to Sites" (March 2026) shows a peak-to-average ratio of 1.19 and a load factor of 0.84.
3. **Per unit of work, inference is cheap; in aggregate it dominates.** Mistral's lifecycle analysis attributes 91% of Large 2's water to training plus inference. It reports 45 mL per 400-token response on a full lifecycle basis, against Google's 0.26 mL on-site-only figure. That gap is about 170×, and it is mostly a difference in what each counts (scope), not in efficiency.
4. **Cost per MW differs mostly in IT, not in the building.** Epoch AI puts a 1 GW AI campus at about $37.9 billion of capex. Servers are $21.2 billion and networking $4.9 billion, with an annualised TCO of $8.5 million/MW/year. India's AI-ready shells cost ₹70–95 crore/MW versus ₹50–55 crore/MW for air-cooled Tier III.
5. **Water intensity in India is driven by the grid.** Li et al.'s India scenario uses 3.445 L/kWh off-site water intensity. That dwarfs on-site WUE for liquid-cooled halls, so whether a training hall sits on a coal-heavy or a renewables-heavy grid matters more than its cooling design.

## 1. Hardware Differences

### 1.1 Accelerators

| Part | Primary role | Power (TDP) | Memory | Notes |
|---|---|---|---|---|
| NVIDIA H100 SXM | Training (now widely used for inference too) | 700 W | 80 GB HBM3 | Llama 3.1 trained on 16,384 of these |
| H200 | Training/inference | ~700 W class | 141 GB HBM3e | HGX 8-GPU about 10 kW per chassis |
| B200 | Training/inference | 1,000–1,200 W | 180 GB HBM3e | HGX B200 about 14 kW per chassis |
| B300 / GB300 (Blackwell Ultra) | Training and large-scale inference | ~1,400 W | 288 GB HBM3e | GB300 NVL72: 20.7 TB pooled HBM |
| Vera Rubin (VR200) | Training + decode inference | Up to 2,300 W SKU (SemiAnalysis; NVIDIA has not published) | 288 GB HBM4 | 50 PF NVFP4 inference / 35 PF training per GPU (NVIDIA, CES 2026) |
| Rubin CPX | Inference prefill (long context) | ~800 W chip / ~880 W module (SemiAnalysis estimate) | 128 GB GDDR7 (no HBM) | NVIDIA: 30 PF NVFP4; SemiAnalysis: 20 PF dense, about 2 TB/s |
| Google TPU v7 Ironwood | Billed as "first TPU for the age of inference"; also trains | Not disclosed per chip | 192 GB HBM3e, 7.37 TB/s | 4,614 FP8 TFLOPS; pods of 256 or 9,216 chips (42.5 EF FP8, 1.77 PB HBM), liquid-cooled |
| L4 / L40S / RTX PRO 6000 class | Inference, vision, small models | ~72–600 W | GDDR | Air-coolable PCIe servers; typical of enterprise/edge inference |

Three hardware points matter for the Atlas:

- **Precision.** Training runs mostly in BF16/FP8. Inference is moving to FP8/FP4 (NVFP4), roughly doubling throughput per watt with each step down in precision. This is a big reason energy per prompt fell 33× at Google in one year.
- **Memory is the bottleneck for inference.** The decode phase is limited by memory bandwidth, not by compute. That is why inference parts emphasise HBM capacity (Ironwood 192 GB, B300 288 GB), or split the work: CPX handles compute-heavy prefill with cheaper GDDR7, and HBM GPUs handle decode. Treat claims that CPX has been "replaced" by SRAM-based (Groq-derived) LPX racks as unconfirmed; they come from a single vendor blog.
- **Batch sizes.** Training uses large global batches spread across thousands of GPUs. Inference batches are dynamic and constrained by latency targets (time-to-first-token, time per output token). This is why inference GPUs average well below their peak power.

### 1.2 Rack and cluster architecture

- **Scale-up domain.** NVLink connects 72 GPUs (NVL72) into one memory domain; Rubin Ultra "Kyber" targets about 600 kW racks in 2027. Google's TPU domain is a 64-chip cube linked through optical circuit switches into a 9,216-chip superpod. Training needs this domain for tensor and expert parallelism. Large mixture-of-experts inference now needs it too, which is why NVL72 is used for frontier inference.
- **Scale-out network.** Training clusters need a non-blocking InfiniBand or Ethernet fabric across the whole cluster, typically one 400–800 Gb/s NIC and its optics per GPU. Clusters have grown from under 10 MW to over 100 MW, and a single job can span more than 100,000 GPUs (Microsoft/OpenAI/NVIDIA). Inference pools are smaller replicas of one to a few racks, need far less east-west bandwidth, and are spread across sites.
- **Cluster sizes.** Training: Meta Llama 3.1 405B used 16,384 H100s for 54 days; xAI Colossus 1 grew to about 200,000 H100/H200-class GPUs at about 250 MW. Inference: pools sized to demand in each region, often colocated with CPU cloud.
- **CPU-to-GPU ratio.** Grace/Vera NVL72 racks use 1 CPU per 2 GPUs. Google found that host CPU/DRAM accounts for 25% of median-prompt energy, and idle reserve machines plus facility overhead account for much of the rest. The accelerator alone is only 58%.
- **Reliability.** Meta logged 419 unexpected interruptions in 54 days (one every 3 hours), roughly half GPU- or HBM-related. Training therefore relies on frequent checkpointing to storage. These checkpoints are themselves a source of synchronized power dips.

### 1.3 Rack power density

| Configuration | kW per rack | Liquid vs air split |
|---|---|---|
| Industry average rack (Uptime, 2025) | ~7.6 | Air |
| HGX H200 / B200 8-GPU (air or DLC) | ~10–14 per chassis; 30–40 per rack | Air / rear-door / DLC |
| GB200 NVL72 | ~120 nominal, 130–132 observed | ~115 kW liquid / 17 kW air (HPE) |
| GB300 NVL72 | 132–142 nominal; ~155 peak | ~128 kW liquid / 14 kW air; 85/15 hybrid (SemiAnalysis) |
| Vera Rubin NVL72 | ~180–230 (estimates; NVIDIA has not published) | 100% liquid, fanless trays |
| Vera Rubin NVL144 CPX (inference) | ~370 (SemiAnalysis estimate) | Liquid |
| Rubin Ultra Kyber (2027) | ~600; roadmap toward 1 MW | Liquid, 800 VDC |

**Conclusion:** frontier inference racks are now as dense as training racks, and in the CPX variant denser. Inference halls overall have a lower *average* density only because they mix in air-cooled PCIe servers and lower-tier GPUs. The Atlas's 132–600 kW AI-hall range fits both; add an 8–40 kW "inference-edge/enterprise" sub-class.

### 1.4 Facility modifications

- **Cooling.** Direct-to-chip liquid cooling is mandatory for NVL72. It carries 85–90% of heat on GB200/GB300 and 100% on Rubin, with leftover air loads of 14–17 kW per rack. One reference design calls for coolant loop capacity at 45 °C warm-water supply (secondary source).
- **Floor loading.** A GB200/GB300 NVL72 rack weighs about 1.36–1.58 tonnes, so the building needs a slab or reinforced floor rather than a legacy raised floor.
- **Power distribution.** Today this is 415/480 V AC to rack power shelves (8 × 33 kW on GB200/GB300) feeding a 50 V DC busbar (1,400 A on GB300). Vera Rubin uses four 110 kW shelves in N+1. 800 VDC (or ±400 VDC per OCP) arrives with Kyber in 2027, replacing UPS/PDU chains with DC power rooms. A GB300 hall built today needs roughly 1.7–1.9× electrical headroom to take VR200 later.
- **Energy storage and UPS.** Training halls increasingly put batteries or capacitors in the rack or the PSU to absorb swings. Examples: Vera Rubin PSUs with built-in capacitors, the GB200 "minimum power floor" firmware, and Tesla Megapacks at xAI (about 150 MW of Megapacks at Colossus 1). The UPS is sized for waveform and ride-through behaviour, not just for autonomy minutes.
- **Redundancy.** This is industry practice rather than a published standard. Training campuses tolerate lower electrical redundancy (N or N+1, interruptible tariffs) because a job can restart from a checkpoint. xAI's TVA grid tie relied on demand-response interruptibility. Inference serving customer traffic requires Tier III/IV-like concurrent maintainability (2N power, N+1 cooling).
- **Location.** Training is latency-tolerant and goes where large, cheap, fast power is available, even off-grid. Colossus ran 35 gas turbines (about 422 MW) before its grid connection. Inference needs low round-trip latency to users and sits in or near metros and cable landing stations.

## 2. Power and Load Behaviour

### 2.1 Utilisation and load shape

| Metric | Training | Inference | Source |
|---|---|---|---|
| Peak power utilisation (cluster, of provisioned) | 97% | 79% | Microsoft POLCA (ASPLOS '24) |
| Usable oversubscription headroom | ~3% | ~21% | POLCA, as summarised in later measurement work |
| Pattern | Coordinated swings between compute and all-reduce phases, plus checkpoint dips | Diurnal: rises after ~9 am, falls after ~10 pm; prompt-phase peaks, token-phase troughs | POLCA; arXiv 2604.07345 |
| Swing frequency | FFT energy 0.2–3 Hz; iteration periods of about 1–10 s | Uncorrelated across racks | Microsoft/OpenAI/NVIDIA (arXiv 2508.14318) |
| Facility peak-to-average | ~1.0 when running (flat, but with sub-second swings) | 1.19; load factor 0.84 (Azure-derived trace) | arXiv 2603.18383 |
| Row-level swing within 2 s | Up to 37.5% of provisioned power | ~9% | Microsoft data as reported by a secondary analyst source (unverified) |

**Grid incidents and rules.** NERC's Large Loads Task Force warns that a training campus can drop around 300 MW "in moments" and ramp back up. It separately documented an unexpected loss of about 1,500 MW of data-centre load that grid operators had to absorb. On 4 May 2026 NERC issued a Level 3 Essential Action Alert on computational loads, with seven essential actions and responses due 3 August 2026. It cites "customer-initiated large load reductions and significant oscillations that occur in seconds", and coverage names AI training, alongside arc furnaces, as a likely source of forced oscillations. ERCOT's NOGRR282 (effective 1 August 2026) and utility caps on oscillation amplitude per frequency bin are emerging requirements. Mitigation options: software "filler" workloads (Microsoft's Firefly, under 5% throughput loss but wasted energy), GPU firmware ramp limits and power floors (GB200 and later), and rack-level or site-level storage. Inference halls currently face none of these requirements.

### 2.2 Training vs inference share of AI energy

| Source | Statement | Type |
|---|---|---|
| Epoch AI (Aug 2025) | AI power "splits roughly equally between training, experiments, and inference" today | Estimate |
| McKinsey (2025) | 2025: inference 20.9 GW, training 23.1 GW, non-AI 38.3 GW (82.3 GW total). 2030: inference 93.3 GW, training 62.2 GW, non-AI 63.5 GW (219 GW) | Model projection |
| Deloitte TMT Predictions 2026 (secondary reporting) | Inference about 1/3 of AI compute in 2023, ~1/2 in 2025, ~2/3 in 2026 | Forecast |
| Dean (2024), used in AI forecasting literature | ~40% of compute on training in 2024–26, falling to ~20% by end-2027 | Estimate |
| Industry aggregators | "80–90% of AI compute is inference" | Weakly sourced; treat as upper bound |

**How to read these.** The disagreement is mostly about the denominator: compute cycles versus spending versus power, and whether research experiments and synthetic-data generation count as training. Reasoning and agentic models blur the line further. Reinforcement-learning post-training *is* mostly inference-style rollouts, yet it runs on training clusters. Epoch also argues that training will "retain a large share" because frontier training power keeps growing 2.2–2.9× per year: individual runs exceed 100 MW today and could reach 4–16 GW by 2030. A defensible Atlas default for 2026 is about 40–50% training and 50–60% inference by energy, moving to about 30/70 by 2030.

### 2.3 Energy per unit of output

**Inference (reported and estimated):**
- Google Gemini Apps median text prompt (May 2025): **0.24 Wh**, 0.03 gCO₂e, 0.26 mL water. A narrower accelerator-only method gives 0.10 Wh. Energy per prompt fell 33× over 12 months. Reported value, not peer-reviewed; prompt length not disclosed.
- OpenAI (Altman, June 2025): **0.34 Wh** and about 0.32 mL per average ChatGPT query. Company claim, no methodology.
- Epoch AI: GPT-4o about **0.3 Wh** for a typical query (500 output tokens); **2.5–40 Wh** for very long inputs. Estimate.
- Reasoning and frontier models: the University of Rhode Island AI Lab (August 2025, first reported by The Guardian) estimated that a 1,000-token GPT-5 response uses "an average just over 18.35 Wh", up to 40 Wh, against 2.12 Wh for GPT-4. Reasoning queries can use 10–100× a short chat reply. Estimate; wide uncertainty.

**Training (reported and estimated):**
- Llama 3.1 (all sizes): 39.3 M H100 GPU-hours, of which 30.84 M were for 405B. Location-based emissions: 11,390 tCO₂e total, 8,930 t for 405B (Meta, reported). Energy at TDP: 30.84 M × 0.7 kW ≈ **21.6 GWh** for 405B, about 27.5 GWh for the whole family. With PUE 1.08 that is about 29.7 GWh, matching an academic estimate of "approximately 30 GWh". A widely repeated press figure of "over 11 GWh" conflicts with Meta's own GPU-hours × TDP and should not be used.
- xAI Colossus 1: about 150 MW grid supply plus 35 turbines (about 422 MW nameplate), and about 250 MW at 200,000 GPUs (company/press figures). Epoch: frontier training runs now exceed 100 MW.
- GPT-3 (2020): the "Making AI Less Thirsty" paper's scenarios assume about 1.29 GWh. GPT-4 has no official figure.

**Life-cycle crossover (my calculation).** At 0.3 Wh per query, 21.6 GWh equals about 72 billion queries. At 1 billion queries a day, that is about 10 weeks of serving. Epoch makes the same point: GPT-4o's training power was comparable to its serving power, but the model is served for far longer than it was trained.

### 2.4 PUE, grid connection and flexibility

- **PUE.** Liquid-cooled AI halls at hyperscalers report fleet PUEs of 1.08–1.09 (Google 1.09, Meta 1.08 in 2023). The GPT-3 water paper uses PUE 1.43 for a Microsoft Asian site. Training halls with ~100% liquid cooling and flat load should reach the lower end (estimate ~1.1–1.2 in Indian climates). Inference halls carry more air-cooled IT and run at part load, which raises PUE (estimate ~1.2–1.4).
- **Grid connection size.** Training campuses are 150 MW to more than 1 GW at a single point of connection (Colossus, Stargate at 1.2 GW, Meta Louisiana above 2 GW). Inference sites range from 10–100 MW metro halls to hyperscale regions.
- **Flexibility.** Training can shift in time, be interrupted and move between sites, which makes it a demand-response asset. xAI accessed grid power within a year in exchange for interruptibility. Inference can only shift *between* regions, and is otherwise firm, diurnal load.

## 3. Cooling and Water

### 3.1 Cooling technology by hall type

| | Training hall | Inference hall |
|---|---|---|
| IT cooling | 85–100% direct-to-chip; facility water about 30–45 °C (roughly ASHRAE W32–W45) | Mixed: DLC for NVL72/TPU pods; air or rear-door for PCIe/HGX servers |
| Heat rejection | Dry coolers / adiabatic coolers feasible year-round at warm-water temperatures; towers where water is cheap | Chillers plus towers or adiabatic coolers for the air-cooled share; denser metro sites have less space for dry coolers |
| On-site WUE (estimate) | ~0–0.5 L/kWh with dry/adiabatic; 1–1.8 L/kWh with evaporative towers in hot climates | ~0.5–1.8 L/kWh, depending on how much of the load is air-cooled |

**Reference values.** Google's fleet water intensity implied by the Gemini figures is about 1.1 L/kWh (my derivation: 0.26 mL ÷ about 0.24 Wh, net of overhead). Liquid-cooled halls cost $4.5–5.2 million/MW to cool, versus about $1.8 million/MW for air (Archdesk, 2026). Retrofitting an existing hall for liquid cooling costs about $2 million/MW (STL Partners).

### 3.2 Water per unit of output

| Unit | Value | Scope | Status |
|---|---|---|---|
| GPT-3 training (Microsoft US) | 700,000 L on-site; 5.4 million L total | Scope 1 + Scope 2 water | Estimate (Li, Yang, Islam, Ren) |
| GPT-3 per medium response | 500 mL per 10–50 responses (10–50 mL each); India scenario 19.7 mL/request, almost all off-site (EWIF 3.445 L/kWh) | Scope 1 + 2 | Estimate |
| Updated GPT-4-class prompt (Ren group, 2026) | ~15 mL total, ~5 mL on-site | Scope 1 + 2 | Estimate (secondary reporting) |
| Gemini median prompt | 0.26 mL | On-site only (fleet WUE) | Reported |
| ChatGPT average | ~0.32 mL | Unclear | Company claim |
| Mistral Large 2, 400-token response | 45 mL; 1.14 gCO₂e | Full lifecycle (ISO 14040/44-style, peer-reviewed with ADEME and Carbone 4) | Reported |
| Mistral Large 2 aggregate | 281,000 m³ (281 million L); 20.4 ktCO₂e | Sources disagree: "training" vs "training + 18 months of use" | Reported |

**Embodied (Scope 3) chip water.** I found no credible per-GPU figure for fab water. Mistral's lifecycle analysis puts hardware manufacturing mostly in the *materials* category (only 9% of water lies outside training plus inference). Leave this as a flagged gap rather than invent a value.

### 3.3 Which uses more water over a model's life

Inference uses more, for any model with significant deployment. On Mistral's own accounting, training plus inference make up 91% of lifecycle water. Scaling from energy (§2.3), inference passes a frontier training run within weeks to months of mass use. Training water is concentrated, though: one site, one season. A 100 MW+ evaporative training hall in a water-stressed basin is a local problem even if its lifetime share is small. Illustration (my estimate): Llama 3.1 405B-scale training (about 23 GWh with PUE) in India would carry about 70 million L of off-site water at 3.0 L/kWh, plus about 5–40 million L on-site depending on dry versus evaporative heat rejection.

## 4. Cost

### 4.1 Facility and IT capex

- **Global.** Traditional hyperscale costs about $10 million/MW; next-generation AI facilities $15–20 million/MW before IT (Goldman Sachs). JLL's 2026 global shell-and-core average is $11.3 million/MW, with India at about $6.5 million/MW. Fully built, including GPUs, AI facilities cost $30–45 million/MW.
- **Epoch AI 1 GW AI data centre (GB200-based).** Capex $37.9 billion: servers $21.2 billion, facility $11.4 billion, networking $4.9 billion, land $0.17 billion, utility works $0.16 billion. Opex about $0.9 billion/year. Annualised TCO $8.5 billion/year ($8.5 million/MW-year), of which servers are 60%.
- **Training vs inference capex per MW.** The building differs little. Training adds the full-bisection scale-out fabric: networking is about 13% of Epoch's capex, and optics per GPU is the largest variable within it. Inference adds redundancy (2N electrical) and metro land and power premiums. Some vendor analyses claim training costs more per MW; this is not quantified in primary sources. My working assumption: training ≈ inference ±10–15% per MW of facility, with training carrying more network capex and inference more resilience capex.
- **India.** SBI's April 2026 sector report: air-cooled Tier III non-AI costs ₹50–55 crore/MW; AI with immersion cooling or Tier IV up to ₹75 crore/MW; large campuses benefit from scale (₹35–45 crore/MW). Other estimates for AI-ready (20–50+ kW per rack, liquid) are ₹70–95 crore/MW. Global-density frontier AI campuses are reported at ₹150–200 crore/MW (secondary).

### 4.2 Operating economics

- **$/GPU-hour (2026 list prices).** CoreWeave GB200 NVL72: $10.50/GPU-hour. E2E Networks (India): H100 $3.99, H200 $5.29, B200 $7.99/hour. Yotta Shakti Cloud: H100 VM on-demand ₹356/hour; 8×H100 SLURM cluster ₹386 (monthly) down to ₹278 (2-year) per GPU-hour; B200 bare-metal ₹473 (monthly to 1-year) and ₹437 (2-year).
- **IndiaAI Mission.** Average L1 (lowest bid) ≈ ₹115/GPU-hour; H100 L1 ≈ ₹140. After the 40% subsidy users pay about ₹65 on average, and about ₹92 for H100 (Lok Sabha reply). Allocations: 93.18 lakh GPU-hours to 237 projects via 15 providers. The largest is Sarvam AI's 4,096 H100s on Yotta for 6 months: subsidy ₹98.7 crore against a ₹246.7 crore bill. My arithmetic puts that at about 17.9 million GPU-hours at about ₹138/hour, more than the reported 93.18 lakh total, so the official counts probably use different scopes.
- **Cost per million tokens.** Stanford HAI's AI Index 2025 reports that the cost of reaching GPT-3.5's MMLU score of 64.8 fell from $20 per million tokens (November 2022) to $0.07 (October 2024, Gemini-1.5-Flash-8B), "more than a 280-fold reduction". Inference price falls with each hardware generation and each precision step, which is why inference buyers favour the newest racks.
- **Training run cost.** Frontier training costs have grown about 2.5× per year (Epoch). GPT-4 is estimated at about $41 million amortised compute (Epoch database); current frontier runs cost in the hundreds of millions to billions. Llama 3.1 405B at about $2/GPU-hour would be about $62 million (my estimate).
- **Opex split.** For a conventional site: maintenance about 40%, electricity 15–25% (Thunder Said Energy). For AI sites, GPU depreciation dwarfs both: servers are 60% of TCO (Epoch). India power for 100 MW costs ₹591–1,248 crore/year depending on sourcing (secondary), against industrial tariffs of ₹7–10/kWh versus ₹3–4/kWh captive renewables.
- **Depreciation.** Hyperscalers depreciate servers over 5–6 years. Frontier training value falls faster (each NVIDIA generation is about 1 year), so older training GPUs move down to inference. This "training-to-inference cascade" means today's training hall is tomorrow's inference hall.

## 5. India Relevance

**Is India's capacity mostly training or inference?** By hardware intent and by number of users, it is inference. By GPU-hours consumed today, it may still be training-heavy:

- **IndiaAI Mission.** 38,000+ GPUs onboarded (mostly H100/H200, plus MI300X and Gaudi 2). The government has said it targets about 100,000 GPUs by December 2026 and plans to add 20,000 under "AI Mission 2.0". It funds 12 large foundation models (Sarvam, Soket, Gnani, Gan, BharatGen and others) out of 20 selected models. Abhijeet Kate, co-founder of digiCloud Solutions, told Business Standard (30 June 2026) that "training still accounts for around 80 per cent of total GPU hours consumed", while "more than 60 per cent of startups requesting access want GPUs for inference". In the same article, Omprakash Subbarao, CEO of FSID (IISc's R&D arm), describes "an uneven hardware mix in which a major portion of available GPUs are more suitable for inference than frontier model training". This is a single non-official source; MeitY's official wording is "training and inference".
- **Reliance Jamnagar.** First 120 MW in H2 2026, built on GB300, described as "equivalent to more than 75,000 H100 GPUs on an AI-inference basis". The stated 2024 goal is "the world's lowest AI inferencing cost". Separately, Meta leases a 168 MW built-to-suit Jamnagar facility for "core business and AI compute" without specifying training or inference.
- **Google–Adani Visakhapatnam.** About $15 billion over 2026–2030 across three campuses, 1 GW scaling to "multiple gigawatts", with TPUs and subsea cables. It will also serve Search, YouTube and Ads, i.e., inference-heavy. Some facilities are slated for 2028.
- **Others.** TCS HyperVault (up to 1 GW in Hyderabad, up to ₹70,000 crore; secondary) is aimed at "frontier AI companies and hyperscalers". India's total installed DC capacity is about 1.57–1.79 GW (2026), so announced AI campuses alone would multiply it.

**Siting implications.** Inference belongs near metros and cable landings: Mumbai, Chennai, Hyderabad, NCR, and Visakhapatnam as a new landing hub. Training can go to renewable-rich, land-cheap sites (Gujarat/Jamnagar, Rajasthan, coastal Andhra Pradesh) with captive solar, wind and storage. Hot, humid coastal climates (Mumbai, Chennai, Visakhapatnam) cut free-cooling hours for evaporative systems. But 40–45 °C warm-water liquid loops can reject heat through dry coolers for most of the year even at Indian ambient temperatures. Running training halls dry is therefore a realistic low-water option. Inference metro halls with air-cooled shares will lean on evaporative cooling and municipal water.

## Summary Comparison Table

| Parameter | AI training hall | AI inference hall |
|---|---|---|
| Chips | GB200/GB300 NVL72, Vera Rubin, H100/H200/B200, TPU pods, Trainium | Same flagships (NVL72, Ironwood) plus Rubin CPX, L4/L40S/RTX PRO, Inferentia, Groq/Cerebras, older training GPUs moved down |
| Rack kW | 120–230 today; ~600 by 2027 | Bimodal: 10–40 (PCIe/HGX) and 120–370 (NVL72/CPX) |
| Cluster size | 16k–200k+ GPUs in one fabric; 100 MW–GW | Replicas of 1–few racks; 10–100 MW sites, distributed |
| Utilisation / load factor | ~90–97% while a job runs | ~60–80% average; peak ≤79% of provisioned |
| Load shape | Flat plateau with synchronized 0.2–3 Hz swings and checkpoint dips | Diurnal; peak/average ~1.2 |
| Redundancy | N to N+1, interruptible acceptable (practice) | Tier III/IV-like (2N power) |
| Cooling | 85–100% DLC, warm water, dry/adiabatic rejection | Hybrid DLC + air; chillers/towers |
| WUE (on-site, estimate) | 0–0.5 L/kWh dry; up to ~1.8 evaporative | ~0.5–1.8 L/kWh |
| PUE (estimate, India) | ~1.1–1.2 | ~1.2–1.4 |
| Energy per unit | ~21.6 GWh (Llama 3.1 405B at TDP); frontier runs >100 MW | 0.24–0.34 Wh/short prompt; 2.5–40 Wh long; ~18.35 Wh per 1,000-token GPT-5 response (URI AI Lab) |
| Water per unit | 0.7 M L on-site / 5.4 M L total (GPT-3); 281 M L (Mistral, scope disputed) | 0.26 mL (on-site) to 45 mL (lifecycle) per prompt |
| Capex/MW | Facility ~$11–20 M (India ₹50–95 cr) + more networking | Similar facility cost + resilience/metro premium |
| Cost per output | Tens of $M to $B per frontier run | $0.07+/M tokens; ₹65–473/GPU-hour in India |
| Siting | Cheap, large, fast power; renewables; latency-tolerant | Near users, metros, cable landings |

## Estimates vs Reported Figures, and Where Sources Disagree

**Reported by operators or vendors:** Gemini 0.24 Wh / 0.26 mL / 0.03 g; Llama 3.1 GPU-hours and emissions; Mistral 45 mL / 1.14 g / 281,000 m³; Ironwood specs; GB200/GB300 reference rack power; IndiaAI GPU counts, prices and allocations; Yotta/E2E list prices; Reliance and Google capacity announcements.

**Estimates:** Epoch's GPT-4o 0.3 Wh and training-power forecasts; McKinsey's GW split; Li et al.'s GPT-3 water; Vera Rubin rack 180–230 kW (traces to a single analyst, Ming-Chi Kuo, plus SemiAnalysis); Rubin CPX TDP; per-hall PUE/WUE ranges and the Llama energy/water illustrations in this report (my calculations); the Indian GPU-hour training share (one consultant).

**Disagreements:**
1. **Per-prompt water spans 170×** (0.26 mL Google vs 45 mL Mistral vs 10–50 mL Li et al.). This is mainly scope: on-site only versus including electricity and manufacturing water.
2. **Mistral's 281,000 m³** is described as "training" by some outlets and as "training + 18 months of use" by others.
3. **Llama 3.1 405B energy:** "over 11 GWh" (press) vs about 21.6–30 GWh (GPU-hours × TDP × PUE).
4. **Inference share of AI compute:** ~33% (Epoch, equal three-way split) to 66% (Deloitte 2026) to 80–90% (aggregators). These use different denominators.
5. **Rubin CPX compute:** 30 PF (NVIDIA, sparse) vs 20 PF dense (SemiAnalysis). Its future is disputed by one vendor blog.
6. **IndiaAI subsidy:** a reported 100% for foundation models (unnamed sources) vs about 40% shown in the official Sarvam allocation table. The 93.18 lakh GPU-hour total looks inconsistent with Sarvam's implied ~17.9 M hours.
7. **Microsoft's "37.5% vs 9%" row-swing figure** appears only in a secondary analyst post.

## Implications for the India Data Centre Atlas

1. **Split "AI hall" into Training and Inference archetypes, and make load factor the main differentiator, not rack kW.** Suggested defaults: training load factor 0.90 (flat), inference 0.65–0.75 with a diurnal curve (peak/average 1.2, IST evening peak). Keep 132–600 kW for both, and add an 8–40 kW "inference-enterprise" sub-class for PCIe/HGX air-cooled deployments.
2. **Give them different cooling, PUE and WUE.** Training: 90–100% DLC with dry or adiabatic heat rejection by default (PUE 1.10–1.20, on-site WUE 0.0–0.5 L/kWh), with an evaporative toggle up to about 1.8 L/kWh. Inference: hybrid (PUE 1.2–1.4, WUE 0.5–1.8 L/kWh), worse in coastal metros. Keep grid water at about 3.0 L/kWh, or 3.445 L/kWh to match Li et al.'s India case, and let users vary it by state grid mix. For most Indian sites this off-site term will exceed on-site water.
3. **Model location and redundancy separately.** Put inference near metros and cable landings with 2N electrical (a capex uplift of ₹5–20 crore/MW). Training can sit at RE-rich sites with N+1 and captive renewables or storage, so its water and carbon should use the *local* grid or captive mix. Add flags for "behind-the-meter generation" and "BESS for power smoothing" (MWh per MW IT) on training halls.
4. **Show lifecycle splits.** Present per-model views ("one training run = X GWh / Y ML water; inference passes it after Z days at N queries/day") using defaults of 0.24–0.34 Wh and 0.26 mL on-site per prompt, with a reasoning multiplier of 10–60×. Present per-hall views using GPU-hour pricing (₹65 subsidised; ₹115–140 L1; ₹278–473 commercial) to link cost to energy.
5. **Build in a time dimension.** Halls built for training in 2026 will likely be re-purposed for inference within 2–4 years as GPUs move down the cascade. Inference's share of AI energy should rise from about 50–60% (2026) to about 70% (2030). Let users toggle the mix rather than hard-coding it, and flag that the Indian training-vs-inference split is poorly documented.

## Caveats

- Several vendor specs (Vera Rubin rack power, Rubin TDP, CPX roadmap) are not published by NVIDIA and may change.
- Per-prompt figures from Google and OpenAI are self-reported, use undisclosed prompt lengths, and cannot be checked independently.
- No credible per-GPU manufacturing water figure was found.
- The Indian training-vs-inference GPU-hour split rests on one consultant quote.
- Several India pricing and capacity figures (100,000-GPU target, TCS HyperVault, ₹150–200 crore/MW frontier cost) come from secondary outlets and should be confirmed before publication in the Atlas.
- PUE/WUE ranges by hall type are my engineering estimates derived from the sources above, not measured Indian values.

## Sources

1. mckinsey — https://www.mckinsey.com/featured-insights/week-in-charts/the-future-of-ai-workloads
2. TechCrunch — https://techcrunch.com/2025/10/14/google-to-invest-15b-in-indian-ai-infrastructure-hub
3. moduledge — https://www.moduledge.com/blog/gb300-nvl72
4. moduledge — https://www.moduledge.com/blog/nvidia-blackwell
5. pantheon — https://pantheon.run/learn/nvidia-gb200-nvl72-power-and-cooling
6. Substack — https://jasonagee.substack.com/p/ups-topology-selection-for-transient
7. arxiv — https://arxiv.org/html/2508.14318v2
8. itpro — https://www.itpro.com/technology/artificial-intelligence/mistrals-new-sustainability-tracker-tool-shows-the-impact-ai-has-on-the-environment-and-it-makes-for-sober-reading
9. arxiv — https://arxiv.org/pdf/2512.11863
10. epoch — https://epoch.ai/data-insights/ai-datacenter-cost-breakdown
11. bank — https://sbi.bank.in/documents/57189647/58231607/Sector+Report+DataCentre.pdf/f1919592-ee66-b50b-ea20-75fbb27c9bb5?t=1779885206866
12. imarcengineering — https://www.imarcengineering.com/blog/data-center-development-in-india
13. acm — https://cacm.acm.org/sustainability-and-computing/making-ai-less-thirsty/
14. theregister — https://www.theregister.com/2026/01/05/ces_rubin_nvidia/
15. semianalysis — https://newsletter.semianalysis.com/p/another-giant-leap-the-rubin-cpx-specialized-accelerator-rack
16. emergentmind — https://www.emergentmind.com/papers/2508.15734
17. thenewstack — https://thenewstack.io/google-says-the-median-gemini-prompt-uses-5-drops-of-water/
18. chiplog — https://www.chiplog.io/p/a-deep-dive-into-nvidia-rubin-cpx
19. siliconreport — https://www.siliconreport.com/google-tpu-ironwood-v7-explained-0b063bf9
20. spheron — https://www.spheron.network/blog/nvidia-rubin-cpx-long-context-inference/
21. moduledge — https://www.moduledge.com/blog/nvidia-vera-rubin
22. clarigital — https://www.clarigital.com/hardware/ai-chips/google-tpu/ironwood/
23. notebookcheck — https://www.notebookcheck.net/Meta-unveils-biggest-smartest-royalty-free-Llama-3-1-405B-AI.866775.0.html
24. tweaktown — https://www.tweaktown.com/news/99589/metas-huge-16-384-nvidia-h100-ai-gpu-cluster-hbm3-memory-crashed-half-of-llama-3-training/index.html
25. introl — https://introl.com/blog/xai-memphis-colossus-100000-gpu-supercomputer-infrastructure
26. x — https://x.com/Teslarati/status/1924760245337047231
27. google — https://services.google.com/fh/files/misc/measuring_the_environmental_impact_of_delivering_ai_at_google_scale.pdf
28. semianalysis — https://newsletter.semianalysis.com/p/vera-rubin-extreme-co-design-an-evolution
29. ifactoryapp — https://ifactoryapp.com/sap-integration/on-prem-ai/nvidia-gb300-nvl72-power-plant-deployment
30. tesery — https://www.tesery.com/blogs/news/xai-receives-more-tesla-megapacks-for-colossus-2
31. arxiv — https://arxiv.org/pdf/2606.04869
32. Substack — https://measuredai.substack.com/p/xai-colossus-data-center-cluster
33. Wikipedia — https://en.wikipedia.org/wiki/Colossus_(supercomputer)
34. microsoft — https://www.microsoft.com/en-us/research/wp-content/uploads/2024/03/GPU_Power_ASPLOS_24.pdf
35. arxiv — https://arxiv.org/pdf/2308.12908
36. arxiv — https://arxiv.org/html/2604.07345v1
37. arxiv — https://arxiv.org/html/2603.18383v1
38. eenews — https://www.eenews.net/articles/ai-power-demand-creates-high-likelihood-high-impact-grid-risks/
39. agentmarketcap — https://agentmarketcap.ai/blog/2026/04/17/ai-inference-overtakes-training-two-thirds-2026-compute
40. ai-2027 — https://ai-2027.com/research/compute-forecast
41. introl — https://introl.com/blog/ai-inference-vs-training-infrastructure-economics-diverging
42. presenc — https://presenc.ai/research/inference-vs-training-compute-split-2026
43. Substack — https://epochai.substack.com/p/power-demands-of-frontier-ai-training
44. google — https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference
45. greenly — https://greenly.earth/en-us/leaf-media/data-stories/ai-efficiency-a-gemini-reality-check-with-greenly
46. nriglobe — https://nriglobe.com/technology/how-much-water-ai-uses-per-prompt-2026-chatgpt-gemini-claude-real-numbers-data-center-sustainability/
47. devoteam — https://www.devoteam.com/expert-view/ai-water-consumption/
48. epoch — https://epoch.ai/gradient-updates/how-much-energy-does-chatgpt-use
49. nvidia — https://catalog.ngc.nvidia.com/orgs/nvidia/nemo/models/llama-3_1-8b-instruct-nemo/-
50. arxiv — https://arxiv.org/pdf/2412.06288
51. stratobuilds — https://stratobuilds.com/how-much-energy-does-an-ai-prompt-use/
52. arxiv — https://arxiv.org/pdf/2602.21012
53. archdesk — https://archdesk.com/blog/global-ai-data-center-construction-2026
54. coradvisors — https://www.coradvisors.net/2026/06/ai-data-center-development-costs-2026.html
55. datacenterscope — https://datacenterscope.com/ai-infrastructure/data-center-retrofit-cost/
56. arxiv — https://arxiv.org/pdf/2304.03271
57. arxiv — https://arxiv.org/abs/2304.03271
58. hiidude — https://hiidude.in/does-chatgpt-really-use-that-much-water.html
59. millionminer — https://millionminer.com/news/how-much-water-does-ai-use
60. deeplearning — https://www.deeplearning.ai/the-batch/french-ai-startup-discloses-full-lifecycle-consumption-and-emissions-for-mistral-large-2
61. devsustainability — https://www.devsustainability.com/p/mistrals-environmental-impact
62. goldmansachs — https://www.goldmansachs.com/insights/articles/tracking-trillions-the-assumptions-shaping-scale-of-the-ai-build-out
63. gainam — https://gainam.com/insights/ai-data-center-cost-per-mw
64. Substack — https://equitybypiyush.substack.com/p/data-centers-20-lac-cr-of-capex-in
65. spheron — https://www.spheron.network/blog/nvidia-vera-rubin-nvl72-guide/
66. e2enetworks — https://www.e2enetworks.com/pricing
67. shakticloud — https://shakticloud.ai/gpu-cluster/
68. shakticloud — https://shakticloud.ai/bare-metal-service/
69. shakticloud — https://shakticloud.ai/ai-workspace-vm/
70. business-standard — https://www.business-standard.com/amp/technology/tech-news/successful-gpu-bidders-likely-to-offer-compute-capacity-to-global-firms-126101100603_1.html
71. investmentguruindia — https://investmentguruindia.com/newsdetail/indiaai-mission-34-381-gpus-onboarded-from-14-empanelled-service-providers542393
72. indiantelevision — https://indiantelevision.com/regulators/indiaai-mission-backs-20-homegrown-ai-models-allocates-93-lakh-gpu-hours/
73. aifront-page — https://aifront-page.com/sovereign-ai-nic-data-centre-shastri-park-compute-system/
74. analyticsindiamag — https://analyticsindiamag.com/ai-features/indiaai-where-are-the-gpus
75. indiaai — https://www.indiaai.gov.in/hub/indiaai-compute-capacity
76. epoch — https://epoch.ai/files/AI_2030.pdf
77. arxiv — https://arxiv.org/pdf/2507.06379
78. thundersaidenergy — https://thundersaidenergy.com/downloads/data-centers-the-economics/
79. ellenox — https://www.ellenox.com/post/india-ai-infrastructure-statistics
80. kenresearch — https://www.kenresearch.com/industry-reports/india-graphics-processing-unit-market
81. valueaddvc — https://valueaddvc.com/blog/indias-ai-policy-2026-gpu-procurement-data-sovereignty-and-startup-support
82. pib — https://www.pib.gov.in/PressNoteDetails.aspx?ModuleId=3&NoteId=156786&lang=1&reg=3
83. eetimes — https://www.eetimes.com/india-to-add-20000-gpus-as-ai-mission-2-0-expands-compute-and-chip-push/
84. careerindia — https://www.careerindia.com/news/india-ai-gpu-hiring-2026-salary-packages-job-roles-access-subsidized-compute-011-66277.html
85. techobserver — https://techobserver.in/news/egov/indiaai-mission-gpu-hours-compute-system-lok-sabha-327929/
86. pib — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2132817&reg=48&lang=2
87. letsdatascience — https://letsdatascience.com/news/reliance-intelligence-operationalises-120mw-ai-backbone-in-j-e028b01c
88. TechCrunch — https://techcrunch.com/2026/02/19/reliance-unveils-110b-ai-investment-plan-as-india-ramps-up-tech-ambitions/
89. w — https://w.media/reliance-to-build-gw-scale-ai-ready-data-center-in-gujarat/
90. tech-insider — https://tech-insider.org/ca/google-15-billion-india-ai-data-centre-visakhapatnam-2026/
91. dmc-education — https://dmc-education.com/2026/10/02/indias-67b-data-centre-boom-the-rise-of-ai-hyperscale-infrastructure-2026-2030/
92. indmoney — https://www.indmoney.com/blog/stocks/reliance-meta-data-centre-deal-explained
93. ua — https://ua.news/en/world/google-z-adani-buduie-v-indiyi-shi-khab-za-15-mlrd-popri-sprotiv-selian-cbc
94. adani — https://www.adani.com/newsroom/media-releases/adani-and-google-partner-to-build-indias-largest-data-centre-campus-in-visakhapatnam
95. remio — https://www.remio.ai/post/google-visakhapatnam-ai-hub-puts-a-15-billion-promise-against-local-limits
96. business-standard — https://www.business-standard.com/amp/technology/artificial-intelligence/india-ai-compute-race-subsidised-gpu-capability-gap-126062900734_1.html
97. arxiv — https://arxiv.org/pdf/2508.15734
98. x — https://x.com/DeepLearningAI/status/1962621715797725487
99. nvidia — https://nvidianews.nvidia.com/news/nvidia-unveils-rubin-cpx-a-new-class-of-gpu-designed-for-massive-context-inference
100. inc42 — https://inc42.com/buzz/govt-to-offer-100-compute-subsidy-to-sarvam-others-for-foundational-models-report/
