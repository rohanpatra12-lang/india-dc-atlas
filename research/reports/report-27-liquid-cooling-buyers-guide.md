<!-- Report 27 of the India Data Centre Atlas research series (Liquid cooling buyer's guide: direct-to-chip vs single- and two-phase immersion). Produced with AI-assisted web research, Oct 2026, and kept as written at the time. The atlas standards register (src/data/standards.js) is authoritative where figures differ (for example India grid water 2.9 L/kWh and grid CO₂ 0.675 t/MWh after the October 2026 corrections). -->

# Liquid Cooling Buyer's Guide for Accelerated Computing: Water-Based Direct-to-Chip vs Single-Phase Immersion vs Two-Phase Immersion (India/Bengaluru Edition)

For nearly every buyer in 2026, the right default is water-based (single-phase) direct-to-chip (DLC) cooling on a warm-water loop, sized for at least W40 and ideally W45. Single-phase immersion is a strong specialist option for owner-operated, fan-agnostic fleets such as crypto, CPU-heavy HPC, edge and harsh sites. Two-phase immersion should be treated as a watch-list technology, not a procurement default, because of PFAS regulation, fluid supply and OEM support. The reason is not that DLC is the thermodynamic winner. It is the only approach NVIDIA ships and supports for GB200/GB300 NVL72 and Vera Rubin. Microsoft's peer-reviewed life-cycle study found cold plates deliver energy, carbon and water benefits "as good as" both immersion methods. And in Bengaluru's mild climate, a W32–W40 loop can run on dry or adiabatic coolers with near-zero on-site water.

## TL;DR

- **Default to water-based DLC (PG25 or treated water, liquid-to-liquid CDUs, 45 °C-capable) for AI training and large-scale inference.** It is mandatory for GB200/GB300 NVL72 and Vera Rubin. NVIDIA says Rubin runs on 45 °C inlet water with "no water chillers... necessary". In a Nature 2025 life-cycle assessment, it matched immersion: 15–21% lower GHG, 15–20% lower energy and 31–52% lower blue water than air cooling.
- **Choose single-phase immersion only where you control the hardware and warranty stack.** That means crypto, CPU/HPC, edge and dusty sites, or Intel Xeon fleets covered by Intel's immersion warranty rider (certified with Shell, ExxonMobil and BAC fluids/tanks in 2025). It captures ~100% of heat with non-PFAS hydrocarbon fluids (Shell S5 X flash point 200 °C), but NVIDIA offers no immersion lifespan certification for its GPUs.
- **Avoid committing new capacity to fluorinated two-phase immersion until the EU PFAS restriction is decided.** The SEAC final opinion is due by end-2026, with a Commission decision expected in 2027. Novec/Fluorinert production ended when 3M completed its PFAS exit at end-2025. Replacements such as Chemours Opteon 2P50 (HFO, GWP 10, boils 49 °C) are promising but still "developmental". Under an agreement Chemours signed in May 2025, Navin Fluorine will provide "critical capabilities and capacity—beginning in 2026". If you need >2 kW-per-chip headroom, look at two-phase *direct-to-chip* (e.g. ZutaCore) as the hedge.

## Key Findings

1. **Heat capture is not the deciding metric for AI.** Microsoft's Nature paper puts cold-plate liquid heat capture at "50% to 80% or more". Lenovo measured 98% capture at 45 °C inlet and 99% at 40 °C on its Neptune SD650-N V2 with insulated racks. Immersion captures 100%. For GB200 NVL72, HPE's QuickSpecs split (as reported by Spheron and Moduledge) is "115 kW liquid-cooled plus 17 kW air-cooled", about 13% to air, so the facility still needs some air handling (or a rear-door heat exchanger) alongside DLC.
2. **Lifecycle efficiency is close to a tie.** The Microsoft/WSP LCA (Nature, vol. 641, 2025) found cold plates, single-phase and two-phase immersion all in the same band: −15–21% GHG, −15–20% energy, −31–52% blue water versus air. Microsoft's director of sustainability Teresa Nick: "It was interesting to see that cold plates could be as good as the two immersion cooling methods". Microsoft states it "has investigated but is not currently using immersion cooling technologies in datacenter operations". Note also that the LCA, per Cooling Post, "covers cooling chips for general compute, or CPUs, not the specialised chips designed to handle AI workloads".
3. **OEM support is the binding constraint.** GB200/GB300 NVL72 are designed for direct-to-chip cold plates. TrendForce (Aug 2025, citing Korean press) reports NVIDIA "does not offer lifespan certification for immersion cooling on their GPUs". Intel is the only major silicon vendor with a formal immersion warranty rider, and it covers 4th/5th Gen Xeon, not GPUs.
4. **Two-phase immersion's regulatory and supply picture has worsened.** 3M confirms it "completed its exit of PFAS manufacturing at the end of 2025". The EU RAC adopted its final opinion on the universal PFAS restriction on 2 March 2026. It rejected excluding substances that contain only CF3-X groups, so most HFO-type fluids remain in scope. The SEAC draft also found the proposed fluorinated-gas derogations "not justified as proposed". In the US, the EPA again delayed TSCA §8(a)(7) PFAS reporting to start no later than 31 January 2027.
5. **Warm water is the real efficiency lever, and it suits Bengaluru.** Jensen Huang at CES 2026: "with 45°C, no water chillers are necessary for data centers". CoolIT, a DLC vendor, cautions that "true chiller-free operation requires ambient conditions that can reliably supply 45°C water" and that heat waves above 35 °C erode free cooling. Bengaluru's mild climate makes W32 adiabatic or W40 dry operation realistic all year (consistent with the Atlas's own modelling). Delhi and Chennai need trim cooling or adiabatic assist in peak months.
6. **Retrofit economics favour DLC.** STL Partners' report "The retrofitting roadmap: An evolution of liquid cooling" (released in London on 28 May 2026, commissioned by Airedale) estimates "approximately USD2 million per MW of capex, in comparison to a greenfield build that would cost upwards of USD11 million per MW". That is a headline-capex saving of ~80%, but STL warns hidden costs (migration, downtime, lost tenancy) can "materially change the investment case". In India, the SBI sector report (April 2026) puts a standard Tier III air-cooled build at ₹50–55 crore/MW and AI-ready builds "with immersion cooling or Tier IV redundancy" at up to ₹75 crore/MW.

