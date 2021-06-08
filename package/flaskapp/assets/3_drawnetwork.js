function update_line_modals(step_data) {
    for (let line_ in components.lines) {
        line_id_LF = line_.split("#")[0]
        line_instance = components.lines[line_]
        line_instance.modal_data = []
        var val = undefined
        if (line_id_LF in step_data["lines_active_power"]) {
            val = Math.round(step_data["lines_active_power"][line_id_LF] * (10 ** dataview_round)) / (10 ** dataview_round)
            if(val != 999){
                line_instance.modal_data = line_instance.modal_data.concat(
                    ["Active power: " + val + " MW"]
                )
            }
        }
        if (line_id_LF in step_data["lines_reactive_power"]) {
            val = Math.round(step_data["lines_reactive_power"][line_id_LF] * (10 ** dataview_round)) / (10 ** dataview_round)
            if(val != 999){
                line_instance.modal_data = line_instance.modal_data.concat(
                    ["Reactive power: " + val + " MVAr"]
                )
            }
        }
        if (line_id_LF in step_data["busbars_voltage"]) {
            val = Math.round(step_data["busbars_voltage"][line_id_LF] * (10 ** dataview_round)) / (10 ** dataview_round)
            if(val != 999){
                line_instance.modal_data = line_instance.modal_data.concat(
                    ["Voltage: " + val + " V"]
                )
            }
        }
        components.lines[line_] = line_instance
        if (line_instance.data_changed_callback !== undefined) {
            line_instance.data_changed_callback(line_instance.data)
        }
        //  redraw text labels
    }
}

function update_generator_modals(step_data) {
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

function update_available_power(step_data) {
    let available_power_instance;
    for (let avp_ in components.availablePowers) {
        available_power_instance = components.availablePowers[avp_]
        available_power_instance.modal_data = []
        if (avp_ in step_data["generators_rating"]) {
            available_power_instance.setAvailablePower(step_data["generators_rating"][avp_])
        }
    }
}

function update_generation_info(step_data) {
    let generation_info_instance;
    for (let gen_ in components.generationInfo) {
        generation_info_instance = components.generationInfo[gen_]
        if (gen_ in step_data["generators_active_power"]) {
            generation_info_instance.setMW(step_data["generators_active_power"][gen_].toFixed(2))
        }
        if (gen_ in step_data["generators_reactive_power"]) {
            generation_info_instance.setMVAR(step_data["generators_reactive_power"][gen_].toFixed(2))
        }
    }
}

function update_transformer_modals(step_data) {
    for (let tx_ in components.transformers) {
        tx_instance = components.transformers[tx_]
        tx_instance.modal_data = []
        if (tx_ in step_data["transformers_loading"]) {
            tx_instance.modal_data = tx_instance.modal_data.concat(
                ["Utilisation: " + step_data["transformers_loading"][tx_] + " [%]"]
            )
        }
        if (tx_ in step_data["transformer_apparent_power"]) {
            tx_instance.modal_data = tx_instance.modal_data.concat(
                ["Utilisation: " + step_data["transformer_apparent_power"][tx_] + " [MVA]"]
            )
        }

    }
}

function update_transformers(step_data) {
    for (let tx_ in components.transformers) {
        tx_id_LF = tx_.split("#")[0]
        tx_instance = components.transformers[tx_]
        if (tx_id_LF in step_data["transformers_loading"]) {
            loading = step_data["transformers_loading"][tx_id_LF]
            if (Number(loading) > 0) {
                tx_instance.setLive()
            }
        }
    }
    for(let sgtx_ in components.SGTs){
        let sgtx_instance = components.SGTs[sgtx_]
        let line_ = sgtx_instance.line
        line_id_LF = line_.split("#")[0]
        if (line_id_LF in step_data["lines_active_power"]) {
            let line_power = step_data["lines_active_power"][line_id_LF]
            if (Number(line_power) > 0) {
                sgtx_instance.setLive()
            }
        }
    }
}

function update_line_data_views(step_data) {
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
        if (line_instance.data_changed_callback !== undefined) {
            line_instance.data_changed_callback()
        }
        //  redraw text labels
    }


}

