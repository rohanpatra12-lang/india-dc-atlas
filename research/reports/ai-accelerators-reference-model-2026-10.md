<!-- AI accelerator reference model, produced with AI-assisted web research, 27 October 2026. Its chip values are carried into the atlas standards register (src/data/standards.js, version 2026.10.6), which is authoritative where they differ (for example the atlas uses server power per GPU, not TDP, and India grid water 2.9 L/kWh). -->

# AI Accelerator Reference Model: Specs, MLPerf Throughput, Energy, Water, GPU Sizing and India Deployment (October 2026)

At 100+ GPU training scale, NVIDIA Blackwell Ultra (B300/GB300) is the only defensible choice on audited evidence. For high-throughput inference, B300 and AMD MI355X are tied per GPU on GPT-OSS-120B (14,211 vs 14,155 tokens/s/GPU, MLPerf v6.1 Server). B200 delivers the most tokens per watt of TDP. When memory capacity binds, the 288 GB parts (B300, MI355X) win outright. Every 10 MW of IT load implies 11–15 MW at the meter and roughly 0.9–1.2 million litres/day of off-site (grid) water, which is larger than on-site cooling water under every cooling regime modelled.

## TL;DR

- **Training at scale:** B300/GB300. NVIDIA states it had the fastest time to train on every MLPerf Training v6.0 benchmark and was the only platform with submissions across all seven (NVIDIA blog, 16 June 2026), with runs of up to 8,192 GPUs.
- **Inference per GPU:** B300 ≈ MI355X. GPT-OSS-120B Server: B300 14,211 and MI355X 14,155 tokens/s/GPU (v6.1, 8 GPUs). MI355X's 8→72-GPU scaling efficiency verifies at 94.6–94.9%.
- **Inference per watt of TDP:** B200 leads: 11.3 tokens/s/W on GPT-OSS-120B and 16.3 on Llama 3.1 8B.
- **Sizing anchor:** 10,000 QPS × 500 output tokens = 5,000,000 tokens/s. At the same MLPerf Server latency bound (TTFT ≤ 2 s, TPOT ≤ 100 ms, Llama 3.1 8B, 70% utilisation) this needs ~1,400 H100 (980 kW GPU TDP), ~385 MI355X (539 kW) or ~350 B300 (490 kW).
- **India:** Yotta: 20,736 liquid-cooled B300 by August 2026 at its 60 MW D2 data centre in Noida (DatacenterDynamics, 18 Feb 2026), more than 10,000 committed to IndiaAI. IndiaAI Mission: 38,231 deployed GPUs (IndiaAI Compute Portal via AI CERTs); average L1 price nearly ₹115/GPU-hour after three bidding rounds (Business Standard, Oct 2026). Vultr: 20 MW of MI355X in Chennai (21 Oct 2026). Google: 1 GW TPU-based hub in Visakhapatnam.
- **Water:** the "~150 billion litres" figure traces to Mordor Intelligence (150.3 billion litres in 2025, 358.66 billion by 2030, via CloudNews.tech). "2 million litres a day per 100 MW" implies a WUE of only ~0.83 L/kWh.

## Key findings

1. **Spec anchors mostly verify, with three caveats.** B300 288 GB / 8 TB/s / 1,400 W / 15 PFLOPS dense FP4 is confirmed (NVIDIA "1.5x more dense FP4"; cloud datasheets), but B300 dense FP8 is disputed: 5 PFLOPS (RunPod) vs 7 PFLOPS (Spheron, Vast.ai). MI355X 288 GB / 8 TB/s / 1,400 W / 10.07 PF dense MXFP4 / 5.03 PF dense FP8 is confirmed by AMD datasheet figures. Ironwood 4,614 FP8 TFLOPS and 192 GB HBM3E are confirmed; "~1 kW" is not (one vendor page says 600 W).
2. **Software moves throughput more than silicon within a generation.** AMD's identical 8 × MI355X system rose from 10,267 to 14,155 tokens/s/GPU (+37.9%) on GPT-OSS-120B Server between MLPerf v6.0 and v6.1 after a ROCm 7.0 → 7.2.2 update (GPU Insights, MLCommons entries 6.0-0002 → 6.1-0003).
3. **Aggregate headlines hide per-GPU losses.** Crusoe's 512-GPU MI355X run delivered 5.75 M tokens/s Offline, only 11,229 tokens/s/GPU, 76.3% of the best 8-GPU MI355X row.
4. **Off-site water exceeds on-site water whenever EWIF × PUE > WUE.** With an EWIF of 3.445 L/kWh against evaporative WUE 1.8, off-site water is 2.1–2.9 × on-site even for the thirstiest cooling.
5. **6ND is optimistic.** It gives ~820 H100 for a 70B / 2T-token / 30-day run at 40% MFU; Meta's Llama 3.1 70B GPU-hours imply ~25% realised MFU, i.e. ~1,300 GPUs.

