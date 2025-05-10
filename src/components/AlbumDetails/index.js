import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaPlay, FaPause, FaVolumeUp, FaVolumeMute} from 'react-icons/fa'

import Header from '../Header'
import BackButton from '../BackButton'
import './index.css'

class AlbumDetails extends Component {
  constructor(props) {
    super(props)
    this.audioRef = null
    this.state = {
      album: null,
      isLoading: true,
      hasError: false,
      currentTrack: null,
      isPlaying: false,
      volume: 1,
      duration: 0,
      currentTime: 0,
    }
  }

  componentDidMount() {
    this.fetchAlbum()
  }

  componentDidUpdate(_, prevState) {
    const {currentTrack} = this.state
    if (this.audioRef && prevState.currentTrack !== currentTrack) {
      this.audioRef.load()
      this.audioRef.play()
      this.setState({isPlaying: true})
    }
  }

  fetchAlbum = async () => {
    const {
      match: {
        params: {albumId},
      },
    } = this.props
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

  handlePlayPause = () => {
    const {isPlaying} = this.state
    if (isPlaying) {
      this.audioRef.pause()
    } else {
      this.audioRef.play()
    }
    this.setState(prevState => ({isPlaying: !prevState.isPlaying}))
  }

  handleTimeUpdate = () => {
    this.setState({currentTime: this.audioRef.currentTime})
  }

  handleLoadedMetadata = () => {
    this.setState({duration: this.audioRef.duration})
  }

  handleSeek = event => {
    const seekTime = parseFloat(event.target.value)
    this.audioRef.currentTime = seekTime
    this.setState({currentTime: seekTime})
  }

  handleVolumeChange = event => {
    const newVolume = parseFloat(event.target.value)
    this.audioRef.volume = newVolume
    this.setState({volume: newVolume})
  }

  setAudioRef = ref => {
    this.audioRef = ref
  }

  render() {
    const {
      album,
      isLoading,
      hasError,
      currentTrack,
      isPlaying,
      volume,
      duration,
      currentTime,
    } = this.state

    if (isLoading) return <p>Loading...</p>
    if (hasError) return <p>Something went wrong. Please try again later.</p>
    if (!album) return null

    return (
      <div className="container">
        <Header />
        <div className="album-container">
          <BackButton />
          <div className="album-details-header">
            <h2 className="album-details-title">{album.name}</h2>
            <img
              src={album.images[0]?.url}
              alt={album.name}
              className="album-details-image"
            />
          </div>
          <ul className="album-tracklist">
            {album.tracks.items.map(track => {
              const {
                id,
                name,
                artists,
                duration_ms: durationMs,
                preview_url: previewUrl,
              } = track
              return (
                <li
                  key={id}
                  onClick={() =>
                    this.handleTrackClick({
                      id,
                      name,
                      artists,
                      durationMs,
                      previewUrl,
                    })
                  }
                  className="album-tracklist-item"
                >
                  <strong>{name}</strong> - {artists[0]?.name} -{' '}
                  {(durationMs / 60000).toFixed(2)} mins
                </li>
              )
            })}
          </ul>
          {currentTrack?.previewUrl && (
            <div className="album-audio-player">
              <audio
                ref={this.setAudioRef}
                src={currentTrack.previewUrl}
                onTimeUpdate={this.handleTimeUpdate}
                onLoadedMetadata={this.handleLoadedMetadata}
                preload="metadata"
              >
                <track kind="captions" label="No captions available" src="" />
              </audio>
              <div className="custom-audio-controls">
                <button
                  type="button"
                  onClick={this.handlePlayPause}
                  className="audio-btn"
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={this.handleSeek}
                  className="timeline-slider"
                />
                <div className="volume-wrap">
                  <span className="volume-icon">
                    {volume > 0 ? <FaVolumeUp /> : <FaVolumeMute />}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={this.handleVolumeChange}
                    className="volume-slider"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(AlbumDetails)
