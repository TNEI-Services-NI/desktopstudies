//1550 x 1160 in mm
//scale of 1000 x 1000, readjust with math...
networks_undrawn["gretna132kv"]={
    lines:{
    "GRNA1-": StraightLine([55,535],"right",900,"132kV"),

    "GRNA1-#0": StraightLine([190,535],"up",165,"132kV"),

    "GRNA1-#1": StraightLine([340,535],"up",165,"132kV"),

    "GRNA1-#2": StraightLine([625,535],"up",165,"132kV"),

    "GRNA1-#3": StraightLine([775,535],"up",165,"132kV"),

    "GRNA1-#4": StraightLine([270,535],"down",165,"132kV"),

    "GRNA1-#5": StraightLine([695,535],"down",165,"132kV"),

    "GRNA1-#6": StraightLine([850,535],"down",165,"132kV"),

    },

    loads:{
        "GRNA1-_SGT1": StraightLine([190,535-165],"up",200,"132kV"),
        "CHAP1-_GRNA1": StraightLine([340,535-165],"up",200,"132kV"),
        "CHAP2-_GRNA1": StraightLine([625,535-165],"up",200,"132kV"),
        "GRNA1-_SGT2": StraightLine([775,535-165],"up",200,"132kV"),
        "HARK": StraightLine([270,535+165],"down",165,"132kV"),
        "HAWI": StraightLine([695,535+165],"down",165,"132kV"),
        "GRNA1-_EWEH": StraightLine([850,535+165],"down",165,"132kV"),

    },

    busbars:{
        "GRNA1-": StraightLine([55,535],"right",900,"132kV"),
    },

    breakers:{
    "120": new Breaker("GRNA1-",0.48),

    "780": new Breaker("GRNA1-#0",1),
    "305": new Breaker("CHAP1-_GRNA1",0),
    "205": new Breaker("GRNA1-#2",1),
    "680": new Breaker("GRNA1-#3",1),

    "505": new Breaker("GRNA1-#4",1),
    "405": new Breaker("GRNA1-#5",1),
    "805": new Breaker("GRNA1-#6",1),
    },

    labels:{
    1: new Text("GRNA1-", ["132kV"], [-18,-70]),
    2: new Text("GRNA1-", ["GRETNA 132kV"], [-18,-400], 25),

    3: new Text("GRNA1-_SGT1", ["SGT1"], [0,-125]),
    4: new Text("CHAP1-_GRNA1", ["CHAP-1"], [0,-125]),
    5: new Text("CHAP2-_GRNA1", ["CHAP-2"], [0,-125]),
    6: new Text("GRNA1-_SGT2", ["SGT2"], [0,-125]),

    7: new Text("HARK", ["HARK/HAWI"], [0,125]),
    8: new Text("HAWI", ["HAWI"], [0,125]),
    9: new Text("GRNA1-_EWEH", ["EWEH"], [0,125]),
    },

    tx:{
    },

    isolators:{
    "124": new Isolator("GRNA1-",0.43,"closed"),
    "125": new Isolator("GRNA1-",0.53,"closed"),

    "784": new Isolator("GRNA1-#0",0.5,"closed"),
    "783": new Isolator("GRNA1-_SGT1",0.65,"closed"),

    "304": new Isolator("GRNA1-#1",0.5,"closed"),
    "383": new Isolator("CHAP1-_GRNA1",0.65,"closed"),

    "204": new Isolator("GRNA1-#2",0.5,"closed"),
    "203": new Isolator("CHAP2-_GRNA1",0.65,"closed"),

    "684": new Isolator("GRNA1-#3",0.5,"closed"),
    "683": new Isolator("GRNA1-_SGT2",0.65,"closed"),


    "504": new Isolator("GRNA1-#4",0.5,"closed"),
    "503": new Isolator("HARK",0.65,"closed"),

    "404": new Isolator("GRNA1-#5",0.5,"closed"),
    "403": new Isolator("HAWI",0.65,"closed"),

    "804": new Isolator("GRNA1-#6",0.5,"closed"),
    "803": new Isolator("GRNA1-_EWEH",0.65,"closed"),
    },

    dataViews:{
    "GRNA1-_SGT1": new DataView("GRNA1-_SGT1", [-40,-40],['lines_loading',"lines_active_power","lines_reactive_power","lines_current"]),
    "CHAP1-_GRNA1": new DataView("CHAP1-_GRNA1", [-40,-40],['lines_loading',"lines_active_power","lines_reactive_power","lines_current"]),
    "CHAP2-_GRNA1": new DataView("CHAP2-_GRNA1", [-40,-40],['lines_loading',"lines_active_power","lines_reactive_power","lines_current"]),
    "GRNA1-_SGT2": new DataView("GRNA1-_SGT2", [-40,-40],['lines_loading',"lines_active_power","lines_reactive_power","lines_current"]),

//
    "HARK": new DataView("HARK", [-40,40],['lines_loading',"lines_active_power","lines_reactive_power","lines_current"]),
    "HAWI": new DataView("HAWI", [-40,40],['lines_loading',"lines_active_power","lines_reactive_power","lines_current"]),
    "GRNA1-_EWEH": new DataView("GRNA1-_EWEH", [-40,40],['lines_loading',"lines_active_power","lines_reactive_power","lines_current"]),
//
//    8: new DataView(75,525,["kV"]),
//    9: new DataView(940,525,["kV"]),

    },

    SGTs:{
    },
}