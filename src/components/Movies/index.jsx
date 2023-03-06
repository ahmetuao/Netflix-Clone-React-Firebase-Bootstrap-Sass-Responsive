import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { categories, initMovies } from '../../utils/constants'
import Hero from '../Hero/Hero'
import MoviesList from '../MoviesList'


const Movies = () => {
  const [movies, setMovies] = useState(initMovies[0])
  const [categoryMovies, setCategoryMovies] = useState([])

  useEffect(() => {
    setCategoryMovies(categories)
  }, [])

  return (
    <div className="movies pagelayout container-fluid">
      <Hero
        url={'url(https://images8.alphacoders.com/632/632772.jpg)'}
      />
      <div className="main-body">
        <div className="hero-categories">
          <h3 className="text-light">Filmler</h3>
          <div className="text-light">
            Türler
            <span className="px-2">-</span>
            {categoryMovies.map((categories) => (
              <Link className="mr-1 text-light" to={`/movies/${categories.id}`}>
                {categories.title.tr}
              </Link>
            ))}
          </div>
        </div>
        <div className="position-relative" style={{height: '240px'}}>
                <h3 className="position-relative text-light mb-3">Filmler</h3>
                <MoviesList swiper = {true} movies={movies} />
                </div>
      </div>
    </div>
  )
}

export default Movies
