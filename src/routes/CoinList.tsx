import React, { useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { useQuery } from "react-query"
import { coinList } from "../api"
import { Helmet } from "react-helmet";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { search_query_manager, isSearching } from "../Atom";

import Coin from "./Coin"


const CoinsUpbitData = "https://api.upbit.com/v1/market/all";

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
  const searching = useRecoilValue(isSearching);
  const query = useRecoilValue(search_query_manager);

  //prevent overlapping searching
  const [current_query, set_query] = useState("");
  const [current_list, set_list] = useState<IpafrikaInfo[]>([]);

  const find_coin = (arr: IpafrikaInfo[], query: any) => {
    /*
    if(current_query !== "" && query.includes(current_query)) {
      console.log("same searcing context")
      searching_list = current_list;
    }
    */
    return arr.filter((element) => check(element, query));
  }

  return (
    <>
      <Helmet>
        <title>{`CoinList`}</title>
      </Helmet>
      {isLoading ? "Loading Now.." :
        <Container>
          {
            searching&&data!== undefined ? find_coin(data, query).map((coin) => <Coin coin={coin} />) : data?.slice(0, 100).map(coin => <Coin coin={coin} />)
          }
        </Container>}
    </>
  )
}

export default CoinList;