'use client';
import styles from './scrollTop.module.css';
import { useEffect, useState } from 'react';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

const WHEN_SHOW_BUTTON = 500;

export default function ScrollTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.scrollY);
    };

    // Add event listener to the window
    window.addEventListener('scroll', updatePosition);
    
    // Initial call to set position on mount
    updatePosition(); 

    // Cleanup function to remove event listener
    return () => window.removeEventListener('scroll', updatePosition);
  }, []);


  console.log('scrollPosition', scrollPosition)

  return (
  <>
  {scrollPosition >= WHEN_SHOW_BUTTON &&  <button 
      onClick={scrollToTop}
      className={styles.button}
    >
      <ArrowCircleUpIcon sx={{ color: 'white' }}/>
    </button>}
  </>
  )
    
}