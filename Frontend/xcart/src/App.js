import "./App.css";
import CheckoutPage from "./Components/CheckoutPage";
import Homepage from "./Components/Homepage";
import Login from "./Components/LoginPage/Login";
import Register from "./Components/RegisterPage/Register";
import { Routes, Route } from "react-router-dom";
import ThankYou from "./ThankYou";
// import { ToastContainer } from "react-toastify";

export const config = {
  endpoint: `http://localhost:3002`,
};

function App() {
  return (
    <div className="App">
      {/* <ToastContainer /> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout/:totalPrice" element={<CheckoutPage />} />
        <Route path="/thankyou" element={<ThankYou />} />
      </Routes>
    </div>
  );
}

export default App;
