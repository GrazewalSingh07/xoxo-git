import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FlipbookAnimation() {
  const [imageIndex, setImageIndex] = useState(0);
  
  // Array of image paths, assume images are named Danny.0000.jpg to Danny.0263.jpg
 
  const imageNumbers = Array.from({ length: 167 }, (_, i) => 114 + i);  
  const images = imageNumbers.map(num => `/bee/Danny.0${num}.jpg`);
  

  const scrollContainer = useRef();
// useEffect(()=> window.scrollTo(0, 0),[])

  useEffect(() => {
    window.scrollTo(0, 0)
    const totalFrames = images.length - 1;

    // Create a timeline using GSAP
    const timeline = gsap.timeline({
      paused: true,
      onUpdate: () => {
        const currentTime = timeline.time()/400;  // Current time in the timeline
        const index = Math.floor(currentTime * totalFrames);  // Map time to image index
        setImageIndex(index);  // Update image index based on timeline
      }
    });

    // Create ScrollTrigger to control the timeline based on scroll position
    ScrollTrigger.create({
      trigger: scrollContainer.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,  // Smooth scrubbing
      animation: timeline,  // Use the GSAP timeline as the animation
    });

    // Populate the timeline with a dummy animation (you can extend this to other animations)
     
        timeline.to({}, { duration: totalFrames, ease: "none" });
    
  

    return () => {
      timeline.kill();  // Clean up the timeline on component unmount
    };
  }, [images.length]);

  return (
    <div ref={scrollContainer} style={{ position: "relative", height: "1200px", overflow: "auto" }}>
      <div style={{ height: "100%" }}>
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={images[imageIndex]}  // Dynamically change the image based on the index
            alt="Flipbook Frame"
            style={{ width: "80vw", height: "auto", objectFit: "contain" }}
          />
           <img style={{width:'80px',position:'absolute',bottom:'100px',right:'12%'}}  src={'/arrowDownWhite.gif'}/>
        </div>
      </div>
    </div>
  );
}
