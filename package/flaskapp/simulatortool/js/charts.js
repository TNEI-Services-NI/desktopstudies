function initDrawChart(chartObj, element, requestParams, output) {
    requestData(chartObj.chartType, requestParams, function(dbData) {
        if (chartObj.chartType == "donut") {

            createDonut(element, dbData, function(myDonut) {
                output(myDonut, chartObj.chartType, element, requestParams);
            });
            document.getElementById(element.concat("_footer")).innerHTML = "Updated at THE HOURR: ".concat(moment().format('HH:mm:'), " - ", "Data as of: ", dbData[4]);

        } else if (chartObj.chartType == "gauge") {

            createGauge(element, dbData.data, function(myGauge) {
                output(myGauge, chartObj.chartType, element, requestParams);
            });
            //   alert(dbData.timeStamp);
            document.getElementById(element.concat("_footer")).innerHTML = "Updated at: ".concat(moment().format('HH:mm:ss'), " - ", "Data as of: ", dbData.timeStamp);
            //   $(element.concat("_footer")).html("Updated at: ".concat(moment().format('HH:mm:ss'), " - ", "Data as of: ", dbData.timeStamp.toString()))
        } else if (chartObj.chartType == "line" || chartObj.chartType == "mline" || chartObj.chartType == "area_s") {
            chartObj['dataTable'] = requestParams.dataTable;
            createLineChart(element, chartObj, dbData, function(myChart) {
                output(myChart, chartObj.chartType, element, requestParams);
            });

            document.getElementById(element.concat("_footer")).innerHTML = "Updated at: ".concat(moment().format('HH:mm:ss'));
        }


    });
}

//  LINE FUNCTIONS

