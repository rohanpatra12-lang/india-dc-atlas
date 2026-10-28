<!-- Report 10 of the India Data Centre Atlas research series (Where to build; atlas chapter 15.1). Produced with AI-assisted web research, October 2026, and kept as written at the time. Some figures were corrected later (notably India grid water 4.5 → 2.9 L/kWh and grid CO₂ 0.71 → 0.675 t/MWh, October 2026); the atlas standards register (src/data/standards.js) is authoritative where they differ. -->

# Where in India to build data centres: a city-by-city shortlist per state (Part 10)

Hyderabad's periphery (Chandanvelly–Meerkhanpet–Shadnagar) is the strongest place in India to build a new data centre. It ranks first or second under every weighting tested, because it is the only candidate that combines a low-seismic, low-cyclone inland site with a strong EHV grid, a ₹6.65/kVAh tariff at 132 kV, 10 ms-class latency to the southern and western hubs, and a 710 MW pipeline. Visakhapatnam is the clear #2 for AI-scale campuses, now that new subsea landings and Google's 1 GW hub are under way. For interconnection-heavy colocation, nothing replaces Navi Mumbai and Chennai.

## TL;DR
- **Build where the fundamentals are, interconnect where the cables are.** On greenfield fundamentals, the top tier is Hyderabad periphery (7.2/10), Visakhapatnam (6.8), Hyderabad core (6.7), Navi Mumbai (6.6), Mysuru (6.5), and Greater Noida / Hoskote / Sri City / Nava Raipur / Warangal (6.4). Chennai (5.5), Gurugram (5.5) and Delhi (4.7) fall to Tier B/C mainly because of over-exploited groundwater, high tariffs or flood risk. They stay essential for colocation, where Navi Mumbai (8.2) and Chennai (7.6) rank at or near the top.
- **By use case:** for an AI training campus, pick Jharsuguda/Odisha (7.4), Hyderabad periphery (7.0), Nava Raipur (7.0), Bhubaneswar (6.8), Anantapur (6.7) or Visakhapatnam (6.6). For interconnection colo, pick Navi Mumbai, Hyderabad, Chennai and Bengaluru. For a sustainability-first build, pick Mysuru (7.2), Hyderabad periphery (6.6), Nagpur (6.5), Pune (6.3), and Visakhapatnam / GIFT City (6.2).
- **The binding unknown is grid headroom.** No state transmission utility (STU) publishes spare transformation capacity per substation, so every power score here rests on tariff plus grid/RE context, not verified MVA headroom. Before shortlisting a site, ask the STU for a load-flow/connectivity study (and CTUIL for ISTS-GNA). Also get a CGWB/state block-level water certificate.

## Key Findings

**1. Market context (reported).** Cushman & Wakefield's H1 2026 update puts operational capacity at 1,789 MW across seven markets, with 3,860 MW more due by 2030 (509 MW under construction and 3,351 MW planned). By city:

| Market | Operational (MW) | Upcoming (MW) |
|---|---|---|
| Mumbai | 890 | 1,726 |
| Chennai | 214 | 368 |
| Delhi NCR | 183 | 387 |
| Bengaluru | 162 | 100 |
| Hyderabad | 151 | 710 |
| Pune | 133 | 258 |
| Kolkata | 22 | 84 |

Colocation vacancy stood at 14.9%. JLL's India Data Centre 2026 Mid-Year Report (press release, 2 September 2026) puts capacity at 1,637 MW in June 2026 and expects 6 GW by 2029, a build-out it says "will require USD 110 billion in capital investments". It reports H1 2026 absorption of 101 MW (82% pre-committed hyperscale) and vacancy at "a record low of 2.8%". That conflicts with C&W's 14.9%, probably because the two firms define vacancy differently. CBRE South Asia's October 2026 report, "Beyond Growth: India's Rise Among APAC's Leading Data Centre Markets", counts about 130 MW added in H1 2026: 94% of it in Mumbai and 48% from domestic developers. It expects more than 200 MW in H2, putting India "on track to reach 2 GW by the end of the year". These counts differ by methodology (city coverage, IT vs gross MW). Treat about 1.6–1.8 GW as the range.

**2. Hyderabad is under-priced relative to its fundamentals.** It has the second-largest pipeline in India (710 MW), against Bengaluru's 100 MW. That pipeline reflects what the model shows: a TGERC HT-I(A) tariff of ₹6.65/kVAh plus ₹500/kVA/month at 132 kV and above, held flat for FY2026-27. It also has seismic zone II, no cyclone exposure, and better groundwater than Bengaluru or Chennai.

**3. Visakhapatnam has moved from "emerging" to "anchor".** Google broke ground on 28 April 2026 on a 1 GW AI hub, part of a US$15 bn commitment, with AdaniConneX and Airtel Nxtra. The state allocated 601 acres across Tarluvada, Adavivaram and Rambilli. According to The Ken, "Andhra Pradesh has promised Google, Meta, Reliance, Tata Consultancy Services, and half a dozen others a combined 5 GW of data-centre capacity in Vizag alone." DatacenterDynamics reports that Google's subsidiary Raiden "has applied for almost 2.1GW of power allowance from local distribution companies." Google announced America-India Connect at the India AI Impact Summit in February 2026. It adds three new subsea paths (to Singapore, South Africa and Australia), which Google says "will establish Vizag as a major international subsea gateway". Meta's Waterworth also lists Vizag as a planned landing. The main weakness is cyclone exposure (Hudhud, 2014); design for it, don't walk away from it.

**4. Water is the factor that most separates hubs from greenfield sites.**
- **Bengaluru Urban:** all six assessment units are over-exploited in IN-GRES 2025-26 (Bangalore-East 395%, North 257.9%, Yelahanka 251.5%, City 223.4%, South 121.9%, Anekal 106.4%). These figures come from a secondary compilation of IN-GRES; verify them on the portal. Hosakote and Devanahalli are on Karnataka's list of over-exploited taluks.
- **Chennai district:** stage of extraction was 127.47% in CGWB 2023, with 13 of 16 taluks over-exploited.
- **Haryana:** the state is at 136.75%, with 91 of 143 units over-exploited in 2025 and 5 over-exploited blocks in Gurugram district.
- **National picture:** per the Ministry of Jal Shakti/CGWB Dynamic Groundwater Resources Assessment 2025, India-wide stage of extraction is 60.63%. Of 6,762 units, 730 (10.8%) are over-exploited, 201 critical, 758 semi-critical and 4,946 (73.14%) safe. Most of the country is safe; the established hubs mostly are not.

**5. Seismic.** The BIS IS 1893:2025 map, which added a Zone VI covering the Himalayan arc, was withdrawn by a gazette notification of 3 March 2026, reverting to IS 1893:2016. This report therefore uses the 2016 zones. Treat the withdrawn Zone VI (Dehradun, Shimla and others) as a design-risk signal for Himalayan sites.

**6. Tariffs vary by about ₹2.7/kWh across states. Over 20 years at 100 MW, that gap is worth more than any capex incentive.** Effective cost is computed at 80% load factor, as energy charge + demand charge ÷ 584 h:

| State | Tariff basis | Effective ₹/kWh |
|---|---|---|
| Odisha | EHT, ₹250/kVA, 580/470 paise slabs | ≈ ₹5.96 (cheapest) |
| Kerala | EHT 220 kV ₹5.55, demand charge estimated | ≈ ₹6.23 |
| Haryana | 132 kV | ≈ ₹7.1 |
| Uttar Pradesh | NIDP HV-2 | ≈ ₹7.41 |
| Telangana | 132 kV | ≈ ₹7.51 |
| Karnataka | HT-2(a) | ≈ ₹7.61 |
| Madhya Pradesh | HV-3 132 kV | ≈ ₹8.2 |
| Tamil Nadu | HT-I | ≈ ₹8.54 |
| Maharashtra | HT-I(A) | ≈ ₹8.7 |

