import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class PlaylistSection extends Component {
  state = {
    items: [],
    isLoading: true,
    hasError: false,
  }

  componentDidMount() {
    this.getPlaylists()
  }

  getPlaylists = async () => {
    const {apiUrl, type} = this.props
    this.setState({isLoading: true, hasError: false})

    try {
      const response = await fetch(apiUrl)

      if (response.ok) {
        const data = await response.json()
        let updatedItems = []

        if (type === 'featured-playlists') {
          updatedItems = data.playlists.items.map(each => ({
            id: each.id,
            name: each.name,
            imageUrl: each.images[0]?.url,
            description: each.description,
            spotifyUrl: each.external_urls.spotify,
          }))
        } else if (type === 'categories') {
          updatedItems = data.categories.items.map(each => ({
            id: each.id,
            name: each.name,
            imageUrl: each.icons[0]?.url,
            description: each.name,
            spotifyUrl: '#',
          }))
        } else if (type === 'new-releases') {
          updatedItems = data.albums.items.map(each => ({
            id: each.id,
            name: each.name,
            imageUrl: each.images[0]?.url,
            description: each.name,
            spotifyUrl: each.external_urls.spotify,
          }))
        }

        this.setState({items: updatedItems, isLoading: false})
      } else {
        this.setState({hasError: true, isLoading: false})
      }
    } catch (error) {
      console.error(error)
      this.setState({hasError: true, isLoading: false})
    }
  }

  renderContent = () => {
    const {items, hasError} = this.state
    const {type} = this.props

    const routeMap = {
      'featured-playlists': 'playlist',
      categories: 'category',
      'new-releases': 'albums',
    }

    const routePrefix = routeMap[type] || ''

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
            onClick={this.getPlaylists}
          >
            Try Again
          </button>
        </div>
      )
    }

    return (
      <ul className="playlist-list">
        {items.map(each => {
          let toUrl = `/${routePrefix}/${each.id}`
          let altText = ''

          if (type === 'categories') {
            toUrl = `/category/${each.id}/playlists`
            altText = 'category'
          } else if (type === 'featured-playlists') {
            altText = 'featured playlist'
          } else if (type === 'new-releases') {
            altText = 'new release album'
          }

          const isLongName = each.name.length > 20

          return (
            <li
              key={each.id}
              className={`playlist-item ${
                isLongName ? 'playlist-long-name' : ''
              }`}
            >
              <Link to={toUrl} className="playlist-link">
                <div className="lick-card">
                  <div className="img-container">
                    <img
                      src={each.imageUrl}
                      alt={altText}
                      className="playlist-img"
                    />
                  </div>
                  <div className="playlist-name-wrapper">
                    <p className="playlist-name">{each.name}</p>
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="playlist-section-container">
        {isLoading ? (
          <div data-testid="loader" className="playlist-loader-container">
            <p className="playlist-loading-text">Loading...</p>
          </div>
        ) : (
          this.renderContent()
        )}
      </div>
    )
  }
}

export default PlaylistSection
