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

/**
 * Callback function for breaker object instances. Adds object to list of child objects associated with
 * the breaker.
 * @param  {list} graphic_objects List of child objects associated with each breaker object.
 * @param  {string} name String object containing name/contents of child object
 * @return {function} None Returns a function that adds passed object to breaker child objects, and adds text label.
 */
function Breaker_Callback(graphic_objects, name = ''){
    return function(object){
        // Add object defined in
        if(graphic_objects !== undefined){
            graphic_objects.push(object)
        }
        if(name !== ''){
            if(object.horizontal === true){
                add_text(object, false, [name], 0, -15, function(object){})
            }
            else{
                add_text(object, false, [name], 9 + name.length*5, 0, function(object){})}
        }
    }
}
function Text_Callback(graphic_objects){
        return function(object){
            //revamp post_breaker to a function that figures out its state instead
//            object.on("breaker_clicked",function(){post_breaker()})
            if(graphic_objects != undefined){
                graphic_objects.push(object)
            }
        }
    }
function Tx_Callback(graphic_objects, name = false){
        return function(circle1,circle2,circle3,circle4,group){
            //revamp post_breaker to a function that figures out its state instead
//            object.on("breaker_clicked",function(){post_breaker()})
            if(graphic_objects != undefined){
                graphic_objects.push(group)
            }
            add_text(circle1, false, [name], 7, 20, function(object){
            return 0
            });
        }
    }


function Breaker(lineID, pos, state = "closed", name=false){
    this.component="Breaker"
    this.lineID = lineID
    this.pos = pos
    this.state = state
    this.size = 15
    this.graphic = []
    this.name = name
    this.callback = Breaker_Callback(this.graphic)

}

function Line(x1, y1,x2, y2, voltage="32kV", dash = false, colour = "#ffffff"){
    this.component="Line"
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
    this.component="Text"

    this.lineID = lineID
    this.text_strings = text
    this.offset = offset
    this.graphic = []
    this.callback = Text_Callback(this.graphic)
}

function Tx(lineID,pos,name,type="starDelta", coil1 = "33kV",coil2 = "33kV"){
    this.component="Transformer"

    this.lineID =lineID
    this.pos = pos
    this.name = name
    this.graphic = []
    this.type = type
    this.coil1 = coil1
    this.coil2 = coil2
    this.callback = Tx_Callback(this.graphic, this.name)
}

function Generator(line_id,pos, type= "wind"){
    this.component="Generator"

    this.lineID = line_id
    this.pos = pos
    this.type = type
    this.graphic=[]
    //TEMP Breaker callback
    this.callback = Breaker_Callback(this.graphic)
}

function Inductor(line_id,pos){
    this.component="Inductor"

    this.lineID = line_id,
    this.pos = pos,
    this.graphic=[],
    this.callback = Breaker_Callback(this.graphic)
}

function Isolator(line_id,pos, state = "closed",name=false){
    this.component="Isolator"
    this.lineID = line_id,
    this.pos = pos,
    this.state=state
    this.graphic=[],
    this.name = name,
    this.callback = Breaker_Callback(this.graphic,name)}