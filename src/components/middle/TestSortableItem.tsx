import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { Box } from '@mui/material';
import { CSS } from '@dnd-kit/utilities';

interface TestItemProps {
  name: string;
}

interface TestSortableItemProps {
  id: UniqueIdentifier;
  name: string;
}

const TestItem = ({ name }: TestItemProps) => {
  return <Box>{name}</Box>;
};

const TestSortableItem = ({ id, name }: TestSortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
      animateLayoutChanges: () => false,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TestItem name={name} />
    </Box>
  );
};

export default TestSortableItem;
