import Cookies from 'js-cookie'
import {Redirect, withRouter} from 'react-router-dom'
import PlaylistSection from '../PlaylistSection'
import Header from '../Header'
import GanresSection from '../GanresSection'
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
        <h1>Editor's Picks</h1>
        <PlaylistSection apiUrl="https://apis2.ccbp.in/spotify-clone/featured-playlists" />

        <h1>Genres & Moods</h1>
        <GanresSection apiUrl="https://apis2.ccbp.in/spotify-clone/featured-playlists" />
      </div>
    </div>
  )
}

export default withRouter(Home)
