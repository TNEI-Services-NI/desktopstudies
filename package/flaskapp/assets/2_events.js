function post_breaker(breakerID,state){
  if(breakerID === null){breakerID="b1"}
  if(state === null){state=true}
  $.ajax({
  type: "POST",
  url: "receive_breaker/",
  data: {"breaker": breakerID, "state": state },
//      dataType: 'application/json'
  }).done(function( data ) {
    // console.log(data);
  })
}

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
            // alert(JSON.stringify(breakers_new[breaker].state));
            breakers_new[breaker].state = breaker_states["state"][breaker];
            // alert(JSON.stringify(breakers_new[breaker].state));
          }
          // console.log(breaker_states["state"][breaker])
          // console.log(breakers[breaker].state)
          // alert(breakers_new[breaker].state);
        }
        callback(breakers_new);
      }
//      dataType: 'application/json'
    });
    // alert(JSON.stringify(breakers_new));

}


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


function component_modal(group, type, name){
  group.mouseenter(function(e){
    $("#dataPopup").css('visibility', 'visible');
    $('#dataPopup').text(type+':')
    $('<p>'+name+'</p>').appendTo('#dataPopup');
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