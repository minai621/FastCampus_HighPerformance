import { languageState } from "atom";
import AuthContext from "context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import app from "firebaseApp";
import useTranslation from "hooks/useTranslation";
import { useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { BsHouse } from "react-icons/bs";
import { MdLogin, MdLogout, MdOutlineLanguage } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";

const MenuList = () => {
  const { user } = useContext(AuthContext);
  const [language, setLanguage] = useRecoilState(languageState);
  const t = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="footer">
      <div className="footer__grid">
        <button type="button" onClick={() => navigate("/")}>
          <BsHouse />
          <span className="footer__grid--text">{t("MENU_HOME")}</span>
        </button>
        <button type="button" onClick={() => navigate("/profile")}>
          <BiUserCircle />
          <span className="footer__grid--text">{t("MENU_PROFILE")}</span>
        </button>
        <button type="button" onClick={() => navigate("/search")}>
          <AiOutlineSearch />
          <span className="footer__grid--text">{t("MENU_SEARCH")}</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setLanguage((prev) => (prev === "ko" ? "en" : "ko"));
            localStorage.setItem("language", language === "ko" ? "en" : "ko");
          }}
        >
          <MdOutlineLanguage />
          {language === "ko" ? "한국어" : "영어"}
        </button>
        {user === null ? (
          <button type="button" onClick={() => navigate("/users/login")}>
            <MdLogin />
            {t("MENU_SEARCH")}
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
            <span className="footer__grid--text">{t("MENU_LOGIN")}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuList;
