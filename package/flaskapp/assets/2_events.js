
/**
 * sends breaker state to server as ajax request
 * @param  {string} id of breaker
 * @param  {boolean} position of load on line (between 0 and 1)
 * @param  {boolean} state wether the breaker is closed (true) or not (false)
 * @return {None}
 */
function post_breaker(breakerID,state){
  if(breakerID === null){breakerID="b1"}
  if(state === null){state=false}
  $.ajax({
  type: "POST",
  url: "receive_breaker/",
  data: {"breaker": breakerID, "state": state },
//      dataType: 'application/json'
  }).done(function( data ) {
    // console.log(data);
  })
}

/**
 * receives initial states of all breakers through ajax request
 * @param  {string} network of sld
 * @param  {string} voltage section of said network
 * @param  {list} list of breaker prototypes to be drawn once data is received
 * @param  {function} callback which interprets/draws a list of breakers.
 * @return {None}
 */
function init_breakers(network, voltage, breakers, callback){
    var breakers_new = breakers
    $.ajax({
      type: "POST",
      url: "init_breakers/",
      data: {"network": network, "voltage": voltage},
      success: function(breaker_states){

        for (let breaker in breakers){
          if (breaker_states["state"][breaker] === undefined){
            breakers_new[breaker].state = "undefined";
          } else {
            breakers_new[breaker].state = breaker_states["state"][breaker];
          }
        }
        callback(breakers_new);
      }
    });

}


/**
 * retrieves state of one breaker
 * @param  {string} breaker id
 * @return {None}
 */
function init_breaker(breakerID){
      $.ajax({
      type: "POST",
      url: "init_breaker/",
      data: {"breaker": breakerID},
//      dataType: 'application/json'
      }).done(function( state ) {
        console.log(state);
      })
  }


const breaker_clicked_event = new CustomEvent('breaker_clicked')

/**
 * adds modal to a component which shows when the mouse hovers over it
 * @param  {string} component
 * @return {None}
 */
function component_modal(component){
  let type = component.info.component
  let group = component.UIElement
    group.mouseenter(function(e){
      $("#dataPopup").css('visibility', 'visible');
      $('#dataPopup').text(type+':');

      if(type ==="Breaker" || type === "Isolator"){
            $('<p> closed = '+component.closed+'</p>').appendTo('#dataPopup');
      }

      if(type ==="Generator"){
            $('<p> method = '+component.info.method+'</p>').appendTo('#dataPopup');
      }



//      $('<p>'+name+'</p>').appendTo('#dataPopup');
      // $('<p>Data:</p>').appendTo('#dataPopup');
      $.ajax({
        url:"data/scenario1.csv",
        dataType:"text",
        success:function(data)
        {
          var csv = data.split(/\r?\n|\r/);
          for(var count = 0; count<csv.length; count++)
          {
          var cell_data = csv[count].split(",");

          if(type === "Generator"){
            if(cell_data[0] === name && cell_data[2] === 'Active Power'){
              $('<p>P: '+cell_data[4+parseInt($('#buttonA').attr('stage'))]+' MW</p>').appendTo('#dataPopup');
            }
            if(cell_data[0] === name && cell_data[2] === 'Reactive Power'){
              $('<p>Q: '+cell_data[4+parseInt($('#buttonA').attr('stage'))]+' MVAr</p>').appendTo('#dataPopup');
            }
          } else if(type==="Transformer"){
            if(cell_data[0] === name && cell_data[2] === 'Loading'){
              $('<p>Loading: '+cell_data[4+parseInt($('#buttonA').attr('stage'))]+' %</p>').appendTo('#dataPopup');
            }
            if(cell_data[0] === name && cell_data[2] === 'Tap'){
              $('<p>Tap: '+cell_data[4+parseInt($('#buttonA').attr('stage'))]+' %</p>').appendTo('#dataPopup');
            }

          } else if(type==="Line"){
            if(cell_data[0] === name && cell_data[2] === 'Loading'){
              $('<p>Loading: '+cell_data[4+parseInt($('#buttonA').attr('stage'))]+' %</p>').appendTo('#dataPopup');
            }
            if(cell_data[0] === name && cell_data[2] === 'Active Power'){
              $('<p>P: '+cell_data[4+parseInt($('#buttonA').attr('stage'))]+' MW</p>').appendTo('#dataPopup');
            }
            if(cell_data[0] === name && cell_data[2] === 'Reactive Power'){
              $('<p>Q: '+cell_data[4+parseInt($('#buttonA').attr('stage'))]+' MVAr</p>').appendTo('#dataPopup');
            }
          }

          }
        }
        });
    });
    group.mouseleave(function(e){
      $("#dataPopup").css('visibility', 'hidden');
    });
    group.mousemove(function(e){
      $('#dataPopup').css('top', e.pageY-25);
      $('#dataPopup').css('left', e.pageX+25);
    });
  }