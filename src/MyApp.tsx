import AppRouter from '@/router'
import './MyApp.scss';
import useListenerNetWork from '@/web3Hooks/useListenerNetWork';
import useWatchWalletAddress from '@/web3Hooks/useWatchWalletAddress';
import { ConfigProvider } from 'antd';
import { App } from 'antd';
// import "@/log/index";

function MyApp() {
  // 监听网络
  useListenerNetWork()
  // 监听地址
  useWatchWalletAddress()
  return (
    <div className="App">
      <ConfigProvider
        theme={{
          components: {
            Button: {
              contentFontSize: 16,
              fontWeight: "500",
              defaultBg: "#1E1E1E",
              defaultColor: "#ffffff",
              borderRadius: 8,
              colorPrimaryHover: "#ffffff",
              colorPrimaryActive: "#ffffff",
              defaultShadow: "#808080"
            },
            Input: {
              activeBorderColor: "#1e1e1e",
              hoverBorderColor: "#1e1e1e",
              activeShadow: '0 0 0 2px rgba(0, 0, 0, 0)',
              colorBorder: "#1e1e1e"
            },
            Notification: {
              fontSizeLG: 14,
              fontSize: 12,
              width: 250,
              marginLG: 0,
              paddingContentHorizontalLG: 15,
              paddingMD: 10,
              paddingLG: 10,
              marginXS: 0

            },
            Table: {
              borderColor: "transparent",
              headerSplitColor: "transparent",
              headerColor: "#9E9E9E",
              headerBg: "#F7F7F7",
              rowHoverBg: "transparent",
              fontWeightStrong: 500,
              bodySortBg: '#ffffff',

            },
            Pagination: {
              colorPrimary: "#373737",
              colorPrimaryHover: "#373737",
              itemActiveBg: "#373737",
              itemSize: 24,
            }
          },
        }}>
        <App>
          <AppRouter />
        </App>
      </ConfigProvider>
    </div>
  );
}

export default MyApp;
