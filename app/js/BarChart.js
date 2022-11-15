var x=["01-01-22","01-02-22","01-03-22","01-04-22","01-05-22","01-06-22","01-07-22","01-08-22","01-09-22"]
var first = []
var second = []

var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET",'./js/data.json',true);
xmlhttp.send();
xmlhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200)
    var data = JSON.parse(this.responseText);
    console.log(data)
    let i = 0;
    var date = data.User_Trend.map(function(elem){
        console.log(date)
        return elem.date
    });

    i=0;
    var New = [data.User_Trend.map(function(elem){
        console.log(New)
        first[i] = elem.New
        console.log(first[i]+" this ")
        if(i!==9){
            i++
        }
        return elem.New
    })];

    i = 0;
    var Sales = data.User_Trend.map(function(elem){
        second[i]=elem.Sales
        if(i!==9){
            i++
        }
        console.log(elem.Sales)
        return elem.Sales
    });
    data.update();
}

new Chart("BarChart", {
    type: 'bar',
    data: {
        labels: x,
        datasets: [ {
            label: "New",
            backgroundColor: "#35485c",
            data: first
        },
        {
            label: "Sales",
            backgroundColor: "#1ffc02",
            data: second
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
              color:'black'
          },
        },},
        scales: {
            x: {
                beginAtZero: false,
                grid: {
                  color: '#1b93e1',
                  borderColor: 'white',
                  tickColor: '#1b93e1',
                },
               
                ticks: {
                  color: 'black',
                  callback: function(value, index, ticks) {
                    if(value === 0 || value === 4 || value === 8){
                        return '01-0' + (value+1) + '-22';
                    }
                    
                }
                },
              },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'white',
                    borderColor: '#1b93e1',
                    tickColor: '#1b93e1',
                  },
                ticks:{
                    stepSize:20,
                    color: 'black',
                    callback: function(value, index, ticks) {
                        return value + '%';
                    }

                },
                
                max: 100
            }
        }
    }
});


