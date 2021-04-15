//1550 x 1160 in mm
//scale of 1000 x 1000, readjust with math...
networks_undrawn["gretna132kv"]={
    lines:{
    "124 120 128": StraightLine([55,535],"right",900,"132kV"),
    "783 780 784": StraightLine([190,535],"up",355,"132kV"),
    "303 305 304": StraightLine([340,535],"up",355,"132kV"),
    "203 205 204": StraightLine([625,535],"up",355,"132kV"),
    "683 680 684": StraightLine([775,535],"up",355,"132kV"),

    "504 505 503": StraightLine([270,535],"down",355,"132kV"),
    "404 405 403": StraightLine([695,535],"down",355,"132kV"),
    "804 805 803": StraightLine([850,535],"down",355,"132kV"),

    },

    breakers:{
    "120": new Breaker("124 120 128",0.48,"closed"),

    "780": new Breaker("783 780 784",0.45,"closed"),
    "305": new Breaker("303 305 304",0.45,"closed"),
    "205": new Breaker("203 205 204",0.45,"closed"),
    "680": new Breaker("683 680 684",0.45,"closed"),

    "505": new Breaker("504 505 503",0.45,"closed"),
    "405": new Breaker("404 405 403",0.45,"closed"),
    "805": new Breaker("804 805 803",0.45,"closed"),
    },

    labels:{
    1: new Text("124 120 128", ["132kV"], [-18,-70]),
    2: new Text("124 120 128", ["GRETNA 132kV"], [-18,-400]),

    3: new Text("783 780 784", ["SGT1"], [0,-200]),
    4: new Text("303 305 304", ["CHAP-1"], [0,-200]),
    5: new Text("203 205 204", ["CHAP-2"], [0,-200]),
    6: new Text("683 680 684", ["SGT2"], [0,-200]),

    7: new Text("504 505 503", ["HARK/HAWI"], [0,200]),
    8: new Text("404 405 403", ["HAWI"], [0,200]),
    9: new Text("804 805 803", ["EWEH"], [0,200]),
    },

    tx:{
    },

    isolators:{
    "124": new Isolator("124 120 128",0.43,"closed"),
    "125": new Isolator("124 120 128",0.53,"closed"),

    "784": new Isolator("783 780 784",0.25,"closed"),
    "783": new Isolator("783 780 784",0.65,"closed"),

    "304": new Isolator("303 305 304",0.25,"closed"),
    "383": new Isolator("303 305 304",0.65,"closed"),

    "204": new Isolator("203 205 204",0.25,"closed"),
    "203": new Isolator("203 205 204",0.65,"closed"),

    "684": new Isolator("683 680 684",0.25,"closed"),
    "683": new Isolator("683 680 684",0.65,"closed"),


    "504": new Isolator("504 505 503",0.25,"closed"),
    "503": new Isolator("504 505 503",0.65,"closed"),

    "404": new Isolator("404 405 403",0.25,"closed"),
    "403": new Isolator("404 405 403",0.65,"closed"),

    "804": new Isolator("804 805 803",0.25,"closed"),
    "803": new Isolator("804 805 803",0.65,"closed"),
    },

    dataViews:{
//    1: new DataView(230,215,["MVA","MW","MVAR","kV","Amps"]),
//    2: new DataView(380,215,["MVA","MW","MVAR","kV","Amps"]),
//    3: new DataView(665,215,["MVA","MW","MVAR","kV","Amps"]),
//    4: new DataView(810,215,["MVA","MW","MVAR","kV","Amps"]),
//
//    5: new DataView(300,815,["MVA","MW","MVAR","kV","Amps"]),
//    6: new DataView(730,815,["MVA","MW","MVAR","kV","Amps"]),
//    7: new DataView(895,815,["MVA","MW","MVAR","kV","Amps"]),
//
//    8: new DataView(75,525,["kV"]),
//    9: new DataView(940,525,["kV"]),

    },

    SGTs:{
    },
}