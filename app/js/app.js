const ctx = document.getElementById('myChart').getContext('2d');
const bitcoinTag = document.getElementById('btc-tag');


let labelsUpper = 1;
let bitcoinStartValue  = 7500;

bitcoinTag.textContent = bitcoinStartValue;


const myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [labelsUpper],
    datasets: [{
      data: [bitcoinStartValue],
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

setInterval( () => {
  labelsUpper++;

  let bitcoinTmpValue = bitcoinStartValue;


  let max = 1.40;
  let min = 0.70;

  if (bitcoinStartValue > 25000) {
    max = 1.25;
    max = 0.55;
  }
  if (bitcoinStartValue < 1500) {
    max = 1.6;
    min = 0.80;
  }

  let randomNumber = Math.random() * (1.40 - 0.70) + 0.70;

  bitcoinStartValue = Math.floor(bitcoinStartValue * randomNumber);
  bitcoinTag.textContent = bitcoinStartValue;
  if (bitcoinTmpValue < bitcoinStartValue) {
    bitcoinTag.style.color = '#4CAF50';
  }
  else {
    bitcoinTag.style.color = '#f44336';
  }
  myChart.data.labels.push(labelsUpper);
  myChart.data.datasets[0].data.push(bitcoinStartValue);

  if (myChart.data.labels.length >= 50) {
    myChart.data.labels.shift();
    myChart.data.datasets[0].data.shift();
  }

  myChart.update();
  console.log('kappa');
}, 2000);