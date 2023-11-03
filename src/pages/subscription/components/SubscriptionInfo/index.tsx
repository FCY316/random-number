import { Button, Tooltip } from 'antd'
import yremove from '@/image/yremove.png'
import './index.scss'
import State from '@/components/State'
import { formatNumber, mobileHidden } from '@/utils'
import copy from '@/image/copy.png'
import useHandleCopyClick from '@/hooks/useHandleCopyClick'
import { memo, useCallback } from 'react'
import Tables from '@/components/Tables'
const data = [
  {
    key: '1',
    state: 0,
    id: 100,
    administrator: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
    consumer: 0,
    request: 1,
    balance: 0
  }
]

const SubscriptionInfo = (props: { id: string, showModal: Function }) => {
  const { showModal } = props
  // 复制
  const { handleCopyClick } = useHandleCopyClick()

  // 获取id
  // const { id } = props
  // table 头部以及内容区域的样式和格式,使用useCallback缓存起来
  const columns = useCallback(() => {
    return [
      {
        title: '状态',
        dataIndex: 'state',
        render: (state: number | boolean) => {
          return <><State state={state} />{state ? '成功' : '失败'}</>
        }
      },
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: '管理者地址',
        dataIndex: 'administrator',
        render: (administrator: string) => {
          return <div className='tables-context-copy'>
            {mobileHidden(administrator, 5, 4)}
            <img className='pointer' onClick={() => { handleCopyClick(administrator) }} src={copy} alt="" />
          </div>
        }
      },
      {
        title: '消费者契约',
        dataIndex: 'consumer',
      },
      {
        title: '成功请求',
        dataIndex: 'request',
      },
      {
        title: '余额（FIBO）',
        dataIndex: 'balance',
        render: (balance: number) => {
          return <Tooltip placement="top" title={balance}>
            {formatNumber(balance)}
          </Tooltip>
        }
      },
    ];

  }, [handleCopyClick])

  return (
    <div className='subscriptionInfo'>
      <div className='subscriptionInfo-header'>
        <span className='subscriptionInfo-header-left'>订阅详情</span>
        <div className='subscriptionInfo-header-right'>
          <Button onClick={() => { showModal(0) }}>添加资金</Button>
          <img onClick={() => { showModal(1) }} className='pointer' src={yremove} alt="" />
        </div>
      </div>
      <Tables columns={columns()} data={data} />

    </div>
  )
}

export default memo(SubscriptionInfo)