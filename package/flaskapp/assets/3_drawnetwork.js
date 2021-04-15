
  function update_line_modals(step_data){
        for (let line_ in components.lines) {
      line_id_LF = line_.split("#")[0]
      line_instance = components.lines[line_]
      line_instance.modal_data = []
      if (line_id_LF in step_data["lines_active_power"]) {
        line_instance.modal_data = line_instance.modal_data.concat(
          ["Active power: " + step_data["lines_active_power"][line_id_LF] + " MW"]
        )
      }
      if (line_id_LF in step_data["lines_reactive_power"]) {
        line_instance.modal_data = line_instance.modal_data.concat(
          ["Reactive power: " + step_data["lines_reactive_power"][line_id_LF] + " MVAr"]
        )
      }
      if (line_id_LF in step_data["busbars_voltage"]) {
        line_instance.modal_data = line_instance.modal_data.concat(
          ["Voltage: " + step_data["busbars_voltage"][line_id_LF] + " V"]
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
      for(let component_parameter in step_data){
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
          }

          text_list = text_list.concat(
            [String(step_data[component_parameter][id_dv]) + units]
          );
        }
      }
      redraw_dataview(id_dv, text_list);
    }
  }

  /**
   * callback function for updating step data when it has been retrieved
   * @param {integer} step number
   * @param {dictionary} data retrieved from this state
   * @return {None}
  **/
  function update_sim_data(step, step_data){
    steps[step] = step_data;
    update_line_modals(step_data);
    update_generator_modals(step_data);
    update_transformer_modals(step_data);

    update_dataviews(step_data);
  //  redraw text labels
  //   update_line_data_views(step_data)
  }

  function inc_state(network_){
    current_step += 1;
    //alert(current_step)
    fetch_sim_data(network_, current_step, option, scenario, update_sim_data);
  }

  /**
   * draws components from
   dict_components object
   * @param {Dictionary} dictionary of object prototypes used to build and draw components
   * @return {None}
  **/
  function draw_network(dict_components, network_, step){

    construct_lines(dict_components);

    construct_breakers(dict_components, network_, step);

    construct_labels(dict_components);

    construct_txs(dict_components);

    construct_gens(dict_components);

    construct_inductors(dict_components);

    construct_isolators(dict_components);

    construct_dataviews(dict_components);

    // redraw_dataviews();

    construct_SGTs(dict_components);
  }

  function master_draw(){
    prepare_canvas(x, y);
    dict_components = networks_undrawn[network]
    draw_network(dict_components, network, current_step);
    fetch_sim_data(network, current_step, option, scenario, update_sim_data);
  }


  // Document Initialisation
  $(document).ready(function(){


  });

  var x = undefined;
  var y = undefined;
  var x_scaling = undefined;
  var y_scaling = undefined;
  var font_size = undefined;

  var socket = io();
//  let current_step = -1
//  let steps = []

   //Define parent attributes
 //  var x = document.getElementById('myDiv').clientWidth;
  x = window.innerWidth;
  // var y = document.getElementById('myDiv').clientHeight;
  y = window.innerHeight;

  x_scaling = x/1150
  y_scaling = y/1050

  font_size = 14 *  Math.min(x_scaling, y_scaling)

  dict_components = undefined



  scale_lines(networks_undrawn);
  scale_labels(networks_undrawn);
  scale_dataviews(networks_undrawn);


  socket.on('draw', function(data) {
    network = data['network']
    current_step = data['sim_step'];
    master_draw();
  });

  socket.on('redraw', function(data) {
    current_step = data['sim_step'];
    master_draw();
  });


