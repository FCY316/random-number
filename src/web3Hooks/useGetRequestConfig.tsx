import { useCallback, useEffect, useState } from "react"
import useNewContract from "./useNewContract"

// 获取最高gas价格合key hash
const useGetRequestConfig = () => {
    // laoding
    const [getRequestConfigLod, setLoading] = useState(true)
    // 获取合约
    const { VRFCoordinatorV2 } = useNewContract.useContainer()
    // 获取的结果
    const [config, setConfig] = useState<any[]>([])
    // 获取方法
    const getRequestConfig = useCallback(async () => {
        if (VRFCoordinatorV2) {
            setLoading(true)
            try {
                // 获取全局请求配置
                const config = await VRFCoordinatorV2.getRequestConfig()
                setConfig(config)
            } catch (e) {
                console.log('useGetRequestConfig', e);
            }
            setLoading(false)
        }
    }, [VRFCoordinatorV2])
    useEffect(() => {
        getRequestConfig()
    }, [getRequestConfig])
    return { getRequestConfigLod, config, getRequestConfig }
}

export default useGetRequestConfig