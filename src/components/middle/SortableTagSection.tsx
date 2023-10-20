import { UniqueIdentifier, useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableTagItem } from './SortableTagItem';
import { Box, Typography } from '@mui/material';
import { Tag } from '../../utils/interfaces';

interface SortableTagSectionProps {
  id: UniqueIdentifier;
  tags: Tag[];
}

const SortableTagSection = ({ id, tags }: SortableTagSectionProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  if (isOver) console.log('is over', id);

  return (
    <SortableTagItem id={id}>
      <Box ref={setNodeRef}>
        <SortableContext
          items={tags}
          strategy={verticalListSortingStrategy}
        >
        </SortableContext>
      </Box>
    </SortableTagItem>
  );
};

export default SortableTagSection;
