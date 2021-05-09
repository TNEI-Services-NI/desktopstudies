//1550 x 1160 in mm
//scale of 1000 x 1000, readjust with math...
networks_undrawn["gretna400kv"]={
    lines:{
    "M1": StraightLine([60,620],"right",880,"400kV"),
    "R1": StraightLine([60,430],"right",880,"400kV"),

    "X606 X604": StraightLine([160,430],"down",190,"400kV"),
        "HARK A": StraightLine([120,525],"right",40,"400kV"),
        "HARK": StraightLine([120,525],"down",420,"400kV"),

    "X516 X514": StraightLine([325,430],"down",190,"400kV"),
        "GRNA 780 A": StraightLine([285,525],"right",40,"400kV"),
        "X510": StraightLine([285,525],"down",215,"400kV"),
        "GRNA 780": StraightLine([285,740],"down",190,"132kV"),
        "GRNA 780 tx": StraightLine([285,800],"left",40,"132kV"),


    "X406 X404": StraightLine([485,430],"down",190,"400kV"),
        "ELVA A": StraightLine([445,525],"right",40, "400kV"),
        "ELVA": StraightLine([445,525],"up",440, "400kV"),
        "X447": StraightLine([445,275],"right",135,"400kV"),
        "X447 X449": StraightLine([530,275],"up",55,"400kV"),
        "X449": StraightLine([445,220],"right",135,"400kV"),
        "SC1" : StraightLine([530,275],"up",55,"400kV"),
        "X448": StraightLine([580,220],"down",55,"400kV"),

    "X236 X230 X234": StraightLine([620,430],"down",190,"400kV"),

    "X116 X114": StraightLine([805,430],"down",190,"400kV"),
        "GRNA 680 A": StraightLine([765,525],"right",40,"400kV"),
        "X110": StraightLine([765,525],"down",215,"400kV"),
        "GRNA 680": StraightLine([765,740],"down",190,"132kV"),
        "GRNA 680 tx": StraightLine([765,800],"left",40,"132kV"),

    "SC1": StraightLine([415,170],"right",350,"0V",true),
    "SC2": StraightLine([415,170],"down",150,"0V",true),
    "SC3": StraightLine([765,320],"up",150,"0V",true),
    "SC4": StraightLine([765,320],"left",350,"0V",true),

//530,275
    "SC5": StraightLine([510,290],"up",85,"0V",true),
    "SC6": StraightLine([510,290],"right",40,"0V",true),
    "SC7": StraightLine([550,205],"down",85,"0V",true),
    "SC8": StraightLine([550,205],"left",40,"0V",true),


    },

    busbars:{
        "M1": StraightLine([60,620],"right",880,"400kV"),
        "R1": StraightLine([60,430],"right",880,"400kV"),
    },

    breakers:{
        "X442": new Breaker("ELVA",0.63),
        "X448": new Breaker("X448",0.5),
        "X405": new Breaker("ELVA", 0.3),
        "X230": new Breaker("X236 X230 X234", 0.5),
        "X110": new Breaker("X110",0.65),
        "X510": new Breaker("X510",0.65),
        "X605": new Breaker("HARK",0.332),

    },

    labels:{
    1: new Text("M1",["M1"],[-465,0]),
    2: new Text("R1",["R1"],[-465,0]),
    3: new Text("HARK",["HARK"],[0,225]),
    4: new Text("GRNA 680",["GRNA 680"],[0,110]),
    5: new Text("GRNA 780",["GRNA 780"],[0,110]),
    6: new Text("ELVA",["ELVA"],[0,-240]),
    7: new Text("M1",["GRETNA 400kV"],[-50,-600], 25),
    8: new Text("SC1",["SERIES COMPENSATION SC1"],[70,15]),
    9: new Text("SC1",["COMPOUND"],[70,30]),
    10: new Text("SC8",["SC1"],[-10,-10]),

    },

    tx:{
        "GRNA 780 tx": new Tx("GRNA 780 tx",1,"","", "0V"),
        "GRNA 680 tx": new Tx("GRNA 680 tx",1,"","", "0V"),
    },

    isolators:{
        "X603": new Isolator("HARK",0.5),

        "X604": new Isolator("X606 X604",0.75),
        "X606": new Isolator("X606 X604",0.25,"open"),

        "X514": new Isolator("X516 X514",0.75),
        "X516": new Isolator("X516 X514",0.25,"open"),

        "X404": new Isolator("X406 X404",0.75),
        "X406": new Isolator("X406 X404",0.25,"open"),

        "X234": new Isolator("X236 X230 X234",0.75),
        "X236": new Isolator("X236 X230 X234",0.25,),

        "X114": new Isolator("X116 X114",0.75),
        "X116": new Isolator("X116 X114",0.25,"open"),

        "X405": new Isolator("ELVA",0.37),
        "X447": new Isolator("X447",0.3),
        "X449": new Isolator("X449",0.3,"closed"),
    },

    dataViews:{

//        "ELVA": new DataView(420,100, ["MVA","MW","MVAR","kV","Amps"]),
//        "HARK": new DataView(90,850, ["MVA","MW","MVAR","kV","Amps"]),
//        "GRNA 780": new DataView(260,850, ["MVA","MW","MVAR","kV","Amps"]),
//        "GRNA 680": new DataView(740,850, ["MVA","MW","MVAR","kV","Amps"]),
//
//        "R1": new DataView(70,410, ["kV"]),
//        "M1": new DataView(70,640, ["kV"]),

    },

    SGTs:{
        "SGT1": new SGT("X510","SGT1"),
        "SGT2": new SGT("X110","SGT2"),
    },
}