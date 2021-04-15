//1550 x 1160 in mm
//scale of 1000 x 1000, readjust with math...
networks_undrawn["chapelcross33kv"] = {
    lines:{
        "378": StraightLine([875,40],"right",130),
        "into 378 4": StraightLine([885,155],"right",75),
        "into 378 3": StraightLine([960,155],"down",90),
        "into 378 2": StraightLine([900,250],"right",60),
        "into 378 1": StraightLine([960,155],"down",95),

        "378 11": StraightLine([885,40],"down",115),
        "378 12": StraightLine([950, 40],"down",70),

        "CHAP3A1": StraightLine([25,175], "right",496),
        "CHAP3A2": StraightLine([25+496,175], "right",399),
        "698 16": StraightLine([33,175], "down",85),
            "chapelcross dash": StraightLine([15,240],"right",35, dash=true),
        "CHAP3-_STCR3-_1": StraightLine([85,175], "down",300),
            "STCR5-": StraightLine([25,370],"right",90),
            "generator dash": StraightLine([70,440],"right",35,dash=true),
        "ANANT1_CHAP3-_1_1": StraightLine([145,175],"down",105),
            "ANANT1_CHAP3-_1_2": StraightLine([145,280], "right",150),
        "698 13": StraightLine([250,175],"down",225),
            "into DUMF": StraightLine([250,340],"left",90),
        "GRID 1": StraightLine([330,175],"up",120),
            "into DAR tx":StraightLine([330,110],"left",40),
        "698 12": StraightLine([415,175],"down",75),
            "into middlebie 1": StraightLine([200,250],"right",215),
            "into middlebie 2":StraightLine([200,250],"down",275),
            "into middlebie 3":StraightLine([95,525],"right",105),
        "698 11": StraightLine([475,175],"down",75),
            "698 into Gretna 1":StraightLine([725,250],"left",250),
             "698 into Gretna 2" :StraightLine([725,250],"down",65),
             "698 into Gretna 3" :StraightLine([845,315],"left",120),
             "698 into Gretna 4" :StraightLine([845,315],"down",70),


        "698 21": StraightLine([570,175],"down",205),
            "698 right": StraightLine([570,380],"right",45),
        "698 22": StraightLine([625,175],"down",135),
            "into Lockerbie 1": StraightLine([530,310],"right",95),
            "into Lockerbie 2":StraightLine([530,310],"down",90),
        "GRID 2": StraightLine([670,175],"up",115),
            "into GRID 2 tx": StraightLine([670,110],"left",40),
        "698 23": StraightLine([700,175],"down",105),
        "698 24": StraightLine([780,175],"down",110),
        "698 25": StraightLine([840,175],"down",60),
        "698 26": StraightLine([900,175],"down",75),
        "694": StraightLine([230,400],"right",350),

        "LOCKERBIE13":StraightLine([265,400],"down",240),

        //Middlebie
        "M12": StraightLine([95,525],"down",50),
        "Middlebie": StraightLine([65,575],"right",175),
        "M13": StraightLine([80,575],"down",160),
        "M14": StraightLine([160,575],"down",190),
        "M11": StraightLine([205,575],"down",120),

        "into EWE HILL 1": StraightLine([80,735],"left",50),
        "into EWE HILL 2": StraightLine([30,735],"down",150),
        "into EWE HILL 3": StraightLine([30,885],"right",30),
        "781 12": StraightLine([60,885],"up",80),
        "EWE HILL": StraightLine([45,805],"right",85),
        "781 11": StraightLine([115,805],"down",90),

        "Middlebie Primary Transformer": StraightLine([205,695],"right",25),
        "MP10": StraightLine([230,695],"right",50,"11kV"),
        "intoMP": StraightLine([275,730],"up",35,"11kV"),
        "MP": StraightLine([260,730],"right",85,"11kV"),

        "into Langholm 1": StraightLine([160,765],"right",150),
        "Langholm 33kv": StraightLine([300,790],"right",310),
        "into Langholm 2": StraightLine([310,765],"down",90),
        "Langholm tx 33kV": StraightLine([310,855],"right",35),
        "Langholm10": StraightLine([395,855],"left",50,"11kV"),
        "Langholm 11kV 1": StraightLine([395,855],"down",35,"11kV"),
        "Langholm01": StraightLine([365,890],"right",110,"11kV"),
        "Langholm 11kV 2": StraightLine([445,855],"down",35,"11kV"),
        "Langholm20": StraightLine([445,855],"right",35,"11kV"),
        "Langholm Tx2": StraightLine([525,855],"left",35),

        "Langholm to gretna 1": StraightLine([525,855],"up",175),
        "Langholm to gretna 2": StraightLine([525,680],"right",90),
        "Langholm to gretna 3": StraightLine([615,680],"up",300),

        "ANNAN10": StraightLine([340,280],"left",50, "11kV"),
        "into 662 1": StraightLine([340,280],"down",35, "11kV"),
        "662 01": StraightLine([310,315],"right",105, "11kV"),
        "into 662 2": StraightLine([385,280],"down",35, "11kV"),
        "ANNAN20": StraightLine([385,280],"right",50, "11kV"),

        "698 23 into Annan": StraightLine([435,280],"right",265),

        "698 21 into gretna 1": StraightLine([570,380],"right",45),

        "KIRKBANK T": StraightLine([265,550],"right",75),
        "MOFFAT T1": StraightLine([265,640],"right",75),
        "MOFFAT T2": StraightLine([565,640],"left",80),

        "694 23": StraightLine([565,640],"up",240),

        "KIRKBANK10": StraightLine([390,550],"left",50,"11kV"),
        "KIRKBANK 1": StraightLine([390,550],"down",35,"11kV"),
        "KIRKBANK":StraightLine([360,585],"right",85,"11kV"),

        "MOFFAT10": StraightLine([390,640],"left",50, "11kV"),
        "MOFFAT 1": StraightLine([390,640],"down",35, "11kV"),
        "MOFFAT01": StraightLine([366,675],"right",95,"11kV"),
        "MOFFAT 2": StraightLine([440,640],"down",35,"11kV"),
        "MOFFAT20": StraightLine([440,640],"right",50,"11kV"),


        "GRETNA 1": StraightLine([615,535],"right",30),
        "GRETNA 2": StraightLine([645,535],"up",150),
        "GRETNA 691": StraightLine([630,385],"right",245),
        "GRETNA 3": StraightLine([655,460],"up",75),
        "GRETNA T1": StraightLine([655,460],"right",35),
        "GRETNA T2": StraightLine([865,460],"left",35),
        "GRETNA 6":StraightLine([865,460],"up",75),

        //GRETNA 11kV
        "673 10": StraightLine([735,460],"left",50, "11kV"),
        "GRETNA 4": StraightLine([735,460],"down",35,"11kV"),
        "673 01": StraightLine([710,496],"right",100,"11kV"),
        "GRETNA 5": StraightLine([785,460],"down",35,"11kV"),
        "673 20": StraightLine([785,460],"right",50, "11kV"),

        "694 12": StraightLine([305,455],"up",55),
        "694 22": StraightLine([520,455],"up",55),

        "LOCKERBIE T1": StraightLine([305,455],"right",35),
        "679 10": StraightLine([340,455],"right",50, "11kV"),
        "LOCKERBIE 1": StraightLine([390,455],"down",35, "11kV"),
        "679 01": StraightLine([360,490],"right",100, "11kV"),
        "LOCKERBIE 2": StraightLine([435,455],"down",35, "11kV"),
        "679 20": StraightLine([435,455],"right",50, "11kV"),
        "LOCKERBIE T2": StraightLine([485,455],"right",35),

        "MINSKA 1": StraightLine([905,285],"left",125),
        "MINSKA 2": StraightLine([905,285],"down",210),
        "MINSKA 3": StraightLine([850,495],"right",55),
        "MINSKA 4": StraightLine([850,670],"up",175),
        "MINSKA 5": StraightLine([850,670],"right",30),

        "761 CHAP": StraightLine([880,670],"up",60),
        "761": StraightLine([870,610],"right",105),
        "761 WINDFARM": StraightLine([940,610],"down",30),
        "761 CUSTOMER": StraightLine([940,690],"up",50),
        "761 GENERATOR": StraightLine([940,690],"down",60),
        "761 DASH": StraightLine([925,660],"right",30),

        "NEWCASTLETON 1": StraightLine([585,820],"up",30),
        "NEWCASTLETON 2": StraightLine([585,820],"right",50),
        "NEWCASTLETON 3": StraightLine([635,645],"down",175),
        "NEWCASTLETON T1": StraightLine([635,645],"right",30),

        "123 10":StraightLine([710,645],"left",50, "11kV"),
        "NEWCASTLETON 4": StraightLine([710,645],"down",35, "11kV"),
        "123": StraightLine([695,680],"right",85, "11kV"),
        "123 12": StraightLine([745,680],"down",55, "11kV"),

        "785 A": StraightLine([680,940],"left",155,"11kV"),
        "785 21": StraightLine([680,940],"up",160, "11kV"),
        "785 B": StraightLine([670,780],"right",90,"11kV"),
        "785 22": StraightLine([740,780],"down",145,"11kV"),
        "785 DASH": StraightLine([720,835],"right",45,dash=true),

     },
    breakers:{
        "698 16": new Breaker("698 16",0.25,"closed"),
        "698 15": new Breaker("CHAP3-_STCR3-_1",0.07,"closed"),
        "699 CHAP": new Breaker("CHAP3-_STCR3-_1",0.60,"closed", "CHAP"),
        "699 GENERATOR": new Breaker("CHAP3-_STCR3-_1",0.85,"open",name = ""),
        "698 14": new Breaker("ANANT1_CHAP3-_1_1",0.19,"closed"),
        "698 13": new Breaker("698 13",0.1,"closed"),
        "GRID 1": new Breaker("GRID 1",0.2,"closed"),
        "698 12": new Breaker("698 12",0.3,"closed"),
        "698 11": new Breaker("698 11",0.3,"closed"),
        "698 01": new Breaker("CHAP3A1",1,"closed"),
        "698 21": new Breaker("698 21",0.11,"closed"),
        "698 22": new Breaker("698 22",0.16,"closed"),
        "698 23": new Breaker("698 23",0.19,"closed"),
        "698 24": new Breaker("698 24",0.19,"closed"),
        "698 25": new Breaker("698 25",0.31,"closed"),
        "698 26": new Breaker("698 26",0.26,"closed"),
        "678 11": new Breaker("378 11",0.18,"closed"),
        "678 12": new Breaker("378 12",0.3,"closed"),
        "GRID 2": new Breaker("GRID 2",0.2,"closed"),

        "694": new Breaker("694",0.53,"closed"),

        //some of these below are arc breakers

        "780 12": new Breaker("M12",0.5,"closed","12"),
        "780 13": new Breaker("M13",0.1,"closed","13"),
        "780 14": new Breaker("M14",0.08,"closed","14"),
        "780 11": new Breaker("M11",0.12,"closed","11"),

        "781 12": new Breaker("781 12",0.65,"closed","12"),
        "781 11": new Breaker("781 11",0.3,"closed","11"),

        "682 10": new Breaker("MP10",0.6,"closed","10"),

        "676 10": new Breaker("Langholm10",0.3,"closed","10"),
        "676 01": new Breaker("Langholm01",0.5,"closed","01"),
        "676 20": new Breaker("Langholm20",0.4,"closed","20"),

        "662 10": new Breaker("ANNAN10",0.3,"closed","10"),
        "662 01": new Breaker("662 01",0.5,"closed","01"),
        "662 20": new Breaker("ANNAN20",0.3,"closed","20"),

        "694 13": new Breaker("LOCKERBIE13",0.1,"closed","13"),

        "675 10": new Breaker("KIRKBANK10",0.3,"closed","10"),

        "683 10": new Breaker("MOFFAT10",0.3,"closed","10"),
        "683 01": new Breaker("MOFFAT01", 0.5,"closed","01"),
        "683 20": new Breaker("MOFFAT20", 0.3,"closed","20"),

        "694 12": new Breaker("694 12", 0.5,"closed","12"),
        "694 22": new Breaker("694 22", 0.5,"closed","22"),
        "694 23": new Breaker("694 23", 0.89,"closed","13"),

        "679 10": new Breaker("679 10", 0.7,"closed","10"),
        "679 01": new Breaker("679 01",0.53,"closed","01"),
        "679 20": new Breaker("679 20",0.3,"closed","20"),

        "673 10": new Breaker("673 10",0.25,"closed","10"),
        "673 01": new Breaker("673 01",0.5,"closed","01"),
        "673 20": new Breaker("673 20",0.25,"closed","20"),

        "761 CHAP": new Breaker("761 CHAP",0.55,"closed","CHAP"),
        "761 WINDFARM": new Breaker("761 WINDFARM",1,"closed","WINDFARM"),
        "761 CUSTOMER": new Breaker("761 CUSTOMER",0,"closed","CUSTOMER"),

        "123 10": new Breaker("123 10",0.25,"closed","10"),
        "123 12": new Breaker("123 12",0.7,"closed","12"),

        "785 21": new Breaker("785 21",0.86,"closed","21"),
        "785 22": new Breaker("785 22",0.15,"closed","22"),
        "785 CUSTOMER": new Breaker("785 22",0.5,"open","CUSTOMER BREAKER"),


        },
    isolators:{
            "785 CUSTOMER": new Breaker("785 22",0.7,"closed","CUSTOMER ISOLATOR"),
    },
    tx:{
        0: new Tx("into GRID 2 tx",1,"","","33kV","LV"),
        1: new Tx("GRID 2",1,"GRID T2","90 MVA", "33kV","132kV"),
        2: new Tx("GRID 1",1,"GRID T1", "90 MVA", "33kV","132kV"),
        3: new Tx("into DAR tx",1,"","","33kV","LV"),
        5: new Tx("Middlebie Primary Transformer",1,"","10 MVA","11kV","33kV"),
        6: new Tx("Langholm tx 33kV",1,"T1","12 MVA","11kV"),
        7: new Tx("Langholm Tx2",1,"T2","12 MVA","33kV","11kV"),
        "ANANT1_ANAN10_T1": new Tx("ANANT1_CHAP3-_1_2",1,"T1","12 MVA","11kV"),
        "ANANT2_ANAN20_T2": new Tx("ANNAN20",1,"T2","12 MVA","33kV","11kV"),
        11: new Tx("KIRKBANK T",1,"","5VA","11kV"),
        12: new Tx("MOFFAT T1",1,"T1","7.5 MVA","11kV"),
        13: new Tx("MOFFAT20",1,"T2","7.5 MVA","33kV","11kV"),

        14: new Tx("LOCKERBIE T1", 1, "T1", "24 MVA","11kV"),
        15: new Tx("LOCKERBIE T2",0,"T2","24 MVA","33kV","11kV"),

        16: new Tx("GRETNA T1",1,"T1","24 MVA","11kV","33kV"),
        17: new Tx("GRETNA T2",1,"T2","24 MVA","33kV","11kV"),

        18: new Tx("NEWCASTLETON T1",1,"T1","5 MVA","11kV"),

        },
    generators:{
        "STCR5-_1": new Generator("CHAP3-_STCR3-_1",1),
        2: new Generator("781 11",1),
        3: new Generator("785 22",1),
        "MINSCA WF": new Generator("761 GENERATOR", 1),
        5: new Generator("378 12",1),
        },
    labels:{
    1: new Text("CHAP3A1", ["CHAPELCROSS GSP"], [220,-70]),
    2: new Text("CHAP3A1", ["698"], [220,-50]),
    3: new Text("CHAP3A1",["CHAPELCROSS GSP 33kV"],[220,-160]),

    4: new Text("698 16", ["CHAPELCROSS"],[0,50]),
    5: new Text("698 16", ["NO1"],[0,65]),

    6: new Text("Middlebie", ["MIDDLEBIE"],[0,-40]),
    7: new Text("Middlebie", ["33KV SW/STN"],[0,-25]),
    8: new Text("Middlebie", ["780"],[0,-10]),

    9: new Text("EWE HILL", ["EWE HILL"],[0,-40]),
    10: new Text("EWE HILL", ["WINDFARM"],[0,-25]),
    11: new Text("EWE HILL", ["781"],[0,-10]),

    12: new Text("MP", ["MIDDLEBIE "],[5,-40]),
    13: new Text("MP", ["PRIMARY"],[5,-25]),
    14: new Text("MP", ["682"],[5,-10]),

    15: new Text("694", ["LOCKERBIE 33KV"],[10,-40]),

    16: new Text("662 01", ["ANNAN"],[0,-45]),
    17: new Text("662 01", ["662"],[0,-30]),

    18: new Text("679 01", ["LOCKERBIE"],[3,-45]),
    19: new Text("679 01", ["679"],[3,-30]),

    20: new Text("KIRKBANK", ["KIRKBANK"],[20,-30]),
    21: new Text("KIRKBANK",["675"],[20,-15]),

    23: new Text("MOFFAT01", ["MOFFAT"],[0,-45]),
    24: new Text("MOFFAT01", ["683"],[0,-30]),

    25: new Text("Langholm 33kv", ["LANGHOLM 33KV"],[0,-30]),
    26: new Text("Langholm 33kv", ["692"],[0,-15]),

    27: new Text("Langholm 33kv", ["LANGHOLM 33KV"],[0,-30]),
    28: new Text("Langholm 33kv", ["692"],[0,-15]),

    29: new Text("Langholm01", ["LANGHOLM 33KV"],[0,-65]),
    30: new Text("Langholm01", ["692"],[0,-45]),

    31: new Text("STCR5-", ["STEVENS CROFT"],[-25,-45]),
    32:new Text("STCR5-", ["33KV"],[-25,-30]),
    33:new Text("STCR5-", ["699"],[-25,-15]),

    34:new Text("into DUMF", ["CARRUTHERSTOWN"],[-55,-15]),
    35:new Text("into DUMF", ["33 kV"],[-59,0]),
    36:new Text("into DUMF", ["DUMF"],[-50,-30]),

    37:new Text("GRETNA 691", ["GRETNA 33kV"],[0,-30]),
    38:new Text("GRETNA 691", ["691"],[0,-15]),

    39:new Text("673 01", ["GRETNA"],[0,-60]),
    40:new Text("673 01", ["673"],[0,-45]),

    41: new Text("123", ["NEWCASTLETON"],[20,-30]),
    42: new Text("123",["123"],[20,-15]),

    43: new Text("785 B", ["CRAIG II WINDFARM 11KV"],[20,-30]),
    44: new Text("785 B",["785"],[20,-15]),

    45: new Text("761",["MINSCA 33KV"],[0,-30]),
    46: new Text("761",["761"],[0,-15]),

    47: new Text("698 25",["CHAPELCROSS"],[0,40]),
    48: new Text("698 25",["NO2"],[0,55]),

    49: new Text("378",["SOLWAY BANK 33KV"],[0,-30]),
    50: new Text("378",["378"],[0,-15]),

    },
    dataViews:{
        "SOLWAYBANK": new DataView(850,100, ["MW","MVAR","kV","AMPS"]),
        "GRID 2": new DataView(740,100, ["MW","MVAR","kV","AMPS"]),
        "GRID 1": new DataView(400,100 , ["MW","MVAR","kV","AMPS"]),
        "STEVENSCROFT": new DataView(50,400, ["MW","MVAR","kV","AMPS"]),
        "MINSCA": new DataView(950,450, ["MW","MVAR","kV","AMPS"]),

        "CRAIG II": new DataView(800,770, ["MW","MVAR","kV","AMPS","Hz"]),

        "MINSCA Hz": new DataView(970,600, ["Hz"]),
        "SOLWAYBANK Hz": new DataView(990,30, ["Hz"]),

        "398 26": new DataView(880,230, ["Amps"]),
        "398 25": new DataView(820,230, ["Amps"]),
        "398 24": new DataView(760,230, ["Amps"]),
        "398 23": new DataView(680,230, ["Amps"]),
        "398 22": new DataView(605,230, ["Amps"]),
        "398 21": new DataView(550,230, ["Amps"]),

        "398 11": new DataView(455,230, ["Amps"]),
        "398 12": new DataView(390,230, ["Amps"]),
        "398 13": new DataView(230,230, ["Amps"]),
        "398 14": new DataView(125,230, ["Amps"]),
        "398 15": new DataView(65,230, ["Amps"]),
        "398 16": new DataView(15,230, ["Amps"]),





    },
}