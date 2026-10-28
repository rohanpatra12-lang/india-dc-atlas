
/* ---------- shared model ---------- */
const CITY={
 blr:{n:'Bengaluru',st:'Karnataka',db:35,wb:23,land:8,t:STD.tE["Karnataka"],dem:365,re:6.2,gw:STD.gw["Karnataka"],ws:1,wp:STD.wp,tE:0},
 mum:{n:'Mumbai',st:'Maharashtra',db:35,wb:28,land:20,t:STD.tE["Maharashtra"],dem:560,re:5.8,gw:STD.gw["Maharashtra"],ws:.5,wp:80,coast:1,tE:0},
 che:{n:'Chennai',st:'Tamil Nadu',db:38,wb:29,land:6,t:STD.tE["Tamil Nadu"],dem:608,re:5.9,gw:STD.gw["Tamil Nadu"],ws:.9,wp:80,coast:1,tE:0},
 hyd:{n:'Hyderabad',st:'Telangana',db:41,wb:26,land:8,t:STD.tE["Telangana"],dem:500,re:6.1,gw:STD.gw["Telangana"],ws:.7,wp:80,tE:0},
 noi:{n:'Noida',st:'Uttar Pradesh',db:45,wb:29,land:10,t:STD.tE["Uttar Pradesh"],dem:450,re:6.0,gw:STD.gw["Uttar Pradesh"],ws:.85,wp:80,tE:1},
 viz:{n:'Vizag',st:'Andhra Pradesh',db:36,wb:28,land:3,t:STD.tE["Andhra Pradesh"],dem:475,re:5.5,gw:STD.gw["Andhra Pradesh"],ws:.6,wp:80,coast:1,tE:1}};
const INC={
 'Karnataka':{sub:0,ed:1,bonus:20,note:'Electricity-duty exemption, plus ₹20 crore one-time for PUE ≤ 1.20 and reimbursements for WUE and treated water (Sustainable DC Policy 2026–31).'},
 'Maharashtra':{sub:1,ed:1,re51:1,note:'₹1/unit tariff subsidy and a 20-year duty waiver in green DC parks, conditional on at least 51% renewable power (GR, June 2026).'},
 'Tamil Nadu':{sub:0,ed:0,note:'The 2021 policy lapsed on 31 March 2026. No incentive applies until a successor is notified.'},
 'Telangana':{sub:0,ed:0,note:'A 2016 policy. Large projects get packages negotiated case by case, none of them published, so nothing is modelled here.'},
 'Uttar Pradesh':{sub:0,ed:1,note:'10-year electricity-duty waiver, plus a booster for PUE or green certification (DC Policy 2026).'},
 'Andhra Pradesh':{sub:0,ed:0,note:'Industrial tariff; transmission and wheeling relief case by case; stamp-duty and land concessions for mega projects (Policy 4.0).'}};
const WL={
 colo:{n:'Colocation',fac:56.1,ac:.25,o:2.25,u:65,ls:.045,ot:.015},
 hyp:{n:'Hyperscale cloud',fac:39.2,ac:.4,o:1.17,u:75,ls:.045,ot:.015},
 ai:{n:'AI training',fac:72.5,ac:.3,o:3.29,u:78,ls:.045,ot:.015,it:266,gpm:425}};
const COOLN={tower:'Cooling towers',adiab:'Adiabatic dry coolers',aircc:'Air-cooled chillers',dlc:'Warm-water liquid + dry coolers'};