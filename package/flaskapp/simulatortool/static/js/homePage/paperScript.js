// $.getScript('./javascript/dbDataFunctions.js');


// $.getScript('./paperJS/js/paper.js');
// $.getScript('./paperJS/js/skip.js');

var showAngleLength = true;

element = '3phasePlot';

var canvas = document.getElementById(element);
// alert(canvas);
// alert(canvas.offsetWidth);
// alert(canvas.offsetHeight);

var vectorPhasors;
var items, dashedItems;

function fromCentre(x,y){
    var point = new Point(x+(canvas.offsetWidth/2),(canvas.offsetHeight/2)-y);
    return point;
}

function initialiseAxis(axesAttributes){
    var scaling = 1.3;


    var path = new Path();
    path.strokeColor = axesAttributes.axesColour;
    var start = fromCentre(-scaling*canvas.offsetWidth/2, 0); 
    path.moveTo(start);
    path.lineTo(start + [ scaling*canvas.offsetWidth, 0 ]);
    path.strokeWidth = axesAttributes.axesWidth;

    var path = new Path();
    path.strokeColor = axesAttributes.axesColour;
    var start = fromCentre(0,scaling*canvas.offsetHeight/2); 
    path.moveTo(start);
    path.lineTo(start + [ 0, scaling*canvas.offsetHeight ]);
    path.strokeWidth = axesAttributes.axesWidth;
}


function drawLine(lineAttributes){
    var vector, arrowVector, lineItem;
    startPoint = fromCentre(0,0); 

    var drawMag = ratio*lineAttributes.magnitude;

    endPoint = fromCentre(drawMag*Math.cos(lineAttributes.angle*Math.PI/180),drawMag*Math.sin(lineAttributes.angle*Math.PI/180));
    
    vector = endPoint - startPoint;

    arrowVector = vector;
    lineItem = new Group([
        new Path(startPoint, endPoint),
        new Path([
            endPoint + arrowVector.rotate(135).normalize(18),
            endPoint,
            endPoint + arrowVector.rotate(-135).normalize(18)
        ])
    ]);
    lineItem.strokeWidth = lineAttributes.lineWidth;
    lineItem.strokeColor = lineAttributes.lineColor;

    

    // Display:
    dashedItems = [];
    // Draw Labels
    if (showAngleLength) {
        drawAngle(vector, true, lineAttributes.phaseNum, lineAttributes.lineColor);
        // endPoint = fromCentre(lineAttributes.magnitude*Math.cos(lineAttributes.angle*Math.PI/180),lineAttributes.magnitude*Math.sin(lineAttributes.angle*Math.PI/180));
        // vector = endPoint - startPoint;
        drawLength(lineAttributes.lineColor, ratio, startPoint, endPoint, vector.angle < 0 ? -1 : 1, true );
    }
    for (var i = 0, l = dashedItems.length; i < l; i++) {
        var item = dashedItems[i];
        item.strokeColor = 'black';
        item.dashArray = [1, 2];
        items.push(item);
    }
    // alert();
    return lineItem;
}

function drawVectors(magnitudes, angles, ratio, lineWidth) {

    var lineColors = ['#e4141b','#241bac','#969511']

    if (items) {
        for (var i = 0, l = items.length; i < l; i++) {
            items[i].remove();
        }
    }
    if (vectorPhasors)
    {
        for (var i = 0; i < 3; i++) {
            vectorPhasors[i].remove();
        }
    }
    items = [];
    vectorPhasors = [];
    
    for (var i = 0; i < 3; i++) {
        vectorPhasors.push(drawLine({magnitude: magnitudes[i], angle: angles[i], ratio: ratio, lineWidth: lineWidth, lineColor: lineColors[i], phaseNum: i}));
    }
}


function drawAngle(vector, label, phaseNum, strokeColor) {
    var center = fromCentre(0,0);
    var radius;
    if (phaseNum == 0){
        radius = 20
    } else if (phaseNum == 1){
        radius = 45
    } else if (phaseNum == 2){
        radius = 70
    }

    var threshold = 10;
    if (vector.length < radius + threshold || Math.abs(vector.angle) < 15)
        return;
    var from = new Point(radius, 0);
    var through = from.rotate(vector.angle / 2);
    var to = from.rotate(vector.angle);
    var end = center + to;
    // alert();
    dashedItems.push(new Path.Line(center, center + new Point(radius + threshold, 0)));
    dashedItems.push(new Path.Arc(center + from, center + through, end));
    var arrowVector = to.normalize(7.5).rotate(vector.angle < 0 ? -90 : 90);
    dashedItems.push(new Path([
            end + arrowVector.rotate(135),
            end,
            end + arrowVector.rotate(-135)
    ]));
    if (label) {
        // Angle Label
        var text = new PointText(center
                + through.normalize(radius + 10) + new Point(0, 3));
        text.content = Math.floor(-vector.angle * 100) / 100 + '°';
        // lineItem.strokeWidth = 1;
        text.fillColor = strokeColor;
        items.push(text);
    }
}

