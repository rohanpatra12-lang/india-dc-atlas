<!-- Report 15 of the research series, October 2026. The atlas standards register is authoritative where values differ. -->

# India's Next Data Centres: Design, Site and Policy Recommendations (October 2026)

India should build its next wave of data centres in places where power, water and connectivity have been planned together. Grid capacity and water should be allocated against verified performance: hourly clean power, low freshwater use and grid flexibility. Today's patchwork of state capex subsidies should give way to one notified national framework. Without that change, the roughly 26 GW of new demand the Central Electricity Authority projects will land on the grid and aquifers that are already most stressed.

## TL;DR

- **Where to build:** Put latency-sensitive cloud and colocation near demand and cable landings (Mumbai/Navi Mumbai, Chennai, Hyderabad, NCR, Pune). In those hubs, use zero-freshwater cooling and treated sewage water only. Send large AI training campuses (100 MW–1 GW+) to RE-rich, water-secure, low-hazard inland or desalination-backed coastal sites: Vizag, Jamnagar/Gujarat, Andhra Pradesh and Karnataka corridors outside Bengaluru, and Rajasthan/Telangana interiors. Design every new hall for direct-to-chip liquid cooling and 200 kW-plus racks.
- **What to design to (estimated recommendations):** annualised PUE ≤1.20–1.25 for AI and hyperscale, ≤1.30–1.35 for colocation in hot-humid climates; site WUE ≤0.2 L/kWh with zero groundwater in over-exploited blocks; ≥70–80% hourly-matched clean power by 2030; and grid-interactive BESS. Grid water dominates the total water footprint: MoEFCC norms let coal plants use 3.0–3.5 L/kWh, and a CSE survey found half of freshwater-based plants out of compliance. Clean power is therefore also the biggest water lever.
- **What policy must do:** Notify a national data centre policy with mandatory, third-party-assured disclosure of PUE, WUE (withdrawal and consumption), CUE, hourly clean power and peak-day water. Add WUE and hourly-RE criteria to IndiaAI and other MeitY tenders. Create a CEA/SERC large-load connection regime with flexibility obligations and cost-causation tariffs, modelled on Ireland's CRU decision and Texas SB 6. Enforce a statutory water hierarchy of treated wastewater, then desalination, then surface water, with no fresh groundwater in over-exploited units. Replace open-ended capex subsidies with outcome-based, sunset-clause incentives benchmarked across states.

## Key Findings

1. **There is still no national policy in force.** MeitY's Draft Data Centre Policy 2020 was never notified. MeitY reopened consultations in August 2025. Computer Weekly, citing The Economic Times, reported a plan to replace "more than 30 permissions" with a single window and to create four Data Centre Economic Zones, because Mumbai, Chennai and Delhi-NCR hold "nearly 80%" of capacity. CBRE's October 2026 report puts their share higher, at "more than 80% of operational capacity". [Reported] The Union Budget 2026–27 added a tax holiday to 2047 for foreign companies selling global cloud services from MeitY-notified "specified data centres" owned by Indian companies, plus a 15% safe-harbour margin (PIB). [Reported] As of mid-2026, secondary trackers reported that the specified-data-centre scheme itself had not been issued. [Reported, secondary]
2. **Grid demand is the binding constraint.** The Ministry of Power told the Rajya Sabha that, as of 14 May 2026, CEA projects 26.3 GW of additional data-centre demand by 2031–32 across 11 states. About 17 GW of that has already filed for connectivity with State Transmission Utilities and 9.3 GW has not (Telborg briefing citing PIB, August 2026). [Reported, via secondary briefing] That is many times today's operational base of nearly 1.8 GW (Cushman &amp; Wakefield H1 2026). CBRE puts the base at ~1.75 GW, and MeitY told the Rajya Sabha about 1,575 MW. CEA's draft Technical Standards for Connectivity to the Grid Regulations, 2026 cover bulk consumers at 33 kV and above. They would impose ride-through and reactive-power duties on inverter-interfaced bulk consumers of 50 MW or more. [Reported] They do not yet impose flexibility or cost-allocation obligations specific to data centres.
3. **The seismic baseline moved and then moved back.** BIS published IS 1893:2025 in November 2025. It created a new Zone VI across the Himalayan arc (zone factor 0.75 per a 2026 comparative study) and placed 61% of land in moderate-to-high hazard. BIS then withdrew it by a 3 March 2026 gazette notification and reverted to the 2016 code, after MoHUA objected over consultation and cost increases of 10–15%. [Reported] Designers face regulatory uncertainty, so the prudent course is to design critical facilities to the more conservative 2025 hazard values even where the 2016 code governs legally.
4. **ISTS-waiver economics for clean power are now graded, not free.** For projects commissioned after June 2025, 25% of ISTS charges applied in the first year, stepping up toward full charges by 2028. The Ministry of Power extended a 100% waiver for co-located BESS commissioned by June 2028 and for pumped storage awarded by June 2028 (Mercom, JMK). Later orders offered graded 75/50/25% waivers for projects with firm PPAs as on 31 March 2026, plus relief for transmission-delayed projects (Saur Energy). [Reported] Interstate RE now costs an estimated ₹1–2/kWh more for transmission than it did under the waiver (JMK estimate). [Reported estimate] That tilts the economics toward in-state group captive and co-located storage.
5. **Green open access rules diverge by state, and the divergence is getting worse.** The central GEOA Rules 2022 set a 100 kW eligibility threshold and minimum monthly banking of 30% (IEEFA). [Reported] Tamil Nadu's GEOA Regulations 2025, effective 1 October 2025, imposed an 8% in-kind banking charge, barred banking for third-party open access and tightened time-of-day banking, which cut group-captive savings by an estimated ~15% (Neufin). [Reported] Gujarat's GERC has charged ₹1.50/unit for banking and proposed ₹1/unit in a 2026 draft (Saur Energy). [Reported] For a 24×7 load, these rules matter more than headline subsidies.
6. **Water regulation exists but is not data-centre-specific.** CGWA's 2020 guidelines bar groundwater NOCs for new industries in over-exploited units, except MSMEs, staff drinking water and infrastructure. The 2023 amendment requires commercial users to file online water audits (Haryana WRA copy of the guidelines; TeamLease). [Reported] The 2025 Dynamic Ground Water Assessment classes 730 of 6,762 assessment units (10.8%) as over-exploited (PIB, Dec 2025). [Reported] No national rule requires data centres to disclose WUE, and the IndiaAI tender sets PUE &lt;1.35 with no WUE criterion. Per our earlier part on AI vs conventional data centres, only STT GDC India publishes audited WUE (0.58).
7. **States are starting to tie incentives to performance, unevenly.** Karnataka's Sustainable DC Policy 2026–31 (₹1,300.45 crore; 1 GW by 2031) requires PUE and WUE reporting for each plant. It reimburses 100% of treated-water charges (capped at ₹8 lakh a year) and plans resource heat-mapping and a 500 MW Hoskote park with 60 MLD of secondary-treated water (The News Minute, Medianama). [Reported] Maharashtra went the other way. Its 2026 revision cut the green-power requirement from 100% to 51%, widened eligibility to 20 projects statewide and added ₹1/unit for 10–20 years and a 4% interest subvention (Whalesbook). [Reported] That is a live example of the race to the bottom on incentives.
8. **The market is already moving toward the siting logic recommended here.** Google broke ground on 28 April 2026 on a ~1 GW, US$15 billion (2026–2030) AI hub at Vizag with AdaniConneX and Airtel, including a new cable landing station and three subsea cables (Google Cloud press release). [Reported] Meta will lease a 168 MW Reliance facility in Jamnagar "powered by renewable energy and cooled with desalinated seawater", with Meta covering "the full cost of the energy and water" (Meta newsroom, June 2026). [Reported] Reliance targets more than 120 MW of AI capacity online in H2 2026 (TechCrunch). [Reported]
9. **International peers have converged on four tools: disclosure, hard efficiency floors, grid conditions and water pricing.** Germany's EnEfG requires PUE ≤1.2 for data centres opening from 1 July 2026, energy-reuse factors of 10/15/20% and renewable power. The EU database (Delegated Regulation 2024/1364) collects PUE, WUE, ERF and REF from sites of 500 kW or more. Singapore's DC-CFA2 allocates ≥200 MW only to designs with PUE ≤1.25 and ≥50% green pathways. Ireland requires dispatchable on-site or nearby generation or storage equal to import capacity, plus 80% additional renewables. Texas SB 6 mandates curtailability for loads of 75 MW or more. Johor charges RM5.33/m³ for water and paused water-cooled expansions. China requires PUE ≤1.25 for new large sites (≤1.2 at hub nodes). [All Reported]

