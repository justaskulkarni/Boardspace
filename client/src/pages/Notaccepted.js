import React from "react";
import { useLocation } from "react-router-dom";
// import Navbar from "../components/Navbar";

import styles from "../stylesheets/notaccepted.module.css";

// import React from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import navbarlogo from "../assets/navbarlogo.png";

const Notaccepted = () => {
  //Navbar
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("Token");
    navigate("/");
  };

  const returnRole = (reqtoken) => {
    if (reqtoken) {
      var decoded = jwt_decode(reqtoken);
      return decoded.role;
    } else {
      return null;
    }
  };

  var frole = returnRole(localStorage.getItem("Token"));

  const location = useLocation();

  // Error css
  const doorframe = {
    height: "30.9375rem",
    width: "18.4375rem",
    borderRadius: "5.625rem 5.625rem 0 0",
    backgroundColor: "#8594a5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const leaf_css = {
    height: "2.5rem",
    width: "8.125rem",
    backgroundColor: "#000000",
    borderRadius: "0.1875rem",
    margin: "5rem auto",
    animation: "leaf 7s infinite",
    transformOrigin: "right",
  };

  const rectangle = {
    height: "4.375rem",
    width: "1.5625rem",
    backgroundColor: "#cbd8e6",
    borderRadius: "0.25rem",
    position: "absolute",
    marginTop: "13.75rem",
    marginLeft: "1.25rem",
  };

  const door_css = {
    height: "28.125rem",
    width: "15.625rem",
    borderRadius: "4.375rem 4.375rem 0 0",
    backgroundColor: "#a0aec0",
  };

  const window_css = {
    height: "2.5rem",
    width: "8.125rem",
    backgroundColor: "#1c2127",
    borderRadius: "0.1875rem",
    margin: "5rem auto",
    position: "relative",
  };

  return (
    <>
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Varela+Round"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Poppins"
          rel="stylesheet"
        />
      </head>


      <div className={styles.outerdiv}>
        <div>
          <Link to="/">
            <img className={styles.imgdiv} src={navbarlogo} alt="" />
          </Link>
        </div>
        <div className={styles.buttons}>
          {localStorage.getItem("Token") && frole === "Mentor" ? (
            <button className={styles.button1} onClick={handleLogout}>
              Mentor Logout
            </button>
          ) : (
            <button className={styles.button1}>
              <Link className={styles.link1} to="/login">
                Mentor
              </Link>
            </button>
          )}

          {localStorage.getItem("Token") && frole === "Student" ? (
            <button className={styles.button1} onClick={handleLogout}>
              Student Logout
            </button>
          ) : (
            <button className={styles.button1}>
              <Link className={styles.link1} to="/student/login">
                Student
              </Link>
            </button>
          )}
          <button className={styles.button1}>
            <Link className={styles.link1} to="/ourteam">
              Our Team
            </Link>
          </button>
        </div>
      </div>

      <div className={styles.message}>You are not authorized.</div>
      {location.state && (
        <div className={styles.message2}>{location.state.message}</div>
      )}
      <div className={styles.container}>
        <div className={styles.neon}>Access Denied</div>
        <div className={styles.entiredoor}>
          <div style={doorframe}>
            <div className={styles.door} style={door_css}>
              <div style={rectangle}></div>
              <div className={styles.handle}></div>
              <div style={window_css}>
                <div className={styles.eye}></div>
                <div className={styles.eye} style={{ left: "65px" }}></div>
                <div style={leaf_css}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Notaccepted;
