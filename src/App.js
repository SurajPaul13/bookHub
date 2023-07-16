import {Switch, Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import BookshelvesRoute from './components/BookshelvesRoute'
import BookDetailsRoute from './components/BookDetailsRoute'
import NotFound from './components/NotFound'

import './App.css'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/shelf" component={BookshelvesRoute} />
    <ProtectedRoute exact path="/book/:id" component={BookDetailsRoute} />
    <Route component={NotFound} />
  </Switch>
)

export default App
