import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

export default ({ selectedGenres, query, setQuery, setSelectedGenres, sortBy, handleSortChange, setMovies, onApplyClick }) => {
    const [searchBy, setSearchBy] = useState('Movie')
    const [disable, setDisable] = useState(false)
    const [genres, setGenres] = useState([])

    useEffect(() => {
        const url = process.env.REACT_APP_SERVICE_URL || 'http://localhost:3030'
        axios.get(`${url}/api/genres`)
            .then(result => {
                let genArr = []
                result.data.docs.map((g) => {
                    genArr.push({ value: g.genre, label: g.genre })
                })
                setGenres(genArr)
            }).catch(err =>
                console.log(err))
    }, [])

    const data = [{ value: 'One', selected: true }, { value: 'Two' }]

    const handleSerachChange = (e) => {
        e.preventDefault()
        setQuery('')
        setSearchBy(e.target.value)
    }

    const handleQuery = (e) => {
        e.preventDefault()
        setQuery(e.target.value)
    }

    const handleSearch = () => {
        const url = process.env.REACT_APP_SERVICE_URL || 'http://localhost:3030'
        axios.get(`${url}/api/search?search=${searchBy}&value=${query}`)
            .then((result) => {
                setMovies(result.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    return (
        <div style={{ padding: '10px' }} className="form-group">
            <select style={{ width: 'auto', display: 'inline' }} className="form-control" value={searchBy} onChange={handleSerachChange}>
                <option value='Movie'>Movie</option>
                <option value='Director'>Director</option>
            </select>
            <input type='text' value={query} style={{ display: 'inline', height: '38px', width: '400px', textAlign: 'center' }} placeholder='Search' onChange={handleQuery} />
            <button style={{ marginTop: '-6px' }} className='btn btn-info' onClick={handleSearch}>Search</button>
            <select style={{ width: 'auto', display: 'inline', marginLeft: '40px' }} className="form-control" value={sortBy} onChange={handleSortChange}>
                <option value=''>--Sort By--</option>
                <option value='Movies'>Movie</option>
                <option value='Director'>Director</option>
                <option value='Popularity'>Popularity</option>
            </select>
            <div style={{ float: 'right', width: '450px', paddingRight: '68px' }}>
                <Select
                    styles={{ display: 'inline' }}
                    options={genres}
                    displayValue="name"
                    value={selectedGenres}
                    onChange={setSelectedGenres}
                    isMulti={true}
                    // onInputChange={() => onInputChange(selectedGenres)}
                    isDisabled={disable}
                    placeholder='Filter by Genre'
                />
                <button
                    // style={{marginTop:'-38px', display: 'inline', float: "right"}}
                    className='btn btn-info' onClick={() => onApplyClick(selectedGenres)}>Apply</button>
            </div>
        </div>

    )
}

