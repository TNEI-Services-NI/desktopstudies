window.onload = function() {
    if (window.innerWidth > 820){
      var platform = "PC";
      var chartObj = {
        chartType: "line",
        height: window.innerHeight * 0.37
      };
    } else 
    {
      var platform = "MOB";
      var chartObj = {
        chartType: "line",
        height: 0.6,
        width: 0.76
      };
      $('#'+platform+'infoTxt').css("font-size","12px")
    }
    $('#'+platform+'infoTxt').css("color","crimson")
  
    function validateEmail(sEmail) {
        var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (filter.test(sEmail)) {
            return true;
        }
        else {
            return false;
        }
    }
    $('#'+platform+'emailButton').on('click',function(e){
      // getEmailHTML(function(emailHTML){
  
        
      // });
      
      if(($('#'+platform+'emailIn1').val() == $('#'+platform+'emailIn2').val()) && $('#'+platform+'emailIn1').val() != ""){
        var sEmail = $('#'+platform+'emailIn1').val();
        if ($.trim(sEmail).length == 0) {
            alert('Please enter valid email address');
            e.preventDefault();
        }
        if (validateEmail(sEmail)) {
            if ($('#'+platform+'nameIn').val().length > 2 && $('#'+platform+'nameIn').val().search( ' ' ) != -1){
              $.get("./php/emailSend.php",{"name":$('#'+platform+'nameIn').val(),"email":sEmail},function(data, status){
                // alert(JSON.stringify(data));
                alert("Successfully subscribed, please check your inbox/spam folder");
              })
              
              
            } else {
              alert('Please enter your full name');
            }
        }
        else {
            alert('Invalid Email Address');
            e.preventDefault();
        }
      } else {
        if($('#'+platform+'emailIn1').val() == ""){
          alert("Please enter email address")
        } else {
          alert("Entries do not match")
        }
        
      }
      
    
      
    });
    initialisePage();

    $("body").css("cursor", "progress");

    var modal = document.getElementById(platform+'myModal');

    var span = document.getElementById(platform+"close");

    var sysFreqBreachButton = document.getElementById(platform+"sysFreqBreachButton");
    var pmuRocBreachButton = document.getElementById(platform+"pmuRocBreachButton");


    var chartType = "regionList";

    var endDateTime = new Date();
    var startDateTime = new Date(endDateTime.getTime() - 1000*60*60*24*7);

    inputParams = {attr:"rocof", period:2, viewMargin: 200, minDur: 4, dangerDur: 6};
    requestParams = {"dataComp":"roca3","dataTable":"pmudata","entryID":"1","reqType":"b","dateTime":"","numRec":"10","nthTerm":"1"};

    dateTimeToTimeStamp(startDateTime, function(timeStamp1){
      // alert(timeStamp);
      // alert(timeStamp1);
      if($(window).width() < 860 ){
      
          timeStamp1 = (timeStamp1 - 60*60*1000).toString();
      } else {
          timeStamp1 = (timeStamp1 - 2*60*60*1000).toString();
          
      }

      requestParams.dateTime = requestParams.dateTime.concat(timeStamp1.toString().substring(0,12));

    });
    dateTimeToTimeStamp(endDateTime, function(timeStamp2){
      // alert(timeStamp);
      // alert(timeStamp1);
      if($(window).width() < 860 ){
      
        timeStamp2 = (timeStamp2 - 60*60*1000).toString();
      } else {
        timeStamp2 = (timeStamp2 - 2*60*60*1000).toString();

      }

      requestParams.dateTime = requestParams.dateTime.concat(timeStamp2.toString().substring(0,12));

    });
    // alert(requestParams.dateTime.sys);
    // alert(requestParams.dateTime.pmu);
    // inputParams = {attr:"Freq_Hz", period:15, viewMargin: 800, minDur: 45, dangerDur: 120};
    // requestParams = {"dataComp":"fa1","dataTable":"freqdata","entryID":"1","reqType":"w","dateTime":"","numRec":"400","nthTerm":"1"};

    // alert(requestParams.dateTime);
    
      printEvents(chartType, modal, span, 0, requestParams,inputParams, function(outputRoc){

        // alert(outputRoc.recordHTML);
        $('#'+platform+'eventList tbody').append(outputRoc.recordHTML);
          
    
        $('#'+platform+'pmuRocBreachCountDang').html(outputRoc.numEvents.dang.toString());
        $('#'+platform+'pmuRocBreachCountWarn').html(outputRoc.numEvents.warn.toString());

        $('#'+platform+'pmuRocBreachButton').css("background-color", "#cacaca");

        var r;
        // r = $( ".rp" ).detach();
        var createRocClickHandler = function() {
          return function() {
            if ( r ) {
              r.appendTo( "#"+platform+"eventListBod" );
              r = null;
              $('#'+platform+'pmuRocBreachButton').css("background-color", "#cacaca");
            } else {
              r = $( ".rp" ).detach();
              $('#'+platform+'pmuRocBreachButton').css("background-color", "white");
            }
          };
        };
          
        pmuRocBreachButton.onclick = createRocClickHandler();


        inputParams = {attr:"Freq_Hz", period:15, viewMargin: 800, minDur: 45, dangerDur: 120};
        requestParams = {"dataComp":"fa1","dataTable":"freqdata","entryID":"1","reqType":"b","dateTime":requestParams.dateTime,"numRec":"400","nthTerm":"1"};
    

        printEvents(chartType, modal, span, 0, requestParams,inputParams, function(outputF){
          
          $('#'+platform+'eventList tbody').append(outputF.recordHTML);
          $('#'+platform+'sysFreqBreachCountDang').html(outputF.numEvents.dang.toString());
          $('#'+platform+'sysFreqBreachCountWarn').html(outputF.numEvents.warn.toString());
          // alert($('#sysFreqBreachButton').css("background-color"));
          $('#'+platform+'sysFreqBreachButton').css("background-color", "#cacaca");
    
          $('#'+platform+'infoTxt').css("color","black")
          $('#'+platform+'infoTxt').text("Please select one or more categories from the dashboard to view events");
  
          
          var f;
          // f = $( ".ff" ).detach();
          
          var createFreqClickHandler = function() {
            return function() {
              // alert();
              if ( f ) {
                f.appendTo( "#"+platform+"eventListBod" );
                $('#'+platform+'sysFreqBreachButton').css("background-color", "#cacaca");
                f = null;
              } else {
                // alert();
                f = $( ".ff" ).detach();
                $('#'+platform+'sysFreqBreachButton').css("background-color", "white");
              }
            };
          };
            
          sysFreqBreachButton.onclick = createFreqClickHandler();
    
            


            $("body").css("cursor", "default");
            $(".ff").hover(function() {
              $("body").css("cursor", "pointer");
            });
            $(".rp").hover(function() {
              $("body").css("cursor", "pointer");
            });
            $(".ff").mouseout(function() {
              $("body").css("cursor", "default");
            });
            $(".rp").mouseout(function() {
              $("body").css("cursor", "default");
            });
            // inputParams = {attr:"Freq_Hz", period:2, viewMargin: 200, minDur: 1, dangerDur: 6};
            // requestParams = {"dataComp":"fa1","dataTable":"pmudata","entryID":"1","reqType":"b","dateTime":"","numRec":"50","nthTerm":"1"};
            // printEvents(chartType, modal, span, 0, requestParams,inputParams, function(outputFP){
            //   alert(outputFP.recordHTML);

            //   $('#'+platform+'eventList tbody').append(outputFP.recordHTML);
        
            //   $('#pmuFreqBreachCountWarn').html(outputFP.numEvents.dang.toString());
            //   $('#pmuFreqBreachCountDang').html(outputFP.numEvents.warn.toString());


            //   var fp;

            //   var createFreqPClickHandler = function() {
            //     return function() {
            //       if ( fp ) {
            //         fp.appendTo( "#PCeventListBod" );
            //         fp = null;
            //       } else {
            //         fp = $( ".fp" ).detach();
            //       }
            //     };
            //   };
                
            //   pmuFreqBreachButton.onclick = createFreqPClickHandler();



              $('.ff').click(function() {
                
                modal.style.display = "block";
                if(window.orientation == 0){
                  $('#'+platform+'turnModal').css('display','flex');
                  $('#'+platform+'chartModal').css('display','none');
                  }else{
                      $('#'+platform+'chartModal').css('display','flex');
                      $('#'+platform+'turnModal').css('display','none');
                  }
                requestParams.dateTime = $(this).find("td:first").text();
                requestParams.dataComp = "f";
                requestParams.reqType = "w";
                requestParams.nthTerm = "1";
                requestParams.dataTable = "freqdata";
                // alert(JSON.stringify(requestParams));
                initDrawChart(chartObj,
                    platform+"myLineChart", requestParams,
                    function(myLineChart, chartType, element, requestParams) {
                        span.onclick = function() {
                            myLineChart.destroy();
                            modal.style.display = "none";
                        }
                        window.onclick = function(event) {
                            if (event.target == modal) {
                                myLineChart.destroy();
                                modal.style.display = "none";
                            }
                        }
                    });
                
              });
            

              $('.rp').click(function() {
                modal.style.display = "block";
                requestParams.dateTime = $(this).find("td:first").text();
                requestParams.dataComp = "roc";
                requestParams.reqType = "w";
                requestParams.dataTable = "pmudata";
                requestParams.nthTerm = "2";
                // alert(JSON.stringify(requestParams));
                initDrawChart(chartObj,
                    platform+"myLineChart", requestParams,
                    function(myLineChart, chartType, element, requestParams) {
                        span.onclick = function() {
                            myLineChart.destroy();
                            modal.style.display = "none";
                        }
                        window.onclick = function(event) {
                            if (event.target == modal) {
                                myLineChart.destroy();
                                modal.style.display = "none";
                            }
                        }
                    });
              });


            //   $('.fp').click(function() {
            //     modal.style.display = "block";
            //     requestParams.dateTime = $(this).find("td:first").text();
            //     requestParams.dataComp = "f";
            //     requestParams.reqType = "w";
            //     requestParams.dataTable = "freqdata";
            //     requestParams.nthTerm = "1";
            //     // alert(JSON.stringify(requestParams));
            //     initDrawChart({
            //             chartType: "line",
            //             height: window.innerHeight * 0.37
            //         },
            //         "PCmyLineChart", requestParams,
            //         function(myLineChart, chartType, element, requestParams) {
            //             span.onclick = function() {
            //                 myLineChart.destroy();
            //                 modal.style.display = "none";
            //             }
            //             window.onclick = function(event) {
            //                 if (event.target == modal) {
            //                     myLineChart.destroy();
            //                     modal.style.display = "none";
            //                 }
            //             }
            //         });
            //   });



            // });

        });
        
    });
    
  



    // requestParams = {"dataComp":"froca4","dataTable":"pmudata","entryID":"1","reqType":"b","dateTime":"","numRec":"50","nthTerm":"1"};
    // requestData(chartType,requestParams,function(data){
    //   // alert(JSON.stringify(data));
    //   var none = true;
    //   var warnings = 0;
    //   var alerts = 0;
    //   data.forEach(function(item,index,array){
    //     none = false;
        

    //     var recordHTML = `<tr class='`;
    //     // if (item.alertRegion == "3"){
    //     //   recordHTML += `table-warning`;
    //     //   warnings += 1;
    //     // } else
    //      if (item.alertRegion == "4"){
    //       recordHTML += `table-warning`;
    //       alerts += 1;
    //     } else {
    //       recordHTML += `table-light`;
    //     }
    //     recordHTML += `'><th scope='row' style='border-style: none'>`;
        
    //     timeStamptoDateTimeDisplay(item.entryID, true,function(displayTime){
    //       recordHTML += displayTime;
    //       if (index == data.length - 1){
    //         startDateTime = displayTime;
    //         dtPick1.value = startDateTime;
    //       } else if (index == 0){
    //         endDateTime = displayTime;
    //         dtPick2.value = endDateTime;
    //       }
    //     });
        
    //     recordHTML += `</th><td>` + "getData" + `</td><td>` + item.Freq_Hz.substring(0,8) + `</td><td style="font-weight: bold;">` + item.rocof.substring(0,8) + ` [Hz/s]</td><td>` + item.alertRegion + "</td></tr>";
    //     // alert(recordHTML);
    //     $('#'+platform+'eventList tr:last').after(recordHTML);
    //   });
    //   if(none){
    //     // alert("test");
    //     $('#'+platform+'eventList tr:last').after("<tr class='table-light'><th scope='row' style='border-style: none'>No breaches detected within this window. :)</th></tr>");
    //     // $('#pmuRoc3BreachCount').html("0");
    //     // $('#pmuRoc4BreachCount').html("0");
    //   } else {
    //     $('#pmuRocBreachCount3').html(alerts.toString());
    //     // $('#pmuRoc4BreachCount').html(alerts.toString());
    //     // alert(warnings);
    //   }
    
    // });
    // requestParams = {"dataComp":"fa1","dataTable":"pmudata","entryID":"1","reqType":"b","dateTime":"","numRec":"1","nthTerm":"1"};
    // requestData(chartType,requestParams,function(data){
    //   // alert(JSON.stringify(data));
    //   var none = true;
    //   data.forEach(function(item,index,array){
    //     none = false;
        

    //     var recordHTML = `<tr class='`, warning;
    //     if (item.alertRegion == "1"){
    //       recordHTML += `table-warning`;
    //     } else if (item.alertRegion == "2"){
    //       recordHTML += `table-warning`;
    //     } else {
    //       recordHTML += `table-light`;
    //     }
    //     recordHTML += `'><th scope='row' style='border-style: none'>`;
        
    //     timeStamptoDateTimeDisplay(item.entryID, true,function(displayTime){
    //       recordHTML += displayTime;
    //       if (index == data.length - 1){
    //         startDateTime = displayTime;
    //         dtPick1.value = startDateTime;
    //       } else if (index == 0){
    //         endDateTime = displayTime;
    //         dtPick2.value = endDateTime;
    //       }
    //     });
        
    //     recordHTML += `</th><td>` + "getData" + `</td><td style="font-weight: bold;">` + item.Freq_Hz.substring(0,8) + ` [Hz]</td><td>` + "getData" + `</td><td>` + item.alertRegion + "</td></tr>";
    //     // alert(recordHTML);
    //     // alert("test");
    //     $('#'+platform+'pmuFreqEventList tr:last').after(recordHTML);
    //   });
    //   if(none){
    //     // alert("test");
    //     $('#'+platform+'eventList tr:last').after("<tr class='table-light'><th scope='row' style='border-style: none'>No breaches detected within this window. :)</th></tr>");
    //     // $('#pmuFreqBreachCount').html("0");
    //   } else {
    //     $('#pmuFreqBreachCount').html(data.length.toString());
    //   }

    
    // });
    




    // $.get("./php/GETdata.php",{dataComp: "alertRegion",
    //                               reqType: "w",
    //                               dateTime: "",
    //                               numRec: ""}, function(dbData, status) {
    //                                 alert(dbData);
    //                               });

    // $('#'+platform+'sysEventList tr:last').after(`<tr class='table-warning'>
    //                                       <th scope='row'>1</th>
    //                                       <td>Mark</td>
    //                                       <td>Otto</td>
    //                                       <td>@mdo</td>
    //                                     </tr>`);
    

    
  }