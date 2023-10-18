import changeLocalStorage from "@/hooks/useChangeLocalStorage";
import connectedWallet from "@/web3Hooks/useConnectedWallet";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import cnbanner from '@/image/cnbanner.png'
import enbanner from '@/image/enbanner.png'
import './index.scss'
// 未连接钱包的展示
const Ununited = () => {
  const { language } = changeLocalStorage.useContainer()
  // 翻译
  const { t } = useTranslation()
  // 获取连接钱包方法
  const { connected, address } = connectedWallet.useContainer();
  return (
    <div>
      <div className='ununited'>
        <img src={language === 'cn' ? cnbanner : enbanner} alt="" />
      </div>
      <Button onClick={() => { connected() }} className='btn ununited-btn'>{address ? t('home.createSubscription') : t('home.connectedWallet')}</Button>
    </div>
  )
}
export default Ununited