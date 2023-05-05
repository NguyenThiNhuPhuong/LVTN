import Top from "~/admin/layouts/component/top/Top";
import UserItem from "../../component/UserItem/UserItem";
import "./ListUser.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListUser } from "~/redux/slice/user/UserSlice";
import Loading from "~/admin/component/Loading/Loading";

function ListUser() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getListUser());
  }, [dispatch]);
  const User = () => {
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
  };
  return isLoading ? <Loading /> : <User />;
}

export default ListUser;
