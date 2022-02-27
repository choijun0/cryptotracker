import Router from "./Router"
import {BrowserRouter} from "react-router-dom"
import GlobalStyle from "./GlobalStyle"
import styled from "styled-components"
import { ReactQueryDevtools } from "react-query/devtools";
import {darkMode, defaultMode} from "./theme"
import {ThemeProvider} from "styled-components"    
import {useRecoilValue} from 'recoil';
import {isDarkMode} from "./Atom"
import {QueryClientProvider} from "react-query"
import {queryClient} from "./queryClient"

import Header from "./Header"

const Box = styled.div`
  display: block;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border: none;
  margin-top: 20px;
`

const App = () => {
  const modeState = useRecoilValue(isDarkMode)
  return (
    <>
      <BrowserRouter>
      <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={modeState ? darkMode : defaultMode}>
        <Header />
        <Box>
          <GlobalStyle />
          <Router />
          <ReactQueryDevtools initialIsOpen={true}/>
        </Box>
      </ThemeProvider>
      </QueryClientProvider>
      </BrowserRouter>
    </>  
  );
}

export default App;
