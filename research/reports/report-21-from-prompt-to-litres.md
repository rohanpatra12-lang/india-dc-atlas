<!-- Report 21 of the India Data Centre Atlas research series (From prompt to litres: tokens, hardware, energy and water). Produced with AI-assisted web research, 16 Oct 2026, and kept as written at the time. The atlas standards register (src/data/standards.js) is authoritative where figures differ (for example India grid water 2.9 L/kWh and grid CO₂ 0.675 t/MWh after the October 2026 corrections). -->

# From Prompt to Litres: The Causal Chain Linking Tokens, Hardware, Energy and Water — An Atlas Chapter for India

A typical text prompt to a modern AI assistant uses about 0.2–0.4 Wh of facility electricity, which works out to about 0.3–2 mL of water once power-plant water is counted. That changes by two to three orders of magnitude depending on four levers: the number of tokens generated (reasoning, long documents, Indic-script "token tax"), how full the GPUs are kept (batching), model size, and above all the grid's water intensity. In India, off-site power-plant water is usually 80–90% of the total.

## TL;DR

- **The chain is multiplicative.** Water per prompt (mL) ≈ tokens × J/token × server overhead ÷ 3600 × (on-site WUE + PUE × grid water intensity), using 1 L/kWh = 1 mL/Wh. Google measured the median Gemini text prompt at 0.24 Wh and 0.26 mL, but that water figure is on-site only. Applying the atlas's India grid factor (5.0 L/kWh) to the same energy gives about 1.8 mL, roughly seven times more.
- **Tokens are the biggest behavioural lever.** A reasoning answer generates about 10× more tokens and uses about 25× more energy than a chat reply (ML.ENERGY v3). On GPT-4o's tokenizer, Kannada needs about 2.7× more tokens per word than English. Older tokenizers (Llama-3.1, GPT-4's cl100k) need about 12×, and Indic tokenizers (Sarvam-1) about 1.7×. A Kannada answer can therefore cost 1.7–12× the energy and water of the same answer in English.
- **Your calculator's structure is right, but fix two things.** First, use per-GPU aggregate throughput under batching, not per-user streaming speed. Second, use a server-overhead factor of about 1.57 that excludes PUE, then apply PUE separately; Google's 1.72 already contains PUE. On those corrected defaults, a 100 MW-IT Bengaluru campus could serve about 4 billion mixed prompts a day and consume about 6,300 m³ of water a day on the Karnataka grid, or about 12,900 m³ a day at the all-India grid factor.

## Key Findings

1. **Measured, comprehensive production data now exists, and it is low.** Google's August 2025 paper (Elsworth et al., arXiv:2508.15734) gives the median Gemini Apps text prompt in May 2025 as 0.24 Wh, 0.03 gCO₂e and 0.26 mL of water. The energy splits into active accelerators 0.14 Wh (58%), host CPU and DRAM 0.06 Wh (25%), idle reserve machines 0.02 Wh (10%) and data-centre overhead 0.02 Wh (8%). A narrower accelerator-only method, sampled from the most efficient sites, gives 0.10 Wh. That gap means the measurement boundary alone moves results by 2.4×.
2. **Independent estimates agree for chat.** Epoch AI estimates a GPT-4o query with 500 output tokens at about 0.3 Wh. OpenAI's CEO Sam Altman wrote in his June 2025 blog post "The Gentle Singularity" that the average ChatGPT query uses "about 0.34 watt-hours" and "about 0.000085 gallons of water" (about 0.32 mL), without giving a methodology. Jegham et al. ("How Hungry is AI?") estimate a short GPT-4o query at about 0.42 Wh.
3. **The estimates diverge sharply for reasoning and long contexts.** Jegham et al. estimate over 33 Wh for a long o3 or DeepSeek-R1 prompt. The University of Rhode Island AI Lab estimates that a medium-length, 1,000-token GPT-5 response averages "just over 18.35 Wh", up to 40 Wh, against 2.12 Wh for GPT-4. Both are inferred from API latency and assumed hardware, not measured, and Tom's Hardware judged that "the lab's test methodology is far from ideal." Epoch estimates about 2.5 Wh for a 10k-token input and nearly 40 Wh for a 100k-token input.
4. **Hardware efficiency is improving fast, but production utilisation decides real energy.** In MLPerf Inference v5.1, Blackwell Ultra reaches about 13,000 tokens/s per GPU on Llama 2 70B. Google's paper reports "a 33x reduction in energy consumption and a 44x reduction in carbon footprint for the median Gemini Apps text prompt over one year", of which 23× came from model improvements and 1.4× from better utilisation. ML.ENERGY finds that larger batch sizes cut energy per token by 3–5×.
5. **Water is dominated by electricity in India.** On the atlas's India-grid assumptions, with PUE 1.43 and on-site WUE 1.15 L/kWh, off-site water is 7.15 of the 8.30 L used per kWh of IT energy, or 86%. Li et al. ("Making AI Less Thirsty") model Microsoft's India sites at an on-site WUE of 0.000 L/kWh (dry cooling) but an off-site EWIF of 3.445 L/kWh. That gives 19.7 mL per GPT-3 request, all of it off-site.
6. **India is a heavy user but mostly not a disclosed host.** In a Times of India column reported by TechCrunch on 15 February 2026, Sam Altman said India has 100 million weekly ChatGPT users, "ChatGPT's second-largest user base after the United States". A MeitY factsheet published by PIB on 30 December 2025 reported that "over 38,000 GPUs have been onboarded", mostly H100 and H200, at a subsidised ₹65 per hour, and on 17 February 2026 Minister Ashwini Vaishnaw announced "an additional 20,000 GPUs to be added in the coming weeks". Providers do not disclose where Indian prompts are served.

## Details

### 1. The causal chain in one picture