## Part 1 — Design and Site Recommendations

### 1.1 Site-selection framework (recommended weighting, estimated)

| Criterion | Weight: Cloud/Colo | Weight: AI training | What "good" looks like in India | Data to check |
|---|---|---|---|---|
| Firm power and grid headroom | 25% | 30% | A 220/400 kV substation within ~10–20 km with confirmed STU/CTU bay allocation; a dual independent feed; the queue position known | STU connectivity queue, CEA transmission plans, GNA applications |
| Clean-power access | 10% | 20% | In-state RE-rich DISCOM with workable group-captive/GEOA banking; co-located BESS eligible for the ISTS waiver to June 2028 | SERC GEOA regs, banking charges, ToD rules |
| Water security | 15% | 15% | Not in a CGWB over-exploited or critical unit; an STP/TSE contract or seawater/desal option | CGWB 2025 assessment, municipal TSE availability |
| Hazard (seismic, cyclone, flood, heat) | 10% | 10% | Zone II/III; outside 1-in-100-year flood plain + freeboard; outside cyclone storm-surge zone | IS 1893 (2016 legal; 2025 values as stress test), NDMA, IMD cyclone atlas |
| Latency and fibre | 20% | 5% | &lt;5 ms to a top-8 metro for cloud; ≥3 diverse long-haul routes; CLS within ~200 km | Carrier maps, CLS list |
| Land and zoning | 10% | 10% | Industrial/IT zoned land, ≥20–50 acres for campuses, DC-park status | State IT/industrial land banks |
| Policy and incentives | 5% | 5% | Notified, time-bound policy with performance conditions | State DC policies |
| Skills and supply chain | 5% | 5% | Within 2–3 hours of an engineering talent pool and logistics hub | |

*Rationale:* AI training is latency-tolerant: model training traffic is bulk and asynchronous. So it should trade latency for power, clean energy and water. Cloud availability zones and colocation serve interactive users and interconnection. They must stay near demand and cable landings, so their sustainability has to come from design rather than location.

### 1.2 Siting logic by archetype

| Archetype | Typical size | Recommended locations | Siting rule |
|---|---|---|---|
| Hyperscale cloud region/AZ | 50–300 MW per campus | Navi Mumbai, Pune, Chennai, Hyderabad, NCR (Noida/Greater Noida), Bengaluru periphery | AZs 30–100 km apart on separate substations and flood basins; within latency of a cable landing station (CLS) |
| Retail/wholesale colocation | 5–100 MW | Mumbai, Chennai, NCR, Hyderabad, Kolkata, Bengaluru | Carrier density and interconnection come first; choose existing industrial land with TSE |
| AI training campus | 100 MW–1 GW+ | Vizag, Jamnagar/Kutch periphery, Kurnool/Anantapur (AP), Tumakuru/Chitradurga corridor (Karnataka), Telangana interior, western Rajasthan with transmission, Odisha (Bhubaneswar/Paradip) | Co-locate with RE + BESS at a 400 kV pooling station; desal or TSE water; Zone II/III; hourly CFE |
| AI inference / edge | 0.5–20 MW | Tier-2 cities: Lucknow, Jaipur, Ahmedabad, Indore, Nagpur, Coimbatore, Kochi, Bhubaneswar, Guwahati, Patna | Near users and 5G aggregation; air-cooled/zero-water; standardised prefab |
| Sovereign/government cloud | 10–100 MW | NIC/State DCs; Naya Raipur AI DC park; Bhubaneswar; Tier III+ sites in two seismic/flood-independent regions | Geo-redundant pairs at least 500 km apart; Indian-owned operator (specified DC); highest disclosure standard |

### 1.3 Hub-by-hub suitability (scores are our estimates; 5 = best)

| Hub | Power headroom | Clean-power access | Water | Hazard | Latency/CLS | Land | Best-fit archetype | Key design response |
|---|---|---|---|---|---|---|---|---|
| Mumbai/Navi Mumbai | 3 | 3 | 3 | 2 (monsoon flood, Zone III) | 5 | 1 | Colo, cloud AZ | Multi-storey; plinth above design flood level; closed-loop liquid + dry coolers; TSE only; 51%+ RE via MSEDCL GEOA |
| Pune | 3 | 3 | 3 | 4 | 4 | 3 | Cloud AZ, colo overflow | Pair with Navi Mumbai as a second AZ; adiabatic-assisted dry coolers |
| Chennai | 3 | 4 (TN wind/solar) | 1 (2019 crisis) | 2 (cyclone, flood) | 5 | 3 | Colo, cloud, CLS-adjacent | Desal/TSE only; raised plinth; cyclone-rated envelope; note TN policy lapsed 31 Mar 2026 and TN banking restrictions |
| Hyderabad | 4 | 3 | 3 | 5 (Zone II, inland) | 3 | 4 | Cloud AZ, AI inference, mid-size training | Dry coolers with trim chillers; Telangana needs a policy update beyond 2016 |
| Bengaluru | 2 (grid-constrained) | 4 (Pavagada solar, wind) | 1 | 5 | 3 | 2 | Colo, enterprise, inference | Hoskote TSE park; best free-cooling climate of the metros; zero groundwater; PUE ≤1.20 bonus under state policy |
| NCR/Noida | 3 | 2 | 1 (over-exploited aquifers) | 3 (Zone IV Delhi; 45 °C+ heat) | 4 | 3 | Cloud AZ, colo, government | Air-cooled/hybrid chillers sized for 47 °C+ dry bulb; no groundwater; UP DC Policy 2026 |
| Kolkata | 3 | 2 | 3 | 2 (cyclone, flood) | 3 (limited CLS) | 3 | Eastern colo, edge | Raised plinth; demand-side diversity for the east |
| Vizag | 4 | 4 (AP RE + ISTS) | 3 (sea/desal) | 2 (cyclone, e.g., Hudhud) | 4 (new CLS, three cables) | 4 | AI training, hyperscale | Cyclone-rated structure; desal or closed-loop; seawater heat rejection only with marine ecology assessment |
| Jamnagar/Gujarat | 4 | 5 | 3 (desal) | 3 (cyclone; Kutch is Zone V) | 3 | 5 | AI training | Desalinated seawater; dry coolers in a hot-arid climate; avoid Kutch Zone V for critical halls |
| GIFT City | 3 | 4 | 3 | 4 | 3 | 3 | Fintech colo, IFSC workloads | Tie into GIFT's district-cooling network for absorption/heat reuse; SEZ/IFSC benefits |
| Tier-2 (Lucknow, Bhubaneswar, Nagpur, Coimbatore, Indore, Naya Raipur) | 3–4 | 3 | 3–4 | 3–5 | 2–3 | 5 | Edge, inference, state/sovereign | Prefab modules; air-cooled zero-water; anchor on government demand |

