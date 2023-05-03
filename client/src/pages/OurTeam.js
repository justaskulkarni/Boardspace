import React from "react";
import Navbar from "../components/Navbar";

import styles from "../stylesheets/OurTeam.module.css";

import Ojas from "../assets/Our Team/Ojas.png";
import Shourya from "../assets/Our Team/Shourya.png";
import Aos from "aos";
import "aos/dist/aos.css";

const OurTeam = () => {
	return (
		<>
			<Navbar />
			<div className={styles.section}>
				<h2>TEAM</h2>
				<h4>
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
									{/* <br /> */}
									<span className={styles.name}>Shourya Vir Jain</span>
									{/* <br /> */}
									<span className={styles.description}>Shourya Vir Jain is an alumni of Cathedral and is currently a freshman at IIT Delhi. His academics have been exceptional, be it with 10th boards (98%), 12th boards (98%), various APs or even JEE. He is also a Black belt in Karate, an Internationally Rated Chess Professional (FIDE: 2118) and an avid automations enthusiast. His guidance is of immense benefit and with him, you will be assured major success in your academic path</span>
								</span>
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
									{/* <br /> */}
									<span className={styles.name}>Ojas Binayke</span>
									{/* <br /> */}
									<span className={styles.description}>Ojas Binayke is an alumni of St. Mary’s and is currently a freshman at VJTI. From his exceptional academic performances to his brilliant leadership skills, his tenacity is unparalleled. He has vast experience hosting online events and is an active achiever in debates, quizzes and elocutions. He aced 10th boards with 99% and maintained it in 12th with 96% followed by a stellar top 300 rank in MHTCET 2022 (3 Lakh+ Aspirants).</span>
								</span>
							</div>
						</div>
						<div class={styles.arrowdown}></div>
					</div>
				</div>
			</div>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
		</>
	);
};

export default OurTeam;
