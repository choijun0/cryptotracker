import React, {useEffect, useState} from "react"
import styled from "styled-components"


const CoinImageURL = "https://cryptoicon-api.vercel.app/api/icon/"

const CoinsDataURL = "https://api.coinpaprika.com/v1/coins";


//fetched Data
const LimitCount:number = 100;

interface coinsInfo {
  id:string;
  name:string;
  symbol:string;
  rank:number;
  is_new:boolean;
  is_active:boolean;
  type:string;
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
background-color: white;
display: flex;
height : 25px;
width: 100%;
border-radius: 12.5px 0px 0px 12.5px;
align-items: center;

`
const CoinImage = styled.img`
display: inline-block;
height : 100%;
width : 25px
borderRadius : 12.5px;
overflow: hidden;
`

const CoinName = styled.span`
font-size: 16px;
padding-bottom : 2px;
display: inline-block;
`



const CoinList = () => {
  const [coinData, setCoinData] = useState<coinsInfo[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  useEffect(()=> {
    (async () => {
      const response = await fetch(CoinsDataURL);
      const dataList = await response.json();
      const limitedData = dataList.slice(0, LimitCount);
      setCoinData(limitedData);
      setIsLoading(false);
    })();
  },[])
  return (
    <>
      {isLoading ? "Loading Now.." : 
      <Container>
        {coinData.map(coin => (
          <Element>
            <CoinImage src={CoinImageURL + coin.symbol.toLowerCase()}/>
            <CoinName>{coin.name.toUpperCase()}</CoinName>
          </Element>))}
      </Container>}
    </>
  )
}

export default CoinList;