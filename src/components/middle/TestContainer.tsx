import { useDroppable } from '@dnd-kit/core';
import { Box } from '@mui/material';
import { Tag } from '../../utils/interfaces';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import TestSortableItem from './TestSortableItem';

interface TestContainerProps {
  tag: Tag;
}

const TestContainer = ({ tag }: TestContainerProps) => {
  const { setNodeRef } = useDroppable({
    id: 'droppable-1',
  });
  console.log(tag)
  const children = tag.children;

  return (
    <SortableContext items={children} strategy={verticalListSortingStrategy}>
      <Box ref={setNodeRef}>
        {tag.name}
        {children.map((child) => (
            <TestSortableItem key={child.id} id={child.id} name={child.name} />
        ))}
      </Box>
    </SortableContext>
  );
};

export default TestContainer;