*Interpretation:* No metro scores well on water. Water performance in Mumbai, Chennai, Bengaluru and NCR therefore has to be designed in through closed-loop cooling and TSE, because site selection cannot deliver it. Vizag and Jamnagar score best for AI because RE, land and seawater coincide, but both carry cyclone risk, which must be engineered for.

### 1.4 Recommendations by archetype

**R1. Hyperscale cloud.** Build paired AZ campuses on separate substations and flood basins. Use 33 kV medium-voltage distribution into the campus with N+1 transformers and block-redundant (distributed-redundant or catcher) UPS rather than full 2N. That captures most of 2N's availability at lower capex and loss. Use Li-ion UPS, closed-loop air plus liquid hybrid halls (30–50% liquid-ready) and dry coolers with adiabatic assist only above ~35 °C wet-bulb-equivalent hours. Procure in-state group-captive RE plus co-located BESS.

**R2. Colocation.** Design for mixed tenancy: 10–20 kW air racks today, with capacity reserved for 50–130 kW liquid pods. Provide facility-water (FWS) take-off points at W32–W40 on every floor. In land-scarce metros, go multi-storey (4–8 floors) with dedicated heavy-load slabs (≥20–25 kN/m² in liquid-cooled rooms) and vertical riser space for coolant distribution. Offer tenants hourly clean-power and water reporting as a product.

**R3. AI training campus (100 MW–1 GW+).** Treat the campus as a power-plant-plus-load project:
- Connect at 220/400 kV with an on-site substation.
- Size co-located BESS (≥2–4 h at 30–50% of IT load) to absorb training-job power swings, provide grid-forming support and firm RE. Our Part 14 LP found that 161 MW solar + 86 MW wind + 379 MWh BESS served a 50 MW-IT Karnataka DC at ₹5.39/kWh vs ₹7.00/kWh grid.
- Use 100% direct-to-chip liquid cooling for GPU racks (GB200/GB300-class at 120–142 kW, scalable to 200–600 kW) with W40–W45 facility water, so dry coolers can reject heat without evaporation for almost all hours in most Indian climates.
- Keep a small evaporative trim for peak days only, sized from peak-day modelling (April–May).

**R4. AI inference/edge.** Standardise prefabricated 1–5 MW modules with air-cooled DX or pumped-refrigerant economisers and rear-door heat exchangers (RDHx) for 30–60 kW inference racks. Run zero water. Use HVO-ready gensets or BESS for backup, and site at telecom aggregation nodes.

**R5. Sovereign/government cloud.** Require Tier III (or Uptime/TIA-942 Rated-3) minimum, geo-redundancy across seismic and flood regions, and Indian ownership/operation, consistent with the Budget's "specified data centre" construct. Set the strictest disclosure: audited PUE, WUE and CUE published quarterly. Government should lead on transparency rather than lag.

### 1.5 Electrical design

- **Redundancy:** Use 2N for colocation where SLAs demand it. For hyperscale and AI, prefer N+1/block-redundant with software resilience. AI training clusters can tolerate partial-hall loss with checkpointing, so 2N everywhere is over-engineering. [Estimated judgement]
- **Medium voltage:** 33 kV internal rings for campuses above 50 MW; 11 kV for smaller sites. Plan from day one for 800 V DC / ±400 V DC busways for future 200–600 kW racks.
- **UPS and BESS:** Li-ion (LFP preferred for thermal stability) UPS; a separate grid-scale BESS that can deliver frequency response, peak shaving and RE firming. The 100% ISTS waiver for co-located BESS commissioned by June 2028 is a time-limited window to capture. [Reported basis]
- **Grid-forming:** Specify grid-forming inverters on BESS. CEA's draft 2026 connectivity regulations introduce grid-forming provisions and ride-through for inverter-interfaced bulk consumers of 50 MW or more. Large AI loads should meet these voluntarily now. [Reported basis]
- **Backup generation:** Diesel gensets remain the default. Specify HVO-compatible engines and test on HVO where supply exists. For campuses above 200 MW, evaluate gas engines on the city-gas grid only as backup or flexibility, never as baseload. Ireland's CRU explicitly states that "islanded", mainly fossil-powered data centres are not in line with national policy.
- **Power-swing management:** AI training produces sharp, synchronised load steps. Require power-smoothing (rack-level capacitors/BESS, GPU power capping) so the site's ramp rate stays within DISCOM/STU limits.

### 1.6 Cooling design by climate

| Climate (examples) | Design dry-bulb / wet-bulb (approx., estimated, 0.4% design) | Recommended primary heat rejection | Water strategy |
|---|---|---|---|
| Mild plateau (Bengaluru, Pune, Hyderabad) | ~35–40 °C DB / ~23–25 °C WB | Liquid-to-dry coolers at W32–W40; air halls with indirect evaporative only on peak hours | TSE for any evaporation; target WUE &lt;0.2 |
| Hot-humid coastal (Mumbai, Chennai, Kolkata, Vizag) | ~35–38 °C DB / ~28–29 °C WB | High-temperature liquid (W40–W45) + dry coolers; magnetic-bearing chillers as trim; free-cooling hours are limited at low supply temperatures and much greater at W40+ | Desal/TSE; seawater once-through only after a marine EIA; avoid towers on potable water |
| Hot-arid (NCR, Jamnagar, Rajasthan, Ahmedabad/GIFT) | ~44–47 °C DB / ~26–28 °C WB | Dry coolers oversized for 47 °C+; adiabatic assist only for short peaks; dust filtration | Zero groundwater; desal in Gujarat; size storage for April–June peaks |

