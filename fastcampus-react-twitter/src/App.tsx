import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>home</h1>} />
        <Route path="/posts" element={<h1>post list page</h1>} />
        <Route path="/posts/:id" element={<h1>post detail page</h1>} />
        <Route path="/posts/new" element={<h1>post new page</h1>} />
        <Route path="/posts/edit/:id" element={<h1>post edit page</h1>} />
        <Route path="/profile" element={<h1>profile page</h1>} />
        <Route path="/profile/edit" element={<h1>profile edit page</h1>} />
        <Route path="/notification" element={<h1>notification page</h1>} />
        <Route path="/search" element={<h1>search page</h1>} />
        <Route path="/users/login" element={<h1>users login page</h1>} />
        <Route path="/users/signup" element={<h1>users signup page</h1>} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}

export default App;
