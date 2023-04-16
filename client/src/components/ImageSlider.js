import React, { useState } from 'react';
import styles from '../stylesheets/imageslider.module.css';

const ImageSlider = ({imgarr}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide === imgarr.length - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide === 0) {
      setCurrentSlide(imgarr.length - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className={styles.imageslider}>
      <button className={styles.prevbtn} onClick={handlePrev}>Prev</button>
      <img src={imgarr[currentSlide]} alt={`Image ${currentSlide + 1}`} />
      <button className={styles.nextbtn} onClick={handleNext}>Next</button>
    </div>
  );
};

export default ImageSlider;
