import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';
import { db } from '../../firebase';
import AddProfile from './AddProfile';

const Profiles = () => {
  const {id, setId} = useContext(UserContext);
  const {accountUserName, setAccountUserName} = useContext(UserContext);
  
  const [addProfile, setAddProfile] = useState(false);

  const [initUsers, setInitUsers] = useState([]);
  const { user } = UserAuth();


  const navigate = useNavigate()


  // const profiles = doc(db, 'users', `${user?.email}`, 'profiless');
  // const show = async () => {
  //     if (user?.email) {
  //         await updateDoc(profiles, {
  //           profiles: arrayUnion({
  //             id: 1,
  //             title: 'AHMET',
  //           }),
  //         });
  //       } else {
  //         alert('Please log in to save a movie');
  //       }
  // }
  const show = (id, name) => setDoc(doc(db, `${user?.email}`, name), {
    profiles: [
      {
        id: id,
        name: name,
      }
    ]
})



let tempInit;
        useEffect(() => {
          if(localStorage.getItem('accountUsersInfo')) {
            setInitUsers((localStorage.getItem('accountUsersInfo')).split(","))
         }
         else {
          onSnapshot(collection(db, `${user?.email}`), (doc) => {
            tempInit = [];
              doc.docs.map((item, idx)=> {
                tempInit.push(item.id);
              })
              setInitUsers(
                initUsers.concat(tempInit)
              )
             });
         }
  
    }, []);

    let addProfileFunc = (bool) => {
        setAddProfile(bool)
    }


 useEffect(() => {
   localStorage.setItem('accountUsersInfo', initUsers);
 }, [initUsers]);

   
  return (
    <div className="pagelayout-sub container text-center">
      <div className="main-body row justify-content-center">
        <div className="profiles col-lg-8 col-12">
     
          {initUsers.length > 0 ? (
            <>
          <h1 className="top-title text-light mb-3">Kim izliyor?</h1>        
            <h3>Devam etmek için profilinizi seçin</h3>
            <div className="d-flex flex-lg-row flex-wrap align-items-center justify-content-center profile-cards">
            {initUsers.map((item,idx) => (
              <Link key={idx} to="/account"
              className="text-light choose-profile-card mb-5"
              onClick={()=>
                 {setId(idx+1); 
                  localStorage.setItem("userId", idx+1);
                  setAccountUserName(item); 
                  localStorage.setItem('accountUserName', item);
                  show((idx+1), item)
                localStorage.setItem('accountUsersAccess', true)
                }}
            >
              <div className="card"></div>
              <h6 className="profile-name">
              {item}
              </h6>
            </Link>
            
            )
            )}
            <div className="choose-profile-card mb-5" onClick={() => addProfileFunc(!addProfile)}>
            <FaPlusCircle className="add-profile-icon"/>
            <h6>Profil ekle</h6>
            </div>
     
            </div>
            {addProfile && (
            <AddProfile profilFounded={true} initUsers={initUsers} setInitUsers = {setInitUsers} />
            )}
            </>
          )
        : (
          <>
        <AddProfile profilFounded={false} initUsers={initUsers} setInitUsers = {setInitUsers} />
          </>
        )
        }
       {/* <div className="add-profile col-lg-6 justify-content-center mx-auto mt-5">
       <input className="form-control" onChange={(e)=> setAccUserInput(e.target.value)} placeHolder="Profil adınızı belirleyin" />
          <Link className="btn btn-dark shadow-lg mt-5" onClick={()=> {
            show((initUsers.length + 1), accUserInput);
            setInitUsers([...initUsers, accUserInput])
          }}>Profil Ekle</Link>
       </div> */}


          {/* <Link to="/account"
            onClick={()=> {setId(1)}}
          >
            <h1 className="text-light">AHMET</h1>
          </Link>
          <Link to="/account"
            onClick={()=> {setId(2)}}
          >
            <h1 className="text-light">MEHMET</h1>
          </Link> */}
 
        </div>
      </div>
    </div>
  )
}

export default Profiles;
