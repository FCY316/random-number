import copy from '@/image/copy.png'
import './index.scss'
import { handleCopyClick, mobileHidden } from '@/utils'
import { useTranslation } from 'react-i18next'
// 可验证随机数信息
const RandomNumberInformation = () => {
    const { t } = useTranslation()
    return <div className='randomNumberInformation'>
        <div className='randomNumberInformation-title'>{t('home.verifiableRandomNumberInformation')}</div>
        <div className='randomNumberInformation-context'>
            <div className='randomNumberInformation-context-item'>
                <span>{t('home.verifiableRandomNumberContracts')}</span>
                <span className='pointer'>
                    {mobileHidden('0xcc51…454a', 6, 4)}
                    <img  onClick={() => { handleCopyClick('0xcc51…454a') }} src={copy} alt="" />
                </span>
            </div>
            <div className='randomNumberInformation-context-item'>
                <span>key hash</span>
                <span>
                    {mobileHidden('0xcc51…454a', 6, 4)}
                    <img className='pointer' onClick={() => { handleCopyClick('0xcc51…454a') }} src={copy} alt="" />
                </span>
            </div>
            <div className='randomNumberInformation-context-item'>
                <span>{t('home.maximumGasPrice')}</span>
                <span>
                    10 Gwei
                </span>
            </div>
        </div>
    </div>
}

export default RandomNumberInformation