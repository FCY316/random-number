import empty from '@/image/empty.png'
import './index.scss'
import { useTranslation } from 'react-i18next'
const Empty = () => {
      // 翻译
  const { t } = useTranslation()
    return (
        <div className='empty'>
            <img src={empty} alt="" />
            <p>{t('Empty.noData')}</p>
        </div>
    )
}

export default Empty