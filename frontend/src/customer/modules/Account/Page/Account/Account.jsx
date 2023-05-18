import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import TabTitle from "~/components/tabtiltle/TabTiltle";
import { getAUser } from "~/redux/slice/user/UserSlice";
import "./Account.scss";
import SideBar from "../../component/SideBar/SideBar";
import { setOpenModal, setUser } from "~/redux/slice/auth/AuthSlice";

function Account() {
  TabTitle("Tài khoản của tôi");
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.userProfile);
  const { isOpenModal, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAUser());
  }, [dispatch]);

  const handleCurrenPassword = (e) => {
    dispatch(setUser({ ...user, current_password: e.target.value }));
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
              value={user?.current_password}
              id="changePasswordOldPassword"
              autoComplete="current-password"
              onChange={handleCurrenPassword}
              placeholder="Current Password"
            />
            <input
              type="password"
              value={user?.password}
              id="changePasswordNewPassword"
              autoComplete="new-password"
              onChange={() => handlePasswordChange}
              placeholder="New Password"
            />
            <input
              type="password"
              id="changePasswordNewPassword2"
              autoComplete="new-password"
              value={user?.confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm Password"
            />
          </div>
          <div className="modal-footer">
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    );
  };
  return (
    <>
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
    </>
  );
}

export default Account;
