import Navbar from "../components/Navbar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../stylesheets/StudentAuth.module.css";

const StudentLogin = () => {
	const [credentials, setCredentials] = useState({ email: "", password: "" });
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		// show loading sign
		setIsLoading(true);

		const response = await fetch("/api/student/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: credentials.email, password: credentials.password }),
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

	const forgotp = (e) => {
		e.preventDefault();
		navigate("/student/forgotpassword");
	};

	const onChange = (event) => {
		setCredentials({ ...credentials, [event.target.name]: event.target.value });
	};

	return (
		<>
			<Navbar />
			<div className={styles.loginpage}>
				<div className={styles.colordiv}>
					<div className={styles.colour1}></div>
				</div>
				<div className={styles.loginform}>
					<h3 className={styles.login}>Login</h3>
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
										<span className={styles.logintext}>Log In</span>
									</button>
								)}
							</div>
							{error && <div className={styles.error}>{error}</div>}
							<div>
								<button className={styles.forgot} onClick={forgotp}>
									Forgot password?
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default StudentLogin;
