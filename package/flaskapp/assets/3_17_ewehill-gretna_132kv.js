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

    "GRID 1A": StraightLine([270,505],"down",315,"33kV"),

    "GRID 1A LV": StraightLine([270,565],"left",40,"33kV"),

    "EWEH3": StraightLine([635,550],"left",365,"33kV"),
    "GRID 1B": StraightLine([635,550],"down",155,"33kV"),
    "BOARD B": StraightLine([615,705],"right",145,"33kV"),

    "2L5": StraightLine([655,705],"down",80,"33kV"),
    "3L5": StraightLine([730,705],"down",80,"33kV"),

    "GRID 1A dash": new Line(240,710,305,710,"0v",true,"#d3d3d3")

    },

    busbars:{
     "GRNA1-": StraightLine([630,105],"right",130,"132kV"),
    "BOARD B": StraightLine([615,705],"right",145,"33kV"),



    },

    breakers:{
        "805": new Breaker("GRNA1-#0",0),
        "GRID 1A": new Breaker("GRID 1A",0.33),
        "WG2": new Breaker("GRID 1A",0.75),
        "GRID 1B": new Breaker("GRID 1B",0.5),
        "3L5": new Breaker("3L5",0.5),
        "2L5": new Breaker("2L5",0.5),
    },

    labels:{
        1: new Text("2L5", ["CROSSDYKES 1"], [0,70]),
        2: new Text("3L5", ["CROSSDYKES 2"], [0,70]),
        3: new Text("GRNA1-_EWEH#2", ["EWEHILL","132kV"], [60,-10]),
        4: new Text("GRID 1A", ["EWEHII","33kV"], [60,40]),

        5: new Text("GRNA1-",["GRNA1"], [100,30]),
        6: new Text("GRNA1-_EWEH#1",["EWE HILL - GRETNA"], [0,-300], 25),

        7: new Text("204 0V",["FUTURE","CONNECTION"], [-70,0]),


    },

    generators:{
        "EWE HILL 2": new Generator("GRID 1A",1),
        },

    tx:{
        "GT1 90MVA" : new Tx("GRNA1-_EWEH#2",1,"","","132kV"),
        "GRID 1A LV" : new Tx("GRID 1A LV",1,"","","0V"),

    },

    isolators:{
        "804": new Isolator("GRNA1-#0",0.5),
        "803": new Isolator("GRNA1-_EWEH",0.6),
        "113": new Isolator("GRNA1-_EWEH#2",0.6),
        "204": new Isolator("GRNA1-_EWEH#3",1,"open"),

        "1L4A": new Breaker("GRID 1A",0.5),

    },

    dataViews:{
//        1 : new DataView(605,135, ["MW","MVAR","kV","Amps"]),
//        2 : new DataView(340,585, ["MVA","MW","MVAR","kV","Amps"]),
//        3 : new DataView(580,585, ["MVA","MW","MVAR","kV","Amps"]),
//
//        4: new DataView(615,765,["Amps"]),
//        5: new DataView(695,765,["Amps"]),

    },

    SGTs:{

    },
    generationInfo:{
        "WTG_EWEH0G_1": new GenerationInfo([120,780],"EWE HILL WINDFARM (EWHLW-1)"),
    }
}