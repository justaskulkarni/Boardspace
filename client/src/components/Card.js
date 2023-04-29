import React, { useState, useEffect } from "react";
import ImageSlider from "./ImageSlider";
import styles from "../stylesheets/card.module.css";
import styles2 from "../stylesheets/imageslider.module.css";
import document from "../assets/document.png";
import verify from "../assets/verify.png";
import noverify from "../assets/noverify.png";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router-dom";

const Card = ({ mentid }) => {
	const [error, setError] = useState(null);
	const [creadentials, setCredentials] = useState({ email: "", mname: "", topper: "" });
	const [imags, setImgarr] = useState([]);

	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => {
		setIsOpen(true);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		const getdata = async () => {
			const response = await fetch(`http://localhost:6100/api/admin/mentor/dets/${mentid}`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});

			const json = await response.json();

			if (json.success) {
				setCredentials({ email: json.mentdets.email, mname: json.mentdets.name, topper: json.mentdets.toparea.join(" , ") });
				setImgarr(...imags, json.mentdets.idurl);
			}

			if (json.error) {
				setError(json.error);
			}
		};

		getdata();
	}, []);

	let navigate = useNavigate();

	const getverify = async () => {
		const response = await fetch(`http://localhost:6100/api/admin/verify/mentor/${mentid}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
		});

		const json = await response.json();

		if (json.error) {
			setError(json.error);
		}
	};

	const [reason, setreason] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const response = await fetch(`http://localhost:6100/api/admin/reject/mentor/${mentid}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ reason: reason }),
		});

		const json = await response.json();

		if (json.success) {
			navigate("/admin/landing");
		}

		if (json.error) {
			setError(json.error);
		}
	};

	const onentertxt = (event) => {
		setreason(event.target.value);
	};

	return (
		<div className={styles.cardstyle}>
			<form onSubmit={handleSubmit} className={styles.popform}>
				<input type="text" className={styles.popinput} onChange={onentertxt} value={reason} placeholder="" />
				<button className={styles.popsubmit}>Submit</button>
			</form>
			<br />

			<div className={styles.statscontainer}>
				<div className={styles.innerdiv}>
					<div className={styles.innermost1}>
						<p className={styles.cardcontent}>Name: {creadentials.mname}</p>
						<p className={styles.cardcontent}>Email: {creadentials.email} </p>
						<p className={styles.cardcontent}>Applied for: {creadentials.topper} </p>
					</div>
					<div className={styles.innermost}>
						<div className={styles.btncontainer}>
							<button className={styles.verifybutton} onClick={handleOpen}>
								<img src={document} className={styles.butimgdiv}></img>
							</button>
							<button className={styles.verifybutton} onClick={() => getverify()}>
								<img src={verify} className={styles.butimgdiv}></img>
							</button>
							<Popup
								trigger={
									<button className={styles.verifybutton}>
										<img src={noverify} className={styles.butimgdiv}></img>
									</button>
								}
								position="centre"
							>
								<form onSubmit={handleSubmit} className={styles.popform}>
									<input type="text" className={styles.popinput} onChange={onentertxt} value={reason} placeholder="" />
									<button className={styles.popsubmit}>Submit</button>
								</form>
							</Popup>
						</div>
					</div>
				</div>
			</div>
			{isOpen && (
				<div className={styles2.popupcontainer}>
					<div className={styles2.popup}>
						<button onClick={handleClose}>Close</button>
						<ImageSlider imgarr={imags} />
					</div>
				</div>
			)}
			{error && <div className={styles.error}>{error}</div>}
		</div>
	);
};

export default Card;
