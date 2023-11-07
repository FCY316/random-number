import { ConfigProvider, Modal, Spin, Steps } from 'antd'
import './index.scss'
import Return from '@/components/Return'
import { useState } from 'react'
import useConnectedWallet from '@/web3Hooks/useConnectedWallet'
import { LoadingOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import CreateSubscription from './components/CreateSubscription'
import AddFunds from './components/AddFunds'
import AddConsumer from './components/AddConsumer'
import useCreateSubscription from '@/web3Hooks/useCreateSubscription'
import useCharge from '@/web3Hooks/useCharge'
import useAddConsumer from '@/web3Hooks/useAddConsumer'
import { useNavigate } from 'react-router-dom'
// laoding 图案
const antIcon = <LoadingOutlined style={{ fontSize: '15px' }} spin />;

const Creation = () => {
    const navigate = useNavigate()
    // 翻译
    const { t } = useTranslation()
    // 步骤条
    const [current, setCurrent] = useState(1)
    // 控制弹窗的开关
    const [isModalOpen, setIsModalOpen] = useState(false);
    // 获取用户地址
    const { address } = useConnectedWallet.useContainer()
    // 创建订阅
    const { createSubscription, subId } = useCreateSubscription(() => {
        handleOk()
        setCurrent(current + 1)
    }, () => {
        handleOk()
    })
    // 充值
    const { charge } = useCharge(() => {
        handleOk()
        setCurrent(current + 1)
    }, () => {
        handleOk()
    })
    // 添加消费者地址
    const { addConsumer } = useAddConsumer(() => {
        handleOk()
        navigate('/')
    }, () => {
        handleOk()
    })
    // 打开弹窗
    const showModal = () => {
        setIsModalOpen(true);
    };
    // 关闭弹窗
    const handleOk = () => {
        setIsModalOpen(false);
    };
    // 创建订阅函数
    const createSubscriptionF = () => {
        // 打开弹窗
        showModal()
        // 创建订阅
        createSubscription()
    }
    // 添加资金
    const addFunds = (sum: string) => {
        console.log(sum);
        // 打开弹窗
        showModal()
        // 执行充值函数
        charge(subId, sum)
    }
    // 添加消费者合约
    const addConsumerF = (contract: string) => {
        console.log(contract);
        // 打开弹窗
        showModal()
        // 调用添加消费者地址函数
        addConsumer(subId, contract)
    }
    // 该展示的页面，与步骤条同步
    const children: any[] = [
        <CreateSubscription createSubscription={createSubscriptionF} address={address} />,
        <AddFunds addFunds={addFunds} next={() => { setCurrent(current + 1) }} />,
        <AddConsumer addConsumer={addConsumerF} />
    ]
    // 步骤天的数据，弹窗也会用到
    const items = [
        { title: t('creation.createSubscription'), text: t('creation.creating') },
        { title: t('creation.addFunds'), text: t('creation.adding') },
        { title: t('creation.addConsumer'), text: t('creation.adding') },
    ]
    return (
        <div className='creation pc1200'>
            <ConfigProvider
                theme={{
                    components: {
                        Steps: {
                            controlItemBgActive: '#F0F0F0',
                            colorPrimary: "#373737",
                            marginSM: 5,
                            fontSize: 12,
                            iconSizeSM: 18
                        }
                    }
                }}>
                <Return text={t('creation.homePage')} />
                <Steps
                    className='creation-steps'
                    responsive={false}
                    labelPlacement="vertical"
                    size="small"
                    current={current}
                    items={items}
                />
                {children[current]}
                <Modal maskClosable={false} closeIcon={false} className='creation-modal' footer={[]} open={isModalOpen} onOk={handleOk} onCancel={handleOk}>
                    <h1>{items[current].title}</h1>
                    <p>{t('creation.pleaseConfirmInYourWallet')}</p>
                    <div className='creation-modal-loading'> <Spin className='creation-modal-loading-icon' indicator={antIcon} />{items[current].text}</div>
                </Modal>
            </ConfigProvider>
        </div>
    )
}


export default Creation