<!-- Report 30 of the India Data Centre Atlas research series (Cooling CAPEX, OPEX and TCO, water and energy; validation of the atlas cost table; atlas chapter 5, 6, 16.1). Produced with AI-assisted web research, 22 Oct 2026, and kept as written at the time. The atlas standards register (src/data/standards.js) is authoritative where figures differ (for example India grid water 2.9 L/kWh and grid CO₂ 0.675 t/MWh after the October 2026 corrections). -->

# Data Centre Cooling in India: CAPEX/OPEX/TCO, Water and Energy — Comparative Analysis and Validation of the Atlas Cost Table (October 2026)

The atlas's preliminary ranking holds up for a conventional 10 MW Bengaluru hall: chilled-water CRAH with containment, plus cooling towers or indirect evaporative units, is the cheapest option at roughly ₹3,900–4,200 per MWh of IT. That ranking only stays valid if the model also accounts for three things it currently leaves out: all-in HT tariffs (about ₹8/kWh, not ₹6.7), IT-side credits for liquid cooling, and total (site plus grid) water. Once AI densities (≥30–40 kW/rack) are reached, direct-to-chip liquid cooling with dry or adiabatic heat rejection becomes the rational default in every Indian city. Most of the atlas's capex numbers are plausible but rest on thin public evidence. Four values should change: DLC room-side capex, adiabatic dry-cooler capex, two-phase fluid cost per rack, and the all-India grid water intensity. The humid-coast PUE for towers and dry coolers also needs adjusting.

## TL;DR

- **Economics:** The atlas cost order (towers ≈ IEC < free-cooling chillers < air-cooled chillers < DLC+dry < single-phase immersion < DX < two-phase immersion) matches published evidence for a ~10 kW/rack hall. Two things push DLC to cost parity or better once density is ≥20–40 kW/rack: the Vertiv/NVIDIA study's measured result that server fan power fell 80% between Study 1 and Study 4, cutting IT power by 7%, and Schneider WP282's 10–14% facility-capex saving from compaction. Two-phase immersion should be dropped from new-build recommendations because of PFAS-driven fluid supply risk.
- **Water:** CRAH plus towers physically needs about 1.8–2.4 L/kWh of IT on site, which agrees with the atlas. One Indian consultancy's 0.8 L/kWh figure is an arithmetic error. Counting grid water (MoEFCC thermal norms of 3.0–3.5 m³/MWh, roughly 2–3.5 L/kWh at the grid level), towers use *more* total water than air-cooled or dry systems unless grid water intensity exceeds about 9 L/kWh. IEC and adiabatic hybrids roughly break even at 2–3 L/kWh.
- **Energy and policy:** Use the Uptime Institute Global Data Center Survey 2025 (800+ operators, April–May 2025) as the benchmark: average PUE 1.54, "virtually stood still" for a sixth year, and 1.48 for facilities built in the last five years. The best Indian targets are now ≤1.35 (MeitY AI-cloud tenders) and PUE-linked incentives under Karnataka's Sustainable Data Centre Policy 2026–31, approved by the state cabinet in September 2026. Dry-cooler free-cooling hours at a 35°C supply range from about 71% of the year in Bengaluru to about 27% in Mumbai. So W40–W45 liquid cooling plus dry or adiabatic coolers suits the plateau (Bengaluru, Pune, Hyderabad, NCR), while Mumbai and Chennai need towers on treated sewage effluent (TSE), hybrids, or trim chillers.

## Key Findings

1. **The mechanical cost share fits the atlas magnitudes.** Turner & Townsend's Data Centre Construction Cost Index 2025–26 (published 5 November 2025, survey of 250 experts) prices Mumbai at US$6.64/W, "second only to Shanghai's US$6.12/W" as the cheapest of 52 markets (≈₹58 cr/MW). Mechanical work is about 22% of cost in air-cooled builds and about 33% in liquid-cooled builds, and liquid-cooled builds carry a 7–10% overall premium. That implies roughly ₹12.9 cr/MW of mechanical scope for an air-cooled Indian build and about ₹21 cr/MW for a liquid-cooled one. The atlas's CRAH+containment plus towers totals ₹9.5 cr/MW and DLC plus dry coolers totals ₹17 cr/MW. Both sit about 20–25% below the T&T-implied totals. This is consistent if the atlas excludes balance-of-mechanical items (secondary piping, pumps, BMS/EPMS controls, thermal storage, ventilation). If it is meant to include them, it is low.
2. **Indian all-in data centre cost** is ₹50–65 cr/MW for Tier III colocation and ₹70–95 cr/MW for AI-ready liquid-cooled builds (IMARC Engineering, 2026). Cushman & Wakefield's 2026 APAC guide gives US$5.9–9.0 M/MW (≈₹52–79 cr at ₹88/USD). Cooling is therefore about 15–25% of capex, rising to about 30% in AI halls.
3. **Electricity drives cooling TCO; water price almost never does.** In the atlas's own numbers, towers beat free-cooling air-cooled chillers until make-up water costs about ₹285/kL. They beat plain air-cooled chillers until about ₹590/kL. In DLC halls, towers beat dry coolers until about ₹215/kL. All three thresholds are above Indian municipal or industrial tariffs (₹20–131/kL). The case for dry cooling in India is therefore about water *availability*, permitting and risk, not price.
4. **The atlas's ₹6.7/kWh understates real tariffs.** The KERC FY2025-26 schedule names data centres explicitly under HT-2(a): 660 paise/kWh energy plus ₹345/kVA/month demand, with compulsory time-of-day (ToD) pricing at ≥500 kVA. A 56 paise/unit BESCOM true-up applies from 2026. At a 75% load factor, the all-in rate is about ₹7.9–8.2/kWh before electricity tax. Maharashtra, Tamil Nadu and Telangana come out higher (about ₹8.2–9.2/kWh all-in).
5. **PUE understates the benefit of liquid cooling.** In the Vertiv/NVIDIA study, moving 75% of load to direct-to-chip cut facility power by 18.1% and total site power by 10.2%. Server fan power fell 80% between Study 1 and Study 4, which cut IT power by 7%, yet, in Vertiv's words, "the PUE for the facility we analyzed dropped by only 3.3%." A TCO model that only credits pPUE will misrank DLC.
6. **Two-phase immersion's economics are dominated by the fluid, and the fluid supply is impaired.** 3M announced in December 2022 that it would exit PFAS manufacturing (Novec/Fluorinert) and states it "completed its exit of PFAS manufacturing at the end of 2025." Chemours Opteon 2P50 (HFO, GWP 10, made with Navin Fluorine from 2026) is the main replacement. Quoted fluid prices range from US$45 to US$300/L, against US$3–6/L for mineral oil and US$12–20/L for PAO.
7. **Hyperscaler practice has moved to closed-loop DLC with little or no water evaporation.** Microsoft has used "zero water evaporated for cooling" designs for all new builds since August 2024; its 9 December 2024 Cloud Blog says the design "will avoid the need for more than 125 million liters of water per year per datacenter," with pilots in Phoenix and Mt Pleasant, Wisconsin in 2026. Its fleet WUE fell from 0.49 L/kWh (2021) to 0.30 L/kWh (2024), a 39% improvement. Google reports that "in 2025, the average annual power usage effectiveness for our global fleet of data centers was 1.09."

