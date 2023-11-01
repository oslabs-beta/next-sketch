import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { useContext, useState } from 'react';
import { DraggableItemOverlay } from './DraggableItem';
import AppContext from '../../context/AppContext';
import { Box } from '@mui/material';
import { TestItemOverlay } from '../right/TestItem';
import { TestContainerOverlay } from '../right/TestContainer';

const DragOverlayWrapper = () => {
  const { tags } = useContext(AppContext);
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;

  let node = <Box>no drag overlay!</Box>;

  const isDraggableItem = draggedItem?.data?.current?.isDraggableItem;

  if (isDraggableItem) {
    const itemName = draggedItem?.data?.current?.name;
    node = <DraggableItemOverlay>{itemName}</DraggableItemOverlay>;
  }

  const isTestItem = draggedItem?.data?.current?.isTestItem;

  if (isTestItem) {
    const tagId = draggedItem?.data?.current?.tagId;
    const tag = tags[tags.findIndex((tag) => tag.id === tagId)];

    if (!tag) node = <Box>tag not found!</Box>;
    else {
      node = <TestItemOverlay tag={tag} />;
    }
  }

  const isTestContainer = draggedItem?.data?.current?.isTestContainer;

  if (isTestContainer) {
    const tagId = draggedItem?.data?.current?.tagId;
    const tag = tags[tags.findIndex((tag) => tag.id === tagId)];

    if (!tag) node = <Box>tag not found!</Box>;
    else {
        node = <TestContainerOverlay tag={tag} />;
      }
  }

  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
