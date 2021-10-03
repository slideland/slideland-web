// @ts-nocheck
import React, { useState } from 'react'
import Axios from 'axios'
import {
  Button,
  Container,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box } from '@mui/system'
import { CodeBlock } from 'react-code-blocks'
import { SuccessAlert, ErrorAlert } from './Success'
import styled from 'styled-components'

const LoadingButtonContainer = styled.div`
  margin: 7px;
`

export default function SubmitAPIForm() {
  const [isLoading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState(false)

  const [data, setData] = useState({
    name: '',
    apiUrl: '',
  })

  function submit(e) {
    e.preventDefault()
    const url = `${process.env.BACKEND_URL}${process.env.BACKEND_UPLOAD_MODEL_PATH}`
    setLoading(true)
    Axios.post(url, {
      name: data.name,
      url: data.apiUrl,
    })
      .then((res) => {
        setLoading(false)
        if (res.data.isValid) {
          setSuccess(true)
          setError(false)
        } else {
          setSuccess(false)
          setError(true)
        }
      })
      .catch(() => {
        setLoading(false)
        console.log('ERROR')
      })
  }

  function handle(e) {
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value
    setData(newdata)
  }

  const code = `
    {
        "areas": [
             {
               "risk" : <Predicted risk as integer 0-2>,
               "area" : [
               <LIST<PAIR<Latitude as float , Longitude as float>>>
                 ]
             },
           <More blocks with the above format>
           ]
       }
    `

  const exampleCode = `
    "areas": [
        {
          "risk" : 1,
          "area" : [
              [-127.28488,49.97099],
              [-127.2489,49.97099],
              [-127.2489,49.96132],
              [-127.2489,49.97099],
              [-127.2489,49.98066]
            ]
        },
        {
          "risk" : 2,
          "area" : [
              [-55.74929,49.80658],
              [-55.74929,49.81626],
              [-55.71331,49.81626]
            ]
        }
      ]
  }
    `

  return (
    <Container maxWidth="md" sx={{ paddingBottom: 10 }}>
      <SuccessAlert
        isOpen={success}
        setOpen={setSuccess}
        text="Your model is uploaded! It will be evaluated continuously, starting today."
      />
      <ErrorAlert
        isOpen={error}
        setOpen={setError}
        text="Something went wrong with the upload. Check your input and try again."
      />
      <h1>Submit model</h1>
      <Typography sx={{ fontSize: 14, marginTop: 1 }} color="text.secondary">
        You can upload your own model and see how it compares to the models
        available currently. To do so you only need to provide a name of your
        model and a url to which a GET request can be made. The response of the
        request should be JSON in the following format:
      </Typography>

      <Box sx={{ fontFamily: 'monospace', mt: 3, mb: 3 }}>
        <CodeBlock
          text={code}
          language="JSON"
          showLineNumbers={false}
          startingLineNumber={0}
        />
      </Box>

      <Typography sx={{ fontSize: 14, marginTop: 1 }} color="text.secondary">
        Here is a short example:
      </Typography>

      <Box sx={{ fontFamily: 'monospace', mt: 3, mb: 3 }}>
        <CodeBlock
          text={exampleCode}
          language="JSON"
          showLineNumbers={false}
          startingLineNumber={0}
        />
      </Box>

      <form onSubmit={(e) => submit(e)}>
        <Box
          sx={{
            '& > :not(style)': { m: 1, width: '45%' },
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            onChange={(e) => handle(e)}
            id="name"
            value={data.name}
          />
          <TextField
            label="API URL"
            variant="outlined"
            onChange={(e) => handle(e)}
            id="apiUrl"
            value={data.apiUrl}
          />
        </Box>
        <Box sx={{ m: 1 }}>
          <LoadingButton
            type="submit"
            loading={isLoading}
            variant="contained"
            size="large"
          >
            Submit
          </LoadingButton>
        </Box>
      </form>
    </Container>
  )
}
