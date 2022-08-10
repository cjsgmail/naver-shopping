import "./App.css";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [item, setItem] = useState("모자");
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
  }, [item]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setItem(e.target.title.value);
  };

  return (
    <div className="main">
      <header>
        <h1>Naver Shop Search</h1>
      </header>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          placeholder="제품명"
          name="title"
          className="search--product"
        ></input>
        <button type="submit" className="search--button">
          search
        </button>
      </form>
      <section>
        <div className="product--container">
          <ul className="products">
            {data.map((el) => {
              let title = el.title.replace(/\<b>/g, "");
              title = title.replace(/\<\/b>/g, "");
              let dotTilte = title.slice(0, 12) + " ...";
              return (
                <a href={el.link} key={el.productId}>
                  <li className="product--list">
                    <div className="product--img--container">
                      <img src={el.image} className="product--img"></img>
                    </div>
                    <div className="product--name">{dotTilte}</div>
                  </li>
                </a>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default App;
