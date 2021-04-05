  // Document Initialisation
  $(document).ready(function(){

  });


 //Define parent attributes
 //  var x = document.getElementById('myDiv').clientWidth;
  var x = window.innerWidth;
  // var y = document.getElementById('myDiv').clientHeight;
  var y = window.innerHeight;

  //Create canvas
  var draw = SVG('#drawing').size(x, y)

  // draw.zoom(3, 0)

  var x_scaling = x/1350
  var y_scaling = y/1100

dict_components = chapelcross_33kV

// dict_components.breakers = breakers
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

    temp_dict.o_line = draw.line(temp_dict.x1 , temp_dict.y1,
                                  temp_dict.x2, temp_dict.y2).stroke(temp_dict.dict_styling.stroke)

    temp_dict.line_idx = idx_line

    if (bNodes){
      draw_nodes(temp_dict, temp_dict.o_line)
    }

    dict_components.lines[idx_line] = temp_dict
    components.lines[idx_line] = {drawInfo:temp_dict, UIElement: temp_dict.o_line}
}

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
            drawInfo:breaker,
            UIElement: breaker.graphic[0],
            closed: closed,
            id : id,
            line : dict_components.lines[breaker.lineID]
        }


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
        });

        components.breakers[id] = b

    }
});


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
    coil1 = tx.coil1
    coil2 = tx.coil2
    draw_tx(line,pos,type,[coil1,coil2],tx.callback)

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

    draw_gen(line,pos,type, callback)
    id = i
    let g = {initInfo:gen, UIElement: gen.graphic[0], id : id}
    components.generators[id] = g

}

for(i in dict_components.inductors){
    inductor = dict_components.inductors[i]
    line = dict_components.lines[inductor.lineID]
    pos = inductor.pos
    callback = inductor.callback

    draw_inductor(line,pos)
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
    draw_isolator(line,pos,12,state,callback)
    let id = i
    let closed = state == 'closed'
    let iso = {drawInfo:isolator, UIElement: isolator.graphic[0], closed: closed, id : id, line : line}
    components.isolators[id] = iso
}


function setBreakerState(breakerID, state){

}

function setLineVoltage(){LineID, voltage}{}