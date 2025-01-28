import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from './Button';

gsap.registerPlugin(ScrollTrigger);
const navButtons=[
    {label:'Fingerprints',img:'/xoxoLogo.svg'},
    {label:'Bee',img:'/bee.svg'},
    {label:'Logo',img:'/xoxoLogo.svg',isLogo:true},
    {label:'ProjectSO',img:'/projectSO.svg'},
    {label:'Contact',img:'/contactUs.svg'},
]
const Navbar = ({showNavbar}) => {
  const navbarRef = useRef(null);
  const divRef = useRef(null);
  useEffect(() => {
    const navbar = navbarRef.current;

    // Trigger the navbar animation on scroll
    if(showNavbar){
        gsap.to(navbar, {
            opacity: 1,
            duration: .5,
            ease: 'power1.inOut',
            bottom:0
          });
    }
    // ScrollTrigger.create({
    //   trigger: document.body, // Entire body as the scroll trigger
    //   start: 'top+=1 top', // When user scrolls even slightly
    //   onEnter: () => {
       
    //   },
      
    // });
  }, [showNavbar]);
  

  return (
    <div
      ref={navbarRef}
      style={{

        position: 'fixed', // Fixed at the bottom
        bottom: -90,
        left: 0,
        width: '100%',
        backgroundColor: 'white', // Navbar color
        color: 'black',
        
        opacity: 0, // Initially hidden
        zIndex: 20,
        
      }}
    >
       
          <div style={{
            display: 'flex',
            justifyContent:'center',
            margin: '0 auto',
            width: '100%',
            maxWidth: '1200px',
            padding: '0 0 0 0',
            maxHeight:'122px',
            gap: '50px',
           
          }}>
            {navButtons.map((button, index) => (
              <Button key={index}  button={button}  />
            ))}
          </div>
       
      
    </div>
  );
};

export default Navbar;
