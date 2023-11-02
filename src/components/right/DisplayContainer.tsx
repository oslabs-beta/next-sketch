import { Box, Typography } from '@mui/material';
import {
  DragEndEvent,
  UniqueIdentifier,
  useDndMonitor,
  useDroppable,
} from '@dnd-kit/core';
import { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import { Tag } from '../../utils/interfaces';
import { TestItem } from './TestItem';
import { TestContainer } from './TestContainer';

import { CodeSnippetContext } from '../../App';

/**
 * @description - container for displayed tag elements
 * @parent - TabsComponent.tsx
 * @children - SortableContainer.tsx, SortableItem.tsx
 */

const DisplayContainer = ({handleUpdatePreview, explorer}) => {
  const { tags, setTags, currentId, update, setUpdate } = useContext(AppContext);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>();

  const tagsWithoutParents = tags.filter((prev) => !prev.parent);
  const [codeSnippet, setCodeSnippet] = useContext(CodeSnippetContext);

  const { setNodeRef, isOver } = useDroppable({
    id: 'display-container-drop-area',
    data: {
      isDisplayContainerDropArea: true,
    },
  });


  useDndMonitor({
    // onDragOver: (event: DragOverEvent) => {
    //   console.log('drag over event', event.over);
    // },
    onDragEnd: async (event: DragEndEvent) => {
      console.log('drag end event', event);
      const { active, over } = event;

      const isDraggableItem = active.data?.current?.isDraggableItem;
      const isDroppingOverDisplayContainerDropArea =
        over?.data?.current?.isDisplayContainerDropArea;

      const droppingDraggableItemOverDisplayContainerDropArea =
        isDraggableItem && isDroppingOverDisplayContainerDropArea;

      // scenario 1: dropping draggable item over display container drop area
      if (droppingDraggableItemOverDisplayContainerDropArea) {
        const newTag: Tag = {
          id: active.id,
          name: active.data.current?.name,
          container: active.data.current?.container,
          attribute: active.data.current?.attribute,
        };
        await setTags([...tags, newTag]);
        setUpdate(true);
        return;
      }

      const isDroppingOverTestItemTopHalf =
        over?.data?.current?.isTopHalfTestItem;
      const isDroppingOverTestItemBottomHalf =
        over?.data?.current?.isBottomHalfTestItem;

      const isDroppingOverTestItem =
        isDroppingOverTestItemTopHalf || isDroppingOverTestItemBottomHalf;

      const isDroppingOverTestContainerTopArea =
        over?.data?.current?.isTopAreaTestContainer;
      const isDroppingOverTestContainerMiddleArea =
        over?.data?.current?.isMiddleAreaTestContainer;
      const isDroppingOverTestContainerBottomArea =
        over?.data?.current?.isBottomAreaTestContainer;

      const isDroppingOverTestContainer =
        isDroppingOverTestContainerTopArea ||
        isDroppingOverTestContainerMiddleArea ||
        isDroppingOverTestContainerBottomArea;

      const droppingDraggableItemOverTestItemOrTestContainer =
        isDraggableItem &&
        (isDroppingOverTestItem || isDroppingOverTestContainer);

      // scenario 2: dropping draggable item over a test item or container (either above or below it)
      if (droppingDraggableItemOverTestItemOrTestContainer) {
        const newTag: Tag = {
          id: active.id,
          name: active.data.current?.name,
          container: active.data.current?.container,
          attribute: active.data.current?.attribute,
        };

        const overId = over.data?.current?.tagId;

        const overTagIndex = tags.findIndex((tag) => tag.id === overId);
        if (overTagIndex === -1) {
          throw new Error('tag not found');
        }

        let indexForNewTag = overTagIndex;
        if (
          isDroppingOverTestItemBottomHalf ||
          isDroppingOverTestContainerBottomArea
        ) {
          indexForNewTag = overTagIndex + 1;
        }
        // add tag
        await setTags((prev) => {
          const newTags = [...prev];
          newTags.splice(indexForNewTag, 0, newTag);
          return newTags;
        });

        setUpdate(true);
      }

      const isDraggingTestItem = active?.data?.current?.isTestItem;
      const isDraggingTestContainer = active?.data?.current?.isTestContainer;

      const isDraggingTestItemOrTestContainer =
        isDraggingTestItem || isDraggingTestContainer;

      const draggingTestItemOrTestContainerOverAnotherTestItemOrTestContainer =
        isDraggingTestItemOrTestContainer &&
        (isDroppingOverTestItem || isDroppingOverTestContainer);

      // scenario 3: dragging test item or container over another test item or container (placement of test items once its in the display container)
      if (draggingTestItemOrTestContainerOverAnotherTestItemOrTestContainer) {
        // console.log('hello');
        const activeId = active.data?.current?.tagId;
        const overId = over.data?.current?.tagId;

        const activeTagIndex = tags.findIndex((tag) => tag.id === activeId);
        const overTagIndex = tags.findIndex((tag) => tag.id === overId);

        if (activeTagIndex === -1 || overTagIndex === -1) {
          throw new Error('tag not found');
        }

        const activeTag = { ...tags[activeTagIndex] };

        // console.log('activeTag', activeTag);

        // remove tag
        await setTags((prev) => prev.filter((tag) => tag.id !== activeId));

        // scenario 4: dragging test item or container into a test container
        if (isDroppingOverTestContainerMiddleArea) {
          activeTag.parent = overId;
        }

        let indexForNewTag = overTagIndex;

        if (isDroppingOverTestContainerTopArea) {
          activeTag.parent = false;
        }

        if (
          isDroppingOverTestItemBottomHalf ||
          isDroppingOverTestContainerBottomArea
        ) {
          indexForNewTag = overTagIndex + 1;
          activeTag.parent = false;
        }

        // add tag
        await setTags((prev) => {
          const newTags = [...prev];
          newTags.splice(indexForNewTag, 0, activeTag);
          return newTags;
        });
        setUpdate(true);
      }

      // scenario 5: dropping draggable item into test container middle area
      const droppingDraggableItemOverTestContainerMiddleArea =
        isDraggableItem && isDroppingOverTestContainerMiddleArea;

      if (droppingDraggableItemOverTestContainerMiddleArea) {
        const newTag: Tag = {
          id: active.id,
          name: active.data.current?.name,
          container: active.data.current?.container,
          attribute: active.data.current?.attribute,
          parent: over?.data.current?.tagId,
        };
        await setTags([...tags, newTag]);
        setUpdate(true);
        return;
      }
    },
  });

  return (
    <Box style={{color: 'rgba(101,105,111)'}}>
      <Typography variant='h6' style={{fontSize: '2rem', paddingTop: '1.5%', paddingLeft:'1%'}}>My Page</Typography>
      <Box
        sx={{
          
          ...(isOver && {
            borderColor: 'red',
          }),
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
        {/* drop here text */}
        {!isOver && tags.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              height: '60%',
              justifyContent: 'center',
              alignItems: 'flex-end',
              color: 'rgba(101,105,111)',
            }}
          >
            <Typography variant='h2'>Drop Here</Typography>
          </Box>
        )}

        {/* {isOver && tags.length === 0 && (
          //
          <Box
            sx={{
              display: 'flex',
              bgcolor: 'lightgrey',
              margin: 2.5,
              height: 60,
              borderRadius: 2,
            }}
          ></Box>
        )} */}

        {/* renders tags array */}
        {tags.length > 0 &&
          tagsWithoutParents.map((tag) => {
            if (tag.container) {
              return <TestContainer key={tag.id} tag={tag} />;
            }
            return <TestItem key={tag.id} tag={tag} />;
          })}
      </Box>
    </Box>
  );
};

export default DisplayContainer;