## Part 1 — Chip specifications

| Chip | Architecture | Memory | Bandwidth | FP16/BF16 dense (sparse) TFLOPS | FP8 dense (sparse) TFLOPS | FP4 dense (sparse) PFLOPS | TDP | Cooling | Scale-up link | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| NVIDIA H100 SXM | Hopper | 80 GB HBM3 | 3.35 TB/s | 989 (1,979) | 1,979 (3,958) | n/a | up to 700 W | Air or liquid | NVLink 900 GB/s | NVIDIA H100 product page |
| NVIDIA H200 SXM | Hopper | 141 GB HBM3e | 4.8 TB/s | 989 (1,979) | 1,979 (3,958) | n/a | up to 700 W | Air or liquid | NVLink 900 GB/s | NVIDIA H200 product page |
| NVIDIA B200 (HGX) | Blackwell, dual die | 180 GB HBM3e (192 GB launch) | 7.7 TB/s (8 TB/s launch) | 2,250 (4,500) | 4,500 (9,000) | 9 (18) | 1,000 W | Air or liquid | NVLink 5, 1.8 TB/s | Lenovo Press LP2226; NVIDIA HGX B200 |
| NVIDIA B300 | Blackwell Ultra, dual die | 288 GB HBM3e | 8 TB/s | 3,500 claimed — disputed | 5,000 (RunPod) vs 7,000 (Spheron, Vast.ai) — disputed | 15 (20) | 1,400 W (1,100–1,400 by chassis) | Liquid; air-cooled HGX exists | NVLink 5, 1.8 TB/s | RunPod; Spheron; Vast.ai; NVIDIA via NeevCloud |
| AMD MI300X | CDNA 3 | 192 GB HBM3 | 5.3 TB/s | 1,307.4 (2,614.9) | 2,614.9 (5,229.8) | n/a | 750 W | Air | Infinity Fabric 896 GB/s | AMD MI300 page; Lenovo Press LP1943 |
| AMD MI325X | CDNA 3 | 256 GB HBM3E | 6 TB/s | 1,307.4 (2,614.9) | 2,614.9 (5,229.8) | n/a | 1,000 W | Air | Infinity Fabric | AMD MI325X datasheet |
| AMD MI355X | CDNA 4 | 288 GB HBM3E | 8 TB/s | 2,516 (5,033) | 5,033 (10,066) | 10.07 dense MXFP4 (20.1 sparse) | 1,400 W | Direct liquid | Infinity Fabric 538 GB/s | SemiAnalysis; Boston Ltd; AquaNode; Oracle OCI |
| Google Ironwood (TPU v7) | Dual-chiplet TPU | 192 GB HBM3E | 7.37 TB/s | 2,307 (BF16) | 4,614 | none | UNVERIFIED (~1 kW claimed; 600 W per QSCompute) | Liquid | ICI 1.2 TB/s; 9,216-chip pod = 42.5 FP8 EFLOPS | Google via Tom's Hardware, TrendForce |
| Intel Gaudi 3 (OAM) | Gaudi 3 | 128 GB HBM2e | 3.7 TB/s | 1,835 BF16 | 1,835 | n/a | up to 900 W (air OAM) | Air | 24 × 200 GbE RoCE | Intel Gaudi 3 white paper |

**Where sources disagree.** B200 memory: 180 GB / 7.7 TB/s is the shipping HGX figure (NVIDIA 8-GPU totals 1.4 TB and 62 TB/s); 192 GB / 8 TB/s is the launch figure. B200 FP4: 9 PF dense is HGX; 10 PF is GB200-class. B300 FP8: NVIDIA's Blackwell Ultra uplift is FP4 and attention specific; treat 5 PF as conservative. MI355X FP4: 10.07 PF dense vs 20.1 PF with sparsity. Ironwood has no MLPerf result; "comparable to B200" holds on peak FP8 only (4,614 vs 4,500 TFLOPS). Gaudi 3 has no MLPerf Inference v6.0/v6.1 datacenter LLM result.

