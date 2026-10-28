<!-- Report 3 of the India Data Centre Atlas research series (Every cooling type, what it costs, what India should build; atlas chapter 4). Produced with AI-assisted web research, October 2026, and kept as written at the time. Some figures were corrected later (notably India grid water 4.5 → 2.9 L/kWh and grid CO₂ 0.71 → 0.675 t/MWh, October 2026); the atlas standards register (src/data/standards.js) is authoritative where they differ. -->

# Data Centre Cooling: Every Type, How It Works, What It Costs, and What India Should Build (October 2026)

**Bottom line:** Air cooling is still the most common method in the installed base. But it stops being practical somewhere around 20–40 kW per rack, and new AI capacity is now designed around single-phase direct-to-chip (DLC) liquid cooling. Nvidia's GB200 and GB300 racks are already 90%+ liquid-cooled. Its Vera Rubin generation (2026) and 600 kW Kyber racks (2027) assume 100% liquid cooling with 45°C supply water. For India, the best default for AI halls is warm-water DLC rejecting heat through dry or adiabatic coolers, with evaporative towers kept as a summer peak-shaving option. Air plus economisers remains right for low-density enterprise and cloud halls, especially in Bengaluru and Hyderabad.

## TL;DR
- **Air cooling has hit its density limit for AI; liquid has taken over new AI capacity.** H100 (700 W) to B200 (1,000 W) to B300 (1,400 W) to Rubin (an estimated 1,800–2,300 W) pushes racks from about 40 kW to 120–230 kW, and toward 600 kW to 1 MW. Single-phase cold-plate DLC is the dominant architecture. Dell'Oro (8 January 2026) expects liquid cooling manufacturer revenue "to roughly double in 2025, reaching close to $3 billion in revenue, before continuing to scale toward approximately $7 billion by 2029." Immersion and two-phase cooling remain niche.
- **Cooling is a water-versus-energy trade, not a free lunch.** Evaporative towers cut summer peak cooling power by 25–35% compared with dry cooling (arXiv 2606.21760) but consume about 1–4 L/kWh. Dry coolers use almost no water but cost more energy in hot weather. Warm-water liquid cooling (W32–W45) narrows the gap because 35–45°C coolant can be rejected to ambient air for most of the year, even in much of India.
- **For India:** use DLC plus dry or adiabatic heat rejection for AI loads; seawater or recycled water for coastal hyperscale campuses such as Mumbai, Chennai and Vizag; and air with indirect evaporative or economiser cooling for low-density halls in Bengaluru and Hyderabad. Plan now for the HFC freeze in 2028, MeitY's PUE <1.35 tender norm, and growing water scrutiny.

---

## 1. Fundamentals

### 1.1 Why cooling is needed
Almost all electrical energy delivered to IT equipment becomes heat. A 100 MW IT load is a 100 MW heater that must be cooled continuously. Silicon junction temperatures typically need to stay below about 85–105°C, and the problem is heat flux (W/cm²), not just total watts.

**Accelerator power trend (per GPU):**

