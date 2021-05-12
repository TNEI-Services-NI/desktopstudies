//1550 x 1160 in mm
//scale of 1000 x 1000, readjust with math...
networks_undrawn["ewehillwindfarm1"]={
    lines:{
    "EWEH3-#0": StraightLine([285,90],"down",30,"33kV"),
    "EWEH3-_MIBI3-_1#4": StraightLine([285,120],"down",30,"33kV"),
    "EWEH3-_MIBI3-_1#3": StraightLine([255,150],"right",30,"33kV"),
    "EWEH3-_MIBI3-_1#2": StraightLine([255,150],"up",80,"33kV"),

    "EWEH3-#1": StraightLine([345,90],"down",30,"33kV"),
    "EWEH3-_EWEH0G_1": StraightLine([345,120],"down",85,"33kV"),
    "EWEH0G#0": StraightLine([345,205],"down",55,"33kV"),
        "POC": StraightLine([320,160],"right",50,"0V",true),

    "EWEH0G": StraightLine([325,260],"right",425,"33kV"),

    "EWEH0G#1": StraightLine([365,260],"down",30,"33kV"),
    "EWEH0G#4": StraightLine([365,290],"down",80,"33kV"),

    "EWEH0G#2": StraightLine([480,260],"down",30,"33kV"),
    "EWEH0G#5": StraightLine([480,290],"down",80,"33kV"),

    "EWEH0G#3": StraightLine([730,260],"down",30,"33kV"),
//    "EWHC0G-_AUXT": StraightLine([730,290],"down",85,"33kV"),
    "EWEH0G#50": StraightLine([730,290],"down",85,"33kV"),
    "EWEH0G#101": StraightLine([730,375],"down",10,"0V"),

    "EWEH0G#6": StraightLine([480,370],"right",45,"33kV"),
    "EWEH0G#7": StraightLine([505,405],"right",20,"33kV"),
    "EWEH0G#8": StraightLine([525,360],"down",60,"33kV"),
    "EWEH0G#9": StraightLine([525,390],"right",40,"33kV"),
    "EWEH0G#10": StraightLine([565,390],"right",65,"LV"),
    "WTG04 OUTLINE A": new Line(515,355,680,355,"0V",true),
    "WTG04 OUTLINE B": new Line(680,355,680,425,"0V",true),
    "WTG04 OUTLINE C": new Line(515,425,680,425,"0V",true),
    "WTG04 OUTLINE D": new Line(515,355,515,425,"0V",true),

    "EWEH0G#11": StraightLine([505,447],"right",20,"33kV"),
    "EWEH0G#12": StraightLine([505,482],"right",20,"33kV"),
    "EWEH0G#13": StraightLine([525,437],"down",60,"33kV"),
    "EWEH0G#14": StraightLine([525,467],"right",40,"33kV"),
    "EWEH0G#15": StraightLine([565,467],"right",65,"LV"),
    "WTG05 OUTLINE A": new Line(515,432,680,432,"0V",true),
    "WTG05 OUTLINE B": new Line(680,432,680,502,"0V",true),
    "WTG05 OUTLINE C": new Line(515,502,680,502,"0V",true),
    "WTG05 OUTLINE D": new Line(515,432,515,502,"0V",true),

    "EWEH0G#16": StraightLine([505,527],"right",20,"33kV"),
    "EWEH0G#17": StraightLine([525,517],"down",60,"33kV"),
    "EWEH0G#18": StraightLine([525,547],"right",40,"33kV"),
    "EWEH0G#19": StraightLine([565,547],"right",65,"LV"),
    "WTG06 OUTLINE A": new Line(515,512,680,512,"0V",true),
    "WTG06 OUTLINE B": new Line(680,512,680,582,"0V",true),
    "WTG06 OUTLINE C": new Line(515,582,680,582,"0V",true),
    "WTG06 OUTLINE D": new Line(515,512,515,582,"0V",true),

    "EWEH0G#20": StraightLine([365,370],"left",45,"33kV"),
    "EWEH0G#21": StraightLine([340,405],"left",20,"33kV"),
    "EWEH0G#22": StraightLine([320,360],"down",57,"33kV"),
    "EWEH0G#23": StraightLine([320,390],"left",40,"33kV"),
    "EWEH0G#24": StraightLine([285,390],"left",65,"LV"),
    "WTG01 OUTLINE A": new Line(165,355,330,355,"0V",true),
    "WTG01 OUTLINE B": new Line(330,355,330,425,"0V",true),
    "WTG01 OUTLINE C": new Line(165,425,330,425,"0V",true),
    "WTG01 OUTLINE D": new Line(165,425,165,355,"0V",true),
    "EWEH0G#25": StraightLine([340,447],"left",20,"33kV"),
    "EWEH0G#26": StraightLine([340,482],"left",20,"33kV"),
    "EWEH0G#27": StraightLine([320,437],"down",57,"33kV"),
    "EWEH0G#28": StraightLine([320,467],"left",40,"33kV"),
    "EWEH0G#29": StraightLine([285,467],"left",65,"LV"),
    "WTG02 OUTLINE A": new Line(165,432,330,432,"0V",true),
    "WTG02 OUTLINE B": new Line(330,432,330,502,"0V",true),
    "WTG02 OUTLINE C": new Line(165,502,330,502,"0V",true),
    "WTG02 OUTLINE D": new Line(165,502,165,432,"0V",true),
    "EWEH0G#30": StraightLine([340,524],"left",20,"33kV"),
    "EWEH0G#31": StraightLine([320,514],"down",57,"33kV"),
    "EWEH0G#32": StraightLine([320,544],"left",40,"33kV"),
    "EWEH0G#33": StraightLine([285,544],"left",65,"LV"),
    "WTG03 OUTLINE A": new Line(165,509,330,509,"0V",true),
    "WTG03 OUTLINE B": new Line(330,509,330,579,"0V",true),
    "WTG03 OUTLINE C": new Line(165,579,330,579,"0V",true),
    "WTG03 OUTLINE D": new Line(165,579,165,509,"0V",true),


    "EWEH0G#34": new StraightLine([340,403],"down",46,"33kV"),
    "EWEH0G#35": new StraightLine([340,480],"down",46,"33kV"),

    "EWEH0G#36": new StraightLine([505,481],"down",48,"33kV"),
    "EWEH0G#37": new StraightLine([505,403],"down",46,"33kV"),



    },

    busbars:{
     "EWEH0G": StraightLine([325,260],"right",425,"33kV"),
    "EWEH3-": StraightLine([265,90],"right",105,"33kV"),

    },

    breakers:{
    "781 11": new Breaker("EWEH3-#1",1, "11"),
    "781 12": new Breaker("EWEH3-#0",1, "12"),
    "781 CUSTOMER": new Breaker("EWEH3-_EWEH0G_1",1,"CUSTOMER"),
    "CB01": new Breaker("EWEH0G#1",1),
    "CB02": new Breaker("EWEH0G#2",1),
    "CB04": new Breaker("EWEH0G#3",1),

    },

    labels:{
        1: new Text("EWEH3-",["Ewehill WF 1"],[150,-40], 25),
        16: new Text("EWEH0G",["EWEHILL 1"],[0,-20]),

        9: new Text("EWEH3-", ["EWEHILL"],[0,-40]),
        10: new Text("EWEH3-", ["WINDFARM"],[0,-25]),
        11: new Text("EWEH3-", ["781"],[0,-10]),
    },

    tx:{
        "EWEH0G-AUX-_1": new Tx("EWEH0G#101",1,["AUXILIARY","TRANSFORMER"],"","33kV"),

        "EWEH-_WTG-_1#0": new Tx("EWEH0G#9",1,["WTG 04"],"","LV"),
        "EWEH-_WTG-_1#1": new Tx("EWEH0G#14",1,["WTG 05"],"","LV"),
        "EWEH-_WTG-_1#2": new Tx("EWEH0G#18",1,["WTG 06"],"","LV"),

        "EWEH-_WTG-_1#3": new Tx("EWEH0G#24",0,["WTG 01"],"","33kV"),
        "EWEH-_WTG-_1#4": new Tx("EWEH0G#29",0,["WTG 02"],"","33kV"),
        "EWEH-_WTG-_1#5": new Tx("EWEH0G#33",0,["WTG 03"],"","33kV"),
    },

    isolators:{
    },

    dataViews:{
//        1: new DataView(400,105, ["MW","MVAR","kV","Amps","Hz"]),
    },

    SGTs:{

    },

    generators:{
        "WTG_EWEH0G_1#0": new Generator("EWEH0G#10",1),
        "WTG_EWEH0G_1#1": new Generator("EWEH0G#15",1),
        "WTG_EWEH0G_1#2": new Generator("EWEH0G#19",1),

        "WTG_EWEH0G_1#3": new Generator("EWEH0G#24",1),
        "WTG_EWEH0G_1#4": new Generator("EWEH0G#29",1),
        "WTG_EWEH0G_1#5": new Generator("EWEH0G#33",1),

    },

    availablePower:{
        "EWEH0G_1" : new AvailablePower([500,150]),
    }

}