import { useState } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { DroppableSection } from './DroppableSection';
import { DraggableItem } from './DraggableItem';
import { Tag } from '../../utils/interfaces';
import { Box, Typography } from '@mui/material';
import { generateId } from '../../utils/generateId';

const TagsContainer = (): JSX.Element => {
  const staticTags: Tag[] = [
    {
      id: generateId(),
      name: 'div',
    },
    {
      id: generateId(),
      name: 'img',
    },
    {
      id: generateId(),
      name: 'p',
    },
    {
      id: generateId(),
      name: 'form',
    },
    {
      id: generateId(),
      name: 'button',
    },
    {
      id: generateId(),
      name: 'link',
    },
    {
      id: generateId(),
      name: 'a',
    },
    {
      id: generateId(),
      name: 'span',
    },
    {
      id: generateId(),
      name: 'main',
    },
    {
      id: generateId(),
      name: 'h1',
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
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        bgcolor: 'pink',
        height: '500px',
        boxShadow: 20,
      }}
    >
      <DndContext onDragEnd={addTagToBox}>
        <Box
          sx={{
            bgcolor: '#FFF0D5',
            width: '100%',
            height: 'fit-content',
          }}
        >
          <Box
            sx={{
              bgcolor: '#22333B',
              color: '#FEFCFB',
              textAlign: 'center',
            }}
          >
            <Typography variant='h6'>HTML Tags</Typography>
          </Box>
          <Box sx={{ bgcolor: '#EAE0D5', margin: 1, boxShadow: 3 }}>
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
        </Box>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleSortDragEnd}
        >
          <Box
            sx={{
              bgcolor: 'lightsteelblue',
              width: '100%',
              overflowY: 'auto',
            }}
          >
            <Box
              sx={{
                bgcolor: '#22333B',
                color: '#FEFCFB',
                textAlign: 'center',
              }}
              position={'sticky'}
            >
              <Typography variant='h6'>Box</Typography>
            </Box>
            <Box sx={{ bgcolor: 'blue', margin: 1 }}>
              <DroppableSection tags={tags} />
            </Box>
          </Box>
        </DndContext>
      </DndContext>
    </Box>
  );
};

export default TagsContainer;
