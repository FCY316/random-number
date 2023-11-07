import { Tooltip } from 'antd';
import { useCallback, useEffect, useState, } from 'react';
import './index.scss'
import { formatNumber, formatTimeToStr, formatUnits, mobileHidden } from '@/utils';
import copy from '@/image/copy.png'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import State from '@/components/State';
import useHandleCopyClick from '@/hooks/useHandleCopyClick';
import Tables from '@/components/Tables';
import useGetBatchSubscription from '@/web3Hooks/useGetBatchSubscription';
import useGetCurrentSubId from '@/web3Hooks/useGetCurrentSubId';
const RecentSubscription = () => {
    // 复制
    const { handleCopyClick } = useHandleCopyClick()
    // 路由
    const navigate = useNavigate()
    // 翻译
    const { t } = useTranslation()
    // 获取subId，代表目前一共有多少数据，也是最新的一条数据的id
    const { newSubId } = useGetCurrentSubId()
    // 会通过页码和newSubId计算出从那个id开始拿取数据的参数
    const [pageID, setPageID] = useState(0)
    // 每页的展示数据数量
    const [size, setSize] = useState(10)
    // 页码
    const [pages, setPages] = useState(1)
    // 获取表格数据
    const { getBatchSubscriptionLod, batchSubscription } = useGetBatchSubscription(pageID, size)
    // 表格页码切换
    const onChange = (pages: number) => {
        setPages(pages)
    }
    // table header
    const columns = useCallback(() => {
        return [
            {
                title: 'ID',
                dataIndex: 'id',
                render: (_id: string, record: any, index: number) => {
                    return <div><State state={record?.active} />{pageID - index}</div>
                }
            },
            {
                title: t('home.administratorAddress'),
                dataIndex: 'owner',
                render: (owner: string) => {
                    return <div className='tables-context-copy'>
                        {mobileHidden(owner, 5, 4)}
                        <img className='pointer' onClick={(event) => { event.stopPropagation(); handleCopyClick(owner) }} src={copy} alt="" />
                    </div>
                }
            },
            {
                title: t('home.creationTime'),
                dataIndex: 'createTime',
                render: (createTime: string) => {
                    return formatTimeToStr(Number(createTime) * 1000, '.', ':', 'm')
                }
            },
            {
                title: t('home.consumerContract'),
                dataIndex: 'consumers',
                render: (consumers: string[]) => {
                    return consumers.length
                }
            },
            {
                title: `${t('home.balance')}（FIBO）`,
                dataIndex: 'balance',
                render: (balance: number) => {
                    return <Tooltip placement="top" title={formatUnits(balance)}>
                        <span className='pointer'>{formatNumber(formatUnits(balance))}</span>
                    </Tooltip>
                }
            }
        ];

    }, [handleCopyClick, pageID, t])
    /*
     监听 newSubId pages
     if 在切换时，newSubId小于当前 页面*10，则代表着当前页面展示的数据不够10条 ,故size = newSubId - ((pages - 1) * 10)
     else 在切换时 来到这一步代表着剩余数据完全够下一页展示，哪怕是最后一页也是刚刚好的，直接使用 newSubId - (当前页码-1)*10
    */
    useEffect(() => {
        if (newSubId < (pages * 10)) {
            setPageID(newSubId - ((pages - 1) * 10))
            setSize(newSubId - ((pages - 1) * 10))
        } else {
            setPageID(newSubId - ((pages - 1) * 10))
            setSize(10)
        }
    }, [newSubId, pages])
    return (
        <div className='recentSubscription'>
            <div className='recentSubscription-title'>{t('home.recentSubscription')}</div>
            <Tables
                keys={'createTime'}
                onChanges={onChange}
                onRow={(_record, index) => {
                    return {
                        onClick: () => {
                            navigate(`/subscription/${pageID - (index || 0)}`);
                        }, // 点击行
                    };
                }}
                loading={getBatchSubscriptionLod}
                width={700}
                columns={columns()}
                data={batchSubscription}
                pagination
                total={newSubId} />
        </div>
    )
}

export default RecentSubscription