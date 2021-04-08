//1550 x 1160 in mm
//scale of 1000 x 1000, readjust with math...
chapelcross_132kV={
    lines:{
    "698 01": StraightLine([125,865],"right",700, "33kV"),
    "GRID T1": StraightLine([280,865],"up",175, "33kV"),
        "into GRID T1 tx": StraightLine([280,750],"left",40, "33kV"),
    "GRID T2": StraightLine([665,865],"up",175,"33kV"),
        "into GRID T2 tx": StraightLine([665,750],"left",40,"33kV"),

    "M1": StraightLine([35,570],"right",905,"132kV"),
    "R1": StraightLine([35,370],"right",905,"132kV"),

    "1006": StraightLine([865,370],"down",100,"132kV"),
    "1004": StraightLine([865,470],"down",100,"132kV"),
        "HARK A":StraightLine([905,470],"left",40, "132kV"),
        "HARK": StraightLine([905,470],"up",290, "132kV"),

    "806": StraightLine([785,370],"down",100,"132kV"),
    "804": StraightLine([785,470],"down",100,"132kV"),
        "DUMF-2 A":StraightLine([825,470],"left",40, "132kV"),
        "DUMF-2": StraightLine([825,470],"up",290, "132kV"),

    "616": StraightLine([700,370],"down",100,"132kV"),
    "614": StraightLine([700,470],"down",100,"132kV"),
        "ECCF-2 A":StraightLine([740,470],"left",40, "132kV"),
        "ECCF-2": StraightLine([740,470],"up",290, "132kV"),

    "416": StraightLine([625,370],"down",100,"132kV"),
    "414": StraightLine([625,470],"down",100,"132kV"),
        "410": StraightLine([665,465],"down",225,"132kV"),
        "410 A": StraightLine([665,465],"left",40,"132kV"),

    "206": StraightLine([555,370],"down",100,"132kV"),
    "204": StraightLine([555,470],"down",100,"132kV"),
        "GRNA-2 A":StraightLine([595,470],"left",40, "132kV"),
        "GRNA-2": StraightLine([595,470],"up",290, "132kV"),

    "336 330 334": StraightLine([400,370],"down",200,"132kV"),

    "506": StraightLine([320,370],"down",100,"132kV"),
    "504": StraightLine([320,470],"down",100,"132kV"),
        "DUMF-1 A":StraightLine([360,470],"left",40, "132kV"),
        "DUMF-1": StraightLine([360,470],"up",290, "132kV"),


    "716": StraightLine([240,370],"down",100,"132kV"),
    "714": StraightLine([240,470],"down",100,"132kV"),
        "710": StraightLine([280,465],"down",225,"132kV"),
        "710 A": StraightLine([280,465],"left",45,"132kV"),

    "916": StraightLine([150,370],"down",100,"132kV"),
    "914": StraightLine([150,470],"down",100,"132kV"),
        "ECCF-1 A":StraightLine([190,470],"left",40, "132kV"),
        "ECCF-1": StraightLine([190,470],"up",290, "132kV"),

    "1106": StraightLine([65,370],"down",100,"132kV"),
    "1104": StraightLine([65,470],"down",100,"132kV"),
        "GRNA-1 A":StraightLine([110,470],"left",45, "132kV"),
        "GRNA-1": StraightLine([110,470],"up",290, "132kV"),





    },
    breakers:{
        "698 01": new Breaker("698 01", 0.5,"closed"),
        "GRID T1": new Breaker("GRID T1", 0.3,"open"),
        "GRID T2": new Breaker("GRID T2",0.3,"open"),

        "710":new Breaker("710",0.7,"open"),
        "120": new Breaker("M1",0.49,"closed"),
        "330": new Breaker("336 330 334",0.5,"closed"),
        "500":new Breaker("DUMF-1",0.5),
        "205": new Breaker("GRNA-2",0.5),
        "615": new Breaker("ECCF-2",0.5),
        "1005": new Breaker("HARK",0.5),
        "800": new Breaker("DUMF-2",0.5),
        "915": new Breaker("ECCF-1",0.5),
        "1105": new Breaker("GRNA-1",0.5),
        "410": new Breaker("410",0.7,"open"),

    },
    tx:{1: new Tx("into GRID T1 tx",1,"","", coil1 = "33kV", coil2 = "LV"),
        2: new Tx("GRID T1",1,"GRID T1","90MVA",coil1 = "33kV", coil2 = "132kV"),

        3: new Tx("into GRID T2 tx",1,"","", coil1 = "33kV", coil2 = "LV"),
        4: new Tx("GRID T2",1,"GRID T2","90MVA",coil1 = "33kV",coil2 = "132kV"),

        },
    isolators:{
        "1103": new Isolator("GRNA-1",0.7,"closed"),
        "1106": new Isolator("1106",0.5,"closed"),
        "1104": new Isolator("1104",0.5,"open"),
        "913": new Isolator("ECCF-1",0.7,"closed"),
        "916": new Isolator("916",0.5,"open"),
        "914": new Isolator("914",0.5,"closed"),
        "716": new Isolator("716",0.5,"open"),
        "714": new Isolator("714",0.5,"closed"),

        "503": new Isolator("DUMF-1",0.7,"closed"),
        "506": new Isolator("506",0.5,"open"),
        "504": new Isolator("504",0.5,"open"),

        "203": new Isolator("GRNA-2",0.7,"closed"),
        "206": new Isolator("206",0.5,"closed"),
        "204": new Isolator("204",0.5,"open"),
//
        "416": new Isolator("416",0.5,"open"),
        "414": new Isolator("414",0.5,"closed"),

        "613": new Isolator("ECCF-2",0.7,"closed"),
        "616": new Isolator("616",0.5,"closed"),
        "614": new Isolator("614",0.5,"open"),

        "803": new Isolator("DUMF-2",0.7,"closed"),
        "806": new Isolator("806",0.5,"open"),
        "804": new Isolator("804",0.5,"closed"),

        "1003": new Isolator("HARK",0.7,"closed"),
        "1006": new Isolator("1006",0.5,"open"),
        "1004": new Isolator("1004",0.5,"closed"),

        "124": new Isolator("M1", 0.44,"closed"),
        "128": new Isolator("M1", 0.54,"closed"),

        "126": new Isolator("R1", 0.44,"closed"),
        "129": new Isolator("R1", 0.54,"closed"),

        "336": new Isolator("336 330 334", 0.25, "closed"),
        "334": new Isolator("336 330 334", 0.75, "closed"),

    },
}