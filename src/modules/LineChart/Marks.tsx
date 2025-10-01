import { curveNatural, line } from 'd3'

import { type Data, type XScale, type YScale } from '@/modules/LineChart/types'

export const Marks = ({
  yScale,
  xScale,
  data,
  xValue,
  yValue,
  tooltipFormat,
  circleRadius,
}: {
  yScale: YScale
  xScale: XScale
  data: Data[]
  xValue: (d: Data) => Date
  yValue: (d: Data) => number
  tooltipFormat: (arg: Date) => string
  circleRadius: number
}) => {
  const lineGenerator = line<Data>()
    .x((d) => xScale(xValue(d)))
    .y((d) => yScale(yValue(d)))
    .curve(curveNatural)

  return (
    <g className="marks ">
      <path
        fill="none"
        stroke="black"
        d={lineGenerator(data) ?? undefined} // line() can return null if no data
      />
      {data.map((d, i) => {
        return (
          <circle
            className="mark"
            key={`${d.temperature}-${i}`}
            cx={xScale(xValue(d))}
            cy={yScale(yValue(d))}
            r={circleRadius}
          >
            {/* This will show a tooltip */}
            <title>{tooltipFormat(xValue(d))}</title>
          </circle>
        )
      })}
    </g>
  )
}
