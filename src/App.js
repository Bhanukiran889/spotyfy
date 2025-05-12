import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import AlbumDetails from './components/AlbumDetails'

import PlaylistDetails from './components/PlaylistDetails'
import CategoryPlaylistsDetails from './components/CategoryPlaylistsDetails'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <Route exact path="/playlist/:id" component={PlaylistDetails} />
      <Route
        exact
        path="/category/:id/playlists"
        component={CategoryPlaylistsDetails}
      />

      <ProtectedRoute exact path="/album/:albumId" component={AlbumDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
