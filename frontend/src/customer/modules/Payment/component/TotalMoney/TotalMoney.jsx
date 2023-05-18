import React from "react";
import { useSelector } from "react-redux";
import { FormatNumber } from "~/customer/modules/Home/component/products/component/Price/Price";

function TotalMoney() {
  const { priceCart, priceShip } = useSelector((state) => state.cart);
  const { discount } = useSelector((state) => state.discount);
  return (
    <div className="sidebar-content">
      <table className="product-table">
        <tbody>
          <tr className="productItem__total">
            <td className="total-line-name">Tạm tính</td>
            <td className="total-line-price">
              <div>
                <FormatNumber price={priceCart} />
              </div>
            </td>
          </tr>

          <tr className="productItem__total">
            <td className="total-line-name">Phí vận chuyển</td>
            <td className="total-line-price">
              <div>
                <FormatNumber price={priceShip} />
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
                <FormatNumber price={priceCart + priceShip - discount} />
              </strong>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default TotalMoney;