```
USER PROMPT (words, images, audio, files)
   │  tokeniser (BPE / SentencePiece / tiktoken); fertility = tokens per word
   ▼
INPUT TOKENS  = system prompt + conversation history + RAG/tool context + user text + media tokens
OUTPUT TOKENS = visible answer + hidden reasoning ("thinking") tokens
   │  FLOPs ≈ 2 × active parameters per token (+ attention term growing with context length)
   ▼
COMPUTE  ── prefill (input; parallel, compute-bound) + decode (output; sequential, memory-bandwidth-bound)
   │  ÷ effective throughput of the accelerator under batching (tokens/s per GPU)
   ▼
GPU-SECONDS × actual GPU power draw (W, typically below TDP)  →  ACCELERATOR ENERGY (J)
   │  × server/fleet overhead (host CPU, DRAM, NICs, idle reserve)  ≈ 1.57 excluding PUE
   ▼
IT ENERGY (Wh)  ──×PUE──►  FACILITY ENERGY (Wh)  ──► grid electricity
   │                                    │
   │ × on-site WUE (L/kWh)              │ × EWIF of the grid (L/kWh)
   ▼                                    ▼
ON-SITE WATER (cooling towers,        OFF-SITE WATER (thermal/hydro
evaporation; Scope 1)                  generation; Scope 2)
                 └──────────── TOTAL WATER PER PROMPT ───────────┘
(+ amortised training energy/water and embodied hardware water — Scope 3, usually excluded)
```

### 2. Key equations (with units)

**(E1) Tokens per prompt.**
N_in = N_system + N_history + N_RAG/tools + N_user + N_media
N_out = N_visible + N_reasoning
For text in language L: N ≈ words × fertility_L (tokens/word). To compare the same content across languages, use the parallel-text token multiplier m_L = N_L / N_English.

**(E2) Compute.**
Inference FLOPs per token ≈ 2 × P_active + 2 × n_layers × n_ctx × d_attn (the second term is attention over the context).
Prompt FLOPs ≈ 2 × P_active × (N_in + N_out), plus attention terms that grow with context length.
Training FLOPs ≈ 6 × P × D (P = parameters, D = training tokens).
Mixture-of-experts (MoE) models use active parameters, not total, for FLOPs. Total parameters still set memory needs and the number of GPUs.

**(E3) KV cache memory per token (bytes)** = 2 × n_layers × n_kv_heads × d_head × bytes_per_value.
For Llama-3.1-70B (80 layers, 8 KV heads, d_head 128, FP16) that is about 0.33 MB per token, or about 2.7 GB for one 8k-token conversation. The KV cache, not compute, is what caps the batch size for long outputs.

**(E4) Accelerator energy per token (J/token)**
e = (P_TDP × f_power) / (η × T_bench)
- P_TDP: rated power (W).
- f_power: average draw as a fraction of TDP. Epoch uses about 0.7, from a Microsoft study.
- T_bench: benchmark aggregate throughput per GPU (tokens/s, e.g. MLPerf).
- η: production efficiency relative to the benchmark (utilisation, latency targets, idle). This is an estimate, typically 0.2–0.5.

**(E5) IT and facility energy per prompt (Wh)**
E_IT = (N_out × e_out + N_in × e_in) × k_IT / 3600
E_facility = E_IT × PUE
k_IT ≈ 1.57 = (0.14 + 0.06 + 0.02) / 0.14, from Google's breakdown with the PUE overhead removed. Google's own 1.72 multiplier includes its 1.09 PUE.

**(E6) Water per prompt (mL)**
W = E_IT (Wh) × [WUE_on-site (L/kWh) + PUE × EWIF (L/kWh)]
This works because 1 L/kWh = 1 mL/Wh, so no conversion factor is needed. It is the same structure Li et al. use: on-site WUE applies to server energy, and off-site EWIF applies to all facility electricity. Google applies WUE to (total − overhead) energy and does not count off-site water.

**(E7) Facility to prompts per day**
Prompts/day = (IT MW × 24 h × load factor × 10⁶ Wh/MWh) / E_IT (Wh per prompt)
Water/day (m³) = IT MWh/day × WUE + facility MWh/day × EWIF (since L/kWh = m³/MWh)
Grid connection (MVA) ≈ facility MW / power factor (about 0.95), plus redundancy.

**(E8) Training amortisation**
E_train ≈ GPU-hours × P_GPU × k_train × PUE
Amortised energy per prompt = E_train / lifetime prompts served

### 3. Prompts and tokenisation

