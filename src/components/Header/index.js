import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-header">
      <div className="nav-content">
        <Link to="/">
          <img
            className="website-nav-logo"
            src="https://res.cloudinary.com/dulgbxqkm/image/upload/v1745139104/Vector_zkrlha.png"
            alt="website logo"
          />
        </Link>
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          <img
            src="https://res.cloudinary.com/dulgbxqkm/image/upload/v1745162125/log-out-04_ykzr6q.png"
            alt="logout icon"
            className="logout-icon"
          />
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
