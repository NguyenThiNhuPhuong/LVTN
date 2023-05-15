import React from "react";

function Discount({ ListDiscountValid }) {
  const copyText = (code) => {
    return navigator.clipboard.writeText(`${code}`);
  };
  return (
    <div className="sidebar-content">
      <div className="coupon">
        <h4>Một số Discount gợi ý cho bạn:</h4>
        <div className="listCoupon">
          {ListDiscountValid.map((discount, index) => {
            return (
              <div
                type="button"
                className="couponItem"
                key={index}
                onClick={() => copyText(discount.code)}
              >
                {discount.code}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Discount;
