import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Button from '@mui/material/Button'
import styled from 'styled-components'
import Navbar from '../src/components/Navbar'
import MapHandler from '../src/components/MapHandler'
import { Suggestion } from '../src/hooks/useMapboxSearch'
import React from 'react'
import MapCard from '../src/components/MapCard'

const Main = styled.div`
  width: 100%;
  height: 100vh;
`

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`

const Box = styled.div`
  position: fixed;
  top: 6.5rem;
  right: 1rem;
  z-index: 100;
`

const Home: NextPage = () => {
  const [location, setLocation] = React.useState<Suggestion>()

  const onSearch = (location: Suggestion) => {
    setLocation(location)
  }

  return (
    <div>
      <Head>
        <title>Slideland</title>
        <meta name="description" content="Slideland — A landslide risk detection app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Navbar onSearch={onSearch} />
        <MapContainer>
          <MapHandler location={location} />
        </MapContainer>
        <Box>
          <MapCard />
        </Box>
      </Main>
    </div>
  )
}

export default Home
