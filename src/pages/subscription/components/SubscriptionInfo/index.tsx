import { Button, Tooltip } from 'antd'
import yremove from '@/image/yremove.png'
import './index.scss'
import State from '@/components/State'
import { formatNumber, formatUnits, mobileHidden } from '@/utils'
import copy from '@/image/copy.png'
import useHandleCopyClick from '@/hooks/useHandleCopyClick'
import { memo, useCallback, useImperativeHandle } from 'react'
import Tables from '@/components/Tables'
import { useTranslation } from 'react-i18next'
import useGetBatchSubscription from '@/web3Hooks/useGetBatchSubscription'
import connectedWallet from '@/web3Hooks/useConnectedWallet'

const SubscriptionInfo = (props: { id: string, showModal: Function, childRef: any }) => {
  const { showModal, id, childRef } = props
  // 获取地址
  const { address } = connectedWallet.useContainer();
  // 复制
  const { handleCopyClick } = useHandleCopyClick()
  // 翻译
  const { t } = useTranslation()
  // 获取订阅消息
  const { getBatchSubscriptionLod, batchSubscription, getBatchSubscription } = useGetBatchSubscription(id, 1)
  // 在子组件中定义需要暴露给父组件的方法
  useImperativeHandle(childRef, () => ({
    getBatchSubscription
  }));

  // table 头部以及内容区域的样式和格式,使用useCallback缓存起来
  const columns = useCallback(() => {
    return [
      {
        title: t('subscription.state'),
        dataIndex: 'active',
        render: (active: number | boolean) => {
          return <><State state={active} />{active ? t('subscription.success') : t('subscription.fail')}</>
        }
      },
      {
        title: 'ID',
        dataIndex: 'id',
        render: () => {
          return id
        }
      },
      {
        title: t('subscription.administratorAddress'),
        dataIndex: 'owner',
        render: (owner: string) => {
          return <div className='tables-context-copy'>
            {mobileHidden(owner, 5, 4)}
            <img className='pointer' onClick={() => { handleCopyClick(owner) }} src={copy} alt="" />
          </div>
        }
      },
      {
        title: t('subscription.consumerContract'),
        dataIndex: 'consumers',
        render: (consumers: any[]) => {
          return consumers.length
        }
      },
      {
        title: t('subscription.successfulRequest'),
        dataIndex: 'reqSuccessCount',
        render: (reqSuccessCount: any[]) => {
          return reqSuccessCount + ''
        }
      },
      {
        title: `${t('subscription.balance')}（FIBO）`,
        dataIndex: 'balance',
        render: (balance: number) => {
          return <Tooltip placement="top" title={formatUnits(balance)}>
            <span className='pointer'>{formatNumber(formatUnits(balance))}</span>
          </Tooltip>
        }
      },
    ];

  }, [handleCopyClick, id, t])

  return (
    <div className='subscriptionInfo'>
      <div className='subscriptionInfo-header'>
        <span className='subscriptionInfo-header-left'>{t('subscription.subscriptionDetails')}</span>
        <div className='subscriptionInfo-header-right'>
          {batchSubscription[0]?.active && <Button onClick={() => { showModal(0) }}>{t('subscription.addFunds')}</Button>}
          {batchSubscription[0]?.owner === address && <img onClick={() => { showModal(1) }} className='pointer' src={yremove} alt="" />}
        </div>
      </div>
      <Tables width={800} loading={getBatchSubscriptionLod} columns={columns()} data={batchSubscription} keys={'createTime'} />
    </div>
  )
}

export default memo(SubscriptionInfo)