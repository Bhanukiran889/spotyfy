import './index.css'

const Reload = props => {
  const {reload} = props
  return (
    <div className="playlist-error-container">
      <img
        className="playlist-error-img"
        src="https://res.cloudinary.com/dulgbxqkm/image/upload/v1745397060/Icon_1_vcnjka.png"
        alt="failure view"
      />
      <p className="playlist-error-text">
        Something went wrong. Please try again
      </p>
      <button className="playlist-try-again-btn" type="button" onClick={reload}>
        Try Again
      </button>
    </div>
  )
}

export default Reload
