import { useState, useEffect } from "react";

function useScrollDirection(): Boolean {
  const [isScrollToBottom, setIsScrollToBottom] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > scrollY && currentScrollY-100 > scrollY) {
        setIsScrollToBottom(true);
        setScrollY(currentScrollY);
      } else if (currentScrollY < scrollY && currentScrollY+100 < scrollY) {
        setIsScrollToBottom(false);
        setScrollY(currentScrollY);
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