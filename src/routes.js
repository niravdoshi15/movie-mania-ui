import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MoviesPage from './pages/moviesPage';
import Login from './pages/login';
import AddMovie from './pages/addMovie';
import UpdateMovie from './pages/updateMovie'
import PrivateRoute from './privateRoutes'
import { MovieContext } from './store'

export default () => {
    const { updateMovie } = React.useContext(MovieContext)
    return (
        <Switch>
            <Route path="/" exact component={() => <MoviesPage />} />
            <Route path="/login" component={() => <Login />} />
            <PrivateRoute path="/add" component={() => <AddMovie />} />
            <PrivateRoute path="/update" component={() => <UpdateMovie movie = {updateMovie} />} />
        </Switch>
    );
}