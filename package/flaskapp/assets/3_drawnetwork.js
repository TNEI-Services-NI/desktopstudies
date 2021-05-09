
  function update_line_modals(step_data){
        for (let line_ in components.lines) {
      line_id_LF = line_.split("#")[0]
      line_instance = components.lines[line_]
      line_instance.modal_data = []
      if (line_id_LF in step_data["lines_active_power"]) {
        line_instance.modal_data = line_instance.modal_data.concat(
          ["Active power: " + Math.round(step_data["lines_active_power"][line_id_LF]*(10**dataview_round))/(10**dataview_round) + " MW"]
        )
      }
      if (line_id_LF in step_data["lines_reactive_power"]) {
        line_instance.modal_data = line_instance.modal_data.concat(
          ["Reactive power: " + Math.round(step_data["lines_reactive_power"][line_id_LF]*(10**dataview_round))/(10**dataview_round) + " MVAr"]
        )
      }
      if (line_id_LF in step_data["busbars_voltage"]) {
        line_instance.modal_data = line_instance.modal_data.concat(
          ["Voltage: " + Math.round(step_data["busbars_voltage"][line_id_LF]*(10**dataview_round))/(10**dataview_round) + " V"]
        )
      }
      components.lines[line_] = line_instance
      if(line_instance.data_changed_callback !== undefined){line_instance.data_changed_callback(line_instance.data)}
      //  redraw text labels
    }
  }
  function update_generator_modals(step_data){
    let gen_instance;
    for (let gen_ in components.generators) {
      gen_instance = components.generators[gen_]
      gen_instance.modal_data = []
      if (gen_ in step_data["generators_active_power"]) {
        gen_instance.modal_data = gen_instance.modal_data.concat(
          ["Active power: " + step_data["generators_active_power"][gen_] + " [MW]"]
        )
      }
      if (gen_ in step_data["generators_reactive_power"]) {
        gen_instance.modal_data = gen_instance.modal_data.concat(

          ["Reactive power: " + step_data["generators_reactive_power"][gen_] + " [MVAr]"]
        )
      }
    }
  }

  function update_available_power(step_data){
    let available_power_instance;
    for (let avp_ in components.availablePowers) {
          available_power_instance = components.availablePowers[avp_]
          available_power_instance.modal_data = []
          if (avp_ in step_data["generators_active_power"]) {
                available_power_instance.setAvailablePower(step_data["generators_active_power"][avp_])
        }
    }
  }

  function update_generation_info(step_data){
    let generation_info_instance;
    for (let gen_ in components.generationInfo) {
          generation_info_instance = components.generationInfo[gen_]
          if (gen_ in step_data["generators_active_power"]) {
                generation_info_instance.setMW(step_data["generators_active_power"][gen_])
          }
          if (gen_ in step_data["generators_reactive_power"]) {
                generation_info_instance.setMVAR(step_data["generators_reactive_power"][gen_])
          }
    }
  }


  function update_transformer_modals(step_data){
    for (let tx_ in components.transformers) {
      tx_instance = components.transformers[tx_]
      tx_instance.modal_data = []
      if (tx_ in step_data["transformers_loading"]) {
        tx_instance.modal_data = tx_instance.modal_data.concat(
          ["Utilisation: " + step_data["transformers_loading"][tx_] + " [MVA]"]
        )
      }
    }
  }

  function update_transformers(step_data){
    for(let tx_ in components.transformers){
          tx_instance = components.transformers[tx_]
          if(tx_ in step_data["transformers_loading"]){
              loading = step_data["transformers_loading"][tx_]
                if(Number(loading) > 0){
                 tx_instance.setLive()
                }
          }
    }
  }

  function update_line_data_views(step_data){
        for (let line_ in components.lines) {
      line_id_LF = line_.split("#")[0]
      line_instance = components.lines[line_]
      line_instance.data = []
      if (line_id_LF in step_data["lines_active_power"]) {
        line_instance.data["lines_active_power"] =
          step_data["lines_active_power"][line_id_LF]

      }
      if (line_id_LF in step_data["lines_reactive_power"]) {
        line_instance.data["lines_reactive_power"] =
          step_data["lines_reactive_power"][line_id_LF]

      }
      if (line_id_LF in step_data["busbars_voltage"]) {
        line_instance.data["busbars_voltage"] = step_data["busbars_voltage"][line_id_LF]

      }
      components.lines[line_] = line_instance
      if(line_instance.data_changed_callback !== undefined){line_instance.data_changed_callback()}
      //  redraw text labels
    }


  }

  function update_dataviews(step_data){
    for(let id_dv in components.dataviews){
      let text_list = [];
      var units = "";
      let labels = components.dataviews[id_dv].labels
      for(let id_component_parameter in labels){
        let component_parameter = labels[id_component_parameter]
        if (id_dv in step_data[component_parameter]) {
          if(component_parameter.includes('reactive')){
            units = " MVAr"
          } else if(component_parameter.includes('active')){
            units = " MW"
          } else if(component_parameter.includes('loading')){
            units = " MVA"
          } else if(component_parameter.includes('voltage')){
            units = " V p.u."
          } else if(component_parameter.includes('taps')){
            units = " ."
          } else if(component_parameter.includes('current')){
            units = " AMPS"
          }

          let value = Math.round(step_data[component_parameter][id_dv] * 1000) / 1000

          text_list = text_list.concat(
            [String(value) + units]
          );
        }
      }

      redraw_dataview(id_dv, text_list);
    }
  }

  function update_line_colours(step_data_){

    for(let idl in components.lines){


      let line_instance = components.lines[idl]
      let line_id_LF = idl.split("#")[0]
      if(((step_data_["lines_loading"][line_id_LF] !== 0)&&(step_data_["lines_loading"][line_id_LF] > 997))||
//        ((step_data_["lines_active_power"][line_id_LF] !== 0)&&(step_data_["lines_active_power"][line_id_LF] > 997))||
//        ((step_data_["lines_reactive_power"][line_id_LF] !== 0)&&(step_data_["lines_reactive_power"][line_id_LF] > 997))
        ((step_data_["busbars_voltage"][line_id_LF] !== 0)&&(step_data_["busbars_voltage"][line_id_LF] > 997))
        ||((step_data_["transformers_loading"][line_id_LF] !== 0)&&(step_data_["transformers_loading"][line_id_LF] > 997))
      ){

//        line_instance.info.o_line.attr({stroke: "orange"});
//        line_instance.UIElement.attr({stroke: "orange"});

      } if(((step_data_["lines_loading"][line_id_LF] !== 0)&&(step_data_["lines_loading"][line_id_LF] !== undefined))||
//        ((step_data_["lines_active_power"][line_id_LF] !== 0)&&(step_data_["lines_active_power"][line_id_LF] !== undefined))||
//        ((step_data_["lines_reactive_power"][line_id_LF] !== 0)&&(step_data_["lines_reactive_power"][line_id_LF] !== undefined))
        ((step_data_["busbars_voltage"][line_id_LF] !== 0)&&(step_data_["busbars_voltage"][line_id_LF] !== undefined))
        ||((step_data_["transformers_loading"][line_id_LF] !== 0)&&(step_data_["transformers_loading"][line_id_LF] !== undefined))
      ){

        line_instance.info.o_line.attr({stroke: line_instance.info.dict_styling.stroke.live_color});
        line_instance.UIElement.attr({stroke: line_instance.info.dict_styling.stroke.live_color});

        //method for notifying the line to handle it's children which it alone handles
        if(line_instance.setEnergised != null){
            line_instance.setEnergised()
        }


      } else if (((step_data_["lines_loading"][line_id_LF] === undefined))&&
                  ((step_data_["busbars_voltage"][line_id_LF] === undefined))&&
                  ((step_data_["transformers_loading"][line_id_LF] === undefined))
      ){

        if(highlight_undefined){
          line_instance.info.o_line.attr({stroke: "red"});
          line_instance.UIElement.attr({stroke: "red"});
          // line_instance.info.o_line.attr({stroke: "grey"});
        }
      }
    }

  }

  function update_breaker_colours(step_data_){
    for(let idb in components.breakers){
      let breaker_instance = components.breakers[idb]
      let idl = breaker_instance.line.line_idx
      let line_id_LF = idl.split("#")[0]

      if(((step_data_["lines_loading"][line_id_LF] !== 0)&&(step_data_["lines_loading"][line_id_LF] !== undefined))||
//        ((step_data_["lines_active_power"][line_id_LF] !== 0)&&(step_data_["lines_active_power"][line_id_LF] !== undefined))||
//        ((step_data_["lines_reactive_power"][line_id_LF] !== 0)&&(step_data_["lines_reactive_power"][line_id_LF] !== undefined))||
        ((step_data_["busbars_voltage"][line_id_LF] !== 0)&&(step_data_["busbars_voltage"][line_id_LF] !== undefined))||
        ((step_data_["transformers_loading"][line_id_LF] !== 0)&&(step_data_["transformers_loading"][line_id_LF] !== undefined))){
        breaker_instance.setEnergised();
      }
    }
  }

  function update_generator_colours(step_data_){
    for(let idg in components.generators){
      let gen_instance = components.generators[idg]
      let idl = gen_instance.info.lineID
      let line_instance = components.lines[idl]
      let line_id_LF = idl.split("#")[0]
      if((step_data_["generators_active_power"][idg] !== 0)&&(step_data_["generators_active_power"][idg] !== undefined)){
        gen_instance.UIElement.find('.circle-class').attr({
          'stroke': line_instance.info.dict_styling.stroke.live_color
        })
      }
    }
  }

  function update_isolators(step_data_){
    for(let ido in components.isolators){
      let iso_instance = components.isolators[ido]
      iso_instance.redraw()
    }
  }


  function inc_state(case_network_){
    current_step += 1
    $("body").css("cursor", "progress");

    setTimeout(function(){
      socket.emit('sync_sim_step', {
        'sim_step': current_step,
        'entity': entity,
        'network': network,
        'progress': true,
        'broadcast': true
      }, function (data){});
      $("#sim_status_div").html("Simulation status: " + current_step)
        $("body").css("cursor", "default");

    }, 1000)
  }

  /**
   * draws components from
   dict_components object
   * @param {Dictionary} dictionary of object prototypes used to build and draw components
   * @return {None}
  **/
  function draw_network(dict_components, network_, step){

//    coord_display = true
    if(coord_display){
      construct_coord_display();
    }

    construct_lines(dict_components);

    construct_busbars(dict_components);

    construct_loads(dict_components);

    construct_breakers(dict_components, network_, step);

    construct_labels(dict_components);

    construct_txs(dict_components);

    construct_gens(dict_components);

    construct_inductors(dict_components);

    construct_isolators(dict_components);

    construct_dataviews(dict_components);

    // redraw_dataviews();

    construct_SGTs(dict_components);

    construct_available_power(dict_components)

    construct_generation_info(dict_components)

    construct_action()

  }

  function update_sim_data(stage_, step_data){
    steps[stage_] = step_data;
    update_line_colours(step_data);
    update_line_modals(step_data);
    update_generator_modals(step_data);
    update_transformer_modals(step_data);
    update_transformers(step_data)
    update_dataviews(step_data);
    update_breaker_colours(step_data);
    update_generator_colours(step_data);
    update_available_power(step_data);
    update_generation_info(step_data);
    update_isolators(step_data);
  }

  function master_draw(){
    prepare_canvas(x_max, y_max);
    dict_components = networks_undrawn[network]
    draw_network(dict_components, network, current_step);
    fetch_sim_data(case_network, network, current_step, option, scenario, update_sim_data
    );
  }

  function event_draw(draw_data){

    network = draw_data['network']
    current_step = draw_data['sim_step'];
    master_draw();
  }


  // Document Initialisation
  $(document).ready(function(){
  });

  x_max = undefined;
  y_max = undefined;
  x_scaling = undefined;
  y_scaling = undefined;
  font_size = undefined;

  var scaled_network = JSON.parse(JSON.stringify(networks_undrawn))

  // Find your root SVG element
  var svg = document.querySelector("#drawing");

  // Create an SVGPoint for future math
  var pt = svg.createSVGPoint();

  var socket = io();

  dict_components = undefined

  var room = undefined
  var username = undefined
  var entity = undefined

  var action = undefined

  socket.on('check_join_draw', function(data_join_draw) {
    if(username === undefined){
      username = data_join_draw['username']
    }
    if(entity === undefined){
      entity = data_join_draw['entity']
    }
    if(username === data_join_draw['username']){
      socket.emit('check_join_draw', data_join_draw, function (data_check_rooms){});
    }
  });

  socket.on('join_draw', function (data_join_draw){
    if(room === undefined){
      socket.emit('join_room', data_join_draw, function(data_join_room){
        room = data_join_room['room']
        event_draw(data_join_room);
      })
    }
  })

  socket.on('list_rooms', function(data) {
    socket.emit('list_rooms', data);
  });

  socket.on('debug', function(data) {

  });


  socket.on('draw', function(data) {

    event_draw(data);
  });

  socket.on('redraw', function(data) {
    current_step = data['sim_step'];
    network = data['network'];
    master_draw();
  });


  // Get point in global SVG space
  function cursorPoint(evt){
    pt.x = evt.clientX; pt.y = evt.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  }

function update_scaling(){

    let drawBox = document.querySelector('drawing');
    x_max = $("#drawing").attr("width")

    y_max = $("#drawing").attr("height")

      x_scaling = (x_max-250)/1000
      y_scaling = (y_max-100)/1000
      font_size = 14 *  Math.min(x_scaling, y_scaling)
      network_scaled = networks_undrawn
      scale_lines(network_scaled);
      scale_busbars(network_scaled)
      scale_labels(network_scaled);
      scale_dataviews(network_scaled);
      scale_loads(network_scaled);
      scale_availablePower(network_scaled);
  }

update_scaling();
//$( window ).resize(function(){update_scaling(), master_draw()})





