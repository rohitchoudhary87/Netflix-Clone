import React, { useState, useEffect } from "react";
import axios from "../axios";
import requests from "../request";
import '../CSS/Banner.css';

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        response.data.results[
          [Math.floor(Math.random() * response.data.results.length - 1)]
        ]
      );
      return response;
    }
    fetchData();
  }, []);

  function truncate(str , n) {
    return str?.length > n ? str.substr(0 , n-1) + "..." : str;
  }

  console.log(movie);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center"
      }}
    >
      <div className="banner__contents">
        {/*Title*/}
        <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>

        {/*Two Buttons*/}
        <div className="banner__buttons">
          <button className="banner__button"> Play </button>
          <button className="banner__button"> My List </button>
        </div>
        
        {/*Description*/}
        <h1 className="banner__description"> 
          {truncate(movie.overview , 150 )}
        </h1>
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  );
};

export default Banner;
