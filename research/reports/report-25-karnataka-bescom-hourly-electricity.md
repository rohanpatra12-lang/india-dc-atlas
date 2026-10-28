<!-- Report 25 of the India Data Centre Atlas research series (Karnataka and Bengaluru (BESCOM) hourly electricity and a data-centre overlay). Produced with AI-assisted web research, Oct 2026, and kept as written at the time. The atlas standards register (src/data/standards.js) is authoritative where figures differ (for example India grid water 2.9 L/kWh and grid CO₂ 0.675 t/MWh after the October 2026 corrections). -->

# Karnataka & Bengaluru (BESCOM) Hourly Electricity: Load Tables, ToD Tariffs, Hourly Generation Mix, and Data-Centre Overlay for the India Data Centre Atlas

A 1 GW data-centre build-out would raise Karnataka's peak demand by about 5–8% and BESCOM's by 11–14%. Unlike today's 162 MW fleet, which barely shows up at state level, that is material. The overlay also shows two things the atlas currently gets wrong. First, the real KERC time-of-day (ToD) tariff is a flat ±₹1/kWh (about ±15% on ₹6.70), applies only December–June, and has no solar-hour rebate. Second, Karnataka's own hourly grid is cleaner than the all-India factor: about 0.36–0.59 tCO₂/MWh on a seasonal-average basis, against the 0.71 the atlas uses.

## TL;DR
- **Data:** No public archive gives hourly or 15-minute BESCOM load. Best options:
  - Scrape and archive the KPTCL SLDC real-time portal yourself.
  - Use the Hugging Face SLDC scrape (Apr–Aug 2024) for BESCOM-share shapes.
  - Use Grid-India daily reports, or the Zenodo/GitHub extractions (2013–2024), for daily peaks and energy.
  - Use the CEA Karnataka Resource Adequacy plan, which is built on 2022-23 hourly data, plus energymap.in for seasonal shape.
  - Every hourly table below is **reconstructed** and calibrated to published peaks, energy totals and ramps. None is a measured series.
- **Grid and tariff:**
  - Karnataka is a **daytime-peaking** state, driven by daytime farm pumps plus commercial load. Peaks rose from 17,220 MW (12 Feb 2024) to about 18,395 MW (Mar 2025). They reached 20,093 MW in September 2026 when the monsoon failed (Deccan Herald). NewsKarnataka dates that peak to 11 September and gives 20,094 MW.
  - The actual KERC ToD for HT-2(a) (the tariff class data centres fall under, with a state IT-department certificate) is: +₹1/kWh 06–09 and 18–22, –₹1/kWh 22–06, no adjustment 09–18, and ToD applies only December–June.
  - That structure rewards night consumption, not solar-hour consumption.
- **Overlay:**
  - A flat 1 GW AI-training fleet (about 1,080 MW at the meter, 9.46 TWh/yr) adds about 6–8% to the state peak, 12–14% to BESCOM's peak, and about 9% to state energy.
  - It could meet only about 43% of its hourly demand directly from solar, even with energy-matched solar of about 5.6 GW. The other ~57% needs wind, hydro, batteries or grid power.
  - Under Karnataka's hourly mix it emits about 4.5 Mt CO₂/yr and drives about 16 GL/yr of thermal-plant water use. The atlas's flat factors give 6.7 Mt and 19 GL.

## Key Findings

1. **Karnataka's load shape is unusual for India: a morning/daytime peak, not an evening one.**
   - CEA's Resource Adequacy (RA) study, built on 2022-23 hourly data, finds that "the peak electricity load is generally observed during day hours." Peak season is January–March and the lowest demand comes in October.
   - The cause is policy. Down To Earth (19 Nov 2025) reports that about 35% of agricultural load, traditionally met at night, was moved to daytime to coincide with solar generation.
   - The binding constraint is the *net-load* evening ramp: demand minus solar and wind. energymap.in puts it at about 5.0 GW for Karnataka in 2025, and the reconstruction below reproduces 5.2 GW.

2. **Reliability is the issue, not total energy.**
   - The SLDC adequacy assessment, reported by Down To Earth, projects a loss-of-load probability of 5.62% for FY27, far above the 0.20% target. That is nearly 500 hours of unmet demand. The shortfalls cluster in March (284 h) and April (201 h).
   - The FY27 projected peak of 19.7 GW was already passed by the 20,093 MW recorded on 11 September 2026.
   - Any firm 1 GW data-centre load lands directly on these deficit hours.

3. **The atlas's ToD assumption needs fixing.**
   - Under KERC's Tariff Order of 27 Mar 2025, HT-2(a) explicitly lists "Data Centres (on production of necessary certificate issued by Department of Electronics, IT, BT and S&T)". ToD is compulsory at 500 kVA and above.
   - ESCOM HT-2(a) rates after the review order of 3 March 2026 (as reported by PTI) are ₹6.70/kWh energy and ₹365/kVA/month demand.
   - For a flat data-centre load, ToD *lowers* the annual bill by only about 0.3–0.4%. The atlas's ±20% band overstates the price signal and puts it in the wrong hours.

4. **Hourly grid intensity differs a lot by hour and season:**
   - Summer midday: about 0.41 t/MWh. Summer night: about 0.70 t/MWh.
   - Normal-monsoon midday: about 0.28 t/MWh, while the state exports surplus.
   - Annual mean for a flat load: about 0.47 t/MWh. The CEA all-India weighted average is 0.727 for FY24 and a provisional 0.710 for FY25 (CEA CO₂ Baseline Database v21.0, Dec 2025).
   - Grid water from thermal plants averages about 1.7 L/kWh for a flat load, ranging from 1.0 (monsoon midday) to 2.6 L/kWh (summer night). This is close to the atlas's 2.0 L/kWh.

