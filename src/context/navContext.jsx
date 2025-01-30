import { createContext, useState } from "react"

export const NavContext=createContext()

export const NavContextProvider=({children})=>{
    const [selected,setSelected] = useState('Bee')
    const handleSelected=(val)=>{
        setSelected(val)
    }
    console.log(selected)
    return <NavContext.Provider value={[selected,handleSelected]}>
    {
        children
    }
    </NavContext.Provider>
}