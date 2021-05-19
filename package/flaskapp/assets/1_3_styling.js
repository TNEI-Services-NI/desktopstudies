function live_colour(object){
  if(object.live){
    return palette["0v"]
  } else {
    return object.color
  }
}

function style_line(line){
  line.dict_styling = {fill: { width: line_palette_style["width"]/1.5 * Math.min(x_scaling,y_scaling)},
                       stroke: { width: line_palette_style["width"]/1.5 *  Math.min(x_scaling,y_scaling)}}
  if (line.dash){
            line.dict_styling = {fill: { width: line_palette_style["width"]/2 * Math.min(x_scaling,y_scaling)},
                       stroke: { width: line_palette_style["width"]/2 * Math.min(x_scaling,y_scaling)}}
    line.dict_styling.stroke.dasharray = (5, 5)

  }
  let colour = undefined
  if (line.live){
    colour = palette[line.voltage]

  } else {
    colour = palette["0V"]
  }
  line.dict_styling.stroke.color = colour
  line.dict_styling.stroke.live_color = palette[line.voltage]
  line.dict_styling.fill.color = colour
  line.dict_styling.fill.live_color = palette[line.voltage]
  return line
}

function style_busbar(line){
  line.dict_styling = {fill: { width: line_palette_style["width"] * Math.min(x_scaling,y_scaling)},
                       stroke: { width: line_palette_style["width"] * Math.min(x_scaling,y_scaling)}}
  if (line.dash){
            line.dict_styling = {fill: { width: line_palette_style["width"]/2 * Math.min(x_scaling,y_scaling)},
                       stroke: { width: line_palette_style["width"]/2 * Math.min(x_scaling,y_scaling)}}
    line.dict_styling.stroke.dasharray = (5, 5)

  }
  let colour = undefined
  if (line.live){
    colour = palette[line.voltage]

  } else {
    colour = palette["0V"]
  }
  line.dict_styling.stroke.color = colour
  line.dict_styling.stroke.live_color = palette[line.voltage]
  line.dict_styling.fill.color = colour
  line.dict_styling.fill.live_color = palette[line.voltage]
  // line.dict_styling.stroke.color = palette[line.voltage]
  return line
}

function style_diagram_line(line){
  line.dict_styling = {fill: { width: line_palette_style["width"]/2 * Math.min(x_scaling,y_scaling)},
                       stroke: { width: line_palette_style["width"]/2 * Math.min(x_scaling,y_scaling)}}
  if (line.dash){
            line.dict_styling = {fill: { width: line_palette_style["width"]/2 * Math.min(x_scaling,y_scaling)},
                       stroke: { width: line_palette_style["width"]/2 * Math.min(x_scaling,y_scaling)} }
    line.dict_styling.stroke.dasharray = (5, 5)

  }
  let colour = undefined
  if (line.live){
    colour = palette[line.voltage]

  } else {
    colour = palette["0V"]
  }
  line.dict_styling.stroke.color = colour
  line.dict_styling.stroke.live_color = palette[line.voltage]
  line.dict_styling.fill.color = colour
  line.dict_styling.fill.live_color = palette[line.voltage]
  // line.dict_styling.stroke.color = palette[line.voltage]
  return line
}

$("#legend_button").hover(function(){
  $(this).css("background-color", "#e70707");
  }, function(){
  $(this).css("background-color", "yellow");
});