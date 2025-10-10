import { type Data, type XScale, type YScale } from '@/modules/LogScatterPlot/types'

export const Marks = ({
  yScale,
  xScale,
  data,
  tooltipFormat,
  xValue,
  yValue,
  circleRadius,
}: {
  yScale: YScale
  xScale: XScale
  data: Data[]
  tooltipFormat: (arg: Date) => string
  xValue: (d: Data) => Date
  yValue: (d: Data) => number
  circleRadius: number
}) => {
  return data.map((d, i) => {
    return (
      <circle
        key={`${i}`}
        className="mark"
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={circleRadius}
      >
        <title>{tooltipFormat(xValue(d))}</title>
      </circle>
    )
  })
}
