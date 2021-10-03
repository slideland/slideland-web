// @ts-nocheck
import mapboxgl from 'mapbox-gl'
import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Suggestion } from '../hooks/useMapboxSearch'
import { useSlideData } from '../hooks/useSlideData'
import { Position, Feature, Geometry, GeoJsonProperties } from 'geojson'
import getCentroid from '../utils/centroid'

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN || ''

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`

interface Props {
  location?: Suggestion
}

const MapHandler: React.FC<Props> = ({ location }) => {
  const mapContainer = useRef(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [lng, setLng] = useState(-70.9)
  const [lat, setLat] = useState(42.35)
  const [bbox, setBbox] = useState<number[][]>()
  const [zoom, setZoom] = useState(9)

  const { slides, loading } = useSlideData()

  useEffect(() => {
    if (location) {
      if (map.current) {
        if (location.bbox && location.bbox.length == 4) {
          map.current.fitBounds([
            [location.bbox[0], location.bbox[1]],
            [location.bbox[2], location.bbox[3]],
          ])
        } else if (location.position && location.position.length == 2) {
          map.current.flyTo({
            center: [location.position[0], location.position[1]],
            zoom: 14,
          })
        }
      }
    }
  }, [location])

  useEffect(() => {
    if (map.current) return
    map.current = new mapboxgl.Map({
      container: mapContainer.current ?? '',
      style: 'mapbox://styles/axba/cku9ksk0b1zd917mwyzj8oa7g',
      center: [lng, lat],
      zoom: zoom,
    })
  })

  useEffect(() => {
    const geoJSON: Feature<Geometry, GeoJsonProperties>[] = slides.map(
      (slide) => {
        return [
          {
            type: 'Feature',
            properties: null,
            geometry: {
              type: 'Polygon',
              coordinates: [
                slide.coordinates.map((co) => {
                  const pos: Position = [co[1], co[0]]
                  return pos
                }),
              ],
            },
          },
          {
            type: 'Feature',
            properties: {
              description: `Date reported: ${slide.date}<br>Number of slides: ${slide.slides}`,
            },
            geometry: {
              type: 'Point',
              coordinates: getCentroid(slide.coordinates),
            },
          },
        ]
      },
    )

    map.current.on('load', () => {
      console.log(geoJSON.length)
      if (map.current && geoJSON.length !== 0) {
        map.current.addSource('slides', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: geoJSON.flat(),
          },
        })

        map.current.addLayer({
          id: 'slide-area',
          type: 'fill',
          source: 'slides',
          paint: {
            'fill-color': '#FF0000',
            'fill-opacity': 0.5,
          },
          filter: ['==', '$type', 'Polygon'],
        })

        map.current.addLayer({
          id: 'slide-point',
          type: 'circle',
          source: 'slides',
          paint: {
            'circle-radius': 6,
            'circle-color': '#B42222',
          },
          filter: ['==', '$type', 'Point'],
        })
      }
    })
  }, [slides])

  useEffect(() => {
    if (!map.current) return

    map.current.on('mouseenter', 'slide-point', () => {
      map.current.getCanvas().style.cursor = 'pointer'
    })

    // Change it back to a pointer when it leaves.
    map.current.on('mouseleave', 'slide-point', () => {
      map.current.getCanvas().style.cursor = ''
    })

    map.current.on('click', 'slide-point', (e) => {
      // Copy coordinates array.
      if (e.features) {
        const coordinates = e.features[0].geometry.coordinates.slice()
        const description = e.features[0].properties.description

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map.current)
      }
    })
  })

  return <MapContainer ref={mapContainer} />
}

export default MapHandler
