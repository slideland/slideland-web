import * as React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import PublishIcon from '@mui/icons-material/Publish'
import { ThemeProvider } from '@mui/system'
import { createTheme } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'
import MapIcon from '@mui/icons-material/Map'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Link from 'next/link'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: 'none',
        },
      },
    },
  },
  typography: {
    fontFamily: ['"Inter"', 'sans-serif'].join(','),
  },
})

interface DrawerProps {
  toggleDrawer: (isOpen: boolean) => void
}

const Drawer: React.FC<DrawerProps> = ({ toggleDrawer }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          maxWidth: 360,
          minWidth: 300,
          bgcolor: 'background.paper',
          color: 'text.primary',
        }}
      >
        <IconButton
          aria-label="close"
          size="large"
          sx={{ ml: 1, mt: 1 }}
          onClick={(e) => {
            toggleDrawer(false)
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
        <nav aria-label="main items">
          <List>
            <ListItem disablePadding>
              <Link href="/">
                <ListItemButton>
                  <ListItemIcon>
                    <MapIcon />
                  </ListItemIcon>
                  <ListItemText primary="Map" />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <FormatListNumberedIcon />
                </ListItemIcon>
                <ListItemText primary="Best models" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <Link href="/submit-model">
                <ListItemButton>
                  <ListItemIcon>
                    <PublishIcon />
                  </ListItemIcon>
                  <ListItemText primary="Submit your model" />
                </ListItemButton>
              </Link>
            </ListItem>
          </List>
        </nav>
        <Divider />
        <nav aria-label="secondary items">
          <List>
            <ListItem>
              <Link href="/submit-landslide">
                <Button sx={{ width: '100%' }} variant="contained" size="large">
                  Submit landslide data
                </Button>
              </Link>
            </ListItem>
          </List>
        </nav>
      </Box>
    </ThemeProvider>
  )
}

export default Drawer
