import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const DownwardArrow = ({ fadeOut }) => {
  const arrowRef = useRef(null);

  useEffect(() => {
    // Fade out based on the fadeOut prop
    if (fadeOut) {
      gsap.to(arrowRef.current, {
        opacity: 0, // Fade out
        duration: 0.5, // Smooth fade out
      });
    } else {
      gsap.to(arrowRef.current, {
        opacity: 1, // Fade in
        duration: 0.5, // Smooth fade in
      });
    }

    // Arrow movement animation
    gsap.to(arrowRef.current, {
      y: 20, // Moves downward more
      repeat: -1, // Loops infinitely
      yoyo: true, // Moves back up
      duration: 0.8, // Slower movement
      ease: "power1.inOut",
    });
  }, [fadeOut]);

  return (
    <svg
      ref={arrowRef}
      width="50"
      height="50"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 0v19M19 12l-7 7-7-7" />
    </svg>
  );
};

export default DownwardArrow;
