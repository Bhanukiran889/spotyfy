import {Component} from 'react'
import PlaylistSection from '../PlaylistSection'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="nav-card">
          <Header />
        </div>
        <div className="home-container">
          <div className="home-sections-container">
            <PlaylistSection
              title="Featured Playlists"
              type="featured-playlists"
              apiUrl="https://apis2.ccbp.in/spotify-clone/featured-playlists"
            />
            <PlaylistSection
              title="Categories"
              type="categories"
              apiUrl="https://apis2.ccbp.in/spotify-clone/categories"
            />
            <PlaylistSection
              title="New Releases"
              type="new-releases"
              apiUrl="https://apis2.ccbp.in/spotify-clone/new-releases"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Home