5. **Bengaluru's grid connections are the real bottleneck.**
   - A 1 GW cluster needs about 1.1 GVA. The new Doddathaggalli 400/220 kV GIS substation near Hoskote has 3×500 MVA. With one transformer out, its 1,000 MVA of firm capacity is less than a single 1 GW campus needs.
   - The state's proposed 500 MW Hoskote data-centre park, supplied with Pavagada solar and 60 MLD of treated water, is the right scale for one substation.

## Details

### 1. Data availability (where hourly or 15-minute Karnataka/BESCOM load can be found)

| Source | What it gives | Resolution | Years | BESCOM-level? | Notes |
|---|---|---|---|---|---|
| KPTCL SLDC real-time portal (https://kptclsldc.in) | State demand, ESCOM-wise load (BESCOM, HESCOM, GESCOM, CESC, MESCOM), frequency, interchange | ~15 min, live | Live only | **Yes** | No archive. One snapshot showed state 11,378 MW with BESCOM 4,198 MW (≈37%). Scrape and store it yourself. |
| KPTCL "Download Daily Load Curve" (loadcurve.kptcl.net/LoadCurveUpload/lcdownloadview.asp) | Daily state load-curve files | Hourly/intra-day curves | Historical archive | State only | Cited by Wikipedia and by the IISc load-clustering paper. Not opened in this research, so format and coverage need checking. |
| Hugging Face happyman11/Karnataka-SLDC | Scraped SLDC fields: BESCOM, other ESCOMs, Pavagada solar, CGS exchange, frequency | ~15 min | 22 Apr–14 Aug 2024 | **Yes** | The only BESCOM time series found. Use it to calibrate BESCOM's share and shape. |
| Grid-India (formerly POSOCO) daily PSP reports | State energy met (MU), peak met (MW), shortage | Daily | 2013–present | State only | Extractions: Zenodo "Daily electricity demand data for Indian states (2014–2024)" (energy met, peak met, peak unmet); GitHub yashasr21/power-demand-forecast (3,892 usable Karnataka days, 2013–Apr 2024, third-party CSV extraction not checked against the PDFs). |
| CEA Resource Adequacy Plan for Karnataka (Final Draft, July 2024) | Month-wise average hourly profile chart, daily day/night peaks, contracted capacity, generation mix by source | Hourly (charts only) | 2022-23 base; projections to 2031-32 | State only | The underlying hourly series is not published. Best official description of the shape. |
| energymap.in (India Energy Atlas) | Live SLDC scrape, modelled hourly fuel mix and carbon, 30-day hour×day heatmaps | Hourly | 2022–2026 (history paywalled) | State only | Modelled. Its day-ahead forecast has ~11.8% MAPE, and it uses CEA v18 lifecycle factors. |
| Mendeley hourly all-India/regional dataset | Regional/national hourly | Hourly | 2021–2025 | No | Southern Region shape only. |
| KERC tariff orders (kerc.karnataka.gov.in) | Tariff schedules, ToD, ESCOM sales | Annual | FY26–FY28 (MYT order 27 Mar 2025, review 3 Mar 2026) | ESCOM-level sales | Tariff source of record. |
| Ember / IEEFA SET 2026 | State renewable share of procurement, emissions intensity | Annual | FY25 | No | Karnataka ≈37% RE in procurement. |

*Not verified in this research:* hourly state series from the NITI Aayog India Climate & Energy Dashboard, Vidyut Pravah or MERIT, and BESCOM-specific load studies by Prayas, CSTEP or WRI. Treat them as leads, not confirmed sources.

### 2. Peak, minimum and load-factor statistics (2023–2026)

| Metric | Value | Date | Source / note |
|---|---|---|---|
| Peak (drought monsoon) | 16,950 MW | 25 Aug 2023 | Energy Minister K J George; up from 11,268 MW in Aug 2022 |
| FY 2023-24 peak | 17,220 MW | 12 Feb 2024 | Karnataka Energy Department |
| Record daily energy, FY24 | 332 MU | 5 Apr 2024 | Energy Department |
| Monthly peaks, 2024 | Apr 16,985 MW; May 16,826 MW | 2024 | KPTCL MD Pankaj Kumar Pandey |
| Monthly peaks, 2025 | Jan 17,691; Feb 18,350; Mar 18,395 MW | 2025 | Energy Department data (Pandey also quoted 18,385 MW) |
| Record daily energy, FY25 | 357 MU | 19 Mar 2025 | KPTCL / The Week |
| Summer 2026 peak | ~18,655 MW | Mar 2026 | Deccan Herald, 18 Sep 2026 |
| **All-time peak (reported)** | **20,093 MW** | **11 Sep 2026** | Deccan Herald, 18 Sep 2026 ("owing to poor monsoons… a 7.7 per cent increase compared to last summer"); NewsKarnataka gives 20,094 MW |
| 30-day window peak/base (modelled + SLDC) | 21,053 / 9,746 MW | 19 Sep–19 Oct 2026 | energymap.in heatmap. **Conflicts** with the DH 20,093 MW figure; not verified |
| Projected FY27 peak / energy | 19.7 GW / 107,998 MU | FY27 | SLDC resource-adequacy assessment (via Down To Earth) |
| Implied annual load factor | ≈62–63% | FY27 basis | 107,998 MU ÷ (19.7 GW × 8,760 h) |
| Daily load factor (reconstructed) | 0.81 (winter) – 0.86 (monsoon) | Typical weekdays | From the tables below |

Time of day of the records: no published timestamps were found for the 2024–2026 records. CEA says peaks occur "during day hours". On 19 Oct 2026, energymap logged the day's peak at 08:30 IST. The last timestamped BESCOM peaks are older: 5,869 MW at 11:09 on 2 April (about 2019) and 4,201 MW at 09:01 on 24 Jan 2014. Both fall in the morning. BESCOM forecast its own summer-2023 maximum at 7,600 MW (March) and 7,650 MW (April), with 132–135 MU/day.

### 3. Consumer composition and why the curves look the way they do

- **Farm irrigation pumps (IP sets).** There are about 30 lakh pumps statewide. Pumps of 10 HP and below get free power, with the state subsidy budgeted at ₹16,021 crore plus an extra ₹2,362.47 crore in the 2026 review.
  - The government promises 7 hours of uninterrupted daytime three-phase supply.
  - BESCOM's own operating note describes 6–7 hours of three-phase supply: 4 hours by day and 2–3 hours at night under the 2014 GO. It gives a continuous 7-hour daytime block "where technically feasible" and batches elsewhere.
  - Solarising farm feeders under PM-KUSUM-C (2,400 MW tendered) reinforces the shift to daytime pumping.
  - This is what pushes the state peak into 08:00–12:00 in dry months, and why a failed monsoon (Aug 2023, Sep 2026) produces record peaks.
- **Bengaluru (BESCOM).** BESCOM covers Bengaluru Urban and Rural, Tumakuru, Kolar, Chikkaballapur, Ramanagara and Chitradurga.
  - Its curve mixes urban residential and commercial load, which peaks in the evening and around 10:00–11:00, with IT parks running through the day and heavy pump load in the rural districts.
  - The result is a morning peak with a stronger evening shoulder than the state curve.
  - BESCOM's share is roughly 37% of instantaneous state demand (SLDC snapshot) and about 47% of state power purchases (Ember SET 2024).
- **IT, GCCs and data centres** are billed as *industrial* (HT-2(a)/LT-5), not commercial. That gives them flat, near-24×7 base load.

### 4. State hourly load tables (RECONSTRUCTED, typical weekday, 2025-26 level)

**Method:**
- Hourly shapes follow the CEA RA description (day-hour peak, Jan–Mar high, Jun–Oct low) and the ~35% daytime pump shift.
- They are scaled to typical-weekday anchors: summer peak 17,500 MW (record days run ~18,400–18,650), normal-monsoon peak 13,500 MW, winter peak 16,000 MW.
- Checks:
  - Monsoon daily average of 11.57 GW, against an August 2024 average of 11 GW (Down To Earth).
  - Summer net-load ramp of 5.2 GW, against energymap's 5.0 GW.
  - Implied annual energy of about 110 TWh, against the FY27 RA projection of 108 TWh.
- **Weekend:** apply about –5% to hours 09–18 and about –2% to other hours. This is an assumption, to be calibrated with the Hugging Face data.
- Hour = hour beginning, IST.

| Hour | Summer (Mar–May) MW | Monsoon (Jun–Sep, normal rain) MW | Winter (Nov–Feb) MW |
|---|---|---|---|
| 00 | 12,250 | 9,720 | 10,560 |
| 01 | 11,900 | 9,450 | 10,240 |
| 02 | 11,725 | 9,315 | 10,080 |
| 03 | 11,725 | 9,315 | 10,080 |
| 04 | 11,900 | 9,450 | 10,400 |
| 05 | 12,425 | 9,990 | 11,200 |
| 06 | 13,650 | 11,070 | 12,800 |
| 07 | 15,050 | 12,150 | 14,400 |
| 08 | 16,450 | 12,960 | 15,520 |
| 09 | 17,325 | 13,365 | **16,000** |
| 10 | **17,500** | **13,500** | 15,840 |
| 11 | 17,325 | 13,365 | 15,520 |
| 12 | 16,800 | 12,960 | 14,880 |
| 13 | 16,275 | 12,555 | 14,240 |
| 14 | 15,750 | 12,285 | 13,760 |
| 15 | 14,875 | 11,880 | 13,120 |
| 16 | 13,825 | 11,475 | 12,480 |
| 17 | 13,300 | 11,475 | 12,480 |
| 18 | 14,000 | 12,420 | 13,760 |
| 19 | 15,050 | 13,230 | 14,400 |
| 20 | 14,875 | 12,825 | 13,920 |
| 21 | 14,000 | 11,880 | 12,800 |
| 22 | 13,125 | 10,800 | 11,680 |
| 23 | 12,600 | 10,125 | 11,040 |
| **Min** | 11,725 | 9,315 | 10,080 |
| **Avg / daily MU** | 14,315 / 344 | 11,570 / 278 | 12,960 / 311 |
| **Daily load factor** | 0.818 | 0.857 | 0.810 |

### 5. BESCOM hourly load tables (RECONSTRUCTED)

**Method:**
- Same morning-peak structure as the state curve, but with a stronger evening shoulder (+0.05–0.06 of peak at 18–21).
- Anchors: summer 7,800 MW (BESCOM's 2023 forecast of 7,600–7,650 MW plus growth), monsoon 6,200 MW, winter 7,200 MW.
- Summer daily energy of about 156 MU, against BESCOM's 2023 forecast of 132–135 MU plus three years of growth.
- **Lowest-confidence table in this report.** Replace it once BESCOM 15-minute data has been archived.

| Hour | Summer MW | Monsoon MW | Winter MW |
|---|---|---|---|
| 00 | 5,304 | 4,216 | 4,896 |
| 01 | 5,148 | 4,092 | 4,752 |
| 02 | 5,070 | 4,030 | 4,680 |
| 03 | 5,070 | 4,030 | 4,680 |
| 04 | 5,226 | 4,154 | 4,824 |
| 05 | 5,616 | 4,464 | 5,184 |
| 06 | 6,240 | 4,960 | 5,760 |
| 07 | 6,864 | 5,456 | 6,336 |
| 08 | 7,410 | 5,890 | 6,840 |
| 09 | 7,722 | 6,138 | 7,128 |
| 10 | **7,800** | **6,200** | **7,200** |
| 11 | 7,722 | 6,138 | 7,128 |
| 12 | 7,488 | 5,952 | 6,912 |
| 13 | 7,254 | 5,766 | 6,696 |
| 14 | 7,098 | 5,642 | 6,552 |
| 15 | 6,786 | 5,394 | 6,264 |
| 16 | 6,474 | 5,146 | 5,976 |
| 17 | 6,396 | 5,084 | 5,904 |
| 18 | 6,786 | 5,394 | 6,264 |
| 19 | 7,254 | 5,766 | 6,696 |
| 20 | 7,176 | 5,704 | 6,624 |
| 21 | 6,708 | 5,332 | 6,192 |
| 22 | 6,084 | 4,836 | 5,616 |
| 23 | 5,616 | 4,464 | 5,184 |
| **Avg** | 6,513 | 5,177 | 6,012 |
| **Load factor** | 0.835 | 0.835 | 0.835 |

### 6. Generation: installed capacity, annual mix, hourly mix

**Installed capacity in Karnataka (MNRE/CEA, February 2026):**
- Thermal (coal and gas): 10,814.95 MW
- Nuclear: 698 MW
- Renewables: 26,421.47 MW, made up of:
  - solar 11,029.95 MW (including 840.9 MW rooftop and 358.85 MW hybrid)
  - wind 8,500.54 MW
  - large hydro 3,689.20 MW
  - biopower 1,917.05 MW
  - small hydro 1,284.73 MW
- Renewables are therefore about 70% of installed capacity.
- More than 18 GW of renewables is under construction (CEA, September 2025).

The state's main coal plants are KPCL's Raichur, Bellary and Yermarus stations. Central stations such as NTPC Kudgi add to this. The SLDC told CERC that Karnataka's central-station contracts total 6,568 MW in solar hours and 4,718 MW in non-solar hours, against 5,376 MW of General Network Access.

**Annual generation shares:**
- Renewables were 48.10% of Karnataka's electricity *generation* in 2024-25 (MoSPI Renewable Energy Statistics 2024-25).
- Renewables were only about 37% of its *procurement* (Ember/IEEFA SET 2026), because the procurement figure includes central coal stations.
- CEA's RA mix for 2024-25: coal 35,522 MU (≈40%), solar 18,328 MU (≈20%), wind 16,153 MU (≈18%), hydro 14,264 MU (≈16%), nuclear 3,740 MU (≈4%), biomass and market purchases ≈2%.
- CEA expects coal plant load factors of only 40–49% through 2032, because the peak falls in solar hours.

**Hourly mix, summer weekday (RECONSTRUCTED; MW).**
- Solar is scaled to 11 GW, giving about 50.7 MU/day. energymap records 40–65 GWh/day for Oct 2026.
- Wind is low in March–May. Hydro is held back for the evening.
- "Residual" means coal, central coal stations and net market purchases.
- Intensity assumes 0.95 tCO₂/MWh for the residual and zero for the other sources.
- Water assumes 3.5 m³/MWh for the residual, the MoEFCC 2015 consumption limit for cooling-tower plants (CSE puts the fleet average near 4).

| Hour | Demand | Solar | Wind | Hydro | Nuclear | Bio/other | Residual (coal+CGS+market) | tCO₂/MWh | L/kWh |
|---|---|---|---|---|---|---|---|---|---|
| 00 | 12,250 | 0 | 1,300 | 900 | 550 | 500 | 9,000 | 0.698 | 2.57 |
| 01 | 11,900 | 0 | 1,300 | 800 | 550 | 500 | 8,750 | 0.699 | 2.57 |
| 02 | 11,725 | 0 | 1,300 | 800 | 550 | 500 | 8,575 | 0.695 | 2.56 |
| 03 | 11,725 | 0 | 1,250 | 800 | 550 | 500 | 8,625 | 0.699 | 2.58 |
| 04 | 11,900 | 0 | 1,200 | 900 | 550 | 500 | 8,750 | 0.699 | 2.57 |
| 05 | 12,425 | 0 | 1,100 | 1,200 | 550 | 500 | 9,075 | 0.694 | 2.56 |
| 06 | 13,650 | 100 | 1,000 | 1,800 | 550 | 500 | 9,700 | 0.675 | 2.49 |
| 07 | 15,050 | 900 | 900 | 2,000 | 550 | 500 | 10,200 | 0.644 | 2.37 |
| 08 | 16,450 | 2,600 | 800 | 1,800 | 550 | 500 | 10,200 | 0.589 | 2.17 |
| 09 | 17,325 | 4,300 | 700 | 1,500 | 550 | 500 | 9,775 | 0.536 | 1.97 |
| 10 | 17,500 | 5,700 | 700 | 1,200 | 550 | 500 | 8,850 | 0.480 | 1.77 |
| 11 | 17,325 | 6,600 | 700 | 900 | 550 | 500 | 8,075 | 0.443 | 1.63 |
| 12 | 16,800 | 7,000 | 700 | 700 | 550 | 500 | 7,350 | 0.416 | 1.53 |
| 13 | 16,275 | 6,900 | 750 | 600 | 550 | 500 | 6,975 | 0.407 | 1.50 |
| 14 | 15,750 | 6,300 | 800 | 600 | 550 | 500 | 7,000 | 0.422 | 1.56 |
| 15 | 14,875 | 5,100 | 850 | 700 | 550 | 500 | 7,175 | 0.458 | 1.69 |
| 16 | 13,825 | 3,400 | 900 | 900 | 550 | 500 | 7,575 | 0.521 | 1.92 |
| 17 | 13,300 | 1,500 | 1,000 | 1,500 | 550 | 500 | 8,250 | 0.589 | 2.17 |
| 18 | 14,000 | 300 | 1,100 | 2,600 | 550 | 500 | 8,950 | 0.607 | 2.24 |
| 19 | 15,050 | 0 | 1,200 | 3,000 | 550 | 500 | 9,800 | 0.619 | 2.28 |
| 20 | 14,875 | 0 | 1,250 | 2,800 | 550 | 500 | 9,775 | 0.624 | 2.30 |
| 21 | 14,000 | 0 | 1,300 | 2,200 | 550 | 500 | 9,450 | 0.641 | 2.36 |
| 22 | 13,125 | 0 | 1,300 | 1,500 | 550 | 500 | 9,275 | 0.671 | 2.47 |
| 23 | 12,600 | 0 | 1,300 | 1,100 | 550 | 500 | 9,150 | 0.690 | 2.54 |
| **Day** | 344 MU | 50.7 MU | — | — | — | — | 210 MU (61%) | 0.581 (demand-wtd) | 2.14 |

**Hourly intensity in the other seasons (RECONSTRUCTED).**
- Normal monsoon: wind ≈3.4 GW, hydro 1.8–3.0 GW. Own and central coal is held at a ≈4.5 GW must-run floor, so the state *exports* up to ≈3 GW at midday. That matches CEA's finding of 450–5,500 MW surplus in May–October.
- Winter: solar peaks at ≈6.5 GW, wind ≈1 GW, bagasse cogeneration ≈0.7 GW.
- The intensity shown is for in-state generation.

| Hour | 00–05 | 06 | 07 | 08 | 09 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22–23 | Flat-load mean |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Monsoon tCO₂/MWh | 0.405 | 0.392 | 0.407 | 0.367 | 0.335 | 0.304 | 0.288 | 0.280 | 0.275 | 0.282 | 0.300 | 0.328 | 0.355 | 0.380 | 0.429 | 0.413 | 0.370 | 0.390 | **0.363** |
| Winter tCO₂/MWh | 0.59–0.61 | 0.560 | 0.577 | 0.518 | 0.520 | 0.425 | 0.353 | 0.296 | 0.294 | 0.309 | 0.367 | 0.467 | 0.558 | 0.584 | 0.604 | 0.592 | 0.560 | 0.60–0.62 | **0.517** |
| Summer (from table above) | 0.69–0.70 | 0.675 | 0.644 | 0.589 | 0.536 | 0.480 | 0.443 | 0.416 | 0.407 | 0.422 | 0.458 | 0.521 | 0.589 | 0.607 | 0.619 | 0.624 | 0.641 | 0.67–0.69 | **0.592** |

Water intensity is about intensity ÷ 0.95 × 3.5. Examples: monsoon 13:00 ≈ 1.0 L/kWh, summer 00:00 ≈ 2.6 L/kWh. Weighted by season (summer 92 days, monsoon and October 153, winter 120), a flat load sees **0.471 tCO₂/MWh and 1.74 L/kWh**.

Sanity checks:
- energymap's live and modelled range for Karnataka over the last 90 days is 303–787 gCO₂/kWh, with a "greenest hour" of 328 g and 393 g at 09:30 on 19 Oct 2026. It uses lifecycle factors, so it reads somewhat higher.
- Curtailment of renewables is about 5%, according to KERC chair P. Ravi Kumar. He says older state coal units "cannot come down to 55 per cent" and run at 75–85%, which is why midday surplus becomes exports or curtailment rather than lower coal output.

### 7. Time-of-day tariffs and power-procurement rules

| Item | Current rule (FY 2025-26 to FY 2027-28 MYT order, 27 Mar 2025; review order 3 Mar 2026) |
|---|---|
| Data-centre category | **HT-2(a) industrial** (LT-5 if below HT), with a DoE IT/BT/S&T certificate. Not HT-2(b) commercial. |
| HT-2(a) ESCOM rates after review | Demand ₹365/kVA/month; energy ₹6.70/kWh (PTI, Mar 2026). Original MYT schedule: ₹345/350/355 per kVA and 660/660/650 paise for FY26/27/28. |
| HT-2(b) commercial after review | ₹390/kVA; ₹6.90/kWh (original MYT: ₹370/375/380 per kVA; 595/570/540 paise) |
| ToD applicability | Compulsory for HT-2(a)/(b)/(c) at contract demand ≥500 kVA; optional below that and for HT-1 and LT-5 |
| ToD, **Dec–Jun** | 06:00–09:00 **+100 paise**; 09:00–18:00 **0**; 18:00–22:00 **+100 paise**; 22:00–06:00 **–100 paise** |
| ToD, **Jul–Nov (monsoon)** | 0 in every slot (no ToD) |
| Solar-hour rebate | **None** in the current order (a 2022 incentive of ₹1/unit for 10:00–18:00 and ₹2/unit at night was temporary) |
| Billing demand | Higher of recorded maximum demand or 90% of contract demand; excess over contract demand charged at 2× |
| High-voltage rebate | 2 p/unit (33/66 kV), 3 p/unit (110 kV), 5 p/unit (220 kV) |
| Open access | KERC (Terms & Conditions for Open Access) Regulations, 2025. Eight charge heads: transmission, wheeling, cross-subsidy surcharge, additional surcharge, banking in kind, and others |
| Banking | **Monthly** banking at **8%** of banked energy, in kind (4% interim under the High Court directive). The High Court suggested KERC consider annual banking. |
| Green Energy Open Access Rules 2022 | **Struck down** by the Karnataka High Court, together with the KERC GEOA Regulations 2022. Interim terms: 50% of transmission charges and continued monthly banking until new regulations took effect |
| Green tariff | KERC introduced an optional green tariff (₹1/unit premium) for HT industry and commerce in 2011. The current premium was not verified |
| Data-centre policy 2026–31 | Approved in Sep 2026 at the Coastal Cabinet Meeting in Mangaluru (IT/BT Minister Priyank Kharge). Revised outlay of ₹1,300.45 crore over five years; target of 1 GW cumulative IT load by 2031 (10–12% of India's AI-ready capacity). PUE-linked incentive up to ₹20 crore; 100% reimbursement of treated-water charges, capped at ₹8 lakh/yr; mandatory plant-wise PUE/WUE reporting. Parks planned at Hoskote, Mangaluru and Mysuru. Itemised electricity-duty or tariff concessions not confirmed. |

**What this means:**
- The ToD signal is ±₹1/kWh, about ±15% on ₹6.70, not ±20%.
- It is active only 7 months of the year.
- Its cheapest window is 22:00–06:00, which is the grid's dirtiest (≈0.69 t/MWh in summer), not the solar trough.

### 8. Data-centre overlay

**Facility load formulas:**
- Facility MW(h) = IT capacity × utilisation × PUE × diurnal shape(h)
- (a) Today's fleet: 162 × 0.65 × 1.45 = **152.7 MW** average (±3% shape: 148 MW at night, 157 MW at 12–17)
- (b1) AI training: 1,000 × 0.90 × 1.20 = **1,080 MW** flat (1,125 MW at PUE 1.25)
- (b2) AI inference: 1,000 × 0.70 (assumed mean utilisation) × 1.20 = **840 MW** average. Shape peak/average = 1.19, peaking at **1,000 MW at 20:00**, trough 672 MW at 04:00
- (c) Conventional 1 GW: 1,000 × 0.65 × 1.45 = **942.5 MW** average (914 / 943 / 971 MW for night / shoulder / afternoon)
- Energy = average MW × 8,760: (a) **1,338 GWh**; (b1) **9,461 GWh**; (b2) **7,358 GWh**; (c) **8,256 GWh**
- These equal about 1.2%, 8.8%, 6.8% and 7.6% of FY27 projected state energy (108 TWh)

**Overlay on the state, by season.** Peak share = DC MW ÷ (state + DC) at the new peak hour. Load factor = (state average + DC average) ÷ new peak.

| Season | Metric | Baseline | (a) 162 MW | (b1) Training | (b2) Inference | (c) Conventional |
|---|---|---|---|---|---|---|
| Summer | New peak MW (hour) | 17,500 (10) | 17,653 (10) | 18,580 (10) | 18,357 (10) | 18,443 (10) |
| | Peak increase | — | +0.9% | +6.2% | +4.9% | +5.4% |
| | DC share at peak hour | — | 0.9% | 5.8% | 4.7% | 5.1% |
| | New minimum MW / DC share | 11,725 | 11,873 / 1.2% | 12,805 / 8.4% | 12,405 / 5.5% | 12,639 / 7.2% |
| | Evening ramp 17→19 h | +1,750 | +1,750 | +1,750 | +1,817 | +1,750 |
| | Load factor | 0.818 | 0.820 | 0.829 | 0.826 | 0.827 |
| Monsoon | New peak MW | 13,500 | 13,653 | 14,580 (+8.0%) | 14,357 (+6.3%); 19:00 now 14,213 | 14,443 (+7.0%) |
| | New minimum / DC share | 9,315 | 9,463 / 1.6% | 10,395 / 10.4% | 9,995 / 6.8% | 10,229 / 8.9% |
| | Load factor | 0.857 | 0.858 | 0.868 | 0.864 | 0.866 |
| Winter | New peak MW | 16,000 (09) | 16,153 | 17,080 (+6.8%) | 16,832 (+5.2%) | 16,943 (+5.9%) |
| | New minimum / DC share | 10,080 | 10,228 / 1.4% | 11,160 / 9.7% | 10,760 / 6.3% | 10,994 / 8.3% |
| | Load factor | 0.810 | 0.812 | 0.822 | 0.820 | 0.820 |

**Overlay on BESCOM, summer.** Baseline peak is 7,800 MW at 10:00 and minimum 5,070 MW.
- (a) 7,953 MW peak (+2.0%), share at minimum 2.8%
- (b1) 8,880 MW (+13.8%; share 12.2% at peak, 17.6% at minimum; load factor 0.835→0.855)
- (b2) 8,657 MW (+11.0%; the 19–20:00 shoulder rises to 8,176–8,237 MW)
- (c) 8,743 MW (+12.1%)

If the whole 1 GW sits in BESCOM's area (Hoskote, Devanahalli, Whitefield), it consumes about one-eighth of BESCOM's peak headroom planning.

**Interpretation:**
- Flat data-centre loads *raise* load factor slightly, because they fill nights. Planners will welcome that.
- They add almost 1:1 to the daytime peak and to the March–April deficit hours.
- Inference is the only profile that worsens the evening ramp, though only modestly (+67 MW at state level). In monsoon it makes the evening peak almost as large as the morning one.
- The real stress is on local substations and evening net load, not on state energy.

**Cost under KERC ToD compared with flat ₹6.70.** ToD applies on 212 days (Dec–Jun). The net daily ToD effect is ₹1,000/MWh × (energy in 06–09 and 18–22, minus energy in 22–06). Demand charge = ₹365 × (MD ÷ 0.95 pf) × 12.

| Scenario | Energy cost at flat ₹6.70 (₹ crore/yr) | ToD adjustment (₹ crore/yr) | Demand charge (₹ crore/yr) | All-in ₹/kWh (excl. tax, FPPCA) |
|---|---|---|---|---|
| (a) 162 MW | 896 | –2.9 | 76 | 7.25 |
| (b1) Training | 6,339 | –22.9 | 498 | 7.21 |
| (b2) Inference | 4,930 | +1.2 | 461 | 7.33 |
| (c) Conventional | 5,532 | –17.6 | 433 | 7.22 |

The atlas's ±20% assumption would imply ToD swings of ₹1.34/kWh across solar and peak hours. The real effect is within ±0.4% of the bill. **The demand charge (≈₹0.5–0.6/kWh) matters about 20× more than ToD**, and it penalises peaky inference loads.

**Shifting training load into solar hours is penalised under current tariffs.**
- Example: move 30% of training load (324 MW × 8 h = 2,592 MWh/day) from 22–06 into 10–18.
- In summer this cuts about 586 tCO₂/day: night ≈0.693 t/MWh against midday ≈0.467 t/MWh. Over 92 summer days that is about 54,000 t, and it also saves about 2.3 ML/day of thermal water.
- Under December–June ToD it *costs* ₹1/kWh more, about ₹26 lakh/day or ₹55 crore/yr.
- In July–November there is no ToD and the state has a midday surplus. Shifting is then free, and it absorbs power that would otherwise be curtailed or exported at low prices.

**Solar coverage compared with firm round-the-clock power (training, 1,080 MW flat).**
- Solar sized to match annual energy needs about 5.6 GW (summer daily yield ratio).
- Hour by hour it covers only **≈43%** of load: 11,151 of 25,920 MWh/day. The other **≈57% (≈14.8 GWh/day)** must come at night from wind, hydro, storage or the grid.
- Monthly banking at 8% turns the midday surplus into "RTC" on paper. Physically, though, the night power is still mostly coal (≈0.69 t/MWh in summer).
- Covering only the 18–22 evening window with storage needs about **4.3 GWh** (1,080 MW × 4 h). At CEA's 4-hour BESS capex assumptions (₹4.72–5.62 crore/MW at 2021-22 prices; current auction prices are lower), that is roughly ₹5,000–6,000 crore.
- For comparison, the state's FY27 plan assumes only 1,000 MW / 2-hour BESS. Long-term plans cite 6 GWh of BESS and 6–8 GWh of pumped storage, and CEA projects 15,752 MW of storage in Karnataka by 2034-35.

**CO₂ and grid water.** Hourly Karnataka mix, seasonally weighted, compared with the atlas's flat factors:

| Scenario | CO₂ at hourly KA mix (Mt/yr) | CO₂ at 0.71 (Mt/yr) | Grid water at hourly mix (GL/yr; MLD) | Grid water at 2.0 L/kWh (GL/yr) |
|---|---|---|---|---|
| (a) 162 MW | 0.63 | 0.95 | 2.3; 6.4 | 2.7 |
| (b1) Training | 4.46 | 6.72 | 16.4; 45 | 18.9 |
| (b2) Inference (evening-weighted ≈0.48) | 3.53 | 5.22 | 13.1; 36 | 14.7 |
| (c) Conventional | 3.89 | 5.86 | 14.3; 39 | 16.5 |

For context, the state IT department estimates that Karnataka's 32 data centres use about 4,000 kL/day on site. Today's fleet therefore uses more water *indirectly* through grid electricity (≈6.4 MLD) than it does on site.

**Grid planning signals:**
- **Hoskote:** the state plans a 500 MW sustainable data-centre park there, fed with Pavagada solar and 60 MLD of secondary treated water. Tata Power is building the 400/220 kV, 3×500 MVA Doddathaggalli GIS substation nearby, with 220 kV links to Ekarajapura, Hoskote and Sarjapura.
- **Devanahalli:** NTT's Bengaluru 4 campus (100 MW facility, 67.2 MW IT, first phase 22.4 MW) has its own 220 kV GIS substation.
- **Connection queues:** Mordor Intelligence reports 220 kV queues of more than 18 months at KIADB substations. This is an analyst claim and unverified.
- **Fleet-size discrepancy:** the IT department says 18 of 32 centres account for 292.27 MW, against Cushman & Wakefield's 162 MW of *live IT*. The 292 MW is probably sanctioned or facility load. Reconcile this before publishing.

## Recommendations for the Atlas

1. **Fix the tariff model now.** Replace ±20% with KERC's actual structure:
   - ₹6.70/kWh energy plus ₹365/kVA/month demand on 90% of contract demand.
   - +₹1 in 06–09 and 18–22, –₹1 in 22–06, December–June only; no ToD July–November.
   - Show demand charges as a separate line, since they dominate the time-related cost.
   - Add a toggle for a hypothetical "solar-hour rebate" scenario, clearly labelled as a policy idea.
2. **Embed three representative profiles** (summer, monsoon, winter) for both state and BESCOM from the tables above.
   - Label them "reconstructed, calibrated to KPTCL/CEA anchors".
   - Expose the peak anchor as a slider; a 20 GW failed-monsoon case should be a preset.
3. **Start archiving kptclsldc.in at 15-minute intervals immediately.** It is the only BESCOM-level source. Combine it with the Hugging Face 2024 scrape to replace the BESCOM shapes within one season.
4. **Use dual carbon factors:**
   - CEA's provisional 0.710 (FY25, CO₂ Baseline Database v21.0) for Scope-2 compliance comparisons.
   - The reconstructed Karnataka hourly series (mean ≈0.47) for "when you consume matters" visuals.
   - Grid water should be shown hourly: 1.0–2.6 L/kWh, mean ≈1.7.
5. **Lead with the 43% hourly-solar-coverage finding and the evening-firming gap,** not annual "100% green" claims based on monthly banking.
6. **Show the substation lens:** 1 GW ≈ 1.1 GVA, which is about the whole N-1 firm capacity of a new 3×500 MVA GIS substation.

## Caveats
- **All hourly MW tables are reconstructions, not measured data.** Shapes come from CEA's qualitative description and calibration points: a 5.0 GW ramp, an 11 GW August 2024 average, and 108 TWh/yr. Error bands are likely ±5–10% per hour for the state and wider for BESCOM.
- The hourly generation mix and intensity are stylised:
  - The residual is assumed to be all coal at 0.95 t/MWh.
  - Hydro reservoir evaporation is excluded from water intensity.
  - Imports and exports are treated as in-state coal or ignored.
  - Results are sensitive to the assumed ≈4.5 GW monsoon coal floor.
- Peak-demand figures conflict: 20,093 MW (DH, Sep 2026) against 21,053 MW (energymap's modelled 30-day window). The 2024–2026 records have no published timestamps.
- Inference utilisation (0.70 mean) and the conventional ±3% swing are assumptions. The atlas's own parameters (162 MW, PUE, utilisation) are taken as given.
- The tariff rates come from the MYT schedule as reproduced by a co-operative licensee (HRECS) and PTI's report of the March 2026 review. Confirm them against the KERC order PDF before publishing. Electricity tax and FPPCA are excluded.
- The Data Centre Policy 2026–31's itemised power concessions were not found; treat them as pending.

## Sources

1. hrecs — https://hrecs.co.in/app/documents/TariffRates2026-27-28.pdf
2. cea — https://cea.nic.in/wp-content/uploads/irp/2024/07/_Final_KarnatakaReport.pdf
3. energymap — https://www.energymap.in/duck-curve
4. theprint — https://theprint.in/india/kerc-increases-electricity-tariffs-for-commercial-industrial-consumers/2869823/
5. tndindia — https://www.tndindia.com/tata-power-acquires-project-spv-for-ryapte-intrastate-tbcb-scheme-in-karnataka/
6. w — https://w.media/karnataka-plans-three-sustainable-data-center-parks-with-combined-capacity-of-1-gw/
7. thenewsminute — https://www.thenewsminute.com/karnataka/karnatakas-new-data-centre-policy-puts-water-energy-in-focus-what-does-it-say
8. kptclsldc — https://kptclsldc.in/
9. researchgate — https://www.researchgate.net/publication/350563154_Characterising_Electricity_Demand_through_Load_Curve_Clustering_A_Case_of_Karnataka_Electricity_System_in_India
10. Wikipedia — https://en.wikipedia.org/wiki/Karnataka_Power_Transmission_Corporation
11. github — https://github.com/yashasr21/power-demand-forecast
12. zenodo — https://zenodo.org/records/14983362
13. energymap — https://www.energymap.in/states/karnataka
14. ember-energy — https://ember-energy.org/latest-insights/indian-states-electricity-transition-set-2026/
15. deccanherald — https://www.deccanherald.com/opinion/karnataka-should-take-a-leaf-out-of-haryanas-book-to-tackle-power-crisis-2737574
16. deccanherald — https://www.deccanherald.com/amp/story/india%2Fkarnataka%2Fgovt-in-talks-with-other-states-to-purchase-power-karnataka-energy-minister-kj-george-2726361
17. deccanherald — https://www.deccanherald.com/india/karnataka/karnatakas-power-demand-touched-historic-high-during-summer-3061066
18. deccanherald — https://www.deccanherald.com/amp/story/india%2Fkarnataka%2Fstate-saw-abnormal-rise-in-energy-demand-in-first-two-months-of-2025-energy-department-3460641
19. deccanherald — https://www.deccanherald.com/india/karnataka/karnatakas-monsoon-power-demand-breaches-summer-peak-energy-department-steps-up-production-4151401
20. downtoearth — https://www.downtoearth.org.in/energy/karnatakas-renewable-surge-meets-a-reliability-wall-why-a-power-rich-state-still-faces-500-hours-of-shortage
21. deccanherald — https://www.deccanherald.com/city/bengaluru-makes-power-ful-summer-statement-727068.html
22. deccanherald — https://www.deccanherald.com/content/385474/peak-power-usage-state-puzzles.html
23. deccanherald — https://www.deccanherald.com/state/top-karnataka-stories/no-load-shedding-in-karnataka-till-may-say-power-supply-companies-1200472.html
24. deccanherald — https://www.deccanherald.com/state/karnataka-govt-may-regularise-2-lakh-illegal-pumpsets-1034275.html
25. india — https://www.india.com/news/india/karnataka-government-siddaramaiah-farmers-dk-shivakumar-kj-george-farmers-solar-plants-kusum-b-scheme-congress-bjp-electricity-bengaluru-energy-minister-8071640/
26. karnataka — https://bescom.karnataka.gov.in/page/Departments+of+Corporate+Office/Operations/Power+Supply+to+Agri+feeders/en
27. deccanherald — https://www.deccanherald.com/amp/story/india%2Fkarnataka%2Fstate-to-have-100-new-electricity-substations-george-3571838
28. thediscombill — https://thediscombill.com/tariffs/karnataka/
29. ember-energy — https://ember-energy.org/latest-insights/indian-states-electricity-transition-set-2024/
30. renewablewatch — https://renewablewatch.in/2026/04/21/green-surge-renewables-dominate-karnatakas-power-mix/
31. cercind — https://www.cercind.gov.in/2024/draft_reg/Comments-IEGC2024/Comments/SLDC%20Karnataka.pdf
32. s3waas — https://cdnbbsr.s3waas.gov.in/s3716e1b8c6cd17b771da77391355749f3/uploads/2025/11/202511061627678782.pdf
33. indiatogether — https://indiatogether.org/emission-standards-for-coal-based-thermal-power-plants-environment/
34. cpcb — https://cpcb.nic.in/uploads/thermal_power_plant_overview.pdf
35. deccanherald — https://www.deccanherald.com/india/karnataka/pandemic-hit-industries-get-power-tariff-concession-1097686.html
36. energetica-india — https://www.energetica-india.net/news/karnataka-unveils-new-open-access-regulations-2025
37. saurenergy — https://www.saurenergy.com/solar-energy-news/consumers-in-karnataka-to-pay-8-charges-for-open-access-kerc
38. mercomindia — https://www.mercomindia.com/karnataka-high-court-strikes-down-green-energy-open-access-rules
39. saurenergy — https://www.saurenergy.com/solar-energy-news/karnataka-hc-orders-puts-green-energy-open-access-in-limbo
40. jsalaw — https://www.jsalaw.com/newsletters-and-updates/jsa-prism-power-january-2025/
41. deccanherald — https://www.deccanherald.com/india/karnataka/state-owes-escoms-5499-crore-2534475
42. novergysolar — https://www.novergysolar.com/karnataka-announces-open-access-regulations-2025-a-new-dawn-for-renewable-energy/
43. tmv — https://tmv.in/article/karnataka-unveils-1000-mw-data-park-plan-eyes-massive-private-investment
44. constructionweekonline — https://www.constructionweekonline.in/business/ntt-data-centre
45. mordorintelligence — https://www.mordorintelligence.com/industry-reports/bengaluru-data-center-market
46. newslaundry — https://www.newslaundry.com/2026/04/16/in-bengalurus-water-stressed-areas-sit-most-of-its-data-centres
