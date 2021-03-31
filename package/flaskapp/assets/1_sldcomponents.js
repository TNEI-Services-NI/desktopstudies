  function add_tx(dict_line, position, type, callback){
    var rad = 9
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

    if (bVertical){
      var fromCenter = [dict_line.x1, -rad*(1-overlapFactor)+dict_line.y1+(dict_line.y2-dict_line.y1)*position]
      var toCenter = [dict_line.x1, rad*(1-overlapFactor)+dict_line.y1+(dict_line.y2-dict_line.y1)*position]
    }
    if (bHorizontal){
      var fromCenter = [-rad*(1-overlapFactor)+dict_line.x1+(dict_line.x2-dict_line.x1)*position, dict_line.y1]
      var toCenter = [rad*(1-overlapFactor)+dict_line.x1+(dict_line.x2-dict_line.x1)*position, dict_line.y1]
    }

    circle1 = draw.circle(2*rad).center(fromCenter[0], fromCenter[1])
    circle2 = draw.circle(2*rad).center(toCenter[0], toCenter[1])
    circle3 = draw.circle(2*rad).center(fromCenter[0], fromCenter[1])
    circle4 = draw.circle(2*rad).center(toCenter[0], toCenter[1])
    circle1.fill('black')
    circle1.stroke({ color: 'white', width: circleWidth, linecap: 'white', linejoin: 'round' })
    circle2.fill('black')
    circle2.stroke({ color: 'white', width: circleWidth, linecap: 'white', linejoin: 'round' })
    circle3.fill('none')
    circle3.stroke({ color: 'white', width: circleWidth, linecap: 'white', linejoin: 'round' })
    circle4.fill('none')
    circle4.stroke({ color: 'white', width: circleWidth, linecap: 'white', linejoin: 'round' })

    dict_line.dict_styling.stroke.dasharray = []
    dict_line.dict_styling.stroke.width = circleWidth

    // circle1.stroke(dict_line.dict_styling.stroke)
    // circle2.stroke(dict_line.dict_styling.stroke)
    // circle3.stroke(dict_line.dict_styling.stroke)
    // circle4.stroke(dict_line.dict_styling.stroke)


    dict_tx.objects = [circle1, circle2, circle3, circle4]
    // alert(dict_tx.objects)
    console.log(type)
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
                console.log(starLine1)
                console.log(starCenter)
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

    }

    group.add(starLine1, starLine2, starLine3, starLine4, deltaLine1, deltaLine2, deltaLine3)

    group.add(circle1)
    group.add(circle2)
    group.add(circle3)
    group.add(circle4)

    callback(circle1, circle2, circle3, circle4, group);
  }

  function add_gen(dict_line, position, type, callback){
    var rad = 20;
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

    var group = draw.group();
    var inside_group = draw.group();
    circle1 = group.circle(2*rad);
    group.add(circle1)
    circle1.fill('black');
    circle1.stroke({ color: 'white', width: circleWidth, linecap: 'black', linejoin: 'round' });
    if (type !== 'wind'){
      var text = group.text(type)
                    .font({size: 15, family: 'Helvetica'})
                    .fill({color: 'white'})
                    .center(0.5*circle1.width(), 0.4*circle1.height());

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

    callback(circle1, group, inside_group)
  }

  function add_inductor(dict_line, position, length){
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

  function add_breaker(dict_line, position, size, state, callback){
    var bVertical = false;
    var bHorizontal = false;

    var dict_breaker = {}

    if (dict_line.x1 === dict_line.x2){
      bVertical = true;
      var center = [dict_line.x1, dict_line.y1+(dict_line.y2-dict_line.y1)*position];
    }
    if (dict_line.y1 === dict_line.y2){
      bHorizontal = true;
      var center = [dict_line.x1+(dict_line.x2-dict_line.x1)*position, dict_line.y1];
    }
    // alert(dict_line.dict_styling.fill)
    // if(dict_line.dict_styling.stroke.color !== '#a0a0a0'){
      if (state === 'open'){
        dict_line.dict_styling.fill.color = 'black'
        dict_line.dict_styling.stroke.color = 'white'
      } else if (state === 'closed'){
        dict_line.dict_styling.fill.color = 'white'
        dict_line.dict_styling.stroke.color = 'white'
      }
    // } else {
    //   if (state === 'open'){
    //     dict_line.dict_styling.fill.color = 'white'
    //     dict_line.dict_styling.stroke.color = '#a0a0a0'
    //   } else if (state === 'closed'){
    //     dict_line.dict_styling.fill.color = '#a0a0a0'
    //     dict_line.dict_styling.stroke.color = '#a0a0a0'
    //   }
    // }

    if (state === 'open'){
      rect1 = draw.rect(size, size).center(center[0], center[1]).fill(dict_line.dict_styling.fill).stroke(dict_line.dict_styling.stroke).stroke({width: 1})
    }
    if (state === 'closed'){
      rect1 = draw.rect(size, size).center(center[0], center[1]).fill(dict_line.dict_styling.fill).stroke(dict_line.dict_styling.stroke).stroke({width: 1})
    }

    rect1.click(function() {
      if (this.attr('fill') === dict_line.dict_styling.stroke.color){
        this.fill({ color: 'black' })
      } else {
        this.fill(dict_line.dict_styling.stroke)
      }

      this.fire(breaker_clicked_event)
    });

    dict_breaker.objects = [rect1];
    callback(rect1);
  }

  function add_resistor(dict_line, position, length, width){
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

  function add_load(dict_line, position, flipped){
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
    String(delta1X) + "," + String(delta1Y)).stroke(dict_line.dict_styling.stroke)
                                            .fill(dict_line.dict_styling.stroke)
                                            .stroke({ width: 1})

    if (bHorizontal){
      poly1.rotate(90)
    }

    dict_load.objects = [poly1]
  }

  function add_earth(dict_line, position, flipped){
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

  function add_nodes(dict_line, o_line){
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

  function add_text(object, bool_dict_obj, list_text, x_from_center, y_from_center, callback){
    var rad = 3
    var txtSize = 14

    var bVertical = false;
    var bHorizontal = false;

    var text1 = draw.text(function(add) {
      var text_idx
      for(text_idx = 0; text_idx < list_text.length; text_idx++){
        add.tspan(list_text[text_idx]).newLine()
      }
    })
    .font({size: txtSize, family: 'Helvetica'}).fill({color: 'white'})

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

  //URL must not be relative as it routes to dashly...
  //need to provide a global route
  function post_breaker(breakerID,state){
      if(breakerID === null){breakerID="b1"}
      if(state === null){state=true}
      $.ajax({
      type: "POST",
      url: "http://127.0.0.1:5000/simtool/receive_breaker/",
      data: {"breaker": breakerID, "state": state },
//      dataType: 'application/json'
      }).done(function( data ) {
        console.log(data);
      })
  }

