//1550 x 1160 in mm
//scale of 1000 x 1000, readjust with math...
networks_undrawn["chapelcross132kv"]={
    lines:{

    "CHAP3A1#0": StraightLine([280,865],"up",50, "33kV"),
    "CHAP1-_CHAP3-_1#0": StraightLine([280,815],"up",125, "33kV"),
    "CHAP1-_CHAP3-_1#1": StraightLine([280,750],"left",40, "33kV"),

    "CHAP3A2#0": StraightLine([665,865],"up",50, "33kV"),
    "CHAP1-_CHAP3-_2#0": StraightLine([665,815],"up",125,"33kV"),
    "CHAP1-_CHAP3-_2#3": StraightLine([665,750],"left",40,"33kV"),

    "CHAP1-_R1-_1#0": StraightLine([865,370],"down",50,"132kV"),
    "CHAP1-_M1-_2#0": StraightLine([865,420],"down",150,"132kV"),
    "CHAP1-_M1-_2#1":StraightLine([905,470],"left",40, "132kV"),
    "CHAP1-_M1-_2#2": StraightLine([905,470],"up",145, "132kV"),
     "HARK": StraightLine([905,325],"up",145, "132kV"),

    "CHAP1-_R1-_1#1": StraightLine([785,370],"down",50,"132kV"),
    "CHAP1-_M1-_2#3": StraightLine([785,420],"down",150,"132kV"),
    "CHAP1-_M1-_2#4":StraightLine([825,470],"left",40, "132kV"),
    "CHAP1-_M1-_2#5": StraightLine([825,470],"up",145, "132kV"),
     "DUMF-2": StraightLine([825,325],"up",145, "132kV"),

    "CHAP1-_M1-_2#6": StraightLine([700,470],"down",100,"132kV"),
    "CHAP1-_R1-_1#2": StraightLine([700,370],"down",150,"132kV"),
        "CHAP1-_R1-_1#3":StraightLine([740,470],"left",40, "132kV"),
        "CHAP1-_R1-_1#4": StraightLine([740,470],"up",145, "132kV"),
    "ECCF-2": StraightLine([740,325],"up",145, "132kV"),

    "CHAP1-_R1-_1#5": StraightLine([625,370],"down",50,"132kV"),
    "CHAP1-_M1-_2#7": StraightLine([625,420],"down",150,"132kV"),
    "CHAP1-_M1-_2#8": StraightLine([665,465],"left",40,"132kV"),
    "CHAP1-_M1-_2#9": StraightLine([665,465],"down",175,"132kV"),
    "CHAP1-_T2" : StraightLine([665,690],"up",50,"132kV"),

    "CHAP1-_R1-_1#6": StraightLine([555,370],"down",150,"132kV"),
    "CHAP1-_M1-_2#10": StraightLine([555,520],"down",50,"132kV"),
    "CHAP1-_R1-_1#7":StraightLine([595,470],"left",40, "132kV"),
    "CHAP1-_R1-_1#8": StraightLine([595,470],"up",145, "132kV"),
    "GRNA-2": StraightLine([595,325],"up",145, "132kV"),

    "CHAP1-_R1-_1#9": StraightLine([400,370],"down",100,"132kV"),
    "CHAP1-_M1-_1#12": StraightLine([400,470],"down",100,"132kV"),

    "CHAP1-_R1-_1#10": StraightLine([320,370],"down",50,"132kV"),
    "CHAP1-_M1-_1#0": StraightLine([320,420],"down",150,"132kV"),
    "CHAP1-_M1-_1#1":StraightLine([360,470],"left",40, "132kV"),
    "CHAP1-_M1-_1#2": StraightLine([360,470],"up",145, "132kV"),
    "DUMF-1": StraightLine([360,325],"up",145, "132kV"),


    "CHAP1-_R1-_1#11": StraightLine([240,370],"down",50,"132kV"),
    "CHAP1-_M1-_1#3": StraightLine([240,420],"down",150,"132kV"),
    "CHAP1-_M1-_1#4": StraightLine([280,465],"left",40,"132kV"),
    "CHAP1-_M1-_1#5": StraightLine([280,465],"down",175,"132kV"),
    "CHAP1-_T1" : StraightLine([280,690],"up",50,"132kV"),

    "CHAP1-_R1-_1#12": StraightLine([150,370],"down",50,"132kV"),
    "CHAP1-_M1-_1#6": StraightLine([150,420],"down",150,"132kV"),
        "CHAP1-_M1-_1#7":StraightLine([190,470],"left",40, "132kV"),
        "CHAP1-_M1-_1#8": StraightLine([190,470],"up",145, "132kV"),
        "ECCF-1": StraightLine([190,325],"up",145, "132kV"),

    "CHAP1-_R1-_1#13": StraightLine([65,370],"down",50,"132kV"),
    "CHAP1-_M1-_1#9": StraightLine([65,420],"down",150,"132kV"),
        "CHAP1-_M1-_1#10":StraightLine([110,470],"left",45, "132kV"),
        "CHAP1-_M1-_1#11": StraightLine([110,470],"up",145, "132kV"),
        "GRNA-1": StraightLine([110,325],"up",145, "132kV"),
    },

    busbars:{
    "CHAP1-_M1-_1": StraightLine([35,570],"right",450,"132kV"),
    "CHAP1-_M1-_2": StraightLine([485,570],"right",455,"132kV"),

    "CHAP1-_R1-_1": StraightLine([35,370],"right",905,"132kV"),

    "CHAP3A1": StraightLine([125,865], "right",375),
    "CHAP3A2": StraightLine([125+375,865], "right",375),

    },

    breakers:{
        "698 01": new Breaker("CHAP3A1", 1),
        "GRID 1": new Breaker("CHAP3A1#0", 1),
        "GRID 2": new Breaker("CHAP3A2#0",1),
//
        "710":new Breaker("CHAP1-_T1",1),
        "120": new Breaker("CHAP1-_M1-_1",1),
        "330": new Breaker("CHAP1-_M1-_1#12",0),
        "500":new Breaker("CHAP1-_M1-_1#2",1),
        "205": new Breaker("CHAP1-_R1-_1#8",1),
        "615": new Breaker("CHAP1-_R1-_1#4",1),
        "1005": new Breaker("CHAP1-_M1-_2#2",1),
        "800": new Breaker("CHAP1-_M1-_2#5",1),
        "915": new Breaker("CHAP1-_M1-_1#8",1),
        "1105": new Breaker("CHAP1-_M1-_1#11",1),
        "410": new Breaker("CHAP1-_T2",1),

    },

    tx:{1: new Tx("CHAP1-_CHAP3-_1#1",1,"","", "0V"),
        "CHAP1-_CHAP3-_1": new Tx("CHAP1-_CHAP3-_1#0",1,"GRID T1","90MVA","132kV"),

        3: new Tx("CHAP1-_CHAP3-_2#3",1,"","", "0V"),
        "CHAP1-_CHAP3-_2": new Tx("CHAP1-_CHAP3-_2#0",1,"GRID T2","90MVA","132kV"),
        },

    isolators:{
        "1103": new Isolator("GRNA-1",0.3,"closed"),
        "1106": new Isolator("CHAP1-_M1-_1#9",0,"open"),
        "1104": new Isolator("CHAP1-_M1-_1#9",0.66,"closed"),
        "913": new Isolator("ECCF-1",0.3,"closed"),
        "916": new Isolator("CHAP1-_M1-_1#6",0,"open"),
        "914": new Isolator("CHAP1-_M1-_1#6",0.66,"closed"),
        "716": new Isolator("CHAP1-_M1-_1#3",0,"open"),
        "714": new Isolator("CHAP1-_M1-_1#3",0.66,"closed"),
//
        "503": new Isolator("DUMF-1",0.3,"closed"),
        "506": new Isolator("CHAP1-_M1-_1#0",0,"open"),
        "504": new Isolator("CHAP1-_M1-_1#0",0.66,"closed"),

        "203": new Isolator("GRNA-2",0.3,"closed"),
        "206": new Isolator("CHAP1-_R1-_1#6",0.33,"closed"),
        "204": new Isolator("CHAP1-_R1-_1#6",1,"open"),
        "416": new Isolator("CHAP1-_M1-_2#7",0,"open"),
        "414": new Isolator("CHAP1-_M1-_2#7",0.66,"closed"),

        "613": new Isolator("ECCF-2",0.3,"closed"),
        "616": new Isolator("CHAP1-_R1-_1#2",0.33,"closed"),
        "614": new Isolator("CHAP1-_R1-_1#2",1,"open"),

        "803": new Isolator("DUMF-2",0.3,"closed"),
        "806": new Isolator("CHAP1-_M1-_2#3",0,"open"),
        "804": new Isolator("CHAP1-_M1-_2#3",0.66,"closed"),

        "1003": new Isolator("HARK",0.3,"closed"),
        "1006": new Isolator("CHAP1-_M1-_2#0",0,"open"),
        "1004": new Isolator("CHAP1-_M1-_2#0",0.66,"closed"),

        "124": new Isolator("CHAP1-_M1-_1", 0.9,"closed"),
        "128": new Isolator("CHAP1-_M1-_2", 0.1,"closed"),

        "126": new Isolator("CHAP1-_R1-_1", 0.45,"closed"),
        "129": new Isolator("CHAP1-_R1-_1", 0.55,"closed"),

        "336": new Isolator("CHAP1-_R1-_1#9", 0.55, "closed"),
        "334": new Isolator("CHAP1-_M1-_1#12", 0.45, "closed"),

    },
//    dataViews:{
//        "ECCF-1": new DataView(250,190,"",["MVA", "MW","MVAR","kV","Amps"]),
//        "GRNA-1": new DataView(80,190,"", ["MVA", "MW","MVAR","kV","Amps"]),
//        "DUMF-1": new DataView(420,190,"",["MVA", "MW","MVAR","kV","Amps"]),
//        "GRNA-2": new DataView(560,190,"",["MVA", "MW","MVAR","kV","Amps"]),
//        "ECCF-2": new DataView(700,190,"",["MVA", "MW","MVAR","kV","Amps"]),
//        "DUMF-2": new DataView(870,190,"",["MVA", "MW","MVAR","kV","Amps"]),
//        "HARK": new DataView(950,190, "", ["MVA", "MW","MVAR","kV","Amps"]),
//        "CHAP1-_CHAP3-_1#0": new DataView(350,770,"",["MVA", "MW","MVAR","kV","Amps"]),
//        "CHAP1-_CHAP3-_2#0": new DataView(750,770,"",["MVA", "MW","MVAR","kV","Amps"]),
//
//        "R1-_1 1": new DataView(45,350, "",["kV"]),
//        "M1 1": new DataView(45,590, "",["kV"]),
//
//        "R1-_1 2": new DataView(945,350,"", ["kV"]),
//        "M1 2": new DataView(945,590, "",["kV"]),
//    },
    labels:{
    1: new Text("CHAP3A1", ["CHAPELCROSS GSP"], [185,-70]),
    2: new Text("CHAP3A1", ["SPD"], [185,-180]),
    3: new Text("CHAP3A1", ["33kV"], [185,-195]),
    4: new Text("CHAP1-_M1-_1",["M1"],[-245,0]),
    5: new Text("CHAP1-_R1-_1",["R1"],[-470,0]),
    6: new Text("CHAP1-_R1-_1",["132kV"],[-10,90]),
    7: new Text("CHAP1-_R1-_1",["(SPD)"],[-10,105]),
//
    8: new Text("GRNA-1",["GRNA-1"],[0,-100]),
    9: new Text("ECCF-1",["ECCF-1"],[0,-100]),
    10: new Text("GRNA-2",["GRNA-2"],[0,-100]),
    11: new Text("ECCF-2",["ECCF-2"],[0,-100]),
    12: new Text("DUMF-2",["DUMF-2"],[0,-100]),
    13: new Text("HARK",["HARK"],[0,-100]),
    14: new Text("DUMF-1",["DUMF-1"],[0,0-100]),

    15: new Text("CHAP1-_R1-_1",["CHAPELCROSS 132kV"],[0,-350]),
    },
//
    generationInfo:{
        "MINS0G_1": new GenerationInfo([120,780],"Minsca Windfarm (MINSW-1)"),
        "WYSB0G_1": new GenerationInfo([120,680],"Solway Bank Windfarm (SWBKW-1)"),
        "STCR5-_1": new GenerationInfo([820,620],"Stevens Croft Biomass (STCR-1)"),
    }
}