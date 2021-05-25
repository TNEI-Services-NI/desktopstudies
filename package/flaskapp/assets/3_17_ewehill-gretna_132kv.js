//1550 x 1160 in mm
//scale of 1000 x 1000, readjust with math...
networks_undrawn["ewehillgretna"]={
    lines:{
    "GRNA1-": StraightLine([630,105],"right",130,"132kV"),
    "GRNA1-#0": StraightLine([700,205],"up",100,"132kV"),
    "GRNA1-_EWEH": StraightLine([700,340],"up",135,"132kV"),

    "GRNA1-_EWEH#1": StraightLine([700,340],"left",430,"132kV"),
    "GRNA1-_EWEH#2": StraightLine([270,340],"down",170,"132kV"),
    "GRNA1-_EWEH#3": StraightLine([270,380],"left",55,"132kV"),
    "204 0V": StraightLine([220,380],"left",55,"0V"),

    "EWEH3#5": StraightLine([270,505],"down",115,"33kV"),
    "EWEH3-_GRID1A-_WG2": StraightLine([270,615],"down",190,"33kV"),
    "EWEH0G_2": StraightLine([270,755],"down",50,"33kV"),

    "EWEH3#6": StraightLine([270,565],"left",40,"33kV"),
    "EWEH3#7": StraightLine([230,565],"left",0,"LV"),

    "EWEH3": StraightLine([635,550],"left",365,"33kV"),
    "EWEH3#1": StraightLine([635,550],"down",155,"33kV"),
    "EWEH3#4": StraightLine([615,705],"right",145,"33kV"),

    "EWEH3#2": StraightLine([655,705],"down",80,"33kV"),
    "EWEH3#3": StraightLine([730,705],"down",80,"33kV"),

    "GRID 1A dash": new Line(240,710,305,710,"0v",true,"#d3d3d3")

    },

    busbars:{
     "GRNA1-": StraightLine([630,105],"right",130,"132kV"),
    "EWEH3#4": StraightLine([615,705],"right",145,"33kV"),



    },

    breakers:{
        "805": new Breaker("GRNA1-#0",0),
        "GRID 1A": new Breaker("EWEH3#5",1),
        "WG2": new Breaker("EWEH3-_GRID1A-_WG2",0.75, "  CUSTOMER"),
        "GRID 1B": new Breaker("EWEH3#1",0.5),
        "3L5": new Breaker("EWEH3#3",0.5),
        "2L5": new Breaker("EWEH3#2",0.5),
    },

    labels:{
        1: new Text("EWEH3#2", ["CROSSDYKES 1"], [0,70]),
        2: new Text("EWEH3#3", ["CROSSDYKES 2"], [0,70]),
        3: new Text("GRNA1-_EWEH#2", ["EWEHILL","132kV"], [60,-10]),
        4: new Text("EWEH3#5", ["EWEHILL","33kV"], [80,140]),

        5: new Text("GRNA1-",["GRNA1"], [100,30]),
        6: new Text("GRNA1-_EWEH#1",["EWE HILL - GRETNA"], [0,-300], 25),

        7: new Text("204 0V",["FUTURE","CONNECTION"], [-70,0]),


    },

    generators:{
        "EWE HILL 2": new Generator("EWEH0G_2",1),
        },

    tx:{
        "trf_EWEH1Q_EWEH3-_1" : new Tx("EWEH3#5",0,"","","132kV"),
        "EWEH3-AUX-_1" : new Tx("EWEH3#7",1,"","","33kV"),

    },

    isolators:{
        "804": new Isolator("GRNA1-#0",0.5),
        "803": new Isolator("GRNA1-_EWEH",0.6),
        "113": new Isolator("GRNA1-_EWEH#2",0.6),
        "204": new Isolator("GRNA1-_EWEH#3",1,"open"),

        "1L3A": new Breaker("EWEH3-_GRID1A-_WG2",0.3),

    },

    dataViews:{
          "GRNA1-_EWEH": new DataView("GRNA1-",[-80,50], ["lines_active_power","lines_reactive_power","lines_current"],false),
          "GRNA1-#0": new DataView("GRNA1-",[-90,-20], ["busbars_voltage"]),

          "EWEH0G#": new DataView("EWEH3",[-140,-20], ['busbars_voltage']),

          "trf_EWEH1Q_EWEH3-_1": new DataView("EWEH3",[-120,90], ["transformers_active_power","transformers_reactive_power","transformers_current-LV"]),
//ILA3
//          "EWEH3-_GRID1A-_WG2": new DataView("EWEH3-_GRID1A-_WG2",[-30,-35], ["lines_active_power","lines_reactive_power","lines_current"]),

//        2 : new DataView(340,585, ["MVA","MW","MVAR","kV","Amps"]),
//        3 : new DataView(580,585, ["MVA","MW","MVAR","kV","Amps"]),
//
//        4: new DataView(615,765,["Amps"]),
//        5: new DataView(695,765,["Amps"]),

    },
    availablePower:{
        "EWEHILL_2" : new AvailablePower([115,600]),
    },
    SGTs:{

    },
    generationInfo:{
        "WTG_EWEH0G_2": new GenerationInfo([120,780],"EWE HILL 2 WINDFARM (EWHLW-2)"),
    }
}