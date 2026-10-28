<!-- Report 8 of the India Data Centre Atlas research series (Green data centres; atlas chapter 17.1). Produced with AI-assisted web research, October 2026, and kept as written at the time. Some figures were corrected later (notably India grid water 4.5 → 2.9 L/kWh and grid CO₂ 0.71 → 0.675 t/MWh, October 2026); the atlas standards register (src/data/standards.js) is authoritative where they differ. -->

# Green Data Centres: A Decision-Grade Synthesis for India and Karnataka (October 2026)

**Bottom line:** A data centre is "green" only if it is measured, disclosed and verified on at least four dimensions (efficiency, hourly carbon-free power, freshwater impact, and embodied/lifecycle carbon), and for a Bengaluru operator the cheapest, most bankable route is a design-PUE of ≤1.20, ≥80% round-the-clock renewable supply through open access or group captive, and dry/treated-water cooling. On our worked numbers that package costs roughly 5% more capex, pays back in about 2–3 years on energy savings alone, and abates carbon at a *negative* cost.

## TL;DR

- **Green = measured performance, not labels.** The global benchmark has stalled: Uptime Institute's 2025 survey puts the weighted-average PUE at 1.54 for the sixth straight year, while Google's fleet ran at 1.09 in 2025. Regulators are now turning metrics into licences to operate. Germany requires PUE ≤1.2 for new sites from July 2026, Singapore's 2026 capacity round required PUE 1.25 at full load plus ≥50% green energy, and from August 2027 the EU will grade every site above 500 kW from A to G on PUE and WUE. India has no binding national threshold. Karnataka's Sustainable Data Centre Policy 2026–31 makes plant-wise PUE/WUE reporting mandatory and pays a one-time ₹20 crore incentive for sustained PUE of 1.00–1.20.
- **For a 20 MW Bengaluru colo, going green pays for itself.** Moving from PUE 1.5 on grid power with evaporative cooling to PUE 1.25, 80% RTC RE and dry/TTW cooling costs about ₹60 crore extra (≈5% of ₹1,120 crore). It saves about ₹24.5 crore a year in electricity, cuts CO₂ by about 109,000 t/yr (≈83% at the CEA factor of 0.710) and freshwater use by about 196 million litres a year. Our estimated marginal abatement cost is about –₹2,500/tCO₂ overall. Efficiency carries the economics; the RE premium or discount depends on Karnataka's open-access charges.
- **The biggest risks are accounting and AI growth, not technology.** Hyperscaler emissions are rising despite 100% annual renewable matching: Google's ambition-based footprint rose 18% in 2025 and Microsoft's reported emissions were 20.29 Mt in FY25, up 25% year on year. India should therefore build its definition of "green" on hourly matching, additionality, location-based disclosure and lifecycle carbon from the start. Unbundled RECs and annual matching should not count.

---

## 1. What is a "green data centre"?

### 1.1 A working definition

A green data centre delivers digital services with the lowest feasible **lifecycle** environmental impact per unit of useful computing, and proves it with **independently verifiable, site-level, time-resolved** data. That definition has three implications:

1. **"Per unit of useful compute"**, not per MW. A very efficient building full of idle servers is not green.
2. **"Lifecycle"**: operational energy, plus construction materials, IT hardware manufacturing (Scope 3), refrigerants, water and end-of-life.
3. **"Time-resolved"**: carbon depends on *when* and *where* electricity is consumed. As the earlier report "Every TWh is not the same" argued, an annual REC-matched TWh in a coal-heavy grid at 8 pm is not equivalent to a physically delivered solar-plus-storage TWh.

### 1.2 The twelve dimensions

| # | Dimension | Core metric(s) | What "green" looks like (India-tailored) | Why it matters |
|---|---|---|---|---|
| 1 | Energy efficiency | PUE (ISO/IEC 30134-2) | ≤1.30 annualised (air); ≤1.20 (liquid-cooled AI) | Overhead energy is pure waste |
| 2 | Carbon-free energy | REF, hourly CFE score, CUE | ≥70–80% hourly-matched CFE; CUE ≤0.3 kgCO₂/IT-kWh | India's grid factor 0.710 tCO₂/MWh makes power the dominant footprint |
| 3 | Water | WUE (site), source WUE | ≤0.2 L/kWh freshwater; treated wastewater for any evaporative trim | Bengaluru water stress |
| 4 | Embodied carbon (building) | kgCO₂e/m² or /MW (EN 15978-style LCA) | 30–40% below baseline via low-clinker concrete, recycled steel, hybrid timber | Grows in share as grids decarbonise |
| 5 | IT hardware Scope 3 | kgCO₂e per server/GPU, lifecycle | Supplier EPDs/PCFs; extended refresh cycles | Now the largest share for hyperscalers |
| 6 | Circularity | % IT assets reused/refurbished; e-waste diversion | ≥90% assets reused or recycled through authorised E-Waste (Management) Rules 2022 channels | Avoids manufacturing emissions and hazardous waste |
| 7 | Heat reuse | ERF (ISO/IEC 30134-6), ERE | "Heat-reuse ready" design; absorption cooling or process heat where offtake exists | Turns waste into a product |
| 8 | Refrigerants | GWP of charge, leakage rate | Low-GWP (HFO, natural refrigerants); chiller-less where possible | HFC leakage is a hidden Scope 1 source |
| 9 | Land and biodiversity | Footprint, green cover, heat-island | Brownfield/industrial-park siting; native landscaping | Social licence, local heat |
| 10 | Backup power | Diesel litres/yr, run-hours | HVO-ready gensets, BESS for short events, fuel cells long term | Diesel is local pollution and Scope 1 |
| 11 | Grid-friendliness | Demand response, flexibility MW | BESS/UPS grid services; schedulable AI training | Helps integrate renewables |
| 12 | Social licence | Disclosure, local water/power impact, jobs | Public site-level dashboards; community water commitments | Without it, moratoria follow (Amsterdam, Dublin, Singapore 2019) |

### 1.3 Green vs greenwashing: a quick test

| Claim | Credible if… | Greenwashing red flag |
|---|---|---|
| "100% renewable" | Hourly or at least monthly matching, same grid region, additional (new) capacity, location-based Scope 2 also disclosed | Annual matching with unbundled RECs/I-RECs from old hydro elsewhere |
| "Carbon neutral" | Deep reductions first; removals (not avoidance offsets) for residuals | Cheap avoidance offsets netted against growing emissions |
| "PUE 1.2" | Annualised, measured at the utility meter boundary (ISO/IEC 30134-2 Category 2/3), at real load | Design PUE at 100% load, or a single cool-season month |
| "Water positive" | Site-level WUE disclosed; replenishment in the *same* basin | Global replenishment credits while a Bengaluru site draws borewells |
| "Green certified" | Operational certification with measured data | Design-stage label only, never re-verified |

The industry is moving in this direction. Microsoft's FY25 reported emissions rose partly because it **stopped counting non-additional unbundled RECs**. The EU's 2026 rating scheme gives guarantees of origin less credit unless they are from the same bidding zone, time-matched, and from plants commissioned or substantially refurbished within the last 10 years.

---

## 2. Metrics and standards

### 2.1 Core metrics and formulas

