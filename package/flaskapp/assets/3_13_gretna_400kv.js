//1550 x 1160 in mm
//scale of 1000 x 1000, readjust with math...
networks_undrawn["gretna400kv"]={
    lines:{
    "GRNA4-_M1#6": StraightLine([160,430],"down",190,"400kV"),
    "GRNA4-_R1#0": StraightLine([160,430],"down",38,"400kV"),

        "GRNA4-_M1#0": StraightLine([120,525],"right",40,"400kV"),
        "GRNA4-_M1#1": StraightLine([120,525],"down",140,"400kV"),
        "HARK4": StraightLine([120,665],"down",280,"400kV"),

    "GRNA4-_M1#9": StraightLine([325,430],"down",190,"400kV"),
    "GRNA4-_R1#3": StraightLine([325,430],"down",38,"400kV"),

        "GRNA4-_M1#3": StraightLine([285,525],"right",40,"400kV"),
        "GRNA4-_M1#2": StraightLine([285,525],"down",215,"400kV"),

        "GRNA4-_M1-_SGT1": StraightLine([285,740],"up",75,"400kV"),
        "GRNA1-_SGT1#1": StraightLine([285,930],"up",190,"132kV"),
        "GRNA1-_SGT1#0": StraightLine([285,800],"left",40,"132kV"),
        "GRNA1-_SGT1#2": StraightLine([245,800],"left",0,"LV"),

    "GRNA4-_M1#7": StraightLine([485,430],"down",190,"400kV"),
    "GRNA4-_R1#1": StraightLine([485,430],"down",38,"400kV"),
        "GRNA4-_M1#11": StraightLine([445,525],"right",40, "400kV"),
        "ELVA": StraightLine([445,525],"up",440, "400kV"),
        "GRNA4-_M1#12": StraightLine([445,525],"up",120, "400kV"),

        "X447": StraightLine([445,275],"right",135,"400kV"),
        "X447 X449": StraightLine([530,275],"up",55,"400kV"),
        "X449": StraightLine([445,220],"right",135,"400kV"),
        "SC1" : StraightLine([530,275],"up",55,"400kV"),
        "X448": StraightLine([580,220],"down",55,"400kV"),

    "GRNA4-_R1#4": StraightLine([620,430],"down",95,"400kV"),
    "GRNA4-_M1#10": StraightLine([620,525],"down",95,"400kV"),

    "GRNA4-_M1#8": StraightLine([805,430],"down",190,"400kV"),
    "GRNA4-_R1#2": StraightLine([805,430],"down",38,"400kV"),

        "GRNA4-_M1#4": StraightLine([765,525],"right",40,"400kV"),
        "GRNA4-_M1#5": StraightLine([765,525],"down",140,"400kV"),
        "GRNA4-_M1-_SGT2": StraightLine([765,670],"down",75,"400kV"),

        "GRNA1-_SGT2#0": StraightLine([765,740],"down",190,"132kV"),
        "GRNA1-_SGT2#1": StraightLine([765,800],"left",40,"132kV"),

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
    "GRNA4-_M1": StraightLine([60,620],"right",880,"400kV"),
    "GRNA4-_R1": StraightLine([60,430],"right",880,"400kV"),
    },

    breakers:{
        "X442": new Breaker("ELVA",0.63),
        "X448": new Breaker("X448",0.5),
        "X405": new Breaker("GRNA4-_M1#12", 1),
        "X230": new Breaker("GRNA4-_M1#10", 0),
        "X110": new Breaker("GRNA4-_M1#5",1),
        "X510": new Breaker("GRNA4-_M1-_SGT1",1),
        "X605": new Breaker("HARK4",0),

    },

    labels:{
    1: new Text("GRNA4-_M1",["M1"],[-465,0]),
    2: new Text("GRNA4-_R1",["R1"],[-465,0]),
    3: new Text("HARK4",["HARK"],[0,160]),
    4: new Text("GRNA1-_SGT2#0",["GRNA 680"],[0,110]),
    5: new Text("GRNA1-_SGT1#1",["GRNA 780"],[0,110]),
    6: new Text("ELVA",["ELVA"],[0,-240]),
    7: new Text("GRNA4-_M1",["GRETNA 400kV"],[-50,-600], 25),
    8: new Text("SC1",["SERIES COMPENSATION SC1"],[70,15]),
    9: new Text("SC1",["COMPOUND"],[70,30]),
    10: new Text("SC8",["SC1"],[-10,-10]),

    },

    tx:{
        "GRNA 780 tx": new Tx("GRNA1-_SGT1#2",0,"","", "132kV"),
        "GRNA 680 tx": new Tx("GRNA1-_SGT2#1",1,"","", "0V"),
    },

    isolators:{
        "X603": new Isolator("HARK4",0.3),

        "X604": new Isolator("GRNA4-_M1#6",0.75),
        "X606": new Isolator("GRNA4-_M1#6",0.25,"open"),

        "X514": new Isolator("GRNA4-_M1#9",0.75),
        "X516": new Isolator("GRNA4-_M1#9",0.25,"open"),

        "X404": new Isolator("GRNA4-_M1#7",0.75),
        "X406": new Isolator("GRNA4-_M1#7",0.25,"open"),

        "X234": new Isolator("GRNA4-_M1#10",0.5),
        "X236": new Isolator("GRNA4-_R1#4",0.5,),

        "X114": new Isolator("GRNA4-_M1#8",0.75),
        "X116": new Isolator("GRNA4-_M1#8",0.25,"open"),

        "X405": new Isolator("ELVA",0.37),
        "X447": new Isolator("X447",0.3),
        "X449": new Isolator("X449",0.3),
        " ": new Isolator("X449",0.3)
    },

    dataViews:{

        "ELVA": new DataView("ELVA", [-90,-200], ["lines_active_power","lines_reactive_power","lines_current"]),
        "HARK4": new DataView("HARK4",[-90,100], ["lines_active_power","lines_reactive_power","lines_current"]),
        "tr3_GRNA4-_GRNA1-_1": new DataView("GRNA1-_SGT1#1",[-80,40], ["transformers_apparent_power","transformers_active_power","transformers_reactive_power","transformers_current"]),
        "tr3_GRNA4-_GRNA1-_2": new DataView("GRNA1-_SGT2#0",[-80,40], ["transformers_apparent_power","transformers_active_power","transformers_reactive_power","transformers_current"]),

        "GRNA4-_R1": new DataView("GRNA4-_R1",[-460,-20], ["busbars_voltage"]),
        "GRTNA4-": new DataView("GRNA4-_M1",[-460,20], ["busbars_voltage"]),

    },

    SGTs:{
        "tr3_GRNA4-_GRNA1-_1": new SGT("GRNA1-_SGT1#1","SGT1", ["132kV", "400kV"]),
        "tr3_GRNA4-_GRNA1-_2": new SGT("GRNA4-_M1-_SGT2","SGT2"),
    },
}