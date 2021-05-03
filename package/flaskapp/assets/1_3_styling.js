function live_colour(object){
  if(object.live){
    return palette["0v"]
  } else {
    return object.color
  }
}