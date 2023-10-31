import { UniqueIdentifier, useDraggable, useDroppable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { Box, Button, IconButton } from '@mui/material';
import { CSS } from '@dnd-kit/utilities';
import { useState, ReactNode, useContext } from 'react';
import AppContext from '../../context/AppContext';
import ClearIcon from '@mui/icons-material/Clear';

/**
 * @description - creates a sortable item named after a tag element
 * @parent - SortableContainer.tsx
 */

interface ItemProps {
  name: string;
}

interface SortableItemProps {
  id: UniqueIdentifier;
  children: ReactNode;
}

export const Item = ({ name }: ItemProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey',
        color: 'white',
        margin: 2.5,
        height: 40,
        borderRadius: 2,
      }}
    >
      {name}
    </Box>
  );
};

const SortableItem = ({ id, children }: SortableItemProps) => {
  const { tags, setTags } = useContext(AppContext);
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);

  const removeTag = (tagId: UniqueIdentifier) => {
    console.log('entered remove tag');
    setTags((prev) => prev.filter((tag) => tag.id !== tagId));
  };

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: id,
    animateLayoutChanges: () => false,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const topHalf = useDroppable({
    id: id + '-top',
    data: {
      tagId: id,
      isTopHalfSortableItem: true,
    },
  });

  const bottomHalf = useDroppable({
    id: id + '-bottom',
    data: {
      tagId: id,
      isBottomHalfSortableItem: true,
    },
  });

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      sx={{ flex: 1, position: 'relative' }}
    >
      {mouseIsOver && (
        <>
          <Box
            sx={{
              position: 'absolute',
              right: 15,
              height: '100%',
              display: 'flex',
              paddingBottom: 1,
            }}
          >
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                removeTag(id);
              }}
            >
              <ClearIcon sx={{ color: 'black' }} />
            </IconButton>
          </Box>
        </>
      )}
      {children}
    </Box>
  );
};

export default SortableItem;
