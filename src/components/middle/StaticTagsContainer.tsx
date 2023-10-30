import { DraggableItem } from './DraggableItem';
import { Tag } from '../../utils/interfaces';
import { Box, Typography } from '@mui/material';
import { generateId } from '../../utils/generateId';
import DragOverlayWrapper from './DragOverlayWrapper';

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

  return (
    <Box
      sx={{
        border: 2,
        borderColor: 'gold',
        // flexGrow: 1,
        height: '35vh',
      }}
    >
      <Typography variant='h6' sx={{ textAlign: 'center' }}>
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
          // minHeight: '68vh',
          // maxHeight: '70vh',
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
      <DragOverlayWrapper />
    </Box>
  );
};

export default StaticTagsContainer;
