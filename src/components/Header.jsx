import React, { useContext, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
 
import {  BeeSection } from './Bee';
import { NavContext } from '../context/navContext';

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const logoCircleRef=useRef()
  const [hasScrolled, setHasScrolled] = useState(false);
  const [logoGone, setLogoGone] = useState(false);
  const ArrowTextRef=useRef()
  const [selected]=useContext(NavContext)
  const dragonRef=useRef()
   
  useEffect(() => {
    const header = headerRef.current;
    const logo = logoRef.current;
    const logoCircle = logoCircleRef.current;
    const ArrowText=ArrowTextRef.current
   
   
      const handleScroll = () => {
        if (!hasScrolled) {
          setHasScrolled(true); // Mark as scrolled
          gsap.to(header, {
            backgroundColor: '#000000', // Change to black
            duration: 1, // Duration of the color transition
            ease: 'linear', // Smooth transition
             //
          });
          gsap.to(logo,{
            opacity: 0, // Fade out the logo
            duration: 1, // Duration of the animation
            ease: 'linear',
           
            scale: .7,
            onComplete: () => {
              setLogoGone(true); // Trigger navbar visibility once the logo is gone
            }
        })
        gsap.to(ArrowText, {
            opacity: 0, // Fade out the text
            duration: 1, // Duration of the animation
            ease: 'linear',
        })
        gsap.to(logoCircle, {
            rotation: 360, // Full rotation
            duration: 2, // Duration of one full rotation
            ease: 'none', // Linear rotation without easing
            repeat: -1, // Infinite rotation
            transformOrigin: '50% 40%', // Rotate around the exact center
           
          });
        }
      };
  
      // Add a "wheel" event listener for explicit user scroll
      window.addEventListener('wheel', handleScroll, { passive: true });
  
      // Cleanup event listener
      return () => {
        
        window.removeEventListener('wheel', handleScroll);
      };
    // Create a timeline to sequence the animations
   
  }, [hasScrolled]);

  useEffect(()=>{
     const dragon=dragonRef.current
     const logoCircle=logoCircleRef.current
      gsap.to(dragon, {
        opacity: 1, // Fade in the logo
        duration: 1, // Duration of the animation
        ease: 'power1.inOut',
      });
      gsap.to(logoCircle, {
        opacity:1,
        duration: 1, // Duration of one full rotation
        ease: 'power1.inOut', // Linear rotation without easing
        
      });
     
  },[ ])
 
  
   
  return (
    <div style={{
      position: 'sticky',
      top: 0,
   
    }}>
      <div
        ref={headerRef}
        className={`${!logoGone && 'header'}`}
             >
        <div style={{ position: 'relative' }} ref={logoRef}>
        <img
        ref={dragonRef}
          style={{
            position: 'absolute',
            left:'50%',
            right:'50%',
            transform: 'translate(-50%, -60%)',
            width: '700px',
            height: 'auto',
            zIndex: 20, // Ensure it stays below other content
            opacity: .1
          }}
          src={'/9.svg'}
          alt="Logo"
          
        />
        <img
          ref={logoCircleRef}
          style={{
            position: 'absolute',
            left:'50%',
            right:'50%',
            transform: 'translate(-50%, -60%)',
            width: '700px',
            zIndex: 20, // Ensure it stays below other content
            opacity: .1
          }}
          src={'/10.svg'}
          alt="Logo"
          
        />
        </div>
        <div
       ref={ArrowTextRef}
        style={{
        bottom: '-10px',
        position:'absolute',
      
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        whiteSpace:"nowrap",
        
       }} >
       
         {/* <DownwardArrow   /> */}
         <img style={{width:'80px',position:'absolute',bottom:'60px'}}  src={'/arrowDown.gif'}/>
         <p className='ScrollMessage' style={{  color:'black'}}>SCROLL PAGE DOWN</p>
       </div>
       {logoGone && selected=='Bee'&& <BeeSection/>}
      </div>
    
      {/* Scrollable content inside the Header component */}
      <div style={{ height: !logoGone&& '300vh', paddingTop: !logoGone&&'100vh' }}>
        {/* <Bee/> */}
        
       <Navbar showNavbar={logoGone} />
      </div>
    </div>
  );
};

export const Hero = () => {
  return <Header />;
};