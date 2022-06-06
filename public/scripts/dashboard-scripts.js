var options = {
    chart: {
      type: "area",
      height: 300,
      foreColor: "#999",
      
      dropShadow: {
        enabled: true,
        enabledSeries: [0],
        top: -2,
        left: 2,
        blur: 5,
        opacity: 0.06
      }
    },
    colors: ['#00E396', '#0090FF'],
    stroke: {
      curve: "smooth",
      width: 3
    },
    dataLabels: {
      enabled: false
    },
    series: [{
      name: 'Lucro',
      data: generateDayWiseTimeSeries(0, 18)
    }, {
      name: 'Acessos',
      data: generateDayWiseTimeSeries(1, 18)
    }],
    markers: {
      size: 0,
      strokeColor: "#fff",
      strokeWidth: 3,
      strokeOpacity: 1,
      fillOpacity: 1,
      hover: {
        size: 6
      }
    },
    xaxis: {
      type: "datetime",
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: [
    {
        title: {
            text: "Series A",
        },
    },
    {
        opposite: true,
        title: {
            text: "Series B"
        },
    }
    ],
    grid: {
      padding: {
        left: -5,
        right: 5
      }
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy"
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    },
    fill: {
      type: "gradient",
      fillOpacity: 0.2
    }
  };

  var chart = new ApexCharts(document.querySelector("#timeline-chart"), options);

  chart.render();

  function generateDayWiseTimeSeries(s, count) {
    var values = [[
      1,2,3,4,1,2,3,4,2,2,5,1,6,9,0,0,1,2
    ], [
      0.01,0.02,0.03,0.02,0.01,0.05,0.03,0.04,0.02,0.03,0.02,0.04,0.01,0.01,0.02,0.02,0.00,0.01
    ]];
    var i = 0;
    var series = [];
    var x = new Date("11 Nov 2012").getTime();
    while (i < count) {
      series.push([x, values[s][i]]);
      x += 86400000;
      i++;
    }
    console.log(series)
    return series;
  }