Open access to RE changes this materially for anyone above about 10 MW.

## Method

**Hard filters.**
- **Excluded:** seismic zone V; or no 220 kV+ node within about 25 km with no credible plan for one; or high flood/cyclone exposure with no elevated land available.
- **Conditional:** over-exploited groundwater. The site passes only if it has a contracted treated-wastewater (STP/TTRO) or desalinated supply.

**Normalisation (0–10).**
- **Latency:** anchored min–max on mean RTT to Mumbai, Delhi, Chennai and Bengaluru, using score = 10 × (26 − RTT)/16, clipped.
- **Tariff:** min–max on effective ₹/kWh between ₹5.96 (score 10) and ₹8.70 (score 0).
- **Power** = 50% tariff score + 50% grid/RE-access judgement.
- **Water, hazards, climate, land, policy, demand:** rubric scores. Lower-is-better factors are flipped. Policy scores: AP, UP 9; Karnataka, Maharashtra, Gujarat 8; Rajasthan 7; Telangana, Odisha, MP 6; Haryana 5; Tamil Nadu, West Bengal, Kerala and secondary states 3–4; Delhi 3.

**Weights.**

| Factor | Default | AI campus | Interconnect | Sustainability |
|---|---|---|---|---|
| Power | 25 | 40 | 15 | 20 (RE-access score replaces tariff) |
| Connectivity | 15 | 5 | 30 | 5 |
| Latency | 10 | 5 | 20 | 5 |
| Water | 15 | 15 | 5 | 30 |
| Climate | 5 | 5 | 0 | 15 |
| Hazards | 10 | 10 | 10 | 10 |
| Land | 5 | 10 | 2 | 5 |
| Policy | 10 | 7 | 5 | 5 |
| Demand/talent | 5 | 3 | 13 | 5 |

A weighted geometric mean, using the default weights, is also shown to penalise fatal weaknesses.

**Latency formula.** RTT (ms) ≈ 2 × d × 1.4 ÷ 200 = 0.014 × d (km). Inter-hub baselines:

| Route | Distance | RTT |
|---|---|---|
| Mumbai–Delhi | 1,150 km | 16.1 ms |
| Mumbai–Chennai | 1,030 km | 14.4 ms |
| Mumbai–Bengaluru | 845 km | 11.8 ms |
| Delhi–Chennai | 1,760 km | 24.6 ms |
| Delhi–Bengaluru | 1,740 km | 24.4 ms |
| Chennai–Bengaluru | 290 km | 4.1 ms |

**Data labels.**
- **[R]** means reported, with a named source.
- **[E]** means analyst estimate.
- **[U]** means unpublished.

These rules apply throughout:
- **EHV node names and distances** are [E]. They come from public grid knowledge and must be verified against STU single-line diagrams and CEA/CTUIL maps.
- **Spare MVA** is [U] everywhere.
- **Design temperatures** are [E], approximations of ASHRAE 0.4% dry-bulb / mean-coincident wet-bulb values.
- **Free-cooling hours** are [E]: order-of-magnitude hours per year with dry-bulb ≤ 20 °C, not computed from TMY files.

## Latency table (great-circle km to Mumbai / Delhi / Chennai / Bengaluru → mean RTT)

| City | M | D | C | B | Mean RTT (ms) | Score |
|---|---|---|---|---|---|---|
| Anantapur | 705 | 1,547 | 338 | 190 | 9.7 | 10.0 |
| Bengaluru / Hoskote | 845 | 1,740 | 290 | 0–25 | 10.1–10.2 | 10.0–9.9 |
| Hyderabad | 620 | 1,250 | 520 | 500 | 10.1 | 10.0 |
| Hosur | 850 | 1,760 | 260 | 35 | 10.2 | 9.9 |
| Pune | 120 | 1,170 | 910 | 735 | 10.3 | 9.9 |
| Sri City | 980 | 1,700 | 55 | 250 | 10.4 | 9.8 |
| Navi Mumbai | 15 | 1,150 | 1,020 | 835 | 10.6 | 9.7 |
| Chennai | 0–1,030 | 1,760 | 0 | 290 | 10.8 | 9.6 |
| Nashik | 140 | 1,040 | 1,040 | 900 | 10.9 | 9.6 |
| Amaravati | 856 | 1,385 | 381 | 504 | 10.9 | 9.6 |
| Mysuru | 820 | 1,810 | 385 | 125 | 11.0 | 9.5 |
| Goa (Verna) | 428 | 1,508 | 735 | 479 | 11.0 | 9.4 |
| Warangal | 760 | 1,180 | 560 | 640 | 11.0 | 9.5 |
| Mangaluru | 710 | 1,760 | 580 | 300 | 11.7 | 9.0 |
| Nagpur | 685 | 860 | 925 | 900 | 11.8 | 9.0 |
| Indore | 510 | 667 | 1,167 | 1,098 | 12.1 | 8.8 |
| Bhopal | 663 | 594 | 1,170 | 1,142 | 12.5 | 8.5 |
| Coimbatore | 1,000 | 1,960 | 430 | 225 | 12.7 | 8.4 |
| Dholera | 360 | 850 | 1,330 | 1,170 | 13.0 | 8.2 |
| Ahmedabad / GIFT | 440 | 775 | 1,380 | 1,230 | 13.4 | 8.0 |
| Nava Raipur | 957 | 953 | 913 | 1,013 | 13.4 | 8.0 |
| Visakhapatnam | 1,100 | 1,340 | 610 | 800 | 13.5 | 7.9 |
| Kochi | 1,080 | 2,060 | 545 | 355 | 14.1 | 7.5 |
| Jamnagar / Jaipur | 480 / 920 | 950 / 240 | 1,530 / 1,600 | 1,350 / 1,560 | 15.1 | 6.9 |
| Jharsuguda | 1,201 | 1,022 | 1,051 | 1,197 | 15.6 | 6.5 |
| Thoothukudi | 1,270 | 2,200 | 530 | 470 | 15.6 | 6.6 |
| Thiruvananthapuram | 1,200 | 2,210 | 620 | 490 | 15.8 | 6.5 |
| Jodhpur | 795 | 540 | 1,700 | 1,570 | 16.1 | 6.3 |
| Delhi / Noida / Gurugram / Greater Noida | 1,130–1,150 | 0–60 | 1,720–1,760 | 1,700–1,740 | 16.2–16.3 | 6.1 |
| Lucknow / Kanpur | 1,190 | 420 | 1,550 | 1,580 | 16.6 | 6.0 |
| Bhubaneswar | 1,365 | 1,274 | 996 | 1,195 | 16.9 | 5.8 |
| Ranchi | 1,380 | 1,006 | 1,257 | 1,410 | 17.7 | 5.3 |
| Patna / Dehradun | 1,457 / 1,350 | 860 / 205 | 1,479 / 1,930 | 1,607 / 1,926 | 18.9 | 4.5 |
| Digha / Kharagpur | 1,552 | 1,297 | 1,213 | 1,412 | 19.2 | 4.3 |
| Mohali / Baddi | 1,380 | 240 | 1,990 | 1,960 | 19.5 | 4.2 |
| Kolkata | 1,650 | 1,300 | 1,360 | 1,560 | 20.5 | 3.5 |
| Guwahati | 2,079 | 1,461 | 1,880 | 2,078 | 26.2 | 0.0 |

The mean-to-four-hubs metric penalises NCR and Kolkata. For local users, NCR sites are under 1 ms from Delhi, so read their latency score as "national reach", not "local quality".

## Connectivity backbone (applies across states)

