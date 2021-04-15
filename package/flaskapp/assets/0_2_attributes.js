let palette = {"400kV":"#0000e6",
  "132kV":"#00cbff",
  "33kV":"#00ff00",
  "11kV":"#996633",
  "LV":"#ff3ae8",
  "0V":"#d3d3d3",
  "background-color": "#000000"}

let line_palette_style = {'width': 4}

let live_dead = false

let background = undefined
let network = undefined
let dict_components = undefined
let steps = []

let components = {
                    breakers: [],
                    lines: [],
                    labels:[],
                    generators: [],
                    isolators:[],
                    text:[],
                    dataviews:[],
                    transformers:[],
                    SGTs:[]
                };
let networks_undrawn = {
    "chapelcross33kv": undefined,
    "chapelcross132kv": undefined,
    "gretna132kv": undefined,
    "gretna400kv": undefined,
    "chapelcrossgretna1": undefined,
    "chapelcrossgretna2": undefined,
    "ewehillgretna": undefined,
    "stevenscroft33kv": undefined,
    "minsca33kv": undefined,
    "ewehillwindfarm1": undefined,
    "ewehillwindfarm2": undefined,
}


var socket = io();
let current_step = -1  // initial simulation status
 //Define parent attributes
//  var x = document.getElementById('myDiv').clientWidth;
var x = window.innerWidth;
// var y = document.getElementById('myDiv').clientHeight;
var y = window.innerHeight;

let draw = SVG('#drawing').size(x, y)

var x_scaling = x/1150
var y_scaling = y/1050

var font_size = 14 *  Math.min(x_scaling, y_scaling)

