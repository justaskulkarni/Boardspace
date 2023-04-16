import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
/* import "../stylesheets/home.module.css";

const Home = () => {
	const [offsetY, setOffsetY] = useState(0);

	useEffect(() => {
		const handleScroll = () => setOffsetY(window.pageYOffset);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
    <>
      <Navbar />
      <div className="parallax-container">
        <div
          className="parallax-bg"
          style={{ transform: `translateY(-${offsetY * 0.5}px)` }}
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
    </>
	);
};

export default Home; */

const Home = () => {
	return (
		<div>
			<Navbar />
			Home
		</div>
	);
};

export default Home;