function createLineChart(element, chartObj, dbData, output) {
    var ctx = document.getElementById(element);


    if (window.innerWidth > 1440) {
        var offsetX = -20;
        var offsetY = 15;
        var chartWidth = "102%";
        var toolBool = true;
        var legendFontSize = '14px';
        var markerSize = 12;
        var majorAxesFontSize = '12pt';
        var minorAxesFontSize = '9pt';
        var tooltipFontsize = '10pt';
        var lineWidth = 4;
        if (chartObj.chartType == "line") {
            var length = dbData.data.length
        } else {
            var length = dbData[0].data.length;
        }
        if (length < 720) {
            lineWidth = lineWidth;
        } else if (length < 1600) {
            lineWidth = lineWidth * 0.8;
        } else if (length < 3000) {
            lineWidth = lineWidth * 0.6575;
        } else {
            lineWidth = lineWidth * 0.6;
        }
        if (dbData.dataComp == "roc") {
            lineWidth = 1.75
        }

        var chartHeight = "98%";
    } else if (window.innerWidth > 812) {
        var offsetX = -30;
        if (chartObj.chartType == "area_s") {
            var offsetY = 0;
        } else {
            var offsetY = 10;
        }

        // var chartWidth = ctx.offsetWidth;
        var chartWidth = "103%"; //TEST1
        var toolBool = true;
        var legendFontSize = '14px';
        var markerSize = 12;
        var majorAxesFontSize = '11pt';
        var minorAxesFontSize = '9pt';
        var tooltipFontsize = '10pt';
        var lineWidth = 4;
        if (chartObj.chartType == "line") {
            var length = dbData.data.length
        } else {
            var length = dbData[0].data.length;
        }
        if (length < 720) {
            lineWidth = lineWidth;
        } else if (length < 1600) {
            lineWidth = lineWidth * 0.8;
        } else if (length < 3000) {
            lineWidth = lineWidth * 0.6575;
        } else {
            lineWidth = lineWidth * 0.6;
        }
        if (dbData.dataComp == "roc") {
            lineWidth = 1.75
        }

        var chartHeight = "98%";
        // alert(window.innerWidth);
    } else {
        if(chartObj.offsetX){
            var offsetX = chartObj.offsetX;
        } else {
            var offsetX = -70;
        }
        var offsetY = 80;
        if(chartObj.width){
            var chartWidth = window.innerWidth * chartObj.width;
        } else {
            var chartWidth = window.innerWidth * 0.95;
        }
        
        var toolBool = false;
        var legendFontSize = '10px';
        var markerSize = 10;
        var majorAxesFontSize = '10pt';
        var minorAxesFontSize = '8pt';
        var tooltipFontsize = '6pt';
        var lineWidth = 2;
        var chartHeight = window.innerHeight * 0.65;
    }

    var colorsObj = {
        "CCGT": "#a00",
        "Oil": "#7c7c7c",
        "Coal": "#1a1921",
        "Nucl": "#10d10b",
        "OCGT": "#ff7801",
        "Wind": "#19e5dc",
        "PS": "#5850b2",
        "NPSHYD": "#0b18b2",
        "Other": "#a59fd1",
        "Bio": "#6f3400"
    };
    var colorsList = [colorsObj.CCGT, colorsObj.Oil, colorsObj.Coal, colorsObj.Nucl, colorsObj.OCGT,
        colorsObj.Wind, colorsObj.PS, colorsObj.NPSHYD, colorsObj.Other, colorsObj.Bio
    ];



    var chart = {
        id: element,
        height: chartHeight,
        width: chartWidth,
        offsetX: offsetX,
        offsetY: offsetY,
        type: chartObj.chartType.substring(0, 4),
        animations: {
            enabled: true,
            easing: 'easeinout',
            animateGradually: {
                enabled: true,
                speed: 10000
            },
        },

        toolbar: {
            show: toolBool,
            tools: {
                download: true,
                selection: true,
                zoom: true,
                zoomin: true,
                zoomout: true,
                pan: true,
                reset: true | '<img src="/static/icons/reset.png" width="20">',
                customIcons: []
            },
            autoSelected: 'zoom'
        },
        zoom: {
            enabled: true,
            type: 'x',
            zoomedArea: {
                fill: {
                    color: '#90CAF9',
                    opacity: 0.4
                },
                stroke: {
                    color: '#0D47A1',
                    opacity: 0.4,
                    width: 1
                }
            }
        }
    }

    if (chartObj.chartType == "area_s") {
        chart.stacked = "true";
        // alert(dbData.dataComp);
    }

    switch (dbData.dataComp) {
        case "gCat":
            dbData.name = "Total Generation"
    }

    if (chartObj.dataTable == "pmudata") {

        var numDecPoints = 14;
        if (dbData.dataComp == "vph") {
            var yaxisLabel = " [V]";
        } else if (dbData.dataComp == "ph") {
            var yaxisLabel = " [°]";
        } else if (dbData.dataComp == "f") {
            var yaxisLabel = " [Hz]";
        } else if (dbData.dataComp == "roc") {
            var yaxisLabel = " [Hz/s]";
        }

    } else if (dbData.dataComp.substring(0, 1) == "f") {
        var yaxisLabel = " [Hz]";
        var numDecPoints = 3;
    } else {
        var yaxisLabel = " [MW]";
        var numDecPoints = 0;
    }
    var color;
    getColor(dbData.name, function(colorOut) {
        color = colorOut;
    });
    var options = {
        colors: [
            color
        ],
        chart: chart,
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: lineWidth
        },
        markers: {
            size: 0,
        },

        yaxis: {
            tickAmount: 4,
            labels: {
                formatter: function(val) {
                    if (chartObj.chartType == "line" || chartObj.chartType == "mline") {
                        if (chartObj.dataTable == "pmudata") {
                            if (dbData.dataComp == "roc") {
                                return (val).toFixed(2);
                            } else {
                                return (val / (Math.pow(10, numDecPoints))).toFixed(2);
                            }

                        } else if (dbData.dataComp.substring(0, 1) == "f") {
                            return (val / (Math.pow(10, numDecPoints))).toFixed(numDecPoints);

                        } else {
                            return val.toFixed(numDecPoints);
                        }

                    } else if (chartObj.chartType.substring(0, 4) == "area") {
                        return val;
                    }
                },
                style: {
                    color: undefined,
                    fontSize: minorAxesFontSize,
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    cssClass: 'apexcharts-yaxis-title',
                },
            },
            title: {
                text: dbData.name + yaxisLabel,
                offsetX: 0,
                offsetY: 0,
                style: {
                    color: undefined,
                    fontSize: majorAxesFontSize,
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    cssClass: 'apexcharts-yaxis-title',
                },
            }
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.8
            },
        },
        xaxis: {
            type: 'datetime',
            labels: {
                formatter: function(val, timestamp) {
                    return moment(new Date(timestamp)).format("DD/MM HH:mm:ss")
                },
                style: {
                    color: undefined,
                    fontSize: minorAxesFontSize,
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    cssClass: 'apexcharts-yaxis-title',
                },
            },
            title: {
                text: "Date/Time",
                offsetX: 0,
                offsetY: 0,
                style: {
                    color: undefined,
                    fontSize: majorAxesFontSize,
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    cssClass: 'apexcharts-yaxis-title',
                },
            }
        },

        tooltip: {
            enabled: true,
            shared: true,
            followCursor: true,
            intersect: false,
            inverseOrder: false,
            fillSeriesColor: false,
            theme: "light",
            style: {
                fontSize: tooltipFontsize
            },
            onDatasetHover: {
                highlightDataSeries: true
            },
            x: {
                show: true,
                format: "dd MMM HH:mm:ss"
            },
            y: {
                formatter: function(val) {

                    if (chartObj.chartType == "line" || chartObj.chartType == "mline") {
                        if (chartObj.dataTable == "pmudata") {
                            if (dbData.dataComp == "roc") {
                                return (val).toFixed(8) + yaxisLabel;
                            } else {
                                return (val / (Math.pow(10, numDecPoints))).toFixed(6) + yaxisLabel;
                            }
                        } else if (dbData.dataComp.substring(0, 1) == "f") {
                            return (val / (Math.pow(10, numDecPoints))).toFixed(numDecPoints) + yaxisLabel;

                        } else {
                            return val.toFixed(numDecPoints) + yaxisLabel;
                        }

                    } else if (chartObj.chartType.substring(0, 4) == "area") {
                        return val + yaxisLabel;
                    }

                }
            },
            marker: {
                show: false
            },
            items: {
                display: "flex"
            },
            fixed: {
                enabled: false,
                offsetX: 0,
                offsetY: 0
            }
        },
        //   toolbar: {
        //     style: {

        //     }
        //   },
        legend: {
            show: true,
            showForSingleSeries: false,
            showForNullSeries: true,
            showForZeroSeries: true,
            position: 'top',
            horizontalAlign: 'center',
            floating: false,
            fontSize: legendFontSize,
            fontFamily: 'Helvetica, Arial',
            width: undefined,
            height: undefined,
            formatter: undefined,
            offsetX: 100,
            offsetY: 15,
            labels: {
                colors: undefined,
                useSeriesColors: false
            },
            markers: {
                width: markerSize,
                height: markerSize,
                strokeWidth: 0,
                strokeColor: '#fff',
                radius: 12,
                customHTML: undefined,
                onClick: function(chart, seriesIndex, opts) {

                },
                offsetX: 0,
                offsetY: 0
            },
            itemMargin: {
                horizontal: 0,
                // vertical: 7
            },
            onItemClick: {
                toggleDataSeries: true
            },
            onItemHover: {
                highlightDataSeries: true
            },
        }
    }

    if (chartObj.chartType.substring(0, 4) == "line") {

        if (dbData.dataComp.substring(0, 1) == "f") {
            dbData.data.forEach(function(item, index, array) {
                dbData.data[index][1] = item[1] * (Math.pow(10, numDecPoints));
            });
            // alert(JSON.stringify(dbData.data));
            options.series = [{
                name: dbData.name,
                data: dbData.data,
            }]
            if (dbData.max - 50 > 50 - dbData.min) {
                options.yaxis.max = dbData.max * (Math.pow(10, numDecPoints));
                options.yaxis.min = (100 - dbData.max) * (Math.pow(10, numDecPoints));
            } else {
                options.yaxis.min = dbData.min * (Math.pow(10, numDecPoints));
                options.yaxis.max = (100 - dbData.min) * (Math.pow(10, numDecPoints));
            }

        } else if (dbData.dataComp == "roc") {

            options.series = [{
                name: dbData.name,
                data: dbData.data,
            }]
            if (dbData.max > Math.abs(dbData.min)) {
                options.yaxis.max = Math.abs(dbData.max);
                options.yaxis.min = -Math.abs(dbData.max);
            } else {
                options.yaxis.min = -Math.abs(dbData.min);
                options.yaxis.max = Math.abs(dbData.min);
            }
            // options.yaxis.max = dbData.max;
            // options.yaxis.min = dbData.min;
        } else {
            options.series = [{
                name: dbData.name,
                data: dbData.data,
            }]
        }

        // if freq color = blue else if demand color = red else if generation color = green

    } else if (chartObj.chartType == "mline") {
        mlineData = [];
        labels = [];

        // console.log(JSON.stringify(dbData[0].data));
        dbData.forEach(function(item1, index1, array) {
            var ts1 = 1554725706240;
            // mlineData.push({"name": item1.name, "type": "line", "data":[]});
            mlineData.push({
                "name": item1.name,
                "data": []
            });
            // alert(JSON.stringify(dbData[index1]));
            dbData[index1].data.forEach(function(item2, index2, array) {


                if (index1 == 0) {

                    labels.push(new Date(item2[0]));

                }

                var innerarr = [item2[0], item2[1]];
                // var innerarr = [ts1, item2[1]];
                mlineData[index1].data.push(innerarr);
            });
        });

        var options = {
            chart: {
                height: chartHeight,
                type: 'line',
                width: chartWidth,
                offsetX: offsetX,
                offsetY: offsetY,
                toolbar: {
                    show: toolBool,
                    tools: {
                        download: true,
                        selection: true,
                        zoom: true,
                        zoomin: true,
                        zoomout: true,
                        pan: true,
                        reset: true | '<img src="/static/icons/reset.png" width="20">',
                        customIcons: []
                    },
                    autoSelected: 'zoom'
                },
            },
            
            annotations: {
                yaxis: [{
                    // y: 30,
                    borderColor: '#999',
                    label: {
                        show: true,
                        // text: 'Support',
                        style: {
                            color: "#fff",
                            background: '#00E396'
                        }
                    }
                }],
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.8
                    },
                },

                xaxis: [{
                    // x: new Date('14 Nov 2012').getTime(),
                    borderColor: '#999',
                    // yAxisIndex: 0,
                    label: {
                        show: true,
                        // text: 'Rally',
                        style: {
                            color: "#fff",
                            background: '#775DD0'
                        }
                    }
                }]
            },
            stroke: {
                curve: 'smooth',
                width: lineWidth
            },
            dataLabels: {
                enabled: false
            },
            yaxis: {
                labels: {
                    style: {
                        color: undefined,
                        fontSize: minorAxesFontSize,
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        cssClass: 'apexcharts-yaxis-title',
                    },
                },
                title: {
                    text: "Instantaneous Voltage " + yaxisLabel,
                    offsetX: 0,
                    offsetY: 0,
                    style: {
                        color: undefined,
                        fontSize: majorAxesFontSize,
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        cssClass: 'apexcharts-yaxis-title',
                    },
                }
            },
            series: mlineData,
            xaxis: {
                type: 'datetime',
                tickAmount: 2,
                // min: new Date("01/01/2014").getTime(),
                // max: new Date("01/20/2014").getTime(),
                labels: {
                    formatter: function(val, timestamp) {
                        return moment(new Date(timestamp)).format("DD/MM HH:mm:ss.SS")
                    },
                    style: {
                        color: undefined,
                        fontSize: minorAxesFontSize,
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        cssClass: 'apexcharts-yaxis-title',

                    },
                },
                title: {
                    text: "Date/Time",
                    offsetX: 0,
                    offsetY: 0,
                    style: {
                        color: undefined,
                        fontSize: majorAxesFontSize,
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        cssClass: 'apexcharts-yaxis-title',
                    },
                }


            },
            tooltip: {
                enabled: true,
                shared: true,
                followCursor: true,
                intersect: false,
                inverseOrder: false,
                fillSeriesColor: false,
                theme: "light",
                style: {
                    fontSize: tooltipFontsize
                },
                onDatasetHover: {
                    highlightDataSeries: false
                },
                x: {
                    show: true,
                    format: "dd MMM HH:mm:ss"
                },
                y: {
                    formatter: function(y) {

                        return y.toFixed(4) + " " + yaxisLabel;

                    }
                },
                marker: {
                    show: true
                },
                items: {
                    display: "flex"
                },
                fixed: {
                    enabled: false,
                    offsetX: 0,
                    offsetY: 110
                }
            },
            // fill: {
            //   type:'solid',
            //   opacity: [0.35, 1],
            // },
            // xaxis: {
            //     type: 'datetime',
            //     categories: labels,
            // },
            // xaxis: {
            //   type: 'datetime',
            // },
            // labels: labels,
            // xaxis: {
            //   type: 'datetime',
            //   // labels: {
            //   //   style: {
            //   //     color: undefined,
            //   //     fontSize: minorAxesFontSize,
            //   //     fontFamily: 'Helvetica, Arial, sans-serif',
            //   //     cssClass: 'apexcharts-yaxis-title',
            //   // },
            //   // },

            //   title: {
            //     text: "Date/Time",
            //     offsetX: 0,
            //     offsetY: 0,
            //     style: {
            //         color: undefined,
            //         fontSize: majorAxesFontSize,
            //         fontFamily: 'Helvetica, Arial, sans-serif',
            //         cssClass: 'apexcharts-yaxis-title',
            //     },
            //   }
            // },


            legend: {
                show: true,
                showForSingleSeries: false,
                showForNullSeries: true,
                showForZeroSeries: true,
                position: 'top',
                horizontalAlign: 'center',
                floating: false,
                fontSize: legendFontSize,
                fontFamily: 'Helvetica, Arial',
                width: undefined,
                height: undefined,
                formatter: undefined,
                offsetX: 35,
                offsetY: 15,
                labels: {
                    colors: undefined,
                    useSeriesColors: false
                },
                markers: {
                    width: markerSize,
                    height: markerSize,
                    strokeWidth: 0,
                    strokeColor: '#fff',
                    radius: 12,
                    customHTML: undefined,
                    onClick: function(chart, seriesIndex, opts) {

                    },
                    offsetX: 0,
                    offsetY: 0
                },
                itemMargin: {
                    horizontal: 9,
                    // vertical: 7
                },
                onItemClick: {
                    toggleDataSeries: true
                },
                onItemHover: {
                    highlightDataSeries: true
                },
            }
        }
        // options.xaxis.labels.style.fontSize = minorAxesFontSize;

    } else if (chartObj.chartType.substring(0, 4) == "area") {
        options.colors = colorsList;
        options.series = dbData;
    }

    var myLineChart = new ApexCharts(
        ctx,
        options
    );


    myLineChart.render();
    // alert(JSON.stringify(myLineChart.opts.series[0].data))
    // alert(JSON.stringify(myLineChart.opts.xaxis.labels.style));
    output(myLineChart);
}

