import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { useContext, useState } from 'react';
import { StaticTagOverlay } from './StaticTag';
import AppContext from '../../context/AppContext';
import { Box } from '@mui/material';
import { NonContainerTagOverlay } from '../right/NonContainerTag';
import { ContainerTagOverlay } from '../right/ContainerTag';

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

  const isStaticTag = draggedItem?.data?.current?.isStaticTag;

  if (isStaticTag) {
    const itemName = draggedItem?.data?.current?.name;
    node = <StaticTagOverlay>{itemName}</StaticTagOverlay>;
  }

  const isNonContainerTag = draggedItem?.data?.current?.isNonContainerTag;

  if (isNonContainerTag) {
    const tagId = draggedItem?.data?.current?.tagId;
    const tag = tags[tags.findIndex((tag) => tag.id === tagId)];

    if (!tag) node = <Box>tag not found!</Box>;
    else {
      node = <NonContainerTagOverlay tag={tag} />;
    }
  }

  const isContainerTag = draggedItem?.data?.current?.isContainerTag;

  if (isContainerTag) {
    const tagId = draggedItem?.data?.current?.tagId;
    const tag = tags[tags.findIndex((tag) => tag.id === tagId)];

    if (!tag) node = <Box>tag not found!</Box>;
    else {
        node = <ContainerTagOverlay tag={tag} />;
      }
  }

  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
