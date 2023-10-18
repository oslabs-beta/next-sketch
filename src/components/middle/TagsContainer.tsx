import { useState } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { DroppableSection } from './DroppableSection';
import { DraggableItem } from './DraggableItem';
import { Tag } from '../../types';
import { Box, Typography } from '@mui/material';

const id_gen = (() => {
  let id = 1;
  return () => id++;
})();

const TagsContainer = (): JSX.Element => {
  const staticTags: Tag[] = [
    {
      id: id_gen(),
      name: 'div',
    },
    {
      id: id_gen(),
      name: 'img',
    },
    {
      id: id_gen(),
      name: 'p',
    },
    {
      id: id_gen(),
      name: 'form',
    },
    {
      id: id_gen(),
      name: 'button',
    },
    {
      id: id_gen(),
      name: 'link',
    },
  ];

  const [tags, setTags] = useState<Tag[]>([]);

  const handleSortDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setTags((tags) => {
        const activeIndex = tags.findIndex((tag) => tag.id === active.id);
        const overIndex = tags.findIndex((tag) => tag.id === over?.id);
        return arrayMove(tags, activeIndex, overIndex);
      });
    }
  };

  const addTagToBox = (event: DragEndEvent) => {
    const { active } = event;
    const newTag = {
      id: active.id,
      name: active.data.current?.title,
    };
    setTags([...tags, newTag]);
  };
  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
      <DndContext onDragEnd={addTagToBox}>
        <Box
          sx={{
            bgcolor: '#edede9',
            width: '100%',
            height: '100%',
          }}
        >
          <Box
            sx={{
              bgcolor: 'lightblue',
              textAlign: 'center',
            }}
          >
            <Typography variant='h6'>HTML Tags</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
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
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleSortDragEnd}
        >
          <Box
            sx={{
              bgcolor: 'lightsteelblue',
              width: '100%',
              height: '100%',
            }}
          >
            <Box
              sx={{
                bgcolor: 'lightgoldenrodyellow',
                textAlign: 'center',
              }}
            >
              <Typography variant='h6'>Box</Typography>
            </Box>
            <DroppableSection tags={tags} />
          </Box>
        </DndContext>
      </DndContext>
    </Box>
  );
};

export default TagsContainer;
