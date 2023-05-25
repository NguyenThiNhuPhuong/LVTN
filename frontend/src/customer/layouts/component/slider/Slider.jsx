import { useSelector } from "react-redux";
import "./slick.scss";
import { Skeleton } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Slide() {
  const { sliderList } = useSelector((state) => state.slider);
  const { isLoading } = useSelector((state) => state.slider);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return isLoading ? (
    <Skeleton height={400} sx={{ mt: "-70px" }} />
  ) : (
    <div className="slider-container">
      <Slider {...settings}>
        {sliderList?.map((slider) => {
          return <img src={slider.image} alt="" key={slider.id} />;
        })}
      </Slider>
    </div>
  );
}
export default Slide;
