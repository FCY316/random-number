import { useNavigate } from 'react-router-dom';
import left from '@/image/left.png'
import './index.scss'
const Return = (data: {
  path?: any;
  text: string;
}) => {
  const { path = -1, text } = data
  //初始化路由
  const navigate = useNavigate();
  // 路由跳转
  const go = () => {
    navigate(path)
  }
  return (
    <div className='return'>
      <span onClick={go}>
        <img src={left} alt="" />
        <div  >{text} </div>
      </span>
    </div>
  )
}

export default Return