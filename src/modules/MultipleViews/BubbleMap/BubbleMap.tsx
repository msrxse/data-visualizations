import { useMemo } from 'react'

import { scaleSqrt } from 'd3'
import { max } from 'd3-array'

import { Marks } from '@/modules/MultipleViews/BubbleMap/Marks'
import { type Data, type WorldAtlas } from '@/modules/MultipleViews/types'

const sizeValue = (d: Data) => d['Total Dead and Missing']
const maxRadius = 20
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
export const BubbleMap = ({
  worldAtlas,
  data,
  filteredData,
  width,
  height,
}: {
  worldAtlas: WorldAtlas
  data: Data[]
  filteredData: Data[]
  width: number
  height: number
}) => {
  const sizeScale = useMemo(() => {
    return scaleSqrt()
      .domain([0, max(data, sizeValue) ?? 0]) // max() can return undefined!
      .range([0, maxRadius])
  }, [data]) // maxRadius and sizeValue aren't here since we declare they cant change between rerenders (declared outside)

  return (
    <Marks
      worldAtlas={worldAtlas}
      data={filteredData}
      width={width}
      height={height}
      sizeScale={sizeScale}
      sizeValue={sizeValue}
    />
  )
}
