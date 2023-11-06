import { useCallback, useEffect, useState } from "react";
import connectedWallet from "./useConnectedWallet";
// 获取链id
const useGetChainID = () => {
    // chainId
    const [chainID, setChainID] = useState<number>(0)
    // loading
    const [chainIDLod, setLoading] = useState(false)
    // 拿到provider
    const { provider, } = connectedWallet.useContainer();
    const getChainID = useCallback(async () => {
        if (provider) {
            setLoading(true)
            try {
                setChainID(0)
                // 获取网络信息
                const network = await (provider as any).getNetwork();
                // 输出当前连接的链的信息
                // 将链 ID 转换为字符串，并去掉后缀 "n"
                const chainId = network.chainId.toString();
                const chainIdWithoutSuffix = chainId.endsWith("n")
                    ? chainId.slice(0, -1)
                    : chainId;
                setChainID(Number(chainIdWithoutSuffix))
                setLoading(false)
                return Number(chainIdWithoutSuffix)
            } catch (e) {
                setLoading(false)
                console.log('useApprove', e);
            }
        } else {
            setChainID(0)
        }
    }, [provider])
    useEffect(() => {
        getChainID()
    }, [getChainID])
    return { getChainID, chainIDLod, chainID }
}

export default useGetChainID