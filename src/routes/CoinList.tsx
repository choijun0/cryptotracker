import React, { useState, useRef} from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { useQuery } from "react-query"
import { coinList } from "../api"
import { Helmet } from "react-helmet";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { search_query, isSearching } from "../Atom";

import Coin from "./Coin"


//fetch data
interface IpafrikaInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
}

//Coin Container
const Container = styled.div`
padding: 0px 20px;
max-width: 480px;
margin: 0 auto;
display : flex;
justify-content: center;
flex-direction: column;
`

//checking between query and coin 
export const check = (coin: IpafrikaInfo, query: any) => {
  const length = query.length;
  const sliced_coinName = coin.name.slice(0, length);
  const sliced_coinSymbol = coin.symbol.slice(0, length);
  return query.toLowerCase() === sliced_coinName.toLowerCase() || query.toLowerCase() === sliced_coinSymbol.toLowerCase();
}

//Component
const CoinList = () => {
  const { isLoading, data } = useQuery<IpafrikaInfo[]>("coinList", coinList);
  const searching = useRecoilValue(isSearching); //Updating when search_query is changing
  const query = useRecoilValue(search_query);

  //prevent overlapping searching
  const current_query_ref = useRef("");
  const current_list_ref = useRef<IpafrikaInfo[]>([]);

  const find_coin = (arr: IpafrikaInfo[], query: any) => {
    const cq = current_query_ref.current;
    const cl = current_list_ref.current;
    let searching_list = arr;
    if(cq !== "" && query.includes(cq)) {
      searching_list = cl;
    }
    console.log(searching_list.length)
    const new_Arr = searching_list.filter((element) => check(element, query))
    current_query_ref.current = query;
    current_list_ref.current = new_Arr;
    return new_Arr;
  }

  return (
    <>
      <Helmet>
        <title>{`CoinList`}</title>
      </Helmet>
      {isLoading ? "Loading Now.." :
        <Container>
          {
            searching&&data!== undefined ? find_coin(data, query).map((coin) => <Coin key={coin.id} coin={coin} />) : data?.slice(0, 100).map(coin => <Coin key={coin.id} coin={coin} />)
          }
        </Container>}

    </>
  )
}

export default CoinList;