import { type ScaleLinear, type ScaleTime } from 'd3-scale'

// type ScaleTime<Domain, Range> = ...;
export type XScale = ScaleTime<number, number>
export type YScale = ScaleLinear<number, number>

export interface Data {
  timestamp: Date
  temperature: number
}
