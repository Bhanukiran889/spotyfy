import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div className="container">
      <div>
        <Header />
      </div>
      <div className="home-container">
        <button type="button" className="back-btn">
          <img
            src="https://res.cloudinary.com/dulgbxqkm/image/upload/v1745318895/arrow_back_lnm6iz.png"
            alt="back icon"
          />
        </button>
        <span>Back</span>
      </div>
    </div>
  )
}

export default Home
