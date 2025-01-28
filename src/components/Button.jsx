import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export const Button = ({ button, index }) => {
  const divRef = useRef();
  const [isHovering, setIsHovering] = useState(false);
  const child=useRef()
  
  useEffect(() => {
    const element = divRef.current;

    let interval;
    if (isHovering) {
      // Start toggling the border color on hover
      interval = setInterval(() => {
        const currentColor = element.style.borderColor;
        element.style.borderColor = currentColor === '#ff3131' ? 'black' : '#ff3131';
      }, 100); // Toggle every 500ms
    } else {
      // Clear the interval when not hovering
      clearInterval(interval);
      element.style.borderColor = 'black'; // Set the border color to black immediately
    }
    if (isHovering) {
        // On hover, scale the child element
        gsap.to(child.current, {
          scale: 1.2,
          ease: 'elastic.inOut',
          duration: 0.5,
        });
      } else {
        // On hover out, reset the scale
        gsap.to(child.current, {
          scale: 1,
          ease: 'elastic.inOut',
          duration: 0.5,
        });
      }
   
    // Cleanup interval when the component unmounts
    return () => clearInterval(interval);

   
  }, [isHovering]);

  return (
    <button
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={() => setIsHovering(false)}
      ref={divRef}
      style={{
        margin: 'auto',
        borderRadius: '0px',
        backgroundColor: 'transparent',
        border: `${button.isLogo ? 'none' : '10px solid black'}`,
        cursor: `${button.isLogo ? 'default' : 'pointer'}`,
        padding: `${button.isLogo ? '30px' : '10px 20px'}`,
        width: `${button.isLogo ? '250' : '200'}px`,
        height: '120px',
        textAlign: 'center',
      }}
      onClick={() => alert(button.label)}
    >
      {button.label === 'Fingerprints' ? (
        <div ref={child} style={{ position: 'relative' }}>
          <img
            src={'/fingerprint.svg'}
            alt={button.label}
            style={{
              position: 'absolute',
              left: '50%',
              right:'50%',
              transform: 'translate(-50%, -50%)',
              
              zIndex: 20,
            }}
            width={60}
          />
          <img
            src={'/lock.svg'}
            alt={button.label}
            style={{
              position: 'absolute',
              left: '50%',
              right:'50%',
            transform: 'translate(-50%, -50%)',
              zIndex: 20,
            }}
            width={20}
          />
        </div>
      ) : (
        <img
        ref={!button.isLogo ? child:null} 
          src={button.img}
          alt={button.label}
          width={button.isLogo ? 200 : button.label === 'ProjectSO' ? 140 : 80}
        />
      )}
    </button>
  );
};
