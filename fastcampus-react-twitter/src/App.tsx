import Layout from "components/Layout";
import Router from "components/Router";
import { useState } from "react";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Layout>
      <Router isAuthenticated />
    </Layout>
  );
}

export default App;
