import {Link} from 'react-router-dom'
import Header from '../Header'
import BackButton from '../BackButton'
import './index.css'

const NotFound = () => (
  <div className="container">
    <div>
      <Header />
    </div>
    <div className="not-found-container">
      <BackButton />
      <img
        src="https://res.cloudinary.com/dulgbxqkm/image/upload/v1745332155/404_ijkyub.png"
        alt="page not found"
        className="not-found-img"
      />
      <h1 className="not-found-text">PAGE NOT FOUND</h1>
      <Link to="/">
        <button className="login-button home-btn" type="button">
          Home Page
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
