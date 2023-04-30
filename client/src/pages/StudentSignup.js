import Navbar from "../components/Navbar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "../stylesheets/StudentAuth.module.css";

const StudentSignup = () => {
	const [credentials, setCredentials] = useState({ email: "", phonenum: null, name: "", password: "" });
	const [error, setError] = useState(null);
	const [isLoading, setLoading] = useState(false);

	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const response = await fetch("/api/student/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: credentials.email, name: credentials.name, phonenum: credentials.phonenum, password: credentials.password }),
		});

		const json = await response.json();

		if (json.success) {
			localStorage.setItem("Token", json.authToken);
			navigate("/studentin");
		}

		if (json.error) {
			setError(json.error);
			setCredentials({
				email: "",
				phonenum: null,
				name: "",
				password: "",
			});
			setTimeout(() => {
				setError(null);
			}, 4000);
		}
	};

	const onChange = (event) => {
		setCredentials({ ...credentials, [event.target.name]: event.target.value });
	};

	const toggleAnimation = async (e) => {
		e.preventDefault();
		setLoading(true);
	};

	return (
		<>
			{/* {isLoading && (
				<div id="loadingAnim">
					<div className={styles.dotSpinner}>
						<div className={styles.dotSpinnerDot}></div>
						<div className={styles.dotSpinnerDot}></div>
						<div className={styles.dotSpinnerDot}></div>
						<div className={styles.dotSpinnerDot}></div>
						<div className={styles.dotSpinnerDot}></div>
						<div className={styles.dotSpinnerDot}></div>
						<div className={styles.dotSpinnerDot}></div>
						<div className={styles.dotSpinnerDot}></div>
					</div>
				</div>
			)} */}

			<Navbar />
			<div className={styles.colordiv}>
				<div className={styles.colour1}></div>
			</div>
			<div className={styles.signupform}>
				<h3 className={styles.login}>Sign Up</h3>
				<h6 className={styles.newsignup}>
					Already a Member?{" "}
					<Link to="/student/login" className={styles.signupclick}>
						Log In
					</Link>
				</h6>
				<div>
					<form className={styles.forms} onSubmit={handleSubmit}>
						<label htmlFor="Name">Name</label>
						<input type="text" value={credentials.name} name="name" onChange={onChange} placeholder="" className={styles.fields} />

						<label htmlFor="Email">Email</label>
						<input type="email" value={credentials.email} name="email" onChange={onChange} placeholder="" className={styles.fields} />

						<label htmlFor="Password">Password</label>
						<input type="password" value={credentials.password} name="password" onChange={onChange} placeholder="" className={styles.fields} />

						<label htmlFor="Number">Mobile Number (Optional)</label>
						<input type="number" value={credentials.phonenum} name="phonenum" onChange={onChange} placeholder="" className={styles.fields} />

						<div>
							<button className={styles.loginbutton}>
								<span className={styles.logintext}>Sign Up</span>
							</button>
						</div>
					</form>
				</div>
				{error && <div className={styles.error}>{error}</div>}
			</div>
		</>
	);
};

export default StudentSignup;
