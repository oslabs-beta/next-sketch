import { useDroppable } from '@dnd-kit/core';
import { Tag } from '../../utils/interfaces';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableTagItem } from './SortableTagItem';
import { TagItem } from './TagItem';
import { Box } from '@mui/material';

interface DroppableSectionProps {
  tags: Tag[];
}

export const DroppableSection = ({ tags }: DroppableSectionProps) => {
  const { setNodeRef } = useDroppable({
    id: 'droppable',
  });

  return (
    <SortableContext items={tags} strategy={verticalListSortingStrategy}>
      <Box
        ref={setNodeRef}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 1.2,
        }}
      >
        {tags.map((tag, index) => (
          <SortableTagItem key={`${tag}-${index}`} id={tag.id}>
            <TagItem tag={tag} />
          </SortableTagItem>
        ))}
      </Box>
    </SortableContext>
  );
};
