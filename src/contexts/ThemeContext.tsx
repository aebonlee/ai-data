import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({})

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('ad-theme') || 'light')
  const [colorTheme, setColorTheme] = useState(() => localStorage.getItem('ad-color') || 'purple')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('ad-theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('data-color', colorTheme)
    localStorage.setItem('ad-color', colorTheme)
  }, [colorTheme])

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light')

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colorTheme, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
