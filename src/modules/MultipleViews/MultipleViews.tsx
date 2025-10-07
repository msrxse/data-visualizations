import { BubbleMap } from '@/modules/MultipleViews/BubbleMap/BubbleMap'
import { DateHistogram } from '@/modules/MultipleViews/DateHistogram/DateHistogram'
import { useData } from '@/modules/MultipleViews/useData'
import { useWorldAtlas } from '@/modules/MultipleViews/useWorldAtlas'

import './styles.css'

const width = 1024
const height = 500
const dateHistogramSize = 0.2

export function MultipleViews() {
  const worldAtlas = useWorldAtlas()
  const data = useData()

  if (!worldAtlas || !data) {
    return <div>Loading...</div>
  }

  return (
    <div className={`w-[${width}px] h-[${height}px]`}>
      <svg width={width} height={height}>
        <BubbleMap worldAtlas={worldAtlas} data={data} width={width} height={height} />
        <g transform={`translate(0,${height - dateHistogramSize * height})`}>
          <DateHistogram data={data} width={width} height={dateHistogramSize * height} />
        </g>
      </svg>
    </div>
  )
}
