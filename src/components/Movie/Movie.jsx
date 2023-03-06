import React, { useEffect, useState } from 'react';
import { IoCloseCircle } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import { initMovies } from '../../utils/constants';

const Movie = () => {
  const [movies, setMovies] = useState(initMovies[0]);

  let { id } = useParams()
  let navigate = useNavigate()

  useEffect(() => {
    if(id) {
      document.querySelector('.header').classList.add('active-player')
    }
    else {
      document.querySelector('.header').classList.remove('active-player')
    }
  }, [id]);

  return (
    <div className="video">
      <span onClick={() => navigate(-1)} className="close-movie">
        <IoCloseCircle className="icon-close-video"/>
      </span>
      <iframe 
      width="100%" 
      height="100%" 
      src={movies[id - 1].videoUrl} 
      title="YouTube video player"
      frameBorder="0" 
      allowFullScreen></iframe>
    </div>
  );
}

export default Movie;
