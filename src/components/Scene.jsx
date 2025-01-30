import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef } from "react";
import "./styles.css"

gsap.registerPlugin(ScrollTrigger);

export default function Scene() {
  const component = useRef();
  const slider = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let panels = gsap.utils.toArray(".panel");
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: slider.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + slider.current.offsetWidth,
          markers: true
        }
      });
    }, component);
    return () => ctx.revert();
  });
 
  return (
    <div className="App" ref={component}>
    
      <div ref={slider} className="container">
        
        <div className="panel ">
          <img className="panel-image" src={'/bee/Danny.0246.jpg'}/>
        </div>
        <div className="panel"> <img className="panel-image " src={'/bee/Danny.0247.jpg'}/></div>
        <div className="panel"> <img className="panel-image " src={'/bee/Danny.0248.jpg'}/></div>
        <div className="panel ">
          <img className="panel-image" src={'/bee/Danny.0249.jpg'}/>
        </div>
        <div className="panel"> <img className="panel-image " src={'/bee/Danny.0250.jpg'}/></div>
        <div className="panel"> <img className="panel-image " src={'/bee/Danny.0251.jpg'}/></div>
        <div className="panel ">
          <img className="panel-image" src={'/bee/Danny.0252.jpg'}/>
        </div>
        <div className="panel"> <img className="panel-image " src={'/bee/Danny.0253.jpg'}/></div>
        <div className="panel"> <img className="panel-image " src={'/bee/Danny.0254.jpg'}/></div>
        <div className="panel ">
          <img className="panel-image" src={'/bee/Danny.0255.jpg'}/>
        </div>
        <div className="panel"> <img className="panel-image " src={'/bee/Danny.0256.jpg'}/></div>
        <div className="panel"> <img className="panel-image " src={'/bee/Danny.0257.jpg'}/></div>
        <div className="panel ">
          <img className="panel-image" src={'/bee/Danny.0258.jpg'}/>
        </div>
        <div className="panel"> <img className="panel-image " src={'/bee/Danny.0259.jpg'}/></div>
        <div className="panel"> <img className="panel-image " src={'/bee/Danny.0260.jpg'}/></div>
        <div className="panel ">
          <img className="panel-image" src={'/bee/Danny.0261.jpg'}/>
        </div>
        <div className="panel"> <img className="panel-image " src={'/bee/Danny.0262.jpg'}/></div>
        <div className="panel"> <img className="panel-image " src={'/bee/Danny.0263.jpg'}/></div>
      </div>
      
    </div>
  );
}
