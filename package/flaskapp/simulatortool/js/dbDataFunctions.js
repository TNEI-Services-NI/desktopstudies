function eidToNewDateFormat(eid, output){
  // input: 190101000000 = 01/01/19 00:00:00
  var time_ = eid.substring(6,8).concat(':',eid.substring(8,10),
  ':',eid.substring(10,12));


  var date_ = "20".concat(eid.substring(0,2),
  '-',eid.substring(2,4),
  '-',eid.substring(4,6));

  output({"date":date_, "time":time_})
}

// THIS DOESNT WORK
// function timeStampToNewDateFormat(timeStamp, secs, output){
//   // input: 1554397011 =  Thursday, April 4, 2019 4:56:51 PM
//   // alert(timeStamp);
//   var epoch = new Date("1970-01-01 00:00:00.000");
//   // alert(epoch);

//   if(timeStamp.length == 12){
//     var date = new Date(epoch.getTime() + parseInt(timeStamp.concat("0")));
    

//   } else{
//     var date = new Date(epoch.getTime() + parseInt(timeStamp)*1000);
    
//   }
//   // alert(date);
//   date_ = date.getUTCFullYear() + "-" +
//   ("0" + (date.getUTCMonth()+1)).slice(-2) + "-" +
//   ("0" + date.getUTCDate()).slice(-2);
//   var hrs = date.getUTCHours() - 2*date.getTimezoneOffset()/60;
//   // alert( hrs);
//   var time_ =  ("0" + hrs).slice(-2) + ":" +("0" + date.getUTCMinutes()).slice(-2);
//   if(secs==true){
//     time_ = time_ + ":" + ("0" + date.getUTCSeconds()).slice(-2)
//   };
  

//   if(timeStamp.length == 12){
//     // output(time_)
//     output(date.getTime())

//   } else{
//     output({"date":date_, "time":time_})
    
//   }
function timeStampToNewDateFormat(timeStamp, secs, output){
  // input: 1554397011 =  Thursday, April 4, 2019 4:56:51 PM
  // alert(timeStamp);
  var epoch = new Date("1970-01-01T00:00:00");
  // alert(epoch);

  if(timeStamp.length == 12){
    var date = new Date(epoch.getTime() + parseInt(timeStamp.concat("0")));
  
    date_ = date.getUTCFullYear() + "-" +
    ("0" + (date.getUTCMonth()+1)).slice(-2) + "-" +
    ("0" + date.getUTCDate()).slice(-2);
    
    var time_ =  ("0" + date.getUTCHours()).slice(-2) + ":" +("0" + date.getUTCMinutes()).slice(-2);
    // alert(time_);
    if(secs==true){
      time_ = time_ + ":" + ("0" + date.getUTCSeconds()).slice(-2)
    };

    output(date.getTime())
  } else{
    var date = new Date(epoch.getTime() + parseInt(timeStamp)*1000);
    date_ = date.getUTCFullYear() + "-" +
    ("0" + (date.getUTCMonth()+1)).slice(-2) + "-" +
    ("0" + date.getUTCDate()).slice(-2);

    var time_ =  ("0" + date.getUTCHours()).slice(-2) + ":" +("0" + date.getUTCMinutes()).slice(-2);
    // alert(time_);
    if(secs==true){
      time_ = time_ + ":" + ("0" + date.getUTCSeconds()).slice(-2)
    };
    // alert(time_);
    output({"date":date_, "time":time_})
  }
  
  
}
  
  
  
// }

function DateTimeDisplay(dateTimeIn,secs, output){
  var strM;
  var dateTime = new Date(new Date(dateTimeIn).getTime() - new Date(dateTimeIn).getTimezoneOffset()*60*1000);
  var hrs = dateTime.getUTCHours();
  strM =  (("0" + dateTime.getUTCDate()).slice(-2) + "/" +
  ("0" + (dateTime.getUTCMonth()+1)).slice(-2) + "/" +
  dateTime.getUTCFullYear() + " - " +
  ("0" + hrs).slice(-2) + ":" +
  ("0" + dateTime.getUTCMinutes()).slice(-2)); 
  if(secs==true){
    strM = strM + ":" + ("0" + dateTime.getUTCSeconds()).slice(-2)
  };

  output(strM);
}

