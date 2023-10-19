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
      name: 'h1',
    },
    {
      id: generateId(),
      name: 'main',
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
        height: '510px',
        boxShadow: 20,
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        borderBottomRightRadius: '20px',
        borderBottomLeftRadius: '20px',
      }}
    >
      <DndContext onDragEnd={addTagToBox}>
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
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleSortDragEnd}
        >
          <Box
            sx={{
              // bgcolor: '#FFF0D5',
              borderBottomRightRadius: '20px',
              borderTopRightRadius: '20px',
              borderBottomLefttRadius: '20px',
              width: '100%',
              overflowY: 'auto',
            }}
          >
            <Box
              sx={{
                bgcolor: 'rgba(191, 196, 248, 0.8)',
                color: 'black',
                textAlign: 'center',
                borderTopRightRadius: '20px',
              }}
              position={'sticky'}
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
