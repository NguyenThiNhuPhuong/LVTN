import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import { NavLink } from "react-router-dom";
import { PhoneOutlined } from "@ant-design/icons";
const cx = classNames.bind(styles);

function Footer() {
  return (
    <div className={cx("footer")}>
      <div className={cx("header")}>
        <div className={cx("header--content")}>
          <PhoneOutlined className={cx("header--icon")} />
          <span className={cx("header--title")}>Hỗ trợ/ Mua hàng:</span>
          <a href="tel:0343803696" className={cx("header--tel")}>
            0343803696
          </a>
        </div>
      </div>

      <div className={cx("container-fluid")}>
        <div className={cx("footer-col", "footer-content1")}>
          <h4 className={cx("footer-title")}>Giới thiệu</h4>
          <div className={cx("footer-content")}>
            <div className={cx("logo-footer")}>
              <a href="/" target="_blank">
                <img
                  src="https://file.hstatic.net/1000300454/file/logo_bct_019590229b4c4dfda690236b67f7aff4.png"
                  alt="Bộ Công Thương"
                />
              </a>
              <div className={cx("footer-content-title")}>
                <ul>Chi Nhánh Hồ Chí Minh</ul>

                <li className={cx("footer-content-item")}>
                  - Quận 10 - 561 Sư Vạn Hạnh, Phường 13.
                </li>
                <li className={cx("footer-content-item")}>
                  - Quận Tân Bình - 136 Nguyễn Hồng Đào, Phường 14. Quận 1
                </li>

                <li className={cx("footer-content-item")}>
                  - Central Market 4 Phạm Ngũ Lão, Phường Phạm Ngũ Lão.
                </li>
                <li className={cx("footer-content-item")}>
                  - Quận Gò Vấp - 41 Quang Trung, Phường 3.
                </li>
              </div>
            </div>
          </div>
        </div>

        <div className={cx("footer-col", "footer-content2")}>
          <h4 className={cx("footer-title")}>Liên kết</h4>
          <div className={cx("footer-content", "toggle-footer")}>
            <ul>
              <li>
                <NavLink className={cx("item")} to="/about">
                  Giới thiệu
                </NavLink>
              </li>
              <li>
                <NavLink className={cx("item")} to="/about/returnPolicy">
                  Chính sách đổi trả
                </NavLink>
              </li>

              <li>
                <NavLink className={cx("item")} to="/about/privacyPolicy">
                  Chính sách bảo mật
                </NavLink>
              </li>

              <li>
                <NavLink className={cx("item")} to="/about/termsService">
                  Điều khoản dịch vụ
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className={cx("footer-col", "footer-content3")}>
          <h4 className={cx("footer-title")}>Thông tin liên hệ</h4>
          <div className={cx("footer-content footer-contact")}>
            <ul>
              <li className={cx("contact-1")}>TP.HCM</li>
              <li className={cx("contact-2")}>
                <a href="tel:0343803696">0343803696</a>
              </li>
              <li className={cx("contact-3")}>coming soon</li>
              <li className={cx("contact-4")}>
                <a href="mailto:phanthingocanh2001.ptna@gmail.com">
                  phanthingocanh2001.ptna@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={cx("footer-col", "footer-content4")}>
          <h4 className={cx("footer-title")}>Địa chỉ trên gg map</h4>
          <div className={cx("footer-content footer-contact")}>
            <iframe
              title="gg map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15672.929867181434!2d106.61615137036135!3d10.869915500000745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752a086747c709%3A0xc52ebc55a579f3fc!2zQ8O0bmcgVHkgVE5ISCBUw6JuIEhvw6BuZyBHaWE!5e0!3m2!1svi!2s!4v1680148641074!5m2!1svi!2s"
              width="300px"
              height="200px"
              loading="lazy"
              style={{ border: "none" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
