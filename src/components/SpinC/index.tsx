import { Spin } from 'antd';
type sizeType = 'small' | 'large' | undefined
const SpinC = (props: { size?: sizeType, lineHeight?: string }) => {
    const { size = 'small', lineHeight = '0' } = props
    return <Spin style={{ lineHeight: lineHeight }} size={size} />

}

export default SpinC