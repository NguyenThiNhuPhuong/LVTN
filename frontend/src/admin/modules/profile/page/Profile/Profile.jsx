import React from "react";
import "./Profile.scss";
function Profile() {
  return (
    <div className="ProfileContainer">
      <div className="header">
        <div className="header__img">
          <img
            alt="avatar"
            src="https://demos.themeselection.com/materio-mui-react-nextjs-admin-template-free/images/avatars/1.png"
          ></img>
        </div>
        <div className="header__content">
          <div className="header__content-top">
            <div className="header__content--btn btn-update">
              <span>UPLOAD NEW PHOTO</span>
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
        <div class="content__input">
          <input type="text" value="0343803696" />
          <label>Phone</label>
        </div>
        <div class="content__input">
          <input type="text" value="Nabeo123? " />
          <label>Mail</label>
        </div>
      </div>
      <div className="bottom">
        <div className="bottom--btn btn-save">
          <span>save change</span>
        </div>
        <div className="bottom--btn btn-reset">
          <span>reset</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
