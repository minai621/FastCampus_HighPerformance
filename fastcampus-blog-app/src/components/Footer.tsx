import ThemeContext from "context/ThemeContext";
import { useContext } from "react";
import { BsMoonFill, BsSun } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  const context = useContext(ThemeContext);
  return (
    <footer>
      <div>
        <Link to="/posts/new">글쓰기</Link>
        <Link to="/posts">게시글</Link>
        <Link to="/profile">프로필</Link>
      </div>
      <div>
        {context.theme === "light" ? (
          <BsSun className="footer__theme-btn" onClick={context.toggleMode} />
        ) : (
          <BsMoonFill
            className="footer__theme-btn"
            onClick={context.toggleMode}
          />
        )}
      </div>
    </footer>
  );
};

export default Footer;
