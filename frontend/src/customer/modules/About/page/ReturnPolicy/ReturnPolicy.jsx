import TabTitle from "~/components/tabtiltle/TabTiltle";
import LinkAbout from "../../component/linkabout/LinkAbout";
import "../../component/About.scss";
function ReturnPolicy() {
  TabTitle("ReturnPolicy");
  return (
    <div className="about">
      <div className="about__container">
        <div>
          <LinkAbout />
        </div>
        <div className="page-wrapper">
          <div className="page-wrapper__heading">
            <h1>Giới thiệu</h1>
          </div>
          <div className="page-wrapper__content">
            <p>
              <strong>1. Điều kiện đổi trả</strong>
            </p>
            <p>
              Quý Khách hàng cần kiểm tra tình trạng hàng hóa và có thể đổi
              hàng/ trả lại hàng&nbsp;ngay tại thời điểm giao/nhận
              hàng&nbsp;trong những trường hợp sau:
            </p>
            <ul>
              <li>
                Hàng không đúng chủng loại, mẫu mã trong đơn hàng đã đặt hoặc
                như trên website tại thời điểm đặt hàng.
              </li>
              <li>Không đủ số lượng, không đủ bộ như trong đơn hàng.</li>
              <li>
                Tình trạng bên ngoài bị ảnh hưởng như rách bao bì, bong tróc, bể
                vỡ…
              </li>
            </ul>
            <p>
              &nbsp;Khách hàng có trách nhiệm trình giấy tờ liên quan chứng minh
              sự thiếu sót trên để hoàn thành việc&nbsp;hoàn trả/đổi trả hàng
              hóa.&nbsp;
            </p>
            <p>
              <br />
            </p>
            <p>
              <strong>
                2. Quy định về thời gian thông báo và gửi sản phẩm đổi trả
              </strong>
            </p>
            <ul>
              <li>
                <strong>Thời gian thông báo đổi trả</strong>:&nbsp;trong vòng
                48h kể từ khi nhận sản phẩm đối với trường hợp sản phẩm thiếu
                phụ kiện, quà tặng hoặc bể vỡ.
              </li>
              <li>
                <strong>Thời gian gửi chuyển trả sản phẩm</strong>: trong vòng
                14 ngày kể từ khi nhận sản phẩm.
              </li>
              <li>
                <strong>Địa điểm đổi trả sản phẩm</strong>: Khách hàng có thể
                mang hàng trực tiếp đến văn phòng/ cửa hàng của chúng tôi hoặc
                chuyển qua đường bưu điện.
              </li>
            </ul>
            <p>
              Trong trường hợp Quý Khách hàng có ý kiến đóng góp/khiếu nại liên
              quan đến chất lượng sản phẩm, Quý Khách hàng vui lòng liên hệ
              đường dây chăm sóc khách hàng&nbsp;của chúng tôi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReturnPolicy;
