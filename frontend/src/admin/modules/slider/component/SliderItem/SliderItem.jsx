import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getListSlider,
  removeSlider,
  resetRemoveSlider,
} from "~/redux/slice/slider/SliderSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import "./SliderItem.scss";
function SliderItem() {
  const dispatch = useDispatch();

  const { sliderList, alertDeleteSuccess } = useSelector(
    (state) => state.slider
  );
  console.log(sliderList);
  useEffect(() => {
    if (alertDeleteSuccess !== "") {
      Swal.fire("Saved!", "", "success");
      dispatch(getListSlider());
      return () => {
        dispatch(resetRemoveSlider());
      };
    }
  }, [dispatch, alertDeleteSuccess]);

  const handelRemoveSlider = async (id) => {
    const result = await Swal.fire({
      title: `Bạn có chắc chắn muốn xóa slider ${id}?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
      },
    });
    if (result.isConfirmed) {
      dispatch(removeSlider(id));
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  };

  return sliderList?.length > 0 ? (
    sliderList?.map((slider, index) => {
      return (
        <div className="slider__row" key={index}>
          <div className="slider__row--id text">{slider.id}</div>
          <div className="slider__row--img text">
            <img src={slider.image} alt="" />
          </div>
          <div className="slider__row--name text">{slider.name}</div>
          <div className="slider__row--createdAt text">
            {moment(slider.created_at).format("YYYY-MM-DD")}
          </div>
          <div className="slider__row--updateAt text">
            {moment(slider.updated_at).format("YYYY-MM-DD")}
          </div>
          <div className="slider__row--action text">
            <NavLink to={`/admin/slider/editSlider/${slider.id}`}>
              <VisibilityIcon />
            </NavLink>
            <button onClick={() => handelRemoveSlider(slider.id)}>
              <DeleteIcon />
            </button>
          </div>

          <div className="slider__row--active text">
            <section>
              <div className="input-wrap">
                <input
                  id="input-6"
                  type="checkbox"
                  onChange={() => {}}
                  checked={slider.active === 1 ? true : false}
                />
                <label htmlFor="input-6">Select</label>
              </div>
            </section>
          </div>
        </div>
      );
    })
  ) : (
    <div className="noSlider">Hiện tại không có Slider nào 😉 </div>
  );
}

export default SliderItem;
