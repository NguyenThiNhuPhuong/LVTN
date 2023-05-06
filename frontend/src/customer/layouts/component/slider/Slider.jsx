import { useSelector } from "react-redux";
import "./slick.scss";
import { Skeleton } from "@mui/material";

function Slide(props) {
  const sliderList = useSelector((state) => state.slider.sliderList);
  const LoadingSlider = useSelector((state) => state.slider.isLoading);
  return LoadingSlider ? (
    <Skeleton height={400} sx={{ mt: "-70px" }} />
  ) : (
    <div className="slider-container">
      <div id="banner">
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
      </div>
    </div>
  );
}
export default Slide;
