import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@mui/material';

interface DraggableItemProps {
  id: string | number;
  children: string;
}

export const DraggableItem = ({ id, children }: DraggableItemProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { title: children },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <Button
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      variant='contained'
      sx={{
        bgcolor: 'lightblue',
        fontSize: 15,
        marginTop: 2,
        paddingRight: 5,
        paddingLeft: 5,
        width: 5,
        height: 30,
      }}
    >
      {children}
    </Button>
  );
};
