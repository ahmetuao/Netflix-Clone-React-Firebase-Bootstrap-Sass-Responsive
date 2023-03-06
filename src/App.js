import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Account from './components/Account'
import Header from './components/Header/Header'
import Login from './components/Login'
import Main from './components/Main/Main'
import Movie from './components/Movie/Movie'
import Movies from './components/Movies'
import MoviesCategory from './components/MoviesCategory/MoviesCategory'
import Profiles from './components/Profiles'
import AddProfile from './components/Profiles/AddProfile'
import ProtectedRoute from './components/ProtectedRoute'
import Search from './components/Search/Search'
import Serie from './components/Serie/Serie'
import Series from './components/Series'
import SeriesCategory from './components/SeriesCategory/SeriesCategory'
import Signup from './components/Signup'
import { AuthContextProvider } from './context/AuthContext'
import { UserContext } from './context/UserContext'

// const { user } = UserAuth();


function App() {
  const [id, setId] = useState(1)
  const [accountUserName, setAccountUserName] = useState("")
  const [userAccountAccess, setUserAccountAccess] = useState(false)
  const [selectedMovieInModal, setSelectedMovieInModal] = useState({})

  return (
    <div className="App bg-secondary" style={{ minHeight: '100vh' }}>
      <UserContext.Provider value={{id, setId, accountUserName, setAccountUserName, userAccountAccess, setUserAccountAccess, selectedMovieInModal, setSelectedMovieInModal}}>
        <AuthContextProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" exact element={<Main />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/series" element={<Series />} />
              <Route path="/profiles" element={<Profiles />} />
              <Route path="/add-profile" element={<AddProfile />} />
              <Route path="/search/:searchTerm" element={<Search />} />
              <Route path="/movies/:id" element={<MoviesCategory />} />
              <Route path="/series/:id" element={<SeriesCategory />} />
              <Route
                path="/movies/video/:id"
                element={
                  <ProtectedRoute>
                    <Movie />
                  </ProtectedRoute>
                }
              />
              {/* <Route path="/movies/video/:id" element={<Movie />} /> */}
              {/* <Route path="/series/video/:id" element={<Serie />} /> */}
              <Route
                path="/series/video/:id"
                element={
                  <ProtectedRoute>
                    <Serie />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </AuthContextProvider>
      </UserContext.Provider>
    </div>
  )
}

export default App
