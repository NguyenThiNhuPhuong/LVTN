import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import {
  newCategory,
  resetNewCategory,
} from "~/redux/slice/category/CategorySlice";
import "./NewCategory.scss";

function NewCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryNew } = useSelector((state) => state.category);

  useEffect(() => {
    if (JSON.stringify(categoryNew) !== "{}") {
      Swal.fire({
        title: `Bạn đã thêm  thành công category  !`,
        width: 600,
        padding: "5em 3em",
        color: "#716add",
        background:
          "#fff url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQjEMu40wWChZR02Px-9nGcm_YYCrMoT_-723jlpkdTq3p_Y-FZbpDwT25HRiCOzqeCH0&usqp=CAU)",
        backdrop: `
                  rgba(0,0,123,0.4)
                  url("https://sweetalert2.github.io/images/nyan-cat.gif")
                  left top
                  no-repeat
                `,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Saved!", "", "success");
          dispatch(resetNewCategory());
          navigate("/admin/category");
        }
      });
    }
  }, [navigate, categoryNew, dispatch]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    onSubmit: async (values) => {
      dispatch(newCategory(values));
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng điền vào trường này"),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="CategoryContainer">
        <div className="CategoryContainer__top">
          <NavLink to="/admin/category">Category / </NavLink>
          <span>New Category</span>
        </div>
        <div className="CategoryContainer__container">
          <div className="content">
            <div className="content__input">
              <input
                type="text"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              <label>Name</label>
              {formik.errors.name && formik.touched.name && (
                <p>{formik.errors.name}</p>
              )}
            </div>
            <div className="content__input">
              <input
                type="text"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                className="content__input--des"
              />
              <label>Description</label>
              {formik.errors.description && formik.touched.description && (
                <p>{formik.errors.description}</p>
              )}
            </div>
          </div>
          <div className="bottom">
            <button type="submit" className="bottom--btn btn-save">
              save change
            </button>
            <button
              type="reset"
              onClick={(e) => formik.resetForm()}
              className="bottom--btn "
            >
              reset
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default NewCategory;
