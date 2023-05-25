import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import InputForm from "~/admin/modules/category/component/InputForm/InputForm";
import {
  newSlider,
  resetNewSlider,
  setSingleSlider,
} from "~/redux/slice/slider/SliderSlice";
import "./NewSlider.scss";
function NewSlider() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { sliderSingle, sliderNew } = useSelector((state) => state.slider);
  useEffect(() => {
    if (JSON.stringify(sliderNew) !== "{}") {
      toast.success(`Bạn đã tạo mới Slider thành công`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(resetNewSlider());
      setTimeout(() => navigate("/admin/slider"), 5000);
    }
  }, [dispatch, navigate, sliderNew]);

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
    dispatch(newSlider(data));
  };
  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer />
      <div className="SliderContainer">
        <div className="SliderContainer__top">
          <NavLink to="/admin/slider">Backs to Slider </NavLink>
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
              value={sliderSingle?.name}
              classNameContent="content__input"
            />
            <div className="content__img">
              <input
                label="img"
                type="file"
                name="image"
                onChange={(e) => {
                  dispatch(
                    setSingleSlider({
                      ...sliderSingle,
                      file: e.target.files[0],
                    })
                  );
                }}
              />

              {sliderSingle.file && (
                <img src={URL.createObjectURL(sliderSingle.file)} alt="" />
              )}
            </div>
          </div>
          <div className="bottom">
            <button type="submit" className="bottom--btn btn-save">
              save change
            </button>
            <input
              type="reset"
              value="Reset"
              className="bottom--btn "
              onClick={() => dispatch(resetNewSlider())}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default NewSlider;
