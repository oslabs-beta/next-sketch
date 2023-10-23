import { useDroppable } from '@dnd-kit/core';
import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { Tag } from '../../utils/interfaces';
import { SortableTagItem } from './SortableTagItem';
import { TagItem } from './TagItem';

interface TagItemContainerProps {
  childrenTags: Tag[];
}

const TagItemContainer = ({ childrenTags }: TagItemContainerProps) => {
  const { setNodeRef } = useDroppable({
    id: 'droppable-2',
  });

  return (
    <Box ref={setNodeRef}>
      {childrenTags.map((tag, index) => {
        return (
          <SortableTagItem key={`${tag}-${index}`} id={tag.id}>
            <TagItem tag={tag} />
          </SortableTagItem>
        );
      })}
    </Box>
  );
};

export default TagItemContainer;
