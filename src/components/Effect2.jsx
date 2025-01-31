import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { throttle } from "lodash";

gsap.registerPlugin(ScrollTrigger);

export default function FlipbookAnimation() {
  const [imageIndex, setImageIndex] = useState(0);
  const beeTextRef=useRef()

  const imageNumbers = Array.from({ length: 171 }, (_, i) => 114 + i);
  const images = imageNumbers.map(num => `/bee/Danny.0${num}.jpg`);

  const scrollContainer = useRef();
  // const updateImageIndex = useCallback(
  //   throttle((index) => {
  //     setImageIndex(index);
  //   }, 100), 
  //   []
  // );
  useEffect(() => {
    window.scrollTo(0, 0);  // To reset scroll position on load
    const totalFrames = images.length - 1;

    const timeline = gsap.timeline({
      paused: true,
      onUpdate: () => {
        const currentTime = timeline.time() / timeline.duration();
        let index = Math.floor(currentTime * totalFrames);
        setImageIndex(index);
        
      }
    });

    // ScrollTrigger links scroll position to animation
    ScrollTrigger.create({
      trigger: scrollContainer.current,
      start: "top top",  // Trigger when the scroll container hits the top of the viewport
      end: "bottom bottom",  // Trigger when the scroll container hits the bottom of the viewport
      scrub: 1,  // Ensures the animation is in sync with the scroll
      animation: timeline,  // Link animation to ScrollTrigger
    });

    timeline.to({}, { duration: totalFrames, ease: "none" });

    return () => {
      timeline.kill();  // Cleanup timeline on component unmount
    };
  }, [images.length]);

  useEffect(()=>{
    gsap.to(beeTextRef.current,{
      duration: 1,
      ease: 'power1.inOut',
      y:-100,
      opacity:1,
      transformOrigin: 'center center',
       onComplete: function(){
        gsap.to(beeTextRef.current,{  
          duration: 1,
          ease: 'power1.inOut',
          y:-500,
          opacity:0,
          transformOrigin: 'center center',
       })
      }
  })
  },[])
  return (
    <div ref={scrollContainer} style={{ position: "relative", height: "1200px", overflowY: 'auto',zIndex:0 }}>
      <div style={{ height: "100%" }}>
        <div 
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100vw",
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",  
          }}
        >
           
          <img
            src={images[imageIndex]}
            alt="Flipbook Frame"
            style={{ width:"80%",objectFit: "cover" }}
          />
          <div style={{ width: "80vw", position: "absolute", bottom:0 , left:0  }}>
            <img style={{  position: "absolute", bottom:0 , right:'-100px'  }} width={80} src={'/arrowDownWhite.gif'} />
          </div>
         
          <div ref={beeTextRef}  style={{width:"125vw",position: "fixed", margin:'auto', opacity:0}}>
            <img   src={'/bee_txt.svg'}/>
          </div>
           
         
        </div>
      </div>
    </div>
  );
}
