import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './custom.css'

export default ({ movieName, directorName, selectedGenres, query, setQuery, setSelectedGenres, sortBy, handleSortChange, setMovies, onApplyClick }) => {
    const [searchBy, setSearchBy] = useState('Movie')
    const [disable, setDisable] = useState(false)
    const [genres, setGenres] = useState([])
    const [suggestions, setSuggestions] = useState([])
    const [activeOption, setActiveOption] = useState(0)
    const [showSuggestion, setShowSuggestion] = useState(false)

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
        let suggestions = []
        if (e.target.value.length > 0) {
            const regex = new RegExp(e.target.value, 'i')
            setSuggestions([])
            suggestions = searchBy === 'Movie' ? movieName.sort().filter(f => f.match(regex)) : directorName.sort().filter(f => f.match(regex))
            if (suggestions.length > 0) {
                setSuggestions(suggestions)
                setShowSuggestion(true)
            } else {
                setShowSuggestion(false)
            }
        }
        if (e.target.value.length === 0) {
            setShowSuggestion(false)
        }
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

    const handleOnKeyPress = (e, text) => {
        if (e.keyCode === 0) {
            handleSearch()
        }
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            setQuery(suggestions[activeOption])
            handleSearch()
            setShowSuggestion(false)
        }
        else if (e.keyCode === 40) {
            if (activeOption === suggestions.length - 1) {
                return;
            }
            setActiveOption(activeOption + 1)
        }
        else if (e.keyCode === 38) {
            if (activeOption === 0) {
                return;
            }
            setActiveOption(activeOption - 1)
        }
    }

    const selectSuggestion = (value, index) => {
        setQuery(value)
        setActiveOption(index)
        setShowSuggestion(false)
        handleSearch()
    }

    return (
        <div style={{ padding: '10px' }} className="form-group">
            <select style={{ width: 'auto', height:'55px', display: 'inline' }} className="form-control" value={searchBy} onChange={handleSerachChange}>
                <option value='Movie'>Movie</option>
                <option value='Director'>Director</option>
            </select>
            <input type='text' value={query} style={{ display: 'inline', height: '55px', width: '350px', textAlign: 'center' }} placeholder='Search' onChange={handleQuery} onKeyDown={(e) => handleKeyDown(e)} onKeyPress={(e) => handleOnKeyPress(e, query)} />
            {/* {showSuggestion && suggestions.map((l, i) => (
                <div className="AutoCompleteText">
                    <ul>
                        <li className={activeOption === i ? 'active' : null} onClick={() => selectSuggestion(l, i)}>{l}</li>
                    </ul>
                </div>
            ))} */}
            <button style={{ marginTop: '-6px', height:'55px' }} className='btn btn-info' onClick={handleSearch}>Search</button>
            <select style={{ width: 'auto', display: 'inline', marginLeft: '40px', height:'55px' }} className="form-control" value={sortBy} onChange={handleSortChange}>
                <option value=''>--Sort By--</option>
                <option value='Movies'>Movie</option>
                <option value='Director'>Director</option>
                <option value='Popularity'>Popularity</option>
            </select>
            <div style={{ display:'inline', float:'right', width: '450px', paddingRight: '68px' }}>
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
            </div>
            <button
                    style={{ display: 'inline', height:'55px', marginTop:'-65px', marginLeft:'30px', float: "right"}}
                    className='btn btn-info' onClick={() => onApplyClick(selectedGenres)}>Apply</button>
        </div>

    )
}

