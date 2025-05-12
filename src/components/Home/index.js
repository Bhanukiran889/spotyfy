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
            <h1>Editors Picks</h1>
            <PlaylistSection
              title="Featured Playlists"
              type="featured-playlists"
              apiUrl="https://apis2.ccbp.in/spotify-clone/featured-playlists"
            />
            <h1>Genres & Moods</h1>
            <PlaylistSection
              title="Categories"
              type="categories"
              apiUrl="https://apis2.ccbp.in/spotify-clone/categories"
            />
            <h1>New Releases</h1>
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
