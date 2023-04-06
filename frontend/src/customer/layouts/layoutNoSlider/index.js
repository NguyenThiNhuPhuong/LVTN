import classNames from "classnames/bind";
import Footer from "../component/footer/Footer";
import Header from "../component/header/Header";
import styles from "./LayoutNoSlider.module.scss";
const cx = classNames.bind(styles);
function LayoutNoSlider({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default LayoutNoSlider;
