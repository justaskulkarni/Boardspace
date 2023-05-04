import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../stylesheets/navbar.css";
import footerbg from "../assets/Home/Footer.png";

import styles from "../stylesheets/OurTeam.module.css";

import Ojas from "../assets/Our Team/Ojas.png";
import Shourya from "../assets/Our Team/Shourya.png";
import Kedar from "../assets/Our Team/Kedar.jpeg";
import Rucha from "../assets/Our Team/Rucha.JPG";
import Siddhant from "../assets/Our Team/Siddhant.jpg";
import Aditya from "../assets/Our Team/Aditya.jpg";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Parallax } from "react-parallax";
import { FaLinkedin } from "react-icons/fa";
// import { FaDiscord } from "react-icons/fa";
import Aos from "aos";
import "aos/dist/aos.css";

import navbarlogo from '../assets/navbarlogo.png'
import styles2 from '../stylesheets/navbar.module.css'
import "../stylesheets/navbar.css";

const OurTeam = () => {
	// Animations
	useEffect(() => {
		Aos.init({ duration: 2000, once: true });
	}, []);

	useEffect(() => {
		window.onscroll = function () {
			if (document.documentElement.scrollTop > 60) {
				document.querySelector("#nav").classList.add("temp");
			} else {
				if (document.querySelector("#nav").classList.contains("temp")) {
					document.querySelector("#nav").classList.remove("temp");
				}
			}
		};
	});

	let navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("Token");
		navigate("/");
	};

	return (
		<>
			<div className={styles2.outerdiv} id="nav">
				<div><Link to="/"><img className={styles2.imgdiv} src={navbarlogo} alt="" /></Link></div>
				<div className={styles2.buttons}>
					{(localStorage.getItem("Token")) ?
						<button className={styles2.tail} onClick={handleLogout}>Logout</button>
						:
						<>
							<button className={styles2.tail}><Link className={styles2.link1} to="/login">Mentor</Link></button>
							<button className={styles2.tail}><Link className={styles2.link1} to="/student/login">Student</Link></button>
						</>
					}
					<button className={styles2.tail}>
						<Link className={styles2.link1} to="/ourteam">
							Our Team
						</Link>
					</button>
				</div>
			</div>

			<div className={styles.section}>
				<h2>OUR TEAM</h2>
				<h4 className={styles.heading}>
					Meet the People Dedicated
					<br />
					To Your Success
				</h4>
				<div className={styles.cardssection}>
					<div>
						<div className={styles.cards}>
							<div>
								<img src={Shourya} alt="" className={styles.image} />
							</div>
							<div className={styles.belowimage}>
								<span>
									<span className={styles.designation}>Co-Founder</span>
									<span className={styles.name}>Shourya Vir Jain</span>
									<span className={styles.description}>Shourya Vir Jain is an alumni of Cathedral and is currently a freshman at IIT Delhi. His academics have been exceptional, be it with 10th boards (98%), 12th boards (98%), various APs or even JEE. He is also a Black belt in Karate, an Internationally Rated Chess Professional (FIDE: 2118) and an avid automations enthusiast. His guidance is of immense benefit and with him, you will be assured major success in your academic path</span>
								</span>
								<Link to={"https://www.linkedin.com/company/boards-pace/"} className={styles.icons}>
									<FaLinkedinIn size={20} />
								</Link>
							</div>
						</div>
						<div class={styles.arrowdown}></div>
					</div>
					<div>
						<div className={styles.cards}>
							<div>
								<img src={Ojas} alt="" className={styles.image} />
							</div>
							<div className={styles.belowimage}>
								<span>
									<span className={styles.designation}>Co-Founder</span>

									<span className={styles.name}>Ojas Binayke</span>

									<span className={styles.description}>Ojas Binayke is an alumni of St. Mary’s and is currently a freshman at VJTI. From his exceptional academic performances to his brilliant leadership skills, his tenacity is unparalleled. He has vast experience hosting online events and is an active achiever in debates, quizzes and elocutions. He aced 10th boards with 99% and maintained it in 12th with 96% followed by a stellar top 300 rank in MHTCET 2022 (3 Lakh+ Aspirants).</span>
								</span>
								<Link to={"https://www.linkedin.com/company/boards-pace/"} className={styles.icons}>
									<FaLinkedinIn size={20} />
								</Link>
							</div>
						</div>
						<div class={styles.arrowdown}></div>
					</div>
				</div>
				<br />
				<br />
				<br />
				<br />
				<h4 className={styles.heading}>Developed by</h4>
				{/* <br /> */}
				<div className={styles.devsection}>
					<div>
						<div className={styles.devcards}>
							<div>
								<img src={Siddhant} alt="" className={styles.image} />
							</div>
							<div className={styles.belowimage}>
								<span>
									<span className={styles.name}>Siddhant Baheti</span>
								</span>
								<div>
									<Link to={"https://www.linkedin.com/in/sid0610/"} className={styles.devicons}>
										<FaLinkedinIn size={20} />
									</Link>
									<Link to={"https://github.com/0610sid"} className={styles.devicons}>
										<FaGithub size={20} />
									</Link>
								</div>
							</div>
						</div>
						<div class={styles.arrowdown}></div>
					</div>
					<div>
						<div className={styles.devcards}>
							<div>
								<img src={Aditya} alt="" className={styles.image} />
							</div>
							<div className={styles.belowimage}>
								<span>
									<span className={styles.name}>Aditya Kulkarni</span>
								</span>
								<div>
									<Link to={"https://www.linkedin.com/in/aditya-kulkarni-475143233/"} className={styles.devicons}>
										<FaLinkedinIn size={20} />
									</Link>
									<Link to={"https://github.com/justaskulkarni"} className={styles.devicons}>
										<FaGithub size={20} />
									</Link>
								</div>
							</div>
						</div>
						<div class={styles.arrowdown}></div>
					</div>
					<div>
						<div className={styles.devcards}>
							<div className={styles.image}>
								<img src={Kedar} alt="" className={styles.image} />
							</div>
							<div className={styles.belowimage}>
								<span>
									<span className={styles.name}>Kedar Dhamankar</span>
								</span>
								<div>
									<Link to={"https://www.linkedin.com/in/kedar-dhamankar-1a5000228/"} className={styles.devicons}>
										<FaLinkedinIn size={20} />
									</Link>
									<Link to={"https://github.com/KedarDhamankar"} className={styles.devicons}>
										<FaGithub size={20} />
									</Link>
								</div>
							</div>
						</div>
						<div class={styles.arrowdown}></div>
					</div>
					<div>
						<div className={styles.devcards}>
							<div className={styles.imagediv}>
								<img src={Rucha} alt="" className={styles.image} />
							</div>
							<div className={styles.belowimage}>
								<span>
									<span className={styles.name}>Rucha Patil</span>
								</span>
								<div>
									<Link to={"https://www.linkedin.com/in/rucha-patil-593070258/"} className={styles.devicons}>
										<FaLinkedinIn size={20} />
									</Link>
									<Link to={"https://github.com/Ruchapatil03"} className={styles.devicons}>
										<FaGithub size={20} />
									</Link>
								</div>
							</div>
						</div>
						<div class={styles.arrowdown}></div>
					</div>
				</div>
				<div className={styles.emptydiv}></div>
				<div className={styles.final}>
					<Parallax strength={600} bgImage={footerbg} bgImageStyle={{ backgroundAttachment: "fixed", objectFit: "contain", aspectRatio: "auto", width: "70%" }}>
						<div className={styles.info}>
							<p>
								<h4 data-aos="fade-left" data-aos-duration="2000">
									CONTACT
								</h4>
								<h1 data-aos="fade-left" data-aos-duration="2000">
									Let's Work Together
								</h1>
								<Link to={"mailto:info@boardspace.in"}>
									<p data-aos="fade-left" data-aos-duration="2000">
										info@boardspace.in
									</p>
								</Link>
								<div className={styles.footericons} data-aos="fade-left" data-aos-duration="2000">
									<Link to={"https://www.linkedin.com/company/boards-pace/"}>
										<FaLinkedin /> {"  "}
									</Link>
									{/* <Link to={"https://discord.gg/V3nWJABdaQ"}>
										<FaDiscord /> {"  "}
									</Link> */}
								</div>
							</p>
							<center>
								<span> © 2023 by boardspace</span>
							</center>
						</div>
					</Parallax>
				</div>
			</div>
		</>
	);
};

export default OurTeam;
