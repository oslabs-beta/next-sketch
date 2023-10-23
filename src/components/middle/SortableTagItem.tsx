import { ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Typography } from '@mui/material';
import { DndContext } from '@dnd-kit/core';

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
      <Box
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        sx={{
          bgcolor: 'rgba(191, 196, 248, 0.8)',
          fontSize: 15,
          width: '150px',
          height: '50px',
          marginTop: 1,
          marginBottom: 1,
          boxShadow: 8,
        }}
      >
        {children}
      </Box>
  );
};
