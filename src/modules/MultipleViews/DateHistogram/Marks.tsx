import { type BinnedData, type XScale, type YScale } from '@/modules/MultipleViews/types'

export const Marks = ({
  yScale,
  xScale,
  binnedData,
  tooltipFormat,
  innerHeight,
}: {
  yScale: YScale
  xScale: XScale
  binnedData: BinnedData[]
  tooltipFormat: (arg: number) => number
  innerHeight: number
}) => {
  return (
    <g className="marks">
      {binnedData.map((d, i) => {
        return (
          <rect
            className="mark"
            key={`${d.x0}-${i}`}
            x={xScale(d.x0 ?? new Date(0))}
            y={yScale(d.y)}
            width={xScale(d.x1 ?? new Date(0)) - xScale(d.x0 ?? new Date(0))}
            height={innerHeight - yScale(d.y)}
          >
            {/* This will show a tooltip */}
            <title>{tooltipFormat(d.y)}</title>
          </rect>
        )
      })}
    </g>
  )
}
