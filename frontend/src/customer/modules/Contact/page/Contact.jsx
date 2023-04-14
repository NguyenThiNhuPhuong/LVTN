import TabTitle from "~/components/tabtiltle/TabTiltle";
import "./Contact.scss";
function Contact() {
  TabTitle("Contact");

  return (
    <>
      <div className="contact-container">
        <div className="contact-container__heading">
          <h1>Giới thiệu</h1>
        </div>
        <div className="contact-container__content">
          <br />
          <h1> THÔNG TIN HỆ THỐNG CỬA HÀNG GIRL BAG</h1>
          <br />
          <h2>HỆ THỐNG CỬA HÀNG</h2>
          <br />
          <div className="content__title">
            <h3>Chi Nhánh Hồ Chí Minh</h3>
            <br />
            <br />
            <ul>
              <li className="content__item">
                - Quận 10 - 561 Sư Vạn Hạnh, Phường 13.
              </li>
              <li className="content__item">
                - Quận Tân Bình - 136 Nguyễn Hồng Đào, Phường 14. Quận 1
              </li>

              <li className="content__item">
                - Central Market 4 Phạm Ngũ Lão, Phường Phạm Ngũ Lão.
              </li>
              <li className="content__item">
                - Quận Gò Vấp - 41 Quang Trung, Phường 3.
              </li>
            </ul>
          </div>
          <div className="content__bottom ">
            <ul>
              <li className="footer-contact contact-1">TP.HCM</li>
              <li className="footer-contact contact-2">0343803696</li>
              <li className="footer-contact contact-3">coming soon</li>
              <li className="footer-contact contact-4">
                girlbag.local@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
export default Contact;
