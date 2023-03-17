import React from "react";
import "./Discount.scss";
import Modal from "react-modal";
import { useSelector } from "react-redux";
function Discount() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const listDiscount = useSelector((state) => state.discount.discountList);

  const copyText = (code) => {
    return navigator.clipboard.writeText(`${code}`);
  };

  return (
    <div className="coupon">
      {listDiscount?.map((discount, index) => {
        return (
          <div key={index}>
            <div className="couponItem">
              <div className="couponItem__head">
                <h3 className="couponItem__head--title">
                  NHẬP MÃ: {discount.code}
                </h3>
                <div className="couponItem__head--desc">
                  - {discount.content}{" "}
                </div>
              </div>
              <div className="couponItem__bottom">
                <button
                  className="couponItem__bottom--copy"
                  data-ega-coupon="{code}"
                  onClick={() => copyText(discount.code)}
                >
                  <span>Sao chép mã</span>
                </button>
                <span
                  className="couponItem__bottom--toggle"
                  onClick={() => setIsOpen(true)}
                >
                  Điều kiện
                </span>
              </div>
            </div>

            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setIsOpen(false)}
              className="couponInfo"
            >
              <h3 className="couponInfo__title--header">
                NHẬP MÃ: {discount.code}
              </h3>
              <div className="couponInfo__title--center">
                <h3>Mã khuyến mãi: {discount.code}</h3>- {discount.content}
                <br />- Mã khuyễn mãi không áp dụng với các sản phẩm collab.{" "}
              </div>

              <div className="couponInfo__btn">
                <button onClick={() => setIsOpen(false)}>Đóng</button>
                <button onClick={copyText(discount.code)}>Sao chép mã </button>
              </div>
            </Modal>
          </div>
        );
      })}
    </div>
  );
}
export default Discount;