| Metric | Formula | Standard | Notes |
|---|---|---|---|
| **PUE** | Total facility energy ÷ IT equipment energy | ISO/IEC 30134-2 (The Green Grid, 2007) | Ideal 1.0; global weighted average 1.54 (Uptime 2025) |
| **WUE** | Annual site water (L) ÷ IT energy (kWh) | ISO/IEC 30134-9 | Karnataka policy uses this definition; the EU uses freshwater input |
| **CUE** | Total CO₂ from facility energy ÷ IT energy = grid EF × PUE (for grid-only supply) | ISO/IEC 30134-8 | Bengaluru grid-only at PUE 1.5: 0.710 × 1.5 = **1.07 kgCO₂/IT-kWh** |
| **ERF** | Reused energy ÷ total facility energy | ISO/IEC 30134-6 | German EnEfG requires 10→20% for new sites |
| **ERE** | (Total energy – reused energy) ÷ IT energy | The Green Grid | Can be <1.0 with heat reuse |
| **REF** | Renewable energy ÷ total facility energy | ISO/IEC 30134-3 | Annual; does not capture timing |
| **24/7 CFE score** | Σ_h min(load_h, CFE supply_h) ÷ Σ_h load_h | Google/UN 24/7 CFE Compact methodology | The honest metric; Google fleet ≈65% (2025) |
| **ITEEsv / ITEUsv** | IT equipment energy efficiency / utilisation for servers | ISO/IEC 30134-4/-5 | Captures the compute side that PUE ignores |
| **GEC** | Green energy share of facility energy | ISO/IEC 30134 family (Japan-originated) | Similar in spirit to REF |

**Worked CUE illustration (Karnataka):** at PUE 1.25 and 80% hourly-matched CFE, CUE = 1.25 × 0.20 × 0.710 ≈ **0.18 kgCO₂/IT-kWh**, an 83% reduction from 1.07. Using the lower Karnataka-specific factor (~0.5), the baseline CUE is 0.75 and the green case 0.125.

### 2.2 Global regulatory landscape

**European Union.** The recast Energy Efficiency Directive (EU 2023/1791) and Delegated Regulation (EU) 2024/1364 created mandatory reporting for sites with ≥500 kW of installed IT power. Reports go to a European database by 15 September 2024 and every 15 May thereafter. On **21 September 2026** the Commission adopted the second step, a Delegated Regulation establishing a **common Union rating scheme**, as part of the Data Centre Energy Efficiency Package:
- Two separate A–G grades. **Energy:** A = PUE ≤1.15, G = PUE >1.90. **Water:** A = WUE ≤0.10 L/kWh, G = >1.0.
- The label also shows energy sourcing (on-site, PPAs, guarantees of origin; renewables and, newly, nuclear as "low-emission"), grid flexibility, "waste heat reuse ready" status, and cooling degree days. The grades themselves are not climate-adjusted.
- Labels are generated automatically, first by **15 August 2027**. The 2-month Parliament/Council scrutiny period can be extended by two months.
- Step three is a **consultation on binding minimum performance standards**, closing 14 December 2026, with a legislative proposal targeted for Q2 2027.
- Context: EU data centres used **68 TWh in 2024**, projected to reach **114 TWh by 2030** (3.2% of EU demand).
- The **EU Code of Conduct for Energy Efficiency in Data Centres** (voluntary, since 2007) remains the best-practice catalogue underpinning these rules.
- Spain's draft Royal Decree goes further. It would make grid access conditional on Class-A PUE/WUE (≤1.15 / ≤0.1 in the transition) and, in one option, on **80% hourly renewable matching**. This is a preview of where minimum standards may land.

**Climate Neutral Data Centre Pact (industry self-regulation, launched January 2021):**
- PUE 1.3 (cool climates) / 1.4 (warm) for new sites at full capacity by 1 January 2025; existing sites by 1 January 2030. Applies to sites >50 kW.
- **75% renewable or hourly CFE by 31 December 2025, 100% by 31 December 2030.** The Pact marks the 2025 milestone "achieved".
- WUE: maximum 0.4 L/kWh for new cool-climate sites using potable water in water-stressed areas from 2025. This is a design maximum adjustable by climate, stress and water type, not a universal cap.

**Germany: Energy Efficiency Act (EnEfG).** The strictest binding regime:
- New sites commissioned from **1 July 2026**: **PUE ≤1.2** (to be reached within two years of operation).
- Existing sites: PUE ≤1.5 from July 2027 and ≤1.3 from July 2030. A 2026 draft amendment proposes relaxing these to **1.6 and 1.4**, a sign that the targets proved hard for legacy stock.
- **ERF** for new sites: 10% (from July 2026), 15% (July 2027), 20% (July 2028). The draft amendment adds flexibility where heat networks cannot absorb the heat.
- **Renewable electricity:** 50% from 2024, **100% from 1 January 2027**.
- Certified energy/environmental management systems are mandatory for larger sites.

**Singapore: the closest climate analogue for coastal and hot-humid India.**
- After the 2019 moratorium, Singapore moved to selective allocation. The **Green Data Centre Roadmap** (IMDA, May 2024) aims to bring all data centres to **PUE ≤1.3 at 100% IT load** within about a decade, with at least 300 MW of new capacity.
- **DC-CFA2** (opened 1 December 2025, closed 31 March 2026) required **PUE 1.25 at full IT load**, **≥50% green energy** (biomethane, low-carbon ammonia/hydrogen, novel fuel cells with carbon capture, on-site solar), **BCA-IMDA Green Mark for Data Centres 2024 Platinum**, and IT equipment beyond **SS 715:2025** efficiency.
- On **21 August 2026**, 200 MW was provisionally allocated (50 MW each to Digital Realty, Equinix, Keppel DC and STT GDC) at a Jurong Island low-carbon park. The 2023 pilot allocated 80 MW.
- Lesson for India: tropical sites can hit 1.25, but in practice only with liquid cooling and very high-efficiency plant.

**China.**
- New large and mega data centres must achieve **PUE ≤1.25**; sites in national computing hubs face **≤1.2**.
- A 2025 green data centre action plan requires new projects in the eight national hubs to source **≥80% renewable electricity**, tracked through Green Electricity Certificates.
- "East Data, West Computing" steers compute-heavy, latency-tolerant loads to Guizhou, Inner Mongolia, Gansu and Ningxia.
- RMI puts the national average PUE at around 1.48 in 2023, so the caps bind.

**United States.** No federal performance mandate. **ENERGY STAR** certification is limited to the top 25% of facilities by energy performance, and **LEED v4/v4.1 BD+C: Data Centers** (with LEED v5 rolling out) is the dominant certification. State action is mostly about grid cost allocation and disclosure rather than PUE caps. *(State-specific rules were not re-verified in this research cycle.)*

**Netherlands/Amsterdam, Ireland, Japan** *(background, not re-verified this cycle)*:
- Amsterdam paused new builds in 2019 and now zones hyperscale growth with efficiency and heat-reuse conditions.
- Ireland's grid operator has effectively restricted new Dublin connections, and connection policy increasingly requires on-site dispatchable generation or storage.
- Japan uses energy-conservation-law benchmarking for data centres, with a PUE-type benchmark target for 2030.

### 2.3 Certifications

| Certification | Scope | Strength | Weakness |
|---|---|---|---|
| LEED (v4/v4.1 BD+C Data Centers; v5) | Building lifecycle; energy modelled against ASHRAE 90.4 | Globally recognised by tenants | Design-stage heavy; weak on hourly carbon |
| BREEAM | Building sustainability (UK/EU) | Strong on materials, ecology | Less used in India |
| **IGBC Green Data Center Rating System** (CII) | Design and Operational certification; enterprise, colo, hyperscale, edge, campuses | India-specific; aims to improve national average PUE by 20–25% | Voluntary; few disclosed operational ratings |
| GRIHA | Indian green building (TERI/MNRE) | Government projects | No DC-specific variant of note |
| BCA-IMDA Green Mark for DCs 2024 | Singapore | Platinum is now a licence condition | Singapore-specific |
| Uptime Tier + Sustainability assessments | Resilience; operational sustainability | Credible with enterprise buyers | Tier is resilience, not green |
| ISO 50001 / 14001 / 14064 | Energy management, environmental management, GHG verification | Process discipline; EnEfG requires EMS | Not a performance threshold |
| ENERGY STAR (US) | Top-quartile operational energy | Performance-based | US only |

