import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { categories, initMovies } from '../../utils/constants'
import Hero from '../Hero/Hero'
import MoviesList from '../MoviesList'

const Series = () => {
  const [series, setSeries] = useState(initMovies[1])
  const [categorySeries, setCategorySeries] = useState([])

  useEffect(() => {
    setCategorySeries(categories)
  }, [])

  return (
    <div className="series pagelayout container-fluid">
      <Hero url={`url(https://wallpaperaccess.com/full/1088999.jpg)`} />
      <div className="main-body">
        <div className="hero-categories">
          <h3 className="text-light">Diziler</h3>
          <div className="text-light">
            Türler
            <span className="px-2">-</span>
            {categorySeries.map((categories, idx) => (
              <Link key={idx} className="mr-1 text-light" to={`/series/${categories.id}`}>
                {categories.title.tr}
              </Link>
            ))}
          </div>
        </div>

        <div className="position-relative" style={{height: '240px'}}>
                <h3 className="position-relative text-light mb-3">Diziler</h3>
                <MoviesList swiper = {true} movies={series} />
                </div>
      </div>
    </div>
  )
}

export default Series
