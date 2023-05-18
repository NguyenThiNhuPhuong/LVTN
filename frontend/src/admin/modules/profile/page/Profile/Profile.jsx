import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Loading from "~/admin/component/Loading/Loading";
import { getUserProfile } from "~/redux/slice/user/UserSlice";
import "./Profile.scss";
function Profile() {
  const dispatch = useDispatch();
  const { userProfile, isLoading } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);
  return isLoading ? (
    <Loading />
  ) : (
    <div className="profile">
      <div className="profile__right">
        <div className="item">
          <div className="item__top">
            <NavLink to={`/admin/profile/editProfile/${userProfile.id}`}>
              <div className="item__top--btn">Edit</div>
            </NavLink>
          </div>
          <div className="item__content">
            <div className="item__content--avatar">
              <img
                src={
                  userProfile.avatar ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5jdCRwv_UItyMFSKNJSxp6f6lgMi1DRz3LV3neY8t6A&s"
                }
                alt=""
              />
            </div>
            <div className="item__content--detail">
              <h1 className="itemTitle">{userProfile?.name}</h1>
              <div className="detailItem">
                <span className="itemKey">Email:</span>
                <span className="itemValue">{userProfile?.email}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Phone:</span>
                <span className="itemValue">{userProfile?.phone}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Address:</span>
                <span className="itemValue">{userProfile?.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
