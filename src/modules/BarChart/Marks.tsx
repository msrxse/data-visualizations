import { type Data, type XScale, type YScale } from '@/modules/BarChart/types'

export const Marks = ({
  yScale,
  xScale,
  data,
  xValue,
  yValue,
  tooltipFormat,
}: {
  yScale: YScale
  xScale: XScale
  data: Data[]
  xValue: (arg: Data) => number
  yValue: (arg: Data) => string
  tooltipFormat: (arg: number) => string
}) => {
  return data.map((d) => {
    return (
      <rect
        className="mark"
        key={yValue(d)}
        x={0}
        y={yScale(yValue(d))}
        width={xScale(xValue(d))}
        height={yScale.bandwidth()}
      >
        {/* This will show a tooltip */}
        <title>{tooltipFormat(xValue(d))}</title>
      </rect>
    )
  })
}
