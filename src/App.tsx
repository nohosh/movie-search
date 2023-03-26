import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './components/Search';
import { KEY } from './constants';

function App() {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState<any[]>([]);
  const pageNumber = '1';
  useEffect(()=>{
    fetch(`https://www.omdbapi.com/?s=${search}&page=${pageNumber}&apikey=${KEY}`).then(res=>res.json())
    .then(res=>setMovies(res.Search));
  },[search]);
  return (
    <div className="App">
    <Search  setSearch={setSearch}/>
    <ul>
    {movies && movies.map(movie=>{
      return <li>{movie.Title}</li>
    })}
    </ul>
    </div>
  );
}

export default App;
