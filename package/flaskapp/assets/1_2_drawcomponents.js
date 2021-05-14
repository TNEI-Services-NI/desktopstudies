/**
/**
 * draws a Transformer
 * @param  {SVG Line} svg line which the transformer is drawn on
 * @param  {double} position of transformer on line (between 0 and 1)
 * @param  {String} type of transformer
 * @param  {list} voltage levels of coils, [coil 1. coil 2]
 * @return {callback} a callback which takes the created generator group as an argument
 * @return {None}
 */
function draw_tx(dict_line, tx){
var rad = 10 * Math.min(x_scaling,y_scaling)
var overlapFactor = 0.25
var circleWidth = 1

let position = tx.pos
let type = tx.type
let coils = [dict_line.voltage,tx.coil2]
let callback = tx.callback
let live = tx.live

var bVertical = false
var bHorizontal = false
var line1, line2, line3, line4

var group = draw.group();

var dict_tx = {}

if (dict_line.x1 === dict_line.x2){
  bVertical = true
}
if (dict_line.y1 === dict_line.y2){
  bHorizontal = true
}

if (bVertical){
  var fromCenter = [dict_line.x1, rad*(1-overlapFactor)+dict_line.y1+(dict_line.y2-dict_line.y1)*position]
  var toCenter = [dict_line.x1, -rad*(1-overlapFactor)+dict_line.y1+(dict_line.y2-dict_line.y1)*position]
}
if (bHorizontal){
  var fromCenter = [-rad*(1-overlapFactor)+dict_line.x1+(dict_line.x2-dict_line.x1)*position, dict_line.y1]
  var toCenter = [rad*(1-overlapFactor)+dict_line.x1+(dict_line.x2-dict_line.x1)*position, dict_line.y1]
}
// alert(live);
if(live === false){
  coils = ["0V", "0V"]
}

if(coils !== undefined){
    secondaryCoil = palette[coils[1]]
    primaryCoil = palette[coils[0]]
}
else{
    primaryCoil = dict_line.dict_styling.stroke.color
    secondaryCoil = dict_line.dict_styling.stroke.color
}
circle1 = draw.circle(2*rad).center(fromCenter[0], fromCenter[1])
circle2 = draw.circle(2*rad).center(toCenter[0], toCenter[1])
circle3 = draw.circle(2*rad).center(fromCenter[0], fromCenter[1])
circle4 = draw.circle(2*rad).center(toCenter[0], toCenter[1])
circle1.fill(palette["background-color"])
circle1.stroke({ color: secondaryCoil, width: circleWidth, linecap: 'white', linejoin: 'round' })
circle2.fill(palette["background-color"])
circle2.stroke({ color: primaryCoil, width: circleWidth, linecap: 'white', linejoin: 'round' })
circle3.fill('none')
circle3.stroke({ color: secondaryCoil, width: circleWidth, linecap: 'white', linejoin: 'round' })
circle4.fill('none')
circle4.stroke({ color: primaryCoil, width: circleWidth, linecap: 'white', linejoin: 'round' })

dict_line.dict_styling.stroke.dasharray = []
dict_line.dict_styling.stroke.width = circleWidth

// circle1.stroke(dict_line.dict_styling.stroke)
// circle2.stroke(dict_line.dict_styling.stroke)
// circle3.stroke(dict_line.dict_styling.stroke)
// circle4.stroke(dict_line.dict_styling.stroke)


dict_tx.objects = [circle1, circle2, circle3, circle4]
// alert(dict_tx.objects)
// console.log(type)
if (type == 'starDelta' | type == 'deltaStar'){

  if (type === 'starDelta' & bVertical){
  starCenter = [fromCenter[0], fromCenter[1]-rad*0.1]
  deltaCenter = [toCenter[0], toCenter[1]+rad*0.3]
  }
  else if (type === 'deltaStar' & bVertical){
    starCenter = [toCenter[0], toCenter[1]+rad*0.3]
    deltaCenter = [fromCenter[0], fromCenter[1]-rad*0.1]
  }
  else if (type === 'starDelta' & bHorizontal){
  starCenter = [fromCenter[0]-rad*0.2, fromCenter[1]]
  deltaCenter = [toCenter[0]+rad*0.2, toCenter[1]]
  }
  else if (type === 'deltaStar' & bHorizontal){
    starCenter = [toCenter[0]+rad*0.2, toCenter[1]]
    deltaCenter = [fromCenter[0]-rad*0.2, fromCenter[1]]
  }

  // STAR SYMBOL
  starCenterX = starCenter[0]
  starCenterY = starCenter[1]
  starLength = rad*0.6
  stemLength = rad*0.4
  starTopY = starCenterY-starLength
  starBottomRightX = starCenterX+0.866*starLength
  starBottomRightY = starCenterY+0.5*starLength
  starBottomLeftX = starCenterX-0.866*starLength
  starBottomLeftY = starCenterY+0.5*starLength

  starLine1 = draw.line(starCenterX, starCenterY,
            starCenterX+stemLength, starCenterY).stroke({ width: 0.5})
            // console.log(starLine1)
            // console.log(starCenter)
  starLine2 = draw.line(starCenterX, starCenterY,
            starCenterX, starTopY).stroke({ width: 1})
  starLine3 = draw.line(starCenterX, starCenterY,
            starBottomRightX, starBottomRightY).stroke({ width: 1})
  starLine4 = draw.line(starCenterX, starCenterY,
            starBottomLeftX, starBottomLeftY).stroke({ width: 1})

  // DELTA SYMBOL
  deltaCenterX = deltaCenter[0]
  deltaCenterY = deltaCenter[1]
  deltaLength = rad*0.6
  deltaTopY = deltaCenterY-deltaLength
  deltaBottomRightX = deltaCenterX+0.866*deltaLength
  deltaBottomRightY = deltaCenterY+0.5*deltaLength
  deltaBottomLeftX = deltaCenterX-0.866*deltaLength
  deltaBottomLeftY = deltaCenterY+0.5*deltaLength

  deltaLine1 = draw.line(deltaCenterX, deltaTopY,
            deltaBottomRightX, deltaBottomRightY).stroke({ width: 1})
  deltaLine2 = draw.line(deltaBottomRightX, deltaBottomRightY,
            deltaBottomLeftX, deltaBottomLeftY).stroke({ width: 1})
  deltaLine3 = draw.line(deltaBottomLeftX, deltaBottomLeftY,
              deltaCenterX, deltaTopY).stroke({ width: 1})

  dict_tx.objects += [starLine1, starLine2, starLine3, starLine4, deltaLine1, deltaLine2, deltaLine3]
group.add(starLine1, starLine2, starLine3, starLine4, deltaLine1, deltaLine2, deltaLine3)

}


group.add(circle1)
group.add(circle2)
group.add(circle3)
group.add(circle4)
group.horizontal = bHorizontal
callback(group);
}

