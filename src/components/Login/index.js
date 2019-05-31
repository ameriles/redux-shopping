import React from 'react'
import PropTypes from 'prop-types'
import { TextField, Button, Paper, Grid, CircularProgress, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import AppStyles from '../../jss/AppStyles'
import { login } from '../../redux/modules/login'
import { connect } from 'react-redux'

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

  onLogin = async (event) => {
    event.preventDefault()
    const { history, login } = this.props
    const { username, password } = this.state

    const loginOk = await login(username, password)
    if (loginOk) {
      history.push('/')
    }
  }

  render () {
    const { classes, loading, errorMessage } = this.props
    const { username, password } = this.state
    return (
      <div className={classes.container}>
        <Grid container justify='center'>
          <Grid item xs={12} sm={10} md={6}>
            <Paper className={classes.card}>
              <form className={classes.formContainer} noValidate autoComplete='off'
                onSubmit={this.onLogin}>
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

                {
                  loading
                    ? <CircularProgress />
                    : <Button color='primary' variant='contained' type='submit'
                      className={classes.formField}>Login</Button>
                }

                {
                  errorMessage && <Typography variant='body1' align='center' color='error'>{errorMessage}</Typography>
                }

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

const mapStateToProps = state => ({
  loading: state.login.loading,
  errorMessage: state.login.error ? state.login.error.message : null
})

const mapDispatchToProps = {
  login
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))
