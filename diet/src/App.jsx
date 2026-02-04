import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import bg from './assets/diet.png'

function App() {
  const [page, setPage] = useState('home')
  const [isAuthed, setIsAuthed] = useState(false)
  const [loginNotice, setLoginNotice] = useState(false)

  const goHome = () => setPage('home')
  const goLogin = () => setPage('login')
  const goDashboard = () => setPage(isAuthed ? 'dashboard' : 'login')

  const handleLoginSuccess = () => {
    setIsAuthed(true)
    setPage('dashboard')
    setLoginNotice(true)
    setTimeout(() => setLoginNotice(false), 3000)
  }
  const handleLogout = () => {
    setIsAuthed(false)
    setPage('home')
  }

  return (
    <div className="app-shell text-white">
      <div className="app-bg" style={{ backgroundImage: `url(${bg})` }} />
      <div className="app-vignette" aria-hidden="true" />
      <div className="app-content flex min-h-screen flex-col">
        <Navbar onHome={goHome} onLogout={handleLogout} />
        {loginNotice && (
          <div className="mx-auto mt-3 w-full max-w-5xl px-4">
            <div className="rounded-xl border border-emerald-200/40 bg-emerald-400/20 px-4 py-2 text-sm font-semibold text-emerald-100 shadow">
              ✅ Login successful — welcome back!
            </div>
          </div>
        )}
        {page === 'home' && (
          <Home onLogin={goLogin} onDashboard={goDashboard} />
        )}
        {page === 'login' && (
          <Login onBack={goHome} onSuccess={handleLoginSuccess} />
        )}
        {page === 'dashboard' && <Dashboard />}
        <Footer />
      </div>
    </div>
  )
}

export default App
