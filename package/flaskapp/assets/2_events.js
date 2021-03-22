
  function eventMouse(group, type, name){
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

          if(type=="Generator"){
            if(cell_data[0] == name & cell_data[2] == 'Active Power'){
              $('<p>P: '+cell_data[4+parseInt($('#buttonA').attr('stage'))]+' MW</p>').appendTo('#dataPopup');
            }
            if(cell_data[0] == name & cell_data[2] == 'Reactive Power'){
              $('<p>Q: '+cell_data[4+parseInt($('#buttonA').attr('stage'))]+' MVAr</p>').appendTo('#dataPopup');
            }
          } else if(type=="Transformer"){
            if(cell_data[0] == name & cell_data[2] == 'Loading'){
              $('<p>Loading: '+cell_data[4+parseInt($('#buttonA').attr('stage'))]+' %</p>').appendTo('#dataPopup');
            }
            if(cell_data[0] == name & cell_data[2] == 'Tap'){
              $('<p>Tap: '+cell_data[4+parseInt($('#buttonA').attr('stage'))]+' %</p>').appendTo('#dataPopup');
            }

          } else if(type=="Line"){
            if(cell_data[0] == name & cell_data[2] == 'Loading'){
              $('<p>Loading: '+cell_data[4+parseInt($('#buttonA').attr('stage'))]+' %</p>').appendTo('#dataPopup');
            }
            if(cell_data[0] == name & cell_data[2] == 'Active Power'){
              $('<p>P: '+cell_data[4+parseInt($('#buttonA').attr('stage'))]+' MW</p>').appendTo('#dataPopup');
            }
            if(cell_data[0] == name & cell_data[2] == 'Reactive Power'){
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
