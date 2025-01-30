import React, { useContext, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from './Button';
import { NavContext } from '../context/navContext';

gsap.registerPlugin(ScrollTrigger);
const navButtons=[
    {label:'Fingerprints',img:'/xoxoLogo.svg'},
    {label:'Bee',img:'/bee.svg',selectedImage:'/beeRed.svg'},
    {label:'Logo',img:'/xoxoLogo.svg',isLogo:true},
    {label:'ProjectSO',img:'/projectSO.svg',selectedImage:'/project-50Red.svg'},
    {label:'Contact',img:'/contactUs.svg',selectedImage:'/emailRed.svg'},
]
const Navbar = ({showNavbar}) => {
  const navbarRef = useRef(null);
  const [selected,handleSelected]=useContext(NavContext)
   
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
   
  }, [showNavbar]);
  const handleClick=(val)=>{
    handleSelected(val)  
  }

  return (
    <div
      ref={navbarRef}
      style={{
        position: 'fixed',  
        bottom: -90,
        left: 0,
        width: '100%',
        backgroundColor:  'white', 
        color: 'black',
        opacity: 0,  
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
              <Button handleClick={handleClick} key={index}  button={button}  />
            ))}
          </div>
       
      
    </div>
  );
};

export default Navbar;
