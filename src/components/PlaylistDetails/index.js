// Unchanged imports
import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Header from '../Header'
import BackButton from '../BackButton'
import AudioPlayer from '../AudioPlayer'
import Loader from '../Loader'
import Reload from '../Reload'

import './index.css'

class PlaylistDetails extends Component {
  state = {
    playlist: null,
    isLoading: true,
    hasError: false,
    currentTrack: null,
    isPlaying: false,
    volume: 1,
    currentTime: 0,
    duration: 0,
  }

  componentDidMount() {
    this.fetchPlaylistDetails()
  }

  fetchPlaylistDetails = async () => {
    const {match} = this.props

    this.setState({hasError: false, isLoading: true})
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

  handleTrackClick = track => {
    this.setState({currentTrack: track, isPlaying: true})
  }

  handleTogglePlay = () => {
    this.setState(prevState => ({isPlaying: !prevState.isPlaying}))
  }

  handleTimeUpdate = currentTime => {
    this.setState({currentTime})
  }

  handleDuration = duration => {
    this.setState({duration})
  }

  handleVolumeChange = volume => {
    this.setState({volume})
  }

  handlePlayStateChange = isPlaying => {
    this.setState({isPlaying})
  }

  render() {
    const {
      playlist,
      isLoading,
      hasError,
      currentTrack,
      isPlaying,
      volume,
      currentTime,
      duration,
    } = this.state

    if (hasError) {
      return <Reload reload={this.fetchPlaylistDetails} />
    }

    return (
      <div className="container">
        <Header />
        <div className="main-container">
          <BackButton />

          {isLoading ? (
            <div className="loading-container">
              <Loader />
            </div>
          ) : (
            <div className="content-container">
              <div className="headings">
                <img
                  src={
                    playlist.images?.[0]?.url ||
                    'https://via.placeholder.com/200'
                  }
                  alt={playlist.name}
                  className="playlist-details-image"
                />
                <div className="playlist-meta">
                  <h2 className="playlist-details-title">{playlist.name}</h2>
                  <p className="playlist-details-description">
                    {playlist.description}
                  </p>
                </div>
              </div>
              <div className="track-list">
                <div className="playlist-details-headings">
                  <p>Track</p>
                  <p>Album</p>
                  <p>Time</p>
                  <p>Artist</p>
                </div>

                <ul className="playlist-details-tracks">
                  {playlist.tracks.items.map(({track}) => {
                    const {
                      preview_url: previewUrl,
                      id,
                      name,
                      artists,
                      album,
                    } = track
                    const isPlayable = Boolean(previewUrl)

                    return (
                      <li
                        key={id}
                        className={`playlist-details-track-item ${
                          isPlayable ? 'clickable' : 'disabled'
                        }`}
                        onClick={() =>
                          isPlayable ? this.handleTrackClick(track) : null
                        }
                      >
                        <div className="track-title">
                          <p className="track-name">{name}</p>
                          <p className="track-artist artist-lg">
                            {artists[0]?.name || 'Unknown Artist'}
                          </p>
                        </div>
                        <p className="track-album">
                          {album?.name || 'Unknown Album'}
                        </p>
                        <p className="track-duration">
                          {track.duration_ms
                            ? `${Math.floor(
                                track.duration_ms / 60000,
                              )}:${String(
                                Math.floor((track.duration_ms % 60000) / 1000),
                              ).padStart(2, '0')}`
                            : '0:00'}
                        </p>
                        <p className="track-artist artist-sm">
                          {artists[0]?.name || 'Unknown Artist'}
                        </p>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          )}

          <div className="audio-player-container">
            {currentTrack && (
              <AudioPlayer
                currentTrack={{
                  id: currentTrack.id,
                  name: currentTrack.name,
                  previewUrl: currentTrack.preview_url,
                  artists: currentTrack.artists,
                }}
                albumImage={playlist.images[0]?.url}
                isPlaying={isPlaying}
                onTogglePlay={this.handleTogglePlay}
                onTimeUpdate={this.handleTimeUpdate}
                onDuration={this.handleDuration}
                currentTime={currentTime}
                duration={duration}
                volume={volume}
                onVolumeChange={this.handleVolumeChange}
                onPlayStateChange={this.handlePlayStateChange}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(PlaylistDetails)
