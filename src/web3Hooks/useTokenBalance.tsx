import { useCallback, useEffect, useState } from "react"
import connectedWallet from "./useConnectedWallet"
import newContracts from "./useNewContract"
// 获取代币的精度，余额，名称等等
const useTokenBalance = () => {
    const { erc20 } = newContracts.useContainer()
    // 获取链id
    // balance是余额，usedTokenBalance是loading
    const [data, steDate] = useState<{ tokenBalance: bigint | null, decimals: number | null, symbol: string | null, tokenNam: string | null, usedTokenBalance: boolean }>({
        tokenBalance: null,
        decimals: null,
        symbol: null,
        usedTokenBalance: true,
        tokenNam: null
    })
    // 用于刷新的函数
    const refreshTokenBalance = () => {
        steDate({ ...data, usedTokenBalance: true })
    }
    // 获取
    const { address } = connectedWallet.useContainer();
    // 获取代币的精度，余额，名称等等
    const getTokenBalance = useCallback(() => {
        if (erc20 && data.usedTokenBalance) {
            // 获取余额方法
            const getBalance = new Promise<bigint>((resolve,) => {
                erc20?.balanceOf(address).then(data => {
                    resolve(data)
                })
            })
            // 获取精度
            const getDecimals = new Promise<number>((resolve,) => {
                erc20?.decimals().then(data => {
                    resolve(Number(data))
                })
            })
            // 获取代币符号
            const getTokenSymbol = new Promise<string>((resolve,) => {
                erc20?.symbol().then(data => {
                    resolve(data)
                })
            })
            // 获取代币名称
            const getTokenNameF = new Promise<string>((resolve,) => {
                erc20?.name().then(data => {
                    resolve(data)
                })
            })
            // Promise.all 可以在多个异步结束后统一返回参数
            try {
                Promise.all([getBalance, getDecimals, getTokenSymbol, getTokenNameF])
                    .then((results) => {
                        steDate({ ...data, tokenBalance: results[0], decimals: results[1], symbol: results[2], tokenNam: results[3], usedTokenBalance: false })
                    })
                    .catch((error) => {
                        console.error('At least one promise was rejected:', error);
                        steDate({ ...data, usedTokenBalance: false })
                    });
            } catch (e) {
                console.log('useTokenBalance', e);
                steDate({ ...data, usedTokenBalance: false })
            }
        }
    }, [address, data, erc20])
    useEffect(() => {
        getTokenBalance()
    }, [getTokenBalance])
    useEffect(() => {
        erc20 && !data.usedTokenBalance && refreshTokenBalance()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [erc20])
    return { ...data, refreshTokenBalance }
}

export default useTokenBalance