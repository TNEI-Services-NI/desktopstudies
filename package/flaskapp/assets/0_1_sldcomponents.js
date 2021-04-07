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

/**
 * Callback function for Transformer object instances. Adds object to list of child objects associated with
 * the transformer.
 * @param  {list} graphic_objects List of child objects associated with each transformer object.
 * @param  {string} name String object containing name/contents of child objects
 * @return {function} None Returns a function that adds passed object to breaker child objects, and adds text label.
 */
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

/**
 * breaker prototype object. used to hold all information required to draw a breaker
 * @param  {string} ID of line to draw breaker on
 * @param  {double} pos of breaker on line (between 0 and 1)
 * @param {string} initial state of the breaker, default "closed".
 * @param {boolean/String} name of breaker for drawing labels. false value indicates no name set, default false
 * @return None
 * @usage instantiate as object i.e. new Breaker(...)
 */
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

/**
 * line prototype object. used to hold all information required to draw a line
 * @param  {double} x1 x origin point
 * @param  {double} y1 y origin point
 * @param  {double} x2 x end point
 * @param  {double} y2 y end point
 * @param  {String} voltage level of line. default "33kV"
 * @param {boolean} dash if the line is a dashed line or not. default false
 * @param {String} colour of line in hex format used to overwrite colour. default ""
 * @return None
 * @usage instantiate as object i.e. new Line(...)
 */
function Line(x1, y1,x2, y2, voltage="32kV", dash = false, colour = ""){
    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
    this.voltage = voltage
    this.callback = 0
    this.dash = dash
    this.colour=colour
}

/**
 * helper which builds a Line object
 * @param  {list} origin point of line [x,y]
 * @param  {String} direction of line ("up","down","left","right")
 * @param  {String} voltage of line. default "33kV"
 * @param {boolean} dash if the line is a dashed line or not. default false
 * @param {String} colour of line in hex format used to overwrite colour. default ""
 * @return {Line} Returns a line object
 */
function StraightLine(origin, direction, length, voltage="33kV", dash = false, colour = ""){
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

/**
 * Text Prototype object
 * @param  {string} Line ID of which text is linked to
 * @param  {list} list of text content, each member of list is a new line
 * @param  {line} offset of text from line [x,y]
 * @return {None}
 * @usage instantiate as object i.e. new Line(...)
 */
function Text(lineID, text, offset){
    this.component="Text"

    this.lineID = lineID
    this.text_strings = text
    this.offset = offset
    this.graphic = []
    this.callback = Text_Callback(this.graphic)
}

/**
 * Transformer Prototype object
 * @param  {string} Line ID of which Transformer is on
 * @param  {double} pos of transformer on line (between 0 and 1)
 * @param {string} type of transformer, default "starDelta"
 * @param {String} coil 1 voltage
 * @param {String} coil 2 voltage
 * @return {None}
 * @usage instantiate as object i.e. new Transformer(...)
 */
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

/**
 * Generator Prototype object
 * @param  {string} Line ID of which Generator is on
 * @param  {double} pos of generator on line (between 0 and 1)
 * @param {string} type of Generator, default "wind"
 * @return {None}
 * @usage instantiate as object i.e. new Generator(...)
 */
function Generator(line_id,pos, type= "wind"){
    this.component="Generator"

    this.lineID = line_id
    this.pos = pos
    this.type = type
    this.graphic=[]
    //TEMP Breaker callback
    this.callback = Breaker_Callback(this.graphic)
}

/**
 * Inductor Prototype object
 * @param  {string} Line ID of which Generator is on
 * @param  {double} pos of generator on line (between 0 and 1)
 * @return {None}
 * @usage instantiate as object i.e. new Inductor(...)
 */
function Inductor(line_id,pos){
    this.component="Inductor"

    this.lineID = line_id,
    this.pos = pos,
    this.graphic=[],
    this.callback = Breaker_Callback(this.graphic)
}

/**
 * Isolator Prototype object
 * @param  {string} Line ID of which Generator is on
 * @param  {double} pos of generator on line (between 0 and 1)
 * @param {string} type of Generator, default "wind"
 * @param {string} state of isolator
 * @param {boolean/String} name of breaker for drawing labels. false value indicates no name set, default false
 * @return {None}
 * @usage instantiate as object i.e. new Isolator(...)
 */
function Isolator(line_id,pos, state = "closed",name=false){
    this.component="Isolator"
    this.lineID = line_id,
    this.pos = pos,
    this.state=state
    this.graphic=[],
    this.name = name,
    this.callback = Breaker_Callback(this.graphic,name)}