function dateTimeDisplayToNewDateTimeFormat(dateTimeIn, output){
  // input: 22/03/2019 - 10:10 
  var time_ = dateTimeIn.substring(13,15).concat(':',dateTimeIn.substring(16,18),':00');

  var date_ = dateTimeIn.substring(6,10).concat('-',dateTimeIn.substring(3,5),
  '-',dateTimeIn.substring(0,2));
  // alert(dateTimeIn);
  output({"date":date_, "time":time_});
}

function dateTimeToTimeStamp(dateTimeIn, output){
  var epoch = new Date("1970-01-01T00:00:00");
  var timeStamp = (dateTimeIn.getTime()  ) - epoch.getTime();
  output(timeStamp);
}

function dateTimeDisplaytoTimeStamp(dateTimeIn,  output){
  dateTimeDisplayToNewDateTimeFormat(dateTimeIn, function(dateTime){
    dateTimeToObj(dateTime.date+"T"+dateTime.time, function(dateTimeObj){
    
      dateTimeToTimeStamp(dateTimeObj, function(timeStamp){
        // alert(timeStamp);
        output(timeStamp.toString().substring(0,10));

      });
    });
  });
}

function timeStamptoDateTimeDisplay(timeStamp, secs,  output){
  if(timeStamp.length == 10){
    timeStampToNewDateFormat(timeStamp, secs, function(dateTime){
      
      dateTimeToObj(dateTime.date+"T"+dateTime.time,function(dateTimeObj){
        DateTimeDisplay(dateTimeObj,secs, function(displayTime){
          output(displayTime);
        });
      });
    });
  } else {
    DateTimeDisplay(new Date(parseInt(timeStamp+"0")),secs, function(displayTime){
      output(displayTime);
    });
  }
}


function dateTimeToObj(dateTime,output){
  // alert(typeof(dateTime));
  if (typeof(dateTime)=="string"){
    output(new Date(new Date(dateTime).getTime() - new Date(dateTime).getTimezoneOffset()*60*1000));
    // output(new Date(new Date(dateTime).getTime()));
  }
  else  {
    output(new Date(dateTime.getTime() - dateTime.getTimezoneOffset()*60*1000));
    // output(new Date(dateTime));
  }
  }

function formatDataCompDisplay(dataComp, output){
  switch(dataComp) {
    case "Nucl":
      output("Nuclear");
      break;
    case "PS":
      output("Pumped Storage");
      break;
    case "NPSHYD":
      output("Hydro");
      break;
    case "OCGT":
      output("OCGT");
      break;
    case "Bio":
      output("Biomass");
      break;
    case "Bio":
      output("Biomass");
      break;
    case "Freq_Hz":
      output("Frequency");
      break;
    case "SysDem":
      output("Demand");
      break;
    default:
      output(dataComp);
  }
}

