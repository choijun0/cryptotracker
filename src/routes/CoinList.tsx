import React, {useEffect, useState} from "react"
import styled from "styled-components"
import {Link} from "react-router-dom"


const CoinImageURL = "https://cryptoicon-api.vercel.app/api/icon/"

const CoinsDataURL = "https://api.upbit.com/v1/market/all";

//fetch data
interface coinsInfo {
  market: string; 
  korean_name: string;
  english_name: string;
  symbol: string;
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
background-color: ${props => props.theme.defaultWhiteColor};
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

const CoinList = () => {
  const [rederingCoinData, setRederingCoinData] = useState<coinsInfo[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  useEffect(()=> {
    (async () => {
      const response = await fetch(CoinsDataURL);
      const dataList:coinsInfo[] = await response.json();
      const krwMarketData = dataList.filter(data => {
        const tradeCurrencies = data.market.split("-");
        data.symbol = tradeCurrencies[1]; 
        return tradeCurrencies[0] === "KRW";
      })
      setRederingCoinData(krwMarketData);
      setIsLoading(false);
    })();
  },[])

  return (
    <>
      {isLoading ? "Loading Now.." : 
      <Container>
        {rederingCoinData.map(coin => {
          const coinSymbol = coin.symbol.toLowerCase();
          const linkTo = {
            pathname: `/${coinSymbol}`,
          }
          const linkState = {
            market: coin.market,
            name: coin.english_name,
          }
          return (
            <Element key={coin.english_name}>
              <CoinImage bgSrc={CoinImageURL + coinSymbol} />
              <CoinLink to={linkTo} state={linkState}>
                <CoinName>{coin.korean_name}</CoinName>
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