**What a token is.** A token is a sub-word unit, numbered by an integer, from a fixed vocabulary of typically 32k–262k entries. Byte-Pair Encoding (BPE, used by OpenAI's tiktoken and Llama 3) starts from bytes and repeatedly merges the most frequent adjacent pairs. SentencePiece (Gemma, many Indic models) treats text as a raw stream, including spaces, and learns BPE or unigram pieces. Byte fallback means that unseen characters break into individual UTF-8 bytes. That is catastrophic for Indic scripts, where each character takes 3 bytes. For English, OpenAI states a token is about 0.75 words, and o200k_base measures about 1.22–1.23 tokens per word on FLORES-200.

**The Indic "token tax".** The table below shows per-word fertility on FLORES-200 and the premium over English. English baselines are 1.22 for o200k_base (GPT-4o), 1.24 for Llama-3.1 and Gemma-3, and 1.43 for Sarvam-1. Figures come from the BrahmicTokenizer-131K report (arXiv:2605.29379). The cl100k (GPT-4) column comes from "The Tokenizer Tax" (arXiv:2607.24276).

| Language | GPT-4 cl100k premium | GPT-4o o200k tokens/word (premium) | Llama-3.1 tokens/word (premium) | Gemma-3 tokens/word (premium) | Sarvam-1 tokens/word (premium) | Krutrim-1 tokens/word (premium) |
|---|---|---|---|---|---|---|
| Hindi | 4.1× | 1.64 (1.34×) | 2.67 (2.15×) | 1.39 (1.12×) | 1.40 (0.98×) | 3.30 (2.48×) |
| Bengali | 6.5× | 2.33 (1.91×) | 7.99 (6.44×) | 1.68 (1.35×) | 2.05 (1.43×) | 4.62 (3.47×) |
| Tamil | 9.9× | 3.15 (2.58×) | 12.28 (9.90×) | 2.36 (1.90×) | 2.16 (1.51×) | 6.73 (5.06×) |
| Telugu | 10.7× | 3.05 (2.50×) | 13.23 (10.67×) | 2.83 (2.28×) | 2.13 (1.49×) | 5.68 (4.27×) |
| Kannada | 12.1× | 3.30 (2.70×) | 14.90 (12.02×) | 3.26 (2.63×) | 2.40 (1.68×) | 6.12 (4.60×) |

Two independent FLORES studies, BrahmicTokenizer and Tokenizer Tax, agree on the o200k premium to within 0.02×. That makes it the best-supported figure. "The Tokenizer Tax" reports that moving from cl100k_base to o200k_base "cuts the mean Indic tax from 8.0× to 2.1×". Sarvam says existing multilingual models need "4 to 8 tokens per word" for Indic scripts, against 1.4 for English, and that Sarvam-1 achieves 1.4–2.1. BharatGen's 128K tokenizer reports Kannada at 2.17 tokens per word, against 13.81 for LLaMA and 11.08 for Qwen (PARAM-1, arXiv:2507.13390).

**Important nuance: tokens-per-word premium is not the same as the token premium on the same content.** Dravidian languages pack several English words into one agglutinated word, so a per-word premium overstates the total-token premium. Hindi splits postpositions into separate words, so for Hindi it can understate it. The one parallel-content audit, "Measuring the Tokenization Premium" (arXiv:2608.09046), measured GPT-4o total-token ratios of Hindi 1.72×, Bengali 1.56× and Tamil 2.09×. Those figures were measured on code-mixed tutoring text, which the authors say biases them low; Bengali-only items came out at 1.79–2.11×. The same study finds the effective 128k context window shrinks to 58% for Hindi and 48% for Tamil. For the calculator, we use parallel-text multipliers of about 1.7× for Hindi and about 2.5× for Kannada and Telugu (estimated by analogy with Tamil) on GPT-4o-class tokenizers. We use about 1.7× on Indic-optimised tokenizers, and 4–12× on legacy tokenizers.

**Why the tax multiplies energy.** Energy scales at least linearly with tokens. It scales slightly worse than linearly, because longer sequences use more KV-cache memory and force smaller batches. ML.ENERGY found energy per token was 1.5× higher at the same batch size when outputs were 11× longer. Attention cost in prefill grows with the square of context length, so a 2.5× longer prompt raises that component by up to about 6×.

**Typical token counts by prompt type.** These are working values; ranges marked as estimates are the author's synthesis.

| Prompt type | Input tokens | Output tokens (incl. hidden) | Basis |
|---|---|---|---|
| Short chat | 100–200 user + 500–2,000 system/history (estimate) | 250–700 | Chiang et al. mean 261; Epoch assumes 500; ML.ENERGY "Text Conversation" mean 717 |
| Long answer / essay | 200–2,000 | 1,000–2,000 | estimate |
| Coding assistant (single call) | 2,000–20,000 | 200–1,000 | estimate |
| Document summarisation | 10,000–100,000 | 300–1,000 | Epoch: 10k input ≈ 2.5 Wh, 100k ≈ 40 Wh (GPT-4o) |
| RAG Q&A | 2,000–8,000 | 300–600 | estimate |
| Reasoning model | 200–2,000 | 2,000–20,000 | ML.ENERGY "Problem Solving" mean 6,988 output tokens |
| Agentic multi-step | 10⁴–10⁶ cumulative (context re-read each step) | 10³–10⁵ | estimate |
| Image input | +hundreds to ~1,500 per image (model-specific; estimate) | as text | ML.ENERGY: image inputs cost 1.1–5.2× energy per token |
| Video input | thousands–tens of thousands | as text | ML.ENERGY: 1.3–15.0× energy per token |
| Image generation | diffusion steps, not tokens | — | 0.6–2.9 Wh per image (see §6) |
| Video generation | denoising steps × frames × resolution | — | 26 kJ–1.16 MJ per video (ML.ENERGY v3) |

### 4. Tokens to FLOPs: prefill, decode and why output tokens cost more

- **Forward-pass rule.** About 2 FLOPs per active parameter per token. Epoch's GPT-4o assumption of about 100B active parameters gives 2 × 10¹¹ FLOP per token, and 1 × 10¹⁴ FLOP for 500 output tokens.
- **Prefill** runs all input tokens through the model in parallel. Its arithmetic intensity is about 2 × N_in FLOPs per byte of weights, so prompts longer than a few hundred tokens saturate compute (compute-bound).
- **Decode** generates one token at a time per sequence. Every step must stream all the weights, plus the KV cache, from high-bandwidth memory (HBM). At batch size B, intensity is about 2B FLOP per byte (FP8).
- **The roofline ridge point.** For an H100 this is about 1,979 TFLOPS (FP8) ÷ 3.35 TB/s ≈ 590 FLOP/byte. For a B200 it is about 4,500 ÷ 8 ≈ 560. Decode therefore needs batches in the hundreds before it stops being memory-bound. At batch 1 a GPU uses under 1% of its compute while drawing a large share of its power.
- **The input/output cost ratio.** From Epoch's figures, 10k input tokens add about 2.2 Wh (about 0.8 J per input token), while output costs about 2.2 J per token all-in (0.3 Wh ÷ 500). Input therefore costs roughly one-third as much per token at 10k context. At 100k context the attention term pushes the input cost per token up again.
- **MoE.** Qwen3-30B-A3B (3B active parameters) uses 3.56× less energy per token than dense Qwen3-32B (ML.ENERGY v3). Total parameters still matter: the 235B-A22B model uses more energy than the dense 32B because it must spread across more GPUs.

### 5. Compute to hardware: specs, throughput and joules per token

**Accelerator reference table** (vendor and product-guide specs; FLOPS are dense unless noted)

| Accelerator | Power (W) | Memory / bandwidth | Peak FP8 (dense) | Notes |
|---|---|---|---|---|
| NVIDIA H100 SXM | 700 | 80 GB / 3.35 TB/s | 1,979 TFLOPS (989 BF16) | Workhorse of IndiaAI pool |
| NVIDIA H200 | 700 (1,000 custom) | 141 GB HBM3e | ≈H100 | +40% LLM throughput vs H100 from bandwidth |
| NVIDIA B200 | ~1,000 | 192 GB / 8 TB/s | ~4,500 TFLOPS; FP4 support | MLPerf: ~3× H200 on Llama 2 70B |
| NVIDIA B300 (Blackwell Ultra) | 1,100 (HGX) / 1,400 (NVL72) | 288 GB / 8 TB/s | 15 PFLOPS FP4 | Liquid cooling mandatory in NVL72 |
| GB300 NVL72 rack | 132–142 kW nominal, ~155 kW peak | 72 GPUs + 36 Grace CPUs, ~20 TB HBM | 1.08 EF FP4 per rack | HPE 132 kW, Lenovo 135 kW, NVIDIA ref. up to 142 kW |
| AMD MI300X | 750 | 192 GB / 5.3 TB/s | 2.6 PFLOPS | In IndiaAI pool |
| AMD MI355X | 1,400 | 288 GB / 8 TB/s | 5.0 PFLOPS (10 PF FP4) | Liquid-cooled |
| Google TPU v7 Ironwood | n/a | 192 GB HBM3e | 4,614 TFLOPS | Google: 30× more energy-efficient than first public TPU |

**Measured and benchmark throughput, converted to J/token.** GPU-only, TDP basis, as an upper bound on efficiency.

| Model / workload | Hardware | Throughput (tokens/s per GPU) | J/token at TDP | Source |
|---|---|---|---|---|
| Llama 2 70B (MLPerf offline) | H100 | ~3,940 (derived: H200 is +11%) | 0.18 | MLPerf v5.0/5.1 via Nebius |
| Llama 2 70B | H200 | ~4,370 | 0.16 | MLPerf v5.1 |
| Llama 2 70B (FP4) | B200 | ~12,840 (102,725 per 8 GPUs) | 0.08 | Lambda, MLPerf v5.1 |
| Llama 2 70B (FP4) | GB300 | 13,015 | 0.11 | NVIDIA, MLPerf v5.1 |
| DeepSeek-R1 (offline) | H200 | 1,253 | 0.56 | NVIDIA, MLPerf v5.1 |
| DeepSeek-R1 | GB300 | 5,842 | 0.24 GPU; **0.32 at rack level** (135 kW ÷ 72 × 5,842) | NVIDIA, MLPerf v5.1 |

**ML.ENERGY Leaderboard v3** (measured GPU energy, vLLM, minimum-energy configuration)

| Model | GPU | J per output token |
|---|---|---|
| GPT-OSS 120B (mxfp4, 5B active) | 1× B200 | 0.040 |
| Llama 3.1 8B | H100 | 0.12 |
| Llama 3.1 70B | B200 | 0.19 |
| Qwen 3 32B | 1× B200 | 0.31 |
| Qwen 3 235B-A22B (FP8) | 4× B200 | 0.42 |
| DeepSeek V3.1 (FP8) | 8× B200 | 1.34 |
| DeepSeek R1 (FP8) | 8× B200 | 2.38 (26,820 J ≈ 7.45 Wh per response) |

**What moves joules per token**
- **Batch size and concurrency.** A larger batch cuts energy per token by 3–5× but raises latency (TPOT, ITL) and power draw (ML.ENERGY).
- **Latency targets.** Tight time-to-first-token and per-token targets force small batches. MLPerf's interactive Llama 2 70B scenario uses 450 ms TTFT and 40 ms TPOT. ML.ENERGY finds H100 "can still be competitive with B200" when latency constraints are tight. B200 used less energy than H100 in 79–88% of matched-latency comparisons.
- **Precision.** Moving from BF16 to FP8 to FP4 halves the bytes per weight at each step. Studies adjust BF16 results to FP8 by dividing by about 1.7 (arXiv:2509.20241).
- **Multi-GPU sharding.** Adding GPUs at the same batch size always increased energy per token on B200 (ML.ENERGY).
- **Speculative decoding, disaggregated prefill/decode and KV caching** are all used in Google's production stack.
- **Actual power vs TDP, and idle.** Epoch assumes 70% of peak power for inference. Google counts idle reserve capacity at 10% of prompt energy.

**Reconciling the per-query literature**

| Source | Type | Figure | Boundary / notes |
|---|---|---|---|
| Google, Gemini Apps median (May 2025) | Measured, production | 0.24 Wh; 0.26 mL; 0.03 g | Full stack incl. PUE 1.09; water on-site only (WUE 1.15); token count undisclosed |
| Google "existing approach" | Measured | 0.10 Wh; 0.12 mL | Accelerators only, top-10% sites |
| OpenAI (Altman, June 2025) | Disclosure | 0.34 Wh; 0.3 mL | No methodology |
| Epoch AI (Feb 2025) | Estimate | 0.3 Wh (500 out tokens → ~2.2 J/token all-in); 2.5 Wh @10k in; ~40 Wh @100k in | H100, 1,500 W all-in per GPU, 10% utilisation, 70% power |
| Jegham et al. 2025 | Estimate (API latency + inferred hardware) | GPT-4o short 0.42 Wh; GPT-4.1 nano long 0.454 Wh; o3/DeepSeek-R1 long >33 Wh; R1 on Azure 7.41 Wh vs 29.08 Wh on DeepSeek's servers | Includes PUE, region multipliers |
| ML.ENERGY v3 | Measured GPU energy | Chat mean 184 J (0.05 Wh); problem-solving mean 4,625 J (1.28 Wh) per response on B200 | GPU only; ×~1.57–2 for full stack |
| MIT Technology Review (2025) | Measured GPU ×2 | Llama 3.1 8B ~0.03 Wh; 405B ~1.9 Wh per response | Doubling for overhead |
| Luccioni et al., "Power Hungry Processing" (FAccT 2024) | Measured (A100, CodeCarbon) | Text classification 0.002 Wh; text generation 0.047 Wh; image generation 2.9 Wh mean (1.35 median) per inference | Small open models, no PUE |
| Samsi et al. 2023 | Measured | LLaMA-65B ~0.3 Wh per response | V100/A100 |
| URI AI Lab (GPT-5) | Estimate | ~18.35 Wh average for a ~1,000-token response; up to 40 Wh | Reverse-engineered; method criticised |
| Mistral Large 2 LCA (ADEME/Carbone 4) | Lifecycle | 1.14 gCO₂e, 45 mL per 400-token response | Includes training/hardware amortisation and supply chain; energy not disclosed |
| Li et al. (CACM 2025) | Estimate | GPT-3: 500 mL per 10–50 responses; India scenario 19.7 mL per request | Includes off-site EWIF |

**Why the numbers span about 100×.** Several factors stack, and they multiply:
- Boundary: accelerator-only versus full stack is 1.7–2.4×.
- Utilisation and batching: 1.4–5×.
- Model size: an 8B model versus a 405B model is about 60× per response.
- Tokens per query: 10–25× between chat and reasoning.
- Hardware generation: about 1.5–3×.
- Method: estimates from API latency include network and queueing time and assume low batching, so they skew high.

For the atlas, treat 0.2–0.4 Wh as the defensible central value for an ordinary text prompt in 2025–26. Treat 1.5–10 Wh as the range for reasoning queries. Present 20–40 Wh as contested upper-bound estimates for frontier long reasoning, not as measured facts.

### 6. Workload types and ratios

| Task | Energy per output | Ratio vs text chat (~0.3 Wh) | Source |
|---|---|---|---|
| Text classification (small task model) | ~0.002 Wh | ~1/150 | Luccioni |
| Embeddings / classification-type | ~0.002–0.007 Wh | ~1/50–1/150 | Luccioni (image classification 0.007) |
| Chat (frontier, production) | 0.24–0.34 Wh | 1× | Google, OpenAI, Epoch |
| Reasoning (same model, reasoning on) | ~23–25× chat | ~25× | ML.ENERGY (Qwen3-32B 95 J → 2,192 J) |
| Image generation | 0.63 Wh (SD3 Medium, 1024², incl. ×2) to 2.9 Wh (mean, A100) | 2–10× | MIT TR; Luccioni (image generation is 60× text generation in the same study) |
| Video generation (5 s) | ~944 Wh (CogVideoX, 3.4 MJ); 7–322 Wh across models | ~3,000× | MIT TR; ML.ENERGY v3 (26 kJ–1.16 MJ) |
| Multimodal input chat | 1.1–5.2× (image) and 1.3–15× (video) energy per token | — | ML.ENERGY v3 |
| Agents | sum of 5–50 calls with growing context | 10–100× (estimate) | derived |

Interpretation: on a "per thing produced" basis, generative video is the energy outlier, at roughly 700× an image (MIT TR). Reasoning and agents are the fastest-growing middle category. Ordinary chat is cheap per prompt and matters only through volume.

### 7. Worked examples

All examples use E5 and E6. Shared defaults:
- f_power = 0.7 and η = 0.3, unless stated.
- k_IT = 1.57.
- India-typical PUE 1.43 (Li et al.'s India value) for air-cooled halls; 1.2 for liquid-cooled racks.
- On-site WUE 1.15 L/kWh (Google fleet value) unless stated.
- Grid water: atlas values 5.0 (India), 2.0 (Karnataka), 2.03 (60% round-the-clock clean), 0.55 (90% clean).

**Example 1: English short chat on an H100 (open 70B-class model, FP8)**
- Tokens: about 1,000 input (system prompt plus user text) and 400 output. For short prompts, the MLPerf throughput already includes its own prefill.
- e_out = (700 W × 0.7) ÷ (0.3 × 3,940 tokens/s) = 490 ÷ 1,182 = 0.415 J/token.
- GPU energy = 400 × 0.415 = 166 J = 0.046 Wh. E_IT = 0.046 × 1.57 = **0.072 Wh**. E_facility = 0.072 × 1.43 = **0.10 Wh**.
- A GPT-4o-class model (about 100B active parameters) would be roughly 1.4× higher, about 0.15 Wh. That is consistent with Google's 0.24 Wh and Epoch's 0.3 Wh.
- Water multipliers: India grid 1.15 + 1.43 × 5.0 = 8.30 L/kWh, giving **0.60 mL**. Karnataka 4.01 L/kWh, **0.29 mL**. 60% RTC clean 4.05, **0.29 mL**. 90% clean 1.94, **0.14 mL**. Dry cooling (WUE 0) on the India grid 7.15, **0.52 mL**.
- Cross-check: Gemini's median IT energy (0.24 − 0.02 = 0.22 Wh) × 8.30 = **1.8 mL** on Indian grid assumptions, against Google's reported 0.26 mL on-site only.

**Example 2: The same answer in Hindi and Kannada**
Scale Example 1's output by the parallel-text multiplier m_L. The ~10% extra per-token cost from longer sequences is ignored here.

| Variant | m_L | Output tokens | E_IT (Wh) | Water, Karnataka grid (mL) | Water, India grid (mL) |
|---|---|---|---|---|---|
| English (o200k) | 1.0 | 400 | 0.072 | 0.29 | 0.60 |
| Hindi on GPT-4o-class tokenizer | 1.7 | 680 | 0.123 | 0.49 | 1.02 |
| Kannada on GPT-4o-class tokenizer | ~2.5 (est.) | 1,000 | 0.181 | 0.73 | 1.50 |
| Kannada on Llama-3.1 / cl100k-class tokenizer (upper bound) | ~12 | 4,800 | 0.87 | 3.48 | 7.20 |
| Kannada on Indic tokenizer (Sarvam-1-class) | ~1.7 | 680 | 0.123 | 0.49 | 1.02 |

The Indic penalty is mostly a choice of software, not hardware. Switching from a legacy tokenizer to an Indic-optimised one cuts energy and water per equivalent Kannada answer by about 7×. That is a bigger effect than any GPU generation upgrade.

**Example 3: Reasoning query on a GB300 NVL72 (DeepSeek-R1-class MoE, FP4)**
- Rack-level J/token at MLPerf = 135,000 W ÷ (72 × 5,842 tokens/s) = 0.321 J/token. This already includes the Grace CPUs and NVLink switches, so k_IT is not applied again.
- Production: 0.321 × 0.7 ÷ 0.3 = 0.75 J/token.
- Tokens: 2,000 input and 7,000 output (ML.ENERGY's problem-solving mean). Energy = 7,000 × 0.75 = 5,250 J, so **E_IT ≈ 1.46 Wh**. E_facility at PUE 1.2 ≈ **1.75 Wh**.
- Compare: ML.ENERGY measured 7.45 Wh of GPU energy for R1 on 8× B200, using FP8 and vLLM. Jegham estimates over 33 Wh. The spread reflects FP4 versus FP8, TensorRT-LLM versus vLLM, and measured versus inferred.
- Water, liquid-cooled with an assumed WUE of 0.3 L/kWh: India grid 0.3 + 1.2 × 5.0 = 6.3 L/kWh, giving **9.2 mL**. Karnataka 2.7, **3.9 mL**. 90% clean 0.96, **1.4 mL**.
- One reasoning answer equals about 20 English chats (Example 1) in energy.

**Example 4: Image and video generation**
MIT TR's figures already double GPU energy, so treat them as total facility energy: IT = total ÷ 1.43, and off-site water applies to the total.
- **Image (SD3 Medium, 0.634 Wh).** On-site 0.443 Wh × 1.15 = 0.51 mL. Off-site 0.634 × 5.0 = 3.17 mL. Total **3.7 mL** on the India grid, **1.8 mL** on Karnataka's.
- **Image, older and less efficient models (Luccioni mean 2.9 Wh, treated as IT).** 2.907 × 8.30 = **24 mL** on the India grid.
- **5-second video (CogVideoX, 944 Wh).** On-site 660 Wh × 1.15 = 0.76 L. Off-site 944 × 5.0 = 4.72 L. Total **≈5.5 L per clip** on the India grid, **≈2.65 L** on Karnataka's. One short video uses the water of roughly 9,000 English chats.

**Example 5: 100 MW-IT AI campus in Bengaluru**
Assumptions: 100 MW critical IT, load factor 0.7, PUE 1.3 (a modern, partly liquid-cooled campus), so facility peak is 130 MW. At a power factor of 0.95 that needs a grid connection of about 137 MVA, before redundancy.
- IT energy = 100 × 24 × 0.7 = **1,680 MWh/day**. Facility energy = **2,184 MWh/day**, or about 0.8 TWh/year.
- **Racks.** 100 MW ÷ 135 kW is at most about 740 GB300 NVL72 racks, about 53,000 GPUs. In practice it is fewer, because networking and storage take a share.
- **Prompts per day** (E7):
  - Gemini-median chat (E_IT 0.22 Wh): 1.68 × 10⁹ Wh ÷ 0.22 = **7.6 billion per day**.
  - Reasoning only (1.46 Wh): **1.15 billion per day**.
  - 5-second videos (660 Wh IT): **2.5 million per day**.
  - Mixed portfolio of 80% chat, 15% reasoning and 5% images (weighted E_IT 0.42 Wh): **about 4.0 billion per day**.
- **Cross-check by tokens.** 53,000 GPUs × 5,842 tokens/s × 86,400 s × η 0.3 ≈ 8 × 10¹² tokens/day. That is about 1.15 billion 7,000-token reasoning answers, which matches the energy method.
- **Context.** OpenAI told Axios in July 2025 that ChatGPT receives "2.5 billion prompts from global users every day", about 330 million of them from the US. Epoch notes that 1 billion messages a day at 0.3 Wh needs only about 12.5 MW. Chat alone does not justify 100 MW campuses; reasoning, agents, video, training and enterprise workloads do.
- **Water per day.** On-site with evaporative cooling (WUE 1.15) is 1,932 m³.

| Grid scenario | Off-site (m³/day) | Total with WUE 1.15 (m³/day) | Total per year (million m³) | Per mixed prompt (mL) |
|---|---|---|---|---|
| India grid 5.0 | 10,920 | 12,852 | 4.69 | 3.2 |
| Karnataka 2.0 | 4,368 | 6,300 | 2.30 | 1.6 |
| 60% RTC clean 2.03 | 4,434 | 6,366 | 2.32 | 1.6 |
| 90% clean 0.55 | 1,201 | 3,133 | 1.14 | 0.8 |

Switching to closed-loop liquid cooling with dry coolers (WUE about 0.2, PUE about 1.25) cuts on-site water to about 340 m³/day. Off-site water barely changes (about 4,200 m³/day on the Karnataka grid). **Procurement of clean power is the dominant water lever, not the cooling design.**

### 8. Facility layer reference values

| Parameter | Value | Source / status |
|---|---|---|
| Google fleet PUE | 1.09 | Google (reported) |
| India PUE (Microsoft modelled) | 1.43 | Li et al. |
| Google WUE (Cat. 2, consumptive) | 1.15 L/kWh (2023, 2024); 80% of withdrawal consumed | Google (reported) |
| On-site WUE range | ~0 (dry, Microsoft India) to 1.9 (Microsoft Indonesia); ~1 globally; up to 9 L/kWh (Arizona summer) | Li et al. |
| India EWIF | 3.445 L/kWh | Li et al. |
| Thermal plant norms (MoEFCC/CEA) | ≤3.5 m³/MWh existing cooling-tower plants; ≤3.0 m³/MWh new plants post-2017 (raised from 2.5 in June 2018) | Government notifications |
| Old cooling-tower plants (no ash-water recirculation) | ~8–9 m³/MWh | NITI Aayog study |
| US EWIF consumption / withdrawal | 3.14 / 43.83 L/kWh | Li et al. |
| Meta global Scope-2 water | 3.7 L/kWh | Li et al. citing Meta |
| GB300 NVL72 rack | 132–142 kW nominal; ~90% heat to liquid | HPE, Lenovo, NVIDIA |

**On the atlas's 5.0 L/kWh India grid factor.** It sits above Li et al.'s 3.445 and above the 3.0–3.5 m³/MWh regulatory ceilings for coal plants. It is below the 8–9 m³/MWh that older plants historically used. Read it as a conservative, high-end factor. It may include hydro evaporation or legacy plants, but the atlas should state its basis. A central value of about 3.4 L/kWh, with 5.0 as the high case, would be easier to defend.

**Embodied (Scope 3) water.** I found no credible per-chip fabrication water figure for this report. Mistral's LCA attributes 91% of Mistral Large 2's water use to compute (training plus inference), which implies the hardware, supply-chain and construction share is under 10% in that study. Flag it as excluded rather than estimating it.

### 9. Training side

| Model | Reported compute | Energy (derived) | Notes |
|---|---|---|---|
| GPT-3 (175B) | — | 1,287 MWh (Patterson et al.) | Li et al.: 6.34 million L if trained under the India scenario (all off-site) |
| Llama 3.1 405B | 30.84M H100 GPU-hours; 3.8 × 10²⁵ FLOP (6ND gives 3.65 × 10²⁵) | 30.84M × 700 W = 21.6 GWh GPU; about 31 GWh facility at ×1.3 server and PUE 1.1 (estimate) | Implied utilisation ≈ 3.8e25 ÷ (1.11e11 s × 9.89e14) ≈ 35% MFU |
| DeepSeek-V3 (671B total, 37B active) | 2.788M H800 GPU-hours; 6ND ≈ 3.3 × 10²⁴ | ≈1.95 GWh GPU at 700 W (estimate) | MoE plus FP8 training; about 11× fewer GPU-hours than Llama 405B |
| Mistral Large 2 | — | 20.4 ktCO₂e; 281,000 m³ water (training plus 18 months of use) | Audited LCA |
| Sarvam / Indian models | Trained on IndiaAI compute; Sarvam-1 on a 2-trillion-token Indic corpus | Not disclosed | — |

**Training water, illustrative.** Llama 405B-scale training under atlas India assumptions: 28.1 GWh IT × 1.15 + 30.9 GWh × 5.0 ≈ **187,000 m³**.

**Amortisation.** 31 GWh spread over 10¹¹ lifetime prompts adds about 0.31 Wh per prompt, comparable to the inference energy itself. Over 10¹² prompts it adds about 0.03 Wh. Training matters per prompt for niche or short-lived models, and fades for mass-market ones. This is why Mistral's 45 mL lifecycle figure is far above Google's 0.26 mL operational on-site figure.

### 10. India relevance

- **Volume.** Sam Altman said in February 2026 that India has 100 million weekly ChatGPT users and "the largest number of student users of ChatGPT globally" (Times of India column, reported by TechCrunch). OpenAI told Axios in July 2025 that ChatGPT receives "2.5 billion prompts from global users every day". If India's share is about 8% (an estimate from Similarweb traffic shares of roughly 7–10%), that is about 200 million prompts a day. At 0.3 Wh each that is about 60 MWh/day, or an average load of about 2.5 MW. It is small next to a single campus, and it would grow by an order of magnitude if usage shifted towards reasoning modes.
- **Indic inefficiency.** The tax ranges from about 1.3–2.7× on GPT-4o-class tokenizers to 4–12× on legacy ones. Indic-optimised tokenizers (Sarvam, BharatGen, and Krutrim's MUTANT work) reduce this to roughly 1.0–1.7×.
- **Where prompts are served.** Neither OpenAI nor Google discloses the serving region for Indian prompts. Treat location as a calculator parameter, because it changes total water by up to 10× (from India grid with WUE 1.15 to a 90%-clean grid with dry cooling).
- **IndiaAI fleet.** More than 38,000 GPUs: H100, H200, A100, MI300X, Gaudi 2 and Trainium. A PIB (MeitY) factsheet of 30 December 2025 says they are offered "at a subsidized rate of just ₹65 per hour", and on 17 February 2026 Minister Ashwini Vaishnaw announced "an additional 20,000 GPUs to be added in the coming weeks".
  - At full load: 38,000 × 0.7 kW × 1.57 ≈ 42 MW IT, or about 58 MW facility at PUE 1.4.
  - The 93.18 lakh GPU-hours sanctioned across 237 projects by August 2026 equal about 6.5 GWh GPU, 10.2 GWh IT and 14.3 GWh facility.
  - That is about 83,000 m³ of water at India-grid factors (estimates).
  - Reporting also shows the pool is under-used. Idle provisioned GPUs raise energy per useful token; Google counts idle at 10%.

## Recommendations: default parameters for the India calculator

| Parameter | Default | Range | Rationale |
|---|---|---|---|
| Output tokens: chat / long / reasoning / agent | 400 / 1,500 / 7,000 / 30,000 | 250–20,000+ | Epoch, Chiang, ML.ENERGY |
| Input tokens: chat / RAG / document | 1,000 / 5,000 / 30,000 | — | estimates; long inputs add Epoch's 2.5 Wh @10k, 40 Wh @100k |
| Language multiplier m_L (GPT-4o-class) | Hindi 1.7; Bengali 1.8; Tamil 2.3; Telugu 2.5; Kannada 2.5 | 1.3–2.7 | FLORES and parallel audits |
| m_L legacy (Llama-3.1/cl100k) / Indic tokenizer | Kannada 12 / 1.7 | 4–12 / 1.0–1.7 | BrahmicTokenizer, Tokenizer Tax |
| GPU power, f_power | TDP × 0.7 | 0.6–0.9 | Epoch / Microsoft |
| Throughput T_bench (tokens/s per GPU, aggregate) | H100 3,940; H200 4,370; B200 12,840; GB300 13,015 (70B dense); R1-class: H200 1,253, GB300 5,842 | — | MLPerf v5.1 |
| Production efficiency η | 0.3 | 0.1–0.6 | estimate (Epoch assumes 10% MFU; Google fleet versus best sites 0.71) |
| k_IT (excl. PUE) | 1.57 (GPU servers); 1.1 (rack-level GB300 power) | 1.4–2.0 | Google breakdown |
| PUE | 1.43 air-cooled India; 1.2–1.3 liquid-cooled | 1.09–1.6 | Li et al., Google |
| On-site WUE | 1.15 evaporative; 0.2 liquid + dry coolers; 0 dry | 0–1.9 (up to 9 in peak heat) | Google, Li et al. |
| EWIF | 3.4 central; 5.0 atlas high; Karnataka 2.0; RTC 60% 2.03; 90% clean 0.55 | 0.5–5.0 | Li et al., CEA norms, atlas |
| Image / 5-s video | 0.63–2.9 Wh / 944 Wh total | — | MIT TR, Luccioni |

**Three formula fixes.**
1. Replace "GPU throughput" with "aggregate tokens/s per GPU at production batch × η". Per-user streaming speed (for example 50–100 tokens/s) overstates energy by roughly the batch size, often 10–500×.
2. Replace 1.7× with 1.57× and apply PUE once, in both the energy and the water terms. This removes about 9% double counting.
3. Show on-site and off-site water separately in the UI. In India the off-site share is the story.

**Narrative recommendation for the chapter.** Lead with Gemini's measured 0.24 Wh, then show how the same prompt becomes about 1.8 mL under Indian grid water. Then show the levers in this order: tokens (reasoning, documents, Indic tokenizer), utilisation, cooling type, grid mix. End with the 100 MW campus table, where clean power procurement turns out to be worth more litres than any cooling technology.

## Caveats

- **Reported versus estimated.** Google's figures are measured but use a "median prompt" whose token count is undisclosed, and they are not peer-reviewed. OpenAI's 0.34 Wh has no stated method. Jegham, URI and Epoch are model-based estimates. URI's GPT-5 figure in particular is reverse-engineered and has been publicly criticised. MLPerf throughputs are vendor-optimised best cases; the production efficiency η is this report's assumption.
- **Tokenizer data.** The FLORES fertility figures come from recent single-author or workshop-scale preprints. One of them, the BrahmicTokenizer report, promotes its author's own tokenizer and has a possible copy error in its Gemma/Sarvam-30B cells. Kannada and Telugu parallel-text multipliers are inferred by analogy with Tamil.
- **Coverage gaps.** Sourced, comparable energy-per-token data was not found for Vera Rubin, Groq, Cerebras, AWS Inferentia/Trainium, or TPU power ratings, so they are left out of the quantitative tables rather than guessed. No credible figures were found for chip-fabrication water or for the training energy of Indian models.
- **Water accounting.** Google reports consumption (evaporated water), not withdrawal. Li et al. show that US electricity withdrawal (43.8 L/kWh) is about 14× consumption, so the atlas must keep the two metrics separate. The atlas's 5.0 L/kWh India factor needs a documented basis.
- **Rapid change.** Google reported "a 33x reduction in energy consumption" for the median Gemini Apps text prompt over one year (arXiv:2508.15734). Tie every default to a date and expect central values to fall while total demand grows through reasoning, agents and video.

## Sources

1. arxiv — https://arxiv.org/pdf/2508.15734
2. projektledarpodden — https://projektledarpodden.se/article/chatgpt-energiforbrukning-per-fraga-epoch-ai/
3. researchgate — https://www.researchgate.net/publication/391741710_How_Hungry_is_AI_Benchmarking_Energy_Water_and_Carbon_Footprint_of_LLM_Inference
4. deeplearn — https://deeplearn.org/arxiv/605068/how-hungry-is-ai?-benchmarking-energy%2C-water%2C-and-carbon-footprint-of-llm-inference=
5. epoch — https://epoch.ai/gradient-updates/how-much-energy-does-chatgpt-use
6. felloai — https://felloai.com/how-much-energy-does-chatgpt-use/
7. nvidia — https://developer.nvidia.com/blog/nvidia-blackwell-ultra-sets-new-inference-records-in-mlperf-debut/
8. ml — https://ml.energy/blog/measurement/energy/diagnosing-inference-energy-consumption-with-the-mlenergy-leaderboard-v30/
9. acm — https://dl.acm.org/doi/10.1145/3724499
10. kanaky — https://kanaky.xyz/blog/ai-water-consumption/
11. arxiv — https://arxiv.org/pdf/2605.29379
12. arxiv — https://arxiv.org/html/2511.03237v2
13. arxiv — https://arxiv.org/html/2607.24276v1
14. arxiv — https://arxiv.org/html/2607.24276
15. sarvam — https://www.sarvam.ai/blogs/sarvam-1
16. arxiv — https://arxiv.org/pdf/2507.13390
17. arxiv — https://arxiv.org/html/2608.09046
18. arxiv — https://arxiv.org/html/2608.09046v1
19. nvidia — https://developer.nvidia.com/blog/nvidia-blackwell-delivers-massive-performance-leaps-in-mlperf-inference-v5-0
20. arxiv — https://arxiv.org/pdf/2509.20241
21. technologyreview — https://www.technologyreview.com/2025/05/20/1116327/ai-energy-usage-climate-footprint-big-tech/
22. ecogpt — https://ecogpt.com/blog/how-much-energy-does-an-ai-image-use
23. whythealgarve — https://www.whythealgarve.com/post/the-energy-receipts-claude-estimates-the-cost-of-prompting
24. digit — https://www.digit.in/features/general/mistrial-ai-study-highlights-the-environmental-impact-of-llms.html
25. communicationstoday — https://www.communicationstoday.co.in/indiaai-mission-faces-gap-between-capacity-and-deployed-gpus/
26. communicationstoday — https://www.communicationstoday.co.in/38000-gpus-one-big-problem-indias-ai-mission-cant-find-enough-users/
27. greenly — https://greenly.earth/en-gb/leaf-media/data-stories/ai-efficiency-a-gemini-reality-check-with-greenly
28. tomshardware — https://www.tomshardware.com/tech-industry/artificial-intelligence/chatgpt-5-power-consumption-could-be-as-much-as-eight-times-higher-than-gpt-4-research-institute-estimates-medium-sized-gpt-5-response-can-consume-up-to-40-watt-hours-of-electricity
