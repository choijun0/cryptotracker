import Router from "./Router"
import GlobalStyle from "./GlobalStyle"
import styled from "styled-components"


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
    </Box>
  );
}

export default App;
