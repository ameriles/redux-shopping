import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { SwipeableDrawer } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import DrawerProfile from './DrawerProfile'
import DrawerCart from './DrawerCart'

const styles = theme => ({
  drawer: {
    width: 250
  }
})

class ShopDrawer extends React.Component {
  onCloseSession = (event) => {
    const { onSessionClosed, history, location } = this.props

    onSessionClosed()
    location.pathname !== '/' && history.push('/')
  }

  render () {
    const { open, onToggle, loggedUser, cartItemsCount, classes } = this.props
    return (
      <SwipeableDrawer
        open={open}
        onClose={onToggle(false)}
        onOpen={onToggle(true)}>

        <div className={classes.drawer}
          tabIndex={0}
          role='button'
          onClick={onToggle(false)}
          onKeyDown={onToggle(false)}>
          <DrawerProfile loggedUser={loggedUser} onCloseSession={this.onCloseSession} />
          {loggedUser ? <DrawerCart cartItemsCount={cartItemsCount} /> : null}
        </div>
      </SwipeableDrawer>
    )
  }
}

ShopDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onSessionClosed: PropTypes.func.isRequired,
  loggedUser: PropTypes.object,
  cartItemsCount: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object
}

export default withRouter(withStyles(styles)(ShopDrawer))
