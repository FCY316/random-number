import { Tooltip } from 'antd';
import { useCallback, } from 'react';
import './index.scss'
import { formatNumber, formatTimeToStr, mobileHidden } from '@/utils';
import copy from '@/image/copy.png'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import State from '@/components/State';
import useHandleCopyClick from '@/hooks/useHandleCopyClick';
import Tables from '@/components/Tables';

const data: any[] = [
    {
        key: "0",
        state: 0,
        id: 100,
        administrator: "0x675D6c9eF24109a5524cF6f8a3c27771149C172A",
        creationTime: '1698821354',
        consumer: "0x675D6c9eF24109a5524cF6f8a3c27771149C172A",
        balance: 10
    }, {
        key: "1",
        state: 0,
        id: 100,
        administrator: "0x675D6c9eF24109a5524cF6f8a3c27771149C172A",
        creationTime: '1698821354',
        consumer: "0x675D6c9eF24109a5524cF6f8a3c27771149C172A",
        balance: 10
    }, {
        key: "2",
        state: 1,
        id: 100,
        administrator: "0x675D6c9eF24109a5524cF6f8a3c27771149C172A",
        creationTime: '1698821354',
        consumer: "0x675D6c9eF24109a5524cF6f8a3c27771149C172A",
        balance: 10
    }
]
const RecentSubscription = () => {
    // 复制
    const { handleCopyClick } = useHandleCopyClick()
    // 路由
    const navigate = useNavigate()
    // 翻译
    const { t } = useTranslation()
    // 页面触底函数
    const columns = useCallback(() => {
        return [
            {
                title: 'ID',
                dataIndex: 'id',
                render: (id: string, record: any) => {
                    return <div><State state={record.state} />{id}</div>
                }
            },
            {
                title: t('home.administratorAddress'),
                dataIndex: 'administrator',
                render: (administrator: string) => {
                    return <div className='tables-context-copy'>
                        {mobileHidden(administrator, 5, 4)}
                        <img className='pointer' onClick={() => { handleCopyClick(administrator) }} src={copy} alt="" />
                    </div>
                }
            },
            {
                title: t('home.creationTime'),
                dataIndex: 'creationTime',
                render: (creationTime: string) => {
                    return formatTimeToStr(Number(creationTime) * 1000, '.', ':', 'm')
                }
            },
            {
                title: t('home.consumerContract'),
                dataIndex: 'consumer',
                render: (consumer: any) => {
                    return mobileHidden(consumer, 5, 4)
                }
            },
            {
                title: `${t('home.balance')}（FIBO）`,
                dataIndex: 'balance',
                render: (balance: number) => {
                    return <Tooltip placement="top" title={balance}>
                        {formatNumber(balance)}
                    </Tooltip>
                }
            }
        ];

    }, [handleCopyClick, t])
    return (
        <div className='recentSubscription'>
            <div className='recentSubscription-title'>{t('home.recentSubscription')}</div>
            <Tables
                onRow={(record) => {
                    return {
                        onClick: () => {
                            navigate(`/subscription/${record.id}`)
                        }, // 点击行
                    };
                }}

                width={700}
                columns={columns()}
                data={data}
                pagination
                total={1000}
            />
        </div>
    )
}

export default RecentSubscription