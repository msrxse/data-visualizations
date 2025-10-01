import { BarChart } from '@/modules/BarChart/BarChart'
import { ScatterPlot } from '@/modules/ScatterPlot/ScatterPlot'

const App = () => {
  return (
    <div className="font-inter flex flex-col min-h-screen md:max-w-3xl mx-auto">
      <BarChart />
      <ScatterPlot />
    </div>
  )
}

export { App }
