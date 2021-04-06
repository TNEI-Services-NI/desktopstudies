//1550 x 1160 in mm
//scale of 1000 x 1000, readjust with math...
Gretna_400kV={
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
        "X449": StraightLine([445,220],"right",135,"400kV"),
        "SC1" : StraightLine([530,275],"up",55,"400kV"),
        "X448": StraightLine([580,220],"down",55,"400kV"),

    "X236 X230 X234": StraightLine([620,430],"down",190,"400kV"),

    "X116 X114": StraightLine([805,430],"down",190,"400kV"),
        "GRNA 680 A": StraightLine([765,525],"right",40,"400kV"),
        "X110": StraightLine([765,525],"down",215,"400kV"),
        "GRNA 680": StraightLine([765,740],"down",190,"132kV"),
        "GRNA 680 tx": StraightLine([765,800],"left",40,"132kV"),

    },

    breakers:{
        "X442": new Breaker("ELVA",0.63),
        "X448": new Breaker("X448",0.5),
        "X405": new Breaker("ELVA", 0.37),
        "X230": new Breaker("X236 X230 X234", 0.5),
        "X110": new Breaker("X110",0.65),
        "X510": new Breaker("X510",0.65),
        "X605": new Breaker("HARK",0.332),

    },

    tx:{
        "GRNA 780 tx": new Tx("GRNA 780 tx",1,"","deltaStar", "132kV","LV"),
        "GRNA 680 tx": new Tx("GRNA 680 tx",1,"","deltaStar", "132kV","LV"),
    },

    inductors:{
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

        "X405": new Isolator("ELVA",0.3),
        "X447": new Isolator("X447",0.3),
        "X449": new Isolator("X449",0.3),
    }
}