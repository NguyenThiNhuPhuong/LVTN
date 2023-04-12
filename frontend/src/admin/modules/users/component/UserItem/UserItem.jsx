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
}

export default UserItem;
