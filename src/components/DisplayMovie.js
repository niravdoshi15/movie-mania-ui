import React from 'react';
import { useHistory } from 'react-router'
import { MovieContext } from '../store'
import axios from 'axios';

export default ({ movie, index, poster, setDel }) => {

    let history = useHistory()

    const { isLogin, setValue } = React.useContext(MovieContext)

    const handleUpdate = (movie) => {
        setValue('UpdateMovie', movie)
        history.push('./update')
    }

    const handleDelete = (id) => {
        const url = process.env.REACT_APP_SERVICE_URL || 'http://localhost:3030'
        axios.delete(`${url}/api/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(() => {
            alert('Delete Successful')
            setDel(true)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="col-md-4 " style={{ paddingTop: '5px' }}>
            <div className="thumbnail" style={{ border: '1px solid lightblue' }}>
                <img src={poster} height="300" width="250" style={{ marginLeft: '15%' }} />
                <div style={{ textAlign: 'center' }}>
                    <h6><u>{movie.name}</u></h6>
                    <p>Director : {` ${movie.director}`}</p>
                    <p>IMDB Rating :{` ${movie.imdb_score}`}</p>
                    <p>99popularity :{` ${movie['99popularity']}`}</p>
                    <p>Genres :{` ${movie.genre.join(', ')}`}</p>
                    {isLogin !== '' ?
                        <div style={{ paddingBottom: '10px' }}>
                            <button type="button" style={{ marginRight: '20px' }} className="btn btn-danger" role="button" onClick={() => handleDelete(movie._id)}>Delete </button>
                            <button type="button" style={{ marginLeft: '20px' }} className="btn btn-secondary" role="button" onClick={() => handleUpdate(movie)}>Update </button>
                        </div>
                        : null}
                </div>
            </div>
        </div >
    )
}