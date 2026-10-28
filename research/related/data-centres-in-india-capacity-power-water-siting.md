<!-- Related research from an earlier conversation ("Data centre infrastructure requirements in India"), Oct 2026, that informed the atlas. Kept as written at the time. The atlas standards register (src/data/standards.js) is authoritative where figures differ (for example India grid water 2.9 L/kWh and grid CO₂ 0.675 t/MWh after the October 2026 corrections). -->

# Data Centres in India (October 2026): What Exists, What's Being Built, What It Needs, and Why It's Where It Is

India had about 1.8 GW of operational data centre IT capacity in mid-2026, roughly half of it in Mumbai/Navi Mumbai. A further ~3.9 GW is under construction or planned in the seven established metros. On top of that sits a new layer of gigawatt-scale AI campuses in Visakhapatnam, Vizianagaram and Jamnagar, which is not counted in that pipeline. Together they could push India's data centre power demand from roughly 2.5–3 GW today to well over 10 GW by about 2030. Power and land are now the binding siting constraints, ahead of cables. Water is the most under-disclosed risk.

## TL;DR

- **Scale and status:** Cushman & Wakefield counts 1,789 MW operational across the top seven markets as of H1 2026 (147 facilities, 33 providers, 14.9% colocation vacancy). It sees another 3,860 MW by 2030 (509 MW under construction, 3,351 MW planned). Mumbai has 890 MW operational and a 1,726 MW pipeline. Separately, Google/AdaniConneX/Nxtra (~1 GW, Vizag, ground broken April 2026), Reliance (Jamnagar, multi-GW, >120 MW due H2 2026; Meta leasing 168 MW) and Reliance's ₹1.08 lakh crore Vizianagaram campus add multiple gigawatts on India's east and west coasts.
- **Resources:** Grid power at PUE ~1.3–1.6 is the dominant requirement; diesel generators remain standard backup. Direct cooling water ranges from near-zero (Microsoft Hyderabad and AWS India use air-cooled chillers) to ~1.4 L/kWh at evaporative sites (NTT disclosure). On a bottom-up estimate, the indirect water embedded in India's grid is 2–5× larger than direct on-site use; per Ember, 78% of India's 2024 electricity came from fossil sources (coal 75%), falling to 73% in 2025. Facility-level water data are almost never published, and the "150 billion litres/year" national figure (CEEW, citing Mordor Intelligence) looks overstated by about an order of magnitude for direct use.
- **Why here:** Mumbai and Chennai win on subsea cables, enterprise demand and power availability. Per TRAI, India's 17 international cables land at 14 stations in five cities, and BW Businessworld reports that 15 of them come ashore within a 6 km stretch of Versova beach in Mumbai. Hyderabad, Pune and NCR win on land, power, climate/seismic safety and state incentives. The new coastal AI hubs (Vizag, Jamnagar) win on gigawatt-scale land, captive or dedicated renewables, new cable landings and aggressive state packages. The 2047 tax holiday in the central Budget 2026-27 and state policies (UP, Tamil Nadu, Maharashtra, Telangana, AP) reinforce all of this. There is still no binding national data centre policy or water/PUE standard.

## Key Findings

