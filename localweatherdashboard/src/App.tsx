import WeatherDashboard from '@/components/dashboard/WeatherDashboard'

/**
 * Wraps whichever state WeatherDashboard renders (loading, error, empty,
 * or the loaded dashboard) in a single contained, centered layout, so all
 * four states get consistent max-width/padding rather than only the
 * loaded state happening to look right.
 */
function App() {
  return (
    <div className="min-h-screen p-6 md:p-10">
      <WeatherDashboard />
    </div>
  )
}

export default App
