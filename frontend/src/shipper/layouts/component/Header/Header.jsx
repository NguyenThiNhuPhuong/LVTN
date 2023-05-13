import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import "./Header.scss";
import { useSelector } from "react-redux";
function Header() {
  const { userProfile } = useSelector((state) => state.user);
  console.log(userProfile);
  return (
    <div className="headerContainer">
      <div className="headerContainer__info">
        <span className="info__logo">
          <LocalShippingIcon className="icon__logo" />
        </span>
        <div className="info__content">
          <span className="info__content--title">BAG GIRL</span>
          <div>
            <span className="info__content--phone">0343803696</span>
            <span className="info__content--mail">{userProfile.email}</span>
          </div>
        </div>
      </div>
      <div className="headerContainer__right">
        <div className="headerContainer__search">
          <input type="text" className="headerContainer__search--input" />
          <span className="headerContainer__search--icon">
            <SearchIcon />
          </span>
        </div>
        <div className="headerContainer__account">
          <select name="" id="">
            <option>Hi,bé {userProfile.name}</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Header;
