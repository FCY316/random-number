import { useCallback, useEffect, useState } from "react";
import connectedWallet from "./useConnectedWallet";
import { formatUnits } from "@/utils";
// 获取主网币余额
const useMainNetworkCoin = () => {
    // 余额
    const [balance, steBalance] = useState<number>(0)
    // loading
    const [balanceLod, setLoading] = useState(true)
    // 获取
    const { provider, address } = connectedWallet.useContainer();
    // 获取主网币余额
    const getMainNetworkCoin = useCallback(async () => {
        if (provider) {
            setLoading(true)
            try {
                const res = await provider?.getBalance(address)
                steBalance(formatUnits(res))
            } catch (e) {
                console.log('useMainNetworkCoin', e);
            }
            setLoading(false)
        }
    }, [address, provider])
    useEffect(() => {
        getMainNetworkCoin()
    }, [getMainNetworkCoin])
    return { balance, getMainNetworkCoin, balanceLod }
}

export default useMainNetworkCoin