Key points:
- **Raise the supply temperature.** The ASHRAE TC 9.9 liquid classes W32–W45 let dry coolers reject heat at ambient temperatures in the high 30s °C, which is what makes zero-evaporation feasible in India's climate. Air halls should run at the upper end of the ASHRAE recommended envelope (27 °C inlet) with containment.
- **Zero-water designs are proven at scale.** Microsoft says its design, used for all new data centres since August 2024, "will avoid the need for more than 125 million liters of water per year per datacenter", taking WUE to "near zero". Its FY2024 global average withdrawal WUE was 0.30 L/kWh, a 39% improvement on 2021. [Reported] The trade-off is a modest energy penalty, which Microsoft calls a "nominal increase". That penalty matters in India because MoEFCC norms allow coal plants 3.0–3.5 L/kWh, and CSE found half of surveyed freshwater-based plants exceeding the caps. A dry design that adds 0.03–0.05 to PUE can add 0.1–0.15 L/kWh of off-site water on a coal-heavy grid. [Estimated] Zero on-site water is therefore only net-positive when paired with clean power.
- **Seawater cooling** works for Vizag, Chennai and Jamnagar, preferably indirectly through desalinated make-up or a closed loop with seawater heat exchangers. Discharge temperature and intake ecology need EIA-grade study.
- **Immersion** suits niche high-density and edge sites. Direct-to-chip has the stronger vendor ecosystem for GB-class systems.

### 1.7 Heat reuse in India

Space heating is mostly irrelevant in India, so heat reuse must target cooling and process heat:
1. **Absorption chilling.** At 45–60 °C return temperatures, single-effect absorption output is marginal. Pairing it with heat pumps to lift heat to 80–90 °C enables chilled water for adjacent offices or cold chains. [Estimated feasibility]
2. **District cooling at GIFT City**, which already operates a district-cooling network. It is the natural pilot for feeding DC heat-pump output into absorption chillers.
3. **Industrial process heat:** food processing, dairy pasteurisation, laundries, pharmaceutical drying and desalination pre-heat (thermal-assisted desalination at Jamnagar/Vizag).
4. **Agriculture:** grain and spice drying and aquaculture in tier-2 parks.

Germany's ERF quotas (10% rising to 20%) are not transferable to India. A practical Indian target is an ERF ≥5% for campuses co-located in industrial parks with an identified offtaker, plus a heat-reuse feasibility study for all sites of 10 MW or more. [Estimated recommendation]

### 1.8 Building, hazard and resilience design

- **Seismic:** Design critical facilities for the more conservative of IS 1893:2016 and the withdrawn IS 1893:2025 hazard values, with importance factor 1.5. Give non-structural elements, including raised floors, overhead busways, liquid manifolds and battery racks, seismic restraint. Avoid Zone V (Kutch, the Northeast, the Himalaya) for primary campuses.
- **Flood:** Set the finished floor level and all MV/UPS/battery rooms ≥1 m above the higher of the 1-in-100-year flood level and the highest recorded flood (Mumbai 2005; Chennai 2015/2023). [Estimated recommendation] Do not put critical plant in basements, and put fuel and water tanks on elevated plinths. NDMA urban flood guidelines and the local DCR are the floor, not the target.
- **Cyclone (east coast, Gujarat):** Design the envelope, louvres, rooftop dry coolers and solar to the IS 875 (Part 3) wind speeds for the site, plus an uplift margin. Provide storm-surge setbacks and 72–96 h on-site fuel to cover post-landfall grid outages.
- **Heat:** Size all heat-rejection plant for current extremes plus a climate allowance (+2 °C to the 0.4% design dry-bulb). [Estimated]
- **Floors:** Use slab-on-grade with overhead distribution for liquid-cooled AI halls (heavier racks, easier leak management). Keep raised floors only where tenants require them.
- **Fire safety:** Segregate Li-ion UPS/BESS rooms with 2-hour rated construction, gas detection (off-gas sensing), deflagration venting and NFPA 855 / IS-aligned spacing. For liquid cooling, use leak detection at manifolds and propylene-glycol or dielectric fluids with known flash points. NBC 2016 Part 4 is the legal baseline, but it does not cover these risks adequately (see policy recommendation P12).
- **Modular/prefab:** Use prefabricated power skids, e-houses and coolant distribution units (CDUs) to compress schedules and labour risk.
- **Embodied carbon:** Specify ≥30–50% GGBS/fly-ash cement replacement, recycled-content steel and an LCA at design stage. Report embodied carbon per MW. [Estimated recommendation]

### 1.9 Water design and peak-day sizing

