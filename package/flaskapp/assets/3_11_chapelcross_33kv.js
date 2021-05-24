//1550 x 1160 in mm
//scale of 1000 x 1000, readjust with math...
networks_undrawn["chapelcross33kv"] = {
    lines:
    Object.assign(
      LoadBank(130,370, "STCR3-"),
      {
        "CHAP3-_SOLWAY#0": StraightLine([875,40],"right",130),
        "CHAP3-_SOLWAY#4": StraightLine([885,155],"right",75),
        "CHAP3-_SOLWAY#2": StraightLine([900,250],"right",60),
        "CHAP3-_SOLWAY#1": StraightLine([960,155],"down",95),

        "CHAP3-_SOLWAY#5": StraightLine([885,40],"down",115),
        "CHAP3-_SOLWAY#6": StraightLine([950, 40],"down",70),

        "CHAP3A1": StraightLine([25,175], "right",496),

        "CHAP3A2": StraightLine([25+496,175], "right",399),

        "CHAP3A1#0": StraightLine([85,175], "down",20),
        "CHAP3-_STCR3-_1#0": StraightLine([85,195], "down",150),

        "STCR3-#0": StraightLine([85,375], "down",40),
        "STCR3-#1": StraightLine([85,375], "up",30),


        "STCR3-_STCR0G": StraightLine([85,415], "down",60),


            "STCR5-": StraightLine([70,440],"right",35,"0V",true),

        "ANANT1_CHAP3-_1#1": StraightLine([145,195],"down",85),
        "CHAP3A1#3": StraightLine([145,175],"down",20),
            "ANANT1_CHAP3-_1#2": StraightLine([145,280], "right",150),

        "CHAP3A1#4": StraightLine([250,175],"down",20),
        "CHAPX1_LOBI3A_1#0": StraightLine([250,195],"down",205),
            "CHAPX1_LOBI3A_1#1": StraightLine([250,340],"left",90),

        "CHAP3A1#1": StraightLine([330,175],"up",20),
        "CHAP1-_CHAP3-_1#0": StraightLine([330,155],"up",95),
         "CHAP1-_CHAP3-_1#1":StraightLine([290,110],"right",40),
         "CHAP1-_CHAP3-_1#3":StraightLine([290,110],"right",0,"LV"),

        "CHAP3-_MIBI3-_1#0": StraightLine([415,195],"down",55),
        "CHAP3A1#5": StraightLine([415,175],"down",20),


            "CHAP3-_MIBI3-_1#1": StraightLine([200,250],"right",215),
            "CHAP3-_MIBI3-_1#2":StraightLine([200,250],"down",275),
            "CHAP3-_MIBI3-_1#3":StraightLine([95,525],"right",105),
            "CHAP3A1#6": StraightLine([475,175],"down",20),

        "CHAP3-_GRNA3B_1#0": StraightLine([475,195],"down",55),
            "CHAP3-_GRNA3B_1#1":StraightLine([725,250],"left",250),
             "CHAP3-_GRNA3B_1#2" :StraightLine([725,250],"down",65),
             "CHAP3-_GRNA3B_1#3" :StraightLine([845,315],"left",120),
             "CHAP3-_GRNA3B_1#4" :StraightLine([845,315],"down",70),


        "CHAP3A2#1": StraightLine([570,175],"down",20),
        "CHAP3-_CHAPX3_1#0": StraightLine([570,195],"down",185),
            "698 right": StraightLine([570,380],"right",45),
        "CHAP3-_LOBI3B_1#0": StraightLine([625,195],"down",115),
        "CHAP3A2#2": StraightLine([625,175],"down",20),
            "CHAP3-_LOBI3B_1#1": StraightLine([530,310],"right",95),
            "CHAP3-_LOBI3B_1#2":StraightLine([530,310],"down",90),

        "CHAP3A2#0": StraightLine([670,175],"up",20),
        "CHAP1-_CHAP3-_2#0": StraightLine([670,155],"up",95),
            "CHAP1-_CHAP3-_2#1": StraightLine([670,110],"left",40),

        "ANANT2_CHAP3-_1#0": StraightLine([700,195],"down",85),
        "CHAP3A2#3": StraightLine([700,175],"down",20),

        "CHAP3-_MINS3-_1#0": StraightLine([780,195],"down",90),
        "CHAP3A2#4": StraightLine([780,175],"down",20),

        "CHAP3-_SOLWAY#3": StraightLine([900,195],"down",55),
        "CHAP3A2#5": StraightLine([900,175],"down",20),

        "LOBI3A": StraightLine([230,400],"right",175),
        "LOBI3B": StraightLine([230+175,400],"right",175),

        "CHAPX4_LOBI3A_1":StraightLine([265,400],"down",550-400),
        "LOBI3A#0":StraightLine([265,400],"down",20),

        "CHAPX4_MOFTT1_1#0":StraightLine([265,550],"down",90),

        //Middlebie

        "CHAP3-_MIBI3-_1": StraightLine([95,525],"down",50),

        "MIBI3-": StraightLine([65,575],"right",175),
        "EWEH3-_MIBI3-_1#0": StraightLine([80,575],"down",160),
        "MIBI3-_LAHO3A_1#0": StraightLine([160,575],"down",190),
        "MIBI3-#0": StraightLine([160,575],"down",17),

        "MIBI3-_MIBIT1_1#0": StraightLine([205,575],"down",120),
        "MIBI3-#1": StraightLine([205,575],"down",17),

        "EWEH3-_MIBI3-_1#1": StraightLine([80,735],"left",50),
        "EWEH3-_MIBI3-_1#2": StraightLine([30,735],"down",150),
        "EWEH3-_MIBI3-_1#3": StraightLine([30,885],"right",30),
        "EWEH3-_MIBI3-_1#4": StraightLine([60,885],"up",80),
        "EWEH3-": StraightLine([45,805],"right",85),

        "EWEH3-#0": StraightLine([115,805],"down",27),

        "EWEH3-_EWEH0G_1": StraightLine([115,832],"down",40),

        "EWEH_POC": StraightLine([100,852],"right",30,"0V", true ),

        "EWEH0G": StraightLine([115,872],"down",30),


        "MIBI3-_MIBIT1_1#1": StraightLine([205,695],"right",25),
        "MIBI3-_MIBIT1_1#2": StraightLine([230,695],"right",50,"11kV"),
        "MIBI3-_MIBIT1_1#3": StraightLine([275,730],"up",35,"11kV"),
        "MIBI5-": StraightLine([260,730],"right",85,"11kV"),

        "MIBI3-_LAHO3A_1#1": StraightLine([160,765],"right",150),
        "LAHO3A": StraightLine([300,790],"right",120),
        "LAHO3B": StraightLine([420,790],"right",190),
        "MIBI3-_LAHO3A_1#2": StraightLine([310,765],"down",90),
        "MIBI3-_LAHO3A_1#3": StraightLine([310,855],"right",35),
        "MIBI3-_LAHO3A_1#4": StraightLine([395,855],"left",50,"11kV"),
        "MIBI3-_LAHO3A_1#5": StraightLine([395,855],"down",35,"11kV"),
        "LAHO5-1": StraightLine([365,890],"right",55,"11kV"),
        "LAHO5-2": StraightLine([365+55,890],"right",55,"11kV"),
        "LAHO5-2#1": StraightLine([445,855],"down",35,"11kV"),
        "CHAPX3_LAHO3B_1#4": StraightLine([445,855],"right",35,"11kV"),
        "LAHO5-2#2": StraightLine([445,855],"right",15,"11kV"),

        "CHAPX3_LAHO3B_1#3": StraightLine([525,855],"left",35),

        "CHAPX3_LAHO3B_1#1": StraightLine([525,855],"up",175),
        "CHAPX3_LAHO3B_1#2": StraightLine([525,680],"right",90),
        "CHAP3-_CHAPX3_1#2": StraightLine([615,380],"down",535-380),
        "CHAPX3_LAHO3B_1#0": StraightLine([615,535],"down",680-535),

        "ANANT1_CHAP3-_1#0": StraightLine([340,280],"left",50, "11kV"),
        "ANANT1_CHAP3-_1#3": StraightLine([340,280],"down",35, "11kV"),
        "ANAN5-1": StraightLine([310,315],"right",52, "11kV"),
        "ANAN5-2": StraightLine([310+52,315],"right",53, "11kV"),
        "ANANT2_CHAP3-_1#2": StraightLine([385,280],"down",35, "11kV"),
        "ANANT2_CHAP3-_1#3": StraightLine([385,280],"right",50, "11kV"),

        "ANANT2_CHAP3-_1#1": StraightLine([435,280],"right",265),

        "CHAP3-_CHAPX3_1#1": StraightLine([570,380],"right",45),

        "CHAPX4_KIBAT1_1#0": StraightLine([265,550],"right",75),
        "CHAPX4_KIBAT1_1#1": StraightLine([390,550],"left",50,"11kV"),
        "CHAPX4_KIBAT1_1#2": StraightLine([390,550],"down",35,"11kV"),

        "CHAPX4_MOFTT1_1#1": StraightLine([265,640],"right",75),
        "CHAPX4_MOFTT1_1#2": StraightLine([390,640],"left",50, "11kV"),
        "CHAPX4_MOFTT1_1#3": StraightLine([390,640],"down",35, "11kV"),

        "LOBI3B_MOFTT2_1#0": StraightLine([565,640],"up",240),
        "LOBI3B#1":StraightLine([565,400],"down",20),

        "LOBI3B_MOFTT2_1#1": StraightLine([565,640],"left",80),
        "LOBI3B_MOFTT2_1#2": StraightLine([440,640],"down",35,"11kV"),
        "LOBI3B_MOFTT2_1#3": StraightLine([440,640],"right",50,"11kV"),

        "KIBA5-":StraightLine([360,585],"right",85,"11kV"),

        "MOFT5-1": StraightLine([366,675],"right",45,"11kV"),
        "MOFT5-2": StraightLine([366+45,675],"right",45,"11kV"),

        "CHAP3-_CHAPX3_1#3": StraightLine([615,535],"right",30),
        "CHAP3-_CHAPX3_1#4": StraightLine([645,535],"up",150),
        "GRNA3A": StraightLine([630,385],"right",123),
        "GRNA3B": StraightLine([630+123,385],"right",122),
        "GRNA3A_GRNAT1_1#0": StraightLine([655,460],"up",75),
        "GRNA3A_GRNAT1_1#1": StraightLine([655,460],"right",35),
        "GRNA3B_GRNAT2_1#1": StraightLine([865,460],"left",35),
        "GRNA3B_GRNAT2_1#0":StraightLine([865,460],"up",75),

        //GRETNA 11kV
        "GRNAT1_GRNA10_T1#0": StraightLine([735,460],"left",50, "11kV"),
        "GRNA5-1#2": StraightLine([735,460],"left",15, "11kV"),

        "GRNA5-1#1": StraightLine([735,460],"down",35,"11kV"),
        "GRNA5-1": StraightLine([710,496],"right",50,"11kV"),
        "GRNA5-2": StraightLine([760,496],"right",50,"11kV"),
        "GRNA3B_GRNAT2_1#3": StraightLine([785,460],"down",35,"11kV"),
        "GRNA3B_GRNAT2_1#2": StraightLine([785,460],"right",50, "11kV"),

        "LOBI3A_LOBIT1_1#0": StraightLine([305,455],"up",55),
        "LOBI3A_LOBIT1_1#1": StraightLine([305,455],"right",35),
        "LOBI3A_LOBIT1_1#2": StraightLine([340,455],"right",50, "11kV"),
        "LOBI3A_LOBIT1_1#3": StraightLine([390,455],"down",35, "11kV"),

        "LOBI3B_LOBIT2_1#0": StraightLine([520,455],"up",55),
        "LOBI3B_LOBIT2_1#2": StraightLine([435,455],"down",35, "11kV"),
        "LOBI3B_LOBIT2_1#3": StraightLine([435,455],"right",50, "11kV"),
        "LOBI3B_LOBIT2_1#4": StraightLine([485,455],"right",35),

        "LOBI5-1": StraightLine([360,490],"right",50, "11kV"),
        "LOBI5-2": StraightLine([410,490],"right",50, "11kV"),

        "CHAP3-_MINS3-_1#1": StraightLine([905,285],"left",125),
        "CHAP3-_MINS3-_1#2": StraightLine([905,285],"down",210),
        "CHAP3-_MINS3-_1#3": StraightLine([850,495],"right",55),
        "CHAP3-_MINS3-_1#4": StraightLine([850,670],"up",175),
        "CHAP3-_MINS3-_1#5": StraightLine([850,670],"right",30),

        "CHAP3-_MINS3-_1#6": StraightLine([880,670],"up",30),
        "MINS3-": StraightLine([870,610],"right",105),
        "MINS3-#0": StraightLine([880,610],"down",30),
        "MINS3-#1": StraightLine([940,610],"down",30),
        "MINS3-_MINSC": StraightLine([940,690],"up",50),
        "MINS0G": StraightLine([940,690],"down",60),
        "MINS0G POC": StraightLine([925,660],"right",30,"0V",true),

        "LAHO3B_NEWCT1_1#0": StraightLine([585,820],"up",30),
        "LAHO3B_NEWCT1_1#1": StraightLine([585,820],"right",50),
        "LAHO3B_NEWCT1_1#2": StraightLine([635,645],"down",175),
        "LAHO3B_NEWCT1_1#3":StraightLine([710,645],"left",50, "11kV"),
        "LAHO3B_NEWCT1_1#4": StraightLine([635,645],"right",30),
        "LAHO3B_NEWCT1_1#5": StraightLine([710,645],"down",35, "11kV"),
        "LAHO3B_NEWCT1_1#6": StraightLine([745,680],"down",35, "11kV"),

        "NEWC5-": StraightLine([695,680],"right",85, "11kV"),

     },
    ),

    busbars:{
        "CHAP3-_SOLWAY#7": StraightLine([875,40],"right",130),
        "CHAP3A1": StraightLine([25,175], "right",496),
        "CHAP3A2": StraightLine([25+496,175], "right",399),
        "STCR3-": StraightLine([25,370],"right",120),
        "EWEH3-": StraightLine([45,805],"right",85),
        "MIBI5-": StraightLine([260,730],"right",85,"11kV"),
        "MIBI3-": StraightLine([65,575],"right",175),
        "ANAN5-1": StraightLine([310,315],"right",52, "11kV"),
        "ANAN5-2": StraightLine([310+52,315],"right",53, "11kV"),
       "LAHO5-1": StraightLine([365,890],"right",55,"11kV"),
        "LAHO5-2": StraightLine([365+55,890],"right",55,"11kV"),
        "KIBA5-":StraightLine([360,585],"right",85,"11kV"),
        "MOFT5-1": StraightLine([366,675],"right",45,"11kV"),
        "MOFT5-2": StraightLine([366+45,675],"right",45,"11kV"),
        "GRNA5-1": StraightLine([710,496],"right",50,"11kV"),
        "GRNA5-2": StraightLine([760,496],"right",50,"11kV"),

        "LOBI5-1": StraightLine([360,490],"right",50, "11kV"),
        "LOBI5-2": StraightLine([410,490],"right",50, "11kV"),
        "MINS3-": StraightLine([870,610],"right",105),
        "NEWC5-": StraightLine([695,680],"right",85, "11kV"),
     },
     //possible approach to assigning a transformer load
     //  "ANANT2_CHAP3-_1#4": Object.assign(StraightLine([405,315],"down",20,"11kV"),{transformer:"ANANT2_ANAN20_T2"}),
    loads:{
        "ANANT2_CHAP3-_1#4": StraightLine([405,315],"down",20,"11kV"),
        "ANANT1_CHAP3-_1#4": StraightLine([321,315],"down",20,"11kV"),
        "LOBI5-2#0": StraightLine([450,490],"down",20,"11kV"),
        "LOBI5-1#0": StraightLine([370,490],"down",20,"11kV"),
        "KIBA5-#0": StraightLine([440,585],"down",20,"11kV"),
        "MOFT5-2#0": StraightLine([450,675],"down",20,"11kV"),
        "MOFT5-1#0": StraightLine([372,675],"down",20,"11kV"),

        "LAHO5-2#0": StraightLine([465,890],"down",20,"11kV"),
        "LAHO5-1#0": StraightLine([375,890],"down",20,"11kV"),

        "MIBI5-#0": StraightLine([335,730],"down",20,"11kV"),
        "NEWC5-#0": StraightLine([770,680],"down",20,"11kV"),
        "GRNA5-2#0": StraightLine([800,495],"down",20,"11kV"),
        "GRNA5-1#0": StraightLine([720,495],"down",20,"11kV"),

        },
    diagram:{},
    breakers:{
//        "698 16": new Breaker("CHAP3A1#0",1),
        "698 15": new Breaker("CHAP3-_STCR3-_1#0",0),
        "699 CHAP": new Breaker("STCR3-#1",1, "CHAP"),
        "STCR Loadbank": new Breaker("STCR3-#2",0.5, ""),
        "699 CUSTOMER": new Breaker("STCR3-_STCR0G",0,""),
        "698 14": new Breaker("CHAP3A1#3",1),
        "698 13": new Breaker("CHAP3A1#4",1),
        "GRID 1": new Breaker("CHAP3A1#1",1),
        "698 12": new Breaker("CHAP3-_MIBI3-_1#0",0),
        "698 11": new Breaker("CHAP3A1#6",1),
        "698 01": new Breaker("CHAP3A1",1),
        "698 21": new Breaker("CHAP3A2#1",1),
        "698 22": new Breaker("CHAP3A2#2",1),
        "698 23": new Breaker("CHAP3A2#3",1),
        "698 24": new Breaker("CHAP3A2#4",1),
//        "698 25": new Breaker("698 25",0.31),
        "698 26": new Breaker("CHAP3A2#5",1),
        "378 11": new Breaker("CHAP3-_SOLWAY#5",0.18),
        "378 12": new Breaker("CHAP3-_SOLWAY#6",0.3),
        "GRID 2": new Breaker("CHAP3A2#0",1),

        "694": new Breaker("LOBI3A",1),

        //some of these below are arc breakers

        "780 12": new Breaker("CHAP3-_MIBI3-_1",0.5,"12"),
        "780 13": new Breaker("EWEH3-_MIBI3-_1#0",0.1,"13"),
        "780 14": new Breaker("MIBI3-#0",1,"14"),
        "780 11": new Breaker("MIBI3-#1",1,"11"),

        "781 12": new Breaker("EWEH3-_MIBI3-_1#4",0.65,"12"),
        "781 11": new Breaker("EWEH3-#0",1,"11"),

        "781 CUSTOMER": new Breaker("EWEH3-_EWEH0G_1",1,"CUSTOMER"),

        "682 10": new Breaker("MIBI3-_MIBIT1_1#2",0.6,"10"),

        "692 01": new Breaker("LAHO3A",1,"10"),

        "676 10": new Breaker("MIBI3-_LAHO3A_1#4",0.3,"10"),
        "676 01": new Breaker("LAHO5-1",1,"01"),
        "676 20": new Breaker("LAHO5-2#2",1,"20"),

        "662 10": new Breaker("ANANT1_CHAP3-_1#0",0.3,"10"),
        "662 01": new Breaker("ANAN5-1",1,"01"),
        "662 20": new Breaker("ANANT2_CHAP3-_1#3",0.3,"20"),

        "694 13": new Breaker("LOBI3A#0",1,"13"),

        "675 10": new Breaker("CHAPX4_KIBAT1_1#1",0.3,"10"),

        "683 10": new Breaker("CHAPX4_MOFTT1_1#2",0.3,"10"),
        "683 01": new Breaker("MOFT5-1", 1,"01"),
        "683 20": new Breaker("LOBI3B_MOFTT2_1#3", 0.3,"20"),

        "694 12": new Breaker("LOBI3A_LOBIT1_1#0", 0.5,"12"),
        "694 22": new Breaker("LOBI3B_LOBIT2_1#0", 0.5,"22"),
        "694 23": new Breaker("LOBI3B#1", 1,"23"),

        "679 10": new Breaker("LOBI3A_LOBIT1_1#2", 0.7,"10"),
        "679 01": new Breaker("LOBI5-1",1,"01"),
        "679 20": new Breaker("LOBI3B_LOBIT2_1#3",0.3,"20"),

        "673 10": new Breaker("GRNA5-1#2",1,"10"),
        "673 01": new Breaker("GRNA5-1",1,"01"),
        "673 20": new Breaker("GRNA3B_GRNAT2_1#2",0.25,"20"),

        "761 CHAP": new Breaker("CHAP3-_MINS3-_1#6",1,"CHAP"),
        "761 WINDFARM": new Breaker("MINS3-#1",1,"WINDFARM"),
        "761 CUSTOMER": new Breaker("MINS3-_MINSC",0,"CUSTOMER"),

        "123 10": new Breaker("LAHO3B_NEWCT1_1#3",0.25,"10"),
        "123 12": new Breaker("LAHO3B_NEWCT1_1#6",0.6,"12"),

        // CRAIG II WINDFARM 11KV
        // "785 21": new Breaker("785 21",0.86,"21"),
        // "785 22": new Breaker("CRAG5B_LAHO5-_1",0.15,"22"),
        // "785 CUSTOMER": new Breaker("CRAG5B_LAHO5-_1",0.5,"open","CUSTOMER BREAKER"),

        "691 01": new Breaker("GRNA3B",0,"01"),
        },
    isolators:{
        // CRAIG II WINDFARM 11KV
        // "785 CUSTOMER": new Breaker("CRAG5B_LAHO5-_1",0.7,"CUSTOMER ISOLATOR"),
    },
    tx:{
        "CHAP3-AUX-_2": new Tx("CHAP1-_CHAP3-_2#1",1,"","","0V"),
        "CHAP1-_CHAP3-_2": new Tx("CHAP1-_CHAP3-_2#0",1,"GRID T2","90 MVA","132kV"),
        "CHAP1-_CHAP3-_1": new Tx("CHAP1-_CHAP3-_1#0",1,"GRID T1", "90 MVA","132kV"),
        "CHAP3_AUX-_1": new Tx("CHAP1-_CHAP3-_1#3",0,"","","33kV"),
        "MIBIT1_MIBI10_T1": new Tx("MIBI3-_MIBIT1_1#1",1,"","10 MVA","11kV"),
        "LAHOT1_LAHO10_T1": new Tx("MIBI3-_LAHO3A_1#3",1,"T1","12 MVA","11kV"),
        "LAHOT2_LAHO20_T2": new Tx("CHAPX3_LAHO3B_1#4",1.2,"T2","12 MVA","33kV"),
        "ANANT1_ANAN10_T1": new Tx("ANANT1_CHAP3-_1#2",1,"T1","12 MVA","11kV"),
        "ANANT2_ANAN20_T2": new Tx("ANANT2_CHAP3-_1#3",1,"T2","12 MVA","33kV"),
        "KIBAT1_KIBA10_T1": new Tx("CHAPX4_KIBAT1_1#0",1,"","5MVA","11kV"),
        "MOFTT1_MOFT10_T1": new Tx("CHAPX4_MOFTT1_1#1",1,"T1","7.5 MVA","11kV"),
        "MOFTT2_MOFT20_T2": new Tx("LOBI3B_MOFTT2_1#3",1,"T2","7.5 MVA","33kV"),

        "LOBIT1_LOBI10_T1": new Tx("LOBI3A_LOBIT1_1#1", 1, "T1", "24 MVA","11kV"),
        "LOBIT2_LOBI20_T2": new Tx("LOBI3B_LOBIT2_1#3",1,"T2","24 MVA","33kV"),

        "GRNAT1_GRNA10_T1": new Tx("GRNA3A_GRNAT1_1#1",1,"T1","24 MVA","11kV"),
        "GRNAT2_GRNA20_T2": new Tx("GRNA3B_GRNAT2_1#2",1,"T2","24 MVA","33kV"),

        "NEWCT1_NEWC10_T1": new Tx("LAHO3B_NEWCT1_1#4",1,"T1","5 MVA","11kV"),

        },
    generators:{
        "STCR5-_1": new Generator("STCR3-_STCR0G",1),
        "EWHC0G_1": new Generator("EWEH0G",1),
        // CRAIG II WINDFARM 11KV
        // "CRAG0B_1": new Generator("CRAG5B_LAHO5-_1",1),
        "MINS0G_1": new Generator("MINS0G", 1),
        5: new Generator("CHAP3-_SOLWAY#6",1),
        },
    labels:{
    0: new Text("STCR3-#2.4", ["LOAD BANK"], [5, 34]),
    1: new Text("CHAP3A1", ["CHAPELCROSS GSP"], [220,-70]),
    2: new Text("CHAP3A1", ["698"], [220,-50]),
    3: new Text("CHAP3A1",["CHAPELCROSS GSP 33kV"],[240,-145], 25),

    6: new Text("MIBI3-", ["MIDDLEBIE"],[20,-40]),
    7: new Text("MIBI3-", ["33KV SW/STN"],[20,-25]),
    8: new Text("MIBI3-", ["780"],[20,-10]),

    9: new Text("EWEH3-", ["EWE HILL"],[0,-40]),
    10: new Text("EWEH3-", ["WINDFARM"],[0,-25]),
    11: new Text("EWEH3-", ["781"],[0,-10]),

    12: new Text("MIBI5-", ["MIDDLEBIE "],[5,-40]),
    13: new Text("MIBI5-", ["PRIMARY"],[5,-25]),
    14: new Text("MIBI5-", ["682"],[5,-10]),

    15: new Text("LOBI3A", ["LOCKERBIE 33KV"],[85,-40]),

    16: new Text("ANAN5-1", ["ANNAN"],[25,-45]),
    17: new Text("ANAN5-1", ["662"],[25,-30]),

    18: new Text("LOBI5-1", ["LOCKERBIE"],[25,-55]),
    19: new Text("LOBI5-1", ["679"],[25,-35]),

    20: new Text("KIBA5-", ["KIRKBANK"],[20,-30]),
    21: new Text("KIBA5-",["675"],[20,-15]),

    23: new Text("MOFT5-1", ["MOFFAT"],[23,-50]),
    24: new Text("MOFT5-1", ["683"],[23,-35]),

    25: new Text("LAHO3A", ["LANGHOLM 33KV"],[60,-45]),
    26: new Text("LAHO3A", ["692"],[60,-30]),

    29: new Text("LAHO5-1", ["LANGHOLM"],[27,-65]),
    30: new Text("LAHO5-1", ["692"],[27,-45]),

    31: new Text("STCR3-", ["STEVEN'S CROFT"],[-45,-45]),
    32:new Text("STCR3-", ["33KV"],[-45,-30]),
    33:new Text("STCR3-", ["699"],[-45,-15]),

    34:new Text("CHAPX1_LOBI3A_1#1", ["CARRUTHERSTOWN"],[-55,-15]),
    35:new Text("CHAPX1_LOBI3A_1#1", ["33 kV"],[-59,0]),
    36:new Text("CHAPX1_LOBI3A_1#1", ["DUMF"],[-50,-30]),

    37:new Text("GRNA3A", ["GRETNA 33kV"],[62,-45]),
    38:new Text("GRNA3A", ["691"],[62,-30]),

    39:new Text("GRNA5-1", ["GRETNA"],[25,-60]),
    40:new Text("GRNA5-1", ["673"],[25,-45]),

    41: new Text("NEWC5-", ["NEWCASTLETON"],[20,-30]),
    42: new Text("NEWC5-",["123"],[20,-15]),

    // CRAIG II WINDFARM 11KV
    // 43: new Text("785 B", ["CRAIG II WINDFARM 11KV"],[20,-30]),
    // 44: new Text("785 B",["785"],[20,-15]),

    45: new Text("MINS3-",["MINSCA 33KV"],[0,-30]),
    46: new Text("MINS3-",["761"],[0,-15]),

//    47: new Text("698 25",["CHAPELCROSS"],[0,40]),
//    48: new Text("698 25",["NO2"],[0,55]),

    49: new Text("CHAP3-_SOLWAY#0",["SOLWAY BANK 33KV"],[0,-30]),
    50: new Text("CHAP3-_SOLWAY#0",["378"],[0,-15]),

    },
    dataViews:{
        //lines
        "CHAP3-_STCR3-_1": new DataView("CHAP3-_STCR3-_1#0", [-30, -47], ['lines_current']),
        "ANANT1_CHAP3-_1": new DataView("ANANT1_CHAP3-_1#1", [-30, -15], ['lines_current']),
        "CHAP3-_MINS3-_1": new DataView("CHAP3-_MINS3-_1#2", [25, 0], ['lines_current']),
        "CHAPX1_LOBI3A_1": new DataView("CHAPX1_LOBI3A_1#0", [-25, -75], ['lines_current']),
        "CHAP3-_MIBI3-_1": new DataView("CHAP3-_MIBI3-_1#0", [-25, 0], ['lines_current']),
        "CHAP3-_GRNA3B_1": new DataView("CHAP3-_GRNA3B_1#0", [-25, 0], ['lines_current']),
        "CHAP3-_CHAPX3_1": new DataView("CHAP3-_CHAPX3_1#0", [-25, -60], ['lines_current']),

        "CHAP3-_LOBI3B_1": new DataView("CHAP3-_LOBI3B_1#0", [25, -25], ['lines_current']),
        "ANANT2_CHAP3-_1": new DataView("ANANT2_CHAP3-_1#0", [25, -10], ['lines_current']),
        "CHAP3-_MINS3-_1": new DataView("CHAP3-_MINS3-_1#0", [25, -10], ['lines_current']),

        "CHAP3-_SOLWAY": new DataView("CHAP3-_SOLWAY#3", [-25, 10], ['lines_current']),
        "CHAP3-_SOLWAY#1": new DataView("CHAP3-_SOLWAY#0", [-85, 50], ['lines_active_power',"lines_reactive_power","lines_current"]),

        "CHAP3-_SOLWAY#1": new DataView("CHAP3-_SOLWAY#0", [-85, 50], ['lines_active_power',"lines_reactive_power","lines_current"]),

//        loadbank
        "STCR3-#LOAD": new DataView("STCR3-",[80,50], ["lines_active_power"]),

        //transformers
        "CHAP1-_CHAP3-_1": new DataView("CHAP1-_CHAP3-_1#0",[70,4],[
            "transformers_active_power",
            "transformers_reactive_power",
            "transformers_current",
        ]),
        "CHAP1-_CHAP3-_2": new DataView("CHAP1-_CHAP3-_2#0",[70,4],[
            "transformers_active_power",
            "transformers_reactive_power",
            "transformers_current",
        ]),

        //generator
        "STCR5-_1": new DataView("STCR5-_1", [-35, 0],
          [
            'generators_active_power',
            'generators_reactive_power',
          ]),
        "EWEHILL_1": new DataView("EWHC0G_1", [35, 0],
          [
            'generators_active_power',
            'generators_reactive_power',
          ]),
        "MINS0G_1": new DataView("MINS0G_1", [35, 0],
          [
            'generators_active_power',
            'generators_reactive_power',
          ]),

        //BUSBARS
        "CHAP3A1": new DataView("CHAP3A1", [-250, -20], ['busbars_voltage']),
        "CHAP3A1#1": new DataView("CHAP3A2", [130, -20], ['busbars_voltage']),

        //transformers for loads
        "ANANT2_ANAN20_T2": new DataView("ANANT2_CHAP3-_1#4",[35,0],[
            "transformers_active_power",
        ]),
        "ANANT1_ANAN10_T1":new DataView("ANANT1_CHAP3-_1#4",[-35,0],[
            "transformers_active_power",
        ]),
        "LOBIT1_LOBI10_T1": new DataView("LOBI5-1#0",[-35,0],[
            "transformers_active_power",
        ]),
        "LOBIT2_LOBI20_T2": new DataView("LOBI5-2#0",[35,0],[
            "transformers_active_power",
        ]),
        "LAHOT1_LAHO10_T1":new DataView("LAHO5-1#0",[-35,0],[
            "transformers_active_power",
        ]),
        "LAHOT2_LAHO20_T2": new DataView("LAHO5-2#0",[35,0],[
            "transformers_active_power",
        ]),
        "MOFTT1_MOFT10_T1": new DataView("MOFT5-1#0",[25,10],[
            "transformers_active_power",
        ]),
        "MOFTT2_MOFT20_T2": new DataView("MOFT5-2#0",[35,10],[
            "transformers_active_power",
        ]),
        "NEWCT1_NEWC10_T1":new DataView("NEWC5-#0",[35,0],[
            "transformers_active_power",
        ]),
        "GRNAT1_GRNA10_T1": new DataView("GRNA5-1#0",[0,30],[
            "transformers_active_power",
        ]),
        "GRNAT2_GRNA20_T2": new DataView("GRNA5-2#0",[0,30],[
            "transformers_active_power",
        ]),
        "KIBAT1_KIBA10_T1": new DataView("KIBA5-#0",[35,0],[
            "transformers_active_power",
        ]),
        "MIBIT1_MIBI10_T1":new DataView("MIBI5-#0",[-25,5],[
            "transformers_active_power",
        ]),




    },
    availablePower:{
        "EWEHILL_1" : new AvailablePower([115,970]),
        "MINS0G_1": new AvailablePower([940,820]),
        "STCR5-_1": new AvailablePower([100,100]),

    },

//    generatorControls:{
//        "MINS0G_1": new GeneratorControl([800,900]),
//        "EWHC0G_1": new GeneratorControl([350,940]),
//    },

    generator_graphs:{
        "gen_graph_1": new GeneratorGraph([760,770],["MINS0G_1","EWEHILL_1","EWEHILL_2","STCR5-_1"])
    }


}