/**
 * draws a Generator
 * @param  {SVG Line} svg line which the generator is drawn on
 * @param  {double} position of generator on line (between 0 and 1)
 * @param  {String} type of generator
 * @return {callback} a callback which takes the created generator as an argument
 * @return {None}
 */
function draw_gen(dict_line, position, type, callback){
var rad = 16 * Math.min(x_scaling,y_scaling);
var circleWidth = 1;

var bVertical = false;
var bHorizontal = false;
var circle1, circle2, circle3, circle4;
var line1, line2, line3, line4;

var dict_gen = {}

if (dict_line.x1 === dict_line.x2){
  bVertical = true;
  var center = [dict_line.x1, dict_line.y1+(dict_line.y2-dict_line.y1)*position];
}
if (dict_line.y1 === dict_line.y2){
  bHorizontal = true;
  var center = [dict_line.x1+(dict_line.x2-dict_line.x1)*position, dict_line.y1];
}

stroke_color = dict_line.dict_styling.stroke.color

var group = draw.group();
var inside_group = draw.group();
circle1 = group.circle(2*rad).addClass('circle-class');
group.add(circle1)
circle1.fill(palette["background-color"]);
circle1.stroke({ color: stroke_color, width: circleWidth, linecap: 'black', linejoin: 'round' });
if (type !== 'wind'){
  // var text = group.text(type)
  //               .font({size: 15, family: 'Helvetica'})
  //               .fill({color: 'white'})
  //               .center(0.5*circle1.width(), 0.4*circle1.height());

  // group.add(text);
  // inside_group.add(text);
}
if (type === 'wind'){
  starCenterX = center[0]
  starCenterY = center[1]
  starLength = rad*0.6
  stemLength = rad*0.4
  // starTopY = starCenterY-starLength
  // starBottomRightX = starCenterX+0.7*starLength
  // starBottomRightY = starCenterY+0.7*starLength
  // starBottomLeftX = starCenterX-0.7*starLength
  // starBottomLeftY = starCenterY+0.7*starLength

  starTopY = starCenterY-starLength
  starBottomRightX = starCenterX+0.866*starLength
  starBottomRightY = starCenterY+0.5*starLength
  starBottomLeftX = starCenterX-0.866*starLength
  starBottomLeftY = starCenterY+0.5*starLength

  // starLine1 = draw.line(starCenterX, starCenterY,
  //           starCenterX+stemLength, starCenterY).stroke({ width: 0.5})
  // starLine2 = draw.line(starCenterX, starCenterY,
  //           starCenterX, starTopY).stroke({ width: 1})
  // starLine3 = draw.line(starCenterX, starCenterY,
  //           starBottomRightX, starBottomRightY).stroke({ width: 1})
  // starLine4 = draw.line(starCenterX, starCenterY,
  //           starBottomLeftX, starBottomLeftY).stroke({ width: 1})

  var polygon1 = draw.polygon(String(starCenterX) + "," + String(starTopY) + " " +
                              String(starCenterX) + "," + String(starCenterY) + " " +
                              String(starBottomRightX) + "," + String(starBottomRightY) + " " +
                              String(starCenterX) + "," + String(starCenterY) + " " +
                              String(starBottomLeftX) + "," + String(starBottomLeftY) + " " +
                              String(starCenterX) + "," + String(starCenterY) + " " +
                              String(starCenterX) + "," + String(starTopY)).stroke({ width: 1});
  group.add(polygon1);
  inside_group.add(polygon1);
  var angle = 1
  window.setInterval(function(){
    polygon1.rotate(angle)
    angle += 1
  }, 10);//Refresh time in ms
}

group.move(center[0]-rad, center[1]-rad);

dict_gen.objects = [group]

callback(group)
}

