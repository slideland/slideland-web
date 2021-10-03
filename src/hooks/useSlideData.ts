import * as React from 'react'

export interface Slide {
  id: string
  date: string
  slides: number
  coordinates: number[][] // [[lat, lon]]
}

export const useSlideData = () => {
  const [slides, setSlides] = React.useState<Slide[]>([])
  const [loading, setLoading] = React.useState(false)

  const buildQuery = () => {
    const base_url = `${process.env.BACKEND_URL}${process.env.BACKEND_SLIDE_PATH}`
    const url = base_url
    return url
  }

  React.useEffect(() => {
    const getSlides = async () => {
      try {
        setLoading(true)
        const path = buildQuery()
        const response = await fetch(path, {
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw Error(response.statusText)
        }

        const json = await response.json()

        const parsedSlides = json.result.map((rawSlide: any) => {
          const coordinates = rawSlide.latitudes.map(
            (lat: number, index: number) => [lat, rawSlide.longitudes[index]],
          )
          const slide: Slide = {
            id: rawSlide._id.$oid,
            date: rawSlide.date,
            slides: rawSlide.landslides,
            coordinates: coordinates,
          }
          return slide
        })
        setLoading(false)
        setSlides(parsedSlides)
      } catch (error) {
        setLoading(false)
        setSlides([])
      }
    }

    getSlides()
  }, [])

  return { slides, loading }
}
