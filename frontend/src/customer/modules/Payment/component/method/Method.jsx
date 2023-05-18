import React from "react";

function Method() {
  return (
    <div className="section">
      <div className="section__header">
        <h2 className="section__title">Phương thức thanh toán</h2>
      </div>
      <div className="section__content">
        <div className="content__box">
          <div className="radio__wrapper content__box--row">
            <label className="radio__label">
              <div className="radio__input">
                <input className="radio__input--radio" type="radio" checked />
              </div>
              <div className="radio__content">
                <img
                  className="radio__content--img"
                  src="https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=1"
                  alt=""
                />
                <div>
                  <span className="radio__content--label  ">
                    Thanh toán khi giao hàng (COD)
                  </span>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Method;
