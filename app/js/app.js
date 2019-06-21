const ctx = document.getElementById('myChart').getContext('2d');
const bitcoinTag = document.getElementById('btc-tag');

const buyInput = document.getElementById('buyInput');
const sellInput = document.getElementById('sellInput');

const buyButton = document.getElementById('buyButton');
const sellButton = document.getElementById('sellButton');

const moneyTag = document.getElementById('money-tag');
const userBtcTag = document.getElementById('btc-user-tag');

const minBtc = document.getElementById('min-btc-tag');
const maxBtc = document.getElementById('max-btc-tag');

let labelsUpper = 1;
let bitcoinStartValue  = 7500;

let userMoney = 1500;
let userBitcoin = 0;

let minBtcPrice = bitcoinStartValue;
let maxBtcPrice = bitcoinStartValue;

bitcoinTag.textContent = bitcoinStartValue;
moneyTag.textContent = userMoney;
userBtcTag.textContent = userBitcoin;
minBtc.textContent = bitcoinStartValue;
maxBtc.textContent = bitcoinStartValue;

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

const buyBitcoin = () => {
  if (buyInput.value <= userMoney) {
    userBitcoin = userMoney / bitcoinStartValue;
    userBitcoin = Math.round(userBitcoin * 1000) / 1000;
    userMoney -= buyInput.value;
    userMoney = Math.round(userMoney * 100) / 100;
    moneyTag.textContent = userMoney;
    userBtcTag.textContent = userBitcoin;
    buyInput.value = '';
  }
}
const sellBitcoin = () => {
  if (sellInput.value <= userBitcoin) {
    userMoney = userBitcoin * bitcoinStartValue;
    userBitcoin = userBitcoin - sellInput.value;
    userBitcoin = Math.round(userBitcoin * 1000) / 1000;
    userMoney = Math.round(userMoney * 100) / 100;
    moneyTag.textContent = userMoney;
    userBtcTag.textContent = userBitcoin;
    sellInput.value = '';
  }
}
buyButton.addEventListener('click', buyBitcoin);
sellButton.addEventListener('click', sellBitcoin);

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

  let randomNumber = Math.random() * (max - min) + min;

  bitcoinStartValue = Math.floor(bitcoinStartValue * randomNumber);
  bitcoinTag.textContent = bitcoinStartValue;
  if (bitcoinTmpValue < bitcoinStartValue) {
    bitcoinTag.style.color = '#4CAF50';
  }
  else {
    bitcoinTag.style.color = '#f44336';
  }

  if (bitcoinStartValue > maxBtcPrice) {
    maxBtcPrice = bitcoinStartValue;
    maxBtc.textContent = bitcoinStartValue;
  }
  else if(bitcoinStartValue < minBtcPrice){
    minBtcPrice = bitcoinStartValue;
    minBtc.textContent = bitcoinStartValue;
  }

  myChart.data.labels.push(labelsUpper);
  myChart.data.datasets[0].data.push(bitcoinStartValue);

  if (myChart.data.labels.length >= 40) {
    myChart.data.labels.shift();
    myChart.data.datasets[0].data.shift();
  }

  myChart.update();
}, 2000);