/**
 * draws a breaker
 * @param  {SVG Line} svg line which the breaker is drawn on
 * @param  {double} position of breaker on line (between 0 and 1)
 * @param  {double} size of breaker
 * @param  {String} state of breaker
 * @return {callback} a callback which takes the created breaker as an argument
 * @return {None}
 */
function draw_breaker(dict_line, breaker){
  var bVertical = false;
  var bHorizontal = false;
  let position = breaker.pos
  let size = breaker.size * Math.min(x_scaling,y_scaling)
  let state = breaker.state
  let callback = breaker.callback
  let live_colour = breaker.colour
  let live = breaker.live
  let colour = undefined

  var dict_breaker = {}

  if (dict_line.x1 === dict_line.x2){
    bVertical = true;
    var center = [dict_line.x1, dict_line.y1+(dict_line.y2-dict_line.y1)*position];
  }
  if (dict_line.y1 === dict_line.y2){
    bHorizontal = true;
    var center = [dict_line.x1+(dict_line.x2-dict_line.x1)*position, dict_line.y1];
  }

  if(live_colour === undefined){
    live_colour = palette[dict_line.voltage]
  }
  if(live === true){
    colour = live_colour
  } else {
    colour = palette["0V"]
  }
  if (state === 'open'){
    rect1 = draw.rect(size, size).center(center[0], center[1]).fill(palette["background-color"]).stroke(colour).stroke({width: 1})
  }
  else if (state === 'closed'){
    // alert(colour)
    rect1 = draw.rect(size, size).center(center[0], center[1]).fill(colour).stroke(colour).stroke({width: 1})
  }
  else{
      rect1 = draw.rect(size, size).center(center[0], center[1]).fill("red").stroke("red").stroke({width: 1})
      rect1.horizontal = bHorizontal
      rect1.live_colour = live_colour
      dict_breaker.objects = [rect1];
      callback(rect1);
      return
    }

  rect1.click(function() {
    this.fire(breaker_clicked_event)
  });
  rect1.horizontal = bHorizontal
  dict_breaker.objects = [rect1];
  callback(rect1);
}

/**
 * draws an isolator
 * @param  {SVG Line} svg line which the isolator is drawn on
 * @param  {double} position of breaker on line (between 0 and 1)
 * @param  {double} size of isolator
 * @param  {String} state of isolator
 * @return {callback} a callback which takes the created isolator as an argument
 * @return {None}
 */
