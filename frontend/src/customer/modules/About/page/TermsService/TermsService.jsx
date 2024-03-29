import TabTitle from "~/components/tabtiltle/TabTiltle";
import LinkAbout from "../../component/linkabout/LinkAbout";
import "../../component/About.scss";
function TermsService() {
  TabTitle("TermsService()");
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
            <div className="content-page ">
              <p>
                <span className="wysiwyg-font-size-medium">
                  <strong>1. Giới thiệu</strong>
                </span>
              </p>
              <p>
                <span className="wysiwyg-font-size-medium">
                  Chào mừng quý khách hàng đến với website chúng tôi.
                </span>
              </p>
              <p>
                Khi quý khách hàng truy cập vào trang website của chúng tôi có
                nghĩa là quý khách đồng ý với các điều khoản này. Trang web có
                quyền thay đổi, chỉnh sửa, thêm hoặc lược bỏ bất kỳ phần nào
                trong Điều khoản mua bán hàng hóa này, vào bất cứ lúc nào. Các
                thay đổi có hiệu lực ngay khi được đăng trên trang web mà không
                cần thông báo trước. Và khi quý khách tiếp tục sử dụng trang
                web, sau khi các thay đổi về Điều khoản này được đăng tải, có
                nghĩa là quý khách chấp nhận với những thay đổi đó.
              </p>
              <p>
                Quý khách hàng vui lòng kiểm tra thường xuyên để cập nhật những
                thay đổi của chúng tôi.
              </p>
              <p>
                <strong>2. Hướng dẫn sử dụng website</strong>
              </p>
              <p>
                Khi vào web của chúng tôi, khách hàng phải đảm bảo đủ 18 tuổi,
                hoặc truy cập dưới sự giám sát của cha mẹ hay người giám hộ hợp
                pháp. Khách hàng đảm bảo có đầy đủ hành vi dân sự để thực hiện
                các giao dịch mua bán hàng hóa theo quy định hiện hành của pháp
                luật Việt Nam.
              </p>
              <p>
                Trong suốt quá trình đăng ký, quý khách đồng ý nhận email quảng
                cáo từ website. Nếu không muốn tiếp tục nhận mail, quý khách có
                thể từ chối bằng cách nhấp vào đường link ở dưới cùng trong mọi
                email quảng cáo.
                <strong></strong>
                <strong></strong>
                <strong></strong>
              </p>
              <p>
                <br />
              </p>
              <p>
                <strong>3. Thanh toán an toàn và tiện lợi</strong>
              </p>
              <p>
                Người mua có thể tham khảo các phương thức thanh toán sau đây và
                lựa chọn áp dụng phương thức phù hợp:
              </p>
              <p>
                <strong>
                  <u>Cách 1</u>
                </strong>
                : Thanh toán trực tiếp (người mua nhận hàng tại địa chỉ người
                bán)
                <br />
                <strong>
                  <u>Cách 2</u>
                </strong>
                <strong>:</strong>&nbsp;Thanh toán sau (COD – giao hàng và thu
                tiền tận nơi)
                <br />
                <strong>
                  <u>Cách 3</u>
                </strong>
                <strong>:</strong>&nbsp;Thanh toán online qua thẻ tín dụng,
                chuyển khoản
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsService;
