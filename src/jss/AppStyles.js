const AppStyles = (theme) => ({
  container: {
    padding: theme.spacing.unit,
    backgroundColor: theme.palette.background.default,
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      marginTop: 64
    }
  }
})
export default AppStyles
