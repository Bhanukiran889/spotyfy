import {withRouter} from 'react-router-dom'

import './index.css'

const BackButton = props => {
  const {history} = props
  const onBack = () => history.goBack()
  return (
    <div className="">
      <button
        type="button"
        className="back-btn back-container"
        onClick={onBack}
      >
        <img
          className="back-icon"
          src="https://res.cloudinary.com/dulgbxqkm/image/upload/v1745318895/arrow_back_lnm6iz.png"
          alt="back icon"
        />
        <spam className="back-text">Back</spam>
      </button>
    </div>
  )
}

export default withRouter(BackButton)