India's first IGBC Platinum data centre, ICICI Bank's Hyderabad facility, illustrates both the value and the limits of labels. It reported a **PUE of 1.36 at only 33% load**, with **15 MW of wheeled off-site renewable energy** and façade PV. That was good practice for its time but would rate only around "C" on the EU scale.

### 2.4 Indian standards and policy instruments

| Instrument | Status (Oct 2026) | Relevance |
|---|---|---|
| **BEE / ECBC & Super ECBC** | PUE benchmarks aligned with ECBC classes | Building-level; no binding DC PUE cap |
| **MeitY tenders** | AI cloud infrastructure tenders (since 2024) require **PUE <1.35** | De facto public-procurement standard |
| **TRAI** | Recommendations on a regulatory framework for data centres (incl. green measures) | Advisory |
| **IGBC Green DC** | Voluntary design/operational certification | Market signalling |
| **SEBI BRSR / BRSR Core** | Listed companies disclose energy, water, emissions; assurance phased in | Covers listed operators and parents (Bharti, Adani, Reliance, Sify via US listing etc.) |
| **Carbon Credit Trading Scheme** | Compliance market: ~490 obligated entities in 7 industrial sectors; first CCC trading expected ~October 2026 | Data centres are *not* obligated entities; the offset mechanism and price signal matter |
| **Draft National Data Centre Policy** | Announced 2020; MeitY revived consultations (economic zones, single window, RE use) | No binding green thresholds yet |
| **State DC policies** | Karnataka 2026–31 (PUE/WUE reporting + incentives); UP 2026 (50% RE target for new DCs by 2030, green "booster" interest subsidy); others | States are leading on green conditions |
| **Draft Climate Finance Taxonomy** | DEA draft framework, May 2025 (comments to 25 June 2025); sectoral annexes pending | Inclusion of DCs with PUE/CFE criteria would unlock cheaper capital |

---

## 3. Design levers with quantified savings

The table below ranks levers for an Indian air-and-liquid hybrid facility. Savings are indicative ranges drawn from engineering practice and the series' prior reports. **These are estimates, not measured Indian fleet data.**

| Lever | Typical impact | Cost/complexity | India note |
|---|---|---|---|
| **Site selection** (climate, RE access, water, grid) | 0.05–0.15 PUE; large water and carbon effects | Low if early | Bengaluru's mild, elevated climate beats Chennai/Mumbai for free cooling; Hoskote park pairs Pavagada solar + 60 MLD treated water |
| Hot/cold-aisle containment | 10–20% cooling energy | Low | Table stakes |
| Raised supply air temperature (ASHRAE recommended 18–27 °C) | 2–4% chiller energy per °C | Low | Germany will require 27 °C inlet from 2028 |
| Free cooling / economisers, dry coolers | 0.05–0.15 PUE in Bengaluru | Medium | Many hours below 24 °C wet-bulb |
| Direct-to-chip liquid cooling (DLC) | Removes ~70–80% of heat with warm water (30–45 °C); enables PUE 1.1–1.2 | Medium-high | Essential for 50–130 kW AI racks |
| Immersion cooling | PUE ~1.03–1.1; no fans | High; ecosystem immature | Niche/edge |
| High-efficiency UPS / eco-mode | 2–4% of facility energy | Low-medium | Eco-mode at 99% efficiency vs ~94–96% double-conversion |
| Low-loss transformers, 415 V / higher-voltage distribution; 800 VDC for AI racks | 1–3% | Medium | 800 VDC is emerging with next-generation GPU racks |
| Lithium-ion UPS batteries | Smaller footprint, longer life | Medium | Fire-safety design essential |
| Server utilisation, virtualisation, consolidation | Can halve IT energy per workload | Low (software) | The biggest lever that PUE does not see |
| Efficient chips (ARM, accelerators), power capping | 10–30% per workload | Medium | Procurement criterion: SS 715-type standards |
| AI model efficiency (distillation, quantisation, batching) | Large; Google reports a 33× fall in median Gemini prompt energy over one year (self-reported, unverified) | Software | Demand-side efficiency matters most for AI |
| AI-driven cooling optimisation, DCIM, digital twins | 5–15% cooling energy | Low-medium | Quick win on existing Indian stock |
| Carbon-aware scheduling | Shifts flexible loads to solar hours | Low | India's solar-heavy midday supply favours daytime batch/training |
| Low-carbon materials (low-clinker concrete, recycled steel, hybrid timber) | Microsoft: hybrid mass timber cut embodied carbon an estimated **35% vs steel and 65% vs precast concrete**; Google cites up to 40% from low-carbon materials | Medium | Fly-ash/slag cements are abundant in India |
| Cool roofs, passive design | Small energy effect; reduces heat island | Low | Supports social licence |
| Treated wastewater (TTW) for cooling | Cuts freshwater to near zero | Medium (treatment plant) | Karnataka reimburses treated-water charges |

**Heat reuse: global examples and Indian possibilities.**
- **Microsoft–Fortum (Espoo/Kirkkonummi, Finland):** waste heat is expected to cover **about 40% of district-heating demand** (around 2 TWh/yr) for some 250,000 users in Espoo, Kauniainen and Kirkkonummi. CO₂ savings are expected at **about 400,000 t/yr**. The heat-pump plants are running on ambient air for now; data-centre heat is due "step by step" from about 2027. *These are projections, not achieved results.*
- **Meta Odense (Denmark):** the 2020 goal was 100,000 MWh/yr (6,900 homes); the expansion target was 165,000 MWh (11,000 homes); Ramboll, which designed the plant, cites 215,000 MWh and >12,000 homes.
- **Stockholm Data Parks:** roughly 30 data centres are connected to district heating/cooling (Space Daily). Stockholm Exergi CEO Anders Egelrud set the objective that "10% of Stockholm's heating needs will be provided by recovered data centre waste heat"; H&M's 1 MW Stockholm data centre can heat about 2,500 apartments.
- **India has no district heating**, so the reuse logic flips to *cooling and process heat*:
  - Warm-water DLC loops (45–60 °C) can drive **absorption or adsorption chillers** for offices or adjacent buildings.
  - Low-grade process heat can go to food processing, laundries, pharma, or **greenhouse/agri-drying**. The Hoskote and Mysuru industrial belts are plausible offtakers.
  - Desalination pre-heating is an option for coastal Mangaluru.
- Realistic Indian ERF in the near term is **2–10%**. The policy goal should be "heat-reuse ready" design (EU definition) plus zoning that co-locates offtakers.

**Backup power.**
- Diesel gensets are the default in India and a growing Scope 1 source; Google's Scope 1 rose 20% in 2025 partly from backup generator use.
- The pathway runs:
  1. **HVO** (hydrotreated vegetable oil) drop-in, subject to Indian supply and certification;
  2. **BESS** to ride through short outages and provide grid services, cutting genset run-hours;
  3. **Gas gensets or fuel cells** for longer outages;
  4. **Hydrogen fuel cells** (Microsoft has tested multi-MW hydrogen backup) once green hydrogen is available.

---

## 4. Renewable and carbon-free energy procurement

### 4.1 Procurement options in India

