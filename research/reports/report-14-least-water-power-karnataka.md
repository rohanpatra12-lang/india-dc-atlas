<!-- Report 14: the least-water power model for a Karnataka data centre (atlas Chapter 16.2). The model itself is tools/models/karnataka_dc_model.py. -->

# Least-water power for a Karnataka data centre (Report 14)

## The question the model answers

A data centre that wants to cut its water footprint in India faces a problem that the earlier chapters made clear. Most of the water behind a data centre is not used on site. It is evaporated at the coal power stations that generate the electricity the data centre buys. Buying clean electricity therefore reduces water as well as carbon. But not every clean source is free of water. Solar panels need occasional washing, and reservoir hydropower loses water to evaporation from the surface of its reservoirs. Wind and batteries use almost none. A buyer who wants the least water at a reasonable cost needs to know which combination of sources to contract, and how much it will cost.

The model in this chapter answers that question for one specific case: a data centre with 50 megawatts of IT load in Karnataka, running at a power usage effectiveness of 1.30, so that it draws a steady 65 megawatts from the grid in every hour of the year. The model chooses how much solar capacity, wind capacity, hydropower contract and battery storage to buy, and how to use them hour by hour, so that the data centre is always supplied. Any hour that cannot be met from these sources is met from the grid.

## How the model works

The model is a linear programme, which is a standard mathematical method for finding the best solution to a problem that can be written as a set of linear equations and limits. It was solved with the HiGHS solver in the SciPy library. Each solution involves 52,564 decision variables: four capacities (solar megawatts, wind megawatts, hydro contract megawatts and battery megawatt-hours) and six quantities for each of the 8,760 hours of the year (hydro used, grid electricity bought, battery charging, battery discharging, battery state of charge and surplus energy curtailed).

Three groups of rules bind every solution. First, energy must balance in every hour: the electricity from solar, wind, hydro, battery discharge and the grid, minus what goes into the battery and what is curtailed, must equal the 65 megawatt load. Second, the battery must behave like a real battery. It loses 12% of the energy that passes through it (an 88% round-trip efficiency), it cannot hold more than its capacity, it cannot charge or discharge faster than a four-hour rating allows, and its state of charge at the end of the year must equal its state at the start. Third, the hydro contract cannot deliver more power than its contracted megawatts in any hour, cannot deliver more energy in a month than the reservoir's monthly availability allows, and cannot exceed 40 megawatts in total, which is roughly what a buyer could realistically contract in Karnataka.

The solar and wind output in each hour comes from profiles shaped like Karnataka's resource. The solar profile resembles the Pavagada and Tumakuru region, with an annual capacity factor of about 20.5% and lower output in the monsoon months from June to September. The wind profile resembles the Chitradurga and Gadag region, with an annual capacity factor of about 33%, strong winds from May to August, and a tendency for the wind to blow harder in the evening. Both profiles are synthetic. They were generated from a seeded random process so that they have the right seasonal and daily shape, but they are not measurements from a particular site. This is the main limitation of the model, and it is discussed again at the end of the chapter.

| Input | Value used | Why this value |
|---|---|---|
| Load | 50 MW IT × PUE 1.30 = 65 MW, flat all year | An efficient mid-size facility; a flat load is the simplest case to optimise. |
| Solar profile | Capacity factor 20.0%, monsoon dip | Shaped like the Pavagada and Tumakuru solar region. |
| Wind profile | Capacity factor 33.0%, strong May–August, evening bias | Shaped like the Chitradurga and Gadag wind region. |
| Solar cost | ₹3.8 crore/MW, 25 years, 10%, O&M 1.5% → ₹0.480 crore/MW/yr | 2026 Indian utility-scale benchmark. |
| Wind cost | ₹7.0 crore/MW, same terms → ₹0.880 crore/MW/yr | 2026 Indian benchmark. |
| Battery cost | ₹3.5 lakh per MW-month for a 4-hour unit → ₹0.1 crore/MWh/yr | Recent Indian battery storage tender levels. |
| Hydro contract | ₹4.5/kWh take-or-pay, up to 40 MW, monthly availability 25–85% | Indicative reservoir hydro power purchase terms. |
| Grid power | ₹7.0/kWh including fixed charges | Approximate high-tension industrial tariff in Karnataka. |
| Open-access charge | ₹1.0/kWh on renewable energy used | Wheeling, transmission and loss charges on delivered renewables. |
| Water factors | Solar 0.1, wind 0, battery 0, grid 2.0, hydro 0 / 10 / 20 L/kWh | Panel washing; Karnataka grid coal share; unmeasured reservoir evaporation tested in three cases. |
| Carbon | Grid 0.71 t CO₂/MWh; renewables zero | Central Electricity Authority grid factor. |


