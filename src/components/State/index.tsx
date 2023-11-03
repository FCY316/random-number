import './index.scss'
const State = (props: { state: boolean | number }) => {
  const { state } = props
  return (
    <div className={`state  ${state ? 'bgColor1' : 'bgColor2'} `} />
  )
}

export default State