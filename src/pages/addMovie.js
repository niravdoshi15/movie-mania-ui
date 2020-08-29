import React, { useState } from 'react';
import axios from 'axios'
import {useHistory} from 'react-router';
import './login.css'

export default () => {

    const history = useHistory()

    const [name, setName] = useState('')
    const [director, setDirector] = useState('')
    const [popularity, setPopularity] = useState('')
    const [imdb, setImdb] = useState('')
    const [genre, setGenre] = useState('')

    const handleNameChange = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }

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

    const handleAddMovie = (e) => {
        const data = {
            name,
            director,
            '99popularity': parseFloat(popularity),
            imdb_score: parseFloat(imdb),
            genre: genre.split(',')
        }
        const url = process.env.REACT_APP_SERVICE_URL || 'http://localhost:3030'

        const headers =  {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }

        axios.post(`${url}/api/add`, data, {
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
            <h1>Add Movie</h1>
            <p><input type="text" name="name" placeholder='Name' value={name} onChange={handleNameChange} /></p>
            <p><input type="text" name="director" placeholder='Director' value={director} onChange={handleDirectorChange} /></p>
            <p><input type="text" name="popularity" placeholder='Popularity' value={popularity} onChange={handlePopularityChange} /></p>
            <p><input type="text" name="imdb" value={imdb} placeholder='IMDB score' onChange={handleImdbChange} /></p>
            <p><input type="text" name="genre" value={genre} placeholder='Genre' onChange={handleGenreChange} /></p>
            <label style={{fontSize:'10px'}}><u>Note</u>: Enter Genre comma (,) separated (eg: Romance, Drama).
            In case of new Genre, entered genre will be added to database.</label>
            <p className='submit'><button className='btn btn-primary' onClick={handleAddMovie}>Add Movie</button></p>
        </div>
    )
}