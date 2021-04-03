  // Document Initialisation
  $(document).ready(function(){
    // $('#buttonA').attr('stage', 0);
    // $.ajax({
    //   url:"data/steps.csv",
    //   dataType:"text",
    //   success:function(data)
    //   {
    //     var csv = data.split(/\r?\n|\r/);
    //     var cell_data = csv[parseInt($('#buttonA').attr('stage'))].split(",");
    //     // $('#buttonA').text(cell_data[2])
    //   }
    // });
  });


 //Define parent attributes
 //  var x = document.getElementById('myDiv').clientWidth;
  var x = window.innerWidth;
  // var y = document.getElementById('myDiv').clientHeight;
  var y = window.innerHeight;



  //Create canvas
  var draw = SVG('#drawing').size(x, y)

  var x_scaling = x/1350
  var y_scaling = y/1100

function Breaker_Callback(holder, name = false){
        return function(object){
            if(holder != undefined){
                holder.push(object)
            }
            if(name !== false){
                if(object.horizontal ==true){
                add_text(object, false, [name], 0, -15, function(object){})
                }
                else{add_text(object, false, [name], 12+ name.length*5, 0, function(object){})}
            }
        }
    }
function Text_Callback(holder){
        return function(object){
            //revamp post_breaker to a function that figures out its state instead
//            object.on("breaker_clicked",function(){post_breaker()})
            if(holder != undefined){
                holder.push(object)
            }
        }
    }
function Tx_Callback(name, holder){
        return function(circle1,circle2,circle3,circle4,group){
            //revamp post_breaker to a function that figures out its state instead
//            object.on("breaker_clicked",function(){post_breaker()})
            if(holder != undefined){
                holder.push(group)
            }
            add_text(circle1, false, [name], 7, 20, function(object){
            return 0
            });
            eventMouse(group, "Transformer", "STCR3-_STCR5-_1");
        }
    }


function Breaker(lineID, pos, state = "closed", name=false){
    this.lineID = lineID
    this.pos = pos
    this.state = state
    this.size = 12
    this.graphic = []
    this.name = name
    this.callback = Breaker_Callback(this.graphic)

}

function Line(x1, y1,x2, y2, voltage="32kV", dash = false, colour = "#ffffff"){
    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
    this.voltage = voltage
    this.callback = 0
    this.dash = dash
    this.colour=colour
}

function StraightLine(origin, direction, length, voltage="33kV", dash = false, colour = "#ffffff"){
    x1 = origin[0]
    y1 = origin[1]
    if(direction == "up"){
    return new Line(x1,y1,x1,y1-length, voltage,dash,colour)
    }
    if(direction == "right"){
    return new Line(x1,y1,x1+length,y1, voltage,dash,colour)
    }
    if(direction =="left"){
        return new Line(x1,y1,x1-length,y1, voltage,dash,colour)
        }
    if(direction =="down"){
    return new Line(x1,y1,x1,y1+length,voltage,dash,colour)
    }
}

function Text(lineID, text, offset){
    this.lineID = lineID
    this.text_strings = text
    this.offset = offset
    this.graphic = []
    this.callback = Text_Callback(this.graphic)
}

function Tx(lineID,pos,name,type="starDelta", coil1 = "33kV",coil2 = "33kV"){
    this.lineID =lineID
    this.pos = pos
    this.name = name
    this.graphic = []
    this.type = type
    this.coil1 = coil1
    this.coil2 = coil2
    this.callback = Tx_Callback(this.name, this.graphic)
}

function Generator(line_id,pos, type= "wind"){
    this.lineID = line_id
    this.pos = pos
    this.type = type
    this.graphic=[]
    //TEMP Breaker callback
    this.callback = Breaker_Callback(this.graphic)
}

function Inductor(line_id,pos){
    this.lineID = line_id,
    this.pos = pos,
    this.graphic=[],
    this.callback=Breaker_Callback(this.graphic)
}

function Isolator(line_id,pos, state = "closed",name=false){
    this.lineID = line_id,
    this.pos = pos,
    this.state=state
    this.graphic=[],
    this.name = name,
    this.callback=Breaker_Callback(this.graphic,name)}

