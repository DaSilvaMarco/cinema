import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Loading from "./Loading";

const Form = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [search, setSearch] = useState(null);
  const [sortGoodBad, setSortGoodBad] = useState(null);

  useEffect(() => {
    if (search) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=e0026bdb43933e1d07ddc751057c1a99&query=${search}&language=fr-FR`
        )
        .then((res) => setMoviesData(res.data.results));
    } else {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=e0026bdb43933e1d07ddc751057c1a99&language=fr-FR&page=1`
        )
        .then((res) => setMoviesData(res.data.results));
    }
  }, [search]);

  return (
    <div className="form-component">
      <div className="form-container">
        <form>
          <input
            type="text"
            placeholder="Entrez le titre d'un film"
            id="search-input"
            onChange={(e) => setSearch(e.target.value)}
          />
          <input type="submit" value="Rechercher" />
        </form>
        <div className="btn-sort-container">
          <div
            className="btn-sort"
            id="goodToBad"
            onClick={() => setSortGoodBad("goodToBad")}
          >
            Top<span>&#10140;</span>
          </div>
          <div
            className="btn-sort"
            id="badToGood"
            onClick={() => setSortGoodBad("badToGood")}
          >
            Flop<span>&#10140;</span>
          </div>
        </div>
      </div>
      <div className="result">
        {moviesData.length > 0 ? (
          moviesData
            .slice(0, 12)
            .sort((a, b) => {
              if (sortGoodBad === "goodToBad") {
                return b.vote_average - a.vote_average;
              } else if (sortGoodBad === "badToGood") {
                return a.vote_average - b.vote_average;
              }
              return null;
            })
            .map((movie) => <Card key={movie.id} movie={movie} />)
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Form;
