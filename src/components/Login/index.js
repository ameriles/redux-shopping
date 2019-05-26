import React from 'react'
import PropTypes from 'prop-types'
import { TextField, Button, Paper, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import AppStyles from '../../jss/AppStyles'

const styles = theme => ({
  ...AppStyles(theme),
  formField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  card: {
    padding: theme.spacing.unit,
    margin: theme.spacing.unit
  }
})

class Login extends React.Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  componentDidMount () {
    this.props.onSetAppTitle('Login')
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.currentTarget.value
    })
  }

  onLogin = (username, password) => (event) => {
    event.preventDefault()
    // TODO: login logic

    const { onLogged, history } = this.props
    onLogged({ username, loggedAt: new Date() })
    history.push('/')
  }

  render () {
    const { classes } = this.props
    const { username, password } = this.state
    return (
      <div className={classes.container}>
        <Grid container justify='center'>
          <Grid item xs={12} sm={10} md={6}>
            <Paper className={classes.card}>
              <form className={classes.formContainer} noValidate autoComplete='off'
                onSubmit={this.onLogin(username, password)}>
                <TextField
                  label='Username'
                  required
                  className={classes.formField}
                  value={username}
                  onChange={this.handleChange('username')}
                  margin='normal'
                  variant='outlined'
                />

                <TextField
                  label='Password'
                  required
                  type='password'
                  value={password}
                  onChange={this.handleChange('password')}
                  className={classes.formField}
                  margin='normal'
                  variant='outlined'
                />

                <Button color='primary' variant='contained' type='submit'
                  className={classes.formField}>Login</Button>
              </form>
            </Paper>
          </Grid>
        </Grid>

      </div>
    )
  }
}

Login.propTypes = {
  onSetAppTitle: PropTypes.func.isRequired,
  onLogged: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login)
