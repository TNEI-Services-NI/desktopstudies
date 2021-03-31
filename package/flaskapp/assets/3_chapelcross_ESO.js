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


function Breaker(lineID, pos, size=6, state = false, stages = []){
    this.lineID = lineID
    this.pos = pos
    this.size = size
    this.state = state
    this.stages = stages
    this.graphic = []
    this.callback = Breaker_Callback(stages,this.graphic)
}

function Line(x1, y1,x2, y2, voltage="132", dash = false, colour = "#ffffff"){
    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
    this.voltage = voltage
    this.callback = 0
    this.dash = dash
    this.colour=colour
}

function StraightLine(origin, direction, length, voltage="132", dash = false, colour = "#ffffff"){
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

function RelativeLine(line,pos,direction,length, voltage="132", dash = false, colour = "#ffffff"){
    x1 = line.x1,
    y1 = line.y1,
    x2 = line.x2,
    y2 = line.y2,

    xo = x1 + x2/pos
    yo = y1 + y2/pos

    return StraightLine([x0,y0],direction,length,voltage,dash,colour)

}

function Text(lineID, text, offset){
    this.lineID = lineID
    this.text_strings = text
    this.offset = offset
    this.graphic = []
    this.callback = Text_Callback(this.graphic)
}

function Tx(lineID,pos,name,type="starDelta"){
    this.lineID =lineID
    this.pos = pos
    this.name = name
    this.graphic = []
    this.type = type
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
chapelcross_GSP_33kV = {lines:{}}
//1550 x 1160 in mm
//scale of 1000 x 1000, readjust with math...
chapelcross_GSP_33kV = {
lines:{
"Solway Bank": StraightLine([890,30],"right",130),


0: StraightLine([20,175], "right",900),
"698 16": StraightLine([35,175], "down",100),
"698 15": StraightLine([85,175], "down",100),
"698 14": StraightLine([145,175],"down",100),
"698 13": StraightLine([250,175],"down",100),
"698 12": StraightLine([330,175],"up",100),
"698 11": StraightLine([415,175],"down",100),
7: StraightLine([475,175],"down",100),
8: StraightLine([570,175],"down",100),
9: StraightLine([625,175],"down",100),
10: StraightLine([670,175],"up",100),
11: StraightLine([700,175],"down",100),
12: StraightLine([780,175],"down",100),
13: StraightLine([840,175],"down",100),
14: StraightLine([900,175],"down",100),


}

}


dict_components = chapelcross_GSP_33kV

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
    let bcallback = breaker.callback
    add_breaker(line,pos,size,state,bcallback)
    let id = i

    let b = {initInfo:breaker, UIElement: breaker.graphic[0], closed: closed, id : id}
    b.setState = function(closed){
        this.closed = closed
        if (closed == false){
            dict_line.dict_styling.fill.color = 'black'
            dict_line.dict_styling.stroke.color = 'white'
        } else if (closed == true){
            dict_line.dict_styling.fill.color = 'white'
            dict_line.dict_styling.stroke.color = 'white'
      }
    }
    b.UIElement.on("breaker_clicked",function(event){
        let breaker = components.breakers[id]
        breaker.closed=!breaker.closed
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
  add_tx(dict_components.lines[11], 1, 'deltaStar', function(c1, c2, c3, c4, group){
    buttonA_greenObject(12, c1)
    buttonA_greenObject(12, c2)
    buttonA_greenObject(12, c3)
    buttonA_greenObject(12, c4)
    add_text(group, false, ["33/11.5kV"], 0, 30, function(object){
      return 0
    });
    eventMouse(group, "Transformer", "ANANT1_ANAN10_T1");
  });
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