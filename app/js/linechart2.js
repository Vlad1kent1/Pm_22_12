var x=['200','300','200','400']

const hoverValue = {
id:'hoverValue',
afterDatasetsDraw(chart, args, pluginOptions){
    const {ctx, data, options} = chart;

    chart.getActiveElements().forEach((active) => {
        const value = data.datasets[active.datasetIndex].data[active.index];
        const fontSize = options.hoverRadius;
        ctx.save();

        ctx.font = 'bold ${fontSize}px sans-serif';
        ctx.fillStyle = '#eee';
        ctx.yAlign = 'bottom';
      
        
        ctx.fillText(value, active.element.x, active.element.y);
        ctx.restore();
    })
}
}

const data = [200,300, 200, 400]

var i = -1;
const titleTooltip = (tooltipItems) => {
i++;
return 200,300, 200, 400;
};

const labelTooltip = (tooltipItems) => {
  return '';
};

new Chart("chart2", {
  type: "line",
  backgroundColor:"#e84c3d",
  data: {
    labels: x,
    datasets: [{
      label: 'New',
      yAxisID: 'y',
      data: data,
      
      lineTension: 0,
      backgroundColor: [
        '#ff00d2',
        '#ff00d2',
        '#ff00d2',
        '#0cff00'
      ],
      borderColor: "white",
      pointStyle: 'circle',
      pointRadius: 7

    },
    {
        data: [200,300, 200, 400],
        fill: true,
        lineTension: 0,
        backgroundColor: "#f1c40f",
        borderColor: "white",
        pointStyle: 'circle',
        pointRadius: 1
      }]
  },
  options: {
    plugins:{ 
        legend:
        {
            display: false
        },
        tooltip: {
            //enabled: false
            yAlign:'bottom',
            displayColors: false,
            titleMarginBottom: 0,
            backgroundColor:'#e84c3d',
            callbacks:{
              title: function(context){
                return context[0].data
              },
              label: labelTooltip
            }
        },
  },
   
    scales: {
        
      x: {
        grid: {
            display: false,
            drawBorder: false,
            drawTicks: false
        },
       ticks:{
        display: false
       }
       
      },
      y:{
        grid: {
            display: false,
            drawBorder: false,
            drawTicks: false
        },
       ticks:{
        stepSize: 10,
        maxTicksLimit: 50,
        display: false
           },
          min:0,
          max:600,
        }
      }    
  },
  //plugins: [hoverValue]
}
);