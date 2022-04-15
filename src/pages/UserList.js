import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import Loading from "../components/Loading";

const UserList = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    let moviesId = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];

    for (let i = 0; i < moviesId.length; i++) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${moviesId[i]}?api_key=e0026bdb43933e1d07ddc751057c1a99&language=fr-FR&external_source=imdb_id`
        )
        .then((res) => setListData((listData) => [...listData, res.data]));
    }
  }, []);

  return (
    <div className="user-list-page">
      <Header />
      <div className="result">
        {listData.length > 0 ? (
          listData.map((movie) => <Card key={movie.id} movie={movie} />)
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default UserList;
