// import { doc, onSnapshot } from 'firebase/firestore';
// import { default as React, useEffect, useState } from 'react';
// import { UserAuth } from '../../context/AuthContext';
// import { db } from '../../firebase';
// import MoviesList from '../MoviesList';

// const Account = () => {

//   const [movies, setMovies] = useState([]);
//   const { user } = UserAuth();

//   useEffect(() => {
//     onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
//       setMovies(doc.data()?.savedShows);
//     });
//   }, [user?.email]);

//   return (
//     <div className="pagelayout-sub container-fluid">
//       <h3 className='text-light mb-5'>Listem</h3>
//       {movies.length ? (
//       <MoviesList notDisplayCategoryDetailsCard={true} movies={movies} />
//       )
//     :
//     (
//       <h3 className='text-light'>Listenize henüz içerik eklemediniz</h3>
//     )
//     }
//     </div>
//   );
// }

// export default Account;


import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';
import { db } from '../../firebase';
import { initMovies } from '../../utils/constants';
import MoviesList from '../MoviesList';

const Account = () => {
  const { user } = UserAuth();
  const [savedShows, setSavedShows] = useState([]);
  const [addUserInput, setAddUserInput] = useState("");
  const {id, setId} = useContext(UserContext);
  const [name, setName] = useState();
  const {accountUserName, setAccountUserName} = useContext(UserContext);


  const [movies, setMovies] = useState(initMovies);


  useEffect(() => {
      onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
        let itemId = localStorage.getItem('userId')
        const filtered = doc.data().profiles.filter(item=>{
          return item.id == itemId
        })
        setSavedShows(filtered)
        filtered.map((item)=>{
          delete item.id;
        })
        let merged = [];
        for(let i=0; i<filtered.length; i++) {
          merged.push(filtered[i].savedShows)
        }
        setMovies(merged)

        });

  }, []);



// useEffect(() => {
//   setDoc(doc(db, `${user?.email}`, 'ahmet'), {
//     profiles: [
//       {
//         id: id,
//         name: 'ahmet',
//         savedShows: savedShows
//       }
//     ]
// })
// }, []);
  return (
    <div className="pagelayout-sub container">
      <div className="main-body">
        <div className="account">

        {/* <h1 className="text-light">{id}- {accountUserName}</h1> */}

        {movies.length == 0 ? (
          <h1 className="text-light">Listenize henüz içerik eklemediniz</h1>
        )
      :
      <>
      <h2 className="text-light mb-4">{localStorage.getItem('accountUserName')}'in seçtikleri</h2>
      <MoviesList notDisplayCategoryDetailsCard={true} movies={movies} />
      </>
      }
        </div>
      </div>
    </div>
  )
}

export default Account;