- **Subsea cables [R].** India has 17–18 international cables landing at 14–15 stations in five cities: Mumbai (Versova/Chimbai), Chennai, Kochi, Thoothukudi and Thiruvananthapuram. JLL counts 8 cables at Chennai. 2Africa (Airtel) lands at Mumbai.
- **Under development:**
  - **Digha (West Bengal):** led by Reliance Jio, a ₹1,000 cr project targeted for "Q1 2026". Commissioning is unconfirmed as of October 2026.
  - **Visakhapatnam:** Google's America-India Connect gateway and three new cable paths; Meta's Waterworth is also planned.
  - **Others:** Puducherry and Bhubaneswar/Puri.
- **Internet exchanges [R].** NIXI reports 77 nodes. The core nodes are Delhi (Noida), Mumbai (Vashi), Chennai, Kolkata, Bengaluru, Hyderabad, Ahmedabad and Guwahati. Regional nodes listed include Lucknow, Patna, Ranchi, Bhubaneswar, Cuttack, Nagpur, Nashik, Indore, Bhopal, Raipur, Jabalpur, Panjim, Rajkot, Surat, Vadodara, Kochi, Coimbatore, Thiruvananthapuram, Visakhapatnam, Chandigarh, Ludhiana, Bareilly, Siliguri, Salem, Tuticorin, Durgapur and Bardhaman.
- **Private exchanges [E].** DE-CIX and Extreme IX are concentrated in Mumbai, Delhi NCR, Chennai, Kolkata, Bengaluru and Hyderabad. Confirm current locations on PeeringDB.

## State-by-state shortlists

Score order in each table: P / C / L / W / Cl / H / La / Po / D. "Eff. tariff" is ₹/kWh at 80% load factor.

### Maharashtra
- **Policy:** active; 51% RE floor cut in June 2026 (series Part 9).
- **Tariff [R]:** MSEDCL HT-I(A) FY2026-27 is about ₹7.11–7.27/kVAh plus about ₹0.60 wheeling, with a ₹560–565/kVA demand charge. MERC documents conflict slightly, giving an effective ≈ ₹8.7. MERC projects an average HT-industry tariff of about ₹9.00 for FY2026-27.
- **Land [R]:** MIDC TTC base rate is ₹31,390/m² (≈ ₹12.7 cr/acre). The market rate is ₹45,000–60,000/m² or more, and STT paid ₹282 cr for 14,093 m² including a building in May 2026. Taloja is ₹12,100/m² (≈ ₹4.9 cr/acre).

| Rank | City (lat, long; district) | EHV node [E] | Water | Hazard (zone/other) | Design DB/WB °C; FC h [E] | Demand | Scores | Total | Tier |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Navi Mumbai – TTC/Mahape/Rabale (19.03, 73.03; Thane/Raigad) | 400 kV Kharghar / Kalwa, 5–15 km | Dam-fed municipal supply plus STP; Thane district not over-exploited [E] | III; monsoon flooding | 35/26; ~50 | Mumbai 890 MW op / 1,726 MW upcoming [R] | 4.5/10/9.7/7/2/5/2/8/10 | 6.6 | A |
| 2 | Pune – Chakan/Talegaon/Hinjewadi (18.52, 73.86; Pune) | 400 kV Chakan / Lonikand, 10–20 km | Haveli semi-critical [E] | III | 38/25; ~1,500 | 133 MW op / 258 MW upcoming [R] | 4.0/7/9.9/6/5/7/5/8/8 | 6.3 | A |
| 3 | Nagpur – MIHAN/Butibori (21.15, 79.09; Nagpur) | 400 kV Koradi ~25 km; 220 kV Butibori <10 km | Safe [E] | II; heat (44 °C) | 44/27; ~1,500 | NIXI node; small DC base | 4.0/5/9.0/7/5/9/8/8/4 | 6.3 | A |
| 4 | Nashik (20.00, 73.79; Nashik) | 400 kV Eklahare, 10–20 km | Safe [E] | III | 39/25; ~1,800 | NIXI node | 3.0/5/9.6/7/6/7/7/8/3 | 5.8 | B |

### Tamil Nadu
- **Policy:** DC policy lapsed 31 March 2026.
- **Tariff [R]:** TNERC T.O. No. 6 of 2025 sets HT-I at ₹7.50/kWh and ₹608/kVA/month, with no revision announced for 2026. Effective ≈ ₹8.54.

| Rank | City | EHV node [E] | Water | Hazard | DB/WB; FC h [E] | Demand | Scores | Total | Tier |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Hosur (12.74, 77.83; Krishnagiri) | 400 kV Hosur ~10 km | Semi-critical to over-exploited [E] | II | 35/24; ~2,500 | Bengaluru spill-over | 3.8/6/9.9/4/6/9/7/4/6 | 5.7 | B |
| 2 | Chennai – Ambattur/Sriperumbudur/Siruseri (13.08, 80.27; Chennai/Tiruvallur/Kancheepuram/Chengalpattu) | 400 kV Alamathy / Sriperumbudur, 5–20 km | District 127.47%, 13/16 taluks over-exploited [R]; TTRO/desal available → conditional | III; floods 2015/2023; cyclone | 38.5/28.5; ~0 | 214 MW op / 368 MW upcoming; 8 cables [R] | 4.3/10/9.6/3/1/4/4/4/9 | 5.5 | B (A for colo) |
| 3 | Coimbatore (11.02, 76.96; Coimbatore) | 400 kV Arasur ~20 km | Mixed [E] | III | 37/25; ~400 | NIXI node; wind belt | 4.3/5/8.4/5/5/7/7/4/6 | 5.4 | B |
| 4 | Thoothukudi (8.76, 78.13; Thoothukudi) | 765/400 kV Tuticorin PS, 15–25 km | Seawater/desal option | II; coastal cyclone | 38/28; ~0 | BSNL CLS (Sri Lanka) + NIXI | 4.8/7/6.6/5/1/6/8/4/2 | 5.2 | C |

### Karnataka
- **Policy:** Sustainable DC Policy 2026–31, with a ₹20 cr incentive for PUE ≤ 1.20.
- **Tariff [R/E]:** KERC Order of 27 March 2025 sets HT-2(a) at about ₹700 paise/kWh for FY27 and about ₹355/kVA. The subagent could not confirm the exact row. Data centres are billed as industrial with a DoIT certificate. Effective ≈ ₹7.61.

| Rank | City | EHV node [E] | Water | Hazard | DB/WB; FC h [E] | Demand | Scores | Total | Tier |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Mysuru (12.30, 76.64; Mysuru) | 400 kV Mysuru (Kadakola), ~15 km | Cauvery-fed; safe to semi-critical [E] | II | 35/24; ~2,000 | Nascent | 5.0/4/9.5/7/8/9/7/8/3 | 6.5 | A |
| 2 | Hoskote (13.07, 77.80; Bengaluru Rural) | 400 kV Hoody ~20 km | Hosakote over-exploited [R] → conditional | II | 34.5/23.5; ~2,200 | Hyperscale land bank | 5.5/6/9.9/2/8/9/6/8/8 | 6.4 | A (conditional) |
| 3 | Bengaluru core – Whitefield/EC (12.97, 77.59; Bengaluru Urban) | 400 kV Hoody / Somanahalli, 5–25 km | All 6 units over-exploited; East 395% [R] → conditional | II; urban flooding | 34.5/23.5; ~2,000 | 162 MW op / 100 MW upcoming [R] | 5.0/7/10/1/8/8/3/8/10 | 6.1 | B (conditional) |
| 4 | Mangaluru (12.91, 74.86; Dakshina Kannada) | 220 kV local <15 km; 400 kV ~50 km | High rainfall; safe [E] | III; monsoon | 34/27; ~0 | Coastal edge | 5.0/6/9.0/7/2/6/6/8/3 | 6.1 | B |

