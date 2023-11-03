import { Tooltip } from 'antd'
import './index.scss'
import { useCallback } from 'react'
import copy from '@/image/copy.png'
import remove from '@/image/remove.png'
import add from '@/image/add.png'
import useHandleCopyClick from '@/hooks/useHandleCopyClick'
import { formatNumber, formatTimeToStr, mobileHidden } from '@/utils'
import Tables from '@/components/Tables'
const data = [
    {
        key: '1',
        administrator: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        addTime: '1698821354',
        request: 10,
        cost: 100,
        operate: 1,
    }
]
const ConsumerContract = (props: { id: string, showModal: Function, removeConsumerF: Function }) => {
    const { showModal, removeConsumerF } = props
    // 复制
    const { handleCopyClick } = useHandleCopyClick()
    // 获取id
    // const { id } = props
    // table 头部以及内容区域的样式和格式,使用useCallback缓存起来
    const columns = useCallback(() => {
        return [
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
                title: '添加时间',
                dataIndex: 'addTime',
                render: (addTime: string) => {
                    return formatTimeToStr(Number(addTime) * 1000, '.', ':', 'm')
                }
            },
            {
                title: '请求成功',
                dataIndex: 'request',
            },
            {
                title: '总花费（FIBO）',
                dataIndex: 'cost',
                render: (cost: number) => {
                    return <Tooltip placement="top" title={cost}>
                        {formatNumber(cost)}
                    </Tooltip>
                }
            }, {
                title: '操作',
                dataIndex: 'operate',
                render: (operate: any) => {
                    return <img onClick={() => { removeConsumerF('0x675D6c9eF24109a5524cF6f8a3c27771149C172A') }} className='pointer tables-context-remove' src={remove} alt="" />
                }
            }
        ];

    }, [handleCopyClick, removeConsumerF])
    return (
        <div className='consumerContract'>
            <div className='consumerContract-header'>
                <span className='consumerContract-header-left'>订阅详情</span>
                <div onClick={() => { showModal(2) }} className='consumerContract-header-right pointer'>
                    <img className='pointer' src={add} alt="" />
                    添加消费者
                </div>
            </div>
            <Tables columns={columns()} data={data} />
        </div>
    )
}

export default ConsumerContract