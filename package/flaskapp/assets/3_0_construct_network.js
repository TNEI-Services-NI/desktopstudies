
  function scale_lines(dict_components){
    for (let idx_line in dict_components.lines){
        let temp_dict = dict_components.lines[idx_line]
        temp_dict.x1 = temp_dict.x1 * x_scaling
        temp_dict.x2 = temp_dict.x2 * x_scaling
        temp_dict.y1 = temp_dict.y1 * y_scaling
        temp_dict.y2 = temp_dict.y2 * y_scaling
    }
  }

  function scale_labels(dict_components){
    //scale text
    for (let idx in dict_components.labels){
        temp_dict = dict_components.labels[idx]
        temp_dict.offset[0] = temp_dict.offset[0] * x_scaling
        temp_dict.offset[1] = temp_dict.offset[1] * y_scaling
    }
  }

  function style_line(temp_dict){
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
    return temp_dict
  }

  function construct_lines(dict_components){
    var bNodes = false

    for (let idx_line in dict_components.lines){
        let temp_dict = dict_components.lines[idx_line]

        temp_dict = style_line(temp_dict)

        temp_dict.o_line = draw.line(temp_dict.x1 , temp_dict.y1,
                                      temp_dict.x2, temp_dict.y2).stroke(temp_dict.dict_styling.stroke)

        temp_dict.line_idx = idx_line

        if (bNodes){
          draw_nodes(temp_dict, temp_dict.o_line)
        }

        dict_components.lines[idx_line] = temp_dict
        components.lines[idx_line] = {drawInfo:temp_dict, UIElement: temp_dict.o_line}
    }
  }

  function construct_breakers(dict_components){
        init_breakers("chapelcross", "33kv", dict_components.breakers, function(breakers){
        for(let id in breakers){
            //doing this means the inital data, and the SVG elements they make remain unchanged at all times.
            // may be very useful should a redraw/reset be needed...
            // define listener handles now since they have access to everything relevant

            let breaker = breakers[id]
            if(breaker.name === false){
                breaker.name = id
            }

            breaker.callback = Breaker_Callback(breaker.graphic, breaker.name)

            draw_breaker(dict_components.lines[breaker.lineID] ,breaker.pos, breaker.size, breaker.state, breaker.callback)
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
                inc_state()
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
        let type = tx.type
        let pos = tx.pos
        let coil1 = tx.coil1
        let coil2 = tx.coil2
        draw_tx(line,pos,type,[coil1,coil2],tx.callback)

        let id = i
        let t = {info:tx, UIElement: tx.graphic[0], id : id}
        components.lines[id] = t
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
        pos = isolator.pos
        state = isolator.state
        if(isolator.name === false){
            isolator.name = i
        }
        isolator.callback = Breaker_Callback(isolator.graphic,isolator.name)
        callback = isolator.callback
        draw_isolator(line,pos,12,state,callback)
        let id = i
        let closed = state == 'closed'
        let iso = {drawInfo:isolator, UIElement: isolator.graphic[0], closed: closed, id : id, line : line}
        components.isolators[id] = iso
    }}

  function construct_dataviews(dict_components){

        for(i in dict_components.dataViews){
          dv = dict_components.dataViews[i]
          data = dv.data
          pos = [dv.x,dv.y]
              for(i in data){
              console.log(i)
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