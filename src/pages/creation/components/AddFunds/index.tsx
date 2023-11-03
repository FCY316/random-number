import { useTranslation } from "react-i18next"
import './index.scss'
import { Button, Input, Tooltip } from "antd"
import useMainNetworkCoin from "@/web3Hooks/useMainNetworkCoin"
import { formatNumber, formatUnits } from "@/utils"
import SpinC from "@/components/SpinC"
import { useState } from "react"
import useNotification from "@/hooks/useNotification"
// 添加资金
const AddFunds = (props: { addFunds: Function, next: Function }) => {
    const { addFunds, next } = props
    // 获取提示
    const { showNotification } = useNotification()
    // 输入的金额
    const [sum, setSum] = useState(0)
    // 获取余额
    const { balance, usedBalance } = useMainNetworkCoin()
    // 翻译
    const { t } = useTranslation()
    // 获取输入的金额
    const getSum = (e: any) => {
        setSum(e.target.value)
    }
    // 提交
    const submit = () => {
        if (sum <= 0) {
            return showNotification('warning', { message: t('creation.theAdded0') })
        }
        addFunds(sum)
    }
    return <div className="addFunds">
        <div className="addFunds-title">
            <div>{t('creation.addFunds')}</div>
            <div>
                <span> {t('creation.balance')}：</span>
                {usedBalance ?
                    < SpinC lineHeight={'2'} />
                    :
                    <Tooltip title={formatUnits(balance)}>
                        {formatNumber(formatUnits(balance))}
                    </Tooltip>
                }FIBO
            </div>

        </div>
        <Input onChange={getSum} className="input addFunds-input no-spin-buttons" type="number" />
        <div className="addFunds-btn">
            <Button className="btn" onClick={() => { submit() }}>{t('creation.addFunds')}</Button>
            <Button className="btn" onClick={() => { next() }}>{t('creation.dealWithLater')}</Button>
        </div>
    </div>
}
export default AddFunds