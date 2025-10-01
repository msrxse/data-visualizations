import { extent, format, scaleLinear } from 'd3'

import { AxisBottom } from '@/modules/ScatterPlot/AxisBottom'
import { AxisLeft } from '@/modules/ScatterPlot/AxisLeft'
import { Marks } from '@/modules/ScatterPlot/Marks'
import { type Data } from '@/modules/ScatterPlot/types'
import { useData } from '@/modules/ScatterPlot/useData'

import './styles.css'

const width = 600
const height = 500
const margin = { top: 20, right: 40, bottom: 65, left: 90 }
const innerHeight = height - margin.top - margin.bottom
const innerWidth = width - margin.left - margin.right
const xAxisLabelOffset = 45
const yAxisLabelOffset = 50

// Accessor functions
const xValue = (d: Data) => d.sepal_length
const xAxisLabel = 'Sepal Length'

const yValue = (d: Data) => d.sepal_width
const yAxisLabel = 'Sepal Width'

const siFormat = format('.2s') // Produces the si formatter - extracted from line bellow to not create a fn every time it is invoked
const xAxisTickFormat = (tickValue: number) => siFormat(tickValue).replace('G', 'B') // invokes siformatter - produces the string and replaces G for B

export function ScatterPlot() {
  const data = useData()

  if (!data) {
    return <div>Loading...</div>
  }

  // Linear scale - maps a continuous domain to a continuous range
  const xScale = scaleLinear()
    .domain(extent(data, xValue) as [number, number]) // force cast (we know data is not empty) - otherwise: [xMin ?? 0, xMax ?? 0]
    .range([0, innerWidth])
    .nice() // makes sure the end points are nice numbers, that the scale domain itself starts/ends on round numbers
  const yScale = scaleLinear()
    .domain(extent(data, yValue) as [number, number])
    .range([0, innerHeight])

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
            circleRadius={7}
          />
        </g>
      </svg>
    </div>
  )
}