function draw_isolator(dict_line, isolator){
var bVertical = false;
var bHorizontal = false;
let position = isolator.pos
let size = isolator.size * Math.min(x_scaling,y_scaling)
let state = isolator.state
let callback = isolator.callback
let live_colour = isolator.colour
let live = isolator.live

var dict_breaker = {}

if (dict_line.x1 === dict_line.x2){
  bVertical = true;
  var center = [dict_line.x1, dict_line.y1+(dict_line.y2-dict_line.y1)*position];
}
if (dict_line.y1 === dict_line.y2){
  bHorizontal = true;
  var center = [dict_line.x1+(dict_line.x2-dict_line.x1)*position, dict_line.y1];
}
if(live_colour === undefined){
  live_colour = palette[dict_line.voltage]
}
if(live === true){
  colour = live_colour
} else {
  colour = palette["0V"]
}
if (state === 'open'){
  circle1 = draw.circle(size, size).center(center[0], center[1]).fill(palette["background-color"]).stroke(colour).stroke({width: 3})
}
if (state === 'closed'){
  circle1 = draw.circle(size, size).center(center[0], center[1]).fill(colour).stroke(colour).stroke({width: 1})
}

circle1.horizontal = bHorizontal
dict_breaker.objects = [circle1];
callback(circle1);
}

/**
 * draws an node
 * @param  {SVG Line} svg line which the node is drawn on
 * @return {None}
 */
function draw_nodes(dict_line, o_line){
var rad = 3
var txtSize = 9

var bVertical = false;
var bHorizontal = false;

if (dict_line.x1 === dict_line.x2){
  bVertical = true;
} else if (dict_line.y1 === dict_line.y2){
  bHorizontal = true;
}

var circle1 = draw.circle(2*rad).center(dict_line.x1, dict_line.y1).stroke(dict_line.dict_styling.stroke).fill(dict_line.dict_styling.fill)
var circle2 = draw.circle(2*rad).center(dict_line.x2, dict_line.y2).stroke(dict_line.dict_styling.stroke).fill(dict_line.dict_styling.fill)
var text1 = draw.text(dict_line.line_idx + ".1")
                .font({size: txtSize, family: 'Helvetica'})

var text2 = draw.text(dict_line.line_idx + ".2")
                .font({size: txtSize, family: 'Helvetica'})

if(bVertical){
  text1.x_coord = dict_line.x1
  text1.y_coord = dict_line.y1-10
  text2.x_coord = dict_line.x2
  text2.y_coord = dict_line.y2+10

  text1.position = "T"
  text2.position = "B"
}
if(bHorizontal){
  text1.x_coord = dict_line.x1-10
  text1.y_coord = dict_line.y1
  text2.x_coord = dict_line.x2+10
  text2.y_coord = dict_line.y2

  text1.position = "L"
  text2.position = "R"
}



text1.center(text1.x_coord, text1.y_coord);
text2.center(text2.x_coord, text2.y_coord);

text1.hide()
text2.hide()

text1.bVertical = bVertical
text1.bHorizontal = bHorizontal
text2.bVertical = bVertical
text2.bHorizontal = bHorizontal

o_line.click(function() {
  if (text1.visible() === false){
    text1.show()
    text2.show()
  } else {
    text1.hide()
    text2.hide()
  }

});

text1.click(function() {
  if (text1.position === "L"){
    text1.position = "T"
  } else if (text1.position === "R"){
    text1.position = "B"
  } else if (text1.position === "T"){
    text1.position = "R"
  } else if (text1.position === "B"){
    text1.position = "L"
  }
  if (text1.position === "L"){
    text1.center(text1.x_coord-10, text1.y_coord-10);
    text1.x_coord = text1.x_coord-10
    text1.y_coord = text1.y_coord-10
  } else if (text1.position === "T"){
    text1.center(text1.x_coord+10, text1.y_coord-10);
    text1.x_coord = text1.x_coord+10
    text1.y_coord = text1.y_coord-10
  } else if (text1.position === "R"){
    text1.center(text1.x_coord+10, text1.y_coord+10);
    text1.x_coord = text1.x_coord+10
    text1.y_coord = text1.y_coord+10
  } else if (text1.position === "B"){
    text1.center(text1.x_coord-10, text1.y_coord+10);
    text1.x_coord = text1.x_coord-10
    text1.y_coord = text1.y_coord+10
  }
});

text2.click(function() {
  if (text2.position === "L"){
    text2.position = "T"
  } else if (text2.position === "R"){
    text2.position = "B"
  } else if (text2.position === "T"){
    text2.position = "R"
  } else if (text2.position === "B"){
    text2.position = "L"
  }
  if (text2.position === "L"){
    text2.center(text2.x_coord-10, text2.y_coord-10);
    text2.x_coord = text2.x_coord-10
    text2.y_coord = text2.y_coord-10
  } else if (text2.position === "T"){
    text2.center(text2.x_coord+10, text2.y_coord-10);
    text2.x_coord = text2.x_coord+10
    text2.y_coord = text2.y_coord-10
  } else if (text2.position === "R"){
    text2.center(text2.x_coord+10, text2.y_coord+10);
    text2.x_coord = text2.x_coord+10
    text2.y_coord = text2.y_coord+10
  } else if (text2.position === "B"){
    text2.center(text2.x_coord-10, text2.y_coord+10);
    text2.x_coord = text2.x_coord-10
    text2.y_coord = text2.y_coord+10
  }
});
}

