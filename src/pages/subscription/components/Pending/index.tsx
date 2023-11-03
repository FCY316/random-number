import useHandleCopyClick from '@/hooks/useHandleCopyClick'
import './index.scss'
import { useCallback } from 'react'
import { formatNumber, formatTimeToStr, mobileHidden } from '@/utils'
import { Tooltip } from 'antd'
import copy from '@/image/copy.png'
import Tables from '@/components/Tables'
const data: any[] = [
    {
        key: 10,
        time: '1698821354',
        contract: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        hash: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        state: 10,
        cost: 100,
    }, {
        key: '2',
        time: '1698821354',
        contract: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        hash: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        state: 10,
        cost: 100,
    }, {
        key: '3',
        time: '1698821354',
        contract: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        hash: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        state: 10,
        cost: 100,
    }, {
        key: '4',
        time: '1698821354',
        contract: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        hash: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        state: 10,
        cost: 100,
    }, {
        key: '5',
        time: '1698821354',
        contract: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        hash: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        state: 10,
        cost: 100,
    }, {
        key: '6',
        time: '1698821354',
        contract: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        hash: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        state: 10,
        cost: 100,
    }, {
        key: '1',
        time: '1698821354',
        contract: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        hash: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        state: 10,
        cost: 100,
    }, {
        key: '7',
        time: '1698821354',
        contract: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        hash: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        state: 10,
        cost: 100,
    }, {
        key: '8',
        time: '1698821354',
        contract: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        hash: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        state: 10,
        cost: 100,
    }
]
const Pending = (props: { id: string }) => {
    // 复制
    const { handleCopyClick } = useHandleCopyClick()
    // 获取id
    // const { id } = props
    // table 头部以及内容区域的样式和格式,使用useCallback缓存起来
    const columns = useCallback(() => {
        return [
            {
                title: '时间',
                dataIndex: 'time',
                render: (time: string) => {
                    return formatTimeToStr(Number(time) * 1000, '.', ':', 'm')
                }
            },
            {
                title: '消费者合约',
                dataIndex: 'contract',
                render: (contract: string) => {
                    return <div className='tables-context-copy'>
                        {mobileHidden(contract, 5, 4)}
                        <img className='pointer' onClick={() => { handleCopyClick(contract) }} src={copy} alt="" />
                    </div>
                }
            },
            {
                title: '交易哈希',
                dataIndex: 'hash',
                render: (hash: string) => {
                    return <div className='tables-context-copy'>
                        {mobileHidden(hash, 5, 4)}
                        <img className='pointer' onClick={() => { handleCopyClick(hash) }} src={copy} alt="" />
                    </div>
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                render: (operate: any) => {
                    return operate
                }
            },
            {
                title: '最大花费（FIBO）',
                dataIndex: 'cost',
                render: (cost: number) => {
                    return <Tooltip placement="top" title={cost}>
                        {formatNumber(cost)}
                    </Tooltip>
                }
            }
        ];

    }, [handleCopyClick])
    return (
        <div className='pending'>
            <div className='pending-header'>
                <span className='pending-header-left'>等待中</span>
            </div>
            <div className='pending-context'>
                <Tables
                    width={630}
                    columns={columns()}
                    data={data}
                    pagination
                    total={1000}
                />
            </div>
        </div>
    )
}

export default Pending