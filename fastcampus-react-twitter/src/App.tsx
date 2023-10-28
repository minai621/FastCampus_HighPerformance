import Layout from "components/Layout";
import Router from "components/Router";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Layout>
      <ToastContainer />
      <Router isAuthenticated />
    </Layout>
  );
}

export default App;