/**
 * draws an inductor
 * @param  {SVG Line} svg line which the inductor is drawn on
 * @param  {double} position of inductor on line (between 0 and 1)
 * @param  {double} length of inductor
 * @return {None}
 */
function draw_inductor(dict_line, position, length){
var rad = 2;
var circleWidth = 1

var bVertical = false;
var bHorizontal = false;
var circle1, circle2, circle3, circle4;
var line1, line2, line3, line4;
var rect1, rect2, rect3, rect4;

var dict_inductor = {}
if (dict_line.x1 === dict_line.x2){
  bVertical = true;
  var center = [dict_line.x1, dict_line.y1+(dict_line.y2-dict_line.y1)*position];
}
if (dict_line.y1 === dict_line.y2){
  bHorizontal = true;
  var center = [dict_line.x1+(dict_line.x2-dict_line.x1)*position, dict_line.y1];
}

if (bVertical){
  ellipse1 = draw.ellipse(2.4*rad, 1.9*rad).center(center[0], center[1]-3*rad).fill('white').stroke({ color: 'black', width: circleWidth, linecap: 'black', linejoin: 'round' })
  ellipse2 = draw.ellipse(2.4*rad, 1.9*rad).center(center[0], center[1]-rad).fill('white').stroke({ color: 'black', width: circleWidth, linecap: 'black', linejoin: 'round' })
  ellipse3 = draw.ellipse(2.4*rad, 1.9*rad).center(center[0], center[1]+rad).fill('white').stroke({ color: 'black', width: circleWidth, linecap: 'black', linejoin: 'round' })
  ellipse4 = draw.ellipse(2.4*rad, 1.9*rad).center(center[0], center[1]+3*rad).fill('white').stroke({ color: 'black', width: circleWidth, linecap: 'black', linejoin: 'round' })
  rect1 = draw.rect(2*rad, 2*rad).center(center[0]-rad, center[1]-3*rad).fill('white')
  rect2 = draw.rect(2*rad, 2*rad).center(center[0]-rad, center[1]-rad).fill('white')
  rect3 = draw.rect(2*rad, 2*rad).center(center[0]-rad, center[1]+rad).fill('white')
  rect4 = draw.rect(2*rad, 2*rad).center(center[0]-rad, center[1]+3*rad).fill('white')
} else if (bHorizontal){
  ellipse1 = draw.ellipse(2.4*rad, 1.9*rad).center(center[0], center[1]-3*rad).fill('white').stroke({ color: 'black', width: circleWidth, linecap: 'black', linejoin: 'round' })
  ellipse2 = draw.ellipse(2.4*rad, 1.9*rad).center(center[0], center[1]-rad).fill('white').stroke({ color: 'black', width: circleWidth, linecap: 'black', linejoin: 'round' })
  ellipse3 = draw.ellipse(2.4*rad, 1.9*rad).center(center[0], center[1]+rad).fill('white').stroke({ color: 'black', width: circleWidth, linecap: 'black', linejoin: 'round' })
  ellipse4 = draw.ellipse(2.4*rad, 1.9*rad).center(center[0], center[1]+3*rad).fill('white').stroke({ color: 'black', width: circleWidth, linecap: 'black', linejoin: 'round' })
  rect1 = draw.rect(2*rad, 2*rad).center(center[0]-rad, center[1]-3*rad).fill('white')
  rect2 = draw.rect(2*rad, 2*rad).center(center[0]-rad, center[1]-rad).fill('white')
  rect3 = draw.rect(2*rad, 2*rad).center(center[0]-rad, center[1]+rad).fill('white')
  rect4 = draw.rect(2*rad, 2*rad).center(center[0]-rad, center[1]+3*rad).fill('white')
}

dict_inductor.objects = [ellipse1, ellipse2, ellipse3, ellipse4, rect1, rect2, rect3, rect4]

return dict_inductor
}

/**
 * draws a resistor
 * @param  {SVG Line} svg line which the resistor is drawn on
 * @param  {double} position of resistor on line (between 0 and 1)
 * @param  {double} length of resistor
 * @param  {double} width of resistor
 * @return {None}
 */