### Prices (₹90/US$)

| Chip | Price point | US$ | ₹ | Source / date |
|---|---|---|---|---|
| H100 | Cloud on-demand | 2.69/GPU-h | 242.1 | AIMultiple |
| H100 | JarvisLabs India | 2.41 | 217 | eCorpIT, Jul 2026 |
| H100 | IndiaAI L1 | 1.56 | ~140 | Business Standard, Jan & Oct 2026 |
| H100 | IndiaAI subsidised user rate | 1.02 | ~92 | Hugging Face blog / eCorpIT (secondary) |
| H200 | E2E Networks India on-demand | 5.29 | 502.55 | Ancapex, Oct 2026 |
| H200 | IndiaAI rate card | 1.11–1.56 | 100–140 | Ancapex (secondary) |
| B200 | Spheron spot | 2.68 | 241.2 | Spheron, 10 Jun 2026 |
| B200 | IndiaAI rate card on-demand / 12-month | 3.23 / 2.79 | 290.70 / 251.10 | Ancapex (secondary) |
| B300 | Spheron spot | 3.29 | 296.1 | Spheron, 10 Jun 2026 |
| B300 | Yotta, 5-year to 1-year term | 4.00–11.12 | 360–1,000.8 | Ancapex, Oct 2026 |
| MI300X | IndiaAI L1 | 1.87 | 168.22 | PIB, 30 May 2025 |
| Gaudi 2 | IndiaAI L1 | 0.64 | 57.60 | PIB, 30 May 2025 |
| All types | IndiaAI average L1 | 1.28 | ~115 | Business Standard, Jan 2026 |
| MI355X | Cloud | UNVERIFIED — assumption: 2.68 (parity with B200 spot) | 241.2 | SemiAnalysis says "meaningfully lower" than B200, no figure |

Street purchase prices for B200, B300, MI3xx and Ironwood could not be sourced.

## Part 2 — Inference throughput (inference text generated, output tokens/s)

Per-GPU values are system throughput ÷ accelerators; MLCommons does not publish per-GPU throughput as a metric. Latency bounds: Llama 3.1 8B Server TTFT 2 s / TPOT 100 ms (Interactive 0.5 s / 30 ms); GPT-OSS-120B Server 3 s / 80 ms; DeepSeek-R1 Server 2 s / 80 ms (Interactive 1.5 s / 15 ms).

