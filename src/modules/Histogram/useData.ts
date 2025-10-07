import { useEffect, useState } from 'react'

import { type DSVRowString, csv } from 'd3'

import { type Data } from './types'

const csvUrl =
  'https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/c22144062566de911ba32509613c84af2a99e8e2/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv'

export const useData = () => {
  const [data, setData] = useState<Data[] | null>(null)

  useEffect(() => {
    const row = (d: DSVRowString<string>) => ({
      'Total Dead and Missing': +d['Total Dead and Missing']!,
      'Reported Date': new Date(d['Reported Date']!),
      'Location Coordinates': d['Location Coordinates']!,
    })
    csv<Data>(csvUrl, row).then(setData)
  }, [])

  return data
}
