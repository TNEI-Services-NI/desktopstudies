/**
 * flashes the given element between original and given colours
 * the breaker.
 * @param  {svg object} graphic object which is to flash.
 * @param  {string} colour of flash.
 * @return {None}
 */

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
