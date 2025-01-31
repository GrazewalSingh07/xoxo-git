import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
  
import FlipbookAnimation from './Effect2';

 
 

export const BeeSection = () => {
    const logoImageRef=useRef()
     

    const [showParallex, setShowParallex] = useState(false)
  useEffect(()=>{
   const logoImage=logoImageRef.current
  
   if(logoImage) {
       gsap.to(logoImage,{
           
           duration: 1,
           ease: 'power1.inOut',
           opacity:1,
           transformOrigin: 'center center',
            onComplete: function(){
                setShowParallex(true)
                
            }
       })
   }
   
  },[])
  
    return (
      <div style={{position:'relative'}}>
          <div className="beeLogo" ref={logoImageRef}>
            <img src={'/beeLogo.svg'}/>
        </div>
      
         <FlipbookAnimation  />
        
         
      </div>
    );
  };
 
