import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import toast from "react-hot-toast"
import SearchInput from "../SearchInput";
import { useCart } from "../../Context/cart";
const Header = () => {
  const [auth,setAuth]=useAuth()
  const [cart]=useCart()
  const logout=()=>{
    setAuth({
      ...auth,
      user:null,
      token:''
    })
    localStorage.removeItem('auth')
    toast.success('Logged out successfully',{duration:5000})
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <NavLink className="navbar-brand" to="/">
              E-Commerce App
            </NavLink>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput/>
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              {
                !auth.user?(
                  <>
                    <li className="nav-item">
                <NavLink className="nav-link" to="/signup">
                  Signup
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
                  </>
                ):(
                <>
                  <li className="nav-item">
                <NavLink className="nav-link" to="/login" onClick={logout}>
                  Logout
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={`/dashboard/${auth?.user?.role==='admin'?'admin':'user'}/landing` }>
                  Dashboard
                </NavLink>
              </li>
                </>
                )
              }
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">
                  Cart
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
