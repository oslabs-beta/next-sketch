import { Box, Typography } from '@mui/material';
import { TagsContainer } from '../middle/TagsContainer';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Tag } from '../../utils/interfaces';
import TestContainer from '../middle/TestContainer';

interface DisplayContainerProps {
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}

const DisplayContainer = ({ tags, setTags }: DisplayContainerProps) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setTags((tags) => {
        const activeIndex = tags.findIndex((tag) => tag.id === active.id);
        const overIndex = tags.findIndex((tag) => tag.id === over?.id);
        return arrayMove(tags, activeIndex, overIndex);
      });
    }
  };

  // console.log(tags);

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <Box
        sx={{
          borderBottomRightRadius: '20px',
          borderTopRightRadius: '20px',
          borderBottomLefttRadius: '20px',
          width: '100%',
          // overflowY: 'auto',
        }}
      >
        <Box
          sx={{
            bgcolor: 'rgba(191, 196, 248, 0.8)',
            // bgcolor: 'blue',
            color: 'black',
            textAlign: 'center',
            borderTopRightRadius: '20px',
          }}
          position={'sticky'}
        >
          <Typography variant='h6'>Display Container</Typography>
        </Box>
        {/* <TagsContainer tags={tags} /> */}
        {tags.map((tag) => {
          return <TestContainer key={tag.id} tag={tag} />;
        })}
      </Box>
    </DndContext>
  );
};

export default DisplayContainer;
