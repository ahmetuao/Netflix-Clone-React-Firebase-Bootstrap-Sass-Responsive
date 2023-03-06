import React, { useEffect, useState } from 'react';
// Import Swiper styles
import 'swiper/css';
import "swiper/css/navigation";
import MoviesDetailsModal from '../MoviesDetailsModal';
import MoviesListGrid from '../MoviesListGrid/MoviesListGrid';
import MoviesListSwiper from '../MoviesListSwiper/MoviesListSwiper';


const MoviesList = ({
  movies,
  notDisplayCategoryDetailsCard,
  onModal,
  initSearchResults,
  marginTop,
  swiper,
  zIndex,
  setZIndex
}) => {
  const [selectedMovie, setSelectedMovie] = useState({})
  const [movieDetailsModal, setMovieDetailsModal] = useState(false)

  useEffect(() => {
    if(movieDetailsModal) {
      document.querySelector('html').classList.add('active')
    }
    else {
      document.querySelector('html').classList.remove('active')
    }
  }, [movieDetailsModal]);

  return (
<>
      {swiper ? (
          <MoviesListSwiper onModal = {onModal} movies = {movies} selectedMovie = {selectedMovie} setSelectedMovie = {setSelectedMovie} movieDetailsModal = {movieDetailsModal} setMovieDetailsModal = {setMovieDetailsModal} notDisplayCategoryDetailsCard = {notDisplayCategoryDetailsCard} />
        ):(
        <MoviesListGrid onModal = {onModal} movies = {movies} selectedMovie = {selectedMovie} setSelectedMovie = {setSelectedMovie} movieDetailsModal = {movieDetailsModal} setMovieDetailsModal = {setMovieDetailsModal} notDisplayCategoryDetailsCard = {notDisplayCategoryDetailsCard} />
      )}
            {movieDetailsModal && !notDisplayCategoryDetailsCard && (
            <MoviesDetailsModal
              movie={selectedMovie}
              movieDetailsModal={movieDetailsModal}
              setMovieDetailsModal={setMovieDetailsModal}
              movies={movies}
              initSearchResults={initSearchResults ? initSearchResults : null}
            />
          )}
          </>
  )
}
export default MoviesList
