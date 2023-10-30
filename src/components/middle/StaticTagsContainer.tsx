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
    // console.log('drag end', event);
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
    <DndContext onDragEnd={handleDragEnd}>
      <Box
        sx={{
          border: 2,
          borderColor: 'gold',
          flexGrow: 1,
        }}
      >
        <Typography variant='h6' sx={{ textAlign: 'center', }}>
          Add Elements
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
            justifyContent: 'center',
            border: 2,
            borderColor: 'pink',
            minHeight: '68vh',
            maxHeight: '70vh',
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
  );
};

export default StaticTagsContainer;
