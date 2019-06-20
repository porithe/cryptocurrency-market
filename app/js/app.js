const ctx = document.getElementById('myChart').getContext('2d');
  
let canvasArea = document.getElementById('myChart');

const myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [{
      data: [10, 15, 29, 6, 18],
      backgroundColor: ['rgba(33,150,243 ,0.3)'],
      borderColor: ['rgba(33,150,243 ,1)'],
      borderWidth: 2,
    }],
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: false,
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        }
      }]
    }
  }
});


const test = document.querySelector('.title');

test.addEventListener('click', function() {
  myChart.data.datasets[0].data.push(50);
  myChart.data.labels.push('June')
  console.log('kappa');
  console.log(myChart.data.datasets[0].data);
  myChart.update();
});