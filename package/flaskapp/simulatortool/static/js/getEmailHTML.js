function getEmailHTML(output){
    var emailHeader = "";
    emailHeader += '<table  id="PCeventList"><thead><tr><th scope="col" width="33%" align="center" style="border-style:none;">Date/time</th><th scope="col" width="33%" align="center" style=" border-style:none;">Frequency/RoCoF Range</th><th scope="col" width="33%" align="center" style=" border-style:none;">Event length</th></tr></thead><tbody id="PCeventListBod">';

    var endDateTime = new Date();
    var startDateTime = new Date(endDateTime.getTime() - 1000*60*60*24*7);
    var chartType = "regionList";
    inputParams = {attr:"rocof", period:2, viewMargin: 200, minDur: 4, dangerDur: 6};
    requestParams = {"dataComp":"roca4","dataTable":"pmudata","entryID":"1","reqType":"b","dateTime":"","numRec":"90","nthTerm":"1"};

    dateTimeToTimeStamp(startDateTime, function(timeStamp1){
        // alert(timeStamp);
        // alert(timeStamp1);
        if($(window).width() < 860 ){
        
            timeStamp1 = (timeStamp1 - 60*60*1000).toString();
        } else {
            timeStamp1 = (timeStamp1 - 2*60*60*1000).toString();
            
        }

        requestParams.dateTime = requestParams.dateTime.concat(timeStamp1.toString().substring(0,12));
        dateTimeToTimeStamp(endDateTime, function(timeStamp2){
            // alert(timeStamp);
            // alert(timeStamp1);
            if($(window).width() < 860 ){
            
            timeStamp2 = (timeStamp2 - 60*60*1000).toString();
            } else {
            timeStamp2 = (timeStamp2 - 2*60*60*1000).toString();
    
            }
            
            requestParams.dateTime = requestParams.dateTime.concat(timeStamp2.toString().substring(0,12));
            printEvents(chartType, "", "", 0, requestParams,inputParams, function(outputRoc){
                alert(outputRoc.recordHTML);
                emailHeader = emailHeader + outputRoc.recordHTML;
        
                inputParams = {attr:"Freq_Hz", period:15, viewMargin: 800, minDur: 45, dangerDur: 120};
                requestParams = {"dataComp":"fa1","dataTable":"freqdata","entryID":"1","reqType":"b","dateTime":requestParams.dateTime,"numRec":"400","nthTerm":"1"};
        
        
                printEvents(chartType, "", "", 0, requestParams,inputParams, function(outputF){
                
                    emailHeader = emailHeader + outputF.recordHTML;
                    emailHeader = emailHeader + '</tbody></table>';
                    var blob = new Blob([emailHeader],{ type: "text/plain;charset=utf-8" });
                    saveAs(blob, "emailHTML.txt");
                    output(emailHeader);
                });
                
            });
        });
    });
    

    
}
