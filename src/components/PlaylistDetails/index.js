import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Header from '../Header'
import BackButton from '../BackButton'

import './index.css'

class PlaylistDetails extends Component {
  state = {
    playlist: null,
    isLoading: true,
    hasError: false,
    currentAudioUrl: '', // ✅ Track currently playing
  }

  audioRef = null

  componentDidMount() {
    this.fetchPlaylistDetails()
  }

  fetchPlaylistDetails = async () => {
    const {match} = this.props
    const {id} = match.params
    const url = `https://apis2.ccbp.in/spotify-clone/playlists-details/${id}`

    try {
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        this.setState({playlist: data, isLoading: false})
      } else {
        this.setState({hasError: true, isLoading: false})
      }
    } catch (error) {
      console.error('Error fetching playlist details:', error)
      this.setState({hasError: true, isLoading: false})
    }
  }

  handleTrackClick = previewUrl => {
    if (this.audioRef) {
      this.audioRef.pause()
    }

    this.setState({currentAudioUrl: previewUrl}, () => {
      if (this.audioRef) {
        this.audioRef.load()
        this.audioRef.play()
      }
    })
  }

  render() {
    const {playlist, isLoading, hasError, currentAudioUrl} = this.state

    if (isLoading) {
      return <p className="playlist-details-loader">Loading playlist...</p>
    }

    if (hasError) {
      return (
        <p className="playlist-details-error">
          Error loading playlist. Please try again.
        </p>
      )
    }

    return (
      <div className="container">
        <div>
          <Header />
        </div>
        <div className="main-container">
          <BackButton />
          <div>
            <img
              src={playlist.images[0]?.url}
              alt={playlist.name}
              className="playlist-details-image"
            />
            <div>
              <p>Editors picks</p>
              <h2 className="playlist-details-title">{playlist.name}</h2>
              <p>{playlist.description}</p>
            </div>
            <ul className="playlist-details-tracks">
              {playlist.tracks.items.map(track => {
                const previewUrl = track.track.preview_url
                const isPlayable = Boolean(previewUrl)
                return (
                  <li
                    key={track.track.id}
                    className={`playlist-details-track-item ${
                      isPlayable ? 'clickable' : 'disabled'
                    }`}
                    onClick={() =>
                      isPlayable ? this.handleTrackClick(previewUrl) : null
                    }
                  >
                    {track.track.name} - {track.track.artists[0]?.name}
                    {!isPlayable && <span> (No preview)</span>}
                  </li>
                )
              })}
            </ul>
            {/* ✅ Audio player */}
            <audio
              ref={ref => {
                this.audioRef = ref
              }}
              className="playlist-audio-player"
              controls
            >
              <source src={currentAudioUrl} type="audio/mpeg" />
              <track kind="captions" srcLang="en" label="English captions" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(PlaylistDetails)
