import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import TabTitle from "~/components/tabtiltle/TabTiltle";
import { getAUser } from "~/redux/slice/user/UserSlice";
import "./Account.scss";

function Account() {
  TabTitle("Tài khoản của tôi");
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.userProfile);
  console.log(profile);
  useEffect(() => {
    dispatch(getAUser());
  }, [dispatch]);
  return (
    <>
      <div className="wrap">
        <div className="col-md-10 col-sm-12 col-xs-12">
          <div className="single">
            <div className="singleContainer">
              <div className="top">
                <div className="left">
                  <div className="item">
                    <NavLink to={`/profile/editprofile`}>
                      <div className="editButton">Edit</div>
                    </NavLink>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div className="user-avatar--work">
                        {profile?.name?.split("").pop().slice(0, 1)}
                      </div>
                    </div>
                    <div className="details">
                      <h1 className="itemTitle">{profile?.fullName}</h1>
                      <div className="detailItem">
                        <span className="itemKey">Email:</span>
                        <span className="itemValue">{profile?.email}</span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey">Phone:</span>
                        <span className="itemValue">
                          {profile?.phoneNumber}
                        </span>
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
