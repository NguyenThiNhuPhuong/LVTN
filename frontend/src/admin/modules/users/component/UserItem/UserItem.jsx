import React, { useState } from "react";
import "./UserItem.scss";
import { useSelector } from "react-redux";
function UserItem() {
  const { userList } = useSelector((state) => state.user);
  console.log(userList);

  return userList.map((user, index) => {
    return (
      <div className="user__row" key={index}>
        <div className="user__row--id text">{user.id}</div>
        <div className="user__row--name text">{user.name}</div>
        <div className="user__row--email text">{user.email}</div>
        <div className="user__row--role text">{user.type_name}</div>
        <div className="user__row--createAt text">{user.created_at}</div>
        <div className="user__row--updateAt text">{user.updated_at}</div>
        <div className="user__row--action text">
          <section>
            <div class="input-wrap">
              <input id="input-6" type="checkbox" />
              <label for="input-6">Select</label>
            </div>
          </section>
        </div>
      </div>
    );
  });
}

export default UserItem;
