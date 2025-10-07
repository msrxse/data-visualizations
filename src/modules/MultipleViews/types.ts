import { type ScalePower } from 'd3'
import { type ScaleLinear, type ScaleTime } from 'd3-scale'
import { type FeatureCollection, type Geometry, type MultiLineString } from 'geojson'
import { type GeometryCollection, type Topology } from 'topojson-specification'

export type SizeScale = ScalePower<number, number, number>
export type XScale = ScaleTime<number, number>
export type YScale = ScaleLinear<number, number>

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

export interface Data {
  'Total Dead and Missing': number
  'Reported Date': Date
  coords: [number, number]
}

export interface BinnedData {
  y: number
  x0: Date | undefined
  x1: Date | undefined
}
