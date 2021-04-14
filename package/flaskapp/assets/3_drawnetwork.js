  /**
   * callback function for updating step data when it has been retrieved
   * @param {integer} step number
   * @param {dictionary} data retrieved from this state
   * @return {None}
  **/
  function update_sim_data(step, step_data){
    steps[step] = step_data
    for (let line_ in components.lines){
      components.lines[line_].data = step_data[line_]
    }
  }

  function inc_state(network){
    current_step += 1;
    console.log(current_step)
    //alert(current_step)
    fetch_sim_data(current_step, network, update_sim_data);
  }

  /**
   * draws components from dict_components object
   * @param {Dictionary} dictionary of object prototypes used to build and draw components
   * @return {None}
  **/
  function draw_network(dict_components, network){

    construct_lines(dict_components);

    construct_breakers(dict_components, network);

    construct_labels(dict_components);

    construct_txs(dict_components);

    construct_gens(dict_components);

    construct_inductors(dict_components);

    construct_isolators(dict_components);

    construct_dataviews(dict_components);

    construct_SGTs(dict_components);
    //get stage zero state
    fetch_sim_data(current_step, network, update_sim_data);
  }


  // Document Initialisation
  $(document).ready(function(){
  });

  var socket = io();

 //Define parent attributes
 //  var x = document.getElementById('myDiv').clientWidth;
  var x = window.innerWidth;
  // var y = document.getElementById('myDiv').clientHeight;
  var y = window.innerHeight;

  var x_scaling = x/1150
  var y_scaling = y/1050

  const font_size = 14 *  Math.min(x_scaling, y_scaling)

  let dict_components = undefined
  let components = {
                      breakers: [],
                      lines: [],
                      labels:[],
                      generators: [],
                      isolators:[],
                      text:[],
                      transformers:[],
                      SGTs:[]
                  }
  let current_step = 1
  let steps = []

  scale_lines(networks_undrawn);
  scale_labels(networks_undrawn);

  socket.on('draw', function(data) {
    prepare_canvas(x, y);
    dict_components = networks_undrawn[data['network']]
    draw_network(dict_components, data['network']);
  });


