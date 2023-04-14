import { Image } from "cloudinary-react";
import { useSelector } from "react-redux";
import { Price } from "~/customer/modules/Home/component/products/component/Price/Price";
import "./ProductItem.scss";

function ProductItem() {
  const cart = useSelector((state) => state.cart.listCart);

  return (
    <>
      {cart?.map((item, index) => (
        <div className="product__row table__section" key={index}>
          <div className="product__row--image">
            <Image
              cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
              publicId={item.images[0]}
            />
          </div>
          <div className="product__row--product">{item.name}</div>
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
      ))}
    </>
  );
}

export default ProductItem;
