var chart;

$(document).ready(function() {
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
            type: 'line',
            zoomType: 'x',
            //animation: false,
            events: {
                load: requestData
            }
        },
        plotOptions: {
    			series: {
        		animation: false
    			}
				},
        title: {
            text: 'GOES Electron Flux (5 minute data)',
            
        },
        legend: {
        	//y: -15,
          margin: 1,
          padding: 1
        },
        xAxis: {
            type: 'datetime',
            //tickPixelInterval: 150,
            //maxZoom: 20 * 1000
            //startOnTick: true,
           // endOnTick: true,
            maxPadding: 0,
            minPadding: 0,
            minorTickInterval: 10800000,
            minorTickLength: 4,
            minorTickPosition: "inside",
            minorTickWidth: "1",
            minorGridLineWidth: 0,
            title: {
            	text:"Universal Time",
              margin: 0
            },
            plotBands: [{ 
              from: Date.parse("2017-04-12 00:00:00 UTC"),
              to: Date.parse("2017-04-12 00:01:00 UTC"),
              //color: 'rgba(68, 170, 213, .1)',
              label: {
              	verticalAlign: "top",
                text: "N",
                style: {
                    fontWeight: 'bold',
                    color: '#001dff'
                }
              },
            },
            { 
              from: Date.parse("2017-04-12 02:00:00 UTC"),
              to: Date.parse("2017-04-12 02:01:00 UTC"),
              //color: 'rgba(68, 170, 213, .1)',
              label: {
              	verticalAlign: "top",
                text: "N",
                style: {
                    fontWeight: 'bold',
                    color: '#ff0000'
                }
              },
            },
            { 
              from: Date.parse("2017-04-12 12:00:00 UTC"),
              to: Date.parse("2017-04-12 12:01:00 UTC"),
              //color: 'rgba(68, 170, 213, .1)',
              label: {
              	verticalAlign: "top",
                text: "M",
                style: {
                    fontWeight: 'bold',
                    color: '#001dff'
                }
              },
            },
            { 
              from: Date.parse("2017-04-12 14:00:00 UTC"),
              to: Date.parse("2017-04-12 14:01:00 UTC"),
              //color: 'rgba(68, 170, 213, .1)',
              label: {
              	verticalAlign: "top",
                text: "M",
                style: {
                    fontWeight: 'bold',
                    color: '#ff0000'
                }
              },
            }
            
            ]
        },
        yAxis: {
            //minPadding: 0.2,
            //maxPadding: 0.2,
            type: 'logarithmic',
            gridLineColor: "#000000",
            tickInterval: 1,
            tickLength: 5,
            tickPosition: "inside",
            tickWidth: "1",
            tickColor: "#000000",
            minorTickInterval: .1,
            minorTickLength: 4,
            minorTickPosition: "inside",
            minorTickWidth: "1",
            minorGridLineWidth: 0,            
            max: 10000000,
    				min: .1,
            title: {
                text: 'Particles cm⁻²s⁻¹sr⁻¹',                
            },
            labels: {
              useHTML: true,
              x: -3,
              formatter: function () {
                  return logLabels(this.value);                 
              }
            },
            plotBands: [{ 
              from: 1,
              to: 10,
              //color: 'rgba(68, 170, 213, .1)',
              label: {
              	align: "right",
                text: "A",
                style: {
                    fontWeight: 'bold'
                }
              },
        		},
            { 
              from: 10,
              to: 100,
              //color: 'rgba(68, 170, 213, .2)',
              label: {
              	align: "right",
                text: "B",
                style: {
                    fontWeight: 'bold'
                }
              },
        		},
            { 
              from: 100,
              to: 1000,
              color: 'rgba(0, 0, 0, .1)',
              label: {
              	align: "right",
                text: "C",
                style: {
                    fontWeight: 'bold'
                }
              },
        		},
            { 
              from: 1000,
              to: 10000,
              color: 'rgba(0, 0, 0, .2)',
              label: {
              	align: "right",
                text: "M",
                style: {
                    fontWeight: 'bold'
                }
              },
        		},
            { 
              from: 10000,
              to: 100000,
              color: 'rgba(0, 0, 0, .3)',
              label: {
              	align: "right",
                text: "X",
                style: {
                    fontWeight: 'bold'
                }
              },
        		}
            ]         
        },
        series: [{
            name: 'GOES 15 >= 2.0 MeV',
            color: "#001dff",
            marker:{
                enabled: false
            }
         },{
            name: 'GOES 15 >= 0.8 MeV',
            color: "#5400a8",
            marker:{
                enabled: false
            }
         },{
          name: 'GOES 13 >= 2.0 MeV',
          color: "#ff0000",
          marker:{
                enabled: false
            }
         },{
          name: 'GOES 13 >= 0.8 MeV',
          color: "#ffa500",
          marker:{
                enabled: false
            }
         }
        ]
    });        
});

/**
 * Request data from the server, add it to the graph and set a timeout 
 * to request again
 */
function requestData() {
    $.ajax({
        url: 'https://api.myjson.com/bins/wnv4l',
        success: function(data) {
          var series1 = [];
          var series2 = [];
          var series3 = [];
          var series4 = [];
        	for (var i = 0; i < data.length; i++) {
    					if(data[i].date1){
              	//console.log(data[i].date1 + " -> " + data[i].y1);
                //var element = [data[i].date1.replace(/\-/g,"/")+ " UTC",data[i].y1];
                var element = [Date.parse(data[i].date1.replace(/\-/g,"/")+ " UTC"),data[i].y1];
                series1.push(element);
              }
              if(data[i].date2){
              	//console.log(data[i].date1 + " -> " + data[i].y1);
                var element = [Date.parse(data[i].date2.replace(/\-/g,"/")+ " UTC"),data[i].y2];
                series2.push(element);
              }
              if(data[i].date3){
              	//console.log(data[i].date1 + " -> " + data[i].y1);
                var element = [Date.parse(data[i].date3.replace(/\-/g,"/")+ " UTC"),data[i].y3];
                series3.push(element);
              }
              if(data[i].date4){
              	//console.log(data[i].date1 + " -> " + data[i].y1);
                var element = [Date.parse(data[i].date4.replace(/\-/g,"/")+ " UTC"),data[i].y4];
                series4.push(element);
              }
          }
          
          chart.xAxis[0].update({min: Date.parse("2017/04/10 00:00:00 UTC"), max: Date.parse("2017/04/13 00:00:00 UTC")});
          chart.series[0].setData(series3);
          chart.series[1].setData(series1);
          chart.series[2].setData(series4);
          chart.series[3].setData(series2);
                
            // call it again after ten seconds
            setTimeout(requestData, 10000);    
        },
        //cache: false
    });
}

function logLabels(value, valueText, valueAxis){
	var powerOfTen;
  powerOfTen = value.toExponential();
  if(powerOfTen.substring(0,2) === '1e'){  
    powerOfTen = powerOfTen.slice(-2);
    powerOfTen = powerOfTen.replace('+','');
    powerOfTen = "10<sup>" + powerOfTen + "</sup>";
    
  }
  return powerOfTen;  
};
