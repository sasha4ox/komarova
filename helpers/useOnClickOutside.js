import { useEffect } from 'react';

export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // Click inside → ignore
      if (!ref.current || ref.current.contains(event.target)) {
         console.log("TOGELER INSIDE")
        return;
      }
      console.log("TOGELER")
      handler(event);
    };

    // Use CAPTURE phase (important for mobile)
    document.addEventListener('pointerdown', listener, true);

    return () => {
      document.removeEventListener('pointerdown', listener, true);
    };
  }, [ref, handler]);
}
