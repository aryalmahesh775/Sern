import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import Layout from "./component/layout";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Layout />} >
        <Route path="/" element={<HomePage />} />
        <Route path="/post" element={<HomePage />} />
        <Route path="/user" element={<HomePage />} />
        <Route path="/role" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
