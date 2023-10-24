import { BiUserCircle } from "react-icons/bi";
import { BsHouse } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const MenuList = () => {
  const navigate = useNavigate();
  return (
    <div className="footer">
      <div className="footer__grid">
        <button type="button" onClick={() => navigate("/")}>
          <BsHouse />
          Home
        </button>
        <button type="button" onClick={() => navigate("/profile")}>
          <BiUserCircle />
          Profile
        </button>
        <button type="button" onClick={() => navigate("/logout")}>
          <MdLogout />
          Logout
        </button>
      </div>
    </div>
  );
};

export default MenuList;
