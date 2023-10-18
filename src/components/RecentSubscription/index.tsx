import { useEffect, useState } from 'react';
// import InfiniteScroll from 'react-infinite-scroll-component';

const RecentSubscription = () => {
    const [loading, setLoading] = useState(false);

    // 数据
    const data: any[] = []
    // 页面触底函数
    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);

    };
    // 进入页面第一次请求
    useEffect(() => {
        loadMoreData();
    }, []);
    return (
        <div className='recentSubscription'>
            {/* <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                hasMore={data.length < 50}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item key={item.email}>
                            <List.Item.Meta
                                avatar={<Avatar src={item.picture.large} />}
                                title={<a href="https://ant.design">{item.name.last}</a>}
                                description={item.email}
                            />
                            <div>Content</div>
                        </List.Item>
                    )}
                />
            </InfiniteScroll> */}
        </div>
    )
}

export default RecentSubscription