import { BarChart } from '@/modules/BarChart/BarChart'
import { LineChart } from '@/modules/LineChart/LineChart'
import { ScatterPlot } from '@/modules/ScatterPlot/ScatterPlot'

const App = () => {
  return (
    <div className="font-inter flex flex-col min-h-screen md:max-w-3xl mx-auto">
      <LineChart />
      <ScatterPlot />
      <BarChart />
    </div>
  )
}

export { App }
