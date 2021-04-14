//1550 x 1160 in mm
//scale of 1000 x 1000, readjust with math...
networks_undrawn["minsca33kv"]={
    lines:{
    "761": StraightLine([265,90],"right",105,"33kV"),
    "761 CHAP A": StraightLine([285,90],"down",30,"33kV"),
    "761 CHAP B": StraightLine([285,120],"down",30,"33kV"),
    "761 CHAP C": StraightLine([255,150],"right",30,"33kV"),
    "761 CHAP D": StraightLine([255,150],"up",80,"33kV"),

    "761 MINS WF": StraightLine([345,90],"down",30,"33kV"),
    "761 CUSTOMER": StraightLine([345,120],"down",85,"33kV"),
    "761 CUSTOMER A": StraightLine([345,120],"down",85,"33kV"),
    "761 CUSTOMER B": StraightLine([345,205],"down",55,"33kV"),

    "MINSCA BUSBAR": StraightLine([325,260],"right",425,"33kV"),

    "CB01 A": StraightLine([365,260],"down",30,"33kV"),
    "CB01 B": StraightLine([365,290],"down",85,"33kV"),

    "CB02 A": StraightLine([480,260],"down",30,"33kV"),
    "CB02 B": StraightLine([480,290],"down",85,"33kV"),

    "CB04 A": StraightLine([730,260],"down",30,"33kV"),
    "CB04 B": StraightLine([730,290],"down",85,"33kV"),

    "WTG09 A": StraightLine([480,370],"right",45,"33kV"),
    "WTG09 B": StraightLine([505,405],"right",20,"33kV"),
    "WTG09 C": StraightLine([525,360],"down",60,"33kV"),
    "WTG09 D": StraightLine([525,390],"right",40,"33kV"),
    "WTG09 E": StraightLine([565,390],"right",65,"LV"),
    "WTG09 OUTLINE A": new Line(515,355,680,355,"0V",true),
    "WTG09 OUTLINE B": new Line(680,355,680,425,"0V",true),
    "WTG09 OUTLINE C": new Line(515,425,680,425,"0V",true),
    "WTG09 OUTLINE D": new Line(515,355,515,425,"0V",true),

    "WTG11 A": StraightLine([505,450],"right",20,"33kV"),
    "WTG11 B": StraightLine([505,485],"right",20,"33kV"),
    "WTG11 C": StraightLine([525,435],"down",60,"33kV"),
    "WTG11 D": StraightLine([525,465],"right",40,"33kV"),
    "WTG11 E": StraightLine([565,465],"right",65,"LV"),



    },

    breakers:{
//        "761 CHAP": new Breaker("761 CHAP A",1),
    "761 MINS WF": new Breaker("761 MINS WF",1),
    "761 CUSTOMER": new Breaker("761 CUSTOMER",1),
    "CB01": new Breaker("CB01 A",1),
    "CB02": new Breaker("CB02 A",1),
    "CB04": new Breaker("CB04 A",1),

    },

    labels:{

    },

    tx:{
        "Minsca Auxiliary": new Tx("CB04 B",1,["AUXILIARY","TRANSFORMER"],"","LV","33kV"),

        "WTG 09 Tx": new Tx("WTG09 D",1,["WTG 09"],"","LV","33kV"),

    },

    isolators:{
    },

    dataViews:{

    },

    SGTs:{

    },

    generators:{
        "WTG 09": new Generator("WTG09 E",1),
    },
}