import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "firebaseApp";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignupForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      const validEmail =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      setEmail(value);
      if (!value.match(validEmail)) {
        setErrorMessage("이메일 형식이 올바르지 않습니다.");
      } else {
        setErrorMessage("");
      }
    } else if (name === "password") {
      setPassword(value);
      if (value?.length < 8) {
        setErrorMessage("비밀번호는 8글자 이상이어야 합니다.");
      } else if (value !== password) {
        setErrorMessage("비밀번호와 비밀번호 확인 값이 다릅니다.");
      } else {
        setErrorMessage("");
      }
    } else if (name === "password_confirmation") {
      setPasswordConfirmation(value);
      if (value?.length < 8) {
        setErrorMessage("비밀번호는 8글자 이상이어야 합니다.");
      } else if (value !== password) {
        setErrorMessage("비밀번호와 비밀번호 확인 값이 다릅니다.");
      } else {
        setErrorMessage("");
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
      toast.success("성공적으로 회원가입이 되었습니다.");
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <form className="form form--lg" onSubmit={handleSubmit}>
      <div className="form__title">회원가입</div>
      <div className="form__block">
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form__block">
        <label htmlFor="password">패스워드</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form__block">
        <label htmlFor="password_confirmation">패스워드 확인</label>
        <input
          type="password"
          name="password_confirmation"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form__block">
        <div className="form__error">
          {errorMessage === "" ? "" : errorMessage}
        </div>
      </div>
      <div className="form__block">
        <p>계정이 있으신가요?</p>
        <Link to="/login">로그인</Link>
      </div>
      <div className="form__block">
        <button
          type="submit"
          className="form__btn-subit"
          disabled={errorMessage?.length > 0}
        >
          회원가입
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
