import React from "react";
import { useSelector } from "react-redux";
import { FormatNumber } from "~/customer/modules/Home/component/products/component/Price/Price";

function TotalMoney() {
  const { discount } = useSelector((state) => state.discount);
  const { orderNew } = useSelector((state) => state.order);

  return (
    <div className="sidebar-content">
      <table className="product-table">
        <tbody>
          <tr className="productItem__total">
            <td className="total-line-name">Tạm tính</td>
            <td className="total-line-price">
              <div>
                <FormatNumber price={orderNew.price_product} />
              </div>
            </td>
          </tr>

          <tr className="productItem__total">
            <td className="total-line-name">Phí vận chuyển</td>
            <td className="total-line-price">
              <div>
                <FormatNumber price={30000} />
              </div>
            </td>
          </tr>
          <tr className="productItem__total">
            <td className="total-line-name">Discount</td>
            <td className="total-line-price">
              <div>
                <FormatNumber price={discount} />
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr className="productItem__total">
            <td>
              <strong>Tổng cộng:</strong>
            </td>
            <td className="total-line-price">
              <strong
                style={{
                  fontSize: "1.6rem",
                }}
              >
                <FormatNumber
                  price={
                    orderNew.price_product - discount > 0
                      ? orderNew.price_product - discount + 30000
                      : 30000
                  }
                />
              </strong>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default TotalMoney;
