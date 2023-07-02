import React, { useEffect, useState } from "react";
import Layout from "../Components/Layouts/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import UserMenu from "../Components/Layouts/UserMenu";
import { useAuth } from "../Context/auth";
const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  useEffect(()=>{
    const {email,username,mobile,address}=auth.user
    setUsername(username)
    setEmail(email)
    setMobile(mobile)
    setAddress(address)
  },[auth?.user])
  return (
    <Layout>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-2">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>Your Profile</h1>
            <div className="form-containe">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const res = await axios.patch(
                      `${process.env.REACT_APP_API}/user/updateUser`,
                      { username, email, mobile, address }
                    );
                    console.log(res);
                    if (res.status === 200) {
                        setAuth((prevAuth) => ({
                            ...prevAuth,
                            user: { ...prevAuth.user, username, mobile, address },
                          }));
                      toast.success("Updated Successfully");
                      //navigate("/login");
                    }
                  } catch (error) {
                    console.log(error);
                    toast.error("Something went wrong");
                  }
                }}
              >
                <div className="my-3">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputUsername"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    placeholder="Username"
                  />
                </div>
                <div className="my-3">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="Email"
                    disabled
                  />
                </div>
                <div className="my-3">
                  <div className="my-3">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputMobile"
                      value={mobile}
                      onChange={(e) => {
                        setMobile(e.target.value);
                      }}
                      placeholder="Mobile"
                    />
                  </div>
                  <div className="my-3">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputAddress"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      placeholder="Address"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
