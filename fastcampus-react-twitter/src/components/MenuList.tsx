import AuthContext from "context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import app from "firebaseApp";
import { useContext } from "react";
import { BiUserCircle } from "react-icons/bi";
import { BsHouse } from "react-icons/bs";
import { MdLogin, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MenuList = () => {
  const { user } = useContext(AuthContext);

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
        {user === null ? (
          <button type="button" onClick={() => navigate("/users/login")}>
            <MdLogin />
            Login
          </button>
        ) : (
          <button
            type="button"
            onClick={async () => {
              const auth = getAuth(app);
              try {
                await signOut(auth);
                toast.success("로그아웃이 성공적으로 되었습니다.");
              } catch (error: any) {
                toast.error(error.message);
              }
            }}
          >
            <MdLogout />
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuList;
