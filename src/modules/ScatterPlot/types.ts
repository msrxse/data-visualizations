import { type ScaleLinear, type ScaleOrdinal } from 'd3-scale'

export type XScale = ScaleLinear<number, number>
export type YScale = ScaleLinear<number, number>
export type CScale = ScaleOrdinal<string, string>

export interface Data {
  sepal_length: number
  sepal_width: number
  petal_length: number
  petal_width: number
  species: string
}
