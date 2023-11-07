import { useCallback, useState } from "react"
import useNewContract from "./useNewContract"
import useListenerTransfer from "./useListenerTransfer"
import useNotification from "@/hooks/useNotification"
import { parseUnits } from "@/utils"

// 充值FIBO
const useCharge = (successFn?: Function, errorFn?: Function) => {
    // 合约
    const { VRFCoordinatorV2 } = useNewContract.useContainer()
    // loading
    const [chargeLod, setLoading] = useState(false)
    // 交易查询
    const listenerTransferF = useListenerTransfer()
    // 提示
    const { showNotification } = useNotification()
    // 充值方法
    const charge = useCallback(async (subId: string, value: string) => {
        if (VRFCoordinatorV2) {
            setLoading(true)
            try {
                const { hash } = await VRFCoordinatorV2.charge(subId, { value: parseUnits(value) })
                // 查询交易是否成功
                const relset = await listenerTransferF(hash)
                if (relset) {
                    // 当交易成功时 提示
                    showNotification('success', { message: "添加资金成功" })
                    // 添加资金成功后执行传入的成功函数
                    successFn && successFn()
                } else {
                    showNotification('error', { message: "添加资金失败" })
                    // 添加资金失败后执行传入的成功函数
                    errorFn && errorFn()
                }
            } catch (e) {
                console.log('useCharge', e);
                // 报错执行传入的成功函数
                errorFn && errorFn()
            }
            setLoading(false)
        }
    }, [VRFCoordinatorV2, errorFn, listenerTransferF, showNotification, successFn])
    return { charge, chargeLod }
}

export default useCharge