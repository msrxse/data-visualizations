import { type ScaleLinear } from 'd3-scale'

export type XScale = ScaleLinear<number, number>
export type YScale = ScaleLinear<number, number>

export interface Data {
  sepal_length: number
  sepal_width: number
  petal_length: number
  petal_width: number
}
