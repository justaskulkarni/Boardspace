import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../stylesheets/home.module.css";
import "../stylesheets/navbar.css";
import bg from "../assets/Home/bg.png";
import CommunityDriven from "../assets/Home/CommunityDriven.png";
import DoubtSolving from "../assets/Home/DoubtSolving.png";
import LiveSession from "../assets/Home/LiveSession.png";
import navbarlogo from "../assets/navbarlogo.png";
import bg1 from "../assets/Home/graph.png";
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
				<Parallax strength={600} bgImage={bg} bgClassName={styles.bgimg} bgImageStyle={{ height: "60rem", width: "140%", objectFit: "cover", backgroundPosition: "right",backgroundAttachment:"fixed" }}>
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
				<div className={styles.servicessize}>
					<div className={styles.services}>
						<h2>SERVICES</h2>
						<h4>
							Taking Your Education to
							<br />
							the Next Level
						</h4>
					</div>
					<div className={styles.servimages}>
						<div className={styles.servimage}>
							<center>
								<img src={DoubtSolving} alt="" className={styles.servimg} />
							</center>
							<h3>Doubt Solving</h3>
							<p>
								Board toppers and IITian mentors to
								<br />
								solve student doubts 24/7
							</p>
						</div>
						<div className={styles.servimage}>
							<center>
								<img src={CommunityDriven} alt="" />
							</center>
							<h3>Community Driven</h3>
							<p>
								Active community of like-minded
								<br />
								students to learn with
							</p>
						</div>
						<div className={styles.servimage}>
							<center>
								<img src={LiveSession} alt="" />
							</center>
							<h3>Live Session with Toppers</h3>
							<p>
								Frequent concept clearing sessions
								<br />
								hosted by mentors to help you excel
							</p>
						</div>
					</div>
					<div className={styles.people}>
						<div className={styles.data}>
						<center>
							<h5>We're Good with Numbers</h5>
						</center>
						</div>
						<div className={styles.numbers}>
							<div className={styles.rtd}>
								<p>
									<h2>36</h2>
									IITian Mentors
								</p>
							</div>
							<h1>.</h1>
							<div className={styles.rtd}>
								<p>
									<h2>14</h2>
									Board Toppers
								</p>
							</div>
							<h1>.</h1>
							<div className={styles.rtd}>	
								<p>
									<h2>680</h2>
									Community Members
								</p>
							</div>
							<h1>.</h1>
							<div className={styles.rtd}>
								<p>
									<h2>8</h2>
									Grades(5th-12th)
								</p>
							</div>
						</div>
				
					</div>
				<Parallax bgImage={bg1} strength={300} bgImageStyle={{ height:"59rem", width:"50%", backgroundAttachment:"fixed",objectFit:"contain",backgroundPosition:"right",aspectRatio:"auto",left:"75%"}}>
					<div className={styles.graph}>
						
						<div className={styles.finest}>
								
							<p>
							<h3>ABOUT</h3>
								<h1>Our Community is 
									<br />
									the Finest
								</h1>
							
							When you're in secondary school, everything seems <br /> obscure. 
							Due to <b>pressure from all sides</b> , students tend <br /> to get lost and can't focus on anything, 
							be it academics <br /> or extracurriculars. We <b>have been in your situation <br /> before</b>. 
							To ensure you don't make the same mistakes we <br /> made our solution → <b>boardspace</b>.
							<br /><br />
							At boardspace, we focus on building a platform on which <br /> <b>secondary
							students (Grades 5-12)</b>  can connect with <br /> experienced individuals to <b> solve their doubts</b>, <br />
							participate in open discussions, clear their concepts and <br /> ask for <b> structured guidance</b>.
							<br /><br />
							We are willing to <b> help you in all subjects</b>, no matter <br /> which board you are from. 
							With us, you will be made to <br /> interact with <b>board toppers and IITian 
							mentors </b><br /> directly in <b>free-form conversation.</b> In addition to <br /> impeccable mentorship, 
							you will build a <b> lifelong <br /> network</b> of qualified students and have a 
							reliable <br /> support system throughout your academic journey.
							<br /><br />
							<b>Have a doubt? Ask a topper!</b>

							</p>

						</div>		
					</div>
				</Parallax>
				
				<div className={styles.join}>
					<h2>Join our community</h2>

				</div>
				</div>
			</div>
		</>
	);
}

export default Home;

