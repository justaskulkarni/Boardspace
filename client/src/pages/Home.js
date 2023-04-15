import React from 'react';
import Navbar from '../components/Navbar'

import styles from '../stylesheets/home.module.css'

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.hi}>
        hey
      </div>
    </div>
  )
}

export default Home
