import React, {  useEffect, useState } from 'react';
import './App.css';
import Search from './components/Search';
import Snackbar from './components/Snackbar';
import useMovieSearch from './hooks/useMovieSearch';

function App() {
  const [search, setSearch] = useState('');  
  const [pageNo, setPageNo] = useState(1); 
  const [snackBar, setSnackBar] = useState(false);
  const { movies, hasMore, loading, errMsg } = useMovieSearch(
    search,
    `${pageNo}`
  );

  useEffect(()=>{    
    if(errMsg.length>0)setSnackBar(true);
  }, [errMsg]);

  return (
    <div className="App">
    <Search  setSearch={setSearch}/>
    <ul>
    {movies && movies.map(movie=>{
      return <li>{movie.Title}</li>
    })}
    </ul>
    <button onClick={()=>setPageNo(pageNo+1)}>+1</button>
    <Snackbar
        showSnackbar={snackBar}
        message={errMsg}
        onClose={() => setSnackBar(false)}
      />
    </div>

  );
}

export default App;
