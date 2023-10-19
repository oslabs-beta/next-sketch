import { List, ListItem, ListItemText, Divider, Grid } from '@mui/material';
import DeleteBtn from './DeleteBtn';
import DisplayCode from './DisplayCode';

interface ComponentDisplayProps {
  components: string[];
}

function ComponentDisplay({ components }: ComponentDisplayProps) {
  return (
    <List sx={{ marginRight: '20px', marginLeft: '20px' }}>
      {components.map((component, index) => (
        <ListItem
          key={index}
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            bgcolor: 'rgba(135, 206, 235, 0.3)',
            textAlign: 'center',
            borderRadius: '10px',
            marginBottom: 2,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'box-shadow 0.3s ease-in-out', // Smooth transition
            '&:hover': {
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Hover effect
            },
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