//1550 x 1160 in mm
//scale of 1000 x 1000, readjust with math...
chapelcross_GSP_33kV = {
lines:{
"378": StraightLine([875,40],"right",130),
"into 378 4":StraightLine([885,155],"right",75),
"into 378 3":StraightLine([960,155],"down",90),
"into 378 2":StraightLine([900,250],"right",60),
"into 378 1":StraightLine([960,155],"down",95),

"378 11": StraightLine([885,40],"down",115),
"378 12": StraightLine([950, 40],"down",70),

"698 01": StraightLine([25,175], "right",895),
"698 16": StraightLine([33,175], "down",85),
    "chapelcross dash": StraightLine([15,240],"right",35, dash=true),
"698 15": StraightLine([85,175], "down",300),
    "Chap": StraightLine([25,370],"right",90),
    "generator dash": StraightLine([70,440],"right",35,dash=true),
"698 14": StraightLine([145,175],"down",105),
    "698 14 into ANNAN": StraightLine([145,280], "right",150),
"698 13": StraightLine([250,175],"down",225),
    "into DUMF": StraightLine([250,340],"left",90),
"GRID 1": StraightLine([330,175],"up",120),
    "into DAR tx":StraightLine([330,110],"left",40),
"698 12": StraightLine([415,175],"down",75),
    "into middlebie 1": StraightLine([200,250],"right",215),
    "into middlebie 2":StraightLine([200,250],"down",275),
    "into middlebie 3":StraightLine([95,525],"right",105),
"698 11": StraightLine([475,175],"down",75),
    "698 into Gretna 1":StraightLine([725,250],"left",250),
     "698 into Gretna 2" :StraightLine([725,250],"down",65),
     "698 into Gretna 3" :StraightLine([845,315],"left",120),
     "698 into Gretna 4" :StraightLine([845,315],"down",70),


"698 21": StraightLine([570,175],"down",205),
    "698 right": StraightLine([570,380],"right",45),
"698 22": StraightLine([625,175],"down",135),
    "into Lockerbie 1": StraightLine([530,310],"right",95),
    "into Lockerbie 2":StraightLine([530,310],"down",90),
"GRID 2": StraightLine([670,175],"up",115),
    "into GRID 2 tx": StraightLine([670,110],"left",40),
"698 23": StraightLine([700,175],"down",105),
"698 24": StraightLine([780,175],"down",110),
"698 25": StraightLine([840,175],"down",60),
"698 26": StraightLine([900,175],"down",75),
"694": StraightLine([230,400],"right",350),

"LOCKERBIE13":StraightLine([265,400],"down",240),

//Middlebie
"M12": StraightLine([95,525],"down",50),
"Middlebie": StraightLine([65,575],"right",175),
"M13": StraightLine([80,575],"down",160),
"M14": StraightLine([160,575],"down",190),
"M11": StraightLine([205,575],"down",120),

"into EWE HILL 1": StraightLine([80,735],"left",50),
"into EWE HILL 2": StraightLine([30,735],"down",150),
"into EWE HILL 3": StraightLine([30,885],"right",30),
"781 12": StraightLine([60,885],"up",80),
"EWE HILL": StraightLine([45,805],"right",85),
"781 11": StraightLine([115,805],"down",90),

"Middlebie Primary Transformer": StraightLine([205,695],"right",25),
"MP10": StraightLine([230,695],"right",50,"11kV"),
"intoMP": StraightLine([275,730],"up",35,"11kV"),
"MP": StraightLine([260,730],"right",85,"11kV"),

"into Langholm 1": StraightLine([160,765],"right",150),
"Langholm 33kv": StraightLine([300,790],"right",310),
"into Langholm 2": StraightLine([310,765],"down",90),
"Langholm tx 33kV": StraightLine([310,855],"right",35),
"Langholm10": StraightLine([395,855],"left",50,"11kV"),
"Langholm 11kV 1": StraightLine([395,855],"down",35,"11kV"),
"Langholm01": StraightLine([365,890],"right",100,"11kV"),
"Langholm 11kV 2": StraightLine([445,855],"down",35,"11kV"),
"Langholm20": StraightLine([445,855],"right",35,"11kV"),
"Langholm Tx2": StraightLine([525,855],"left",35),

"Langholm to gretna 1": StraightLine([525,855],"up",175),
"Langholm to gretna 2": StraightLine([525,680],"right",90),
"Langholm to gretna 3": StraightLine([615,680],"up",300),

"ANNAN10": StraightLine([340,280],"left",50, "11kV"),
"into 662 1": StraightLine([340,280],"down",35, "11kV"),
"662 01": StraightLine([310,315],"right",105, "11kV"),
"into 662 2": StraightLine([385,280],"down",35, "11kV"),
"ANNAN20": StraightLine([385,280],"right",50, "11kV"),

"698 23 into Annan": StraightLine([435,280],"right",265),

"698 21 into gretna 1": StraightLine([570,380],"right",45),

"KIRKBANK T": StraightLine([265,550],"right",75),
"MOFFAT T1": StraightLine([265,640],"right",75),
"MOFFAT T2": StraightLine([565,640],"left",80),

"694 23": StraightLine([565,640],"up",240),

"KIRKBANK10": StraightLine([390,550],"left",50,"11kV"),
"KIRKBANK 1": StraightLine([390,550],"down",35,"11kV"),
"KIRKBANK":StraightLine([360,585],"right",85,"11kV"),

"MOFFAT10": StraightLine([390,640],"left",50, "11kV"),
"MOFFAT 1": StraightLine([390,640],"down",35, "11kV"),
"MOFFAT01": StraightLine([360,675],"right",100,"11kV"),
"MOFFAT 2": StraightLine([440,640],"down",35,"11kV"),
"MOFFAT20": StraightLine([440,640],"right",50,"11kV"),


"GRETNA 1": StraightLine([615,535],"right",30),
"GRETNA 2": StraightLine([645,535],"up",150),
"GRETNA 691": StraightLine([630,385],"right",245),
"GRETNA 3": StraightLine([655,460],"up",75),
"GRETNA T1": StraightLine([655,460],"right",35),
"GRETNA T2": StraightLine([865,460],"left",35),
"GRETNA 6":StraightLine([865,460],"up",75),

//GRETNA 11kV
"673 10": StraightLine([735,460],"left",50, "11kV"),
"GRETNA 4": StraightLine([735,460],"down",35,"11kV"),
"673 01": StraightLine([705,496],"right",100,"11kV"),
"GRETNA 5": StraightLine([785,460],"down",35,"11kV"),
"673 20": StraightLine([785,460],"right",50, "11kV"),

"694 12": StraightLine([305,455],"up",55),
"694 22": StraightLine([520,455],"up",55),


"LOCKERBIE T1": StraightLine([305,455],"right",35),
"679 10": StraightLine([340,455],"right",50, "11kV"),
"LOCKERBIE 1": StraightLine([390,455],"down",35, "11kV"),
"679 01": StraightLine([360,490],"right",100, "11kV"),
"LOCKERBIE 2": StraightLine([435,455],"down",35, "11kV"),
"679 20": StraightLine([435,455],"right",50, "11kV"),
"LOCKERBIE T2": StraightLine([485,455],"right",35),

"MINSKA 1": StraightLine([905,285],"left",125),
"MINSKA 2": StraightLine([905,285],"down",210),
"MINSKA 3": StraightLine([850,495],"right",55),
"MINSKA 4": StraightLine([850,670],"up",175),
"MINSKA 5": StraightLine([850,670],"right",30),

"761 CHAP": StraightLine([880,670],"up",60),
"761": StraightLine([870,610],"right",105),
"761 WINDFARM": StraightLine([940,610],"down",30),
"761 CUSTOMER": StraightLine([940,690],"up",50),
"761 GENERATOR": StraightLine([940,690],"down",60),
"761 DASH": StraightLine([925,660],"right",30),

"NEWCASTLETON 1": StraightLine([585,820],"up",30),
"NEWCASTLETON 2": StraightLine([585,820],"right",50),
"NEWCASTLETON 3": StraightLine([635,645],"down",175),
"NEWCASTLETON T1": StraightLine([635,645],"right",30),

"123 10":StraightLine([710,645],"left",50, "11kV"),
"NEWCASTLETON 4": StraightLine([710,645],"down",35, "11kV"),
"NEWCASTLETON 5": StraightLine([695,680],"right",85, "11kV"),
"123 12": StraightLine([745,680],"down",55, "11kV"),

"785 A": StraightLine([680,940],"left",155,"11kV"),
"785 21": StraightLine([680,940],"up",160, "11kV"),
"785 B": StraightLine([670,780],"right",90,"11kV"),
"785 22": StraightLine([740,780],"down",145,"11kV"),
"785 DASH": StraightLine([720,835],"right",45,dash=true),

 },
breakers:{
    "698 16": new Breaker("698 16",0.25,"closed"),
    "698 15": new Breaker("698 15",0.07,"closed"),
    "699 CHAP": new Breaker("698 15",0.60,"closed", "CHAP"),
    "699 generator ": new Breaker("698 15",0.85,"open",name = ""),
    "698 14": new Breaker("698 14",0.19,"closed"),
    "698 13": new Breaker("698 13",0.1,"closed"),
    "GRID 1": new Breaker("GRID 1",0.2,"closed"),
    "698 12": new Breaker("698 12",0.3,"closed"),
    "698 11": new Breaker("698 11",0.3,"closed"),
    "698 01": new Breaker("698 01",0.555,"closed"),
    "698 21": new Breaker("698 21",0.11,"closed"),
    "698 22": new Breaker("698 22",0.16,"closed"),
    "698 23": new Breaker("698 23",0.19,"closed"),
    "698 24": new Breaker("698 24",0.19,"closed"),
    "698 25": new Breaker("698 25",0.31,"closed"),
    "698 26": new Breaker("698 26",0.26,"closed"),
    "678 11": new Breaker("378 11",0.18,"closed"),
    "678 12": new Breaker("378 12",0.3,"closed"),
    "GRID 2": new Breaker("GRID 2",0.2,"closed"),

    "694": new Breaker("694",0.53,"closed"),

    //some of these below are arc breakers

    "780 12": new Breaker("M12",0.5,"closed","12"),
    "780 13": new Breaker("M13",0.1,"closed","13"),
    "780 14": new Breaker("M14",0.08,"closed","14"),
    "780 11": new Breaker("M11",0.12,"closed","11"),

    "781 12": new Breaker("781 12",0.65,"closed","12"),
    "781 11": new Breaker("781 11",0.3,"closed","11"),

    "682 10": new Breaker("MP10",0.6,"closed","10"),

    "676 10": new Breaker("Langholm10",0.3,"closed","10"),
    "676 01": new Breaker("Langholm01",0.55,"closed","01"),
    "676 20": new Breaker("Langholm20",0.4,"closed","20"),

    "662 10": new Breaker("ANNAN10",0.3,"closed","10"),
    "662 01": new Breaker("662 01",0.55,"closed","01"),
    "662 20": new Breaker("ANNAN20",0.3,"closed","20"),

    "694 13": new Breaker("LOCKERBIE13",0.1,"closed","13"),

    "675 10": new Breaker("KIRKBANK10",0.3,"closed","10"),

    "683 10": new Breaker("MOFFAT10",0.3,"closed","10"),
    "683 01": new Breaker("MOFFAT01", 0.55,"closed","01"),
    "683 20": new Breaker("MOFFAT20", 0.3,"closed","20"),

    "694 12": new Breaker("694 12", 0.5,"closed","12"),
    "694 22": new Breaker("694 22", 0.5,"closed","22"),
    "694 23": new Breaker("694 23", 0.89,"closed","13"),

    "679 10": new Breaker("679 10", 0.7,"closed","10"),
    "679 01": new Breaker("679 01",0.55,"closed","01"),
    "679 20": new Breaker("679 20",0.3,"closed","20"),

    "673 10": new Breaker("673 10",0.25,"closed","10"),
    "673 01": new Breaker("673 01",0.55,"closed","01"),
    "673 20": new Breaker("673 20",0.25,"closed","20"),

    "761 CHAP": new Breaker("761 CHAP",0.55,"closed","CHAP"),
    "761 WINDFARM": new Breaker("761 WINDFARM",1,"closed","WINDFARM"),
    "761 CUSTOMER": new Breaker("761 CUSTOMER",0,"closed","CUSTOMER"),

    "123 10": new Breaker("123 10",0.25,"closed","10"),
    "123 12": new Breaker("123 12",0.7,"closed","12"),

    "785 21": new Breaker("785 21",0.86,"closed","21"),
    "785 22": new Breaker("785 22",0.15,"closed","22"),
    "785 CUSTOMER": new Breaker("785 22",0.5,"open","CUSTOMER"),

    },
tx:{
    0: new Tx("into GRID 2 tx",1,"",type="starDelta"),
    1: new Tx("GRID 2",1,"GRID T2",type="starDelta"),
    2: new Tx("GRID 1",1,"GRID T1",type="starDelta"),
    3: new Tx("into DAR tx",1,"",type="starDelta"),
    5: new Tx("Middlebie Primary Transformer",1,"", type="starDelta"),
    6: new Tx("Langholm tx 33kV",1,"T1",type="starDelta"),
    7: new Tx("Langholm Tx2",1,"T2",type="starDelta"),
    8: new Tx("698 14 into ANNAN",1,"T1",type="starDelta"),
    9: new Tx("ANNAN20",1,"T2",type="starDelta"),
    11: new Tx("KIRKBANK T",1,"T", type="starDelta"),
    12: new Tx("MOFFAT T1",1,"T1",type="starDelta"),
    13: new Tx("MOFFAT20",1,"T1",type="starDelta"),

    14: new Tx("LOCKERBIE T1", 1, "T1"),
    15: new Tx("LOCKERBIE T2",0,"T2"),

    16: new Tx("GRETNA T1",1,"T1"),
    17: new Tx("GRETNA T2",1,"T2"),

    18: new Tx("NEWCASTLETON T1",1,"T1"),

    },
generators:{
    1: new Generator("698 15",1),
    2: new Generator("781 11",1),
    3: new Generator("785 22",1),
    "MINSCA WF": new Generator("761 GENERATOR", 1),
    5: new Generator("378 12",1),
    }
}

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
    tx:{1: new Tx("into GRID T1 tx",1,"",type="starDelta", coil1 = "LV", coil2 = "33kV"),
        2: new Tx("GRID T1",1,"GRID T1",type="starDelta",coil1 = "132kV", coil2 = "33kV"),

        3: new Tx("into GRID T2 tx",1,"",type="starDelta", coil1 = "LV", coil2 = "33kV"),
        4: new Tx("GRID T2",1,"GRID T2",type= "starDelta",coil1 = "132kV",coil2 = "33kV"),

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
        "x447": StraightLine([445,275],"right",135,"400kV"),
        "x449": StraightLine([445,220],"right",135,"400kV"),
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
    }
}

