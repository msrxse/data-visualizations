import { scaleSqrt } from 'd3'
import { max } from 'd3-array'

import { Marks } from '@/modules/WorldMap/Marks'
import { type City } from '@/modules/WorldMap/types'
import { useCities } from '@/modules/WorldMap/useCities'
import { useWorldAtlas } from '@/modules/WorldMap/useWorldAtlas'

import './styles.css'

const width = 1024
const height = 500

export function WorldMap() {
  const worldAtlas = useWorldAtlas()
  const cities = useCities()

  if (!worldAtlas || !cities) {
    return <div>Loading...</div>
  }

  /**
   * Maps the output of the scale to tha radius of the circles
   * the area of the circles needs to correspond to data values
   *
   * area of a circle is A = pi*radius squared,
   * solving for the radius we get square root of A/pi
   * Thats why we need a squareRoot scale.
   *
   * Also both origins of domain and range must be zero
   */
  const sizeValue = (d: City) => d.population
  const maxRadius = 20
  const sizeScale = scaleSqrt()
    .domain([0, max(cities, sizeValue) ?? 0]) // max() can return undefined!
    .range([0, maxRadius])

  return (
    <div className={`w-[${width}px] h-[${height}px]`}>
      <svg width={width} height={height}>
        <Marks
          worldAtlas={worldAtlas}
          cities={cities}
          width={width}
          height={height}
          sizeScale={sizeScale}
          sizeValue={sizeValue}
        />
      </svg>
    </div>
  )
}
