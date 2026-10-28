/* ===== ATLAS STANDARDS: the one set of values every model reads ===== */
window.STD=(function(){
const VERSION='2026.10.6',DATE='2026-10-27';
const E={};const O={pw:'Power & carbon lead',wa:'Water lead',co:'Cooling engineer',ec:'Economics lead',po:'Policy lead',ed:'Editor'};
function def(k,label,v,lo,hi,unit,owner,review,src,conf,used){E[k]={k,label,v,lo,hi,unit,owner:O[owner]||owner,review,src,conf,used:used||''};return v}
/* grid */
const co2=def('co2','India grid CO₂ factor (weighted average, location-based)',0.675,0.675,0.727,'t/MWh','pw','2027-08','CEA CO₂ Baseline Database v22.0 (Aug 2026), FY2025-26: 1,189 Mt ÷ 1,761 BU; range = FY2025-26 to FY2023-24 (0.727). CEA publishes one national factor; there are no official state factors','reported','every carbon calculation (grid average)');
const co2om=def('co2.om','India grid CO₂, operating margin (marginal)',0.963,0.961,0.98,'t/MWh','pw','2027-08','CEA v22.0, FY2025-26 operating margin (v21.0: 0.961). The plants that run more when load is added: almost all coal','reported','marginal view of new load');
const co2bm=def('co2.bm','India grid CO₂, build margin',0.446,0.446,0.552,'t/MWh','pw','2027-08','CEA v22.0, FY2025-26 build margin (FY2023-24: 0.552)','reported','context');
const co2cm=def('co2.cm','India grid CO₂, combined margin (50:50)',0.705,0.705,0.757,'t/MWh','pw','2027-08','CEA v22.0, FY2025-26 combined margin','reported','context');
const loss=def('tdloss','Network losses applied to plant water',0.92,0.88,0.95,'factor','pw','2027-03','CEA transmission and distribution loss statistics','estimate','grid water at the meter');
const coalW=def('gw.coal','Water consumed by coal plants',3.5,3.0,4.3,'L/kWh (m³/MWh) at the plant','wa','2027-03','MoEFCC 2015/2018 limits 3.5 (existing) and 3.0 (new) m³/MWh; cooling-tower plants average ~4 plus 0.3 for FGD (CSE, Power Line Sep 2026); IRENA/WRI 2018: whole fleet 2.09 m³/MWh in 2014','estimate','grid water');
const GW={},GWM={};const gw=(st,code,v,lo,hi,src)=>{GWM[st]=def('gwmix.'+code,`Grid water of the state's own generation mix, ${st} (sensitivity)`,v,lo,hi,'L/kWh','wa','2027-03',src+'; coal at 3.5 m³/MWh','estimate','state comparisons only')};
/* state generation mixes (coal, hydro, other %, share of generation): one table for every state figure */
const MIX={'India':[73,8,19],'Karnataka':[35,18,47],'Maharashtra':[72,5,23],'Tamil Nadu':[50,5,45],'Telangana':[80,5,15],'Uttar Pradesh':[85,5,10],'Andhra Pradesh':[65,5,30],'West Bengal':[90,3,7]};
const mixW=(m,cw,hw)=>(m[0]*cw+m[1]*hw+m[2]*0.4)/100/0.92;/* L/kWh at the meter; other sources 0.4 L/kWh at the plant */
[['Karnataka','KA'],['Tamil Nadu','TN'],['Andhra Pradesh','AP'],['Maharashtra','MH'],['Telangana','TG'],['Uttar Pradesh','UP'],['West Bengal','WB']].forEach(([st,c])=>{const m=MIX[st];gw(st,c,+mixW(m,3.5,0).toFixed(2),+mixW(m,3.0,0).toFixed(2),+mixW(m,4.3,10).toFixed(2),`State generation mix (coal ${m[0]}%, hydro ${m[1]}%) ÷ 0.92; hydro excluded, upper end counts hydro at 10 L/kWh`)});
const gwN=def('gw.IN','Grid water at the meter, India (location-based default)',2.9,2.3,3.5,'L/kWh','wa','2027-03','73% coal (Ember 2025) × 3.5 m³/MWh + nuclear and gas ≈ 2.66 L/kWh at the plant ÷ 0.92 network losses; low end from IRENA/WRI fleet 2.09 m³/MWh (2014), high end at 4.3 m³/MWh coal','estimate','Scope 2 water in every chapter');
const gwM=def('gw.marg','Grid water at the meter, marginal (coal)',3.8,3.3,4.7,'L/kWh','wa','2027-03','Coal plant consumption 3.5 (3.0–4.3) m³/MWh ÷ 0.92: the water behind added load, matching the CO₂ operating margin','estimate','marginal view of new load');
['Karnataka','Tamil Nadu','Andhra Pradesh','Maharashtra','Telangana','Uttar Pradesh','West Bengal','India'].forEach(st=>{GW[st]=gwN});GWM.India=gwN;
GW['Uttar Pradesh / Delhi']=GW['Uttar Pradesh'];
const hydroW=def('gw.hydro','Reservoir hydro water, allocated to power',10,0,20,'L/kWh','wa','2027-10','Gross reservoir evaporation is highly site-specific: published estimates span 0.04–210 m³/MWh (Bakken et al., HESS 2013; NREL medians ~17); about half to two-thirds is allocated to power in multi-purpose Indian reservoirs; run-of-river ≈ 0','estimate','hydro contracts (Chapter 16, designer)');
const clean=def('gw.clean','Grid water of solar and wind',0.05,0.02,0.10,'L/kWh','wa','2027-10','Panel cleaning and manufacturing share','estimate','clean-power cases');
/* tariffs */
const TA={},TE={};const ta=(st,code,v,src)=>{TA[st]=def('tariff.allin.'+code,`All-in HT tariff, ${st}`,v,+(v-.5).toFixed(2),+(v+.5).toFixed(2),'₹/kWh','ec','2027-04',src,'estimate','cooling cost, design check')};
ta('Karnataka','KA',8.0,'BESCOM HT-2(a), FY2025-26, at 75% load factor');ta('Maharashtra','MH',9.1,'MSEDCL HT-I(A), FY2025-26');ta('Tamil Nadu','TN',8.8,'TNPDCL HT-I, FY2025-26');ta('Telangana','TG',8.3,'TGSPDCL HT-I(A), FY2025-26');ta('Uttar Pradesh','UP',7.2,'UPPCL HV-2, FY2025-26');
const te=(st,code,v)=>{TE[st]=def('tariff.energy.'+code,`Energy charge, ${st}`,v,+(v-.4).toFixed(2),+(v+.4).toFixed(2),'₹/kWh','ec','2027-04','State tariff order FY2025-26; demand charges counted separately','reported','simulator, data centre model')};
te('Karnataka','KA',6.70);te('Maharashtra','MH',7.27);te('Tamil Nadu','TN',7.50);te('Telangana','TG',6.65);te('Uttar Pradesh / Delhi','UP',7.40);te('Andhra Pradesh','AP',7.20);te('West Bengal','WB',7.20);
TE['Uttar Pradesh']=TE['Uttar Pradesh / Delhi'];
/* water and money */
const wp=def('water.bwssb','BWSSB non-domestic top slab',99,99,104,'₹/kL','wa','2027-04','BWSSB tariff revision April 2025, +3% each April','reported','Bengaluru water cost');
const tse=def('water.tse','Treated sewage, polished for cooling',40,25,60,'₹/kL','wa','2027-04','Atlas estimate from Bengaluru project costs','estimate','treated-water cases');
const tank=def('water.tanker','Tanker water, Bengaluru (shadow price)',83,58,250,'₹/kL','wa','2027-04','District fixed rates 2024: ₹600–1,200 per 6,000–12,000 L load; crisis prices over ₹2,000 per load','reported','shadow price of water');
const fx=def('fx','Exchange rate',90,84,95,'₹/US$','ec','2027-01','Rounded reference rate, Oct 2026','reported','all ₹–$ conversions');
const disc=def('disc','Real cost of capital',11,9,13,'%','ec','2027-10','Atlas assumption for infrastructure in India','estimate','annualised costs, NPV');
const cprice=def('carbon.price','Shadow carbon price',4500,0,17000,'₹/t CO₂','ec','2027-10','~US$50/t central; 0 (no price) to US$190/t (US EPA 2023 social cost of carbon)','estimate','shadow-price views');
/* capacity */
const it2026=def('cap.india','India IT capacity, live',1789,1700,1900,'MW','ed','2027-01','Cushman & Wakefield, H1 2026 (other trackers differ by ±5%)','reported','forecasts, overview');
const blr=def('cap.blr','Bengaluru IT capacity, live',162,140,185,'MW','ed','2027-01','Cushman & Wakefield, H1 2026','reported','Bengaluru chapter');
/* cooling reference */
const pue=def('pue.uptime','Global average PUE',1.54,1.50,1.58,'','co','2027-07','Uptime Institute global survey 2025','reported','benchmarks');
const twue=def('wue.tower.blr','Cooling-tower WUE, Bengaluru annual',1.8,1.5,2.4,'L/kWh IT','co','2027-10','Tower mass balance at 4 cycles; hot-dry and coastal 2.2–2.4','model','all tower cases');
const dwue=def('wue.dry','Dry cooler / closed loop WUE',0.05,0.0,0.2,'L/kWh IT','co','2027-10','Humidification and domestic use','model','dry and liquid cases');
def('pue.colo.twr','Reference PUE, colocation with towers, Bengaluru',1.25,1.20,1.32,'','co','2027-10','Atlas cooling table (Oct 2026 research)','model','cooling cost, simulator, design check');
def('pue.colo.acc','Reference PUE, colocation with air-cooled chillers, Bengaluru',1.45,1.40,1.55,'','co','2027-10','Atlas cooling table','model','cooling cost, design check');
def('pue.ai.dry','Reference PUE, AI direct-to-chip + dry coolers, Bengaluru',1.15,1.12,1.20,'','co','2027-10','Atlas cooling table','model','cooling cost, design check');
def('pue.ai.twr','Reference PUE, AI direct-to-chip + towers, Bengaluru',1.10,1.08,1.14,'','co','2027-10','Atlas cooling table','model','cooling cost');
/* capex */
const capex={colo:def('capex.colo','Capex, colocation hall (facility)',56.1,50,62,'₹ crore/MW','ec','2027-04','Atlas cost stacks (SBI sector report, project filings)','estimate','costs, design check'),
 ai:def('capex.ai','Capex, AI campus building and power (facility)',74,65,85,'₹ crore/MW','ec','2027-04','Atlas cost stacks','estimate','costs, design check'),
 gpu:def('capex.gpu','Capex, GPUs and network',266,234,412,'₹ crore/MW','ec','2027-01','GB300-class racks at market prices; −12% / +55%','estimate','AI campus costs'),
 duty:def('capex.duty','Effective import duty on GPU servers',20,0,28,'%','ec','2027-04','Industry estimate 20–28% (ESDS, 2026); GST 18% is recoverable as input credit','estimate','financing view')};
/* Scope 3 */
def('s3.gpu','Embodied water per GPU',2.6,1,10,'m³','wa','2027-10','Die area × fab water (TSMC 2024) + HBM + board','estimate','Scope 3');
def('s3.bldg','Embodied water of the building',5600,3000,9000,'m³ per MW','wa','2027-10','Concrete, steel, copper and site water','estimate','Scope 3');
def('ec.gpu','Embodied carbon per GPU (baseboard only)',164,140,190,'kg CO₂e','pw','2027-10','NVIDIA HGX H100 product carbon footprint: 1,312 kg per 8-GPU baseboard, cradle to gate','reported','embodied carbon');
def('ec.server','Full-server multiple over the baseboard',2.5,1.8,4,'×','pw','2027-10','Atlas estimate: CPUs, memory, chassis, NICs, power supplies','estimate','embodied carbon');
def('ec.bldg','Embodied carbon of shell, power and cooling plant',1500,800,2500,'t CO₂e per MW','pw','2027-10','Atlas estimate from published whole-life assessments; site-specific','estimate','embodied carbon');
/* climate */
def('clim.2040','Design-day warming, 2040s',1.0,0.7,1.5,'°C','co','2028-01','MoES 2020: +0.7 °C observed 1901–2018, up to +2.4 °C (RCP4.5) and +4.4 °C (RCP8.5) by 2100; mid-century share','estimate','climate horizon');
def('clim.2060','Design-day warming, 2060s',2.0,1.4,2.8,'°C','co','2028-01','MoES 2020 scenarios, interpolated','estimate','climate horizon');
/* cooling table (Chapter 6): PUE and on-site WUE for plateau / humid coast / hot-dry */
const cool=[
 {id:'dx',n:'DX room units + condensers',room:'dx',rej:'none',max:10,liq:0,p:[1.70,1.80,1.80],w:[.05,.05,.05]},
 {id:'crah',n:'CRAH, open aisles + air-cooled chillers',room:'crah',rej:'acc',max:12,liq:0,p:[1.50,1.60,1.55],w:[.05,.05,.05]},
 {id:'acc',n:'CRAH + containment + air-cooled chillers',room:'crahc',rej:'acc',max:30,liq:0,p:[1.45,1.55,1.50],w:[.05,.05,.05]},
 {id:'fcc',n:'CRAH + containment + free-cooling chillers',room:'crahc',rej:'fcc',max:30,liq:0,p:[1.35,1.45,1.40],w:[.05,.05,.05]},
 {id:'wcc',n:'CRAH + containment + water-cooled chillers + towers',room:'crahc',rej:'wcc',max:30,liq:0,p:[1.25,1.35,1.30],w:[1.8,2.4,2.4],tw:1},
 {id:'mag',n:'CRAH + containment + magnetic-bearing chillers + towers',room:'crahc',rej:'mag',max:30,liq:0,p:[1.22,1.32,1.27],w:[1.8,2.4,2.4],tw:1},
 {id:'hyb',n:'CRAH + containment + chillers + hybrid coolers',room:'crahc',rej:'wcch',max:30,liq:0,p:[1.30,1.35,1.35],w:[.45,.90,.60]},
 {id:'iec',n:'Indirect evaporative units',room:'iec',rej:'none',max:30,liq:0,p:[1.20,1.30,1.25],w:[.55,.80,.80]},
 {id:'rdh',n:'Rear-door coils + free-cooling chillers',room:'rdh',rej:'fcc',max:50,liq:0,p:[1.33,1.43,1.38],w:[.05,.05,.05]},
 {id:'dlc32',n:'Direct-to-chip W32 + dry coolers + trim',room:'dlc',rej:'dry',max:250,liq:1,p:[1.17,1.21,1.20],w:[.05,.05,.05]},
 {id:'dlc40',n:'Direct-to-chip W40 + dry coolers + trim',room:'dlc',rej:'dry',max:250,liq:1,p:[1.15,1.18,1.17],w:[.05,.05,.05]},
 {id:'dlca',n:'Direct-to-chip + adiabatic coolers',room:'dlc',rej:'adi',max:250,liq:1,p:[1.12,1.14,1.15],w:[.25,.40,.45]},
 {id:'dlct',n:'Direct-to-chip + towers, no chillers',room:'dlc',rej:'twr',max:250,liq:1,p:[1.10,1.12,1.12],w:[1.8,2.2,2.2],tw:1},
 {id:'im1',n:'Single-phase immersion + dry coolers',room:'im1',rej:'dry',max:150,liq:2,p:[1.08,1.09,1.10],w:[.05,.05,.05],fl:.18,loss:.01},
 {id:'im2',n:'Two-phase immersion + dry coolers',room:'im2',rej:'dry',max:250,liq:2,p:[1.06,1.07,1.08],w:[.05,.05,.05],fl:.7,loss:.03,warn:'Not for new builds: PFAS fluids, 3M exit'}];
/* reference sites used by every chapter */
const refMix=def('ref.mixT','Reference AI campus: training share of IT capacity',40,30,50,'%','co','2027-10','Chosen so training is ~45% of AI energy (Chapter 18: 40–50% training, 50–60% inference by energy)','estimate','reference AI campus in every chapter');
const refUai=def('ref.u.ai','Reference AI campus utilisation (blended)',0.78,0.74,0.84,'fraction','co','2027-10','40% training at 0.90 + 60% inference at 0.70','model','every AI-campus calculation');
const refUconv=def('ref.u.conv','Reference conventional / colocation utilisation',0.65,0.50,0.75,'fraction','co','2027-10','Equal to general-purpose utilisation (atlas estimate)','estimate','every conventional-hall calculation');
const dem30=def('dem.india.2030','India electricity requirement, FY2029-30',2388,2229,2388,'TWh (BU)','pw','2027-06','CEA midterm review of the National Electricity Plan: 2,388 BU in 2029-30 (9% above the 2023 plan; the 20th EPS path gives ~2,230)','reported','shares of national demand');
const dem32=def('dem.india.2032','India electricity requirement, FY2031-32',2703,2474,2703,'TWh (BU)','pw','2027-06','CEA midterm review of the National Electricity Plan: 2,703 BU in 2031-32 (2023 plan: 2,474)','reported','shares of national demand');
const steelW=def('steel.w','Integrated steel plant water',2.8,1.5,4.1,'m³ per tonne crude steel','wa','2027-06','Ministry of Steel, Lok Sabha USQ 1096 (26 Jul 2023): 1.5–4.1 m³/t','reported','industry comparisons');
const promptWh=def('prompt.wh','Energy per short AI prompt (measured, all-in)',0.24,0.24,0.34,'Wh','co','2027-08','Google, median Gemini text prompt incl. idle capacity, host CPU and PUE 1.09 (Aug 2025: 0.24 Wh; accelerator-only 0.10 Wh); OpenAI average ChatGPT query 0.34 Wh (Jun 2025)','reported','per-prompt figures');
/* workload utilisation (average IT load ÷ provisioned IT power) */
const uT=def('util.train','Average utilisation, training hall',0.90,0.85,0.95,'fraction','co','2027-10','Microsoft POLCA (ASPLOS 2024); arXiv 2508.14318: ~0.9 while a job runs, peak 97% (Chapter 11)','reported','AI data centre designer: energy by workload');
const uI=def('util.inf','Average utilisation, inference hall',0.70,0.60,0.84,'fraction','co','2027-10','POLCA; arXiv 2603.18383: load factor 0.6–0.84, peak 79% (Chapter 11)','reported','AI data centre designer: energy by workload');
const uG=def('util.gp','Average utilisation, general-purpose IT',0.65,0.50,0.75,'fraction','co','2027-10','No measured Indian data; business-hours enterprise load (atlas estimate)','estimate','AI data centre designer: energy by workload');
const uF=def('oh.fixed','Fixed electrical overhead (UPS no-load, lighting, controls)',0.02,0.01,0.03,'fraction of IT capacity','co','2027-10','Typical UPS no-load and house loads (atlas estimate); applied to provisioned IT power, independent of load','estimate','AI data centre designer: zone PUE at part load');
E['cool']={k:'cool',label:'Cooling table: PUE and WUE for 15 systems × 3 climates',v:'15 × 3',lo:'±0.03 PUE',hi:'±25% WUE',unit:'',owner:O.co,review:'2027-10',src:'Atlas cooling research, Oct 2026 (Chapter 6)',conf:'model',used:'cooling cost, design check, Scope model'};
/* AI accelerators: one sourced record per chip (research report, Oct 2026). kw = maximum system power ÷ GPUs where the vendor publishes it; otherwise TDP + the B300 host share (0.475 kW), marked estimate. mlp = MLPerf Inference Server scenario, output tokens/s per GPU (system ÷ GPUs), with round, precision and system. */
const CHIPS={
 h100:{n:'NVIDIA H100 SXM',arch:'Hopper',mem:80,memT:'HBM3',bw:3.35,bf16:989,fp8:1979,fp4:null,tdp:700,cool:'Air or liquid',link:'NVLink 900 GB/s',kw:1.275,kwSrc:'DGX H100: 10.2 kW max ÷ 8 GPUs (NVIDIA)',kwC:'reported',usd:2.69,usdSrc:'AIMultiple cloud benchmark, 2026',inr:140,inrSrc:'IndiaAI lowest bid (L1), Business Standard Oct 2026',
  mlp:{l8:[5103,'v5.1 · FP8 · 1 GPU (Red Hat vLLM)']},specSrc:'NVIDIA H100 product page'},
 h200:{n:'NVIDIA H200 SXM',arch:'Hopper',mem:141,memT:'HBM3e',bw:4.8,bf16:989,fp8:1979,fp4:null,tdp:700,cool:'Air or liquid',link:'NVLink 900 GB/s',kw:1.275,kwSrc:'DGX H200: 10.2 kW max ÷ 8 GPUs (NVIDIA)',kwC:'reported',usd:5.29,usdSrc:'E2E Networks India on-demand, Oct 2026 (via Ancapex)',inr:140,inrSrc:'IndiaAI rate card ₹100–140 (Ancapex, secondary)',
  mlp:{l8:[7376.6,'v6.1 · FP8 · 1 GPU (individual submitter)'],l70:[4125,'v5.0 · FP8 · 8 GPUs (CoreWeave)'],oss:[3013,'v6.0 · MXFP4 · 8 GPUs (Red Hat)'],r1:[556,'v5.1 · FP8 · DGX H200']},specSrc:'NVIDIA H200 product page'},
 b200:{n:'NVIDIA B200 (HGX)',arch:'Blackwell',mem:180,memT:'HBM3e',bw:7.7,bf16:2250,fp8:4500,fp4:9,tdp:1000,cool:'Air or liquid',link:'NVLink 5, 1.8 TB/s',kw:1.79,kwSrc:'DGX B200: 14.3 kW max ÷ 8 GPUs (NVIDIA)',kwC:'reported',usd:2.68,usdSrc:'Spheron spot, 10 Jun 2026',inr:290.7,inrSrc:'IndiaAI rate card, on-demand (Ancapex, secondary)',
  mlp:{l8:[16251,'v6.0 · FP4 · 8 GPUs (Lambda)'],l70:[12499,'v5.1 · FP4 · 8 GPUs (Lambda)'],oss:[11276,'v6.1 · MXFP4 · 8 GPUs (entry 6.1-0021)'],r1:[7015,'MLPerf Server · FP4 · 8 GPUs']},specSrc:'Lenovo Press LP2226; NVIDIA HGX B200 (180 GB, 7.7 TB/s shipping; 192 GB, 8 TB/s launch figure)'},
 b300:{n:'NVIDIA B300 (Blackwell Ultra)',arch:'Blackwell Ultra',mem:288,memT:'HBM3e',bw:8,bf16:2250,fp8:5000,fp4:15,tdp:1400,cool:'Liquid (air-cooled HGX exists)',link:'NVLink 5, 1.8 TB/s',kw:1.875,kwSrc:'DGX B300: 15 kW max ÷ 8 GPUs; 14.5 kW typical (NVIDIA DGX B300 user guide)',kwC:'reported',usd:3.29,usdSrc:'Spheron spot, 10 Jun 2026',inr:null,inrSrc:'',
  mlp:{l8:[20420.4,'v6.1 · FP4 · 1 GPU'],l70:[14495.6,'v6.1 · FP4 · 1 GPU (entry 6.1-0103)'],oss:[14211,'v6.1 · MXFP4 · 8 GPUs (entry 6.1-0052)'],r1:[8846,'v6.1 · FP4 · 8 GPUs (entry 6.1-0046)']},specSrc:'NVIDIA (1.5× B200 dense FP4); RunPod and Vast.ai datasheets. Dense FP8 is disputed: 5 PF (RunPod) vs 7 PF (Spheron, Vast.ai); BF16 2.25 PF used as the conservative value'},
 mi300x:{n:'AMD Instinct MI300X',arch:'CDNA 3',mem:192,memT:'HBM3',bw:5.3,bf16:1307.4,fp8:2614.9,fp4:null,tdp:750,cool:'Air',link:'Infinity Fabric 896 GB/s',kw:1.225,kwSrc:'TDP + 0.475 kW host share (atlas estimate)',kwC:'estimate',usd:1.87,usdSrc:'IndiaAI L1 ₹168.22 (PIB, 30 May 2025)',inr:168.22,inrSrc:'IndiaAI L1 (PIB, 30 May 2025)',mlp:{},specSrc:'AMD MI300 product page; Lenovo Press LP1943'},
 mi325x:{n:'AMD Instinct MI325X',arch:'CDNA 3',mem:256,memT:'HBM3E',bw:6,bf16:1307.4,fp8:2614.9,fp4:null,tdp:1000,cool:'Air',link:'Infinity Fabric 896 GB/s',kw:1.475,kwSrc:'TDP + 0.475 kW host share (atlas estimate)',kwC:'estimate',usd:null,usdSrc:'',inr:null,inrSrc:'',mlp:{},specSrc:'AMD MI325X datasheet'},
 mi355x:{n:'AMD Instinct MI355X',arch:'CDNA 4',mem:288,memT:'HBM3E',bw:8,bf16:2516,fp8:5033,fp4:10.07,tdp:1400,cool:'Direct liquid',link:'Infinity Fabric 538 GB/s',kw:1.875,kwSrc:'TDP + 0.475 kW host share, as B300 (AMD publishes no platform power; atlas estimate)',kwC:'estimate',usd:null,usdSrc:'No rental price found; SemiAnalysis says "meaningfully lower" than B200',inr:null,inrSrc:'',
  mlp:{l8:[18570,'MLPerf · FP8 · 8 GPUs (Dell; secondary compilation)'],l70:[12909,'v6.1 · FP4 · 8 GPUs (AMD, entry 6.1-0003)'],oss:[14155,'v6.1 · MXFP4 · 8 GPUs (AMD, entry 6.1-0003)'],r1:[4698,'v6.1 · FP4 · 512 GPUs (Crusoe, entry 6.1-0026)']},specSrc:'AMD datasheet via Boston Ltd and AquaNode; 20.1 PF FP4 is the sparse figure'},
 ironwood:{n:'Google TPU v7 Ironwood',arch:'TPU, dual chiplet',mem:192,memT:'HBM3E',bw:7.37,bf16:2307,fp8:4614,fp4:null,tdp:null,cool:'Liquid',link:'ICI 1.2 TB/s; 9,216-chip pods',kw:null,kwSrc:'Not published: 600 W (QSCompute) to ~1 kW claimed',kwC:'unverified',usd:null,usdSrc:'',inr:null,inrSrc:'',mlp:{},specSrc:'Google via Tom\'s Hardware and TrendForce; no MLPerf result'},
 gaudi3:{n:'Intel Gaudi 3 (OAM)',arch:'Gaudi 3',mem:128,memT:'HBM2e',bw:3.7,bf16:1835,fp8:1835,fp4:null,tdp:900,cool:'Air',link:'24 × 200 GbE RoCE',kw:1.375,kwSrc:'TDP + 0.475 kW host share (atlas estimate)',kwC:'estimate',usd:null,usdSrc:'',inr:null,inrSrc:'',mlp:{},specSrc:'Intel Gaudi 3 white paper; no comparable MLPerf v6 datacenter LLM result'}};
/* model shapes for KV-cache sizing (Llama 3 Herd paper, Table 3) */
const CHIPMOD={l8:{n:'Llama 3.1 8B',p:8.03,L:32,kv:8,hd:128},l70:{n:'Llama 3.1 70B',p:70.6,L:80,kv:8,hd:128},l405:{n:'Llama 3.1 405B',p:405,L:126,kv:8,hd:128}};
Object.entries(CHIPS).forEach(([id,c])=>{
 if(c.kw!=null)def('chip.'+id+'.kw',c.n+': server power per GPU',c.kw,+(c.kw*0.93).toFixed(3),c.kw,'kW','co','2027-04',c.kwSrc,c.kwC,'cluster sizing (11.6), design check, GPU-hour cost');
 const m=c.mlp.l70||c.mlp.oss||c.mlp.l8;if(m)def('chip.'+id+'.tok',c.n+': MLPerf Server throughput per GPU ('+(c.mlp.l70?'Llama 2 70B':c.mlp.oss?'GPT-OSS-120B':'Llama 3.1 8B')+')',m[0],m[0],m[0],'output tokens/s','co','2027-04','MLPerf Inference '+m[1],'reported','cluster sizing (11.6), design check, data centre model');
 if(c.usd!=null)def('chip.'+id+'.usd',c.n+': rental price',c.usd,c.usd,c.usd,'US$ per GPU-hour','ec','2027-04',c.usdSrc,'reported','cluster sizing cost');});
const history=[
 {v:'2026.10.1',d:'2026-10',what:'Harmonised: grid water measured at the meter (plant ÷ 0.92), state factors, all-in tariffs, ₹90 per US$, India capacity 1,789 MW.'},
 {v:'2026.10.2',d:'2026-10',what:'Cooling table corrected from the October 2026 research; cooling-tower WUE 1.8 L/kWh in Bengaluru; reference PUEs aligned across tools.'},
 {v:'2026.10.3',d:'2026-10-25',what:'One standards module for every model; ranges, owners and review dates for each value; capex stacks, Scope 3, embodied carbon, shadow prices and climate horizons added.'},
 {v:'2026.10.4',d:'2026-10-26',what:'Workload utilisation added (training 0.90, inference 0.70, general-purpose 0.65) and a 2% fixed electrical overhead; the designer now splits energy, water and carbon by workload and weights PUE and WUE by energy.'},
 {v:'2026.10.5',d:'2026-10-26',what:'Audit: CEA v22.0 grid factor 0.675 t/MWh (FY2025-26) with operating, build and combined margins; coal plant water 3.5 m³/MWh from MoEFCC limits and measured averages (was 5.55), so India grid water at the meter is 2.9 L/kWh (was 4.5); carbon and water both use the national grid by default (CEA publishes no state factors), state generation mixes kept as a sensitivity; reservoir hydro 10 L/kWh everywhere; one reference AI campus (40% training, utilisation 0.78) and conventional hall (0.65); India demand from the CEA midterm review; measured energy per prompt.'},
 {v:'2026.10.6',d:DATE,what:'AI accelerators added: one sourced record for each of nine chips (specifications, server power per GPU, MLPerf Inference Server throughput per GPU, rental prices), read by the cluster sizer, the design check, the data centre model and the GPU-hour calculator. Review every six months: software alone moved MLPerf results by up to 38% between rounds.'}];
const get=k=>E[k]?E[k].v:undefined,range=k=>E[k]?[E[k].lo,E[k].hi]:null;
return {version:VERSION,date:DATE,E,get,range,history,co2,loss,gw:GW,clean,tA:TA,tE:TE,wp,tse,tank,fx,disc,cprice,capex,cool,pue,towerWUE:twue,dryWUE:dwue,re:{solar:.22,wind:.35},it2026,blr,util:{T:uT,I:uI,G:uG,fix:uF},co2om,co2bm,co2cm,coalW,gwN,gwM,gwMix:GWM,mix:MIX,mixW,hydroW,ref:{mixT:refMix,uAI:refUai,uConv:refUconv},dem30,dem32,steelW,promptWh,chips:CHIPS,chipModels:CHIPMOD}})();
