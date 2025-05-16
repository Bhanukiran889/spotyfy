import './index.css'

const Loader = ({color = '#75e037', size = 35, speed = 0.8}) => {
  const style = {
    '--uib-color': color,
    '--uib-size': `${size}px`,
    '--uib-speed': `${speed}s`,
  }

  return (
    <div className="loader-wrapper" style={style} aria-label="Loading">
      <div className="three-body">
        <div className="three-body__dot" />
        <div className="three-body__dot" />
        <div className="three-body__dot" />
      </div>
    </div>
  )
}

export default Loader
