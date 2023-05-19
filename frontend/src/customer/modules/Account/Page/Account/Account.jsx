import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import TabTitle from "~/components/tabtiltle/TabTiltle";
import { getAUser } from "~/redux/slice/user/UserSlice";
import "./Account.scss";
import SideBar from "../../component/SideBar/SideBar";
import {
  setOpenModal,
  setUser,
  setValueCurrentPassword,
} from "~/redux/slice/auth/AuthSlice";
import Loading from "~/admin/component/Loading/Loading";
import Login from "~/customer/modules/Auth/page/login/Login";

function Account() {
  TabTitle("Tài khoản của tôi");
  const dispatch = useDispatch();
  const { userProfile: profile, isLoading } = useSelector(
    (state) => state.user
  );
  const { isOpenModal, user, token, current_password } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(setUser({}));
    dispatch(getAUser());
  }, [dispatch]);

  const handleCurrenPassword = (e) => {
    console.log(e.target.value);
    dispatch(setValueCurrentPassword(e.target.value));
  };
  const handlePasswordChange = (e) => {
    dispatch(setUser({ ...user, new_password: e.target.value }));
  };

  const handleConfirmPasswordChange = (e) => {
    dispatch(setUser({ ...user, confirm_new_password: e.target.value }));
  };

  const handleSavePassword = () => {
    if (user.new_password !== user.confirm_new_password) {
      alert("Passwords do not match");
    } else {
      // Xử lý lưu mật khẩu tại đây
      alert("Password saved successfully");
      dispatch(setOpenModal(false));
    }
  };

  console.log("úuer", user);
  const Modal = () => {
    return (
      <form className="modal" onSubmit={handleSavePassword}>
        <div className="modal-content">
          <input
            type="text"
            className="sr-only"
            value={user?.username}
            autoComplete="username"
            aria-hidden="true"
            readOnly
          />
          <div className="modal-header">
            <h2>Change Password</h2>
            <span
              className="close"
              onClick={(e) => dispatch(setOpenModal(false))}
            >
              &times;
            </span>
          </div>
          <div className="modal-body">
            <input
              type="password"
              value={current_password}
              onChange={handleCurrenPassword}
              autoComplete="current-password"
              placeholder="Current Password"
              required={true}
            />
            <input
              type="password"
              value={user?.new_password}
              onChange={handlePasswordChange}
              autoComplete="new-password"
              placeholder="New Password"
              required={true}
            />
            <input
              type="password"
              value={user?.confirm_new_password}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm Password"
              autoComplete="new-password"
              required={true}
            />
          </div>
          <div className="modal-footer">
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    );
  };
  const User = () => {
    return isLoading ? (
      <Loading />
    ) : (
      <div className="AccountContainer">
        {isOpenModal ? <Modal /> : ""}
        <div className="AccountContainer__left">
          <SideBar />
        </div>
        <div className="AccountContainer__right">
          <div className="item">
            <div className="item__top">
              <NavLink to={`/profile/editprofile`}>
                <div className="item__top--btn">Edit</div>
              </NavLink>
            </div>
            <div className="item__content">
              <div className="item__content--avatar">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5jdCRwv_UItyMFSKNJSxp6f6lgMi1DRz3LV3neY8t6A&s"
                  alt=""
                />
              </div>
              <div className="item__content--detail">
                <h1 className="itemTitle">{profile?.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{profile?.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">
                    {profile?.phone ? profile?.phone : "-----------"}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    {profile?.address ? profile?.address : "--------"}
                  </span>
                </div>
              </div>
              <div className="detailItem">
                <button
                  className="itemKey"
                  onClick={(e) => dispatch(setOpenModal(true))}
                >
                  Change PassWord:
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return token ? <User /> : <Login />;
}

export default Account;
