import { Box, Typography } from '@mui/material';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Tag } from '../../utils/interfaces';
import TestContainer, { Container } from '../middle/TestContainer';
import { useState } from 'react';
import TestSortableItem, { TestItem } from '../middle/TestSortableItem';

interface DisplayContainerProps {
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}

const DisplayContainer = ({ tags, setTags }: DisplayContainerProps) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const isContainer = (id: UniqueIdentifier | null | undefined) => {
    const tag = tags.find((tag) => tag.id === id);
    return !tag ? false : tag.container;
  };

  const getTags = (parent?: UniqueIdentifier) => {
    return tags.filter((tag) => {
      if (!parent) {
        return !tag.parent;
      }

      return tag.parent === parent;
    });
  };

  const getTagIds = (parent?: UniqueIdentifier) => {
    return getTags(parent).map((tag) => tag.id);
  };

  const findParent = (id: UniqueIdentifier) => {
    const tag = tags.find((tag) => tag.id === id);
    return !tag ? false : tag.parent;
  };

  const getDragOverlay = () => {
    if (!activeId) return null;

    const index = tags.findIndex((tag) => tag.id === activeId);
    const name = tags[index].name;

    if (isContainer(activeId)) {
      return (
        <Container>
          {getTags(activeId).map((tag) => (
            <TestItem key={tag.id} name={tag.name} />
          ))}
        </Container>
      );
    }
    return <TestItem name={name} />;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  };

  const handleDragOver = (event: DragOverEvent) => {
    // console.log(event);
    const { active, over, delta } = event;
    const { id } = active;
    let overId!: UniqueIdentifier;
    if (over) overId = over.id;

    const overParent = findParent(overId);
    const overIsContainer = isContainer(overId);
    const activeIsContainer = isContainer(activeId);

    if (overIsContainer) {
      if (activeIsContainer) return;
    }

    setTags((tags) => {
      const activeIndex = tags.findIndex((tag) => tag.id === id);
      const overIndex = tags.findIndex((tag) => tag.id === overId);

      let newIndex = overIndex;
      const isBelowLastItem =
        over &&
        overIndex === tags.length - 1 &&
        delta.y > over.rect.top + over.rect.height;

      const modifier = isBelowLastItem ? 1 : 0;

      newIndex = overIndex >= 0 ? overIndex + modifier : tags.length + 1;

      let nextParent;
      if (overId) {
        nextParent = overIsContainer ? overId : overParent;
      }
      // console.log(nextParent);

      tags[activeIndex].parent = nextParent;
      const nextItems = arrayMove(tags, activeIndex, newIndex);

      return nextItems;
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const { id } = active;
    let overId: UniqueIdentifier;
    if (over) overId = over.id;

    const activeIndex = tags.findIndex((tag) => tag.id === id);
    const overIndex = tags.findIndex((tag) => tag.id === overId);

    const newIndex = overIndex >= 0 ? overIndex : 0;

    if (activeIndex !== overIndex) {
      setTags((tags) => arrayMove(tags, activeIndex, newIndex));
    }
    setActiveId(null);
  };

  return (
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
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <SortableContext
          id='root'
          items={getTagIds()}
          strategy={verticalListSortingStrategy}
        >
          <Box sx={{}}>
            {getTags().map((tag) => {
              if (tag.container) {
                return (
                  <TestContainer key={tag.id} id={tag.id} getTags={getTags} />
                );
              }
              return (
                <TestSortableItem key={tag.id} id={tag.id}>
                  <TestItem name={tag.name} />
                </TestSortableItem>
              );
            })}
          </Box>
        </SortableContext>
        <DragOverlay>{getDragOverlay()}</DragOverlay>
      </DndContext>
    </Box>
  );
};

export default DisplayContainer;
