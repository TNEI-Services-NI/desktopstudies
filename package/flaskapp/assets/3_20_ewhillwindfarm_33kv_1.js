//1550 x 1160 in mm
//scale of 1000 x 1000, readjust with math...
networks_undrawn["ewehillwindfarm1"]={
    lines:{
    "761": StraightLine([265,90],"right",105,"33kV"),
    "761 11 A": StraightLine([285,90],"down",30,"33kV"),
    "761 11 B": StraightLine([285,120],"down",30,"33kV"),
    "761 11 C": StraightLine([255,150],"right",30,"33kV"),
    "761 11 D": StraightLine([255,150],"up",80,"33kV"),

    "761 12": StraightLine([345,90],"down",30,"33kV"),
    "761 CUSTOMER": StraightLine([345,120],"down",85,"33kV"),
    "761 CUSTOMER A": StraightLine([345,120],"down",85,"33kV"),
    "761 CUSTOMER B": StraightLine([345,205],"down",55,"33kV"),

    "EWEHILL1 BUSBAR": StraightLine([325,260],"right",425,"33kV"),

    "CB01 A": StraightLine([365,260],"down",30,"33kV"),
    "CB01 B": StraightLine([365,290],"down",80,"33kV"),

    "CB02 A": StraightLine([480,260],"down",30,"33kV"),
    "CB02 B": StraightLine([480,290],"down",80,"33kV"),

    "CB04 A": StraightLine([730,260],"down",30,"33kV"),
    "CB04 B": StraightLine([730,290],"down",85,"33kV"),

    "WTG04 A": StraightLine([480,370],"right",45,"33kV"),
    "WTG04 B": StraightLine([505,405],"right",20,"33kV"),
    "WTG04 C": StraightLine([525,360],"down",60,"33kV"),
    "WTG04 D": StraightLine([525,390],"right",40,"33kV"),
    "WTG04 E": StraightLine([565,390],"right",65,"LV"),
    "WTG04 OUTLINE A": new Line(515,355,680,355,"0V",true),
    "WTG04 OUTLINE B": new Line(680,355,680,425,"0V",true),
    "WTG04 OUTLINE C": new Line(515,425,680,425,"0V",true),
    "WTG04 OUTLINE D": new Line(515,355,515,425,"0V",true),

    "WTG05 A": StraightLine([505,447],"right",20,"33kV"),
    "WTG05 B": StraightLine([505,482],"right",20,"33kV"),
    "WTG05 C": StraightLine([525,437],"down",60,"33kV"),
    "WTG05 D": StraightLine([525,467],"right",40,"33kV"),
    "WTG05 E": StraightLine([565,467],"right",65,"LV"),
    "WTG05 OUTLINE A": new Line(515,432,680,432,"0V",true),
    "WTG05 OUTLINE B": new Line(680,432,680,502,"0V",true),
    "WTG05 OUTLINE C": new Line(515,502,680,502,"0V",true),
    "WTG05 OUTLINE D": new Line(515,432,515,502,"0V",true),

    "WTG06 A": StraightLine([505,527],"right",20,"33kV"),
    "WTG06 C": StraightLine([525,517],"down",60,"33kV"),
    "WTG06 D": StraightLine([525,547],"right",40,"33kV"),
    "WTG06 E": StraightLine([565,547],"right",65,"LV"),
    "WTG06 OUTLINE A": new Line(515,512,680,512,"0V",true),
    "WTG06 OUTLINE B": new Line(680,512,680,582,"0V",true),
    "WTG06 OUTLINE C": new Line(515,582,680,582,"0V",true),
    "WTG06 OUTLINE D": new Line(515,512,515,582,"0V",true),

    "WTG01 A": StraightLine([365,370],"left",45,"33kV"),
    "WTG01 B": StraightLine([340,405],"left",20,"33kV"),
    "WTG01 C": StraightLine([320,360],"down",57,"33kV"),
    "WTG01 D": StraightLine([320,390],"left",40,"33kV"),
    "WTG01 E": StraightLine([285,390],"left",65,"LV"),
    "WTG01 OUTLINE A": new Line(165,355,330,355,"0V",true),
    "WTG01 OUTLINE B": new Line(330,355,330,425,"0V",true),
    "WTG01 OUTLINE C": new Line(165,425,330,425,"0V",true),
    "WTG01 OUTLINE D": new Line(165,425,165,355,"0V",true),
    "WTG02 A": StraightLine([340,447],"left",20,"33kV"),
    "WTG02 B": StraightLine([340,482],"left",20,"33kV"),
    "WTG02 C": StraightLine([320,437],"down",57,"33kV"),
    "WTG02 D": StraightLine([320,467],"left",40,"33kV"),
    "WTG02 E": StraightLine([285,467],"left",65,"LV"),
    "WTG02 OUTLINE A": new Line(165,432,330,432,"0V",true),
    "WTG02 OUTLINE B": new Line(330,432,330,502,"0V",true),
    "WTG02 OUTLINE C": new Line(165,502,330,502,"0V",true),
    "WTG02 OUTLINE D": new Line(165,502,165,432,"0V",true),
    "WTG03 A": StraightLine([340,524],"left",20,"33kV"),
    "WTG03 C": StraightLine([320,514],"down",57,"33kV"),
    "WTG03 D": StraightLine([320,544],"left",40,"33kV"),
    "WTG03 E": StraightLine([285,544],"left",65,"LV"),
    "WTG03 OUTLINE A": new Line(165,509,330,509,"0V",true),
    "WTG03 OUTLINE B": new Line(330,509,330,579,"0V",true),
    "WTG03 OUTLINE C": new Line(165,579,330,579,"0V",true),
    "WTG03 OUTLINE D": new Line(165,579,165,509,"0V",true),


    "WTG01 WTG02": new StraightLine([340,403],"down",46,"33kV"),
    "WTG02 WTG03": new StraightLine([340,480],"down",46,"33kV"),

    "WTG06 WTG05": new StraightLine([505,481],"down",48,"33kV"),
    "WTG05 WTG04": new StraightLine([505,403],"down",46,"33kV"),



    },

    breakers:{
    "761 11": new Breaker("761 11 A",1),
    "761 12": new Breaker("761 12",1),
    "761 CUSTOMER": new Breaker("761 CUSTOMER",1),
    "CB01": new Breaker("CB01 A",1),
    "CB02": new Breaker("CB02 A",1),
    "CB04": new Breaker("CB04 A",1),

    },

    labels:{

    },

    tx:{
        "EWEHILL 1 Auxiliary": new Tx("CB04 B",1,["AUXILIARY","TRANSFORMER"],"","LV","33kV"),

        "WTG 04 Tx": new Tx("WTG04 D",1,["WTG 04"],"","LV","33kV"),
        "WTG 05 Tx": new Tx("WTG05 D",1,["WTG 05"],"","LV","33kV"),
        "WTG 06 Tx": new Tx("WTG06 D",1,["WTG 06"],"","LV","33kV"),

        "WTG 01 Tx": new Tx("WTG01 D",1,["WTG 01"],"","33kV","LV"),
        "WTG 02 Tx": new Tx("WTG02 D",1,["WTG 02"],"","33kV","LV"),
        "WTG 03 Tx": new Tx("WTG03 D",1,["WTG 03"],"","33kV","LV"),



    },

    isolators:{
    },

    dataViews:{

    },

    SGTs:{

    },

    generators:{
        "WTG 04": new Generator("WTG04 E",1),
        "WTG 05": new Generator("WTG05 E",1),
        "WTG 06": new Generator("WTG06 E",1),

        "WTG 01": new Generator("WTG01 E",1),
        "WTG 02": new Generator("WTG02 E",1),
        "WTG 03": new Generator("WTG03 E",1),

    },
}