## How the trade-off between cost and water is traced

The model first finds the cheapest possible mix, with no limit on water. It then finds the mix that uses the least possible water, with no limit on cost. These two mixes mark the two ends of a range. The model then re-solves for the cheapest mix seven more times, each time with a tighter cap on water. Each cap allows a set fraction of the gap between the minimum water and the water of the cheapest mix: 75%, 50%, 35%, 25%, 15%, 10% and 5%. Each solution is a point on a curve of cost against water, which economists call a frontier: a point on the frontier cannot be made cheaper without using more water, or drier without costing more.

The water used by reservoir hydropower is uncertain, because no one measures the evaporation from Indian reservoirs and allocates it to the electricity they generate. The model is therefore run three times. In the base case, hydro uses 10 litres of water per kilowatt-hour. In the run-of-river case, hydro uses no water, which would be true of a plant without a storage reservoir. In the high case, hydro uses 20 litres per kilowatt-hour. Grid electricity is assumed to use 2.0 litres per kilowatt-hour, reflecting the share of coal in Karnataka's supply, and solar power 0.1 litres per kilowatt-hour for panel washing.

## Results: every option the model found

The table below lists every option the model found in the base case. Reading down the table, the water cap tightens. The first row is the cheapest mix and the last row is the mix that uses the least possible water. The column for clean energy shows the share of the year's consumption that is not supplied by the grid. The carbon dioxide column counts only grid electricity, at the Central Electricity Authority's factor of 0.71 tonnes per megawatt-hour, and treats solar, wind, hydro and battery output as zero-emission.

| Option | Solar (MW) | Wind (MW) | Hydro (MW) | Battery (MWh) | Cost (₹/kWh) | Water (ML/yr) | Water (L/kWh) | Clean energy | CO₂ (kt/yr) |
|---|---|---|---|---|---|---|---|---|---|
| Cheapest mix | 97 | 62 | 28 | 72 | 5.20 | 1,451 | 2.55 | 79% | 84 |
| Water cap 75% | 98 | 72 | 20 | 91 | 5.21 | 1,088 | 1.91 | 77% | 92 |
| Water cap 50% | 99 | 81 | 10 | 107 | 5.23 | 725 | 1.27 | 74% | 105 |
| Water cap 35% | 99 | 88 | 4 | 117 | 5.25 | 508 | 0.89 | 72% | 113 |
| Water-only knee | 97 | 95 | 0 | 112 | 5.26 | 363 | 0.64 | 71% | 119 |
| Recommended | 161 | 86 | 0 | 379 | 5.39 | 218 | 0.38 | 83% | 67 |
| Water cap 10% | 210 | 71 | 0 | 583 | 5.53 | 145 | 0.25 | 91% | 38 |
| Near-zero water | 271 | 57 | 0 | 803 | 5.81 | 73 | 0.13 | 98% | 8 |
| Strict minimum water | 0 | 593 | 0 | 4,356 | 18.16 | 0 | 0.00 | 100% | 0 |


Three phases are visible in the table. In the first phase, from the cheapest mix down to the option labelled the water-only knee, the model removes the hydro contract and replaces it with grid electricity. Water falls by three-quarters, from 1,451 to 363 million litres a year, for an increase in cost of only about six paise per kilowatt-hour. But the share of clean energy falls from 79% to about 70%, because the grid supplies more of the load. In the second phase, solar capacity and batteries grow to replace the grid. Water continues to fall, and the clean share climbs back to 83% and then beyond 90%. In the third phase, only very large batteries can close the last night-time hours, and the cost rises steeply. The strict minimum-water solution uses no solar at all, because even panel washing uses some water, and instead builds 593 megawatts of wind and 4.4 gigawatt-hours of batteries, at a cost of ₹18.16 per kilowatt-hour. That option is shown for completeness but is not a practical choice.

