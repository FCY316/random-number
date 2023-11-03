import { memo, useState } from "react";
import logo from "@/image/logo.png";
import languageConverter from "@/image/languageConverter.png";
import walletimg from "@/image/walletimg.png";
import downarrow from "@/image/downarrow.png";
import copy from "@/image/copy.png";
import href from "@/image/href.png";
import connectedWallet from "@/web3Hooks/useConnectedWallet";
import { ConfigProvider, Dropdown, Modal, type MenuProps, Button } from 'antd';
import { useTranslation } from "react-i18next";
import "./index.scss";
import changeLocalStorage from "@/hooks/useChangeLocalStorage";
import { addressConvert, ethereumAddressImage, mobileHidden } from "@/utils";
import { useNavigate } from "react-router-dom";
import useHandleCopyClick from "@/hooks/useHandleCopyClick";
const items: MenuProps['items'] = [
  {
    key: 'cn',
    label: '中文',
  },
  {
    key: 'en',
    label: 'English',
  },
];
const Header = () => {
  // 复制
  const { handleCopyClick } = useHandleCopyClick()
  // 路由
  const navigate = useNavigate()
  // 本地缓存的语言
  const { language, changeLanguage } = changeLocalStorage.useContainer()
  // 语言hooks
  const { i18n, t } = useTranslation();
  // 获取地址，连接，断开钱包方法
  const { address, connected, breaks } = connectedWallet.useContainer();
  // 控制弹窗的参数
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 更具地址生成的图片
  const [addImg] = useState(ethereumAddressImage(address))
  // 切换语言
  const onClick: MenuProps['onClick'] = ({ key }) => {
    i18n.changeLanguage(key)
    changeLanguage(key)
  };
  // 打开弹窗
  const showModal = () => {
    setIsModalOpen(true);
  };
  // 关闭弹窗
  const handleOk = () => {
    setIsModalOpen(false);
  };
  // 去某个网站
  const goHref = (url: string) => {
    return () => {
      window.open(url)
    }
  }
  return (
    <ConfigProvider
      theme={{
        components: {
          Dropdown: {
            colorPrimary: "",
            controlPaddingHorizontal: 39,
            controlItemBgActive: "#F1F1F1",
            controlItemBgActiveHover: "#F1F1F1"
          },
          Modal: {
            paddingLG: 20,
            paddingContentHorizontalLG: 18
          }
        },
      }}>
      <nav className="header">
        <div className="header-logo">
          <img src={logo} alt="" />
          <span>{t('header.randomNumber')}</span>
        </div>
        <div className="header-function">

          <Dropdown overlayClassName="header-function-language-Dropdown" trigger={['click']} menu={{
            items, onClick, selectable: true,
            defaultSelectedKeys: [language || 'cn']
          }} placement="bottom" arrow>
            <div className="header-function-language pointer">
              <img onClick={(e) => e.preventDefault()} src={languageConverter} alt="" />
            </div>
          </Dropdown>
          <div className="header-function-address pointer">
            {address ? (
              <div onClick={showModal}>
                <img src={walletimg} alt="" />
                <img src={downarrow} alt="" />
              </div>
            ) : (
              <span onClick={() => { connected() }}>{t('header.connectedWallet')}</span>
            )}
          </div>
        </div>
        <Modal className="header-modal" footer={null} closeIcon={false} open={isModalOpen} onOk={handleOk} onCancel={handleOk}>
          <div className="header-modal-context">
            <img className="header-modal-context-logo" src={addImg} alt="" />
            <div className="header-modal-context-address pointer">
              <span>{mobileHidden(addressConvert(address))}</span>
              <img onClick={() => { handleCopyClick(addressConvert(address)) }} src={copy} alt="" />
            </div>
            <div className="header-modal-context-network"><span>Network</span><span>Fibo chain</span></div>
            <Button onClick={() => { breaks(); handleOk(); navigate('/'); }} className='btn header-modal-context-network-btn'>{t('header.exitWallet')}</Button>
            <div className="header-modal-context-fiboscan pointer" onClick={goHref('https://scan.fibochain.org/')}>
              <span>View on Testfiboscan</span>
              <img src={href} alt="" />
            </div>
          </div>
        </Modal>
      </nav>
    </ConfigProvider>

  );
};

export default memo(Header);
