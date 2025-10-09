import { type Dispatch, type SetStateAction, useEffect, useRef } from 'react'

import {
  bin,
  brushX,
  extent,
  max,
  scaleLinear,
  scaleTime,
  select,
  sum,
  timeFormat,
  timeMonths,
} from 'd3'

import { AxisBottom } from '@/modules/MultipleViews/DateHistogram/AxisBottom'
import { AxisLeft } from '@/modules/MultipleViews/DateHistogram/AxisLeft'
import { Marks } from '@/modules/MultipleViews/DateHistogram/Marks'
import { type Data } from '@/modules/MultipleViews/types'

const margin = { top: 0, right: 30, bottom: 20, left: 45 }

const xAxisLabelOffset = 54
const yAxisLabelOffset = 30

// Accessor functions

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
 *  We will use d3.bin()  - used to be called d3.histogram()
 *
 *  we will use d3.sum() as the aggregation function
 *.
 */
export function DateHistogram({
  data,
  width,
  height,
  setBrushExtent,
  xValue,
}: {
  data: Data[]
  width: number
  height: number
  setBrushExtent: Dispatch<SetStateAction<[Date, Date] | undefined>>
  xValue: (d: Data) => Date
}) {
  const brushRef = useRef<SVGGElement | null>(null)
  const [xMin, xMax] = extent(data, xValue)
  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  // Linear scale - maps a continuous domain to a continuous range
  const xScale = scaleTime()
    .domain([xMin ?? new Date(0), xMax ?? new Date(0)]) // fallback if undefined (better than casting)
    .range([0, innerWidth])
    .nice() // makes sure the end points are nice numbers, that the scale domain itself starts/ends on round numbers

  // We know we need months so we use timeMonths to return the number of months within [start,stop]
  const [start, stop] = xScale.domain()
  // Here we derive out binned data from data
  const binnedData = bin<Data, Date>() // construct iterator - adding the data creates the bins / .value() will add the aggregation function
    .value(xValue)
    .domain(xScale.domain() as [Date, Date]) // extent(data, xValue) would also work but like there we ensure data in binned from 1st to 1st of each month
    .thresholds(timeMonths(start ?? new Date(0), stop ?? new Date(0)))(data)
    .map((array) => ({
      // Here we add the aggregation sum fn
      y: sum(array, yValue),
      x0: array.x0, // bring back x0, x1
      x1: array.x1,
    }))

  // The yScale domain should go from x=0 (because is a barchart - bars start at the x=0) and the y= totalDeadAndMissing value (the aggregated value that we renamed y)
  const yScale = scaleLinear()
    .domain([0, max(binnedData, (d) => d.y) ?? 0])
    .range([innerHeight, 0])

  useEffect(() => {
    const brush = brushX().extent([
      [0, 0],
      [innerWidth, innerHeight],
    ])

    if (brushRef.current) {
      brush(select(brushRef.current))
    }

    /**
     * the cb fn needs to access the event.selection
     * event.selection gives you [start, end] coords in pixels
     * xScale.invert => Now we get these back into our domain values (transform them into dates)
     *
     */
    brush.on('brush', (event) => {
      setBrushExtent(event.selection.map(xScale.invert)) // since event.selection is a selection - you can map()
    })
  }, [innerWidth, innerHeight, xScale.invert, setBrushExtent])

  return (
    <>
      <rect width={width} height={height} fill="white" />
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
          transform={`translate(${-yAxisLabelOffset}, ${(innerHeight + 15) / 2}) rotate(-90)`}
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
          binnedData={binnedData}
          xScale={xScale}
          yScale={yScale}
          tooltipFormat={(d) => d}
          innerHeight={innerHeight}
        />
        <g ref={brushRef} />
      </g>
    </>
  )
}
