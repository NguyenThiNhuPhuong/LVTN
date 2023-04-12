import React, { useState } from "react";
import "./UserItem.scss";
function UserItem() {
  const [data, setData] = useState([]);

  return (
    <div className="user__row">
      <div className="user__row--id text">1</div>
      <div className="user__row--name text">2</div>
      <div className="user__row--email text">3</div>
      <div className="user__row--role text">4</div>
      <div className="user__row--createAt text">5</div>
      <div className="user__row--updateAt text">6</div>
      <div className="user__row--action text">7</div>
    </div>
  );
}

export default UserItem;
