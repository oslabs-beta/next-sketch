import { List, ListItem, ListItemText, Divider, Grid } from '@mui/material';
import DeleteBtn from './DeleteBtn';
import DisplayCode from './DisplayCode';

interface ComponentDisplayProps {
  components: string[];
}

function ComponentDisplay({ components }: ComponentDisplayProps) {
  return (
    <List>
      {components.map((component, index) => (
        <ListItem
          key={index}
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <ListItemText primary={component} />
          <DisplayCode component={component} />
          <DeleteBtn id={index} />
          <Divider />
        </ListItem>
      ))}
    </List>
  );
}

export default ComponentDisplay;
