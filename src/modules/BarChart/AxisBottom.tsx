import { type XScale } from '@/modules/BarChart/types'

// Two ways to do Axis
// 1. Use d3-axis to generate axis and render with d3 (within useEffect with refs)
// 2. Tick generation utility of the scale and render with React (we will do this one)
export const AxisBottom = ({
  xScale,
  innerHeight,
  tickFormat,
}: {
  xScale: XScale
  innerHeight: number
  tickFormat: (val: number) => string
}) =>
  xScale.ticks().map((tickValue) => (
    // Instead of line x1 and x2 = xScale(tickValue), we can use transform here
    <g className="tick" key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
      <line y2={innerHeight} />
      <text textAnchor="middle" y={innerHeight + 3} dy=".71em">
        {tickFormat(tickValue)}
      </text>
    </g>
  ))
