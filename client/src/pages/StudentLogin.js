import Navbar from "../components/Navbar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../stylesheets/StudentAuth.module.css";

const StudentLogin = () => {
	const [credentials, setCredentials] = useState({ email: "", password: "" });
	const [error, setError] = useState(null);

	const [isLoading, setLoading] = useState(false);

	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const response = await fetch("/api/student/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: credentials.email, password: credentials.password }),
		});

		const json = await response.json();

		if (json.success) {
			localStorage.setItem("Token", json.authToken);
			navigate("/student/chat");
		}

		if (json.error) {
			setError(json.error);
			setCredentials({
				email: "",
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
			)} */}

			<Navbar />
			<div className={styles.loginpage}>
				<div className={styles.colour1}></div>
				<div className={styles.loginform}>
					<h3 className={styles.login}>Log In</h3>
					<h6 className={styles.newsignup}>
						New to this site?{" "}
						<Link className={styles.signupclick} to={"/student/signup"}>
							Sign Up
						</Link>
					</h6>
					<div>
						<form onSubmit={handleSubmit} className={styles.forms}>
							<label htmlFor="Email">Email</label>
							<input type="email" value={credentials.email} name="email" onChange={onChange} placeholder="" className={styles.fields} />

							<label htmlFor="Password">Password</label>
							<input type="password" value={credentials.password} name="password" onChange={onChange} placeholder="" className={styles.fields} />

							<div>
								<button className={styles.forgot}>Forgot password?</button>
							</div>
							<div>
								<button className={styles.loginbutton} id="submitButton">
									<span className={styles.logintext}>Log In</span>
								</button>
							</div>
						</form>
					</div>
					{error && <div className={styles.error}>{error}</div>}
				</div>
			</div>
		</>
	);
};

export default StudentLogin;
