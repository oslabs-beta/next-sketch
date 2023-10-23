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
  UniqueIdentifier,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Box } from '@mui/material';
import { useState } from 'react';
import { Tag } from '../../utils/interfaces';
import DraggableTagItem from './DraggableTagItem';
import TagItemContainer from './TagItemContainer';
import { SortableTagItem } from './SortableTagItem';
import { TagItem } from './TagItem';

interface TagsContainerProps {
  tags: Tag[];
}

export const TagsContainer = ({ tags }: TagsContainerProps) => {
  const { setNodeRef } = useDroppable({
    id: 'droppable-1',
    data: {
      accepts: ['type1'],
    },
  });

  const [activeId, setActiveId] = useState();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getTags = (id?: UniqueIdentifier) => {
    return tags.filter((tag) => {
      if (!id) {
        return !tag.id;
      }
      return tag.id === id;
    });
  };

  //   <DndContext
  //   sensors={sensors}
  //   onDragStart={handleDragStart}
  //   onDragOver={handleDragOver}
  //   onDragEnd={handleDragEnd}
  // >
  // </DndContext>

  return (
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
          // bgcolor: 'red',
        }}
      >
        {tags.map((tag, index) => {
          if (tag.children) {
            <DraggableTagItem key={`${tag.name}-${tag.id}`} id={tag.id}>
              {tag.children.map((child, index) => {
                return (
                  <SortableTagItem key={`${child}-${index}`} id={child.id}>
                    <TagItem tag={child} />
                  </SortableTagItem>
                );
              })}
            </DraggableTagItem>;
          }
          return (
            <DraggableTagItem key={`${tag.name}-${tag.id}`} id={tag.id}>
              <SortableTagItem key={`${tag}-${index}`} id={tag.id}>
                <TagItem tag={tag} />
              </SortableTagItem>
            </DraggableTagItem>
          );
        })}
      </Box>
    </SortableContext>
  );
};

// {/* <TagItemContainer
//   key={`${tag.name}-${tag.id}`}
//   childrenTags={tag.children}
// /> */}
