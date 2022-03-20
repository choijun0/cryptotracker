import React from "react";
import styled from "styled-components"
import {Link} from "react-router-dom"


interface IpafrikaInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
}


interface IcoinImageProps {
  bgSrc:string;
}


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

const Coin = ({coin} : any) => {
  const linkTo = {
    pathname: `/${coin.id}`,
  }
  const linkState = {
    name: coin.name,
  }
  return (
    <Element>
      <CoinImage bgSrc={CoinImageURL + coin.symbol.toLowerCase()} />
        <CoinLink to={linkTo} state={linkState}>
        <CoinName>{coin.name}</CoinName>
      </CoinLink>
    </Element>
  )         
}

export default Coin;