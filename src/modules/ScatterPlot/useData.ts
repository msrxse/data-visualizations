import { useEffect, useState } from 'react'

import { type DSVRowString, csv } from 'd3'

import { type Data } from './types'

const csvUrl =
  'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv'

export const useData = () => {
  const [data, setData] = useState<Data[] | null>(null)

  useEffect(() => {
    const row = (d: DSVRowString<string>) => ({
      sepal_length: +d.sepal_length!,
      sepal_width: +d.sepal_width!,
      petal_length: +d.petal_length!,
      petal_width: +d.petal_width!,
      species: d.species!,
    })
    csv<Data>(csvUrl, row).then(setData)
  }, [])

  return data
}
