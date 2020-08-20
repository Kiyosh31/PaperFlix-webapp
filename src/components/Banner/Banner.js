import React, { useState, useEffect } from "react";
import axios from "axios";
import requests from "../../Requests";
import "./Banner.css";

import Background from "../../assets/img/bojack.jpg";

const Banner = () => {
  const [paper, setPaper] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTrendings);
      setPaper(
        request.data[Math.floor(Math.random() * request.data.length - 1)]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header className="banner">
      <div className="banner__contents">
        <h1 className="banner__title">{paper?.title}</h1>
        <div className="banner__button_container">
          <button className="banner__button">Leer</button>
          <button className="banner__button">Mi lista</button>
        </div>
        <h1 className="banner__descriptions">
          {truncate(paper?.description, 150)}
        </h1>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  );
};

export default Banner;
