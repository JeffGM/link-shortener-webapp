$( document ).ready(function() {
  let currentAdId;

  $.ajax({
      url: "/statistics",
      type: 'GET',
      dataType: 'json', 
      success: function(statistics) {
          let access = statistics["access"][0];
          let profits = statistics["profit"][0];
          let viewsGrouped = groupViewsByDate(access);
          let profitsGrouped = groupProfitsByDate(profits);
          console.log(transformToSeries(viewsGrouped));
          console.log(transformToSeries(profitsGrouped));
          buildChart(transformToSeries(viewsGrouped), transformToSeries(profitsGrouped));
      }
  });

  var count = 10;

  const intervalId = setInterval(function() {
      count--;
      $("#countdown").html(count);

      if (count === 0) {
          proceed(currentAdId);
          clearInterval(intervalId);
      }
  }, 1000);
});

function groupViewsByDate(series) {
  let agregated = [];

  for(let i = 0; i < series.length; i++) {
    let currentDate = new Date(series[i]["timestamp"]);
    let currentDay = ( currentDate.getMonth() + 1)  + "-" +  (1 + currentDate.getDay()) + "-" + currentDate.getFullYear();
    
    if(agregated[currentDay]) {
      agregated[currentDay] += 1;
    } else {
      agregated[currentDay] = 1;
    }
  }

  return agregated
}

function groupProfitsByDate(series) {
  let agregated = [];

  for(let i = 0; i < series.length; i++) {
    let currentDate = new Date(series[i]["timestamp"]);
    let currentDay = currentDate.getMonth() + "-" + currentDate.getDay()  + "-" + currentDate.getFullYear();
    
    if(agregated[currentDay]) {
      agregated[currentDay] += series[i]["profit"];
    } else {
      agregated[currentDay] =  series[i]["profit"];
    }
  }

  return agregated
}

function buildChart(views, profits) {
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
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    },
    fill: {
      type: "solid",
      fillOpacity: 0.2
    }
  };

    var chart = new ApexCharts(document.querySelector("#timeline-chart"), options);

  chart.render();
}

  function transformToSeries(grouped) {
    let parsed = []
    for (var k in grouped) {
      parsed.push([k, grouped[k]]);
    }

    return parsed;
  }
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