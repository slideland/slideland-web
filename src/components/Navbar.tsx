import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import Search from './Search'
import { Suggestion } from '../hooks/useMapboxSearch'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import React from 'react'
import Link from 'next/link'
import Drawer from './Drawer'

const TextStack = styled('div')`
  display: flex;
  flex-direction: column;
  margin: 1.3rem 0;

  h3 {
    margin-bottom: 0.3rem;
    cursor: pointer;
  }
`

interface SearchProps {
  onSearch?: (location: Suggestion) => void
  isSearchable?: boolean
}

const Navbar: React.FC<SearchProps> = ({ onSearch, isSearchable = true }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ boxShadow: 0, height: '90px' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={(e) => {
              setOpen(true)
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <TextStack>
              <Link href="/">
                <h3>Slideland</h3>
              </Link>
              <p>Landslide risk indicator system</p>
            </TextStack>
          </Box>
          {isSearchable && onSearch && <Search onSearch={onSearch} />}
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Drawer toggleDrawer={setOpen} />
      </SwipeableDrawer>
    </Box>
  )
}

export default Navbar
