import React, { useState, useEffect } from 'react'
import ImageSlider from './ImageSlider'
import styles from '../stylesheets/card.module.css'
import document from '../assets/document.png'
import undo from '../assets/undo.png'
import deletelogo from '../assets/delete.png'
import { useNavigate } from 'react-router-dom'

const RejectCard = ({ mentid }) => {

  const [error, setError] = useState(null)
  const [imags, setImgarr] = useState([])
  const [creadentials, setCredentials] = useState({ email: "", mname: "", topper: [], reason: "" })
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  let navigate = useNavigate()

  useEffect(() => {
    const getdata = async () => {

      const response = await fetch(`http://localhost:6100/api/admin/mentor/dets/${mentid}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      const json = await response.json()

      if (json.success) {
        setCredentials({email:json.mentdets.email, mname:json.mentdets.name, topper:json.mentdets.toparea.join(" , "), reason:json.mentdets.rejectreason})
        setImgarr(...imags, json.mentdets.idurl)
      }

      if (json.error) {
        setError(json.error)
      }

    }

    getdata()

  }, [])

  const getundo = async () => {

    const response = await fetch(`http://localhost:6100/api/admin/mentor/undo/${mentid}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      const json = await response.json()

      if (json.success) {
        navigate("/admin/rejected/reqs")
      }

      if (json.error) {
        setError(json.error)
      }
    
  }

  const getdelete = async () => {

      const response = await fetch(`http://localhost:6100/api/admin/confirm/delete/${mentid}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      const json = await response.json()

      if (json.success) {
        navigate("/admin/rejected/reqs")
      }

      if (json.error) {
        setError(json.error)
      }
  }

  return (
    <div className={styles.cardstyle}>
      <div className={styles.statscontainer}>
        <div className={styles.innerdiv}>
          <div className={styles.innermost1}>
            <p className={styles.cardcontent}>Name:{creadentials.mname}</p>
            <p className={styles.cardcontent}>Email:{creadentials.email}</p>
            <p className={styles.cardcontent}>Applied for:{creadentials.topper}</p>
            <p className={styles.cardcontent}>Reason:{creadentials.reason}</p>
          </div>
          <div className={styles.innermost}>
            <div className={styles.btncontainer}>
              <button className={styles.verifybutton} onClick={handleOpen}><img src={document} className={styles.butimgdiv} alt=""></img></button>
              <button className={styles.verifybutton} onClick={() => getundo()}><img src={undo} className={styles.butimgdiv} alt=""></img></button>
              <button className={styles.verifybutton} onClick={() => getdelete()} ><img src={deletelogo} className={styles.butimgdiv} alt=""></img></button>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={styles.popupcontainer}>
          <div className={styles.popup}>
            <button onClick={handleClose}>Close</button>
            <ImageSlider imgarr={imags} />
          </div>
        </div>
      )}
    {error && <div className={styles.error}>{error}</div>}
    </div>
  )
}

export default RejectCard
