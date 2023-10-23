import { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { DraggableItem } from './DraggableItem';
import { Tag } from '../../utils/interfaces';
import { Box, Typography } from '@mui/material';
import { generateId } from '../../utils/generateId';
import DisplayContainer from '../right/DisplayContainer';

const StaticTagsContainer = (): JSX.Element => {
  const staticTags: Tag[] = [
    {
      id: generateId(),
      name: 'div',
      children: [],
    },
    {
      id: generateId(),
      name: 'img',
      children: [],
    },
    {
      id: generateId(),
      name: 'p',
      children: [],
    },
    {
      id: generateId(),
      name: 'form',
      children: [],
    },
    {
      id: generateId(),
      name: 'button',
      children: [],
    },
    {
      id: generateId(),
      name: 'link',
      children: [],
    },
  ];

  const [tags, setTags] = useState<Tag[]>([]);

  const addTagToDisplay = (event: DragEndEvent) => {
    const { active } = event;
    const newTag: Tag = {
      id: active.id,
      name: active.data.current?.title,
      children: [{ id: generateId(), name: 'div', children: [] }],
    };
    setTags([...tags, newTag]);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '510px',
        boxShadow: 20,
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        borderBottomRightRadius: '20px',
        borderBottomLeftRadius: '20px',
      }}
    >
      <DndContext onDragEnd={addTagToDisplay}>
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
              borderTopLeftRadius: '20px',
            }}
          >
            <Typography variant='h6'>HTML Tags</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 1.2,
            }}
          >
            {staticTags.map((staticTag) => (
              <DraggableItem
                key={`${staticTag.name}-${staticTag.id}`}
                id={staticTag.id}
              >
                {staticTag.name}
              </DraggableItem>
            ))}
          </Box>
        </Box>
        <DisplayContainer tags={tags} setTags={setTags} />
      </DndContext>
    </Box>
  );
};

export default StaticTagsContainer;
