import { Box } from '@mui/system';
import { Tag } from '../../utils/interfaces';
import { useDraggable, useDroppable } from '@dnd-kit/core';

interface ItemProps {
  children: string;
}

export const Item = ({ children }: ItemProps) => {
  return <Box>{children}</Box>;
};

interface TestItemProps {
  tag: Tag;
}

export const TestItem = ({ tag }: TestItemProps) => {
  const topHalf = useDroppable({
    id: tag.id + '-item-top',
    data: {
      tagId: tag.id,
      isTopHalfTestItem: true,
    },
  });

  const bottomHalf = useDroppable({
    id: tag.id + '-item-bottom',
    data: {
      tagId: tag.id,
      isBottomHalfTestItem: true,
    },
  });

  const draggable = useDraggable({
    id: tag.id + '-item-drag-handler',
    data: {
      tagId: tag.id,
      isTestItem: true,
    },
  });

  if (draggable.isDragging) return null;

  return (
    <Box
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        bgcolor: 'transparent',
        color: 'rgba(229, 63, 115)',
        margin: 2.5,
        fontWeight: 'bolder',
        height: 35,
        width: '90%',
        borderRadius: 2,
        border: 2,
        borderColor: '#6441A5',
        paddingBottom: '5%',
      }}
    >
      <Box
        ref={topHalf.setNodeRef}
        sx={{
          position: 'absolute',
          width: '100%',
          height: '50%',
          top: -25,
          //   bgcolor: 'green', // a
        }}
      />

      <Box
        ref={bottomHalf.setNodeRef}
        sx={{
          position: 'absolute',
          width: '100%',
          height: '50%',
          bottom: -20,
          // bgcolor: 'red', // b
        }}
      />
      <Box />
      {topHalf.isOver && (
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '15px',
            bgcolor: 'green',
            top: -25,
          }}
        />
      )}
      <Item>{tag.name}</Item>
      {bottomHalf.isOver && (
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '15px',
            bgcolor: 'red',
            bottom: -20,
          }}
        />
      )}
    </Box>
  );
};

interface TestItemOverlay {
  tag: Tag;
}

export const TestItemOverlay = ({ tag }: TestItemOverlay) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        bgcolor: 'lightslategray',
        color: 'black',
        margin: 2.5,
        height: 35,
        borderRadius: 2,
        width: '100%',
      }}
    >
      <Item>{tag.name}</Item>
    </Box>
  );
};
