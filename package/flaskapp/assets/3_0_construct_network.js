  //--------------------------------------------------------------------------------------------------------------------

  function prepare_canvas(x, y){
    //Create canvas
    $('#drawing').empty();
    background = draw.rect(x, y).fill(palette["background-color"])
    components = {
                    breakers: [],
                    lines: [],
                    loads:[],
                    busbars:[],
                    labels:[],
                    generators: [],
                    isolators:[],
                    text:[],
                    dataviews:[],
                    transformers:[],
                    SGTs:[],
                    availablePowers:[],
                    generationInfo:[],
                    generatorControls:[],
                }
  }

  function scale_two_point_objects(networks_undrawn, component){
    for(let id_dict in networks_undrawn){
    let temp_dict_components = networks_undrawn[id_dict]
    for (let idx_line in temp_dict_components[component]){
        let temp_dict = temp_dict_components[component][idx_line]
        temp_dict.x1 = temp_dict.x1 * x_scaling
        temp_dict.x2 = temp_dict.x2 * x_scaling
        temp_dict.y1 = temp_dict.y1 * y_scaling
        temp_dict.y2 = temp_dict.y2 * y_scaling
    }
  }
  }

  function scale_text(networks_undrawn, component){
   for(let id_dict in networks_undrawn) {
     let temp_dict_components = networks_undrawn[id_dict]
     for (let idx in temp_dict_components[component]) {
       temp_dict = temp_dict_components[component][idx]
       temp_dict.offset[0] = temp_dict.offset[0] * x_scaling
       temp_dict.offset[1] = temp_dict.offset[1] * y_scaling
     }
   }
  }

  function scale_lines(networks_undrawn){
    scale_two_point_objects(networks_undrawn, 'lines')
  }

  function scale_busbars(networks_undrawn){
    scale_two_point_objects(networks_undrawn, 'busbars')
  }

  function scale_loads(networks_undrawn){
    scale_two_point_objects(networks_undrawn, 'loads')
  }

  function scale_labels(networks_undrawn){
    scale_text(networks_undrawn, 'labels')
  }

  function scale_dataviews(networks_undrawn){
   scale_text(networks_undrawn, 'dataViews')
  }

  function scale_availablePower(networks_undrawn){
     for(let id_dict in networks_undrawn) {
        let temp_dict_components = networks_undrawn[id_dict]

        for (let idx in temp_dict_components.availablePower) {
           let temp_dict = temp_dict_components.availablePower[idx]
           temp_dict.pos[0] = temp_dict.pos[0] * x_scaling
           temp_dict.pos[1] = temp_dict.pos[1] * y_scaling
           temp_dict_components.availablePower[idx] = temp_dict
        }
     }
  }

  //--------------------------------------------------------------------------------------------------------------------

  function construct_coord_display(){
    const text1 = draw.text("coordinate dislay")
      .font({size: 15, family: 'Helvetica'}).fill({color: "white"});

    text1.x_coord = x_max*0.5*x_scaling
    text1.y_coord = y_max*y_scaling
    text1.center(text1.x_coord, text1.y_coord);

    svg.addEventListener('mousemove',function(evt){
      var loc = cursorPoint(evt);
      text1.text(function(add){
        add.tspan("Scaled: (" + String(Math.round(loc.x)) + ", " + String(Math.round(loc.y)) + ")").newLine();
        add.tspan("Actual: (" + String(Math.round(loc.x/x_scaling)) + ", " + String(Math.round(loc.y/y_scaling)) + ")").newLine();
        add.tspan("Stage: " + current_step).newLine();
      });
    },false);
  }

  function construct_lines(dict_components){
    var bNodes = false
    for (let id_line in dict_components.lines){
        let line = dict_components.lines[id_line]
        draw_line(line,id_line,"line")

        let id = id_line

        let l = {
            info: line,
            UIElement: line.graphic[0],
            id : id,
        }
        components.lines[id_line] = l
        component_modal(l)
    }
  }

  function construct_loads(dict_components){
    var bNodes = false
    for (let id_load in dict_components.loads){
        let load = dict_components.loads[id_load]
        draw_line(load,id_load,"load")

        let id = id_load

        let line_object = load.graphic[0]

        if(load.y2 > load.y1 ){
                draw_load(load,1,true)
        }
        if(load.y2 < load.y1 ){
                draw_load(load,1,false)
        }


        let l = {
            info: load,
            UIElement: line_object,
            id : id,
        }

        l.setEnergised = function(){
              draw_load(load,1,true)
        }

        //put same object pointer in multiple locations. if something goes wrong with updating deletion/ids, it'll happen here
        components.lines[id_load] = l
//        components.loads[id_load] = l

        component_modal(l)
    }
  }

  function construct_busbars(dict_components){
    var bNodes = false
    for (let id_busbar in dict_components.busbars){

        let busbar = dict_components.busbars[id_busbar]
//        load = style_line(load)
        draw_line(busbar,id_busbar,"busbar")

        let id = id_busbar

        line_object = busbar.graphic[0]

        let l = {
            info: busbar,
            UIElement: busbar.graphic[0],
            id : id,
        }
        components.lines[id_busbar] = l
        components.busbars[id_busbar] = l

        component_modal(l)
    }
  }

  function construct_breakers(dict_components, network_, step, callback){
        init_breakers(network_, option, dict_components.breakers, step, function(breakers){
        for(let id in breakers){
            //doing this means the inital data, and the SVG elements they make remain unchanged at all times.
            // may be very useful should a redraw/reset be needed...
            // define listener handles now since they have access to everything relevant

            let breaker = breakers[id]
            if(breaker.name === false){
                breaker.name = id
            }

            breaker.callback = Breaker_Callback(breaker.graphic, breaker.name)

            draw_breaker(dict_components.lines[breaker.lineID] , breaker)
            let closed = breaker.state === 'closed'
            let b = {
                info:breaker,
                UIElement: breaker.graphic[0],
                closed: closed,
                id : id,
                line : dict_components.lines[breaker.lineID]
            }

            b.setState = function(closed){
                line = components.breakers[id].line
                rect = components.breakers[id].UIElement

                breaker.colour = palette[line.voltage]
                this.closed = closed
                if (closed == false){
                    rect.fill({ color: palette["background-color"] })
                    rect.stroke({ color: line.graphic[0].attr().stroke })
                } else if (closed == true){
                    rect.fill({ color: line.graphic[0].attr().stroke })
                    rect.stroke({ color: line.graphic[0].attr().stroke })
              }
              this.closed = closed
            }

            b.setEnergised = function(){
              if(this.closed){
                 this.UIElement.attr({
                'stroke': this.line.dict_styling.stroke.live_color,
                'fill': this.line.dict_styling.stroke.live_color
                })
              }
              else{
                this.UIElement.attr({
                    'stroke': this.line.dict_styling.stroke.live_color,
    //                'fill': this.line.dict_styling.stroke.live_color})
                })
              }
    //            this.UIElement.attr({
    //             'stroke': this.line.dict_styling.stroke.live_color,
    //             'fill': this.line.dict_styling.stroke.live_color
    //             })
            }

            b.UIElement.on("breaker_clicked",function(event){
                let breaker = components.breakers[id]
                breaker.setState(!breaker.closed)
                // post_breakers(components.breakers)
                check_breakers(network_, option, components.breakers, step, function(breaker_matches_next){
                  if(breaker_matches_next && page === "home"){ // IF correct breaker is clicked
                    inc_state(case_network)
                  }
                })
            });


            components.breakers[id] = b
            component_modal(b)
        }
        callback({});
    });
  }

  function construct_labels(dict_components){
            //add text
    for(let i in dict_components.labels){
        let text = dict_components.labels[i]
        let line_id = text.lineID
        let line = components.lines[line_id].UIElement
        let texts = text.text_strings
        let offset = text.offset
        let size = text.size
        let colour = text.colour
        add_text(line,false,texts, offset[0],offset[1],colour,size,text.callback)
        let id = i
        let t = {initInfo:text, UIElement: text.graphic[0], id : id}

        components.labels[id] = t
    }
  }

  function construct_txs(dict_components){
    //add transformers
    for(let i in dict_components.tx){
        let tx = dict_components.tx[i]
        let line_id = tx.lineID
        let line = dict_components.lines[line_id]
        let name = tx.name
        let pos = tx.pos
        let type = tx.type
        let coil1 = tx.coil1
        let coil2 = tx.coil2
        let callback = tx.callback
        draw_tx(line, tx)

        let liveCoils = [line.voltage,coil2]

        let id = i
        let t = {info:tx, UIElement: tx.graphic[0], id : id}

        t.setLive = function(){
            UIElements = this.UIElement.children()
            circle1 = UIElements[1]
            circle1.attr({stroke: palette[liveCoils[0]]})
            circle2 = UIElements[3]
            circle2.attr({stroke: palette[liveCoils[0]]})

            circle3 = UIElements[2]
            circle3.attr({stroke: palette[liveCoils[1]]})
            circle4 = UIElements[4]
            circle4.attr({stroke: palette[liveCoils[1]]})


        }

        components.transformers[id] = t
        component_modal(t)

        }
  }

  function construct_gens(dict_components){
            //add Generators
    for(i in dict_components.generators){
        let gen = dict_components.generators[i]
        let line = dict_components.lines[gen.lineID]
        let pos = gen.pos
        let callback = gen.callback
        let type = gen.type

        draw_gen(line,pos,type, callback)
        let id = i
        let g = {info: gen, UIElement: gen.graphic[0], id : id}
        components.generators[id] = g
        component_modal(g)

    }
  }

  function construct_inductors(dict_components){
        for(i in dict_components.inductors){
        inductor = dict_components.inductors[i]
        line = dict_components.lines[inductor.lineID]
        pos = inductor.pos
        callback = inductor.callback

        draw_inductor(line,pos)
        id = i
        let ind = {initInfo:inductor, UIElement: inductor.graphic[0], id : id}
        components.inductors[id] = inductor
    }
  }

  function construct_isolators(dict_components){
    for(i in dict_components.isolators){
        isolator = dict_components.isolators[i]
        line = dict_components.lines[isolator.lineID]
        state = isolator.state
        if(isolator.name === false){
            isolator.name = i
        }
        isolator.callback = Breaker_Callback(isolator.graphic,isolator.name)
        draw_isolator(line, isolator)
        let id = i
        let closed = state == 'closed'
        let iso = {drawInfo:isolator, UIElement: isolator.graphic[0], closed: closed, id : id, line : line}
        iso.redraw = function(){
            let colour = this.line.o_line.attr().stroke
            if(this.closed){
                 this.UIElement.attr({
                'stroke': colour,
          'fill':colour
            })}
            else{
            this.UIElement.attr({
                'stroke':colour,
//                'fill': this.line.dict_styling.stroke.live_color})
            })
            }
            }
        components.isolators[id] = iso

    }
    }

  function construct_dataviews(dict_components) {
      for(let id_dv in dict_components.dataViews){
        let dataview_ = dict_components.dataViews[id_dv]
        let componentID = dataview_.componentID
        let line = components.lines[componentID]
        let gen = components.generators[componentID]
        let tx = components.transformers[componentID]
        let offset = dataview_.offset
        let labels = dataview_.labels
        let colour = "#d6ba00"
        let observer = undefined

        if(line !== undefined){
          observer = line.UIElement
        } else if(gen !== undefined){
          observer = gen.UIElement
        } else if(tx !== undefined){
          observer = tx.UIElement
        }

        add_dataview(observer, [""], offset, function (text_object) {
          components.dataviews[id_dv] = {
            text: [""],
            observer: observer,
            text_object: text_object,
            offset: offset,
            labels: labels,
            colour: colour
          }
        })
    }
  }

  function redraw_dataview(id_dv, text_list){
    let dataview_ = components.dataviews[id_dv];
    // dataview_.text_object.remove()
    add_dataview(dataview_.observer, text_list, dataview_.offset, function (text_object) {
    components.dataviews[id_dv] = {
        text: text_list,
        observer: dataview_.observer,
        text_object: text_object,
        offset: dataview_.offset,
        colour: dataview_.colour
    }
    })
  }

  function construct_available_power(dict_components){
      for(let power_id in dict_components.availablePower){
          let availablePower = dict_components.availablePower[power_id]
          let componentID = power_id
          let position = availablePower.pos
          let colour = "#ffffff"
          let callback = availablePower.callback

          add_static_text(["POWER AVAILABLE"], x=position[0], y=position[1], colour=colour, callback)
          variable_text = add_static_text(["0 MW"], x=position[0], y=position[1]+font_size, colour=colour, Text_Callback(availablePower.graphic))

          let UIElement = availablePower.graphic[0]

          let width = font_size*7/x_scaling
          let height = font_size*3
            // topLeftPoint = [position[0]-width*4/5 * x_scaling,position[1]+(7.5*y_scaling-height)/2
          topLeftPoint = [position[0]-width * x_scaling,position[1]-(height/2.5)]
          topRightPoint = [position[0]+width * x_scaling ,position[1]+height/1.5]

          i = 0;

          line_width = width*2*x_scaling
          draw_line(StraightLine(topLeftPoint,"right",line_width),componentID+"diagram"+i++,"diagram")
          draw_line(StraightLine(topLeftPoint,"down",height*1.07),componentID+"diagram"+i++,"diagram")
          draw_line(StraightLine(topRightPoint,"up",height*1.07),componentID+"diagram"+i++,"diagram")
          draw_line(StraightLine(topRightPoint,"left",line_width),componentID+"diagram"+i++,"diagram")

          let id = power_id
          //todo potentially add diagram lines to dictionary
          let pa = {info:availablePower, UIElement: availablePower.graphic[0], id : id}
          pa.setAvailablePower = function(POWER){
            this.UIElement.remove()
            graphic = []
            variable_text = add_static_text([POWER + " MW"], position[0], position[1]+15*y_scaling, colour=colour, Text_Callback(graphic))
            let UIElement = availablePower.graphic[0]

//            console.log(UIElement.node.children[0].innerHTML)
//            UIElement.node.children[0].innerHTML = POWER + " MW"
          }
          components.availablePowers[power_id] = pa
        }
  }

  function construct_generation_info(dict_components){
      for(let gen_info_id in dict_components.generationInfo){
          let gen_info = dict_components.generationInfo[gen_info_id]
          let componentID = gen_info_id
          let position = gen_info.pos
          let colour = "#d6ba00"
          let callback = gen_info.callback
          let name = gen_info.name
          let id = gen_info_id

          let width = 175 * x_scaling


          let center = [position[0]*x_scaling,position[1]*y_scaling]
          //draw heading
          add_static_text([name], center[0], center[1], colour=colour, callback)

          add_static_text(["MW"], center[0]-width/4, center[1]+font_size*2, colour=colour, callback)
          add_static_text(["MVAR"], center[0]-width/4, center[1]+font_size*4, colour=colour, callback)

          //draw MW & MVAR
          MW_graphic = []
          MVAR_graphic = []
          add_static_text(["0"], center[0]+width/4, center[1]+font_size*2, colour=colour, Text_Callback(MW_graphic))
          add_static_text(["0"], center[0]+width/4, center[1]+font_size*4, colour=colour, Text_Callback(MVAR_graphic))

          //draw grid
          line_base_id = id+"_line"
          let i = 0
          let line1 = StraightLine([center[0]-width/2,center[1] + font_size], "right", width)
          draw_line(line1, line_base_id+i++, "diagram")

          let line2 = StraightLine([center[0]-width/2,center[1] + font_size*5], "right", width)
          draw_line(line2, line_base_id+i++, "diagram")

          let line3 = StraightLine([center[0]-width/2,center[1] + font_size], "down", font_size*4)
          draw_line(line3, line_base_id+i++, "diagram")

          let line4 = StraightLine([center[0],center[1] + font_size], "down", font_size*4)
          draw_line(line4, line_base_id+i++, "diagram")

          let line5 = StraightLine([center[0]+width/2,center[1] + font_size], "down", font_size*4)
          draw_line(line5, line_base_id+i++, "diagram")

          let line6 = StraightLine([center[0]-width/2,center[1] + font_size*3], "right", width)
          draw_line(line6, line_base_id+i++, "diagram")


          let genInfo = {info:gen_info, UIElement: [MW_graphic[0],MVAR_graphic[0]], id : id}

          genInfo.setMVAR = function(MVAR){
            this.UIElement[1].remove()
            let graphic = []
            variable_text = add_static_text([MVAR], center[0]+width/4, center[1]+font_size*4, colour=colour, Text_Callback(graphic))
            this.UIElement[1] = graphic[0]
          }

           genInfo.setMW = function(MW){
            this.UIElement[0].remove()
            let graphic = []
            variable_text = add_static_text([MW], center[0]+width/4, center[1]+font_size*2, colour=colour, Text_Callback(graphic))
            this.UIElement[0] = graphic[0]
          }

          components.generationInfo[id] = genInfo


        }



  }

  function construct_action(){
    draw_action_button();
    draw_admin_buttons();
  }

  function construct_SGTs(dict_components){
      for(let i in dict_components.SGTs){
        let sgt = dict_components.SGTs[i]
        let line_id = sgt.lineID
        let line = dict_components.lines[line_id]
        let name = sgt.name
        let callback = sgt.callback
        draw_SGT(line, callback)

        let id = i
        let s = {info:sgt, UIElement: sgt.graphic[0], id : id}
        components.SGTs[id] = s
        component_modal(s)
        }
  }

  let GeneratorControlManager = class{
    buttons = [];
    state = 0;
    constructor(buttons) {
        this.buttons=buttons;
        this.state=0;
        let setState = this.setState;
        let percentage=0
        for(let button_id in buttons){
            let button = buttons[button_id];
            button.click(this.buttonClick(this,percentage));
            percentage+=5;
        }
        this.setState(this.state)
    }
    getState(){
        return this.state;
    }
    setState(percentage){
        this.state=percentage;

        let b_percentage = 0;
        for(let button_id in buttons){
            let button = this.buttons[button_id]
            if(percentage>=b_percentage){
                button.fill("green")
            }
            else{
                button.fill("#d3d3d3")
            }
            b_percentage+=5
        }

    }
    buttonClick(host, percentage){
        return function(){
            host.setState(percentage)
        }

    }



  }

  function construct_generator_controls(dict_components){
        for(let i in dict_components.generatorControls){
        gen_control = dict_components.generatorControls[i]
        let pos = gen_control.pos
        let id = i
        let callback = gen_control.callback

        let title_string = "generator control for "+ id
        add_static_text([title_string], x=pos[0]*x_scaling, y=pos[1]*y_scaling, colour="#d3d3d3", callback)

        let b_y_offset = (pos[1] + 30)*y_scaling
        let b_x_offset = (pos[0] + 0 - (font_size*title_string.length)/3)*x_scaling

        let percentage = 0

        button_height = 20 * y_scaling
        button_width = 30 * x_scaling
        buttons = []

        while(percentage <= 45){
            if(percentage == 50){
            b_y_offset = b_y_offset+(30*y_scaling)
            b_x_offset = (pos[0] + 0 - (font_size*title_string.length)/3)*x_scaling
            }
            let group = draw.group()
            var rect = draw.rect(button_width, button_height).fill("#d3d3d3")


            var text = draw.text(percentage +'%');
            text.font({anchor: 'middle',color:"blue", size: font_size, family: 'Helvetica'});
            text.center(0.75*button_width, 0.4*button_height);

            group.add(rect)
            group.add(text);

            group.move(b_x_offset, b_y_offset)
            percentage+=5
            b_x_offset += button_width + 3*x_scaling

            buttons.push(rect)
        }

        let generator_control_manager = new GeneratorControlManager(buttons)

        components.generatorControls.push(generator_control_manager)

//        var slider = $("<input>", {type: "range", id: "foo", "class": "a"});


        }
  }