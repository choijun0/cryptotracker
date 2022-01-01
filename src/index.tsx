import ReactDOM from "react-dom";
import React from 'react';
import App from './App';
import {ThemeProvider} from "styled-components"       
import {theme} from "./theme"
import { QueryClient, QueryClientProvider } from "react-query"

const client = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={client} >
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


