import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Navbar from '../components/Navbar'
import uploadicon from '../assets/upload.png'
import styles from '../stylesheets/signup2.module.css'

const Signup2 = () => {

  const location = useLocation()
  const navigate = useNavigate()

  const cloudinaryRef = useRef()
  const widgetRef = useRef()

  const [error, setError] = useState(null)
  const topper = []
  const [details, setDetails] = useState({ password: "", email: location.state.email })

  const [count, setcount] = useState(0)

  const [isNeetTopper, setNeet] = useState(false)
  const [isJeeTopper, setJee] = useState(false)
  const [isBoardTopper, setBoard] = useState(false)
  const [isMasters, setMaster] = useState(false)
  const [isPHD, setPHD] = useState(false)

  const onChange1 = (event) => {
    setDetails({ ...details, [event.target.name]: event.target.value })
  }

  const upload = async (surl) => {
    const response = await fetch(`http://localhost:6100/api/mentor/addurl/${details.email}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: surl })
    })

    const json = await response.json()

    if (json.error) {
      setError(json.error)
    }
  }

  const onChange2 = async () => {
    setNeet(!isNeetTopper)
    if (isNeetTopper === true) {
      setcount((count) => count+1)
      console.log(count)
    }
    else {
      setcount((count) => count-1)
    }
  }

  const onChange3 = () => {
    setBoard(!isBoardTopper)
    if (isBoardTopper === true) {
      setcount((count) => count+1)
    }
    else {
      setcount((count) => count-1)
    }
  }

  const onChange4 = () => {
    setJee(!isJeeTopper)
    if (isJeeTopper === true) {
      setcount((count) => count+1)
    }
    else {
      setcount((count) => count-1)
    }
  }

  const onChange5 = () => {
    setMaster(!isMasters)
    if (isMasters === true) {
      setcount((count) => count+1)
    }
    else {
      setcount((count) => count-1)
    }
  }

  const onChange6 = () => {
    setPHD(!isPHD)
    if (isPHD === true) {
      setcount((count) => count+1)
    }
    else {
      setcount((count) => count-1)
    }
  }

  const handleSubmit2 = async (e) => {

    e.preventDefault()

    if (isBoardTopper) {
      topper.push("Board Topper")
    }

    if (isJeeTopper) {
      topper.push("JEE Topper")
    }

    if (isMasters) {
      topper.push("Masters")
    }

    if (isNeetTopper) {
      topper.push("Neet Topper")
    }

    if (isPHD) {
      topper.push("PHD")
    }

    if (topper.length === 0) {
      setError("Select atleast one field")
      return error
    }



    if (count === 0) {
      const response = await fetch("http://localhost:6100/api/mentor/signup", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: details.email, password: details.password, topper: topper })
      })

      const json = await response.json()

      if (json.success) {
        navigate("/notaccepted", {
          state: {
            message: json.mssg
          }
        })
      }

      if (json.error) {
        setError(json.error)
      }
    }
    else{
      setError("Kindly upload all the documents")
      return error
    }

  }

  const handleSubmit3 = async (e) => {
    e.preventDefault()
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: 'djb8pgo4n',
      uploadPreset: 'm79rihxp',
      public_id: `${details.email}/board`
    }, function async(error, result) {
      if (result.event === "success") {
        upload(result.info.secure_url)
        setcount((count) => count-1)
      }
    })
    widgetRef.current.open()
  }

  const handleSubmit4 = async (e) => {
    e.preventDefault()
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: 'djb8pgo4n',
      uploadPreset: 'm79rihxp',
      public_id: `${details.email}/jee`
    }, function async(error, result) {
      if (result.event === "success") {
        setcount((count) => count-1)
      }
    })
    widgetRef.current.open()
  }

  const handleSubmit5 = async (e) => {
    e.preventDefault()
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: 'djb8pgo4n',
      uploadPreset: 'm79rihxp',
      public_id: `${details.email}/neet`
    }, function async(error, result) {
      if (result.event === "success") {
        setcount((count) => count-1)
      }
    })
    widgetRef.current.open()
  }

  const handleSubmit6 = async (e) => {
    e.preventDefault()
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: 'djb8pgo4n',
      uploadPreset: 'm79rihxp',
      public_id: `${details.email}/masters`
    }, function async(error, result) {
      if (result.event === "success") {
        setcount((count) => count-1)
      }
    })
    widgetRef.current.open()
  }

  const handleSubmit7 = async (e) => {
    e.preventDefault()
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: 'djb8pgo4n',
      uploadPreset: 'm79rihxp',
      public_id: `${details.email}/phd`
    }, function async(error, result) {
      if (result.event === "success") {
        setcount((count) => count-1)
      }
    })
    widgetRef.current.open()
  }

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary
  }, [])

  return (
    <>
      <div>
        <Navbar />
        <div className={styles.mostout}>
          <div className={styles.colour1}></div>
          <div className={styles.rightdiv}>
            <form className={styles.signup} onSubmit={handleSubmit2}>
              <h3 className={styles.formheader}><span className={styles.headertext}>Enter your Details</span></h3>
              <div className={styles.formcontent}>
                <input
                  type="password"
                  value={details.password}
                  name="password"
                  onChange={onChange1}
                  placeholder="password"
                  className={styles.inputbox}
                />
                <label htmlFor="boardtopper" className={styles.checkboxstyle}>
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    value={"Board Topper"}
                    onChange={onChange3}
                    name="Board Topper"
                    className={styles.boxstyle}
                  /><p>Board Topper</p>
                  {isBoardTopper && <button className={styles.uploadbutton} onClick={handleSubmit3}><img src={uploadicon} className={styles.butimgdiv} alt=' '></img></button>}
                </label>
                <label htmlFor="jeetopper" className={styles.checkboxstyle}>
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    value={"JEE Topper"}
                    onChange={onChange4}
                    name="JEE Topper"
                    className={styles.boxstyle}
                  /><p>JEE Topper</p>
                  {isJeeTopper && <button className={styles.uploadbutton} onClick={handleSubmit4}><img src={uploadicon} className={styles.butimgdiv} alt=' '></img></button>}
                </label>
                <label htmlFor="neettopper" className={styles.checkboxstyle}>
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    value={"Neet Topper"}
                    onChange={onChange2}
                    name="Neet Topper"
                    className={styles.boxstyle}
                  /><p>NEET Topper</p>
                  {isNeetTopper && <button className={styles.uploadbutton} onClick={handleSubmit5}><img src={uploadicon} className={styles.butimgdiv} alt=' '></img></button>}
                </label>
                <label htmlFor="masters" className={styles.checkboxstyle}>
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    value={"Masters"}
                    onChange={onChange5}
                    name="Masters"
                    className={styles.boxstyle}
                  /><p>Masters Student</p>
                  {isMasters && <button className={styles.uploadbutton} onClick={handleSubmit6}><img src={uploadicon} className={styles.butimgdiv} alt=' '></img></button>}
                </label>
                <label htmlFor="phd" className={styles.checkboxstyle}>
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    value={"PHD"}
                    onChange={onChange6}
                    name="PHD"
                    className={styles.boxstyle}
                  /><p>PHD Student</p>
                  {isPHD && <button className={styles.uploadbutton} onClick={handleSubmit7}><img src={uploadicon} className={styles.butimgdiv} alt=' '></img></button>}
                </label>
              </div>
              <button className={styles.signupbutton2}>Submit</button>
            </form>
            {error && <div className={styles.error}>{error}</div>}
          </div>
        </div>
      </div>

    </>
  )
}

export default Signup2
