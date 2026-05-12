import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import SplashPage from './pages/SplashPage'
import HomePage from './pages/HomePage'
import UploadPage from './pages/UploadPage'
import ResultPage from './pages/ResultPage'
import TodayPage from './pages/TodayPage'
import ProfilePage from './pages/ProfilePage'
import TabBar from './components/layout/TabBar'
import Toast from './components/shared/Toast'

export default function App() {
  const location = useLocation()

  // Pages without tab bar
  const fullScreenPaths = ['/splash']
  const resultPath = '/result'
  const isFullScreen =
    fullScreenPaths.includes(location.pathname) ||
    location.pathname.startsWith(resultPath)

  return (
    <div className="app-shell relative">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/splash" element={<SplashPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/result/:id" element={<ResultPage />} />
          <Route path="/today" element={<TodayPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/splash" replace />} />
        </Routes>
      </AnimatePresence>

      {!isFullScreen && <TabBar />}
      <Toast />
    </div>
  )
}
