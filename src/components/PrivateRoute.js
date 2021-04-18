import React from 'react'
import {Route} from 'react-router-dom'
import SignIn from './SignIn'

const PrivateRoute = ({ component: Component, authedUser, ...rest }) => {

  return (<Route
      {...rest}
      render={(props) => (
          authedUser !== null
          ? <Component {...props} />
          : <SignIn/>
      )}
  />)
}

export default PrivateRoute