import {Link, withRouter} from 'react-router-dom'
import {useState} from 'react'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const [isMenu, setMenu] = useState(false)

  const onMenu = () => {
    setMenu(prevState => !prevState)
  }

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

        {/* Large screen logout button */}
        <button
          type="button"
          className="logout-btn-xl logout-btn"
          onClick={onClickLogout}
        >
          <img
            src="https://res.cloudinary.com/dulgbxqkm/image/upload/v1745162125/log-out-04_ykzr6q.png"
            alt="logout icon"
            className="logout-icon"
          />
          Logout
        </button>

        {/* Small screen logout button */}
        <button
          type="button"
          className={`logout-btn-sm logout-btn ${isMenu ? '' : 'is-menu'}`}
          onClick={onClickLogout}
        >
          <img
            src="https://res.cloudinary.com/dulgbxqkm/image/upload/v1745162125/log-out-04_ykzr6q.png"
            alt="logout icon"
            className="logout-icon"
          />
          Logout
        </button>

        {/* Menu button with class toggle */}
        <button
          type="button"
          onClick={onMenu}
          className={`menu-btn ${isMenu ? 'is-menu' : ''}`}
        >
          <img
            src="https://res.cloudinary.com/dulgbxqkm/image/upload/v1745315298/icon_z8lifw.png"
            alt="menu icon"
          />
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
