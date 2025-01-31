import { useRef } from "react";
import gsap from "gsap";

export default function HoverParallax() {
  const bgRef = useRef(null);
  const birdRef = useRef(null);
  const tl = useRef(gsap.timeline({ paused: true }));

  const handleHover = () => {
    tl.current = gsap.timeline({ repeat: -1, yoyo: true })
      .to(bgRef.current, { x: 10, duration: 1, ease: "power2.inOut" })
      .to(birdRef.current, { x: -10, duration: 1, ease: "power2.inOut" }, "<");
  };

  const handleLeave = () => {
    tl.current.pause().kill(); // Stop the animation when hover ends
    gsap.to([bgRef.current, birdRef.current], { x: 0, duration: 1, ease: "power2.out" });
  };

  return (
    <div className="container"> 
      <img ref={bgRef} src="/beeBackground.png" alt="Background" className="bg" />
 
      <img ref={birdRef} src="/beeWood.png" alt="Bird" className="bird" /> 
      <div className="hover-circle" onPointerEnter={handleHover} onPointerLeave={handleLeave}></div>
    </div>
  );
}
