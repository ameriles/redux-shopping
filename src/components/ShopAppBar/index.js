import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Typography, Badge, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { connect } from 'react-redux'

const styles = theme => ({
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    flexGrow: 1
  }
})

const ShopAppBar = ({ title, cartItemsCount, hasLoggedUser, onDrawerToggle, location, history, classes }) => {
  const isHome = location.pathname === '/'
  const menuButton = isHome
    ? <IconButton className={classes.menuButton} color='inherit' aria-label='Open drawer'
      onClick={onDrawerToggle(true)}>
      <MenuIcon />
    </IconButton>
    : (
      <IconButton className={classes.menuButton} color='inherit' aria-label='Go Back' onClick={history.goBack}>
        <ArrowBackIcon />
      </IconButton>
    )

  return (
    <AppBar position='fixed'>
      <Toolbar>
        {menuButton}
        <Typography className={classes.title} variant='h6' color='inherit' noWrap>
          {title}
        </Typography>

        {
          hasLoggedUser
            ? <div>
              <IconButton color='inherit' component={Link} to='/cart'>
                <Badge badgeContent={cartItemsCount} color='secondary' invisible={(cartItemsCount <= 0)}>
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </div>
            : <Button color='inherit' component={Link} to='/login'>
          Login
            </Button>
        }

      </Toolbar>
    </AppBar>
  )
}

ShopAppBar.propTypes = {
  title: PropTypes.string.isRequired,
  cartItemsCount: PropTypes.number.isRequired,
  hasLoggedUser: PropTypes.bool.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
  location: PropTypes.object,
  history: PropTypes.object,
  classes: PropTypes.object
}

const mapStateToProps = state => ({
  cartItemsCount: state.cart.items.length
})

export default connect(mapStateToProps)(withRouter(withStyles(styles)(ShopAppBar)))
