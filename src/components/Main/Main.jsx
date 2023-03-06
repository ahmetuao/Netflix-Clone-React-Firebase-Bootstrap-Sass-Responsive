import React from 'react';
// Import Swiper styles
import 'swiper/css';
import mp4 from '../../assets/video/the_wolf_of_wall_street.mp4';
import { initMovies } from '../../utils/constants';
import Hero from '../Hero/Hero';
import MoviesList from '../MoviesList';




const Main = () => {
    const movies = initMovies[0]
    const series = initMovies[1]

    return (
        <div className='main pagelayout container-fluid'>
      
            {/* <Hero url = {`url(https://images8.alphacoders.com/547/547394.jpg)`} /> */}
            <Hero 
                 url = {
                     window.innerWidth > 991 ? mp4 : 
                    `url(https://images8.alphacoders.com/547/547394.jpg)`}
                    getVideo = {
                        window.innerWidth > 991 ? true : false 
                    }
                    getVideoInfos = {true}
                    title = 'The Wolf of Wall Street'
                    videoId = '11'
                    videoCt = 'Movies'
                    titleImg = 'https://upload.wikimedia.org/wikipedia/commons/3/3a/The_wolf_of_Wall_Street_2013_logo.PNG?20140318021627'
                    content = "Jordan Belfort 24 yaşında genç ve hırslı bir adamdır. Para kazanma arzusuyla Wall Street borsasında önce komisyoncu ve ardından Stratton Oakmont adında bir yatırımcı firmasında zengin olmak için her şeyi yapmaya hazır bir CEO olur."
            />

            <div className="main-body">
                <div className="slider-area movies position-relative">
                <h3 className="movies-title position-relative text-light mb-3">Filmler</h3>
                <MoviesList swiper = {true} movies={movies} />
                </div>
                <div className="slider-area series position-relative">
            <h3 className="series-title text-light mb-3" style={{marginTop: '5rem'}}>Diziler</h3>
            <MoviesList swiper = {true} movies={series} />
                </div>
            </div>
        </div>
    )
}

export default Main