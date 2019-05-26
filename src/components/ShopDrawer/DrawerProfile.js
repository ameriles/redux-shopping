import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { List, ListItem, Avatar, ListItemText, ListItemSecondaryAction, ListItemIcon, IconButton } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const DrawerCart = ({ loggedUser, onCloseSession }) => (
  <List>
    {
      loggedUser
        ? <ListItem>
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
          <ListItemText primary={loggedUser.username} secondary={moment(loggedUser.loggedAt).fromNow()} />
          <ListItemSecondaryAction>
            <IconButton aria-label='Exit' onClick={onCloseSession}>
              <ExitToAppIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        : <ListItem button component={Link} to='/login'>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary='Log In' />
        </ListItem>
    }
  </List>
)

DrawerCart.propTypes = {
  loggedUser: PropTypes.object,
  onCloseSession: PropTypes.func.isRequired
}

export default DrawerCart
