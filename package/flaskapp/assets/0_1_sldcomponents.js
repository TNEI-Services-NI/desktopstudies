
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
            graphic_objects[0] = object
        }
        if(name !== ''){
            if(object.horizontal === true){
                add_text(object, false, [name], 0, -15,"#d3d3d3", function(object){})
            }
            else{
                add_text(object, false, [name], 3 + name.length*4 * x_scaling, 0,"#d3d3d3", function(object){})}
        }
    }
}

/**
 * Callback function for breaker object instances. Adds object to list of child objects associated with
 * the breaker.
 * @param  {list} graphic_objects List of child objects associated with each breaker object.
 * @param  {string} name String object containing name/contents of child object
 * @return {function} None Returns a function that adds passed object to breaker child objects, and adds text label.
 */
function Line_Callback(graphic_objects, name = ''){
    return function(object){
        // Add object defined in
        if(graphic_objects !== undefined){
            graphic_objects[0] = object
        }
        if(name !== ''){
            if(object.horizontal === true){
                add_text(object, false, [name], 0, -15,"#d3d3d3", function(object){})
            }
            else{
                add_text(object, false, [name], 9 + name.length*5, 0,"#d3d3d3", function(object){})}
        }
    }
}

/**
 * Callback function for text object instances. Adds object to list of child objects associated with
 * the text.
 * @param  {list} graphic_objects List of child objects associated with each breaker object.
 * @return {function} None Returns a function that adds passed object to breaker child objects.
 */
function Text_Callback(graphic_objects){
    return function(object){
        // Add object defined in
        if(graphic_objects !== undefined){
            graphic_objects[0] = object
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
function Tx_Callback(graphic_objects, name = false, mva = false){
        return function(group){
            //revamp post_breaker to a function that figures out its state instead
//            object.on("breaker_clicked",function(){post_breaker()})
            if(graphic_objects != undefined){
                graphic_objects[0] = group
            }

            if(name.constructor !== Array){
             name = [name]
            }
            if(name != false){
            if(group.horizontal === true){
                add_text(group, false, name, 0 * x_scaling, -20 *y_scaling, "#d3d3d3", function(group){})
            }
            else{
                add_text(group, false, name, 30 * x_scaling,-10 *y_scaling, "#d3d3d3", function(group){})}
            }

            if(mva != false){
            if(group.horizontal === true){
                add_text(group, false, [mva], 0, 20 * y_scaling,"#d3d3d3", function(group){})
            }
            else{
                add_text(group, false, [mva], 30 * x_scaling,10 *y_scaling,"#d3d3d3", function(group){})}
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
function Gen_Callback(graphic_objects){
        return function(group){
            if(graphic_objects != undefined){
                graphic_objects[0] = group
            }
            if(group.horizontal === true){
                add_text(group, false, ["GENERATOR"], 0, -25, "#d3d3d3",function(group){})
            }
            else{
                add_text(group, false, ["GENERATOR"], 0,25,"#d3d3d3",function(group){})}
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
function Breaker(lineID, pos, name=false, state = "closed"){
    this.component="Breaker"
    this.lineID = lineID
    this.pos = pos
    this.state = "closed"
    this.size = 15
    this.graphic = []
    this.colour = undefined
    this.name = name
    this.live = live_dead
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
    this.component="Line"
    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
    this.voltage = voltage
    this.graphic = []
    this.callback = Line_Callback(this.graphic)
    this.dash = dash
    this.live = live_dead
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
 * @param  {String} colour of text
 * @param  {double} textsize
 * @return {None}
 * @usage instantiate as object i.e. new Line(...)
 */
function Text(lineID, text, offset, colour = "#d3d3d3", textSize=10){
    this.lineID = lineID
    this.text_strings = text
    this.offset = offset
    this.colour = colour
    this.graphic = []
    this.textSize=textSize
    this.callback = Text_Callback(this.graphic)

    // an idea I'd like to to take a look at
    // a component creates itself and handles everything
    this.draw = function(){alert("drawing")}
}

/**
 * Static Text Prototype object
 */
function StaticText(text,pos, colour = "#d3d3d3",textSize=10,){
    this.offset = pos
    this.text =text
    this.colour = colour
    this.graphic = []
    this.textSize=textSize
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
function Tx(lineID,pos,name,mva, coil1 = "33kV",coil2 = "33kV",type="starDelta"){
    this.lineID =lineID
    this.pos = pos
    this.component="Transformer"
    this.name = name
    this.mva = mva
    this.graphic = []
    this.type = type
    this.coil1 = coil1
    this.coil2 = coil2
    this.live = live_dead
    this.colour = undefined
    this.callback = Tx_Callback(this.graphic, this.name,this.mva)
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
    this.live = live_dead
    //TEMP Breaker callback
    this.callback = Gen_Callback(this.graphic)
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
    this.live = live_dead
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
    this.lineID = line_id,
    this.pos = pos,
    this.size = 15,
    this.state=state,
    this.graphic=[],
    this.name = name,
    this.live = live_dead
    this.colour = undefined
    this.callback = Breaker_Callback(this.graphic,name)}

/**
 * Dataview prototype object, contains everything reequired to make a dataview.
 * @param  {double} x location
 * @param  {double} y location
 * @param  {list} labels of data desired ["kV", "AMPS", "Hz","MVAR","MVA","MW"]
 * @return {None}
 * @usage instantiate as object i.e. new DataView(...)
 */
function DataView(componentID = "", offset){
    // this.x = x
    // this.y = y
    this.data = {}
    this.graphic = []
    this.componentID = componentID
    this.offset = offset
    this.callback = undefined

}

function AvailablePower(position){
    this.pos = position
    this.graphic = []
    this.callback = Text_Callback
}

function GenerationInfo(position, name){
    this.pos = position
    this.name = name
    this.graphic = []
    this.callback = Text_Callback
}

function SGT(line_id,name){
    this.component = "SGT"
    this.lineID = line_id,
    this.graphic=[],
    this.name = name,
    this.callback = Breaker_Callback(this.graphic,name)}