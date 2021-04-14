//1550 x 1160 in mm
//scale of 1000 x 1000, readjust with math...
networks_undrawn["chapelcrossgretna2"]={
    lines:{
    "R1": StraightLine([215,555],"right",130,"132kV"),
    "M1": StraightLine([215,740],"right",130,"132kV"),
    "206 204": StraightLine([250,555],"down",185, "132kV"),
    "205 A": StraightLine([290,650],"left",40,"132kV"),
    "205 B": StraightLine([290,650],"up",135,"132kV"),
    "205 203": StraightLine([290,460],"down",55,"132kV"),
    "203 203 A": StraightLine([290,460],"up",200,"132kV"),
    "203 203 B": StraightLine([290,260],"right",430,"132kV"),
    "203 203 C": StraightLine([720,260],"down",195,"132kV"),
    "203 205": StraightLine([720,510],"up",55,"132kV"),
    "205 204": StraightLine([720,510],"down",65,"132kV"),

    "GRNA1 A": StraightLine([720,575],"down",75,"132kV"),
    "GRNA1 B": StraightLine([785,650],"left",130,"132kV"),

    },

    breakers:{
        "205": new Breaker("205 B",1,"closed"),
        "205": new Breaker("203 205",0,"closed"),

    },

    labels:{
        1: new Text("GRNA1 B", ["GRNA1"], [0,30]),
        2: new Text("206 204", ["CHAP1"], [80,0]),

        3: new Text("M1", ["M1"], [-80,0]),
        4: new Text("R1", ["R1"], [-80,0]),

        5: new Text("203 203 B", ["CHAPELCROSS - GRETNA 2"], [0,-170]),

    },

    tx:{
    },

    isolators:{
        "206": new Isolator("206 204",0.25,"closed"),
        "204": new Isolator("206 204",0.75,"open"),
        "203": new Isolator("205 203",0,"closed"),
        "203": new Isolator("203 203 C",1,"closed"),
        "204": new Isolator("205 204",1,"closed"),

    },

    dataViews:{
       "203": new DataView(240,350, ["MVA","MW","MVAR","kV","Amps"]),
       "204": new DataView(780,530, ["MVA","MW","MVAR","kV","Amps"]),
       "R1": new DataView(225,535, ["kV"]),
       "M1": new DataView(225,755, ["kV"]),

    },

    SGTs:{

    },
}