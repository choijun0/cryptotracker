import React, { useState } from "react";
import {coinOhlcv} from "../../api";
import {useQuery} from "react-query";
import ApexChart from "react-apexcharts";

interface IChartProps {
  coinId?: string;
}


const Chart = ({coinId}: IChartProps) => {
  const {isLoading, data} = useQuery(`ohlcv/${coinId}`, () => coinOhlcv(coinId));

  const option = {
    chart: {
      height: 500,
      width: 500,
    }
  }

  const series = [
    {
      name: "test1",
      data,
    }
  ]


  return (
    <>
      {!isLoading ? <ApexChart type="candlestick" options={option} series={series}/> : null}
    </>
  )
}


export default Chart;