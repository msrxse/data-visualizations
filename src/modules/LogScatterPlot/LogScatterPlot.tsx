import { extent, scaleLog, scaleTime, timeFormat } from 'd3'

import { AxisBottom } from '@/modules/LogScatterPlot/AxisBottom'
import { AxisLeft } from '@/modules/LogScatterPlot/AxisLeft'
import { Marks } from '@/modules/LogScatterPlot/Marks'
import { type Data } from '@/modules/LogScatterPlot/types'
import { useData } from '@/modules/LogScatterPlot/useData'

import './styles.css'

const width = 1024
const height = 500
const margin = { top: 20, right: 40, bottom: 65, left: 90 }
const innerHeight = height - margin.top - margin.bottom
const innerWidth = width - margin.left - margin.right
const xAxisLabelOffset = 45
const yAxisLabelOffset = 50

// Accessor functions
const xValue = (d: Data) => d['Reported Date']
const xAxisLabel = 'Time'

const yValue = (d: Data) => d['Total Dead and Missing']
const yAxisLabel = 'Total Dead and Missing'

const xAxisTickFormat = timeFormat('%m/%d/%Y')

/**
 * About binned aggregation
 * // https://observablehq.com/@d3/d3-bin
 *
 *  We use a data visualization technique called binned aggregation.
 *  Take each of the points in data and classify them into bins - in this case by month. (Each month is a bin)
 *  The aggregation function applied to the bin elements will be count() - we want to count how many deaths withing each month
 *  We will use d3.bin()  - used to be called d3.LogScatterPlot()
 *
 *  we will use d3.sum() as the aggregation function
 *.
 */
export function LogScatterPlot() {
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

  // The yScale domain should go from x=0 (because is a barchart - bars start at the x=0) and the y= totalDeadAndMissing value (the aggregated value that we renamed y)
  const domain = extent(data, yValue)

  const yScale = scaleLog()
    .domain([1, domain[1] ?? 0]) // the domain must not include or cross zero because log 0 is minus infinity. Replace zero with a closer number 0.01 for example
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
            tooltipFormat={xAxisTickFormat}
            xValue={xValue}
            yValue={yValue}
            circleRadius={2}
          />
        </g>
      </svg>
    </div>
  )
}
