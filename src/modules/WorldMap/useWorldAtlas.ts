import { useEffect, useState } from 'react'

import { json } from 'd3'
import { feature, mesh } from 'topojson'

import { type WorldAtlas, type WorldTopoJSON } from './types'

const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json'

/**
 * 1. this data is topoJSON data  and combined with a projection
 * that will translate latitude/longitude coordinates into pixel coordinates
 *
 * Data has a type="Topology" - This is j=how we k=know it is topoJSON data
 *
 * 2. to make use of topoJSON you need to transform it into GeoJSON data. So we can render the shapes
 * the data structure of GeoJSON is easier to work with - each poligon is represented by an array of
 * coordinate pairs and we can m,ap directly to SVG paths.
 *
 * */
export const useWorldAtlas = () => {
  const [data, setData] = useState<WorldAtlas | null>(null)

  useEffect(() => {
    json<WorldTopoJSON>(jsonUrl).then((topology) => {
      if (topology) {
        const { countries, land } = topology.objects

        setData({
          land: feature(topology, land) as WorldAtlas['land'],
          countries: feature(topology, countries) as WorldAtlas['countries'],
          interiors: mesh(topology, countries, (a, b) => a !== b) as WorldAtlas['interiors'],
        })
      }
    })
  }, [])

  return data
}
