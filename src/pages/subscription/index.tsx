import { Breadcrumb, Button, Input, Modal, Spin, Tooltip } from 'antd'
import right from '@/image/right.png'
import './index.scss'
import { useNavigate, useParams } from 'react-router-dom'
import SubscriptionInfo from './components/SubscriptionInfo'
import ConsumerContract from './components/ConsumerContract'
import Pending from './components/Pending'
import History from './components/History'
import { LoadingOutlined } from '@ant-design/icons'
import { useState } from 'react'
import useNotification from '@/hooks/useNotification'
import { isValidAddress0x } from '@/utils/validate'
// laoding 图案
const antIcon = <LoadingOutlined style={{ fontSize: '15px' }} spin />;
const Subscription = () => {
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
    const [addConsumer, setAddConsumer] = useState('')
    // 控制弹窗的开关
    const [isModalOpen, setIsModalOpen] = useState(false);
    // 初始化路由
    const navigate = useNavigate()
    // 获取路由传入的参数
    const { id } = useParams()
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
        console.log('添加资金', num);
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            handleOk()
        }, 3000);
    }
    // 资金赎回
    const returnFunds = () => {
        // 判断地址是否正确
        if (!isValidAddress0x(returnAddress)) return showNotification('warning', { message: "请输入正确的地址" })
        console.log('资金赎回地址', returnAddress);
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            handleOk()
        }, 3000);
    }
    // 添加消费者地址
    const addConsumerF = () => {
        // 判断地址是否正确
        if (!isValidAddress0x(addConsumer)) return showNotification('warning', { message: "请输入正确的地址" })
        console.log('添加消费者地址', addConsumer);
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            handleOk()
        }, 3000);
    }
    // 删除消费者
    const removeConsumerF = (address: string) => {
        // 删除消费者不需要填写参数 所以直接将函数传入子组件，参数直接有函数传来
        setLoading(true)
        console.log('address', address);
        showModal(3)
        setTimeout(() => {
            handleOk()
        }, 3000);
    }
    // 弹窗用到的
    const items = [
        { h1: '正在添加资金', p: '添加资金', info: '添加资金', show: true, type: 'number', loadingText: "添加资金中" },
        { h1: '正在取消订阅', p: '取消订阅', info: '资金返回地址', show: false, type: 'text', loadingText: "取消订阅中" },
        { h1: '正在添加消费者', p: '添加消费者', info: '添加消费者地址', show: false, type: 'text', loadingText: "添加消费者中" },
        { h1: '正在删除消费者', p: '--', info: '--', show: false, type: 'text', loadingText: "删除消费者中" }
    ]
    // input 输入的内容
    const inputs = [num, returnAddress, addConsumer]
    return (
        <div className='subscription pc1200'>
            <div className='subscription-breadcrumb'>
                <Breadcrumb
                    separator={<img className='subscription-breadcrumb-img' src={right} alt='' />}
                    items={[
                        {
                            title: <div onClick={() => { navigate('/') }} className='subscription-breadcrumb-home pointer'>首页</div>,
                        },
                        {
                            title: <div className='subscription-breadcrumb-id'>订阅ID {id}</div>,
                        },
                    ]}
                />
            </div>
            <SubscriptionInfo showModal={showModal} id={id || ''} />
            <ConsumerContract showModal={showModal} removeConsumerF={removeConsumerF} id={id || ''} />
            <Pending id={id || ''} />
            <History id={id || ''} />
            <Modal maskClosable={!loading} closeIcon={false} className='subscriptionInfo-modal' footer={[]} open={isModalOpen} onOk={handleOk} onCancel={handleOk}>
                {loading ? <>
                    <h1>{items[index].h1}</h1>
                    <p className='subscriptionInfo-modal-h'>请在钱包中进行确认</p>
                    <div className='subscriptionInfo-modal-loading'> <Spin className='subscriptionInfo-modal-loading-icon' indicator={antIcon} />{items[index].loadingText}</div>
                </> : <>
                    <p className='subscriptionInfo-modal-title'>{items[index].p}</p>
                    <div className='subscriptionInfo-modal-info'>
                        <div>{items[index].info}</div>
                        {items[index].show && <div>余额：
                            <Tooltip title="prompt text">
                                <span className='pointer'>10.21…FIBO</span>
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
                        <Button className='subscriptionInfo-modal-btn-one' onClick={handleOk} >取消</Button>
                        <Button onClick={() => {
                            if (index === 0) {
                                addFunds()
                            } else if (index === 1) {
                                returnFunds()
                            } else if (index === 2) {
                                addConsumerF()
                            }
                        }} className='btn subscriptionInfo-modal-btn-tow'>确定</Button>
                    </div>
                </>}
            </Modal>
        </div>
    )
}

export default Subscription