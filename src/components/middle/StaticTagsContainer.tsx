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
      attribute: `src=' '`,
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
      attribute: `href=' '`,
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
    {
      id: generateId(),
      name: 'nav',
      container: true,
    },
    {
      id: generateId(),
      name: 'strong',
      container: false,
    },
  ];

  return (
    <Box
      sx={{
        border: 2,
        borderColor: 'gold',
        height: '35vh',
        paddingLeft: 2,
        paddingRight: 2,
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
          height: '28vh',
          maxHeight: '28vh',
          overflow: 'auto', // turn to auto once there are more elements
          scrollbarWidth: 'none', // Hide the scrollbar for firefox
          '&::-webkit-scrollbar': {
            display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
          },
          '&-ms-overflow-style:': {
            display: 'none', // Hide the scrollbar for IE
          },
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
