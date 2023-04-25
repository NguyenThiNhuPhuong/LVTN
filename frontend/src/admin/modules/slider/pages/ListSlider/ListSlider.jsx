import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "~/admin/component/Loading/Loading";
import Top from "~/admin/layouts/component/top/Top";
import { getListSlider } from "~/redux/slice/slider/SliderSlice";
import SliderItem from "../../component/SliderItem/SliderItem";
import "./ListSlider.scss";
function ListSlider() {
  const { isLoading } = useSelector((state) => state.slider);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListSlider());
  }, [dispatch]);

  const Slider = () => {
    return (
      <div className="ListSliderContainer">
        <Top title="Danh sách người dùng" to="newSlider" />
        <div className="slider">
          <div className="slider__row slider__header-labels">
            <div className="text-center">ID</div>
            <div className="text-center">Hình ảnh </div>
            <div className="text-center">Name</div>
            <div className="text-center">Ngày tạo</div>
            <div className="text-center">Ngày Chỉnh sửa</div>
            <div className="text-center">Action</div>
            <div className="text-center">Active</div>
          </div>
          <SliderItem />
        </div>
      </div>
    );
  };

  return isLoading ? <Loading /> : <Slider />;
}

export default ListSlider;
