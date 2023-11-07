import copy from '@/image/copy.png'
import './index.scss'
import { mobileHidden } from '@/utils'
import { useTranslation } from 'react-i18next'
import useHandleCopyClick from '@/hooks/useHandleCopyClick'
import useGetChainID from '@/web3Hooks/useGetChainID'
import SpinC from '@/components/SpinC'
import contract from '@/abi/index'
import useGetRequestConfig from '@/web3Hooks/useGetRequestConfig'
// 可验证随机数信息
const RandomNumberInformation = () => {
    // 获取chainID因为我把框架改成切换链，自动重新new出合约等，故需要chainID来进行判断是那个链是的合约
    const { chainID, chainIDLod } = useGetChainID()
    // 复制
    const { handleCopyClick } = useHandleCopyClick()
    // 翻译
    const { t } = useTranslation()
    // 获取最高gas价格合key hash
    const { getRequestConfigLod, config } = useGetRequestConfig()
    return <div className='randomNumberInformation'>
        <div className='randomNumberInformation-title'>{t('home.verifiableRandomNumberInformation')}</div>
        <div className='randomNumberInformation-context'>
            <div className='randomNumberInformation-context-item'>
                <span>{t('home.verifiableRandomNumberContracts')}</span>
                <span className='pointer'>
                    {
                        chainIDLod ? <SpinC /> : <>
                            {mobileHidden(contract[chainID].VRFCoordinatorV2.address, 6, 4)}
                            <img onClick={() => { handleCopyClick(contract[chainID]?.VRFCoordinatorV2.address || '您不在支持的链上') }} src={copy} alt="" />
                        </>
                    }
                </span>
            </div>
            <div className='randomNumberInformation-context-item'>
                <span>key hash</span>
                <span>
                    {getRequestConfigLod ? <SpinC /> : <>
                        {mobileHidden(config[2][0], 6, 4)}
                        <img className='pointer' onClick={() => { handleCopyClick(config[2][0] || '您不在支持的链上') }} src={copy} alt="" />
                    </>}

                </span>
            </div>
            <div className='randomNumberInformation-context-item'>
                <span>{t('home.maximumGasPrice')}</span>
                <span>
                    {getRequestConfigLod ? <SpinC /> : config[1] + ''} Gwei
                </span>
            </div>
        </div>
    </div>
}

export default RandomNumberInformation