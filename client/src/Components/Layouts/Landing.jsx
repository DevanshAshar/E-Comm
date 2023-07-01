import React from "react";
import Layout from "./Layout";

const Landing = () => {
  return (
    <Layout>
        <h1 className="text-center m-3" style={{color:'purple'}}>Welcome To ElexKart</h1>
        <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <img
          src="https://static.vecteezy.com/system/resources/previews/002/139/448/non_2x/online-shopping-flat-design-for-website-landing-page-marketing-elements-or-e-commerce-illustration-web-banner-and-digital-payment-vector.jpg"
          alt=""
          style={{ maxWidth: "80%", maxHeight: "80%" }}
        />
      </div>
    </Layout>
  );
};

export default Landing;
