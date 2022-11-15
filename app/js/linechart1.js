
var x = [0,"12-6-22","12-7-22","12-8-22","12-9-22","12-10-22","12-11-22", "12-12-22"];


new Chart("chart1", {
  type: "line",
  data: {
    labels: x,
    datasets: [{
      label: 'Sales',
      yAxisID: 'y1',
      data: [2000,4200, 2800, 8000, 4000, 6000, 9000,6000],
      fill: false,
      lineTension: 0,
      backgroundColor: "#fe00cb",
      borderColor: "#2ff119",
      pointStyle: 'circle',
      pointRadius: 7
    },
    {
        label: 'Visitor',
        yAxisID: 'y2',
        data: [25000,30000, 27000, 31000, 30000, 35000,34000,42000],
        fill: false,
        lineTension: 0,
        backgroundColor: "#fb0003",
        borderColor: "#f5c746",
        pointStyle: 'circle',
        pointRadius: 7
      }]
  },
  options: {
    plugins:{ 
      legend: {
      position: 'bottom',
      align:'start',
      display: true,
      labels: {
        boxWidth: 16,
        boxHeight:16,
        color:'#f4bf3b'
    },
  },},
   
    scales: {
      x: {
        grid: {
          color: '#72879c',
          borderColor: 'white',
            tickColor: '#34495e',
        },
       
        ticks: {
          color: 'white',
          /*callback: ((value, index, values) => {
            const totalItems = values.length-1;
            if(index !== totalItems){
              return value
            }

          })*/
        },
      },
      y1:{
          grid: {
            color: '#72879c',
            borderColor: 'white',
            tickColor: '#34495e',
          },
          ticks: {
            stepSize: 2000,
            color: '#2ff119',
          },
          min: 0,
          max: 10000,
            display: true,
            position: 'left',
          },
        y2:{
            grid: {
              color: '#72879c',
              borderColor: '#34495e',
              tickColor: '#34495e',
            },
            ticks: {
            stepSize: 10000,
            color: '#f5c746',
          },
          min: 0,
        max: 50000,
            display: true,
            position: 'right',
      
            // grid line settings
          }
      }
       
  },
  }

);