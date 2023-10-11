import { Button } from '@mui/material';
import DeleteBtn from './DeleteBtn';

interface ComponentDisplayProps {
  components: string[];
}

function ComponentDisplay({ components }: ComponentDisplayProps) {
  return (
    <div>
      {components.map((component, index) => (
        <div>
          <Button key={index}>{component}</Button>
          <DeleteBtn />
        </div>
      ))}
    </div>
  );
}

export default ComponentDisplay;
