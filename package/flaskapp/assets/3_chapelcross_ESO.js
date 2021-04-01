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
  var y_scaling = y/730

function Breaker_Callback(stages, holder){
        return function(object){
            //revamp post_breaker to a function that figures out its state instead
//            object.on("breaker_clicked",function(){post_breaker()})
            for(stage in stages){
                buttonA_fillObject(stage, object)
            }
            if(holder != undefined){
                holder.push(object)
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
            add_text(circle1, false, [name], 47, 15, function(object){
            return 0
            });
            eventMouse(group, "Transformer", "STCR3-_STCR5-_1");
        }
    }


function Breaker(lineID, pos, state = "closed", stages = []){
    this.lineID = lineID
    this.pos = pos
    this.state = state
    this.size = 6
    this.stages = stages
    this.graphic = []
    this.callback = Breaker_Callback(stages,this.graphic)
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

function StraightLine(origin, direction, length, voltage="32kV", dash = false, colour = "#ffffff"){
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


test_network = {
    lines:{
      0 : new Line(72, 256,72, 420, '132'),
      1 : new Line(46, 256, 149, 256, '132'),
      2 : new Line(40,301, 72,  301, '132'),
      3 : new Line(40,301,40,335, "132"),
      4 : new Line(57,87,57,256, "132"),
      5 : new Line(118, 256, 118, 310, dash= true, color= '#a0a0a0'),
      6 : new Line(140, 256, 140, 310, color = '#a0a0a0'),
      7 : new Line(95,297,118,297, color = "#a0a0a0"),
      8 : new Line(118, 256, 118, 270, color= '#a0a0a0'),
        // STEP 2
      9 : new Line(x1= 40, y1= 88, x2= 1133, y2= 88, voltage= '132'),
      10 : new Line(x1= 94, y1= 88, x2= 94, y2= 158, voltage= '132'),
      11: new Line(x1= 94, y1= 158, x2= 208, y2= 158, voltage= '132'),
        // Step 5C B13 south, east, SOUTH
      12 : new Line(x1= 302, y1= 158, x2= 302, y2= 182, color= '#a0a0a0'),
      13 : new Line(x1= 271, y1= 182, x2= 412, y2= 182, color= '#a0a0a0'),
        // 10-15
      14 : new Line(x1= 320, y1= 182, x2= 320, y2= 223, color= '#a0a0a0'),
        // 21-26
      15 : new Line(x1= 372, y1= 182, x2= 372, y2= 223, color= '#a0a0a0'),
        // Step 5C B23 south, west, south
      16 : new Line(x1= 387, y1= 158, x2= 387, y2= 182, color= '#a0a0a0'),
        // Step 5C B23 south, west
        17 : new Line(x1= 387, y1= 158, x2= 600, y2= 158, color= '#a0a0a0'),
        // Step 5C B23 south
        18 : new Line(x1= 822, y1= 88, x2= 822, y2= 158, voltage= '132'),
        // Step 4.1 B12 - south
        19 : new Line(x1= 491, y1= 88, x2= 491, y2= 138, voltage= '132'),
        // Step 4.1 B12 - south, west
        20 : new Line(x1= 168, y1= 138, x2= 491, y2= 138, voltage= '132'),
        // Step 4.1 B12 - south, west, south
        21 : new Line(x1= 168, y1= 138, x2= 168, y2= 350, voltage= '132'),
        // BB780 - Middlebie
        22 : new Line(x1= 98, y1= 350, x2= 240, y2= 350, voltage= '132'),
        23 : new Line(x1= 110, y1= 350, x2= 110, y2= 500, voltage= '132'),
        24 : new Line(x1= 95, y1= 500, x2= 140, y2= 500, voltage= '132'),
        25 : new Line(x1= 126, y1= 500, x2= 126, y2= 600, voltage= '132'),
        26 : new Line(x1= 188, y1= 350, x2= 188, y2= 425, voltage= '132'),
        27 : new Line(x1= 180, y1= 425, x2= 235, y2= 425, voltage= '132'),
        28 : new Line(x1= 225, y1= 425, x2= 225, y2= 460, voltage= '132'),
        29 : new Line(x1= 168, y1= 487, x2= 225, y2= 487, voltage= '132'),
        30 : new Line(x1= 225, y1= 487, x2= 225, y2= 542, voltage= '132'),
        31 : new Line(x1= 225, y1= 542, x2= 389, y2= 542, voltage= '132'),
        32 : new Line(x1= 389, y1= 542, x2= 389, y2= 625, voltage= '132'),
        33 : new Line(x1= 268, y1= 625, x2= 389, y2= 625, voltage= '132'),
        34 : new Line(x1= 370, y1= 582, x2= 520, y2= 582, voltage= '132'),
        35 : new Line(x1= 420, y1= 582, x2= 420, y2= 620, voltage= '132'),
        36 : new Line(x1= 470, y1= 582, x2= 470, y2= 620, voltage= '132'),
        37 : new Line(x1= 495, y1= 542, x2= 495, y2= 625, voltage= '132'),
        38 : new Line(x1= 495, y1= 542, x2= 625, y2= 542, voltage= '132'),
        39 : new Line(x1= 495, y1= 625, x2= 625, y2= 625, voltage= '132'),
        40 : new Line(x1= 625, y1= 505, x2= 625, y2= 542, voltage= '132'),
        41 : new Line(x1= 200, y1= 505, x2= 650, y2= 505, voltage= '132'),
        // Step 3.1 B24
        42 : new Line(x1= 1106, y1= 87, x2= 1106, y2= 256, voltage= '132'),
        43 : new Line(x1= 1080, y1= 256, x2= 1150, y2= 256, voltage= '132'),
        44 : new Line(x1= 1130, y1= 256, x2= 1130, y2= 380, voltage= '132'),

        45 : new Line(x1= 356, y1= 20, x2= 356, y2= 88, color= '#a0a0a0'),
        46 : new Line(x1= 335, y1= 31, x2= 356, y2= 31, color= '#a0a0a0'),
        47 : new Line(x1= 356, y1= 75, x2= 400, y2= 75, dash= true, color= '#a0a0a0'),
        48 : new Line(x1= 356, y1= 75, x2= 370, y2= 75, color= '#a0a0a0'),
        49 : new Line(x1= 391, y1= 40, x2= 391, y2= 75, color= '#a0a0a0'),
        50 : new Line(x1= 208, y1= 158, x2= 302, y2= 158, color= '#a0a0a0'),
        51 : new Line(x1= 600, y1= 158, x2= 822, y2= 158, voltage= '132'),


        52 : new Line(x1= 153, y1= 87, x2= 153, y2= 221, voltage= '132'),
        53 : new Line(x1= 153, y1= 221, x2= 288, y2= 221, voltage= '132'),
        54 : new Line(x1= 288, y1= 221, x2= 288, y2= 251, voltage= '132'),
        55 : new Line(x1= 288, y1= 251, x2= 288, y2= 278, voltage= '132'),
        56 : new Line(x1= 288, y1= 278, x2= 430, y2= 278, color= '#a0a0a0'),
        57 : new Line(x1= 430, y1= 278, x2= 430, y2= 301, color= '#a0a0a0'),
        58 : new Line(x1= 399, y1= 301, x2= 541, y2= 301, color= '#a0a0a0'),
        59 : new Line(x1= 452, y1= 301, x2= 452, y2= 343, color= '#a0a0a0'),
        60 : new Line(x1= 495, y1= 301, x2= 495, y2= 343, color= '#a0a0a0'),
        61 : new Line(x1= 516, y1= 278, x2= 516, y2= 301, color= '#a0a0a0'),
        62 : new Line(x1= 516, y1= 278, x2= 587, y2= 278, color= '#a0a0a0'),
        63 : new Line(x1= 587, y1= 278, x2= 641, y2= 278, voltage= '132'),
        64 : new Line(x1= 641, y1= 251, x2= 641, y2= 278, voltage= '132'),
        65 : new Line(x1= 245, y1= 251, x2= 704, y2= 251, voltage= '132'),
        66 : new Line(x1= 641, y1= 186, x2= 641, y2= 251, voltage= '132'),
        67 : new Line(x1= 641, y1= 186, x2= 723, y2= 186, voltage= '132'),
        68 : new Line(x1= 723, y1= 87, x2= 723, y2= 186, voltage= '132'),
        69 : new Line(x1= 33, y1= 191, x2= 153, y2= 191, voltage= '132'),
        // Step 4.1 B12 - south, west, south, south
        70 : new Line(x1= 168, y1= 350, x2= 168, y2= 487, voltage= '132')

    },
    breakers:{
        0: new Breaker(0, 0.61, 6, "open", [1]),
        1: new Breaker(0, 0.2, 6, "open", [1]),
        2: new Breaker(0,0.1,6,"closed", []),
        3: new Breaker(3,0.25,6,"open", []),
        4: new Breaker(4,0.1,6,"open",[3]),
        5: new Breaker(4,0.9,6,"open",[2]),
        6: new Breaker(6,0.24,6,"closed",[]),
        7: new Breaker(10,0.24,6,'open',[11]),
        8: new Breaker(12,0.5,6,'closed',[]),
        9: new Breaker(13,0.5,6,'open',[]),
        10: new Breaker(14,0.4,6,'closed',[]),
        11: new Breaker(16,0.5,6,'closed',[10]),
        12: new Breaker(15,0.4,6,'closed',[]),
        13: new Breaker(18,0.24,6,'open',[11]),
        14: new Breaker(19,0.24,6,"open",[7]),
        15: new Breaker(21,0.9,6,"closed",[]),
        16: new Breaker(70,0.15,6,"open",[]),
        17: new Breaker(23,0.15,6,"closed",[]),
        18: new Breaker(23,0.85,6,"closed",[]),
        19: new Breaker(25,0.1,6,"open",[8]),
        20: new Breaker(25,0.3,6,"open",[9]),
        21: new Breaker(25,0.8,6,"open",[9]),
        22: new Breaker(26,0.15,6,"open",[]),
        23: new Breaker(26,0.86,6,"closed",[]),
        24: new Breaker(28,0.25,6,"closed",[]),
        25: new Breaker(32,0.25,6,"closed",[]),
        26: new Breaker(32,0.75,6,"closed",[]),
        27: new Breaker(33,0.45,6,"closed",[]),
        28: new Breaker(33,0.55,6,"closed",[]),
        29: new Breaker(34,0.5,6,"closed",[]),
        30: new Breaker(35,0.3,6,"closed",[]),
        31: new Breaker(36,0.3,6,"closed",[]),
        32: new Breaker(37,0.3,6,"open",[]),
        33: new Breaker(37,0.7,6,"closed",[]),
        34: new Breaker(39,0.4,6,"closed",[]),
        35: new Breaker(39,0.6,6,"closed",[]),
        36: new Breaker(41,0.5,6,"open",[]),
        37: new Breaker(42,0.1,6,"open",[4]),
        38: new Breaker(42,0.9,6,"closed",[0]),
        39: new Breaker(44,0.10,6,"open",[5]),
        40: new Breaker(44,0.25,6,"open",[6]),
        41: new Breaker(44,0.8,6,"open",[6]),
        42: new Breaker(52,0.1,6,"open",[]),
        43: new Breaker(55,0.5,6,"closed",[]),
        44: new Breaker(57,0.5,6,"closed",[]),
        45: new Breaker(58,0.5,6,"open",[]),
        46: new Breaker(59,0.5,6,"closed",[]),
        47: new Breaker(60,0.5,6,"closed",[]),
        48: new Breaker(61,0.5,6,"closed",[]),
        49: new Breaker(68,0.15,6,"open",[]),
      },
    text:{
    0: new Text(1, ["Steven's Croft"], [10, -15]),
    1: new Text(9, ["Chapelcross Grid", "33kV Busbar"],[ 0, -25]),
    2: new Text(41,["Langholm"],[10,-15])
    },
    tx:{
    0: new Tx(5,0.9,"test","starDelta")

    }
  }
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

"LOCKERBIE13":StraightLine([265,400],"down",245),

//Middlebie
"M12": StraightLine([95,525],"down",50),
"Middlebie": StraightLine([65,575],"right",175),
"M13": StraightLine([80,575],"down",160),
"M14": StraightLine([160,575],"down",190),
"M11": StraightLine([205,575],"down",120),

"into EWE HILL 1": StraightLine([80,735],"left",50),
"into EWE HILL 2": StraightLine([30,735],"down",150),
"into EWE HILL 3": StraightLine([30,885],"right",30),
"EH12": StraightLine([60,885],"up",80),
"EWE HILL": StraightLine([45,805],"right",85),
"EH11": StraightLine([115,805],"down",90),

"Middlebie Primary Transformer": StraightLine([205,695],"right",25),
"MP10": StraightLine([230,695],"right",50),
"intoMP": StraightLine([275,730],"up",35),
"MP": StraightLine([260,730],"right",85),

"into Langholm 1": StraightLine([160,765],"right",150),
"Langholm 33kv": StraightLine([300,790],"right",310),
"into Langholm 2": StraightLine([310,765],"down",90),
"Langholm tx 33kV": StraightLine([310,855],"right",35),
"Langholm10": StraightLine([395,855],"left",50),
"Langholm 11kV 1": StraightLine([395,855],"down",35),
"Langholm01": StraightLine([365,890],"right",100),
"Langholm 11kV 2": StraightLine([445,855],"down",35),
"Langholm20": StraightLine([445,855],"right",35),
"Langholm Tx2": StraightLine([525,855],"left",35),

"Langholm to gretna 1": StraightLine([525,855],"up",175),
"Langholm to gretna 2": StraightLine([525,680],"right",90),
"Langholm to gretna 3": StraightLine([615,680],"up",300),

"ANNAN10": StraightLine([340,280],"left",50),
"into 662 1": StraightLine([340,280],"down",35),
"662 01": StraightLine([310,315],"right",105),
"into 662 2": StraightLine([385,280],"down",35),
"ANNAN20": StraightLine([385,280],"right",50),

"698 23 into Annan": StraightLine([435,280],"right",265),

"698 21 into gretna 1": StraightLine([570,380],"right",45),

"KIRKBANK T": StraightLine([265,550],"right",75),
"MOFFAT T1": StraightLine([265,645],"right",75),

"KIRKBANK10": StraightLine([390,550],"left",50),
"KIRKBANK 1": StraightLine([390,550],"down",35),
"KIRKBANK":StraightLine([360,585],"right",85),

"MOFFAT10": StraightLine([390,640],"left",50),
"MOFFAT 1": StraightLine([390,640],"down",35),
"MOFFAT01": StraightLine([360,675],"right",100),
"MOFFAT 2": StraightLine([440,640],"down",35),
"MOFFAT20": StraightLine([440,640],"right",50),

"GRETNA 1": StraightLine([615,535],"right",30),
"GRETNA 2": StraightLine([645,535],"up",150),
"GRETNA 691": StraightLine([630,385],"right",245),
"GRETNA 3": StraightLine([655,460],"up",75),
"GRETNA T1": StraightLine([655,460],"right",35),
"GRETNA T2": StraightLine([865,460],"left",35),
"GRETNA 6":StraightLine([865,460],"up",75),

//GRETNA 33kV
"673 10": StraightLine([735,460],"left",50),
"GRETNA 4": StraightLine([735,460],"down",35),
"673 01": StraightLine([705,496],"right",100),
"GRETNA 5": StraightLine([785,460],"down",35),
"673 20": StraightLine([785,460],"right",50),

"694 12": StraightLine([305,455],"up",55),
"694 22": StraightLine([515,455],"up",55),

"LOCKERBIE T1": StraightLine([305,455],"right",35),
"679 10": StraightLine([340,455],"right",50),
"LOCKERBIE 1": StraightLine([390,455],"down",35),
"679 01": StraightLine([360,490],"right",100),
"LOCKERBIE 2": StraightLine([435,455],"down",35),
"679 20": StraightLine([435,455],"right",50),
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
    "699 CHAP": new Breaker("698 15",0.60,"closed"),
    "SC generator Breaker": new Breaker("698 15",0.85,"open"),
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

    //CB W/Arc

    "M12": new Breaker("M12",0.5,"closed"),
    "M13": new Breaker("M13",0.1,"closed"),
    "M14": new Breaker("M14",0.08,"closed"),
    "M11": new Breaker("M11",0.12,"closed"),

    "EH12": new Breaker("EH12",0.65,"closed"),
    "EH11": new Breaker("EH11",0.3,"closed"),

    "MP10": new Breaker("MP10",0.6,"closed"),

    "LH10": new Breaker("Langholm10",0.3,"closed"),
    "LH01": new Breaker("Langholm01",0.55,"closed"),
    "LH20": new Breaker("Langholm20",0.4,"closed"),

    "A10": new Breaker("ANNAN10",0.3,"closed"),
    "662 01": new Breaker("662 01",0.55,"closed"),
    "A20": new Breaker("ANNAN20",0.3,"closed"),

    "L13": new Breaker("LOCKERBIE13",0.1,"closed"),

    "KB10": new Breaker("KIRKBANK10",0.3,"closed"),

    "683 10": new Breaker("MOFFAT10",0.3,"closed"),
    "683 01": new Breaker("MOFFAT01", 0.55,"closed"),
    "683 20": new Breaker("MOFFAT20", 0.3,"closed"),

    "694 12": new Breaker("694 12", 0.5,"closed"),
    "694 22": new Breaker("694 22", 0.5),

    "679 10": new Breaker("679 10", 0.7),
    "679 01": new Breaker("679 01",0.55),
    "679 20": new Breaker("679 20",0.3),

    "673 10": new Breaker("673 10",0.25),
    "673 01": new Breaker("673 01",0.55),
    "673 20": new Breaker("673 20",0.25),

    "761 CHAP": new Breaker("761 CHAP",0.55),
    "761 WINDFARM": new Breaker("761 WINDFARM",1),
    "761 CUSTOMER": new Breaker("761 CUSTOMER",0),

    "123 10": new Breaker("123 10",0.25),
    "123 12": new Breaker("123 12",0.7),

    "785 21": new Breaker("785 21",0.86),
    "785 22": new Breaker("785 22",0.15),
    "785 CUSTOMER BREAKER": new Breaker("785 22",0.5,"open"),

    },
tx:{
    0: new Tx("into GRID 2 tx",1,"",type="starDelta"),
    1: new Tx("GRID 2",1,"GRID T2",type="starDelta"),
    2: new Tx("GRID 1",1,"GRID T1",type="starDelta"),
    3: new Tx("into DAR tx",1,"",type="starDelta"),
    5: new Tx("Middlebie Primary Transformer",1,"Middlebie Primary", type="starDelta"),
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

    17: new Tx("NEWCASTLETON T1",1,"T1"),
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
        "DUMF-1 A":StraightLine([595,470],"left",40, "132kV"),
        "DUMF-1": StraightLine([595,470],"up",290, "132kV"),

    "336 330 334": StraightLine([400,370],"down",200,"132kV"),

    "506": StraightLine([320,370],"down",100,"132kV"),
    "504": StraightLine([320,470],"down",100,"132kV"),
        "GRNA-2 A":StraightLine([360,470],"left",40, "132kV"),
        "GRNA-2": StraightLine([360,470],"up",290, "132kV"),


    "716": StraightLine([240,370],"down",100,"132kV"),
    "714": StraightLine([240,470],"down",100,"132kV"),
        "710": StraightLine([285,465],"down",225,"132kV"),
        "710 A": StraightLine([285,465],"left",45,"132kV"),

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
        "120": new Breaker("M1",0.5,"closed"),
        "330": new Breaker("336 330 334",0.5,"closed"),
        "500:":new Breaker("DUMF-1",0.5),
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

}

dict_components = chapelcross_132kV

dict_steps_components = {
    '1_1': {
      lines: [
        // STEP 1
        {
          x1: 72, y1: 256, x2: 72, y2: 420, voltage: '132'
        },
        {
          x1: 46, y1: 256, x2: 149, y2: 256, voltage: '132'
        },
        {
          x1: 40, y1: 301, x2: 72, y2: 301, voltage: '132'
        },
        {
          x1: 40, y1: 301, x2: 40, y2: 335, voltage: '132'
        },
        {
          x1: 57, y1: 87, x2: 57, y2: 256, voltage: '132'
        },
        {
          x1: 118, y1: 256, x2: 118, y2: 310, dash: true, color: '#a0a0a0'
        },
        {
          x1: 140, y1: 256, x2: 140, y2: 310, color: '#a0a0a0'
        },
        {
          x1: 95, y1: 297, x2: 118, y2: 297, color: '#a0a0a0'
        },
        {
          x1: 118, y1: 256, x2: 118, y2: 270, color: '#a0a0a0'
        },
        // STEP 2
        {
          x1: 40, y1: 88, x2: 1133, y2: 88, voltage: '132'
        },
        {
          x1: 94, y1: 88, x2: 94, y2: 158, voltage: '132'
        },
        {
          x1: 94, y1: 158, x2: 208, y2: 158, voltage: '132'
        },
        // Step 5C B13 south, east, SOUTH
        {
          x1: 302, y1: 158, x2: 302, y2: 182, color: '#a0a0a0'
        },
        {
          x1: 271, y1: 182, x2: 412, y2: 182, color: '#a0a0a0'
        },
        // 10-15
        {
          x1: 320, y1: 182, x2: 320, y2: 223, color: '#a0a0a0'
        },
        // 21-26
        {
          x1: 372, y1: 182, x2: 372, y2: 223, color: '#a0a0a0'
        },
        // Step 5C B23 south, west, south
        {
          x1: 387, y1: 158, x2: 387, y2: 182, color: '#a0a0a0'
        },
        // Step 5C B23 south, west
        {
          x1: 387, y1: 158, x2: 600, y2: 158, color: '#a0a0a0'
        },
        // Step 5C B23 south
        {
          x1: 822, y1: 88, x2: 822, y2: 158, voltage: '132'
        },
        // Step 4.1 B12 - south
        {
          x1: 491, y1: 88, x2: 491, y2: 138, voltage: '132'
        },
        // Step 4.1 B12 - south, west
        {
          x1: 168, y1: 138, x2: 491, y2: 138, voltage: '132'
        },
        // Step 4.1 B12 - south, west, south
        {
          x1: 168, y1: 138, x2: 168, y2: 350, voltage: '132'
        },
        // BB780 - Middlebie
        {
          x1: 98, y1: 350, x2: 240, y2: 350, voltage: '132'
        },
        {
          x1: 110, y1: 350, x2: 110, y2: 500, voltage: '132'
        },
        {
          x1: 95, y1: 500, x2: 140, y2: 500, voltage: '132'
        },
        {
          x1: 126, y1: 500, x2: 126, y2: 600, voltage: '132'
        },
        {
          x1: 188, y1: 350, x2: 188, y2: 425, voltage: '132'
        },
        {
          x1: 180, y1: 425, x2: 235, y2: 425, voltage: '132'
        },
        {
          x1: 225, y1: 425, x2: 225, y2: 460, voltage: '132'
        },
        {
          x1: 168, y1: 487, x2: 225, y2: 487, voltage: '132'
        },
        {
          x1: 225, y1: 487, x2: 225, y2: 542, voltage: '132'
        },
        {
          x1: 225, y1: 542, x2: 389, y2: 542, voltage: '132'
        },
        {
          x1: 389, y1: 542, x2: 389, y2: 625, voltage: '132'
        },
        {
          x1: 268, y1: 625, x2: 389, y2: 625, voltage: '132'
        },
        {
          x1: 370, y1: 582, x2: 520, y2: 582, voltage: '132'
        },
        {
          x1: 420, y1: 582, x2: 420, y2: 620, voltage: '132'
        },
        {
          x1: 470, y1: 582, x2: 470, y2: 620, voltage: '132'
        },
        {
          x1: 495, y1: 542, x2: 495, y2: 625, voltage: '132'
        },
        {
          x1: 495, y1: 542, x2: 625, y2: 542, voltage: '132'
        },
        {
          x1: 495, y1: 625, x2: 625, y2: 625, voltage: '132'
        },
        {
          x1: 625, y1: 505, x2: 625, y2: 542, voltage: '132'
        },
        {
          x1: 200, y1: 505, x2: 650, y2: 505, voltage: '132'
        },
        // Step 3.1 B24
        {
          x1: 1106, y1: 87, x2: 1106, y2: 256, voltage: '132'
        },
        {
          x1: 1080, y1: 256, x2: 1150, y2: 256, voltage: '132'
        },
        {
          x1: 1130, y1: 256, x2: 1130, y2: 380, voltage: '132'
        },

        {
          x1: 356, y1: 20, x2: 356, y2: 88, color: '#a0a0a0'
        },
        {
          x1: 335, y1: 31, x2: 356, y2: 31, color: '#a0a0a0'
        },
        {
          x1: 356, y1: 75, x2: 400, y2: 75, dash: true, color: '#a0a0a0'
        },
        {
          x1: 356, y1: 75, x2: 370, y2: 75, color: '#a0a0a0'
        },
        {
          x1: 391, y1: 40, x2: 391, y2: 75, color: '#a0a0a0'
        },
        {
          x1: 208, y1: 158, x2: 302, y2: 158, color: '#a0a0a0'
        },
        {
          x1: 600, y1: 158, x2: 822, y2: 158, voltage: '132'
        },


        {
          x1: 153, y1: 87, x2: 153, y2: 221, voltage: '132'
        },
        {
          x1: 153, y1: 221, x2: 288, y2: 221, voltage: '132'
        },
        {
          x1: 288, y1: 221, x2: 288, y2: 251, voltage: '132'
        },
        {
          x1: 288, y1: 251, x2: 288, y2: 278, voltage: '132'
        },
        {
          x1: 288, y1: 278, x2: 430, y2: 278, color: '#a0a0a0'
        },
        {
          x1: 430, y1: 278, x2: 430, y2: 301, color: '#a0a0a0'
        },
        {
          x1: 399, y1: 301, x2: 541, y2: 301, color: '#a0a0a0'
        },
        {
          x1: 452, y1: 301, x2: 452, y2: 343, color: '#a0a0a0'
        },
        {
          x1: 495, y1: 301, x2: 495, y2: 343, color: '#a0a0a0'
        },
        {
          x1: 516, y1: 278, x2: 516, y2: 301, color: '#a0a0a0'
        },
        {
          x1: 516, y1: 278, x2: 587, y2: 278, color: '#a0a0a0'
        },
        {
          x1: 587, y1: 278, x2: 641, y2: 278, voltage: '132'
        },
        {
          x1: 641, y1: 251, x2: 641, y2: 278, voltage: '132'
        },
        {
          x1: 245, y1: 251, x2: 704, y2: 251, voltage: '132'
        },
        {
          x1: 641, y1: 186, x2: 641, y2: 251, voltage: '132'
        },
        {
          x1: 641, y1: 186, x2: 723, y2: 186, voltage: '132'
        },
        {
          x1: 723, y1: 87, x2: 723, y2: 186, voltage: '132'
        },
        {
          x1: 33, y1: 191, x2: 153, y2: 191, voltage: '132'
        },
        // Step 4.1 B12 - south, west, south, south
        {
          x1: 168, y1: 350, x2: 168, y2: 487, voltage: '132'
        },

      ],
      loads: [
      ],
      txs: [
      ],
      breakers: [
        new Breaker(0, 0.61, 6, "open", [1]),
        new Breaker(0, 0.2, 6, "open", [1]),
        new Breaker(0,0.1,6,"closed", []),
        new Breaker(3,0.25,6,"open", []),
        new Breaker(4,0.1,6,"open",[3]),
        new Breaker(4,0.9,6,"open",[2]),
        new Breaker(6,0.24,6,"closed",[]),
        new Breaker(10,0.24,6,'open',[11]),
        new Breaker(12,0.5,6,'closed',[]),
        new Breaker(13,0.5,6,'open',[]),
        new Breaker(14,0.4,6,'closed',[]),
        new Breaker(16,0.5,6,'closed',[10]),
        new Breaker(15,0.4,6,'closed',[]),
        new Breaker(18,0.24,6,'open',[11]),
        new Breaker(19,0.24,6,"open",[7]),
        new Breaker(21,0.9,6,"closed",[]),
        new Breaker(70,0.15,6,"open",[]),
        new Breaker(23,0.15,6,"closed",[]),
        new Breaker(23,0.85,6,"closed",[]),
        new Breaker(25,0.1,6,"open",[8]),
        new Breaker(25,0.3,6,"open",[9]),
        new Breaker(25,0.8,6,"open",[9]),
        new Breaker(26,0.15,6,"open",[]),
        new Breaker(26,0.86,6,"closed",[]),
        new Breaker(28,0.25,6,"closed",[]),
        new Breaker(32,0.25,6,"closed",[]),
        new Breaker(32,0.75,6,"closed",[]),
        new Breaker(33,0.45,6,"closed",[]),
        new Breaker(33,0.55,6,"closed",[]),
        new Breaker(34,0.5,6,"closed",[]),
        new Breaker(35,0.3,6,"closed",[]),
        new Breaker(36,0.3,6,"closed",[]),
        new Breaker(37,0.3,6,"open",[]),
        new Breaker(37,0.7,6,"closed",[]),
        new Breaker(39,0.4,6,"closed",[]),
        new Breaker(39,0.6,6,"closed",[]),
        new Breaker(41,0.5,6,"open",[]),
        new Breaker(42,0.1,6,"open",[4]),
        new Breaker(42,0.9,6,"closed",[0]),
        new Breaker(44,0.10,6,"open",[5]),
        new Breaker(44,0.25,6,"open",[6]),
        new Breaker(44,0.8,6,"open",[6]),
        new Breaker(52,0.1,6,"open",[]),
        new Breaker(55,0.5,6,"closed",[]),
        new Breaker(57,0.5,6,"closed",[]),
        new Breaker(58,0.5,6,"open",[]),
        new Breaker(59,0.5,6,"closed",[]),
        new Breaker(60,0.5,6,"closed",[]),
        new Breaker(61,0.5,6,"closed",[]),
        new Breaker(68,0.15,6,"open",[]),
      ],
      labels: [
      ],
      generators: [
      ],
    }
  }

  components = {
    breakers: [],
    lines: [],
    text:[]
  }

  var bNodes = false

  var idx_line, temp_dict
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
    temp_dict.o_line = draw.line(temp_dict.x1, temp_dict.y1,
                                  temp_dict.x2, temp_dict.y2).stroke(temp_dict.dict_styling.stroke)

    temp_dict.line_idx = idx_line

    if (bNodes){
      add_nodes(temp_dict, temp_dict.o_line)
    }

    dict_components.lines[idx_line] = temp_dict
    components.lines[idx_line] = {initInfo:temp_dict, UIElement: temp_dict.o_line}
  }
//  dict_components.txs = []

    //add breakers
  for(let i in dict_components.breakers){
    //doing this means the inital data, and the SVG elements they make remain unchanged at all times. may be very useful should a redraw/reset be needed...
    //define listener handles now since they have access to everything relevant
    let breaker = dict_components.breakers[i]
    let line = dict_components.lines[breaker.lineID]
    let size = breaker.size
    let pos = breaker.pos
    let state = breaker.state
    console.log(state)
    let bcallback = breaker.callback
    add_breaker(line,pos,size,state,bcallback)
    let id = i
    closed = state==="closed"
    let b = {initInfo:breaker, UIElement: breaker.graphic[0], closed: closed, id : id}
    b.setState = function(closed){
        rect = components.breakers[id].UIElement
        this.closed = closed
        if (closed == false){
            rect.fill({ color: 'black' })
            rect.stroke({ color: 'white' })
        } else if (closed == true){
            rect.fill({ color: 'white' })
            rect.stroke({ color: 'white' })
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

  for(i in dict_components.text){
    text = dict_components.text[i]
    line_id = text.lineID
    line = components.lines[line_id].UIElement
    console.log(line)

    texts = text.text_strings
    offset = text.offset
    add_text(line,false,texts, offset[0],offset[1],text.callback)
    let id = i
    let t = {initInfo:text, UIElement: text.graphic[0], id : id}
    components.lines[id] = t
    }

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