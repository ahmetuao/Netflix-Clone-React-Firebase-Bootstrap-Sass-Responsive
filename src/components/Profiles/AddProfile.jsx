import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { db } from '../../firebase';

const AddProfile = ({profilFounded, initUsers, setInitUsers}) => {
  const { user } = UserAuth();
  const [accUserInput, setAccUserInput] = useState("");

    
  const show = (id, name) => setDoc(doc(db, `${user?.email}`, name), {
    profiles: [
      {
        id: id,
        name: name,
      }
    ]
})
  return (
    <div className="add-profile-section">
     {profilFounded ? (
        <div className="profil-founded">
          <h3 className="mb-3 mt-5">
        Ahmetflix'i izleyen başka bir kişi için profil ekleyin.
      </h3>
      <div className="add-profile col-lg-6 justify-content-center mx-auto">
 <input className="profile-input" onChange={(e)=> setAccUserInput(e.target.value)} placeHolder="Profil adınızı belirleyin" />
    <Link className="profile-button shadow-lg mt-5" onClick={()=> {
      show((initUsers.length + 1), accUserInput);
      setInitUsers([...initUsers, accUserInput])
    }}>Profil Ekle</Link>
    </div>
        </div>
     ) : (
      <div className="profil-not-founded">
        <h1 className="text-danger">Henüz Bir Profiliniz Yok</h1>
      <h3 className="text-dark">Hemen bir profil oluştur ve Ahmetflix'in tadını çıkar.</h3>

      <div className="add-profile col-lg-6 justify-content-center mx-auto mt-5">
   <input className="profile-input" onChange={(e)=> setAccUserInput(e.target.value)} placeHolder="Profil adınızı belirleyin" />
      <Link className="profile-button shadow-lg mt-5" onClick={()=> {
        show((initUsers.length + 1), accUserInput);
        setInitUsers([...initUsers, accUserInput])
      }}>Profil Ekle</Link>
   </div>
      </div>
     )}





    </div>
  );
}

export default AddProfile;
