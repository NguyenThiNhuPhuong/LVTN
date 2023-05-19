import { useSelector } from "react-redux";
import "./slick.scss";
import { Skeleton } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Slide() {
  const sliderList = useSelector((state) => state.slider.sliderList);
  const LoadingSlider = useSelector((state) => state.slider.isLoading);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return LoadingSlider ? (
    <Skeleton height={400} sx={{ mt: "-70px" }} />
  ) : (
    <div className="slider-container">
      <Slider {...settings}>
        {sliderList?.map((slider) => (
          <img src={slider.image} alt="" />
        ))}
      </Slider>
    </div>
  );
}
export default Slide;