| Chip / system | Model | Precision | Scenario | System tok/s | GPUs | Per GPU | Round / source |
|---|---|---|---|---|---|---|---|
| H200, 1 GPU | Llama 3.1 8B | FP8 | Offline / Server | 7,796.59 / 7,376.60 | 1 | 7,796.6 / 7,376.6 | v6.1 (individual submitter) |
| H100, 1 GPU | Llama 3.1 8B | FP8 | Offline / Server | 5,777 / 5,103 | 1 | 5,777 / 5,103 | v5.1, Red Hat (no v6 H100 result found) |
| HGX B300, 8 GPU (Supermicro) | Llama 2 70B | FP4 | Server / Offline | ~110,000 / ~111,000 | 8 | 13,750 / 13,875 | v6.1 |
| HGX B300, 8 GPU air-cooled (ASUS) | Llama 2 70B | FP4 | Server / Offline | 113,455 / 113,007 | 8 | 14,182 / 14,126 | v6.1 |
| B300, 1 GPU | Llama 2 70B | FP4 | Server / Offline | 14,495.6 / 14,636.8 | 1 | 14,495.6 / 14,636.8 | v6.1, entry 6.1-0103 |
| B300, 1 GPU | Llama 3.1 8B | FP4 | Server / Offline | 20,420.4 / 21,266.1 | 1 | 20,420.4 / 21,266.1 | v6.1 |
| 8 × B300 | GPT-OSS-120B | MXFP4 | Server / Offline | — | 8 | 14,211 / 14,321 | v6.1, 6.1-0052 |
| 8 × B300 | DeepSeek-R1 | FP4 | Server | — | 8 | 8,846 | v6.1, 6.1-0046 |
| 8 × MI355X (AMD) | GPT-OSS-120B | MXFP4 | Server / Offline | 113,241 / 121,818 | 8 | 14,155 / 15,227 | v6.1, 6.1-0003 |
| 72 × MI355X (AMD) | GPT-OSS-120B | MXFP4 | Server / Offline | 964,468 / 1,039,900 | 72 | 13,395 / 14,443 | v6.1, 6.1-0004 |
| 512 × MI355X (Crusoe) | GPT-OSS-120B | MXFP4 | Offline / Server | 5,749,440 / 5,392,930 | 512 | 11,229 / 10,533 | v6.1, 6.1-0027 |
| 512 × MI355X (Crusoe) | DeepSeek-R1 | FP4 | Offline / Server | 2,901,950 / 2,405,310 | 512 | 5,668 / 4,698 | v6.1, 6.1-0026 |
| 8 × MI355X (AMD) | Llama 2 70B | FP4 | Server / Offline / Interactive | 103,275 / 106,517 / 73,191.5 | 8 | 12,909 / 13,315 / 9,149 | v6.1, 6.1-0003 |
| 8 × MI355X (Dell) | Llama 3.1 8B | FP8 | Offline / Server / Interactive | 158,458 / 148,563 / 130,540 | 8 | 19,807 / 18,570 / 16,318 | secondary compilation |
| HGX B200, 8 GPU (Lambda) | Llama 3.1 8B | FP4 | Server / Offline / Interactive | 130,008 / 160,403 / 128,750 | 8 | 16,251 / 20,050 / 16,094 | v6.0, 6.0-0062 |
| 8 × B200 | GPT-OSS-120B | MXFP4 | Server / Offline | — | 8 | 11,276 / 11,436 | v6.1, 6.1-0021 |
| 8 × H200 (Red Hat) | GPT-OSS-120B | MXFP4 | Server / Offline | — | 8 | 3,013 / 3,585 | v6.0, 6.0-0092 |
| GB300 NVL72 | DeepSeek-R1 | NVFP4 | Server / Offline | — | 72 | 8,064 / 9,821 | v6.0 |
| 8 × H200 (CoreWeave) | Llama 2 70B | FP8 | Server | 33,000 | 8 | 4,125 | v5.0 |
| DGX H200 | DeepSeek-R1 | FP8 | Offline / Server | — | 8 | 1,253 / 556 | v5.1 |

```
Scaling efficiency = Throughput(72) / (Throughput(8) × 72/8)
Offline: 1,039,900 / (121,818 × 9) = 1,039,900 / 1,096,362 = 94.9%
Server:    964,468 / (113,241 × 9) =   964,468 / 1,019,169 = 94.6%
```

### Tokens per watt of TDP

```
Tokens/s per W = per-GPU tokens/s (measured) / TDP (W)
```

| Chip | Llama 3.1 8B Server | GPT-OSS-120B Server | Llama 2 70B Server | DeepSeek-R1 Server |
|---|---|---|---|---|
| H100 (700 W) | 5,103 / 700 = 7.29 | — | — | — |
| H200 (700 W) | 7,376.6 / 700 = 10.54 | 3,013 / 700 = 4.30 | 4,125 / 700 = 5.89 | 556 / 700 = 0.79 |
| B200 (1,000 W) | 16,251 / 1,000 = 16.25 | 11,276 / 1,000 = 11.28 | 12,499 / 1,000 = 12.50 | 7,015 / 1,000 = 7.02 |
| B300 (1,400 W) | 20,420.4 / 1,400 = 14.59 | 14,211 / 1,400 = 10.15 | 14,495.6 / 1,400 = 10.35 | 8,846 / 1,400 = 6.32 |
| MI355X (1,400 W) | 18,570 / 1,400 = 13.26 | 14,155 / 1,400 = 10.11 | 12,909 / 1,400 = 9.22 | 4,698 / 1,400 = 3.36 |

TDP is a ceiling, not measured draw. The atlas computes per-kW figures on server power per GPU as well.

### Tokens per dollar of GPU-hour

```
Tokens per US$ = per-GPU tokens/s × 3,600 / ($ per GPU-hour)
```