A striking result appears in the first row. The cheapest clean-power mix uses more water, 1,451 million litres a year, than buying all power from the grid would use, 1,139 million litres a year. This is because the cheapest mix relies on a 28 megawatt hydro contract, and at 10 litres per kilowatt-hour reservoir hydro is five times as thirsty as Karnataka's grid. Clean power is not automatically water-light. The source matters.

## The hydropower uncertainty

The next table shows how the cheapest mix and the lowest-cost options change when the water use of hydropower changes. In the run-of-river case, where hydro uses no water, the model keeps and even expands the hydro contract, because hydro is then both cheap and dry. In the high case, where hydro uses 20 litres per kilowatt-hour, the model drops hydro even sooner.

| Hydro water case | Option | Solar (MW) | Wind (MW) | Hydro (MW) | Battery (MWh) | Cost (₹/kWh) | Water (ML/yr) | Clean energy |
|---|---|---|---|---|---|---|---|---|
| Hydro 0 L/kWh (run-of-river) | Cheapest mix | 97 | 62 | 28 | 72 | 5.20 | 255 | 79% |
| Hydro 0 L/kWh (run-of-river) | Water cap 50% | 145 | 43 | 38 | 252 | 5.30 | 127 | 91% |
| Hydro 0 L/kWh (run-of-river) | Water cap 15% | 201 | 68 | 23 | 634 | 5.81 | 38 | 100% |
| Hydro 0 L/kWh (run-of-river) | Water cap 5% | 40 | 290 | 40 | 132 | 7.57 | 13 | 100% |
| Hydro 10 L/kWh (base) | Cheapest mix | 97 | 62 | 28 | 72 | 5.20 | 1,451 | 79% |
| Hydro 10 L/kWh (base) | Water cap 50% | 99 | 81 | 10 | 107 | 5.23 | 725 | 74% |
| Hydro 10 L/kWh (base) | Recommended | 161 | 86 | 0 | 379 | 5.39 | 218 | 83% |
| Hydro 10 L/kWh (base) | Near-zero water | 271 | 57 | 0 | 803 | 5.81 | 73 | 98% |
| Hydro 20 L/kWh (high) | Cheapest mix | 97 | 62 | 28 | 72 | 5.20 | 2,647 | 79% |
| Hydro 20 L/kWh (high) | Water cap 50% | 99 | 79 | 13 | 102 | 5.22 | 1,324 | 75% |
| Hydro 20 L/kWh (high) | Water cap 15% | 96 | 95 | 1 | 106 | 5.26 | 397 | 70% |
| Hydro 20 L/kWh (high) | Water cap 5% | 221 | 66 | 0 | 628 | 5.56 | 132 | 92% |


Because the true water use of reservoir hydro is not known, it is useful to ask how much water each base-case mix would use under each assumption. The table below does this. The cheapest mix could use anywhere from 255 to 2,647 million litres a year, depending on a number that no one measures. The recommended mix contracts no hydro, so its water use is the same, 218 million litres a year, whatever the true figure is.

| Base-case option | Water if hydro uses 0 L/kWh | Water at 10 L/kWh | Water at 20 L/kWh | Spread |
|---|---|---|---|---|
| Cheapest mix | 255 | 1,451 | 2,647 | 2,392 |
| Water cap 75% | 276 | 1,088 | 1,900 | 1,624 |
| Water cap 50% | 315 | 725 | 1,136 | 821 |
| Water cap 35% | 336 | 508 | 679 | 343 |
| Water-only knee | 353 | 363 | 372 | 19 |
| Recommended | 218 | 218 | 218 | 0 |
| Water cap 10% | 145 | 145 | 145 | 0 |
| Near-zero water | 73 | 73 | 73 | 0 |


## Three rules for choosing an option

The model does not choose an option by itself. It shows the trade-off. To choose, this report applies three rules, each of which has a clear reason.

The first rule is to save water only while saving it is cheaper than buying it. For each option, the extra cost compared with the cheapest mix is divided by the water it saves compared with the cheapest mix. The result is the cost of each kilolitre of water saved. If that cost is lower than the price of water, saving the water is worth it on cost alone. The benchmark used here is ₹99 per kilolitre, the municipal water rate charged by Bengaluru's water board and used in the atlas simulator. Tanker water costs more, so this test is conservative.

