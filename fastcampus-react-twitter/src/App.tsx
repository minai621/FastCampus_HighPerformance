import Layout from "components/Layout";
import Loader from "components/Loader/Loader";
import Router from "components/Router";
import { getAuth } from "firebase/auth";
import app from "firebaseApp";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const auth = getAuth(app);
  const [init, setInit] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!auth.currentUser);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      setInit(true);
    });
  }, [auth]);

  return (
    <Layout>
      <ToastContainer
        theme="dark"
        autoClose={1000}
        hideProgressBar
        newestOnTop
      />
      {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
    </Layout>
  );
}

export default App;
