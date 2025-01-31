import { createContext, useState } from "react";

export const NavContext = createContext();

export const NavContextProvider = ({ children }) => {
  const [selected, setSelected] = useState("Bee");
  const [navBarActive,setNavBarActive] = useState(false)
  const handleSelected = (val) => {
    setSelected(val);
  };
  return (
    <NavContext.Provider value={[selected, handleSelected,navBarActive,setNavBarActive]}>
      {children}
    </NavContext.Provider>
  );
};
