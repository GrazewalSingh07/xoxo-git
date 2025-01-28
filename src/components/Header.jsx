import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const logoCircleRef=useRef()
  const [hasScrolled, setHasScrolled] = useState(false);
  const [logoGone, setLogoGone] = useState(false);
  useEffect(() => {
    const header = headerRef.current;
    const logo = logoRef.current;
    const logoCircle = logoCircleRef.current;

    // gsap.to(header,{
    //     backgroundColor: '#000000', // Final color
    //     duration: 1, // Duration of the animation
    //     ease: 'linear', 
       
       
        
    // })
    
     
   
      const handleScroll = () => {
        if (!hasScrolled) {
          setHasScrolled(true); // Mark as scrolled
          gsap.to(header, {
            backgroundColor: '#000000', // Change to black
            duration: 1, // Duration of the color transition
            ease: 'linear', // Smooth transition
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
    // const tl = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: document.body, // Use the body as the trigger
    //     start: 'top top', // Start animation when the top of the body hits the top of the viewport
    //     end: 'center top', // End animation when the bottom of the body hits the top of the viewport
    //     scrub: true, // Smoothly animate on scroll
    //   },
    // });

    // First, animate the background color to black
    // tl.to(header, {
    //   backgroundColor: 'black', // Final color
    // });

    // Then, fade out the logo
    // tl.to(logo, {
    //   opacity: 0, // Fade out the logo
    // });
//    gsap.

  }, [hasScrolled]);
 
  
   
  return (
    <div>
      <div
        ref={headerRef}
        style={{
          position: 'fixed', // Fix the header in place
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh', // Full viewport height
          backgroundColor: '#ff3131', // Initial color
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontSize: '2rem',
          zIndex: 10, // Ensure it stays above other content
        }}
      >
        <div style={{ position: 'relative' }} ref={logoRef}>
        <img
          style={{
            position: 'absolute',
            left:'50%',
            right:'50%',
            transform: 'translate(-50%, -60%)',
            width: '700px',
            height: 'auto',
            zIndex: 20, // Ensure it stays below other content
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
          }}
          src={'/10.svg'}
          alt="Logo"
          
        />
        </div>
        
      </div>
      {/* Scrollable content inside the Header component */}
      <div style={{ height: '300vh', paddingTop: '100vh' }}>
      <Navbar showNavbar={logoGone} />
      </div>
    </div>
  );
};

export const Hero = () => {
  return <Header />;
};