## 1. Economic Analysis

### 1.1 TCO formulas (use these in the atlas)

Levelised cooling cost per MWh of IT:

**LCOC (₹/MWh_IT) = [ Σᵢ Cᵢ·CRF(r, Lᵢ) + Σᵢ mᵢ·Cᵢ + E_cool·p_e + W·(p_w + p_t) + F + R ] / E_IT**

- CRF(r, L) = r / (1 − (1+r)^−L). At r = 11%: CRF₁₂ = 0.154, CRF₁₅ = 0.139, CRF₂₀ = 0.126.
- Cᵢ is the capex of component i (room side and heat rejection separately, each with its own life Lᵢ). mᵢ is the O&M fraction (3–5%/yr).
- E_IT = MW_IT × utilisation × 8,760. For 10 MW at 75% this is 65,700 MWh/yr; for 50 MW at 80% it is 350,400 MWh/yr.
- E_cool = (pPUE_cool − 1)·E_IT. Use the cooling-only overhead, approximately PUE − 1 − 0.06 for electrical losses. Using full (PUE − 1) charges UPS and transformer losses to cooling and raises LCOC by about ₹400/MWh at ₹6.7/kWh.
- p_e should be the all-in marginal tariff: energy charge + demand charge/(8,760·LF·pf) + ToD + true-ups + duty.
- W = WUE·E_IT. p_w is the water price and p_t is treatment (atlas: ₹15/kL).
- F = fluid top-up: loss rate × fluid inventory value. R = refrigerant top-ups (small; omit unless DX).
- **IT-side credit (subtract for liquid):** ΔIT_fan × p_e, where ΔIT_fan ≈ 7% of IT energy at 75% liquid capture (Vertiv/NVIDIA, measured). Also subtract compaction capex savings where density rises (Schneider WP282: −10% facility capex at 20 kW/rack, −14% at 40 kW/rack).

**Check of the atlas's ₹3,900/MWh (CRAH+containment + towers, Bengaluru):**
- Capex ₹95 cr × 0.139 = ₹13.2 cr/yr.
- O&M (3% × 50 + 3.5% × 45) = ₹3.1 cr.
- Energy at 0.19 overhead × 65,700 MWh × ₹6,700 = ₹8.4 cr.
- Water at 1.8 L/kWh = 118,260 kL × ₹114 = ₹1.35 cr.
- Total ≈ ₹26 cr/yr, or ₹3,960/MWh. **The atlas result reproduces only with cooling-only overhead (not full PUE − 1).** Document that convention.

### 1.2 Published capex benchmarks (USD at ₹88)

| Item | Benchmark | INR equivalent | Source / evidence label |
|---|---|---|---|
| Data centre construction, Mumbai | US$6.64/W (second-cheapest of 52; only Shanghai lower at US$6.12/W) | ≈₹58 cr/MW | Turner & Townsend DCCI 2025–26, published 5 Nov 2025 (reported survey/benchmark) |
| Liquid-cooled premium over air | +7–10% of construction | +₹4–6 cr/MW | Turner & Townsend (reported, US projects) |
| Mechanical share | 22% air / 33% liquid | ≈₹12.9 / ≈₹21 cr/MW | T&T via Archdesk (secondary) |
| India all-in (ex-land) | ₹50–65 cr Tier III; ₹70–95 cr AI-ready | — | IMARC Engineering 2026 (consultant estimate) |
| Air-cooled heat rejection vs liquid AI hall | ~$1.8 M/MW vs $4.5–5.2 M/MW | ₹15.8 vs ₹40–46 cr/MW | Archdesk Apr 2026 (secondary; scope broad) |
| Air vs liquid infrastructure | $1.5–2 M vs $3–4 M per MW | ₹13–18 vs ₹26–35 cr | Introl 2025 (vendor-adjacent blog) |
| CDU installed (hardware+piping+controls+commissioning) | $230–630/kW cooling | ₹2.0–5.5 cr/MW | rax.ae 2026 guide (estimate) |
| Rack-level DLC hardware (CDU share, manifolds, cold plates) | $30–75k per rack | ₹26–66 lakh/rack | Global Data Center Hub 2026 (secondary) |
| Cold plates + manifolds | $5–10k per server (usually IT capex) | ₹4.4–8.8 lakh/server | Introl (vendor-adjacent) |
| Immersion 1 MW block (LiquidStack/Submer/GRC) | $2.5–3.5 M | ₹22–31 cr/MW | Adam Silva Consulting 2026 (estimate) |
| Facility capex, chassis immersion vs air, 2 MW | $7.02/W air vs $6.98/W liquid at 10 kW/rack; $6.33 at 20 kW; $6.02 at 40 kW | — | Schneider WP282 (vendor white paper, modelled) |
| Liquid-cooling retrofit | ~$2 M/MW vs >$11 M/MW greenfield | ₹17.6 cr vs >₹97 cr | STL Partners 2026 via DatacenterScope (secondary) |
| Indian chiller equipment (dealer, not installed) | ₹11,111/TR (Blue Star water-cooled centrifugal); ~₹11,250/TR (400 TR water-cooled); ~₹24,450/TR (air-cooled centrifugal) | — | IndiaMART/ExportersIndia listings (marketplace; low quality) |
| Indian cooling infrastructure | "around INR 6 crores per MW of cooling load" | ≈₹6.6 cr/MW_IT | Blackridge Research (snippet; unverified) |

