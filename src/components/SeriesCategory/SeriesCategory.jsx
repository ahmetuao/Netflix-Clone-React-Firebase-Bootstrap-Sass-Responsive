import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { categories, initMovies } from '../../utils/constants'
import { FilterMovies } from '../../utils/filterMovies'
import Hero from '../Hero/Hero'
import MoviesList from '../MoviesList'

const MoviesCategory = () => {
  const [categorySeries, setCategorySeries] = useState(initMovies[1])

  let { id } = useParams()

  useEffect(() => {
    const methodCategorySeries = 1
    const keyCategorySeries = id
    const filteredCategorySeries = FilterMovies(
      methodCategorySeries,
      keyCategorySeries,
      categorySeries,
    )
    setCategorySeries(filteredCategorySeries)
  }, [])

  return (
    <div className="movies pagelayout container-fluid">
      <Hero url={`url(${categories[id - 1].heroBanner.series})`} />
      <div className="main-body">
      <h3 className="mb-3 position-relative text-light">
        {categories[id - 1].title.tr} Dizileri
      </h3>
      <MoviesList movies={categorySeries} />
      </div>
    </div>
  )
}

export default MoviesCategory
