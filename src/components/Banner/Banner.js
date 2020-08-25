import React, { useState, useEffect } from "react";
import "./Banner.css";

import instance from "axios-instance";

const Banner = (props) => {
  const [paper, setPaper] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await instance.get("paper-list/");
      setPaper(
        request.data[
          request.data.length > 1
            ? Math.floor(Math.random() * request.data.length - 1)
            : 0
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div className="banner">
      <div className="banner__contents">
        <h1 className="banner__title">{paper?.title}</h1>
        <div className="banner__button_container">
          <button className="banner__button" onClick={props.openModal}>
            Leer
          </button>
          <button className="banner__button">Mi lista</button>
        </div>
        <h1 className="banner__descriptions">
          {truncate(paper?.description, 150)}
        </h1>
      </div>
      <div className="banner__fadeBottom" />
    </div>
  );
};

export default Banner;
