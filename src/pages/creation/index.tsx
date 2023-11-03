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
// laoding 图案
const antIcon = <LoadingOutlined style={{ fontSize: '15px' }} spin />;

const Creation = () => {
    // 翻译
    const { t } = useTranslation()
    // 步骤条
    const [current, setCurrent] = useState(0)
    // 控制弹窗的开关
    const [isModalOpen, setIsModalOpen] = useState(false);
    // 获取用户地址
    const { address } = useConnectedWallet.useContainer()
    // 打开弹窗
    const showModal = () => {
        setIsModalOpen(true);
    };
    // 关闭弹窗
    const handleOk = () => {
        setIsModalOpen(false);
    };
    // 创建订阅函数
    const createSubscription = () => {
        // 打开弹窗
        showModal()
        // 默认3秒后消失进入下一页
        setTimeout(() => {
            handleOk()
            setCurrent(current + 1)
        }, 3000);
    }
    // 添加资金
    const addFunds = (sum: string) => {
        console.log(sum);
        // 打开弹窗
        showModal()
        setTimeout(() => {
            handleOk()
            setCurrent(current + 1)
        }, 3000);
    }
    // 添加消费者合约
    const addConsumer = (contract: string) => {
        console.log(contract);
        // 打开弹窗
        showModal()
        setTimeout(() => {
            handleOk()
        }, 3000);
    }
    // 该展示的页面，与步骤条同步
    const children: any[] = [
        <CreateSubscription createSubscription={createSubscription} address={address} />,
        <AddFunds addFunds={addFunds} next={() => { setCurrent(current + 1) }} />,
        <AddConsumer addConsumer={addConsumer} />
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