## Side-by-Side Comparison

| Criterion | Water-based single-phase DLC (cold plate) | Single-phase immersion | Two-phase immersion |
|---|---|---|---|
| Heat captured to liquid | 50–80%+ typical (Microsoft); ~80–90% on NVL72-class racks; 98–99% on fully plumbed Lenovo Neptune nodes | ~100% | ~100% |
| Residual air system needed? | Yes (~13% on GB200 NVL72 per HPE: 115 kW liquid + 17 kW air); RDHx or CRAH | Minimal (room comfort/other gear only) | Minimal |
| Max rack/tank density (shipping) | NVL72: 120 kW design power (GB200) / 135 kW (GB300) per NVIDIA Mission Control docs, with Vertiv reference designs at 130 kW and 142 kW; Vera Rubin NVL144 class ~180–230 kW; Schneider/NVIDIA reference designs targeting up to 300 kW; Kyber ~600 kW (2027, roadmap) | Commonly 50–100 kW per tank; LiquidStack single-phase 110 kW/rack; GRC claims up to 368 kW per system (vendor) | LiquidStack DataTank 48U up to 252 kW (2021 datasheet); Microsoft cites +500 kW tank potential |
| Chip TDP supported | 1–2.3 kW today (B200/B300 class) with single-phase; 3–5 kW future likely needs two-phase DLC or microfluidics (Dell'Oro) | Proven ~800 W–1 kW+ (Intel/Submer forced-convection heat sink for 1 kW+ Xeon); GPUs >1.2 kW need forced flow or hybrid cold plate | Highest per-chip heat flux; boiling surfaces handle >1 kW; ZutaCore 2-phase DLC certified to 2,800 W per cold plate (Pegatron) |
| Coolant / facility temps | ASHRAE W32–W45; Rubin 45 °C inlet; Lenovo W45; return +10–15 °C | Fluid ~40–50 °C; facility water W32–W40 common | Fluid boils at its saturation temperature: Novec 7000 34 °C, Novec 649/Opteon 2P50 ~49 °C, FC-72 56 °C (Microsoft: 30–50 °C) |
| Chiller-less in Bengaluru | Yes (W32 adiabatic / W40 dry) | Yes | Yes (condenser water must stay well below ~49 °C) |
| PUE (well designed, mild climate) | ~1.10–1.20 (Lenovo SR780a 1.1) | ~1.05–1.10 (vendor claims 1.02–1.08) | ~1.02–1.07 (vendor claims; ZutaCore 2-phase DLC pPUE 1.03) |
| Server fan power removed | Most (residual fans for memory/NICs/PSUs) | All fans removed | All fans removed |
| Pumping energy | Highest of the three per kW (≈1.5 L/min per kW at 10 K ΔT) | Moderate (viscous oil ~10 cSt at 40 °C) | Lowest (passive boiling; 2-phase DLC ~0.3 L/min per kW) |
| OEM / warranty | Full NVIDIA, Dell, HPE, Supermicro, Lenovo support; standard for NVL72/Rubin | Intel Xeon warranty rider (Shell, ExxonMobil, BAC); no NVIDIA GPU certification; OCP warranty guidelines (2024) | Weakest; Novec-based designs orphaned; Opteon 2P50 qualified by Samsung (Aug 2025) |
| Coolant cost | PG25/treated water: ~$0.35–0.60/L | Mineral oil ~$3–6/L; PAO/GTL ~$12–20/L | Fluorinated ~$45–300/L (wide disagreement; see Caveats) |
| Fluid volume / weight | Tens to low hundreds of litres per rack | ~800–1,500 L per tank; 2–4 t loaded | Similar volume but density ~1.5–1.75 kg/L, so heavier |
| Fluid losses | Negligible (closed loop) | Carry-out 0.5–2 L per server removal | Vapour loss "<2% per year" in well-built tanks (LiquidStack claim) |
| Floorspace / building | Standard racks; slab or raised floor; extra space for CDUs and piping | Horizontal tanks; lower ceiling need but more floor area per tank; floor loading 2–4 t point loads; hoists for servicing | As immersion plus sealed lids, vapour management, condenser plumbing |
| On-site water | Set by heat rejection: ~0.05 L/kWh dry; ~0.25 adiabatic; ~1.8 towers (Atlas estimates) | Same logic; usually paired with dry coolers | Same logic |
| Fire / toxicity | Water-glycol non-flammable; leak risk to electronics | Combustible but high flash point (Shell S5 X 200 °C, fire point 220 °C, autoignition 355 °C) | Non-flammable (2P50: no flash point); inhalation OEL 200 ppm; PFAS persistence |
| Regulatory risk | Low | Low (non-PFAS) | High (EU REACH PFAS, US TSCA reporting, state laws) |
| Market share / maturity | Dominant; "scaling first" (Dell'Oro) | Niche (crypto, HPC, edge) | Small, shrinking after 3M exit |

## Technology Profiles: Advantages and Drawbacks

### 1. Water-based single-phase direct-to-chip

**How it works.** Cold plates sit on GPUs, CPUs and switches, with a technology cooling system (TCS) loop running to a coolant distribution unit (CDU).

Variants buyers must choose between:
- **Liquid-to-air CDUs and sidecars.** These reject heat into the room, so no facility water is needed. They are the fastest retrofit, but capacity is limited (tens of kW per rack) and they add to the room's air load.
- **Liquid-to-liquid CDUs.** These connect to a facility water system (FWS) and are the norm for NVL72-class racks.
- **Coolant.** PG25 (25% propylene glycol), which Microsoft's study used as its reference coolant, or treated water. Lenovo positions treated water as "much safer and more efficient" than PG25.
- **Negative-pressure systems.** These reduce leak consequences. Ask vendors for evidence.
- **Hybrid with rear-door heat exchangers (RDHx)** to capture the residual 10–20% air heat.

**Advantages**
- It is the only path NVIDIA supports for GB200/GB300 NVL72 and Vera Rubin, and every major OEM ships it.
- It keeps standard racks, standard servicing and a familiar ops model.
- It retrofits into air halls: about $2M/MW (STL Partners), or more cheaply if water is brought to existing rows.
- Warm-water capability (W40–W45) removes chillers in most Indian climates.
- On lifecycle carbon, energy and water, Microsoft found it matches immersion.

**Drawbacks**
- Air cooling is still needed for the residual load (HPE: 17 kW of a GB200 NVL72's 132 kW, ~13%), which adds fan and CRAH energy.
- Hundreds of quick disconnects and manifolds create leak points, so water quality (conductivity, biocide, filtration) is a new operational discipline.
- It has the highest pumping energy of the three.
- Single-phase cold plates approach their limit around 2–3 kW per chip. Dell'Oro expects two-phase DLC to grow "once chip-level TDPs and thermal flux exceed the practical limits of single-phase systems".

### 2. Single-phase immersion

**How it works.** Servers sit vertically in open tanks of dielectric hydrocarbon fluid: mineral oil, PAO or GTL synthetic, or esters. Fluid is pumped (forced convection) or allowed to circulate naturally to a heat exchanger.

Vendors: GRC (ICEraQ), Submer (SmartPod), LiquidStack (single-phase), Asperitas (natural-convection AIC24), BAC, Iceotope (precision/chassis-level immersion).

Fluids: Shell (GTL S3 X/S5 X), Castrol, ExxonMobil, Engineered Fluids.

**Advantages**
- It captures 100% of heat and removes all server fans.
- Fluids are not PFAS, and high flash points (Shell S5 X 200 °C) make the fire risk manageable.
- It needs no room air handling, which suits dusty, humid or space-constrained edge sites and telecom shelters.
- It is cheap per litre: about $3–6/L for mineral oil and $12–20/L for PAO (Alliance Chemical).
- Intel certification is maturing. Intel's Shell case study claims "up to 48 percent" energy reduction for the certified Xeon/Supermicro/Submer stack (vendor figure).
- It has a long track record in crypto mining.

**Drawbacks**
- There is no NVIDIA GPU lifespan certification. Uptime Institute notes immersion "has yet to see uptake in AI compute workloads".
- Hardware must be immersion-ready: thermal interface materials (TIMs), power supplies and cable compatibility (Intel had to modify PSUs, heat-sink fin pitch and TIMs).
- Servicing is messier: lifting servers out with hoists, fluid carry-out of 0.5–2 L per removal, and drip trays.
- Tanks weigh 2–4 t fully loaded and spread horizontally, so racks-per-m² can be worse than DLC racks for very dense GPU systems.
- At end of life, fluid must be disposed of or re-refined.

### 3. Two-phase immersion (and the two-phase DLC variant)

**How it works.** Servers sit in a sealed tank of low-boiling dielectric fluid. Chips boil the fluid, and the vapour condenses on a coil and rains back. Historically the fluids were 3M Novec 7000/649 and Fluorinert FC-72/3284 or Solvay Galden.

Vendors and trials: LiquidStack (DataTank). Microsoft ran a 48-server production rack at Quincy, Washington in 2021 with Wiwynn and reported 5–15% lower server power.

**Advantages**
- It has the highest heat-flux capability and the most uniform chip temperatures.
- Circulation is passive, so pumping energy is lowest.
- Vendor PUE claims are the best of the three (~1.02–1.05).
- It has very high tank densities: 252 kW per LiquidStack 48U tank, and Microsoft cites +500 kW potential.

**Drawbacks**
- **PFAS and supply.** Novec/Fluorinert are out of production. Most fluorinated replacements, including HFOs, remain within the EU restriction's chemical scope after RAC rejected the CF3-X exclusion.
- **Vapour loss and cost.** Vendor figures are 1–2% per year for well-designed tanks. Fluids cost an order of magnitude or more above hydrocarbons.
- **Open questions on replacements.** Chemours Opteon 2P50 has a 48.9 °C boiling point, GWP 10 (AR6), no flash point and a 200 ppm occupational exposure limit. Samsung has qualified it, and NTT Data/Hibiya Engineering ran a full-scale trial (March 2025), but Chemours still labels it "developmental".
- **Fading vendor commitment.** Uptime reports two-phase availability "significantly declined" after 3M's exit. LiquidStack added single-phase tanks and CDUs, and Trane announced its acquisition of the company on 10 February 2026, completing it on 3 March 2026. Trane's Holly Paeper described the portfolio as "LiquidStack's advanced high-density liquid, direct‑to‑chip, and immersion cooling solutions". LiquidStack says it will keep investing in both two-phase and single-phase, but its new products are DLC CDUs.

**Related variant: two-phase direct-to-chip.** ZutaCore HyperCool uses a refrigerant (e.g. Opteon SF33, HFO-1336mzz(Z), GWP 2) inside cold plates.
- It offers a 2,800 W GB200 cold plate.
- It needs ~0.3 L/min per kW of flow, about one-fifth of water DLC.
- SoftBank/Foxconn reported pPUE 1.03.
- It keeps water out of the server and uses litres, not tonnes, of fluid. However, it is still exposed to HFO/PFAS-scope risk in the EU.

## Use-Case Matrix

| Use case | Recommended | Why |
|---|---|---|
| AI training (GB200/GB300 NVL72, Vera Rubin) | **Water DLC, liquid-to-liquid CDU, W40–W45** | Only OEM-supported option; Rubin designed for 45 °C water; plan the RDHx/air path for the ~13% residual (HPE: 17 kW air on a GB200 NVL72) |
| Large-scale inference (NVL72, HGX B200/B300) | **Water DLC** | Same hardware as training; inference clusters run continuously, so warm-water dry cooling pays back fastest |
| Enterprise/edge inference (L4, L40S, RTX Pro, 10–40 kW racks) | **Air + RDHx, or liquid-to-air DLC sidecars**; single-phase immersion for sealed edge boxes | Low TDP; avoid facility water where none exists |
| HPC (CPU-dense, Xeon/EPYC) | **Water DLC (Lenovo Neptune, HPE Cray EX) or single-phase immersion** with Intel warranty rider | Both mature; DLC if vendor-integrated, immersion if you own the stack |
| Crypto mining | **Single-phase immersion** | Fan removal, overclocking, cheap fluids, no OEM warranty dependence |
| Telco/edge, harsh/dusty sites | **Single-phase immersion or sealed precision immersion (Iceotope)** | No room air, dust-proof, silent |
| Retrofit of an air hall | **Liquid-to-air sidecars for first racks; liquid-to-liquid DLC + RDHx at scale** | ~$2M/MW retrofit (STL); keeps existing floor and racks |
| Mixed fleets | **DLC + RDHx hybrid** | One water loop serves GPUs; RDHx handles storage, networking and legacy gear |
| Future 300–1,000 kW racks (Kyber 2027+) | **Water DLC at W45 now; keep space/pipe sizing for two-phase DLC** | NVIDIA's roadmap remains cold-plate based; two-phase DLC is the likeliest upgrade path |

## Buyer's Decision Tree and Checklist

1. **Is the hardware NVIDIA rack-scale (NVL72, Rubin, Kyber)?** If yes, choose water DLC and stop. Specify liquid-to-liquid CDUs with N+1 pumps, W45-capable facility water, and an RDHx/CRAH path for 15–20% residual heat.
2. **Do you own the hardware and warranty risk (crypto, in-house HPC, Intel Xeon with a certified fluid/tank)?** If yes, evaluate single-phase immersion. Insist on the Intel warranty rider or an OEM immersion warranty, a fluid analysis programme, and floor loading of at least 2–4 t per tank.
3. **Is the site constrained by dust, humidity or noise, or has no facility water (edge/telco)?** Consider single-phase immersion or precision immersion.
4. **Do you need >2.5 kW per chip within the asset life?** Pilot two-phase DLC. Do not deploy fluorinated two-phase immersion at scale before the EU PFAS decision (expected 2027) and before replacement-fluid warranties exist.
5. **Is it a retrofit?** Start with liquid-to-air sidecars for under ~5 racks. Above that, run facility water to the rows. Check slab and raised-floor capacity, pipe routes and leak detection under racks.
6. **Water check.** Choose heat rejection after choosing the cooling technology. Dry coolers suit sites at or below roughly W40 ambient-feasibility; adiabatic coolers cover peaks; avoid cooling towers where groundwater or municipal stress is high.
7. **Contract checklist.**
   - CDU capacity at your actual approach temperature.
   - Coolant chemistry specification (conductivity, inhibitors).
   - Leak detection and auto-isolation.
   - Quick-disconnect drip specification.
   - Warranty language covering liquid damage.
   - Fluid take-back and recycling at end of life.
   - Insurer sign-off.
   - For immersion: fluid flash point and fire classification under NFPA 75/76 and NFPA 30 combustible-liquid storage rules.

## India and Bengaluru Guidance

**Heat-rejection pairing.**
- **Bengaluru (elevation ~900 m, mild peaks).** Supports the Atlas's finding that W32 loops can run on adiabatic coolers and W40 fully dry all year. Our recommendation is DLC + dry coolers at W40 as the base design, with an adiabatic assist kit as insurance for heat waves. Atlas estimates are PUE ~1.12–1.15 and WUE ~0.05–0.25 L/kWh. Avoid cooling towers (WUE ~1.8 L/kWh) given the city's groundwater stress.
- **Mumbai and Chennai (humid coastal).** High wet-bulb temperatures limit adiabatic gains. Design W40–W45 dry coolers with a trim chiller or extra coil area. Rubin-class 45 °C water helps most here.
- **Delhi-NCR.** Summer peaks well above 45 °C mean dry coolers alone cannot hold W45 at peak. Plan adiabatic assist or trim chillers for a few hundred hours a year, and size for the highest-temperature W-class the IT vendor allows.

**Water.** Schneider Electric's India analysis (October 2026) shows a 1 MW IT load at WUE 1.5 L/kWh consumes about 11,169 kL a year. At ₹45–120/kL that costs ₹5–13.4 lakh. This is small next to electricity, but availability, permitting and reputational risk matter more than the tariff. The same analysis puts the value of a 0.2 PUE reduction at ₹1.04–1.64 crore per IT MW-year at ₹7–11/kWh (rising to ₹1.56–2.46 crore for a 0.3 reduction). Energy is therefore the dominant TCO lever, and liquid cooling's main financial case in India is power, not water. Note that water embedded in fluid manufacture and in electricity generation is not captured in on-site WUE. The Microsoft LCA's 31–52% "blue water" reductions include these upstream effects.

**Costs.**
- SBI (April 2026): ₹50–55 crore/MW for a Tier III air-cooled build, up to ₹75 crore/MW for AI/immersion/Tier IV builds, and ₹35–45 crore/MW at hyperscale.
- IMARC Engineering, a consultancy blog: ₹70–95 crore/MW for AI-ready liquid-integrated designs.
- Turner & Townsend's 2025 index (via Schneider): Mumbai at US$6.64/W, among the cheaper global markets.
- Treat the "7–10% DLC premium" from the earlier draft as unverified. Schneider's White Paper 282 found an immersion-cooled design at $6.98/W versus $7.02/W for air at equal 10 kW/rack density, falling to $6.33/W with 2× compaction. At equal density the premium can be near zero; at AI densities the comparison is really against "not possible with air".

**Supply chain and skills.**
- Schneider/Motivair's Bengaluru liquid-cooling factory, Johnson Controls' Silent-Aire CDU platform for India (late 2025), and Indian operators already deploying DLC (Sify, Yotta, CtrlS) make DLC the lowest-risk local choice.
- India also has a two-phase fluid supply angle. Chemours signed an agreement with Navin Fluorine in May 2025 to produce Opteon 2P50, providing "critical capabilities and capacity—beginning in 2026". Chemours CEO Denise Dignam said "next generation chips alone can't deliver the AI boom", and Chemours signed a joint development agreement on 2P50 with 2CRSi on 25 February 2026.
- India has no PFAS-class restriction comparable to the EU's. Exporters and multinationals serving EU customers, however, will face supply-chain PFAS questions.
- The skills gap is in water chemistry, CDU commissioning and leak response. Budget for training and for vendor resident engineers in the first year.

## Market Adoption and Outlook

- Uptime Institute's 2024 cooling survey (n=964): 22% of operators use DLC and 61% would consider it; nearly half of users have DLC on fewer than 10% of racks. The 2025 survey (n=1,033) again shows 22%.
- Uptime's 2025 data report characterises adoption as "slow and steady", with integration into existing infrastructure the main selection criterion.
- Dell'Oro's 8 January 2026 release expects the liquid-cooling market to approach ~$7 billion in manufacturer revenue by 2029, after roughly doubling to "close to $3 billion" in 2025. Research director Alex Cordovil: "Liquid cooling has crossed a critical threshold." Vertiv leads, followed by CoolIT, nVent and Boyd. Single-phase DLC is "scaling first", and two-phase DLC is expected to grow gradually.
- Market-research firms disagree widely on sizing (e.g. Mordor puts immersion fluids alone at $2.5 billion in 2025), so treat such figures as directional only.
- The outlook is speculative. TrendForce reports industry expectations that NVIDIA *may* embrace immersion after Rubin Ultra (2027–28), but this rests on unnamed sources and should not drive procurement today.

## Caveats and Where Sources Disagree

- **Heat capture on AI racks.** Figures range from Microsoft's "50–80% or more" for generic cold plates to vendor claims of ">90%" for Blackwell and Lenovo's measured 98–99%. Results depend on whether memory, VRMs, NICs and PSUs are cold-plated and on room temperature. Ask for measured capture at your inlet temperature.
- **Immersion PUE.** Values of 1.02–1.08 are mostly vendor-reported, partial (pPUE) figures. Independent comparisons such as Microsoft's LCA show a much smaller gap between cold plates and immersion than vendor PUE suggests.
- **Fluid prices disagree by up to 10×.** Fluorinated fluids are quoted at $45–90/L (secondary market), $80–200/L and $200–300/L; PAO at $12–20/L versus $50–100/L. Most come from vendor or consultancy blogs rather than audited data, so get quotes.
- **Capex per kW.** Online figures ($2,500–4,500/kW DLC premium; $4,300–6,800/kW immersion) come from low-transparency consultancy pages. STL Partners' $2M/MW retrofit figure (commissioned by Airedale, a cooling vendor) and Schneider WP282 are more traceable but are still vendor-linked.
- **The "300× water efficiency" claim.** NVIDIA's comparison is against air-cooled designs with evaporative towers. On-site water is determined by heat rejection, not by the chip cooling method.
- **Earlier draft corrections.**
  - Two-phase fluids boil at roughly 34–61 °C depending on fluid (Microsoft: 30–50 °C; 2P50 49 °C), not strictly 50–60 °C.
  - Single-phase immersion tank volume is commonly ~800–1,500 L, with 2–4 t loaded weight rather than 1.5–3 t.
  - DLC heat capture is 50–99%, not a flat 70–90%.
  - The 3M exit is confirmed complete.
- **Regulatory timing is fluid.** EU SEAC final opinion is due end-2026, then Commission decision and transition periods. US TSCA reporting has been delayed three times. State laws (e.g. Minnesota's reporting from 2026) vary.
- **Unverified in this research:** Honeywell HFO immersion fluid specifications, independent NREL/Sandia/LBNL measured immersion data, insurance premiums by technology, and Indian ₹/MW figures specific to each cooling type. These should be confirmed before final Atlas publication.

## Sources

1. leviathansystems — https://www.leviathansystems.co/blog/liquid-cooling-gpu-data-centers
2. alibaba — https://electronics.alibaba.com/buyingguides/nvidia-data-center-cooling-guide-2026
3. datacenterdynamics — https://www.datacenterdynamics.com/en/news/microsoft-study-finds-liquid-cooling-can-cut-data-center-emissions-by-up-to-21/
4. esgnews — https://esgnews.com/microsoft-nature-study-reveals-full-life-cycle-impacts-of-datacenter-cooling-technologies/
5. datacentremagazine — https://datacentremagazine.com/articles/microsoft-the-environmental-impact-of-data-centre-cooling
6. nature — https://nature.com/articles/s41586-025-08832-3
7. lenovo — https://lenovopress.lenovo.com/lp1602-thinksystem-sd650-i-v3-server
8. microsoft — https://news.microsoft.com/source/features/sustainability/microsoft-quantifies-environmental-impacts-of-datacenter-cooling-from-cradle-to-grave-in-new-nature-study/
9. trendforce — https://www.trendforce.com/news/2025/08/19/news-nvidias-rubin-ultra-expected-to-adopt-immersion-cooling-market-likely-to-take-off-between-2027-28/
10. intel — https://www.intel.com/content/www/us/en/customer-spotlight/stories/shell-customer-story.html
11. semiwiki — https://semiwiki.com/forum/threads/intel-and-shell-advance-immersion-cooling-in-xeon-based-data-centers.22804/
12. 3m — https://www.3m.com/3M/en_US/pfas-stewardship/uses-applications/
13. certivo — https://www.certivo.com/blog-details/eu-pfas-restriction-under-reach-2026-echa-consultation-update
14. jdsupra — https://www.jdsupra.com/legalnews/europe-s-pfas-restriction-proposal-is-8942527/
15. cliffordchance — https://www.cliffordchance.com/briefings/2026/05/epa-further-delays-tsca-pfas-reporting-period-key-consideration.html
16. apaengineering — https://apaengineering.com/compliance-news/epa-adjusts-pfas-reporting-deadlines-under-tsca
17. TechCrunch — https://techcrunch.com/snippet/3080059/nvidias-new-ai-system-is-much-easier-to-cool/
18. NBC News — https://www.nbcnews.com/business/markets/nvidia-vera-rubin-chip-warning-ai-investing-boom-rcna252679
19. coolitsystems — https://www.coolitsystems.com/resources/news/warm-water-cooling-and-ai-the-future-is-here-but-its-not-chiller-free/
20. stlpartners — https://stlpartners.com/press/liquid-cooling-retrofits-can-cost-roughly-80-less/
21. datacentrereview — https://datacentrereview.com/2026/06/liquid-cooling-retrofits-could-cut-ai-data-centre-upgrade-costs-by-around-80/
22. bank — https://sbi.bank.in/documents/57189647/58231607/Sector+Report+DataCentre.pdf/f1919592-ee66-b50b-ea20-75fbb27c9bb5?t=1779885206866
23. lenovo — https://lenovopress.lenovo.com/datasheet/ds0187-lenovo-thinksystem-n1380-neptune
24. steadfastoperations — https://www.steadfastoperations.com/blog/should-you-retrofit-your-data-center-for-closed-loop-liquid-cooling
25. datacenterscope — https://datacenterscope.com/ai-infrastructure/data-center-retrofit-cost/
26. datacentremagazine — https://datacentremagazine.com/news/lenovo-neptune-is-warm-water-data-centre-cooling-the-future
27. hpcwire — https://www.hpcwire.com/off-the-wire/lenovo-expands-neptune-liquid-cooling-to-advance-sustainable-ai-infrastructure/
28. prnewswire — https://www.prnewswire.com/news-releases/data-center-liquid-cooling-market-to-approach-7-billion-by-2029-as-ai-deployments-accelerate-according-to-delloro-group-302655848.html
29. alliancechemical — https://alliancechemical.com/blogs/articles/post-novec-immersion-fluid-alternatives-2026
30. twinoils — https://industrialfluidsmfg.twinoils.com/Asset/Shell%20Immersion%20Cooling%20Fluid%20S5%20X.pdf
31. alliancechemical — https://alliancechemical.com/blogs/articles/two-phase-vs-single-phase-cooling-fluid-selection
32. uptimeinstitute — https://intelligence.uptimeinstitute.com/resource/ai-and-cooling-methods-and-capacities
33. alliancechemical — https://alliancechemical.com/blogs/articles/direct-to-chip-vs-immersion-cooling-fluid-types
34. Wikipedia — https://en.wikipedia.org/wiki/Immersion_cooling
35. techradar — https://www.techradar.com/news/microsoft-is-drenching-its-azure-servers-to-boost-performance
36. datacenterdynamics — https://www.datacenterdynamics.com/en/news/microsoft-partners-with-wiwynn-to-test-two-phase-immersion-cooling-in-production-deployment/
37. uspto — https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/12114465
38. datacenterfrontier — https://www.datacenterfrontier.com/cooling/article/11428289/microsoft8217s-belady-on-immersion-8216air-cooling-is-not-enough8217
39. wiwynn — https://www.wiwynn.com/news/in-the-news/to-cool-datacenter-servers-microsoft-turns-to-boiling-liquid
40. coolingpost — https://www.coolingpost.com/world-news/microsoft-trials-two-phase-immersion-cooling/
41. gigabyte — https://www.gigabyte.com/Solutions/liquidstack-two-phase
42. liquidstack — https://liquidstack.com/content/uploads/2021/02/LQS_Data-Sheet-Template-48U_03102021.pdf
43. besttechnologyinc — https://www.besttechnologyinc.com/3m-novec-engineered-fluids-solvents/3m-novec-hfe-engineered-fluids-replacements-and-pfas-phase-out/
44. facilitiesdive — https://www.facilitiesdive.com/news/dual-phase-immersion-cooling-can-lower-future-cost-of-ownership-in-most-cas/715361/
45. servnetuk — https://www.servnetuk.com/learn/immersion-cooling-explained
46. opteon — https://www.opteon.com/en/-/media/files/opteon/opteon-2p50-gic-product-info-sheet-fnl-100523.pdf?rev=97280bc88a2c4f698d3ec07551a6ac01
47. coolingpost — https://www.coolingpost.com/world-news/chemours-signs-2-pic-deal-with-server-manufacturer/
48. coolingpost — https://www.coolingpost.com/world-news/chemours-trials-immersion-cooling-fluid/
49. secondwatt — https://secondwatt.com/equipment/liquid-cooling/zutacore-hypercool
50. zutacore — https://blog.zutacore.com/press-releases/nvidia-gb200-press-release
51. counterpointresearch — https://counterpointresearch.com/en/insights/AI-Data-Centers-Zutacore-In-Pole-Position-To-Benefit-From-Transition-To-Two-Phase-Cooling
52. linkedin — https://www.linkedin.com/pulse/zutacore-hypercool-waterless-liquid-cooling-sustainable-ai-0zdie
53. parker — https://www.parker.com/content/dam/parker/fcg/group/data-centers/Parker%20Data%20Center%20Cooling%20White%20Paper.pdf
54. stlpartners — https://stlpartners.com/research/evolution-of-liquid-cooling/
55. se — https://blog.se.com/datacenter/2026/10/15/liquid-cooling-costs-in-india-power-tariffs-water-charges-and-capex/
56. imarcengineering — https://www.imarcengineering.com/blog/data-center-development-in-india
57. se — https://blog.se.com/?p=64321
58. barchart — https://www.barchart.com/story/news/37181109/india-data-center-market-size-to-reach-usd-21-03-bn-by-2031-growth-concentrated-in-mumbai-noida-chennai-and-bengaluru-arizton
59. uptimeinstitute — https://datacenter.uptimeinstitute.com/rs/711-RIA-145/images/2024.Cooling.Survey.Report.pdf?version=3&mkt_tok=NzExLVJJQS0xNDUAAAGT7PRR0KuLmMWcCq8tWI21qXB7omLvlzWkBrppTAcUCjbXIkzkaOxnWxRQ-ZovhNiIkKVF7w9cDt_um8_iglJ8UIxr8dE0NsyiG0wpj3cL2A
60. uptimeinstitute — https://intelligence.uptimeinstitute.com/resource/uptime-institute-cooling-systems-survey-2024-direct-liquid-cooling
61. dober — https://www.dober.com/direct-to-chip-cooling
62. uptimeinstitute — https://intelligence.uptimeinstitute.com/resource/dlc-adoption-remains-slow-and-steady
63. mordorintelligence — https://www.mordorintelligence.com/industry-reports/immersion-cooling-fluids-market
64. introl — https://introl.com/blog/immersion-cooling-roi-calculator-2-year-payback
65. dataintelo — https://dataintelo.com/report/immersion-cooling-fluid-market
66. techinfrahub — https://techinfrahub.com/data-center-cooling-retrofit-costs-crac-crah-liquid-cooling-2026/
67. energy-solutions — https://energy-solutions.co/articles/sub/data-center-cooling-liquid-immersion-vs-air
68. drpranayjha — https://drpranayjha.com/nvidia-gpu-power-cooling-liquid-density/
69. nvidia — https://blogs.nvidia.com/blog/blackwell-platform-water-efficiency-liquid-cooling-data-centers-ai-factories
70. europa — https://echa.europa.eu/-/echa-to-consult-on-pfas-draft-opinion-in-spring-2026
71. crowell — https://www.crowell.com/en/insights/client-alerts/epa-pushes-pfas-reporting-to-april-2026what-companies-need-to-know
72. isienvironmental — https://isienvironmental.com/blog/tsca-pfas-reporting-deadline-january-2027-manufacturers/