function formatDbDataLine(chartType, dbData, dataComps, nthTerm, output){
    var outputDbData = [];
    var dataCompsDisplay = [];

    // alert(dbData);
    for (var i = 0; i < dataComps.length; i++) { 
      formatDataCompDisplay(dataComps[i], function(dataCompDisplay){
        dataCompsDisplay[i] = dataCompDisplay;
      });
    }

    

    if (chartType == "line"){
      // var dbDataTemp = dbData;
      // dbData = [];
      // for (var i = 0; i < dbDataTemp.length; i += parseInt(nthTerm)) {

      //   dbData.push(dbDataTemp[i]);
      // }

      var maxVal = 0, minVal = 1000000, maxTotVal = 0;

      if(dataComps != "Freq_Hz" && dataComps != "rocof" ){ var secs = false; } else { var secs = true; }
      
      dbData.forEach(function(item,index,array) {
        var timeStamp = item["entryID"]; //190101203040
        var val = parseFloat(item[dataComps]);
        
        if (val < minVal){
          minVal = val;
        }
        if (val > maxVal){
          maxVal = val;
        }

        if (timeStamp.length == 10){
          timeStampToNewDateFormat(timeStamp, secs, function(dateTime){
            
            dateTimeToObj(dateTime.date+"T"+dateTime.time,function(dateTimeObj){
              if($(window).width() < 860 ){
                
                if(dateTimeObj.getTimezoneOffset() == -60){
                
                  dateTimeObj = new Date(dateTimeObj.getTime() - 60*60*1000);
                }
              } else {
                if(dateTimeObj.getTimezoneOffset() == -60){
                
                  dateTimeObj = new Date(dateTimeObj.getTime() + 60*60*1000);
                }
                
              }
              
              outputDbData.push([dateTimeObj.getTime(),val]);
            });
          });
        } else if (timeStamp.length == 12){
          // alert("12");
          timeStampToNewDateFormat(timeStamp, secs, function(dateTime){
  
            // dateTimeToObj(dateTime.date+"T"+dateTime.time,function(dateTimeObj){
              // alert(new Date(dateTime).getTimezoneOffset());
              if($(window).width() < 860 ){
                
                if(new Date(dateTime).getTimezoneOffset() == -60){
                
                  dateTime = dateTime + 0*60*60*1000;
                }
              } else {
                if(new Date(dateTime).getTimezoneOffset() == -60){
                
                  dateTime = dateTime + 60*60*1000;
                }
                
              }
              
              outputDbData.push([dateTime,val]);
            // });

          });
        }
               
      });
      
      outputDbData = outputDbData.reverse();
      // alert("max: "+maxVal)
      // alert("min: "+minVal)
      var dataCompDisp;
      formatDataCompDisplay(dataComps, function(dataCompsDisplay){
        dataCompDisp = dataCompsDisplay;
      });
      output({"data":outputDbData, "max": maxVal, "min": minVal, "name": dataCompDisp});
    }


    else if(chartType == "mline"){

      // var dbDataTemp = dbData;
      // dbData = [];
      // for (var i = 0; i < dbDataTemp.length; i += parseInt(nthTerm)) {
        
      //   dbData.push(dbDataTemp[i]);
      // }
      
      if (dataCompsDisplay.length == 6){
        for (var i = 0; i < 6; i+=2) { 
          outputDbData.push({name: dataCompsDisplay[i], data: []});
          
        }
        // console.log(JSON.stringify(dbData));
        // alert(dataComps);
        dbData.forEach(function(item,index,array) {
          var timeStamp = item["entryID"]; 
          
          timeStampToNewDateFormat(timeStamp, true, function(dateTime){
            if($(window).width() < 860 ){
                
              if(new Date(dateTime).getTimezoneOffset() == -60){
              
                dateTime = dateTime + 0*60*60*1000;
              }
            } else {
              if(new Date(dateTime).getTimezoneOffset() == -60){
              
                dateTime = dateTime + 60*60*1000;
              }
              
            }
              for (var i = 0; i < 6; i+=2) { 
                // alert(dataComps[i]);
                // alert(dataComps[i+1]);
                outputDbData[i/2].data.push([dateTime,  parseFloat(item[dataComps[i]])*Math.sin(Math.PI*item[dataComps[i+1]]/180)]);
                
              }
            // });
          }); 
          
          
        });
      } else {
        for (var i = 0; i < 3; i++) { 
          outputDbData.push({name: dataCompsDisplay[i], data: []});
          
        }
        // console.log(JSON.stringify(dbData));
        dbData.forEach(function(item,index,array) {
          var timeStamp = item["entryID"]; 
          
          timeStampToNewDateFormat(timeStamp, true, function(dateTime){
            if($(window).width() < 860 ){
                
              if(new Date(dateTime).getTimezoneOffset() == -60){
              
                dateTime = dateTime + 0*60*60*1000;
              }
            } else {
              if(new Date(dateTime).getTimezoneOffset() == -60){
              
                dateTime = dateTime + 60*60*1000;
              }
              
            }
              for (var i = 0; i < 3; i++) { 
                
                outputDbData[i].data.push([dateTime,  parseFloat(item[dataComps[i]])]);
                
              }
            // });
          }); 
          
          
        });
      }
      
     

      for (var i = 0; i < 3; i++) { 
        // alert(outputDbData[i].data);
        outputDbData[i].data.reverse();
        // alert(outputDbData[i].data);
      }
      // alert(new Date("2019-04-02T03:30:00").getTime());
      // alert(outputDbData[0].data[0]);
      output(outputDbData);
    }
    
    
    else if(chartType.substring(0,4) == "area"){

      // var dbDataTemp = dbData;
      // dbData = [];
      // for (var i = 0; i < dbDataTemp.length; i += parseInt(nthTerm)) {
        
      //   dbData.push(dbDataTemp[i]);
      // }

      for (var i = 0; i < dataComps.length; i++) { 
        outputDbData.push({name: dataCompsDisplay[i], data: []});
        
      }

      dbData.forEach(function(item,index,array) {
        var timeStamp = item["entryID"]; //190101203040
        // alert(timeStamp);
        timeStampToNewDateFormat(timeStamp, false, function(dateTime){
          // alert(dateTime.time);
          dateTimeToObj(dateTime.date+"T"+dateTime.time,function(dateTimeObj){
            // alert(dateTimeObj);
            if(dateTimeObj.getTimezoneOffset() == -60){
                
              dateTimeObj = new Date(dateTimeObj.getTime() + 60*60*1000);
            }
            for (var i = 0; i < dataComps.length; i++) { 

              outputDbData[i].data.push([dateTimeObj.getTime(),parseFloat(item[dataComps[i]])]);
              
            }
            
          });
        }); 
        
        
      });
      for (var i = 0; i < dataComps.length; i++) { 
        // alert(outputDbData[i].data);
        outputDbData[i].data.reverse();
        // alert(outputDbData[i].data);
      }
      // alert(new Date("2019-04-02T03:30:00").getTime());
      // alert(outputDbData[0].data[0]);
      output(outputDbData);
    }
  }


  function formatDbDataDonut(dbData, dataComps, dataComp, output){
    // alert(dataComps);
    var dbDateTime = dbData[0]["entryID"];

    if (dataComp == "g"){var donutTitle = "Generation by Fuel Type + Imports"} 
    else if (dataComp == "gCat"){var donutTitle = "Generation by Category"} 
    else if (dataComp == "i"){var donutTitle = "Interconnector Imports"}

    dbDateTime = dbDateTime.substring(6,8).concat(':',dbDateTime.substring(8,10),
                                            ':',dbDateTime.substring(10,12),
                                            ' ',dbDateTime.substring(4,6),
                                            '/',dbDateTime.substring(2,4),
                                            '/',dbDateTime.substring(0,2));

    var dbVals = [];
    
    var dbTotal = 0;

    if (dataComp == "g"){
      var interconnectorTotal = 0;
      dataComps.forEach(function(item,index,array) {
        if (index == 0 || index >= 6){
          formatDataCompDisplay(item, function(dataComp){
            dbVals.push({
              "label":dataComp,
              "value":parseInt(dbData[0][item])
            });
          });
        } else {
          interconnectorTotal += parseInt(dbData[0][item]);
        }
        if (index == 5){
          dbVals.push({
            "label":"Interconnectors",
            "value":interconnectorTotal
          });
        }
      });
    } else if (dataComp == "gCat"){
      var renewableCat = 0;
      var nonRenewableCat = 0;
      dataComps.forEach(function(item,index,array) {
        if (index < 5){
          nonRenewableCat += parseInt(dbData[0][item]);
        } else if (index < 10){
          renewableCat += parseInt(dbData[0][item]);
        }
        if (index == 5){
          dbVals.push({
            "label":"Non-renewables",
            "value":nonRenewableCat
          });
        }
        if (index == 9){
          dbVals.push({
            "label":"Renewables",
            "value":renewableCat
          });
        }
      }); 
    } else if (dataComp == "i"){
      dataComps.forEach(function(item,index,array) {
          dbVals.push({
            "label":item,
            "value":parseInt(dbData[0][item])
          });
        }); 
    }
       


    dataComps.forEach(function(item,index,array) {
      dbTotal += parseInt(dbData[0][item]);
    });
    // dbData = JSON.parse(dbData);
    // alert(JSON.stringify(dbData));
    var dateTimeSample;
    if(new Date(parseInt(dbData[0].entryID.concat("000"))).getTimezoneOffset() == -60){
      if($(window).width() < 860 ){
      
        dbData[0].entryID = (parseInt(dbData[0].entryID) - 60*60).toString();
      } else {
        dbData[0].entryID = (parseInt(dbData[0].entryID) + 60*60).toString();
      }
    
    }
    timeStamptoDateTimeDisplay(dbData[0].entryID, false, function(displayTime){
      dateTimeSample = displayTime;
    });

    

    output([donutTitle, dbDateTime,{ "content":dbVals}, dbTotal, dateTimeSample]);

    // output();
  }

  function formatDbDataGauge(dbData, output){
    var dateTimeSample;
    // alert(JSON.stringify(dbData));
    // alert(dbData.length);
    if(typeof(dbData["entryID"])!="undefined" ){
      if(dbData["entryID"].length == 10){
        if(new Date(parseInt(dbData.entryID.concat("000"))).getTimezoneOffset() == -60){
          if($(window).width() < 860 ){
          
            dbData.entryID = (parseInt(dbData.entryID) - 60*60).toString();
          } else {
            dbData.entryID = (parseInt(dbData.entryID) + 60*60).toString();
          }
        
        } 
      }
        
      timeStamptoDateTimeDisplay(dbData.entryID, true, function(displayTime){
        
        dateTimeSample = displayTime;
      });
      
      

      if(dbData["Freq_Hz"].length > 6){
        output({"data":parseFloat(dbData["Freq_Hz"].substring(0,9)), "timeStamp":dateTimeSample});
      } else{
        output({"data":parseFloat(dbData["Freq_Hz"]), "timeStamp":dateTimeSample});
      }
     
      
    } else if (dbData.length == 79){
      
        // alert(dbData[0]["Freq_Hz"]);
        dbData[78].Freq_Hz = parseFloat(dbData[78]["Freq_Hz"].substring(0,9));
        // alert(dbData[0]["Freq_Hz"]);
        timeStamptoDateTimeDisplay(dbData[78].entryID, true, function(displayTime){
      
          dbData[78]["entryID"] = displayTime + "." + dbData[78].entryID.substring(10,12) ;

        });
      
      // alert();
      // alert(JSON.stringify(dbData));
      output({"data":dbData[78]["Freq_Hz"], "timeStamp":dbData[78]["entryID"]});
    }else if (dbData.length > 1){
      
      dbData.forEach(function(item, index, array){
        dbData[index].Freq_Hz = parseFloat(item["Freq_Hz"].substring(0,9));
        timeStamptoDateTimeDisplay(item.entryID, true, function(displayTime){
      
          dbData[index]["entryID"] = displayTime + "." + item.entryID.substring(10,12) ;

        });
      });
      // alert();
      // alert(JSON.stringify(dbData));
      output(dbData.reverse());
    }
    
  }

  function formatDbDataRegionList(dbData,dataComps,requestParams, output){
    if (dbData.length>1){
      var periodCorrectListBool = new Array(dbData.length-1);
      for(var i = 0; i < periodCorrectListBool.length; i++){
        periodCorrectListBool[i] = false;
      }
      var periodList = [];
      var errorBoundaries = [];
      var entryIDlist = new Array(dbData.length);
      
      var period;
    }
    

    // dbData.reverse();

    // if (requestParams.dataTable == "freqdata"){
    //   period = 15;
    // } else if (requestParams.dataTable == "demgendata"){
    //   period = 300;
    // } else if (requestParams.dataTable == "pmudata"){
    //   period = 20;
    // }
    // dbData.forEach(function(item, index, array){
    // //   print(i)
    //     entryIDlist[index] = parseInt(item.entryID);
    // });
    // // alert(entryIDlist);
    // for (var i = 0; i < periodCorrectListBool.length; i++){
    // //       calculate period between value i and i+1
    //         var tempPeriod = parseInt((entryIDlist[i+1] - entryIDlist[i]))
    // //       if calculated period doesnt match given period
    //         // alert(tempPeriod);
    //         if (period == tempPeriod){
    // //           mark period as incorrect
    //             periodCorrectListBool[i] = true;

    //             if (i > 0 && errorBoundaries.length > 0 && errorBoundaries[errorBoundaries.length].length < 2){
    //                 errorBoundaries[errorBoundaries.length] += [i]
    //             }

    // //           if on the first iteration or if previous period is correct
    //             if (i == 0 || periodCorrectListBool[i-1] == True){
    // //               add initial errorBoundary index 
                    
    //                 errorBoundaries.push([i]) ;
                    
    // //               if on last iteration, add index of final entryID
    //                 if (i == entryIDlist.length-2){
    //                     errorBoundaries[errorBoundaries.length] += [i+1]
    //                   }
    // //               add period to periodList
    //                 periodList += [[tempPeriod]]
    // //           if last period in list is incorrect
    //             } else {

    //                 periodList[periodList.length] += [tempPeriod]
    //             }

    //         } else{
    //             if (periodCorrectListBool[i-1] == False)
    //                 errorBoundaries[errorBoundaries.length] += [i]
    //         }
    // }

    output(dbData);
  }



  function requestData(chartType,requestParams, output){
    // $(document).ready(function() {
      // alert(JSON.stringify(requestParams));
      if (requestParams["dataComp"] == "f"){var dataComps = "Freq_Hz"; }
      else if (requestParams["dataComp"].substring(0,2) == "fa"){var dataComps = ["Freq_Hz", "alertRegion"]; }
      else if (requestParams["dataComp"] == "gCat"){var dataComps = ["CCGT","Oil","Coal","Nucl", "OCGT","Wind","PS","NPSHYD","Other","Bio"];}      
      else if (requestParams["dataComp"] == "g" ){var dataComps = ["CCGT","IntIFA","IntMoyle","IntBritNed","IntEW","IntNemo","Oil","Coal","Nucl","Wind","PS", "NPSHYD", "OCGT","Other","Bio"];}
      else if (requestParams["dataComp"].substring(0,1) == "g" && requestParams["dataComp"].length > 1){var dataComps = requestParams["dataComp"].substring(2); }
      else if (requestParams["dataComp"] == "d"){var dataComps = "SysDem"; }
      else if (requestParams["dataComp"] == "i"){var dataComps = ["IntIFA","IntMoyle","IntBritNed","IntEW","IntNemo"];}
      else if (requestParams["dataComp"] == "vph"){var dataComps = ["V_a", "Ph_a", "V_b", "Ph_b", "V_c", "Ph_c"];}
      else if (requestParams["dataComp"] == "ph"){var dataComps = [ "Ph_a", "Ph_b", "Ph_c"];}
      else if (requestParams["dataComp"] == "roc"){var dataComps = "rocof";}
      $.get("./php/GETdata.php",{dataComp: requestParams["dataComp"],
                                  dataTable: requestParams["dataTable"],
                                  entryID: requestParams["entryID"],
                                  reqType: requestParams["reqType"],
                                  dateTime: requestParams["dateTime"],
                                  nthTerm: requestParams["nthTerm"],
                                  numRec: requestParams["numRec"]},
                                  function(dbData, status) {
                                    // alert(JSON.stringify(dbData));
                                    dbData = JSON.parse(dbData);
                                    // alert(dbData.length);
                                    // alert(JSON.stringify(dbData));
                                    if (chartType == "line" || chartType == "mline" || chartType.substring(0,4) == "area"){
                                      formatDbDataLine(chartType, dbData, dataComps,  requestParams["nthTerm"], function(dbData_form){
                                        dbData_form["dataComp"] = requestParams["dataComp"];
                                        // alert(JSON.stringify(dbData_form));
                                        output(dbData_form);
                                      });
                                    } else if (chartType == "donut"){
                                      formatDbDataDonut(dbData,dataComps, requestParams["dataComp"], function(dbData_form){
                                        output(dbData_form);
                                      });
                                    } else if (chartType == "gauge"){
                                      formatDbDataGauge(dbData ,function(dbData_form){
                                        output(dbData_form);
                                      });
                                    } else if (chartType == "regionList"){
                                      formatDbDataRegionList(dbData,dataComps,requestParams, function(dbData_form){
                                        output(dbData_form);
                                      });
                                      
                                    } else if (chartType == "3phase"){
                                      output(dbData);
                                      
                                    }
                                  });
    // }); 
  }




  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };
  
  function resGet(numRec, output){
    
      if(numRec > 2000 && numRec <= 4000){
        output("2");
      } else if(numRec > 4000 && numRec <= 8000){
        output("3");
      } else if(numRec > 8000 && numRec <= 16000){
        output("4");
      } else if(numRec > 16000 && numRec <= 32000){
        output("5");
      }

  }