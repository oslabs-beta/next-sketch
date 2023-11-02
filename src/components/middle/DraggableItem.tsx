import { UniqueIdentifier, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@mui/material';
import { Tag } from '../../utils/interfaces';

/**
 * @description - creates a draggable item
 * @parent - StaticTagsContainer.tsx
 */

interface DraggableItemProps {
  id: UniqueIdentifier
  children: Tag;
}

export const DraggableItem = ({ id, children }: DraggableItemProps) => {
  const { name, container, attribute } = children;
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id,
    data: {
      name: name,
      container: container,
      isDraggableItem: true,
      attribute: attribute,
    },
  });

  return (
    <Button
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      variant='contained'
      sx={{
        textAlign: 'center',
        bgcolor: '#cbb4d4',
        // color: 'white',
        // border: 1,
        fontWeight: 'bolder',
        fontSize: 15,
        margin: 0.8,
        borderRadius: '7px',
        paddingLeft: 3.5,
        paddingRight: 3.5,
        width: 'fit-content',
        minWidth: 80,
        height: 50,
        boxShadow: 8,
        ':hover': {
          bgcolor: 'rgba(191, 196, 248, 0.8)',
          color: '#FEFCFB',
          borderColor: 'black',
        },
      }}
    >
      {children.name}
    </Button>
  );
};

interface DraggableItemOverlayProps {
  children: string
}

export const DraggableItemOverlay = ({ children }: DraggableItemOverlayProps) => {
  return (
    <Button
      variant='contained'
      sx={{
        textAlign: 'center',
        bgcolor: '#FEFCFB',
        border: 1,
        fontSize: 12,
        margin: 0.5,
        borderRadius: '7px',
        paddingLeft: 3.5,
        paddingRight: 3.5,
        width: 'fit-content',
        minWidth: 80,
        height: 35,
        boxShadow: 8,
        ':hover': {
          bgcolor: 'rgba(191, 196, 248, 0.8)',
          color: '#FEFCFB',
          borderColor: 'black',
        },
      }}
    >
      {children}
    </Button>
  );
};