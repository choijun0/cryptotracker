import React from "react";
import styled from "styled-components";
import {useSetRecoilState} from "recoil"
import {isDarkMode} from "./Atom"
import SearchCoin from "./routes/nestedRoutes/searchCoin"


const Box = styled.div`
display: flex;
position: fixed;
top: 0px;
height: 20px;
width: 100%;
background-color ${props => props.theme.headerBgColor};
`

const Toggle = styled.button`
height: 100%;
width: 20px;
margin-left: auto;
`


const Header = () => {
  const setState = useSetRecoilState(isDarkMode);
  const toggle = () => setState(prev => !prev)
  return (
    <Box>
      <SearchCoin />
      <Toggle onClick={toggle}/>
    </Box>
  )
}

export default Header;