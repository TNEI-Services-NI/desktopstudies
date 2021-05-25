# -*- coding: utf-8 -*-

start_sim_step = -2

step_map = {
    k: '{}'.format(k) if k >= 0 else
        'Post-blackout' if k == -2 else
        'Pre-restoration' if k == -1 else
        'Post-restoration' for k in range(-2, 36)
}

steps = ["Post black-out",
"Switch to pre-restoration",
"0 Energise Steven's Croft generator",
"1.1 Energise Steven's croft BB(CUSTOMER)",
"1.2 Energise Steven's Croft cable to Chapelcross(CHAP)",
"2.1 Energise Minsca PoC (MINSCA WF)",
"2.2 Energise Minsca WF (CUSTOMER)",
"3.1 Energise Ewe Hill 1 PoC (12) ",
"3.2 Energise Ewe Hill WF (CUSTOMER)",
"4.1 Energise Chapelcross Grid 1 132/33kV Trfr (698-10)",
"4.2 Energise Chapelcross 132kV M1 BB (698-710)",
"4.3 Energise Chapelcross - Gretna 1 132kV circuit (698-1105)",
"5.1 Close Gretna CB, energise Gretna 132kV BB (305)",
"5.2 Energise Gretna SGT1 400/132kV (780)",
"5.3 Energise Gretna - Ewe Hill 2 132kV circuit (805)",
"5.4 Energise Ewe Hill 2 WF (GRID 1)",
"5.5 Energise Ewe Hill 2 circuits (WG2)",
"6.1 Energise Chapelcross - Annan circuit 1 (698-14)",
"6.2 Energise Chapelcross - Annan circuit 2 (698-23)",
"7.1 Energise Middlebie SWS - Middlebie circuit (780-11)",
"8.1 Minsca WF, Ewe Hill 1 WF, Ewe Hill 2 WF to produce 20% MW",
"8.2 Energise Middlebie SWS - Langholm circuit 1 (780-14)",
"9.1 Energise Chapelcross - Gretna circuit 2 (698-11)",
"10.1 Energise Chapelcross - Gretna circuit 1, Langholm 2, Newcastleton (698-21)",
"11.1 Minsca WF, Ewe Hill 1 WF, Ewe Hill 2 WF to produce 25% MW",
"11.2 Energise Chapelcross -Lockerbie circuit 1 (698-13)",
"11.3 Minsca WF, Ewe Hill 1 WF to produce 45% MW",
"11.4 Energise Chapelcross -Lockerbie circuit 2 (698-22)",
"12.1 Energise Lockerbie - Kirkbank and Moffat 1 (694-13)",
"13.1 Energise Lockerbie - Moffat 2 (694-23)",
"14.1 Close Annan 11kV bus section (662-01)",
"14.2 Close Lockerbie 11kV bus section (679-01)",
"14.3 Close Moffat 11kV bus section (683-01)",
"14.4 Connect Langholm T2 (676-20)",
"14.5 Connect Gretna T1 (673-10)",
"15.1 Energise Gretna 400kV B/B from Harker (X605)",
"15.2 Connect Transmisison network to Chapelcross DRZ via SGT1 (X510)"]


entity_network_map = {
    'ESO': 'chapelcross132kv',
    'DNO': 'chapelcross33kv',
    'TO': 'gretna400kv',
    'DER': 'ewehillgretna',
    'Observer': 'chapelcross33kv',
    'admin': 'chapelcross33kv',
}

demo = False

debug = False

local = False
