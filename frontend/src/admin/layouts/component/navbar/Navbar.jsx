import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useSelector } from "react-redux";
import Image from "~/components/image/Image";
import images from "~/ultil/images";
import "./Navbar.scss";
import AvatarUser from "./avatarUser/AvatarUser";

const Navbar = () => {
  const user = useSelector((state) => state.auth.userInfo);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search term " />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            {user.avatar ? (
              <Image src={user.avatar} alt="Nguyen Van A" className="avatar" />
            ) : user.name ? (
              <AvatarUser Auth={user.name} />
            ) : (
              <Image
                src={images.noImage}
                alt="Nguyen Van A"
                className="avatar"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
