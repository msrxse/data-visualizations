import { type XScale } from '@/modules/Histogram/types'

// Two ways to do Axis
// 1. Use d3-axis to generate axis and render with d3 (within useEffect with refs)
// 2. Tick generation utility of the scale and render with React (we will do this one)
export const AxisBottom = ({
  xScale,
  innerHeight,
  tickFormat,
  tickOffset = 3,
}: {
  xScale: XScale
  innerHeight: number
  tickFormat: (val: Date) => string
  tickOffset: number
}) =>
  xScale.ticks().map((tickValue) => (
    // Instead of line x1 and x2 = xScale(tickValue), we can use transform here
    <g className="tick" key={xScale(tickValue)} transform={`translate(${xScale(tickValue)},0)`}>
      <line y2={innerHeight} />
      <text textAnchor="middle" y={innerHeight + tickOffset} dy=".71em">
        {tickFormat(tickValue)}
      </text>
    </g>
  ))
