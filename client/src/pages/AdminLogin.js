import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../stylesheets/AdminAuth.module.css";

const AdminLogin = () => {
	const [creadentials, setCredentials] = useState({ email: "", password: "" });
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		// show loading sign
		setIsLoading(true);

		const response = await fetch("/api/admin/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: creadentials.email, password: creadentials.password }),
		});

		const json = await response.json();

		if (json.success) {
			setIsLoading(false);
			localStorage.setItem("Token", json.authToken);
			navigate("/admin/landing");
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

	const onChange = (event) => {
		setCredentials({ ...creadentials, [event.target.name]: event.target.value });
	};

	return (
		<>
			<Navbar />
			<div className={styles.colordiv}>
				<div className={styles.colour1}></div>
			</div>
			<div className={styles.loginform}>
				<h3 className={styles.login}>Admin Login</h3>
				<form onSubmit={handleSubmit} className={styles.forms}>
					<label htmlFor="Email">Email</label>
					<input type="email" value={creadentials.email} name="email" onChange={onChange} placeholder="" className={styles.fields} />

					<label htmlFor="Password">Password</label>
					<input type="password" value={creadentials.password} name="password" onChange={onChange} placeholder="" className={styles.fields} />

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
				</form>
				{error && <div className={styles.error}>{error}</div>}
			</div>
		</>
	);
};

export default AdminLogin;
