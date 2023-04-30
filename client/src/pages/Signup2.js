import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import uploadicon from "../assets/upload.png";
import subicon from "../assets/submitdoc.png";
import styles from "../stylesheets/MentorAuth2.module.css";

const Signup2 = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [error, setError] = useState(null);
	const topper = [];
	const [details, setDetails] = useState({ password: "", email: location.state.email });

	const [isNeetTopper, setNeet] = useState({ enabled: false, file: false, disable: false });
	const [isJeeTopper, setJee] = useState({ enabled: false, file: false, disable: false });
	const [isBoardTopper, setBoard] = useState({ enabled: false, file: false, disable: false });
	const [isMasters, setMaster] = useState({ enabled: false, file: false, disable: false });
	const [isPHD, setPHD] = useState({ enabled: false, file: false, disable: false });

	const neetd = useRef(null);
	const jeed = useRef(null);
	const boardd = useRef(null);
	const mastd = useRef(null);
	const phdd = useRef(null);

	const onChange1 = (event) => {
		setDetails({ ...details, [event.target.name]: event.target.value });
	};

	const upload = async (exe, field) => {
		let data = new FormData();
		data.append("image", exe);
		data.append("field", field);
		const response = await fetch(`/api/mentor/addurl/${details.email}`, {
			method: "POST",
			body: data,
		});

		const json = await response.json();

		if (json.error) {
			setError(json.error);
		}
	};

	const checkkarobt = () => {
		if (isBoardTopper.enabled && !isBoardTopper.disable) {
			return false;
		}

		if (isJeeTopper.enabled && !isJeeTopper.disable) {
			return false;
		}

		if (isMasters.enabled && !isMasters.disable) {
			return false;
		}

		if (isNeetTopper.enabled && !isNeetTopper.disable) {
			return false;
		}

		if (isPHD.enabled && !isPHD.disable) {
			return false;
		}

		return true;
	};

	const onChange2 = async () => {
		setNeet({ ...isNeetTopper, enabled: !isNeetTopper.enabled });
	};

	const onChange2a = (event) => {
		let file1 = event.target.files[0];
		neetd.current = file1;
		document.getElementById("filename2a").textContent = file1.name;
		setNeet({ ...isNeetTopper, file: true });
	};

	const onChange3 = () => {
		setBoard({ ...isBoardTopper, enabled: !isBoardTopper.enabled });
	};

	const onChange3a = (event) => {
		let file1 = event.target.files[0];
		boardd.current = file1;
		document.getElementById("filename3a").textContent = file1.name;
		setBoard({ ...isBoardTopper, file: true });
	};

	const onChange4 = () => {
		setJee({ ...isJeeTopper, enabled: !isJeeTopper.enabled });
	};

	const onChange4a = (event) => {
		let file1 = event.target.files[0];
		jeed.current = file1;
		document.getElementById("filename4a").textContent = file1.name;
		setJee({ ...isJeeTopper, file: true });
	};

	const onChange5 = () => {
		setMaster({ ...isMasters, enabled: !isMasters.enabled });
	};

	const onChange5a = (event) => {
		let file1 = event.target.files[0];
		mastd.current = file1;
		document.getElementById("filename5a").textContent = file1.name;
		setMaster({ ...isMasters, file: true });
	};

	const onChange6 = () => {
		setPHD({ ...isPHD, enabled: !isPHD.enabled });
	};

	const onChange6a = (event) => {
		let file1 = event.target.files[0];
		phdd.current = file1;
		document.getElementById("filename6a").textContent = file1.name;
		setPHD({ ...isPHD, file: true });
	};

	const handleSubmit2 = async (e) => {
		e.preventDefault();

		if (isBoardTopper.enabled) {
			topper.push("Board Topper");
		}

		if (isJeeTopper.enabled) {
			topper.push("JEE Topper");
		}

		if (isMasters.enabled) {
			topper.push("Masters");
		}

		if (isNeetTopper.enabled) {
			topper.push("Neet Topper");
		}

		if (isPHD.enabled) {
			topper.push("PHD");
		}

		if (topper.length === 0) {
			setError("Select atleast one field");
			return error;
		}

		const check = checkkarobt();

		if (check) {
			const response = await fetch("/api/mentor/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: details.email, password: details.password, topper: topper }),
			});

			const json = await response.json();

			if (json.success) {
				navigate("/notaccepted", {
					state: {
						message: json.mssg,
					},
				});
			}

			if (json.error) {
				setError(json.error);
			}
		} else {
			setError("Kindly upload all the documents");
			return error;
		}
	};

	const handleSubmit3 = async (e) => {
		e.preventDefault();
		setBoard({ ...isBoardTopper, disable: true });
		await upload(boardd.current, "Board");
	};

	const handleSubmit4 = async (e) => {
		e.preventDefault();
		setJee({ ...isJeeTopper, disable: true });
		await upload(jeed.current, "JeeTopper");
	};

	const handleSubmit5 = async (e) => {
		e.preventDefault();
		setNeet({ ...isNeetTopper, disable: true });
		await upload(neetd.current, "NeetTopper");
	};

	const handleSubmit6 = async (e) => {
		e.preventDefault();
		setMaster({ ...isMasters, disable: true });
		await upload(mastd.current, "Masters");
	};

	const handleSubmit7 = async (e) => {
		e.preventDefault();
		setPHD({ ...isPHD, disable: true });
		await upload(phdd.current, "PHD");
	};

	// Show/hide Password
	// const togglePassword = document.querySelector("#togglePassword");
	// const password = document.querySelector("#id_password");

	// togglePassword.addEventListener("click", function (e) {
	// 	// toggle the type attribute
	// 	const type = password.getAttribute("type") === "password" ? "text" : "password";
	// 	password.setAttribute("type", type);
	// 	// toggle the eye slash icon
	// 	this.classList.toggle("fa-eye-slash");
	// });

	return (
		<>
			<div>
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" />

				<Navbar />
				<div className={styles.colordiv}>
					<div className={styles.colour1}></div>
				</div>
				<div className={styles.signupform}>
					<h3 className={styles.login}>Enter your Details </h3>

					{error && <div className={styles.error}>{error}</div>}
					<form onSubmit={handleSubmit2} encType="multipart/form">
						<div>
							<label htmlFor="Password" className={styles.password}>
								Password
							</label>
							<br />
							<input type="password" value={details.password} name="password" onChange={onChange1} placeholder="" className={styles.fields} id="id_password" />
							<i class="far fa-eye" id="togglePassword" style={{ marginLeft: "-1.875rem", cursor: "pointer" }}></i>

							<label htmlFor="boardtopper" className={styles.checkboxstyle}>
								<input type="checkbox" defaultChecked={false} value={"Board Topper"} onChange={onChange3} name="Board Topper" className={styles.boxstyle} disabled={isBoardTopper.disable} />
								<p className={styles.Category}>Board Topper</p>
								{isBoardTopper.enabled && !isBoardTopper.disable && (
									<div className={styles.fileinput}>
										<label htmlFor="boardtop">
											<img src={uploadicon} className={styles.butimgdiv} alt=" "></img>
											<input type="file" className={styles.filefield} id="boardtop" onChange={onChange3a} />
										</label>
										<p className={styles.filename} id="filename3a"></p>
										{isBoardTopper.file && (
											<button className={styles.uploadbutton} onClick={handleSubmit3}>
												<img src={subicon} className={styles.butimgdiv} alt=" "></img>
											</button>
										)}
									</div>
								)}
							</label>
							<label htmlFor="jeetopper" className={styles.checkboxstyle}>
								<input type="checkbox" defaultChecked={false} value={"JEE Topper"} onChange={onChange4} name="JEE Topper" className={styles.boxstyle} disabled={isJeeTopper.disable} />
								<p className={styles.Category}>JEE Topper</p>
								{isJeeTopper.enabled && !isJeeTopper.disable && (
									<div className={styles.fileinput}>
										<label htmlFor="jeetop">
											<img src={uploadicon} className={styles.butimgdiv} alt=" "></img>
											<input type="file" className={styles.filefield} id="jeetop" onChange={onChange4a} />
										</label>
										<p className={styles.filename} id="filename4a"></p>
										{isJeeTopper.file && (
											<button className={styles.uploadbutton} onClick={handleSubmit4}>
												<img src={subicon} className={styles.butimgdiv} alt=" "></img>
											</button>
										)}
									</div>
								)}
							</label>
							<label htmlFor="neettopper" className={styles.checkboxstyle}>
								<input type="checkbox" defaultChecked={false} value={"Neet Topper"} onChange={onChange2} name="Neet Topper" className={styles.boxstyle} disabled={isNeetTopper.disable} />
								<p className={styles.Category}>NEET Topper</p>
								{isNeetTopper.enabled && !isNeetTopper.disable && (
									<div className={styles.fileinput}>
										<label htmlFor="neettop">
											<img src={uploadicon} className={styles.butimgdiv} alt=" "></img>
											<input type="file" className={styles.filefield} id="neettop" onChange={onChange2a} />
										</label>
										<p className={styles.filename} id="filename2a"></p>
										{isNeetTopper.file && (
											<button className={styles.uploadbutton} onClick={handleSubmit5}>
												<img src={subicon} className={styles.butimgdiv} alt=" "></img>
											</button>
										)}
									</div>
								)}
							</label>
							<label htmlFor="masters" className={styles.checkboxstyle}>
								<input type="checkbox" defaultChecked={false} value={"Masters"} onChange={onChange5} name="Masters" className={styles.boxstyle} disabled={isMasters.disable} />
								<p className={styles.Category}>Masters Student</p>
								{isMasters.enabled && !isMasters.disable && (
									<div className={styles.fileinput}>
										<label htmlFor="masttop">
											<img src={uploadicon} className={styles.butimgdiv} alt=" "></img>
											<input type="file" className={styles.filefield} id="masttop" onChange={onChange5a} />
										</label>
										<p className={styles.filename} id="filename5a"></p>
										{isMasters.file && (
											<button className={styles.uploadbutton} onClick={handleSubmit6}>
												<img src={subicon} className={styles.butimgdiv} alt=" "></img>
											</button>
										)}
									</div>
								)}
							</label>
							<label htmlFor="phd" className={styles.checkboxstyle}>
								<input type="checkbox" defaultChecked={false} value={"PHD"} onChange={onChange6} name="PHD" className={styles.boxstyle} disabled={isPHD.disable} />
								<p className={styles.Category}>PHD Student</p>
								{isPHD.enabled && !isPHD.disable && (
									<div className={styles.fileinput}>
										<label htmlFor="phdtop">
											<img src={uploadicon} className={styles.butimgdiv} alt=" "></img>
											<input type="file" className={styles.filefield} id="phdtop" onChange={onChange6a} />
										</label>
										<p className={styles.filename} id="filename6a"></p>
										{isPHD.file && (
											<button className={styles.uploadbutton} onClick={handleSubmit7}>
												<img src={subicon} className={styles.butimgdiv} alt=" "></img>
											</button>
										)}
									</div>
								)}
							</label>
						</div>
						<br />
						<div>
							<button className={styles.loginbutton}>
								<span className={styles.logintext}>Submit</span>
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Signup2;
