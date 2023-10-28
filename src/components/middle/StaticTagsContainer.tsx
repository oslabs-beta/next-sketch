import { useContext } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
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
      openTag: '<div>',
      closeTag: '</div>',
    },
    {
      id: generateId(),
      name: 'img',
      container: false,
      openTag: `<img src=' '>`,
    },
    {
      id: generateId(),
      name: 'p',
      container: false,
      openTag: '<p>',
      closeTag: '</p>',
    },
    {
      id: generateId(),
      name: 'form',
      container: true,
      openTag: '<form>',
      closeTag: '</form>',
    },
    {
      id: generateId(),
      name: 'button',
      container: false,
      openTag: '<button>',
      closeTag: '</button>',
    },
    {
      id: generateId(),
      name: 'link',
      container: false,
      openTag: `<link href=' ''>`,
    },
  ];

  const { tags, setTags } = useContext(AppContext);

  // console.log('initial state tags', tags);

  const addTagToDisplay = (event: DragEndEvent) => {
    const { active } = event;
    console.log(active);
    const newTag: Tag = {
      id: active.id,
      name: active.data.current?.name,
      container: active.data.current?.container,
      openTag: active.data.current?.openTag,
      closeTag: active.data.current?.closeTag,
    };
    setTags([...tags, newTag]);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '200px',
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
            }}
          >
            <Typography variant='h6'>HTML Tags</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignContent: 'flex-start',
              justifyContent: 'center',
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
