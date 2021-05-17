//1550 x 1160 in mm
//scale of 1000 x 1000, readjust with math...

networks_undrawn["stevenscroft33kv"]={
    lines:
      Object.assign(
        LoadBank(400, 255, "STCR3-"),
        {
    "CHAP3-_STCR3-_1": StraightLine([285,220],"up",50,"33kV"),
    "STCR3-#0": StraightLine([285,255],"up",35,"33kV"),

    "STCR3-#1": StraightLine([270,255],"down",50,"33kV"),
    "STCR3-_STCR0G": StraightLine([270,305],"down",50,"33kV"),
    "POC": StraightLine([230,280],"right",80,"0V",true),


    "STCR0G-_2": StraightLine([270,350],"down",40,"11kV"),
    "STCR0G-_1": StraightLine([270,390],"down",40,"11kV"),
    "STCR0G-_1#0": StraightLine([270,410],"right",40,"11kV"),

    "STCR0G-_1#1": StraightLine([385,410],"left",75,"11kV"),
    "STCR0G-_1#2": StraightLine([385,410],"down",50,"11kV"),

    "STCR_AUX#1": StraightLine([385,455],"down",85,"LV"),
    "STCR_AUX#2": StraightLine([350,540],"right",360,"LV"),
    "STCR_AUX#3": StraightLine([370,540],"down",80,"LV"),
    "STCR_AUX#4": StraightLine([410,540],"down",230,"LV"),
    "STCR_AUX#6": StraightLine([450,540],"down",110,"LV"),
    "STCR_AUX#8": StraightLine([585,540],"down",110,"LV"),
    "STCR_AUX#10": StraightLine([655,540],"down",230,"LV"),
    "STCR_AUX#12": StraightLine([435,650],"right",170,"LV"),
    "STCR_AUX#13": StraightLine([395,770],"right",300,"LV"),
    "STCR_AUX#15": StraightLine([430,770],"down",65,"LV"),
    "STCR_AUX#16": StraightLine([500,770],"down",50,"LV"),
    "STCR_D1#0": StraightLine([500,820],"down",45,"LV"),
    "STCR_AUX#17": StraightLine([580,770],"down",65,"LV"),
    "STCR_AUX#18": StraightLine([680,770],"down",65,"LV"),

},
      ),

    busbars:{
       "STCR3-": StraightLine([170,255],"right",250,"33kV"),
       "STCR_AUX#2": StraightLine([350,540],"right",360,"LV"),
    "STCR_AUX#13": StraightLine([395,770],"right",300,"LV"),

},

    breakers:{
        "699 CHAP": new Breaker("STCR3-#0",1, "CHAP"),
        "699 CUSTOMER": new Breaker("STCR3-_STCR0G",0, "CUSTOMER"),
        "699 A": new Breaker("STCR0G-_2",1,""),
        "699 B": new Breaker("STCR0G-_1#0",1,""),

        "STCR Loadbank":new Breaker("STCR3-#2",0.5,""),

        "STCR_AUX#0": new Breaker("STCR_AUX#1",0.8,""),
        "STCR_AUX#2": new Breaker("STCR_AUX#2",0.47,""),
        "STCR_AUX#3": new Breaker("STCR_AUX#3",0.5,""),

        "STCR_AUX#4": new Breaker("STCR_AUX#4",0.29,""),
        "STCR_AUX#5": new Breaker("STCR_AUX#4",0.9,""),
        "STCR_AUX#6": new Breaker("STCR_AUX#6",0.25,""),
        "STCR_AUX#7": new Breaker("STCR_AUX#6",0.75,""),
        "STCR_AUX#8": new Breaker("STCR_AUX#8",0.25,""),
        "STCR_AUX#9": new Breaker("STCR_AUX#8",0.75,""),
        "STCR_AUX#10": new Breaker("STCR_AUX#10",0.1,""),
        "STCR_AUX#11": new Breaker("STCR_AUX#10",0.9,""),
        "STCR_AUX#12": new Breaker("STCR_AUX#12",0.5,""),
        "STCR_AUX#13": new Breaker("STCR_AUX#13",0.2,""),
        "STCR_AUX#14": new Breaker("STCR_AUX#13",0.48,""),

        "STCR_AUX#15": new Breaker("STCR_AUX#15",0.5,""),
        "STCR_AUX#16": new Breaker("STCR_AUX#16",1,""),
        "STCR_AUX#17": new Breaker("STCR_AUX#17",0.5,""),
        "STCR_AUX#18": new Breaker("STCR_AUX#18",0.5,""),


    },

    labels:{
    1: new Text("STCR3-",["STEVENS CROFT 33kV"],[270,-170], 25),
    3: new Text("STCR_AUX#2", ["UNIT AUXILIARY BOARD"],[100,-15]),
    4: new Text("STCR_AUX#12", ["ACC SWITCHBOARD"],[60,15]),
    5: new Text("STCR_AUX#13", ["STATION ESSENTIAL SERVICES BOARD"],[0,-25]),
    6: new Text("POC", ["POC"],[55,0]),

    2: new Text("STCR3-",["699"],[-70,-20]),
    7: new Text("STCR3-",["33kV"],[-70,-40]),
    8: new Text("STCR3-",["STEVENSCROFT"],[-70,-60]),

    },

    tx:{
        "STCR3-_STCR5-_1": new Tx("STCR0G-_2",0,"","", "33kV"),
        "STCR0G-_STCRLV": new Tx("STCR_AUX#1",0,["Auxiliary","Transformer","11/0.4kV"],"","11kV"),
    },

    isolators:{

    },

    dataViews:{

        "STCR5-_1": new DataView("STCR5-_1", [-35, 0],
          [
            'generators_active_power',
            'generators_reactive_power',
          ]),

        "STCR3-": new DataView("STCR5-_1", [200, -200],
          [
            "lines_active_power",
            "lines_reactive_power",
            "busbars_voltage",
            'lines_current',
          ]),
    },

    SGTs:{

    },

    generators:{

        "STCR5-_1": new Generator("STCR0G-_1",1),
        "STCR_D1": new Generator("STCR_D1#0",1, "EMERGENCY"),
        "STCR_MOTOR": new Generator("STCR_AUX#3",1, "MOTOR")
    }
}