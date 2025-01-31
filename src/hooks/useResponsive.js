import { useState, useEffect } from "react";

function useResponsive() {
  const [screenSize, setScreenSize] = useState("");

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;

      if (width < 576) {
        setScreenSize("sm");
      } else if (width >= 576 && width < 992) {
        setScreenSize("md");
      } else if (width >= 992) {
        setScreenSize("lg");
      }
    };

    updateScreenSize();

    window.addEventListener("resize", updateScreenSize);

    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  return screenSize;
}

export default useResponsive;
