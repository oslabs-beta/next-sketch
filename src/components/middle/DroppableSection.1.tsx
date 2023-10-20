import {
  DndContext,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableTagItem } from './SortableTagItem';
import { TagItem } from './TagItem';
import { Box } from '@mui/material';
import { useState } from 'react';
import { Tag } from '../../utils/interfaces';

interface DroppableSectionProps {
  tags: Tag[];
}

export const DroppableSection = ({ tags }: DroppableSectionProps) => {
  const { setNodeRef } = useDroppable({
    id: 'droppable',
  });

  const [activeId, setActiveId] = useState();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    // console.log('drag start');
  };

  const handleDragOver = (event: DragOverEvent) => {
    // console.log('drag over');
  };

  const handleDragEnd = (event: DragEndEvent) => {
    // console.log('drag end');
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        id='root'
        items={tags}
        strategy={verticalListSortingStrategy}
      >
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
          {/* {tags.map((tag, index) => (
              <SortableTagSection key={`${tag}-${index}`} id={tag.id} tags={tags}/>
            ))} */}
        </Box>
      </SortableContext>
    </DndContext>
  );
};
