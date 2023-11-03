import connectedWallet from "@/web3Hooks/useConnectedWallet";
import Ununited from './components/Ununited'
import './index.scss'
import RandomNumberInformation from "./components/randomNumberInformation";
import RecentSubscription from "./components/RecentSubscription";
const Home = () => {
  // 获取地址，连接，断开钱包方法
  const { address } = connectedWallet.useContainer();
  return (
    <div className="home pc1200">
      <Ununited />
      {address && <>
        <RandomNumberInformation />
        <RecentSubscription />
      </>}
    </div>
  )
}

export default Home