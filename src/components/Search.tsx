import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import React, { KeyboardEventHandler } from 'react'
import { Suggestion, useMapboxSearch } from '../hooks/useMapboxSearch';

const SearchWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '25ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const LocationSuggestions = styled('div')`
  background-color: white;
  width: 100%;
  position: absolute;
  border-radius: 6px;
  z-index: 1000;
  overflow: hidden;
`

const SuggestionItem = styled('div')<{ active: boolean }>`
  padding: 0.5rem;
  cursor: pointer;
  color: gray;

  ${(props) => props.active && `background-color: #F3CAC3;`}

  &:hover {
    background-color: #F3CAC3;
  }
`

interface SearchProps {
  onSearch: (location: Suggestion) => void
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = React.useState('')
  const [openSuggestions, setOpenSuggestions] = React.useState(true)
  const [activeSuggestion, setActiveSuggestion] = React.useState(0)
  const { suggestions, loading } = useMapboxSearch(query)

  const descRef = React.useRef()

  const textChanged = (value: string) => {
    setQuery(value)
    setOpenSuggestions(true)

    if (value === '') {
      setActiveSuggestion(0)
    }
  }

  const clickedInput = (location: Suggestion) => {
    setQuery(location.name)
    setOpenSuggestions(false)
    onSearch(location)
    setActiveSuggestion(0)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enter key/tab key
    if (e.key === 'Enter') {
      clickedInput(suggestions[activeSuggestion])
    }
    // Up arrow
    else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (activeSuggestion === 0) {
        return
      }

      setActiveSuggestion(activeSuggestion - 1)
    }
    // Down arrow
    else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (activeSuggestion - 1 === suggestions.length) {
        return
      }

      setActiveSuggestion(activeSuggestion + 1)
    }
  }

  return (
    <SearchWrapper>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search for a location…"
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          textChanged(e.target.value)
        }
        value={query}
        onKeyUp= {(e) => onKeyDown(e)}
        ref={descRef}
      />
      {openSuggestions && (
        <LocationSuggestions>
          {suggestions &&
            query !== '' &&
            suggestions.map((suggestion, index) => (
              <SuggestionItem
                active={index === activeSuggestion}
                key={index}
                onClick={() => clickedInput(suggestion)}
              >
                {suggestion.name}
              </SuggestionItem>
            ))}
        </LocationSuggestions>
      )}
    </SearchWrapper>
  );
}

export default Search
