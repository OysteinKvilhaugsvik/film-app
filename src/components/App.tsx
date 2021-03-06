import '../css/App.css';
import '../css/dropDown.css';
import '../css/table.css';
import '../css/modal.css';
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';
import { Sort } from './Sort';
import DropDown from './DropDown';
import { moviesID, moviesFull } from '../services/Interface'

function App() {

  const [moviesID, setMoviesID] = useState<moviesID[]>([]);
  const [moviesFull, setMoviesFull] = useState<moviesFull[]>([]);
  const [searchValue, setSearchValue] = useState("star wars");
  const [tempSearchValue, setTempSearchValue] = useState("star wars");
  const [sortBy, setSortBy] = useState("6");
  const [ascension, setAscension] = useState("DSC");
  const [filterBy, setFilterBy] = useState("0");
  const [showMore, setShowMore] = useState<number>();

  let tableHeader: string[] = ['Title', 'Runtime', 'Director', 'Genres',
    'Year', 'imdbRating', 'imdbVotes', 'Country'];

  const getMoviesID = async (searchValue: string) => {

    var page = 1;
    const movieListID: any[] = [];

    try {
      while (page <= 2) {
        //gjør et søk etter filmer på 2 pages.
        await fetch(`http://www.omdbapi.com/?s=${searchValue}&apikey=866b3677&type=movie&page=${page}`)
          .then(response => response.json())
          .then(response => {
            movieListID.push(response.Search.map((movie: { imdbID: string }) => movie.imdbID));
          })
        page++;
      }
    } catch (err) {
      return err;
    }

    //Setter sammen to lister med ID til 1.
    setMoviesID(movieListID[0].concat(movieListID[1]));
  }

  const getMoviesFull = () => {

    var movieIndex = 0;
    const movieListFull: any[] = [];

    while (movieIndex < moviesID.length) {
      //gjør et søk på id fra moviesID
      axios(`http://www.omdbapi.com/?i=${moviesID[movieIndex]}&apikey=866b3677&plot=full`)
        .then(response => {
          movieListFull.push(response.data);
        });
      movieIndex++;
    }
    setTimeout(() => {
      setMoviesFull(movieListFull);
    }, 300);
  }

  const handleChange = (event: any) => {
    setTempSearchValue(event.target.value)
  }

  const handleSearch = (searchValue: string) => {
    setSearchValue(searchValue)
    setFilterBy("0");
  }

  useEffect(() => {
    getMoviesID(searchValue)
    // eslint-disable-next-line
  }, [searchValue]);

  useEffect(() => {
    getMoviesFull();
    // eslint-disable-next-line
  }, [moviesID])

  const handleSort = (sortBy: string) => {
    setSortBy(sortBy)
    if (ascension === "DSC") { setAscension("ASC") }
    else { setAscension("DSC") }
    console.log("Ascensison: " + ascension)
  }

  const handleAction = () => {
    if (filterBy === "3") { setFilterBy("0") }
    else { setFilterBy("3") }

    var cbox = (document.getElementById('cbox1') as HTMLInputElement);
    if(cbox.checked) { cbox.checked = false }
    else { cbox.checked = true }
  }

  const handleRating = () => {
    if (filterBy === "5") { setFilterBy("0") }
    else { setFilterBy("5") }

    var cbox = (document.getElementById('cbox2') as HTMLInputElement);
    if(cbox.checked) { cbox.checked = false }
    else { cbox.checked = true }
  }

  const handleShowMore = (index: number) => {
    console.log(showMore);
    if (index === showMore) { setShowMore(undefined) }
    else { setShowMore(index) }
  }

  return (

    <div className="App">
      <header className="App-header" />
      <div>
        <SearchBar search={tempSearchValue} onChange={handleChange}
          onClick={() => handleSearch(tempSearchValue)}/></div>
      <div>
        <DropDown onClickAction={handleAction} onClickRating={handleRating}/>
      </div>
      {console.log("search: " + searchValue)}
      <table>
        <tbody>
          <tr>
            {tableHeader.map((tableHeader, index) => (
              <th className={tableHeader} key={index} onClick={() => handleSort("" + index)}>
                {tableHeader}
                {sortBy === (index + "") ? (ascension === "DSC" ? ' ▼' : ' ▲') : null}</th>
            ))}
          </tr>
          <Sort sortBy={sortBy} filterBy={filterBy} ascension={ascension}>
            {moviesFull.map(((moviesFull, index) => (
              <><tr key={index} onClick={() => handleShowMore(index)}>
                  <td>{moviesFull.Title}</td>
                  <td>{moviesFull.Runtime}</td>
                  <td>{moviesFull.Director}</td>
                  <td>{moviesFull.Genre}</td>
                  <td>{moviesFull.Year}</td>
                  <td>{moviesFull.imdbRating}</td>
                  <td>{moviesFull.imdbVotes}</td>
                  <td>{moviesFull.Country}</td>
                </tr>
              </>
            )))}
          </Sort>
        </tbody>
      </table>
        {showMore !== undefined ? (
          <div className="shadow">
            <div className="modal">
              <div className="modal-content">
                <div className="title"> {moviesFull[showMore].Title}</div>
                <div className="plot"><b>Plot: </b>{moviesFull[showMore].Plot}</div>
                <img src={moviesFull[showMore].Poster} 
                alt="No Poster" className="poster"/>
                <button className="closeButton" onClick={() => setShowMore(undefined)}>close</button>
              </div>
            </div>
          </div>
          ) : (null)}

    </div>
  );

}
export default App;