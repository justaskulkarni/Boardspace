import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../stylesheets/MentorAuth.module.css";
import Navbar from "../components/Navbar";

const Login = () => {
	const [credentials, setCredentials] = useState({ email: "", password: "" });
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		// show loading sign
		setIsLoading(true);

		const response = await fetch("/api/mentor/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: credentials.email, password: credentials.password }),
		});

		const json = await response.json();

		if (json.noverify) {
			setIsLoading(false);
			navigate("/notaccepted", {
				state: {
					message: json.noverify,
				},
			});
		}

		if (json.isreject) {
			setIsLoading(false);
			navigate("/notaccepted", {
				state: {
					message: json.isreject,
				},
			});
		}

		if (json.success) {
			setIsLoading(false);
			localStorage.setItem("Token", json.authToken);
			navigate("/mentor/chat");
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
			<div className={styles.loginform}>
				<h3 className={styles.login}>Login</h3>
				<h6 className={styles.newsignup}>
					New to this site?{" "}
					<Link className={styles.signupclick} to={"/signup"}>
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
					</form>
				</div>
			</div>
		</>
	);
};

export default Login;
