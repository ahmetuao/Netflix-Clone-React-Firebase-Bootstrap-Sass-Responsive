import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchBarVisibility, setSearchBarVisibility] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
     if(searchTerm.length > 1) {
       navigate(`/search/${searchTerm}`)
     }
     if(searchTerm.length == 0) {
      navigate(`/`)
     }
  }, [searchTerm]);

  useEffect(() => {
    if(searchBarVisibility) {
      document.querySelector('.search-bar').classList.add('active')
    }
    else {
      document.querySelector('.search-bar').classList.remove('active')
    }
  }, [searchBarVisibility]);


  return (
      <>
            <input
            placeholder="İçerik, Tür"
              id="form1"
              className="form-control search-input"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <BsSearch onClick={()=> setSearchBarVisibility(!searchBarVisibility)} className="search-icon"/>
      </>
  )
}

export default SearchBar
