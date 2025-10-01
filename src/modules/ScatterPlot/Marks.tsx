import { type Data, type XScale, type YScale } from '@/modules/ScatterPlot/types'

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
  xValue: (arg: Data) => number
  yValue: (arg: Data) => number
  tooltipFormat: (arg: number) => string
  circleRadius: number
}) => {
  return data.map((d, i) => {
    return (
      <circle
        className="mark"
        key={`${d.sepal_length}-${d.sepal_width}-${i}`}
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={circleRadius}
      >
        {/* This will show a tooltip */}
        <title>{tooltipFormat(xValue(d))}</title>
      </circle>
    )
  })
}
