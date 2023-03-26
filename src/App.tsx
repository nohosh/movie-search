import React, {  useState } from 'react';
import './App.css';
import Search from './components/Search';
import useMovieSearch from './hooks/useMovieSearch';

function App() {
  const [search, setSearch] = useState('');  
  const [pageNo, setPageNo] = useState(1); 
  const { movies, hasMore, loading, errMsg } = useMovieSearch(
    search,
    `${pageNo}`
  );

  return (
    <div className="App">
    <Search  setSearch={setSearch}/>
    <ul>
    {movies && movies.map(movie=>{
      return <li>{movie.Title}</li>
    })}
    </ul>
    <button onClick={()=>setPageNo(pageNo+1)}>+1</button>
    </div>
  );
}

export default App;