//probably a good idea to add zeros when data isn't present rather than not drawing
function update_dataviews(step_data) {
    for (let id_dv in components.dataviews) {
        let id_root = id_dv.split("#")[0]
        let text_list = [];
        let flow_list = [];
        var units = "";
        var scale = 1;
        var acc = 0;
        let labels = components.dataviews[id_dv].labels
        let flow_direction = components.dataviews[id_dv].drawInfo.flow_direction

        argument = ""


        for (let id_component_parameter in labels) {

            let component_parameter = labels[id_component_parameter]
             //catching LV parameter quick fix
            if(component_parameter.includes("-LV")){
            component_parameter = component_parameter.replace("-LV","");
            argument = "LV"
            }

            if (component_parameter.includes('reactive')) {
                    units = " MVAr"
                    acc = 2
            } else if (component_parameter.includes('active')) {
                    units = " MW"
                    acc = 2
            } else if (component_parameter.includes('loading')) {
                    units = " %"
                    acc = 2
            } else if (component_parameter.includes('voltage')) {
                    units = " p.u."
                    acc = 2

            } else if (component_parameter.includes('taps')) {
                    units = " ."
            } else if (component_parameter.includes('current')) {
                    if(component_parameter.includes("transformers")){
                        if(argument == "LV"){
                            units = " AMPS (LV)"
                        }
                        else{units = " AMPS (HV)"}
                    }
                    else{
                        units = " AMPS"
                    }
                    scale = 1000
            } else if (component_parameter.includes('apparent')) {
                    units = " MVA"
            }



            if(step_data[component_parameter] != undefined){
            if (id_root in step_data[component_parameter]) {
                let value = step_data[component_parameter][id_root]
                if(argument == "LV"){
                   //quickest fix in the west
                    value = value * 132/33
                }

                output_value = Number(scale * value).toFixed(acc)
//                let output_value = value

                if(value==0){
                        text_list = text_list.concat([String(output_value) + units] );
                        flow_list = flow_list.concat([""] );
                        continue
                }

                if(highlight_undefined||(value < 999 && value > -999)){
                    // let value = step_data[component_parameter][id_dv].toFixed(2)
                    let direction= "down"
                    let arrow_up = true
                    let draw_flow = true
                    //get negative or positive (or zero?)
                    let value_polarity = value>0



                    //get polarity of datatype
                    let type_polarity = data_polarity[units]
                    if(type_polarity === null){
                        draw_flow=false
                    }

                    //type polarity, false means flip
                    //value polarity, false means flip
                    //flow_direction, true means positive values go up
                    if(!type_polarity){arrow_up= !arrow_up}
                    if(!value_polarity){arrow_up= !arrow_up}

                    if(flow_direction == null){
                        draw_flow=false
                    }

                    if(draw_flow == false){
                        text_list = text_list.concat([output_value + units]);
                        flow_list = flow_list.concat([""] );
                        continue
                    }

                    if(flow_direction){arrow_up= !arrow_up}

                    if(arrow_up){direction="up"}
                    else{direction="down"}

                    if(direction == "down"){
                        text_list = text_list.concat([output_value + units]);
                        flow_list = flow_list.concat(["down"] );
                        }
                    else{
                        text_list = text_list.concat([output_value + units]);
                        flow_list = flow_list.concat(["up"] );
                        }

                }
                else{
                    text_list = text_list.concat(
                        [String("TBC") + units]
                    );
                    flow_list = flow_list.concat([""] );

                }

            }
            else{
//                       text_list = text_list.concat(["ID" + units]);
                       text_list = text_list.concat(["0.00"+units]);
                       flow_list = flow_list.concat([""] );

            }
            }
            else{
//            text_list = text_list.concat(["PARAM" + units]);
            text_list = text_list.concat(["0.00"+units]);
            flow_list = flow_list.concat([""] );
            }

        }

        redraw_dataview(id_dv, text_list, flow_list);
    }
}

