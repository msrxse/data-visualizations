import { type FeatureCollection, type Geometry, type MultiLineString } from 'geojson'
import { type GeometryCollection, type Topology } from 'topojson-specification'

export interface TopoData {
  type: 'Topology'
  arcs: any
  bbox: any
  objects: any
  transform: any
}

export interface Data {
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
