import { useSelector } from "react-redux";
import { Price } from "~/customer/modules/Home/component/products/component/Price/Price";
import "./ProductItem.scss";

const ProductItem = () => {
  const { orderSingle } = useSelector((state) => state.order);
  console.log(orderSingle.cart);
  return orderSingle?.cart?.map((item, index) => {
    return (
      <div className="product__row table__section" key={index}>
        <div className="product__row--image">
          <img src={item.images[0]} alt="" />
        </div>
        <div className="product__row--product">{item.product_name}</div>
        <div className="product__row--price">
          <Price price={item.price} price_sale={item.price_sale} />
        </div>
        <div className="product__row--amount">
          <span>{item.cartNum}</span>
        </div>
        <div className="product__row--total">
          <Price
            price={item.price * item.cartNum}
            price_sale={item.price_sale * item.cartNum}
          />
        </div>
      </div>
    );
  });
};

export default ProductItem;
