import { Box } from '@mui/material';
import { Tag } from '../../utils/interfaces';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { Item, TestItem } from './TestItem';
import { useContext } from 'react';
import AppContext from '../../context/AppContext';

interface TestContainerProps {
  tag: Tag;
}

export const TestContainer = ({ tag }: TestContainerProps) => {
  const { tags } = useContext(AppContext);

  const childrenTags = tags.filter((prev) => prev.parent === tag.id);

  //   console.log('tags', tags);
  //   console.log('childrenTags', childrenTags);

  const topArea = useDroppable({
    id: tag.id + '-container-top',
    data: {
      tagId: tag.id,
      isTopAreaTestContainer: true,
    },
  });

  const middleArea = useDroppable({
    id: tag.id + '-container-middle',
    data: {
      tagId: tag.id,
      isMiddleAreaTestContainer: true,
    },
  });

  const bottomArea = useDroppable({
    id: tag.id + '-container-bottom',
    data: {
      tagId: tag.id,
      isBottomAreaTestContainer: true,
    },
  });

  const draggable = useDraggable({
    id: tag.id + '-container-drag-handler',
    data: {
      tagId: tag.id,
      isTestContainer: true,
    },
  });

  if (draggable.isDragging) return null;

  return (
    <Box
      ref={draggable.setNodeRef}
      {...draggable.attributes}
      {...draggable.listeners}
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: 'lightgrey',
        color: 'black',
        margin: 2.5,
        minHeight: 60,
        width: '90%',
        borderRadius: 2,
        border: 2,
        borderColor: 'blue',
      }}
    >
      <Box
        ref={topArea.setNodeRef}
        sx={{
          position: 'absolute',
          width: '100%',
          height: '15px',
          top: -20,
          //   border: 2,
          //   borderColor: 'green',
        }}
      />
      <Box
        ref={middleArea.setNodeRef}
        sx={{
          position: 'absolute',
          width: '90%',
          minHeight: '50%',
          top: 20,
            // border: 2,
            // borderColor: 'blue',
        }}
      ></Box>
      <Box
        ref={bottomArea.setNodeRef}
        sx={{
          position: 'absolute',
          width: '100%',
          height: '15px',
          bottom: -15,
          //   border: 2,
          //   borderColor: 'red',
        }}
      />
      {topArea.isOver && (
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '15px',
            top: -20,
            bgcolor: 'green',
          }}
        />
      )}
      <Item>{tag.name}</Item>
      {childrenTags.map((childTag) => {
        if (childTag.container) {
          return <TestContainer key={childTag.id} tag={childTag} />;
        }
        return <TestItem key={childTag.id} tag={childTag} />;
      })}
      {middleArea.isOver && (
        <Box
          sx={{
            position: 'absolute',
            width: '85%',
            height: '7px',
            top: 25,
            bgcolor: 'blue',
          }}
        />
      )}
      {bottomArea.isOver && (
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '15px',
            bottom: -15,
            bgcolor: 'red',
          }}
        />
      )}
    </Box>
  );
};

interface TestContainerOverlayProps {
  tag: Tag;
}

export const TestContainerOverlay = ({ tag }: TestContainerOverlayProps) => {
  const { tags } = useContext(AppContext);

  const childrenTags = tags.filter((prev) => prev.parent === tag.id);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: 'lightgrey',
        color: 'black',
        margin: 2.5,
        minHeight: 60,
        width: '90%',
        borderRadius: 2,
        border: 2,
        borderColor: 'blue',
      }}
    >
      <Item>{tag.name}</Item>
      {childrenTags.map((childTag) => {
        if (childTag.container) {
          return <TestContainer key={childTag.id} tag={childTag} />;
        }
        return <TestItem key={childTag.id} tag={childTag} />;
      })}
    </Box>
  );
};
