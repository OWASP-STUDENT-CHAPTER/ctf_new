import React, { useEffect } from "react";
import "../assets/css/loginPage.css";
import URL from "../util/URL";

const Login = () => {
  useEffect(() => {
    localStorage.clear(); // clear for user
  }, []);

  const numrows = 20;
  var rows = [];
  for (var i = 0; i < numrows; i++) {
    rows.push(
      <div className="rowsprat">
        <div>
          <i className="fa fa-mobile" aria-hidden="true"></i>
          <i className="fa fa-laptop" aria-hidden="true"></i>
          <i className="fa fa-podcast" aria-hidden="true"></i>
          <i className="fa fa-upload" aria-hidden="true"></i>
          <i className="fa fa-battery-full" aria-hidden="true"></i>
          <i className="fa fa-sign-in" aria-hidden="true"></i>
          <i className="fa fa-hashtag" aria-hidden="true"></i>
          <i className="fa fa-code" aria-hidden="true"></i>
          <i className="fa fa-wifi" aria-hidden="true"></i>
          <i className="fa fa-envelope" aria-hidden="true"></i>
          <i className="fa fa-download" aria-hidden="true"></i>
          <i className="fa fa-qrcode" aria-hidden="true"></i>
          <i className="fa fa-share-alt" aria-hidden="true"></i>
          <i className="fa fa-tag" aria-hidden="true"></i>
          <i className="fa fa-volume-up" aria-hidden="true"></i>
          <i className="fa fa-microphone" aria-hidden="true"></i>
          <i className="fa fa-plug" aria-hidden="true"></i>
          <i className="fa fa-cloud-upload" aria-hidden="true"></i>
          <i className="fa fa-headphones" aria-hidden="true"></i>
          <i className="fa fa-gamepad" aria-hidden="true"></i>
          <i className="fa fa-comments" aria-hidden="true"></i>
        </div>
        <div>
          <i className="fa fa-mobile" aria-hidden="true"></i>
          <i className="fa fa-laptop" aria-hidden="true"></i>
          <i className="fa fa-podcast" aria-hidden="true"></i>
          <i className="fa fa-upload" aria-hidden="true"></i>
          <i className="fa fa-battery-full" aria-hidden="true"></i>
          <i className="fa fa-sign-in" aria-hidden="true"></i>
          <i className="fa fa-hashtag" aria-hidden="true"></i>
          <i className="fa fa-code" aria-hidden="true"></i>
          <i className="fa fa-wifi" aria-hidden="true"></i>
          <i className="fa fa-envelope" aria-hidden="true"></i>
          <i className="fa fa-download" aria-hidden="true"></i>
          <i className="fa fa-qrcode" aria-hidden="true"></i>
          <i className="fa fa-share-alt" aria-hidden="true"></i>
          <i className="fa fa-tag" aria-hidden="true"></i>
          <i className="fa fa-volume-up" aria-hidden="true"></i>
          <i className="fa fa-microphone" aria-hidden="true"></i>
          <i className="fa fa-plug" aria-hidden="true"></i>
          <i className="fa fa-headphones" aria-hidden="true"></i>
          <i className="fa fa-gamepad" aria-hidden="true"></i>
          <i className="fa fa-comments" aria-hidden="true"></i>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="sectionsprat">
        {rows}
        {/* <div className='loginButton'>
          <a href={`${process.env.REACT_APP_BASE_URL}/api/auth/login`}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Login
          </a>
        </div> */}
        <div className="loginButton">
          <a href={`${URL}/api/auth/login`}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Login
          </a>
        </div>
      </section>
    </>
  );
};

export default Login;
