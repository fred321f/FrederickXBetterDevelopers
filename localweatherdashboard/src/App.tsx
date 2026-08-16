import WeatherDashboard from '@/components/dashboard/WeatherDashboard'

/**
 * Wraps whichever state WeatherDashboard renders (loading, error, empty,
 * or the loaded dashboard) in a single contained, centered layout, so all
 * four states get consistent max-width/padding rather than only the
 * loaded state happening to look right.
 */
function App() {
  return (
    <main role="main">
      <div className="flex flex-col p-4 md:p-10 md:h-screen min-h-screen overflow-x-hidden overflow-y-auto">
        <div className="flex-1 md:*:h-full min-h-0">
          <WeatherDashboard />
        </div>
      </div>
    </main>
  )
}

export default App
