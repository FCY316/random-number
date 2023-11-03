import { Button, Input } from 'antd'
import './index.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isValidAddress0x } from '@/utils/validate'
import useNotification from '@/hooks/useNotification'
import { useTranslation } from 'react-i18next'
const AddConsumer = (props: { addConsumer: Function }) => {
    // 翻译
    const { t } = useTranslation()
    // 获取提示
    const { showNotification } = useNotification()
    // 初始化路由
    const navigate = useNavigate()
    // 合约地址
    const [contract, setContract] = useState('')
    const { addConsumer } = props
    // 获取输入的合约地址
    const getContract = (e: any) => {
        setContract(e.target.value)
    }
    // 提交
    const submit = () => {
        // 判断是不是ox地址
        if (!isValidAddress0x(contract)) {
            return showNotification('warning', { message: t('creation.pleaseContractAddress') })
        }
        addConsumer(contract)
    }
    return (
        <div className='addConsumer'>
            <h3>{t('creation.consumerContractAddress')}</h3>
            <Input onChange={getContract} className="input addConsumer-input" />
            <div className="addFunds-btn">
                <Button className="btn" onClick={submit} >{t('creation.addConsumer')}</Button>
                <Button className="btn" onClick={() => { navigate('/') }}>{t('creation.dealWithLater')}</Button>
            </div>
        </div>
    )
}

export default AddConsumer