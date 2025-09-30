import { format, max, scaleBand, scaleLinear } from 'd3'

import { AxisBottom } from '@/modules/BarChart/AxisBottom'
import { AxisLeft } from '@/modules/BarChart/AxisLeft'
import { Marks } from '@/modules/BarChart/Marks'
import { type Data } from '@/modules/BarChart/types'
import { useData } from '@/modules/BarChart/useData'

import './styles.css'

const width = 600
const height = 500
const margin = { top: 20, right: 40, bottom: 45, left: 200 }
const innerHeight = height - margin.top - margin.bottom
const innerWidth = width - margin.left - margin.right
const xAxisLabelOffset = 35

// Accessor functions
const yValue = (d: Data) => d.Country
const xValue = (d: Data) => d.Population

const siFormat = format('.2s') // Produces the si formatter - extracted from line bellow to not create a fn every time it is invoked
const xAxisTickFormat = (tickValue: number) => siFormat(tickValue).replace('G', 'B') // invokes siformatter - produces the string and replaces G for B

export function BarChart() {
  const data = useData()

  if (!data) {
    return <div>Loading...</div>
  }

  // Band scale - divides continuous scale into uniform bands
  const yScale = scaleBand().domain(data.map(yValue)).range([0, innerHeight]).paddingInner(0.1)
  // Linear scale - maps a continuous domain to a continuous range
  const xScale = scaleLinear()
    .domain([0, max(data, xValue) ?? 0]) // fallback to 0 because max() returns number | undefined
    .range([0, innerWidth])

  return (
    <div className={`w-[${width}px] h-[${height}px]`}>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom xScale={xScale} innerHeight={innerHeight} tickFormat={xAxisTickFormat} />
          <AxisLeft yScale={yScale} />
          <text
            className="axis-label"
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
            textAnchor="middle"
          >
            Population
          </text>
          <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            tooltipFormat={xAxisTickFormat}
          />
        </g>
      </svg>
    </div>
  )
}
