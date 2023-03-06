import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { categories, initMovies } from '../../utils/constants'
import { FilterMovies } from '../../utils/filterMovies'
import Hero from '../Hero/Hero'
import MoviesList from '../MoviesList'

const MoviesCategory = () => {
  const [categoryMovies, setCategoryMovies] = useState(initMovies[0])

  let { id } = useParams()

  useEffect(() => {
    const methodCategoryMovies = 1
    const keyCategoryMovies = id
    const filteredCategoryMovies = FilterMovies(
      methodCategoryMovies,
      keyCategoryMovies,
      categoryMovies,
    )
    setCategoryMovies(filteredCategoryMovies)
  }, [])

  return (
    <div className="movies pagelayout container-fluid">
      <Hero url={`url(${categories[id - 1].heroBanner.movies})`} />
      <div className="main-body">
        <h3 className="mb-3 position-relative text-light">{categories[id - 1].title.tr} Filmleri</h3>
      <MoviesList movies={categoryMovies} />
      </div>
    </div>
  )
}

export default MoviesCategory
