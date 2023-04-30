import React from "react";
import styles from "../stylesheets/404.module.css";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function NotFound() {
	return (
		<>
			<Navbar />
			<section className={styles.page_404}>
				<div className={styles.four_zero_four_bg}>
					<h1 className={styles.heading}>404</h1>
				</div>

				<div className={styles.content_box_404}>
					<h3 className={styles.h3}> Looks like you're lost</h3>
					<p className={styles.h3}> The page you are looking for is not available!</p>
					{/* <p>Go to Home</p> */}
					<Link to={"/"}>
						<button className={styles.lbutton} id="submitButton">
							Home
						</button>
					</Link>
				</div>
			</section>
		</>
	);
}

export default NotFound;
