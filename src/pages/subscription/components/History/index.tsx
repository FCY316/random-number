import Tables from '@/components/Tables'
import './index.scss'
import copy from '@/image/copy.png'
import { useCallback, useState } from 'react'
import { formatNumber, formatTimeToStr, mobileHidden } from '@/utils'
import { Tooltip } from 'antd'
import useHandleCopyClick from '@/hooks/useHandleCopyClick'
const data: any[] = [
    {
        key: 10,
        time: '1698821354',
        contract: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        hash: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        cost: 100,
    }, {
        key: '2',
        time: '1698821354',
        contract: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        hash: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        cost: 100,
    }, {
        key: '3',
        time: '1698821354',
        contract: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        hash: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        cost: 100,
    }, {
        key: '4',
        time: '1698821354',
        contract: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        hash: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        cost: 100,
    }, {
        key: '5',
        time: '1698821354',
        contract: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        hash: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        cost: 100,
    }, {
        key: '6',
        time: '1698821354',
        contract: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        hash: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        cost: 100,
    }, {
        key: '1',
        time: '1698821354',
        contract: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        hash: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        cost: 100,
    }, {
        key: '7',
        time: '1698821354',
        contract: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        hash: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        cost: 100,
    }, {
        key: '8',
        time: '1698821354',
        contract: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        hash: '0x675D6c9eF24109a5524cF6f8a3c27771149C172A',
        cost: 100,
    }
]
const History = (props: { id: string }) => {
    // 选中的类型参数
    const [index, setIndex] = useState(0)
    // 选中的类型
    const getType = (index: number) => {
        setIndex(index)
    }
    // 复制
    const { handleCopyClick } = useHandleCopyClick()
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
                title: '数量（FIBO）',
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
        <div className='history'>
            <div className='history-header'>
                <span className='history-header-left'>历史记录</span>
            </div>
            <div className='history-sele'>
                <div onClick={() => { getType(0) }} className={`pointer ${index === 0 && 'history-sele-selsed'} `}>请求成功</div>
                <div onClick={() => { getType(1) }} className={`pointer ${index === 1 && 'history-sele-selsed'} `}>失败</div>
                <div onClick={() => { getType(2) }} className={`pointer ${index === 2 && 'history-sele-selsed'} `}>事件</div>
            </div>
            <div className='history-context'>
                <Tables
                    width={530}
                    columns={columns()}
                    data={data}
                    pagination
                    total={1000}
                />
            </div>
        </div>)
}

export default History