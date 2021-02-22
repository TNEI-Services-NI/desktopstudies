window.onload = function() {  
    initialisePage();
    var dtPick1 = document.getElementById('datetimepicker1');
    var dtPick2 = document.getElementById('datetimepicker2');

    var startDateTime;
    var endDateTime ;


    $("span").css("pointer-events", "none");
    $("input").css( 'cursor', 'pointer' );

      
    // var showLayers = ["Interconnectors", "Solar", "CCGT", "Oil", "Coal", "Nuclear", "Open-Cycle Gas", "Wind", "Pumped Storage", "Hydro", "Other", "Biomass"];
    var showLayers = ["Interconnectors", "Nuclear", "Hydro","strathPMU"];

    var intervalID_lineChart;

    var chartType_ = "area_s"
    var startTimeStamp_chart, endTimeStamp_chart;

    initDrawMap(showLayers, function(L){
      initDrawChart({chartType:chartType_, height: 640},"myLineChart",{"dataComp":"gCat","dataTable":"demgendata","entryID":"1","reqType":"b","dateTime":"a","numRec":"400","nthTerm":"1"}, function(myLineChart,chartType,element,requestParams){
        
        startTimeStamp_chart = new Date(myLineChart.opts.series[0].data[0][0]);
        endTimeStamp_chart = new Date(myLineChart.opts.series[0].data[myLineChart.opts.series[0].data.length-1][0]);
        // alert(startTimeStamp_chart);
        DateTimeDisplay(startTimeStamp_chart, false, function(startDateTime_chart){
          document.getElementById('datetimepicker1').value = startDateTime_chart;
        });
        
        DateTimeDisplay(endTimeStamp_chart, false, function(endDateTime_chart){
          document.getElementById('datetimepicker2').value = endDateTime_chart;
        });

        var DateTime1endLim = new Date();
        DateTime1endLim.setTime(endTimeStamp_chart.getTime() - 5*60*1000);
        
        var DateTime2endLim = new Date();
        DateTime2endLim.setTime(DateTime2endLim.getTime() - 5*60*1000);

        $('#datetimepicker1').datetimepicker({
          format: "dd/mm/yyyy - hh:ii",
          autoclose: true,
          todayBtn: false,
          endDate: DateTime1endLim,
          minuteStep: 5, 
        });
        $('#datetimepicker2').datetimepicker({
          
          format: "dd/mm/yyyy - hh:ii",
          autoclose: true,
          todayBtn: true,
          endDate: DateTime2endLim,
          minuteStep: 5
        });

        $('#datetimepicker1').change(function(){
          changeWindow(myLineChart, chartType, element, requestParams, dtPick1, dtPick2);
        });
    
        $('#datetimepicker2').change(function(){
          changeWindow(myLineChart, chartType, element, requestParams, dtPick1, dtPick2);
          // endTimeStamp_chart = new Date(myLineChart.opts.series[0].data[myLineChart.opts.series[0].data.length-1][0]);
          // DateTime1endLim.setTime(endTimeStamp_chart.getTime() - 30*60*1000);
          // // alert("change");
          // $("#datetimepicker1").datepicker("setEndDate", DateTime1endLim);
        });
        
      });
    }); 

    


  

  
}