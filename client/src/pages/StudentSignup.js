import Navbar from "../components/Navbar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "../stylesheets/StudentAuth.module.css";

const StudentSignup = () => {
	const [credentials, setCredentials] = useState({ email: "", phonenum: null, name: "", password: "" });
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		// show loading sign
		setIsLoading(true);

		const response = await fetch("/api/student/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: credentials.email, name: credentials.name, phonenum: credentials.phonenum, password: credentials.password }),
		});

		const json = await response.json();

		if (json.success) {
			setIsLoading(false);
			localStorage.setItem("Token", json.authToken);
			navigate("/student/chat");
		}

		if (json.error) {
			setIsLoading(false);
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
			setTimeout(() => {
				setIsLoading(false);
			}, 500);
		}
	};

	const onChange = (event) => {
		setCredentials({ ...credentials, [event.target.name]: event.target.value });
	};

	return (
		<>
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

						<div>
							<div className={styles.hoverpass}>
								<label htmlFor="Password">Password</label>
								<input type="password" value={credentials.password} name="password" onChange={onChange} placeholder="" className={styles.fields} />
							</div>
							<div className={styles.passpopdiv}>
								<div className={styles.arrowup}></div>
								<div className={styles.passpoptext}>
									<strong>Password must contain :</strong>
									<br />• atleast 8 characters
									<br />• atleast 1 number
								</div>
							</div>
						</div>

						<label htmlFor="Number">Mobile Number (Optional)</label>
						<input type="number" value={credentials.phonenum} name="phonenum" onChange={onChange} placeholder="" className={styles.fields} />

						<div>
							{isLoading ? (
								<div className={styles.loadingAnim}>
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
							) : (
								<button className={styles.loginbutton} id="submitButton">
									<span className={styles.logintext}>Sign Up</span>
								</button>
							)}
						</div>
					</form>
				</div>
				{error && (
					<div className={styles.error} style={{ marginTop: "14.5rem" }}>
						{error}
					</div>
				)}
			</div>
		</>
	);
};

export default StudentSignup;
