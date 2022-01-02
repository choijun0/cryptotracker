import Router from "./Router"
import GlobalStyle from "./GlobalStyle"
import styled from "styled-components"
import { ReactQueryDevtools } from "react-query/devtools";


const Box = styled.div`
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border: none;
`

const App = () => {
  return (
    <Box>
      <GlobalStyle />
      <Router />
      <ReactQueryDevtools initialIsOpen={true}/>
    </Box>
  );
}

export default App;
