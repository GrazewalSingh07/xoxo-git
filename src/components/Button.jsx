import React, { useContext, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ReactSVG } from 'react-svg'
import { NavContext } from '../context/navContext';
export const Button = ({ button, index ,handleClick}) => {
  const divRef = useRef();
  const [isHovering, setIsHovering] = useState(false);
  const child=useRef()
  const [selected] = useContext(NavContext)
  
  useEffect(() => {
    const element = divRef.current;

    let interval;
    if (isHovering && selected!=button.label) {
      
      interval = setInterval(() => { 
        const currentColor = window.getComputedStyle(element).borderColor; 
element.style.borderColor = currentColor === 'rgb(255, 49, 49)' ? 'black' : '#ff3131';

      }, 100);  

    } else if(selected==button.label){
      clearInterval(interval);
      element.style.borderColor = '#ff3131';
    } else { 
      clearInterval(interval);
      element.style.borderColor = 'black'; 
    }
    if (isHovering || selected === button.label) { 
      gsap.to(child.current, {
        scale: selected === button.label ? 1.2 : 1.2,
        ease: 'elastic.inOut',
        duration: 0.5,
      });
    } else { 
      gsap.to(child.current, {
        scale: 1,
        ease: 'elastic.inOut',
        duration: 0.5,
      });
    }
    
    return () => clearInterval(interval);

   
  }, [isHovering,selected]);
 
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
      onClick={()=>handleClick(button.label)}
    >
      {button.label === 'Fingerprints' ? (
        <div ref={child} style={{ position: 'relative' }}>
          <img
            src={selected==button.label ?'/fingerprintGreen.svg':'/fingerprint.svg'}
            alt={button.label}
            style={{
              position: 'absolute',
              left: '50%',
              right:'50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 20,
             
            }}
            width={selected==button.label ?80:60}
          />
          <img
            src={selected==button.label ?'/lockRed.svg':'/lock.svg'}
            alt={button.label}
            style={{
              position: 'absolute',
              left: '50%',
              right:'50%',
            transform: 'translate(-50%, -50%)',
              zIndex: 20,
            }}
            width={selected==button.label ?40:20}
          />
        </div>
      ) : (  
        <img
        ref={!button.isLogo ? child:null} 
          src={selected==button.label ?button.selectedImage:button.img}
          alt={button.label}
          width={button.isLogo ? 200 : button.label === 'ProjectSO' ? 140 : 80}
        />
      )}
    </button>
  );
};
