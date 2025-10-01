import { Marks } from '@/modules/WorldMap/Marks'
import { useData } from '@/modules/WorldMap/useData'

import './styles.css'

const width = 600
const height = 500

export function WorldMap() {
  const data = useData()

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <div className={`w-[${width}px] h-[${height}px]`}>
      <svg width={width} height={height}>
        <Marks data={data} width={width} height={height} />
      </svg>
    </div>
  )
}
