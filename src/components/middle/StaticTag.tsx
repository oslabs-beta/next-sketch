import { UniqueIdentifier, useDraggable } from '@dnd-kit/core';
import { Button } from '@mui/material';
import { Tag } from '../../utils/interfaces';

/**
 * @description - creates a draggable item
 * @parent - StaticTagsContainer.tsx
 */

interface StaticTagProps {
  id: UniqueIdentifier;
  children: Tag;
}

export const StaticTag = ({ id, children }: StaticTagProps) => {
  const { name, container, attribute } = children;
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id,
    data: {
      name: name,
      container: container,
      isStaticTag: true,
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
        bgcolor: 'transparent',
        border: '2px solid #6441A5',
        color: 'white',
        // color: 'white',
        // border: 1,
        opacity: '0.9',
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
      {name}
    </Button>
  );
};

interface StaticTagOverlayProps {
  children: string;
}

export const StaticTagOverlay = ({ children }: StaticTagOverlayProps) => {
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
