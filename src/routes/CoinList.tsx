import React, {useEffect, useState} from "react"
import styled from "styled-components"
import {Link} from "react-router-dom"
import {useQuery} from "react-query"
import {coinList} from "../api"
import { Helmet } from "react-helmet";
import {useRecoilValue} from "recoil";
import {isSearching} from "../Atom"


const CoinsUpbitData = "https://api.upbit.com/v1/market/all";

//fetch data
interface IupBitcoinsInfo {
  market: string; 
  korean_name: string;
  english_name: string;
  symbol: string;
}

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
const Element = styled.div`
margin-top : 2px;
background-color: ${props => props.theme.elementColor};
display: flex;
height : 25px;
width: 100%;
border-radius: 12.5px 0px 0px 12.5px;
align-items: center;

`
interface IcoinImageProps {
  bgSrc:string;
}

const CoinImage = styled.div<IcoinImageProps>`
background: no-repeat center/105% url(${props => props.bgSrc});
background-color: ${props => props.theme.notLoadedColor};
display: inline-block;
height: 100%;
width: 25px;
overflow: hidden;
border-radius: 12.5px;
border: solid;
border-width: 1.25px;
border-color: black;
`

const CoinLink = styled(Link)`
  
`

const CoinName = styled.span`
padding-left: 5px;
font-size: 16px;
padding-bottom : 2px;
display: inline-block;
`

const CoinImageURL = "https://cryptoicon-api.vercel.app/api/icon/"

const CoinList = () => {
  const {isLoading, data} = useQuery<IpafrikaInfo[]>("coinList", coinList);
  //coin query
  const searchingData = useRecoilValue(isSearching); 
  
  return (
    <>
      <Helmet>
        <title>{`CoinList`}</title>
      </Helmet>
      {isLoading ? "Loading Now.." : 
      <Container>
        {data?.slice(0, 100).map(coin => {
          if(searchingData){
            const length = searchingData.length;
            const sliced_coinName = coin.name.slice(0, length);
            if(searchingData.toLowerCase() !== sliced_coinName.toLowerCase()){
              return;
            }
          }
          const linkTo = {
            pathname: `/${coin.id}`,
          }
          const linkState = {
            name: coin.name,
          }
          return (
            <Element key={coin.id}>
              <CoinImage bgSrc={CoinImageURL + coin.symbol.toLowerCase()} />
              <CoinLink to={linkTo} state={linkState}>
                <CoinName>{coin.name}</CoinName>
              </CoinLink>
            </Element>
            )
          }
        )}
      </Container>}
    </>
  )
}

export default CoinList;