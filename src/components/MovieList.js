import React, { useState, useEffect } from 'react';
import DisplayMovie from './DisplayMovie';
import SearchDropdown from './SearchDropdown';
import compareValues from '../compareValues'

export default ({ movies, query, selectedGenres, setSelectedGenres, setMovies, setDel, setQuery }) => {

    const [sortBy, setSortBy] = useState('')

    const handleSortChange = (e) => {
        e.preventDefault()
        setSortBy(e.target.value)
        if (e.target.value === 'Movies') {
            movies.sort(compareValues('name'))
        }
        else if (e.target.value === 'Director') {
            movies.sort(compareValues('director'))
        }
        else if (e.target.value === 'Popularity') {
            movies.sort(compareValues('99popularity', 'desc'))
        }
    }

    const onApplyClick = (selectedGenres) => {
        if (selectedGenres.length > 0) {
            const select = []
            selectedGenres.map(s=>select.push(s.value))
            const filteredMovies = movies.filter((m) => {
                if(m.genre.some(item => select.includes(item))){
                    return m
                }
            })
            setMovies(filteredMovies)
        }
    }

    const posters = ['https://m.media-amazon.com/images/M/MV5BNTkyOGVjMGEtNmQzZi00NzFlLTlhOWQtODYyMDc2ZGJmYzFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
        'https://upload.wikimedia.org/wikipedia/en/6/6f/War_official_poster.jpg',
        'https://i.pinimg.com/originals/93/b8/4c/93b84cd3bc3a39fb0e302ddae21ccb53.jpg',
        'https://upload.wikimedia.org/wikipedia/en/3/3c/Housefull_4_poster.jpg',
        'https://upload.wikimedia.org/wikipedia/en/3/33/M.S._Dhoni_-_The_Untold_Story_poster.jpg']

    return (
        <div>
            <SearchDropdown sortBy={sortBy} setQuery={setQuery} query={query} selectedGenres={selectedGenres} onApplyClick={onApplyClick} setSelectedGenres={setSelectedGenres} handleSortChange={handleSortChange} setMovies={setMovies} />
            <div className="row col-lg-12">
                {movies.map((movie, i) =>
                    <DisplayMovie movie={movie} index={i} poster={[posters[i % 5]]} setDel={setDel} />
                )}
            </div>
        </div>
    )
}