import { useState } from 'react'

import { BubbleMap } from '@/modules/MultipleViews/BubbleMap/BubbleMap'
import { DateHistogram } from '@/modules/MultipleViews/DateHistogram/DateHistogram'
import { type Data } from '@/modules/MultipleViews/types'
import { useData } from '@/modules/MultipleViews/useData'
import { useWorldAtlas } from '@/modules/MultipleViews/useWorldAtlas'

import './styles.css'

const width = 1024
const height = 500
const dateHistogramSize = 0.2
const xValue = (d: Data) => d['Reported Date']

export function MultipleViews() {
  const worldAtlas = useWorldAtlas()
  const data = useData()
  const [brushExtent, setBrushExtent] = useState<[Date, Date]>()

  if (!worldAtlas || !data) {
    return <div>Loading...</div>
  }

  const filteredData = data.filter((d) => {
    if (!brushExtent) {
      return data
    }
    return xValue(d) > brushExtent[0] && xValue(d) < brushExtent[1]
  })

  return (
    <div className={`w-[${width}px] h-[${height}px]`}>
      <svg width={width} height={height}>
        <BubbleMap
          worldAtlas={worldAtlas}
          data={data}
          filteredData={filteredData}
          width={width}
          height={height}
        />
        <g transform={`translate(0,${height - dateHistogramSize * height})`}>
          <DateHistogram
            data={data}
            width={width}
            height={dateHistogramSize * height}
            setBrushExtent={setBrushExtent}
            xValue={xValue}
          />
        </g>
      </svg>
    </div>
  )
}
