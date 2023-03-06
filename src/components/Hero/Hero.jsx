import React from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

const Hero = ({url, getVideo, title, videoId, videoCt, titleImg, content, getVideoInfos}) => {
const { user } = UserAuth();

  return (
    <>
    {getVideo ? (
      <div className="hero">
      <video autoPlay loop playsInline preload="auto" muted src={url}></video>
    </div>
    ) : (
      <div className="hero" style={{
        backgroundImage: url
      }}>
      </div>
    )}
    
    {getVideoInfos && (
      <div className="container-fluid position-relative">
      <div className="position-absolute w-100 hero-video-infos"
      style={{bottom: '100px', left: '0', maxWidth: '700px'}}
      >
        <img className="hero-inner-title" width='400' src={titleImg}></img>
  
    
                   <h4 className="text-light font-weight-normal d-lg-block d-none" style={{letterSpacing: '2px'}}>
                     {content}
                   </h4>
  
  {(!user?.email && !localStorage.getItem('accountUsersAccess'))  && (
                          <Link className="playv2-hero" to='/login'>                  
                             <BsFillPlayFill className="playv2-hero-icon" />
                                Oynat
                          </Link>
                          )}
  
                          {(user?.email && !localStorage.getItem('accountUsersAccess'))  && (
                          <Link className="playv2-hero" to='/profiles'>                  
                             <BsFillPlayFill className="playv2-hero-icon" />
                                Oynat
                          </Link>
                          )}
  
                          {(user?.email && localStorage.getItem('accountUsersAccess'))  && (
                          <Link className="playv2-hero"  to={`/${videoCt}/video/${videoId}`}>                  
                             <BsFillPlayFill className="playv2-hero-icon" />
                                Oynat
                          </Link>
                          )}
      </div>
     
      </div>
      
    )}
     </>


  );
}

export default Hero;
