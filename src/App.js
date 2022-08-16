import "./App.css";
import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Product from "./pages/Product";

function App() {
  const [data, setData] = useState([]);
  const [item, setItem] = useState("모자");

  const focusRef = useRef(null);

  const shoppingData = async () => {
    const URL = "/v1/search/shop.json";

    await axios
      .get(URL, {
        params: {
          query: item,
          display: 100,
        },
        headers: {
          "X-Naver-Client-Id": process.env.REACT_APP_ClientId,
          "X-Naver-Client-Secret": process.env.REACT_APP_ClientSecret,
        },
      })
      .then((res) => setData(res.data.items))
      .catch((e) => {});
  };

  useEffect(() => {
    shoppingData();
    focusRef.current.focus();
  }, [item]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setItem(e.target.title.value);
  };

  const handleOnClick = (e) => {
    setItem(e.target.textContent);
  };

  return (
    <div className="main">
      <header>
        <h1>Naver Shop Search</h1>
      </header>
      <form onSubmit={handleOnSubmit}>
        <input
          ref={focusRef}
          type="text"
          placeholder="제품명"
          name="title"
          className="search--product"
        ></input>
        <button type="submit" className="search--button">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
      <div className="main--container">
        <nav>
          <div className="nav--el" onClick={handleOnClick}>
            모자
          </div>
          <div className="nav--el" onClick={handleOnClick}>
            가방
          </div>
          <div className="nav--el" onClick={handleOnClick}>
            신발
          </div>
          <div className="nav--el" onClick={handleOnClick}>
            나이키
          </div>
          <div className="nav--el" onClick={handleOnClick}>
            아디다스
          </div>
        </nav>
        <Product data={data} />
      </div>
    </div>
  );
}

export default App;
