import React from "react";

function Product({ data }) {
  return (
    <section>
      <div className="product--container">
        <ul className="products">
          {data.map((el) => {
            let title = el.title.replace(/\<b>/g, "");
            title = title.replace(/\<\/b>/g, "");
            let dotTilte = title.slice(0, 12) + " ...";
            return (
              <a href={el.link} key={el.productId}>
                <li className="product--list" title={title}>
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
  );
}

export default Product;
