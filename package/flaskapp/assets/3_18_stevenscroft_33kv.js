//1550 x 1160 in mm
//scale of 1000 x 1000, readjust with math...
networks_undrawn["stevenscroft33kv"]={
    lines:{
    "699": StraightLine([170,255],"right",130,"33kV"),
    "699 CHAP": StraightLine([285,255],"up",85,"33kV"),
    "699 CUSTOMER": StraightLine([270,255],"down",100,"33kV"),
    "POC": StraightLine([230,280],"right",80,"33kV",true),

    "699 STEP UP 11kV": StraightLine([270,370],"down",80,"11kV"),

    "699 Auxiliary Transformer A": StraightLine([385,410],"left",115,"11kV"),
    "699 Auxiliary Transformer B": StraightLine([385,410],"down",50,"11kV"),

    "STEVENS AUX 1": StraightLine([385,455],"down",85,"LV"),
    "STEVENS AUX 2": StraightLine([350,540],"right",360,"LV"),
    "STEVENS AUX 3": StraightLine([370,540],"down",80,"LV"),
    "STEVENS AUX 4 5": StraightLine([410,540],"down",230,"LV"),
    "STEVENS AUX 6 7": StraightLine([450,540],"down",110,"LV"),
    "STEVENS AUX 8 9": StraightLine([585,540],"down",110,"LV"),
    "STEVENS AUX 10 11": StraightLine([655,540],"down",230,"LV"),
    "STEVENS AUX 12": StraightLine([435,650],"right",170,"LV"),
    "STEVENS AUX 13 14": StraightLine([395,770],"right",300,"LV"),
    "STEVENS AUX 15": StraightLine([430,770],"down",65,"LV"),
    "STEVENS AUX 16": StraightLine([500,770],"down",65,"LV"),
    "STEVENS AUX 17": StraightLine([580,770],"down",65,"LV"),
    "STEVENS AUX 18": StraightLine([680,770],"down",65,"LV"),

},

    breakers:{
        "699 CHAP": new Breaker("699 CHAP",0.45),
        "699 CUSTOMER": new Breaker("699 CUSTOMER",0.5),
        "699 A": new Breaker("699 STEP UP 11kV",0.25,""),
        "699 B": new Breaker("699 Auxiliary Transformer A",0.7,""),


        "STEVENS AUX 1": new Breaker("STEVENS AUX 1",0.8,""),
        "STEVENS AUX 2": new Breaker("STEVENS AUX 2",0.47,""),
        "STEVENS AUX 3": new Breaker("STEVENS AUX 3",0.5,""),

        "STEVENS AUX 4": new Breaker("STEVENS AUX 4 5",0.29,""),
        "STEVENS AUX 5": new Breaker("STEVENS AUX 4 5",0.9,""),
        "STEVENS AUX 6": new Breaker("STEVENS AUX 6 7",0.25,""),
        "STEVENS AUX 7": new Breaker("STEVENS AUX 6 7",0.75,""),
        "STEVENS AUX 8": new Breaker("STEVENS AUX 8 9",0.25,""),
        "STEVENS AUX 9": new Breaker("STEVENS AUX 8 9",0.75,""),
        "STEVENS AUX 10": new Breaker("STEVENS AUX 10 11",0.1,""),
        "STEVENS AUX 11": new Breaker("STEVENS AUX 10 11",0.9,""),
        "STEVENS AUX 12": new Breaker("STEVENS AUX 12",0.5,""),
        "STEVENS AUX 13": new Breaker("STEVENS AUX 13 14",0.2,""),
        "STEVENS AUX 14": new Breaker("STEVENS AUX 13 14",0.48,""),

        "STEVENS AUX 15": new Breaker("STEVENS AUX 15",0.5,""),
        "STEVENS AUX 16": new Breaker("STEVENS AUX 16",0.5,""),
        "STEVENS AUX 17": new Breaker("STEVENS AUX 17",0.5,""),
        "STEVENS AUX 18": new Breaker("STEVENS AUX 18",0.5,""),


    },

    labels:{
    1: new Text("699",["STEVENS CROFT 33kV"],[-20,-40]),
    2: new Text("699",["699"],[-20,-20]),
    3: new Text("STEVENS AUX 2", ["UNIT AUXILIARY BOARD"],[100,-15]),
    4: new Text("STEVENS AUX 12", ["ACC SWITCHBOARD"],[60,15]),
    5: new Text("STEVENS AUX 13 14", ["STATION ESSENTIAL SERVICES BOARD"],[0,-25]),
    6: new Text("POC", ["POC"],[55,0]),


    },

    tx:{
        "699 STEP UP": new Tx("699 CUSTOMER",1,"","", "33kV"),
        "699 Auxiliary Transformer": new Tx("699 Auxiliary Transformer B",1,["Auxiliary","Transformer","11/0.4kV"],"","33kV"),

    },

    isolators:{

    },

    dataViews:{

//        1: new DataView(350,235, ["MW","MVAR","kV","Amps","Hz"]),


    },

    SGTs:{

    },

    generators:{

        1: new Generator("699 STEP UP 11kV",1),
        2: new Generator("STEVENS AUX 16",1.2),
        3: new Generator("STEVENS AUX 3",1)
    }
}