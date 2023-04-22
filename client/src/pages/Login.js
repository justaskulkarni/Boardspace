import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../stylesheets/MentorAuth.module.css";
import Navbar from "../components/Navbar";

const Login = () => {
	const [credentials, setCredentials] = useState({ email: "", password: "" });
	const [error, setError] = useState(null);

	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const response = await fetch("http://localhost:6100/api/mentor/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: credentials.email, password: credentials.password }),
		});

		const json = await response.json();

		if (json.noverify) {
			navigate("/notaccepted", {
				state: {
					message: json.noverify,
				},
			});
		}

		if (json.isreject) {
			navigate("/notaccepted", {
				state: {
					message: json.isreject,
				},
			});
		}

		if (json.success) {
			localStorage.setItem("Token", json.authToken);
			navigate("/youin");
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

	return (
		<>
			<Navbar />
			<div className={styles.colour1}></div>
			<div className={styles.loginform}>
				<h3 className={styles.login}>Mentor Login</h3>
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
							<button className={styles.loginbutton}>
								<span className={styles.logintext}>Log In</span>
							</button>
						</div>
					</form>
				</div>
				{/*  */}
				{/* </div> */}
				{error && <div className={styles.error}>{error}</div>}
			</div>
		</>
	);
};

export default Login;