**Interpretation:** A 1 MW IT load needs about 284 TR of heat rejection, or about 350–400 TR with N+1 and margin. Chiller equipment at ₹11k–25k/TR is therefore only ₹0.4–1.0 cr/MW. The atlas's ₹4.0–4.5 cr/MW for heat rejection thus implies equipment is just 10–25% of the installed plant, with the rest being redundancy, pumps, piping, electrical, controls and civil works. That is plausible for Tier III plants but cannot be verified from public Indian sources. **Obtain one EPC bill of quantities (BoQ) per pairing before treating these as more than ±30%.**

### 1.3 Dielectric fluids and consumables

| Fluid | US$/L | ₹/L | Per-tank inventory | Source / label |
|---|---|---|---|---|
| Mineral oil (dielectric) | 3–6 | 264–528 | 1,000–1,500 L per 12-server single-phase tank | Alliance Chemical 2026 (supplier) |
| PAO synthetic hydrocarbon | 12–20 | 1,056–1,760 | same | Alliance Chemical; Dataintelo |
| Synthetic ester | 8–14 | 700–1,230 | same | Alliance Chemical |
| Engineered single-phase fluids | $150–400/gal (~40–106/L) | 3,500–9,300 | — | The Cooling Report (secondary) |
| Two-phase fluorinated (Novec-era/HFO) | 45–90 (Alliance); 80–200 (ServNet/ResearchIntelo); 200–300 (Dataintelo) | 4,000–26,400 | 250 L/tank (Temple 8 model assumption) to 800 L per 42-server tank (Introl) | multiple; wide disagreement |

- **Single-phase oil per rack:** 1,000–1,500 L of PAO comes to $12–30k (₹0.11–0.26 cr), so the atlas's ₹0.18 cr is mid-range. Mineral oil would be ₹0.03–0.08 cr.
- **Two-phase fluid per rack:** this spans $11k (250 L × $45) to $240k (800 L × $300), i.e. ₹0.1–2.1 cr. The atlas's ₹1.8 cr is at the extreme top.
- **Two-phase extras:** add PFAS disposal and supply-risk premia. Alliance Chemical reports one operator concluding that two-phase total cost now exceeds its thermal benefit.

### 1.4 Electricity tariffs (FY2025-26; energy + demand, before duty/FPPCA)

| State (utility) | Category | Energy | Demand | All-in estimate at 75% LF* |
|---|---|---|---|---|
| Karnataka (BESCOM) | HT-2(a), data centres named | ₹6.60/kWh | ₹345/kVA/mo | ≈₹7.3 + ₹0.56 true-up ≈ **₹7.9–8.2** |
| Maharashtra (MSEDCL) | HT-I(A) industry | ₹7.48/kVAh + ₹0.62 wheeling | ₹555/kVA/mo | ≈**₹9.0–9.2** (FY26 rates under review, Case 75 of 2025) |
| Tamil Nadu (TNPDCL) | HT-I (incl. IT services) | ₹7.50/kWh; peak +25% | ₹608/kVA/mo | ≈**₹8.7–9.0** |
| Telangana (TGSPDCL) | HT-I(A) | ₹7.65 (11 kV) / ₹7.15 (33 kV) | ₹500/kVA/mo | ≈**₹8.1–8.6** |
| Uttar Pradesh (Noida/Greater Noida) | HV-2 (data centres reclassified Oct 2024) | ₹6.10–7.10/kVAh (₹6.95 NIDP) | ₹270–300/kVA/mo | ≈**₹6.7–7.7** |

*Demand adder = demand charge × 12 / (8,760 × 0.75 × 0.95). These are my estimates; check the official orders. Maharashtra, Tamil Nadu, Telangana and UP figures come partly from secondary summaries.

**Effect on the atlas:** each +₹1/kWh raises LCOC by about (cooling overhead) × ₹1,000/MWh. That is about +₹190 for towers, +₹390 for air-cooled chillers and +₹640 for DX. Higher tariffs widen the gap in favour of efficient systems.

### 1.5 Master economic comparison (10 MW, 75% load, Bengaluru, 11% discount)

LCOC "re-run" uses the atlas inputs except: all-in tariff ₹8.0/kWh, cooling-only overhead, and the IT fan credit for liquid systems. Ranges are my estimates (E).

