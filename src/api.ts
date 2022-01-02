//fether function in component is not good
const BaseUrl = "https://api.coinpaprika.com/v1/"

export function coinList() {
  return fetch(BaseUrl + "coins").then(response => response.json());
}

export function coinInfo(coinId: string | undefined) {
  return fetch(BaseUrl + `coins/${coinId}`).then(response => response.json());
}

export function coinTickers(coinId: string | undefined){
  return fetch(BaseUrl + `tickers/${coinId}`).then(response => response.json());
}

export function coinOhlcv(coinId: string | undefined){
  //Module
  const querystringModule = require('querystring');

  //Date.now() returns milisceond of time
  const endDate = Math.floor(Date.now() / 1000); //change milisecond to second
  const sevenDaySecond = 7 * 24 * 60 * 60;
  const startData = endDate - sevenDaySecond;
  const queryString = querystringModule.stringify({
    start: startData,
    end: endDate,
  });

  return fetch(BaseUrl + `coins/${coinId}/ohlcv/historical?${queryString}`).then(response => response.json())
}

    /*
      const response = await fetch(CoinsUpbitData);
      const dataList:IupBitcoinsInfo[] = await response.json();
      const krwMarketData = dataList.filter(data => {
        const tradeCurrencies = data.market.split("-");
        data.symbol = tradeCurrencies[1]; 
        return tradeCurrencies[0] === "KRW";
      })

      setRederingCoinData(krwMarketData);
      setIsLoading(false);
      */