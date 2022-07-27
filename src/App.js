import "./App.css";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const shoppingData = async () => {
    const URL = "/v1/search/shop.json";
    const ClientID = "I42Rx7d9Ib8CuJ95K2aP";
    const ClientSecret = "PZ71hnBsJ7";

    await axios
      .get(URL, {
        params: {
          query: "모자",
          display: 20,
        },
        headers: {
          "X-Naver-Client-Id": ClientID,
          "X-Naver-Client-Secret": ClientSecret,
        },
      })
      .then((res) => setData(res.data.items))
      .catch((e) => {});
  };

  useEffect(() => {
    shoppingData();
  }, []);

  return <></>;
}

export default App;
