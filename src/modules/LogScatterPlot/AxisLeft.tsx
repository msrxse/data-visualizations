import { type YScale } from '@/modules/LogScatterPlot/types'

// Two ways to do Axis
// 1. Use d3-axis to generate axis and render with d3 (within useEffect with refs)
// 2. Tick generation utility of the scale and render with React (we will do this one)
export const AxisLeft = ({
  yScale,
  innerWidth,
  tickOffset = 3,
}: {
  yScale: YScale
  innerWidth: number
  tickOffset: number
}) =>
  yScale.ticks().map((tickValue) => (
    // Since we apply transform to the group - individual line and text dont need y1, y2
    <g className="tick" key={tickValue} transform={`translate(0, ${yScale(tickValue)})`}>
      <line x2={innerWidth} />
      {/* The tickFormat fn can fix when too many labels for your tick-marks */}
      {yScale.tickFormat()(tickValue) ? (
        <text textAnchor="end" dy=".32em" x={-tickOffset}>
          {tickValue}
        </text>
      ) : null}
    </g>
  ))
