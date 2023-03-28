import TabTitle from "~/components/tabtiltle/TabTiltle";
import LinkAbout from "../../component/linkabout/LinkAbout";
import "../../component/About.scss";
function About() {
  TabTitle("About");
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
              Chúng mình xuất hiện để đem tới mọi người một chất lượng áo tốt
              nhất, với giá thành hấp dẫn nhất để đưa Bag Girl đến với tất cả
              lứa tuổi và khắp mọi vùng miền đất nước
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
