
  function prepare_canvas(x, y){
    //Create canvas
    $('#drawing').empty();
    background = draw.rect(x, y).fill(palette["background-color"])

  }

  function scale_lines(networks_undrawn){
  for(let id_dict in networks_undrawn){
    let temp_dict_components = networks_undrawn[id_dict]
    for (let idx_line in temp_dict_components.lines){
        let temp_dict = temp_dict_components.lines[idx_line]
        temp_dict.x1 = temp_dict.x1 * x_scaling
        temp_dict.x2 = temp_dict.x2 * x_scaling
        temp_dict.y1 = temp_dict.y1 * y_scaling
        temp_dict.y2 = temp_dict.y2 * y_scaling
    }
  }
  }

  function scale_labels(networks_undrawn){
   for(let id_dict in networks_undrawn) {
     let temp_dict_components = networks_undrawn[id_dict]
     //scale text
     for (let idx in temp_dict_components.labels) {
       temp_dict = temp_dict_components.labels[idx]
       temp_dict.offset[0] = temp_dict.offset[0] * x_scaling
       temp_dict.offset[1] = temp_dict.offset[1] * y_scaling
     }
   }
  }

  function style_line(line){
    line.dict_styling = {fill: { width: line_palette_style["width"]},
                         stroke: { width: line_palette_style["width"]}}
    if (line.dash){
              line.dict_styling = {fill: { width: line_palette_style["width"]/2},
                         stroke: { width: line_palette_style["width"]/2}}
      line.dict_styling.stroke.dasharray = (5, 5)

    }
    let colour = undefined
    if (line.live){
      colour = palette[line.voltage]

    } else {
      colour = palette["0V"]
    }
    line.dict_styling.stroke.color = colour
    line.dict_styling.fill.color = colour
    // line.dict_styling.stroke.color = palette[line.voltage]
    return line
  }

  function construct_lines(dict_components){
    var bNodes = false

    for (let id_line in dict_components.lines){
        let line = dict_components.lines[id_line]

        line = style_line(line)

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

        component_modal(l)
    }
  }

  function destroy_lines(){

  }

  function construct_breakers(dict_components, network_, step){
        init_breakers(network_, dict_components.breakers, step, function(breakers){
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
                    rect.stroke({ color: 'white' })
                } else if (closed == true){
                    rect.fill({ color: breaker.colour })
                    rect.stroke({ color: "white" })
              }
            }

            b.UIElement.on("breaker_clicked",function(event){
                let breaker = components.breakers[id]
                breaker.setState(!breaker.closed)
                // post_breakers(components.breakers)
                inc_state(network_)  // IF correct breaker is clicked
            });

            components.breakers[id] = b
            component_modal(b)
        }
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
        let colour = text.colour
        add_text(line,false,texts, offset[0],offset[1],colour,text.callback)
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

        let id = i
        let t = {info:tx, UIElement: tx.graphic[0], id : id}
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
        components.isolators[id] = iso
    }
    }

  function construct_dataviews(dict_components){
        for(i in dict_components.dataViews){
          dv = dict_components.dataViews[i]
          let text_data = dv.data

          console.log(text_data)

          let pos = [dv.x,dv.y]
          componentID = dv.componentID
          let observingComponent = undefined
          var componentID = dv.componentID
          if (componentID == ""){
            componentID = Object.keys(dict_components.lines)[0]
          }
          observingComponent = components.lines[componentID]

          let group = draw.group()
          let textObjects = {}
          observingComponent = components.lines[componentID]
          if(observingComponent === undefined){
            observingComponent = components.generators[componentID]
          }
          callback = function(data){

              for(i in text_data){
              //retrieve again because it's outdated
                  static_text = text_data[i]
                  text = data[0] + " " + i

          callback = function(){
              for(text in textObjects){
                textObjects[text].remove()
              }
              offset = 0
              for(i in data){
                  static_text = text_data["Amps"]
                  text = observingComponent.data + " " + i
                  pos = static_text.offset
                  holder = []
                  add_static_text([text],pos[0]*x_scaling,pos[1]+offset*y_scaling,"yellow",function(object){holder[0] = object})
                  textObjects[i] = holder[0]
//                  group.add(holder[0])
                  offset+=15
              }
          }

          observingComponent.data_changed_callback = callback


//

//
//              for(i in data){
//                  static_text = data[i]
//                  text = static_text.text
//                  pos = static_text.offset
//                  holder = []
//                  add_static_text([text],pos[0]*x_scaling,pos[1]*y_scaling,"yellow",function(object){holder[0] = object})
//                  textObjects[i] = holder[0]
//                  group.add(holder[0])
//              }
//
//          //todo add listener to that component
//            id = i
//            let dataview = {drawInfo:dv, UIElement: group, textObjects: textObjects, id : i, componentID : componentID}
//
//            //todo decide how it knows what kind of component it's watching...
//            observingComponent = components.lines[componentID]
//            observingComponent.addEventListener("component_data_changed",function(event){alert("component changed!")})
            }
  }
          observingComponent.data_changed_callback = callback
}}
  function destroy_dataviews(dict_components){

      for(i in dict_components.dataViews){
        dv = dict_components.dataViews[i]
        data = dv.data
        pos = [dv.x,dv.y]
        for(i in data){
            static_text = data[i]
            text = static_text.text
            pos = static_text.offset
            holder = []
            add_static_text([text],pos[0]*x_scaling,pos[1]*y_scaling,"yellow",function(object){holder[0] = object})
            }
        }
  }

  function construct_SGTs(dict_components){
      for(let i in dict_components.SGTs){
        let sgt = dict_components.SGTs[i]
        let line_id = sgt.lineID
        let line = dict_components.lines[line_id]
        let name = sgt.name
        let callback = sgt.callback
        draw_SGT(line,callback)

        let id = i
        let s = {info:sgt, UIElement: sgt.graphic[0], id : id}
        components.lines[id] = s
        component_modal(s)
        }
  }