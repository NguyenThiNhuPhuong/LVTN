import React from "react";
import "./ButtonPriceSale.scss";

export default function ButtonPriceSale(props) {
  const { price, price_sale } = props;

  return price_sale > 0 ? (
    <span className="product__item--sale">
      {((price_sale / 1000) * 100) / (price / 1000) < 100 &&
      ((price_sale / 1000) * 100) / (price / 1000) > 0
        ? (100 - ((price_sale / 1000) * 100) / (price / 1000)).toFixed(0) + "%"
        : ""}
    </span>
  ) : (
    ""
  );
}
