import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Loading from "~/admin/component/Loading/Loading";
import { addFile, clearFiles } from "~/redux/slice/file/FileSlice";
import {
  getAUser,
  getUserProfile,
  resetUpdateUser,
  setUpdateUser,
  updateUser,
} from "~/redux/slice/user/UserSlice";
import InputUser from "../../component/InputUser/InputUser";
import { MenuSelect, MenuUserEdit } from "../../component/Menu";

function SingleUser() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userUpdate, singleUser, isLoading } = useSelector(
    (state) => state.user
  );
  const { fileList } = useSelector((state) => state.file);

  useEffect(() => {
    dispatch(getAUser(id));
  }, [dispatch, id]);
  //-------------call api update success
  useEffect(() => {
    if (Object.keys(userUpdate).length !== 0) {
      toast.success("Bạn đã cập nhật thành công", {
        position: toast.POSITION.TOP_RIGHT,
      });

      setTimeout(() => {
        dispatch(resetUpdateUser());
        navigate("/admin/user");
        dispatch(getUserProfile());
      }, 5000);
    }
  }, [dispatch, navigate, userUpdate]);
  //change data =>form data
  function getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach((key) => {
      formData.append(key, object[key]);
    });
    fileList.forEach((file) => {
      formData.append(`file`, file);
    });
    return formData;
  }
  //----------handel Submit
  const handelSubmit = (e) => {
    e.preventDefault();

    const data = getFormData({
      name: singleUser.name,
      phone: singleUser.phone,
      email: singleUser.email,
      type: singleUser.type,
      _method: "PUT",
    });
    dispatch(updateUser({ data, id }));
  };
  //---------------handel input ,menu
  const handelInput = (e, name) => {
    dispatch(
      setUpdateUser({
        ...singleUser,
        [name]: e.target.value,
      })
    );
  };
  const handelMenu = (e) => {
    dispatch(
      setUpdateUser({
        ...singleUser,
        type: e.target.value,
      })
    );
  };
  return isLoading ? (
    <Loading />
  ) : (
    <form onSubmit={(e) => handelSubmit(e)}>
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
                  fileList[0]
                    ? URL.createObjectURL(fileList[0])
                    : singleUser.avatar
                    ? singleUser.avatar
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
                    onChange={(e) => {
                      dispatch(clearFiles());
                      dispatch(addFile(e.target.files[0]));
                    }}
                  />
                </div>
                <div className="header__content--btn btn-reset">
                  <button type="button" onClick={() => dispatch(clearFiles())}>
                    RESET
                  </button>
                </div>
              </div>
              <div className="header__content-bottom">
                <span>Allowed PNG or JPEG. Max size of 800K.</span>
              </div>
            </div>
          </div>
          <div className="content">
            {MenuUserEdit.map((item) => {
              return (
                <InputUser
                  name={item.name}
                  value={singleUser ? singleUser[item?.name] : ""}
                  onChange={(e) => handelInput(e, item.name)}
                  label={item.label}
                />
              );
            })}

            <div className="sidebar__container">
              {MenuSelect.map((item) => {
                return (
                  <div key={item.value}>
                    <input
                      type="radio"
                      id={item.label}
                      name="type"
                      onChange={(e) => handelMenu(e)}
                      value={item.value}
                      checked={singleUser.type == item.value}
                    />
                    <label htmlFor={item.label}>{item.label}</label>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bottom">
            <button type="submit" className="bottom--btn btn-save">
              save change
            </button>
            <button type="button" className="bottom--btn btn-reset">
              reset
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SingleUser;
