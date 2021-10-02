import mapboxgl from 'mapbox-gl'
import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Suggestion } from '../hooks/useMapboxSearch';

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN || ""

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`

interface Props {
  location?: Suggestion
}

const MapHandler: React.FC<Props> = ({location}) => {
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (location) {
      if (map.current) {
        if (location.bbox && location.bbox.length == 4) {
          map.current.fitBounds([
            [location.bbox[0], location.bbox[1]],
            [location.bbox[2], location.bbox[3]],
          ])
        } else if (location.position && location.position.length == 2) {
          map.current.flyTo({ center: [
            location.position[0],
            location.position[1]
          ], zoom: 14})
        }
      }
    }
  }, [location])

  useEffect(() => {
    if (map.current) return
    map.current = new mapboxgl.Map({
      container: mapContainer.current ?? "",
      style: 'mapbox://styles/axba/cku9ksk0b1zd917mwyzj8oa7g',
      center: [lng, lat],
      zoom: zoom
    })
  })

  useEffect(() => {
    if (!map.current) return
    map.current.on('move', () => {
      if (map.current) {
        setLng(map.current.getCenter().lng);
        setLat(map.current.getCenter().lat);
        setZoom(map.current.getZoom());
      }
    });
  });

  return (<MapContainer ref={mapContainer} />)
}

export default MapHandler
