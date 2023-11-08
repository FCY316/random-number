import { Tooltip } from 'antd'
import './index.scss'
import { useCallback, useImperativeHandle } from 'react'
import copy from '@/image/copy.png'
import remove from '@/image/remove.png'
import add from '@/image/add.png'
import useHandleCopyClick from '@/hooks/useHandleCopyClick'
import { formatNumber, formatTimeToStr, mobileHidden } from '@/utils'
import Tables from '@/components/Tables'
import { useTranslation } from 'react-i18next'
import useGetBatchSubscription from '@/web3Hooks/useGetBatchSubscription'
import connectedWallet from '@/web3Hooks/useConnectedWallet'

const ConsumerContract = (props: { id: string, showModal: Function, removeConsumerF: Function, childRef: any }) => {
    const { showModal, removeConsumerF, id, childRef } = props
    // 翻译
    const { t } = useTranslation()
    // 复制
    const { handleCopyClick } = useHandleCopyClick()
    // 获取地址
    const { address } = connectedWallet.useContainer();
    // 获取订阅消息
    const { getBatchSubscriptionLod, batchSubscription, getBatchSubscription } = useGetBatchSubscription(id, 1)
    console.log('batchSubscription', batchSubscription);
    // 在子组件中定义需要暴露给父组件的方法
    useImperativeHandle(childRef, () => ({
        getBatchSubscription
    }));
    // table 头部以及内容区域的样式和格式,使用useCallback缓存起来
    const columns = useCallback(() => {
        return [
            {
                title: t('subscription.administratorAddress'),
                dataIndex: 'administrator',
                render: (administrator: string) => {
                    return <div className='tables-context-copy'>
                        {mobileHidden(administrator, 5, 4)}
                        <img className='pointer' onClick={() => { handleCopyClick(administrator) }} src={copy} alt="" />
                    </div>
                }
            },
            {
                title: t('subscription.addTime'),
                dataIndex: 'addTime',
                render: (addTime: string) => {
                    return formatTimeToStr(Number(addTime) * 1000, '.', ':', 'm')
                }
            },
            {
                title: t('subscription.requestSuccess'),
                dataIndex: 'request',
            },
            {
                title: `${t('subscription.totalCost')}（FIBO）`,
                dataIndex: 'cost',
                render: (cost: number) => {
                    return <Tooltip placement="top" title={cost}>
                        {formatNumber(cost)}
                    </Tooltip>
                }
            }, {
                title: t('subscription.operate'),
                dataIndex: 'operate',
                render: (operate: any) => {
                    return <img onClick={() => { removeConsumerF('0x675D6c9eF24109a5524cF6f8a3c27771149C172A') }} className='pointer tables-context-remove' src={remove} alt="" />
                }
            }
        ];

    }, [handleCopyClick, removeConsumerF, t])
    return (
        <div className='consumerContract'>
            <div className='consumerContract-header'>
                <span className='consumerContract-header-left'>{t('subscription.consumerContract2')}</span>
                {batchSubscription[0]?.owner === address && <div onClick={() => { showModal(2) }} className='consumerContract-header-right pointer'>
                    <img className='pointer' src={add} alt="" />
                    {t('subscription.addConsumer')}
                </div>}
            </div>
            <Tables loading={getBatchSubscriptionLod} columns={columns()} data={batchSubscription[0]?.consumers} keys={''} />
        </div>
    )
}

export default ConsumerContract