| Chip | Workload (Server) | tok/s | Price | Tokens per $ |
|---|---|---|---|---|
| H100 | Llama 3.1 8B | 5,103 | $2.69 | 6.83 M |
| H200 | Llama 3.1 8B | 7,376.6 | $5.29 | 5.02 M |
| B200 | Llama 3.1 8B | 16,251 | $2.68 | 21.83 M |
| B300 | Llama 3.1 8B | 20,420.4 | $3.29 | 22.34 M |
| MI355X | Llama 3.1 8B | 18,570 | $2.68 UNVERIFIED | 24.94 M (UNVERIFIED) |
| B200 | GPT-OSS-120B | 11,276 | $2.68 | 15.15 M |
| B300 | GPT-OSS-120B | 14,211 | $3.29 | 15.55 M |
| MI355X | GPT-OSS-120B | 14,155 | $2.68 UNVERIFIED | 19.01 M (UNVERIFIED) |

### Throughput–latency frontier (MI355X, Llama 3.1 8B FP8)

Measured per GPU: Offline 19,807; Server (≥ 10 tok/s/user) 18,570; Interactive (≥ 33.3 tok/s/user) 16,318.

UNVERIFIED — modelling assumption (log-linear interpolation):

```
slope  = (16,318 − 18,570) / (log10(33.33) − log10(10)) = −2,252 / 0.5228 = −4,309 tok/s per decade
T(30)  = 16,514 tok/s/GPU → 550 streams
T(50)  = 15,558 tok/s/GPU → 311 streams
T(100) = 14,261 tok/s/GPU → 143 streams
```

Faster per-user speed means shorter decode steps and smaller batches, so utilisation falls. Small models flatten the curve; large models fall more steeply (InferenceMAX v1: B200 at 10,000 tok/s/GPU at 50 tok/s/user on Llama 3.3 70B).

## Part 3 — Training (training data consumed)

| Run | Hardware | Reported | Derived |
|---|---|---|---|
| Llama 3.1 405B pre-training | 16,384 H100; global batch 16 M tokens; sequence 8,192 | 380–400 TFLOPS/GPU BF16, MFU 38–43% | 380e12 ÷ (6 × 405e9) = 156 tok/s/GPU; step ≈ 6.2 s |
| Llama 3.1 405B totals | H100-80GB | 15.6 T tokens; 3.8 × 10²⁵ FLOPs; 30.84 M GPU-hours; 8,930 t CO₂e location-based | — |
| Llama 2 70B (NVIDIA DGXC recipe) | 64 H100, FP8 | GBS 128, seq 4,096, 72,616 tok/s | 1,135 tok/s/GPU; step 7.22 s |
| HEBATRON (Mamba2-MoE) | B300 and H200 | token counts only | per-GPU throughput cannot be verified |

```
6ND check: 6 × 405e9 × 15.6e12 = 3.79e25 ≈ reported 3.8e25
Realised MFU: 3.8e25 / (30.84e6 h × 3,600 s) = 342 TFLOPS → 342 / 989 = 34.6%
GPU-TDP energy: 30.84e6 h × 0.700 kW = 21,588 MWh; × Meta PUE 1.08 = 23,315 MWh
On India's grid (0.675 t/MWh): 23,315 × 0.675 = 15,738 t CO₂e
```

| MLPerf Training v6.0 | System | GPUs | Time-to-train |
|---|---|---|---|
| Llama 3.1 405B | Azure GB200 NVL72 | 8,192 | 7.07 min |
| Llama 3.1 405B | CoreWeave GB300 NVL72 | 4,096 | 9.77 min (27.33 in v5.0) |
| DeepSeek-V3 671B | CoreWeave GB300, MXFP8 | 8,192 / 4,096 / 2,048 | 2.02 / 3.09 / 5.54 min |
| Llama 3.1 8B | NVIDIA | — | 4.46 min |
| Llama 2 70B LoRA | NVIDIA | — | 0.40 min |

```
Strong scaling, DeepSeek-V3: 2,048 → 4,096: (5.54 / 3.09) / 2 = 89.6%; 2,048 → 8,192: (5.54 / 2.02) / 4 = 68.6%
```

### First-principles run planning

```
C     = 6 × N × D        (2 FLOPs/param/token forward + 4 backward)
F_eff = F_peak × MFU     (30% conservative, 50% well-optimised)
G     = C / (F_eff × T)
```

