  /**
   * draws components from dict_components object
   * @param {Dictionary} dictionary of object prototypes used to build and draw components
   * @return {None}
  **/
  function draw_network(dict_components){

    scale_lines(dict_components);

    scale_labels(dict_components);

    construct_lines(dict_components);

    construct_breakers(dict_components);

    construct_labels(dict_components);

    construct_txs(dict_components);

    construct_gens(dict_components);

    construct_inductors(dict_components);

    construct_isolators(dict_components);

    construct_dataviews(dict_components);

    //get stage zero state
    update_state(current_step,network,voltage,restoration_step_callback);
  }

  /**
   * callback function for updating step data when it has been retrieved
   * @param {integer} step number
   * @param {dictionary} data retrieved from this state
   * @return {None}
  **/
  function restoration_step_callback(step, step_data){
    steps[step] = step_data
    components.breakers["698 11"].data = step_data["comp1"]
  }

  function inc_state(){
    current_step += 1;
    console.log(current_step)
    update_state(current_step,network,voltage,restoration_step_callback);
  }

  // Document Initialisation
  $(document).ready(function(){
  });


 //Define parent attributes
 //  var x = document.getElementById('myDiv').clientWidth;
  var x = window.innerWidth;
  // var y = document.getElementById('myDiv').clientHeight;
  var y = window.innerHeight;

  //Create canvas
  var draw = SVG('#drawing').size(x, y)

  var x_scaling = x/1150
  var y_scaling = y/1050

  const font_size = 14 *  Math.min(x_scaling,y_scaling)



  let dict_components = undefined
  let components = {
                      breakers: [],
                      lines: [],
                      labels:[],
                      generators: [],
                      isolators:[],
                      text:[]
                  }
  let current_step = 1
  let steps = []

  let network = "chapelcross"
  let voltage = "33kv"

  if (network === "chapelcross" && voltage === "33kv"){
    dict_components = chapelcross_33kV
  } else if (network === "chapelcross" && voltage === "132kv") {
    dict_components = chapelcross_132kV
  } else if (network === "gretna" && voltage === "400kv") {
    dict_components = Gretna_400kV
  } else {
    dict_components = chapelcross_33kV
  }

  draw_network(dict_components);

  init_network();


