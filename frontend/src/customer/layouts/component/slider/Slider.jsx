import { Image } from "cloudinary-react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "./slick.scss";
import "./slick-theme.css";

function Slide(props) {
  const slideList = useSelector((state) => state.slider.sliderList);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
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
      </Slider>
    </div>
  );
}
export default Slide;