Worked example: 70B parameters, 2 T tokens, 30 days, H100 (989 TFLOPS BF16 dense).

```
C       = 6 × 70e9 × 2e12          = 8.40e23 FLOPs
F_eff   = 989e12 × 0.40            = 3.956e14 FLOP/s
T       = 30 × 86,400              = 2,592,000 s
G       = 8.40e23 / (3.956e14 × 2.592e6) = 819.2 → ~820 H100
MFU 30% → 1,092;  MFU 50% → 655
Llama 3.1 70B realised MFU = 6 × 70e9 × 15e12 / (7.0e6 × 3,600 × 989e12) = 25.3% → 1,295 GPUs
```

Budget 1,100–1,300 H100 for a 30-day run.

## Part 4 — Energy and water (1,000 accelerators, GPU TDP only)

```
IT energy (kWh/day)       = N × TDP(kW) × 24 × utilisation
Facility energy (kWh/day) = IT energy × PUE   (1.1 liquid; 1.5 air)
On-site water (L/day)     = IT kWh × WUE
Off-site water (L/day)    = facility kWh × EWIF
```

| Chip (TDP) | IT @ TDP (MWh/d) | IT @ 70% | Facility @ 70%, PUE 1.1 | PUE 1.5 |
|---|---|---|---|---|
| H100 / H200 (700 W) | 16.8 | 11.76 | 12.94 | 17.64 |
| MI300X (750 W) | 18.0 | 12.60 | 13.86 | 18.90 |
| Gaudi 3 (900 W) | 21.6 | 15.12 | 16.63 | 22.68 |
| B200 / MI325X (1,000 W) | 24.0 | 16.80 | 18.48 | 25.20 |
| B300 / MI355X (1,400 W) | 33.6 | 23.52 | 25.87 | 35.28 |

On-site water at 70% (evaporative 1.8 / hybrid 0.7 / closed loop 0.05 L/kWh), B300/MI355X: 42,336 / 16,464 / 1,176 L/day. Off-site at EWIF 3.445: 89,129 L (PUE 1.1) to 121,540 L (PUE 1.5); at the atlas's 2.9 L/kWh: 75,029 to 102,312 L. Off-site exceeds on-site in every case: 3.445 × 1.5 / 1.8 = 2.87×.

Indian data points: "150 billion litres" is a Mordor Intelligence market estimate (150.3 bn L in 2025). "100 MW ≈ 2 million L/day" (CEEW 2026 via NewsX) implies WUE 0.83 L/kWh (2,000,000 / 2,400,000). STT GDC India WUE: 1.34 (FY21) → 0.71 (FY24) → 0.58 (FY25); Down To Earth reports 0.73 for 2024.

## Part 5 — GPU count for inference

```
GPUs = peak QPS × tokens per query / (per-GPU tokens/s × utilisation)
```

10,000 QPS × 500 tokens = 5,000,000 tokens/s; Llama 3.1 8B Server; utilisation 70%.

| Chip | Server tok/s/GPU | GPUs | GPU TDP power | Facility @ 1.1 / 1.5 |
|---|---|---|---|---|
| H100 (v5.1) | 5,103 | 1,400 | 980 kW | 1,078 / 1,470 kW |
| H200 (v6.1) | 7,376.6 | 969 | 678 kW | 746 / 1,017 kW |
| B200 (v6.0) | 16,251 | 440 | 440 kW | 484 / 660 kW |
| B300 (v6.1) | 20,420.4 | 350 | 490 kW | 539 / 735 kW |
| MI355X (v6.1) | 18,570 | 385 | 539 kW | 593 / 809 kW |

### Memory wall

```
KV bytes per token   = 2 × layers × KV heads × head_dim × bytes
Concurrent requests  = floor((0.9 × HBM − weights) / KV per request)   (10% reserve: assumption)
```

Llama 3.1 70B: 80 layers, 8 KV heads, head_dim 128 → 327,680 B/token at FP16, 163,840 B at FP8. Per request (FP8 KV): 8K 1.342 GB; 32K 5.369 GB; 128K 21.47 GB.

