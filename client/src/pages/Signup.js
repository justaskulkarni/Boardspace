import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "../stylesheets/MentorAuth.module.css";
import navbarlogo from "../assets/navbarlogo.png";

const Signup = () => {
	const [credentials, setCredentials] = useState({ email: "", otp: "", name: "" });
	const [error, setError] = useState(null);
	const [showOtpDiv, setShowOtpDiv] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	let navigate = useNavigate();

	// Logout from navbar.js
	const handleLogout = () => {
		localStorage.removeItem("Token");
		navigate("/");
	};

	const handleSubmit1 = async (e) => {
		e.preventDefault();

		// show loading sign
		setIsLoading(true);

		const response = await fetch("/api/mentor/semisignup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: credentials.email, name: credentials.name }),
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

		if (json.success) {
			setIsLoading(false);
			setShowOtpDiv(true);
		}

		if (json.error) {
			setIsLoading(false);
			setError(json.error);
			setCredentials({
				email: "",
				otp: "",
				name: "",
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

	const handleSubmit2 = async (e) => {
		e.preventDefault();

		// show loading sign
		setIsLoading(true);

		const response = await fetch("/api/mentor/verifyotp", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: credentials.email, otp: credentials.otp }),
		});

		const json = await response.json();

		if (json.success) {
			setIsLoading(false);
			navigate("/complete_details", {
				state: {
					email: credentials.email,
				},
			});
		}

		if (json.error) {
			setIsLoading(false);
			setError(json.error);
			setTimeout(() => {
				setError(null);
			}, 4000);
			setTimeout(() => {
				setIsLoading(false);
			}, 500);
		}
	};

	return (
		<>
			<div className={styles.outerdiv}>
				<div className={styles.navlogo}>
					<Link to="/">
						<img className={styles.navimgdiv} src={navbarlogo} alt="" />
					</Link>
				</div>
				<div className={styles.buttons}>
					{localStorage.getItem("Token") ? (
						<button className={styles.tail} onClick={handleLogout}>
							Logout
						</button>
					) : (
						<>
							<button className={styles.tail}>
								<Link className={styles.link1} to="/login">
									Mentor
								</Link>
							</button>
							<button className={styles.tail}>
								<Link className={styles.link1} to="/student/login">
									Student
								</Link>
							</button>
						</>
					)}
					<button className={"tail"}>
						<Link className={"link1"} to="/ourteam">
							Our Team
						</Link>
					</button>
				</div>
			</div>

			<div className={styles.colordiv}>
				<div className={styles.colour1}></div>
			</div>
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
						<br />
						<input type="text" value={credentials.name} name="name" onChange={onChange} placeholder="" className={styles.fields} />
						<br />
						<label htmlFor="Email">Email</label>
						<br />
						<input type="email" value={credentials.email} name="email" onChange={onChange} placeholder="" className={styles.fields} />

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
						{error && <div className={styles.error}>{error}</div>}
					</form>
				</div>
			)}
			<div>
				{showOtpDiv && (
					<div className={styles.signupform}>
						<h3 className={styles.login}>Enter OTP</h3>
						<div className={styles.success}>OTP sent on email</div>
						<form className={styles.forms} onSubmit={handleSubmit2}>
							{/* <label htmlFor="otp">Enter OTP</label> */}
							<input type="number" value={credentials.otp} name="otp" onChange={onChange} placeholder="" className={styles.fields} />
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
										<span className={styles.logintext}>Submit OTP</span>
									</button>
								)}
							</div>
							{error && <div className={styles.error}>{error}</div>}
						</form>
					</div>
				)}
			</div>
		</>
	);
};

export default Signup;
