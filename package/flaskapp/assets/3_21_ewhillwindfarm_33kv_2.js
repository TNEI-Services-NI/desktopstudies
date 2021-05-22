//1550 x 1160 in mm
//scale of 1000 x 1000, readjust with math...
networks_undrawn["ewehillwindfarm2"]={
    lines:{
    "EWEH3#1": StraightLine([345,50],"down",40,"33kV"),
    "EWEH3": StraightLine([315,100],"right",30,"33kV"),
    "EWEH3#3": StraightLine([315,100],"right",0,"LV"),

    "EWEH3#2": StraightLine([345,90],"down",30,"33kV"),

    "1L3A": StraightLine([345,120],"down",85,"33kV"),
    "EWEH3-_GRID1A-_WG2": StraightLine([345,120],"down",100,"33kV"),
    "EWEH0G_2#100": StraightLine([345,220],"down",40,"33kV"),

        "POC": StraightLine([320,200],"right",50,"",true),

    "MINSCA BUSBAR": StraightLine([325,260],"right",425,"33kV"),

    "EWEH0G_2#0": StraightLine([365,260],"down",30,"33kV"),
    "EWEH0G_2#1": StraightLine([365,290],"down",80,"33kV"),

    "EWEH0G_2#2": StraightLine([480,260],"down",30,"33kV"),
    "EWEH0G_2#3": StraightLine([480,290],"down",80,"33kV"),

    "EWEH0G_2#4": StraightLine([730,260],"down",30,"33kV"),
    "EWEH0G_2#5": StraightLine([730,290],"down",85,"33kV"),
    "EWEH0G_2#102": StraightLine([730,375],"down",10,"LV"),

    "EWEH0G_2#6": StraightLine([480,370],"right",45,"33kV"),
    "EWEH0G_2#7": StraightLine([505,405],"right",20,"33kV"),
    "EWEH0G_2#8": StraightLine([525,360],"down",60,"33kV"),
    "EWEH0G_2#9": StraightLine([525,390],"right",40,"33kV"),
    "EWEH0G_2#10": StraightLine([565,390],"right",65,"LV"),
    "WTG09 OUTLINE A": new Line(515,355,680,355,"0V",true),
    "WTG09 OUTLINE B": new Line(680,355,680,425,"0V",true),
    "WTG09 OUTLINE C": new Line(515,425,680,425,"0V",true),
    "WTG09 OUTLINE D": new Line(515,355,515,425,"0V",true),

    "EWEH0G_2#11": StraightLine([505,447],"right",20,"33kV"),
    "EWEH0G_2#12": StraightLine([505,482],"right",20,"33kV"),
    "EWEH0G_2#13": StraightLine([525,437],"down",60,"33kV"),
    "EWEH0G_2#14": StraightLine([525,467],"right",40,"33kV"),
    "EWEH0G_2#15": StraightLine([565,467],"right",65,"LV"),
    "WTG11 OUTLINE A": new Line(515,432,680,432,"0V",true),
    "WTG11 OUTLINE B": new Line(680,432,680,502,"0V",true),
    "WTG11 OUTLINE C": new Line(515,502,680,502,"0V",true),
    "WTG11 OUTLINE D": new Line(515,432,515,502,"0V",true),

    "EWEH0G_2#16": StraightLine([505,527],"right",20,"33kV"),
    "EWEH0G_2#17": StraightLine([525,517],"down",60,"33kV"),
    "EWEH0G_2#18": StraightLine([525,547],"right",40,"33kV"),
    "EWEH0G_2#19": StraightLine([565,547],"right",65,"LV"),
    "WTG10 OUTLINE A": new Line(515,512,680,512,"0V",true),
    "WTG10 OUTLINE B": new Line(680,512,680,582,"0V",true),
    "WTG10 OUTLINE C": new Line(515,582,680,582,"0V",true),
    "WTG10 OUTLINE D": new Line(515,512,515,582,"0V",true),

    "EWEH0G_2#20": StraightLine([482,604],"right",44,"33kV"),
    "EWEH0G_2#21": StraightLine([505,639],"right",20,"33kV"),
    "EWEH0G_2#22": StraightLine([525,594],"down",60,"33kV"),
    "EWEH0G_2#23": StraightLine([525,624],"right",40,"33kV"),
    "EWEH0G_2#24": StraightLine([565,624],"right",65,"LV"),
    "WTG12 OUTLINE A": new Line(515,589,680,589,"0V",true),
    "WTG12 OUTLINE B": new Line(680,589,680,659,"0V",true),
    "WTG12 OUTLINE C": new Line(515,659,680,659,"0V",true),
    "WTG12 OUTLINE D": new Line(515,589,515,659,"0V",true),

    "EWEH0G_2#29": StraightLine([505,681],"right",20,"33kV"),
//    "EWEH0G_2#30": StraightLine([505,716],"right",20,"33kV"),
    "EWEH0G_2#31": StraightLine([525,671],"down",60,"33kV"),
    "EWEH0G_2#32": StraightLine([525,701],"right",40,"33kV"),
    "EWEH0G_2#33": StraightLine([565,701],"right",65,"LV"),
    "WTG14 OUTLINE A": new Line(515,666,680,666,"0V",true),
    "WTG14 OUTLINE B": new Line(680,666,680,736,"0V",true),
    "WTG14 OUTLINE C": new Line(515,736,680,736,"0V",true),
    "WTG14 OUTLINE D": new Line(515,666,515,736,"0V",true),

    "EWEH0G_2#39": StraightLine([482,758],"right",44,"33kV"),
    "EWEH0G_2#40": StraightLine([505,793],"right",20,"33kV"),
    "EWEH0G_2#41": StraightLine([525,748],"down",60,"33kV"),
    "EWEH0G_2#42": StraightLine([525,778],"right",40,"33kV"),
    "EWEH0G_2#43": StraightLine([565,778],"right",65,"LV"),
    "WTG16 OUTLINE A": new Line(515,743,680,743,"0V",true),
    "WTG16 OUTLINE B": new Line(680,743,680,813,"0V",true),
    "WTG16 OUTLINE C": new Line(515,813,680,813,"0V",true),
    "WTG16 OUTLINE D": new Line(515,743,515,813,"0V",true),

    "EWEH0G_2#34": StraightLine([505,835],"right",20,"33kV"),
    "EWEH0G_2#35": StraightLine([505,870],"right",20,"33kV"),
    "EWEH0G_2#36": StraightLine([525,825],"down",60,"33kV"),
    "EWEH0G_2#37": StraightLine([525,855],"right",40,"33kV"),
    "EWEH0G_2#38": StraightLine([565,855],"right",65,"LV"),
    "WTG15 OUTLINE A": new Line(515,820,680,820,"0V",true),
    "WTG15 OUTLINE B": new Line(680,820,680,890,"0V",true),
    "WTG15 OUTLINE C": new Line(515,890,680,890,"0V",true),
    "WTG15 OUTLINE D": new Line(515,820,515,890,"0V",true),

    "EWEH0G_2#25": StraightLine([505,912],"right",20,"33kV"),
    "EWEH0G_2#26": StraightLine([525,902],"down",60,"33kV"),
    "EWEH0G_2#27": StraightLine([525,932],"right",40,"33kV"),
    "EWEH0G_2#28": StraightLine([565,932],"right",65,"LV"),
    "WTG13 OUTLINE A": new Line(515,897,680,897,"0V",true),
    "WTG13 OUTLINE B": new Line(680,897,680,967,"0V",true),
    "WTG13 OUTLINE C": new Line(515,967,680,967,"0V",true),
    "WTG13 OUTLINE D": new Line(515,897,515,967,"0V",true),


    "EWEH0G_2#67": StraightLine([365,370],"left",45,"33kV"),
    "EWEH0G_2#68": StraightLine([340,405],"left",20,"33kV"),
    "EWEH0G_2#69": StraightLine([320,360],"down",57,"33kV"),
    "EWEH0G_2#70": StraightLine([320,390],"left",40,"33kV"),
    "EWEH0G_2#71": StraightLine([285,390],"left",65,"LV"),
    "WTG06 OUTLINE A": new Line(165,355,330,355,"0V",true),
    "WTG06 OUTLINE B": new Line(330,355,330,425,"0V",true),
    "WTG06 OUTLINE C": new Line(165,425,330,425,"0V",true),
    "WTG06 OUTLINE D": new Line(165,425,165,355,"0V",true),
    "EWEH0G_2#72": StraightLine([340,447],"left",20,"33kV"),
    "EWEH0G_2#73": StraightLine([340,482],"left",20,"33kV"),
    "EWEH0G_2#74": StraightLine([320,437],"down",57,"33kV"),
    "EWEH0G_2#75": StraightLine([320,467],"left",40,"33kV"),
    "EWEH0G_2#76": StraightLine([285,467],"left",65,"LV"),
    "WTG07 OUTLINE A": new Line(165,432,330,432,"0V",true),
    "WTG07 OUTLINE B": new Line(330,432,330,502,"0V",true),
    "WTG07 OUTLINE C": new Line(165,502,330,502,"0V",true),
    "WTG07 OUTLINE D": new Line(165,502,165,432,"0V",true),
    "EWEH0G_2#77": StraightLine([340,524],"left",20,"33kV"),
    "EWEH0G_2#78": StraightLine([320,514],"down",57,"33kV"),
    "EWEH0G_2#79": StraightLine([320,544],"left",40,"33kV"),
    "EWEH0G_2#80": StraightLine([285,544],"left",65,"LV"),
    "WTG08 OUTLINE A": new Line(165,509,330,509,"0V",true),
    "WTG08 OUTLINE B": new Line(330,509,330,579,"0V",true),
    "WTG08 OUTLINE C": new Line(165,579,330,579,"0V",true),
    "WTG08 OUTLINE D": new Line(165,579,165,509,"0V",true),
    "EWEH0G_2#62": StraightLine([365,601],"left",45,"33kV"),
    "EWEH0G_2#63": StraightLine([340,636],"left",20,"33kV"),
    "EWEH0G_2#64": StraightLine([320,591],"down",57,"33kV"),
    "EWEH0G_2#65": StraightLine([320,621],"left",40,"33kV"),
    "EWEH0G_2#66": StraightLine([285,621],"left",65,"LV"),
    "WTG05 OUTLINE A": new Line(165,586,330,586,"0V",true),
    "WTG05 OUTLINE B": new Line(330,586,330,656,"0V",true),
    "WTG05 OUTLINE C": new Line(165,656,330,656,"0V",true),
    "WTG05 OUTLINE D": new Line(165,656,165,586,"0V",true),
    "EWEH0G_2#58": StraightLine([340,678],"left",20,"33kV"),
    "EWEH0G_2#59": StraightLine([320,668],"down",57,"33kV"),
    "EWEH0G_2#60": StraightLine([320,698],"left",40,"33kV"),
    "EWEH0G_2#61": StraightLine([285,698],"left",65,"LV"),
    "WTG04 OUTLINE A": new Line(165,663,330,663,"0V",true),
    "WTG04 OUTLINE B": new Line(330,663,330,733,"0V",true),
    "WTG04 OUTLINE C": new Line(165,733,330,733,"0V",true),
    "WTG04 OUTLINE D": new Line(165,733,165,663,"0V",true),
    "EWEH0G_2#53": StraightLine([365,755],"left",45,"33kV"),
    "EWEH0G_2#54": StraightLine([340,790],"left",20,"33kV"),
    "EWEH0G_2#55": StraightLine([320,745],"down",57,"33kV"),
    "EWEH0G_2#56": StraightLine([320,775],"left",40,"33kV"),
    "EWEH0G_2#57": StraightLine([285,775],"left",65,"LV"),
    "WTG03 OUTLINE A": new Line(165,740,330,740,"0V",true),
    "WTG03 OUTLINE B": new Line(330,740,330,810,"0V",true),
    "WTG03 OUTLINE C": new Line(165,810,330,810,"0V",true),
    "WTG03 OUTLINE D": new Line(165,810,165,740,"0V",true),
    "EWEH0G_2#48": StraightLine([340,832],"left",20,"33kV"),
    "EWEH0G_2#49": StraightLine([340,867],"left",20,"33kV"),
    "EWEH0G_2#50": StraightLine([320,822],"down",57,"33kV"),
    "EWEH0G_2#51": StraightLine([320,852],"left",40,"33kV"),
    "EWEH0G_2#52": StraightLine([285,852],"left",65,"LV"),
    "WTG02 OUTLINE A": new Line(165,817,330,817,"0V",true),
    "WTG02 OUTLINE B": new Line(330,817,330,887,"0V",true),
    "WTG02 OUTLINE C": new Line(165,887,330,887,"0V",true),
    "WTG02 OUTLINE D": new Line(165,887,165,817,"0V",true),
    "EWEH0G_2#44": StraightLine([340,909],"left",20,"33kV"),
    "EWEH0G_2#45": StraightLine([320,899],"down",57,"33kV"),
    "EWEH0G_2#46": StraightLine([320,929],"left",40,"33kV"),
    "EWEH0G_2#47": StraightLine([285,929],"left",65,"LV"),
    "WTG01 OUTLINE A": new Line(165,894,330,894,"0V",true),
    "WTG01 OUTLINE B": new Line(330,894,330,964,"0V",true),
    "WTG01 OUTLINE C": new Line(165,964,330,964,"0V",true),
    "WTG01 OUTLINE D": new Line(165,964,165,894,"0V",true),

    "EWEH0G_2#81": new StraightLine([340,403],"down",46,"33kV"),
    "EWEH0G_2#82": new StraightLine([340,480],"down",46,"33kV"),
    "EWEH0G_2#83": new StraightLine([340,634],"down",46,"33kV"),
    "EWEH0G_2#84": new StraightLine([340,788],"down",46,"33kV"),
    "EWEH0G_2#85": new StraightLine([340,865],"down",46,"33kV"),

    "EWEH0G_2#86": new StraightLine([505,868],"down",46,"33kV"),
    "EWEH0G_2#87": new StraightLine([505,791],"down",46,"33kV"),
    "EWEH0G_2#88": new StraightLine([505,637],"down",46,"33kV"),
    "EWEH0G_2#89": new StraightLine([505,481],"down",48,"33kV"),
    "EWEH0G_2#90": new StraightLine([505,403],"down",46,"33kV"),


    "EWEH0G_2#91": new StraightLine([320,390],"right",45,"33kV"),
    "EWEH0G_2#92": new StraightLine([365,388],"down",215,"33kV"),

    "EWEH0G_2#93": StraightLine([320,620],"right",45,"33kV"),
    "EWEH0G_2#94": new StraightLine([365,620],"down",137,"33kV"),

    "EWEH0G_2#95": StraightLine([483,467],"right",45,"33kV"),
    "EWEH0G_2#96": new StraightLine([483,467],"down",137,"33kV"),

    "EWEH0G_2#97": StraightLine([483,621],"right",45,"33kV"),
    "EWEH0G_2#98": new StraightLine([483,621],"down",137,"33kV"),

    },
    busbars:{
     "EWEH0G_2": StraightLine([325,260],"right",425,"33kV"),

    },

    breakers:{
//        "761 CHAP": new Breaker("761 CHAP A",1),
    "WG2": new Breaker("EWEH3-_GRID1A-_WG2" ,1,"CUSTOMER"),
     "GRID 1A": new Breaker("EWEH3-_GRID1A-_WG2",0),
     "CB01": new Breaker("EWEH0G_2#0",1),
     "CB02": new Breaker("EWEH0G_2#2",1),
     "CB04": new Breaker("EWEH0G_2#4",1),

    },

    labels:{
        1: new Text("MINSCA BUSBAR",["Ewehill WF 2"],[0,-190], 25),
                2: new Text("MINSCA BUSBAR",["EWEHILL 2"],[0,-20]),

    },

    tx:{
        "trf_EWEH1Q_EWEH3-_1" : new Tx("EWEH3#1",0,["GT1 90MVA","TAP 12"],"","132kV"),
        "EWEH3-AUX-_1": new Tx("EWEH3#3", 0, "","","33kV"),
        "EWEHOG-AUX-_2": new Tx("EWEH0G_2#102",1,["AUXILIARY","TRANSFORMER"],"","33kV"),

        "EWEH-_WTG-_2#0": new Tx("EWEH0G_2#9",1,["WTG 09"],"","LV"),
        "EWEH-_WTG-_2#1": new Tx("EWEH0G_2#18",1,["WTG 10"],"","LV"),
        "EWEH-_WTG-_2#2": new Tx("EWEH0G_2#14",1,["WTG 11"],"","LV"),
        "EWEH-_WTG-_2#3": new Tx("EWEH0G_2#23",1,["WTG 12"],"","LV"),
        "EWEH-_WTG-_2#4": new Tx("EWEH0G_2#27",1,["WTG 13"],"","LV"),
        "EWEH-_WTG-_2#5": new Tx("EWEH0G_2#32",1,["WTG 14"],"","LV"),
        "EWEH-_WTG-_2#6": new Tx("EWEH0G_2#37",1,["WTG 15"],"","LV"),
        "EWEH-_WTG-_2#7": new Tx("EWEH0G_2#42",1,["WTG 16"],"","LV"),

        "EWEH-_WTG-_2#8": new Tx("EWEH0G_2#47",0,["WTG 01"],"","33kV"),
        "EWEH-_WTG-_2#9": new Tx("EWEH0G_2#52",0,["WTG 02"],"","33kV"),
        "EWEH-_WTG-_2#10": new Tx("EWEH0G_2#57",0,["WTG 03"],"","33kV"),
        "EWEH-_WTG-_2#11": new Tx("EWEH0G_2#61",0,["WTG 04"],"","33kV"),
        "EWEH-_WTG-_2#12": new Tx("EWEH0G_2#66",0,["WTG 05"],"","33kV"),
        "EWEH-_WTG-_2#13": new Tx("EWEH0G_2#71",0,["WTG 06"],"","33kV"),
        "EWEH-_WTG-_2#14": new Tx("EWEH0G_2#76",0,["WTG 07"],"","33kV"),
        "EWEH-_WTG-_2#15": new Tx("EWEH0G_2#80",0,["WTG 08"],"","33kV"),


    },

    isolators:{
        "1L3A": new Isolator("EWEH3-_GRID1A-_WG2" ,0.5),

    },

    dataViews:{
        "trf_EWEH1Q_EWEH3-_1": new DataView("EWEH3-_GRID1A-_WG2", [-50,-10], [
        "transformers_active_power","transformers_reactive_power","transformers_current"
        ]),
        "EWEH0G_2": new DataView("EWEH0G_2", [150,-20], [
        "busbars_voltage"
        ]),

    },

    SGTs:{

    },

    generators:{
        "WTG_EWEHOG_2#0": new Generator("EWEH0G_2#10",1),
        "WTG_EWEH0G_2#1": new Generator("EWEH0G_2#19",1),
        "WTG_EWEH0G_2#2": new Generator("EWEH0G_2#15",1),
        "WTG_EWEH0G_2#3": new Generator("EWEH0G_2#24",1),
        "WTG_EWEH0G_2#4": new Generator("EWEH0G_2#28",1),
        "WTG_EWEH0G_2#5": new Generator("EWEH0G_2#33",1),
        "WTG_EWEH0G_2#6": new Generator("EWEH0G_2#38",1),
        "WTG_EWEH0G_2#7": new Generator("EWEH0G_2#43",1),

        "WTG_EWEH0G_2#8": new Generator("EWEH0G_2#47",1),
        "WTG_EWEH0G_2#9": new Generator("EWEH0G_2#52",1),
        "WTG_EWEH0G_2#10": new Generator("EWEH0G_2#57",1),
        "WTG_EWEH0G_2#11": new Generator("EWEH0G_2#61",1),
        "WTG_EWEH0G_2#12": new Generator("EWEH0G_2#66",1),
        "WTG_EWEH0G_2#13": new Generator("EWEH0G_2#71",1),
        "WTG_EWEH0G_2#14": new Generator("EWEH0G_2#76",1),
        "WTG_EWEH0G_2#15": new Generator("EWEH0G_2#80",1),

    },
    availablePower:{
        "EWEH0G_2" : new AvailablePower([500,150]),
    },
    generationInfo:{
        "EWEHILL_2": new GenerationInfo([825,100],"Ewe Hill 2 Windfarm (EWEH-2)"),
    },
//    generatorControls:{
//        "EWEH0G_2": new GeneratorControl([750,100])
//    },
}