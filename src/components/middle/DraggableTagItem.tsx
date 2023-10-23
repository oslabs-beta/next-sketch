import { UniqueIdentifier, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface DraggableTagItemProps {
  id: UniqueIdentifier;
  children: ReactNode;
}

const DraggableTagItem = ({ id, children }: DraggableTagItemProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { title: children, type: 'type2' },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </Box>
  );
};

export default DraggableTagItem;
