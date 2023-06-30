import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Private from "./Components/Routes/Private";
import VerifyOtp from "./Pages/VerifyOtp";
import NewPassword from "./Pages/NewPassword";
import AdminRoute from "./Components/Routes/AdminRoute";
import AdminDashboard from "./Pages/AdminDashboard";
import CreateProduct from "./Pages/CreateProduct";
import AllUsers from "./Pages/AllUsers";
import Orders from "./Pages/Orders";
import Profile from "./Pages/Profile";
import AdminProducts from "./Pages/AdminProducts";
import UpdateProduct from "./Pages/UpdateProduct";
import Search from "./Pages/Search";
import ProductDetails from "./Pages/ProductDetails";
function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/search" element={<Search/>}/>
        <Route path="/product/:pid" element={<ProductDetails/>}/>
        <Route path="/dashboard/user" element={<Private />}>
          <Route path="landing" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard/admin" element={<AdminRoute />}>
          <Route path="landing" element={<AdminDashboard />} />
          <Route path="addProduct" element={<CreateProduct />} />
          <Route path="product/:pid" element={<UpdateProduct />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="users" element={<AllUsers />} />
        </Route>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/verifyOtp" element={<VerifyOtp />} />
        <Route exact path="/newPass" element={<NewPassword />} />
        <Route exact path="/*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
