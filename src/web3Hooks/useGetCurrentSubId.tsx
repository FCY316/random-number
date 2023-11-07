import { useCallback, useEffect, useState } from "react"
import useNewContract from "./useNewContract"

const useGetCurrentSubId = () => {
    // laoding
    const [getCurrentSubIdLod, setLoading] = useState(false)
    // 获取合约
    const { VRFCoordinatorV2 } = useNewContract.useContainer()
    //存放最新id 
    const [newSubId, setNewSubId] = useState(0)
    // 函数
    const getNewSubId = useCallback(async () => {
        if (VRFCoordinatorV2) {
            setLoading(true)
            try {
                const id = await VRFCoordinatorV2.getCurrentSubId()
                setNewSubId(Number(id))
            } catch (e) {
                console.log('useGetCurrentSubId', e);
            }
            setLoading(false)
        }
    }, [VRFCoordinatorV2])
    useEffect(() => {
        getNewSubId()
    }, [getNewSubId])
    return { getCurrentSubIdLod, newSubId, getNewSubId }
}

export default useGetCurrentSubId