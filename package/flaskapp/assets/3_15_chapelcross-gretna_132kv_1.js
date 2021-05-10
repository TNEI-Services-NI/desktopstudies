//1550 x 1160 in mm
//scale of 1000 x 1000, readjust with math...
networks_undrawn["chapelcrossgretna1"]={
    lines:{

//    "1106 1104_1": StraightLine([250,555],"down",185, "132kV"),
    "CHAP1-_R1-_1#0": StraightLine([250,555],"down",52, "132kV"),
    "CHAP1-_M1-_1#0": StraightLine([250,607],"down",133, "132kV"),

    "CHAP1-_M1-_1#1": StraightLine([290,650],"left",40,"132kV"),
    "1105 B_1": StraightLine([290,650],"up",135,"132kV"),
    "CHAP1-_M1-_1#2": StraightLine([290,650],"up",135,"132kV"),
    "1105 1103_1": StraightLine([290,460],"down",55,"132kV"),
    "1103 303 A_1": StraightLine([290,460],"up",200,"132kV"),
    "1103 303 B_1": StraightLine([290,260],"right",430,"132kV"),
    "1103 303 C_1": StraightLine([720,260],"down",195,"132kV"),
    "303 305_1": StraightLine([720,510],"up",55,"132kV"),
    "305 304_1": StraightLine([720,510],"down",65,"132kV"),
    "305 304_1": StraightLine([720,510],"down",65,"132kV"),

    "GRNA1 A_1": StraightLine([720,575],"down",75,"132kV"),
    "GRNA1 B_1": StraightLine([785,650],"left",130,"132kV"),

    },

    busbars:{
        "CHAP1-_R1-_1": StraightLine([215,555],"right",130,"132kV"),
        "CHAP1-_M1-_1": StraightLine([215,740],"right",130,"132kV"),
            "GRNA1 B": StraightLine([785,650],"left",130,"132kV"),

    },

    breakers:{
        "1105": new Breaker("CHAP1-_M1-_1#2",1),
        "305": new Breaker("303 305_1",0),

    },

    labels:{
        1: new Text("GRNA1 B_1", ["GRNA1"], [0,30]),
        2: new Text("CHAP1-_M1-_1#0", ["CHAP1"], [80,0]),

        3: new Text("CHAP1-_M1-_1", ["M1"], [-80,0]),
        4: new Text("CHAP1-_R1-_1", ["R1"], [-80,0]),

        5: new Text("1103 303 B_1", ["CHAPELCROSS - GRETNA 1"], [0,-170], 25),

    },

    tx:{
    },

    isolators:{
        "1106": new Isolator("CHAP1-_M1-_1#0",0,"open"),
        "1104": new Isolator("CHAP1-_M1-_1#0",0.65,"closed"),
        "1103": new Isolator("1105 1103_1",0,"closed"),
        "303": new Isolator("1103 303 C_1",1,"closed"),
        "304": new Isolator("305 304_1",1,"closed"),

    },

    dataViews:{
//       "1103": new DataView(240,350, ["MVA","MW","MVAR","kV","Amps"]),
//              "304": new DataView(780,530, ["MVA","MW","MVAR","kV","Amps"]),
//              "R1": new DataView(225,535, ["kV"]),
//              "M1": new DataView(225,755, ["kV"]),

    },

    SGTs:{

    },
}