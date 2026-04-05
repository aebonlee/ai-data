import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'
import { siteConfig } from '../config/site'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [colorPickerOpen, setColorPickerOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { theme, toggleTheme, colorTheme, setColorTheme } = useTheme()
  const { user, signOut } = useAuth()
  const location = useLocation()
  const userMenuRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
    setUserMenuOpen(false)
  }, [location])

  useEffect(() => {
    const handleClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
      if (!e.target.closest('.nav-item-dropdown')) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/')

  const handleDropdownToggle = (idx) => {
    setOpenDropdown(prev => prev === idx ? null : idx)
  }

  const handleSignOut = async () => {
    await signOut()
    setUserMenuOpen(false)
  }

  const userInitial = user?.user_metadata?.display_name?.charAt(0)?.toUpperCase()
    || user?.email?.charAt(0)?.toUpperCase()
    || '?'

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container nav-wrapper">
        <div className="logo">
          <Link to="/">
            <h1>
              <span className="brand-ai">{siteConfig.brand.ai}</span>
              <span className="brand-prompt"> {siteConfig.brand.prompt}</span>
            </h1>
          </Link>
        </div>

        <ul className={`nav-menu${mobileOpen ? ' active' : ''}`}>
          {siteConfig.menu.map((item, idx) =>
            item.children ? (
              <li
                key={idx}
                className="nav-item-dropdown"
                onMouseEnter={() => setOpenDropdown(idx)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a
                  href="#"
                  className={`nav-link${item.children.some(c => isActive(c.path)) ? ' active' : ''}`}
                  onClick={e => {
                    e.preventDefault()
                    if (mobileOpen) handleDropdownToggle(idx)
                  }}
                >
                  {item.label}
                </a>
                <ul className={`dropdown-menu${openDropdown === idx ? ' active' : ''}`}>
                  {item.children.map((child, cidx) => (
                    <li key={cidx}>
                      <Link to={child.path} className={isActive(child.path) ? 'active' : ''}>
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={idx}>
                <Link to={item.path} className={`nav-link${isActive(item.path) ? ' active' : ''}`}>
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>

        <div className="nav-actions">
          <button className="theme-toggle" data-mode={theme} onClick={toggleTheme} title="테마 전환">
            <i className="fa-solid fa-sun sun-icon" style={{ fontSize: '18px' }} />
            <i className="fa-solid fa-moon moon-icon" style={{ fontSize: '18px' }} />
          </button>

          <div className="color-picker-wrapper">
            <button className="color-picker-btn" onClick={() => setColorPickerOpen(!colorPickerOpen)} title="색상 테마">
              <i className="fa-solid fa-palette" style={{ fontSize: '18px' }} />
            </button>
            {colorPickerOpen && (
              <>
                <div className="color-picker-overlay" onClick={() => setColorPickerOpen(false)} />
                <div className="color-picker-tooltip">
                  <div className="color-picker-arrow" />
                  {siteConfig.colorThemes.map(t => (
                    <button
                      key={t.key}
                      className={`color-dot${colorTheme === t.key ? ' active' : ''}`}
                      style={{ background: t.color }}
                      onClick={() => { setColorTheme(t.key); setColorPickerOpen(false) }}
                      title={t.label}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {user ? (
            <div className="nav-user-menu" ref={userMenuRef}>
              <button className="nav-user-btn" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                <div className="nav-user-avatar-placeholder">{userInitial}</div>
              </button>
              {userMenuOpen && (
                <div className="nav-user-dropdown">
                  <div className="dropdown-user-header">
                    <div className="dropdown-user-avatar">{userInitial}</div>
                    <div className="dropdown-user-info">
                      <div className="dropdown-user-name">{user.user_metadata?.display_name || '학습자'}</div>
                      <div className="dropdown-user-email">{user.email}</div>
                    </div>
                  </div>
                  <div className="divider" />
                  <Link to="/profile" className="dropdown-menu-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    내 프로필
                  </Link>
                  <div className="divider" />
                  <button className="dropdown-menu-item logout" onClick={handleSignOut}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="nav-login-btn">로그인</Link>
          )}

          <button
            className={`mobile-toggle${mobileOpen ? ' active' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  )
}
