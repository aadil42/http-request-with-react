import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [dummyMovies, setDummyMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const fetchMovies = () => {
  //   fetch('https://swapi.dev/api/films/').then((data) => {
  //     return data.json();
  //   }).then((data) => {
  //     const newData = data.results.map((singleData) => {
  //       return {
  //         id: singleData.episode_id,
  //         title: singleData.title,
  //         releaseDate: singleData.release_date,
  //         openingText: singleData.opening_crawl
  //       }
  //     }); 
      
  //     setDummyMovies(() => {
  //       return newData;
  //     });
  //   });
  // }

   const fetchMovies = async  () => {
    setIsLoading(true);
    let response = await fetch('https://swapi.dev/api/films/');
    response = await response.json();
    const newData = response.results.map((singleData) => {
      return {
        id: singleData.episode_id,
        title: singleData.title,
        releaseDate: singleData.release_date,
        openingText: singleData.opening_crawl
      }
    });
    setIsLoading(false);
    setDummyMovies(() => {
      return newData;
    });
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && dummyMovies.length > 0 &&  <MoviesList movies={dummyMovies} />}
        {!isLoading && dummyMovies.length === 0 && <p>No Movies Found :(</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
