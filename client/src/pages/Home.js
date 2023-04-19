import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../stylesheets/home.module.css";
import "../stylesheets/navbar.css";
import bg from "../assets/bg.png";
import navbarlogo from "../assets/navbarlogo.png";

import jwt_decode from "jwt-decode";
import { Parallax } from "react-parallax";

function Home() {
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

	useEffect(() => {
		window.onscroll = function () {
			if (document.documentElement.scrollTop > 100) {
				document.querySelector("#nav").classList.add("temp");
			} else {
				if (document.querySelector("#nav").classList.contains("temp")) {
					document.querySelector("#nav").classList.remove("temp");
				}
			}
		};
	});

	var frole = returnRole(localStorage.getItem("Token"));

	return (
		<>
			<div className={styles.Home}>
				<Parallax strength={700} bgImage={bg} bgImageStyle={{ height: "60rem", width: "140%", objectFit: "cover", backgroundPosition: "0% 50%" }}>
					<div className={"outerdiv"} id="nav">
						<div>
							<Link to="/">
								<img className={"imgdiv"} src={navbarlogo} alt="" />
							</Link>
						</div>
						<div className={"buttons"}>
							{localStorage.getItem("Token") && frole === "Mentor" ? (
								<button className={"tail"} onClick={handleLogout}>
									Mentor Logout
								</button>
							) : (
								<button className={"tail"}>
									<Link className={"link1"} to="/login">
										Mentor
									</Link>
								</button>
							)}

							{localStorage.getItem("Token") && frole === "Student" ? (
								<button className={"tail"} onClick={handleLogout}>
									Student Logout
								</button>
							) : (
								<button className={"tail"}>
									<Link className={"link1"} to="/student/login">
										Student
									</Link>
								</button>
							)}
							<button className={"tail"}>Our Team</button>
						</div>
					</div>

					<div className={styles.parallaxsize}>
						<div className={styles.power}>
							The Power
							<br />
							of Good Guidance
						</div>
						<div className={styles.toppers}>
							For Toppers by
							<br />
							Toppers.
						</div>
					</div>
				</Parallax>
				<div className={styles.parallaxsize}></div>
			</div>
		</>
	);
}

export default Home;
