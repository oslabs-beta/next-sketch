import { Box, Typography } from '@mui/material';
import { DroppableSection } from '../middle/DroppableSection.1';
import {
  DndContext,
  DragEndEvent,
  closestCenter,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Tag } from '../../utils/interfaces';

interface DisplayContainerProps {
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}

const DisplayContainer = ({ tags, setTags }: DisplayContainerProps) => {
  const handleDragEnd = (event: DragEndEvent) => {
    // console.log('drag end');
    const { active, over } = event;
    if (active.id !== over?.id) {
      setTags((tags) => {
        const activeIndex = tags.findIndex((tag) => tag.id === active.id);
        const overIndex = tags.findIndex((tag) => tag.id === over?.id);
        return arrayMove(tags, activeIndex, overIndex);
      });
    }
  };

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
    >
      <Box
        sx={{
          // bgcolor: '#FFF0D5',
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
  );
};

export default DisplayContainer;
