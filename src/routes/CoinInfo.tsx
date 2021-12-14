import { useEffect, useState } from "react";
import {useLocation, useParams} from "react-router"
import axios from "axios"
import { setInterval } from "timers/promises";
import { setIntervalAsync } from "set-interval-async/dynamic";

interface IRouterState {
  state: {
    market: string,
    name: string,
  }
}

interface IPricePerMinute {
    market: string;
    lcandle_date_time_utc: string;
    candle_date_time_kst: string;
    opening_price: number;
    high_price: number;
    low_price: number;
    trade_price: number;
    timestamp: number;
    candle_acc_trade_price: number;
    candle_acc_trade_volume: number;
    unit: number;
}


const pricePerMinute =  "https://api.upbit.com/v1/candles/minutes/"; //+unit(interval minute)
const updateInterval: number = 1;


const CoinInfo = () => {
  const {state} = useLocation() as IRouterState;
  const [priceData, setPriceData] = useState<IPricePerMinute>();

  /*
  const [infoData, setInfoData] = useState();
  const [priceData, setPriceData] = useState();
  */
  useEffect(() => {
    (async () => {
      const fetchedData: IPricePerMinute= await axios.get(pricePerMinute + updateInterval, {
        params: {
          market: state.market,
          count: 1,
        }
      }).then(res => res.data[0])
      setPriceData(fetchedData);
    })()
  }
, [])

  return <h1>{priceData?.trade_price}</h1>
}

export default CoinInfo;