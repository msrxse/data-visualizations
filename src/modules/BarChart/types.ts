import { type ScaleBand, type ScaleLinear } from 'd3-scale'

export type XScale = ScaleLinear<number, number>
export type YScale = ScaleBand<string>

export interface Data {
  Country: string
  Population: number
  'Country Code': string
}