| System / pairing | Room-side capex ₹cr/MW (atlas → verdict) | Heat-rejection capex ₹cr/MW (atlas → verdict) | Main OPEX components | Life (yr) | LCOC atlas ₹/MWh | LCOC re-run ₹/MWh (E) |
|---|---|---|---|---|---|---|
| DX CRAC + condensers | 6.0 → insufficient evidence, keep | incl. | Very high compressor energy; refrigerant top-ups; 3% O&M | 12 | 5,900 | ~6,700 |
| CRAH open aisle + air-cooled chillers | 4.5 → keep | 4.0 → confirm (low conf.) | Chiller energy; no water | 15/20 | — | ~5,600 |
| CRAH + containment + air-cooled chillers | 5.0 → confirm | 4.0 → confirm | Chiller energy | 15/20 | 4,800 | ~5,300 |
| CRAH + containment + free-cooling air-cooled chillers | 5.0 | 4.5 → confirm (low conf.) | Lower chiller energy | 15/20 | 4,200 | ~4,600 |
| CRAH + water-cooled (magnetic-bearing) chillers + towers | 5.0 | 4.5 → confirm; add mag-bearing row at ~4.8–5.0 (E) | Make-up water, chemicals (~₹15/kL), Legionella regime, 3.5% O&M | 15 (towers) / 20+ (chillers) | 3,900 | ~4,150 |
| CRAH + water-cooled chillers + hybrid coolers | 5.0 | 6.0 → insufficient evidence | Seasonal water; pads | 15 | — | ~4,400 |
| Direct evaporative AHU | 9.5 → insufficient evidence; unsuitable for humid coast/NCR air quality | — | Pads, filters, water | 15 | — | n/a |
| Indirect evaporative (Munters, Stulz, Vertiv) + trim DX | 11.5 → insufficient evidence, keep | incl. | Water, pads/HX cleaning, 3.5% O&M | 15 | 4,000 | ~4,200 |
| RDHx + chilled water (FC chillers) | 7.0 → insufficient evidence | 4.5 | Fan/pump energy | 15/20 | — | ~4,800 |
| DLC single-phase (W32–W45) + dry coolers + trim | 10.5 → **adjust to ~9.0** if cold plates are IT capex (range 7–11) | 6.5 → confirm | Pumps, coolant chemistry, filters; residual air 15–25% | 12/20 | 5,000 | ~5,100 before credits; **~4,550 after 7% fan credit; ~3,500–4,000 at ≥20–40 kW/rack with compaction** |
| DLC + adiabatic coolers | 9.0 | 7.0 → **adjust to 6.0–6.5** (KVRM ranks adiabatic capex below dry) | Seasonal water, pads | 12/15 | — | ~4,500 after credit |
| DLC + chiller-less towers + plate HX | 9.0 | 5.5 → confirm (low conf.) | Water + treatment | 12/15 | — | ~4,200 after credit |
| DLC + chillers (W17–W27 legacy) | 9.0 | 4.0–4.5 | Chiller energy | 12/20 | — | ~5,000 |
| Two-phase DTC (pumped refrigerant) | insufficient evidence | — | Refrigerant; vendor claims up to 82% cooling-energy cut (Vertiv, vendor) | — | — | n/a |
| Single-phase immersion + dry coolers | 13.0 + oil ₹0.18 cr/rack → **confirm** | 6.5 | 4.5% O&M; ~1%/yr oil loss (insufficient evidence) | 12–15 | 5,500 | ~5,500 before credit; ~4,900 after |
| Two-phase immersion | 16.0 → insufficient evidence; fluid ₹1.8 cr/rack → **adjust to ~₹0.7 cr (range 0.1–2.1)** | incl. condensers | 5% O&M; 3%/yr fluid loss (insufficient evidence) + PFAS disposal | 12 | 8,400 | ~5,500–7,000 with lower fluid cost; still the highest-risk option |
| Seawater intake / titanium HX / outfall | — | 8.5 → insufficient evidence | Intake screening, biofouling, CRZ/outfall permits | 20–25 (E) | — | n/a |

O&M rates (3%; 3.5% evaporative; 4.5% single-phase immersion; 5% two-phase): consistent with industry convention but **insufficient primary evidence**. Small rack CDUs show much higher maintenance ratios ($3.2–5.8k/yr on a $28–42k unit, an Alibaba buying guide), so treat 3% as valid only for central plant at scale.

### 1.6 Break-even analyses (atlas inputs; my calculations)

- **Towers vs dry coolers (DLC hall, per MW-yr at 75% load):**
  - Towers: capex ₹0.765 cr + O&M ₹0.193 cr + water ₹0.135 cr = ₹1.09 cr.
  - Dry: capex ₹0.816 cr + O&M ₹0.195 cr + extra energy (0.05 PUE × 6,570 MWh × ₹6,700) ₹0.22 cr = ₹1.23 cr.
  - Towers win until water costs **≈₹215/kL** at ₹6.7/kWh, or about ₹260/kL at ₹8/kWh.
- **Towers vs free-cooling air-cooled chillers (CRAH hall):** break-even water price ≈ **₹285/kL**. **Towers vs plain air-cooled chillers:** ≈ **₹590/kL**.
- **Liquid vs air (rack density):**
  - Before IT credits, DLC+dry costs about ₹1,100/MWh more than CRAH+towers.
  - The 7% fan credit (~₹470–560/MWh) and the compaction capex saving (~₹1,000/MWh at 20 kW/rack, per Schneider WP282 scaled to Mumbai costs) close the gap at about **20–30 kW/rack**.
  - This matches published inflection points: about 30 kW/rack at $0.12/kWh (Adam Silva Consulting) and 40–50 kW where liquid "gains cost advantage" (Polaris Market Research). Above about 40 kW/rack, air is not technically viable (NVIDIA GB200 NVL72 is ~120 kW with ~85% liquid capture).
- **Tariff break-even for immersion vs DLC:**
  - Single-phase immersion adds about ₹4.3 cr/MW capex (tanks plus fluid) and about ₹0.35 cr/MW-yr O&M.
  - It saves about 0.07 PUE plus an extra ~2.5% fan energy, worth about ₹0.42 cr/MW-yr at ₹6.7.
  - **Immersion beats DLC only above ≈₹16/kWh**, or where it removes all residual air plant and the IT vendor warrants immersion. Rarely true in India.
- **Grid water break-even (total water):** W* = (WUE_evap − WUE_dry)/(PUE_dry − PUE_evap). Results by pairing are in §2.3.

### 1.7 Worked example — 50 MW AI hall (GB200-class, ~120 kW racks, DLC 85% liquid / 15% air, 80% utilisation)

E_IT = 350,400 MWh/yr. Room side ₹9.0 cr/MW (adjusted). Water ₹99 + ₹15/kL.

