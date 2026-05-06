
import { Routes, Route, useLocation } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { ListingPage } from './features/listings'
import { LoginPage } from './features/auth'
import ProtectedRoute from './shared/components/ProtectedRoute'
import NotFound from './shared/components/NotFound'
import Spinner from './shared/components/Spinner'
import Navbar from './shared/components/Navbar'

const ListingDetail = lazy(() => import('./features/listings/pages/ListingDetail'))
const DashboardPage = lazy(() => import('./features/auth/pages/DashboardPage'))

function App() {
  const location = useLocation()

  useEffect(() => {
    nprogress.start()
    const timer = setTimeout(() => nprogress.done(), 100)
    return () => {
      clearTimeout(timer)
      nprogress.done()
    }
  }, [location])

  return (
    <>
      <Navbar />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<ListingPage />} />
          <Route path="/listings/:id" element={<ListingDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
