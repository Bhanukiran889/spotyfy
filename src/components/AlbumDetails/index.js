import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import Header from '../Header'
import BackButton from '../BackButton'
import AudioPlayer from '../AudioPlayer'
import Loader from '../Loader'

import './index.css'

class AlbumDetails extends Component {
  state = {
    album: null,
    isLoading: true,
    hasError: false,
    currentTrack: null,
    isPlaying: false,
    volume: 2,
    duration: 0,
    currentTime: 0,
  }

  componentDidMount() {
    this.fetchAlbum()
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
        if (data.tracks.items.length > 0) {
          const firstTrack = data.tracks.items[0]
          this.setState({
            album: data,
            currentTrack: {
              id: firstTrack.id,
              name: firstTrack.name,
              artists: firstTrack.artists,
              durationMs: firstTrack.duration_ms,
              previewUrl: firstTrack.preview_url,
            },
            isLoading: false,
          })
        } else {
          this.setState({album: data, isLoading: false})
        }
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
    this.setState(prevState => ({isPlaying: !prevState.isPlaying}))
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

    if (hasError) {
      return (
        <div className="playlist-error-container">
          <img
            className="playlist-error-img"
            src="https://res.cloudinary.com/dulgbxqkm/image/upload/v1745397060/Icon_1_vcnjka.png"
            alt="failure view"
          />
          <p className="playlist-error-text">
            Something went wrong. Please try again
          </p>
          <button
            className="playlist-try-again-btn"
            type="button"
            onClick={this.fetchAlbum}
          >
            Try Again
          </button>
        </div>
      )
    }
    if (!album) return null

    return (
      <div className="container">
        <Header />
        <div className="album-container">
          {isLoading ? (
            Loader
          ) : (
            <>
              <BackButton />
              <div className="album-details-header">
                <img
                  src={album.images[0]?.url}
                  alt={album.name}
                  className="album-details-image"
                />
              </div>
              <h2 className="album-details-title">{album.name}</h2>
              <ul className="album-tracklist">
                {album.tracks.items.map(track => {
                  const {
                    id,
                    name,
                    artists,
                    duration_ms: durationMs,
                    preview_url: previewUrl,
                  } = track

                  const formattedDuration = `${Math.floor(
                    durationMs / 60000,
                  )}:${String(Math.floor((durationMs % 60000) / 1000)).padStart(
                    2,
                    '0',
                  )}`

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
                      <div className="track-texts">
                        <p className="track-name">{name}</p>
                        <p className="track-artist">{artists[0]?.name}</p>
                      </div>
                      <div className="duration">{formattedDuration}</div>
                    </li>
                  )
                })}
              </ul>
            </>
          )}

          <div className="audio-player-container">
            {currentTrack?.previewUrl && (
              <AudioPlayer
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                volume={volume}
                duration={duration}
                currentTime={currentTime}
                albumImage={album.images[0]?.url}
                onTogglePlay={this.handlePlayPause}
                onPlayStateChange={val => this.setState({isPlaying: val})}
                onVolumeChange={vol => this.setState({volume: vol})}
                onTimeUpdate={time => this.setState({currentTime: time})}
                onDuration={dur => this.setState({duration: dur})}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(AlbumDetails)
