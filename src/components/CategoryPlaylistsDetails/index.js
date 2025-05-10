import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import BackButton from '../BackButton'
import './index.css'

class CategoryPlaylistsDetails extends Component {
  state = {
    playlists: [],
    isLoading: true,
    hasError: false,
  }

  componentDidMount() {
    this.fetchCategoryPlaylists()
  }

  fetchCategoryPlaylists = async () => {
    const {match} = this.props
    const {id} = match.params
    const token = Cookies.get('jwt_token')

    try {
      const response = await fetch(
        `https://apis2.ccbp.in/spotify-clone/category-playlists/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (response.ok) {
        const data = await response.json()
        this.setState({playlists: data.playlists.items, isLoading: false})
      } else {
        this.setState({hasError: true, isLoading: false})
      }
    } catch (error) {
      console.error(error)
      this.setState({hasError: true, isLoading: false})
    }
  }

  render() {
    const {playlists, isLoading, hasError} = this.state

    if (isLoading) return <p>Loading playlists...</p>
    if (hasError) return <p>Error loading playlists.</p>

    return (
      <div className="container">
        <div>
          <Header />
        </div>
        <div className="main-container">
          <div>
            <BackButton />
          </div>
          <div className="category-container">
            <h2>Category Playlists</h2>
            <ul className="category-list">
              {playlists.map(playlist => (
                <li className="category-item" key={playlist.id}>
                  <Link to={`/playlist/${playlist.id}`}>
                    <img
                      src={playlist.images[0]?.url}
                      alt={playlist.name}
                      width="150"
                    />
                    <p>{playlist.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(CategoryPlaylistsDetails)
