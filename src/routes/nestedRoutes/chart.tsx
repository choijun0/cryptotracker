import React, { useEffect } from "react"
import {coinOhlcv} from "../../api"
import {useQuery} from "react-query";

interface IChartProps {
  coinId?: string;
}

const Chart = ({coinId}: IChartProps) => {
  const {isLoading, data} = useQuery(`ohlcv/${coinId}`, () => coinOhlcv(coinId));

  if(!isLoading){
    console.log(data);
  }

  return (
    <>
      <h1>차트!</h1>
    </>
  )
}


export default Chart;