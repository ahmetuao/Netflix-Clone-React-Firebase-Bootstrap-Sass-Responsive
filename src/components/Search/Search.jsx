import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { initMovies } from '../../utils/constants'
import { FilterMovies } from '../../utils/filterMovies'
import MoviesList from '../MoviesList'

const Search = ({ searchTermContext }) => {
  const [searchMovies, setSearchMovies] = useState(initMovies[0])
  const [searchSeries, setSearchSeries] = useState(initMovies[1])
  let initSearchResults = searchMovies.concat(searchSeries)
  const [searchResults, setSearchResults] = useState(initSearchResults)
  const [unMergedControl, setUnMergedControl] = useState(false)
  const [unMergedControlCat, setUnMergedControlCat] = useState('')
  const [noMerged, setNoMerged] = useState(false)

  const navigate = useNavigate()

  const { searchTerm } = useParams()

  //   useEffect(() => {
  //     const methodFilterMovies = 3
  //     const keySearchMovies = 'The'
  //     const filteredSearchMovies = FilterMovies(methodFilterMovies, keySearchMovies, searchMovies)
  //     setSearchMovies(filteredSearchMovies)
  // }, [])

  // useEffect(() => {
  //   if(unMergedControl == true && unMergedControlCat == 'movies') {
  //     initSearchResults = searchMovies
  //   }
  //   if(unMergedControl == true && unMergedControlCat == 'series') {
  //    initSearchResults = searchSeries
  //  }
  // }, [unMergedControlCat]);

  useEffect(() => {
    setUnMergedControlCat('')
    setUnMergedControl(false)
    setNoMerged(false)
  }, [searchTerm])

  useEffect(() => {
    if (unMergedControl == true && unMergedControlCat == 'movies') {
      initSearchResults = searchMovies
    }
    if (unMergedControl == true && unMergedControlCat == 'series') {
      initSearchResults = searchSeries
    }

    if (unMergedControl == false && unMergedControlCat == '') {
      initSearchResults = searchMovies.concat(searchSeries)
    }

    const methodFilter = 3
    const keySearch = searchTerm
    const filteredSearch = FilterMovies(
      methodFilter,
      keySearch,
      initSearchResults,
      noMerged
    )
    setSearchResults(filteredSearch)
  }, [searchTerm, unMergedControlCat, setUnMergedControlCat])

  let control
  let controlTr
  let tur
  let turTr
  return (
    <div className="pagelayout-sub search-area container-fluid">
      {searchResults.length != 0 ? (
        <div>
          {searchResults.map((item) => {
            control = item.category.categoryTitle.en
              .toLowerCase()
              .includes(searchTerm.toLocaleLowerCase())
            if (control) {
              tur = item.category.categoryTitle.en;
            }

            controlTr = item.category.categoryTitle.tr
              .toLowerCase()
              .includes(searchTerm.toLocaleLowerCase())
            if (controlTr) {
              turTr = item.category.categoryTitle.tr
            }
          })}

          {(control || controlTr) && (
            <div className="text-light related-content d-flex flex-sm-row flex-column align-items-sm-center ">
              <h3 className="text-light">İlgili içeriğe göz atın:</h3>
              <div className="d-flex flex-row my-3 ml-sm-3 ml-0">
                <Link
                  className="text-light mr-3"
                  style={{ width: 'fit-content' }}
                  onClick={() => {
                    setUnMergedControl(true)
                    setUnMergedControlCat('movies')
                    setNoMerged(true)
                  }}
                >
                  {control && (
                    `${tur} Movies`
                  )}
                    {controlTr && (
                    `${turTr} Filmleri`
                  )}
                </Link>
                <Link
                  className="text-light mr-3"
                  style={{ width: 'fit-content' }}
                  onClick={() => {
                    setUnMergedControl(true)
                    setUnMergedControlCat('series')
                  }}
                >
                      {control && (
                    `${tur} Series`
                  )}
                    {controlTr && (
                    `${turTr} Dizileri`
                  )}
                </Link>
              </div>
            </div>
          )}

          {unMergedControl ? (
            <MoviesList
              movies={searchResults}
              initSearchResults={initSearchResults}
            />
          ) : (
            <MoviesList
              movies={searchResults}
              initSearchResults={initSearchResults}
            />
          )}
        </div>
      ) : (
        <h3 className="text-light">
          <span className="text-danger">"{searchTerm}"</span> Kriterine Uygun
          Sonuç Bulunamadı!
        </h3>
      )}
      {/* <MoviesList movies={searchSeries} /> */}
    </div>
  )
}

export default Search
