import React, { createContext, useState } from 'react'

export const themeStore=createContext()
function ThemeContext({children}) {
    const [theme,setTheme]=useState(localStorage.getItem("theme")||'light')
    const themes = [
  "light",
  "dark",
  "cupcake",
  "coffee",
  "bumblebee",
  "emerald",
  "synthwave",
  "cyberpunk",
];
console.log(theme)
  return (
    <themeStore.Provider value={{theme,setTheme,themes}}>
        {children}
    </themeStore.Provider>

  )
}

export default ThemeContext