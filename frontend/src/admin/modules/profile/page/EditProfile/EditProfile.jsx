import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { addFile, removeFile } from "~/redux/slice/file/FileSlice";
import {
  getAUser,
  resetUpdateUser,
  updateUser,
} from "~/redux/slice/user/UserSlice";

function EditProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userUpdate, singleUser } = useSelector((state) => state.user);
  const { fileList } = useSelector((state) => state.file);
  useEffect(() => {
    if (Object.keys(userUpdate).length !== 0) {
      toast.success(`Bạn đã tạo mới thành công `, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(resetUpdateUser());
      setTimeout(() => navigate("/admin/profile"), 3000);
    }
  }, [dispatch, navigate, userUpdate]);
  useEffect(() => {
    dispatch(getAUser(id));
  }, [dispatch, id]);
  const initialValues = singleUser
    ? {
        name: singleUser.name,
        email: singleUser.email,
        phone: singleUser.phone,
      }
    : {
        name: "",
        email: "",
        phone: "",
      };
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      console.log(values);
      const formData = new FormData();
      function getFormData(object) {
        Object.keys(object).forEach((key) => {
          formData.append(key, object[key]);
        });
        fileList.forEach((file, index) => {
          formData.append(`file`, file);
        });
        return formData;
      }

      const data = getFormData({ ...values, _method: "PUT", type: "1" });
      dispatch(updateUser({ data, id }));
      dispatch(removeFile());
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="ProfileContainer">
        <ToastContainer />

        <div className="ProfileContainer__top">
          <NavLink to="/admin/user">
            <CloseIcon />
          </NavLink>
        </div>
        <div className="ProfileContainer__container">
          <div className="header">
            <div className="header__img">
              <img
                alt="avatar"
                src={
                  singleUser.avatar
                    ? singleUser.avatar
                    : fileList[0]
                    ? URL.createObjectURL(fileList[0])
                    : "https://demos.themeselection.com/materio-mui-react-nextjs-admin-template-free/images/avatars/1.png"
                }
              />
            </div>
            <div className="header__content">
              <div className="header__content-top">
                <div className="header__content--btn btn-update">
                  <label htmlFor="fileInput">UPLOAD NEW PHOTO</label>
                  <input
                    id="fileInput"
                    type="file"
                    name="avatar"
                    onChange={(e) => dispatch(addFile(e.target.files[0]))}
                  />
                </div>
                <div className="header__content--btn btn-reset">
                  <span>RESET</span>
                </div>
              </div>
              <div className="header__content-bottom">
                <span>Allowed PNG or JPEG. Max size of 800K.</span>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="content__input">
              <input
                type="text"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              <label>Họ và tên</label>
              {formik.errors.name && formik.touched.name && (
                <p>{formik.errors.name}</p>
              )}
            </div>
            <div className="content__input">
              <input
                type="text"
                name="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
              <label>Số điện thoại</label>
              {formik.errors.phone && formik.touched.phone && (
                <p>{formik.errors.phone}</p>
              )}
            </div>
            <div className="content__input">
              <input
                type="text"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <label>Email</label>
              {formik.errors.email && formik.touched.email && (
                <p>{formik.errors.email}</p>
              )}
            </div>
          </div>

          <div className="bottom">
            <button type="submit" className="bottom--btn btn-save">
              save change
            </button>
            <button type="reset" className="bottom--btn btn-reset">
              reset
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default EditProfile;
