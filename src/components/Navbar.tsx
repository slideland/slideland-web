import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Search from './Search';
import { Suggestion } from '../hooks/useMapboxSearch';

const TextStack = styled('div')`
  display: flex;
  flex-direction: column;
  margin: 1.3rem 0;

  h3 {
    margin-bottom: 0.3rem;
  }
`

interface SearchProps {
  onSearch: (location: Suggestion) => void
}

const Navbar: React.FC<SearchProps> = ({onSearch}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ boxShadow: 0 }}>
        <Toolbar>
          <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <TextStack>
              <h3>Slideland</h3>
              <p>Landslide risk indicator system</p>
            </TextStack>
          </Box>
          <Search onSearch={onSearch} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar
