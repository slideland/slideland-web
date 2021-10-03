import * as React from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'

interface Props {
  isOpen: boolean
  text: string
  setOpen: (open: boolean) => void
}

const SuccessAlert: React.FC<Props> = ({ isOpen, setOpen, text }) => {
  return (
    <Box maxWidth="md" sx={{ position: 'fixed', right: 18, bottom: 8 }}>
      <Collapse in={isOpen}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {text}
        </Alert>
      </Collapse>
    </Box>
  )
}

const ErrorAlert: React.FC<Props> = ({ isOpen, setOpen, text }) => {
  return (
    <Box maxWidth="md" sx={{ position: 'fixed', right: 18, bottom: 8 }}>
      <Collapse in={isOpen}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          severity="error"
          sx={{ mb: 2 }}
        >
          {text}
        </Alert>
      </Collapse>
    </Box>
  )
}

export { SuccessAlert, ErrorAlert }