dict_components = chapelcross_132kV

init_breakers("chapelcross", "33kv", dict_components.breakers);

  components = {
    breakers: [],
    lines: [],
    text:[],
    generators: [],
    isolators:[],
  }

var idx_line, temp_dict
for (idx_line in dict_components.lines){
    temp_dict = dict_components.lines[idx_line]
    temp_dict.x1 = temp_dict.x1 * x_scaling
    temp_dict.x2 = temp_dict.x2 * x_scaling
    temp_dict.y1 = temp_dict.y1 * y_scaling
    temp_dict.y2 = temp_dict.y2 * y_scaling
  }

  var bNodes = false

  for (idx_line in dict_components.lines){
    temp_dict = dict_components.lines[idx_line]
    temp_dict.dict_styling = {fill: { width: 2}, stroke: { width: 2}}
    if (temp_dict.dash){
      temp_dict.dict_styling.stroke.dasharray = (5, 5)
    }
    if (temp_dict.color){
      temp_dict.dict_styling.stroke.color = temp_dict.color
      temp_dict.dict_styling.fill.color = temp_dict.color
    } else {
      temp_dict.dict_styling.stroke.color = "#ffffff"
      temp_dict.dict_styling.fill.color = "#ffffff"
    }

    temp_dict.dict_styling.stroke.color = palette[temp_dict.voltage]

    // if (temp_dict.voltage){
    //   if (temp_dict.voltage == "132") {
    //     temp_dict.dict_styling.stroke.color = "#ffffff"
    //     temp_dict.dict_styling.fill.color = "#ffffff"
    //   } else if (temp_dict.voltage == "33") {
    //     temp_dict.dict_styling.stroke.color = "#00ff00"
    //     temp_dict.dict_styling.fill.color = "#00ff00"
    //   } else if (temp_dict.voltage == "11") {
    //     temp_dict.dict_styling.stroke.color = "#ff0000"
    //     temp_dict.dict_styling.fill.color = "#ff0000"
    //   }
    // }
    temp_dict.o_line = draw.line(temp_dict.x1 , temp_dict.y1,
                                  temp_dict.x2, temp_dict.y2).stroke(temp_dict.dict_styling.stroke)

    temp_dict.line_idx = idx_line

    if (bNodes){
      add_nodes(temp_dict, temp_dict.o_line)
    }

    dict_components.lines[idx_line] = temp_dict
    components.lines[idx_line] = {drawInfo:temp_dict, UIElement: temp_dict.o_line}
  }

    //add breakers
  for(let i in dict_components.breakers){
    //doing this means the inital data, and the SVG elements they make remain unchanged at all times. may be very useful should a redraw/reset be needed...
    //define listener handles now since they have access to everything relevant
    let breaker = dict_components.breakers[i]
    let line = dict_components.lines[breaker.lineID]
    let size = breaker.size
    let pos = breaker.pos
    let state = breaker.state

    if(breaker.name === false){
        breaker.name = i
    }

    breaker.callback = Breaker_Callback(breaker.graphic,breaker.name)

    let bcallback = breaker.callback

    add_breaker(line,pos,size,state,bcallback)
    let id = i
    let closed = state == 'closed'
    let b = {drawInfo:breaker, UIElement: breaker.graphic[0], closed: closed, id : id, line : line}
    b.setState = function(closed){
        breaker = components.breakers[id].line
        rect = components.breakers[id].UIElement

        color = palette[line.voltage]
        this.closed = closed
        if (closed == false){
            rect.fill({ color: 'black' })
            rect.stroke({ color: 'white' })
        } else if (closed == true){
            rect.fill({ color: color })
            rect.stroke({ color: "white" })
      }
    }
    b.UIElement.on("breaker_clicked",function(event){
        let breaker = components.breakers[id]
        breaker.setState(!breaker.closed)
//        breaker.closed=!breaker.closed
        post_breaker(id,breaker.closed)
    })

    components.breakers[id] = b

    }
    //add text
  for(i in dict_components.text){
    text = dict_components.text[i]
    line_id = text.lineID
    line = components.lines[line_id].UIElement
    // console.log(line)

    texts = text.text_strings
    offset = text.offset
    add_text(line,false,texts, offset[0],offset[1],text.callback)
    let id = i
    let t = {initInfo:text, UIElement: text.graphic[0], id : id}
    components.lines[id] = t
    }

    //add transformers
  for(i in dict_components.tx){
    tx = dict_components.tx[i]
    line_id = tx.lineID
    line = dict_components.lines[line_id]
    name = tx.name
    type = tx.type
    pos = tx.pos
    add_tx(line,pos,type,tx.callback)

    let id = i
    let t = {initInfo:tx, UIElement: tx.graphic[0], id : id}
    components.lines[id] = t
    }

    //add Generators
  for(i in dict_components.generators){
    gen = dict_components.generators[i]
    line = dict_components.lines[gen.lineID]
    pos = gen.pos
    callback = gen.callback
    type = gen.type

    add_gen(line,pos,type, callback)
    id = i
    let g = {initInfo:gen, UIElement: gen.graphic[0], id : id}
    components.generators[id] = g

   }
  for(i in dict_components.inductors){
    inductor = dict_components.inductors[i]
    line = dict_components.lines[inductor.lineID]
    pos = inductor.pos
    callback = inductor.callback

    add_inductor(line,pos)
    id = i
    let ind = {initInfo:inductor, UIElement: inductor.graphic[0], id : id}
    components.generators[id] = inductor
  }

  for(i in dict_components.isolators){
    isolator = dict_components.isolators[i]
    line = dict_components.lines[isolator.lineID]
    pos = isolator.pos
    state = isolator.state
    if(isolator.name === false){
        isolator.name = i
    }
    isolator.callback = Breaker_Callback(isolator.graphic,isolator.name)
    callback = isolator.callback
    add_isolator(line,pos,12,state,callback)
    let id = i
    let closed = state == 'closed'
    let iso = {drawInfo:isolator, UIElement: isolator.graphic[0], closed: closed, id : id, line : line}
    components.isolators[id] = iso
  }

