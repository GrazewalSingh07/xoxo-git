import { useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { NavContext } from "../context/navContext";

export default function HoverParallax() {
  const bgRef = useRef(null);
  const birdRef = useRef(null);
  const containerRef = useRef(null);
  const textRef=useRef()
  const [_selected, _handleSelected,navBarActive,_setNavBarActive] = useContext(NavContext);
    const [canInteract,setCanInteract]=useState(false)
  const handleMouseMove = (e) => {
    if (!containerRef.current && !canInteract) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const xPos = ((e.clientX - left) / width) * 2 - 1;  
    const yPos = ((e.clientY - top) / height) * 2 - 1;

    gsap.to(bgRef.current, { x: xPos * 15, y: yPos * 10, duration: 0.3, ease: "power2.out"  });
    gsap.to(birdRef.current, { x: -xPos * 15, y: -yPos * 10, duration: 0.3, ease: "power2.out" });
    gsap.to(textRef.current, { x: -xPos * 15, y: -yPos * 10, duration: 0.3, ease: "power2.out" });
  };

  const handleLeave = () => {
    gsap.to([bgRef.current, birdRef.current], { x: 0, y: 0, duration: 0.5, ease: "power2.out" });
  };
  useEffect(() => {
        if(navBarActive){
            gsap.to(bgRef.current, { 
                y: -30,
                duration: 1,
                ease: "linear",
                opacity:1,
                onComplete: function(){
                    setCanInteract(true)
                    gsap.to(birdRef.current, {
                        opacity: 1,
                        duration: 1,
                    })
                    gsap.to(textRef.current, {
                      opacity: 1,
                      duration: 1,
                      delay:.5
                    })
                }
                
            })
        }

   
  },[navBarActive])


  return (
    <div ref={containerRef} className="container" onPointerMove={handleMouseMove} onPointerLeave={handleLeave}>
      
      <img ref={bgRef} src="/beeBackground.png" alt="Background" className="bg" />
 
      <img ref={birdRef} src="/beeWood.png" alt="Bird" className="bird" />
 
      <div ref={textRef} className="beeParallexTextContainer">
        
        <img width={500} src={'platforms/7.svg'}/>
        <div className="introContainer">
          <p className="comingSoon">COMING SOON</p>
          <div className="platforms">
            <img width={100}  className="platform" src={'/platforms/4.svg'}/>
            <img  width={130} className="platform"src={'/platforms/5.svg'}/>
            <img  width={100} className="platform" src={'/platforms/6.svg'}/>
          </div>
        </div>
      </div>
      <div className="hover-circle"></div>
    </div>
  );
}
