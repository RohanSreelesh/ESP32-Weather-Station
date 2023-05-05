function main()
{
  
  let dataTypeSelect = document.querySelector('#data-type');
  let timeRangeSelect = document.querySelector('#time-range');
  let selectedDataType = dataTypeSelect.value;
  let selectedTimeRange = timeRangeSelect.value;
  timeRangeSelect.value = "today";

  if(selectedDataType == "temperature"){
    updateData("/temperatureDataToday","temperature","today");
  }
  else if(selectedDataType == "humidity"){
    updateData("/humidityDataToday","humidity","today");
  }

  // add event listener to the data type select element
  dataTypeSelect.addEventListener('change', () => {
    // get the selected value
    selectedDataType = dataTypeSelect.value;
    timeRangeSelect.value = "today";
    // update the chart based on the selected data type
    console.log(selectedDataType);
    if(selectedDataType == "temperature"){
      updateData("/temperatureDataToday","temperature","today");
    }
    else if(selectedDataType == "humidity"){
      updateData("/humidityDataToday","humidity", "today");
    }
    //updateChart(selectedDataType, selectedTimeRange);
  });

  // add event listener to the time range select element
  timeRangeSelect.addEventListener('change', () => {
    // get the selected value
    console.log(selectedTimeRange);
    selectedTimeRange = timeRangeSelect.value;
    // update the chart based on the selected time range
    if(selectedTimeRange == "today"){
      if(selectedDataType == "temperature"){ 
        updateData("/temperatureDataToday","temperature","today");
      }
      else if(selectedDataType == "humidity"){
        updateData("/humidityDataToday","humidity","today");
      }
    }
    else if(selectedTimeRange == "yesterday"){

      if(selectedDataType == "temperature"){
        updateData("/temperatureDataYday","temperature","yesterday");
      }
      else if(selectedDataType == "humidity"){
        updateData("/humidityDataYday","humidity","yesterday");
      }
    }
    else if (selectedTimeRange == "last-week"){
      if(selectedDataType == "temperature"){
        updateData("/temperatureDataLweek","temperature", "last-week");
      }
      else if(selectedDataType == "humidity"){
        updateData("/humidityDataLweek","humidity", "last-week");
      }
    }
      
    }
  )};




function updateData(url,type,day) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let res = JSON.parse(this.responseText);
        console.log(res.result);
        buildGraph(separateDataByDay(res.result,type),day);
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
  }



function separateDataByDay(array,type) {
  const labels = [];
  const data = [];
  array.forEach(obj => {
    const date = new Date(obj.date);

      const timeString = date.toLocaleTimeString()
      labels.push(timeString);
      data.push(obj[type]);
  });
  return { labels, data };
}

let todayChart = null;

function buildGraph({labels, data},day){
  if (todayChart) {
    todayChart.destroy();
  }
  console.log(labels);
  console.log(data);
  const todayCtx = document.getElementById('myChart').getContext('2d');
  todayChart = new Chart(todayCtx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: day,
        data: data,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }],
        xAxes: [{
          type: 'time',
          distribution: 'linear',
          time: {
            displayFormats: {
              hour: 'MMM D, hA'
            }
          }
        }]
      }
    }
  })};