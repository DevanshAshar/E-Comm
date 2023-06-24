import React from "react";
import Layout from "../Components/Layouts/Layout";

const Signup = () => {
  return (
    <Layout>
      <div className="signup">
        <h1 style={{color:'purple'}}>Signup</h1>
        <form>
          <div className="my-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputUsername"
              placeholder="Username"
            />
          </div>
          <div className="my-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail"
              placeholder="Email"
            />
          </div>
          <div className="my-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword"
              placeholder="Password"
            />
            <div className="my-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputAddress"
              placeholder="Address"
            />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Signup;
