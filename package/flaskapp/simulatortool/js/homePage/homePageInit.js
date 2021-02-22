
window.onload = function() {

    // screen.orientation.lock("portrait");

    var freqButton = document.getElementById("freqButton");
    var demandButton = document.getElementById("demandButton");
    var freqIcon = document.getElementById("freqIcon");
    var demandIcon = document.getElementById("demandIcon");
    var generationSelect = document.getElementById("generationSelect");
    var timeRangeSelect = document.getElementById("timeRangeSelect");
    var intervalID_donuts = [0,1,2];
    var intervalID_lineChart, intervalID_gauge_sys, intervalID_gauge_pmu;
    // alert(window.innerHeight); // mac: width=1440/1440 height=789/900

    timeRangeSelect.value = "0";
  
       
    var chartType = "gauge"

    initDrawChart({chartType:chartType},"freqGaugeContainer_sys",{"dataComp":"f","dataTable":"freqdata","entryID":"1","reqType":"s","dateTime":"a","numRec":"1","nthTerm":"1"}, function(myGauge,chartType,element,requestParams){
      startChartUpdateInterval(myGauge,chartType,element,requestParams,function(updatedIntervalID_gauge){
        intervalID_gauge_sys = updatedIntervalID_gauge;
      });
    });

    // initDrawChart({chartType:chartType},"freqGaugeContainer_pmu",{"dataComp":"f","dataTable":"pmudata","entryID":"1","reqType":"b","dateTime":"a","numRec":"10112","nthTerm":"128"}, function(myGauge,chartType,element,requestParams){
      initDrawChart({chartType:chartType},"freqGaugeContainer_pmu",{"dataComp":"f","dataTable":"pmudata","entryID":"1","reqType":"b","dateTime":"a","numRec":"10112","nthTerm":"128"}, function(myGauge,chartType,element,requestParams){
        startChartUpdateInterval(myGauge,chartType,element,requestParams,function(updatedIntervalID_gauge){
            intervalID_gauge_pmu = updatedIntervalID_gauge;
        });
    });
    
    var chartType = "donut"

    initDrawChart({chartType:chartType},"genByCatDonutChart",{"dataComp":"gCat","dataTable":"demgendata","entryID":"1","reqType":"b","dateTime":"a","numRec":"1","nthTerm":"1"}, function(myDonut,chartType,element,requestParams){
      startChartUpdateInterval(myDonut,chartType,element,requestParams,function(updatedIntervalID_donut){
        intervalID_donuts[0] = updatedIntervalID_donut;
      });
    
    });

    initDrawChart({chartType:chartType},"genByFuelTypeDonutChart",{"dataComp":"g","dataTable":"demgendata","entryID":"1","reqType":"b","dateTime":"a","numRec":"1","nthTerm":"1"}, function(myDonut,chartType,element,requestParams){
      startChartUpdateInterval(myDonut,chartType,element,requestParams,function(updatedIntervalID_donut){
        intervalID_donuts[1] = updatedIntervalID_donut;
      });
    });

    initDrawChart({chartType:chartType},"intImportDonutChart",{"dataComp":"i","dataTable":"demgendata","entryID":"1","reqType":"b","dateTime":"a","numRec":"1","nthTerm":"1"}, function(myDonut,chartType,element,requestParams){
      startChartUpdateInterval(myDonut,chartType,element,requestParams,function(updatedIntervalID_donut){
        intervalID_donuts[2] = updatedIntervalID_donut;
      });
    });
 
    var chartType = "line"



    var $timeRangeSelObj = $("#timeRangeSelect");
    
    function changeTimeSelect($el, newOptions){
      $el.empty(); // remove old options
      $.each(newOptions, function(key,value) {
      $el.append($("<option></option>")
        .attr("value", value).text(key));
      });
    }

    changeTimeSelect($timeRangeSelObj, {
      "Select time range...": "0",
      "5 minutes": "0.1",
      "10 minutes": "0.2",
      "15 minutes": "0.25",
      "30 minutes": "0.5",
      "1 hour": "1",
      "2 hours": "2",
    });

    var requestParams = {"dataComp":"f","dataTable":"freqdata","entryID":"1","reqType":"b","dateTime":"a","numRec":"450","nthTerm":"1"};
    // requestParams = {"dataComp":"f","dataTable":"freqdata","entryID":"1","reqType":"w","dateTime":"14732827201473284520","numRec":"241"};
    initDrawChart({chartType:chartType, height: 450},"myLineChart",requestParams, function(myLineChart,chartType,element,requestParams){

      
      startChartUpdateInterval(myLineChart,chartType,element,requestParams,function(updatedIntervalID_lineChart){
        intervalID_lineChart = updatedIntervalID_lineChart;
      });

      function freqButtonHandler(){

        changeTimeSelect($timeRangeSelObj, {
          "Select time range...": "0",
          "5 minutes": "0.1",
          "10 minutes": "0.2",
          "15 minutes": "0.25",
          "30 minutes": "0.5",
          "1 hour": "1",
          "2 hours": "2",
        });

        requestParams.dataComp = "f";
        requestParams.dataTable = "freqdata";
        if( timeRangeSelect.value == "0"){
          timeRangeSelect.value = "1";
        }
        // alert(timeRangeSelect.value);
        updateLineChart(myLineChart, chartType, element, requestParams, intervalID_lineChart, timeRangeSelect.value, function(updatedIntervalID_lineChart){
          intervalID_lineChart = updatedIntervalID_lineChart;
        });        
      }
      function demandButtonHandler(){
        changeTimeSelect($timeRangeSelObj, {
          "Select time range...": "0",
          "30 minutes": "0.5",
          "1 hour": "1",
          "3 hours": "3",
          "6 hours": "6",
          "12 hours": "12",
          "1 day": "24",
          "5 days": "120",
          "1 week": "168",
        });
        requestParams.dataComp = "d";
        requestParams.dataTable = "demgendata";
        if( timeRangeSelect.value == "0"){
          timeRangeSelect.value = "24";
        }
        // alert(timeRangeSelect.value);
        updateLineChart(myLineChart, chartType, element, requestParams, intervalID_lineChart, timeRangeSelect.value, function(updatedIntervalID_lineChart){
          intervalID_lineChart = updatedIntervalID_lineChart;
        });
      }
      function generationSelectHandler(){
        changeTimeSelect($timeRangeSelObj, {
          "Select time range...": "0",
          "30 minutes": "0.5",
          "1 hour": "1",
          "3 hours": "3",
          "6 hours": "6",
          "12 hours": "12",
          "1 day": "24",
          "5 days": "120",
          "1 week": "168",
        });
        if (generationSelect.value != ""){
          requestParams.dataComp = generationSelect.value;
          requestParams.dataTable = "demgendata";
          if( timeRangeSelect.value == "0"){
            timeRangeSelect.value = "24";
          }
          updateLineChart(myLineChart, chartType, element, requestParams, intervalID_lineChart, timeRangeSelect.value, function(updatedIntervalID_lineChart){
            intervalID_lineChart = updatedIntervalID_lineChart;
          });          
        }
      }

      function pmuSelectHandler(){
        changeTimeSelect($timeRangeSelObj, {
          "Select time range...": "0",
          "1 second": "0.5",
          "5 seconds": "0.5",
          "10 seconds": "0.5",
          "30 seconds": "1",
          "1 min": "1",
        });
        if (generationSelect.value != ""){
          requestParams.dataComp = generationSelect.value;
          requestParams.dataTable = "demgendata";
          if( timeRangeSelect.value == "0"){
            timeRangeSelect.value = "24";
          }
          updateLineChart(myLineChart, chartType, element, requestParams, intervalID_lineChart, timeRangeSelect.value, function(updatedIntervalID_lineChart){
            intervalID_lineChart = updatedIntervalID_lineChart;
          });          
        }
      }
      

      function timeRangeSelectHandler(){
        // 
        if (timeRangeSelect.value != ""){
          // alert(JSON.stringify(requestParams));
          updateLineChart(myLineChart, chartType, element, requestParams, intervalID_lineChart, timeRangeSelect.value, function(updatedIntervalID_lineChart){
            intervalID_lineChart = updatedIntervalID_lineChart;
          });           
        }
      }
      
      freqButton.addEventListener("click",freqButtonHandler);
      demandButton.addEventListener("click",demandButtonHandler);
      freqIcon.addEventListener("click",freqButtonHandler);
      demandIcon.addEventListener("click",demandButtonHandler);
      generationSelect.addEventListener("change",generationSelectHandler);
      timeRangeSelect.addEventListener("change",timeRangeSelectHandler);
    });
    initialisePage();
    // if($(window).width() > 812){

    //   $("#sidebar").show();
    //   $('#page-content-wrapper').css('margin-left',"230px");

    // }
    // else {
    //     // if(screen.orientation.type != "portrait-primary"){
    //     if(window.orientation != 0){
    //         $('#turn').css('display','flex');
    //         $('#page-content-wrapper').css('display','none');

    //     }else{
    //         $('#turn').css('display','none');
    //     }
    //     $( window ).on( "orientationchange", function( event ) {
    //         // if(screen.orientation.type != "portrait-primary"){
    //         if(window.orientation != 0){
    //             $('#turn').css('display','flex');
    //             $('#page-content-wrapper').css('display','none');
    //             location.reload();

    //         }else{
    //             $('#turn').css('display','none');
    //             $('#page-content-wrapper').css('display','flex');
    //             location.reload();
    //         }
    //       });
          
        
    //     $('#feat4').hide();
            
    //     $('#menuIcon').show();
    //     $('#logoImg0').show();
    //     $('#logoImg').hide();


    //     $('#footer').css('margin-left',"0px");
    //     $('footer_text').css('font-size',"1vw");

        
    //     $("#sidebar").css('margin-top',"7vh");
    //     $("#sidebar").css('height',"100%");
    //     $('#menuIcon').css('height',"4.3vh");
    //     $('#menuIcon').css('margin-left',"1vh");
    //     $('#menuIcon').css('width',"4.3vh");
    //     $('#nav').css('height',"7vh");
        
    //     $('#navbar').text("Current Grid Status");
    //     $('#page-content-wrapper').css('margin-top',"8.5vh");
        

    //     $('h4').addClass("mobileH4");

    //     $("#menuIcon").on("click",function(){
    //         if($("#sidebar").css("display") == "none")
    //         {
    //             $("#sidebar").show();
    //         } else {
    //             $("#sidebar").hide();
    //         }
            
    //         });

    //     if($(window).width() > 320){
    //         $('#navbar').css('margin-left',"15vw");
    //     }
    //     else {
            
    //         $('#logoImg0').css('margin-left',"5vw");
    
    //         $('#navbar').css('margin-left',"12vw");
    //     }
    // }
    
    // $("#nav").show();
    
    


    
  }