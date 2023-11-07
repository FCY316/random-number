import { useCallback, useEffect, useState } from "react"
import useNewContract from "./useNewContract"

//  批量获取订阅信息【多个】，可以用于主页的最新订阅的显示。可以与getCurrentSubId配合，先获取当前最新的订阅ID，再调用此函数。
const useGetBatchSubscription = (newSubId: number | string, amount = 10) => {
    // laoding
    const [getBatchSubscriptionLod, setLoading] = useState(false)
    // 获取合约
    const { VRFCoordinatorV2 } = useNewContract.useContainer()
    // 获取的数据
    const [batchSubscription, setBatchSubscription] = useState<any[]>([])
    // 调用方法
    const getBatchSubscription = useCallback(async () => {
        if (VRFCoordinatorV2 && newSubId) {
            setLoading(true)
            try {
                // 调用合约
                const batchSubscriptions = await VRFCoordinatorV2.getBatchSubscription(newSubId, amount)
                setBatchSubscription([...batchSubscriptions].reverse())
            } catch (e) {
                console.log('useGetBatchSubscription', e);
            }
            setLoading(false)
        }
    }, [VRFCoordinatorV2, amount, newSubId])
    useEffect(() => {
        getBatchSubscription()
    }, [getBatchSubscription])
    return { getBatchSubscriptionLod, batchSubscription, getBatchSubscription }
}

export default useGetBatchSubscription