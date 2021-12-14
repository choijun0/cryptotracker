import ReactDOM from "react-dom";
import React from 'react';
import App from './App';
import {ThemeProvider} from "styled-components"       
import {theme} from "./theme"


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


