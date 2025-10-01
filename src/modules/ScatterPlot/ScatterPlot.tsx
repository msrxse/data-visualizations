import { useState } from 'react'

import { extent, format, scaleLinear } from 'd3'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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

const siFormat = format('.2s') // Produces the si formatter - extracted from line bellow to not create a fn every time it is invoked
const xAxisTickFormat = (tickValue: number) => siFormat(tickValue).replace('G', 'B') // invokes siformatter - produces the string and replaces G for B
const selectItems = {
  sepal_length: 'Sepal Length',
  sepal_width: 'Sepal Width',
  petal_length: 'Petal Length',
  petal_width: 'Petal Width',
}

export function ScatterPlot() {
  const data = useData()
  const [xSelected, setXSelected] = useState<keyof typeof selectItems>('sepal_length')
  const [ySelected, setYSelected] = useState<keyof typeof selectItems>('sepal_width')

  // Accessor functions
  const xValue = (d: Data) => d[xSelected]
  const yValue = (d: Data) => d[ySelected]
  const getLabel = (key: keyof typeof selectItems) => selectItems[key]

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
      <div className="flex flex-row items-center shadow-sm space-x-2 bg-gray-50">
        <label className="text-xl text-gray-900 ml-2">x:</label>
        <Select onValueChange={(value) => setXSelected(value as keyof typeof selectItems)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={getLabel(xSelected)} />
          </SelectTrigger>
          <SelectContent className="bg-gray-50">
            {Object.entries(selectItems).map(([key, label]) => (
              <SelectItem key={key} className="hover:bg-blue-100" value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <label className="text-xl text-gray-900">y:</label>
        <Select onValueChange={(value) => setYSelected(value as keyof typeof selectItems)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={getLabel(ySelected)} />
          </SelectTrigger>
          <SelectContent className="bg-gray-50">
            {Object.entries(selectItems).map(([key, label]) => (
              <SelectItem key={key} className="hover:bg-blue-100" value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
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
            {getLabel(ySelected)}
          </text>
          <text
            className="axis-label"
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
            textAnchor="middle"
          >
            {getLabel(xSelected)}
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