function draw_resistor(dict_line, position, length, width){
var bVertical = false;
var bHorizontal = false;

var dict_resistor = {}

if (dict_line.x1 === dict_line.x2){
  bVertical = true;
  center = [dict_line.x1, dict_line.y1+(dict_line.y2-dict_line.y1)*position];
  rect1 = draw.rect(width, length).center(center[0], center[1]).fill('black').stroke(dict_line.dict_styling.stroke)
                                        .fill(dict_line.dict_styling.fill)
                                        .stroke({ width: 1})
}
if (dict_line.y1 === dict_line.y2){
  bHorizontal = true;
  center = [dict_line.x1+(dict_line.x2-dict_line.x1)*position, dict_line.y1];
  rect1 = draw.rect(length, width).center(center[0], center[1]).fill('black').stroke(dict_line.dict_styling.stroke)
                                        .fill(dict_line.dict_styling.fill)
                                        .stroke({ width: 1})
}

dict_resistor.objects = [rect1]
}

/**
 * draws a load
 * @param  {SVG Line} svg line which the load is drawn on
 * @param  {double} position of load on line (between 0 and 1)
 * @param  {boolean} flipped
 * @return {None}
 */
function draw_load(dict_line, position, flipped){
var rad = 6;
var bVertical = false;
var bHorizontal = false;
var center;

var dict_load = {}

if (dict_line.x1 === dict_line.x2){
  bVertical = true;
} else if (dict_line.y1 === dict_line.y2){
  bHorizontal = true;
  center = [dict_line.x1+(dict_line.x2-dict_line.x1)*position, dict_line.y1];
}
if (position === 0){
  center = [dict_line.x1, dict_line.y1];
} else if (position === 1){
  center = [dict_line.x2, dict_line.y2];
}

// DELTA SYMBOL
deltaCenterX = center[0]
deltaCenterY = center[1]
deltaLength = rad*0.6

if (flipped === false){
  delta1X = deltaCenterX
  delta1Y = deltaCenterY-deltaLength
  delta2X = deltaCenterX+0.866*deltaLength
  delta2Y = deltaCenterY+0.5*deltaLength
  delta3X = deltaCenterX-0.866*deltaLength
  delta3Y = deltaCenterY+0.5*deltaLength
} else {
  delta1X = deltaCenterX
  delta1Y = deltaCenterY+deltaLength
  delta2X = deltaCenterX+0.866*deltaLength
  delta2Y = deltaCenterY-0.5*deltaLength
  delta3X = deltaCenterX-0.866*deltaLength
  delta3Y = deltaCenterY-0.5*deltaLength
}
poly1 = draw.polygon(String(delta1X) + "," + String(delta1Y) + " " +
String(delta2X) + "," + String(delta2Y) + " " +
String(delta3X) + "," + String(delta3Y) + " " +
String(delta1X) + "," + String(delta1Y))

//poly1 = poly1.stroke(dict_line.attr().stroke)
//                                        .fill(dict_line.attr().stroke)
//                                        .stroke({ width: 1})
poly1.stroke(dict_line.o_line.attr().stroke)
poly1.fill(dict_line.o_line.attr().stroke)

if (bHorizontal){
  poly1.rotate(90)
}

dict_load.objects = [poly1]
}

/**
 * draws earth
 * @param  {SVG Line} svg line which earth is drawn on
 * @param  {double} position of load on line (between 0 and 1)
 * @param  {boolean} flipped
 * @return {None}
 */
