import React from 'react';

const initialState = {
    movies : [],
    updateMovie : {},
    isLogin: localStorage.getItem('token') || ''
}
const reducer = (state, action) => {
    switch (action.type) {
        case "GetMovies":
            return {
                ...state, movies: action.value
            }
        case "IsLogin":
            return {
                ...state, isLogin: action.value
            }
        case "UpdateMovie":
            return {
                ...state, updateMovie: action.value
            }
    }
}


export const MovieContext = React.createContext()

export const Provider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    const value = {
        movies: state.movies,
        isLogin: state.isLogin,
        updateMovie: state.updateMovie,
        setValue: (type, value) => {dispatch({type: type, value})}
    }
    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}