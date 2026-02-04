const Home = ({ onLogin, onDashboard }) => {
  return (
    <div className="min-h-screen grid place-items-center text-center p-6 text-white">
      <div className="max-w-2xl grid gap-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
        <h1 className="text-3xl md:text-4xl font-bold">
          Welcome to Diet &amp; Workout Recommendation System
        </h1>
        <p className="text-base md:text-lg">
          Your personalized diet plan starts here. Let’s improve your health with science-backed meal suggestions!
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button className="px-4 py-2 rounded bg-white/90 text-black" onClick={onLogin}>
            🔐 Login
          </button>
          <button className="px-4 py-2 rounded bg-emerald-500 text-white" onClick={onDashboard}>
            📊 Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
