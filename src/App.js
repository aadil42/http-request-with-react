import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [dummyMovies, setDummyMovies] = useState([]);

  const fetchMovies = () => {
    fetch('https://swapi.dev/api/films/').then((data) => {
      return data.json();
    }).then((data) => {
      const newData = data.results.map((singleData) => {
        return {
          id: singleData.episode_id,
          title: singleData.title,
          releaseDate: singleData.release_date,
          openingText: singleData.opening_crawl
        }
      }); 
      
      setDummyMovies(() => {
        return newData;
      });
    });
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={dummyMovies} />
      </section>
    </React.Fragment>
  );
}

export default App;