//  var powerColour = '#25b1f5'
//
//  // Stage Iterator
//  $('#buttonA').click(function(){
//    $.ajax({
//      url:"data/steps.csv",
//      dataType:"text",
//      success:function(data)
//      {
//        var csv = data.split(/\r?\n|\r/);
//        $('#buttonA').attr('stage', parseInt($('#buttonA').attr('stage'))+1)
//        var stage = parseInt($('#buttonA').attr('stage'));
//
//        $('table tr:nth-child(' + (stage + 1) + ')').css('background-color', '#baffb3');
//
//        var cell_data = csv[stage].split(",");
//        // $('#buttonA').text(cell_data[2])
//
//        if (stage == 2){
//          flashColour(dict_steps_components['1_1'].lines[0].o_line, powerColour)
//          flashColour(dict_steps_components['1_1'].lines[1].o_line, powerColour)
//          flashColour(dict_steps_components['1_1'].lines[2].o_line, powerColour)
//        } else if (stage == 3){
//          flashColour(dict_steps_components['1_1'].lines[4].o_line, powerColour)
//        } else if (stage == 4){
//          flashColour(dict_steps_components['1_1'].lines[9].o_line, powerColour)
//        } else if (stage == 5){
//          flashColour(dict_steps_components['1_1'].lines[42].o_line, powerColour)
//          flashColour(dict_steps_components['1_1'].lines[43].o_line, powerColour)
//
//        } else if (stage == 6){
//
//        } else if (stage == 7){
//          flashColour(dict_steps_components['1_1'].lines[44].o_line, powerColour)
//        } else if (stage == 8){
//          flashColour(dict_steps_components['1_1'].lines[19].o_line, powerColour)
//          flashColour(dict_steps_components['1_1'].lines[20].o_line, powerColour)
//          flashColour(dict_steps_components['1_1'].lines[21].o_line, powerColour)
//          flashColour(dict_steps_components['1_1'].lines[22].o_line, powerColour)
//          flashColour(dict_steps_components['1_1'].lines[23].o_line, powerColour)
//          flashColour(dict_steps_components['1_1'].lines[24].o_line, powerColour)
//        } else if (stage == 9){
//        } else if (stage == 10){
//          flashColour(dict_steps_components['1_1'].lines[25].o_line, powerColour)
//        } else if (stage == 12){
//          flashColour(dict_steps_components['1_1'].lines[18].o_line, powerColour)
//          flashColour(dict_steps_components['1_1'].lines[10].o_line, powerColour)
//          flashColour(dict_steps_components['1_1'].lines[11].o_line, powerColour)
//          flashColour(dict_steps_components['1_1'].lines[51].o_line, powerColour)
//        } else if (stage == 13){
//          flashColour(dict_steps_components['1_1'].lines[50].o_line, powerColour)
//          flashColour(dict_steps_components['1_1'].lines[12].o_line, powerColour)
//          flashColour(dict_steps_components['1_1'].lines[14].o_line, powerColour)
//        } else if (stage == 14){
//          flashColour(dict_steps_components['1_1'].lines[13].o_line, powerColour)
//          flashColour(dict_steps_components['1_1'].lines[15].o_line, powerColour)
//          flashColour(dict_steps_components['1_1'].lines[16].o_line, powerColour)
//          flashColour(dict_steps_components['1_1'].lines[17].o_line, powerColour)
//        }
//      }
//    });
//  });
//
//  add_tx(dict_steps_components['1_1'].lines[0], 0.45, 'starDelta', function(circle1,circle2,circle3,circle4,group){
//    // add_text(circle1, false, ["33/11kV"], 47, 15, function(object){
//    //   return 0
//    // });
//
//    // buttonA_greenObject(1, circle1);
//    // buttonA_greenObject(1, circle2);
//    // buttonA_greenObject(1, circle3);
//    // buttonA_greenObject(1, circle4);
//    // eventMouse(group, "Transformer", "STCR3-_STCR5-_1");
//  });
//
//  add_gen(dict_steps_components['1_1'].lines[0], 1, 'SG', function(circle, group){
//    buttonA_greenObject(0, circle)
//    add_text(group, false, ["Stevens", "Croft"], -40, 0, function(object){
//      return 0
//    });
//    eventMouse(group, "Generator", "STCR5-_1");
//  });
//
//  // add_inductor(dict_steps_components['1_1'].lines[0], 0.9, 'SG');
//
//  // add_earth(dict_steps_components['1_1'].lines[0], 1, true);
//
//
//  add_resistor(dict_steps_components['1_1'].lines[3], 0.65, 12, 4);
//  // add_earth(dict_steps_components['1_1'].lines[3], 1, true);
//  add_text(dict_steps_components['1_1'].lines[3],  true, ["NOP"], -23, -10, function(object){
//    return 0
//  });
//
//
//
//  add_load(dict_steps_components['1_1'].lines[6], 1, true)
//
//  // add_earth(dict_steps_components['1_1'].lines[7], 0, false)
//
//  add_load(dict_steps_components['1_1'].lines[8], 1, true)
//
//  add_load(dict_steps_components['1_1'].lines[35], 1, true)
//
//  add_load(dict_steps_components['1_1'].lines[59], 1, true)
//
//  add_load(dict_steps_components['1_1'].lines[60], 1, true)
//
//  add_tx(dict_components.lines[11], 1, 'deltaStar', function(c1, c2, c3, c4, group){
//    buttonA_greenObject(12, c1)
//    buttonA_greenObject(12, c2)
//    buttonA_greenObject(12, c3)
//    buttonA_greenObject(12, c4)
//    add_text(group, false, ["33/11.5kV"], 0, 30, function(object){
//      return 0
//    });
//    eventMouse(group, "Transformer", "ANANT1_ANAN10_T1");
//  });
//
//  add_load(dict_steps_components['1_1'].lines[14], 1, true)
//
//  add_load(dict_steps_components['1_1'].lines[36], 1, true)
//
//  add_load(dict_steps_components['1_1'].lines[15], 1, true)
////
//  add_tx(dict_steps_components['1_1'].lines[17], 1, 'deltaStar', function(c1, c2, c3, c4, group){
//    buttonA_greenObject(13, c1)
//    buttonA_greenObject(13, c2)
//    buttonA_greenObject(13, c3)
//    buttonA_greenObject(13, c4)
//    add_text(group, false, ["33/11.5kV"], 0, 30, function(object){
//      return 0
//    });
//    eventMouse(group, "Transformer", "ANANT2_ANAN20_T2");
//  });
//
//  add_tx(dict_steps_components['1_1'].lines[25], 0.55, 'deltaStar', function(c1, c2, c3, c4, group){
//    buttonA_greenObject(9, c1)
//    buttonA_greenObject(9, c2)
//    buttonA_greenObject(9, c3)
//    buttonA_greenObject(9, c4)
//    add_text(group, false, ["33/0.69kV"], -55, 0, function(object){
//    });
//    eventMouse(group, "Transformer", "EWHC3-_EWHC0G_1");
//    // EWHC3-_EWHC0G_1
//  });
//
//  add_gen(dict_steps_components['1_1'].lines[25], 1, 'wind', function(circle1, group){
//    add_text(group, false, ["Ewe Hill WF"], 0,30, function(group){
//      return 0
//    });
//  });
//
//  add_tx(dict_steps_components['1_1'].lines[26], 0.5, 'deltaStar', function(dict_tx){
//    dict_steps_components['1_1'].txs += [dict_tx]
//  });
//
//  add_load(dict_steps_components['1_1'].lines[28], 1, true)
//
//  add_tx(dict_steps_components['1_1'].lines[31], 0.5, 'deltaStar', function(dict_tx){
//    dict_steps_components['1_1'].txs += [dict_tx]
//  });
//
//
//  add_gen(dict_steps_components['1_1'].lines[33], 0, 'wind', function(circle1, group){
//    add_text(group, false, ["Craig WF"], 0,30, function(group){
//      return 0
//    });
//  });
//
//
//
//  add_gen(dict_steps_components['1_1'].lines[39], 1, 'wind', function(circle1, group){
//    add_text(group, false, ["Craig II WF"], 0,30, function(group){
//      return 0
//    });
//  });
//
//  add_tx(dict_steps_components['1_1'].lines[38], 0.75, 'deltaStar', function(dict_tx){
//    dict_steps_components['1_1'].txs += [dict_tx]
//  });
//
//  add_tx(dict_steps_components['1_1'].lines[44], 0.55, 'deltaStar', function(c1, c2, c3, c4, group){
//    buttonA_greenObject(6, c1)
//    buttonA_greenObject(6, c2)
//    buttonA_greenObject(6, c3)
//    buttonA_greenObject(6, c4)
//    add_text(group, false, ["33/0.69kV"], -55, 0, function(object){
//    });
//    eventMouse(group, "Transformer", "MINS3-_MINS0G_1");
//    // MINS3-_MINS0G_1
//
//  });
//
//  add_gen(dict_steps_components['1_1'].lines[44], 1, 'wind', function(circle1, group){
//    add_text(group, false, ["MINSCA WF"], 0,30, function(group){
//      return 0
//    });
//  });
//
//  add_tx(dict_steps_components['1_1'].lines[45], 0.51, '', function(dict_tx){
//  });
//  add_load(dict_steps_components['1_1'].lines[45], 0, false);
//
//  add_load(dict_steps_components['1_1'].lines[46], 0, true)
//
//  add_tx(dict_steps_components['1_1'].lines[47], 0.96, 'starStar', function(dict_tx){
//  });
//
//  add_load(dict_steps_components['1_1'].lines[48], 1, false)
//
//  add_load(dict_steps_components['1_1'].lines[49], 0, false)
//  add_load(dict_steps_components['1_1'].lines[49], 0, false)
//  add_resistor(dict_steps_components['1_1'].lines[49], 0.38, 12, 4)
//
//
//
//  add_tx(dict_steps_components['1_1'].lines[56], 0.5, 'deltaStar', function(dict_tx){
//  });
//
//
//
//  add_tx(dict_steps_components['1_1'].lines[62], 1, 'starDelta', function(dict_tx){
//  });
//
//
//
//  add_load(dict_steps_components['1_1'].lines[69], 0, true);

//$( document ).ready(function(){
//function doStuff() {
//    console.log("filling")
//    console.log(components.lines[10].UIElement)
//    console.log(components.lines[10].initInfo)
//
//   components.lines[10].UIElement.stroke("red")
//   setTimeout(doStuff, 1000);
//}
//setTimeout(doStuff, 1000);
//})


function setBreakerState(breakerID, state){

}

function setLineVoltage(){LineID, voltage}{}