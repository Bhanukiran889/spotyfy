import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class AlbumDetails extends Component {
  state = {
    album: null,
    isLoading: true,
    hasError: false,
    currentTrack: null,
  }

  componentDidMount() {
    this.fetchAlbum()
  }

  fetchAlbum = async () => {
    const {match} = this.props
    const {albumId} = match.params
    const token = Cookies.get('jwt_token')

    if (!token) {
      this.setState({hasError: true, isLoading: false})
      return
    }

    try {
      const response = await fetch(
        `https://apis2.ccbp.in/spotify-clone/album-details/${albumId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (response.ok) {
        const data = await response.json()
        this.setState({album: data, isLoading: false})
      } else {
        this.setState({hasError: true, isLoading: false})
      }
    } catch (error) {
      console.error('Fetch error:', error)
      this.setState({hasError: true, isLoading: false})
    }
  }

  handleTrackClick = track => {
    this.setState({currentTrack: track})
  }

  render() {
    const {album, isLoading, hasError, currentTrack} = this.state

    if (isLoading) return <p>Loading...</p>
    if (hasError) return <p>Something went wrong. Please try again later.</p>
    if (!album) return null

    return (
      <div style={{paddingBottom: '100px'}}>
        <h2>{album.name}</h2>
        <img src={album.images[0]?.url} alt={album.name} width="200" />
        <ul>
          {album.tracks.items.map(track => (
            <li
              key={track.id}
              onClick={() => this.handleTrackClick(track)}
              style={{cursor: 'pointer', marginBottom: '10px'}}
            >
              <strong>{track.name}</strong> - {track.artists[0]?.name} -{' '}
              {(track.duration_ms / 60000).toFixed(2)} mins
            </li>
          ))}
        </ul>

        {/* Bottom Audio Player */}
        {currentTrack && currentTrack.preview_url && (
          <div className="bottom-audio-player">
            <p>
              Now Playing: <strong>{currentTrack.name}</strong> -{' '}
              {currentTrack.artists[0]?.name}
            </p>
            <audio
              controls
              autoPlay
              src={currentTrack.preview_url}
              className="audio-element"
            >
              <track kind="captions" src="" label="No captions available" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(AlbumDetails)
