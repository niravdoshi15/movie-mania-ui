import React, { useState } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router';
import './login.css'

export default ({ movie }) => {

    const history = useHistory()

    const [director, setDirector] = useState(movie.director)
    const [popularity, setPopularity] = useState(movie['99popularity'])
    const [imdb, setImdb] = useState(movie.imdb_score)
    const [genre, setGenre] = useState(movie.genre.join(','))

    const handleDirectorChange = (e) => {
        e.preventDefault()
        setDirector(e.target.value)
    }

    const handlePopularityChange = (e) => {
        e.preventDefault()
        setPopularity(e.target.value)
    }

    const handleImdbChange = (e) => {
        e.preventDefault()
        setImdb(e.target.value)
    }

    const handleGenreChange = (e) => {
        e.preventDefault()
        setGenre(e.target.value)
    }

    const handleUpdateMovie = (id) => {
        const data = {
            director,
            '99popularity': parseFloat(popularity),
            imdb_score: parseFloat(imdb),
            genre: genre.split(',')
        }
        const url = process.env.REACT_APP_SERVICE_URL || 'http://localhost:3030'

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }

        axios.put(`${url}/api/update/${id}`, data, {
            headers: headers
        }).then((result) => {
            console.log(result.data)
            history.push('./')
        }).catch((err) => {
            console.log(err)
        })
    }


    return (
        <div className='login'>
            <h1>Update Movie</h1>
            <label> {movie.name} </label>
            <p>Director <input type="text" name="director" value={director} onChange={handleDirectorChange} /></p>
            <p>99 Popularity <input type="text" name="popularity" value={popularity} onChange={handlePopularityChange} /></p>
            <p>Imdb <input type="text" name="imdb" value={imdb} onChange={handleImdbChange} /></p>
            <p>Genre <input type="text" name="genre" value={genre} onChange={handleGenreChange} /></p>
            <label style={{fontSize:'10px'}}><u>Note</u>: Enter Genre comma (,) separated (eg: Romance, Drama).
            In case of new Genre, entered genre will be added to database.</label>
            <p className='submit'><button className='btn btn-primary' onClick={() => handleUpdateMovie(movie._id)}>Update Movie</button></p>
        </div>
    )
}