import { Image } from "cloudinary-react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "./slick.scss";
import "./slick-theme.css";

function Slide(props) {
  const sliderList = useSelector((state) => state.slider.sliderList);
  console.log(sliderList);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="slider-container">
      <div
        id="banner"
        // style={{ backgroundImage: `url(${sliderList[0]?.image})` }}
      >
        <div className="box-left">
          <h2>
            <span>ĐI CÓ ĐÔI</span>
            <br />
            <span>VỀ CÓ CẶP</span>
          </h2>
          <p>
            Chuyên cung cấp các mẫu balo , túi xách dinh dưỡng hợp vệ sinh đến
            người dùng,phục vụ người dùng 1 cái hoàn hảo nhất
          </p>
          <button>Mua ngay</button>
        </div>
        <div className="box-right">
          {sliderList.map((slider, index) => {
            return <img src={slider?.image} alt="" key={index} />;
          })}
        </div>
        <div className="to-bottom">
          <a href="">{/* <img src="assets/to_bottom.png" alt="" /> */}</a>
        </div>
      </div>

      {/* <Slider {...settings}>
        {slideList?.map((slider, index) => {
          return (
            <Image
              className="slider-container__img"
              key={index}
              cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
              publicId={slider.image}
            />
          );
        })}
      </Slider> */}
    </div>
  );
}
export default Slide;
