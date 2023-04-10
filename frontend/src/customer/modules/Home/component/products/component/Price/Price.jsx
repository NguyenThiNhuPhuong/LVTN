import React from "react";
import "./Price.scss";

export function FormatNumber({ price }) {
  return price?.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
}

export function Price(props) {
  const { price, price_sale } = props;

  return price_sale > 0 ? (
    <FormatNumber price={price_sale} />
  ) : (
    <FormatNumber price={price} />
  );
}

export default function AllPrice(props) {
  const { price, price_sale, color } = props;

  return (
    <div className="price">
      {price_sale > 0 ? (
        <>
          <span
            className="price__noSale"
            style={{ color: color ? color : "black" }}
          >
            <FormatNumber price={price_sale} />
          </span>
          <del className="price__sale">
            <FormatNumber price={price} />
          </del>
        </>
      ) : (
        <span
          className="price__noSale"
          style={{ color: color ? color : "black" }}
        >
          <FormatNumber price={price} />
        </span>
      )}
    </div>
  );
}
