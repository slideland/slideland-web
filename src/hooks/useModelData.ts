import * as React from 'react'
import { Position, Feature, Geometry, GeoJsonProperties } from 'geojson'
import getCentroid from '../utils/centroid'

const getColor = (degree: number): string => {
  if (degree == 0) {
    return '#aee024'
  } else if (degree == 1) {
    return '#e8b315'
  } else {
    return '#e8340c'
  }
}

export const useModelData = (url: string) => {
  const [geoJSONData, setGeoJSONData] = React.useState<
    Feature<Geometry, GeoJsonProperties>[]
  >([])
  const [modelLoading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (url === '') { return }
    const getPredictionData = async () => {
      try {
        setLoading(true)
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw Error(response.statusText)
        }

        const json = await response.json()

        const parsedSlides = json.areas.map((predArea: any) => {
          return {
            type: 'Feature',
            properties: {
              description: `Risk: ${predArea.risk}`,
            },
            geometry: {
              type: 'Point',
              coordinates: predArea.area[0],
            },
          }
        })
        setLoading(false)
        setGeoJSONData(parsedSlides.flat())
      } catch (error) {
        console.log(error)
        setLoading(false)
        setGeoJSONData([])
      }
    }

    getPredictionData()
  }, [url])

  return { geoJSONData, modelLoading }
}
