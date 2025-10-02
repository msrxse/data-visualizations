import { type CScale, type Data, type XScale, type YScale } from '@/modules/ScatterPlot/types'

export const Marks = ({
  yScale,
  xScale,
  colorScale,
  data,
  xValue,
  yValue,
  colorValue,
  tooltipFormat,
  circleRadius,
}: {
  yScale: YScale
  xScale: XScale
  colorScale: CScale
  data: Data[]
  xValue: (arg: Data) => number
  yValue: (arg: Data) => number
  colorValue: (arg: Data) => string
  tooltipFormat: (arg: number) => string
  circleRadius: number
}) => {
  return data.map((d, i) => {
    return (
      <circle
        key={`${d.sepal_length}-${d.sepal_width}-${i}`}
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={circleRadius}
        fill={colorScale(colorValue(d))}
      >
        {/* This will show a tooltip */}
        <title>{tooltipFormat(xValue(d))}</title>
      </circle>
    )
  })
}
