import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import ProductItem from './ProductItem'
import { Grid, CircularProgress } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import AppStyles from '../../jss/AppStyles'
import { makeUrl } from '../../services'

const styles = theme => ({
  ...AppStyles(theme),
  loading: {
    margin: '0 auto'
  }
})

class ProductList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      products: []
    }
  }

  async componentDidMount () {
    this.props.onSetAppTitle('React Shopping')

    this.setState({ isLoading: true })
    try {
      const response = await axios.get(makeUrl('products'))
      this.setState({
        products: response.data
      })
    } catch (err) {
      console.error(err)
    } finally {
      this.setState({ isLoading: false })
    }
  }

  render () {
    const { classes, hasLoggedUser } = this.props
    const { products, isLoading } = this.state
    const items = products.map(p =>
      <Grid item key={p.id} xs={12} sm={6} md={4} lg={3}>
        <ProductItem id={p.id} imageUrl={p.imageUrl} name={p.name} price={p.price} freeShipping={p.freeShipping}
          hasLoggedUser={hasLoggedUser}
        />
      </Grid>
    )

    return (
      <Grid container spacing={16} className={classes.container}>
        {!isLoading ? items : <CircularProgress className={classes.loading} />}
      </Grid>
    )
  }
}

ProductList.propTypes = {
  onSetAppTitle: PropTypes.func.isRequired,
  hasLoggedUser: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProductList)
