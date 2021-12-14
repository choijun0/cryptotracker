import {useParams} from "react-router"


const CoinInfo = () => {
  const params = useParams();
  console.log(params);
  return <h1>coins</h1>
}

export default CoinInfo;