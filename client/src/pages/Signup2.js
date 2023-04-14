import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Navbar from '../components/Navbar'
import uploadicon from '../assets/upload.png'
import '../stylesheets/signup2.css'

const Signup2 = () => {

  const location = useLocation()
  const navigate = useNavigate()

  const cloudinaryRef = useRef()
  const widgetRef = useRef()

  const [error, setError] = useState(null)
  const topper = []
  const [details, setDetails] = useState({ password: "", idurl: "", email: location.state.email })

  let var1 = 0
  let var2 = 0
  let var3 = 0
  let var4 = 0
  let var5 = 0

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
    if(isNeetTopper === true){
      var1 = 1
      console.log(var1)
    }
    else{
      var1 = 0;
      console.log(var1)
    }
  }

  const onChange3 = () => {
    setBoard(!isBoardTopper)
    if(isBoardTopper === true){
      var2 = 1
      console.log(var2)
    }
    else{
      var2 = 0
      console.log(var2)
    }
  }

  const onChange4 = () => {
    setJee(!isJeeTopper)
    if(isJeeTopper === true){
      var3 = 1
      console.log(var3)
    }
    else{
      var3 = 0
      console.log(var3)
    }
  }

  const onChange5 = () => {
    setMaster(!isMasters)
    if(isMasters === true){
      var4 = 1
      console.log(var4)
    }
    else{
      var4 = 0
      console.log(var4)
    }
  }

  const onChange6 = () => {
    setPHD(!isPHD)
    if(isPHD === true){
      var5 = 1
      console.log(var5)
    }
    else{
      var5 = 0
      console.log(var5)
    }
  }

  const handleSubmit2 = async (e) => {

    e.preventDefault()
    console.log(details)

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


    console.log(topper)
    
    if(topper.length === 0){
      setError("Select atleast one field")
      return 
    }
    if(var1 != 0 || var2 != 0 || var3 != 0 || var4 != 0 || var5 != 0){
      setError("Some documents not uploaded")
      return 
    }



    const response = await fetch("http://localhost:6100/api/mentor/signup", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: details.email, idurl: details.idurl, password: details.password, topper: topper })
    })

    const json = await response.json()

    if (json.success) {
      navigate("/notaccepted", {
        state: {
          message: json.mssg
        }
      })
    }

    console.log(json.error)

    if (json.error) {
      setError(json.error)
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
        var2 = 0
        console.log(var2)
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
        upload(result.info.secure_url)
        var3 = 0
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
        upload(result.info.secure_url)
        var1 = 0
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
        upload(result.info.secure_url)
        var4 = 0
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
        upload(result.info.secure_url)
        var5 = 0
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
        <div className="mostout">
          <div className="colourdiv"></div>
          <div className="rightdiv2">
            <form className="signup" onSubmit={handleSubmit2}>
              <h3 className="formheader"><span className="headertext">Enter your Details</span></h3>
              <div className="formcontent">
                <input
                  type="password"
                  value={details.password}
                  name="password"
                  onChange={onChange1}
                  placeholder="password"
                  className="inputbox"
                />
                <label htmlFor="boardtopper" className="checkboxstyle">
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    value={"Board Topper"}
                    onChange={onChange3}
                    name="Board Topper"
                    className="boxstyle"
                  /><p>Board Topper</p>
                  {isBoardTopper && <button className="uploadbutton" onClick={handleSubmit3}><img src={uploadicon} className="butimgdiv"></img></button>}
                </label>
                <label htmlFor="jeetopper" className="checkboxstyle">
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    value={"JEE Topper"}
                    onChange={onChange4}
                    name="JEE Topper"
                    className="boxstyle"
                  /><p>JEE Topper</p>
                  {isJeeTopper && <button className="uploadbutton" onClick={handleSubmit4}><img src={uploadicon} className="butimgdiv"></img></button>}
                </label>
                <label htmlFor="neettopper" className="checkboxstyle">
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    value={"Neet Topper"}
                    onChange={onChange2}
                    name="Neet Topper"
                    className="boxstyle"
                  /><p>NEET Topper</p>
                  {isNeetTopper && <button className="uploadbutton" onClick={handleSubmit5}><img src={uploadicon} className="butimgdiv"></img></button>}
                </label>
                <label htmlFor="masters" className="checkboxstyle">
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    value={"Masters"}
                    onChange={onChange5}
                    name="Masters"
                    className="boxstyle"
                  /><p>Masters Student</p>
                  {isMasters && <button className="uploadbutton" onClick={handleSubmit6}><img src={uploadicon} className="butimgdiv"></img></button>}
                </label>
                <label htmlFor="phd" className="checkboxstyle">
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    value={"PHD"}
                    onChange={onChange6}
                    name="PHD"
                    className="boxstyle"
                  /><p>PHD Student</p>
                  {isPHD && <button className="uploadbutton" onClick={handleSubmit7}><img src={uploadicon} className="butimgdiv"></img></button>}
                </label>
              </div>
              <button className="signupbutton2">Submit</button>
            </form>
            {error && <div className="error">{error}</div>}
          </div>
        </div>
      </div>

    </>
  )
}

export default Signup2
