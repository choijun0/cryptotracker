import { useEffect, useState } from "react";
import {useLocation, useParams} from "react-router"
import {Routes, Route, Outlet, Link, useMatch} from "react-router-dom"
import axios from "axios"
import { setInterval } from "timers/promises";
import { setIntervalAsync } from "set-interval-async/dynamic";
import styled from "styled-components"

import Chart from "./nestedRoutes/chart" 
import Price from "./nestedRoutes/price"


interface IRouterState {
  state: {
    name: string,
  }
}

interface IRouterParams {
  coinId: string;
}

interface IparentRoute {
  state: IRouterState;
  coinId: IRouterParams;
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


interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

//Upbit
const pricePerMinute =  "https://api.upbit.com/v1/candles/minutes/"; //+unit(interval minute)
const updateInterval: number = 1;

//StyledComponents 
const MainContainer = styled.div`
display: flex;
flex-direction: column;
max-width: 480px;
margin: 0 auto;
padding: 0px 20px;
`
const Name = styled.div`
display: flex;
width: 100%;
& div:nth-child(1){
  position: absolute;
  margin-right: auto;
}
& div:nth-child(2){
  margin: 0 auto;
}
`

const Tab = styled.span<{ isActive: Boolean; }>`
 color: ${props => {
   if(props.isActive){
     return props.theme.accentColor;
   } 
   else {
     return props.theme.textColor;
   }
 }}
`


const CoinInfo = () => {
  const {state} = useLocation() as IRouterState;
  const {coinId} = useParams();
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  //coinPafrik  a
  const [info, setInfo] = useState<InfoData>() 
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  //Upbit
  const [upBit, setUpbit] = useState<IPricePerMinute>();

  //RouterMatch

  const isChart = useMatch("/:coinId/chart");
  const isPrice = useMatch("/:coinId/price");

  useEffect(() => {
    console.log("component mounted");
    (async () => {
      //CoinPafrika
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();

      setInfo(infoData);
      setPriceInfo(priceData);

      //Upbit
      /*
      const fetchedData: IPricePerMinute= await axios.get(pricePerMinute + updateInterval, {
        params: {
          market: state.market,
          count: 1,
        }
      }).then(res => res.data[0])
      setUpbit(fetchedData);
      */


      setIsLoading(false);
    })()
  }
, [coinId]) //latest react hooks encourage to fulfill the [].

  return (
    <>
      <MainContainer>
        <Name>
          <div>{info?.rank}</div>
          <div>{state?.name ? state.name : isLoading ? "isLoading..." : info?.name}</div>
        </Name>
        <nav>
          <Tab isActive={isChart !== null}>
            <Link to="chart">Chart</Link>
          </Tab>
          <Tab isActive={isPrice !== null}>
            <Link to="price">Price</Link>
          </Tab>
        </nav>
        <Outlet />
      </MainContainer>
    </>
  )
}

export default CoinInfo;