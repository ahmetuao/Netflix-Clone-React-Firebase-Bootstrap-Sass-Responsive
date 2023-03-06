import React, { useContext, useEffect, useState } from "react";
import { AiFillHome, AiOutlineClose } from "react-icons/ai";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineLogin, HiOutlineLogout } from "react-icons/hi";
import { MdAccountCircle, MdLocalMovies } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import HeaderLogo from '../../assets/img/header_logo.png';
import { UserAuth } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import { header } from "../../utils/header";
import SearchBar from "../SearchBar";

const Header = () => {
  const [accountDD, setAccountDd] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { user, logOut } = UserAuth();
  const {id, setId} = useContext(UserContext);
  const {accountUserName, setAccountUserName} = useContext(UserContext);
  const {dropdownMenu, setDropdownMenu} = useContext(UserContext);


  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  header();

  useEffect(() => {
    if(mobileMenu) {
      document.querySelector('html').classList.add('active')
    }
    else {
      document.querySelector('html').classList.remove('active')
    }
  }, [mobileMenu]);

  return (
    <div className="header container-fluid-fluid">
      <div
        className={`navigation container-fluid d-flex justify-content-between h-100 ${
          window.innerWidth < 991 && `d-flex flex-row justify-content-between`
        }`}
      >
        <div className="navigation-left">
          <Link onClick={()=>setMobileMenu(false)} style={{ lineHeight: "1" }} to="/">
            <img
              src={HeaderLogo}
              width="150"
            />
          </Link>
        </div>
        {window.innerWidth > 991 ? (
          <>
            <div className="navigation-right w-100">
              <ul className="d-flex">
                <li>
                  <Link to="/">Ana Sayfa</Link>
                </li>
                <li>
                  <Link to="/movies">Filmler</Link>
                </li>
                <li>
                  <Link to="/series">Diziler</Link>
                </li>
              </ul>
            </div>
            <div className="search-bar">
            <SearchBar />
            </div>
            <div className="navigation-account">
                {user?.email ? (
                  <div className="position-relative">
                    <>
                      <div
                        className="text-light m-0 account"
                        onClick={() => {
                          setAccountDd(!accountDD);
                        }}
                        to="/account"
                      >
                        <div className="d-flex align-items-center">
                        {user.email}
                      {accountDD ? (
                        <BsCaretUpFill className="ml-2 small" />
                      ) : (
                        <BsCaretDownFill className="ml-2 small"/>
                      )}
                        </div>
                      </div>
                      {accountDD && (
                        <div className="account-dropdown d-flex flex-column">
                          {
                            localStorage.getItem('accountUsersAccess') && (
                              <Link
                              className="text-light"
                              onClick={() => setAccountDd(true)}
                              to="/account"
                            >
                              {/* {accountUserName} */}
                          {localStorage.getItem('accountUserName')}
                            </Link>
                            )
                          }
                            {/* {localStorage.getItem('accountUsersAccess') && ( */}
                              <Link
                              className="text-light"
                              onClick={() => setAccountDd(true)}
                              to="/profiles"
                            >
                              Profiller
                            </Link>
                            {/* )} */}
                 
                            <Link
                              onClick={() => 
                                {handleLogout(); 
                                  setId(1); 
                                  localStorage.removeItem('accountUsersInfo');
                                   setAccountUserName("")
                            localStorage.removeItem('accountUsersAccess')
                            localStorage.removeItem('accountUserInfo')
                                  
                                  }}
                              className="text-light pr-4"
                            >
                              Oturumu kapat
                            </Link>
                        </div>
                      )}
                    </>
                  </div>
                ) : (
                  <>
                      <Link className="login-button text-light" to="/login">
                        Oturum Aç
                      </Link>
                  </>
                )}
            </div>
          </>
        ) : (
          <>
            {!mobileMenu && (
                <>
                 <Link onClick={() => setMobileMenu(!mobileMenu)}>
                 <GiHamburgerMenu className="icon-hamburger" />
               </Link>
            
                </>
            )}
                <div className="search-bar">
                   <SearchBar />
                   </div>
            {mobileMenu && (  
        <>
              <Link onClick={() => setMobileMenu(!mobileMenu)}>
              <AiOutlineClose className="icon-close" />
            </Link>
            <div className="mobile-menu">
                {user?.email ? (
                  <>
                    <Link
                      style={{
                        borderBottom: "1px solid #fff",
                        paddingBottom: "1rem",
                      }}
                      className="text-light"
                    >
                      <h4>{user.email}</h4>
                    </Link>

                    <div
                      style={{ borderBottom: "1px solid #fff" }}
                      className="py-3 d-flex flex-column"
                    >
                            {localStorage.getItem('accountUsersAccess') && (
                                    <Link
                                    className="d-flex align-items-center text-light pb-3"
                                    to="/account"
                                onClick={() => setMobileMenu(false)}

                                  >
                   
                        <MdAccountCircle className="mr-3 icon-account" />
                          {/* {accountUserName} */}
                          {localStorage.getItem('accountUserName')}
                      </Link>
                            )}

             
                    
                      <Link
                             className="d-flex align-items-center text-light pb-3"
                             onClick={() => setMobileMenu(false)}
                              to="/profiles"
                            >
                        <MdAccountCircle className="mr-3 icon-account" />
                              Profiller
                            </Link>
                      <Link
                        onClick={() => 
                          {handleLogout(); 
                            localStorage.removeItem('accountUsersInfo');
                             setAccountUserName("");
                            localStorage.removeItem('accountUsersAccess')
                            localStorage.removeItem('accountUserInfo')

                            } }
                        className="d-flex align-items-center text-light pb-3 pr-4"
                      >
                        <HiOutlineLogout className="mr-3 icon-logout" />
                        Oturumu kapat
                      </Link>
                    </div>
                  </>
                ) : (
                  <Link
                    className="d-flex align-items-center text-light pb-3"
                    to="/account"
                    style={{ borderBottom: "1px solid #fff" }}
                    onClick={()=> setMobileMenu(false)}

                  >
                    <HiOutlineLogin className="mr-3 icon-account" 
                    />
                    Oturum Aç
                  </Link>
                )}
                <div className="py-3 d-flex flex-column">
                  <Link
                    onClick={() => setMobileMenu(false)}
                    className="text-light pb-3 d-flex align-items-center"
                    to="/"
                  >
                    <AiFillHome className="icon-home mr-3" />
                    Ana Sayfa
                  </Link>
                  <Link
                    onClick={() => setMobileMenu(false)}
                    className="text-light pb-3 d-flex align-items-center"
                    to="/movies"
                  >
                    <MdLocalMovies className="icon-videos mr-3" />
                    Filmler
                  </Link>
                  <Link
                    onClick={() => setMobileMenu(false)}
                    className="text-light pb-3 d-flex align-items-center"
                    to="/series"
                  >
                    <MdLocalMovies className="icon-videos mr-3" />
                    Diziler
                  </Link>
                </div>
              </div>
        </>
            
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
