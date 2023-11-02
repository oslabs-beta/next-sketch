import { DraggableItem } from './DraggableItem';
import { Tag } from '../../utils/interfaces';
import { Box, Typography } from '@mui/material';
import { generateId } from '../../utils/generateId';

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
  ];

  return (
    <Box
      sx={{
        // border: 2,
        // borderColor: 'gold',
        bgcolor: 'white',
        // flexGrow: 1,
        height: '35vh',
        boxShadow: '-1px 1px 18px 0px rgba(0,0,0,0.75)',
        borderRadius: '20px',
      }}
    >
      <Typography variant='h6' sx={{ textAlign: 'center', marginTop: '4%', fontWeight:'bolder'}}>
        Add Elements
      </Typography>
      <Box
        sx={{
          fontWeight: 'bolder',
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'center',
          justifyContent: 'center',
          marginTop: '2%'
          // border: 2,
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
    </Box>
  );
};

export default StaticTagsContainer;
