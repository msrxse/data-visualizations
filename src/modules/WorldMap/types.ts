import { type ScalePower } from 'd3'
import { type FeatureCollection, type Geometry, type MultiLineString } from 'geojson'
import { type GeometryCollection, type Topology } from 'topojson-specification'

export type SizeScale = ScalePower<number, number, number>

export interface TopoData {
  type: 'Topology'
  arcs: any
  bbox: any
  objects: any
  transform: any
}

export interface WorldAtlas {
  countries: FeatureCollection<Geometry>
  land: FeatureCollection<Geometry>
  interiors: MultiLineString
}

export interface WorldTopoJSON extends Topology {
  objects: {
    countries: GeometryCollection
    land: GeometryCollection
  }
}

export interface City {
  city: string
  lat: number
  lng: number
  country: string
  population: number
}