function blockUpdateLineChart(myLineChart, chartType, element, requestParams) {
    requestData(chartType, requestParams, function(dbData) {
        if (dbData.dataComp.substring(0, 1) == "f") {
            var yaxisLabel = " [Hz]";
            var numDecPoints = 3;
            var rangeFactor = [1001, 999];
            var scaleFactor = 1000;
        } else {
            var yaxisLabel = " [MW]";
            var numDecPoints = 0;
            var rangeFactor = [1.001, 0.999];
            var scaleFactor = 1;
        }
        if (chartType.substring(0, 4) == "line") {
            if (dbData.dataComp.substring(0, 1) == "f") {
                dbData.data.forEach(function(item, index, array) {
                    dbData.data[index][1] = item[1] * 1000;
                });
            }
            if (window.innerWidth > 812) {
                var lineWidth = 4;
                if (dbData.data.length < 720) {
                    lineWidth = lineWidth;
                } else if (dbData.data.length < 1600) {
                    lineWidth = lineWidth * 0.8;
                } else if (dbData.data.length < 3000) {
                    lineWidth = lineWidth * 0.6575;
                } else {
                    lineWidth = lineWidth * 0.6;
                }

            } else {
                var lineWidth = 2;
            }

            var color;
            getColor(dbData.name, function(colorOut) {
                color = colorOut;
            });


            ApexCharts.exec(element, "updateSeries", [{
                name: dbData.name,
                data: dbData.data
            }]);
            ApexCharts.exec(element, "updateOptions", {
                tooltip: {

                    y: {
                        formatter: function(y) {

                            return y.toFixed(numDecPoints) + " " + yaxisLabel;

                        }
                    }
                },
                colors: [
                    color
                ],
                yaxis: {
                    forceNiceScale: false,
                    max: dbData.max * rangeFactor[0],
                    min: dbData.min * rangeFactor[1],
                    labels: {
                        formatter: function(val) {

                            return (val / scaleFactor).toFixed(numDecPoints);

                        },
                        style: {
                            color: undefined,
                            fontSize: '14px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            cssClass: 'apexcharts-yaxis-title',
                        },
                    },
                    title: {
                        text: dbData.name + yaxisLabel,
                        offsetX: 0,
                        offsetY: 0,
                        style: {
                            color: undefined,
                            fontSize: '18px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            cssClass: 'apexcharts-yaxis-title',
                        },
                    }
                },
                stroke: {
                    width: 4
                }
            });

            myLineChart.opts.series[0].name = dbData.dataComp + yaxisLabel;
            myLineChart.opts.series[0].data = dbData.data;

        } else if (chartType.substring(0, 4) == "mline") {
            
            if (window.innerWidth > 812) {
                var lineWidth = 4;
                if (dbData.data.length < 720) {
                    lineWidth = lineWidth;
                } else if (dbData.data.length < 1600) {
                    lineWidth = lineWidth * 0.8;
                } else if (dbData.data.length < 3000) {
                    lineWidth = lineWidth * 0.6575;
                } else {
                    lineWidth = lineWidth * 0.6;
                }

            } else {
                var lineWidth = 2;
            }

            // var color;
            // getColor(dbData.name, function(colorOut) {
            //     color = colorOut;
            // });
            mlineData = [];
            labels = [];

            // console.log(JSON.stringify(dbData[0].data));
            dbData.forEach(function(item1, index1, array) {
                var ts1 = 1554725706240;
                // mlineData.push({"name": item1.name, "type": "line", "data":[]});
                mlineData.push({
                    "name": item1.name,
                    "data": []
                });
                // alert(JSON.stringify(dbData[index1]));
                dbData[index1].data.forEach(function(item2, index2, array) {


                    if (index1 == 0) {

                        labels.push(new Date(item2[0]));

                    }

                    var innerarr = [item2[0], item2[1]];
                    // var innerarr = [ts1, item2[1]];
                    mlineData[index1].data.push(innerarr);
                });
            });

            ApexCharts.exec(element, "updateSeries", mlineData);
            ApexCharts.exec(element, "updateOptions", {
                tooltip: {

                    y: {
                        formatter: function(y) {

                            return y.toFixed(numDecPoints) + " " + yaxisLabel;

                        }
                    }
                },
                colors: [
                    color
                ],
                yaxis: {
                    forceNiceScale: false,
                    max: dbData.max * rangeFactor[0],
                    min: dbData.min * rangeFactor[1],
                    labels: {
                        formatter: function(val) {

                            return (val / scaleFactor).toFixed(numDecPoints);

                        },
                        style: {
                            color: undefined,
                            fontSize: '14px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            cssClass: 'apexcharts-yaxis-title',
                        },
                    },
                    title: {
                        text: dbData.name + yaxisLabel,
                        offsetX: 0,
                        offsetY: 0,
                        style: {
                            color: undefined,
                            fontSize: '18px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            cssClass: 'apexcharts-yaxis-title',
                        },
                    }
                },
                stroke: {
                    width: 4
                }
            });

            myLineChart.opts.series[0].name = dbData.dataComp + yaxisLabel;
            myLineChart.opts.series[0].data = dbData.data;

        } else if (chartType.substring(0, 4) == "area") {

            ApexCharts.exec(element, "updateSeries", dbData);
            ApexCharts.exec(element, "updateOptions", {
                yaxis: {
                    max: 40000,
                    min: 0,
                    labels: {
                        formatter: function(val) {

                            return (val).toFixed(numDecPoints);

                        },
                        style: {
                            color: undefined,
                            fontSize: '14px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            cssClass: 'apexcharts-yaxis-title',
                        },
                    },
                    title: {
                        text: "Total Generation [MW]",
                        offsetX: 0,
                        offsetY: 0,
                        style: {
                            color: undefined,
                            fontSize: '18px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            cssClass: 'apexcharts-yaxis-title',
                        },
                    }
                }
            });
            myLineChart.opts.series.forEach(function(item, index, array) {
                // myLineChart.opts.series[index].name = dbData[index];
                myLineChart.opts.series[index] = dbData[index];
            });

        }

    });
}

