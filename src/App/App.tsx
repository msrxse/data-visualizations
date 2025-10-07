// import { BarChart } from '@/modules/BarChart/BarChart'
// import { Histogram } from '@/modules/Histogram/Histogram'
// import { LineChart } from '@/modules/LineChart/LineChart'
// import { ScatterPlot } from '@/modules/ScatterPlot/ScatterPlot'
// import { WorldMap } from '@/modules/WorldMap/WorldMap'
import { MultipleViews } from '@/modules/MultipleViews/MultipleViews'

const App = () => {
  return (
    <div className="font-inter flex flex-col min-h-screen md:max-w-5xl mx-auto">
      <MultipleViews />
      {/* <Histogram />
      <WorldMap />
      <LineChart />
      <ScatterPlot />
      <BarChart /> */}
    </div>
  )
}

export { App }
