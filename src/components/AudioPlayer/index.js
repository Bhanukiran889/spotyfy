import React, {Component} from 'react'
import {FaPlay, FaPause, FaVolumeUp, FaVolumeMute} from 'react-icons/fa'
import './index.css'

class AudioPlayer extends Component {
  audioRef = React.createRef()

  componentDidMount() {
    const {currentTrack, onPlayStateChange} = this.props

    if (currentTrack?.previewUrl) {
      this.audioRef.current.load()
      this.audioRef.current.play()
      onPlayStateChange(true)
    }
  }

  componentDidUpdate(prevProps) {
    const {currentTrack, isPlaying, onPlayStateChange} = this.props

    if (
      currentTrack?.previewUrl &&
      prevProps.currentTrack?.id !== currentTrack.id
    ) {
      this.audioRef.current.load()
      this.audioRef.current.play()
      onPlayStateChange(true)
    }

    if (prevProps.isPlaying !== isPlaying) {
      if (isPlaying) {
        this.audioRef.current.play()
      } else {
        this.audioRef.current.pause()
      }
    }
  }

  handleTimeUpdate = () => {
    const {onTimeUpdate} = this.props
    onTimeUpdate(this.audioRef.current.currentTime)
  }

  handleLoadedMetadata = () => {
    const {onDuration} = this.props
    onDuration(this.audioRef.current.duration)
  }

  handleSeek = e => {
    const {onTimeUpdate} = this.props
    const seekTime = parseFloat(e.target.value)
    this.audioRef.current.currentTime = seekTime
    onTimeUpdate(seekTime)
  }

  handleVolumeChange = e => {
    const {onVolumeChange} = this.props
    const newVolume = parseFloat(e.target.value)
    this.audioRef.current.volume = newVolume
    onVolumeChange(newVolume)
  }

  formatTime = time => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  render() {
    const {
      currentTrack,
      isPlaying,
      volume,
      duration,
      currentTime,
      albumImage,
      onTogglePlay,
    } = this.props

    if (!currentTrack?.previewUrl) return null

    return (
      <div className="album-audio-player">
        <audio
          ref={this.audioRef}
          src={currentTrack.previewUrl}
          onTimeUpdate={this.handleTimeUpdate}
          onLoadedMetadata={this.handleLoadedMetadata}
          preload="metadata"
        >
          <track kind="captions" />
        </audio>

        <div className="custom-audio-controls">
          <div className="track-info-section">
            <img
              src={albumImage}
              alt={currentTrack.name}
              className="track-thumbnail"
            />
            <div className="track-meta">
              <p className="track-name">{currentTrack.name}</p>
              <p className="track-artist">{currentTrack.artists[0]?.name}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onTogglePlay}
            className="audio-btn"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <div className="tracks-line">
            <div className="timeline-wrap">
              <span className="time-label">{this.formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={this.handleSeek}
                className="timeline-slider"
                aria-label="Seek audio"
                style={{
                  background: `linear-gradient(to right, #1db954 ${
                    (currentTime / duration) * 100
                  }%, #fff ${(currentTime / duration) * 100}%)`,
                }}
              />
              <span className="time-label">{this.formatTime(duration)}</span>
            </div>

            <div className="volume-wrap">
              {volume > 0 ? <FaVolumeUp /> : <FaVolumeMute />}
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={this.handleVolumeChange}
                className="volume-slider"
                aria-label="Adjust volume"
                style={{
                  background: `linear-gradient(to right, #1db954 ${
                    volume * 100
                  }%, #fff ${volume * 100}%)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AudioPlayer
