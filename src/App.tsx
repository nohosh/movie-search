import React, {  useCallback, useEffect, useState } from 'react';
import './App.css';
import Modal from './components/Modal';
import RenderMovies from './components/RenderMovies';
import Search from './components/Search';
import Snackbar from './components/Snackbar';
import useMovieSearch from './hooks/useMovieSearch';
import { Movie } from "./types";

function App() {
  const [search, setSearch] = useState('');  
  const [pageNo, setPageNo] = useState(1); 
  const [snackBar, setSnackBar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie>();
  const { movies, hasMore, loading, errMsg ,error} = useMovieSearch(
    search,
    `${pageNo}`
  );

  const handleSelectMovie = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  }, []);

  useEffect(()=>{    
    if(error)setSnackBar(true);
  }, [error]);

  useEffect(()=>{
    if(search==='')setPageNo(1);
  },[search])

  const modalContent = selectedMovie ? (
    <div className="modal-movie">
      <img
        className="modal-image"
        src={selectedMovie.Poster}
        alt="movie poster"
      />
      <h1>{selectedMovie.Title}</h1>
      <h1>Type: {selectedMovie.Type}</h1>
      <h1>{selectedMovie.Year}</h1>
      <h1>{selectedMovie.imdbID}</h1>
    </div>
  ) : null;


  return (
    <div className="App">
      {loading && <div className='dot-elastic'></div>}
      <Search  setSearch={setSearch}/>   
      {movies.length ? <RenderMovies onSelect={handleSelectMovie} hasNextPage={hasMore} isNextPageLoading={loading} movies={movies} loadNextPage={()=>setPageNo((curr)=> curr+1)}/>:<h1>Try me{error && <>🤮</>}</h1>}    
      <Snackbar
          showSnackbar={snackBar}
          message={errMsg}
          onClose={() => setSnackBar(false)}
        />
      <Modal
          content={modalContent}
          showModal={showModal}
          onClose={() => setShowModal(false)}
        />
    </div>

  );
}

export default App;