function draw_earth(dict_line, position, flipped){
var rad = 4;
var bVertical = false;
var bHorizontal = false;
var center;

var dict_earth = {}

if (dict_line.x1 === dict_line.x2){
  bVertical = true;
} else if (dict_line.y1 === dict_line.y2){
  bHorizontal = true;
  center = [dict_line.x1+(dict_line.x2-dict_line.x1)*position, dict_line.y1];
}

if (position === 0){
  center = [dict_line.x1, dict_line.y1];
} else if (position === 1){
  center = [dict_line.x2, dict_line.y2];
}

// DELTA SYMBOL
deltaCenterX = center[0]
deltaCenterY = center[1]
deltaLength = rad*0.6

if (dict_line.dict_styling.stroke.color){
  var color = dict_line.dict_styling.stroke.color
} else {
  var color = "blacks"
}

if (bVertical){
  if (flipped === false){
    line1 = draw.line(deltaCenterX-rad*0.5, deltaCenterY-2*rad, deltaCenterX+rad*0.5, deltaCenterY-2*rad).stroke({ width: 1, color: color})
    line2 = draw.line(deltaCenterX-rad, deltaCenterY-rad, deltaCenterX+rad, deltaCenterY-rad).stroke({ width: 1, color: color})
    line3 = draw.line(deltaCenterX-rad*1.5, deltaCenterY, deltaCenterX+rad*1.5, deltaCenterY).stroke({ width: 1, color: color})
  } else {
    line1 = draw.line(deltaCenterX-rad*1.5, deltaCenterY, deltaCenterX+rad*1.5, deltaCenterY).stroke({ width: 1, color: color})
    line2 = draw.line(deltaCenterX-rad, deltaCenterY+rad, deltaCenterX+rad, deltaCenterY+rad).stroke({ width: 1, color: color})
    line3 = draw.line(deltaCenterX-rad*0.5, deltaCenterY+2*rad, deltaCenterX+rad*0.5, deltaCenterY+2*rad).stroke({ width: 1, color: color})
  }
} else if (bHorizontal){
  if (flipped === false){
    line1 = draw.line(deltaCenterX, deltaCenterY-rad*1.5, deltaCenterX, deltaCenterY+1.5*rad).stroke({ width: 1, color: color})
    line2 = draw.line(deltaCenterX-rad, deltaCenterY-rad, deltaCenterX-rad, deltaCenterY+rad).stroke({ width: 1, color: color})
    line3 = draw.line(deltaCenterX-2*rad, deltaCenterY-rad*0.5, deltaCenterX-rad*2, deltaCenterY+rad*0.5).stroke({ width: 1, color: color})
  } else {
    line1 = draw.line(deltaCenterX+2*rad, deltaCenterY-rad*0.5, deltaCenterX+rad*2, deltaCenterY+0.5*rad).stroke({ width: 1, color: color})
    line2 = draw.line(deltaCenterX+rad, deltaCenterY-rad, deltaCenterX+rad, deltaCenterY+rad).stroke({ width: 1, color: color})
    line3 = draw.line(deltaCenterX, deltaCenterY-rad*1.5, deltaCenterX, deltaCenterY+rad*1.5).stroke({ width: 1, color: color})
  }
}

dict_earth.objects = [line1, line2, line3]

return dict_earth
}

/**
 * draws Text
 * @param  {SVG object} object which text is placed relative to
 * @param  {list} list of text to show, each member of list is a new line
 * @param  {double} x offset
 * @param {double} y offset
 * @param {function} callback which takes text object as argument
 * @return {None}
 */
function add_text(object, bool_dict_obj, list_text, x_from_center=0, y_from_center=-15, colour="#d3d3d3", size, callback){
    var rad = 3
    var txtSize = undefined
    if (size===undefined){
      txtSize = font_size
    } else {
      txtSize = size
    }

    var bVertical = false;
    var bHorizontal = false;

    var text1 = draw.text(function(add) {
      var text_idx
      for(text_idx = 0; text_idx < list_text.length; text_idx++){
        add.tspan(list_text[text_idx]).newLine()
      }
    })
    .font({size: txtSize, family: 'Helvetica'}).fill({color: colour})

    if(bool_dict_obj == true){
      if (object.x1 == object.x2){
        bVertical = true;
      } else if (object.y1 == object.y2){
        bHorizontal = true;
      }

      if(bVertical){
        text1.x_coord = object.x1
        text1.y_coord = object.y1+(object.y2 - object.y1)/2
      }

      if(bHorizontal){
        text1.x_coord = object.x1+(object.x2 - object.x1)/2
        text1.y_coord = dict_line.y1
      }
    } else {
      text1.x_coord = object.cx()
      text1.y_coord = object.cy()
    }


    text1.center(text1.x_coord+x_from_center, text1.y_coord+y_from_center);
    callback(text1)
}

/**
 * draws components required to draw dataview
 * @param  {SVG object} object which the dataview is watching to
 * @param  {string} list of data labels relevant to dataview
 * @param  {[double]} offset is position of dataview
 * @param  {function( SVG Object )} callback after drawing is complete
 * @return {None}
*/
function add_dataview(observer, text, offset, callback) {
  let colour = "#e5b815"
  add_text(observer, false, text, offset[0], offset[1], colour, font_size, callback)
}

function add_available_power(observer, text, offset, callback) {
  let colour = "#ffffff"
  add_text(observer, false, text, offset[0], offset[1], colour, font_size, callback)
}

function add_static_text(list_text, x=100, y=100, colour="#d3d3d3", callback){
    var rad = 3
    var txtSize = font_size

    var bVertical = false;
    var bHorizontal = false;

    var text1 = draw.text(function(add) {
      var text_idx
      for(text_idx = 0; text_idx < list_text.length; text_idx++){
        add.tspan(list_text[text_idx]).newLine()
      }
    })
    .font({size: txtSize, family: 'Helvetica'}).fill({color: colour})


    text1.x_coord = x
    text1.y_coord = y
    text1.center(text1.x_coord, text1.y_coord);
    callback(text1)
}