| GPU | Year | Max TDP | Cooling implication |
|---|---|---|---|
| Nvidia H100 SXM | 2022–23 | 700 W | Air-coolable (HGX); DLC optional |
| Nvidia B200 | 2024–25 | 1,000 W (up to ~1,200 W in GB200 configurations) | Air HGX options exist; GB200 NVL72 rack is liquid |
| Nvidia B300 (Blackwell Ultra) | H2 2025 | 1,400 W (liquid bin); 1,100 W air bin | GB300 NVL72 requires DLC; DGX B300 has an air-cooled 14.5 kW variant |
| Nvidia Rubin (Vera Rubin NVL72/NVL144) | H2 2026 | ~1,800–2,300 W (industry estimates; not formally confirmed) | 100% liquid; 45°C inlet water |
| Rubin Ultra (Kyber NVL576) | H2 2027 | — | ~600 kW per rack, 100% liquid, no fans, 800 VDC |
| Leading GPUs (Dell'Oro projection) | 2029 | >4,000 W | Two-phase or embedded cooling likely needed |

Rack-level consequences: the GB200 NVL72 is about 120–132 kW. The GB300 NVL72 is about 130–150 kW. Vera Rubin NVL72 racks are widely estimated at 190–230 kW. Nvidia's Charlie Boyle said "GB200 & 300 are like 90 plus percent liquid-cooled… The Kyber rack design is 100 percent liquid cooling, no fans." The Kyber rack also needs a sidecar for power and cooling, so it takes two racks' worth of floor space.

### 1.2 Heat transfer properties: why liquid wins
Heat removed is Q = ṁ·cp·ΔT. What matters is how much heat a given volume of fluid can carry per degree of temperature rise. The values below are standard engineering values at about 25°C.

| Fluid | Specific heat (kJ/kg·K) | Density (kg/m³) | Volumetric heat capacity (kJ/m³·K) | Relative to air | Notes |
|---|---|---|---|---|---|
| Air | ~1.0 | ~1.2 | ~1.2 | 1× | Low thermal conductivity (~0.026 W/m·K) |
| Water | ~4.18 | ~1,000 | ~4,180 | ~3,500× | Conductivity ~0.6 W/m·K; conductive and corrosive, so loops must be sealed and treated |
| PG25 (25% propylene glycol) | ~3.9 | ~1,020 | ~4,000 | ~3,300× | Standard technology cooling system (TCS) fluid for cold plates; biocide and freeze protection |
| Synthetic or hydrocarbon dielectric oil (single-phase immersion) | ~1.9–2.3 | ~800–850 | ~1,600–1,900 | ~1,400× | Higher viscosity means slower convection |
| Fluorocarbon or HFO dielectric (two-phase) | ~1.1–1.3 | ~1,400–1,700 | ~1,700–2,000 (sensible) | — | Boiling absorbs latent heat (~90–140 kJ/kg); heat transfer coefficient 5–10× single-phase |

In practice, moving 100 kW of heat with a 10 K temperature rise takes about 8 m³/s of air, but only about 2.4 L/s of water. That is why fan power, white space and air-handler size all collapse once heat is captured in liquid at the chip.

### 1.3 ASHRAE TC 9.9 thermal guidelines (5th edition, 2021)
**Air-cooled classes (IT inlet air):**

| Class | Recommended | Allowable dry-bulb | Typical use |
|---|---|---|---|
| A1 | 18–27°C | 15–32°C | Enterprise and mission-critical |
| A2 | 18–27°C | 10–35°C | Volume servers |
| A3 | 18–27°C | 5–40°C | Extended-range, chillerless designs |
| A4 | 18–27°C | 5–45°C | Extreme economisation |
| **H1 (high-density)** | **18–22°C** | **15–25°C** | Tightly integrated, high-power air-cooled systems that cannot meet A2 |

H1 matters because it runs against two decades of "raise the setpoint" efficiency gains. Uptime Institute warned that H1 "challenge[s] the efficiency drive": dense air-cooled AI gear needs colder air, which reduces economiser hours. ASHRAE recommends keeping H1 equipment in separately controlled zones. One secondary source lists the H1 allowable range as 5–25°C; ASHRAE's own white paper gives 15–25°C, and this report uses that figure.

**Liquid-cooling W classes (facility water supply temperature):** the 5th edition renamed W1–W5 by their upper temperature limit. All classes share a 2°C lower bound.

| Class (old name) | Facility water supply | Typical heat rejection |
|---|---|---|
| W17 (W1) | 2–17°C | Chillers, with economiser assist |
| W27 (W2) | 2–27°C | Chillers with large economiser share |
| W32 (W3) | 2–32°C | Cooling towers or dry coolers; chillers for trim |
| W40 (new) | 2–40°C | Mostly chiller-free |
| W45 (W4) | 2–45°C | "Typically operated without chillers": dry coolers year-round in most climates |
| W+ (W5) | >45°C | Heat reuse and district heating |

Nvidia's third-generation MGX racks (Vera Rubin) are "universally designed to operate with 45°C (113°F) warm-water inlet temperatures." At CES 2026, Jensen Huang said, "With 45 degrees C, no water chillers are necessary." That is effectively a W45 design point. In practice, chillers are still often kept for resilience and for mixed air and liquid halls.

### 1.4 The cooling chain: chip to atmosphere

**Diagram in words: a modern liquid-cooled AI hall**

```
[GPU/CPU die] → TIM → [cold plate] 
      ↓ (TCS loop: PG25 / treated water, ~30–45°C supply, ~40–55°C return)
[Rack manifold + quick disconnects (UQD)] 
      ↓
[CDU: pumps, filters, plate heat exchanger, controls]  ← boundary between IT loop and facility
      ↓ (FWS: facility water, W32–W45)
[Facility pipework / headers]
      ↓
[Heat rejection: dry cooler | adiabatic dry cooler | cooling tower | chiller (trim) | heat-reuse HX]
      ↓
[Atmosphere / district heating network / seawater]

Parallel residual path (~10–30% of heat): memory, NICs, PSUs, drives → air → 
CRAH / fan wall / RDHx → chilled water → same plant.
```

- **TCS (technology cooling system):** the secondary loop that touches IT equipment, made up of cold plates, manifolds and hoses. It must be very clean (filtered to around 25–50 µm), chemically controlled, and built from compatible wetted materials.
- **FWS (facility water system):** the primary building loop connecting CDUs to heat rejection.
- **CDU (coolant distribution unit):** isolates the two loops, controls TCS supply temperature, flow and pressure, and handles leak and pressure alarms. It can be liquid-to-liquid (L2L, connected to FWS) or liquid-to-air (L2A, rejecting heat into room air through a coil, as in AWS's IRHX or Meta's AALC).
- **Heat rejection:** the final stage that moves heat to the atmosphere, a water body, or a heat user.

**Diagram in words: a classic air-cooled chilled-water hall**

```
Server fans → hot aisle (35–45°C) → CRAH coil (chilled water 7–18°C) → cold aisle/plenum (18–27°C) → servers
CRAH chilled water → chiller evaporator → compressor → condenser → cooling tower (evaporative) or air-cooled condenser → atmosphere
(Economiser bypasses the compressor when outdoor conditions allow)
```

### 1.5 Key metrics

| Metric | Definition | Typical values / notes |
|---|---|---|
| PUE | Total facility energy ÷ IT energy | Legacy air: 1.5–1.8; good modern air with economisers: 1.2–1.4; DLC: 1.05–1.2; immersion: ~1.03–1.08 (vendor-reported). The SBI report says cooling "can account for up to 40 percent of total energy usage" in Indian facilities. |
| pPUE (partial PUE) | (IT + subsystem energy) ÷ IT energy for one subsystem | A cooling pPUE of 1.05–1.15 is excellent |
| WUE | Annual site water (L) ÷ IT energy (kWh) | 0 (dry) to more than 2 L/kWh (fully evaporative); US average 1.8 L/kWh (LBNL, Shehabi et al., 2016) |
| kW per rack | Cooling capacity delivered per rack | Uptime 2025: average modal density ~9 kW (up from 8.3 kW); AI racks 40–230 kW, heading to 600 kW+ |
| ΔT | Temperature rise across a coil, server or loop | Air: 10–20 K; TCS: ~10 K. Bigger ΔT means less flow and less pump or fan energy. |
| Approach temperature | Gap between leaving fluid and its heat sink | Towers: 3–5 K over wet-bulb; dry coolers: 5–10 K over dry-bulb; CDU HX: 2–4 K |
| Chiller COP / kW per ton | Cooling output ÷ electrical input; 1 ton = 3.517 kW | Water-cooled centrifugal: ~0.5–0.6 kW/ton (COP ~6–7); air-cooled screw: ~1.0–1.2 kW/ton (COP ~3) |
| IPLV / NPLV | Weighted part-load efficiency (100/75/50/25% load) | Matters because data centre chillers rarely run at full load. India's ECBC data-centre guidance cites, for example, centrifugal chillers ≥1,580 kWr at COP 6.3 and IPLV 7.0. |

---

## 2. Air cooling types

### 2.1 Room-level units
- **CRAC (computer room air conditioner):** a self-contained direct-expansion (DX) refrigeration unit with an outdoor condenser. Simple and modular, with no chilled-water plant, but less efficient at scale. Common in small Indian enterprise and edge rooms.
- **CRAH (computer room air handler):** a coil plus fans fed by a central chilled-water plant. Better efficiency at scale, and pairs with economisers. The workhorse of Indian colocation.
- **Raised floor versus slab:** raised floors deliver cold air through perforated tiles but suffer from obstructions and bypass air, and struggle beyond ~5–8 kW/rack. Modern builds favour slab floors with flooded-room or ducted supply, fan walls and overhead routing. Slab floors also handle the 1.5–2.5+ tonne weight of liquid-cooled AI racks better.

### 2.2 Airflow management
- **Hot aisle/cold aisle:** racks face each other front-to-front, so cold aisles and hot aisles alternate. This is the minimum standard.
- **Cold aisle containment (CAC):** encloses the cold aisle. Cheaper to retrofit; the rest of the room runs hot.
- **Hot aisle containment (HAC):** encloses the hot aisle and ducts it to the return plenum. Return temperatures are higher, which raises coil and economiser efficiency. Generally preferred for new builds; Nvidia's reference designs use HAC.
- **In-row coolers:** CRAH or DX units placed between racks. Good for pockets of 15–30 kW per rack.
- **Overhead cooling:** coils above the racks. Saves floor space.
- **Fan walls:** large arrays of EC fans feeding a flooded cold aisle. Common in hyperscale slab designs; scalable to ~20–30 kW/rack averages.

### 2.3 Rear-door heat exchangers (RDHx)
A water coil mounted on the rack's rear door neutralises exhaust heat before it enters the room.
- **Passive RDHx:** relies on the servers' own fans. Typically ~15–30 kW per rack.
- **Active RDHx:** adds fans to the door. Typically ~40–75 kW per rack. Yotta reports RDHx "manage rack densities of up to 50–60 kW."
RDHx is the bridge technology. It brings water to the rack without touching servers, and it pairs with DLC to capture the 10–30% of heat that cold plates miss.

### 2.4 Economisers ("free cooling")
- **Direct airside:** filtered outside air goes straight into the hall. Unsuitable for most Indian cities because of humidity, heat, dust and pollution.
- **Indirect airside:** outside air cools hall air through a heat exchanger without mixing. Examples are the **KyotoCooling** rotary heat wheel and **indirect evaporative coolers (IEC)** from Munters, Stulz, Vertiv and Airedale. IEC is a strong option for Bengaluru, Hyderabad, Delhi and Pune during dry seasons.
- **Waterside:** when ambient conditions allow, towers or dry coolers produce chilled water directly (plate HX bypass) or a free-cooling chiller runs its integrated coils. Each degree of higher chilled-water temperature adds economiser hours.

### 2.5 Evaporative and adiabatic cooling
- **Direct evaporative:** air passes over wetted media, and the dry-bulb temperature drops toward wet-bulb.
- **Adiabatic pre-cooling:** water is sprayed or wetted onto pads in front of dry-cooler or condenser coils, only on hot hours.
Both trade water for energy (see Section 7). They work well in hot-dry climates like Delhi and Hyderabad in April–May, and poorly in humid coastal monsoons, when Mumbai wet-bulb temperatures can approach 28–32°C.

### 2.6 Limits of air cooling
- Practical limits: about 15–20 kW per rack with standard raised-floor CRAH; 20–40 kW with containment, fan walls or in-row units; ~40–75 kW with active RDHx. One industry analysis puts the practical ceiling for air at ~41 kW per rack. Dell'Oro describes air as having "historically supported rack densities up to 20 kW/rack."
- The SBI sector report (April 2026) says Indian legacy air cooling is "approaching their physical limits, particularly beyond 15 kW per rack."
- Above ~30 kW, fan power inside servers and air handlers becomes a large overhead. The ASHRAE H1 class also forces cooler air, which reduces economiser hours.

---

## 3. Chilled-water plants and heat rejection

### 3.1 Chiller types

| Type | Compressor | Size range | Typical full-load efficiency | Notes |
|---|---|---|---|---|
| Air-cooled scroll | Scroll | 50–500 kW | ~1.1–1.3 kW/ton | Small sites, edge |
| Air-cooled screw | Screw | 300–2,000 kW | ~1.0–1.2 kW/ton | No tower water; often with integrated free-cooling coils |
| Water-cooled screw | Screw | 500–3,500 kW | ~0.6–0.7 kW/ton | Needs towers |
| Water-cooled centrifugal | Centrifugal | 1,000–10,000+ kW | ~0.5–0.6 kW/ton | Best at scale |
| Magnetic-bearing centrifugal (e.g., Danfoss Turbocor compressors) | Oil-free, variable speed | 300–5,000 kW | Full load ~0.55; IPLV can approach ~0.3–0.35 kW/ton | Excellent part-load efficiency and low maintenance |
| Free-cooling chillers | Any, plus integrated dry coils | — | Compressors off when ambient is ~8–10 K below return water | Very effective at higher water temperatures |

Values are typical industry ranges and vary with lift and rating conditions.

**Which to choose:** water-cooled plants are most efficient but consume tower water. Air-cooled plants use no water but more energy. The SBI report notes Indian operators "transitioning to dry-mode chillers, closed-loop liquid systems, and on-site tertiary treatment units."

### 3.2 Heat rejection equipment
- **Open-circuit cooling towers:** lowest approach (to wet-bulb) and highest water use from evaporation, drift and blowdown. Carries Legionella and water-treatment burden.
- **Closed-circuit fluid coolers:** the process fluid stays in a coil while spray water evaporates over it.
- **Dry coolers:** finned coils and fans. Zero water; limited on hot days.
- **Adiabatic dry coolers:** dry coolers with pads or sprays that switch on only above a set ambient temperature.
- **Hybrid coolers:** switch between wet and dry modes. A 24-month NREL trial of a thermosyphon cooler hybrid cut on-site WUE from 1.27 to 0.70 L/kWh (~50% less water) "without degrading energy performance."
- **Seawater, lake or river once-through:** discussed in Section 5.

### 3.3 Thermal energy storage (TES)
Chilled-water or ice tanks provide ride-through during chiller restarts (typically 5–15 minutes for Tier III/IV). They can also shift chiller load to cheaper or cooler night hours, which is useful under Indian time-of-day tariffs.

### 3.4 Refrigerants and the HFC phase-down
- **Kigali Amendment (2016)** to the Montreal Protocol: phases down hydrofluorocarbons by 80–85% by the late 2040s.
- **India (Article 5 Group 2; ratified 2021):** baseline is the average HFC use in 2024–2026 plus 65% of the HCFC baseline. Production and consumption **freeze on 1 January 2028**, then reduce by **10% by 2032, 20% by 2037, 30% by 2042 and 85% by 2047**. A 2026 government direction stops environmental clearances for new HFC production capacity beyond 31 December 2027. NRDC India estimates India's baseline at about 72–73 MtCO₂e.
- **Low-GWP alternatives in data-centre chillers:** R-1234ze (GWP <1, A2L) in centrifugal and magnetic-bearing chillers; R-513A (GWP ~630, non-flammable) as a path from R-134a; R-32 (GWP ~675) in DX units; R-1233zd in low-pressure centrifugals; and natural refrigerants (propane, ammonia, CO₂).
- **India Cooling Action Plan (ICAP, 2019):** a 20-year plan targeting a 20–25% cut in cooling demand, a 25–30% cut in refrigerant demand and a 25–40% cut in cooling energy by 2037–38. Data centres are not a named sector, but chiller and refrigerant policy affects them directly.
- **What it means:** the freeze could raise R-32 and R-134a prices after 2028. Specify low-GWP refrigerants now. Liquid cooling designs that eliminate compressors entirely (W40/W45 with dry coolers) are the most future-proof refrigerant strategy.

---

## 4. Liquid cooling types

### 4.1 Single-phase direct-to-chip (cold plate)

**How it works:** copper micro-channel cold plates sit on the GPUs, CPUs, switch ASICs and sometimes the memory and VRMs. Coolant (usually PG25 or treated water) absorbs heat as sensible heat (typically a ~10 K rise), returns via rack manifolds to a CDU, and the CDU passes the heat to facility water or room air.

**Components:**
- **CDUs:** in-rack (~20–100 kW) or in-row (~500 kW–2.5 MW+). LiquidStack's CDU 2.X delivers up to 3,750 L/min at 3.5 bar, and its GigaModular platform scales to 14 MW. L2L CDUs need facility water; L2A CDUs reject heat to room air and suit retrofits. Dell'Oro counts about 40 CDU vendors, a sign of a crowded segment heading for consolidation.
- **Manifolds and quick disconnects:** vertical rack manifolds and dripless blind-mate or UQD couplings (Nvidia MGX uses UQD08 manifolds). Third-generation MGX racks are "cable-free, hose-free, fanless" compute trays with liquid-cooled busbars up to 5,000 A.
- **Leak detection:** rope or point sensors in trays and under racks, plus pressure-decay and flow monitoring in CDUs. Negative-pressure TCS designs draw air in rather than spilling coolant if a leak occurs.
- **Share of heat captured:** about 70–80% on typical servers, about 85–90%+ on GB200/GB300 NVL72, and up to 98% claimed by Supermicro's DLC-2. Kyber is designed for 100%. The remaining heat needs air cooling.

**Why it dominates:** it uses standard server form factors and service models, works at W32–W45, and scales to 200 kW+ per rack. Dell'Oro says "single-phase direct liquid cooling is expected to remain the prevailing architecture for most deployments through the end of the decade." In Uptime's vendor survey, 48% rated water-cooled cold plates as currently viable, the highest of any liquid approach.

**Drawbacks:** two cooling systems to operate (liquid plus residual air), fluid chemistry management, leak risk, and supply-chain dependence on specific cold plates and QDs.

### 4.2 Two-phase direct-to-chip
A dielectric refrigerant boils inside the cold plate, and latent heat removes very high heat flux at near-constant temperature. Vendors include ZutaCore (HyperCool, a waterless dielectric design) and Accelsius (NeuCool).
- **Pros:** handles extreme hotspots, and a leak of non-conductive fluid is benign to electronics.
- **Cons:** fluid cost and regulation (fluorinated chemistries face PFAS and F-gas scrutiny), pressure-rated plumbing, and a smaller service ecosystem.
- **Outlook:** Dell'Oro expects two-phase DLC "to expand gradually, with adoption accelerating once chip-level TDPs and thermal flux exceed the practical limits of single-phase systems." That is plausible with 2,000–4,000 W GPUs after 2027.

### 4.3 Single-phase immersion
Servers sit vertically in tanks of dielectric fluid (synthetic hydrocarbon, PAO oils or esters), pumped through a heat exchanger to facility water. Vendors include GRC, Submer, LiquidStack, Asperitas and Iceotope (chassis-level precision immersion).
- **Pros:** captures about 100% of heat, removes server fans, PUE ~1.03–1.08 is reported, quiet, and dust- and humidity-proof. The dust and humidity protection is attractive for Indian edge sites.
- **Cons:** horizontal tanks reduce floor density; tanks are heavy; servicing is messy; fluid costs; OEM warranty support is improving but not universal; and some optics and connectors are incompatible. Dell'Oro says immersion "is finding its place through selective adoption." In Uptime's vendor survey only about a third rated immersion viable, and 24% rated two-phase immersion viable.
- **India example:** NTT deployed liquid immersion plus direct contact liquid cooling at Navi Mumbai NAV1 (January 2023), described as "APAC's largest… capacity of 4.8 MW spread over 13,740 square feet," and claimed it was "up to 30% more energy efficient than conventional cooling."

### 4.4 Two-phase immersion
Servers sit in sealed tanks of low-boiling fluid (~34–61°C). The fluid boils on hot components, vapour condenses on a lid coil, and drips back.
- **Pros:** the highest heat-transfer coefficients and very low PUE (~1.01–1.03 claimed).
- **Cons and the PFAS shock:** the market was built on 3M Novec and Fluorinert. **3M exited PFAS manufacturing at the end of 2025.** The last order date for Novec was 31 March 2025, and 3M's annual report states it "completed its exit of PFAS manufacturing at the end of 2025." Alternatives include **Chemours Opteon 2P50**, an HFO-based fluid (GWP ≈10, boiling point ~49°C) trialled with LiquidStack and NTT. All face tightening EU PFAS restrictions and US state laws.
- **Verdict:** a niche for extreme density or HPC. Not a mainstream bet in 2026. LiquidStack, the best-known two-phase immersion vendor and now owned by Trane, sells DLC CDUs as its volume product.

### 4.5 Rear-door heat exchangers as hybrid
RDHx is commonly combined with DLC to capture the residual air heat. Meta's **air-assisted liquid cooling (AALC)** reverses the idea: cold plates feed a closed loop that dumps heat into room air through a rear-door coil, driven by a reservoir and pumping unit (RPU) in an adjacent rack. That lets Meta run liquid-cooled GPUs in air-cooled halls without facility water piping.

### 4.6 Emerging: spray, jet impingement, microfluidic and embedded cooling
- **Spray or jet impingement:** jets of coolant hit the die or lid directly, giving very high local heat-transfer coefficients.
- **Microsoft microfluidics (announced 23 September 2025, with Swiss start-up Corintis):** channels etched into the back of the silicon, with AI-optimised, leaf-vein-like layouts that target hotspots. Lab tests showed heat removal "up to three times better than cold plates" (workload-dependent) and "a 65% reduction in maximum temperature rise of the silicon inside a GPU." Microsoft also claims it dissipates more than 1 kW/cm², 2–3× standard cold plates. **Caveat:** this is lab-scale, and Network World quoted analysts warning that "chip replacement [becomes] the only maintenance option."
- **Embedded and 3D-stack cooling:** necessary if 3D-stacked logic and HBM become mainstream. Expect commercial use around 2028–2030 at the earliest.

### 4.7 Liquid cooling comparison

| Attribute | Single-phase DLC | Two-phase DLC | Single-phase immersion | Two-phase immersion | RDHx (active) |
|---|---|---|---|---|---|
| Practical rack density | 50–250 kW+ (with air assist) | 100–300 kW+ | 100–250 kW per tank | 200 kW+ per tank | 40–75 kW |
| Heat to liquid | 70–98% | 70–95% | ~100% | ~100% | 100% at the door (air-side) |
| Facility water class | W32–W45 | W32–W45 | W32–W45 | W32–W45 | W17–W27 (needs colder water) |
| PUE (reported range) | 1.05–1.20 | 1.04–1.15 | 1.03–1.08 | 1.01–1.05 | 1.15–1.35 |
| Fluid | PG25 / water (cheap) | Dielectric refrigerant ($$) | Hydrocarbon or synthetic oil ($–$$) | Fluorocarbon or HFO ($$$) | Water |
| Serviceability | Server-like; QDs | Server-like; pressurised | Lift-out, drain | Sealed tank | Easy |
| Weight / floor | Heavy racks (1.5–3 t) | Heavy racks | Heavy tanks, low floor density | Heavy tanks | Moderate |
| OEM support / warranty | Mainstream (Nvidia reference) | Emerging | Improving; check per OEM | Limited | Mainstream |
| Maturity (2026) | Mainstream for AI | Early commercial | Niche but proven | Niche; PFAS risk | Mature |
| OCP / standards | OCP ACS cold plate, CDU, UQD specs; ORv3 | OCP ACS two-phase workstream | OCP ACS immersion specs | OCP ACS immersion | OCP Door HX workstream |

---

## 5. Natural and alternative cooling

| Approach | Flagship examples | How it works | Relevance to India |
|---|---|---|---|
| Climate free cooling | Nordic sites (Meta Luleå, many in Finland, Norway, Iceland) | Cool, dry ambient air: indirect or direct economisers for most of the year. Cool-climate adiabatic sites "may rely on free cooling for 90% to 95% of the year." | Limited. Only hill or high-altitude sites and winter months. |
| Seawater cooling | Google Hamina, Finland (former paper mill using Baltic seawater) | Cold seawater through titanium HX to the facility loop | Tropical surface seawater is ~27–31°C, too warm for chilled water but usable for **heat rejection at W32–W45**. Andhra Pradesh's data-centre policy proposes seawater cooling. Indian coastal thermal plants (NTPC Simhadri, Hinduja Vizag) already use seawater for condenser cooling. |
| Deep lake / deep water | Enwave Deep Lake Water Cooling, Toronto (Lake Ontario at ~4°C) | Cold deep water through district cooling | No equivalent cold deep lakes near Indian metros |
| Groundwater / geothermal | Various European aquifer thermal energy storage sites | Aquifer as heat sink or seasonal storage | Restricted. Indian groundwater is overdrawn. |
| Underwater | Microsoft Project Natick (Orkney, 2018–2020); China's commercial underwater data centre off Hainan and a reported offshore-wind-linked project near Shanghai | Sealed pressure vessel cooled by surrounding seawater | Microsoft says the Natick servers "showed a failure rate of 1/8th that of our land-based control group" (vessel retrieved July 2020), but Microsoft confirmed in 2024 that the project is no longer active. China's projects are reported commercial pilots, not independently verified here. A curiosity for India. |
| Heat reuse / district heating | Stockholm Data Parks; Meta Odense (Denmark) | Heat pumps lift 25–45°C waste heat to 60–80°C district heating | Low heating demand in India. Better candidates are absorption chillers, desalination pre-heat, or industrial process heat. |

---

## 6. Market and adoption

### 6.1 Market size and forecasts (2024–2031)

| Source (date) | Metric | Figure |
|---|---|---|
| Dell'Oro (Jan 2026) | Global DC liquid cooling, manufacturer revenue | ~$3 billion in 2025 (≈2× 2024), ~$7 billion by 2029 |
| Dell'Oro (Aug 2025) | Direct liquid cooling | $1.1 billion (2024) to $5.8 billion (2029); DLC grew 156% year on year in 2Q 2025 |
| Dell'Oro (2026) | DLC 2030 | ~$8 billion by 2030 |
| Dell'Oro (Aug 2025, 2026 update) | Data centre physical infrastructure (DCPI) | $63.1 billion by 2029 (15% CAGR); >$80 billion by 2030. Thermal management CAGR 19–20%. |
| MarketsandMarkets | India DC liquid cooling | $113.0 million (2026) to $789.9 million (2031), ~32% CAGR |
| Other analyst estimates (secondary) | Global "liquid cooling" (broader definitions) | ~$5.5 billion (2025) to ~$15.8 billion (2030) |

**Contested figures:** market estimates vary two- to three-fold depending on what is counted. Dell'Oro's manufacturer-revenue definition is the most conservative and the most useful for comparing years.

### 6.2 Adoption (Uptime Institute)
- **2024 Cooling Systems Survey (n=964):** 22% of respondents use some DLC; 61% do not but would consider it; 17% would not. Nearly half of DLC users run it in under 10% of racks.
- **2025 Cooling Systems Survey (n=1,033; July 2025 report):** "DLC adoption remains slow and steady." Perimeter air cooling is still the most popular option, used by around three-quarters of operators. High rack density is the top driver, and **lack of system standards is the top barrier.**
- **Global Data Center Survey 2025:** average modal rack density ~9 kW (up from 8.3 kW); 15% report PUE ≤1.3; PUE improvement has largely stalled.
- **What it means:** DLC adoption by count of operators is modest. By *capacity*, new AI megawatts are overwhelmingly liquid-cooled. Both statements are true.

### 6.3 AI-driven shifts
- **GB200/GB300 NVL72:** 90%+ liquid; air-cooled HGX variants remain for 8-GPU servers at lower bins.
- **Vera Rubin (in production 2026; shipping H2 2026):** 100% liquid compute and switch trays, 45°C warm-water inlet. Nvidia says 45°C cooling "unlocks up to 30% more GPUs in the same power budget."
- **Kyber / Rubin Ultra NVL576 (H2 2027):** ~600 kW per rack, 100% liquid, no fans, 800 VDC. Schneider engineers say the 1 MW rack is coming.

### 6.4 Vendor landscape and consolidation (2024–2026)

| Company | Position / recent moves |
|---|---|
| **Vertiv** | Dell'Oro names it the liquid cooling market leader. Acquired CoolTera (CDUs, UK, announced Dec 2023) and agreed to buy PurgeRite (~$1 billion, Nov 2025; fluid services). **Vertiv did not buy CoolIT.** |
| **Ecolab to buy CoolIT** | Announced 20 Mar 2026: ~$4.75 billion cash from KKR and Mubadala, about 29× next-12-month EBITDA; CoolIT expected to generate ~$550 million in sales. Closing reported in early July 2026. |
| **Eaton to buy Boyd Thermal** | $9.5 billion (Nov 2025; 22.5× 2026E EBITDA). Boyd forecast $1.7 billion of 2026 sales, $1.5 billion of it liquid cooling. Closing reported in March 2026. |
| **Schneider Electric to buy Motivair** | $850 million for a controlling stake (2024). Motivair liquid cooling factory opened in Bengaluru (~March 2026), its third globally. |
| **Trane Technologies to buy LiquidStack** | Announced 10 Feb 2026, closed 3 Mar 2026. Brings DLC CDUs and single- and two-phase immersion. |
| **nVent, CoolIT, Boyd** | Named by Dell'Oro as holding strong DLC share |
| **Others** | Asetek, Submer, GRC, Iceotope, Stulz, Rittal, Carrier, Johnson Controls (Silent-Aire), Daikin, Danfoss, Munters, Airedale, Delta, and Taiwanese cold-plate makers |
| **Indian players** | Mostly integrators and assemblers: Blue Star, Voltas and Kirloskar (chillers), plus local system integrators. Global vendors manufacture locally (Section 9.5). |

**Interpretation:** cooling has turned into a strategic choke point. Around $16 billion of acquisitions in 2025–26 shows that the large power and HVAC companies now treat CDUs and cold plates as core products. Buyers should insist on open interfaces (OCP UQD, CDU control protocols) to avoid lock-in.

### 6.5 Hyperscaler approaches
- **Google:** liquid-cooled its TPUs since TPU v3 (2018) using its own cold plates and CDUs. For its planned 1 GW, ~$15 billion Visakhapatnam AI hub with AdaniConneX, Google has publicly said it will use air-cooled (dry) heat rejection rather than water-based cooling.
- **Microsoft:** since August 2024, all new designs use **zero-water-evaporation** closed-loop chip-level cooling: "once the system is filled during construction, it will continually circulate water between the servers and chillers." Microsoft says this avoids "more than 125 million liters of water per year per datacenter." First sites are Phoenix and Mt Pleasant (Wisconsin), from 2026. Fleet WUE was 0.30 L/kWh in 2023, down 39% from 0.49 in 2021.
- **Meta:** AALC (cold plates, RPU and rear-door coil) across its fleet by early 2025, then facility-water DLC in new AI-optimised designs. OCP Open Rack v3 supports both.
- **AWS:** **In-Row Heat Exchanger (IRHX)**, announced 9 July 2025 for Blackwell (P6e / GB200 NVL72). It has a water-distribution cabinet, an integrated pumping unit, and modular in-row fan-coil modules, so it is effectively an L2A CDU for existing air-cooled halls. AWS's Dave Brown said off-the-shelf options "would take up too much data center floor space or increase water usage substantially."

---

## 7. Water–energy trade-offs

### 7.1 The core trade
Evaporating 1 kg of water absorbs ~2,400 kJ, so towers can reject heat close to the wet-bulb temperature. Dry systems can only approach the dry-bulb temperature, which is often 8–15 K higher in hot-dry climates.

| Heat rejection | On-site WUE (L/kWh IT) | Energy effect | Best climate |
|---|---|---|---|
| Open cooling tower + water-cooled chiller | ~1.4–2.5 typical; 2–4 for traditional evaporative systems | Lowest chiller energy; evaporative cooling "reduces the peak cooling power demand by 25–35% in the summer compared with dry cooling" | Hot-dry with ample (ideally non-potable) water |
| Direct / indirect evaporative air cooling | ~0.2–1.5 (seasonal) | Very low energy when humidity is low | Hot-dry (Delhi and Hyderabad pre-monsoon, Bengaluru dry season) |
| Adiabatic dry cooler | ~0.1–0.5 | Wets coils only on peak days | Most climates; India's best compromise |
| Hybrid / thermosyphon | ~0.5–0.7 (NREL: 1.27 to 0.70) | Near-evaporative energy, about half the water | Mixed |
| Dry cooler + air-cooled chiller | ~0 | Cooling energy 5–15% higher than evaporative (more in hot climates); air-cooled chillers can use 2–3× the electricity of evaporative-cooled ones at peak | Water-scarce sites |
| DLC at W40–W45 + dry cooler | ~0 to <0.1 | Small penalty, since 45°C water can be dry-cooled even at 35–40°C ambient | **Almost anywhere, including India** |
| Seawater once-through | ~0 freshwater | Pumping energy only; marine permitting and thermal discharge limits | Coastal |

**Benchmarks:** the US average WUE is 1.8 L/kWh (LBNL, Shehabi et al., 2016). Across 15 US climate zones, hyperscale WUE values are 0.09–1.80 L/kWh, while traditional evaporative systems require 1.99–4.00 L/kWh; the technology effect averages 10.57× across locations (arXiv 2606.21760). Microsoft's regional WUE is 1.52 L/kWh in Arizona versus 0.02 L/kWh in Singapore (Introl, citing Microsoft data).

### 7.2 The hidden water in electricity
"Zero-water" designs move water use off-site, to power plants. India's grid is still largely coal-thermal, and MoEFCC rules cap cooling-tower thermal plants at 3.5 m³/MWh (3.5 L/kWh) for existing plants and 3.0 m³/MWh for plants installed after 1 January 2017. A dry design that raises PUE from 1.2 to 1.35 adds about 0.15 kWh per kWh of IT, or around 0.3–0.5 L/kWh of off-site water. That is still usually less than the ~1.5–2 L/kWh a tower evaporates. Academic work recommends dry cooling where its efficiency penalty is small (PUE ≤1.5) and in water-stressed basins.

**What it means:** warm-water liquid cooling largely ends the water-versus-energy dilemma. Where legacy air halls force a choice, use evaporative cooling only where water is non-potable or abundant, and adiabatic or hybrid cooling elsewhere.

---

## 8. Cost

### 8.1 Capex by cooling approach (indicative, 2025–26)

| Approach | Cooling-system capex | Notes |
|---|---|---|
| Traditional air (CRAH + chillers + containment) | ~$1.5–2 million per MW of IT | Cannot serve 100 kW+ racks |
| Advanced air with RDHx | ~$1,800–3,200 per kW | Bridge for 30–60 kW racks |
| Single-phase DLC (CDU, manifolds, piping, plus heat rejection) | ~$3–4 million per MW all-in cooling (some sources: $3,500–5,000 per kW). The CDU, manifold and cold-plate subset is ~$300–650 per kW. | CDUs ~$75,000–150,000 per 500 kW; cold plates and manifolds ~$5,000–10,000 per server; ~$50,000 per NVL72 rack |
| Single-phase immersion | ~$1 million per MW for tanks and fluid systems (versus ~$650,000 for comparable DLC hardware); $2.5–3.5 million per MW all-in (vendor-adjacent estimates) | Some vendor-sponsored TCO studies claim lower total capex than air at high density; treat with caution |
| Retrofit an air hall to liquid | ~$2–3 million per MW of cooling capacity | 12–18-month lead times for raised-floor facilities |

**Whole-facility context:** an air-cooled Tier III facility costs ~$8–14 million per MW of IT in 2026; a fully fitted DLC facility costs ~$17–25 million per MW. Most of that difference is higher-density electrical gear, heavier structures and stainless piping. **In India (SBI, April 2026, citing JM Financial):** a Tier III non-AI air-cooled facility costs **INR 50–55 crore per MW**, AI or Tier IV builds with immersion **up to INR 75 crore per MW**, and large campuses **INR 35–45 crore per MW**. Mechanical and cooling systems are typically ~15–25% of total build cost; this is an industry rule of thumb that varies by design.

**Contested figures:** published cooling capex figures conflict by 2–5×, because of scope, greenfield versus retrofit, and vendor sponsorship. Use immersion TCO studies only as directional evidence and get project-specific quotes.

### 8.2 Opex
- Air cooling overhead: ~0.3–0.6 kW of cooling per kW of IT in legacy halls (PUE 1.4–1.7). DLC: ~0.05–0.2.
- At ₹7–9/kWh Indian industrial tariffs, a 10 MW IT hall moving from PUE 1.5 to 1.2 saves ~26 GWh a year, or roughly ₹18–23 crore a year.
- DLC-specific opex: fluid testing and top-up, filter changes, CDU pump maintenance, and leak-response training. Immersion adds fluid replacement.
- One cost model finds DLC's 10-year TCO falls below air at ~30 kW per rack (at $0.12/kWh), consistent with industry consensus that liquid is cheaper above ~30–40 kW per rack.

---

## 9. The Indian perspective

### 9.1 Climate challenge
India's problem is **heat plus humidity**. High wet-bulb temperatures limit evaporative cooling, high dry-bulb temperatures limit dry coolers, and dust, pollution and monsoon humidity largely rule out direct fresh-air cooling.

| City | Climate character | Free-cooling outlook | Indicative peak wet-bulb* |
|---|---|---|---|
| Mumbai / Navi Mumbai | Hot-humid coastal, monsoon | Poor for air-side; one estimate gives ~28% economiser hours at conventional setpoints | ~28°C design; monsoon peaks reportedly 30–32°C |
| Chennai | Hot-humid coastal, severe water stress | Poor for air-side; good for W40–W45 dry cooling | ~28–29°C |
| Delhi NCR / Noida | Composite: very hot-dry summer (>45°C dry-bulb), humid monsoon, cool winter | Good winter economisation (Dec wet-bulb 3–8°C); summer is the worst case for dry coolers | ~29°C |
| Bengaluru | Moderate, elevated (~900 m) | Best in India; one estimate gives ~71% free-cooling hours at a 35°C dry-cooler setpoint | ~23°C |
| Hyderabad | Hot semi-arid | Good for indirect evaporative cooling much of the year; hot April–May | ~25–26°C |
| Visakhapatnam | Hot-humid coastal | Seawater heat rejection possible; water-stress controversy | ~28°C |

*Indicative values from ASHRAE-type climatic data and engineering blogs. Verify against ASHRAE Handbook or IS 7896 / ISHRAE design tables before design. By comparison, Nordic sites achieve free cooling for most of the year.

**Water stress:** Bengaluru, Chennai and Gurugram are named in the SBI report as water-stressed metros, where "traditional cooling infrastructure can consume tens of millions of litres annually" in large facilities. New rules require water-management plans and prioritise treated wastewater. India's Ministry of Jal Shakti says the industry is adopting direct-to-chip and immersion cooling to reduce water demand.

### 9.2 Indian operators and liquid cooling deployments

| Operator | Liquid cooling status (sourced) |
|---|---|
| **Sify** | First in India to be certified for liquid cooling under Nvidia's DGX-Ready programme (Rabale, Navi Mumbai; Sept 2024), specified "to support 130 KW/rack." Chennai 02 (Siruseri) and Noida 02 certified for "up to 200 KW/rack" (May 2025). |
| **Yotta** | NM1 (Navi Mumbai) hosted ~16,000 H100/GH200 GPUs by mid-2025 (secondary source). Yotta says RDHx supports "50–60 kW" and DLC "up to 80 kW per rack." It has announced plans for 40,000 Vera Rubin GPUs at D4 Greater Noida (120 MW) and GB300 at NM2. These are plans, not commissioned capacity. |
| **CtrlS** | Marketing claims of AI racks up to 70 kW (RDHx, DLC, immersion) and immersion "up to 250kW per rack." Plans for more than 4 GW of AI-ready capacity. No independently verified rack-level DLC deployment details were found. |
| **NTT DATA India** | NAV1 Mahape: 4.8 MW of immersion plus direct contact liquid cooling (2023). |
| **Nxtra (Airtel)** | ~300 MW capacity (March 2026); reported "high-density racks of up to 130 kW using air and liquid cooling" (secondary). |
| **STT GDC India** | Expanding AI-ready capacity; no published liquid-cooling rack density found. |
| **Google / AdaniConneX / Nxtra (Vizag)** | 1 GW AI hub; Google says air-cooled (dry) heat rejection; under legal and community challenge over water. |

**Overall:** Indian liquid cooling is at the pilot-to-first-wave stage. Leading operators report PUE of 1.4–1.5 (SBI), well above the MeitY AI-cloud tender requirement of **PUE <1.35** (in force since 2024). DLC is the most practical route to that threshold for GPU halls in Mumbai and Chennai.

### 9.3 Andhra Pradesh and seawater cooling
Andhra Pradesh's data-centre policy proposes **seawater cooling**, and the state incentivises operators to build **desalination** plants. IT Minister Nara Lokesh says one operator is already building one. AP also mandates ≥70% renewable energy for data centres. The state estimates its planned **6.5 GW** Vizag ecosystem would need about **3 TMC (~85 billion litres) of water a year** "based on current technology," supplied from the Polavaram industrial allocation. Activists and lawyers note the environmental clearance for Google's Tarluvada site does not specify water volumes or the freshwater-versus-seawater split.

**Assessment:** tropical seawater (~28–30°C) cannot produce chilled water without chillers. It works well as a **condenser or heat sink for W32–W45 liquid loops**, replacing evaporative towers, as coastal Indian power plants already do. It needs titanium HXs, anti-fouling measures, CRZ permits and thermal-discharge limits. Desalination for tower make-up is energy-intensive, at ~3–4 kWh/m³ for seawater reverse osmosis, and produces brine. Dry or adiabatic cooling plus DLC avoids most of that water.

### 9.4 Standards and policy
- **ECBC 2017 / BEE:** no PUE cap in the code itself. The **"User Guide for Implementing ECBC in Data Centers"** (CII-IGBC with LBNL/US DOE, May 2021) sets tiered requirements: BEE 3-star chillers minimum rising to 5-star at higher tiers, cooling-tower fan efficiency, "Measure PUE as per Green Grid," and simulation reports to show PUE for new builds. Treat this as voluntary unless notified by a state.
- **MeitY:** PUE <1.35 for AI-cloud tenders (since 2024).
- **SEBI BRSR Core:** energy and water disclosure for the top 150 listed companies.
- **IGBC Green Data Centre rating:** Platinum requires more than 80 of 100 points, and energy is the largest category.
- **TRAI:** has recommended a green data-centre certification framework.
- **Kigali / ICAP:** HFC freeze 2028 (Section 3.4).

### 9.5 Local manufacturing
- **Vertiv, Chakan (Pune):** opened January 2024 on 4.8 acres (210,000 sq ft), making "cooling solutions ranging from 200W to 2MW+" including adiabatic free-cooling chillers, AHUs and in-row and rack cooling. It is Vertiv's third Indian facility, after Ambernath and Pune.
- **Schneider Electric, Bengaluru:** a cooling factory, plus a **Motivair liquid-cooling factory** (~March 2026), its first in India and third globally. It makes CDUs, direct-to-chip hardware and RDHx.
- **Gap:** the SBI report flags an "underdeveloped domestic infrastructure ecosystem" in "power systems, HVAC, lithium-ion storage." Cold plates, QDs and specialised pumps are still largely imported.

### 9.6 Recommendations for India: what to use where

| Use case | Recommended cooling | Heat rejection | Target PUE / WUE |
|---|---|---|---|
| AI training / inference (≥40 kW per rack), any city | Single-phase DLC (W32–W45), with RDHx or fan-wall for the residual 10–25% | Dry coolers with adiabatic assist on peak days; magnetic-bearing chillers only for trim and resilience | PUE 1.15–1.25; WUE <0.2 |
| AI halls in coastal Mumbai, Chennai, Vizag (hyperscale) | DLC as above | Seawater or treated-sewage-water heat rejection where permitted; otherwise adiabatic dry coolers | PUE ~1.2; freshwater WUE ~0 |
| Cloud / enterprise (8–20 kW per rack), Bengaluru, Hyderabad, Pune | Hot aisle containment, fan walls or CRAH | Indirect evaporative coolers or air-cooled free-cooling chillers; recycled water if evaporative | PUE 1.3–1.4; WUE 0.2–0.8 |
| Cloud / enterprise in Mumbai and Chennai | Hot aisle containment, CRAH, higher chilled-water setpoints (18–20°C) | Water-cooled magnetic-bearing chillers on recycled water, or air-cooled free-cooling chillers in water-stressed zones | PUE 1.35–1.5 |
| Delhi NCR | Hot aisle containment plus economiser for winter; DLC for AI | Hybrid: dry/adiabatic in winter and monsoon, evaporative trim in May–June using recycled water | PUE 1.25–1.4 |
| Edge / telecom / dusty sites | Sealed DX (R-32 / low-GWP) or single-phase immersion micro-pods | Dry | — |
| Retrofits of existing Indian air halls for GPUs | L2A CDUs (AWS IRHX / Meta AALC style) or active RDHx up to ~50–70 kW; full L2L DLC needs facility water risers | Existing chilled water | — |

**Do not** build new freshwater-evaporative designs in Chennai, Bengaluru or Gurugram. **Do not** bet on two-phase immersion until PFAS-free fluids and OEM warranties mature. **Do** design every new hall with facility-water taps and floor loading for 100–200 kW liquid racks, even if it opens air-cooled.

---

## 10. Future trends
1. **Racks heading to 1 MW.** GB300 is ~130–150 kW, Vera Rubin ~190–230 kW (2026), Kyber ~600 kW (2027), and 1 MW-class racks are discussed for around 2028–29.
2. **800 VDC interplay.** Moving from 54 V in-rack to 800 VDC cuts copper (Nvidia says over 150% more power through the same copper) and AC/DC losses, but brings power conversion into sidecars that themselves need liquid cooling. Power and cooling are being co-designed, which helps explain the Eaton–Boyd and Schneider–Motivair deals.
3. **Warm water (45°C+) and the decline of chillers.** W45 makes chiller-free operation feasible in most climates, including much of India. Expect chillers to be downsized to a trim and resilience role, and the dry-cooler market to grow.
4. **Two-phase and embedded cooling** once GPU TDPs pass ~2.5–4 kW (2027–2029), with PFAS-free fluids a key enabler.
5. **Heat reuse** at 45–60°C return temperatures. In India, absorption cooling, desalination pre-heat and industrial process heat are more realistic uses than district heating.
6. **AI-driven cooling optimisation.** DeepMind's 2016 work cut Google's data-centre cooling energy "by up to 40%," equivalent to "a 15% reduction in overall PUE overhead." Similar machine-learning controls are now in commercial DCIM and building-management products.
7. **Standardisation.** The OCP Advanced Cooling Solutions project covers cold-plate, CDU, UQD, door-HX, AALC and immersion specifications, and ORv3 and MGX define rack and manifold interfaces. Uptime's survey shows that missing standards are still the top barrier, so expect convergence on Nvidia/OCP interfaces.

---

## Caveats
- **GPU TDPs for Rubin and Rubin Ultra** (1,800–2,300 W) and Vera Rubin rack power (190–230 kW) are industry estimates, not Nvidia specifications. Kyber's ~600 kW comes from Nvidia's CEO at GTC 2025, and timelines can slip.
- **Market sizes** vary widely by definition. Dell'Oro figures are manufacturer revenue only.
- **PUE, capex and TCO** figures for immersion and two-phase cooling often come from vendors or vendor-affiliated analyses. Cost figures across sources conflict by 2–5×.
- **Uptime adoption figures** measure the share of operators, not capacity. Secondary outlets report other percentages (e.g., "19% liquid adoption") that could not be verified against Uptime primary data.
- **Indian climate figures** are indicative and partly from engineering blogs. Site design must use ASHRAE / IS 7896 / ISHRAE data.
- **Indian operator rack-density claims** (CtrlS, Nxtra, Yotta) are largely company marketing or secondary reports. Yotta's Rubin and GB300 numbers are announced plans.
- **M&A closing dates** for Eaton–Boyd and Ecolab–CoolIT are from secondary and financial-press reports.

## Sources

1. <https://www.datacenterdynamics.com/en/analysis/nvidia-gtc-jensen-huang-data-center-rack-density/>
2. <https://gpusmith.com/hardware/gpus/nvidia-b300>
3. <https://tonecooling.com/nvidia-rubin-gpu-cooling-challenges/>
4. <https://www.delloro.com/news/data-center-liquid-cooling-market-to-approach-7-billion-by-2029-as-ai-deployments-accelerate/>
5. <https://getuniqcli.com/insights/data-center-cooling-planning-guide>
6. <https://www.techtimes.com/articles/327395/20260912/indias-yotta-plans-80000-vera-rubin-gpus-world-leaks-hacked-customer-server.htm>
7. <https://www.moduledge.com/blog/nvidia-vera-rubin>
8. <https://www.simscale.com/blog/ashrae-90-4-data-center-standards/>
9. <https://www.ashrae.org/file%20library/technical%20resources/bookstore/emergence-and-expansion-of-liquid-cooling-in-mainstream-data-centers_wp.pdf>
10. <https://journal.uptimeinstitute.com/new-ashrae-guidelines-challenge-efficiency-drive/>
11. <https://www.scribd.com/document/772495809/ASHRAE-TC-9-9-Reference-Card-2021-Equipment-Thermal-Guidelines-for-Data-Processing-Environments>
12. <https://developer.nvidia.com/blog/nvidia-vera-rubin-pod-seven-chips-five-rack-scale-systems-one-ai-supercomputer/>
13. <https://www.fierce-network.com/cloud/nvidia-has-no-chill>
14. <https://www.datacenterknowledge.com/cooling/is-liquid-cooling-adoption-by-data-centers-becoming-a-zero-sum-game->
15. <https://nriglobe.com/technology/ai-data-center-cooling-methods-2026-air-direct-to-chip-liquid-immersion-pue-nvidia-gb200-rack-density-explained/>
16. <https://sbi.bank.in/documents/57189647/58231607/Sector+Report+DataCentre.pdf/f1919592-ee66-b50b-ea20-75fbb27c9bb5?t=1779885206866>
17. <https://datacenter.uptimeinstitute.com/rs/711-RIA-145/images/2025.Annual.Survey.Report.pdf?version=0&mkt_tok=NzExLVJJQS0xNDUAAAGcNPnjzIRtJDlpo9-Khi9n18G0DO03Sio3lnUg39J2C4NwajSneDRbDbQS68NjcylaxC-tv-Wxs8gNe8yLCsRPInSsJBBujdGUMIQQZ66IJcvg>
18. <https://datacenters.lbl.gov/sites/default/files/ENERGY%20EFFICIENCY%20IN%20INDIAN%20DATA%20CENTER%202017%20HS%20(1).pdf>
19. <https://library.techinsights.com/hg-content/6b430dae-412d-4533-a65d-0e33955d2943?stage=PUBLISHED>
20. <https://colocation.yotta.com/tag/colocation-data-center/>
21. <https://kvrm.in/data-centre-wue-cooling-tower-adiabatic-dry-cooler/>
22. <https://introl.com/blog/liquid-vs-air-cooling-ai-data-centers>
23. <https://www.delloro.com/advanced-research-report/data-center-liquid-cooling/>
24. <https://drrobertcastellano.substack.com/p/nvidias-2300-watt-rubin-chip-redefines>
25. <https://ceedindia.org/30-years-of-ozone-layer-protection-indias-role-in-climate-action-and-the-kigali-amendment/>
26. <https://www.nrdcindia.org/pdf/India-HFC_Phase_Down_Pathways_web.pdf>
27. <https://kgs.live/current-affairs/daily-current-affairs/2026-04-02/india-moves-to-phase-down-hfcs>
28. <https://equityessenceindia.substack.com/p/r32-gas-production-after-fy28-the>
29. <https://www.nxtra.in/insights/blogs/liquid-cooling-data-centers>
30. <https://convergedigest.com/liquidstack-cdu-2x-nvidia-vera-rubin-liquid-cooling>
31. <https://www.delloro.com/market-at-the-boiling-point-is-the-cdu-space-becoming-saturated/>
32. <https://www.datacenterknowledge.com/cooling/liquid-cooling-options-rdhx-direct-to-chip-immersion>
33. <https://blog.barrack.ai/nvidia-b300-1400w-data-center-requirements/>
34. <https://www.barchart.com/story/news/36537474/supermicro-expands-nvidia-blackwell-portfolio-with-new-4u-and-2-ou-ocp-liquid-cooled-nvidia-hgx-b300-solutions-ready-for-high-volume-shipment>
35. <https://www.electronicsweekly.com/news/business/datacentre-liquid-cooling-market-to-reach-7bn-by-2029-2026-01/>
36. <https://datacenter.uptimeinstitute.com/rs/711-RIA-145/images/2025VendorPerspective.draft.FINAL.pdf?version=1&mkt_tok=NzExLVJJQS0xNDUAAAGc7l44wS1NDRx2fGDdORCVxxesv7UtFgM90MAKfBTzBu0i8OOGxBHcrHx3PgRa2GL33RUVw5sQQJKTaLSbQKE5nURpc_SvJSN3z9Dm5Piz9ehg>
37. <https://introl.com/blog/water-usage-efficiency-wue-ai-data-center-cooling-guide-2025>
38. <https://www.prnewswire.com/news-releases/data-center-liquid-cooling-market-to-approach-7-billion-by-2029-as-ai-deployments-accelerate-according-to-delloro-group-302655848.html>
39. <https://ipvaluelabs.com/insights/liquid-cooling-ai-data-centers>
40. <https://www.enterpriseitworld.com/ntt-deploys-liquid-immersion-cooling-lic-and-direct-contact-liquid-cooling-dclc-technologies-in-india/>
41. <https://alliancechemical.com/blogs/articles/post-novec-immersion-fluid-alternatives-2026>
42. <https://www.besttechnologyinc.com/3m-novec-engineered-fluids-solvents/3m-novec-hfe-engineered-fluids-replacements-and-pfas-phase-out/>
43. <https://chemsec.org/3m-promised-to-phase-out-pfas-how-has-it-turned-out/>
44. <https://temple8capital.substack.com/p/the-western-data-center-cooling-play>
45. <https://arxiv.org/pdf/2507.02871>
46. <https://www.datacenterdynamics.com/en/news/trane-acquires-cooling-firm-liquidstack/>
47. <https://www.datacenterfrontier.com/cooling/article/11436915/meta-plans-shift-to-liquid-cooling-for-its-data-center-infrastructure>
48. <https://www.datacenterfrontier.com/data-center-design/article/33005296/meta-previews-new-data-center-design-for-an-ai-powered-future>
49. <https://www.networkworld.com/article/4062381/microsofts-new-cooling-tech-targets-ais-thermal-bottleneck-as-hyperscalers-hit-power-ceilings.html>
50. <https://datacenters.microsoft.com/wp-content/uploads/2025/09/Microfluidic-Cooling-Infographic.pdf>
51. <https://www.score-grp.com/en/post/free-cooling-in-data-centers-limits-and-best-practices>
52. <https://india.mongabay.com/2026/05/india-bets-on-data-centres-even-as-water-energy-use-concerns-mount/>
53. <https://en.wikipedia.org/wiki/Vizag_Thermal_Power_Station>
54. <https://en.wikipedia.org/wiki/Simhadri_Super_Thermal_Power_Station>
55. <https://natick.research.microsoft.com/index.html>
56. <https://en.wikipedia.org/wiki/Project_Natick>
57. <https://www.delloro.com/news/ai-build-out-to-propel-data-center-physical-infrastructure-market-to-63-1-billion-by-2029/>
58. <https://capacityglobal.com/news/delloro-report-cooling-ai-data-centre-industry/>
59. <https://www.marketsandmarkets.com/Market-Reports/geography/data-center-liquid-cooling-market/India>
60. <https://datacenter.uptimeinstitute.com/rs/711-RIA-145/images/2024.Cooling.Survey.Report.pdf?version=3&mkt_tok=NzExLVJJQS0xNDUAAAGT7PRR0KuLmMWcCq8tWI21qXB7omLvlzWkBrppTAcUCjbXIkzkaOxnWxRQ-ZovhNiIkKVF7w9cDt_um8_iglJ8UIxr8dE0NsyiG0wpj3cL2A>
61. <https://intelligence.uptimeinstitute.com/sites/default/files/2025-07/UI%20Field%20181_Data%20center%20cooling.pdf>
62. <https://www.dober.com/direct-to-chip-cooling>
63. <https://mgrid.org/2026/02/13/data-center-pue-plateau-liquid-cooling-19-percent-adoption/>
64. <https://shattered.io/yotta-nvidia-vera-rubin-gpus-india-12-billion-2026/>
65. <https://datacenterrichness.substack.com/p/vera-rubin-enters-production-what>
66. <https://s205.q4cdn.com/554782763/files/doc_news/2023/12/1/Vertiv-Acquisition-of-CoolTera-Ltd-Boosts-Liquid-Cooling-Portfolio.pdf>
67. <https://www.theregister.com/2025/11/04/eaton_and_vertiv_both_acquire/>
68. <https://investor.ecolab.com/news/news-details/2026/Ecolab-to-Acquire-CoolIT-Systems-a-Global-Leader-in-Advanced-Liquid-Cooling-for-Next-Gen-AI-Data-Centers/default.aspx>
69. <https://futurumgroup.com/insights/will-ecolabs-4-75b-coolit-systems-bet-define-the-future-of-gpu-liquid-cooling/>
70. <https://tracxn.com/d/companies/coolit-systems/__XdTZh-QkBjr2CibAdwVrYV8noOQxJjnCUEZFKBqwWM4>
71. <https://markets.financialcontent.com/stocks/article/marketminute-2026-3-31-ecolabs-475-billion-coolit-acquisition-a-liquid-leap-into-the-ai-infrastructure-core>
72. <https://www.eaton.com/us/en-us/company/news-insights/news-releases/2025/eaton-signs-agreement-to-acquire-boyd-thermal--expanding-solutio.html>
73. <https://markets.financialcontent.com/stocks/article/marketminute-2026-3-16-eaton-completes-95-billion-acquisition-of-boyd-thermal-as-ai-infrastructure-race-shifts-to-liquid-cooling>
74. <https://powerline.net.in/2026/03/06/schneider-electric-launches-liquid-cooling-solutions-factory-in-bengaluru-for-ai-ready-data-centres/>
75. <https://www.facilitiesdive.com/news/liquidstack-buy-gives-trane-ai-data-center-cooling-exposure/812053/>
76. <https://www.conectronica.com/en/present/agreements/trane-technologies-completes-acquisition-of-liquidstack-to-boost-liquid-cooling-in-data-centers>
77. <https://www.ranewsupdates.com/2026/09/google-adani-data-centre-visakhapatnam.html>
78. <https://republicnewsindia.com/ai-runs-on-electricity-but-it-drinks-water-can-the-sea-pay-indias-bill/>
79. <https://www.techerati.com/news-hub/microsoft-unveils-closed-loop-water-cooling-for-data-centres/>
80. <https://insights.globalspec.com/article/23373/zero-water-cooling-for-data-centers>
81. <https://www.itpro.com/infrastructure/data-centres/data-center-water-consumption-is-skyrocketing-but-microsoft-thinks-it-has-a-solution-the-companys-new-closed-loop-cooling-system-consumes-zero-water-and-could-save-millions-of-liters-per-year>
82. <https://note.com/d4g/n/n670d89874d30?hl=en>
83. <https://www.datacenterdynamics.com/en/news/meta-shows-ai-system-and-liquid-cooled-racks-at-ocp-summit/>
84. <https://www.delloro.com/awss-new-liquid-cooling-solution-rattled-the-market-but-is-it-truly-disruptive/>
85. <https://www.cnbc.com/2025/07/09/amazon-web-services-builds-heat-exchanger-to-cool-nvidia-gpus-for-ai.html>
86. <https://arxiv.org/pdf/2606.21760>
87. <https://alliancechemical.com/blogs/articles/glycol-cooling-water-use-effectiveness-arid-regions>
88. <https://avanzaenergy.substack.com/p/the-3-billion-blind-spot-how-nevadas>
89. <https://arxiv.org/pdf/2607.22617>
90. <https://www.adamsilvaconsulting.com/insights/data-center-cooling-economics-2026>
91. <https://deepfundamental.substack.com/p/deep-dive-liquid-cooling>
92. <https://www.datacenterknowledge.com/cooling/data-center-cooling-methods-costs-vs-efficiency-vs-sustainability>
93. <https://www.profileits.com/understanding-the-total-cost-of-ownership-tco-for-a-10-mw-ai-data-center-air-cooling-vs-immersion-cooling/>
94. <https://energy-solutions.co/articles/sub/data-center-cooling-liquid-immersion-vs-air>
95. <https://medium.com/teradata-labs/the-data-center-isnt-ready-4034e2e59161>
96. <https://www.globaldatacenterhub.com/p/what-a-data-center-actually-costs>
97. <https://mepvault.com/data-centre-cooling-india-crac-crah/>
98. <https://www.archyde.com/google-and-tcs-to-use-advanced-cooling-for-1-gw-visakhapatnam-data-centre/>
99. <https://blog.se.com/datacenter/2026/07/30/planning-liquid-cooling-for-new-ai-data-centre-builds-in-india/>
100. <https://www.sifytechnologies.com/europe/news/sify-becomes-first-in-india-to-achieve-nvidia-dgx-ready-data-center-certification-for-liquid-cooling-to-enable-breakthrough-ai-performance/>
101. <https://www.globenewswire.com/news-release/2025/05/06/3075101/29606/en/Sify-s-Chennai-and-Noida-Data-Center-facilities-Achieve-NVIDIA-DGX-Ready-Certification-for-liquid-cooling.html>
102. <https://www.credenceresearch.com/report/india-data-center-liquid-cooling-market>
103. <https://colocation.yotta.com/blog/role-of-advanced-cooling-technologies-in-modern-data-centers/>
104. <https://dmc-education.com/2026/08/27/india-data-centre-projects-2026-top-10-upcoming-under-construction-data-centres/>
105. <https://www.ctrls.com/brochure/ctrls-honoured-with-frost-and-sullivans-strategy-leadership-award-2025.pdf>
106. <https://www.ctrls.com/ai-ready-datacenter-infrastructure/>
107. <https://www.telecompaper.com/news/ntt-deploys-liquid-immersion-cooling-direct-contact-liquid-cooling-at-india-data-centers--1451600>
108. <https://www.blackridgeresearch.com/blog/list-of-top-ten-largest-data-center-companies-in-india>
109. <https://yourstory.com/2026/09/andhra-sets-70-renewable-energy-rule-for-data-centres-addresses-water-concerns-lokesh>
110. <https://telanganatoday.com/andhra-govt-allays-fears-over-data-centres-affecting-water-supply-to-vizag>
111. <https://d1owjfc1d3lv0e.cloudfront.net/website-assets/frontend-assets/html_pdfs/User%20Guide%20For%20Implementing%20ECBC%20in%20Data%20Centers_CII-IGBC%20and%20LBNL%20(DOE)%20USA_May%202021.pdf>
112. <https://www.vertiv.com/en-in/about/news-and-events/news-releases/vertiv-opens-new-manufacturing-and-facility-and-test-lab-in-india-to-support-global-and-regional-thermal-management-demands/>
113. <https://blog.se.com/datacenter/2026/08/25/sources-spares-and-commissioning-liquid-cooling-in-india-the-supply-side/>
114. <https://www.se.com/in/en/about-us/newsroom/news/press-releases/schneider-electric-inaugurates-new-cooling-factory-in-bengaluru-660bfbbb1981575fa9092d73>
115. <https://www.electronicsweekly.com/news/business/nvidia-and-partners-gear-up-for-800vdc-datacentres-and-vera-rubin-for-2025-10/>
116. <https://www.electronicspecifier.com/news/blog/deepmind-ai-reduces-data-centre-cooling-energy-use-by-40/>
117. <https://www.opencompute.org/wiki/Cooling_Environments/Door_Heat_Exchanger>
118. <https://www.datacenterdynamics.com/en/news/nvidias-rubin-ultra-nvl576-rack-expected-to-be-600kw-coming-second-half-of-2027/>
