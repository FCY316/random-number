import { App } from "antd";
import { useTranslation } from "react-i18next";

const useHandleCopyClick = () => {
    const { i18n } = useTranslation();
    const { message } = App.useApp();
    // 复制
    const handleCopyClick = (data: string | number) => {
        const { language } = i18n
        try {
            data = data + "";
            const textField = document.createElement("textarea");
            textField.innerText = data;
            document.body.appendChild(textField);
            textField.select();
            document.execCommand("copy");
            textField.remove();
            message.success(language === 'en' ? 'Copy success ' : "复制成功");
        } catch (e) {
            message.error(language === 'en' ? 'Copy error ' : "复制失败");

        }
    };
    return { handleCopyClick }
}

export default useHandleCopyClick