//1550 x 1160 in mm
//scale of 1000 x 1000, readjust with math...
chapelcross_gretna_1={
    lines:{
    "R1": StraightLine([215,555],"right",130,"132kV"),
    "M1": StraightLine([215,740],"right",130,"132kV"),
    "1106 1104": StraightLine([250,555],"down",185, "132kV"),
    "1105 A": StraightLine([290,650],"left",40,"132kV"),
    "1105 B": StraightLine([290,650],"up",135,"132kV"),
    "1105 1103": StraightLine([290,460],"down",55,"132kV"),
    "1103 303 A": StraightLine([290,460],"up",200,"132kV"),
    "1103 303 B": StraightLine([290,260],"right",430,"132kV"),
    "1103 303 C": StraightLine([720,260],"down",195,"132kV"),
    "303 305": StraightLine([720,510],"up",55,"132kV"),
    "305 304": StraightLine([720,510],"down",65,"132kV"),
    "305 304": StraightLine([720,510],"down",65,"132kV"),

    "GRNA1 A": StraightLine([720,575],"down",75,"132kV"),
    "GRNA1 B": StraightLine([785,650],"left",130,"132kV"),

    },

    breakers:{
        "1105": new Breaker("1105 B",1,"closed"),
        "1105": new Breaker("1105 B",1,"closed"),
        "305": new Breaker("303 305",0,"closed"),

    },

    labels:{
        1: new Text("GRNA1 B", ["GRNA1"], [0,30]),
        2: new Text("1106 1104", ["CHAP1"], [80,0]),

        3: new Text("M1", ["M1"], [-80,0]),
        4: new Text("R1", ["R1"], [-80,0]),

        5: new Text("1103 303 B", ["CHAPELCROSS - GRETNA 1"], [0,-170]),

    },

    tx:{
    },

    isolators:{
        "1106": new Isolator("1106 1104",0.25,"closed"),
        "1104": new Isolator("1106 1104",0.75,"open"),
        "1103": new Isolator("1105 1103",0,"closed"),
        "303": new Isolator("1103 303 C",1,"closed"),
        "304": new Isolator("305 304",1,"closed"),

    },

    dataViews:{
       "1103": new DataView(240,350, ["MVA","MW","MVAR","kV","Amps"]),
              "304": new DataView(780,530, ["MVA","MW","MVAR","kV","Amps"]),
              "R1": new DataView(225,535, ["kV"]),
              "M1": new DataView(225,755, ["kV"]),

    },

    SGTs:{

    },
}