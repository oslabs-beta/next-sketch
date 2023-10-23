import { UniqueIdentifier, useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableTagItem } from './SortableTagItem';
import { Box, Typography } from '@mui/material';
import { Tag } from '../../utils/interfaces';
import { TagItem } from './TagItem';
import { ReactNode, forwardRef } from 'react';

interface ContainerProps {
  children: ReactNode;
}

interface SortableTagSectionProps {
  id: UniqueIdentifier;
  getTags: (id: UniqueIdentifier) => Tag[];
}

const Container = forwardRef(({ children }: ContainerProps, ref) => {
  return <Box ref={ref}>{children}</Box>;
});

const SortableTagSection = ({ id, getTags }: SortableTagSectionProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  // if (isOver) console.log('is over', id);

  const tags = getTags(id);

  const tagIds = tags.map((tag) => tag.id);

  // console.log('tags', tags);

  return (
    <SortableTagItem id={id}>
      <Container ref={setNodeRef}>
        <SortableContext items={tagIds} strategy={verticalListSortingStrategy}>
          {tags.map((tag) => {
            // return <SortableTagSection key={tag.id} id={tag.id} getTags={getTags}/>;
            return (<TagItem tag={tag} key={tag.id} />)
          })}
        </SortableContext>
      </Container>
    </SortableTagItem>
  );
};

export default SortableTagSection;