### Telangana
- **Policy:** 2016 DC policy plus bespoke deals.
- **Tariff [R]:** TGERC FY2026-27 RST order, unchanged from FY26, sets HT-I(A) at ₹6.65/kVAh (132 kV and above), ₹7.15 (33 kV) and ₹7.65 (11 kV), with ₹500/kVA. Effective ≈ ₹7.51. FY27 adds a grid support charge of ₹19.77/kW/month and a green tariff of +₹0.66/kWh.

| Rank | City | EHV node [E] | Water | Hazard | DB/WB; FC h [E] | Demand | Scores | Total | Tier |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Hyderabad periphery – Chandanvelly/Meerkhanpet/Shadnagar (17.10, 78.20; Rangareddy) | 400 kV Shankarpally / 765 kV Maheshwaram, 10–25 km | Mixed; Krishna/Godavari municipal supply [E] | II | 40.5/25.5; ~900 | 151 MW op / 710 MW upcoming [R] | 6.7/7/10/6/5/9/7/6/9 | 7.2 | A |
| 2 | Hyderabad core – Gachibowli/Nanakramguda (17.44, 78.35; Rangareddy) | 400 kV Shankarpally, ~15 km | Urban over-draft pockets [E] | II | 40.5/25.5; ~900 | as above | 6.5/7/10/4/5/9/3/6/10 | 6.7 | A |
| 3 | Warangal (17.97, 79.59; Hanamkonda) | 400 kV Warangal, ~10 km | Safe [E] | II | 42/26; ~800 | Low | 5.65/4/9.5/7/5/9/9/6/3 | 6.4 | A |

### Andhra Pradesh
- **Policy:** DC Policy 4.0.
- **Tariff:** FY2026-27 APERC tariffs are unchanged from FY26 [R]. HT-I demand charge is about ₹475/kVA [R, older order]; the energy charge is not confirmed. Effective ≈ ₹7.3 [E].

| Rank | City | EHV node [E] | Water | Hazard | DB/WB; FC h [E] | Demand | Scores | Total | Tier |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Visakhapatnam – Tarluvada/Adavivaram/Rambilli (17.69, 83.22; Visakhapatnam/Anakapalli) | 400 kV Kalpaka, 10–25 km; new dedicated EHV planned | Safe [E] | II; very high cyclone | 37/29; ~100 | Google 1 GW (601 acres) [R]; 5 GW promised [R] | 6.55/8/7.9/7/1/4/9/9/6 | 6.8 | A |
| 2 | Sri City / Tirupati (13.53, 79.99; Tirupati) | 220 kV in park; 400 kV unverified | Mixed [E] | III; moderate cyclone | 39/28; ~0 | 55 km from Chennai cable landings | 6.05/7/9.8/5/1/6/8/9/4 | 6.4 | A |
| 3 | Anantapur (14.68, 77.60; Anantapur) | 400 kV RE pooling (Uravakonda/Hindupur), 20–40 km | Drought-prone; over-exploited blocks [E] → conditional | II | 40/25; ~600 | Nil; RE-rich | 7.05/3/10/3/4/9/10/9/2 | 6.3 | A (conditional) |
| 4 | Amaravati / Vijayawada (16.51, 80.52; Guntur/NTR) | 400 kV Vijayawada area, ~20 km | Safe [E] | III; Krishna floods | 41/28; ~150 | Capital build-out | 6.05/4/9.6/7/2/6/7/9/3 | 6.2 | B |

### Uttar Pradesh
- **Policy:** UP DC Policy 2026.
- **Tariff [R]:** UPERC's FY2026-27 order sets a standalone tariff for the New Integrated Data Centre Park (NIDP), Greater Noida: HV-2 at ₹270/kVA and ₹6.95/kVAh (effective ≈ ₹7.41), with optional green power at +₹0.34. The general HV-2 average billing rate is ₹7.97.
- **Land [R]:** YEIDA's 2026 residential allotment rate is ₹36,260/m². Industrial/DC rates are lower [U].

| Rank | City | EHV node [E] | Water | Hazard | DB/WB; FC h [E] | Demand | Scores | Total | Tier |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Greater Noida – NIDP/Knowledge Park (28.47, 77.50; Gautam Buddh Nagar) | 765/400 kV Greater Noida, 5–15 km | Semi-critical to over-exploited [E]; Ganga canal + STP | IV | 43.5/29; ~2,800 | NCR 183 MW op / 387 MW upcoming [R] | 6.35/8/6.1/4/4/6/7/9/8 | 6.4 | A |
| 2 | Noida – Sec 62/132/143 (28.54, 77.39; Gautam Buddh Nagar) | 400 kV Noida, 5–10 km | Over-exploited [E] → conditional | IV | 43.5/29; ~2,800 | NIXI Delhi node in Noida | 5.35/9/6.1/3/4/6/4/9/9 | 6.1 | B |
| 3 | YEIDA / Jewar (28.17, 77.60; Gautam Buddh Nagar) | 400 kV Jahangirpur ~15 km | Semi-critical [E] | IV | 43.5/29; ~2,800 | Airport-led | 5.35/6/6.2/5/4/6/9/9/5 | 6.0 | B |
| 4 | Lucknow (26.85, 80.95; Lucknow) | 765 kV Unnao / 400 kV Lucknow, 20–40 km | Urban over-exploited [E] | III | 43/29.5; ~2,500 | NIXI node | 4.85/5/6.0/3/4/7/8/9/5 | 5.5 | B |
| 5 | Kanpur (26.45, 80.33; Kanpur Nagar) | 400 kV Panki ~10 km | Semi-critical [E] | III | 44/29.5; ~2,400 | Low | 4.85/3/6.0/4/4/7/8/9/3 | 5.2 | C |

### Haryana
- **Policy:** Haryana 2022.
- **Tariff [R]:** HERC kept FY27 tariffs equal to FY26. HT is ₹290/kVA plus ₹6.95/kVAh at 11 kV, ₹6.85 at 33 kV, and about ₹6.6 at 66–132 kV (OCR uncertain). Effective ≈ ₹7.1.

| Rank | City | EHV node [E] | Water | Hazard | DB/WB; FC h [E] | Demand | Scores | Total | Tier |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Gurugram – Manesar/Sohna (28.46, 77.03; Gurugram) | PGCIL 400 kV Gurugram / Daultabad, 5–15 km | State 136.75%; 5 over-exploited blocks [R] → conditional | IV | 44/28.5; ~2,800 | NCR enterprise/cloud | 6.4/8/6.1/1/4/6/3/5/9 | 5.5 | B (conditional) |
| 2 | Sonipat – Kundli/Kharkhoda (28.99, 77.02; Sonipat) | 400 kV Deepalpur ~15 km | Over-exploited [R, district list] → conditional | IV | 44/29; ~3,000 | Low | 6.4/5/6.1/1/4/6/7/5/5 | 5.0 | C |

### Delhi
- **Policy:** no DC policy.
- **Tariff:** DERC figures not retrieved [U]; effective ≈ ₹8.5 [E].

| Rank | City | EHV node [E] | Water | Hazard | DB/WB; FC h [E] | Demand | Scores | Total | Tier |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Delhi – Okhla/Narela/Bawana (28.61, 77.21; various) | 400 kV Bawana / Mundka / Tughlakabad, 5–15 km | Largely over-exploited [E] | IV; Yamuna floodplain | 43.5/29; ~2,800 | Core NIXI; edge demand | 3.35/10/6.1/1/4/6/1/3/10 | 4.7 | C (edge only) |

### Gujarat
- **Policy:** Gujarat DC Policy 2026–29.
- **Tariff:** GERC FY27 tariffs are unchanged. The HTP-I energy charge is ₹4.30/unit plus FPPPA (base about ₹2.15), and the demand-charge slabs were not verified. The all-in figure is ₹7.5–8.5 (secondary source), so ≈ ₹8.0 is used. Open-access additional surcharge is ₹0.99/kWh for October 2026 – March 2027 [R].