| Route | How it works | Typical landed cost (est.) | Pros | Cons |
|---|---|---|---|---|
| On-site rooftop solar | Behind-the-meter | ₹3–4/kWh | No OA charges | Meets <2–5% of a DC's load (density) |
| **Group captive** | Consumer holds ≥26% equity and consumes ≥51% | ₹5.5–7/kWh | Exempt from cross-subsidy and additional surcharges | Equity lock-in; state rules vary |
| **Third-party open access PPA** | Wheeled RE under state OA rules | ₹6.5–8/kWh | Flexible | Surcharges, banking limits, regulatory risk |
| **Green Energy Open Access (2022 Rules)** | ≥100 kW consumers; faster approvals, capped charges | Varies | National framework | Karnataka High Court struck down the state application; KERC issued new OA Regulations 2025 |
| **ISTS hybrid PPAs** | Inter-state solar-wind(-storage) | ₹5–6.5/kWh at bus + charges | Better hourly profile | Transmission waiver phase-down |
| **SECI RTC/FDRE auctions** | Firm, dispatchable RE (prior report: **₹5.25/kWh**) | ~₹5.25 + delivery | High CFE share | Mainly for discoms; replicable bilaterally |
| **State green tariffs** | Discom supplies RE at a premium | Tariff + premium | Simple | Additionality unclear |
| **RECs / I-RECs** | Unbundled certificates | ₹0.1–0.3/kWh | Cheap | Weakest claim; Microsoft has paused non-additional unbundled RECs |
| BESS / pumped storage | Firming | Adds ₹1.5–3/kWh to firmed supply | Lifts hourly CFE | Capex |
| **Nuclear** | Future PPAs | n/a in India today | 24/7 CFE | India's SHANTI Act (December 2025) opened private participation; ₹20,000 crore Nuclear Energy Mission targets ≥5 indigenous SMRs by 2033; draft rules August 2026 |

**Karnataka specifics:**
- KERC's **Open Access Regulations 2025** introduced monthly banking at **8% of banked energy in kind** and eight categories of consumer charges (transmission, wheeling, CSS, additional surcharge, banking, standby at 125% of energy charges, losses, scheduling).
- In October 2025 BESCOM petitioned for an **additional surcharge of ₹1.65/kWh** on all OA consumers, a material headwind. For comparison, green OA consumers had their additional surcharge halved to ₹0.70 in FY24.
- KERC's benchmark solar tariff is **₹3.07/kWh** for MW-scale plants (FY26).
- **Implication:** in Karnataka, *group captive* (which avoids CSS and additional surcharge) is the structurally cheaper route for data centres. Stand-alone OA economics can swing by more than ₹1.5/kWh on regulatory decisions.

### 4.2 Hourly matching and additionality

Annual 100% matching remains the hyperscaler norm (Google for the ninth year, Microsoft in FY25). Yet Google's hourly CFE stayed **~65% in 2025** (66% in 2024) despite **12 GW of new clean-energy contracts**, because its electricity use grew **37%**. In India, solar-heavy portfolios meet daytime load but leave nights on coal. Moving from 50% to 80% hourly CFE typically requires wind, storage or firm RTC/FDRE contracts. **Recommendation:** Indian buyers should contract on *hourly* profiles, report a 24/7 CFE score alongside REF, and prefer ISTS hybrid and FDRE products over solar-only.

### 4.3 Nuclear and gas

- Global hyperscalers are signing firm clean power deals: Microsoft–Constellation (Crane/Three Mile Island restart), Amazon–Talen and X-energy, and Google–Kairos (500 MW of SMRs, first corporate SMR PPA, ~2030–2035).
- In India, SHANTI makes private nuclear legally possible, with a **100 GW-by-2047** national target and BSMR-200/220 designs. Realistically, nuclear will not supply Indian data centres before the early-to-mid 2030s. It belongs in a long-dated procurement roadmap, not current green claims.
- **Gas as a bridge:** Stand.earth reports that Microsoft is pursuing dedicated gas plants in the US that would emit >15 Mt CO₂/yr, which it says are undisclosed in the 2026 report. That is a cautionary example. In India, gas backup is defensible; gas baseload is not "green".

### 4.4 Indian operator snapshot

| Operator | Green credentials (latest disclosed) | Assessment |
|---|---|---|
| **Nxtra by Airtel** | 49% RE in core DCs (FY25); 482,800 MWh RE contracted (3× FY21); PUE down 10% vs FY21; first Indian DC in RE100 (June 2024); 125.65 MW ISTS hybrid with AMPIN (205,167 MWh/yr); FY26 report targets 70% RE | Best-disclosed Indian operator; still annual matching |
| **AdaniConneX** | 1 GW platform; **US$875m sustainability-linked loan (up to US$1.44bn)** with KPIs on energy efficiency, RE adoption and safety (first SLL in Indian DC sector, ING-led); partner in Google Vizag | Strong financing signal; site PUE/CFE data limited |
| **Google–AdaniConneX–Nxtra, Vizag** | US$15bn (2026–30), ~1 GW across three campuses; ground broken 28 April 2026; new RE + storage by Adani | Reports conflict on whether power comes from new Andhra Pradesh generation or Khavda (Gujarat); the hourly-matching design is undisclosed |
| **Sify** | >231 MW RE contracted; AI racks up to 200 kW | Good procurement; limited PUE disclosure |
| **CtrlS** | Captive solar (Nagpur) for Mumbai; NTPC Green partnership | Procurement-led |
| **Yotta** | Green tariff via Hiranandani group utility TUCO (hydro, biogas) | Novel structure; additionality unclear |
| **Reliance–Meta, Jamnagar** | 168 MW AI DC announced June 2026, "supported by renewable energy" | Too early to assess |
| STT GDC India, NTT India, AWS/Microsoft India | RE PPAs announced in several states | *Site-level figures not re-verified this cycle* |

The leading Indian operators report **PUE ~1.4–1.5** (SBI sector report, April 2026: "industry leaders achieving PUE values below 1.5"). That is better than the global average but well short of Singapore's 1.25 or Germany's 1.2.

---

## 5. Global benchmarks and the AI problem

| Company | Efficiency | Clean energy | Emissions trend | Water / other |
|---|---|---|---|---|
| **Google** | Fleet PUE **1.09** (2025); 83% less overhead than the 1.54 industry average | ~65% hourly CFE; 12 GW new contracts; 100% annual match (9th year) | Ambition-based footprint **+18%** to ~14.5 Mt; Scope 3 **+25%**; DC construction ~2.3 Mt; electricity **+37%** | Target 24/7 CFE and 50% cut by 2030 |
| **Microsoft** | n/a fleet PUE | 40 GW contracted (19 GW online); 100% annual match | FY25 **20.29 Mt** vs 12.88 Mt FY20 (+~58% market-based; Stand.earth estimates ~80% gross); +25% YoY; Scope 2 now 13% of total after dropping unbundled RECs | Owned-DC WUE **0.27 L/kWh**; zero-water-for-cooling design (from August 2024) avoids **>125 million L/yr per DC**; mass-timber DCs |
| Meta, AWS, Equinix, Digital Realty, NTT, Iron Mountain, Apple | 100% annual RE matching widely claimed; AWS "water positive by 2030"; Iron Mountain an early 24/7 CFE adopter | — | Mostly rising absolute emissions with AI | *Figures not re-verified this cycle* |

**Exemplars for cold climates** (Verne Global Iceland, EcoDataCenter Sweden, Green Mountain Norway) run on hydro/geothermal at PUE ~1.1–1.2 with heat reuse. **They are not replicable in India.** Singapore's Jurong Island cohort is the relevant model: liquid cooling, low-carbon molecules and imported power, with PUE 1.25 in the tropics.

**What this means:** efficiency gains (PUE 1.09) and record clean-energy buying have not stopped absolute emissions rising, because AI load growth and hardware/construction Scope 3 dominate. Any Indian green standard focused only on PUE and annual RE will miss the main driver: lifecycle carbon of fast-growing IT fleets.

---

## 6. Economics of going green: a 20 MW Bengaluru colocation worked example

### 6.1 Assumptions (flagged estimates)

