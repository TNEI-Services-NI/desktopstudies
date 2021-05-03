
function get_breaker(breakerID,state){
  if(breakerID === null){breakerID="b1"}
  if(state === null){state=false}
  $.ajax({
  type: "POST",
  url: "/simtool_bp/receive_breaker/",
  data: {"breaker": breakerID, "state": state },
//      dataType: 'application/json'
  }).done(function( data ) {
    // console.log(data);
  })
}

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
  url: "/simtool_bp/receive_breaker/",
  data: {"breaker": breakerID, "state": state },
//      dataType: 'application/json'
  }).done(function( data ) {
    // console.log(data);
  })
}

function post_breakers(breakers){
  let breakers_ = {}
  for(let idb in breakers){
    console.log(breakers[idb]['closed'])
    breakers_[idb] = undefined
  }

  $.ajax({
  type: "POST",
  url: "/simtool_bp/receive_breakers/",
  data: {"breakers": breakers },
  }).done(function( data ) {
  })
}

/**
 * receives initial states of all breakers through ajax request
 * url parameter of ajax request must reference blueprint specific route to function
 * @param network_
 * @param option_
 * @param breakers
 * @param  {function} callback which interprets/draws a list of breakers.
 * @return {None}
 */
function check_breakers(network_, option_, breakers, step, callback){
    var breakers_new = breakers
    $.ajax({
      type: "POST",
      url: "/simtool_bp/check_breakers/",
      data: {"network": network_, "option": option_},
      success: function(breaker_states){
        for(let breaker_id in breakers){

        }
        // alert(JSON.stringify(breakers));
        alert(JSON.stringify(breaker_states[step]));
        callback(breaker_states);
      }
    });

}
/**
 * receives initial states of all breakers through ajax request
 * url parameter of ajax request must reference blueprint specific route to function
 * @param network_
 * @param option_
 * @param breakers
 * @param step
 * @param  {function} callback which interprets/draws a list of breakers.
 * @return {None}
 */
function init_breakers(network_, option_, breakers, step, callback){
    var breakers_new = breakers
    $.ajax({
      type: "POST",
      url: "/simtool_bp/check_breakers/",
      data: {"network": network_, "option": option_},
      success: function(breaker_states){
        for (let breaker in breakers){
          if (breaker_states[step][breaker] === undefined){
            breakers_new[breaker].state = "undefined";
          } else {
            breakers_new[breaker].state = breaker_states[step][breaker];
          }
        }
        callback(breakers_new);
      }
    });

}


/**
 * retrieves state of one breaker
 * url parameter of ajax request must reference blueprint specific route to function
 * @param  {string} breaker id
 * @return {None}
 */
function init_breaker(breakerID){
      $.ajax({
      type: "POST",
      url: "/simtool_bp/init_breaker/",
      data: {"breaker": breakerID},
      success: function(state){
        //alert("success init breaker");
      }})
  }

/**
 * retrieves state of network based on stage
 * url parameter of ajax request must reference blueprint specific route to function
 * @param  {integer} stage
 * @param network
 * @param voltage
 * @param callbacks
 * @return {None}
 */
function fetch_sim_data(network_, stage_, option_, scenario_, callbacks){
      $.ajax({
      type: "POST",
      url: "/simtool_bp/get_state/",
      data: {"stage": stage_, "network": network_, "option": option_, "scenario": scenario_},
//      dataType: 'application/json'
      }).done(function( component_values ) {
        for(let component_parameter in component_values){
          component_values[component_parameter] = JSON.parse(component_values[component_parameter])
        }
        callbacks(stage_, component_values);
      })
  }

/**
 * retrieves network/simulation
 * url parameter of ajax request must reference blueprint specific route to function
 * @return {None}
 */
function init_network(callback){
      $.ajax({
      type: "POST",
      url: "/simtool_bp/init_network/",
      data: {'string': 'none'},
      success: function(state){
        let voltage = state["voltage"]["0"]
        let network_ = state["network"]["0"]
        callback(network_, voltage)
      }
      })
  }

const breaker_clicked_event = new CustomEvent('breaker_clicked')
const component_data_changed_event = new CustomEvent('component_data_changed')

/**
 * adds modal to a component which shows when the mouse hovers over it
 * @param  {string} component
 * @return {None}
 */
function component_modal(component){
  let type = component.info.component
  let loc = [0, 0]
  let group = component.UIElement
    group.mouseenter(function(e){


      $("#dataPopup").css('visibility', 'visible');
      $('#dataPopup').text(type+':');
      $('<p>'+component.id+'</p>').appendTo('#dataPopup');
      $('<p>'+component.id.split("#")[0]+'</p>').appendTo('#dataPopup');

      if(type ==="Breaker" || type === "Isolator"){
            $('<p> closed = '+component.closed+'</p>').appendTo('#dataPopup');
      }

      if(type ==="Generator"){
            $('<p> method = '+component.info.type+'</p>').appendTo('#dataPopup');
      }

      if(type ==="Line"){
      }

      if(type ==="Transformer"){
            $('<p> type = '+component.info.type+'</p>').appendTo('#dataPopup');
      }

      if(component.modal_data !== undefined){
          $('<p>restoration step based data:</p>').appendTo('#dataPopup');
          for(let data_row in component.modal_data){
            $('<p>'+component.modal_data[data_row]+'</p>').appendTo('#dataPopup');
          }

      }
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
      setTimeout(function(){
        $("#dataPopup").css('visibility', 'hidden');
      }, modal_timeout*1000)
    });
    group.mousemove(function(e){
      loc = [e.pageX, e.pageY]
      let datapopup = $('#dataPopup')
      if(e.pageY > (y_max - datapopup.height())){
        datapopup.css('top', e.pageY-datapopup.height()-modal_y_offset);
      } else {
        datapopup.css('top', e.pageY);
      }
      if(e.pageX > (x_max - datapopup.width())){
        datapopup.css('left', e.pageX-datapopup.width()-modal_x_offset);
      } else {
        datapopup.css('left', e.pageX+modal_x_offset);
      }
    });
  }
