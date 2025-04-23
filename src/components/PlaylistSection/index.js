import {Component} from 'react'
import {TailSpin} from 'react-loader-spinner'

import './index.css'

class PlaylistSection extends Component {
  state = {
    playlists: [],
    isLoading: true,
    hasError: false,
  }

  componentDidMount() {
    this.getPlaylists()
  }

  getPlaylists = async () => {
    const {apiUrl} = this.props
    const url = apiUrl
    this.setState({isLoading: true, hasError: false})

    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updated = data.playlists.items.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.images[0].url,
        description: each.description,
        spotifyUrl: each.external_urls.spotify,
      }))
      this.setState({playlists: updated, isLoading: false})
    } else {
      this.setState({hasError: true, isLoading: false})
    }
  }

  renderContent = () => {
    const {playlists, hasError} = this.state

    if (hasError) {
      return (
        <div className="somthing-wrong">
          <img
            className="somthing-wrong-img"
            src="https://res.cloudinary.com/dulgbxqkm/image/upload/v1745397060/Icon_1_vcnjka.png"
            alt="somthing went wrong"
          />
          <p>Something went wrong. Please try again</p>
          <button
            className="try-again-btn"
            type="button"
            onClick={this.getPlaylists}
          >
            Try Again
          </button>
        </div>
      )
    }

    return (
      <ul className="playlist-list">
        {playlists.map(each => (
          <li key={each.id} className="playlist-item">
            <img src={each.imageUrl} alt={each.name} className="playlist-img" />
            <p>{each.name}</p>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="section-container">
        {isLoading ? (
          <div className="loader">
            <TailSpin
              height={50}
              width={50}
              color="#1DB954"
              ariaLabel="loading"
              radius="2"
              visible
            />
          </div>
        ) : (
          this.renderContent()
        )}
      </div>
    )
  }
}

export default PlaylistSection
