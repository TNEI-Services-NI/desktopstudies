window.onload = function() {
    if (window.innerWidth > 820){
      var platform = "PC";
    } else 
    {
      var platform = "MOB";
    }
    

    var chartType = "line"


    var startTimeStamp_chart, endTimeStamp_chart;

    initDrawChart({chartType:chartType, 
                    height: window.innerHeight*0.37},
                    platform+"myLineChart_sysDem",
                    {"dataComp":"d","dataTable":"demgendata","entryID":"1","reqType":"b","dateTime":"a","numRec":"241","nthTerm":"1"}, 
                    function(myLineChart,chartType,element,requestParams){
                      
        var dtPick1 = document.getElementById('datetimepicker1_sysDem');
        var dtPick2 = document.getElementById('datetimepicker2_sysDem');                      

        startTimeStamp_chart = new Date(myLineChart.opts.series[0].data[0][0]);
        endTimeStamp_chart = new Date(myLineChart.opts.series[0].data[myLineChart.opts.series[0].data.length-1][0]);
        // alert(startTimeStamp_chart);
        DateTimeDisplay(startTimeStamp_chart, false, function(startDateTime_chart){
          document.getElementById('datetimepicker1_sysDem').value = startDateTime_chart;
        });
        
        DateTimeDisplay(endTimeStamp_chart, false, function(endDateTime_chart){
          document.getElementById('datetimepicker2_sysDem').value = endDateTime_chart;
        });
  
        var DateTime1endLim = new Date();
        DateTime1endLim.setTime(endTimeStamp_chart.getTime() - 10*60*1000);
        
        var DateTime2endLim = new Date();
        DateTime2endLim.setTime(DateTime2endLim.getTime() - 5*60*1000);
  
        $('#datetimepicker1_sysDem').datetimepicker({
          format: "dd/mm/yyyy - hh:ii",
          autoclose: true,
          todayBtn: false,
          endDate: DateTime1endLim,
          minuteStep: 5, 
        });
        $('#datetimepicker2_sysDem').datetimepicker({
          
          format: "dd/mm/yyyy - hh:ii",
          autoclose: true,
          todayBtn: true,
          endDate: DateTime2endLim,
          minuteStep: 5
        });
  
        $('#datetimepicker1_sysDem').change(function(){

            $('#infoTxt_sysDem').text('Now select an end date time...');
            // changeWindow(myLineChart, chartType, element, requestParams, dtPick1, dtPick2);

          // changeWindow(myLineChart, chartType, element, requestParams, dtPick1, dtPick2);
          
        });
    
        $('#datetimepicker2_sysDem').change(function(){
          
          if($('#infoTxt_sysDem').text() == ""){
            $('#infoTxt_sysDem').text("First, select a start time...");
          } else {
              $('#infoTxt_sysDem').text(" ");
              changeWindow(myLineChart, chartType, element, requestParams, dtPick1, dtPick2);
          }
          // endTimeStamp_chart = new Date(myLineChart.opts.series[0].data[myLineChart.opts.series[0].data.length-1][0]);
          // DateTime1endLim.setTime(endTimeStamp_chart.getTime() - 30*60*1000);
          // // alert("change");
          // $("#datetimepicker1").datepicker("setEndDate", DateTime1endLim);
        });
        

      });


    initDrawChart({chartType:chartType, 
                    height: window.innerHeight*0.37}, 
                    platform+"myLineChart_sysFre", 
                    {"dataComp":"f","dataTable":"freqdata","entryID":"1","reqType":"b","dateTime":"a","numRec":"241","nthTerm":"1"}, 
                    function(myLineChart,chartType,element,requestParams){
        
        var dtPick1 = document.getElementById('datetimepicker1_sysFre');
        var dtPick2 = document.getElementById('datetimepicker2_sysFre');



        startTimeStamp_chart = new Date(myLineChart.opts.series[0].data[0][0]);
        endTimeStamp_chart = new Date(myLineChart.opts.series[0].data[myLineChart.opts.series[0].data.length-1][0]);
        // alert(startTimeStamp_chart);
        DateTimeDisplay(startTimeStamp_chart, false, function(startDateTime_chart){
          document.getElementById('datetimepicker1_sysFre').value = startDateTime_chart;
        });
        
        DateTimeDisplay(endTimeStamp_chart, false, function(endDateTime_chart){
          document.getElementById('datetimepicker2_sysFre').value = endDateTime_chart;
        });
  
        var DateTime1endLim = new Date();
        DateTime1endLim.setTime(endTimeStamp_chart.getTime() - 5*60*1000);
        
        var DateTime2endLim = new Date();
        DateTime2endLim.setTime(DateTime2endLim.getTime() - 5*60*1000);

        var DateTime1startLim = new Date();
        DateTime1startLim.setTime(endTimeStamp_chart.getTime() - 5*60*60*1000);

        $('#datetimepicker1_sysFre').datetimepicker({
          format: "dd/mm/yyyy - hh:ii",
          autoclose: true,
          todayBtn: false,
          // startDate: DateTime1startLim,
          endDate: DateTime1endLim,
          minuteStep: 5, 
        });
        $('#datetimepicker2_sysFre').datetimepicker({
          
          format: "dd/mm/yyyy - hh:ii",
          autoclose: true,
          todayBtn: true,
          endDate: DateTime2endLim,
          minuteStep: 5
        });
  
        $('#datetimepicker1_sysFre').change(function(){
          $('#infoTxt_sysFre').text('Now select an end date time...');
          // changeWindow(myLineChart, chartType, element, requestParams, dtPick1, dtPick2);
        });
    
        $('#datetimepicker2_sysFre').change(function(){
          if($('#infoTxt_sysFre').text() == ""){
            $('#infoTxt_sysFre').text("First, select a start time...");
          } else {
              $('#infoTxt_sysFre').text(" ");
              changeWindow(myLineChart, chartType, element, requestParams, dtPick1, dtPick2);
          }
          // changeWindow(myLineChart, chartType, element, requestParams, dtPick1, dtPick2);
          // endTimeStamp_chart = new Date(myLineChart.opts.series[0].data[myLineChart.opts.series[0].data.length-1][0]);
          // DateTime1endLim.setTime(endTimeStamp_chart.getTime() - 30*60*1000);
          // // alert("change");
          // $("#datetimepicker1").datepicker("setEndDate", DateTime1endLim);
        });
      });

    


    initDrawChart({chartType:"area_s", height:window.innerHeight*0.37},platform+"myLineChart_sysGen", 
                {"dataComp":"gCat","dataTable":"demgendata","entryID":"1","reqType":"b","dateTime":"a","numRec":"300","nthTerm":"1"}, function(myLineChart,chartType,element,requestParams){

        var dtPick1 = document.getElementById('datetimepicker1_sysGen');
        var dtPick2 = document.getElementById('datetimepicker2_sysGen');

        startTimeStamp_chart = new Date(myLineChart.opts.series[0].data[0][0]);
        endTimeStamp_chart = new Date(myLineChart.opts.series[0].data[myLineChart.opts.series[0].data.length-1][0]);
        // alert(startTimeStamp_chart);
        DateTimeDisplay(startTimeStamp_chart, false, function(startDateTime_chart){
          document.getElementById('datetimepicker1_sysGen').value = startDateTime_chart;
        });
        
        DateTimeDisplay(endTimeStamp_chart, false, function(endDateTime_chart){
          document.getElementById('datetimepicker2_sysGen').value = endDateTime_chart;
        });
  
        var DateTime1endLim = new Date();
        DateTime1endLim.setTime(endTimeStamp_chart.getTime() - 10*60*1000);
        
        var DateTime2endLim = new Date();
        DateTime2endLim.setTime(DateTime2endLim.getTime() - 5*60*1000);
  
        $('#datetimepicker1_sysGen').datetimepicker({
          format: "dd/mm/yyyy - hh:ii",
          autoclose: true,
          todayBtn: false,
          endDate: DateTime1endLim,
          minuteStep: 5, 
        });
        $('#datetimepicker2_sysGen').datetimepicker({
          
          format: "dd/mm/yyyy - hh:ii",
          autoclose: true,
          todayBtn: true,
          endDate: DateTime2endLim,
          minuteStep: 5
        });
  
        $('#datetimepicker1_sysGen').change(function(){
          $('#infoTxt_sysGen').text('Now select an end date time...');
          // changeWindow(myLineChart, chartType, element, requestParams, dtPick1, dtPick2);
        });
    
        $('#datetimepicker2_sysGen').change(function(){
          if($('#infoTxt_sysGen').text() == ""){
            $('#infoTxt_sysGen').text("First, select a start time...");
          } else {
              $('#infoTxt_sysGen').text(" ");
              changeWindow(myLineChart, chartType, element, requestParams, dtPick1, dtPick2);
          }
          // changeWindow(myLineChart, chartType, element, requestParams, dtPick1, dtPick2);
          // endTimeStamp_chart = new Date(myLineChart.opts.series[0].data[myLineChart.opts.series[0].data.length-1][0]);
          // DateTime1endLim.setTime(endTimeStamp_chart.getTime() - 30*60*1000);
          // // alert("change");
          // $("#datetimepicker1").datepicker("setEndDate", DateTime1endLim);
        });

                  
      });



      initDrawChart({chartType:"line", height:window.innerHeight*0.37},platform+"myLineChart_pmuFre", 
                {"dataComp":"f","dataTable":"pmudata","entryID":"1","reqType":"b","dateTime":"a","numRec":"180000","nthTerm":"128"}, function(myLineChart,chartType,element,requestParams){

        var dtPick1 = document.getElementById('datetimepicker1_pmuFre');
        var dtPick2 = document.getElementById('datetimepicker2_pmuFre');

        startTimeStamp_chart = new Date(myLineChart.opts.series[0].data[0][0]);
        endTimeStamp_chart = new Date(myLineChart.opts.series[0].data[myLineChart.opts.series[0].data.length-1][0]);
        // alert(startTimeStamp_chart);
        DateTimeDisplay(startTimeStamp_chart, false, function(startDateTime_chart){
          document.getElementById('datetimepicker1_pmuFre').value = startDateTime_chart;
        });
        
        DateTimeDisplay(endTimeStamp_chart, false, function(endDateTime_chart){
          document.getElementById('datetimepicker2_pmuFre').value = endDateTime_chart;
        });
  
        var DateTime1endLim = new Date();
        DateTime1endLim.setTime(endTimeStamp_chart.getTime() - 2*60*1000); //set end limit of FROM = TO - 2 minutes
        
        var DateTime2endLim = new Date();
        DateTime2endLim.setTime(DateTime2endLim.getTime() - 1*60*1000); //set end limit of TO = 1 minute ago
  

        var DateTime1startLim = new Date();
        DateTime1startLim.setTime(endTimeStamp_chart.getTime() - 2*60*60*1000);

        // var DateTime2startLim = new Date();
        // DateTime2startLim.setTime(endTimeStamp_chart.getTime() - 5*60*1000);

        $('#datetimepicker1_pmuFre').datetimepicker({
          format: "dd/mm/yyyy - hh:ii",
          autoclose: true,
          todayBtn: false,
          // startDate: DateTime1startLim,
          endDate: DateTime1endLim,
          minuteStep: 1, 
        });
        $('#datetimepicker2_pmuFre').datetimepicker({
          
          format: "dd/mm/yyyy - hh:ii",
          autoclose: true,
          todayBtn: true,
          endDate: DateTime2endLim,
          minuteStep: 1
        });
  
        $('#datetimepicker1_pmuFre').change(function(){
          $('#infoTxt_pmuFre').text('Now select an end date time...');
          // changeWindow(myLineChart, chartType, element, requestParams, dtPick1, dtPick2);
        });
    
        $('#datetimepicker2_pmuFre').change(function(){
          if($('#infoTxt_pmuFre').text() == ""){
            $('#infoTxt_pmuFre').text("First, select a start time...");
          } else {
              $('#infoTxt_pmuFre').text(" ");
              changeWindow(myLineChart, chartType, element, requestParams, dtPick1, dtPick2);
          }
          // changeWindow(myLineChart, chartType, element, requestParams, dtPick1, dtPick2);
          // endTimeStamp_chart = new Date(myLineChart.opts.series[0].data[myLineChart.opts.series[0].data.length-1][0]);
          // DateTime1endLim.setTime(endTimeStamp_chart.getTime() - 30*60*1000);
          // // alert("change");
          // $("#datetimepicker1").datepicker("setEndDate", DateTime1endLim);
        });



      });


      
      initDrawChart({chartType:"mline", height:window.innerHeight*0.37},platform+"myLineChart_pmuVol", 
                {"dataComp":"vph","dataTable":"pmudata","entryID":"1","reqType":"b","dateTime":"a","numRec":"4000","nthTerm":"16"}, function(myLineChart,chartType,element,requestParams){

        var dtPick1 = document.getElementById('datetimepicker1_pmuVol');
        var dtPick2 = document.getElementById('datetimepicker2_pmuVol');
        startTimeStamp_chart = new Date(myLineChart.opts.series[0].data[0][0]);
        endTimeStamp_chart = new Date(myLineChart.opts.series[0].data[myLineChart.opts.series[0].data.length-1][0]);
        // alert(startTimeStamp_chart);
        DateTimeDisplay(startTimeStamp_chart, false, function(startDateTime_chart){
          document.getElementById('datetimepicker1_pmuVol').value = startDateTime_chart;
        });
        
        DateTimeDisplay(endTimeStamp_chart, false, function(endDateTime_chart){
          document.getElementById('datetimepicker2_pmuVol').value = endDateTime_chart;
        });
  
        var DateTime1endLim = new Date();
        DateTime1endLim.setTime(endTimeStamp_chart.getTime() - 5*60*1000);
        
        var DateTime2endLim = new Date();
        DateTime2endLim.setTime(DateTime2endLim.getTime() - 1*60*1000);

        var DateTime1startLim = new Date();
        DateTime1startLim.setTime(endTimeStamp_chart.getTime() - 2*60*60*1000);

        $('#datetimepicker1_pmuVol').datetimepicker({
          format: "dd/mm/yyyy - hh:ii",
          autoclose: true,
          todayBtn: false,
          // startDate: DateTime1startLim,
          endDate: DateTime1endLim,
          minuteStep: 1, 
        });
        $('#datetimepicker2_pmuVol').datetimepicker({
          
          format: "dd/mm/yyyy - hh:ii",
          autoclose: true,
          todayBtn: true,
          endDate: DateTime2endLim,
          minuteStep: 1
        });
  
        $('#datetimepicker1_pmuVol').change(function(){
          $('#infoTxt_pmuVol').text('Now select an end date time...');
          // changeWindow(myLineChart, chartType, element, requestParams, dtPick1, dtPick2);
        });
    
        $('#datetimepicker2_pmuVol').change(function(){
          if($('#infoTxt_pmuVol').text() == ""){
            $('#infoTxt_pmuVol').text("First, select a start time...");
          } else {
              $('#infoTxt_pmuVol').text(" ");
              changeWindow(myLineChart, chartType, element, requestParams, dtPick1, dtPick2);
          }
          // changeWindow(myLineChart, chartType, element, requestParams, dtPick1, dtPick2);
          // endTimeStamp_chart = new Date(myLineChart.opts.series[0].data[myLineChart.opts.series[0].data.length-1][0]);
          // DateTime1endLim.setTime(endTimeStamp_chart.getTime() - 30*60*1000);
          // // alert("change");
          // $("#datetimepicker1").datepicker("setEndDate", DateTime1endLim);
        });

      });

      initDrawChart({chartType:"line", height:window.innerHeight*0.37},platform+"myLineChart_pmuRoc", 
                {"dataComp":"roc","dataTable":"pmudata","entryID":"1","reqType":"b","dateTime":"a","numRec":"4000","nthTerm":"16"}, function(myLineChart,chartType,element,requestParams){
        var dtPick1 = document.getElementById('datetimepicker1_pmuRoc');
        var dtPick2 = document.getElementById('datetimepicker2_pmuRoc');
        startTimeStamp_chart = new Date(myLineChart.opts.series[0].data[0][0]);
        endTimeStamp_chart = new Date(myLineChart.opts.series[0].data[myLineChart.opts.series[0].data.length-1][0]);
        // alert(startTimeStamp_chart);
        DateTimeDisplay(startTimeStamp_chart, false, function(startDateTime_chart){
          document.getElementById('datetimepicker1_pmuRoc').value = startDateTime_chart;
        });
        
        DateTimeDisplay(endTimeStamp_chart, false, function(endDateTime_chart){
          document.getElementById('datetimepicker2_pmuRoc').value = endDateTime_chart;
        });
  
        var DateTime1endLim = new Date();
        DateTime1endLim.setTime(endTimeStamp_chart.getTime() - 5*60*1000);
        
        var DateTime2endLim = new Date();
        DateTime2endLim.setTime(DateTime2endLim.getTime() - 1*60*1000);
  
        var DateTime1startLim = new Date();
        DateTime1startLim.setTime(endTimeStamp_chart.getTime() - 2*60*60*1000);

        $('#datetimepicker1_pmuRoc').datetimepicker({
          format: "dd/mm/yyyy - hh:ii",
          autoclose: true,
          todayBtn: false,
          // startDate: DateTime1startLim,
          endDate: DateTime1endLim,
          minuteStep: 1, 
        });
        $('#datetimepicker2_pmuRoc').datetimepicker({
          
          format: "dd/mm/yyyy - hh:ii",
          autoclose: true,
          todayBtn: true,
          endDate: DateTime2endLim,
          minuteStep: 1
        });
  
        $('#datetimepicker1_pmuRoc').change(function(){
          $('#infoTxt_pmuRoc').text('Now select an end date time...');
          // changeWindow(myLineChart, chartType, element, requestParams, dtPick1, dtPick2);
        });
    
        $('#datetimepicker2_pmuRoc').change(function(){
          if($('#infoTxt_pmuRoc').text() == ""){
            $('#infoTxt_pmuRoc').text("First, select a start time...");
          } else {
              $('#infoTxt_pmuRoc').text(" ");
              changeWindow(myLineChart, chartType, element, requestParams, dtPick1, dtPick2);
          }
          // changeWindow(myLineChart, chartType, element, requestParams, dtPick1, dtPick2);
          // endTimeStamp_chart = new Date(myLineChart.opts.series[0].data[myLineChart.opts.series[0].data.length-1][0]);
          // DateTime1endLim.setTime(endTimeStamp_chart.getTime() - 30*60*1000);
          // // alert("change");
          // $("#datetimepicker1").datepicker("setEndDate", DateTime1endLim);
        });

      });

      initialisePage();
    
  }