| Rank | City | EHV node [E] | Water | Hazard | DB/WB; FC h [E] | Demand | Scores | Total | Tier |
|---|---|---|---|---|---|---|---|---|---|
| 1 | GIFT City / Gandhinagar (23.16, 72.68; Gandhinagar) | 220 kV in city; 400 kV Dehgam ~25 km | Narmada supply; semi-critical [E] | III | 43/28; ~900 | IFSC, BFSI DR | 5.3/6/8.0/5/3/7/6/8/6 | 6.0 | B |
| 2 | Ahmedabad (23.02, 72.57; Ahmedabad) | 400 kV Dehgam / Vadavi, 15–25 km | Critical [E] | III | 43/28; ~900 | NIXI Ahmedabad | 5.3/6/8.0/4/3/7/6/8/7 | 5.9 | B |
| 3 | Jamnagar (22.47, 70.06; Jamnagar) | 400 kV Hadala/Jamnagar ~20 km | Desal | IV [E]; cyclone | 40/28; ~600 | Reliance AI campus [R, announced] | 5.8/4/6.9/4/3/5/8/8/3 | 5.3 | B |
| 4 | Dholera SIR (22.25, 72.19; Ahmedabad) | New 400 kV in SIR [E] | Saline; canal water | III; low-lying | 42/28; ~800 | Greenfield | 5.3/3/8.2/4/3/5/9/8/2 | 5.2 | C |

### West Bengal
- **Policy:** expiring around September 2026, so likely in renewal limbo now.
- **Tariff:** WBERC FY26 sets a ₹320/kVA demand charge [R]; the energy charge is unverified, and ≈ ₹7.5 effective is used [E].

| Rank | City | EHV node [E] | Water | Hazard | DB/WB; FC h [E] | Demand | Scores | Total | Tier |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Kharagpur (22.35, 87.32; Paschim Medinipur) | 400 kV Kharagpur ~10 km | Safe to semi-critical [E] | III; cyclone moderate | 40/29.5; ~800 | Backhaul for Digha CLS | 4.7/6/4.3/6/2/5/8/4/1 | 4.9 | C |
| 2 | Kolkata – New Town / Bengal Silicon Valley (22.57, 88.36; North 24 Parganas) | 400 kV Subhasgram ~25 km | Hooghly supply; mixed [E] | III; flood; cyclone (Amphan) | 37.5/29.5; ~1,000 | 22 MW op / 84 MW upcoming [R] | 5.2/6/3.5/5/2/4/6/4/5 | 4.8 | C |
| 3 | Digha (21.63, 87.51; Purba Medinipur) | Nearest 400 kV ~90 km → fails 25 km filter | Safe [E] | Very high cyclone | 36/29.5; ~300 | Jio CLS (pending) | 4.7/6/4.3/6/2/2/8/4/1 | 4.6 | C (CLS only) |

### Kerala
- **Policy:** no dedicated DC policy.
- **Tariff [R]:** KSERC Order of 5 December 2024, valid to 31 March 2027, sets energy charges of ₹6.75 (HT-I), ₹6.15 (110 kV) and ₹5.55 (220 kV). Demand charges are about ₹390–400/kVA [E]. Effective ≈ ₹6.23 at 220 kV.

| Rank | City | EHV node [E] | Water | Hazard | DB/WB; FC h [E] | Demand | Scores | Total | Tier |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Kochi – Kakkanad/Infopark (9.93, 76.27; Ernakulam) | 400 kV Kochi East ~10 km | Safe; ~3,000 mm rainfall | III; 2018 floods | 33.5/27.5; 0 | Cable landings (Tata, others) + NIXI | 7.5/8/7.5/7/1/5/4/4/6 | 6.3 | A |
| 2 | Thiruvananthapuram – Technopark (8.52, 76.94; Thiruvananthapuram) | 400 kV Pothencode ~15 km | Safe | III | 33/27; 0 | CLS + NIXI | 7.0/7/6.5/7/1/6/4/4/5 | 6.0 | B |

### Odisha
- **Policy:** Odisha 2022.
- **Tariff [R]:** OERC RST order of 24 March 2026 (FY27) sets EHT large industry at ₹250/kVA, with 580 paise/kVAh up to 60% load factor and 470 paise above. It also gives a 30 p rebate above 80% load factor and a 10% discount during solar hours from July 2026. Effective ≈ ₹5.96, the lowest found.

| Rank | City | EHV node [E] | Water | Hazard | DB/WB; FC h [E] | Demand | Scores | Total | Tier |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Jharsuguda (21.86, 84.01; Jharsuguda) | 765/400 kV Jharsuguda (PGCIL) ~10 km | Hirakud; safe [E] | II–III; inland | 45/27; ~1,000 | Nil; power-intensive industry hub | 9.0/2/6.5/7/3/8/9/6/1 | 6.3 | A |
| 2 | Bhubaneswar – Infovalley (20.30, 85.82; Khordha) | 400 kV Mendhasal ~15 km | Safe [E] | III; very high cyclone (Fani) | 41/29; ~400 | NIXI Bhubaneswar/Cuttack; planned CLS | 8.5/5/5.8/7/2/4/8/6/4 | 6.2 | B |

### Rajasthan
- **Policy:** Rajasthan 2025.
- **Tariff:** about ₹380/kVA + ₹6.50/kWh (aggregator, unconfirmed); effective ≈ ₹7.7 [E].

| Rank | City | EHV node [E] | Water | Hazard | DB/WB; FC h [E] | Demand | Scores | Total | Tier |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Jaipur – Mahindra World City/Sitapura (26.91, 75.79; Jaipur) | 400 kV Heerapura, 10–20 km | Over-exploited [E] → conditional | II | 43/27.5; ~2,300 | Moderate | 5.8/4/6.9/1/4/9/8/7/5 | 5.3 | B (conditional) |
| 2 | Jodhpur (26.24, 73.02; Jodhpur) | 400 kV Surpura ~10 km | Over-exploited [E] → conditional | II; heat | 44/26; ~1,700 | Bhadla solar | 6.3/2/6.3/1/3/9/9/7/2 | 5.0 | C |

### Madhya Pradesh
- **Policy:** MP IT Policy 2023.
- **Tariff:** MPERC FY27 HV-3 at 132 kV is ₹729/kVA, with 734/635 paise split by load factor (snippets; column mapping uncertain). Effective ≈ ₹8.2.

| Rank | City | EHV node [E] | Water | Hazard | DB/WB; FC h [E] | Demand | Scores | Total | Tier |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Bhopal (23.26, 77.41; Bhopal) | 400 kV Bhopal ~15 km | Semi-critical [E] | II | 41.5/26; ~1,800 | NIXI node | 4.4/4/8.5/5/5/9/8/6/4 | 5.7 | B |
| 2 | Indore – Super Corridor/Pithampur (22.72, 75.86; Indore/Dhar) | 400 kV Indore / Pithampur ~15 km | Over-exploited [E] → conditional | III | 41/26; ~1,800 | NIXI node | 4.4/5/8.8/2/5/7/8/6/5 | 5.2 | C |

### Secondary states

