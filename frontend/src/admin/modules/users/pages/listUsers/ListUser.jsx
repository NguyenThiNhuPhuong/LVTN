import Top from "~/admin/layouts/component/top/Top";
import UserItem from "../../component/UserItem/UserItem";
import "./ListUser.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getListUser } from "~/redux/slice/user/UserSlice";

function ListUser() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListUser());
  });
  return (
    <div className="ListUserContainer">
      <Top title="Danh sách người dùng" to="newUser" />
      <div className="user">
        <div className="user__row user__header-labels">
          <div className="text-center">ID</div>
          <div className="text-center">Họ và tên</div>
          <div className="text-center">Email</div>
          <div className="text-center">Loại</div>
          <div className="text-center">Ngày tạo</div>
          <div className="text-center">Ngày Chỉnh sửa</div>
          <div className="text-center">Action</div>
        </div>
        <UserItem />
      </div>
    </div>
  );
}

export default ListUser;
