import React from "react";
import { Price } from "~/customer/modules/Home/component/products/component/Price/Price";

const Product = ({ listCart }) => {
  return listCart?.map((item, index) => (
    <div className="sidebar-content" key={index}>
      <table className="product-table">
        <tbody>
          <tr className="productItem">
            <td className="productItem__thumbnail">
              <img
                src={item.images[1]}
                alt=""
                className="productItem__thumbnail--image"
              />
              <div className="productItem__thumbnail--quantity">
                {item.cartNum}
              </div>
            </td>
            <td className="productItem__descriptions">
              <div className="productItem__description">
                <div className="productItem__description--name">
                  {item.name}
                </div>
                <div className="productItem__description--price">
                  <Price price={item.price} price_sale={item.price_sale} />
                </div>
              </div>
            </td>
            <td className="productItem__price">
              <div className="productItem__price--des">
                <Price
                  price={item.price * item.cartNum}
                  price_sale={item.price_sale * item.cartNum}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ));
};

export default Product;
