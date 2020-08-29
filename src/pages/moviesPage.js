import React, { useState, useEffect } from 'react';
import MovieList from '../components/MovieList'
import axios from 'axios'

export default () => {
    const [movies, setMovies] = useState([])
    const [movieName, setMovieName] = useState([])
    const [selectedGenres, setSelectedGenres] = useState('')
    const [directorName, setDirectorName] = useState([])
    const [del, setDel] = useState(false)
    const [query, setQuery] = useState('')
    const url = process.env.REACT_APP_SERVICE_URL || 'http://localhost:3030'
    useEffect(() => {
        axios.get(`${url}/api`)
            .then((moviesData) => {
                setMovies(moviesData.data.docs)
                setMovieName(moviesData.data.moviesName)
                setDirectorName(moviesData.data.directorName)
                setDel(false)
            })
    }, [del, selectedGenres, query])

    return (
        <MovieList movies={movies} setQuery={setQuery} query={query} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} setMovies={setMovies} setDel={setDel}/>
    )
}