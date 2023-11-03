import { mobileHidden } from "@/utils"
import { Input, Button } from "antd"
import { useTranslation } from "react-i18next"
import './index.scss'
// 创建订阅
/*
  传入参数：
  address:地址
  createSubscription:创建订阅函数
*/
const CreateSubscription = (props: { address: string, createSubscription: Function }) => {
    // 翻译
    const { t } = useTranslation()
    const { address, createSubscription } = props
    return <div className='createSubscription'>
        <div className='createSubscription-title'>{t('creation.createSubscription')}</div>
        <p>{t('creation.createSubscriptionText')}</p>
        <Input className='input' disabled={true} value={mobileHidden(address, 20, 15)} />
        <Button onClick={() => { createSubscription() }} className='createSubscription-btn btn'>{t('creation.createSubscription')}</Button>
    </div>
}
export default CreateSubscription