import React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';

const MapCard: React.FC = () => {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: string) => {

    console.log("ok")
  }

  return (
    <Box sx={{ minWidth: 310, maxHeight: 400 }}>
    <Card sx={{marginBottom: 2}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          Available models
        </Typography>
      </CardContent>
      <Divider />
      <List>
          <ListItem disablePadding>
              <ListItemButton role={undefined} onClick={(e) => handleToggle("value")} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={true}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': 'labelId' }}
                  />
                </ListItemIcon>
                <ListItemText primary={`NASA — PMM Publisher`} />
              </ListItemButton>
            </ListItem>
        </List>
    </Card>
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          Map features
        </Typography>
      </CardContent>
      <Divider />
      <List>
          <ListItem disablePadding>
              <ListItemButton role={undefined} onClick={(e) => handleToggle("value")} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={true}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': 'labelId' }}
                  />
                </ListItemIcon>
                <ListItemText primary={`Historic slides`} />
              </ListItemButton>
            </ListItem>
        </List>
    </Card>
    </Box>
  )
}

export default MapCard