| Heat rejection | Bengaluru (₹8.0/kWh) LCOC | Annual cooling cost (50 MW) | Site water | Mumbai (₹9.0/kWh) LCOC | Mumbai site water |
|---|---|---|---|---|---|
| Dry coolers + trim (W40) | ≈₹4,530/MWh | ≈₹159 cr | ~18 ML/yr | ≈₹4,710 | ~18 ML/yr |
| Adiabatic coolers | ≈₹4,610 | ≈₹162 cr | ~88 ML/yr | ≈₹4,700 (E) | ~140 ML/yr |
| Chiller-less towers + PHX | ≈₹4,255 | ≈₹149 cr | ~631 ML/yr (1.7 ML/day) | ≈₹4,520 | ~771 ML/yr (2.1 ML/day) |

**Reading:** In Mumbai, towers save about ₹6.7 cr/yr against dry coolers but consume about 750 ML/yr more water. That is an implicit water "price" of only about ₹87/kL. Where water is TSE (treated sewage effluent) under contract, towers are rational. Where the supply is municipal or groundwater with NOC or tanker risk, pay the premium for dry or adiabatic. In Bengaluru the dry-cooler premium is about ₹10 cr/yr for 50 MW, roughly 0.3% of a ₹3,500–4,750 cr project at ₹70–95 cr/MW.

## 2. Water Analysis

### 2.1 On-site WUE: physics and disagreement

- **Physics check (my calculation):** a cooling tower evaporates about 1.2–1.5 L per kWh of heat. The tower must reject IT heat plus compressor work (≈1.1–1.2 kWh per kWh of IT). At cycles of concentration (CoC) of 4, blowdown = E/(CoC−1). Total make-up is therefore about **1.9–2.3 L/kWh_IT**. This confirms the atlas's 1.8 (Bengaluru) to 2.4 (humid coast).
- **Disagreement:** KVRM Engineering's India guide gives 0.6–1.5 L/kWh for towers, with a worked 10 MW example at 0.82 L/kWh. That example sizes the tower for only 4 MW of heat ("cooling plant rejects ~4 MW"), when it actually rejects about 11–12 MW. **Treat KVRM's tower WUE as understated by about 2.5×.** Its adiabatic (0.2–0.6 plateau, 0.8–1.5 humid coast) and dry (~0) figures are more credible.
- **Reported benchmarks:**
  - A large colocation provider reports 1.55 L/kWh annual WUE for evaporative sites (arXiv 2603.02705, reported).
  - A review of hot-region data centres gives 2.3–2.8 L/kWh for water-cooled chillers (ScienceDirect 2026).
  - Industry averages of about 1.8–1.9 L/kWh are widely quoted.
  - S&P Global, citing Uptime, uses 25.5 ML/yr per MW (≈2.9 L/kWh at full load).
- **Indian water quality:** Indian municipal supply runs 400–1,200 mg/L TDS, which limits CoC to about 3–5 (KVRM). Raising CoC from 3 to 6 cuts make-up by about 20% and blowdown by about 50% (US DOE, via TechBullion). TSE and RO pre-treatment permit higher CoC.
- **Peaks:** daily peaking factor for towers is about 2.2× annual, and monthly WUE above 9 L/kWh has been measured in Arizona (arXiv 2603.02705). Size storage for 2–5 days of make-up; KVRM gives about 1,000 m³ for a 10 MW tower plant.

### 2.2 Water comparison table (atlas WUE with verdicts; total water = WUE + PUE × grid intensity)

Grid intensity assumed: Bengaluru 2.0 L/kWh (atlas Karnataka), humid coast 3.0 L/kWh (my adjusted India central).

| System / pairing | WUE Bengaluru / humid / hot-dry (atlas) | Verdict | Total water Bengaluru (kL/MWh_IT) | Total water humid coast (kL/MWh_IT) |
|---|---|---|---|---|
| DX | 0.05 | confirm | 3.45 | 5.45 |
| CRAH + air-cooled chillers | ~0 | confirm | 2.90 | 4.65 |
| CRAH + FC chillers | ~0 | confirm | 2.70 | 4.35 |
| CRAH + towers | 1.8 / 2.4 / 2.4 | confirm (physics); peak day ~4–5 | 4.30 | 6.30 |
| CRAH + hybrid/adiabatic | 0.45 / 0.70 / 0.60 | adjust humid coast to ~0.8–1.0 (KVRM 0.8–1.5) | 3.05 | 4.75 |
| Indirect evaporative | 0.55 / 0.80 / 0.80 | confirm (low conf.; humid-climate IEC performance limited per Huawei WP and Applied Energy 2025) | 2.95 | 4.70 |
| RDHx + FC chillers | ~0 | confirm | 2.66 | 4.29 |
| DLC + dry | 0.05 | confirm | 2.35 | 3.53 |
| DLC + adiabatic | 0.25 / 0.40 / 0.45 | confirm | 2.49 | 3.82 |
| DLC + towers | 1.8 / 2.2 / 2.2 | confirm | 4.00 | 5.56 |
| Single-phase immersion + dry | ~0 | confirm | 2.16 | 3.27 |
| Two-phase immersion | ~0 | confirm | 2.10 | 3.18 |

### 2.3 Indirect (power-station) water and break-even

- **Norms:** MoEFCC's December 2015 notification set specific water consumption at ≤3.5 m³/MWh for existing cooling-tower plants and 2.5 m³/MWh plus zero liquid discharge (ZLD) for plants from 2017. In June 2018 the new-plant norm was relaxed to 3.0, and seawater once-through plants were exempted. A further amendment followed in July 2025.
- **Actual performance:** plants have been documented consuming well above the norms. One plant used 87% more than the 3.5 limit (CAG Chennai); Karnataka's Raichur/Ballari plants also exceed it.
- **Grid-level intensity:** with roughly 70–75% thermal generation, grid consumptive intensity is about 2–3.5 L/kWh. Withdrawals are far higher (80–160 m³/MWh for old once-through plants).
- **Verdicts:** India ~5 L/kWh → **adjust to ~3 (range 2–5), consumption basis**. Karnataka 2.0 → **insufficient evidence, plausible** given hydro and renewables share, but hydro reservoir evaporation is usually excluded.
- **External reference points:** US consumption 3.1 L/kWh; Meta's self-reported Scope-2 water was 3.7 L/kWh in 2023.
- **Break-even grid intensity W\*** (above which the evaporative option uses less total water; atlas Bengaluru values):
  - CRAH+towers vs CRAH+air-cooled chillers: 1.8/0.20 = **9.0 L/kWh**. Towers always use more total water in India.
  - DLC+towers vs DLC+dry: 1.75/0.05 = **35 L/kWh**. Dry always wins on water.
  - IEC vs CRAH+air-cooled chillers: 0.55/0.25 = **2.2 L/kWh**. Roughly neutral in Karnataka; IEC wins at the all-India ~3.
  - CRAH+hybrid vs CRAH+air-cooled chillers: 0.45/0.15 = **3.0 L/kWh**. Neutral.