| HBM | Free (FP8 weights 70 GB) | 8K | 32K | 128K |
|---|---|---|---|---|
| 80 GB | 2.0 GB | 1 | 0 | 0 |
| 141 GB | 56.9 GB | 42 | 10 | 2 |
| 192 GB | 102.8 GB | 76 | 19 | 4 |
| 288 GB | 189.2 GB | 140 | 35 | 8 |

## Part 6 — India deployments

| Operator | Chips | Location / date | Source |
|---|---|---|---|
| Yotta Shakti Cloud | 20,736 liquid-cooled B300; >10,000 committed to IndiaAI | 60 MW D2, Noida; target Aug 2026 | Yotta; DatacenterDynamics; CRN Asia; HPCwire |
| Yotta (IndiaAI rounds) | 8,192 H100 (round 1); 8,192 B200 (round 2) | 2025 | Indian Infrastructure; ICAI |
| Yotta expansion | 40,000 Vera Rubin + 40,000 GB300; ~$12 B | Greater Noida, Navi Mumbai; reported Sep 2026 | Moneycontrol via Shattered.io |
| IndiaAI Mission | Round 1: 12,896 H100 + 1,480 H200 + MI300X/MI325X; 1,050 Trillium TPUs in round 3; 38,231 deployed | 2025–26 | PIB; Business Standard; AI CERTs |
| Reliance Jio (IndiaAI) | 752 H200 + 268 MI300X | Jun 2025 | Indian Infrastructure |
| Vultr | MI355X, 20 MW | Chennai, 21 Oct 2026 | Vultr / BusinessWire |
| Google + AdaniConneX + Airtel | "custom TPUs", 1 GW, $15 B 2026–30 | Visakhapatnam | TechCrunch; Data Center Knowledge |

Constraints: MeitY AI tenders require PUE below 1.35 (SBI sector report, Apr 2026; not a legal limit per ThePrint); water stress across Mumbai, Chennai, Hyderabad and Bengaluru; shift to closed-loop liquid cooling.

## Part 7 — Decision matrix

| Question | Answer | Single-source dependency |
|---|---|---|
| Training at 100+ GPUs | B300 / GB300 (B200 / GB200 as value) | MI355X "within 5–6%" is one secondary source; Ironwood has no MLPerf data |
| Inference per watt | B200 | TDP-based |
| Inference per rupee | B200 ≈ B300 ≈ MI355X; MI355X leads only if priced at or below B200 | MI355X price unverified |
| Memory-bound serving | B300 or MI355X (288 GB) | — |
| Fewest GPUs | B300 | Llama 8B single-GPU figure is one submitter |

At 10 MW of IT: 240 MWh/day IT; 264 MWh/day facility at PUE 1.1 (360 at 1.5); on-site water 12,000 L (closed loop) to 432,000 L (evaporative); off-site 909,480 L (3.445, PUE 1.1) to 1,240,200 L (PUE 1.5); carbon 178–243 t CO₂/day at 0.675 t/MWh.

## Caveats

Per-GPU numbers are derived, not official metrics; mixed rounds understate Hopper; several items are single-source (listed above); MI355X price, Ironwood TDP, the latency frontier beyond measured points, the 10% memory reserve and all street prices for B200, B300, MI3xx and Ironwood are modelling assumptions; energy figures here are GPU TDP only and therefore lower bounds.

## Sources

NVIDIA product pages, DGX user guides and MLPerf blogs; AMD datasheets and ROCm MLPerf blog (v6.1); Crusoe; CoreWeave; GPU Insights per-GPU MLPerf recomputation; SemiAnalysis InferenceX; RunPod, Spheron, Vast.ai, AquaNode, Boston Ltd datasheets; Lenovo Press LP2226 and LP1943; Intel Gaudi 3 white paper; Google Ironwood via Tom's Hardware and TrendForce; Meta, The Llama 3 Herd of Models (arXiv 2407.21783) and Llama 3.1 model card; arXiv 2412.06288; Digital Citizen and Digital Applied (MLPerf Training v6.0); STT GDC India ESG Report FY2025; Down To Earth; NewsX (CEEW); CloudNews.tech (Mordor Intelligence); Yotta, CRN Asia, HPCwire, DatacenterDynamics; Business Standard; PIB; Ancapex; eCorpIT; Vultr / BusinessWire; TechCrunch; Data Center Knowledge; SBI Data Centres sector report (Apr 2026); ThePrint; UP Data Centre Policy 2026.
