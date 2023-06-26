import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Loading from "~/admin/component/Loading/Loading";
import { addFile, removeFile } from "~/redux/slice/file/FileSlice";
import {
  getAUser,
  getUserProfile,
  resetUpdateUser,
  setUpdateUser,
  updateUser,
} from "~/redux/slice/user/UserSlice";
import { MenuUser, MenuUserEdit } from "~/admin/modules/users/component/Menu";
import InputUser from "~/admin/modules/users/component/InputUser/InputUser";
import SideBar from "../../component/SideBar/SideBar";
import "./EditAccount.scss";
import Address from "../../component/address/Address";
function EditAccount() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userUpdate, userProfile, isLoading, err } = useSelector(
    (state) => state.user
  );
  const { fileList } = useSelector((state) => state.file);

  useEffect(() => {
    dispatch(removeFile());
    dispatch(getUserProfile());
  }, [dispatch]);
  useEffect(() => {
    if (err !== "") {
      toast.error(`Bạn vui lòng đăng nhập lại`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => navigate("/login"), 5000);
    }
  }, [dispatch, err, navigate]);
  //-------------call api update success
  useEffect(() => {
    if (Object.keys(userUpdate).length !== 0) {
      toast.success("Bạn đã cập nhật thành công", {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(resetUpdateUser());
      setTimeout(() => navigate("/admin/user"), 5000);
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
      name: userProfile.name,
      phone: userProfile.phone,
      email: userProfile.email,
      type: userProfile.type,
      province_id: userProfile.province_id,
      district_id: userProfile.district_id,
      ward_id: userProfile.ward_id,
      address: userProfile.address,
      _method: "PUT",
    });
    dispatch(updateUser({ data, id }));
    dispatch(removeFile());
  };
  //---------------handel input ,menu
  const handelInput = (e, name) => {
    dispatch(
      setUpdateUser({
        ...userProfile,
        [name]: e.target.value,
      })
    );
  };

  return isLoading ? (
    <Loading />
  ) : (
    <form onSubmit={(e) => handelSubmit(e)}>
      <ToastContainer />
      <div className="EditAccountContainer">
        <div className="AccountContainer__left">
          <SideBar />
        </div>
        <div className="AccountContainer__right">
          <div className="ProfileContainer__container">
            <div className="header">
              <div className="header__img">
                <img
                  alt="avatar"
                  src={
                    fileList[0]
                      ? URL.createObjectURL(fileList[0])
                      : userProfile.avatar
                      ? userProfile.avatar
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
                    <button
                      type="button"
                      onClick={() => dispatch(removeFile())}
                    >
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
                    value={userProfile ? userProfile[item?.name] : ""}
                    onChange={(e) => handelInput(e, item.name)}
                    label={item.label}
                  />
                );
              })}
              <Address />
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
      </div>
    </form>
  );
}

export default EditAccount;
