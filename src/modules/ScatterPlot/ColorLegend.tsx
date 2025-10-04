import { type Dispatch, type SetStateAction } from 'react'

import { type CScale } from '@/modules/ScatterPlot/types'

export const ColorLegend = ({
  colorScale,
  tickSpacing = 20,
  tickSize = 10,
  tickTextOffset = 10,
  onHover,
  hoveredValue,
  fadeOpacity,
}: {
  colorScale: CScale
  tickSpacing?: number
  tickSize?: number
  tickTextOffset?: number
  onHover: Dispatch<SetStateAction<string | null>>
  hoveredValue: string | null
  fadeOpacity: number
}) => {
  // domain returns an array of the species
  return colorScale.domain().map((domainValue, i) => (
    <g
      className="tick"
      key={domainValue}
      transform={`translate(0,${i * tickSpacing})`}
      onMouseEnter={() => onHover(domainValue)}
      // the value of null is used as a sentinel value to indicate nothingness.
      // You intentionally defined something to be null,
      // as opposed to undefined - the default thing that variables are when you just dont define them.
      onMouseOut={() => onHover(null)}
      opacity={hoveredValue && domainValue !== hoveredValue ? fadeOpacity : 1}
    >
      <circle fill={colorScale(domainValue)} r={tickSize} />
      <text x={tickTextOffset} dy=".32em">
        {domainValue}
      </text>
    </g>
  ))
}
