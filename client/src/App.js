import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
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
import CartPage from "./Pages/CartPage";
import Landing from "./Components/Layouts/Landing";
import Checkout from "./Pages/Checkout";
import Review from "./Pages/Review";
import EditReview from "./Pages/EditReview";
import AllOrders from "./Pages/AllOrders";
import AdminOrders from "./Pages/AdminOrders";
function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Landing/>}/>
        <Route path="" element={<Private />}>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/logLand" element={<Landing/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/cart" element={<CartPage/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/product/:pid" element={<ProductDetails/>}/>
          <Route path="/review" element={<Review/>}/>
          <Route path="/editReview" element={<EditReview/>}/>
        </Route>
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
          <Route path="allOrders" element={<AllOrders/>}/>
          <Route path="myOrders" element={<AdminOrders/>}/>
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
