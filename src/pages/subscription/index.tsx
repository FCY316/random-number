import { Breadcrumb, Button, Input, Modal, Spin, Tooltip } from 'antd'
import right from '@/image/right.png'
import './index.scss'
import { useNavigate, useParams } from 'react-router-dom'
import SubscriptionInfo from './components/SubscriptionInfo'
import ConsumerContract from './components/ConsumerContract'
import Pending from './components/Pending'
import History from './components/History'
import { LoadingOutlined } from '@ant-design/icons'
import { useRef, useState } from 'react'
import useNotification from '@/hooks/useNotification'
import { isValidAddress0x } from '@/utils/validate'
import { useTranslation } from 'react-i18next'
import useCharge from '@/web3Hooks/useCharge'
import useMainNetworkCoin from '@/web3Hooks/useMainNetworkCoin'
import SpinC from '@/components/SpinC'
import { formatNumber } from '@/utils'
import useCancelSubscription from '@/web3Hooks/useCancelSubscription'
import useAddConsumer from '@/web3Hooks/useAddConsumer'
import useRemoveConsumer from '@/web3Hooks/useRemoveConsumer'
// laoding 图案
const antIcon = <LoadingOutlined style={{ fontSize: '15px' }} spin />;
const Subscription = () => {
    // ref用与将子组件的方法暴露给父组件
    const childRef = useRef<any>();
    const childRef2 = useRef<any>();
    console.log(childRef, childRef2);

    // 翻译
    const { t } = useTranslation()
    // 试用loading
    const [loading, setLoading] = useState(false)
    // 提示
    const { showNotification } = useNotification()
    // 打开控制弹窗展示什么 0-添加资金 1-取消订阅 2-添加消费者 3-删除消费者合约
    const [index, setIndex] = useState(0)
    // 输入的数量
    const [num, setNum] = useState('')
    // 输入资金返回地址
    const [returnAddress, setReturnAddress] = useState('')
    // 添加消费者地址
    const [addConsumers, setAddConsumer] = useState('')
    // 控制弹窗的开关
    const [isModalOpen, setIsModalOpen] = useState(false);
    // 初始化路由
    const navigate = useNavigate()
    // 获取路由传入的参数
    const { id } = useParams()
    // 获取主网币余额
    const { balance, getMainNetworkCoin, balanceLod } = useMainNetworkCoin()
    // 订阅详情事件成功刷新函数
    const infoSuccess = () => {
        // 关闭loading
        setLoading(false)
        // 关闭弹窗
        handleOk()
        // 重新获取主网币余额
        getMainNetworkCoin()
        // 调用子组件方法刷新数据
        childRef?.current?.getBatchSubscription()
    }
    // 订阅详情事件失败刷新函数
    const infoError = () => {
        // 关闭loading
        setLoading(false)
        // 关闭弹窗
        handleOk()
        // 重新获取主网币余额
        getMainNetworkCoin()
    }
    // 消费者地址事件成功刷新函数
    const consumerSuccess = () => {
        setLoading(false)
        handleOk()
    }
    // 消费者地址事件失败刷新函数
    const consumerError = () => {
        setLoading(false)
        handleOk()
    }
    // 充值
    const { charge } = useCharge(infoSuccess, infoError)
    // 移除订阅
    const { cancelSubscription } = useCancelSubscription(id, infoSuccess, infoError)
    // 添加消费者地址
    const { addConsumer } = useAddConsumer(consumerSuccess, consumerError)
    // 删除消费者地址
    const { removeConsumer } = useRemoveConsumer(() => {
        handleOk()
    }, () => {
        handleOk()
    })
    // 打开弹窗
    const showModal = (index: number) => {
        // 获取传入的弹窗展示index index是进行显示的重要参数
        setIndex(index)
        // 改变控制弹窗的参数
        setIsModalOpen(true);
    };
    // 关闭弹窗
    const handleOk = () => {
        setIsModalOpen(false);
        // 判断index，清空输入的参数,，3-删除消费者合约不需要输入任何东西
        if (index === 0) {
            setNum('')
        } else if (index === 1) {
            setReturnAddress('')
        } else if (index === 2) {
            setAddConsumer('')
        }
    };
    // 添加资金
    const addFunds = () => {
        // 判断输入是否大于0 .再判断输入是否大于余额
        if (Number(num) <= 0) {
            showNotification('warning', { message: t('subscription.theAdded0') })
        } else if (Number(num) > balance) {
            showNotification('warning', { message: t('subscription.theAddedNum') })
        } else {
            setLoading(true)
            if (id) charge(id, num)
        }
    }
    // 资金赎回
    const returnFunds = () => {
        // 判断地址是否正确
        if (!isValidAddress0x(returnAddress)) return showNotification('warning', { message: t('subscription.pleaseEnterTheCorrectAddress') })
        console.log('资金赎回地址', returnAddress);
        setLoading(true)
        cancelSubscription(returnAddress)
    }
    // 添加消费者地址
    const addConsumerF = () => {
        // 判断地址是否正确
        if (!isValidAddress0x(addConsumers)) return showNotification('warning', { message: t('subscription.pleaseEnterTheCorrectAddress') })
        console.log('添加消费者地址', addConsumer);
        setLoading(true)
        // 调用添加消费者地址函数
        addConsumer(id, addConsumers)
    }
    // 删除消费者
    const removeConsumerF = (address: string) => {
        // 删除消费者不需要填写参数 所以直接将函数传入子组件，参数直接有函数传来
        setLoading(true)
        console.log('address', address);
        showModal(3)
        removeConsumer(id, '0x6c25D6E3e3fc4d3dfA9B384027d9edC92f749c2e')
    }
    // 弹窗用到的
    const items = [
        { h1: t('subscription.addingFunds'), p: t('subscription.addFunds'), info: t('subscription.addFunds'), show: true, type: 'number', loadingText: t('subscription.addFunds2') },
        { h1: t('subscription.unsubscribe'), p: t('subscription.unsubscribe2'), info: t('subscription.fundReturnAddress'), show: false, type: 'text', loadingText: t('subscription.unsubscribe3') },
        { h1: t('subscription.addingConsumers'), p: t('subscription.addConsumer'), info: t('subscription.addConsumerAddress'), show: false, type: 'text', loadingText: t('subscription.addInConsumer') },
        { h1: t('subscription.deletingConsumers'), p: '--', info: '--', show: false, type: 'text', loadingText: "删除消费者中" }
    ]
    // input 输入的内容
    const inputs = [num, returnAddress, addConsumers]
    return (
        <div className='subscription pc1200'>
            <div className='subscription-breadcrumb'>
                <Breadcrumb
                    separator={<img className='subscription-breadcrumb-img' src={right} alt='' />}
                    items={[
                        {
                            title: <div onClick={() => { navigate('/') }} className='subscription-breadcrumb-home pointer'>{t('subscription.home')}</div>,
                        },
                        {
                            title: <div className='subscription-breadcrumb-id'>{t('subscription.subscription')}ID {id}</div>,
                        },
                    ]}
                />
            </div>
            <SubscriptionInfo showModal={showModal} id={id || ''} childRef={childRef} />
            <ConsumerContract showModal={showModal} removeConsumerF={removeConsumerF} childRef={childRef2} id={id || ''} />
            <Pending id={id || ''} />
            <History id={id || ''} />
            <Modal maskClosable={!loading} closeIcon={false} className='subscriptionInfo-modal' footer={[]} open={isModalOpen} onOk={handleOk} onCancel={handleOk}>
                {loading ? <>
                    <h1>{items[index].h1}</h1>
                    <p className='subscriptionInfo-modal-h'>{t('subscription.pleaseConfirmInYourWallet')}</p>
                    <div className='subscriptionInfo-modal-loading'> <Spin className='subscriptionInfo-modal-loading-icon' indicator={antIcon} />{items[index].loadingText}</div>
                </> : <>
                    <p className='subscriptionInfo-modal-title'>{items[index].p}</p>
                    <div className='subscriptionInfo-modal-info'>
                        <div>{items[index].info}</div>
                        {items[index].show && <div>{t('subscription.balance')}：
                            <Tooltip title={balance}>
                                <span className='pointer'>{balanceLod ? <SpinC /> : formatNumber(balance)}FIBO</span>
                            </Tooltip> </div>}
                    </div>
                    <Input
                        value={inputs[index]}
                        onChange={(e) => {
                            if (index === 0) {
                                setNum(e.target.value);
                            } else if (index === 1) {
                                setReturnAddress(e.target.value)
                            } else if (index === 2) {
                                setAddConsumer(e.target.value)
                            }
                        }} className='input no-spin-buttons' type={items[index].type} />
                    <div className='subscriptionInfo-modal-btn'>
                        <Button className='subscriptionInfo-modal-btn-one' onClick={handleOk} >{t('subscription.cancel')}</Button>
                        <Button onClick={() => {
                            if (index === 0) {
                                addFunds()
                            } else if (index === 1) {
                                returnFunds()
                            } else if (index === 2) {
                                addConsumerF()
                            }
                        }} className='btn subscriptionInfo-modal-btn-tow'>{t('subscription.confirm')}</Button>
                    </div>
                </>}
            </Modal>
        </div>
    )
}

export default Subscription