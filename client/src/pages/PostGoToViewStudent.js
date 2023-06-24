import React, { useState, useEffect, useRef } from "react";
import styles from "../stylesheets/chat.module.css";
import dashboardlogo from "../assets/navbarlogo.png";
import { useNavigate, Link, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import subicon from "../assets/send.png";
import styles2 from "../stylesheets/gotoview.module.css";

import searchicon from "../assets/search.png";

const PostGoToViewStudent = () => {
	const { findhashtag } = useParams();

	var decoded = jwt_decode(localStorage.getItem("Token"));
	const userId = decoded.id;

	const [postdet, setpostdet] = useState({ hastag: "", caption: "", pid: "", owner: "" });
	const [imgurl, setimgurl] = useState(null);
	const [error, seterror] = useState(null);
	const [comments, setcomments] = useState(null);
	const [newcomm, setnewcomm] = useState("");
	const [arr, setArr] = useState([{}]);
	const [fetchedComments, setFetchedComments] = useState(false);
	const [checked, setChecked] = useState(false);
	const [searchError, setSearchError] = useState(null);
	const [gohash, setgohash] = useState("");

	useEffect(() => {
		async function getpost() {
			const response = await fetch(`/api/post/getpost/${findhashtag}`, {
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
				setimgurl(json.imgurl);
				setpostdet({ hashtag: json.rpost.hashtag, caption: json.rpost.caption, pid: json.postid, owner: json.rpost.doubtaskedby });
				setChecked(json.solv);
			}
		}

		getpost();
	}, []);

	const commentsRef = useRef(null);

	useEffect(() => {
		commentsRef.current.scrollTo(0, commentsRef.current.scrollHeight);
	}, [arr]);

	useEffect(() => {
		async function getcomments() {
			const response = await fetch(`/api/comment/getall/${postdet.pid}`, {
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
				setcomments(json.data);
				console.log(json.data);
			}
		}

		if (postdet.pid && !fetchedComments) {
			getcomments();
			setFetchedComments(true);
		}

		setArr(comments);
	});

	const toggleButton = async (e) => {
		var checkbox = document.getElementById("toggle");
		setChecked(!checked);
		//kd loader daal idr
		const response = await fetch(`/api/post/changsolv/${findhashtag}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const json = await response.json();

		if (json.error) {
			seterror(json.error);
		}

		//idr if(json.success){loader band}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch(`/api/comment/create/student/${postdet.pid}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ cont: newcomm }),
		});

		const json = await response.json();

		if (json.error) {
			seterror(json.error);
			setTimeout(() => {
				seterror(null);
			}, 4000);
		}

		if (json.success) {
			setnewcomm("");
			navigate(0);
		}
	};

	const handleinput = (e) => {
		e.preventDefault();
		setnewcomm(e.target.value);
	};

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
					<form className={styles.gotohash}>
						<input type="number" placeholder="Go to hashtag" onChange={hello} className={styles2.sidform}></input>
						<button className={styles2.formbutton}>
							<img src={searchicon} className={styles2.srchimg} onClick={srch} />
						</button>
					</form>
					{searchError && (
						<button className={styles2.searcherrorbtn} style={{ marginTop: "1rem" }}>
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

			<div className={styles.right}>
				<h3 className={styles2.roomname}>#{findhashtag}</h3>
				<div className={styles2.dispimg}>
					<p className={styles2.txt}>Description :</p>
					<br />
					<p className={styles2.caption} style={{ fontSize: 17, marginLeft: "2vh" }}>
						{postdet.caption}
					</p>
					<div className={styles2.something}>
						<p className={styles2.txt}>Image :</p>
						<div className={styles2.dispdiv}>
							<img src={imgurl} className={styles2.previmg} alt="" />
						</div>
					</div>
				</div>
				{error && <div>{error}</div>}
			</div>

			<div className={styles2.rightmost}>
				{userId === postdet.owner ? (
					<div className={styles2.headingcomm}>
						<div className={styles2.nums2}>
							<b className={styles2.nums}>Comments</b>
						</div>
						<div className={styles2.toggleSwitch}>
							<p className={styles2.solv}>Solved ?</p>
							<label htmlFor="toggle" className={styles2.togglebutton}>
								<input type="checkbox" id="toggle" onChange={toggleButton} checked={checked} className={styles2.hidehim} />
								<span className={styles2.togglebuttonSlider} style={{ left: checked ? "30px" : "4px", backgroundColor: checked ? "#7fff7f" : "#ff7f7f" }}></span>
							</label>
						</div>
					</div>
				) : (
					<div className={styles2.nums3}>
						<b>Comments</b>
					</div>
				)}

				<div className={styles2.poster} ref={commentsRef}>
					<div className={styles2.entertxt}>
						{arr && (
							<div>
								{arr.map((comment, idx) => (
									<div key={idx} className={styles.contrast}>
										<div className={styles2.comm} style={{ marginLeft: comment.commentedbyme ? "27%" : "-5%" }}>
											{comment.commentedbyme && <div className={styles2.inner2}></div>}
											{!comment.commentedbyme && comment.commentedby && (
												<div className={styles2.inner}>
													<p>
														{" "}
														<b>{comment.commentedby.name}</b>
													</p>
													<p>{comment.commentedby.toparea.join(", ")}</p>
												</div>
											)}
											<div className={styles2.commcon}>
												<p>{comment.content}</p>
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				{userId === postdet.owner && (
					<form onSubmit={handleSubmit}>
						<input className={styles2.sub} placeholder="Let's Discuss!" onChange={handleinput} value={newcomm} />
						<button className={styles2.uploadbutton}>
							<img src={subicon} className={styles2.butimgdiv} alt="" />
						</button>
					</form>
				)}
			</div>
		</React.Fragment>
	);
};

export default PostGoToViewStudent;
