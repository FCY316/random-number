import { useCallback, useState } from "react"
import useNewContract from "./useNewContract"
import useListenerTransfer from "./useListenerTransfer"
import useNotification from "@/hooks/useNotification"

// 取消订阅 1.检查还有没有真在执行的请求，有的话是不能取消订阅的
const useCancelSubscription = (subId: string | undefined, successFn?: Function, errorFn?: Function) => {
    // loading
    const [canceLod, setLoading] = useState(false)
    // 获取合约
    const { VRFCoordinatorV2 } = useNewContract.useContainer()
    // 交易查询
    const listenerTransferF = useListenerTransfer()
    // 提示
    const { showNotification } = useNotification()
    // 方法
    const cancelSubscription = useCallback(async (toAddress: string) => {
        if (VRFCoordinatorV2 && subId) {
            setLoading(true)
            try {
                // pendingReques true 代表还有执行的请求
                const pendingReques = await VRFCoordinatorV2.pendingRequestExists(subId)
                if (pendingReques) showNotification('warning', { message: "当前订阅还有执行中请求，请稍后再试" })
                else {
                    const { hash } = await VRFCoordinatorV2.cancelSubscription(subId, toAddress)
                    // 查询交易是否成功
                    const relset = await listenerTransferF(hash)
                    if (relset) {
                        // 当交易成功时
                        // 提示
                        showNotification('success', { message: "取消订阅成功" })
                        // 取消订阅成功后执行传入的成功函数
                        successFn && successFn()
                    } else {
                        showNotification('error', { message: "取消订阅失败" })
                        // 添加失败后执行传入的成功函数
                        errorFn && errorFn()
                    }
                }
            } catch (e) {
                console.log('cancelSubscription', e);
            }
            setLoading(false)
        }
    }, [VRFCoordinatorV2, errorFn, listenerTransferF, showNotification, subId, successFn])
    return { cancelSubscription, canceLod }
}

export default useCancelSubscription