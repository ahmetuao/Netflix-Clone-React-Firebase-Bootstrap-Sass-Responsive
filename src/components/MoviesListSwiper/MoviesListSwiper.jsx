import React from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from "swiper";
// Import Swiper styles
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import MoviesDetailsCard from '../MovieDetailsCard';

const MoviesListSwiper = ({onModal, movies, selectedMovie, setSelectedMovie, movieDetailsModal, setMovieDetailsModal, notDisplayCategoryDetailsCard}) => {
  return (
    <div
          style={
            onModal
              ? {}
              : (window.innerWidth > 991 ? 
                {
                  position: 'absolute',
                  left: '0',
                  height: '430px',
                  top: '-50px',
                } : {
                  
                }
                )
          }
          className={`movies-list ${
            onModal
              ? `row`
              : `${
                  window.innerWidth > 991
                    ? `d-flex flex-sm-wrap flex-md-row flex-column mw-100`
                    : `row`
                }`
          }`}
        >
          {onModal ? (
            movies.map((movie, idx) => (
              <div
                onClick={() => setSelectedMovie(movie)}
                className="col-sm-6 col-lg-4 mb-4 position-relative movie-card movie-card-onmodal"
                key={idx}
              >
                <Link
                  to={`/${movie.list.en}/video/${movie.id}`}
                  className="movie d-block shadow"
                >
                  {onModal && (
                    <div>
                      <div className="d-flex flex-column">
                        <img
                          className=""
                          style={{
                            maxHeight: '200px',
                          }}
                          src={movie.thumbUrl}
                          alt="..."
                        />
                        <div className="p-3 content-area">
                          <h5 className="mb-3">{movie.title}</h5>
                          <h6>Yönetmen: {movie.director}</h6>
                          <h6>Tür: {movie.category.categoryTitle.tr}</h6>
                        </div>
                      </div>
                    </div>
                  )}
                </Link>
              </div>
            ))
          ) : (
            <Swiper
              spaceBetween={15}
              slidesPerView={6}
              slidesPerGroup={6}
              pagination={true}
            modules={[Pagination]}

              // pagination={{
              //   clickable: true,
            
              // }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  slidesPerGroup: 1
                },
                576: {
                  slidesPerView: 3,
                  slidesPerGroup: 3
                },
                1024: {
                  slidesPerView: 6,
                  slidesPerGroup: 6
                }
              }}
            >
              {movies.map((movie, idx) => (
                <SwiperSlide className="d-flex align-items-center">
                  <div
                    onClick={() => setSelectedMovie(movie)}
                    onMouseLeave={() =>
                      window.innerWidth > 991 && setSelectedMovie({})
                    }
                    className={`mb-4 w-100 movie-card position-relative ${
                      window.innerWidth > 991 ? `mb-4` : `col-md-6 m-0`
                    }`}
                    key={idx}
                  >
                    <div className="movie position-relative shadow-lg">
                      <img
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setSelectedMovie(movie)
                          window.innerWidth > 991
                            ? setMovieDetailsModal(false)
                            : setMovieDetailsModal(true)
                        }}
                        src={movie.thumbUrl}
                        alt="..."
                      />
                    </div>
                    {movie == selectedMovie &&
                      !movieDetailsModal &&
                      !notDisplayCategoryDetailsCard &&
                      window.innerWidth > 991 && (
                        <MoviesDetailsCard
                          movie={movie}
                          selectedMovie={selectedMovie}
                          setMoviesDetailsModalFunc={(bool) =>
                            setMovieDetailsModal(bool)
                          }
                        />
                      )}
                  </div>
                </SwiperSlide>
              ))}
              ...
            </Swiper>
          )}
        </div>
      
    );
}

export default MoviesListSwiper;
