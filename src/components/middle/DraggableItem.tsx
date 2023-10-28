import { UniqueIdentifier, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@mui/material';
import { Tag } from '../../utils/interfaces';

/**
 * @description - creates a draggable item
 * @parent - StaticTagsContainer.tsx
 */

interface DraggableItemProps {
  id: UniqueIdentifier;
  children: Tag;
}

export const DraggableItem = ({ id, children }: DraggableItemProps) => {
  const { name, container, openTag, closeTag } = children;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: {
      name: name,
      container: container,
      type: 'type1',
      openTag: openTag,
      closeTag: closeTag,
    },
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
        bgcolor: '#FEFCFB',
        color: '#0A0908',
        border: 1,
        fontSize: 15,
        margin: 0.5,
        borderRadius: '7px',
        paddingRight: 5,
        paddingLeft: 5,
        width: 5,
        height: 30,
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