1. **India is moving from a metro colocation market to a power-led AI build-out.** Capacity rose from about 400 MW in 2019 (Cushman & Wakefield's figure) to 1,789 MW in H1 2026. The next wave is led by single campuses of 0.5–3 GW that are planned around transmission lines and renewables, not around cable landing stations. At the launch of Microsoft's Hyderabad region in September 2026, MeitY Secretary S Krishnan said "it will be much more economical if you go closer to where the power itself is generating," contrasting this with coastal cable-landing hubs such as Chennai.
2. **Mumbai remains dominant but is concentrating risk.** Its 890 MW is 50% of national operational capacity. The Thane–Belapur Road corridor alone has 675 MW across 35 data centres, plus 241 MW under construction and 995 MW planned. Mumbai is expected to cross 1 GW operational by end-2026.
3. **Hyderabad is the fastest-rising challenger.** Its upcoming supply of 710 MW is 4.7× its 151 MW operational base, the highest ratio among the big metros. That supply is anchored by AWS (₹60,000 crore commitment), Microsoft's new India South Central region (live 2026), CtrlS's 612 MW Chandanvelly campus, AdaniConneX (600 MW potential) and NTT.
4. **Hyperscaler and AI commitments now exceed US$60 billion.** These are stated multi-year investment plans, not spend to date: Google ~$15bn (2026–30), Microsoft $17.5bn (2026–29, on top of $3bn, which PTI describes as a combined US$20.5bn commitment), AWS $12.7bn by 2030 (incl. $8.3bn Maharashtra), Reliance ₹10 trillion (~$110bn) of AI infrastructure over seven years, and OpenAI–TCS HyperVault 100 MW scalable to 1 GW.
5. **Water disclosure is the weakest link.** No major operator publishes facility-level water data. Disclosed WUE values run 0.72–1.42 L/kWh (NTT) and 0.73 (STT). Large new builds are converging on air-cooled chillers (Microsoft, AWS, Google Vizag), liquid cooling for GPUs, and non-potable sources (desalinated seawater at Jamnagar, treated sewage planned by AWS).
6. **Policy is state-led.** Fifteen states have dedicated data centre policies or use IT/industrial frameworks; only five embed sustainability provisions (CEEW). The Centre has granted infrastructure status and, in Budget 2026-27, a tax holiday to 2047 for foreign cloud companies serving global customers from Indian data centres.

## 1. Market Size and Pipeline

### National aggregates (dated, sourced)

| Metric | Value | Source / date |
|---|---|---|
| Operational IT capacity, top 7 markets | 1,789 MW | Cushman & Wakefield (C&W), H1 2026 update, Sept 2026 |
| Added in H1 2026 | 178 MW | C&W |
| Facilities / providers | 147 / 33 | C&W |
| Colocation vacancy | 14.9% | C&W |
| Under construction (to 2030) | 509 MW | C&W |
| Planned (to 2030) | 3,351 MW | C&W |
| Development capital needed to 2030 | US$29.9 bn | C&W |
| MeitY estimate of installed capacity | ~1,575 MW (2026), vs ~375 MW in 2020 | Ministry of Electronics and IT (MeitY), as reported by The Better India |
| 2030 capacity projection | 4.5–6.5 GW installed | CEEW (citing Colliers, S&P Global), Feb 2026 |
| Committed investment 2019–25 | ~US$95 bn | CEEW citing CBRE |
| Share of national electricity use | ~0.5% | CEEW citing Cornell |

**How to read these numbers.** C&W's 3.86 GW pipeline covers only the top seven metros. It therefore excludes the Vizag AI hub (~1 GW, with state clearances reportedly covering 2.51 GW), Reliance's Jamnagar campus (multi-GW; Bloomberg reported a 3 GW target) and Reliance's Vizianagaram campus. Adding these, credible announced capacity for about 2030 is plausibly 8–10 GW of IT load. Delivery will lag announcements, so treat anything beyond about 6.5 GW by 2030 as aspirational.

**Conflict note.** MeitY's ~1,575 MW and C&W's 1,789 MW differ by about 13%. The likely causes are definitional (installed vs operational IT, inclusion of enterprise/captive sites) and timing.

### City breakdown (C&W, H1 2026, MW of IT load)

| City | Operational | Under construction | Planned | Total upcoming | Share of national operational |
|---|---|---|---|---|---|
| Mumbai (incl. Navi Mumbai/Thane) | 890 | 281 | 1,445 | 1,726 | ~50% |
| Chennai | 214 | 55 | 313 | 368 | ~12% |
| Delhi NCR (Noida/Greater Noida/Gurugram) | 183 | 27 | 360 | 387 | ~10% |
| Bengaluru | 162 | 8 | 92 | 100 | ~9% |
| Hyderabad | 151 | n/a | n/a | 710 | ~8% |
| Pune | 133 | 31 | 227 | 258 | ~7% |
| Kolkata | 22 | 13 | 71 | 84 | ~1% |

Sub-markets: Thane–Belapur Road 675 MW operational, 241 MW under construction, 995 MW planned. Gurugram 18/3/34 MW. Hinjewadi (Pune) 37/12/58 MW. The city figures sum to about 1,755 MW. The remaining ~34 MW is presumably smaller sub-markets within C&W's totals.

## 2. Data Centre Inventory

Capacities are **IT load** unless stated. "Potential" means campus master-plan capacity, not built capacity. Operator portfolio figures from aggregator lists (marked †) are indicative and inconsistent across sources.

### 2.1 Operational

| Operator | Facility / location | IT capacity | Key specs and notes |
|---|---|---|---|
| **STT GDC India** | 30 facilities, ~10 cities (Mumbai, Navi Mumbai, Pune, Chennai, Bengaluru, Hyderabad, Delhi/Noida, Kolkata, Ahmedabad, Jaipur) | >400 MW "in operation and development" | STT Chennai 7 (Siruseri) phase 1 7.2 MW live Feb 2026 (45 MW design; ₹4,200 cr). STT Jaipur 1, 6 MW. Predominantly air-cooled; design PUE <1.5; WUE 0.73 (2024). KKR/Singtel took an 82% stake in the parent (Sept 2026); India IPO under consideration |
| **CtrlS** | 19 DCs; Hyderabad DC1 (~4–6 MW), DC2 (7.4 MW), DC3 (13 MW, ₹500 cr+); Chennai 72 MW (Feb 2025, ~₹4,000 cr); Kolkata DC1 16 MW (of 60 MW, ₹2,200 cr); Mumbai, Bengaluru, Noida; edge in Lucknow, Patna, Ahmedabad | ~370 MW† | Rated-4 designs; design PUE ~1.35; captive solar (Nagpur) for Mumbai; liquid-cooling-ready racks; CPP Investments committed up to ₹7,000 cr (June 2026) |
| **NTT GDC India** | 18 DCs: Mumbai, Bengaluru (BLR4A 22.4 MW of 100 MW campus), Chennai, Hyderabad, Noida (opened June 2024), Kolkata (~40 MW) | ~340 MW† | WUE 0.72 portfolio / 1.42 evaporative sites (2024); first Indian production use of immersion and direct-contact liquid cooling |
| **Nxtra by Airtel** | 14 hyperscale + 120+ edge DCs, 8+ cities | ~250–300 MW | 49% renewable (FY25); RE100 member; net zero target 2031; 216,357 KL water consumed (2025 ESG) |
| **Yotta** | NM1, Navi Mumbai (Hiranandani Fortune City, Panvel) | 52 MW | Tier IV; 820,000 sq ft; 7,000+ racks; PUE <1.5; 8,192 H100 + 1,024 L40 GPUs |
| **Yotta** | D1, Greater Noida | 28.8 MW | ~₹1,500 cr; 5,000 racks; 30 × 2.25 MW diesel gensets; 48-hr full-load backup |
| **AdaniConneX** | Chennai 1 (SIPCOT Siruseri) | 17 MW live of 33 MW | Phase 1 live Oct 2022; "up to 100%" renewable claimed |
| **AdaniConneX** | Hyderabad phase 1 (Oct 2024); Noida phase 1 (Jan 2025) | Phases of 600 MW / 150 MW potential campuses | Air-based chillers |
| **Princeton Digital Group** | MU1, Navi Mumbai | 150 MW campus (PDG India ~312 MW†) | Hyperscale |
| **CapitaLand India** | DC Navi Mumbai 1 and others | ~250 MW† (Navi Mumbai 1 108 MW) | Mitsui Fudosan joined India DC fund (May 2026) |
| **Sify Infinit Spaces** | 14 DCs incl. Rabale (Navi Mumbai), Chennai, Noida, Hyderabad, Kolkata, Bengaluru | 129 MW† to ~200 MW (sources conflict) | India's first NVIDIA DGX-Ready liquid-cooled DC (Rabale) |
| **Equinix** | 5 sites, Mumbai (+ Chennai) | ~70 MW† | Interconnection-led |
| **Pi Datacenters** | Amaravati/Hyderabad | ~60 MW† | |
| **L&T-Vyoma** | Mumbai, Chennai | 32 MW | Target 150 MW by 2027 |
| **Iron Mountain / Web Werks** | Mumbai, Pune, Bengaluru, Delhi etc. | ~14 MW† | |
| **Microsoft Azure** | India South Central (Hyderabad, live Aug 2026; 3 availability zones) + existing regions (Pune, Chennai, Mumbai/Hyderabad) | Not disclosed ("largest hyperscale region in India") | Air-cooled chillers, zero water for cooling; >1,000 MW renewable PPAs, ~630 MW operating |
| **AWS** | Mumbai region (2016); Hyderabad region (2022), 3 sites in Telangana (~$1 bn) | Not disclosed | Air-cooled chillers; "no water for cooling" in operational Indian DCs |
| **Google Cloud** | Mumbai and Delhi regions | Not disclosed | |
| **Government** | NIC national DCs (Delhi, Pune, Hyderabad, Bhubaneswar) and State Data Centres; WEBEL Purulia (6 MW) | Small (single-digit MW each) | Sovereign/government workloads; WEBEL Siliguri 20 MW under construction |

### 2.2 Under Construction

| Project | Location | Capacity | Investment | Timing / status | Power / cooling / water |
|---|---|---|---|---|---|
| **Google AI hub (built by AdaniConneX + Nxtra)** | Visakhapatnam, AP (Adavivaram, Tarluvada, Rambilli; ~601 acres) | ~1 GW across 3 campuses (state clearances reportedly 2.51 GW) | ~US$15 bn (2026–30) incl. subsea cables and energy | Announced 14 Oct 2025; ground broken 28 Apr 2026; operations targeted ~mid-2028 | New transmission lines, clean generation and storage by AdaniConneX; "advanced air cooling"; water source contested in AP High Court |
| **Reliance Jamnagar AI campus** | Jamnagar, Gujarat | Multi-GW (Bloomberg-reported 3 GW, unconfirmed); >120 MW online H2 2026 | Part of ₹10 trillion AI plan; 3 GW reported at $20–30 bn | Construction underway | "Entirely" Reliance green energy (solar/wind/storage from Jamnagar giga-complex); Nvidia Blackwell |
| **Reliance–Meta AI DC (first phase)** | Jamnagar | 168 MW (option to scale) | Not disclosed; Meta pays full energy and water cost | Announced June 2026; delivery within ~2 years | Renewable-powered; **cooled with desalinated seawater** |
| **STT Navi Mumbai 2 & 3** | MIDC Mahape, Navi Mumbai | 40 MW each | Part of $3.2 bn India plan | Due live 2026 | Air-cooled; 15 kW/rack max, 5 kW average |
| **STT Palava phase 1** | Palava (Lodha), MMR | 50 MW (campus ~400 MW, 46 acres) | ₹5,000 cr | Ground broken Mar 2026 | |
| **PDG MU2** | Navi Mumbai | 120 MW | | Under construction | |
| **Yotta D2** | Greater Noida | 60 MW (campus to 250 MW) | $2 bn+ AI programme | Fit-out for 30,000 B300 GPUs | Liquid-cooled GPU halls; PUE <1.2 target on DLC |
| **Yotta NM2** | Navi Mumbai | 75–80 MW (campus up to 2 GW) | | Core and shell ready; fit-out for ~36,000–40,000 GB300/Vera Rubin GPUs | |
| **AdaniConneX Navi Mumbai** | Navi Mumbai | 1,000 MW potential | | RFS from Dec 2026 (first ~30 MW phase) | |
| **CtrlS Chandanvelly** | Near Hyderabad, Telangana (40 acres) | ~612 MW IT | | 250 MW power sanctioned for phase 1; dedicated GIS expandable to 900 MW; operational ~2027–28 | Solar façades, free-air cooling, direct liquid and immersion cooling |
| **CtrlS Kolkata (phases 2–4)** | New Town, Kolkata | 44 MW remaining of 60 MW | ₹2,200 cr campus | Phased | |
| **AWS Bharat Future City** | Ranga Reddy district, Hyderabad | Not disclosed | Within ₹60,000 cr Telangana commitment | Ground broken 2026 | Treated sewage water planned for new cooling needs |
| **Sify expansion** | Navi Mumbai + Chennai | 103 MW combined | | Building | AI-ready |
| **Nxtra Kolkata and others** | Kolkata (25 MW, ₹600 cr) etc. | | $1 bn raised (Alpha Wave, Carlyle, Anchorage) | Towards 1 GW | |
| **NTT BLR4 (remaining)** | Bengaluru | ~78 MW of 100 MW | | Phased | |

### 2.3 Planned / Announced

| Project / programme | Location | Capacity | Investment | Notes |
|---|---|---|---|---|
| **Reliance AI data centre + cable landing station** | Vizianagaram, AP (855 acres at Polipalli/Bhogapuram) | Giga-scale (~1–1.5 GW reported) | >₹1.08 lakh crore | AP Cabinet approval May 2026; 15% water-tariff subsidy for 10 years (capped ₹552.4 cr); water supply guaranteed for 20 years |
| **TCS HyperVault (OpenAI first customer, Stargate)** | Multiple (Hyderabad cited) | 100 MW initial → 1 GW | TPG-backed; terms undisclosed | Liquid-cooled design; AMD GPUs |
| **Microsoft** | Hyderabad, Pune, Chennai expansion | Not disclosed | $17.5 bn (2026–29) | Largest Asian investment |
| **AWS** | Mumbai MMR (incl. 38-acre Palava parcel) + Hyderabad | Not disclosed | $12.7 bn by 2030 (incl. $8.3 bn Maharashtra; ₹60,000 cr Telangana); later reports cite >$21 bn for 2026–30 | |
| **AirTrunk (via Lumina CloudInfra)** | Mumbai, Chennai, Hyderabad | 600 MW planned (Lumina); >5 GW long-term programme reported | Up to $5 bn (Lumina) | Acquisition announced Apr 2026 |
| **NTT DATA** | Pan-India; Hyderabad AI cluster with Neysa | ~400 MW add; 400 MW AI cluster (~25,000 GPUs) | $1.5 bn over 3 years from mid-2026 | Immersion cooling, renewables |
| **CtrlS** | Mumbai DC6/DC7; edge sites in Bhubaneswar, Bhopal, Kochi | 95 MW (Mumbai) | | Group pipeline 4.4 GW claimed |
| **STT GDC** | Mucherla, Hyderabad; Dholera (Gujarat) under study | | $412 m (Hyderabad); ₹8,000–10,000 cr (Dholera, evaluating) | |
| **Colt DCS–RMZ JV** | Mumbai, Chennai etc. | >250 MW | $1.7 bn | |
| **Hiranandani group (TEECL)** | Uttarpara, Hooghly, West Bengal (100 acres) | 250 MW (6 DCs) | ₹8,500 cr | |
| **Nxtra** | Pan-India | Expansion to ~1 GW | | |
| **UP pipeline** | Noida/Greater Noida/Lucknow | 29 MoUs | ₹1,36,124 cr proposed | Under UP DC Policy |

**Status caveat.** "Planned" capacity in India historically converts slowly. Treat MoU values (state summits, Davos) as intentions. Groundbreaking, sanctioned power and anchor tenants are the reliable signals: Vizag (Google), Jamnagar (Meta 168 MW) and CtrlS (250 MW sanctioned) all have them.

## 3. Power Requirements

**Facility power = IT load × PUE.** Indian PUEs typically run 1.35–1.65: CtrlS ~1.35 design, Yotta NM1 <1.5, Yotta D1 ~1.65, STT <1.5 design, with liquid-cooled GPU halls targeting <1.2–1.3. That implies:

| Scope | IT load | Estimated facility demand (PUE 1.4–1.6) |
|---|---|---|
| Operational today | 1,789 MW | ~2.5–2.9 GW at full load (lower in practice: ~15% vacancy and partial utilisation) |
| C&W pipeline to 2030 | +3,860 MW | +5.4–6.2 GW |
| Vizag + Jamnagar + Vizianagaram AI campuses (announced) | +3–5 GW | +3.6–7 GW (AI halls at PUE ~1.2–1.4) |

**Estimate methodology.** Energy use today is about 9–17 TWh/yr: 1,789 MW × 60–75% utilisation × 8,760 h × PUE 1.5 gives the upper end. CEEW's ~0.5%-of-national figure implies the lower end. Single AI campuses are now sized like large power plants: Vizag ~1 GW, Jamnagar potentially 3 GW.

**Power sourcing in practice:**
- **Grid supply from state utilities** at industrial/HT tariffs, often with **dual-grid feeds**. UP provides them at state cost to its first 8 data centre parks.
- **Open-access and ISTS renewable PPAs.** Examples: Nxtra's 125.65 MW solar-wind hybrid with AMPIN, 482,800 MWh contracted; Microsoft's >1,000 MW of PPAs; CtrlS's MoU with NTPC Green for ~2 GW; Meta's ~1 GW of new Indian PPAs alongside the Reliance deal. RE developers told CEEW that **up to ~80% renewable supply is feasible** with diversified solar-wind plus storage.
- **Captive or dedicated generation.** Reliance's Jamnagar green-energy complex. AdaniConneX building transmission, generation and storage for Vizag. CtrlS's captive solar at Nagpur.
- **Diesel backup is universal.** CEEW stakeholders called DG sets "indispensable". Yotta D1 alone has 67.5 MW of diesel gensets (30 × 2.25 MW).
- **Reported renewable shares:** Nxtra 49% (FY25). STT GDC India reports figures of 48–70% across different pages, so use the FY25 ESG report. AdaniConneX claims "up to 100%" per campus. Per Ember's Global Electricity Review 2025, India generated 78% of its electricity from fossil sources in 2024 (coal 75%), and Ember's 2026 data put the 2025 share at 73%; the "unbundled" grid share therefore remains coal-heavy.

## 4. Water Requirements

### 4.1 Direct use: what is actually disclosed

| Operator | Disclosure | Source breakup | Year |
|---|---|---|---|
| Nxtra by Airtel | 216,357 KL consumed | 9,876 KL groundwater (~4.6%); 191,152 KL third-party/municipal (~88%); ~15,300 KL (~7%) unspecified; no surface water | 2025 ESG |
| STT GDC (global) | 1,149,020 KL withdrawn; India 419,204 KL in 2023 (40% of global); WUE 0.73 L/kWh; 46.7% water reduction vs FY21 | Rainwater harvesting; recycled water for cooling towers at Chennai DC2 | 2023–24 |
| NTT (global) | 413,779 KL withdrawn, 203,297 KL consumed (2023); WUE 0.72 portfolio, **1.42 at evaporative sites** | Not split; 2025 report dropped water data | 2023–24 |
| CtrlS | 409,037 KL consumed (FY24) vs 468,330 KL (FY23); air-cooled retrofits save ~119,662 KL/yr | Not split | FY24 |
| Sify | 6,132,323 KL withdrawn (FY24) → 306,916 KL (FY25) | Not split; the 95% drop is unexplained, likely a boundary change | FY24–25 |
| AdaniConneX | Not disclosed separately (Adani Enterprises total 4,390 ML across all businesses) | n/a | 2025 |
| Microsoft (Hyderabad) | "Zero water for cooling" (air-cooled chillers) | Domestic use only | 2026 |
| AWS India | "No water for cooling" in operational DCs; new DCs to use **recycled sewage water**; claims 120% water-positive in India (2025) | Treated sewage (planned) | 2026 |
| Google Vizag | "Advanced air cooling"; water claimed to come from "industrial sources" | Contested: petitioners allege a rural drinking-water scheme | 2026 |
| Reliance–Meta Jamnagar | **Desalinated seawater** for cooling | Seawater (desalination) | 2026 |

**Key point.** No operator publishes site-level data. Down To Earth's review of the Nxtra, AdaniConneX, STT, NTT, CtrlS and Sify ESG reports found inconsistent WUE reporting and no facility breakdown. CEEW found that **small operators (<5 MW) mainly use municipal supply**, and most stakeholders rate water risk only "low to medium". That perception sits uneasily with Chennai's 2019 "Day Zero", Bengaluru's 2024 crisis and Vizag's 410 MLD supply against 480 MLD demand.

### 4.2 Typical ranges and a national estimate

- **Rule of thumb.** A 100 MW hyperscale facility using evaporative cooling consumes ~2 million litres/day (IEA, cited by CEEW). That is ~0.83 L per kWh of IT energy, consistent with disclosed WUEs of 0.7–1.4.
- **By cooling type, per kWh of IT energy:**
  - Air-cooled chillers / closed-loop: ~0–0.1 L
  - Water-cooled chillers with cooling towers: ~1–2 L
  - Fully evaporative/adiabatic in hot, dry peaks: up to ~1.8–3 L
- **Bottom-up national estimate of direct use (this report's estimate).**
  - Inputs: IT energy of 6–12 TWh/yr; an assumed 40–60% of capacity on water-cooled/evaporative systems at ~1.4–1.8 L/kWh; the rest air-cooled.
  - Result: **~4–13 billion litres/yr**.
  - Cross-check: scaling the disclosures (STT India ~0.42 bn L, CtrlS ~0.41 bn L, Nxtra ~0.22 bn L) across 1.8 GW gives a few billion litres.
- **Conflict flag.** CEEW's February 2026 report "Scaling India's Data Centre Ecosystem" gives India's data centre water use as **"approximately 150 billion litres"**, citing Mordor Intelligence (2025), and says it is "projected to more than double by 2030". WION puts the 2030 projection at 358.66 billion litres, a CAGR of over 19%. The 150 billion figure implies ~15+ L per kWh of IT energy, roughly 10× any disclosed WUE. It only becomes plausible if it bundles withdrawals, indirect (power-sector) water or construction water. Treat it as an upper bound, not as direct cooling consumption.

### 4.3 Indirect water (embedded in electricity)

- **Method.** Indirect water ≈ grid kWh × fossil share × thermal specific water consumption (SWC).
  - India's MoEFCC norms (Dec 2015) cap cooling-tower thermal plants at **3.5 m³/MWh** (existing) and **3.0 m³/MWh** for post-2017 plants (relaxed from 2.5 in 2018, with zero liquid discharge). Seawater-cooled coastal plants are exempt.
  - RTI data show many plants exceed the norms.
  - Ember reports 78% fossil generation in 2024 (73% in 2025). On that basis, grid-average indirect consumption is **~2.3–2.7 L/kWh**, about 3.5–4 L per kWh of IT energy at PUE 1.5.
- **Implication 1: indirect use dominates.** At India's current grid mix it is 2–5× direct on-site use. That is ~18–46 billion litres/yr nationally (this report's estimate), drawn at distant coal plants rather than in the host city.
- **Implication 2: the air vs water trade-off is real but narrow.** Worked example for a 100 MW IT site at full load (876 GWh IT/yr) and 2.5 L/kWh grid water:

| Design | PUE | WUE | Direct water | Indirect water | Total |
|---|---|---|---|---|---|
| Evaporative | 1.35 | 1.4 | ~1.23 bn L | ~2.96 bn L | **~4.2 bn L** |
| Air-cooled chillers | 1.55 | ~0.05 | ~0.04 bn L | ~3.39 bn L | **~3.4 bn L** |

  Air cooling wins on total water and decisively on *local* water. It costs ~15% more electricity and therefore more CO₂.
- **Implication 3: renewables are the biggest water lever.** Solar PV and wind consume near-zero operational water, so a 70–80% RE PPA cuts indirect water roughly proportionally. Renewable sourcing therefore matters more than cooling choice for total water footprint.

## 5. Cooling Technology

| Technology | Where used in India | Water | Energy | Fit |
|---|---|---|---|---|
| **Air-cooled chillers** (with free-cooling economisers) | Microsoft Hyderabad; AWS India; STT "predominantly air-cooled pan-India"; AdaniConneX; Google Vizag ("advanced air cooling") | ~Zero | Higher PUE (~1.4–1.6) | Becoming the hyperscale default in water-stressed cities |
| **Water-cooled chillers + cooling towers** | Legacy and many colo sites (NTT "evaporative sites" WUE 1.42; STT Chennai DC2 using recycled water) | 1–2 L/kWh | Lower PUE | Declining; viable with recycled water or seawater |
| **Evaporative / adiabatic assist** | Yotta (adiabatic + free cooling); peak-shaving at many sites | Moderate, seasonal | Low | Works best in dry heat (NCR, Hyderabad); weak in humid Mumbai/Chennai |
| **Free (economiser) cooling** | CtrlS Chandanvelly design; NCR winters | Zero | Very low | Limited hours in coastal humid climates |
| **Direct-to-chip liquid (DLC)** | Yotta GPU halls (PUE <1.2 target); Sify Rabale (DGX-Ready, ~130–200 kW/rack); CtrlS Kolkata/Chennai (up to 70 kW/rack); STT up to 120 kW/rack; TCS HyperVault (liquid-cooled by design) | Closed loop, low | Very low | Required for Blackwell/GB300-class racks |
| **Immersion** | NTT (first Indian production deployment; planned for Hyderabad AI cluster); CtrlS Chandanvelly; Yotta TB1/TB2 | Near-zero | Very low | Niche but growing |
| **Rear-door heat exchangers (RDHx), in-row** | STT GDC offerings | Low | Low | Retrofit path for 20–50 kW racks |
| **Seawater/desalinated cooling** | Reliance–Meta Jamnagar; AP policy proposes seawater cooling for coastal parks | No freshwater (but brine discharge and energy for desalination) | Moderate | Coastal giga-campuses |
| **District cooling** | Yotta G1, GIFT City (design PUE ~1.6) | Shared plant | Moderate | SEZ/IFSC settings |

**Direction of travel.** New AI capacity is pairing **air-cooled chillers for the facility loop with liquid cooling at the chip**, the "zero-water" design that Microsoft and AWS describe. Water use then shifts almost entirely to the power sector.

## 6. "Why Here?" Cluster Analysis

| Cluster | Electricity | Water | Climate | Land and cost | Connectivity | Proximity to users | Incentives |
|---|---|---|---|---|---|---|---|
| **Mumbai / Navi Mumbai / Thane–Belapur / Palava** | Strongest power availability of any metro (MSEDCL, Tata Power, Adani Electricity); 24×7 supply assured under state policy; dense HT substations along MIDC belts | Municipal and MIDC supply; recurring lake-level cuts (e.g. a 10% city cut) make air cooling prudent | Hot-humid coastal; high wet-bulb limits evaporative and free cooling; monsoon flood risk | Scarce and expensive in the city; MIDC/Navi Mumbai/Palava industrial land is the release valve (e.g. STT's 46-acre Palava, AWS's 38-acre Lodha parcel) | **India's cable capital**: per BW Businessworld, 15 of India's 17 international cables land within a ~6 km stretch at Versova; SEA-ME-WE 6 and 2Africa landings | BFSI, stock exchanges, media and corporate HQs; lowest latency to Gulf/Europe | Maharashtra IT/ITeS Policy 2023: electricity-duty exemption, 100% stamp duty exemption on DC land, industrial power tariff; data centres treated as an essential service |
| **Chennai** | Good TN grid; strong wind and solar in the state; concessional open access under TN policy | **High stress**: "Day Zero" in 2019; projected 2026 deficit ~713 MLD; desalination plants exist | Hot-humid coastal; cyclone and flood exposure | Cheaper than Mumbai; SIPCOT Siruseri/Ambattur IT parks | Second cable hub; Airtel SEA-ME-WE 6 landing; Tata, Jio and Airtel CLSs; gateway to Southeast Asia | Southern enterprise, automotive and IT; diversity site for Mumbai | TN DC Policy 2021: 100% electricity-tax waiver on state-utility power, single window, dual power, stamp duty and land concessions, training subsidies |
| **Hyderabad** | Telangana grid surplus history; GIS-scale sanctions (CtrlS 250 MW → 900 MW); large RE PPAs | Semi-arid Deccan; reliant on Krishna/Godavari transfers; AWS plans treated sewage water | Inland plateau (~500 m); dry heat good for air and adiabatic cooling; **low seismic risk (Zone II)** | Abundant, cheaper land (Chandanvelly, Mucherla, Bharat Future City) | Inland: terrestrial fibre to Mumbai/Chennai/Vizag CLSs | IT/GCC hub; hyperscaler engineering centres | 100% reimbursement of stamp duty and registration fees; state facilitation for AWS, Microsoft, CtrlS, AdaniConneX |
| **Delhi NCR (Noida / Greater Noida / Gurugram)** | UP offers dual-grid supply and transmission/wheeling-charge waivers; Haryana policy for ≥1 MW DCs | Groundwater stress in Greater Noida; DTE documented community concerns | Extreme summers (dry heat, 45 °C+) but cool winters give free-cooling hours; air pollution affects filtration | Large plots in Greater Noida (Yotta's 20 acres); cheaper than Gurugram | Inland; terrestrial routes to Mumbai/Chennai | Government, PSU, defence, North India enterprise; sovereign workloads | **UP DC Policy 2021 (amended 2022)**: 7% capital subsidy up to ₹20 cr; 60% interest subsidy for parks (up to ₹50 cr); 25–50% land subsidy (up to ₹75 cr); 100%/50% stamp duty; 100% electricity duty for 10 years; 29 MoUs worth ₹1.36 lakh cr |
| **Bengaluru** | Constrained by local substation capacity; Karnataka has strong RE | **Severe stress** (2024 crisis); DCs use ~26 million litres/yr in the city | Mild (~900 m elevation): best free-cooling climate among metros | Expensive near the city; airport corridor (NTT BLR4) | Inland | Tech, startups, GCCs | Karnataka DC Policy 2022–27; lost the Google AI hub to AP |
| **Pune** | MSEDCL grid; part of Maharashtra policy | Moderate | Moderate (~560 m); better than Mumbai for cooling | "Competitively priced development-ready land" (C&W) | ~150 km from Mumbai CLSs: ideal Mumbai DR/availability zone | Auto, IT, manufacturing; Microsoft Central India region | Maharashtra policy |
| **Kolkata / West Bengal** | WBSEDCL coal-heavy grid | River-fed but flood-prone | Hot-humid; cyclone exposure | Cheap (New Town, Uttarpara 100 acres) | Digha CLS under development; gateway to Northeast/Bangladesh | Eastern India underserved: 22 MW operational | WB policy; CtrlS, NTT, Nxtra and Hiranandani investing |
| **Visakhapatnam / north coastal AP** | Purpose-built transmission and clean generation (AdaniConneX); AP offers ~₹1/unit discount (reported) and integrated clean-energy policy | Contested: city supply 410 MLD vs 480 MLD demand; state says no residential or reservoir water; AP policy proposes seawater cooling | Hot-humid coastal; cyclone exposure | **Gigawatt-scale land**: 601 acres (Google), 855 acres (Reliance Vizianagaram) | **New east-coast gateway**: Google's three subsea cables (to Singapore, Australia, South Africa); Reliance CLS | Serves India and Southeast Asia/Australia routes | AP package for Google reported as 25% land subsidy, water-tariff concession, power discounts, 100% SGST reimbursement (Karnataka minister put it at ₹22,000 cr, a political claim); Reliance gets a 15% water-tariff subsidy for 10 years |
| **Jamnagar / Gujarat** | Reliance's captive solar/wind/storage giga-complex; Gujarat allows captive and open-access flexibility | Arid; **desalinated seawater** used | Hot, arid; dust | Reliance-owned industrial land at the world's largest refinery site | Close to western CLSs (Mumbai) and Jio's fibre network | AI training and inference for national and global tenants (Meta) | Gujarat captive/open-access flexibility; GIFT City IFSC/SEZ (Yotta G1); STT studying Dholera |
| **Emerging tier-2** (Jaipur, Lucknow, Patna, Bhubaneswar, Bhopal, Kochi, Siliguri, Ahmedabad) | State grids | Varies | Varies | Cheap | Bhubaneswar/Digha/Puducherry CLSs under development; Kochi has existing landings | Edge, latency and sovereign/state workloads | UP edge incentive (≥25 edge DCs per proposal); Odisha DC Policy 2022 |

**Interpretation.**
- **Cables chose the first generation of sites** (Mumbai, Chennai). **Power and land are choosing the AI generation** (Hyderabad, Vizag, Jamnagar, Greater Noida).
- The share of national capacity outside Mumbai will rise, but Mumbai's absolute lead persists through 2030 on its 1.7 GW pipeline.
- Mumbai's cable concentration at Versova is a single point of failure. New landings at Vizag, Digha, Bhubaneswar and Puducherry partly hedge it.

## 7. Regulatory Incentives

**Central government**
- **Infrastructure status** (harmonised master list) gives easier long-term debt.
- **Union Budget 2026-27 (1 Feb 2026):** a tax holiday to tax year 2046-47 for foreign companies providing cloud services to customers globally using data centre services from India. Indian customers must be served through an Indian reseller. There is also a **15% cost-plus safe harbour** when the Indian data centre provider is a related entity. Law firms note the facility must be a notified "specified data centre", and the structure favours foreign hyperscalers **procuring** capacity from Indian operators rather than owning it directly.
- **National Data Centre Policy:** the 2020 draft was never finalised. There is **no binding national PUE, WUE or renewable mandate**. CEEW stakeholders back a national green data centre framework alongside state policies.
- **Data localisation:**
  - RBI's 2018 payment-data mandate and sectoral rules (government, BFSI, telecom) drive in-country hosting.
  - The DPDP Act 2023 does **not** impose blanket localisation. It permits cross-border transfers except to notified restricted countries.
  - "Sovereign cloud" demand is therefore more commercial and regulatory-driven than statutory. Microsoft, AWS and OpenAI all cite data residency for regulated sectors.
- **SEZ / IFSC:** GIFT City units get extended IFSC tax holidays (proposed 20 years). AP and other states promote Digital Centre Economic Zones.

**State policies (selected)**

| State | Policy | Headline incentives |
|---|---|---|
| Maharashtra | IT/ITeS Policy 2023 (+ Services Sector Policy 2025) | Electricity-duty exemption for registered DCs; 100% stamp duty exemption on DC land/premises; industrial power tariff; 24×7 power; first state with extra incentives for green integrated DC parks |
| Uttar Pradesh | DC Policy 2021, amended 2022 | 7% capital subsidy (≤₹20 cr); 60% interest subsidy for parks (≤₹50 cr); 25–50% land subsidy (≤₹75 cr); 100%/50% stamp duty; 100% electricity duty exemption for 10 years; dual grid for first 8 parks; transmission/wheeling waivers; cross-subsidy surcharge glide-path |
| Tamil Nadu | DC Policy 2021 | 100% electricity-tax subsidy on state-utility power; concessional open access and cross-subsidy relief; dual power; stamp duty concessions; single window; separate building rules |
| Telangana | DC policy (2016) + negotiated packages | 100% reimbursement of stamp duty and registration fees; MoU-specific power and land support |
| Andhra Pradesh | DC Policy 2024-29; IT & GCC Policy 4.0; LIFT land policy; Integrated Clean Energy Policy 2024 | 100% SGST reimbursement on capital goods **or** 10% capital subsidy; land, water and power concessions in mega-project packages |
| Karnataka, Haryana, Odisha, West Bengal, Gujarat | Karnataka DC Policy 2022-27; Haryana DC Policy 2022 (≥1 MW; ₹7,500 cr target); Odisha DC Policy 2022; WB policy; Gujarat captive/open-access flexibility | Mix of power, stamp duty, capital subsidy and single window |

**Execution gap.** CEEW's consultations found that single-window promises still stall on land acquisition, building approvals, grid connectivity and fire clearances. Incentive percentages are often renegotiated MoU by MoU, so confirm terms in writing with the state agency.

## Recommendations

1. **For site selection:**
   - Treat **sanctioned power (MVA) and transmission timelines** as the gating criterion, ahead of land or incentives.
   - Prioritise Hyderabad, Pune, Greater Noida and the AP coast for large-scale AI and hyperscale builds.
   - Use Mumbai/Chennai for interconnection-dense, latency-sensitive and cable-adjacent capacity.
2. **For water risk:**
   - Default to **air-cooled chillers plus direct-to-chip liquid cooling** in Chennai, Bengaluru, NCR and Vizag.
   - Where evaporative cooling is unavoidable, contract **treated sewage water or seawater** rather than municipal or groundwater.
   - Require site-level WUE and a source breakup in leases and ESG reporting.
3. **For carbon and indirect water:** pair any build with **≥70% renewable PPAs** (feasible to ~80% per RE developers). In India's grid this is the single largest lever on both emissions and total water footprint.
4. **For investors and analysts:**
   - Discount MoU-stage capacity.
   - Track the hard milestones: groundbreaking, anchor tenant, power sanction, cable RFS.
   - Treat the 2047 tax holiday as favouring **Indian-owned colocation and build-to-suit platforms** (STT, CtrlS, Nxtra, Yotta, AdaniConneX, Reliance) that sell to foreign hyperscalers.
5. **For policymakers:** a national framework should mandate **facility-level disclosure of PUE, WUE and water source**, and should prohibit potable or groundwater cooling in over-exploited blocks. Right now only 5 of 15 state policies address sustainability at all.

## Caveats

- **Definitions vary.** "MW" can mean IT load, utility connection or campus potential. Aggregator portfolio figures (BlackRidge, DMC, datacenters.com) are inconsistent: Sify is shown at 129 MW in one source and ~200 MW in another, and STT's renewable share at 30–70% on different pages. Primary sources were preferred where available.
- **Reported vs confirmed.** Several figures are secondary or unconfirmed:
  - Reliance's 3 GW Jamnagar capacity and $20–30 bn cost (Bloomberg; Reliance has not confirmed).
  - The Vizag 2.51 GW clearance figure and July 2028 commissioning date.
  - The AP–Google incentive valuation (a political claim by Karnataka's minister).
  - AWS's ">$21 bn 2026–30".
- **Estimates in this report** (facility power, national direct and indirect water, the 100 MW worked example) are order-of-magnitude calculations. Assumptions are stated: utilisation 60–75%, PUE 1.4–1.6, WUE 0.05–1.8 L/kWh, grid fossil share ~78% (Ember's 2024 figure; 73% in 2025), thermal SWC 3.0–3.5 m³/MWh. Real plants often exceed SWC norms.
- **Water litigation.** The Vizag water-source dispute is pending before the AP High Court. Google's "air cooling" and the state's "no residential water" assurances have not been independently verified.
- **Climate characterisations** (humidity, elevation, seismic zones) are general and not site-specific engineering data.
- **Future dates** (Vizag ~mid-2028, Meta–Reliance by ~2028, AdaniConneX Navi Mumbai RFS Dec 2026) are targets, not achievements.

## Sources

1. dmc-education — https://dmc-education.com/2026/10/02/indias-67b-data-centre-boom-the-rise-of-ai-hyperscale-infrastructure-2026-2030/
2. voicendata — https://www.voicendata.com/data-centre/indias-data-centre-pipeline-touches-386-gw-mumbai-leads-12540883
3. indiagazette — https://www.indiagazette.com/news/279310038/india-to-add-3860-mw-data-centre-capacity-by-2030-require-usd-299-bn-investment-report
4. blackridgeresearch — https://www.blackridgeresearch.com/blog/latest-list-of-new-upcoming-data-center-projects-in-india
5. datacenters — https://www.datacenters.com/providers/adaniconnex
6. deccanherald — https://www.deccanherald.com/amp/story/india%2Fkarnataka%2Fandhra-pradeshs-google-incentive-package-is-economic-disaster-priyank-kharge-3765605
7. oneworldlogix — https://oneworldlogix.com/owl/stt-gdc-india-ipo-2026/
8. downtoearth — https://www.downtoearth.org.in/science-technology/indias-digital-thirst-what-data-centre-giants-arent-saying-about-their-water-use
9. earthjournalism — https://earthjournalism.net/stories/what-data-center-giants-arent-saying-about-their-water-use-in-india
10. ceew — https://www.ceew.in/publications/how-is-data-centre-infrastructure-in-india-shaping-power-and-water-use
11. techradar — https://www.techradar.com/pro/indias-richest-person-wants-to-build-the-worlds-largest-data-center-five-times-the-capacity-of-microsofts-mega-site
12. technosports — https://technosports.co.in/google-india-ai-hub-251gw/
13. blackridgeresearch — https://www.blackridgeresearch.com/blog/list-of-top-ten-largest-data-center-companies-in-india
14. w — https://w.media/ctrls-launches-new-data-center-in-hyderabad/
15. Wikipedia — https://en.wikipedia.org/wiki/List_of_data_centres_in_West_Bengal
16. thetechcapital — https://thetechcapital.com/airtel-deepens-data-centre-push-with-1gw-capacity-target/
17. datacentremagazine — https://datacentremagazine.com/news/behind-yottas-award-winning-ai-infrastructure-strategy
18. yotta — https://yotta.com/data-center/
19. yotta — https://yotta.com/press-releases/yotta-launches-north-indias-first-hyperscale-data-center-yotta-d1-in-greater-noida/
20. mexc — https://www.mexc.com/news/128877
21. datacenterlocations — https://datacenterlocations.com/sttgdc/
22. yotta — https://colocation.yotta.com/data-center/
23. datacenters — https://www.datacenters.com/adaniconnex-navi
24. dmc-education — https://dmc-education.com/2026/08/27/india-data-centre-projects-2026-top-10-upcoming-under-construction-data-centres/
25. datacenterdynamics — https://www.datacenterdynamics.com/en/news/ctrls-to-build-40-acre-data-center-campus-near-hyderabad-india/
26. Wikipedia — https://en.wikipedia.org/wiki/Data_centre_industry_in_India
27. techtrendske — https://techtrendske.co.ke/2026/04/03/airtel-nxtra-data-center-investment-1b/
28. cxotoday — https://cxotoday.com/daily-news/reliance-to-invest-%E2%82%B91-08-lakh-crore-in-massive-andhra-pradesh-ai-data-centre/
29. goodreturns — https://www.goodreturns.in/news/andhra-pradesh-cabinet-clears-rs-1-42-lakh-crore-investments-ai-data-centre-011-1508481.html
30. Wikipedia — https://en.wikipedia.org/wiki/AirTrunk
31. crnasia — https://www.crnasia.com/india/news/2026/airtel-raises-1-billion-for-nxtra-to-scale-ai-ready-data-centre-capacity-to-1-gw
32. up — https://uplc.up.gov.in/en/page/uttar-pradesh-data-center-policy
33. ocolo — https://www.ocolo.io/colocation/yotta/d1-greater-noida/
34. yotta — https://yotta.com/data-center-in-india/
35. tele — https://tele.net.in/telefocus/building-smarter-efficiency-and-sustainability-emerge-as-key-pillars-of-data-centre-expansion-12226383
36. thenextweb — https://thenextweb.com/news/microsoft-india-hyderabad-fourth-cloud-region-17-5-billion
37. businesswire — https://www.businesswire.com/news/home/20260120884410/en
38. energetica-india — https://www.energetica-india.net/news/nxtra-by-airtel-reports-15-percent-emission-reduction-49-percent-renewable-energy-use-in-fy-2024-25
39. airtel — https://www.airtel.in/press-release/07-2025/nxtra-by-airtel-augments-green-energy-resources-signs-partnership-with-ampin-energy-transition-for-additional-205167-mwh-supply-from-ists-solar-wind-hybrid-projects/
40. sahi — https://www.sahi.com/blogs/meta-reliance-jamnagar-data-center-india-ai-infrastructure
41. Entrepreneur — https://india.entrepreneur.com/technology/how-data-center-companies-are-gearing-up-to-meet-energy/503228
42. niftytrader — https://www.niftytrader.in/markets/india-biggest-datacentre-reliance-jv-1gw/
43. developingtelecoms — https://developingtelecoms.com/telecom-technology/data-centres-networks/19196-google-airtel-and-adaniconnex-to-build-us-15b-ai-hub-in-india.html
44. airtel — https://www.airtel.in/press-release/08-2025/nxtra-by-sirtel-releases-sustainability-report-for-fy2024-25
45. adaniconnex — https://www.adaniconnex.com/data-centers
46. outlookbusiness — https://www.outlookbusiness.com/corporate/googles-15-bn-data-centre-in-andhra-pradesh-faces-environmental-pushback
47. reccessary — https://www.reccessary.com/en/news/india-ai-data-center-water-crisis
48. arxiv — https://arxiv.org/pdf/2607.13443
49. powerline — https://powerline.net.in/2026/09/04/water-stress-thermal-power-plants-take-steps-to-optimise-consumption/
50. cea — https://cea.nic.in/old/reports/cea-jcoal/presentation/Environment%20Norms%20Progress.pdf
51. business-standard — https://www.business-standard.com/article/current-affairs/thermal-power-plants-in-india-using-more-water-than-permitted-limit-rti-119091300136_1.html
52. cag — https://www.cag.org.in/newsletters/public-newsense/water-consumption-data-thermal-power-plants
53. businesstoday — https://www.businesstoday.in/technology/news/story/aws-plans-treated-sewage-water-for-cooling-at-future-india-data-centres-548121-2026-08-08
54. tipranks — https://www.tipranks.com/news/the-fly/microsoft-new-data-center-design-optimizes-ai-tasks-with-zero-water-to-cool
55. datacenterdynamics — https://www.datacenterdynamics.com/en/opinions/state-governments-the-new-kingmakers-in-indias-hyperscale-data-center-race/
56. Wikipedia — https://en.wikipedia.org/wiki/SEA-ME-WE_6
57. Wikipedia — https://en.wikipedia.org/wiki/2Africa
58. rprealtyplus — https://www.rprealtyplus.com/interviews/incentives-laws-for-data-centres-in-maharashtra-118963.html
59. quatrohive — https://quatrohive.com/indias-data-centre-policy-landscape-balancing-incentives-with-complexity/
60. mondaq — https://www.mondaq.com/india/government-contracts-procurement-ppp/1173030/legal-considerations-for-investments-in-data-centres-in-india
61. adaniconnex — https://www.adaniconnex.com/data-centers/chennai
62. wirecable — https://www.wirecable.in/indias-potential-to-become/
63. telecomtalk — https://telecomtalk.info/ministry-emphasises-indias-role-in-submarine-infrastructure/985896/
64. slideshare — https://www.slideshare.net/slideshow/data-centre-policies-in-india-a-statewise-comparisonpdf/252247897
65. cushmanwakefield — https://assets.cushmanwakefield.com/-/media/cw/apac/india/insights/data-centre-policies-in-india-a-statewise-comparison.pdf?rev=6e0e167e39bf41f383b67eef232479f4
66. up — https://invest.up.gov.in/up-data-centre-policy-2021/
67. pressreader — https://www.pressreader.com/india/hindustan-times-bathinda/20220628/281724093236698
68. profileits — https://www.profileits.com/data-center-policies-subsidies-approval/
69. takshashila — https://takshashila.org.in/content/publications/20260720-subsea-cable-governance.html
70. businessworld — https://www.businessworld.in/article/india-cheap-internet-undersea-cable-vulnerability-war-zones-2026-598929
71. business-standard — https://www.business-standard.com/economy/uttar-pradesh/uttar-pradesh-data-centre-policy-2021-key-features-incentives-eligibility-and-implementation-126092800736_1.html
72. beaconfiling — https://beaconfiling.com/blog/india-data-center-boom-fdi-incentives
73. pib — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2221412&reg=48&lang=2
74. snrlaw — https://www.snrlaw.in/indian-budget-2026-27-tax-incentives-for-data-centres/
75. tribuneindia — https://www.tribuneindia.com/news/world/microsofts-usd-17-5-billion-push-signals-indias-leap-into-new-ai-era
76. TechCrunch — https://techcrunch.com/2026/02/18/openai-taps-tata-for-100mw-ai-data-center-capacity-in-india-eyes-1gw/
77. kpmg — https://assets.kpmg.com/content/dam/kpmgsites/in/pdf/2026/02/energy-natural-resources-and-chemicals-pov-union-budget-2026-27.pdf
78. ctrls — https://www.ctrls.com/blogs-indian-datacenter-policy-ecosystem-key-expectations-from-industry/
79. finraja — https://finraja.com/maharashtra-it-ites-policy-2023-incentives-subsidy/
80. cushmanwakefield — https://www.cushmanwakefield.com/en/india/insights/data-centers-the-new-pillar-of-infrastructure
81. scribd — https://www.scribd.com/document/822332994/DOC-20250128-WA0020
82. superpowerdaily — https://superpowerdaily.com/posts/guardian-finds-google-s-india-ai-project-cleared-for-2-51gw-versus-announced-1gw
83. techstory — https://techstory.in/google-cloud-ai-hub-project-begins-in-visakhapatnam-under-adani-airtel-partnership/
84. freemalaysiatoday — https://www.freemalaysiatoday.com/category/business/2026/08/06/google-s-us-15bil-india-data-centre-project-battles-water-wildlife-concerns
85. techresearchonline — https://techresearchonline.com/news/google-visakhapatnam-data-center-environmental-impact-india/
