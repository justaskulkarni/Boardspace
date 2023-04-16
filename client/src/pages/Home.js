import React, { useState, useEffect } from "react";
import "../stylesheets/home.module.css";

const ParallaxAnimation = () => {
	const [offsetY, setOffsetY] = useState(0);

	useEffect(() => {
		const handleScroll = () => setOffsetY(window.pageYOffset);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="parallax-container">
			<div
				className="parallax-bg"
				style={{
					transform: `translateY(-${offsetY * 0.5}px)`,
					backgroundImage: `url("../assets/background.jpg")`,
				}}
			/>
			<div
				className="parallax-content"
				style={{ transform: `translateY(${offsetY * 0.8}px)` }}
			>
				<h1>Parallax Animation</h1>
				<p>
					This is a simple example of a parallax animation created in
					React.
				</p>
			</div>
		</div>
	);
};

export default ParallaxAnimation;
