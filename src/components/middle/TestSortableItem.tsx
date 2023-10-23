import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { Box } from '@mui/material';
import { CSS } from '@dnd-kit/utilities';
import { ReactNode } from 'react';

interface TestItemProps {
  name: string;
}

interface TestSortableItemProps {
  id: UniqueIdentifier;
  children: ReactNode;
}

export const TestItem = ({ name }: TestItemProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey',
        color: 'white',
        margin: 2,
        height: 40,
        borderRadius: 2,
      }}
    >
      {name}
    </Box>
  );
};

const TestSortableItem = ({ id, children }: TestSortableItemProps) => {
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
    <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </Box>
  );
};

export default TestSortableItem;
