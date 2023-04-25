import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loading from "~/admin/component/Loading/Loading";
import InputForm from "~/admin/modules/category/component/InputForm/InputForm";
import {
  getASlider,
  resetUpdateSlider,
  setSingleSlider,
  updateSlider,
} from "~/redux/slice/slider/SliderSlice";
import "./SingleSlider.scss";
function SingleSlider() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { sliderSingle, sliderUpdate, isLoading, isLoadingUpdate } =
    useSelector((state) => state.slider);
  useEffect(() => {
    dispatch(getASlider(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (isLoadingUpdate === false && JSON.stringify(sliderUpdate) !== "{}") {
      toast.success(`Cập nhật Slider ${id} thành công`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(resetUpdateSlider());
      setTimeout(() => navigate("/admin/slider"), 5000);
    }
  }, [sliderUpdate, navigate, isLoadingUpdate, id, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    function getFormData(object) {
      const formData = new FormData();
      Object.keys(object).forEach((key) => {
        formData.append(key, object[key]);
      });
      return formData;
    }

    const data = getFormData(sliderSingle);
    dispatch(updateSlider({ data, id }));
  };
  return isLoading ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit}>
      <ToastContainer />
      <div className="SliderContainer">
        <div className="SliderContainer__top">
          <NavLink to="/admin/slider">Slider / </NavLink>
          <span>Slider {id}</span>
        </div>
        <div className="SliderContainer__container">
          <div className="content">
            <InputForm
              label="Name"
              name="name"
              type="text"
              onChange={(e) =>
                dispatch(
                  setSingleSlider({
                    ...sliderSingle,
                    name: e.target.value,
                  })
                )
              }
              value={sliderSingle.name}
              classNameContent="content__input"
            />
            <div className="content__img">
              <input
                label="img"
                type="file"
                name="image"
                onChange={(e) => {
                  const reader = new FileReader();
                  reader.onload = () => {
                    dispatch(
                      setSingleSlider({
                        ...sliderSingle,
                        image: reader.result,
                      })
                    );
                  };
                  reader.readAsDataURL(e.target.files[0]);
                }}
              />

              {sliderSingle.image && <img src={sliderSingle.image} alt="" />}
            </div>

            <InputForm
              label="Active"
              type="checkbox"
              name="active"
              onChange={(e) =>
                dispatch(
                  setSingleSlider({
                    ...sliderSingle,
                    active: e.target.checked ? 1 : 0,
                  })
                )
              }
              checked={sliderSingle.active === 1 ? true : false}
              className="content__input--checkbox"
              classNameContent="content__checkbox"
            />
          </div>
          <div className="bottom">
            <button type="submit" className="bottom--btn btn-save">
              save change
            </button>
            <input type="reset" value="Reset" className="bottom--btn " />
          </div>
        </div>
      </div>
    </form>
  );
}

export default SingleSlider;