function update_line_colours(step_data_) {
    for (let idl in components.lines) {


        let line_instance = components.lines[idl]
        let line_id_LF = idl.split("#")[0]
        if (((step_data_["lines_current"][line_id_LF] == -999)) ||
            ((step_data_["busbars_voltage"][line_id_LF] == -999)) ||
            ((step_data_["generators_active_power"][line_id_LF] == -999) ) ||
            ((step_data_["transformers_loading"][line_id_LF] == -999))
        ) {
            if(highlight_undefined){
                line_instance.UIElement.attr({
                    stroke: "#ff0000"
                });
            } else {
                line_instance.info.o_line.attr({stroke: palette['0V']});
                line_instance.UIElement.attr({stroke: palette['0V']});
            }

        }
        else if (((step_data_["lines_current"][line_id_LF] !== 0) && (step_data_["lines_current"][line_id_LF] > 997)) ||
            //        ((step_data_["lines_active_power"][line_id_LF] !== 0)&&(step_data_["lines_active_power"][line_id_LF] > 997))||
            //        ((step_data_["lines_reactive_power"][line_id_LF] !== 0)&&(step_data_["lines_reactive_power"][line_id_LF] > 997))
            ((step_data_["busbars_voltage"][line_id_LF] !== 0) && (step_data_["busbars_voltage"][line_id_LF] > 997)) ||
            ((step_data_["generators_active_power"][line_id_LF] !== 0) && (step_data_["generators_active_power"][line_id_LF] > 997)) ||
            ((step_data_["transformers_loading"][line_id_LF] !== 0) && (step_data_["transformers_loading"][line_id_LF] > 997))
        ) {
            if(highlight_undefined){
               line_instance.info.o_line.attr({stroke: "orange"});
               line_instance.UIElement.attr({stroke: "orange"});
            } else {
                if(line_instance.info.o_line != undefined){
                    line_instance.info.o_line.attr({
                        stroke: line_instance.info.dict_styling.stroke.live_color
                    });
                }
                    line_instance.UIElement.attr({
                        stroke: line_instance.info.dict_styling.stroke.live_color
                    });

                //method for notifying the line to handle it's children which it alone handles
                if (line_instance.setEnergised != null) {
                    line_instance.setEnergised()
                }
            }

        }
        else if (((step_data_["lines_current"][line_id_LF] !== 0) && (step_data_["lines_current"][line_id_LF] !== undefined)) ||
            //        ((step_data_["lines_active_power"][line_id_LF] !== 0)&&(step_data_["lines_active_power"][line_id_LF] !== undefined))||
            //        ((step_data_["lines_reactive_power"][line_id_LF] !== 0)&&(step_data_["lines_reactive_power"][line_id_LF] !== undefined))
            ((step_data_["busbars_voltage"][line_id_LF] !== 0) && (step_data_["busbars_voltage"][line_id_LF] !== undefined)) ||
            ((step_data_["generators_active_power"][line_id_LF] !== 0) && (step_data_["generators_active_power"][line_id_LF] !== undefined)) ||
            ((step_data_["transformers_loading"][line_id_LF] !== 0) && (step_data_["transformers_loading"][line_id_LF] !== undefined))
        ) {
            if(line_instance.info.o_line != undefined){
                line_instance.info.o_line.attr({
                    stroke: line_instance.info.dict_styling.stroke.live_color
                });
            }
            line_instance.UIElement.attr({
                stroke: line_instance.info.dict_styling.stroke.live_color
            });

            //method for notifying the line to handle it's children which it alone handles
            if (line_instance.setEnergised != null) {
                line_instance.setEnergised()
            }


        } else if (((step_data_["lines_current"][line_id_LF] === undefined)) &&
            ((step_data_["busbars_voltage"][line_id_LF] === undefined)) &&
            ((step_data_["generators_active_power"][line_id_LF] === undefined)) &&
            ((step_data_["transformers_loading"][line_id_LF] === undefined))) {
            if (highlight_undefined) {
                line_instance.UIElement.attr({
                    stroke: "#ff0000"
                });
                // line_instance.info.o_line.attr({stroke: "grey"});
            }
        }
    }

}

function update_breaker_colours(step_data_) {
    for (let idb in components.breakers) {
        let breaker_instance = components.breakers[idb]
        let idl = breaker_instance.line.line_idx
        let line_id_LF = idl.split("#")[0]
        if (((step_data_["lines_current"][line_id_LF] == -999)) ||
            ((step_data_["busbars_voltage"][line_id_LF] == -999)) ||
            ((step_data_["generators_active_power"][line_id_LF] == -999) ) ||
            ((step_data_["transformers_loading"][line_id_LF] == -999))
        ) {



        }
        else if (((step_data_["lines_current"][line_id_LF] !== 0) && (step_data_["lines_current"][line_id_LF] !== undefined)) ||
          ((step_data_["busbars_voltage"][line_id_LF] !== 0) && (step_data_["busbars_voltage"][line_id_LF] !== undefined)) ||
            ((step_data_["transformers_loading"][line_id_LF] !== 0) && (step_data_["transformers_loading"][line_id_LF] !== undefined))) {
            breaker_instance.setEnergised();
        }

    }
}

function update_generator_colours(step_data_) {
    for (let idg in components.generators) {
        let gen_instance = components.generators[idg]

        let idl = gen_instance.info.lineID
        let line_instance = components.lines[idl]
        let idl_LF = idl.split("#")[0]
        let gen_id_LF = idg.split("#")[0]
        if (
          (step_data_["generators_active_power"][gen_id_LF] !== 0) && (step_data_["generators_active_power"][gen_id_LF] !== undefined) ||
          (step_data_["busbars_voltage"][idl_LF] !== 0) && (step_data_["busbars_voltage"][idl_LF] !== undefined)
        ) {
            gen_instance.UIElement.find('.circle-class').attr({
                'stroke': line_instance.info.dict_styling.stroke.live_color
            })
        }
    }
}

