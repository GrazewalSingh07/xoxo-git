import { useRef } from "react";
import gsap from "gsap";

export default function HoverParallax() {
  const bgRef = useRef(null);
  const birdRef = useRef(null);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const xPos = ((e.clientX - left) / width) * 2 - 1;  
    const yPos = ((e.clientY - top) / height) * 2 - 1;

    gsap.to(bgRef.current, { x: xPos * 15, y: yPos * 10, duration: 0.3, ease: "power2.out" });
    gsap.to(birdRef.current, { x: -xPos * 15, y: -yPos * 10, duration: 0.3, ease: "power2.out" });
  };

  const handleLeave = () => {
    gsap.to([bgRef.current, birdRef.current], { x: 0, y: 0, duration: 0.5, ease: "power2.out" });
  };

  return (
    <div ref={containerRef} className="container" onPointerMove={handleMouseMove} onPointerLeave={handleLeave}>
      
      <img ref={bgRef} src="/beeBackground.png" alt="Background" className="bg" />
 
      <img ref={birdRef} src="/beeWood.png" alt="Bird" className="bird" />
 
      <div className="hover-circle"></div>
    </div>
  );
}
