import { type YScale } from '@/modules/BarChart/types'

// Two ways to do Axis
// 1. Use d3-axis to generate axis and render with d3 (within useEffect with refs)
// 2. Tick generation utility of the scale and render with React (we will do this one)
export const AxisLeft = ({ yScale }: { yScale: YScale }) =>
  // ticks() don't apply to bandScales - so use domain() instead
  yScale.domain().map((tickValue) => (
    // here instead of <g> with transform, we can use y in <text> (x is 0 that is default so we remove it)
    // transform={`translate(0, ${yScale(tickValue) + yScale.bandwidth() / 2})`}
    <g className="tick" key={tickValue}>
      <text
        textAnchor="end"
        dy=".32em"
        x={-3}
        // yScale() returns the y coordinate of the top (bottom!!) of the bar, added the bandwidth/2 to set it in the middle
        y={yScale(tickValue)! + yScale.bandwidth() / 2}
      >
        {tickValue}
      </text>
    </g>
  ))
