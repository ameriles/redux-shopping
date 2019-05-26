import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const DrawerCart = ({ cartItemsCount }) => (
  <List>
    <ListItem button component={Link} to='/cart'>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText
        primary={`Cart (${cartItemsCount} items)`}
        secondary='Tap to checkout'
      />
    </ListItem>
  </List>
)

DrawerCart.propTypes = {
  cartItemsCount: PropTypes.number.isRequired
}

export default withRouter(DrawerCart)
