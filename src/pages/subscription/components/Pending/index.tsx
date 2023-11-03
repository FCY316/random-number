import useHandleCopyClick from '@/hooks/useHandleCopyClick'
import './index.scss'
import { useCallback } from 'react'
import { formatNumber, formatTimeToStr, mobileHidden } from '@/utils'
import { Tooltip } from 'antd'
import copy from '@/image/copy.png'
import Tables from '@/components/Tables'
import { useTranslation } from 'react-i18next'
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
    // 翻译
    const { t } = useTranslation()
    // 复制
    const { handleCopyClick } = useHandleCopyClick()
    // 获取id
    // const { id } = props
    // table 头部以及内容区域的样式和格式,使用useCallback缓存起来
    const columns = useCallback(() => {
        return [
            {
                title: t('subscription.time'),
                dataIndex: 'time',
                render: (time: string) => {
                    return formatTimeToStr(Number(time) * 1000, '.', ':', 'm')
                }
            },
            {
                title: t('subscription.consumerContract2'),
                dataIndex: 'contract',
                render: (contract: string) => {
                    return <div className='tables-context-copy'>
                        {mobileHidden(contract, 5, 4)}
                        <img className='pointer' onClick={() => { handleCopyClick(contract) }} src={copy} alt="" />
                    </div>
                }
            },
            {
                title: t('subscription.txnHash'),
                dataIndex: 'hash',
                render: (hash: string) => {
                    return <div className='tables-context-copy'>
                        {mobileHidden(hash, 5, 4)}
                        <img className='pointer' onClick={() => { handleCopyClick(hash) }} src={copy} alt="" />
                    </div>
                }
            },
            {
                title: t('subscription.state'),
                dataIndex: 'state',
                render: (operate: any) => {
                    return operate
                }
            },
            {
                title: `${t('subscription.maximumCost')}（FIBO）`,
                dataIndex: 'cost',
                render: (cost: number) => {
                    return <Tooltip placement="top" title={cost}>
                        {formatNumber(cost)}
                    </Tooltip>
                }
            }
        ];

    }, [handleCopyClick, t])
    return (
        <div className='pending'>
            <div className='pending-header'>
                <span className='pending-header-left'>{t('subscription.waiting')}</span>
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