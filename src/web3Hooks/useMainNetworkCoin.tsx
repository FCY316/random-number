import { useCallback, useEffect, useState } from "react";
import connectedWallet from "./useConnectedWallet";
// 获取主网币余额
const useMainNetworkCoin = () => {
    // balance是余额，usedBalance是loading
    const [data, steDate] = useState<{ balance: bigint | null, usedBalance: boolean }>({
        balance: null,
        usedBalance: true
    })
    // 用于刷新的函数
    const refreshBalance = () => {
        steDate({ ...data, usedBalance: false })
    }
    // 获取
    const { provider, address } = connectedWallet.useContainer();
    // 获取主网币余额
    const getMainNetworkCoin = useCallback(() => {
        if (provider && data.usedBalance) {
            // 获取余额方法
            const getBalance = new Promise<bigint>((resolve, reject) => {
                provider?.getBalance(address).then(data => {
                    resolve(data)
                })
            })
            // Promise.all 可以在多个异步结束后统一返回参数
            Promise.all([getBalance])
                .then((results) => {
                    steDate({ ...data, balance: results[0], usedBalance: false })
                })
                .catch((error) => {
                    console.error('At least one promise was rejected:', error);
                    steDate({ ...data, usedBalance: false })
                });
        }
    }, [address, data, provider])
    useEffect(() => {
        getMainNetworkCoin()
    }, [getMainNetworkCoin])
    return { ...data, refreshBalance }
}

export default useMainNetworkCoin