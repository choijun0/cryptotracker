import {BrowserRouter, Routes, Route} from "react-router-dom"
import CoinInfo from "./routes/CoinInfo"
import CoinList from "./routes/CoinList"
import Chart from "./routes/nestedRoutes/chart"
import Price from "./routes/nestedRoutes/price"

const Router = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CoinList />}></Route>
        <Route path=":coinId/*" element={<CoinInfo />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;