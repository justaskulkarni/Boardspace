import React from 'react';
import Navbar from '../components/Navbar'

import styles1 from '../stylesheets/home.module.css'

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className={styles1.hi}>
        hey
      </div>
    </div>
  )
}

export default Home