### 2.4 Water-stress, disclosure and regulation context

- **Sector scale and stress:**
  - India's data centres used an estimated 150 billion litres in 2025, projected to reach 358 billion by 2030 (Mordor Intelligence via WION; market-research estimate).
  - S&P Global expects 60–80% of Indian data centres to face high water stress this decade.
  - Planet Tracker counts 50 Indian data centres in "extremely high" stress zones.
- **Bengaluru:**
  - Down To Earth estimates permitted consumption by Bengaluru-area data centres at about 812.9 ML/yr.
  - Bengaluru Rural taluks (Devanahalli, Doddaballapura, Hoskote, Nelamangala) show the district's highest groundwater stress in CGWB/Karnataka's 2024 assessment.
  - BWSSB's April 2025 revision raised non-domestic rates by 0.9–1.9 paise/litre (₹9–19/kL) and added an automatic 3%/yr escalation.
- **Operator disclosure is thin.** Down To Earth found no site-level data:
  - CtrlS reported 409,037 kL (2023-24) and cut about 119,662 kL/yr by switching to air-cooled systems.
  - Nxtra reported 306,916 kL (2024-25).
  - Nxtra and AdaniConneX claim air-based chillers; STT prefers air-cooled systems in water-scarce regions.
  - Sify's "billions of gallons" claim is unsupported.
- **Policy:** Karnataka's Sustainable Data Centre Policy 2026–31, approved by the state cabinet in September 2026 (₹1,300.45 cr outlay; 1 GW and a 10–12% share of India's AI-ready data centre capacity by 2031), requires plant-wise PUE and WUE reporting, PUE-linked incentives, and data-centre resource heat mapping for siting. KVRM reports planning authorities (HMDA, BMRDA, PMRDA) requesting Water Management Plans for campuses above 20 MW (consultant claim).
- **Legionella:** open towers require biocide/chlorination programmes, risk assessment and physical cleaning. Adiabatic risk is low and dry is nil (KVRM). Budget this inside the 3.5% O&M rate.

## 3. Energy Analysis

### 3.1 Benchmarks

