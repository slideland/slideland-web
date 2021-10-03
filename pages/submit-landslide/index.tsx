import type { NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components'
import Navbar from '../../src/components/Navbar'
import SubmitLandslideForm from '../../src/components/SubmitLandslideForm'
import React from 'react'

const Main = styled.div`
  width: 100%;
  height: 100vh;
`

const FormContainer = styled.div`
  width: 100%;
  height: 100%;
`

const SubmitModel: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Submit Landslide | Slideland</title>
        <meta name="description" content="Slideland — A landslide risk detection app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Navbar isSearchable={false} />
        <FormContainer>
          <SubmitLandslideForm />
        </FormContainer>
      </Main>
    </div>
  )
}


export default SubmitModel
