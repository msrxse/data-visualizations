import { useMemo } from 'react'

import { geoGraticule, geoNaturalEarth1, geoPath } from 'd3-geo'

import { type Data, type SizeScale, type WorldAtlas } from '@/modules/MultipleViews/types'

const graticule = geoGraticule()
/**
 *
 * Two things:
 * 1. How to get from GeoJSON to SGV paths?
 *    How to get from longitude/latitude to pixel coordinates
 * 2. then how do you generate the line string you then pass into these SVG paths
 *
 * d3/d3-geo has utilities to help you with these 2 things above
 *
 * topojson.mesh removes borders facing the water while keeping interior borders!
 *
 * Graticules = lines that show the longitude and latitude lines: geo.graticule()
 *
 */
export const Marks = ({
  width,
  height,
  worldAtlas: { land, interiors },
  data,
  sizeScale,
  sizeValue,
}: {
  width: number
  height: number
  worldAtlas: WorldAtlas
  data: Data[]
  sizeScale: SizeScale
  sizeValue: (data: Data) => number
}) => {
  const projection = geoNaturalEarth1().fitSize([width, height], { type: 'Sphere' })
  const path = geoPath(projection)

  return (
    <g className="marks">
      {/* This JSX does not need to rerender with brush changes - we can memo this */}
      {useMemo(() => {
        return (
          <>
            <path className="sphere" d={path({ type: 'Sphere' }) ?? undefined} />
            <path className="graticule" d={path(graticule()) ?? undefined} />
            {land.features.map((feature, i) => {
              return <path className="land" key={`${i}`} d={path(feature) ?? undefined} />
            })}
            <path className="interiors" d={path(interiors) ?? undefined} />
          </>
        )
        // We moved graticule outside of this parent fn since it was making
        // this useMemo not work
      }, [interiors, land.features, path])}

      {data.map((d, i) => {
        /**
         * We assign a radius based on the population of each city
         * sizeScale(sizeValue(d))
         */
        const point = projection(d.coords)
        if (!point) return null
        const [x, y] = point

        return (
          <circle key={`${d['Reported Date']}-${i}`} cx={x} cy={y} r={sizeScale(sizeValue(d))} />
        )
      })}
    </g>
  )
}