- Apply a hierarchy: (1) zero-evaporation closed loop; (2) TSE from municipal STPs (e.g., Hoskote's 60 MLD); (3) desalinated seawater on the coast; (4) surface allocation with a drought-curtailment clause; (5) never fresh groundwater in over-exploited, critical or semi-critical units.
- Size storage and treatment for the April–May peak, when adiabatic systems use the most water (Part 12), with ≥7 days' storage for TSE-dependent sites. Report peak-day withdrawal (m³/day) as well as the annual average.
- Report withdrawal, consumption and scarcity-weighted water separately (Part 6), and include the off-site grid water embedded in electricity.

### 1.10 Clean-power procurement design

- Anchor on in-state group captive (26% equity) solar+wind+BESS, because the ISTS waiver is now graded. Use interstate RE where co-located BESS still earns the waiver.
- Contract for hourly matching (24×7 CFE), not annual RECs. The Part 14 LP shows hourly-optimised solar+wind+BESS beats grid tariff on both cost and water.
- Use banking strategically, but model state rules: Tamil Nadu's 8% banking charge in kind and its third-party banking ban, and Gujarat's ₹1–1.50/unit.
- Use IEX price spreads (Part 12) to run BESS arbitrage and flexible AI scheduling.

### 1.11 Performance targets by archetype (recommended design targets; estimated)

| Archetype | Annualised PUE (mild / hot-humid / hot-arid) | Site WUE (L/kWh IT, consumption) | Freshwater share | Hourly CFE by 2030 | CUE (kgCO₂/kWh IT) | ERF |
|---|---|---|---|---|---|---|
| Hyperscale cloud | ≤1.20 / ≤1.28 / ≤1.25 | ≤0.3 | ≤20% | ≥70% | ≤0.25 | Feasibility study |
| Colocation | ≤1.30 / ≤1.38 / ≤1.35 | ≤0.5 | ≤30% | ≥60% | ≤0.35 | Feasibility study |
| AI training campus | ≤1.15 / ≤1.22 / ≤1.20 | ≤0.2 | 0% (TSE/desal only) | ≥80% | ≤0.15 | ≥5% where offtaker exists |
| AI inference/edge | ≤1.35 / ≤1.45 / ≤1.40 | ~0 (air-cooled) | n/a | ≥50% | ≤0.45 | — |
| Sovereign/government | ≤1.30 (tighten to 1.25 by 2030) / ≤1.35 / ≤1.35 | ≤0.4, disclosed quarterly | ≤20% | ≥60% | ≤0.35 | Feasibility study |

*Context:* The MeitY IndiaAI tender floor is PUE &lt;1.35. Leading Indian operators report 1.4–1.5 (SBI sector report, April 2026). [Reported] The best published audited WUE is STT GDC India's 0.58. These targets are ambitious but within reach with W40+ liquid cooling: Germany's legal new-build ceiling is 1.2, and Singapore's DC-CFA2 requires 1.25 in a tropical climate.

## Part 2 — Policy Recommendations

### 2.1 The current national framework at a glance

| Instrument | Status (Oct 2026) | Gap for data centres |
|---|---|---|
| MeitY Draft DC Policy 2020 | Never notified; consultations revived Aug 2025 (single window, 4 DCEZs) | No binding national framework, efficiency standard or water rule |
| Infrastructure status (harmonised master list) | DCs included (2022) | Financing benefit, but not conditioned on performance |
| Budget 2026–27 tax holiday to 2047 + 15% safe harbour | Enacted; "specified DC" scheme reported as not yet issued | The scheme could carry PUE/WUE/CFE conditions, but none are announced |
| DPDP Act 2023 + Rules 2025 | Notified 13/14 Nov 2025; consent, rights and cross-border Rule 15 commence 13 May 2027 | Blacklist model, not blanket localisation; sectoral rules (RBI payments) still localise |
| IndiaAI Mission | ₹10,372 crore; 38,000+ GPUs empanelled; around ₹65/GPU-hr (Business Standard, Jun 2026; the IT minister cites ₹67) | PUE &lt;1.35 only; no WUE, CFE or disclosure conditions |
| BEE / ECBC | General building codes; no DC star label or designated-consumer status | No mandatory DC benchmark or reporting |
| CEA grid connectivity draft 2026 | Draft; comments closed 2 Sep 2026 | Technical standards only; no large-load flexibility or cost-causation rules |
| GEOA Rules 2022 (amended) | In force; state implementation diverges | Banking/ToD restrictions vary; no hourly-matching certificate |
| ISTS waiver | Graded phase-out; 100% for co-located BESS to June 2028 | Data centres are not a distinct category |
| CGWA guidelines 2020 (amended 2023) | In force | No WUE disclosure; MSME exemption could be gamed by small edge sites |
| EIA Notification 2006 | DCs generally not a listed category (building/construction thresholds may apply) | 100 MW–1 GW campuses escape cumulative water/power impact assessment |
| NBC 2016 / fire norms | In force | Inadequate for Li-ion BESS and liquid cooling at scale |
| E-Waste Rules 2022 | In force (EPR) | No server reuse/refurbishment targets |
| PLI IT Hardware 2.0, ISM | In force | Weak linkage to DC procurement/localisation |

### 2.2 International comparison

| Jurisdiction | Instrument | Efficiency floor | Water | Grid/connection | Heat reuse | Lesson for India |
|---|---|---|---|---|---|---|
| EU | EED recast + Delegated Reg. 2024/1364; draft rating scheme | Reporting now; draft label PUE A ≤1.15, G &gt;1.90 | WUE reported; label A ≤0.10, G &gt;1.00 | — | ERF reported; Art. 26 waste-heat CBA for sites above 1 MW | Mandatory KPI disclosure to a public database, from 500 kW |
| Germany | EnEfG 2023 | New DCs from 1 Jul 2026: PUE ≤1.2; existing ≤1.5 (2027), ≤1.3 (2030) | — | Renewable electricity requirement | ERF 10% (2026), 15% (2027), 20% (2028) | Hard floors with a glide path for existing stock |
| Singapore | Green DC Roadmap (May 2024); DC-CFA2 (Dec 2025) | ≤1.3 aspiration (10 yrs); ≤1.25 at 100% load to win capacity | — | Capacity rationed (≥200 MW in CFA2) | — | Allocate scarce grid capacity competitively on performance |
| Ireland | CRU LEU Connection Policy (12 Dec 2025) | — | — | ≥10 MVA: dispatchable on-site/nearby generation/storage = MIC; SEM participation; 80% additional Irish RE | — | Connection is conditional on flexibility and additionality |
| Netherlands/Amsterdam | 2019–20 Amsterdam pause; national hyperscale siting limits (2022) | — | — | Zoning restricts hyperscale to designated areas | — | Zone-based siting (not independently re-verified in this research) |
| Malaysia (Johor) | DC water tariff (Aug 2025), approval vetting, pause on water-cooled expansion (Nov 2025) | PUE thresholds in vetting | RM5.33/m³; reclaimed water for new DCs; WUE thresholds (1.4–1.8 reported, sources conflict) | National task force checks power/water capacity | — | Price water at cost and mandate reclaimed water |
| US – Texas | SB 6 (signed 20 Jun 2025); PUCT rules (Sep 2026) | — | — | ≥75 MW: ≥$100k study fee, disclosure of duplicate requests and backup generation, curtailment in load shed | — | Large-load rules protect other consumers |
| US – Virginia | Large-load tariff class debates (Dominion) | — | — | Minimum-demand charges for large loads (not independently re-verified in this research) | — | Cost-causation tariffs |
| China | 2024 Special Action Plan (NDRC/MIIT/NEA/NDA) | New large DCs ≤1.25 by end-2025; hub nodes ≤1.2; national average &lt;1.5 | — | &gt;80% renewable at hub nodes | — | National hubs + floors steer siting |
| Japan | Watt-bit collaboration council (METI/MIC, Mar 2025; Report 1.0 Jun 2025) | — | — | Guide DCs to locations near decarbonised power | — | Joint power–telecom planning of DC zones |

### 2.3 Numbered policy recommendations

**P1. Notify a National Data Centre Policy with a statutory backbone (MeitY lead; MoP, MoEFCC, Jal Shakti, DoT; within 6–12 months).**
Rationale: The 2020 draft's six-year limbo has produced 16 divergent state regimes. The policy should:
- define DC categories (edge, colo, hyperscale, AI campus, sovereign);
- create the single-window portal already consulted on (replacing 30+ permissions) and designate DCEZs;
- make the Budget's "specified data centre" notification conditional on the disclosure and performance standards in P2–P4.
Trade-off: a binding national framework constrains state autonomy. Mitigate by setting floors, not ceilings.

**P2. Mandatory disclosure with third-party assurance (BEE under the Energy Conservation Act, with MeitY; rules within 12 months; first reports FY2027–28).**
- Bring DCs of 500 kW IT or more under the Energy Conservation Act as designated consumers or a notified category.
- Require annual public reporting to a national DC registry of: PUE; WUE split by withdrawal and consumption and by source (potable, ground, TSE, desal); peak-day water; CUE; hourly CFE share; REF; ERF; installed vs. utilised IT capacity.
- Require BEE-accredited energy-auditor assurance, and align with ISO/IEC 30134 (adopted by BIS) and the EU 2024/1364 KPI set so multinationals report once.
Evidence: only one Indian operator publishes audited WUE, while the EU now collects 24 data points from every site of 500 kW or more.

**P3. Add WUE and hourly-clean-power criteria to all public compute procurement (MeitY/IndiaAI, NIC, GeM; next tender round, within 6 months).**
- Keep PUE &lt;1.35 as the floor and tighten it to ≤1.30 by 2028.
- Add WUE ≤0.5 L/kWh (site), zero groundwater in over-exploited, critical or semi-critical units, and disclosure of hourly CFE.
- Score bids on ₹/GPU-hr *and* a sustainability index, so the lowest-price bidder does not automatically win.
Evidence: the IndiaAI rate of around ₹65 per GPU-hour (Business Standard, June 2026) rewards cost alone, and subsidised public compute should set the national standard.

**P4. Minimum performance standards with a glide path (BEE; notify 2027, effective for new builds from 2028).**
New DCs commissioned from 2028: annualised PUE ≤1.30 in hot-humid and ≤1.25 elsewhere; ≤1.20 for AI campuses above 50 MW by 2030. Existing DCs: ≤1.50 by 2030, ≤1.40 by 2033. Make climate-zone adjustments explicit. Model the approach on Germany's EnEfG, but with an extra 0.05–0.10 PUE allowance for tropical climates. [Estimated recommendation]
Risk: operators may game PUE through IT fan power. Require rack-level IT metering, as the EU now does.

**P5. Statutory water hierarchy for data centres (Jal Shakti/CGWA, MoEFCC, state water boards; 6–18 months).**
- Make "no fresh groundwater for cooling" absolute for DCs in over-exploited, critical and semi-critical units, and close the MSME loophole for DC use.
- Require TSE or desal first for evaporative cooling. Set DC-specific water tariffs at full cost (cf. Johor's RM5.33/m³). Require peak-day drought-curtailment plans.
- Extend the 2023 online water-audit duty to all DCs.
- States should replicate Karnataka's treated-water reimbursement, but cap it as a share of savings rather than a flat ₹8 lakh, which is immaterial for a 50 MW site.

**P6. A large-load grid connection regime (MoP/CEA/CERC + SERCs; 12–24 months).**
- Define "large load" as 50 MW or more (aligning with CEA's draft 50 MW threshold).
- Require: a study fee and financial security to deter speculative queue entries (Texas SB 6: ≥$100,000); disclosure of duplicate applications (17 GW is already in STU queues against a 26.3 GW projection); curtailability or ride-through and power-smoothing; co-located storage or generation sized to a share of import capacity in constrained nodes (a softer version of Ireland's 100%-of-MIC rule); and dedicated tariff categories with minimum-demand charges so that grid upgrades do not burden other consumers.
- Publish a nodal "headroom map" jointly with the CTU and STUs, the Indian equivalent of Japan's watt-bit planning.

**P7. Make 24×7 clean power procurable (MoP, CERC/SERCs, SECI/NTPC; 12–24 months).**
- Issue RTC/FDRE tenders open to data-centre offtakers.
- Introduce time-stamped (hourly) green certificates on top of the existing GEOA framework.
- Harmonise state banking: a ceiling on banking charges, no outright ban for third-party OA for loads above 10 MW, and ToD-consistent settlement in 15-minute blocks.
- Extend the co-located BESS ISTS waiver logic to DC-linked storage beyond June 2028, with a sunset.
Evidence: Tamil Nadu's 2025 banking rules cut group-captive value by ~15%. Without hourly products, annual "100% RE" claims mask coal-heavy night-time supply.

**P8. Outcome-based incentives with sunset clauses (state IT departments + DISCOMs; with each policy revision).**
- Replace flat capex subsidies and blanket ₹/unit discounts with payments tied to verified outcomes: PUE ≤1.20 (as in Karnataka's ₹20 crore bonus), WUE ≤0.2, hourly CFE ≥70%, ERF &gt; 0.
- Claw back incentives if targets are missed for two consecutive years.
- Adopt a national "incentive code of conduct" through NITI Aayog/MeitY to curb bidding wars. Maharashtra's move from 100% to 51% green power is the cautionary example.
- Every incentive should sunset within 5–7 years and face a published cost-benefit review.

**P9. Green DC zones and parks with shared infrastructure (states with MeitY DCEZ scheme, CTU/STUs, municipal STPs; 2–5 years).**
Plan zones where a 400/220 kV substation, RE pooling, TSE/desal pipelines and diverse fibre are built ahead of demand and costs are recovered through park charges. Karnataka's resource heat-mapping and the Hoskote park are templates. Priority zones: Vizag–Anakapalli, Jamnagar, Hoskote/Tumakuru, Navi Mumbai–Panvel (ReNew's 750 MW MoU), Noida/YEIDA, Hyderabad–Shamshabad, Bhubaneswar–Paradip.

**P10. Bring large campuses into environmental assessment (MoEFCC; 12 months).**
Add DC campuses above 100 MW (or with water demand above a set threshold) to the EIA Notification schedule as a category with cumulative power-water assessment and public consultation. Otherwise 1 GW sites will escape scrutiny that a small thermal plant would face.
Trade-off: possible delays. Mitigate with standard ToRs and a fixed 120-day timeline within the single window.

**P11. Heat-reuse readiness (BEE, MoHUA, state industrial development corporations; medium term).**
Require a heat-reuse feasibility study for sites of 10 MW or more, and ERF disclosure. Offer capital support or concessional finance for absorption-chiller, process-heat and district-cooling links, starting with GIFT City and food-processing parks. Do not copy Germany's quotas until offtake infrastructure exists.

**P12. Fire and life-safety codes for Li-ion and liquid cooling (BIS/NBC committee, state fire services; 12–18 months).**
Issue an NBC Part 4 amendment or a BIS standard for BESS/UPS rooms (aligned with NFPA 855), liquid-cooling fluid classification, leak detection and firefighter access for multi-storey DCs. Train state fire services in DC incidents.

**P13. Circularity under the E-Waste Rules 2022 (MoEFCC, CPCB, MeitY; medium term).**
Set targets for server and GPU refurbishment and reuse. Require ITAD data-sanitisation certification that is DPDP-compliant. Include lithium battery second-life provisions, and require disclosure of tonnage retired and reused.

**P14. Calibrated data sovereignty (MeitY, sector regulators; before 13 May 2027).**
Keep the DPDP blacklist approach rather than blanket localisation. Localisation mandates raise capacity demand without regard to resource efficiency. Pair sovereign workload requirements (government, critical sectors) with the strictest efficiency and disclosure rules, and publish the Section 16 negative list well before the May 2027 commencement to reduce investment uncertainty.

**P15. Local manufacturing and supply chain (MeitY PLI IT Hardware 2.0, ISM, DPIIT; medium term).**
Extend PLI support to DC electrical and cooling equipment: transformers, switchgear, CDUs, dry coolers, LFP battery packs. Rationalise customs duty on items not made domestically. Link IndiaAI empanelment scoring to domestic-value-add disclosure, but not to mandates that would raise GPU-hour costs.

**P16. Skills (MSDE, Electronics Sector Skills Council, AICTE; short to medium term).**
Create a national DC technician and critical-facility-engineer curriculum covering liquid cooling, MV switching and BESS safety, with tier-2 training centres co-located with DC parks.

**P17. Community benefit and transparency (states, ULBs; with every allocation).**
- Publish water and power allocations per project and require public hearings for sites above 50 MW.
- Ring-fence a share of DC water and electricity duty revenue for local water infrastructure, such as STP upgrades.
- Johor's experience, where residents protested over water in February 2026, shows that legitimacy depends on visible fairness.

**P18. Monitoring, review and sunset (MeitY + NITI Aayog; annual).**
Publish an annual "State of Indian Data Centres" report from registry data. Review incentives every three years and auto-sunset any that cannot show verified outcomes.

### 2.4 Policy recommendation matrix

| # | Recommendation | Lead agency | Supporting | Timeline | Instrument | Key risk |
|---|---|---|---|---|---|---|
| P1 | National DC policy + single window + specified-DC conditions | MeitY | MoP, MoEFCC, Jal Shakti, DoT, MoF | Short (≤12 mo) | Cabinet-approved policy + notification | Delay; state pushback |
| P2 | Mandatory assured disclosure + registry | BEE | MeitY, CEA | Short–medium | EC Act notification | Reporting burden on small sites; use thresholds |
| P3 | WUE/CFE in public tenders | MeitY (IndiaAI), NIC | GeM | Short (next round) | Tender RFP | Higher GPU-hour bids |
| P4 | PUE floors with glide path | BEE | MeitY | Medium (2027–2030) | EC Act standards | Climate fairness; gaming |
| P5 | Water hierarchy + groundwater ban | CGWA/Jal Shakti | MoEFCC, state water boards, ULBs | Short–medium | CGWA guideline amendment; state rules | Enforcement capacity |
| P6 | Large-load connection rules | CEA, CERC | SERCs, CTU, STUs, DISCOMs | Medium (12–24 mo) | Regulations + tariff orders | Slower connections; investor flight |
| P7 | 24×7 clean power products, banking harmonisation | MoP | CERC, SERCs, SECI, Grid-India | Medium | Rules amendment, tenders | DISCOM revenue loss |
| P8 | Outcome-based, sunset incentives | State IT depts | DISCOMs, NITI Aayog | With each revision | State policies | Interstate competition |
| P9 | Green DC zones/parks | States, MeitY | CTU/STUs, ULBs | Medium–long (2–5 yrs) | DCEZ scheme | Stranded park infrastructure |
| P10 | EIA coverage for &gt;100 MW campuses | MoEFCC | State SEIAAs | Short–medium | EIA notification amendment | Delays |
| P11 | Heat-reuse readiness | BEE | MoHUA, state IDCs, GIFT City | Medium | Guidelines + finance | Few offtakers |
| P12 | Li-ion/liquid fire codes | BIS (NBC) | State fire services | Short–medium | NBC amendment | Code lag |
| P13 | Circularity targets | MoEFCC/CPCB | MeitY | Medium | E-Waste Rules amendment | Data-security concerns |
| P14 | Calibrated sovereignty | MeitY | RBI, SEBI, IRDAI | Before May 2027 | DPDP S.16 notification | Over-localisation |
| P15 | Local manufacturing | MeitY, DPIIT | ISM, MoF (customs) | Medium | PLI guidelines | Cost inflation |
| P16 | Skills | MSDE | ESSC, AICTE | Short–medium | Curriculum | Uptake |
| P17 | Community transparency | States, ULBs | — | Short | Allocation rules | Local opposition |
| P18 | Monitoring and sunset | MeitY, NITI Aayog | BEE | Annual | Report | Political will |

### 2.5 State-level differentiation

- **Water-stressed metros (Karnataka/Bengaluru, Tamil Nadu/Chennai, Delhi-NCR/UP, Telangana):** Pay incentives only for zero-freshwater designs, and allocate TSE first. Tamil Nadu should notify a successor to its lapsed policy with Karnataka-style PUE/WUE conditions and fix its 2025 GEOA banking restrictions for large DC loads. Telangana should replace its 2016 policy.
- **RE-rich states (Gujarat, Rajasthan, AP, Karnataka interior, Odisha):** Market "RE + land + water" campuses with pre-built 400 kV substations and desal or TSE, and compete on infrastructure readiness, not tariff discounts.
- **Maharashtra:** Restore a rising green-power trajectory (51% now, 75% by 2030, hourly) rather than a fixed 51% floor, and attach WUE conditions to the ₹1/unit concession.
- **UP and the eastern states:** Use DC policies to anchor edge and sovereign capacity for underserved populations, prioritising reliability and fibre.

## Caveats

- **Reported vs. estimated:** Items marked [Reported] come from named public sources. Some, including the CEA 26.3 GW figure, the specified-DC status, the Texas PUCT final rules, Singapore DC-CFA2 awardees and the Johor WUE thresholds, rest on secondary trackers or press summaries rather than primary gazettes. Hub scores, climate design values, performance targets, plinth and BESS sizing, and the tropical PUE allowance are our engineering estimates and should be validated with site-specific ASHRAE/IMD data and studies.
- **Conflicts noted:** Johor's WUE threshold appears as 1.8 (ArusGrid) and 1.4 (S&amp;P via BigGo). Secondary sources disagree on whether China's 2024 plan sets 1.25 or 1.3. The NDRC primary text says ≤1.25 for new large data centres and ≤1.2 at hub nodes, and we use that. Netherlands and Virginia entries were not re-verified in this research cycle.
- **Regulatory flux:** IS 1893:2025 has been withdrawn, CEA's connectivity regulations are in draft, the DPDP cross-border provisions start in May 2027 and the national DC policy is unfinalised. Recommendations are written to stay robust to these outcomes.
- **Forward-looking statements:** Capacity figures for Google Vizag (~1 GW; some reports cite a 5 GW long-term target) and Reliance Jamnagar (multi-GW) are company plans, not operational capacity.

Sources:
1. telborg — https://telborg.com/datacentre-briefings/256
2. ecorpit — https://ecorpit.com/karnataka-data-centre-policy-gcc-ai-infrastructure-2026/
3. computerweekly — https://www.computerweekly.com/news/366629299/India-revives-national-datacentre-policy-amid-AI-push
4. treelife — https://treelife.in/reports/india-budget-2026-data-centres-it-tech-global-ai/
5. powerpeakdigest — https://powerpeakdigest.com/cea-draft-2026-grid-connectivity-regulations/
6. raceias — https://www.raceias.com/current-affairs/india-revises-earthquake-design-code-2025-is-18932025
7. ijcope — https://ijcope.org/wp-content/uploads/2026/05/Comparative-Study-of-Seismic-Design-Provisions-Impact-of-Is-1893-2025-Part-1-And-Part-5-on-Multi-Storey-RC-Buildings.pdf
8. visionias — https://visionias.in/current-affairs/news-today/2025-11-29/environment/indias-new-earthquake-zonation-map-by-bureau-of-indian-standards
9. visionias — https://visionias.in/current-affairs/upsc-daily-news-summary/article/2026-03-07/the-economic-times/environment/bis-revokes-new-seismic-map-with-high-risk-zone-vi
10. mercomindia — https://www.mercomindia.com/power-ministry-announces-100-ists-charges-waiver-for-psps-co-located-bess
11. saurenergy — https://www.saurenergy.com/solar-energy-news/mop-extends-ists-charges-waiver-for-solar-wind-projects-facing-transmission-delays-11756500
12. jmkresearch — https://jmkresearch.com/inter-state-transmission-waiver-for-energy-storage-projects-extended-by-three-years/
13. ieefa — https://ieefa.org/sites/default/files/2024-12/Impact%20of%20Green%20Energy%20Open%20Acess_Dec2024.pdf
14. etpi — https://etpi.in/sites/default/files/publications/ETPI_Green%20Energy%20Open%20Access%20Regulations%20in%20India.pdf
15. neufin — https://neufin.co/blog/tamil-nadu-open-access-regulation-2025-for-business/
16. saurenergy — https://www.saurenergy.com/solar-energy-news/gerc-proposes-lower-banking-charges-for-green-energy-open-access-12062017
17. hwra — https://hwra.org.in/Content/Images/Revised_Guidelines_Section_2(3).pdf
18. teamleaseregtech — https://teamleaseregtech.com/updates/article/22624/central-ground-water-authority-amended-the-guidelines-to-regulate-and/
19. enviliance — https://enviliance.com/regions/south-asia/in/report_1185
20. pib — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2206073&amp;reg=3&amp;lang=2
21. bank — https://sbi.bank.in/documents/57189647/58231607/Sector+Report+DataCentre.pdf/f1919592-ee66-b50b-ea20-75fbb27c9bb5?t=1779885206866
22. medianama — https://www.medianama.com/2026/09/223-karnataka-sustainable-data-centre-policy/
23. thenewsminute — https://www.thenewsminute.com/karnataka/karnatakas-new-data-centre-policy-puts-water-energy-in-focus-what-does-it-say
24. whalesbook — https://www.whalesbook.com/news/English/real-estate/Maharashtra-Expands-Green-Data-Centre-Policy-Investor-Impact/6a30b10ad017fdb509977cc9
25. googlecloudpresscorner — https://www.googlecloudpresscorner.com/2026-04-28-Google-Breaks-Ground-on-India-AI-Hub,-Launching-a-National-Industrial-Ecosystem-Alongside-Indias-Digital-Infrastructure-Milestone
26. startupfeed — https://startupfeed.in/google-breaks-ground-vizag-ai-hub-adani-airtel-15-billion/
27. subseacables — https://www.subseacables.net/infrastructure-news/google-unveils-three-new-subsea-cables-to-strengthen-india-us-ai-connectivity/
28. fb — https://about.fb.com/news/2026/06/meta-partners-with-reliance-on-ai-enabled-data-center-in-india/
29. TechCrunch — https://techcrunch.com/2026/02/19/reliance-unveils-110b-ai-investment-plan-as-india-ramps-up-tech-ambitions/
30. wfw — https://www.wfw.com/articles/data-centres-an-international-legal-and-regulatory-perspective-spotlight-on-germany/
31. mayerbrown — https://www.mayerbrown.com/en/insights/publications/2024/02/sustainable-data-centers-the-german-energy-efficiency-act-what-data-center-operators-need-to-consider-now-and-in-the-future
32. mondaq — https://www.mondaq.com/climate-change/1851256/european-commission-advances-data-center-sustainability-ratings-and-consults-on-minimum-performance-standards
33. eudca — https://www.eudca.org/energy-efficiency-directive
34. lexology — https://www.lexology.com/library/detail.aspx?g=46b6cc4e-011c-45ac-9c4c-9ac58df0b76b
35. dcbyte — https://www.dcbyte.com/news-blogs/ireland-reopens-the-grid-for-data-centres/
36. arthurcox — https://www.arthurcox.com/knowledge/new-connection-policy-for-data-centres-in-ireland/
37. relae — https://relae.co/blog/data-center-load-flexibility
38. waterwastewaterasia — https://waterwastewaterasia.com/higher-costs-tighter-rules-johors-data-centres-turn-to-reclaimed-water/
39. malaysia4u — https://malaysia4u.com/data-centres-guide
40. arusgrid — https://arusgrid.com/policy/malaysia
41. asiadaily — https://asiadaily.org/news/10940/
42. cls — https://www.cls.cn/detail/1743451
43. solarquarter — https://solarquarter.com/2026/07/16/cea-releases-draft-2026-grid-connectivity-regulations-to-strengthen-renewable-energy-integration-and-grid-stability/
44. itpro — https://www.itpro.com/infrastructure/data-centres/data-center-water-consumption-is-skyrocketing-but-microsoft-thinks-it-has-a-solution-the-companys-new-closed-loop-cooling-system-consumes-zero-water-and-could-save-millions-of-liters-per-year
45. saurenergy — https://www.saurenergy.com/solar-energy-news/tnerc-proposes-draft-banking-rules-for-green-power-open-access-10511916
46. whitecase — https://www.whitecase.com/insight-alert/data-center-requirements-under-new-german-energy-efficiency-act
47. introl — https://introl.com/blog/singapore-green-data-center-mandate-dc-cfa2-2026
48. dlapiperdataprotection — https://www.dlapiperdataprotection.com/?t=law&amp;c=IN
49. pib — https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf
50. veritect — https://veritect.ai/digital-data-ai-law/dpdp-rules-2025-phased-rollout
51. biggo — https://finance.biggo.com/news/63b93a0b-f368-4c8f-94fb-56b7351b6c30
52. wuhan — https://home.wuhan.gov.cn/zcfg/202408/t20240808_2439562.shtml
53. news — http://www.news.cn/energy/20240725/2256950d364e4b7c8579a9466c0b1811/c.html
54. meti — https://www.meti.go.jp/english/press/2025/0612_001.html
55. meti — https://www.enecho.meti.go.jp/category/others/basic_plan/pdf/2025_strategic_energy_plan.pdf
56. india-briefing — https://www.india-briefing.com/news/india-bis-standards-data-centres-46991.html
57. moduledge — https://www.moduledge.com/blog/eu-data-center-regulations-2026
58. mayerbrown — https://www.mayerbrown.com/en/insights/publications/2025/07/important-texas-regulatory-updates-for-data-centers
59. mri — https://www.mri.co.jp/en/knowledge/insight/20251219.html
60. businessworld — https://www.businessworld.in/article/karnataka-approves-sustainable-data-centre-policy-targets-1-gw-it-load-by-2031-624457
61. eqmagpro — https://www.eqmagpro.com/renew-subsidiary-secures-%E2%82%B970000-crore-maharashtra-investment-pact-for-750-mw-green-data-centre-park-eq/
62. legal500 — https://www.legal500.com/intelligence/india/privacy/cross-border-data-transfers-under-indias-dpdp-act-rules-restrictions-and-compliance-roadmap-for-2027
63. thediplomat — https://thediplomat.com/2026/04/whose-water-powers-the-cloud-data-centers-and-the-right-to-water-in-johor/
64. ndrc — https://www.ndrc.gov.cn/xwdt/tzgg/202407/P020240723625616053849.pdf
65. indianinfrastructure — https://indianinfrastructure.com/2026/07/14/cea-issues-draft-cea-technical-standards-for-connectivity-to-the-grid-regulations-2026/
66. indianweb2 — https://www.indianweb2.com/2026/04/google-breaks-ground-on-15-billion-ai.html
