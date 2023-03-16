let satsPerEl = document.getElementById("satsPerUsd");
var btcData = {};
var satsVal = 0;
let users = {};
const basicCar = 15000;
const lambo = 200000;
const avgHouse = 350000;
const citadel = 2000000;

// satsPerEl.textContent += "TEST";

// create a global variable btcData and assign the bitcoin data from the API
async function getData() {
  await $.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=USD&include_market_cap=true&include_last_updated_at=true",
    function (data) {
      console.log(data);
      btcData.price = data.bitcoin.usd;
      btcData.time = data.bitcoin.last_updated_at;
      btcData.mCap = data.bitcoin.usd_market_cap;
      //   return btcData;
    }
  );

  await satsValue(btcData);
  updateSats();
  //test();
}

function test() {
  console.log(btcData);
  console.log(btcData.price);
  console.log(satsVal);
}

getData();

//function to get the current BTC/USD price and return Sats/USD value
async function satsValue(btcData) {
  let currentPrice = btcData.price;
  //console.log(currentPrice);
  satsVal = 100000000 / currentPrice;
  //console.log(satsVal);
  return satsVal;
}

// satsValue();
async function updateSats() {
  satsPerEl.textContent += `${satsVal} Sats/USD`;
}

//making DOM elements
let avgCarEl = document.getElementById("avgcar");
let lamboEl = document.getElementById("lambo");
let avgHouseEl = document.getElementById("avghouse");
let citadelEl = document.getElementById("citadel");

//now creating the percentages and placing them in the correct EL when clicked
let clickCar = 0;
let clickLam = 0;
let clickHouse = 0;
let clickCit = 0;

avgCarEl.onclick = function () {
  if (clickCar === 0) {
    avgCarEl.innerText += `You can buy ${
      (btcData.price / basicCar) * 100
    } % of a basic car.`;
    clickCar += 1;
  }
};

lamboEl.onclick = function () {
  if (clickLam === 0) {
    lamboEl.innerText += `You can buy ${
      (btcData.price / lambo) * 100
    } % of a sick moon lambo.`;
    clickLam += 1;
  }
};

avgHouseEl.onclick = function () {
  if (clickHouse === 0) {
    avgHouseEl.innerText += `You can buy ${
      (btcData.price / avgHouse) * 100
    } % of an average American house.`;
    clickHouse += 1;
  }
};

citadelEl.onclick = function () {
  if (clickCit === 0) {
    citadelEl.innerText += `You can buy ${
      (btcData.price / citadel) * 100
    } % of your very own citadel.`;
    clickCit += 1;
  }
};

//receiving data, calculating cost basis, and displaying the number back out to the user.
let cbButtonEl = document.getElementById("cbButton");

cbButtonEl.onclick = function () {
  let cbForm = document.getElementById("cbForm");
  let cbScore = document.getElementById("costBasis");
  if (users[cbForm.userName.value] === undefined) {
    users[cbForm.userName.value] = {
      dollars: cbForm.dollars.value,
      sats: cbForm.sats.value,
      costBasis: cbForm.sats.value / cbForm.dollars.value,
    };
    // console.log(users);
  } else {
    users[cbForm.userName.value].dollars =
      users[cbForm.userName.value].dollars * 1 + cbForm.dollars.value * 1;

    users[cbForm.userName.value].sats =
      users[cbForm.userName.value].sats * 1 + cbForm.sats.value * 1;

    users[cbForm.userName.value].costBasis =
      users[cbForm.userName.value].sats / users[cbForm.userName.value].dollars;
  }
  console.log(users);
  cbScore.innerText = `${cbForm.userName.value}'s cost basis is ${
    users[cbForm.userName.value].costBasis
  } sats/usd`;
};
