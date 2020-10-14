import React, { useState, useEffect } from "react";
import axios from "../axios";
import "../CSS/row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const posterBaseURL = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchURL, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(fetchURL);
      setMovies(response.data.results);
      return response;
    }
    fetchData();
  }, [fetchURL]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1
    }
  };

  const handleClick = (movie) => {
    if(trailerUrl){
      setTrailerUrl("");
    }else {
      movieTrailer(movie.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch(err => console.log(err));
    }
  }

  //console.log(movies);

  const AllMovies = movies.map((movie) => {
    return (
      <img
        key={movie.id}
        onClick = {() => handleClick(movie)}
        className={`row__poster  ${isLargeRow && "row__posterLarge"}`}
        src={`${posterBaseURL}${
          isLargeRow ? movie.poster_path : movie.backdrop_path
        }`}
        alt={movie.original_name}
      />
    );
  });

  return (
    <div className="row">
      <h2> {title} </h2>
      <div className="row__posters">{AllMovies}</div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
    </div>
  );
};

export default Row;
