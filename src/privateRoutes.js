import React from 'react';
import { Route } from 'react-router-dom';
import {useHistory} from 'react-router';
import { MovieContext } from './store'

export default ({component: Component, ...rest}) => {

    const history = useHistory()

    const {isLogin} = React.useContext(MovieContext)
  
    return (
      <Route
        {...rest}
        render={(props) => isLogin
          ? <Component {...props} />
          : history.push('/')}
      />
    )
  }