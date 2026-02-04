import React from 'react'

const Navbar = ({ onHome, onLogout }) => {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-white/10 bg-slate-900/70 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <strong className="text-white">Diet & Workout</strong>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onHome}
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20">
           Home
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-full border border-emerald-300/40 bg-emerald-400/20 px-4 py-2 text-sm font-semibold text-emerald-100 shadow-sm hover:bg-emerald-400/30">
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