| State | City (lat, long; district) | Key raw facts | Scores | Total | Tier |
|---|---|---|---|---|---|
| Chhattisgarh | Nava Raipur (21.16, 81.79; Raipur) | Surplus coal-based state grid; 400 kV Raita ~25 km [E]; zone II; NIXI Raipur | 7.45/4/8.0/7/4/9/9/4/2 | 6.4 | A |
| Jharkhand | Ranchi (23.34, 85.31; Ranchi) | 400 kV Ranchi ~15 km [E]; zone II; mild plateau climate | 5.75/4/5.3/5/6/9/8/3/2 | 5.3 | B |
| Goa | Verna (15.36, 73.93; South Goa) | NIXI Panjim; ~430 km from Mumbai cable landings; zone III | 5.1/4/9.4/7/2/6/4/4/2 | 5.3 | B |
| Uttarakhand | Dehradun (30.32, 78.03; Dehradun) | Zone IV (Zone VI in the withdrawn 2025 draft); cool climate; hydro | 6.5/3/4.5/7/8/4/4/4/3 | 5.1 | C |
| Himachal Pradesh | Baddi–Nalagarh (30.95, 76.79; Solan) | Low hydro tariff [E]; 400 kV Nalagarh ~10 km; zone IV | 8.0/2/4.2/5/7/4/6/3/1 | 4.9 | C |
| Punjab | Mohali (30.70, 76.72; SAS Nagar) | PSERC FY26 industrial ₹5.82–7.04/kVAh [R]; over-exploited [E]; zone IV; NIXI Chandigarh | 6.1/5/4.2/2/5/6/6/4/5 | 4.8 | C |
| Bihar | Patna (25.59, 85.14; Patna) | Zone IV; Ganga floods; NIXI node | 3.8/4/4.5/6/3/3/7/4/2 | 4.2 | C |
| Assam / NE | Guwahati (26.14, 91.74; Kamrup Metro) | Zone V; Brahmaputra floods; NIXI core node | 4.7/4/0/7/4/1/7/4/2 | 4.0 | **Excluded (zone V)** – regional edge only, with seismic isolation |

## National master table (default weights)

| # | City | State | District | Lat | Long | Score | Tier | Key strength | Key weakness |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Hyderabad periphery | Telangana | Rangareddy | 17.10 | 78.20 | 7.2 | A | Grid + ₹6.65/kVAh + zone II | No cable landing (Vizag/Chennai backhaul) |
| 2 | Visakhapatnam | AP | Visakhapatnam/Anakapalli | 17.69 | 83.22 | 6.8 | A | Gigawatt anchor + new cable landings + policy | Cyclone |
| 3 | Hyderabad core | Telangana | Rangareddy | 17.44 | 78.35 | 6.7 | A | Ecosystem, talent | Land cost, water |
| 4 | Navi Mumbai | Maharashtra | Thane/Raigad | 19.03 | 73.03 | 6.6 | A | Cables, interconnection | Tariff ≈ ₹8.7, land |
| 5 | Mysuru | Karnataka | Mysuru | 12.30 | 76.64 | 6.5 | A | Climate, water, policy | Thin ecosystem |
| 6 | Greater Noida (NIDP) | UP | Gautam Buddh Nagar | 28.47 | 77.50 | 6.4 | A | DC tariff ₹6.95, 765 kV | Zone IV, heat |
| 7 | Hoskote | Karnataka | Bengaluru Rural | 13.07 | 77.80 | 6.4 | A* | Bengaluru latency, cooler climate | Over-exploited water |
| 8 | Sri City | AP | Tirupati | 13.53 | 79.99 | 6.4 | A | Near Chennai cable landings, AP policy | Humid, water |
| 9 | Nava Raipur | Chhattisgarh | Raipur | 21.16 | 81.79 | 6.4 | A | Cheap surplus power, zone II | Coal grid, no ecosystem |
| 10 | Warangal | Telangana | Hanamkonda | 17.97 | 79.59 | 6.4 | A | Land, grid | Talent |
| 11 | Pune | Maharashtra | Pune | 18.52 | 73.86 | 6.3 | A | 120 km to Mumbai, land | Tariff |
| 12 | Nagpur | Maharashtra | Nagpur | 21.15 | 79.09 | 6.3 | A | Geographic centre, zone II | Tariff, heat |
| 13 | Kochi | Kerala | Ernakulam | 9.93 | 76.27 | 6.3 | A | Cable landings + cheap EHT | Policy, land |
| 14 | Anantapur | AP | Anantapur | 14.68 | 77.60 | 6.3 | A* | RE pooling, land | Water, connectivity |
| 15 | Jharsuguda | Odisha | Jharsuguda | 21.86 | 84.01 | 6.3 | A | Cheapest tariff, 765 kV | Connectivity, talent |
| 16 | Bhubaneswar | Odisha | Khordha | 20.30 | 85.82 | 6.2 | B | Tariff | Cyclone |
| 17 | Amaravati | AP | Guntur/NTR | 16.51 | 80.52 | 6.2 | B | Policy, land | Connectivity |
| 18 | Bengaluru core | Karnataka | Bengaluru Urban | 12.97 | 77.59 | 6.1 | B* | Demand, talent | Water (395% East) |
| 19 | Mangaluru | Karnataka | Dakshina Kannada | 12.91 | 74.86 | 6.1 | B | Water, coast | EHV distance |
| 20 | Noida | UP | Gautam Buddh Nagar | 28.54 | 77.39 | 6.1 | B | NIXI, demand | Water, land |
| 21 | GIFT City | Gujarat | Gandhinagar | 23.16 | 72.68 | 6.0 | B | IFSC, RE | Heat |
| 22 | YEIDA/Jewar | UP | Gautam Buddh Nagar | 28.17 | 77.60 | 6.0 | B | Land | Ecosystem |
| 23 | Thiruvananthapuram | Kerala | Thiruvananthapuram | 8.52 | 76.94 | 6.0 | B | Cable landing, tariff | Latency to north |
| 24 | Ahmedabad | Gujarat | Ahmedabad | 23.02 | 72.57 | 5.9 | B | NIXI, policy | Water |
| 25 | Nashik | Maharashtra | Nashik | 20.00 | 73.79 | 5.8 | B | Near Mumbai, safe water | Tariff |
| 26 | Hosur | Tamil Nadu | Krishnagiri | 12.74 | 77.83 | 5.7 | B | Bengaluru spill-over | TN policy lapsed |
| 27 | Bhopal | MP | Bhopal | 23.26 | 77.41 | 5.7 | B | Zone II, land | Tariff ≈ ₹8.2 |
| 28 | Chennai | Tamil Nadu | Chennai and neighbours | 13.08 | 80.27 | 5.5 | B* | 8 cables, 214 MW | Water, flood, policy lapse |
| 29 | Gurugram | Haryana | Gurugram | 28.46 | 77.03 | 5.5 | B* | Demand | Water (136.75% state) |
| 30 | Lucknow | UP | Lucknow | 26.85 | 80.95 | 5.5 | B | Policy | Water, connectivity |
| 31 | Coimbatore | Tamil Nadu | Coimbatore | 11.02 | 76.96 | 5.4 | B | Wind RE | Policy |
| 32 | Jamnagar | Gujarat | Jamnagar | 22.47 | 70.06 | 5.3 | B | Captive RE | Connectivity |
| 33 | Jaipur | Rajasthan | Jaipur | 26.91 | 75.79 | 5.3 | B* | Zone II, RE | Water |
| 34 | Ranchi | Jharkhand | Ranchi | 23.34 | 85.31 | 5.3 | B | Climate, zone II | Policy |
| 35 | Goa (Verna) | Goa | South Goa | 15.36 | 73.93 | 5.3 | B | Latency, water | Scale |
| 36 | Thoothukudi | Tamil Nadu | Thoothukudi | 8.76 | 78.13 | 5.2 | C | Cable landing + RE | Latency, talent |
| 37 | Dholera | Gujarat | Ahmedabad | 22.25 | 72.19 | 5.2 | C | Land | Connectivity |
| 38 | Indore | MP | Indore | 22.72 | 75.86 | 5.2 | C* | Latency | Water, tariff |
| 39 | Kanpur | UP | Kanpur Nagar | 26.45 | 80.33 | 5.2 | C | Policy | Connectivity |
| 40 | Dehradun | Uttarakhand | Dehradun | 30.32 | 78.03 | 5.1 | C | Free cooling | Seismic |
| 41 | Sonipat | Haryana | Sonipat | 28.99 | 77.02 | 5.0 | C* | Grid | Water |
| 42 | Jodhpur | Rajasthan | Jodhpur | 26.24 | 73.02 | 5.0 | C* | Solar | Water, connectivity |
| 43 | Kharagpur | West Bengal | Paschim Medinipur | 22.35 | 87.32 | 4.9 | C | Digha backhaul | Policy, demand |
| 44 | Baddi | HP | Solan | 30.95 | 76.79 | 4.9 | C | Hydro tariff | Seismic, connectivity |
| 45 | Kolkata | West Bengal | North 24 Parganas | 22.57 | 88.36 | 4.8 | C | Eastern demand | Hazard, latency, policy |
| 46 | Mohali | Punjab | SAS Nagar | 30.70 | 76.72 | 4.8 | C* | Tariff | Water, latency |
| 47 | Delhi | Delhi | various | 28.61 | 77.21 | 4.7 | C | Interconnection | Water, land, tariff |
| 48 | Digha | West Bengal | Purba Medinipur | 21.63 | 87.51 | 4.6 | C | Cable landing | Cyclone, no EHV within 25 km |
| 49 | Patna | Bihar | Patna | 25.59 | 85.14 | 4.2 | C | — | Flood, zone IV |
| — | Guwahati | Assam | Kamrup Metro | 26.14 | 91.74 | 4.0 | Excluded | NE edge | Zone V |

