import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import ShopAppBar from './components/ShopAppBar'
import ShopDrawer from './components/ShopDrawer'
import Login from './components/Login'
import ProductList from './components/ProductList'
import ProductDetails from './components/ProductDetails'
import Cart from './components/Cart'
import './App.css'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    success: {
      light: '62fe4b',
      main: '#00ca00',
      dark: '#009800'
    }
  }
})

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      appTitle: 'React Shopping',
      isDrawerOpen: false,
      loggedUser: null,
      cartItems: []
    }
  }

  onAddToCart = (product) => () => {
    const cartItems = [...this.state.cartItems, product]
    this.setState({ cartItems })
  }

  onDrawerToggle = (open) => () => {
    this.setState({
      isDrawerOpen: open
    })
  }

  onLogged = (loggedUser) => {
    this.setState({ loggedUser })
  }

  onSessionClosed = () => {
    this.setState({
      loggedUser: null,
      cartItems: []
    })
  }

  onSetAppTitle = (appTitle) => {
    this.setState({ appTitle })
  }

  render () {
    const { isDrawerOpen, loggedUser, cartItems, appTitle } = this.state
    const cartItemsCount = cartItems.length
    const hasLoggedUser = loggedUser !== null
    return (
      <HashRouter>
        <MuiThemeProvider theme={theme}>
          <ShopAppBar title={appTitle} cartItemsCount={cartItemsCount}
            hasLoggedUser={hasLoggedUser} onDrawerToggle={this.onDrawerToggle} />
          <ShopDrawer open={isDrawerOpen} loggedUser={loggedUser} cartItemsCount={cartItemsCount}
            onToggle={this.onDrawerToggle} onSessionClosed={this.onSessionClosed} />
          <Route path='/login' render={(props) => <Login {...props} onLogged={this.onLogged} onSetAppTitle={this.onSetAppTitle} />} />
          <Route path='/' exact render={(props) => <ProductList {...props} hasLoggedUser={hasLoggedUser} onAddToCart={this.onAddToCart} onSetAppTitle={this.onSetAppTitle} />} />
          <Route path='/products/:id' render={(props) => <ProductDetails {...props} hasLoggedUser={hasLoggedUser} onAddToCart={this.onAddToCart} onSetAppTitle={this.onSetAppTitle} />} />
          <Route path='/cart' render={(props) => <Cart {...props} cartItems={cartItems} onSetAppTitle={this.onSetAppTitle} />} />
        </MuiThemeProvider>
      </HashRouter>
    )
  }
}

export default App
