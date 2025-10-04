import { useEffect, useState } from 'react'

import { type DSVRowString, csv } from 'd3'

import { type City } from './types'

const csvUrl =
  'https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/0635f14817ec634833bb904a47594cc2f5f9dbf8/worldcities_clean.csv'

const row = (d: DSVRowString<string>) => {
  return {
    city: d.city!,
    lat: +d.lat!, // unary-plus operator parses strings into numbers
    lng: +d.lng!,
    country: d.country!,
    population: +d.population!, // to avoid lexicoprafical order bug where, for example '9' < '10 // FALSE  - always parse to number when you need to
  } as City
}

export const useCities = () => {
  const [data, setData] = useState<City[] | null>(null)

  useEffect(() => {
    csv(csvUrl, row).then(setData)
  }, [])

  return data
}