| Parameter | Baseline | Green design | Source/basis |
|---|---|---|---|
| IT capacity | 20 MW | 20 MW | — |
| Average IT utilisation | 70% → 14 MW avg | Same | Estimate |
| Annual IT energy | 14 × 8,760 = **122.64 GWh** | Same | Calc |
| PUE | 1.50 | 1.25 | Indian average vs green target |
| Facility energy | **183.96 GWh** | **153.30 GWh** | Calc |
| Power source | 100% grid | 80% RTC RE (group captive/OA), 20% grid | — |
| Grid all-in tariff | ₹8.0/kWh | ₹8.0/kWh | Estimate for HT commercial incl. demand charges and duty |
| RE landed cost | — | ₹7.25/kWh (central); range ₹6.5–8.5 | SECI RTC ₹5.25 + OA charges/banking (estimate) |
| Grid emission factor | 0.710 tCO₂/MWh | 0.710 | CEA (prior report) |
| Cooling / WUE | Evaporative towers, 1.8 L/kWh freshwater | Dry coolers + DLC-ready, TTW adiabatic trim; 0.2 L/kWh freshwater | Estimate |
| Base capex | ₹56 crore/MW → **₹1,120 crore** | + green premium | Prior unit-economics report |
| Green capex premium | — | **₹60 crore (~5.4%)** | Estimate: efficient chillers/dry coolers, containment, eco-mode UPS, TTW plant, DCIM/digital twin, IGBC, low-carbon concrete, rooftop PV |

### 6.2 Results

**Energy saved by PUE:** 183.96 – 153.30 = **30.66 GWh/yr** → × ₹8.0 = **₹24.5 crore/yr**.

**RE procurement effect:** 80% × 153.30 = 122.64 GWh of RE. At ₹0.75/kWh below grid, that saves **₹9.2 crore/yr**. *Contested:* if BESCOM's ₹1.65/kWh additional surcharge applies to third-party OA, the RE could cost ₹0.5/kWh *more* than grid (–₹6.1 crore/yr). Group captive structures avoid most of this.

**Water:** baseline 1.8 × 122.64 GWh = **220.8 million L/yr (~605 kL/day)**; green 0.2 × 122.64 = **24.5 million L/yr (~67 kL/day)**. Saving **~196 million L/yr** ≈ ₹1.8 crore at an assumed ₹90/kL. For scale, Karnataka's IT department, in an estimate "based on informal inputs from operators", puts the state's 32 data centres at roughly 4,000 kL/day (The News Minute), so this one baseline facility alone would be ~15% of that; a competing estimate from WELL Labs hydrologist Shashank Palur puts Bengaluru data centres at ~20 million litres/day.

**CO₂:**
- Baseline: 183.96 GWh × 0.710 = **130,600 t/yr**.
- Green: 153.30 × 20% × 0.710 = **21,800 t/yr**.
- Reduction **~108,800 t/yr (–83%)**: 21,800 t from efficiency and 87,100 t from RE.
- At Karnataka's ~0.5 factor, the reduction is ~76,700 t/yr.

**Unit cost (links to the LCOD in the prior report):**
- Energy cost per IT-kWh: baseline 1.5 × ₹8.0 = ₹12.0; green 1.25 × (0.8 × 7.25 + 0.2 × 8.0) = **₹9.25**.
- Saving **₹2.75/IT-kWh**, about **9% of the ~₹29.7/IT-kWh LCOD**. This is a material competitive edge in a price-sensitive colo market.

**Simple payback:** ₹60 crore ÷ (₹24.5 + ₹1.8) crore ≈ **2.3 years** on efficiency and water alone (excluding the RE effect).

### 6.3 Marginal abatement cost (MAC)

Annualised capex: ₹60 crore × CRF (10%, 15 yrs = 0.1315) = **₹7.9 crore/yr**.

MAC = (annualised capex + Δopex) ÷ tCO₂ abated

| Package | Net annual cost (₹ crore) | tCO₂ abated/yr | MAC (₹/tCO₂) |
|---|---|---|---|
| Efficiency + water (PUE 1.5→1.25, dry/TTW) | 7.9 – 24.5 – 1.8 = **–18.4** | 21,800 | **≈ –₹8,450** |
| RE at ₹0.75/kWh discount | –9.2 | 87,100 | **≈ –₹1,060** |
| RE at ₹0.50/kWh premium (adverse OA case) | +6.1 | 87,100 | **≈ +₹700** |
| **Full package (central case)** | **–27.6** | **108,800** | **≈ –₹2,540** |

**Interpretation:**
- Efficiency is a no-regret investment worth doing at any carbon price.
- RE abatement costs between –₹1,060 and +₹700/t, below or within the ₹250–1,500/t range early estimates suggest for CCTS credits (Saur Energy), around Climate Risk Horizons' estimated initial price of about ₹955/t, and far below EU ETS levels (around €84/t).
- **The carbon price is not the binding constraint in India; open-access regulation is.**

**Karnataka incentive kicker:** the ₹20 crore PUE incentive applies only to PUE **1.00–1.20**, sustained for three years and paid in year four. A design at 1.25 *misses* it. Pushing to 1.20 saves another ~6.1 GWh (≈₹4.9 crore/yr) and captures ₹20 crore, so **design to 1.20**. The WUE incentive (100% of water charges up to ₹30 lakh/yr for two years) needs WUE of 0.7–1.3 L/kWh. Our green case at 0.2 is better than that band, so check eligibility wording in the operational guidelines. Treated-water reimbursement is up to ₹8 lakh/yr for five years.

### 6.4 Green finance and valuation

- **Sustainability-linked loans:** AdaniConneX's US$875m SLL (expandable to US$1.44bn; eight international lenders) ties margins to energy efficiency, RE adoption and safety KPIs. Typical SLL margin step-downs of 5–15 bps on ₹800 crore of debt are worth ₹0.4–1.2 crore/yr. That is modest, but access to international lenders matters more than the discount.
- **Green bonds:** the draft climate finance taxonomy could make data centres eligible if PUE/CFE thresholds are written into a sectoral annex. Without that, Indian DC green bonds rely on international frameworks (ICMA, Climate Bonds).
- **Valuation:** hyperscaler RFPs increasingly require PUE, CFE and WUE commitments. Singapore and the EU are making ratings visible to buyers and procurement, so green performance is becoming a *pre-qualification*, not a premium. Treat the capex premium as the cost of staying in the market.

---

## 7. India and Karnataka

### 7.1 Landscape

- **Capacity:** CBRE's India Alternate Sectors Outlook 2026 says capacity "surpassed 1,700 MW in 2025, driven by a record 440 MW of new supply", with ~500 MW of new supply expected in 2026 (+30%). Karnataka has 32 data centres and targets **1 GW cumulative IT load by 2031** and a 10–12% share of India's AI-ready capacity.
- **Efficiency:** leaders report PUE ~1.4–1.5; the wider fleet is likely higher. **There is no public national dataset; this is a key data gap.**
- **Certified stock:** IGBC lists a small number of rated data centres. The first Platinum was ICICI Bank Hyderabad, and early certified projects include TCS, Wipro, HCL, HSBC and Netmagic. Operational certifications remain rare.

### 7.2 Challenges

1. **Hot-humid coastal hubs** (Mumbai, Chennai) limit free cooling. Bengaluru and the Deccan plateau are advantaged.
2. **Coal-heavy grid** (0.710 tCO₂/MWh): every unit of PUE overhead is carbon-intensive.
3. **Open-access friction:** surcharges, banking limits, the High Court annulment of Karnataka's GEOA application, and pending additional surcharge petitions.
4. **Water stress:** Bengaluru data centres sit largely in water-stressed areas, and until recently neither BWSSB nor KSPCB tracked their water use separately.
5. **Diesel dependence** for backup.
6. **E-waste:** the E-Waste (Management) Rules 2022 impose EPR, but server refurbishment and secondary markets are thin.