function drawLength(strokeColor, ratio, from, to, sign, label, value) {
    var lengthSize = 4;
    // if ((to - from).length < lengthSize * 4)
    //     return;
    var vector = to - from;
    var awayVector = vector.normalize(lengthSize).rotate(90 * sign);
    var upVector = vector.normalize(lengthSize).rotate(45 * sign);
    var downVector = upVector.rotate(-90 * sign);
    var lengthVector = vector.normalize(
            vector.length / 2 - lengthSize * Math.sqrt(2));
    var line = new Path();
    line.add(from + awayVector);
    line.lineBy(upVector);
    line.lineBy(lengthVector);
    line.lineBy(upVector);
    var middle = line.lastSegment.point;
    line.lineBy(downVector);
    line.lineBy(lengthVector);
    line.lineBy(downVector);
    dashedItems.push(line);
    if (label) {
        // Length Label
        var textAngle = Math.abs(vector.angle) > 90
                ? textAngle = 180 + vector.angle : vector.angle;
        // Label needs to move away by different amounts based on the
        // vector's quadrant:
        var away = (sign >= 0 ? [1, 4] : [2, 3]).indexOf(vector.quadrant) != -1
                ? 8 : 0;
        value = value || vector.length;
        var text = new PointText({
            point: middle + awayVector.normalize(away + lengthSize),
            content: Math.floor(value * 1000/ratio) / 1000 + " [V]",
            fontSize: 13,
            fillColor: strokeColor,
            justification: 'center'
        });
        text.rotate(textAngle);
        items.push(text);
        // alert(items);
    }
}

function randNum(min, max) {
    return (Math.random() * (max - min) + min)/10;
  }

initialiseAxis({axesColour: "#720000",axesWidth: 1.8});

var nthTerm = "8";
var drawFreq = 50/parseInt(nthTerm);
var buff = "3072"    //number of samples for one full cycle of phase angle
var reqFreq = 50/(parseInt(buff));

var magnitude = 80;
var maxMag = 0.8*Math.min(canvas.offsetWidth,canvas.offsetHeight)/2;
var ratio = maxMag/magnitude;

var min_magDelta = -10, max_magDelta = 10;
var magnitudes = [magnitude+randNum(min_magDelta, max_magDelta),magnitude+randNum(min_magDelta, max_magDelta),magnitude+randNum(min_magDelta, max_magDelta)];
var lineWidth = 3;
var min_ang = [-10,-10,-10], max_ang = [10,10,10];
var angles = [0+randNum(min_ang[0], max_ang[0]),120+randNum(min_ang[1], max_ang[1]),240+randNum(min_ang[2], max_ang[2])];




// var intervalID = setInterval(function(){
//     angles = [angles[0]+randNum(min_ang[0], max_ang[0]),angles[1]+randNum(min_ang[1], max_ang[1]),angles[2]+randNum(min_ang[2], max_ang[2])];
//     magnitudes = [magnitude+randNum(min_magDelta, max_magDelta),magnitude+randNum(min_magDelta, max_magDelta),magnitude+randNum(min_magDelta, max_magDelta)];
    
//     // alert(angles);
//     // alert(magnitudes);
    
//     drawVectors(magnitudes,angles,ratio,lineWidth);
   



//   },(1/parseFloat(50)*1000));
document.getElementById(element.concat("_footer")).innerHTML = "Update rate: ".concat(drawFreq," [Hz] - Delay: ", (1/reqFreq).toString(), " [s]")
requestData("3phase",{"dataComp":"vph","dataTable":"pmudata","entryID":"1","reqType":"b","dateTime":"a","numRec":buff,"nthTerm":nthTerm}, function(dbData){
    var i = 0;
    dbData = dbData.reverse();
    var intervalIDdraw = setInterval(function(){

        angles = [parseFloat(dbData[i].Ph_a), parseFloat(dbData[i].Ph_b), parseFloat(dbData[i].Ph_c)];
        magnitudes = [parseFloat(dbData[i].V_a), parseFloat(dbData[i].V_b), parseFloat(dbData[i].V_c)];
        
        ratio = maxMag/magnitudes[0];
        drawVectors(magnitudes,angles,ratio,lineWidth);
        if (i < dbData.length-1){
        i += 1;
        } else {
        clearInterval(intervalIDdraw);
        }
        
    },((1/drawFreq)*1000));

});
// clearInterval(intervalIDdraw);
var intervalIDreq = setInterval(function(){
    document.getElementById(element.concat("_footer")).innerHTML = "Update rate: ".concat(drawFreq," [Hz] - Delay: ", (1/reqFreq).toString(), " [s]");
    requestData("3phase",{"dataComp":"vph","dataTable":"pmudata","entryID":"1","reqType":"b","dateTime":"a","numRec":buff,"nthTerm":nthTerm}, function(dbData){
        var i = 0;
        dbData = dbData.reverse();
        var intervalIDdraw = setInterval(function(){
    
            angles = [parseFloat(dbData[i].Ph_a), parseFloat(dbData[i].Ph_b), parseFloat(dbData[i].Ph_c)];
            magnitudes = [parseFloat(dbData[i].V_a), parseFloat(dbData[i].V_b), parseFloat(dbData[i].V_c)];
            
            ratio = maxMag/magnitudes[0];
            drawVectors(magnitudes,angles,ratio,lineWidth);
            if (i < dbData.length-1){
            i += 1;
            } else {
            clearInterval(intervalIDdraw);
            location.reload();
            }
        },((1/drawFreq)*1000));
    
    });
    
},((1/reqFreq)*1000));

