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
    .font({size: txtSize, family: 'Helvetica'})

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

  function greenObject(stage, object){
    if ($('#buttonA').attr('stage') == stage){
      flashColour(object, "green")
    }
  }

  function buttonA_greenObject(stage, object){
    $('#buttonA').click(function(){
      greenObject(stage, object)
    });
  }

  function buttonA_fillObject(stage, object, color){
    $('#buttonA').click(function(){
      if (parseInt($('#buttonA').attr('stage')) == stage){
        flashBreaker(object, object.attr('stroke'))
      }
    });
  }

  function flashBreaker(object, colour){
    var i;
    var time = 175
    var orig = object.attr('fill')
    var colour_highlight = '#ff2429'
    object.fill({color:colour_highlight})
    for(i=0; i<6; i++){
      setTimeout(function(){
        object.fill({color:orig})
        setTimeout(function(){
          object.fill({color:colour_highlight})
          setTimeout(function(){
            object.fill({color:orig})
            setTimeout(function(){
              object.fill({color:colour_highlight})
              setTimeout(function(){
                object.fill({color:orig})
                setTimeout(function(){
                  object.fill({color:colour_highlight})
                  setTimeout(function(){
                    object.fill({color:orig})
                    setTimeout(function(){
                      object.fill({color:colour})
                    }, time);
                  }, time);
                }, time);
              }, time);
            }, time);
          }, time);
        }, time);
      }, time);

    }

  }

  function flashColour(object, colour){
    var i;
    var time = 175
    var orig = object.attr('stroke')
    object.stroke({color:colour})
    for(i=0; i<6; i++){
      setTimeout(function(){
        object.stroke({color:orig})
        setTimeout(function(){
          object.stroke({color:colour})
          setTimeout(function(){
            object.stroke({color:orig})
            setTimeout(function(){
              object.stroke({color:colour})
              setTimeout(function(){
                object.stroke({color:orig})
                setTimeout(function(){
                  object.stroke({color:colour})
                  setTimeout(function(){
                    object.stroke({color:orig})
                    setTimeout(function(){
                      object.stroke({color:colour})
                    }, time);
                  }, time);
                }, time);
              }, time);
            }, time);
          }, time);
        }, time);
      }, time);

    }
  }


 //Define parent attributes
 //  var x = document.getElementById('myDiv').clientWidth;
  var x = window.innerWidth;
  // var y = document.getElementById('myDiv').clientHeight;
  var y = window.innerHeight;

  //Create canvas
  var draw = SVG('#drawing').size(x, y)

  var x_pos_line1 = x/3
  var y_pos_line1 = y/2

  var x_scaling = 1.03
  var y_scaling = 1.1

  //                       x1,y1,x2,y2
  var lineXtop = draw.line(0, 0, x, 0).stroke({ width: 4, dasharray: (5,5)})
  var lineXbottom = draw.line(0, y, x, y).stroke({ width: 4, dasharray: (5,5) })
  var lineYleft = draw.line(0, 0, 0, y).stroke({ width: 4, dasharray: (5,5) })
  var lineYright = draw.line(x, 0, x, y).stroke({ width: 4, dasharray: (5,5) })

  // const x_const = 1170
  // const y_const = 662

  const dict_steps_components = {
    '1_1': {
      lines: [
        // STEP 1
        {
          x1: 72, y1: 256,
          x2: 72, y2: 420,
          voltage: '132'
        },
        {
          x1: 46, y1: 256,
          x2: 149, y2: 256,
          voltage: '132'
        },
        {
          x1: 40, y1: 301,
          x2: 72, y2: 301,
          voltage: '132'
        },
        {
          x1: 40, y1: 301,
          x2: 40, y2: 335,
          voltage: '132'
        },
        {
          x1: 57, y1: 87,
          x2: 57, y2: 256,
          voltage: '132'
        },
        {
          x1: 118, y1: 256,
          x2: 118, y2: 310,
          dash: true,
          color: '#a0a0a0'
        },
        {
          x1: 140, y1: 256,
          x2: 140, y2: 310,
          color: '#a0a0a0'
        },
        {
          x1: 95, y1: 297,
          x2: 118, y2: 297,
          color: '#a0a0a0'
        },
        {
          x1: 118, y1: 256,
          x2: 118, y2: 270,
          color: '#a0a0a0'
        },
        // STEP 2
        {
          x1: 40, y1: 88,
          x2: 1133, y2: 88,
          voltage: '132'
        },
        {
          x1: 94, y1: 88,
          x2: 94, y2: 158,
          voltage: '132'
        },
        {
          x1: 94, y1: 158,
          x2: 208, y2: 158,
          voltage: '132'
        },
        // Step 5C B13 south, east, SOUTH
        {
          x1: 302, y1: 158,
          x2: 302, y2: 182,
          color: '#a0a0a0'
        },
        {
          x1: 271, y1: 182,
          x2: 412, y2: 182,
          color: '#a0a0a0'
        },
        // 10-15
        {
          x1: 320, y1: 182,
          x2: 320, y2: 223,
          color: '#a0a0a0'
        },
        // 21-26
        {
          x1: 372, y1: 182,
          x2: 372, y2: 223,
          color: '#a0a0a0'
        },
        // Step 5C B23 south, west, south
        {
          x1: 387, y1: 158,
          x2: 387, y2: 182,
          color: '#a0a0a0'
        },
        // Step 5C B23 south, west
        {
          x1: 387, y1: 158,
          x2: 600, y2: 158,
          color: '#a0a0a0'
        },
        // Step 5C B23 south
        {
          x1: 822, y1: 88,
          x2: 822, y2: 158,
          voltage: '132'
        },
        // Step 4.1 B12 - south
        {
          x1: 491, y1: 88,
          x2: 491, y2: 138,
          voltage: '132'
        },
        // Step 4.1 B12 - south, west
        {
          x1: 168, y1: 138,
          x2: 491, y2: 138,
          voltage: '132'
        },
        // Step 4.1 B12 - south, west, south
        {
          x1: 168, y1: 138,
          x2: 168, y2: 350,
          voltage: '132'
        },
        // BB780 - Middlebie
        {
          x1: 98, y1: 350,
          x2: 240, y2: 350,
          voltage: '132'
        },
        {
          x1: 110, y1: 350,
          x2: 110, y2: 500,
          voltage: '132'
        },
        {
          x1: 95, y1: 500,
          x2: 140, y2: 500,
          voltage: '132'
        },
        {
          x1: 126, y1: 500,
          x2: 126, y2: 600,
          voltage: '132'
        },
        {
          x1: 188, y1: 350,
          x2: 188, y2: 425,
          voltage: '132'
        },
        {
          x1: 180, y1: 425,
          x2: 235, y2: 425,
          voltage: '132'
        },
        {
          x1: 225, y1: 425,
          x2: 225, y2: 460,
          voltage: '132'
        },
        {
          x1: 168, y1: 487,
          x2: 225, y2: 487,
          voltage: '132'
        },
        {
          x1: 225, y1: 487,
          x2: 225, y2: 542,
          voltage: '132'
        },
        {
          x1: 225, y1: 542,
          x2: 389, y2: 542,
          voltage: '132'
        },
        {
          x1: 389, y1: 542,
          x2: 389, y2: 625,
          voltage: '132'
        },
        {
          x1: 268, y1: 625,
          x2: 389, y2: 625,
          voltage: '132'
        },
        {
          x1: 370, y1: 582,
          x2: 520, y2: 582,
          voltage: '132'
        },
        {
          x1: 420, y1: 582,
          x2: 420, y2: 620,
          voltage: '132'
        },
        {
          x1: 470, y1: 582,
          x2: 470, y2: 620,
          voltage: '132'
        },
        {
          x1: 495, y1: 542,
          x2: 495, y2: 625,
          voltage: '132'
        },
        {
          x1: 495, y1: 542,
          x2: 625, y2: 542,
          voltage: '132'
        },
        {
          x1: 495, y1: 625,
          x2: 625, y2: 625,
          voltage: '132'
        },
        {
          x1: 625, y1: 505,
          x2: 625, y2: 542,
          voltage: '132'
        },
        {
          x1: 200, y1: 505,
          x2: 650, y2: 505,
          voltage: '132'
        },
        // Step 3.1 B24
        {
          x1: 1106, y1: 87,
          x2: 1106, y2: 256,
          voltage: '132'
        },
        {
          x1: 1080, y1: 256,
          x2: 1150, y2: 256,
          voltage: '132'
        },
        {
          x1: 1130, y1: 256,
          x2: 1130, y2: 380,
          voltage: '132'
        },

        {
          x1: 356, y1: 20,
          x2: 356, y2: 88,
          color: '#a0a0a0'
        },
        {
          x1: 335, y1: 31,
          x2: 356, y2: 31,
          color: '#a0a0a0'
        },
        {
          x1: 356, y1: 75,
          x2: 400, y2: 75,
          dash: true,
          color: '#a0a0a0'
        },
        {
          x1: 356, y1: 75,
          x2: 370, y2: 75,
          color: '#a0a0a0'
        },
        {
          x1: 391, y1: 40,
          x2: 391, y2: 75,
          color: '#a0a0a0'
        },
        {
          x1: 208, y1: 158,
          x2: 302, y2: 158,
          color: '#a0a0a0'
        },
        {
          x1: 600, y1: 158,
          x2: 822, y2: 158,
          voltage: '132'
        },


        {
          x1: 153, y1: 87,
          x2: 153, y2: 221,
          voltage: '132'
        },
        {
          x1: 153, y1: 221,
          x2: 288, y2: 221,
          voltage: '132'
        },
        {
          x1: 288, y1: 221,
          x2: 288, y2: 251,
          voltage: '132'
        },
        {
          x1: 288, y1: 251,
          x2: 288, y2: 278,
          voltage: '132'
        },
        {
          x1: 288, y1: 278,
          x2: 430, y2: 278,
          color: '#a0a0a0'
        },
        {
          x1: 430, y1: 278,
          x2: 430, y2: 301,
          color: '#a0a0a0'
        },
        {
          x1: 399, y1: 301,
          x2: 541, y2: 301,
          color: '#a0a0a0'
        },
        {
          x1: 452, y1: 301,
          x2: 452, y2: 343,
          color: '#a0a0a0'
        },
        {
          x1: 495, y1: 301,
          x2: 495, y2: 343,
          color: '#a0a0a0'
        },
        {
          x1: 516, y1: 278,
          x2: 516, y2: 301,
          color: '#a0a0a0'
        },
        {
          x1: 516, y1: 278,
          x2: 587, y2: 278,
          color: '#a0a0a0'
        },
        {
          x1: 587, y1: 278,
          x2: 641, y2: 278,
          voltage: '132'
        },
        {
          x1: 641, y1: 251,
          x2: 641, y2: 278,
          voltage: '132'
        },
        {
          x1: 245, y1: 251,
          x2: 704, y2: 251,
          voltage: '132'
        },
        {
          x1: 641, y1: 186,
          x2: 641, y2: 251,
          voltage: '132'
        },
        {
          x1: 641, y1: 186,
          x2: 723, y2: 186,
          voltage: '132'
        },
        {
          x1: 723, y1: 87,
          x2: 723, y2: 186,
          voltage: '132'
        },
        {
          x1: 33, y1: 191,
          x2: 153, y2: 191,
          voltage: '132'
        },
        // Step 4.1 B12 - south, west, south, south
        {
          x1: 168, y1: 350,
          x2: 168, y2: 487,
          voltage: '132'
        },

      ],
      loads: [

      ],
      txs: [

      ],
      breakers: [

      ],
      labels: [

      ],
      generators: [

      ],
    },
  }

  for (idx_line=0; idx_line<dict_steps_components['1_1'].lines.length; idx_line++){
    temp_dict = dict_steps_components['1_1'].lines[idx_line]
    temp_dict.x1 = temp_dict.x1 * x_scaling
    temp_dict.x2 = temp_dict.x2 * x_scaling
    temp_dict.y1 = temp_dict.y1 * y_scaling
    temp_dict.y2 = temp_dict.y2 * y_scaling
  }

  var bNodes = false

  var idx_line, temp_dict
  for (idx_line=0; idx_line<dict_steps_components['1_1'].lines.length; idx_line++){
    temp_dict = dict_steps_components['1_1'].lines[idx_line]
    temp_dict.dict_styling = {fill: { width: 2}, stroke: { width: 2}}
    if (temp_dict.dash){
      temp_dict.dict_styling.stroke.dasharray = (5, 5)
    }
    if (temp_dict.color){
      temp_dict.dict_styling.stroke.color = temp_dict.color
      temp_dict.dict_styling.fill.color = temp_dict.color
    }
    if (temp_dict.voltage){
      if (temp_dict.voltage == "132") {
        temp_dict.dict_styling.stroke.color = "#000000"
        temp_dict.dict_styling.fill.color = "#000000"
      } else if (temp_dict.voltage == "33") {
        temp_dict.dict_styling.stroke.color = "#00ff00"
        temp_dict.dict_styling.fill.color = "#00ff00"
      } else if (temp_dict.voltage == "11") {
        temp_dict.dict_styling.stroke.color = "#ff0000"
        temp_dict.dict_styling.fill.color = "#ff0000"
      }

    }
    temp_dict.o_line = draw.line(temp_dict.x1, temp_dict.y1,
                                  temp_dict.x2, temp_dict.y2).stroke(temp_dict.dict_styling.stroke)

    temp_dict.line_idx = idx_line

    if (bNodes){
      add_nodes(temp_dict, temp_dict.o_line)
    }

    dict_steps_components['1_1'].lines[idx_line] = temp_dict
  }
  dict_steps_components['1_1'].txs = []

  var stage1_1 = []

  var stage = 0


  add_text(dict_steps_components['1_1'].lines[1].o_line, false, ["Steven's Croft"], 10, -15, function(object){
    return 0
  });

  add_text(dict_steps_components['1_1'].lines[9].o_line, false, ["Chapelcross Grid", "33kV Busbar"], 0, -25, function(object){
    return 0
  });

  add_text(dict_steps_components['1_1'].lines[41].o_line, false, ["Langholm"], 10, -15, function(object){
    return 0
  });

  add_text(dict_steps_components['1_1'].lines[10].o_line, false, ["Annan","#1"], 30, -12, function(object){
    return 0
  });
  add_text(dict_steps_components['1_1'].lines[22].o_line, false, ["Middleby"], 50, -12, function(object){
    return 0
  });


  add_text(dict_steps_components['1_1'].lines[43].o_line, false, ["Minsca"], 20, -15, function(object){
    return 0
  });
  add_text(dict_steps_components['1_1'].lines[52].o_line, false, ["Lockerbie","#1"], 42, -50, function(object){
    return 0
  });
  add_text(dict_steps_components['1_1'].lines[68].o_line, false, ["Lockerbie","#2"], 42, -30, function(object){
    return 0
  });
  add_text(dict_steps_components['1_1'].lines[18].o_line, false, ["Annan","#2"], 42, -10, function(object){
    return 0
  });
  add_text(dict_steps_components['1_1'].lines[65].o_line, false, ["Lockerbie A"], -100, -13, function(object){
    return 0
  });
  add_text(dict_steps_components['1_1'].lines[65].o_line, false, ["Lockerbie B"], 100, -13, function(object){
    return 0
  });

  var powerColour = '#25b1f5'

  // Stage Iterator
  $('#buttonA').click(function(){
    $.ajax({
      url:"data/steps.csv",
      dataType:"text",
      success:function(data)
      {
        var csv = data.split(/\r?\n|\r/);
        $('#buttonA').attr('stage', parseInt($('#buttonA').attr('stage'))+1)
        var stage = parseInt($('#buttonA').attr('stage'));

        $('table tr:nth-child(' + (stage + 1) + ')').css('background-color', '#baffb3');

        var cell_data = csv[stage].split(",");
        // $('#buttonA').text(cell_data[2])

        if (stage == 2){
          flashColour(dict_steps_components['1_1'].lines[0].o_line, powerColour)
          flashColour(dict_steps_components['1_1'].lines[1].o_line, powerColour)
          flashColour(dict_steps_components['1_1'].lines[2].o_line, powerColour)
        } else if (stage == 3){
          flashColour(dict_steps_components['1_1'].lines[4].o_line, powerColour)
        } else if (stage == 4){
          flashColour(dict_steps_components['1_1'].lines[9].o_line, powerColour)
        } else if (stage == 5){
          flashColour(dict_steps_components['1_1'].lines[42].o_line, powerColour)
          flashColour(dict_steps_components['1_1'].lines[43].o_line, powerColour)

        } else if (stage == 6){

        } else if (stage == 7){
          flashColour(dict_steps_components['1_1'].lines[44].o_line, powerColour)
        } else if (stage == 8){
          flashColour(dict_steps_components['1_1'].lines[19].o_line, powerColour)
          flashColour(dict_steps_components['1_1'].lines[20].o_line, powerColour)
          flashColour(dict_steps_components['1_1'].lines[21].o_line, powerColour)
          flashColour(dict_steps_components['1_1'].lines[22].o_line, powerColour)
          flashColour(dict_steps_components['1_1'].lines[23].o_line, powerColour)
          flashColour(dict_steps_components['1_1'].lines[24].o_line, powerColour)
        } else if (stage == 9){
        } else if (stage == 10){
          flashColour(dict_steps_components['1_1'].lines[25].o_line, powerColour)
        } else if (stage == 12){
          flashColour(dict_steps_components['1_1'].lines[18].o_line, powerColour)
          flashColour(dict_steps_components['1_1'].lines[10].o_line, powerColour)
          flashColour(dict_steps_components['1_1'].lines[11].o_line, powerColour)
          flashColour(dict_steps_components['1_1'].lines[51].o_line, powerColour)
        } else if (stage == 13){
          flashColour(dict_steps_components['1_1'].lines[50].o_line, powerColour)
          flashColour(dict_steps_components['1_1'].lines[12].o_line, powerColour)
          flashColour(dict_steps_components['1_1'].lines[14].o_line, powerColour)
        } else if (stage == 14){
          flashColour(dict_steps_components['1_1'].lines[13].o_line, powerColour)
          flashColour(dict_steps_components['1_1'].lines[15].o_line, powerColour)
          flashColour(dict_steps_components['1_1'].lines[16].o_line, powerColour)
          flashColour(dict_steps_components['1_1'].lines[17].o_line, powerColour)
        }
      }
    });
  });

  add_tx(dict_steps_components['1_1'].lines[0], 0.45, 'starDelta', function(circle1,circle2,circle3,circle4,group){
    add_text(circle1, false, ["33/11kV"], 47, 15, function(object){
      return 0
    });
    buttonA_greenObject(1, circle1);
    buttonA_greenObject(1, circle2);
    buttonA_greenObject(1, circle3);
    buttonA_greenObject(1, circle4);
    eventMouse(group, "Transformer", "STCR3-_STCR5-_1");
  });


  add_gen(dict_steps_components['1_1'].lines[0], 0.73, 'SG', function(circle, group){
    buttonA_greenObject(0, circle)
    add_text(group, false, ["Stevens", "Croft"], -40, 0, function(object){
      return 0
    });
    eventMouse(group, "Generator", "STCR5-_1");
  });

  add_inductor(dict_steps_components['1_1'].lines[0], 0.9, 'SG');
  add_breaker(dict_steps_components['1_1'].lines[0], 0.61, 6, 'open', function(object){
    object.on("breaker_clicked",function(event){post_breaker()})

    buttonA_fillObject(1, object)
  });
  add_breaker(dict_steps_components['1_1'].lines[0], 0.2, 6, 'open', function(object){
      object.on("breaker_clicked",function(event){post_breaker()})

    buttonA_fillObject(1, object)
  });
  add_breaker(dict_steps_components['1_1'].lines[0], 0.1, 6, 'closed', function(object){
      object.on("breaker_clicked",function(event){post_breaker()})

    return 0
  });
  add_earth(dict_steps_components['1_1'].lines[0], 1, true);

  add_breaker(dict_steps_components['1_1'].lines[3], 0.25, 6, 'open', function(object){
      object.on("breaker_clicked",function(event){post_breaker()})

    return 0
  });
  add_resistor(dict_steps_components['1_1'].lines[3], 0.65, 12, 4);
  add_earth(dict_steps_components['1_1'].lines[3], 1, true);
  add_text(dict_steps_components['1_1'].lines[3],  true, ["NOP"], -23, -10, function(object){
    return 0
  });

  add_breaker(dict_steps_components['1_1'].lines[4], 0.10, 6, 'open', function(object){
    buttonA_fillObject(3, object)
    object.on("breaker_clicked",function(event){post_breaker()})

  });
  add_breaker(dict_steps_components['1_1'].lines[4], 0.9, 6, 'open', function(object){
    buttonA_fillObject(2, object)
        object.on("breaker_clicked",function(event){post_breaker()})

  });


  add_tx(dict_steps_components['1_1'].lines[5], 0.9, 'starDelta', function(dict_tx){

    dict_steps_components['1_1'].txs += [dict_tx]
  });

  add_breaker(dict_steps_components['1_1'].lines[6], 0.24, 6, 'closed', function(object){
          object.on("breaker_clicked",function(event){post_breaker()})

    return 0
  });
  add_load(dict_steps_components['1_1'].lines[6], 1, true)

  add_earth(dict_steps_components['1_1'].lines[7], 0, false)

  add_load(dict_steps_components['1_1'].lines[8], 1, true)

  add_breaker(dict_steps_components['1_1'].lines[10], 0.24, 6, 'open', function(object){
          object.on("breaker_clicked",function(event){post_breaker()})

    buttonA_fillObject(11, object);
  });

  add_tx(dict_steps_components['1_1'].lines[11], 1, 'deltaStar', function(c1, c2, c3, c4, group){
    buttonA_greenObject(12, c1)
    buttonA_greenObject(12, c2)
    buttonA_greenObject(12, c3)
    buttonA_greenObject(12, c4)
    add_text(group, false, ["33/11.5kV"], 0, 30, function(object){
      return 0
    });
    eventMouse(group, "Transformer", "ANANT1_ANAN10_T1");
  });

  add_breaker(dict_steps_components['1_1'].lines[12], 0.5, 6, 'closed', function(object){
          object.on("breaker_clicked",function(event){post_breaker()})

    return 0
  });

  add_breaker(dict_steps_components['1_1'].lines[13], 0.5, 6, 'open', function(object){
          object.on("breaker_clicked",function(event){post_breaker()})

    return 0
  });

  add_breaker(dict_steps_components['1_1'].lines[14], 0.4, 6, 'closed', function(object){
          object.on("breaker_clicked",function(event){post_breaker()})

    return 0
  });
  add_load(dict_steps_components['1_1'].lines[14], 1, true)

  add_breaker(dict_steps_components['1_1'].lines[15], 0.4, 6, 'closed', function(object){
    object.on("breaker_clicked",function(event){post_breaker()})
    return 0
  });
  add_load(dict_steps_components['1_1'].lines[15], 1, true)

  add_breaker(dict_steps_components['1_1'].lines[16], 0.5, 6, 'closed', function(object){
    object.on("breaker_clicked",function(event){post_breaker()})
    buttonA_fillObject(10, object)
  });

  add_tx(dict_steps_components['1_1'].lines[17], 1, 'deltaStar', function(c1, c2, c3, c4, group){
    buttonA_greenObject(13, c1)
    buttonA_greenObject(13, c2)
    buttonA_greenObject(13, c3)
    buttonA_greenObject(13, c4)
    add_text(group, false, ["33/11.5kV"], 0, 30, function(object){
      return 0
    });
    eventMouse(group, "Transformer", "ANANT2_ANAN20_T2");
  });

  add_breaker(dict_steps_components['1_1'].lines[18], 0.24, 6, 'open', function(object){
    buttonA_fillObject(11, object);
  });

  add_breaker(dict_steps_components['1_1'].lines[19], 0.24, 6, 'open', function(object){
    buttonA_fillObject(7, object);
  });

  add_breaker(dict_steps_components['1_1'].lines[21], 0.9, 6, 'closed', function(object){

    return 0
  });
  add_breaker(dict_steps_components['1_1'].lines[70], 0.15, 6, 'open', function(object){
    return 0

  });

  add_breaker(dict_steps_components['1_1'].lines[23], 0.15, 6, 'closed', function(object){
    return 0
  });
  add_breaker(dict_steps_components['1_1'].lines[23], 0.85, 6, 'closed', function(object){
    return 0
  });

  add_breaker(dict_steps_components['1_1'].lines[25], 0.1, 6, 'open', function(object){
    buttonA_fillObject(8, object)
  });
  add_breaker(dict_steps_components['1_1'].lines[25], 0.3, 6, 'open', function(object){
    buttonA_fillObject(9, object)
  });
  add_tx(dict_steps_components['1_1'].lines[25], 0.55, 'deltaStar', function(c1, c2, c3, c4, group){
    buttonA_greenObject(9, c1)
    buttonA_greenObject(9, c2)
    buttonA_greenObject(9, c3)
    buttonA_greenObject(9, c4)
    add_text(group, false, ["33/0.69kV"], -55, 0, function(object){
    });
    eventMouse(group, "Transformer", "EWHC3-_EWHC0G_1");
    // EWHC3-_EWHC0G_1
  });
  add_breaker(dict_steps_components['1_1'].lines[25], 0.8, 6, 'open', function(object){
    buttonA_fillObject(9, object)
  });
  add_gen(dict_steps_components['1_1'].lines[25], 1, 'wind', function(circle1, group){
    add_text(group, false, ["Ewe Hill WF"], 0,30, function(group){
      return 0
    });
  });

  add_breaker(dict_steps_components['1_1'].lines[26], 0.15, 6, 'open', function(object){
    return 0
  });
  add_tx(dict_steps_components['1_1'].lines[26], 0.5, 'deltaStar', function(dict_tx){
    dict_steps_components['1_1'].txs += [dict_tx]
  });
  add_breaker(dict_steps_components['1_1'].lines[26], 0.86, 6, 'closed', function(object){
    return 0
  });

  add_breaker(dict_steps_components['1_1'].lines[28], 0.25, 6, 'closed', function(object){
    return 0
  });
  add_load(dict_steps_components['1_1'].lines[28], 1, true)

  add_tx(dict_steps_components['1_1'].lines[31], 0.5, 'deltaStar', function(dict_tx){
    dict_steps_components['1_1'].txs += [dict_tx]
  });

  add_breaker(dict_steps_components['1_1'].lines[32], 0.25, 6, 'closed', function(object){
    return 0
  });
  add_breaker(dict_steps_components['1_1'].lines[32], 0.75, 6, 'closed', function(object){
    return 0
  });

  add_breaker(dict_steps_components['1_1'].lines[33], 0.45, 6, 'closed', function(object){
    return 0
  });
  add_breaker(dict_steps_components['1_1'].lines[33], 0.55, 6, 'closed', function(object){
    return 0
  });
  add_gen(dict_steps_components['1_1'].lines[33], 0, 'wind', function(circle1, group){
    add_text(group, false, ["Craig WF"], 0,30, function(group){
      return 0
    });
  });


  add_breaker(dict_steps_components['1_1'].lines[34], 0.5, 6, 'closed', function(object){

    return 0
  });

  add_breaker(dict_steps_components['1_1'].lines[35], 0.3, 6, 'closed', function(object){
    return 0
  });
  add_load(dict_steps_components['1_1'].lines[35], 1, true)

  add_breaker(dict_steps_components['1_1'].lines[36], 0.3, 6, 'closed', function(object){
    return 0
  });
  add_load(dict_steps_components['1_1'].lines[36], 1, true)

  add_breaker(dict_steps_components['1_1'].lines[37], 0.3, 6, 'open', function(object){
    return 0
  });
  add_breaker(dict_steps_components['1_1'].lines[37], 0.7, 6, 'closed', function(object){
    return 0
  });

  add_breaker(dict_steps_components['1_1'].lines[39], 0.4, 6, 'closed', function(object){
    return 0
  });
  add_breaker(dict_steps_components['1_1'].lines[39], 0.6, 6, 'closed', function(object){
    return 0
  });
  add_gen(dict_steps_components['1_1'].lines[39], 1, 'wind', function(circle1, group){
    add_text(group, false, ["Craig II WF"], 0,30, function(group){
      return 0
    });
  });

  add_tx(dict_steps_components['1_1'].lines[38], 0.75, 'deltaStar', function(dict_tx){
    dict_steps_components['1_1'].txs += [dict_tx]
  });

  add_breaker(dict_steps_components['1_1'].lines[41], 0.5, 6, 'open', function(object){
    return 0
  });

  add_breaker(dict_steps_components['1_1'].lines[42], 0.1, 6, 'open', function(object){
    buttonA_fillObject(4, object)
  });
  add_breaker(dict_steps_components['1_1'].lines[42], 0.9, 6, 'closed', function(object){
    return 0
  });

  add_breaker(dict_steps_components['1_1'].lines[44], 0.10, 6, 'open', function(object){
    buttonA_fillObject(5, object)
  });
  add_breaker(dict_steps_components['1_1'].lines[44], 0.25, 6, 'open', function(object){
    buttonA_fillObject(6, object)
  });
  add_tx(dict_steps_components['1_1'].lines[44], 0.55, 'deltaStar', function(c1, c2, c3, c4, group){
    buttonA_greenObject(6, c1)
    buttonA_greenObject(6, c2)
    buttonA_greenObject(6, c3)
    buttonA_greenObject(6, c4)
    add_text(group, false, ["33/0.69kV"], -55, 0, function(object){
    });
    eventMouse(group, "Transformer", "MINS3-_MINS0G_1");
    // MINS3-_MINS0G_1

  });
  add_breaker(dict_steps_components['1_1'].lines[44], 0.8, 6, 'open', function(object){
    buttonA_fillObject(6, object)
  });
  add_gen(dict_steps_components['1_1'].lines[44], 1, 'wind', function(circle1, group){
    add_text(group, false, ["MINSCA WF"], 0,30, function(group){
      return 0
    });
  });

  add_tx(dict_steps_components['1_1'].lines[45], 0.51, '', function(dict_tx){
  });
  add_load(dict_steps_components['1_1'].lines[45], 0, false);

  add_load(dict_steps_components['1_1'].lines[46], 0, true)

  add_tx(dict_steps_components['1_1'].lines[47], 0.96, 'starStar', function(dict_tx){
  });

  add_load(dict_steps_components['1_1'].lines[48], 1, false)

  add_load(dict_steps_components['1_1'].lines[49], 0, false)
  add_load(dict_steps_components['1_1'].lines[49], 0, false)
  add_resistor(dict_steps_components['1_1'].lines[49], 0.38, 12, 4)

  add_breaker(dict_steps_components['1_1'].lines[52],  0.1, 6, 'open', function(object){
    return 0
  });

  add_breaker(dict_steps_components['1_1'].lines[55],  0.5, 6, 'closed', function(object){
    return 0
  });

  add_tx(dict_steps_components['1_1'].lines[56], 0.5, 'deltaStar', function(dict_tx){
  });

  add_breaker(dict_steps_components['1_1'].lines[57],  0.5, 6, 'closed', function(object){
    return 0
  });

  add_breaker(dict_steps_components['1_1'].lines[58],  0.5, 6, 'open', function(object){
    return 0
  });

  add_breaker(dict_steps_components['1_1'].lines[59],  0.5, 6, 'closed', function(object){
    return 0
  });
  add_load(dict_steps_components['1_1'].lines[59], 1, true)

  add_breaker(dict_steps_components['1_1'].lines[60],  0.5, 6, 'closed', function(object){
    return 0
  });
  add_load(dict_steps_components['1_1'].lines[60], 1, true)

  add_breaker(dict_steps_components['1_1'].lines[61],  0.5, 6, 'closed', function(object){
    return 0
  });

  add_tx(dict_steps_components['1_1'].lines[62], 1, 'starDelta', function(dict_tx){
  });

  add_breaker(dict_steps_components['1_1'].lines[68],  0.15, 6, 'open', function(object){
    return 0
  });

  add_load(dict_steps_components['1_1'].lines[69], 0, true);



