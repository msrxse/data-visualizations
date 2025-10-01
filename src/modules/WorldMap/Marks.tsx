import { geoGraticule, geoNaturalEarth1, geoPath } from 'd3-geo'

import { type Data } from '@/modules/WorldMap/types'

/**
 *
 * Two things:
 * 1. How to get from GeoJSON to SGV paths?
 *    How to get from longitude/latitude to pixel coordinates
 * 2. then how do you generate the line string you we pass into these SVG paths
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
  data: { land, interiors },
}: {
  width: number
  height: number
  data: Data
}) => {
  const projection = geoNaturalEarth1().fitSize([width, height], { type: 'Sphere' })
  const path = geoPath(projection)
  const graticule = geoGraticule()

  return (
    <g className="marks">
      <path className="sphere" d={path({ type: 'Sphere' }) ?? undefined} />
      <path className="graticule" d={path(graticule()) ?? undefined} />
      {land.features.map((feature, i) => {
        return <path className="land" key={`${i}`} d={path(feature) ?? undefined} />
      })}
      <path className="interiors" d={path(interiors) ?? undefined} />
    </g>
  )
}
