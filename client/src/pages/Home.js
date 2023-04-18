import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import styles from "../stylesheets/home.module.css";
import bg from "../assets/bg.png";

import { Parallax } from "react-parallax";

function Home() {
	return (
		<>
			<div className={styles.Home}>
				<Parallax strength={400} bgImage={bg} bgClassName={styles.bgimg}>
					<Navbar />
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
