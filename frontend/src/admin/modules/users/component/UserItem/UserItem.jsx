import moment from "moment";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

import "./UserItem.scss";
function UserItem() {
  const { userList } = useSelector((state) => state.user);

  return userList.map((user, index) => {
    return (
      <div className="user__row" key={index}>
        <div className="user__row--id text">{user.id}</div>
        <div className="user__row--name text">{user.name}</div>
        <div className="user__row--email text">{user.email}</div>
        <div className="user__row--role text">{user.type_name}</div>
        <div className="user__row--createAt text">
          {moment(user.created_at).format("YYYY-MM-DD")}
        </div>
        <div className="user__row--updateAt text">
          {moment(user.updated_at).format("YYYY-MM-DD")}
        </div>
        <div className="user__row--action text">
          <NavLink to={`/admin/user/editUser/${user.id}`}>
            <VisibilityIcon />
          </NavLink>
        </div>
      </div>
    );
  });
}

export default UserItem;
