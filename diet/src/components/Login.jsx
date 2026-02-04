import React, { useState } from 'react'

const Login = ({ onBack, onSuccess }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState(false)
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const inputClass =
    'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (mode === 'register') {
      setMode('login')
      return
    }
    setSuccess(true)
    if (onSuccess) {
      setTimeout(onSuccess, 800)
    }
  }

  return (
    <div className="min-h-screen bg-transparent px-4">
      <div className="fixed left-1/2 top-4 z-50 w-full max-w-md -translate-x-1/2 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full rounded-2xl border border-white/20 bg-white/60 p-6 text-slate-900 shadow-lg backdrop-blur-sm"
        >
          <h2 className="text-xl font-semibold">{mode === 'login' ? 'Login' : 'Register'}</h2>
          <div className="mt-4 grid gap-3">
            {mode === 'register' && (
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={inputClass}
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClass}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={inputClass}
            />
            <button
              type="submit"
              className="rounded-lg bg-emerald-500 px-4 py-2 text-white shadow hover:bg-emerald-600"
            >
              {mode === 'login' ? 'Login' : 'Create Account'}
            </button>
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-700 hover:bg-slate-50"
            >
              {mode === 'login' ? 'Sign Up' : 'Back to Login'}
            </button>
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-700 hover:bg-slate-50"
              >
                Back
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
