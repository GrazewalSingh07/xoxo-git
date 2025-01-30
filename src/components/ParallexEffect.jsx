import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef, useState, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Flipbook({show}) {
  const [imageIndex, setImageIndex] = useState(0);
//   const totalImages = 264; // Since you have 263 images, but we start from 0
//   const images = Array.from({ length: totalImages }, (_, i) => `/bee/Danny.${String(i).padStart(4, '0')}.jpg`);
 
  const imageNumbers = Array.from({ length: 167 }, (_, i) => 114 + i);  
  const images = imageNumbers.map(num => `/bee/Danny.0${num}.jpg`);


  const scrollContainer = useRef();
  const flipbookContainer = useRef();
  const lastScrollTime = useRef(0);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to({}, {
        scrollTrigger: {
          trigger: scrollContainer.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => {
            const now = Date.now();
            if (now - lastScrollTime.current > 100) {  
              lastScrollTime.current = now;
              const index = Math.floor(self.progress * (images.length - 1));
              setImageIndex(index);
            }
          },
        },
      });
      if(show && scrollContainer.current){
        
            gsap.to(scrollContainer.current,{
                  
                  duration: 1,
                  ease: 'power1.inOut',
                  opacity:1, 
                   
              })
          
      }
    }, flipbookContainer);

    return () => ctx.revert();
  }, [images.length,show]);


  return (
    <div className="frame-scroller parallexContainer " ref={scrollContainer} style={{ position: "relative", height: "2733px",overflow:'auto' }}>
      
      <div style={{ height: "911px" }}>
        <div className="position-relative" style={{ height: "911px" }}>
          <div className="position-relative h-full" ref={flipbookContainer} 
            style={{ 
              position: "fixed", 
              top: "50%", 
              left: "50%", 
              transform: "translate(-50%, -50%)",
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center", 
              overflow: "hidden"
            }}>
            <img src={images[imageIndex]} alt="Flipbook Frame" style={{ width: "100vw",height:'85vh', objectFit: "contain" }} />
            <img style={{width:'80px',position:'absolute',bottom:'80px',right:'16%'}}  src={'/arrowDownWhite.gif'}/>
          </div>
        </div>
      </div>
    </div>
  );
}
