import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import useCodeCopy from '../hooks/useCodeCopy'
import { LicenseProvider } from './LicenseGuard'
import LockOverlay from './LockOverlay'

export default function PublicLayout() {
  useCodeCopy()

  return (
    <LicenseProvider>
    <div className="site-wrapper">
      <Navbar />
      <main className="site-main">
        <Suspense fallback={
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <div className="loading-spinner" />
          </div>
        }>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <LockOverlay />
    </div>
    </LicenseProvider>
  )
}
