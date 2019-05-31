import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import numeral from 'numeral'
import { withRouter } from 'react-router-dom'
import { Paper, Typography, CircularProgress, Grid, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles'
import { makeUrl } from '../../services'
import AppStyles from '../../jss/AppStyles'
import { addToCart } from '../../redux/modules/cart'
import { connect } from 'react-redux'

const styles = theme => ({
  ...AppStyles(theme),
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center'
  },
  image: {
    width: '100%'
  },
  freeShipping: {
    color: theme.palette.success.main
  }
})

class ProductDetails extends React.Component {
  constructor () {
    super()
    this.state = {
      product: null,
      isLoading: false
    }
  }

  async componentDidMount () {
    this.props.onSetAppTitle('Cargando...')
    const id = this.props.match.params.id
    try {
      this.setState({ isLoading: true })

      const url = makeUrl(`products/${id}`)
      const response = await axios.get(url)
      this.setState({
        product: response.data
      }, () => {
        const { product } = this.state
        this.props.onSetAppTitle(product.name)
      })
    } catch (error) {
      console.log(error)
    } finally {
      this.setState({ isLoading: false })
    }
  }

  render () {
    const { addToCart, hasLoggedUser, classes } = this.props
    const { isLoading, product } = this.state

    const body = product
      ? <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <img src={product.imageUrl} alt={product.name} className={classes.image} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant='h5' color='textSecondary'>{product.name}</Typography>
            <Typography variant='h4'>{numeral(product.price).format('$ 0.00')}</Typography>
            <div className={classes.freeShipping} style={{ visibility: product.freeShipping ? 'visible' : 'hidden' }}>
              <Typography variant='body1' color='inherit'>Free Shipping</Typography>
            </div>

            {
              hasLoggedUser
                ? <Button variant='contained' color='primary' onClick={() => addToCart(product)}>
                    Add to Cart
                  <AddIcon />
                </Button>
                : null
            }

            <Typography variant='body1' align='justify'>{product.description}</Typography>
          </Grid>
        </Grid>

      </Paper>
      : <Typography variant='body1' color='error'>Couldn't load product details</Typography>

    return (
      <div className={classes.container}>
        {
          isLoading
            ? <CircularProgress />
            : body
        }
      </div>

    )
  }
}

ProductDetails.propTypes = {
  hasLoggedUser: PropTypes.bool.isRequired,
  onSetAppTitle: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

const mapDispatchToProps = {
  addToCart
}

export default connect(null, mapDispatchToProps)(withRouter(withStyles(styles)(ProductDetails)))
