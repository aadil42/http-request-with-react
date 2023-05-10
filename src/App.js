import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [dummyMovies, setDummyMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
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
    try {
      let response = await fetch('https://swapi.dev/api/films/');

      if(!response.ok) {
        console.log(response.ok);
        throw new Error('network error');
      } 

      response = await response.json();

      const newData = response.results.map((singleData) => {
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

    } catch {
      // console.log('hehe'); 
      setError(true);
    }

    setIsLoading(false);
  }

  let content = '';
  if(!isLoading && dummyMovies.length > 0 && !error) {
    content = <MoviesList movies={dummyMovies} />;
  }
  if(!isLoading && error) {
    content = <p>Network Error</p>;
  }
  if(!isLoading && dummyMovies.length === 0 && !error) {
    content = <p>No Movies Found :(</p>
  }
  if(isLoading && !error) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