function pointUpdateLineChart(myLineChart, dataComp, inputData) {
    var data = myLineChart.opts.series[0].data;

    data.shift();
    if (dataComp.substring(0, 1) == "f") {
        data.push([inputData[0], inputData[1] * 1000]);
    } else {
        data.push([inputData[0], inputData[1]]);
    }


    myLineChart.updateSeries([{
        data: data
    }])

}

function updateLineChart(myLineChart, chartType, element, requestParams, intervalID, timeRangeSelectVal, output) {
    clearInterval(intervalID);

    if (requestParams.dataComp == "gCat") {
        hoursToNumRec(timeRangeSelectVal, requestParams.dataComp, function(numRec) {
            requestParams.numRec = numRec;
            // resGet(numRec, function(res){
            //   requestParams.nthTerm = res;
            // });

            blockUpdateLineChart(myLineChart, chartType, element, requestParams);

            startChartUpdateInterval(myLineChart, chartType, element, requestParams, function(intervalID_new) {
                output(intervalID_new);
            });
        });

    } else {

        hoursToNumRec(timeRangeSelectVal, requestParams.dataComp, function(numRec) {
            requestParams.numRec = numRec;
            // resGet(numRec, function(res){
            //   requestParams.nthTerm = res;
            // });

            blockUpdateLineChart(myLineChart, chartType, element, requestParams);

            startChartUpdateInterval(myLineChart, chartType, element, requestParams, function(intervalID_new) {
                output(intervalID_new);
            });
        });
    }

}

