import React, { useState, useEffect } from "react";
import styles from "../stylesheets/chat.module.css";
import dashboardlogo from "../assets/navbarlogo.png";
import { useNavigate, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

import styles2 from "../stylesheets/postpost.module.css";
import styles3 from "../stylesheets/gotoview.module.css";
import searchicon from "../assets/search.png";

const PostViewStudent = () => {
	var decoded = jwt_decode(localStorage.getItem("Token"));
	const userId = decoded.id;

	const [error, seterror] = useState(null);
	const [jeepost, setjeepost] = useState([]);
	const [icsepost, seticsepost] = useState([]);
	const [sscpost, setsscpost] = useState([]);
	const [igcsepost, setigcsepost] = useState([]);
	const [cbsepost, setcbsepost] = useState([]);
	const [iscpost, setiscpost] = useState([]);
	const [ibpost, setibpost] = useState([]);
	const [hscpost, sethscpost] = useState([]);
	const [neetpost, setneetpost] = useState([]);
	const [searchError, setSearchError] = useState(null);
	const [gohash, setgohash] = useState("");

	const getalldoubts = async () => {
		const response = await fetch(`/api/post/getallpost/student/${userId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const json = await response.json();

		if (json.error) {
			seterror(json.error);
		}

		if (json.success) {
			setjeepost(json.jeep);
			setneetpost(json.neetp);
			seticsepost(json.icsep);
			setsscpost(json.sscp);
			setcbsepost(json.cbsep);
			setiscpost(json.iscp);
			setibpost(json.ibp);
			sethscpost(json.hscp);
			setigcsepost(json.igcsep);
		}
	};

	useEffect(() => {
		getalldoubts();
	}, [userId, jeepost, neetpost, cbsepost, sscpost, icsepost, iscpost, ibpost, hscpost, igcsepost]);

	const hello = (e) => {
		e.preventDefault();
		setgohash(e.target.value);
	};

	let navigate = useNavigate();

	const srch = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`/api/post/isValid/${gohash}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const json = await response.json();

			if (json.success) {
				navigate(`/student/view/${gohash}`);
				navigate(0);
			} else {
				setSearchError("Hashtag invalid");

				setTimeout(() => {
					setSearchError(null);
				}, 4000);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const navigatepost = (hashtag) => {
		navigate(`/student/view/${hashtag}`);
	};

	const handleLogout = () => {
		localStorage.removeItem("Token");
		navigate("/");
		navigate(0);
	};

	const gotopost = () => {
		navigate("/student/post");
	};

	const gotochat = () => {
		navigate("/student/chat");
	};

	const viewdoubt = () => {
		navigate("/student/view");
	};

	return (
		<React.Fragment>
			<div className={styles.column + " " + styles.left}>
				<Link to="/">
					<img className={styles.imgstyle} src={dashboardlogo} alt="" />
				</Link>
				<div className={styles.smallcardleftnew}>
					<button className={styles.leftbuttonnew} onClick={gotochat}>
						<span className={styles.notificationsnew}>Chat</span>
					</button>
					<button className={styles.leftbuttonnew} onClick={gotopost}>
						<span className={styles.notificationsnew}>Post Doubt</span>
					</button>
					<button className={styles.leftbuttonnew} onClick={viewdoubt}>
						<span className={styles.notificationsnew}>View Doubt</span>
					</button>
					<div className={styles.hoverup}>
						<form className={styles.gotohash}>
							<input type="number" placeholder="Go to hashtag" onChange={hello} className={styles3.sidform}></input>
							<button className={styles3.formbutton}>
								<img src={searchicon} className={styles3.srchimg} onClick={srch} alt=""/>
							</button>
						</form>
					</div>
					<div className={styles.popup}>
						<div className={styles.arrow}></div>
						<div className={styles.popuptxt}>Search your doubt using hashtag</div>
					</div>
					{searchError && (
						<button className={styles3.searcherrorbtn} style={{ marginTop: "1rem" }}>
							{searchError}
						</button>
					)}
				</div>
				{localStorage.getItem("Token") && (
					<button className={styles.logoutbtn} onClick={handleLogout}>
						<span className={styles.welcometext2}>Logout</span>
					</button>
				)}
			</div>

			<div className={styles2.space}>
				<div className={styles2.hdtxt}>
					<p className={styles.roomname}>All Doubts</p>
				</div>
				{error && <div>{error}</div>}
				<div className={styles2.box}>
					{jeepost.length > 0 && (
						<div className={styles2.boxes}>
							<div className={styles2.intxt}>
								{" "}
								<b>JEE Doubts</b>{" "}
							</div>
							<div className={styles2.bxcont}>
								{jeepost.map((elem) => {
									return (
										<div className={styles2.hashdiv}>
											<button onClick={() => navigatepost(elem.hashtag)} className={styles2.aplebtn}>
												{elem.solved ? (
													<p>
														<s>{elem.caption}</s>
													</p>
												) : (
													<p>{elem.caption}</p>
												)}
												#{elem.hashtag}
											</button>
										</div>
									);
								})}
							</div>
						</div>
					)}
					{cbsepost.length > 0 && (
						<div className={styles2.boxes}>
							<div className={styles2.intxt}>
								{" "}
								<b>CBSE</b>{" "}
							</div>
							<div className={styles2.bxcont}>
								{cbsepost.map((elem) => {
									return (
										<div className={styles2.hashdiv}>
											<button onClick={() => navigatepost(elem.hashtag)} className={styles2.aplebtn}>
												{elem.solved ? (
													<p>
														<s>{elem.caption}</s>
													</p>
												) : (
													<p>{elem.caption}</p>
												)}
												#{elem.hashtag}
											</button>
										</div>
									);
								})}
							</div>
						</div>
					)}
					{neetpost.length > 0 && (
						<div className={styles2.boxes}>
							<div className={styles2.intxt}>
								{" "}
								<b>Neet</b>{" "}
							</div>
							<div className={styles2.bxcont}>
								{neetpost.map((elem) => {
									return (
										<div className={styles2.hashdiv}>
											<button onClick={() => navigatepost(elem.hashtag)} className={styles2.aplebtn}>
												{elem.solved ? (
													<p>
														<s>{elem.caption}</s>
													</p>
												) : (
													<p>{elem.caption}</p>
												)}
												#{elem.hashtag}
											</button>
										</div>
									);
								})}
							</div>
						</div>
					)}
					{sscpost.length > 0 && (
						<div className={styles2.boxes}>
							<div className={styles2.intxt}>
								{" "}
								<b>SSC</b>{" "}
							</div>
							<div className={styles2.bxcont}>
								{sscpost.map((elem) => {
									return (
										<div className={styles2.hashdiv}>
											<button onClick={() => navigatepost(elem.hashtag)} className={styles2.aplebtn}>
												{elem.solved ? (
													<p>
														<s>{elem.caption}</s>
													</p>
												) : (
													<p>{elem.caption}</p>
												)}
												#{elem.hashtag}
											</button>
										</div>
									);
								})}
							</div>
						</div>
					)}
					{hscpost.length > 0 && (
						<div className={styles2.boxes}>
							<div className={styles2.intxt}>
								{" "}
								<b>HSC</b>{" "}
							</div>
							<div className={styles2.bxcont}>
								{hscpost.map((elem) => {
									return (
										<div className={styles2.hashdiv}>
											<button onClick={() => navigatepost(elem.hashtag)} className={styles2.aplebtn}>
												{elem.solved ? (
													<p>
														<s>{elem.caption}</s>
													</p>
												) : (
													<p>{elem.caption}</p>
												)}
												#{elem.hashtag}
											</button>
										</div>
									);
								})}
							</div>
						</div>
					)}
					{icsepost.length > 0 && (
						<div className={styles2.boxes}>
							<div className={styles2.intxt}>
								{" "}
								<b>ICSE</b>{" "}
							</div>
							<div className={styles2.bxcont}>
								{icsepost.map((elem) => {
									return (
										<div className={styles2.hashdiv}>
											<button onClick={() => navigatepost(elem.hashtag)} className={styles2.aplebtn}>
												{elem.solved ? (
													<p>
														<s>{elem.caption}</s>
													</p>
												) : (
													<p>{elem.caption}</p>
												)}
												#{elem.hashtag}
											</button>
										</div>
									);
								})}
							</div>
						</div>
					)}
					{igcsepost.length > 0 && (
						<div className={styles2.boxes}>
							<div className={styles2.intxt}>
								{" "}
								<b>IGCSE</b>{" "}
							</div>
							<div className={styles2.bxcont}>
								{igcsepost.map((elem) => {
									return (
										<div className={styles2.hashdiv}>
											<button onClick={() => navigatepost(elem.hashtag)} className={styles2.aplebtn}>
												{elem.solved ? (
													<p>
														<s>{elem.caption}</s>
													</p>
												) : (
													<p>{elem.caption}</p>
												)}
												#{elem.hashtag}
											</button>
										</div>
									);
								})}
							</div>
						</div>
					)}
					{ibpost.length > 0 && (
						<div className={styles2.boxes}>
							<div className={styles2.intxt}>
								{" "}
								<b>IB</b>{" "}
							</div>
							<div className={styles2.bxcont}>
								{ibpost.map((elem) => {
									return (
										<div className={styles2.hashdiv}>
											<button onClick={() => navigatepost(elem.hashtag)} className={styles2.aplebtn}>
												{elem.solved ? (
													<p>
														<s>{elem.caption}</s>
													</p>
												) : (
													<p>{elem.caption}</p>
												)}
												#{elem.hashtag}
											</button>
										</div>
									);
								})}
							</div>
						</div>
					)}
					{iscpost.length > 0 && (
						<div className={styles2.boxes}>
							<div className={styles2.intxt}>
								{" "}
								<b>ISC</b>{" "}
							</div>
							<div className={styles2.bxcont}>
								{iscpost.map((elem) => {
									return (
										<div className={styles2.hashdiv}>
											<button onClick={() => navigatepost(elem.hashtag)} className={styles2.aplebtn}>
												{elem.solved ? (
													<p>
														<s>{elem.caption}</s>
													</p>
												) : (
													<p>{elem.caption}</p>
												)}
												#{elem.hashtag}
											</button>
										</div>
									);
								})}
							</div>
						</div>
					)}
				</div>
			</div>
		</React.Fragment>
	);
};

export default PostViewStudent;
