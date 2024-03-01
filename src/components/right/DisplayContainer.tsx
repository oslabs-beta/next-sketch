import { Box, Typography } from '@mui/material';
import { DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core';
import { useContext } from 'react';
import AppContext from '../../context/AppContext';
import { Tag } from '../../utils/interfaces';
import { NonContainerTag } from './NonContainerTag';
import { ContainerTag } from './ContainerTag';

/**
 * @description - container for displayed tag elements
 * @parent - App.tsx
 * @children - ContainerTag.tsx, NonContainerTag.tsx
 */

const DisplayContainer = () => {
  const { tags, setTags, setUpdate } = useContext(AppContext);

  const tagsWithoutParents = tags.filter((prev) => !prev.parent);

  const { setNodeRef, isOver } = useDroppable({
    id: 'display-container-drop-area',
    data: {
      isDisplayContainerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: async (event: DragEndEvent) => {
      console.log('drag end event', event);
      const { active, over } = event;

      const isStaticTag = active.data?.current?.isStaticTag;
      const isDroppingOverDisplayContainerDropArea =
        over?.data?.current?.isDisplayContainerDropArea;

      const droppingStaticTagOverDisplayContainerDropArea =
        isStaticTag && isDroppingOverDisplayContainerDropArea;

      // scenario 1: dropping static tag over display container drop area
      if (droppingStaticTagOverDisplayContainerDropArea) {
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

      const isDroppingOverNonContainerTagTopHalf =
        over?.data?.current?.isTopHalfNonContainerTag;
      const isDroppingOverNonContainerTagBottomHalf =
        over?.data?.current?.isBottomHalfNonContainerTag;

      const isDroppingOverNonContainerTag =
        isDroppingOverNonContainerTagTopHalf ||
        isDroppingOverNonContainerTagBottomHalf;

      const isDroppingOverContainerTagTopArea =
        over?.data?.current?.isTopAreaContainerTag;
      const isDroppingOverContainerTagMiddleArea =
        over?.data?.current?.isMiddleAreaContainerTag;
      const isDroppingOverContainerTagBottomArea =
        over?.data?.current?.isBottomAreaContainerTag;

      const isDroppingOverContainerTag =
        isDroppingOverContainerTagTopArea ||
        isDroppingOverContainerTagMiddleArea ||
        isDroppingOverContainerTagBottomArea;

      const droppingStaticTagOverNonContainerTagOrContainerTag =
        isStaticTag &&
        (isDroppingOverNonContainerTag || isDroppingOverContainerTag);

      // scenario 2: dropping static tag over a container or non container tag (either above or below it)
      if (droppingStaticTagOverNonContainerTagOrContainerTag) {
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
          isDroppingOverNonContainerTagBottomHalf ||
          isDroppingOverContainerTagBottomArea
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

      const isDraggingNonContainerTag =
        active?.data?.current?.isNonContainerTag;
      const isDraggingContainerTag = active?.data?.current?.isContainerTag;

      const isDraggingNonContainerTagOrContainerTag =
        isDraggingNonContainerTag || isDraggingContainerTag;

      const draggingNonContainerTagOrContainerTagOverAnotherNonContainerTagOrContainerTag =
        isDraggingNonContainerTagOrContainerTag &&
        (isDroppingOverNonContainerTag || isDroppingOverContainerTag);

      // scenario 3: dragging container or non container tag over another container or non container tag (placement of container or non container tags once its in the display drop area)
      if (
        draggingNonContainerTagOrContainerTagOverAnotherNonContainerTagOrContainerTag
      ) {
        const activeId = active.data?.current?.tagId;
        const overId = over.data?.current?.tagId;

        const activeTagIndex = tags.findIndex((tag) => tag.id === activeId);
        const overTagIndex = tags.findIndex((tag) => tag.id === overId);

        if (activeTagIndex === -1 || overTagIndex === -1) {
          throw new Error('tag not found');
        }

        const activeTag = { ...tags[activeTagIndex] };

        // remove tag
        await setTags((prev) => prev.filter((tag) => tag.id !== activeId));

        // scenario 4: dragging container or non container tag into a container tag
        if (isDroppingOverContainerTagMiddleArea) {
          activeTag.parent = overId;
        }

        let indexForNewTag = overTagIndex;

        if (isDroppingOverContainerTagTopArea) {
          activeTag.parent = false;
        }

        if (
          isDroppingOverNonContainerTagBottomHalf ||
          isDroppingOverContainerTagBottomArea
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

      // scenario 5: dropping static tag into container tag middle area
      const droppingStaticTagOverContainerTagMiddleArea =
        isStaticTag && isDroppingOverContainerTagMiddleArea;

      if (droppingStaticTagOverContainerTagMiddleArea) {
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
    <Box style={{ color: 'rgba(101,105,111)' }}>
      <Typography
        variant='h6'
        style={{ fontSize: '2rem', paddingTop: '1.5%', paddingLeft: '1%' }}
      >
        My Page
      </Typography>
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

        {tags.length > 0 &&
          tagsWithoutParents.map((tag) => {
            if (tag.container) {
              return <ContainerTag key={tag.id} tag={tag} />;
            }
            return <NonContainerTag key={tag.id} tag={tag} />;
          })}
      </Box>
    </Box>
  );
};

export default DisplayContainer;