### 7.3 Opportunities

- **RE abundance:** Karnataka has one of India's highest RE shares, including Pavagada solar and strong wind, plus very low solar costs (KERC benchmark ₹3.07/kWh).
- **Hoskote park:** a ~500 MW concept with Pavagada solar and **60 MLD secondary-treated water**. It is a ready-made "green zone" if tertiary treatment and dual-grid supply are delivered.
- **Karnataka Sustainable Data Centre Policy 2026–31** (approved September 2026; ₹1,300.45 crore outlay):
  - Mandatory plant-wise **PUE and WUE reporting**.
  - **₹20 crore** one-time PUE incentive for PUE 1.00–1.20 sustained for three years.
  - WUE incentive of up to ₹30 lakh/yr for two years at WUE 0.7–1.3 L/kWh.
  - 100% treated-water reimbursement up to ₹8 lakh/yr for five years.
  - Data Centre Resource Heat Mapping of water and power.
  - Sustainable DC zones and parks (Hoskote, Mangaluru, Mysuru; ~1,000 MW combined).
  - RE incentives and wheeling-charge reimbursement.
  - A Centre of Excellence with R&D support up to 50% (capped at ₹15 crore).
  - Customised packages for >₹3,000 crore projects, including subsea data centres and DC-linked desalination.
- **Assessment:** this is India's most advanced state green-DC framework, but it has gaps:
  - No *binding* PUE ceiling.
  - No carbon/CFE metric.
  - The WUE band (0.7–1.3) is lax by EU standards (where 1.0 is grade G), so it rewards mediocre performance.
  - No embodied-carbon, e-waste or diesel provisions.
- **National:** the draft National Data Centre Policy, the Green Credit Programme (mostly afforestation/water credits; marginal for DCs), CCTS (DCs not covered) and the draft taxonomy are all pending or peripheral. **States are setting the de facto standard.**

---

## 8. Green Data Centre maturity model (India-calibrated)

| Dimension | L1: Basic | L2: Managed | L3: Efficient | L4: Leading | L5: Regenerative |
|---|---|---|---|---|---|
| **Energy (annual PUE, measured)** | >1.7 or unmeasured | 1.5–1.7 | 1.35–1.5 | 1.2–1.35 | ≤1.20 (air) / ≤1.15 (liquid) |
| **Carbon (hourly CFE / CUE)** | Grid only; CUE >1.0 | Annual RECs; REF <50% | REF 50–80% via PPAs | ≥70% hourly CFE; CUE ≤0.3 | ≥90% hourly CFE, additional; location-based disclosed |
| **Water (freshwater WUE, L/kWh)** | >2.0 or unmeasured | 1.3–2.0 | 0.7–1.3 | 0.2–0.7; TTW | <0.2; zero freshwater for cooling; basin replenishment |
| **Materials (embodied)** | No LCA | LCA done | 10–20% below baseline | 30–40% below; EPDs required | >40% below; hybrid timber; low-clinker |
| **Circularity** | Ad hoc disposal | Authorised e-waste recycler | ≥50% assets reused/refurbished | ≥90% reuse/recycle; extended lifecycles | Closed-loop component recovery; supplier take-back |
| **Heat** | Rejected | Assessed | Heat-reuse ready (EU definition) | ERF 2–10% (absorption cooling/process heat) | ERF >10% with contracted offtaker |
| **Backup** | Diesel, unmonitored | Diesel run-hours tracked | HVO-ready, BESS for short events | BESS + HVO; diesel <20 h/yr | Fuel cells/zero-emission backup |
| **Transparency** | None | Annual report (BRSR) | Site-level PUE/WUE published | Third-party assured PUE/WUE/CFE; Scope 3 | Real-time public dashboards; hourly CFE |

**Where Indian leaders sit today:** mostly **L2–L3** (PUE ~1.4–1.5, ~50% annual RE, limited site disclosure). Google's global fleet sits at **L4–L5 on energy and L4 on carbon**. Singapore's DC-CFA2 conditions roughly equal **L4**.

### 8.1 Blueprint: 20 MW Bengaluru colo ("L4 by design")

- **Site:** Hoskote park or an equivalent plug-and-play zone, chosen for dual-grid supply, TTW and Pavagada RE.
- **Cooling:** air-cooled halls with hot-aisle containment at 24–27 °C supply. Chillers with dry coolers and economiser; no open towers. Two DLC-ready halls (rear-door/CDU capable) for 40–80 kW racks.
- **Power:** eco-mode UPS, Li-ion, low-loss transformers; BESS of ~10 MWh for peak-shaving and outage ride-through.
- **Energy:** 80% hourly-profile RE via group captive (wind-solar hybrid plus storage), rooftop PV, and a target hourly CFE score reported.
- **Water:** TTW for all non-potable use; freshwater WUE ≤0.2.
- **Targets:** design PUE ≤1.20 (captures the ₹20 crore incentive); IGBC Platinum *operational*; ISO 50001/14001/14064.
- **Materials:** fly-ash/slag concrete; EPD-backed steel; 30% embodied-carbon reduction target.
- **Backup:** HVO-ready gensets; contractual diesel run-hour cap.
- **Disclosure:** quarterly site PUE/WUE/CFE to tenants and KITS.

### 8.2 Blueprint: 100 MW Bengaluru-region AI campus ("L4–L5")

- **Load:** 100 MW IT at ~80% utilisation = **700.8 GWh/yr IT**. At PUE 1.18 that is **~827 GWh/yr** of facility energy, about 587,000 tCO₂/yr if grid-supplied at 0.710, which is why procurement is the design.
- **Cooling:** ≥75% of heat to DLC warm-water loops (inlet 30–40 °C), dry coolers for the rest; WUE <0.1 freshwater (Microsoft-style closed-loop, zero-water-for-cooling).
- **Power architecture:** medium-voltage to the rack; 800 VDC readiness for next-generation GPU racks; grid-forming BESS (≥200 MWh) providing frequency services.
- **Energy:** a ≥600 MW hybrid portfolio (wind-solar-storage via ISTS and group captive), FDRE contracts and pumped-storage capacity rights. Target **≥80% hourly CFE by year three** and a nuclear option reserved for the 2030s under SHANTI.
- **Heat:** 45–60 °C return loops feeding absorption chillers for campus offices and an adjacent agri-processing or greenhouse cluster (target ERF 5%+).
- **Workload:** carbon-aware scheduling of training jobs to solar/wind-rich hours; power capping; model-efficiency KPIs (energy per inference).
- **Lifecycle:** hardware PCF requirements in GPU/server procurement; refurbishment/resale programme; e-waste EPR compliance.
- **Indicative capex:** ₹72.5 crore/MW (prior report) × 100 = ₹7,250 crore, with the green premium largely embedded because DLC is mandatory for AI densities anyway. *Estimate.*

---

## 9. Policy recommendations

### 9.1 For Government of India (MeitY, MoP, BEE, MoEFCC, DEA)

