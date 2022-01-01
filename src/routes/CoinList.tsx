import React, {useEffect, useState} from "react"
import styled from "styled-components"
import {Link} from "react-router-dom"


const CoinImageURL = "https://cryptoicon-api.vercel.app/api/icon/"


const CoinPafrikaData = "https://api.coinpaprika.com/v1/coins";

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
  //const [rederingCoinData, setRederingCoinData] = useState<IupBitcoinsInfo[]>([]);
  const [coins, setCoins] = useState<IpafrikaInfo[]>();

  const [isLoading, setIsLoading] = useState<Boolean>(true);
  useEffect(()=> {
    (async () => {
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

      const response = await fetch(CoinPafrikaData);
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setIsLoading(false);
    })();
  },[])

  return (
    <>
      {isLoading ? "Loading Now.." : 
      <Container>
        {coins?.map(coin => {
          const coinSymbol = coin.symbol.toLowerCase();
          const linkTo = {
            pathname: `/${coin.id}`,
          }
          const linkState = {
            name: coin.name,
          }
          return (
            <Element key={coin.id}>
              <CoinImage bgSrc={CoinImageURL + coinSymbol} />
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