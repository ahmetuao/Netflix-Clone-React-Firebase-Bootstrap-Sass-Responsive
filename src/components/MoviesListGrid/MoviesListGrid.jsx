import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { AiFillCheckCircle, AiFillPlayCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';
import { db } from '../../firebase';
import MoviesDetailsCard from '../MovieDetailsCard';

const MoviesListGrid = ({onModal, movies, selectedMovie, setSelectedMovie, setMovieDetailsModal, movieDetailsModal, notDisplayCategoryDetailsCard }) => {
  const [cardMovie, setCardMovie] = useState({});

  const { user } = UserAuth();
  const navigate = useNavigate();
  const [like, setLike] = useState(false);
  const [savedShows, setSavedShows] = useState([]);
  const {id, setId} = useContext(UserContext)
  const {navigateControl, setNavigateControl} = useState()
  const {selectedMovieInModal, setSelectedMovieInModal} = useContext(UserContext)
  let merged = [];
  const likedItems = [];
  const [likedSavedShows, setLikedSavedShows] = useState([]);
  const [sel, setSel] = useState({});
  const [filtered, setFiltered] = useState([]);
  let unMerged = [];
  const [unMergedCon, setUnMergedCon] = useState([]);
 
  likedSavedShows.map((item)=>{
    movies.map((it)=>{
      if(it.title.includes(item.title)) {
        item = it
        unMerged.push(item);
        // unMergedCon.push(item);
      }
    })
  })

  
  
   useEffect(() => {
     onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      const filtered = doc.data().profiles.filter((item)=>{
        return item.id == localStorage.getItem('userId')
      })
      filtered.map((item, idx) => {
        delete item.id
      })
      for(let i=0; i<filtered.length; i++) {
        merged.push(filtered[i].savedShows)
      }
        setSavedShows(merged)

        merged.map((item)=> {
          if(localStorage.getItem('accountUsersAccess')) {
            likedItems.push(item)
            setLikedSavedShows(likedItems)
            setLike(true)
          }
        })
        setLikedSavedShows(merged);
   
       });
   }, []);

  useEffect(() => {
    likeControl(selectedMovieInModal)
  }, [savedShows]);

  const likeControl = (moviee) => {
    merged.map((item)=> {
      if(localStorage.getItem('accountUsersAccess')) {
        setLike(true)
      }
    })
  }





  const movieID = doc(db, 'users', `${user?.email}`);
  const show = async () => {
      // if (user?.email) {      
      //     await ( updateDoc(movieID, {
      //       profiles: arrayUnion({

      //                 savedShows: {id: sel.id,
      //                 title: sel.title,
      //                 listTr: sel.list.tr,
      //                 listEn: sel.list.en,
      //                 director: sel.director,
      //                 thumbUrl: sel.thumbUrl,
      //                 categoryId: sel.category.categoryId,
      //                 categoryTitleTr: sel.category.categoryTitle.tr,
      //                 categoryTitleEn: sel.category.categoryTitle.en,},     
      //                   id: id
                      
      //       }
      //       ),
      //     }))
      //   } else {
      //     alert('Please log in to save a movie');
      //     navigate('/login')
      //   }
  }

  // const selCon = (mov) => {
  //   console.log(mov, 'MOVVVIIEE');
  //   setSel(mov)
  //   console.log(sel, 'SEL CON');
  //   unMerged.push(sel);
  // }


 
  
  // useEffect(() => {
  //   show();
  //   selCon();
  //   console.log(sel, 'SEL EFFECT');

  // }, [sel]);


  return (
    <div
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
    {movies.map((movie, idx) => (
      <>
        {onModal ? (
          <div
            // onClick={() => {setSelectedMovie(movie)}}
            className="col-sm-6 col-lg-4 mb-4 position-relative movie-card movie-card-onmodal"
            key={idx}
          >
            <Link
              // to={`/${movie.list.en}/video/${movie.id}`}
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
                      <div className="d-flex align-items-center justify-content-between mb-4">
                      <h5 className="mb-3">{movie.title}</h5>
                      <div className="d-flex">
                      {(!user?.email && !localStorage.getItem('accountUsersAccess'))  && (
                        <Link className="play" to='/login'>                  
                        <AiFillPlayCircle className="play-icon"/>
                        </Link>
                        )}

                        {(user?.email && !localStorage.getItem('accountUsersAccess'))  && (
                        <Link className="play" to='/profiles'>                  
                        <AiFillPlayCircle className="play-icon"/>
                        </Link>
                        )}

                        {(user?.email && localStorage.getItem('accountUsersAccess'))  && (
                        <Link onClick={() => setCardMovie(movie)} className="play" to={`/${movie.list.en}/video/${movie.id}`}>                  
                        <AiFillPlayCircle className="play-icon"/>
                        </Link>
                        )}

                        {(!user?.email && !localStorage.getItem('accountUsersAccess'))  && (
                        <Link to="/login">                  
                          <AiOutlinePlusCircle className="add-icon" />
                        </Link>
                        )}
                        {(user?.email && !localStorage.getItem('accountUsersAccess'))  && (
                        <Link to="/profiles">                  
                          <AiOutlinePlusCircle className="add-icon" />
                        </Link>
                        )}
                           {(user?.email && localStorage.getItem('accountUsersAccess'))  && (
                        <Link
                        //  onClick={() => {setSel(movie); selCon(movie); show(movie);}}
                         >   
                        
                           {unMerged.includes(movie) && (
                          <AiFillCheckCircle className="remove-icon" /> 
                        )
                        //  : (
                        //   // <AiOutlinePlusCircle className="add-icon" />
                        //   ``
                        // )
                        }

                        </Link>
                        )}
                     
                      </div>       
                      </div>
                      <h6>Yönetmen: {movie.director}</h6>
                      <h6>Tür: {movie.category.categoryTitle.tr}</h6>
                    </div>
                  </div>
                </div>
              )}
            </Link>
          </div>
        ) : (
          <div
            onClick={() => setSelectedMovie(movie)}
            onMouseLeave={() =>
              window.innerWidth > 991 && setSelectedMovie({})
            }
            className={`mb-4 movie-card position-relative ${
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
        )}
      </>
    ))}
    </div>

 
  );
}

export default MoviesListGrid;
