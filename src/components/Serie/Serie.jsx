import React, { useState } from 'react';
import { IoCloseCircle } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import { initMovies } from '../../utils/constants';

const Serie = () => {
  const [series, setSeries] = useState(initMovies[1]);

  let { id } = useParams()
  let navigate = useNavigate()
  return (
    <div className="video">
      <span onClick={() => navigate(-1)} className="close-movie">
        <IoCloseCircle className="icon-close-video"/>
      </span>
      <iframe 
      width="100%" 
      height="100%" 
      src={series[id - 1].videoUrl} 
      title="YouTube video player"
       frameBorder="0" 
      allowFullScreen></iframe>
    </div>
  );
}

export default Serie;
