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
			{/* <div className={styles.wrapper}> */}
			{/* <div className={styles.mostout}> */}
			<div className={styles.colour1}></div>
			<h3 className={styles.login}>Sign Up</h3>
			<h6 className={styles.newsignup}>
				Already a Member?{" "}
				<Link to="/student/login" className={styles.signupclick}>
					Log In
				</Link>
			</h6>
			{!showOtpDiv && (
				<form className={styles.signup} onSubmit={handleSubmit1}>
					<div className={styles.formcontent}>
						<input type="text" value={credentials.name} name="name" onChange={onChange} placeholder="Name" className={styles.inputbox} />

						<input type="email" value={credentials.email} name="email" onChange={onChange} placeholder="Email" className={styles.inputbox} />
					</div>
					<div className={styles.buttonscontainer}>
						<button className={styles.loginbutton}>SignUp</button>
						<button className={styles.signupbutton}>
							<Link className={styles.lol} to={"/login"}>
								Login
							</Link>
						</button>
					</div>
				</form>
			)}

			{/*  */}

			{/* {showOtpDiv && (
							<div>
								<form className={styles.signup} onSubmit={handleSubmit2}>
									<h3 className={styles.formheader}>
										<span className={styles.headertext}>Enter your OTP</span>
									</h3>
									<div className={styles.formcontent}>
										<input type="number" value={credentials.otp} name="otp" onChange={onChange} placeholder="OTP" className={styles.inputbox} />
									</div>
									<button className={styles.signupbutton}>Submit OTP</button>
								</form>
							</div>
						)}
						{error && <div className={styles.error}>{error}</div>}
					</div> */}
			{/* </div> */}
			{/* </div> */}
		</>
	);
};

export default Signup;
