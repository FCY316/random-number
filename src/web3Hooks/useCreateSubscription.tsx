import { useCallback, useState } from "react"
import useListenerTransfer from "./useListenerTransfer"
import useNewContract from "./useNewContract"
import useNotification from "@/hooks/useNotification"
import useGetReturnContract from "./useGetReturnContract"
// 可以传入参数，在创建订阅成功后执行,或在创建失败执行
const useCreateSubscription = (successFn?: Function, errorFn?: Function) => {
    // laoding
    const [loading, setLoading] = useState(false)
    // subId 本次订阅的id
    const [subId, setSubId] = useState(0)
    // 获取合约
    const { VRFCoordinatorV2 } = useNewContract.useContainer()
    // 获取合约事件成功后返回的参数
    const { getReturnContract } = useGetReturnContract(VRFCoordinatorV2)
    // 交易查询
    const listenerTransferF = useListenerTransfer()
    // 提示
    const { showNotification } = useNotification()
    // 调用函数
    const createSubscription = useCallback(async () => {
        if (VRFCoordinatorV2) {
            setLoading(true)
            try {
                // 创建
                const { hash } = await VRFCoordinatorV2.createSubscription()
                // 查询交易是否成功
                const relset = await listenerTransferF(hash)
                if (relset) {
                    // 当交易成功时
                    // 获取subId
                    const subId = await getReturnContract(hash, 'SubscriptionCreated', 'subId')
                    setSubId(Number(subId))
                    // 提示
                    showNotification('success', { message: "创建成功" })
                    // 创建成功后执行传入的成功函数
                    successFn && successFn()
                } else {
                    showNotification('error', { message: "创建失败" })
                    // 创建失败后执行传入的成功函数
                    errorFn && errorFn()
                }
            } catch (e) {
                console.log('useCreateSubscription', e);
                // 报错执行传入的成功函数
                errorFn && errorFn()
            }
            setLoading(true)
        }
    }, [VRFCoordinatorV2, listenerTransferF, getReturnContract, showNotification, successFn, errorFn])
    return { createSubscription, loading, subId }
}

export default useCreateSubscription