// DONUT FUNCTIONS

function createDonut(element, data) {

    var titleFontSize, pieDistance, mainLabelFontSize, percentageFontSize, valueFontSize, scaleFactor, innerRad, outerRad;


    if (window.innerWidth > 1440) {
        titleFontSize = 16;
        pieDistance = 20;
        mainLabelFontSize = 12;
        percentageFontSize = mainLabelFontSize;
        valueFontSize = mainLabelFontSize;
        scaleFactor = 0.7;
        innerRad = "55%";
        outerRad = "85%";
    } else if (window.innerWidth > 414) {
        titleFontSize = 13;
        pieDistance = 20;
        mainLabelFontSize = 12;
        percentageFontSize = mainLabelFontSize;
        valueFontSize = mainLabelFontSize;
        scaleFactor = 0.7;
        innerRad = "60%";
        outerRad = "70%";
    } else if (window.innerWidth > 320) {
        titleFontSize = 13;
        pieDistance = 8;
        mainLabelFontSize = 10;
        percentageFontSize = mainLabelFontSize;
        valueFontSize = mainLabelFontSize;
        scaleFactor = 0.65;
        innerRad = "68%";
        outerRad = "80%";
    } else {
        titleFontSize = 9;
        pieDistance = 8;
        mainLabelFontSize = 9;
        percentageFontSize = mainLabelFontSize;
        valueFontSize = mainLabelFontSize;
        scaleFactor = 0.58;
        innerRad = "68%";
        outerRad = "75%";
    }

    var ctx = document.getElementById(element);

    var myDonut = new d3pie(element, {
        header: {
            title: {
                text: data[3].toString().concat(" MW"),
                fontSize: titleFontSize,
                font: "sans-serif",
            },
            location: "pie-center",
        },

        size: {
            canvasWidth: ctx.offsetWidth,
            canvasHeight: ctx.offsetWidth * scaleFactor,
            pieInnerRadius: innerRad,
            pieOuterRadius: outerRad
        },
        data: data[2],
        labels: {
            outer: {
                format: "label-percentage1",
                pieDistance: pieDistance
            },
            inner: {
                format: "none"
            },
            mainLabel: {
                fontSize: mainLabelFontSize,
                font: "sans-serif",
            },
            percentage: {
                color: "#999999",
                fontSize: percentageFontSize,
                decimalPlaces: 0
            },
            value: {
                color: "#cccc43",
                fontSize: valueFontSize
            },
            lines: {
                enabled: true,
                color: "#777777"
            },
            truncation: {
                enabled: true
            }
        },
        // effects: {
        //   pullOutSegmentOnClick: {
        //     effect: "linear",
        //     speed: 400,
        //     size: 8
        //   }
        // },
        misc: {
            colors: {
                segmentStroke: "#000000"
            }
        }
    });

    // output(myDonut);
    return myDonut;
}

function updateDonut(myDonut, data) {
    myDonut.data.update(data[2]);
}

// GAUGE FUNCTIONS

