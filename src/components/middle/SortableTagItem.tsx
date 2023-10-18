import { ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@mui/material';

interface SortableTagItemProps {
  id: string | number;
  children: ReactNode;
}

export const SortableTagItem = ({ id, children }: SortableTagItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
      animateLayoutChanges: () => false,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Button
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      variant='contained'
      sx={{
        bgcolor: 'lightgreen',
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