function update_isolators(step_data_) {
    for (let ido in components.isolators) {
        let iso_instance = components.isolators[ido]
        iso_instance.redraw()
    }
}

function update_generator_graphs(step_data_) {
    if(components.generatorGraphManagers !== undefined){
        let graphmanager = components.generatorGraphManagers[0]
        for(let gen_id in graphmanager.bars){
            graphmanager.animatePercentage(gen_id,
              100*step_data_["generators_active_power"][gen_id]/step_data_["generators_rating"][gen_id],
              function(){})
        }
    }
}

function update_state(case_network_, progress=false, current_step_, view_step_, view=false, local_=false) {
    $("body").css("cursor", "progress");
    let data = {
        'sim_step': current_step_,
        'view_step': view_step_,
        'entity': entity,
        'room': room,
        'network': network,
        'page': page,
        'progress': progress,
        'view': view,
        'broadcast': !(local || local_)
    }

    setTimeout(function() {
        socket.emit('sync_sim_step', data, function(data_) {
            view_step = data_['view_step']
        });
        $("#sim_status_div").html("Simulation status: " + current_step_)
        if (!data['broadcast']) {
            $("body").css("cursor", "default");
        }

    }, 1)
}


function inc_state(case_network_, progress=false) {
    if(progress){
        current_step += 1;
        view_step += 1;
    }
    if(current_step > 34){
        current_step = 34

    } else {
        update_state(case_network_, progress, current_step, current_step);
    }
}


function dec_state(case_network_, progress=false) {
    if(progress){
        current_step -= 1;
        view_step -= 1;
    }
    update_state(case_network_, progress, current_step, current_step);
}


function reset_state(case_network_, progress=false) {
    if(progress){
        current_step = -2;
        view_step = -2;
    }
    next_network = undefined
    components.generatorGraphManagers = undefined;
    update_state(case_network_, progress, current_step, current_step);
}

/**
 * draws components from
 dict_components object
 * @param {Dictionary} dictionary of object prototypes used to build and draw components
 * @return {None}
**/
function draw_network(dict_components, network_, step, callback) {

    //    coord_display = true
    if (coord_display) {
        construct_coord_display();
    }

    construct_lines(dict_components);

    construct_busbars(dict_components);

    construct_loads(dict_components);

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

    construct_generator_controls(dict_components)

    construct_generator_graph(dict_components)

    if (page === 'home') {
        construct_action()
    }

    construct_breakers(dict_components, network_, step, function (data_con_break){
        callback(data_con_break)
    });


}

function update_sim_data(stage_, step_data) {
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
    update_generator_graphs(step_data);
}

function update_draw() {
            update_sim_data(current_step, restoration_data[current_step]);
            $("body").css("cursor", "default");
}

function master_draw() {

    function draw(){
        prepare_canvas(x_max, y_max);

        dict_components = networks_undrawn[network]
        draw_network(dict_components, network, current_step, function(data_draw_net){
                update_draw()
        });
    }

    if(restoration_data == null){
           prepare_canvas(x_max, y_max);
           fetch_all_sim_data(case_network, network, option, scenario, draw)
           add_static_text(["loading..."], x=500*x_scaling, y=500*y_scaling, colour="#d3d3d3", function(){})

    }
    else{
            draw()
        }


}

function event_draw(draw_data) {
    old_network = network
    old_step = current_step
    network = draw_data['network']
    current_step = draw_data['sim_step'];
    master_draw()

//    master_draw();


}


// Document Initialisation
$(document).ready(function() {

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


// Get point in global SVG space
function cursorPoint(evt) {
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
}

function update_scaling() {

    let drawBox = document.querySelector('drawing');
    x_max = $("#drawing").attr("width")

    y_max = $("#drawing").attr("height")

    x_scaling = (x_max - 250) / 1000
    y_scaling = (y_max - 100) / 1000

    let x_offset = undefined
    if(page='home'){
        x_offset = 0
    } else {
        x_offset = 0
    }

    font_size = 16 * Math.min(x_scaling, y_scaling)
    network_scaled = networks_undrawn
    scale_lines(x_offset, network_scaled);
    scale_busbars(x_offset, network_scaled)
    scale_labels(x_offset, network_scaled);
    scale_dataviews(x_offset, network_scaled);
    scale_loads(x_offset, network_scaled);
    scale_availablePower(x_offset, network_scaled);
}

update_scaling();

var run_ping = function(){

    setTimeout(function(){
    $.ajax({
    type: "POST",
    url: "/simtool_bp/ping/",
    data: {"message": "ping"},
    }).done(function( data ) {
        run_ping();
    })
    }, 20*1000)
}

run_ping();

//$( window ).resize(function(){update_scaling(), master_draw()})