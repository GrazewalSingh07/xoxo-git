import React, { useContext, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./Navbar";

import { BeeSection } from "./Bee";
import { NavContext } from "../context/navContext";
import useResponsive from "../hooks/useResponsive";
import HoverParallax from "./BeeSection";

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const logoCircleRef = useRef();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [logoGone, setLogoGone] = useState(false);
  const ArrowTextRef = useRef();
  const [selected] = useContext(NavContext);
  const dragonRef = useRef();
  const screenSize = useResponsive();
  useEffect(() => {
    const header = headerRef.current;
    const logo = logoRef.current;
    const logoCircle = logoCircleRef.current;
    const ArrowText = ArrowTextRef.current;

    const handleScroll = () => {
      if (!hasScrolled) {
        setHasScrolled(true);
        gsap.to(header, {
          backgroundColor: "#000000",
          duration: 1,
          ease: "linear",
        });
        gsap.to(logo, {
          opacity: 0,
          duration: 1,
          ease: "linear",

          scale: 0.7,
          onComplete: () => {
            setLogoGone(true);
          },
        });
        gsap.to(ArrowText, {
          opacity: 0,
          duration: 1,
          ease: "linear",
        });
        gsap.to(logoCircle, {
          rotation: 360,
          duration: 2,
          ease: "none",
          repeat: -1,
          transformOrigin: "50% 40%",
        });
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [hasScrolled]);

  useEffect(() => {
    const dragon = dragonRef.current;
    const logoCircle = logoCircleRef.current;
    gsap.to(dragon, {
      opacity: 1,
      duration: 1,
      ease: "power1.inOut",
    });
    gsap.to(logoCircle, {
      opacity: 1,
      duration: 1,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div>
      <div ref={headerRef} className={` ${!logoGone && "header"}`}>
        {!logoGone && (
          <div style={{ position: "relative" }} ref={logoRef}>
            <img
              ref={dragonRef}
              style={{
                position: "absolute",
                top: `${screenSize == "sm" && 0}`,
                left: "50%",
                right: "50%",
                transform: "translate(-50%, -60%)",
                zIndex: 20, // Ensure it stays below other content
                opacity: 0.1,
              }}
              src={"/9.svg"}
              alt="Logo"
              width={
                screenSize == "lg"
                  ? 700
                  : screenSize == "md"
                  ? 500
                  : screenSize == "sm"
                  ? 400
                  : 700
              }
            />
            <img
              ref={logoCircleRef}
              style={{
                position: "absolute",
                left: "50%",
                right: "50%",
                transform: "translate(-50%, -60%)",

                zIndex: 20, // Ensure it stays below other content
                opacity: 0.1,
              }}
              src={"/10.svg"}
              alt="Logo"
              width={
                screenSize == "lg"
                  ? 700
                  : screenSize == "md"
                  ? 500
                  : screenSize == "sm"
                  ? 400
                  : 700
              }
            />
          </div>
        )}

        <div
          ref={ArrowTextRef}
          style={{
            bottom: "-10px",
            position: "absolute",

            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            whiteSpace: "nowrap",
          }}
        >
          {" "}
          <img
            style={{ width: "80px", position: "absolute", bottom: "60px" }}
            alt="Scroll arrow"
            src={"/arrowDown.gif"}
          />
          <p className="ScrollMessage" style={{ color: "black" }}>
            SCROLL PAGE DOWN
          </p>
        </div>

        {logoGone && (selected == "Bee" || selected == "Contact") && (
          <BeeSection />
        )}
        {logoGone && selected == "ProjectSO" && <HoverParallax />}
      </div>
      <Navbar showNavbar={logoGone} />
    </div>
  );
};

export const Hero = () => {
  return <Header />;
};
