import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Button from '@mui/material/Button'
import styled from 'styled-components'
import Navbar from '../../src/components/Navbar'
import React from 'react'
import { Box, Input, TextField } from '@mui/material'

const Main = styled.div`
  width: 100%;
  height: 100vh;
`

const HighScoreContainer = styled.div`
  width: 100%;
  height: 100%;
`

const ModelScores: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Model Scores | Slideland</title>
                <meta name="description" content="Slideland — A landslide risk detection app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Main>
                <Navbar isSearchable={false} />
                <HighScoreContainer>
                    
                </HighScoreContainer>
            </Main>
        </div>
    )
}


export default ModelScores
