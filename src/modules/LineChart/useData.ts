import { useEffect, useState } from 'react'

import { type DSVRowString, csv } from 'd3'

import { type Data } from './types'

const csvUrl =
  'https://raw.githubusercontent.com/curran/screencasts/8388c6b2662d5ed15bb2a4f51568d7a5e7a3c651/introToD3/examples/code/snapshot99/week_temperature_sf.csv'
export const useData = () => {
  const [data, setData] = useState<Data[] | null>(null)

  useEffect(() => {
    const row = (d: DSVRowString<string>) => ({
      temperature: +d.temperature!,
      timestamp: new Date(d.timestamp!),
    })
    csv<Data>(csvUrl, row).then(setData)
  }, [])

  return data
}
