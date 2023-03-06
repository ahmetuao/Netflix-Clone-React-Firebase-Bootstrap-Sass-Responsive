import { arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { AiFillCheckCircle, AiFillPlayCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { BiChevronDownCircle } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';
import { db } from '../../firebase';

const MoviesDetailsCard = ({ movie, selectedMovie, setMoviesDetailsModalFunc }) => {
    const { user } = UserAuth();
    const navigate = useNavigate();
    const [like, setLike] = useState(false);
    const [savedShows, setSavedShows] = useState([]);
    const {id, setId} = useContext(UserContext)
    const {navigateControl, setNavigateControl} = useState()
    const {selectedMovieInModal, setSelectedMovieInModal} = useContext(UserContext);

    let merged = [];

     useEffect(() => {
       onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
        //  doc.data().profiles.map((item,idx) => {
        //    console.log(item);
        //  })
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
            if(item.title.includes(movie.title) && localStorage.getItem('accountUsersAccess')) {
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
        if(item.title.includes(movie.title) && localStorage.getItem('accountUsersAccess')) {
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
        <div className={`movie-details-card ${selectedMovie == movie ? `active` : ``}`}>
                <div className="card bg-secondary">
                    <img src={movie.thumbUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <div className="d-flex flex-column">
                        <h5 className="card-title text-light">
                           {movie.title}
                        </h5>
                        <div className="d-flex mb-2">
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
                        <Link className="play" to={`/${movie.list.en}/video/${movie.id}`}>                  
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

                
                        <Link className="ml-auto" onClick={()=> {setMoviesDetailsModalFunc(true); setSelectedMovieInModal(movie)}}>
                        <BiChevronDownCircle className="details-icon" />
                        </Link>
                        </div>
                        </div>
                        <p className="card-text text-light small">
                          <span className="font-weight-bold">Tür:</span> {movie.category.categoryTitle.tr}
                            </p>
                    </div>
                </div>
        </div>
    )
}

export default MoviesDetailsCard