1. **Mandatory disclosure:** all DCs ≥500 kW IT report annual PUE, WUE, REF, *hourly CFE*, location- and market-based emissions, and refrigerant and diesel use to a national registry. This is a BEE-administered EU-style database, phased in from FY2027-28.
2. **Minimum performance standards (phased):** new DCs at PUE ≤1.35 from 2027 and ≤1.25 from 2030 (≤1.20 for liquid-cooled AI halls); existing DCs ≤1.6 by 2030. Use a climate-zone adjustment rather than a single number.
3. **Public procurement:** extend MeitY's PUE <1.35 tender rule to all NIC/government cloud and colocation contracts, adding WUE and ≥50% CFE criteria.
4. **Taxonomy inclusion:** add a data-centre annex to the Climate Finance Taxonomy. Eligibility should require PUE ≤1.3, ≥70% hourly CFE and freshwater WUE ≤0.4, with a transition category for retrofits.
5. **Open-access reform:** a national "digital infrastructure green OA" window with capped additional surcharge for hourly-matched RE, standardised banking, and FDRE access for large consumers.
6. **Diesel phase-down:** emissions norms plus run-hour reporting for DC gensets; tax parity for HVO; BESS-for-backup recognised in reliability codes.
7. **E-waste circularity:** EPR credits for certified server refurbishment and reuse; data-sanitisation standards that permit reuse rather than shredding.
8. **Nuclear readiness:** under SHANTI rules, allow long-term nuclear PPAs and co-location for data-centre clusters, with clear AERB siting rules.

### 9.2 For Government of Karnataka (DEIT/KITS, KERC, BESCOM, BWSSB)

1. **Convert reporting into thresholds:** a binding PUE ≤1.35 for new DCs in sustainable DC zones from 2028.
2. **Fix the WUE incentive band:** reward ≤0.4 L/kWh freshwater, not 0.7–1.3.
3. **Add a CFE incentive:** pay for hourly-matched RE, not annual REC matching.
4. **KERC:** exempt hourly-matched, additional RE for DCs in notified zones from the proposed additional surcharge, or cap it at ₹0.70. Approve a **"24/7 green tariff"** product from BESCOM backed by FDRE/storage contracts.
5. **Heat-reuse zoning:** co-locate DC parks with agri-processing, cold chain and pharma clusters; require "heat-reuse ready" design.
6. **Water:** make TTW use the default in Hoskote; publish the Resource Heat Map; meter all DC borewells.
7. **Publish** site-level PUE/WUE annually, as the EU now does.

### 9.3 For operators

1. **Design to PUE 1.20** in Bengaluru (and to 1.25–1.30 in coastal hubs with liquid cooling).
2. **Contract for hourly CFE** with hybrid plus storage; report the 24/7 score; stop relying on unbundled RECs.
3. **Eliminate freshwater cooling** via dry coolers, DLC and TTW.
4. **Embed lifecycle carbon:** EPDs, low-clinker concrete, hardware PCFs.
5. **Publish site-level metrics** with third-party assurance under BRSR Core.
6. **Use SLLs** tied to PUE, CFE and WUE KPIs to tap international lenders.
7. **Plan a backup transition** (HVO → BESS → fuel cells).

---

## 10. Caveats

- **Greenwashing risks:** unbundled RECs, annual matching and avoidance offsets can make a coal-powered site appear "100% renewable". Hyperscalers themselves show the gap: Google's location-based Scope 2 is reported at ~15 Mt (secondary source) versus far lower market-based figures. Treat any claim without hourly and location-based data as unverified.
- **Rebound (Jevons paradox):** efficiency lowers cost per computation and expands demand. Google's per-prompt energy fell sharply, yet its electricity use rose 37% and total emissions 18%. A green data centre cannot by itself offset unbounded AI demand growth. Policy must also address demand (efficiency standards for models and IT).
- **PUE limits:** PUE rewards inefficient IT (higher IT load lowers PUE) and penalises good practices such as raising temperatures, which shifts load to server fans. Pair it with utilisation (ITEUsv) and energy-per-workload metrics.
- **Water–energy trade-off:** dry coolers cut water but can raise PUE in hot hours. The Bengaluru climate makes the trade-off favourable; Chennai and Mumbai less so.
- **Data gaps:** there is no public national dataset of Indian DC PUE, WUE or CFE. Karnataka's water figure (roughly 4,000 kL/day, per the IT department via The News Minute) is an informal operator estimate, and WELL Labs' ~20 million litres/day estimate for Bengaluru data centres is about five times higher. Operator figures (e.g. Nxtra's 49% RE) are self-reported and use annual matching.
- **Estimates and contested figures:**
  - The 20 MW worked example uses assumed tariffs (₹8.0 grid, ₹7.25 RE landed), utilisation (70%), WUE values and a capex premium (₹60 crore). Results are sensitive to KERC's surcharge decisions.
  - CCTS prices are projections (₹250–1,500/t in early estimates cited by Saur Energy; about ₹955/t initially per Climate Risk Horizons) because trading had not begun at the time of writing.
  - Heat-reuse figures for Espoo are projections.
  - Reports conflict on the Google–Vizag RE source.
  - Germany's existing-site PUE thresholds may be relaxed (draft amendment).
  - The EU rating regulation is still in its scrutiny period.
- **Items not re-verified in this research cycle:** US state rules, Netherlands/Ireland/Japan specifics, Andhra Pradesh's reported RE condition for data centres, TRAI recommendation details, and individual figures for Meta, AWS, Equinix, Digital Realty, NTT, Iron Mountain and Apple. Treat these as background, not citations.

## Sources

1. <https://thefifthestate.com.au/columns/spinifex/australias-data-centre-boom-has-a-concrete-problem>
2. <https://www.esgtoday.com/microsofts-carbon-footprint-jumps-25-as-ai-buildout-challenges-climate-goals/>
3. <https://www.freshfields.com/en/our-thinking/blogs/sustainability/from-reporting-to-rating-the-eus-next-steps-for-data-centres-102o345>
4. <https://energy.ec.europa.eu/news/commission-adopts-eu-wide-scheme-rating-sustainability-data-centres-2024-03-15_en>
5. <https://energy.ec.europa.eu/document/download/8a87a5fe-0260-462a-b165-09f1496d1aa0_en?filename=COM_2026_500_1_EN_ACT_part1_v4.pdf>
6. <https://www.ashurstperkinscoie.com/en/insights/data-centres-the-draft-royal-decree-redefining-grid-access-rules-and-energy-consumption/>
7. <https://www.europarl.europa.eu/cmsdata/235215/20210531-CNDCP-Data%20Centre.pdf>
8. <https://www.eudca.org/climate-neutral-data-centre-pact>
9. <https://www.climateneutraldatacentre.net/working-groups/>
10. <https://www.moduledge.com/blog/eu-data-center-regulations-2026>
11. <https://www.velasolaris.com/en/data-center-heat-reuse/>
12. <https://mgrid.org/2025/11/07/germany-enefg-pue-1-2-waste-heat-data-centers-july-2026/>
13. <https://www.gleisslutz.com/en/know-how/data-centre-update-draft-bill-amend-energy-efficiency-act>
14. <https://www.whitecase.com/insight-alert/data-center-requirements-under-new-german-energy-efficiency-act>
15. <https://dc-intelligence.com/dci-en/certificate/energieeffiezienzgesetz-enefg/>
16. <https://www.akcp.com/2026/07/23/singapore-data-center-pue-roadmap/>
17. <https://techdirectory.sg/categories/data-centres>
18. <https://www.goodrichglobal.com/singapore/article/green-data-centres-singapore-fit-out/>
19. <https://www.lexology.com/library/detail.aspx?g=7db950fc-6d39-4ce7-8468-4d9ba32ed780>
20. <https://techdirectory.sg/insights/singapore-dc-cfa2-jurong-island-2026>
21. <https://www.clearlytech.co/p/singapores-audacious-bet-on-sustainable>
22. <https://www.rystadenergy.com/news/chinas-data-center-capacity-doubling-of-power>
23. <https://www.actgroup.com/latest/blogs/china-s-gec-update-what-it-means-for-data-centers>
24. <https://www.china-briefing.com/news/china-data-centers-new-cross-regional-plan-to-boost-computing-power-across-regions/>
25. <https://en.wikipedia.org/wiki/Green_data_center>
26. <https://bwcio.com/article/icici-bank-data-center-becomes-india%E2%80%99s-first-cii-igbc-platinum-rated-data-center-116592>
27. <https://sbi.bank.in/documents/57189647/58231607/Sector+Report+DataCentre.pdf/f1919592-ee66-b50b-ea20-75fbb27c9bb5?t=1779885206866>
28. <https://www.impriindia.com/insights/policy-update/carbon-credit-trading-scheme-ccts-2/>
29. <https://www.orennow.com/blog/carbon-credits>
30. <https://www.saurenergy.com/solar-energy-news/indias-carbon-market-edges-toward-its-first-trade-12482615>
31. <https://www.bwlegalworld.com/article/meity-resumes-national-data-centre-policy-talks-experts-seek-global-alignment-567223>
32. <https://www.impriindia.com/insights/policy-update/uttar-pradesh-data-centre-policy-2026-powering-indias-ai-ready-digital-backbone/>
33. <https://www.esgtoday.com/india-releases-draft-climate-finance-taxonomy-to-drive-capital-to-net-zero-goals/>
34. <https://cetex.org/publications/seven-lessons-for-indias-climate-finance-taxonomy/>
35. <https://aiinsightsnews.net/how-does-ai-affect-the-environment>
36. <https://www.computerweekly.com/news/366614995/Microsoft-trials-building-wooden-datacentres-in-pursuit-of-2030-carbon-negative-goal>
37. <https://www.datacenterdynamics.com/en/news/google-data-center-power-use-up-27-emissions-down-17-report/>
38. <https://www.newslaundry.com/amp/story/2026%2F10%2F01%2Fkarnatakas-new-data-centre-policy-puts-water-energy-in-focus-what-does-it-say>
39. <https://www.pv-magazine.com/2026/05/07/large-scale-heat-pumps-utilize-excess-heat-from-microsoft-data-centers-in-finland/>
40. <https://www.fortum.com/data-centres-helsinki-region/construction-fortums-heat-pump-plant-has-started-microsofts-data-centre-site-kirkkonummi>
41. <https://energyandclimateindex.com/en/microsoft-data-centers-to-heat-250000-users-in-finland-fortum-invests-e225-million/>
42. <https://tech.facebook.com/engineering/2020/07/odense-data-center-2/>
43. <https://www.ramboll.com/en-us/projects/energy/meta-surplus-heat-to-district-heating>
44. <https://datacenters.atmeta.com/2020/10/we-are-expanding-facebooks-odense-data-center/>
45. <https://www.esgdive.com/news/googles-emissions-continue-to-climb-due-to-ai-buildout/824373/>
46. <https://www.energetica-india.net/news/karnataka-unveils-new-open-access-regulations-2025>
47. <https://www.saurenergy.com/solar-energy-news/consumers-in-karnataka-to-pay-8-charges-for-open-access-kerc>
48. <https://vantedgeplus.com/perspectives/details-of-ipps-under-green-energy-open-access-in-karnataka/>
49. <https://www.datacenterdynamics.com/en/news/microsoft-reports-25-percent-increase-in-co2-emissions-on-back-on-data-center-growth/>
50. <https://kalaarideeptech.substack.com/p/nuclear-goes-private-indias-shanti-efb>
51. <https://www.impriindia.com/insights/policy-update/shanti-act-2025-indias-nuclear-needs-and-right-to-life/>
52. <https://organiser.org/2026/08/23/375706/bharat/shanti-act-when-nuclear-power-transforms-as-national-power/>
53. <https://www.indiandefensenews.in/2026/08/india-modernises-nuclear-sector-with.html>
54. <https://www.novergysolar.com/karnataka-announces-open-access-regulations-2025-a-new-dawn-for-renewable-energy/>
55. <https://solarquarter.com/2025/10/14/bescom-seeks-kerc-approval-to-levy-%E2%82%B91-65-per-unit-additional-surcharge-on-open-access-consumers-in-karnataka/>
56. <https://www.mercomindia.com/karnataka-sets-benchmark-tariff-of-%E2%82%B93-07-kwh-for-mw-scale-solar-projects>
57. <https://theplanetbrief.com/esg/google-2025-environmental-report/>
58. <https://windowsforum.com/threads/microsoft-2026-sustainability-report-100-renewables-emissions-up-25.436362/>
59. <https://www.world-nuclear-news.org/articles/lok-sabha-passes-shanti-bill>
60. <https://stand.earth/press-releases/microsofts-sustainability-report-discloses-80-emissions-increase-since-2020-reveals-energy-demand-rivaling-denmark-leaves-out-massive-new-fossil-gas-buildout-that-will-double-companys-pol/>
61. <https://assets.airtel.in/nxtra/pdf/Financial-Documents/Nxtra_SR_FY_2025_26.pdf>
62. <https://www.airtel.in/press-release/08-2025/nxtra-by-sirtel-releases-sustainability-report-for-fy2024-25>
63. <https://www.airtel.in/press-release/07-2025/nxtra-by-airtel-augments-green-energy-resources-signs-partnership-with-ampin-energy-transition-for-additional-205167-mwh-supply-from-ists-solar-wind-hybrid-projects/>
64. <https://www.ingwb.com/en/insights/news/apac/india/ing-newsroom/ing-leads-groundbreaking-usd-875-million-sustainability-linked-financing-for-adaniconnex-data-centres-in-india-with-an-accordion-feature-to-extend-commitment-up-to-usd-1.44-billion>
65. <https://www.mercomindia.com/adaniconnex-green-financing-data-centers>
66. <https://www.newsweek.com/india-ai-hub-adani-google-visakhapatnam-10930845>
67. <https://www.googlecloudpresscorner.com/2026-04-28-Google-Breaks-Ground-on-India-AI-Hub,-Launching-a-National-Industrial-Ecosystem-Alongside-Indias-Digital-Infrastructure-Milestone>
68. <https://startupfeed.in/google-breaks-ground-vizag-ai-hub-adani-airtel-15-billion/>
69. <https://www.blackridgeresearch.com/blog/list-of-top-ten-largest-data-center-companies-in-india>
70. <https://india.entrepreneur.com/technology/how-data-center-companies-are-gearing-up-to-meet-energy/503228>
71. <https://dmc-education.com/2026/08/27/india-data-centre-projects-2026-top-10-upcoming-under-construction-data-centres/>
72. <https://datacenters.google/efficiency/>
73. <https://blogs.microsoft.com/on-the-issues/2026/07/09/responsibly-building-the-ai-future/>
74. <https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/msc/documents/presentations/CSR/2026-Microsoft-Environmental-Data-Fact-Sheet-PDF.pdf>
75. <https://www.microsoft.com/en-us/microsoft-cloud/blog/2024/12/09/sustainable-by-design-next-generation-datacenters-consume-zero-water-for-cooling/>
76. <https://www.newslaundry.com/2026/10/01/karnatakas-new-data-centre-policy-puts-water-energy-in-focus-what-does-it-say>
77. <https://www.blackridgeresearch.com/news-releases/adaniconnex-sets-construction-financing-framework-of-usd-1-billion-for-data-center-projects>
78. <https://energy.ec.europa.eu/news/rating-scheme-data-centres-eu-commission-launches-call-feedback-2026-03-27_en>
79. <https://datacenters.lbl.gov/sites/default/files/IGBC%20and%20LBNL%20-%20DC%20Initiative_24%20July_SRD.pdf>
80. <https://www.deccanherald.com/india/karnataka/karnataka-targets-1gw-data-centre-capacity-rs-1300-crore-policy-outlay-4151500>
81. <https://www.wionews.com/india-news/karnataka-unveils-sustainable-data-centre-policy-for-efficient-water-power-use-1789985097703>
