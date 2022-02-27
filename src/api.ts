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



interface IOhlcvFetchData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
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

  return fetch(`${BaseUrl}coins/${coinId}/ohlcv/historical?${queryString}`).then(res => res.json()).then(res => res.map((data: IOhlcvFetchData) => [new Date(data.time_close).getTime(), [data.open, data.high, data.low, data.close]]));
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