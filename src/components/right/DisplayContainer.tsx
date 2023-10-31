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
  useDndMonitor,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableContainer, { Container } from './SortableContainer';
import { useContext, useState } from 'react';
import SortableItem, { Item } from './SortableItem';
import AppContext from '../../context/AppContext';
import { Tag } from '../../utils/interfaces';

/**
 * @description - container for displayed tag elements
 * @parent - TabsComponent.tsx
 * @children - SortableContainer.tsx, SortableItem.tsx
 */

const DisplayContainer = () => {
  const { tags, setTags } = useContext(AppContext);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>();

  const { setNodeRef } = useDroppable({
    id: 'display-container-drop-area',
    data: {
      isDisplayContainerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;

      const isDraggableItem = active.data?.current?.isDraggableItem;
      const isDisplayContainerDropArea =
        over?.data?.current?.isDisplayContainerDropArea;

      const droppingItemOverDisplayContainerDropArea =
        isDraggableItem && isDisplayContainerDropArea;

      if (droppingItemOverDisplayContainerDropArea) {
        const newTag: Tag = {
          id: active.id,
          name: active.data.current?.name,
          container: active.data.current?.container,
          attribute: active.data.current?.attribute,
        };
        setTags([...tags, newTag]);
      }
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  /**
   * @method isContainer
   * @description - checks if it the tag is a container
   * @input - id of type number, null or undefined
   * @output - boolean, true if it is container false if it isn't
   */

  const isContainer = (id: UniqueIdentifier | null | undefined) => {
    const tag = tags.find((tag) => tag.id === id);
    return !tag ? false : tag.container;
  };

  /**
   * @method getTags
   * @description - Checks the tags array to find elements with parent property
   * @input - optional parent
   * @output - array with false and strings as values
   */
  const getTags = (parent?: UniqueIdentifier) => {
    return tags.filter((tag) => {
      if (!parent) {
        return !tag.parent;
      }

      return tag.parent === parent;
    });
  };

  console.log(tags);

  /**
   * @method getTagIds
   * @description - maps through the array returned by getTags
   * @input - optional parent of type unique identifier
   * @output - An array of tag IDs that have parent
   */

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
            <Item key={tag.id} name={tag.name} />
          ))}
        </Container>
      );
    }
    return <Item name={name} />;
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

      // console.log('activeIndex', activeIndex);
      // console.log('overIndex', overIndex);

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
      console.log(nextParent);

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
        <Typography variant='h6'>My Page</Typography>
        <Box
          sx={{
            border: 2,
            borderColor: 'magenta',
            height: '28vh',
            overflow: 'auto',
            scrollbarWidth: 'none', // Hide the scrollbar for firefox
            '&::-webkit-scrollbar': {
              display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
            },
            '&-ms-overflow-style:': {
              display: 'none', // Hide the scrollbar for IE
            },
          }}
          ref={setNodeRef}
        >
          {getTags().map((tag) => {
            if (tag.container) {
              return (
                <SortableContainer key={tag.id} id={tag.id} getTags={getTags} />
              );
            }
            return (
              <SortableItem key={tag.id} id={tag.id}>
                <Item name={tag.name} />
              </SortableItem>
            );
          })}
        </Box>
      </SortableContext>
      <DragOverlay>{getDragOverlay()}</DragOverlay>
    </DndContext>
  );
};

export default DisplayContainer;
