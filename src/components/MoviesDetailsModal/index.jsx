import { arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { AiFillCheckCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { BsFillPlayFill } from 'react-icons/bs'
import { IoCloseCircle } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import { UserContext } from '../../context/UserContext'
import { db } from '../../firebase'
import { FilterMovies } from '../../utils/filterMovies'
import MoviesList from '../MoviesList'


const MoviesDetailsModal = ({
  movie,
  movieDetailsModal,
  setMovieDetailsModal,
  movies,
  initSearchResults,
}) => {
  const [directorMovies, setDirectorMovies] = useState([])
  const [categoryMovies, setCategoryMovies] = useState([])
  const [like, setLike] = useState(false);
  const [savedShows, setSavedShows] = useState([]);
  const { user } = UserAuth();
  const {id, setId} = useContext(UserContext)

  const navigate = useNavigate();

  let init
  if (initSearchResults) {
    init = initSearchResults.filter((item) => {
      const tur = item.list.tr
      return tur.includes(movie.list.tr)
    })
  }

  useEffect(() => {
    const methodDirectorMovies = 2
    const keyDirectorMovies = movie.director
    const filteredDirectorMovies = FilterMovies(
      methodDirectorMovies,
      keyDirectorMovies,
      initSearchResults ? init : movies,
      movie,
    )
    setDirectorMovies(filteredDirectorMovies)

    const methodCategoryMovies = 1
    const keyCategoryMovies = movie.category.categoryId
    const filteredCategoryMovies = FilterMovies(
      methodCategoryMovies,
      keyCategoryMovies,
      initSearchResults ? init : movies,
    )
    setCategoryMovies(filteredCategoryMovies)
  }, [])

  useEffect(() => {
  }, [setMovieDetailsModal])


  let merged = [];

   useEffect(() => {
     onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      const filtered = doc.data().profiles.filter((item)=>{
        return item.id ==  localStorage.getItem('userId')
      })
      filtered.map((item, idx) => {
        delete item.id
      })
      for(let i=0; i<filtered.length; i++) {
        merged.push(filtered[i].savedShows)
      }
        setSavedShows(merged)

        merged.map((item)=> {
          if(item.title.includes(movie.title)  && localStorage.getItem('accountUsersAccess')) {
            setLike(true)
          }
        })
       });
   }, []);

  useEffect(() => {
    likeControl(movie)
  }, [savedShows]);

  const likeControl = (movie) => {
    merged.map((item)=> {
      if(item.title.includes(movie.title)  && localStorage.getItem('accountUsersAccess')) {
        setLike(true)
      }
    })
  }

  const movieID = doc(db, 'users', `${user?.email}`);
  const show = async () => {
      if (user?.email) {
        setLike(true);
          await updateDoc(movieID, {
            profiles: arrayUnion({

                      savedShows: {id: movie.id,
                      title: movie.title,
                      listTr: movie.list.tr,
                      listEn: movie.list.en,
                      director: movie.director,
                      thumbUrl: movie.thumbUrl,
                      categoryId: movie.category.categoryId,
                      categoryTitleTr: movie.category.categoryTitle.tr,
                      categoryTitleEn: movie.category.categoryTitle.en,},
                      
                        id: id
                      
            }
            ),
          });
        } else {
          alert('Please log in to save a movie');
          navigate('/login')
        }
  }

  return (
    <div
      className="modal fade show"
      id="exampleModalLong"
      tabIndex="-1"
      aria-labelledby="exampleModalLongTitle"
      style={{ display: 'block', paddingRight: '17px' }}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div
            className="modal-header"
            style={{ backgroundImage: `url(${movie.thumbUrl})` }}
          >
            <h2 className="modal-title" id="exampleModalLongTitle">
              {movie.title}
            </h2>
            <div className="link-area mt-auto mb-5 px-3 d-flex">


                        {(!user?.email && !localStorage.getItem('accountUsersAccess'))  && (
                        <Link className="playv2" to='/login'>                  
                           <BsFillPlayFill className="playv2-icon" />
                              Oynat
                        </Link>
                        )}

                        {(user?.email && !localStorage.getItem('accountUsersAccess'))  && (
                        <Link className="playv2" to='/profiles'>                  
                           <BsFillPlayFill className="playv2-icon" />
                              Oynat
                        </Link>
                        )}

                        {(user?.email && localStorage.getItem('accountUsersAccess'))  && (
                        <Link className="playv2" to={`/${movie.list.en}/video/${movie.id}`}>                  
                           <BsFillPlayFill className="playv2-icon" />
                              Oynat
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
                        <Link onClick={() => show()}>                  
                             {like ? (
                            <AiFillCheckCircle className="remove-icon" />
                            ):
                            (
                              <AiOutlinePlusCircle className="add-icon" />
                            )
                            }
                        </Link>
                        )}

            </div>
            <Link
              onClick={() => {
                setMovieDetailsModal(false)
              }}
            >
            <IoCloseCircle
            className="icon-close-modal"   
            />
            </Link>
          </div>
          <div className="modal-body">
            <div className="directors-list">
              <h4 className="mb-4">Aynı Yönetmenden {movie.list.tr}</h4>
              <MoviesList
                movies={directorMovies}
                notDisplayCategoryDetailsCard={true}
                onModal={true}
              />
            </div>
            <div className="categories-list">
              <h4 className="mb-4">
                {movie.category.categoryTitle.tr} Türündeki Diğer{' '}
                {movie.list.tr}
              </h4>
              <MoviesList
                movies={categoryMovies}
                notDisplayCategoryDetailsCard={true}
                onModal={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoviesDetailsModal
