import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import TabTitle from "~/components/tabtiltle/TabTiltle";
import { getAUser } from "~/redux/slice/user/UserSlice";
import "./Account.scss";
import SideBar from "../../component/SideBar/SideBar";

function Account() {
  TabTitle("Tài khoản của tôi");
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.userProfile);
  useEffect(() => {
    dispatch(getAUser());
  }, [dispatch]);
  return (
    <>
      <div className="AccountContainer">
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
                  <span className="itemValue">{profile?.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{profile?.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