function createGauge(element, dbData, output) {
    var ctx = $("#" + element.substring(0, element.length - 4) + "_parent");

    if (window.innerWidth > 1440) {

        var chartWidth = ctx.width();

        var chartHeight = ctx.height();

    } else if (window.innerWidth > 812) {

        // var chartWidth = ctx.offsetWidth;
        var chartWidth = ctx.width();
        var chartHeight = ctx.height();

    } else {

        // var chartWidth = ctx.offsetWidth;
        var chartWidth = ctx.width();
        var chartHeight = ctx.height();
    }
    if (window.innerWidth > 812) {
        var scaleFactor = 0.278;
        var fontSize = 20;
    } else {
        var scaleFactor = 0.22;
        var fontSize = 16;
    }
    var gaugeOptions = {

        chart: {
            type: 'solidgauge',
            height: chartHeight,
            width: chartWidth,
            alignTicks: true,
            backgroundColor: "rgba(0,0,0,0)",
        },

        title: "System Frequency Gauge",

        pane: {
            center: ['50%', '75%'],
            size: '140%',
            startAngle: -100,
            endAngle: 100,
            background: {
                backgroundColor: "#f3f3f3",
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        tooltip: {
            enabled: false
        },

        // the value axis
        yAxis: {
            stops: [
                [0, '#DF5353'], // red
                [0.25, '#DDDF0D'], // yellow
                [0.5, '#55BF3B'], // green 
                [0.75, '#DDDF0D'], // yellow
                [1, '#DF5353'] // red
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickAmount: 2,
            title: {
                y: -120,
                style: {
                    fontSize: "20px",
                    fontFamily: 'Helvetica, Arial, sans-serif'
                }
            },
            labels: {
                y: 18,
                style: {
                    fontSize: "13px"
                }
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 30,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };

    // The speed gauge
    var freqGauge = Highcharts.chart(element, Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 49.82,
            max: 50.18,
        },

        credits: {
            enabled: false
        },

        series: [{
            name: 'Frequency',
            data: [parseFloat(dbData)],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:' + fontSize + 'px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                    '<span style="font-size:12px;color:silver">[Hz]</span></div>'
            },
            tooltip: {
                valueSuffix: ' [Hz]'
            }
        }]

    }));
    output(freqGauge);

}

function updateGauge(myGauge, data) {
    point = myGauge.series[0].points[0];
    point.update(data);
}

// Misc. functions

function startChartUpdateInterval(myChart, chartType, element, requestParams, output) {
    if (requestParams.dataTable == "pmudata") {
        var intervalPeriod = 4000;

        var nthTerm = "16";
        var drawFreq = 50 / parseInt(nthTerm);
        var buff = "10200" //number of samples for one full cycle of phase angle (3mins 46 second delay)
        var reqFreq = 50 / parseInt(buff);
        var dbData;

        if (chartType == "gauge") {
            requestData(chartType, {
                "dataComp": "f",
                "dataTable": "pmudata",
                "entryID": "1",
                "reqType": "b",
                "dateTime": "a",
                "numRec": buff,
                "nthTerm": nthTerm
            }, function(dbData_in) {
                var i = 0;
                dbData = dbData_in;
                var intervalIDdraw = setInterval(function() {
                    // alert(JSON.stringify(dbData[i]));
                    updateGauge(myChart, dbData[i]["Freq_Hz"]);
                    document.getElementById(element.concat("_footer")).innerHTML = "Updated at: ".concat(moment().format('HH:mm:ss'), " - ", "Data as of: ", dbData[i].entryID);

                    if (i < dbData.length - 1) {
                        i += 1;
                    } else {
                        clearInterval(intervalIDdraw);
                    }

                }, ((1 / drawFreq) * 1000));

            });
            var intervalIDreq = setInterval(function() {
                requestData(chartType, {
                    "dataComp": "f",
                    "dataTable": "pmudata",
                    "entryID": "1",
                    "reqType": "b",
                    "dateTime": "a",
                    "numRec": buff,
                    "nthTerm": nthTerm
                }, function(dbData_in) {
                    var i = 0;
                    dbData = dbData_in;
                    var intervalIDdraw = setInterval(function() {
                        // alert(JSON.stringify(dbData[i]));
                        updateGauge(myChart, dbData[i]["Freq_Hz"]);
                        document.getElementById(element.concat("_footer")).innerHTML = "Updated at: ".concat(moment().format('HH:mm:ss'), " - ", "Data as of: ", dbData[i].entryID);

                        if (i < dbData.length - 1) {
                            i += 1;
                        } else {
                            clearInterval(intervalIDdraw);
                        }

                    }, ((1 / drawFreq) * 1000));

                });

            }, ((1 / reqFreq) * 1000));
            output(intervalIDreq);
        }

    } else {
        if (requestParams.dataComp == "f") {
            var intervalPeriod = 15 * 1000;
        } else if (requestParams.dataComp == "d" || requestParams.dataComp.substring(0, 1) == "g") {
            var intervalPeriod = 5 * 60 * 1000;
        }
        requestParams.numRec = "1";
        var intervalID = setInterval(function() {
            requestData(chartType, requestParams, function(dbData) {

                if (chartType == "line") {
                    data = [dbData.data[0][0], dbData.data[0][1]];

                    pointUpdateLineChart(myChart, requestParams.dataComp, data);
                    document.getElementById(element.concat("_footer")).innerHTML = "Updated at: ".concat(moment().format('HH:mm:ss'));
                } else if (chartType == "gauge") {

                    updateGauge(myChart, dbData.data);
                    document.getElementById(element.concat("_footer")).innerHTML = "Updated at: ".concat(moment().format('HH:mm:ss'), " - ", "Data as of: ", dbData.timeStamp);
                } else if (chartType == "donut") {
                    data = [dbData.dbTimes, parseFloat(dbData.dbVals)];
                    updateDonut(myChart, data)
                    document.getElementById(element.concat("_footer")).innerHTML = "Updated at: ".concat(moment().format('HH:mm:ss'), " - ", "Data as of: ", dbData[4]);
                }

            });
        }, intervalPeriod);
        output(intervalID);
    }

}

function hoursToNumRec(timeVal, dataComp, output) {
    timeVal = parseFloat(timeVal);
    if (dataComp.substring(0, 1) == "f") {
        var period = 15;
    } else {
        var period = 300;
    }

    var numRec = 1 + (timeVal * 60 * 60) / period;

    if (numRec > 15000) {
        alert("Resolution too high, maximum is 20000 records: " + ((15000 * period) / (60 * 60)).toString() + " hours.");
        numRec = 15000;
    }
    output(numRec);
}



function changeWindow(myChart, chartType, element, requestParams, dtPick1, dtPick2) {
    requestParams.reqType = "w";
    requestParams.dateTime = "";

    var zeros = "000";

    dateTimeDisplayToNewDateTimeFormat(dtPick1.value, function(dateTime){
        dateTimeToObj(dateTime.date+"T"+dateTime.time, function(dateTimeObj){
            
          dateTimeToTimeStamp(dateTimeObj, function(timeStamp1){
            // alert(timeStamp);
            // alert(timeStamp1);
            if($(window).width() < 860 ){
            
                timeStamp1 = (timeStamp1 - 60*60*1000).toString();
            } else {
                timeStamp1 = (timeStamp1 - 2*60*60*1000).toString();
                
            }
            // alert(timeStamp1); //1555248120000
            if(requestParams.dataTable != "pmudata"){
                requestParams.dateTime = requestParams.dateTime.concat(timeStamp1.toString().substring(0,10));
            } else {
                requestParams.dateTime = requestParams.dateTime.concat(timeStamp1.toString().substring(0,12));
            }
            
    
          });
        });
      });


    dateTimeDisplayToNewDateTimeFormat(dtPick2.value, function(dateTime){
        dateTimeToObj(dateTime.date+"T"+dateTime.time, function(dateTimeObj){
        

            dateTimeToTimeStamp(dateTimeObj, function(timeStamp2){
                // alert(timeStamp2);

                if($(window).width() < 860 ){
                
                    timeStamp2 = (timeStamp2 - 60*60*1000).toString();
                } else {
                
                    timeStamp2 = (timeStamp2 - 2*60*60*1000).toString();
                }
                // alert(timeStamp2);
                if(requestParams.dataTable != "pmudata"){
                    requestParams.dateTime = requestParams.dateTime.concat(timeStamp2.toString().substring(0,10));
                } else {
                    requestParams.dateTime = requestParams.dateTime.concat(timeStamp2.toString().substring(0,12));
                }

            });
        });
    });

    // dateTimeDisplaytoTimeStamp(dtPick1.value, function(timeStamp) {
    //     requestParams.dateTime = requestParams.dateTime.concat(timeStamp);

    // });
    // dateTimeDisplaytoTimeStamp(dtPick2.value, function(timeStamp) {
    //     requestParams.dateTime = requestParams.dateTime.concat(timeStamp);

    // });


    // alert(JSON.stringify(requestParams));
    // alert(requestParams.dateTime);
    blockUpdateLineChart(myChart, chartType, element, requestParams);
}

function getColor(name, output) {
    switch (name) {
        case "Nuclear":
            output("#10d10b");
            break;
        case "Pumped Storage":
            output("#5850b2");
            break;
        case "Hydro":
            output("#0b18b2");
            break;
        case "OCGT":
            output("#ff7801");
            break;
        case "Biomass":
            output("#6f3400");
            break;
        case "Wind":
            output("#19e5dc");
            break;
        case "Coal":
            output("#1a1921");
            break;
        case "Oil":
            output("#7c7c7c");
            break;
        case "Oil":
            output("#a00");
            break;
        case "Other":
            output("#a59fd1");
            break;
        case "Frequency":
            output("#00621e");
            break;
        case "Demand":
            output("#bd0c0c");
            break;
        case "rocof":
            output("#007b90");
            break;
        default:
            output("#252525");
    }
}

function printEvents(chartType, modal, span, existingRows, requestParams, inputParams, output) {
    var eventWindows = [];
    var numEvents = {
        warn: 0,
        dang: 0
    };
    // alert(JSON.stringify(requestParams));
    requestData(chartType, requestParams, function(data) {
        // alert(data);
          

        if (requestParams.dataTable == "pmudata") {
            var numDecPoints = 6;

        } else {
            var numDecPoints = 3;
            
        }
        if(requestParams.dataComp.substring(0,1) =="f"){
            var yLabel = "Hz";
        } else {
            var yLabel = "Hz/s"
        }
        requestParams.reqType = "w";

        var none = true;
        var windows = [],
            numWind = 0,
            minVal = 100,
            maxVal = 0,
            flag = false;
        data.forEach(function(item, index, array) {
            // alert(JSON.stringify(item));
            if (flag == true) {

                if (item[inputParams.attr] > maxVal) {
                    maxVal = item[inputParams.attr];
                }
                if (item[inputParams.attr] < minVal) {
                    minVal = item[inputParams.attr];
                }
            }
            // alert(data[index].entryID - data[index+1].entryID);
            if (index < data.length - 2) {

                if (data[index].entryID - data[index + 1].entryID != inputParams.period && data[index + 1].entryID - data[index + 2].entryID == inputParams.period) {
                    //   alert("END: "+JSON.stringify(windows));
                    if (numWind == 0 || windows[numWind - 1][0] != -1) {
                        windows.push([-1, data[index + 1].entryID, -1, -1]);
                        //   alert("Row added: "+JSON.stringify(windows))
                        numWind += 1;
                        flag = true;
                    } else if (windows[numWind - 1][1] == -1) {
                        windows[numWind - 1][1] = data[index + 1].entryID;
                        windows[numWind - 1][2] = (parseFloat(minVal).toFixed(numDecPoints)).toString();
                        windows[numWind - 1][3] = (parseFloat(maxVal).toFixed(numDecPoints)).toString();

                        maxVal = 0;
                        minVal = 100;
                        flag = false;
                    }
                } else if (data[index + 1].entryID - data[index + 2].entryID != inputParams.period && data[index].entryID - data[index + 1].entryID == inputParams.period) {
                    // alert("START: "+JSON.stringify(windows));
                    if (numWind == 0 || windows[numWind - 1][0] != -1) {
                        // alert("Row added: "+JSON.stringify(windows))
                        windows.push([data[index + 1].entryID, -1, -1, -1]);
                        numWind += 1;
                        flag = true;
                    } else if (windows[numWind - 1][0] == -1) {
                        windows[numWind - 1][0] = data[index + 1].entryID;
                        windows[numWind - 1][2] = (parseFloat(minVal).toFixed(numDecPoints)).toString();
                        windows[numWind - 1][3] = (parseFloat(maxVal).toFixed(numDecPoints)).toString();


                        maxVal = 0;
                        minVal = 100;
                        flag = false;
                    }

                }
            }
        });

        if (windows.length > 0) {
            //   alert(windows);
            if (windows[windows.length - 1][0] == -1 || windows[windows.length - 1][1] == -1) {
                windows.pop()
            }
            if (windows[0][1] == -1 || windows[0][0] == -1) {
                windows.shift()
            }
            if(modal != ""){
                var recordHTML = "";
            } else {
                
            }
            
            windows.forEach(function(item, index, array) {


                timeStamptoDateTimeDisplay(item[0], true, function(displayTime1) {

                    startDateTime = displayTime1.substring(0, 6) + displayTime1.substring(8, displayTime1.length)

                });
                timeStamptoDateTimeDisplay(item[1], true, function(displayTime2) {

                    endDateTime = displayTime2.substring(0, 6) + displayTime2.substring(8, displayTime2.length)

                });


                // eventWindows.push({
                //     "dateWindow": (parseInt(item[0]) - inputParams.viewMargin).toString() + (parseInt(item[1]) + inputParams.viewMargin).toString()
                // });
                var window = (parseInt(item[0]) - inputParams.viewMargin).toString() + (parseInt(item[1]) + inputParams.viewMargin).toString();

                if (startDateTime.substring(0, 8) == endDateTime.substring(0, 8)) {
                    endDateTime = endDateTime.substring(endDateTime.length - 8);
                }
                // alert(JSON.stringify(item));
                var duration = parseInt(item[1]) - parseInt(item[0]);
                // alert(duration);
                
                if (duration > inputParams.minDur) {
                    
                    // alert(numEvents);
                    if(modal==""){
                        
                    } else
                    {
                        recordHTML += `<tr  class=' ` + requestParams.dataComp.substring(0,1) + requestParams.dataTable.substring(0,1) + ` `;

                        if (duration < inputParams.dangerDur) {

                            numEvents.warn = numEvents.warn + 1;
                            recordHTML += `table-warning`;

                        } else {
                            numEvents.dang = numEvents.dang + 1;
                            recordHTML += `table-danger`;
                        }
                        var min = (Math.floor(duration / 60)).toString();
                        var sec = ((duration % 60)).toString();

                        if (min.length < 2) {
                            min = "0".concat(min);
                        }
                        if (sec.length < 2) {
                            sec = "0".concat(sec);
                        }
                        // alert(min);
                        duration = min + ":" + sec;


                        recordHTML += `'><th scope='row' width="33%" align="center" style='border-style: none;'>`;

                        recordHTML += startDateTime + " to " + endDateTime;

                        recordHTML += `</th>`;
            
                        recordHTML += `<td id="window" style="display:none;font-weight: bold;">` + window + `</td>`;
                        
                        
                        
                        recordHTML += `<td width="33%" align="center" style="font-weight: bold;">` + item[2] + ` - ` + item[3] + ` [`+yLabel+`]</td><td width="33%" align="center">` + duration + "</td></tr>";
                    // $('#PCeventList tr:last').after(recordHTML);
                    }
                }



                
            });
            // alert(recordHTML);
            output({numEvents:numEvents,recordHTML:recordHTML});

            // var DateTime1endLim = new Date();
            // DateTime1endLim.setTime(DateTime1endLim.getTime() - 2 * 60 * 60 * 1000);
            // DateTime1endLim.setDate(DateTime1endLim.getDate() - 1);

            // var DateTime2endLim = new Date();
            // DateTime2endLim.setTime(DateTime2endLim.getTime() - 5 * 60 * 1000);

            // $('#datetimepicker1').datetimepicker({
            //     format: "dd/mm/yyyy - hh:ii",
            //     autoclose: true,
            //     todayBtn: false,
            //     endDate: DateTime1endLim,
            //     minuteStep: 1,
            // });

            // $('#datetimepicker2').datetimepicker({

            //     format: "dd/mm/yyyy - HH:ii",
            //     autoclose: true,
            //     todayBtn: true,
            //     endDate: endDateTime,
            //     minuteStep: 1
            // });

            // $('#datetimepicker1').change(function() {
            //     // changeWindow(myLineChart, chartType, element, requestParams, dtPick1, dtPick2);
            // });

            // $('#datetimepicker2').change(function() {
            //     // changeWindow(myLineChart, chartType, element, requestParams, dtPick1, dtPick2);
            // });




            // var table = document.getElementById("PCeventList");
            // var rows = table.getElementsByTagName("tr");
            
            // for (i = 0; i < rows.length; i++) {
            //     var currentRow = table.rows[i];
            //     var createClickHandler = function(row) {
            //         return function() {
            //             modal.style.display = "block";
            //             var id = row.getElementsByTagName('td')[0].innerHTML;
            //             // alert(parseInt(id.slice(3,id.length)));
            //             // alert(id);
            //             var window = eventWindows[parseInt(id.substring(2, id.length))].dateWindow;
            //             requestParams.dateTime = window;
            //             // alert(JSON.stringify(requestParams));
            //             initDrawChart({
            //                     chartType: "line",
            //                     height: window.innerHeight * 0.37
            //                 },
            //                 "PCmyLineChart", requestParams,
            //                 function(myLineChart, chartType, element, requestParams) {
            //                     span.onclick = function() {
            //                         myLineChart.destroy();
            //                         modal.style.display = "none";
            //                     }
            //                     window.onclick = function(event) {
            //                         if (event.target == modal) {
            //                             myLineChart.destroy();
            //                             modal.style.display = "none";
            //                         }
            //                     }
            //                 });

            //         };
            //     };
            //     currentRow.onclick = createClickHandler(currentRow);
            // }




        }

    });
}