| Option | Extra cost vs cheapest (₹ crore/yr) | Water saved vs cheapest (ML/yr) | Cost per kL saved (₹) | Below ₹99 municipal price? |
|---|---|---|---|---|
| Water cap 75% | 0.3 | 363 | 8 | Yes |
| Water cap 50% | 1.4 | 725 | 19 | Yes |
| Water cap 35% | 2.6 | 943 | 27 | Yes |
| Water-only knee | 3.5 | 1,088 | 32 | Yes |
| Recommended | 10.5 | 1,233 | 85 | Yes |
| Water cap 10% | 18.7 | 1,306 | 143 | No |
| Near-zero water | 34.4 | 1,378 | 249 | No |


Up to the recommended option, every kilolitre saved costs less than municipal water, at about ₹85 on average. The next option costs about ₹143 per kilolitre saved, and the one after about ₹249. At the margin, each additional kilolitre saved beyond the recommended option costs more than ₹1,100. Beyond the recommended option, the buyer would be paying more to save water than the water is worth.

The second rule is to choose a mix that does not depend on an unmeasured number. The recommended option has no hydro, so its water use is the same under all three hydro assumptions, as the robustness table shows. When an input is as uncertain as reservoir evaporation, a choice that does not depend on it is worth paying a little for.

The third rule is not to trade water for carbon. The water-only knee, at 363 million litres and ₹5.26 per kilowatt-hour, reduces water by buying more coal power, which raises carbon dioxide to about 119 thousand tonnes a year, compared with 84 thousand tonnes for the cheapest mix. The recommended option reduces both water and carbon, to 218 million litres and about 67 thousand tonnes.

## The recommended mix

The recommended option is 161 megawatts of solar, 86 megawatts of wind and 379 megawatt-hours of four-hour batteries (about 95 megawatts of battery power), with grid electricity covering the remaining hours and no hydro contract. It costs ₹5.39 per kilowatt-hour, which is about ₹10.5 crore a year more than the cheapest mix (an increase of about 3.6%) but about ₹92 crore a year less than buying all power from the grid. It uses about 218 million litres of water a year, or 0.38 litres per kilowatt-hour, and supplies 83% of the year's consumption from clean power. Compared with buying all power from the grid, it is about 23% cheaper, uses about 81% less water and emits about 83% less carbon dioxide.

The hour-by-hour dispatch shows how this mix meets the load. On a typical April day, solar output rises to well above the 65 megawatt load at midday. The surplus charges the batteries, and a small amount is curtailed. In the evening the batteries discharge to carry the load past sunset, wind contributes through the night, and the grid fills the remaining gap in the early morning. In the monsoon months, from June to August, strong winds carry most of the load and the grid is almost unnecessary. On these synthetic profiles, the hardest month is October, when the monsoon winds have faded but cloud still reduces solar output. Grid use peaks in that month.

## What the results mean for buyers and for policy

Several lessons follow from the model. A data centre that buys renewable power to reduce water should look at the water use of each source, not only at whether it is renewable, because reservoir hydro can use more water per kilowatt-hour than coal. Hourly-optimised solar, wind and storage can supply most of a data centre's hours at a cost well below the grid tariff in Karnataka, which means that water and carbon reductions do not require a cost premium compared with grid power. Policies that encourage round-the-clock renewable contracts, fair banking rules and co-located storage, all of which are recommended in Chapter 15, make this kind of portfolio easier to build. If a genuine run-of-river hydro contract were available, without reservoir evaporation, a mix including about 38 megawatts of it could reach about 127 million litres a year at ₹5.30 per kilowatt-hour, which would beat the recommended option. That is the one case in the model that does better.

The power supply is only part of a data centre's water footprint. The recommended mix addresses the water used at power stations. The water used on site depends on cooling, and Chapters 3, 7 and 8 show that dry or liquid cooling is needed to keep on-site water low as well.

## Limitations of the model

The model is illustrative. The solar and wind profiles are synthetic, with the right seasonal and daily shape for Karnataka but not measured at any site, and real weather includes multi-day lulls that the profiles may not capture. Costs are 2026 Indian benchmarks rather than quotes. The load is flat, whereas real data centres vary, and AI training loads can swing sharply. Open-access charges, banking rules and transmission charges differ by state and change often. Before any procurement decision, the model should be re-run with measured site data from the National Institute of Wind Energy and from satellite solar datasets, and with the actual open-access charges of the Karnataka Power Transmission Corporation and the relevant distribution company.
