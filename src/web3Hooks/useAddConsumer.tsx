import { useCallback, useState } from "react"
import useNewContract from "./useNewContract"
import useListenerTransfer from "./useListenerTransfer"
import useNotification from "@/hooks/useNotification"

// 添加消费合约地址
const useAddConsumer = (successFn?: Function, errorFn?: Function) => {
    // laoding
    const [addConsumerLod, setLoading] = useState(false)
    // 获取合约
    const { VRFCoordinatorV2 } = useNewContract.useContainer()
    // 交易查询
    const listenerTransferF = useListenerTransfer()
    // 提示
    const { showNotification } = useNotification()
    // 调用函数
    const addConsumer = useCallback(async (subId: string, consumer: string) => {
        if (VRFCoordinatorV2) {
            setLoading(true)
            try {
                const { hash } = await VRFCoordinatorV2.addConsumer(subId,consumer)
                // 查询交易是否成功
                const relset = await listenerTransferF(hash)
                if (relset) {
                    // 当交易成功时
                    // 提示
                    showNotification('success', { message: "添加成功" })
                    // 添加成功后执行传入的成功函数
                    successFn && successFn()
                } else {
                    showNotification('error', { message: "添加失败" })
                    // 添加失败后执行传入的成功函数
                    errorFn && errorFn()
                }
            } catch (e) {
                console.log('useAddConsumer', e);
                errorFn && errorFn()
            }
            setLoading(false)
        }
    },[VRFCoordinatorV2, errorFn, listenerTransferF, showNotification, successFn])
    return { addConsumer, addConsumerLod }
}

export default useAddConsumer