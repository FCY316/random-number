import { Contract, ethers } from 'ethers'
import { useEffect, useState } from "react";
import contract from '@/abi/index'
import CounterContainer from "@/web3Hooks/useConnectedWallet";
import { createContainer } from 'unstated-next';
import useGetChainID from './useGetChainID';
import { chainIDArr } from '@/chain';
type objKeyObjectType = {
    [key: string]: object;
}
type walletType = {
    erc20: Contract | null,
    VRFCoordinatorV2: Contract | null
}
const initialState: walletType = {
    erc20: null,
    VRFCoordinatorV2: null
}
// new出合约，
const useNewContract = (props = initialState) => {
    // 获取chainid
    const { chainID } = useGetChainID()
    // new 出来的合约
    const [contracts, setContracts] = useState(props)
    // 得到signer
    const { signer } = CounterContainer.useContainer();
    // 当signer有后new出合约
    useEffect(() => {
        if (chainID && chainIDArr.indexOf(chainID) !== -1 && signer) {
            // 当重新new出合约的时候，初始化合约
            setContracts(initialState)
            try {
                let obj: objKeyObjectType = {}
                // 遍历出合约
                Object.keys(contract[chainID]).forEach((key) => {
                    if (contract[(chainID)][key].address) {
                        obj[key] = new ethers.Contract(contract[(chainID)][key].address, contract[chainID][key].abi, signer);
                    }
                })
                setContracts({ ...contracts, ...obj })
            }
            catch (e) {
                console.log('useNewContract', e);
            }
        }
        // 当链id为0的时候初始化合约
        if (!chainID) return setContracts(initialState)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chainID, signer])
    return contracts
}
const newContracts = createContainer(useNewContract)
export default newContracts
