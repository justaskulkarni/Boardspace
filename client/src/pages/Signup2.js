import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from '../components/Navbar'
import '../stylesheets/auth.css'

const Signup2 = () => {
  const [isBoardTopper, setIsBoardTopper] = useState(false)
  const [isJEETopper, setIsJEETopper] = useState(false)
  const [isNEETTopper, setIsNEETTopper] = useState(false)
  const [isMastersStudent, setIsMastersStudent] = useState(false)
  const [isPHDStudent, setIsPHDStudent] = useState(false)
  const [details, setDetails] = useState({password:"", idurl:""})
  const onChange2 = (event) => {
    setDetails({ ...details, [event.target.name]: event.target.value })
  }
  const handleSubmit3 = async (e) => {

    e.preventDefault()

  }
  return (
    <div>
        </Navbar>
        <form className="signup" onSubmit={handleSubmit2}>
              <h3 className="formheader"><span className="headertext">Enter your Details</span></h3>
              <div className="formcontent">
                <input
                  type="text"
                  value={details.password}
                  name="password"
                  onChange={onChange2}
                  placeholder="password"
                  className="inputbox"
                />
                <input
                  type="text"
                  value={details.idurl}
                  name="idurl"
                  onChange={onChange2}
                  placeholder="idurl"
                  className="inputbox"
                />
                <label htmlFor="boardtopper" className="checkboxstyle">
                <input
                  type="checkbox"
                  defaultChecked={false}
                  value={isBoardTopper}
                  onChange={() => setIsBoardTopper(true)}
                  name="Board Topper"
                />Board Topper
                </label>
                <label htmlFor="jeetopper" className="checkboxstyle">
                <input
                  type="checkbox"
                  defaultChecked={false}
                  value={isJEETopper}
                  onChange={() => setIsJEETopper(true)}
                  name="JEE Topper"
                />JEE Topper
                </label>
                <label htmlFor="neettopper" className="checkboxstyle">
                <input
                  type="checkbox"
                  defaultChecked={false}
                  value={isNEETTopper}
                  onChange={() => setIsNEETTopper(true)}
                  name="Neet Topper"
                />NEET Topper
                </label>
                <label htmlFor="masters" className="checkboxstyle">
                <input
                  type="checkbox"
                  defaultChecked={false}
                  value={isMastersStudent}
                  onChange={() => setIsMastersStudent(true)}
                  name="Masters"
                />Masters Student
                </label>
                <label htmlFor="phd" className="checkboxstyle">
                <input
                  type="checkbox"
                  defaultChecked={false}
                  value={isPHDStudent}
                  onChange={() => setIsPHDStudent(true)}
                  name="PHD"
                />PHD Student
                </label>
            </div>
        </form>
    </div>
  )
}

export default Signup2