- **Uptime Institute Global Data Center Survey 2025** (800+ operators, April–May 2025): weighted average PUE 1.54, having "virtually stood still" for a sixth year, with 1.48 for facilities under five years old and about 1.44 for those over 20 MW (Uptime's 2026 survey reportedly puts the average at 1.52).
- **Google** reports that "in 2025, the average annual power usage effectiveness for our global fleet of data centers was 1.09."
- **Indian reported/design values:**
  - Yotta D1/D2 1.4 (Baxtel listing); Yotta NM1 "<1.5" (IGBC Platinum); Yotta G1 design ~1.6 with district cooling plus DX.
  - Nxtra: 10% PUE reduction FY25 vs FY21.
  - MeitY AI-cloud tenders require PUE <1.35 (SBI sector report 2026).
- **Mumbai engineering model (MEPVault, estimate):** CRAC 1.7; CRAH chilled water 1.45 (1.49 before optimisation); in-row plus economiser achieves 1.33 with ~28% free-cool hours; immersion 1.08.

### 3.2 Chiller and heat-rejection efficiency

- **Water-cooled centrifugal:** COP 5.4 (750 TR) to 6.3 (1,000 TR), i.e. about 0.56–0.65 kW/TR (CPWD HVAC Spec 2024).
- **Magnetic-bearing centrifugal:** 0.52 kW/ton full load, IPLV 0.29 kW/ton (Daikin HXE datasheet, 2018). Academic work finds 29–67% higher average COP than conventional centrifugal (2024).
- **At 95°F (35°C) ambient:** high-lift centrifugal 0.72 kW/ton; dry coolers plus magnetic-bearing 0.55; air-cooled scroll 0.89. At 110°F (43°C): 1.06, 0.89 and 1.32 respectively (Maktinta, engineering blog). This matters for NCR and Hyderabad summers.
- **Dry-cooler compressor-free hours at 35°C supply (KVRM, estimate):** Bengaluru ~71%, Pune ~66%, Delhi ~59%, Hyderabad ~53%, Chennai ~32%, Mumbai ~27%. At W40–W45 the coastal hours rise sharply, because the Mumbai design dry-bulb sits in the mid-30s °C. Legacy chilled-water airside economisers get far fewer hours.

### 3.3 PUE matrix verdicts

| Pairing | Atlas PUE (Blr / humid / hot-dry) | Verdict |
|---|---|---|
| DX | 1.70 / 1.80 / 1.80 | Confirm (MEPVault 1.7 Mumbai CRAC) |
| CRAH + air-cooled chillers | 1.45 / 1.55 / 1.50 | Confirm |
| CRAH + FC chillers | 1.35 / 1.45 / 1.40 | Confirm (E) |
| CRAH + towers | 1.25 / 1.30 / 1.30 | Bengaluru confirm; **humid coast adjust to ~1.35 typical** (Indian colos report 1.4–1.5; 1.30 is best practice) |
| CRAH + hybrid | 1.30 / 1.35 / 1.35 | Confirm |
| IEC | 1.20 / 1.30 / 1.25 | Confirm (low confidence on humid coast) |
| RDHx + FC chillers | 1.33 / 1.43 / 1.38 | Confirm (E) |
| DLC + dry | 1.15 / 1.16 / 1.20 | Bengaluru confirm; **humid coast adjust to ~1.18–1.20 at W32–W35** (only 27–32% dry hours); hot-dry ~1.17 (Delhi 59% hours). Atlas has the climate order inverted. |
| DLC + adiabatic | 1.12 / 1.14 / 1.15 | Confirm |
| DLC + towers | 1.10 / 1.12 / 1.12 | Confirm |
| Single-phase immersion + dry | 1.08 / 1.09 / 1.10 | Confirm (vendor claims of 1.02–1.05 are vendor-only) |
| Two-phase immersion | 1.05 / 1.06 / 1.07 | Confirm (vendor-only evidence) |
| Grid CO₂ 0.71 t/MWh | — | **Confirm**: CEA v21.0 FY2024-25 = 0.710 (provisional); v20.0 FY2023-24 = 0.727 |

**Carbon intensity of cooling:** at 0.71 tCO₂/MWh, every 0.10 of PUE on a 50 MW hall at 80% load equals about 35 GWh and about 24,900 tCO₂/yr.

## Recommendations by Indian use case and city

| Location | Conventional (≤15 kW/rack) | AI (≥40 kW/rack) |
|---|---|---|
| Bengaluru, Pune | CRAH + containment + free-cooling or magnetic-bearing air-cooled chillers, or a hybrid/adiabatic plant. Use towers only on contracted TSE. | DLC W40 + dry coolers with trim (≈65–71% compressor-free); the best location economically and on water. |
| Hyderabad, Delhi NCR | Free-cooling/magnetic-bearing chillers; IEC acceptable in NCR's dry season. Avoid direct evaporative (dust/pollution filtration, humidity in monsoon). | DLC + adiabatic coolers (dry most of the year, spray in Apr–Jun); size for 43–45°C peaks. |
| Mumbai, Chennai | Water-cooled magnetic-bearing chillers + towers on TSE/RO where water is secured; otherwise free-cooling air-cooled chillers. | DLC W40–W45 + towers on TSE or hybrid coolers. Dry-only needs trim chillers much of the year at W32. |
| Visakhapatnam, Jamnagar | Seawater/titanium-HX once-through: insufficient evidence on cost and permitting (CRZ, outfall). Treat ₹8.5 cr/MW as a placeholder and pilot first; Vizag hyperscale water use is already contested. | DLC + seawater-cooled HX or hybrid coolers; desalinated make-up only with full lifecycle costing. |
| Any city, immersion | Single-phase only for niche cases (edge, crypto/HPC retrofits, harsh environments). | Do not specify two-phase immersion for new builds (PFAS exit, fluid price and supply risk). |

**Atlas actions:**
1. Switch p_e to state-wise all-in tariffs (Karnataka ≈₹8.0; Maharashtra ≈₹9.1; Tamil Nadu ≈₹8.8; Telangana ≈₹8.3; UP ≈₹7.2).
2. Add IT-fan and compaction credits for liquid rows.
3. Report total water (site + grid) alongside WUE, and peak-day WUE (≈2.2× annual for towers).
4. Add a magnetic-bearing chiller row.
5. Split DLC by facility water class (W32 vs W40/45).
6. Tag every capex cell with an evidence label. Currently most are "E" (estimate) pending an EPC BoQ.

## Caveats

- **Evidence quality is uneven.** Measured/reported: Uptime, Vertiv/NVIDIA study, CEA, tariff orders, MoEFCC, operator ESG reports. Vendor claims: Schneider WP282, immersion PUEs, CDU savings. Estimates and secondary sources: most per-MW capex, the KVRM and MEPVault India figures, market-research fluid prices.
- **No Indian vendor or EPC publishes cooling capex per MW** for dry coolers, adiabatic coolers, CRAH/fan walls, IEC, RDHx or seawater systems. Those atlas cells remain unvalidated.
- **Lifetimes and loss rates** (12/15/20 years; oil 1%/yr; two-phase 3%/yr) were not verifiable in this review. Treat them as assumptions.
- **Tariffs:** the Maharashtra FY26 rates were under review (MERC Case 75 of 2025). The Tamil Nadu, Telangana and UP figures partly rely on secondary summaries.
- **Two-phase immersion** market data conflict widely: fluid prices range from $45 to $300/L, and claims that hyperscalers abandoned it come from secondary analyst newsletters.
- **Water projections** for India's data centre sector (150 → 358 billion litres) are market-research estimates, not metered data.

## Sources

1. turnerandtownsend — https://reports.turnerandtownsend.com/data-centre-construction-cost-index-2025/methodology
2. archdesk — https://archdesk.com/blog/global-ai-data-center-construction-2026
3. techi — https://www.techi.com/data-center-cost-by-country/
4. imarcengineering — https://www.imarcengineering.com/blog/data-center-development-in-india
5. hrecs — https://hrecs.co.in/app/documents/TariffRates2026-27-28.pdf
6. easyevplug — https://www.easyevplug.com/ev-charger-installation-karnataka
7. itrportal — https://www.itrportal.com/articles/2020/07/07/schneider-electric-releases-white-paper-on-capital-cost-comparison-of-data-centre-liquid-cooling-vs-traditional-air-cooling/
8. introl — https://introl.com/blog/liquid-vs-air-cooling-ai-data-centers
9. rax — https://rax.ae/knowledge-center/articles/coolant-distribution-units-cdu-data-center-liquid-cooling.html
10. globaldatacenterhub — https://www.globaldatacenterhub.com/p/what-a-data-center-actually-costs
11. adamsilvaconsulting — https://www.adamsilvaconsulting.com/insights/data-center-cooling-economics-2026
12. se — https://blog.se.com/datacenter/architecture/2020/02/24/liquid-vs-air-cooling-which-is-the-capex-winner/
13. datacenterscope — https://datacenterscope.com/ai-infrastructure/data-center-retrofit-cost/
14. indiamart — https://dir.indiamart.com/impcat/water-cooled-chillers.html
15. exportersindia — https://www.exportersindia.com/indian-suppliers/centrifugal-chiller.htm
16. blackridgeresearch — https://www.blackridgeresearch.com/blog/large-colocation-data-center-construction-cost-in-india-complete-capex-opex-breakdown
17. alliancechemical — https://alliancechemical.com/blogs/articles/two-phase-vs-single-phase-cooling-fluid-selection
18. dataintelo — https://dataintelo.com/report/immersion-cooling-fluid-market
19. thecoolingreport — https://thecoolingreport.com/intel/pfas-two-phase-immersion-cooling-crisis.html
20. introl — https://introl.com/blog/immersion-cooling-roi-calculator-2-year-payback
21. servnetuk — https://www.servnetuk.com/learn/immersion-cooling-explained
22. Substack — https://temple8capital.substack.com/p/the-western-data-center-cooling-play
23. alliancechemical — https://alliancechemical.com/blogs/articles/post-novec-immersion-fluid-alternatives-2026
24. hrawi — https://www.hrawi.com/(S(ecgvxkqnnngmltkotnjrevx1))/pdf/Press-Note_MYT-Order_MSEDCL_English-2.pdf
25. pwrnxt — https://pwrnxt.in/blog/tamil-nadu-ci-tariff-decoded
26. tgsouthernpower — https://tgsouthernpower.org/resources/PDF/Tariffs/63tarifffile.pdf
27. arusgrid — https://arusgrid.com/policy/india
28. vertiv — https://www.vertiv.com/en-asia/insights/articles/blog-posts/pumped-two-phase-direct-to-chip-cooling-advancing-ai-data-center-efficiency/
29. alibaba — https://electronics.alibaba.com/buyingguides/cdu-cooling-distribution-unit-guide-what-you-actually-need
30. polarismarketresearch — https://www.polarismarketresearch.com/industry-analysis/coolant-distribution-unit-market
31. datacenterscope — https://datacenterscope.com/cooling/liquid-cooling-cost/
32. kvrm — https://kvrm.in/data-centre-wue-cooling-tower-adiabatic-dry-cooler/
33. arxiv — https://arxiv.org/pdf/2603.02705
34. sciencedirect — https://www.sciencedirect.com/science/article/pii/S2949821X26005053
35. avaada — https://www.avaada.com/blog/water-usage-effectiveness-data-centers/
36. fwpcoa — https://www.fwpcoa.org/content.aspx?page_id=5&club_id=859275&item_id=130961
37. spglobal — https://www.spglobal.com/en/research-insights/special-reports/india-forward/shifting-horizons/will-data-center-growth-india-propel-country-global-hub-status
38. techbullion — https://techbullion.com/the-overlooked-variable-in-data-center-water-efficiency-cooling-tower-cycles-of-concentration/
39. powerline — https://powerline.net.in/2026/09/04/water-stress-thermal-power-plants-take-steps-to-optimise-consumption/
40. researchgate — https://www.researchgate.net/publication/381291195_Exploring_urban_water-energy_nexus_A_case_study_of_thermal_power_plants_in_Raichur_and_Ballari_districts_in_Karnataka
41. cag — https://www.cag.org.in/newsletters/public-newsense/water-consumption-data-thermal-power-plants
42. sciencedirect — https://www.sciencedirect.com/science/article/abs/pii/S0360544223009477
43. arxiv — https://arxiv.org/pdf/2304.03271
44. wionews — https://www.wionews.com/india-news/data-centres-are-not-optional-so-who-s-responsible-for-the-damage-part-2-1783461918187
45. reccessary — https://www.reccessary.com/en/news/india-ai-data-center-water-crisis
46. tbsnews — https://www.tbsnews.net/world/south-asia/indias-data-centre-boom-raises-alarms-over-water-and-energy-scarcity-1281866
47. downtoearth — https://www.downtoearth.org.in/science-technology/indias-digital-thirst-how-bengalurus-tech-dreams-are-colliding-with-a-worsening-water-crisis
48. earthjournalism — https://earthjournalism.net/stories/indias-tech-boom-collides-with-deepening-water-crisis-in-bengaluru
49. indiatvnews — https://www.indiatvnews.com/karnataka/bengaluru-water-tariff-hike-april-2025-bwssb-slab-rates-karnataka-ram-prasath-manohar-2025-04-10-984776
50. countryandpolitics — https://www.countryandpolitics.in/2025/04/09/after-11-years-bengaluru-water-board-to-revises-water-tariffs-to-ensure-sustainable-services-chairman-dr-ram-prasath-manohar/
51. earthjournalism — https://earthjournalism.net/stories/what-data-center-giants-arent-saying-about-their-water-use-in-india
52. baxtel — https://baxtel.com/data-center/yotta-d1
53. baxtel — https://baxtel.com/data-center/yotta-d2
54. yotta — https://yotta.com/data-center-in-india/
55. nxtra — https://www.nxtra.in/sustainability
56. bank — https://sbi.bank.in/documents/57189647/58231607/Sector+Report+DataCentre.pdf/f1919592-ee66-b50b-ea20-75fbb27c9bb5?t=1779885206866
57. mepvault — https://mepvault.com/data-centre-cooling-india-crac-crah/
58. cpwd — https://cpwd.gov.in/Publication/HVAC_Specification_2024.pdf
59. sciencedirect — https://www.sciencedirect.com/science/article/pii/S2214157X24009468
60. daikinlatam — https://daikinlatam.com/wp-content/uploads/2018/11/Water-Cooled-Magnetic-Centrifugal-Chiller-HXE.pdf
61. maktinta — https://www.maktinta.com/post/waterless-data-center-cooling-why-dry-coolers-beat-compressor-only-designs
62. reclimatize — https://reclimatize.in/india-grid-emission-factor-cea-ccts/
63. carbonneeti — https://carbonneeti.com/blog/cea-grid-emission-factors-explained
64. saurenergy — https://www.saurenergy.com/solar-energy-news/ceas-co2-baseline-database-impact-of-re-on-indian-grid-emissions-intensity
65. mahadiscom — https://www.mahadiscom.in/consumer/wp-content/uploads/2025/06/Order_Case-No.75-of-2025.pdf
