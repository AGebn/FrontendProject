let satsPerEl = document.getElementById("satsPerUsd");
var btcData = {};
var satsVal = 0;

// satsPerEl.textContent += "TEST";

// create a global variable btcData and assign the bitcoin data from the API
$.get(
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=USD&include_market_cap=true&include_last_updated_at=true",
  function (data) {
    console.log(data);
    btcData.price = data.bitcoin.usd;
    btcData.time = data.bitcoin.last_updated_at;
    btcData.mCap = data.bitcoin.usd_market_cap;
    return btcData;
  }
);

console.log(btcData);
console.log(btcData.price);

//function to get the current BTC/USD price and return Sats/USD value
function satsValue() {
  let currentPrice = btcData.price;
  console.log(currentPrice);
  satsVal = 100000000 / currentPrice;
  console.log(satsVal);
  return satsVal;
}
satsValue();
console.log(satsVal);

satsPerEl.textContent += `${satsVal} Sats/USD`;
