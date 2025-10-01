import { extent, scaleLinear, scaleTime, timeFormat } from 'd3'

import { AxisBottom } from '@/modules/LineChart/AxisBottom'
import { AxisLeft } from '@/modules/LineChart/AxisLeft'
import { Marks } from '@/modules/LineChart/Marks'
import { type Data } from '@/modules/LineChart/types'
import { useData } from '@/modules/LineChart/useData'

import './styles.css'

const width = 600
const height = 500
const margin = { top: 20, right: 40, bottom: 65, left: 90 }
const innerHeight = height - margin.top - margin.bottom
const innerWidth = width - margin.left - margin.right
const xAxisLabelOffset = 45
const yAxisLabelOffset = 50

// Accessor functions
const xValue = (d: Data) => d.timestamp
const xAxisLabel = 'Time'

const yValue = (d: Data) => d.temperature
const yAxisLabel = 'Temperature'

const xAxisTickFormat = timeFormat('%a')

export function LineChart() {
  const data = useData()

  if (!data) {
    return <div>Loading...</div>
  }

  const [xMin, xMax] = extent(data, xValue)
  // Linear scale - maps a continuous domain to a continuous range
  const xScale = scaleTime()
    .domain([xMin ?? new Date(0), xMax ?? new Date(0)]) // fallback if undefined (better than casting)
    .range([0, innerWidth])
    .nice() // makes sure the end points are nice numbers, that the scale domain itself starts/ends on round numbers

  const [yMin, yMax] = extent(data, yValue)
  const yScale = scaleLinear()
    .domain([yMin ?? 0, yMax ?? 0]) // fallback if undefined
    .range([innerHeight, 0])
    .nice()

  return (
    <div className={`w-[${width}px] h-[${height}px]`}>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xAxisTickFormat}
            tickOffset={7}
          />
          <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={7} />
          <text
            className="axis-label"
            textAnchor="middle"
            // instead of x={-yAxisLabelOffset} and y={innerHeight / 2} we translate the actual text before the rotate happens
            transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90)`}
          >
            {yAxisLabel}
          </text>
          <text
            className="axis-label"
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
            textAnchor="middle"
          >
            {xAxisLabel}
          </text>
          <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            tooltipFormat={xAxisTickFormat}
            circleRadius={3}
          />
        </g>
      </svg>
    </div>
  )
}
