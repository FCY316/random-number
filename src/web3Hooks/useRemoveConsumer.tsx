import { useCallback, useState } from "react"
import useNewContract from "./useNewContract"
import useListenerTransfer from "./useListenerTransfer"
import useNotification from "@/hooks/useNotification"

// 删除消费合约地址
const useRemoveConsumer = (successFn?: Function, errorFn?: Function) => {
    // laoding
    const [removeConsumerLod, setLoading] = useState(false)
    // 获取合约
    const { VRFCoordinatorV2 } = useNewContract.useContainer()
    // 交易查询
    const listenerTransferF = useListenerTransfer()
    // 提示
    const { showNotification } = useNotification()
    // 调用函数
    const removeConsumer = useCallback(async (subId: string | undefined, consumer: string) => {
        if (VRFCoordinatorV2 && subId) {
            setLoading(true)
            try {
                const { hash } = await VRFCoordinatorV2.removeConsumer(subId, consumer)
                // 查询交易是否成功
                const relset = await listenerTransferF(hash)
                if (relset) {
                    // 当交易成功时
                    // 提示
                    showNotification('success', { message: "删除成功" })
                    // 删除成功后执行传入的成功函数
                    successFn && successFn()
                } else {
                    showNotification('error', { message: "删除失败" })
                    // 删除失败后执行传入的成功函数
                    errorFn && errorFn()
                }
            } catch (e) {
                console.log('useRemoveConsumer', e);
                errorFn && errorFn()
            }
            setLoading(false)
        }
    }, [VRFCoordinatorV2, errorFn, listenerTransferF, showNotification, successFn])
    return { removeConsumer, removeConsumerLod }
}

export default useRemoveConsumer