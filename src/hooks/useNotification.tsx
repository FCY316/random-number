import { App } from 'antd';
type NotificationType = 'success' | 'info' | 'warning' | 'error';
// 通知提醒框
function useNotification() {
    const { notification } = App.useApp();

    const openNotification = (type: NotificationType, config: { message: string, description?: string }) => {
        notification[type]({
            ...config,
        });
    };
    const showNotification = (type: NotificationType, config: { message: string, description?: string }) => {
        return openNotification(type, config);
    };

    return { showNotification };
}

export default useNotification;
