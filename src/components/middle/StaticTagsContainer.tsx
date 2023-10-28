import { useContext, useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
} from '@dnd-kit/core';
import { DraggableItem } from './DraggableItem';
import { Tag } from '../../utils/interfaces';
import { Box, Typography } from '@mui/material';
import { generateId } from '../../utils/generateId';
import AppContext from '../../context/AppContext';

/**
 * @description - container for draggable HTML tag elements
 * @parent - MiddleContainer.tsx (make this)
 * @children - DraggableItem.tsx
 */

const StaticTagsContainer = (): JSX.Element => {
  const staticTags: Tag[] = [
    {
      id: generateId(),
      name: 'div',
      container: true,
    },
    {
      id: generateId(),
      name: 'img',
      container: false,
    },
    {
      id: generateId(),
      name: 'p',
      container: false,
    },
    {
      id: generateId(),
      name: 'form',
      container: true,
    },
    {
      id: generateId(),
      name: 'button',
      container: false,
    },
    {
      id: generateId(),
      name: 'link',
      container: false,
    },
    {
      id: generateId(),
      name: 'input',
      container: false,
    },
    {
      id: generateId(),
      name: 'label',
      container: true,
    },
    {
      id: generateId(),
      name: 'h1',
      container: false,
    },
    {
      id: generateId(),
      name: 'h2',
      container: false,
    },
    {
      id: generateId(),
      name: 'span',
      container: true,
    },
    {
      id: generateId(),
      name: 'ordered list',
      container: true,
    },
    {
      id: generateId(),
      name: 'unordered list',
      container: true,
    },
    {
      id: generateId(),
      name: 'list item',
      container: false,
    },
  ];

  const { tags, setTags } = useContext(AppContext);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>();

  const handleDragEnd = (event: DragEndEvent) => {
    console.log('drag end', event);
    const { active } = event;
    const newTag: Tag = {
      id: active.id,
      name: active.data.current?.name,
      container: active.data.current?.container,
    };
    setTags([...tags, newTag]);
    setActiveId(null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: 'auto',
        height: 'auto',
        boxShadow: 20,
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        borderBottomRightRadius: '20px',
        borderBottomLeftRadius: '20px',
      }}
    >
      <DndContext
      onDragEnd={handleDragEnd}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            borderTopLeftRadius: '20px',
          }}
        >
          <Box
            sx={{
              bgcolor: 'rgba(191, 196, 248, 0.8)',
              color: 'black',
              textAlign: 'center',
            }}
          >
            <Typography variant='h6'>HTML Tags</Typography>
          </Box>
          <Box
            sx={{
              padding: 1,
              display: 'flex',
              flexWrap: 'wrap',
              alignContent: 'flex-start',
              justifyContent: 'center',
              flexDirection: 'column', 
              marginTop: 1.2,
            }}
          >
            {staticTags.map((staticTag) => (
              <DraggableItem
                key={`${staticTag.name}-${staticTag.id}`}
                id={staticTag.id}
              >
                {staticTag}
              </DraggableItem>
            ))}
          </Box>
        </Box>
      </DndContext>
    </Box>
  );
};

export default StaticTagsContainer;