\* = conditional on a contracted treated-water source (groundwater over-exploited).

## Alternate weightings and rank stability

| City | Default | AI campus | Interconnect | Sustainability | Geo-mean |
|---|---|---|---|---|---|
| Hyderabad periphery | 7.2 | 7.0 | 7.9 | 6.6 | 7.0 |
| Visakhapatnam | 6.8 | 6.6 | 7.1 | 6.2 | 6.3 |
| Hyderabad core | 6.7 | 6.2 | 7.8 | 5.9 | 6.3 |
| Navi Mumbai | 6.6 | 5.5 | **8.2** | 6.1 | 6.0 |
| Mysuru | 6.5 | 6.4 | 6.0 | **7.2** | 6.1 |
| Greater Noida | 6.4 | 6.2 | 7.0 | 5.3 | 6.2 |
| Hoskote | 6.4 | 6.0 | 7.2 | 6.0 | 5.8 |
| Sri City | 6.4 | 6.2 | 6.9 | 5.5 | — |
| Nava Raipur | 6.4 | 7.0 | 5.8 | 5.6 | 5.9 |
| Pune | 6.3 | 5.6 | 7.2 | 6.3 | 6.1 |
| Nagpur | 6.3 | 6.0 | 6.2 | 6.5 | — |
| Kochi | 6.3 | 6.2 | 6.9 | 5.6 | — |
| Anantapur | 6.3 | 6.7 | 5.9 | 6.1 | — |
| Jharsuguda | 6.3 | **7.4** | 5.0 | 5.2 | — |
| Bhubaneswar | 6.2 | 6.8 | 5.7 | 5.2 | — |
| Bengaluru core | 6.1 | 5.4 | 7.5 | 5.6 | 5.0 |
| Noida | 6.1 | 5.4 | 7.2 | 5.0 | — |
| GIFT City | 6.0 | 5.8 | 6.4 | 6.2 | — |
| Chennai | 5.5 | 4.6 | 7.6 | 4.7 | 4.7 |
| Gurugram | 5.5 | 5.1 | 6.7 | 4.1 | 4.6 |
| Jamnagar | 5.3 | 5.6 | 5.1 | 5.6 | — |
| Kolkata | 4.8 | 4.8 | 4.9 | 4.0 | — |
| Delhi | 4.7 | 3.7 | 6.8 | 4.0 | 3.7 |

**What the sensitivity shows.**
- **Robust:** Hyderabad periphery is first or second in every lens. Visakhapatnam, Hyderabad core and Greater Noida stay at 6.2 or above in four of five lenses.
- **Lens-dependent:**
  - Navi Mumbai is #1 for interconnection but only mid-table for AI campuses, because of tariff and land.
  - Odisha and Chhattisgarh lead for AI campuses but trail for interconnection.
  - Mysuru leads for sustainability; Pune and Nagpur also rise there.
- **Fragile:** Bengaluru core, Gurugram, Chennai and Delhi lose 0.8–1.0 points under the geometric mean, because water is a near-fatal weakness that an arithmetic average hides. The geometric mean also penalises every humid coastal site (Vizag, Chennai, Kochi), since a climate score of 1 is treated as fatal. That is an artefact: humid sites can use closed-loop liquid cooling. Read their geo-mean scores with that in mind.

## Recommendations — top picks by use case

- **AI training campus (100 MW–1 GW, power/RE-led):**
  1. **Visakhapatnam:** best combination of power, policy, subsea access and anchor tenants. Design for cyclones, with an elevated plinth, wind-rated envelopes and N+2 grid feeds.
  2. **Hyderabad periphery.**
  3. **Odisha (Jharsuguda/Bhubaneswar):** cheapest tariff at ≈ ₹5.96. Pair it with ISTS RE open access, because the base grid is coal-heavy.
  4. **Anantapur:** RE-pooling land, but only with a treated-water or air-cooled design.
  5. **Nava Raipur.**
- **Interconnection / colocation:** Navi Mumbai (8.2), Hyderabad (7.8–7.9), Chennai (7.6), Bengaluru (7.5), and Noida/Greater Noida for NCR. In Chennai and Bengaluru, buy into TTRO/recycled-water-served parks; do not rely on borewells.
- **Edge / regional:** Lucknow, Bhubaneswar, Kochi, Ahmedabad, Indore/Bhopal, Ranchi, Patna, Guwahati, Nagpur and Goa. Size them at 1–10 MW and co-locate near NIXI regional nodes. The NIXI node map shows where ISP peering density already exists.
- **Sustainability-first:**
  - **Mysuru:** best combination of climate and water, with Karnataka's ₹20 cr incentive for PUE ≤ 1.20 achievable at about 2,000 free-cooling hours.
  - **Hyderabad periphery, Nagpur, Pune.**
  - **GIFT City:** Gujarat RE.
  - **Kochi:** water plus hydro, but humid.
- **Avoid for new greenfield builds:** Delhi proper, Gurugram and Bengaluru core, unless the site comes with contracted recycled water. Also avoid Digha (cable landing only, no EHV within 25 km), Guwahati (zone V) and Patna (flood plus zone IV).

## Caveats and data gaps (and how to close them)

1. **Substation spare capacity [U].** No STU publishes per-substation MVA headroom.
   - **Request:** a feasibility/load-flow study from MSETCL, TANTRANSCO, KPTCL, TGTRANSCO, APTRANSCO, UPPTCL, HVPNL, DTL, GETCO, WBSETCL, KSEB-T, OPTCL, RVPN, MPPTCL and CSPTCL.
   - **Central sources:** CTUIL's ISTS connectivity/GNA margins, and CEA's transmission plans. Grid-India publishes some regional ATC/TTC data.
   - **Unverified:** all substation names and distances above. Confirm them on STU single-line diagrams.
2. **Tariff conflicts.**
   - Maharashtra's HT-I(A) FY27 figure appears as ₹7.11, ₹7.27 or ₹7.48/kVAh across MERC documents, with ₹555–565/kVA. Rely on the MERC Case 217/2024 schedule.
   - Karnataka HT-2(a), Gujarat demand-charge slabs, West Bengal energy charges, Andhra Pradesh HT-I energy charges, Rajasthan, MP column mapping, Kerala demand charges, and Delhi are unverified or estimated.
   - Effective ₹/kWh excludes electricity duty, which varies by state (for example, 15% for HT in Gujarat and 9.3% in Maharashtra [secondary]), and excludes fuel surcharges.
3. **Water.** Only Bengaluru Urban, Chennai, Haryana/Gurugram and the national figures are reported. Everything else is [E].
   - **Pull from IN-GRES** (ingres.iith.ac.in): the block-level 2025 categories.
   - **Pull from state STP inventories:** BWSSB, CMWSSB, HMWSSB, NMMC.