function draw_SGT(dict_line,callback){
    var rad = 18 * Math.min(x_scaling,y_scaling)
    var overlapFactor = 0.25
    var circleWidth = 1

    var bVertical = false
    var bHorizontal = false
    var line1, line2, line3, line4

    var group = draw.group();

    var dict_tx = {}

    if (dict_line.x1 === dict_line.x2){
      bVertical = true
    }
    if (dict_line.y1 === dict_line.y2){
      bHorizontal = true
    }

    center = [dict_line.x2,dict_line.y2]

    closed_color = dict_line.dict_styling.stroke.color

    ellipse = draw.ellipse(rad*2,rad*2.5)
    ellipse.fill("black")
    ellipse.center(center[0],center[1]+rad/2)
    ellipse.stroke({ color: closed_color, width: circleWidth, linecap: 'white', linejoin: 'round' })
    ellipse.stroke(dict_line.dict_styling.stroke)
    ellipse.backward()
    ellipse.skew(0,-rad/2)

    rect1 = draw.rect(rad*2-(2*x_scaling),rad*3).fill("black").center(center[0]+rad+circleWidth,center[1])
    rect1.forward()

    circle2 = draw.circle(2*rad).center(center[0], center[1]+rad)
    circle2.fill('black')
    circle2.stroke({ color: closed_color, width: circleWidth, linecap: 'white', linejoin: 'round' })
    circle2.stroke(dict_line.dict_styling.stroke)
    circle2.forward()

    dict_tx.objects = [circle2,ellipse,rect1]
    group.add(ellipse)
    group.add(rect1)
    group.add(circle2)

    circle1.center(center[0],center[1])

    group.horizontal = bHorizontal
    callback(group);

}

function draw_action_button(){
  var group = draw.group();

    $.ajax({
    type: "POST",
    url: "/simtool_bp/get_action/",
    data: {"option": option},
    }).done(function( action_values ) {
      action = action_values[current_step][entity]
      if(action !== ''){
        let rect1 = draw.rect(x_max*0.1,y_max*0.07).fill("yellow").center(x_max*0.8,y_max*0.9);
        add_text(rect1, false, ["Take action: ", action], 0, 0, "#000000", 12, function(){})
        rect1.click(function() {
          rect1.off('click')
          action = undefined
          inc_state(case_network)
        })
      }

    })




}

function draw_admin_buttons(){
  var group = draw.group();


    if(entity === 'admin'){
      let rect0 = draw.rect(x_max*0.07,y_max*0.05).fill("yellow").center(x_max*0.5,y_max*0.9);
      add_text(rect0, false, ["Admin action:", "reset"], 0, 0, "#000000", font_size, function(){})
      let rect1 = draw.rect(x_max*0.07,y_max*0.05).fill("yellow").center(x_max*0.6,y_max*0.9);
      add_text(rect1, false, ["Admin action:", "back"], 0, 0, "#000000", 12, function(){})
      let rect2 = draw.rect(x_max*0.07,y_max*0.05).fill("yellow").center(x_max*0.7,y_max*0.9);
      add_text(rect1, false, ["Admin action:", "back"], 0, 0, "#000000", 12, function(){})
      add_text(rect2, false, ["Admin action:", "next"], 0, 0, "#000000", 12, function(){})
      rect0.click(function() {
        rect0.off('click')
        reset_state(case_network)
      })
      rect1.click(function() {
        rect1.off('click')
        dec_state(case_network)
      })
      rect2.click(function() {
        rect2.off('click')
        inc_state(case_network)
      })
    }

}

function draw_line(line,id_line, type="busbar"){
        bNodes = false

        if(type == "busbar"){
            line = style_busbar(line)
        }
        else if(type == "diagram"){
        line = style_diagram_line(line)
        }
        else{
        line = style_line(line)
        }

        line.callback = Line_Callback(line.graphic)

        line.o_line = draw.line(line.x1 , line.y1,
                      line.x2, line.y2).stroke(line.dict_styling.stroke)


        line.callback(line.o_line)

        line.line_idx = id_line

        if (bNodes){
          draw_nodes(line, line.o_line)
        }
        let l = {
            info: line,
            UIElement: line.graphic[0],
            id : id_line,
        }

        dict_components.lines[id_line] = line
        components.lines[id_line] = l

        if(type != "diagram"){
            component_modal(l)
        }
}