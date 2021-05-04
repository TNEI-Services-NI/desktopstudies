//1550 x 1160 in mm
//scale of 1000 x 1000, readjust with math...
networks_undrawn["ewehillwindfarm2"]={
    lines:{
    "GT1": StraightLine([345,50],"down",40,"33kV"),
    "GT1 A": StraightLine([305,100],"right",40,"33kV"),

    "761 MINS WF": StraightLine([345,90],"down",30,"33kV"),
    "1L3A": StraightLine([345,120],"down",85,"33kV"),
    "WG2 A": StraightLine([345,120],"down",100,"33kV"),
    "WG2 B": StraightLine([345,220],"down",40,"33kV"),

        "POC": StraightLine([320,200],"right",50,"",true),

    "MINSCA BUSBAR": StraightLine([325,260],"right",425,"33kV"),

    "CB01 A": StraightLine([365,260],"down",30,"33kV"),
    "CB01 B": StraightLine([365,290],"down",80,"33kV"),

    "CB02 A": StraightLine([480,260],"down",30,"33kV"),
    "CB02 B": StraightLine([480,290],"down",80,"33kV"),

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

    "WTG11 A": StraightLine([505,447],"right",20,"33kV"),
    "WTG11 B": StraightLine([505,482],"right",20,"33kV"),
    "WTG11 C": StraightLine([525,437],"down",60,"33kV"),
    "WTG11 D": StraightLine([525,467],"right",40,"33kV"),
    "WTG11 E": StraightLine([565,467],"right",65,"LV"),
    "WTG11 OUTLINE A": new Line(515,432,680,432,"0V",true),
    "WTG11 OUTLINE B": new Line(680,432,680,502,"0V",true),
    "WTG11 OUTLINE C": new Line(515,502,680,502,"0V",true),
    "WTG11 OUTLINE D": new Line(515,432,515,502,"0V",true),

    "WTG10 A": StraightLine([505,527],"right",20,"33kV"),
    "WTG10 C": StraightLine([525,517],"down",60,"33kV"),
    "WTG10 D": StraightLine([525,547],"right",40,"33kV"),
    "WTG10 E": StraightLine([565,547],"right",65,"LV"),
    "WTG10 OUTLINE A": new Line(515,512,680,512,"0V",true),
    "WTG10 OUTLINE B": new Line(680,512,680,582,"0V",true),
    "WTG10 OUTLINE C": new Line(515,582,680,582,"0V",true),
    "WTG10 OUTLINE D": new Line(515,512,515,582,"0V",true),

    "WTG12 A": StraightLine([482,604],"right",44,"33kV"),
    "WTG12 B": StraightLine([505,639],"right",20,"33kV"),
    "WTG12 C": StraightLine([525,594],"down",60,"33kV"),
    "WTG12 D": StraightLine([525,624],"right",40,"33kV"),
    "WTG12 E": StraightLine([565,624],"right",65,"LV"),
    "WTG12 OUTLINE A": new Line(515,589,680,589,"0V",true),
    "WTG12 OUTLINE B": new Line(680,589,680,659,"0V",true),
    "WTG12 OUTLINE C": new Line(515,659,680,659,"0V",true),
    "WTG12 OUTLINE D": new Line(515,589,515,659,"0V",true),

    "WTG14 A": StraightLine([505,681],"right",20,"33kV"),
    "WTG14 B": StraightLine([505,716],"right",20,"33kV"),
    "WTG14 C": StraightLine([525,671],"down",60,"33kV"),
    "WTG14 D": StraightLine([525,701],"right",40,"33kV"),
    "WTG14 E": StraightLine([565,701],"right",65,"LV"),
    "WTG14 OUTLINE A": new Line(515,666,680,666,"0V",true),
    "WTG14 OUTLINE B": new Line(680,666,680,736,"0V",true),
    "WTG14 OUTLINE C": new Line(515,736,680,736,"0V",true),
    "WTG14 OUTLINE D": new Line(515,666,515,736,"0V",true),

    "WTG16 A": StraightLine([482,758],"right",44,"33kV"),
    "WTG16 B": StraightLine([505,793],"right",20,"33kV"),
    "WTG16 C": StraightLine([525,748],"down",60,"33kV"),
    "WTG16 D": StraightLine([525,778],"right",40,"33kV"),
    "WTG16 E": StraightLine([565,778],"right",65,"LV"),
    "WTG16 OUTLINE A": new Line(515,743,680,743,"0V",true),
    "WTG16 OUTLINE B": new Line(680,743,680,813,"0V",true),
    "WTG16 OUTLINE C": new Line(515,813,680,813,"0V",true),
    "WTG16 OUTLINE D": new Line(515,743,515,813,"0V",true),

    "WTG15 A": StraightLine([505,835],"right",20,"33kV"),
    "WTG15 B": StraightLine([505,870],"right",20,"33kV"),
    "WTG15 C": StraightLine([525,825],"down",60,"33kV"),
    "WTG15 D": StraightLine([525,855],"right",40,"33kV"),
    "WTG15 E": StraightLine([565,855],"right",65,"LV"),
    "WTG15 OUTLINE A": new Line(515,820,680,820,"0V",true),
    "WTG15 OUTLINE B": new Line(680,820,680,890,"0V",true),
    "WTG15 OUTLINE C": new Line(515,890,680,890,"0V",true),
    "WTG15 OUTLINE D": new Line(515,820,515,890,"0V",true),

    "WTG13 A": StraightLine([505,912],"right",20,"33kV"),
    "WTG13 C": StraightLine([525,902],"down",60,"33kV"),
    "WTG13 D": StraightLine([525,932],"right",40,"33kV"),
    "WTG13 E": StraightLine([565,932],"right",65,"LV"),
    "WTG13 OUTLINE A": new Line(515,897,680,897,"0V",true),
    "WTG13 OUTLINE B": new Line(680,897,680,967,"0V",true),
    "WTG13 OUTLINE C": new Line(515,967,680,967,"0V",true),
    "WTG13 OUTLINE D": new Line(515,897,515,967,"0V",true),


    "WTG06 A": StraightLine([365,370],"left",45,"33kV"),
    "WTG06 B": StraightLine([340,405],"left",20,"33kV"),
    "WTG06 C": StraightLine([320,360],"down",57,"33kV"),
    "WTG06 D": StraightLine([320,390],"left",40,"33kV"),
    "WTG06 E": StraightLine([285,390],"left",65,"LV"),
    "WTG06 OUTLINE A": new Line(165,355,330,355,"0V",true),
    "WTG06 OUTLINE B": new Line(330,355,330,425,"0V",true),
    "WTG06 OUTLINE C": new Line(165,425,330,425,"0V",true),
    "WTG06 OUTLINE D": new Line(165,425,165,355,"0V",true),
    "WTG07 A": StraightLine([340,447],"left",20,"33kV"),
    "WTG07 B": StraightLine([340,482],"left",20,"33kV"),
    "WTG07 C": StraightLine([320,437],"down",57,"33kV"),
    "WTG07 D": StraightLine([320,467],"left",40,"33kV"),
    "WTG07 E": StraightLine([285,467],"left",65,"LV"),
    "WTG07 OUTLINE A": new Line(165,432,330,432,"0V",true),
    "WTG07 OUTLINE B": new Line(330,432,330,502,"0V",true),
    "WTG07 OUTLINE C": new Line(165,502,330,502,"0V",true),
    "WTG07 OUTLINE D": new Line(165,502,165,432,"0V",true),
    "WTG08 A": StraightLine([340,524],"left",20,"33kV"),
    "WTG08 C": StraightLine([320,514],"down",57,"33kV"),
    "WTG08 D": StraightLine([320,544],"left",40,"33kV"),
    "WTG08 E": StraightLine([285,544],"left",65,"LV"),
    "WTG08 OUTLINE A": new Line(165,509,330,509,"0V",true),
    "WTG08 OUTLINE B": new Line(330,509,330,579,"0V",true),
    "WTG08 OUTLINE C": new Line(165,579,330,579,"0V",true),
    "WTG08 OUTLINE D": new Line(165,579,165,509,"0V",true),
    "WTG05 A": StraightLine([365,601],"left",45,"33kV"),
    "WTG05 B": StraightLine([340,636],"left",20,"33kV"),
    "WTG05 C": StraightLine([320,591],"down",57,"33kV"),
    "WTG05 D": StraightLine([320,621],"left",40,"33kV"),
    "WTG05 E": StraightLine([285,621],"left",65,"LV"),
    "WTG05 OUTLINE A": new Line(165,586,330,586,"0V",true),
    "WTG05 OUTLINE B": new Line(330,586,330,656,"0V",true),
    "WTG05 OUTLINE C": new Line(165,656,330,656,"0V",true),
    "WTG05 OUTLINE D": new Line(165,656,165,586,"0V",true),
    "WTG04 A": StraightLine([340,678],"left",20,"33kV"),
    "WTG04 C": StraightLine([320,668],"down",57,"33kV"),
    "WTG04 D": StraightLine([320,698],"left",40,"33kV"),
    "WTG04 E": StraightLine([285,698],"left",65,"LV"),
    "WTG04 OUTLINE A": new Line(165,663,330,663,"0V",true),
    "WTG04 OUTLINE B": new Line(330,663,330,733,"0V",true),
    "WTG04 OUTLINE C": new Line(165,733,330,733,"0V",true),
    "WTG04 OUTLINE D": new Line(165,733,165,663,"0V",true),
    "WTG03 A": StraightLine([365,755],"left",45,"33kV"),
    "WTG03 B": StraightLine([340,790],"left",20,"33kV"),
    "WTG03 C": StraightLine([320,745],"down",57,"33kV"),
    "WTG03 D": StraightLine([320,775],"left",40,"33kV"),
    "WTG03 E": StraightLine([285,775],"left",65,"LV"),
    "WTG03 OUTLINE A": new Line(165,740,330,740,"0V",true),
    "WTG03 OUTLINE B": new Line(330,740,330,810,"0V",true),
    "WTG03 OUTLINE C": new Line(165,810,330,810,"0V",true),
    "WTG03 OUTLINE D": new Line(165,810,165,740,"0V",true),
    "WTG02 A": StraightLine([340,832],"left",20,"33kV"),
    "WTG02 B": StraightLine([340,867],"left",20,"33kV"),
    "WTG02 C": StraightLine([320,822],"down",57,"33kV"),
    "WTG02 D": StraightLine([320,852],"left",40,"33kV"),
    "WTG02 E": StraightLine([285,852],"left",65,"LV"),
    "WTG02 OUTLINE A": new Line(165,817,330,817,"0V",true),
    "WTG02 OUTLINE B": new Line(330,817,330,887,"0V",true),
    "WTG02 OUTLINE C": new Line(165,887,330,887,"0V",true),
    "WTG02 OUTLINE D": new Line(165,887,165,817,"0V",true),
    "WTG01 A": StraightLine([340,909],"left",20,"33kV"),
    "WTG01 C": StraightLine([320,899],"down",57,"33kV"),
    "WTG01 D": StraightLine([320,929],"left",40,"33kV"),
    "WTG01 E": StraightLine([285,929],"left",65,"LV"),
    "WTG01 OUTLINE A": new Line(165,894,330,894,"0V",true),
    "WTG01 OUTLINE B": new Line(330,894,330,964,"0V",true),
    "WTG01 OUTLINE C": new Line(165,964,330,964,"0V",true),
    "WTG01 OUTLINE D": new Line(165,964,165,894,"0V",true),

    "WTG06 WTG07": new StraightLine([340,403],"down",46,"33kV"),
    "WTG07 WTG08": new StraightLine([340,480],"down",46,"33kV"),
    "WTG05 WTG04": new StraightLine([340,634],"down",46,"33kV"),
    "WTG03 WTG02": new StraightLine([340,788],"down",46,"33kV"),
    "WTG02 WTG01": new StraightLine([340,865],"down",46,"33kV"),

    "WTG15 WTG13": new StraightLine([505,868],"down",46,"33kV"),
    "WTG16 WTG15": new StraightLine([505,791],"down",46,"33kV"),
    "WTG12 WTG14": new StraightLine([505,637],"down",46,"33kV"),
    "WTG11 WTG10": new StraightLine([505,481],"down",48,"33kV"),
    "WTG09 WTG11": new StraightLine([505,403],"down",46,"33kV"),


    "WTG06 WTG05 A": new StraightLine([320,390],"right",45,"33kV"),
    "WTG06 WTG05 B": new StraightLine([365,388],"down",215,"33kV"),

    "WTG05 WTG03 A": StraightLine([320,620],"right",45,"33kV"),
    "WTG05 WTG03 B": new StraightLine([365,620],"down",137,"33kV"),

    "WTG11 WTG12 A": StraightLine([483,467],"right",45,"33kV"),
    "WTG11 WTG12 B": new StraightLine([483,467],"down",137,"33kV"),

    "WTG12 WTG16 A": StraightLine([483,621],"right",45,"33kV"),
    "WTG12 WTG16 B": new StraightLine([483,621],"down",137,"33kV"),

    },

    breakers:{
//        "761 CHAP": new Breaker("761 CHAP A",1),
    "WG2": new Breaker("WG2 A" ,1,"      WG2"),
     "GRID 1A": new Breaker("WG2 A",0),
     "CB01": new Breaker("CB01 A",1),
     "CB02": new Breaker("CB02 A",1),
     "CB04": new Breaker("CB04 A",1),

    },

    labels:{

    },

    tx:{
        "GT1" : new Tx("GT1",0,["GT1 90MVA","TAP 12"],"","33kV","132kV"),
        "GT1 A": new Tx("GT1 A", 0, "","","33kV","LV"),
        "Minsca Auxiliary": new Tx("CB04 B",1,["AUXILIARY","TRANSFORMER"],"","LV","33kV"),

        "WTG 09 Tx": new Tx("WTG09 D",1,["WTG 09"],"","33kV"),
        "WTG 10 Tx": new Tx("WTG10 D",1,["WTG 10"],"","33kV"),
        "WTG 11 Tx": new Tx("WTG11 D",1,["WTG 11"],"","33kV"),
        "WTG 12 Tx": new Tx("WTG12 D",1,["WTG 12"],"","33kV"),
        "WTG 13 Tx": new Tx("WTG13 D",1,["WTG 13"],"","33kV"),
        "WTG 14 Tx": new Tx("WTG14 D",1,["WTG 14"],"","33kV"),
        "WTG 15 Tx": new Tx("WTG15 D",1,["WTG 15"],"","33kV"),
        "WTG 16 Tx": new Tx("WTG16 D",1,["WTG 16"],"","33kV"),

        "WTG 01 Tx": new Tx("WTG01 D",1,["WTG 01"],"","LV"),
        "WTG 02 Tx": new Tx("WTG02 D",1,["WTG 02"],"","LV"),
        "WTG 03 Tx": new Tx("WTG03 D",1,["WTG 03"],"","LV"),
        "WTG 04 Tx": new Tx("WTG04 D",1,["WTG 04"],"","LV"),
        "WTG 05 Tx": new Tx("WTG05 D",1,["WTG 05"],"","LV"),
        "WTG 06 Tx": new Tx("WTG06 D",1,["WTG 06"],"","LV"),
        "WTG 07 Tx": new Tx("WTG07 D",1,["WTG 07"],"","LV"),
        "WTG 08 Tx": new Tx("WTG08 D",1,["WTG 08"],"","LV"),


    },

    isolators:{
        "1L3A": new Isolator("WG2 A" ,0.5),

    },

    dataViews:{

    },

    SGTs:{

    },

    generators:{
        "WTG 09": new Generator("WTG09 E",1),
        "WTG 10": new Generator("WTG10 E",1),
        "WTG 11": new Generator("WTG11 E",1),
        "WTG 12": new Generator("WTG12 E",1),
        "WTG 13": new Generator("WTG13 E",1),
        "WTG 14": new Generator("WTG14 E",1),
        "WTG 15": new Generator("WTG15 E",1),
        "WTG 16": new Generator("WTG16 E",1),

        "WTG 01": new Generator("WTG01 E",1),
        "WTG 02": new Generator("WTG02 E",1),
        "WTG 03": new Generator("WTG03 E",1),
        "WTG 04": new Generator("WTG04 E",1),
        "WTG 05": new Generator("WTG05 E",1),
        "WTG 06": new Generator("WTG06 E",1),
        "WTG 07": new Generator("WTG07 E",1),
        "WTG 08": new Generator("WTG08 E",1),

    },
    availablePower:{
        "EWHC0G_2" : new AvailablePower([500,150]),
    }
}