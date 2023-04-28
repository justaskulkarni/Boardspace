import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "../stylesheets/MentorAuth.module.css";

const Signup = () => {
	const [credentials, setCredentials] = useState({ email: "", otp: "", name: "" });
	const [error, setError] = useState(null);
	const [showOtpDiv, setShowOtpDiv] = useState(false);

	let navigate = useNavigate();

	const handleSubmit1 = async (e) => {
		e.preventDefault();

		const response = await fetch("http://localhost:6100/api/mentor/semisignup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: credentials.email, name: credentials.name }),
		});

		const json = await response.json();

		if (json.noverify) {
			navigate("/notaccepted", {
				state: {
					message: json.noverify,
				},
			});
		}

		if (json.isOtpVerified) {
			localStorage.setItem("Token", json.authToken);
			navigate("/youin");
		}

		if (json.success) {
			setShowOtpDiv(true);
		}

		if (json.error) {
			setError(json.error);
			setCredentials({
				email: "",
				otp: "",
				name: "",
			});
			setTimeout(() => {
				setError(null);
			}, 4000);
		}
	};

	const onChange = (event) => {
		setCredentials({ ...credentials, [event.target.name]: event.target.value });
	};

	const handleSubmit2 = async (e) => {
		e.preventDefault();

		const response = await fetch("http://localhost:6100/api/mentor/verifyotp", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: credentials.email, otp: credentials.otp }),
		});

		const json = await response.json();

		if (json.success) {
			navigate("/complete_details", {
				state: {
					email: credentials.email,
				},
			});
		}

		if (json.error) {
			setError(json.error);
			setTimeout(() => {
				setError(null);
			}, 4000);
		}
	};

	return (
		<>
			<Navbar />
			<div className={styles.colour1}></div>
			{!showOtpDiv && (
				<div className={styles.signupform}>
					<h3 className={styles.login}>Sign Up</h3>
					<h6 className={styles.newsignup}>
						Already a Member?{" "}
						<Link to="/login" className={styles.signupclick}>
							Log In
						</Link>
					</h6>
					<form className={styles.forms} onSubmit={handleSubmit1}>
						<label htmlFor="Name">Name</label>
						<input type="text" value={credentials.name} name="name" onChange={onChange} placeholder="" className={styles.fields} />

						<label htmlFor="Email">Email</label>
						<input type="email" value={credentials.email} name="email" onChange={onChange} placeholder="" className={styles.fields} />

						<div>
							<button className={styles.loginbutton}>
								<span className={styles.logintext}>Sign Up</span>
							</button>
						</div>
					</form>
				</div>
			)}

			{/*  */}

			<div>
				{showOtpDiv && (
					<div className={styles.signupform}>
						<h3 className={styles.login}>Enter your OTP</h3>
						{/* <div className={styles.formcontent}> */}
						<form className={styles.forms} onSubmit={handleSubmit2}>
							<label htmlFor="otp">Enter OTP</label>
							<input type="number" value={credentials.otp} name="otp" onChange={onChange} placeholder="" className={styles.fields} />
							<button className={styles.loginbutton}>
								<span className={styles.logintext}>Submit OTP</span>{" "}
							</button>
						</form>
						{/* </div> */}
					</div>
				)}
			</div>
			{error && <div className={styles.error}>{error}</div>}
		</>
	);
};

export default Signup;