4. **Climate.** Design values and free-cooling hours are approximations. Compute exact hours from ISHRAE/ASHRAE TMY files, counting hours where wet-bulb + 4 K approach ≤ 27 °C for evaporative designs, or dry-bulb ≤ 20–25 °C for air-side economisers.
5. **Hazards.** Flood and cyclone ratings are qualitative. Check the NRSC Bhuvan flood hazard atlas and NDMA cyclone hazard zones at plot level. Seismic zones use IS 1893:2016, because the 2025 revision was withdrawn in March 2026.
6. **Forward-looking claims.** These are announcements or plans, not commissioned assets:
   - Visakhapatnam's "5 GW", the 2.1 GW Raiden power application, and the Vizag cable landings.
   - The Digha cable landing ("Q1 2026" target).
   - Jamnagar.
   - Pipeline MW figures (C&W's 3,351 MW is still at "planning" stage).
7. **Talent.** AISHE graduate counts were not retrieved. The demand/talent scores are [E], based on IT-employment scale.

## Sources

1. <https://www.googlecloudpresscorner.com/2026-04-28-Google-Breaks-Ground-on-India-AI-Hub,-Launching-a-National-Industrial-Ecosystem-Alongside-Indias-Digital-Infrastructure-Milestone>
2. <https://www.cushmanwakefield.com/en/india/news/2026/09/india-data-centre-h1-2026-update>
3. <https://www.heavengreenenergy.com/blog/solar-for-hyderabad-pharma-cluster>
4. <https://www.mvapulse.com/telangana-hikes-open-access-charges-for-fy-2026-27/>
5. <https://vyqon.in/tgerc-issues-tariff-order-for-fy-2026-27-retail-rates-retained-surcharges-and-tod-charges-revised/>
6. <https://www.business-standard.com/technology/tech-news/google-begins-work-on-15-bn-ai-hub-in-vizag-boosting-india-s-digital-push-126042801073_1.html>
7. <https://github.com/SundareshPrasanna/neer-vazhvu/pull/395>
8. <https://www.deccanherald.com/amp/story/india%2Fkarnataka%2Fgroundwater-overexploited-30-taluks-2166757>
9. <https://www.dtnext.in/news/tamilnadu/9-dists-overexploit-groundwater-756724>
10. <https://cgwb.gov.in/cgwbpnm/public/uploads/documents/17667446742062160499file.pdf>
11. <https://www.tribuneindia.com/news/haryana/groundwater-crisis-in-state-88-of-143-blocks-over-exploited-630848>
12. <https://visionias.in/current-affairs/upsc-daily-news-summary/article/2026-03-07/the-economic-times/environment/bis-revokes-new-seismic-map-with-high-risk-zone-vi>
13. <https://www.studyiq.com/articles/indias-new-earthquake-design-code-2025/>
14. <https://www.orierc.org/CuteSoft_Client/writereaddata/upload/DISCOMs_Tariff_Notification_FY_2026-27.PDF>
15. <https://tced.in/admin/Downloads/7089_8357.pdf>
16. <https://www.businessworld.in/article/india-cheap-internet-undersea-cable-vulnerability-war-zones-2026-598929>
17. <https://takshashila.org.in/content/publications/20260720-subsea-cable-governance.html>
18. <https://www.jll.com/en-in/insights/market-dynamics/india-data-centers>
19. <https://en.wikipedia.org/wiki/2Africa>
20. <https://x.com/TheBengalIndex/status/1839679981376463084>
21. <https://upstox.com/news/business-news/latest-updates/submarine-cable-landing-station-in-digha-by-2026-mamata-s-principal-chief-advisor-amit-mitra/article-118861/>
22. <https://www.manoramayearbook.in/current-affairs/india/2026/01/21/national-internet-exchange-of-india-nixi.html>
23. <https://www.datacentermap.com/ixp/nixi/>
24. <https://en.wikipedia.org/wiki/List_of_Internet_exchange_points_by_size>
25. <https://www.internetexchangemap.com/>
26. <https://www.pib.gov.in/PressReleasePage.aspx?PRID=1840368>
27. <https://www.sunwavetech.com/blog/maharashtra-net-metering-industrial-guide>
28. <https://www.hrawi.com/(S(ecgvxkqnnngmltkotnjrevx1))/pdf/Press-Note_MYT-Order_MSEDCL_English-2.pdf>
29. <https://www.ascconline.com/blog/ttc-industrial-area-navi-mumbai-maharashtra-india/>
30. <https://www.crematrix.com/blog/stt-global-data-centres-acquires-land-in-navi-mumbai-for-%E2%82%B9282-crore/>
31. <https://ilovenavimumbai.com/navi-mumbai-industrial-land-values-rents-and-yield-guide/>
32. <https://www.mahaindustry.com/midc-land-rates.php>
33. <https://www.nobroker.in/interiors/design-guides/commercial-electricity-rate-per-unit-in-tamilnadu/>
34. <https://pwrnxt.in/blog/tamil-nadu-ci-tariff-decoded>
35. <https://www.submarinenetworks.com/en/stations/asia/india>
36. <https://hrecs.co.in/app/documents/TariffRates2026-27-28.pdf>
37. <https://www.electrical4u.net/calculator/telangana-electricity-tariff-bill-calculator-power-reading-calculator/>
38. <https://www.deccanchronicle.com/southern-states/andhra-pradesh/no-tariff-hike-as-aperc-issues-retail-power-order-for-202627-1946233>
39. <https://www.mercomindia.com/andhra-pradesh-retains-existing-power-tariffs-for-fy-2027>
40. <https://aperc.gov.in/admin/upload/English.pdf>
41. <https://powerpeakdigest.com/uperc-retains-fy27-power-tariffs-raises-subsidy-and-expands-ev-benefits/>
42. <https://www.squareyards.com/blog/yeida-plot-scheme-yojart>
43. <https://herc.org.in/content/2207_1_pressrelease.aspx>
44. <https://www.tribuneindia.com/news/haryana/haryana-revises-power-tariffs-domestic-consumers-face-higher-rates-starting-april-1/>
45. <https://dhbvn.org.in/staticContent/saleregulation/salecircular/circular2025/04_D_2025.pdf>
46. <https://gercin.org/wp-content/uploads/2026/03/TARIFF-SCHEDULE-of-GIFT-PCL-w.e.f.-01.04.2026.pdf>
47. <https://solarquarter.com/2026/09/16/gerc-sets-inr-0-99-kwh-additional-surcharge-for-gujarat-open-access-consumers-from-october-2026/>
48. <https://bridgewaypower.in/blog/gujarat-gerc-ht-tariff-2026-27>
49. <https://gercin.org/viewdocument/T3JkZXJzX2ZpbGVzXzU2NjNfMjctMDctMjAyNl83MzM3NjQ0>
50. <https://www.wbsedcl.in/irj/go/km/docs/internet/new_website/pdf/Tariff_Volumn/Gist%20of%20Tariff%20Order%202025-26_28_03.pdf>
51. <https://dev.erckerala.org/api/storage/orders/vnp1XnN5z47r0dCh18rj3s2e1q2utii3T8AtwUMm.pdf>
52. <https://www.slideshare.net/slideshow/presentation-indian-submarine-cable-network/63984068>
53. <https://electricbill.in/en/tariffs/rajasthan>
54. <https://portal.mpcz.in/upload_files/pdf/mperc_regulation/tariff_details/HT_tariff/Tariff_HT_Year_26_27.pdf>
55. <https://www.tribuneindia.com/news/punjab/no-change-in-power-tariff-for-domestic-commercial-users/amp>
56. <https://docs.pspcl.in/docs/cecommercial2520250329183246514.pdf>
