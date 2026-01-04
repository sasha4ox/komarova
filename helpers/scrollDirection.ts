import { useState, useEffect } from "react";

function useScrollDirection(): Boolean {
  const [isScrollToBottom, setIsScrollToBottom] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      // const currentScrollY = window.scrollY;
      // console.log('currentScrollY,', currentScrollY)
      // console.log('scrollY,', scrollY)
      // if (currentScrollY > scrollY) {
      //   setIsScrollToBottom(true);
      // } else if (currentScrollY < scrollY) {
      //   setIsScrollToBottom(false);
      // }
      // setScrollY(currentScrollY);
      setScrollY(window.scrollY);
      console.log('document.body.scrollTop', window.scrollY )
       console.log('window.scrollY > 150', window.scrollY > 150 )
      if (window.scrollY > 150) {
        console.log('qqHERES')
        setIsScrollToBottom(true);
      } else {
        setIsScrollToBottom(false)
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  return isScrollToBottom;
}

export default useScrollDirection;