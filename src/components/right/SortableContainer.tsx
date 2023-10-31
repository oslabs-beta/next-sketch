import { UniqueIdentifier, useDroppable } from '@dnd-kit/core';
import { Box, Typography } from '@mui/material';
import { Tag } from '../../utils/interfaces';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableItem, { Item } from './SortableItem';
import { ReactNode, forwardRef, useContext } from 'react';
import AppContext from '../../context/AppContext';

/**
 * @description - creates a droppable and sortable container named after an embeddedable tag element
 * @parent - DisplayContainer.tsx
 * @children - SortableContainer.tsx, SortableItem.tsx
 */

interface SortableContainer {
  id: UniqueIdentifier;
  getTags: (id?: UniqueIdentifier) => Tag[];
}

interface ContainerProps {
  children: ReactNode;
}

export const Container = forwardRef(({ children }: ContainerProps, ref) => {
  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        border: 1,
        borderRadius: 3,
        marginLeft: 2.5,
        marginRight: 2.5,
        marginTop: 5,
        marginBottom: 5,
        flex: 1,
        alignSelf: 'stretch',
        minHeight: 50,
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      {children}
    </Box>
  );
});

const SortableContainer = ({ id, getTags }: SortableContainer) => {
  const { tags, setTags } = useContext(AppContext);
  const index = tags.findIndex((tag) => tag.id === id);
  const tagName = tags[index].name;

  const nestedTags = getTags(id);
  const nestedTagIds = nestedTags.map((nestedTag) => nestedTag.id);

  const { setNodeRef } = useDroppable({
    id: id,
    data: {
      isSortableContainerDropArea: true,
    }
  });

  return (
    <SortableItem id={id}>
      <Container ref={setNodeRef}>
        <Typography>{tagName}</Typography>
        <SortableContext
          items={nestedTagIds}
          strategy={verticalListSortingStrategy}
        >
          {nestedTags.map((nestedTag) => {
            const child = <Item name={nestedTag.name} />;

            if (nestedTag.container) {
              return (
                <SortableContainer
                  key={nestedTag.id}
                  id={nestedTag.id}
                  getTags={getTags}
                />
              );
            }

            return (
              <SortableItem key={nestedTag.id} id={nestedTag.id}>
                {child}
              </SortableItem>
            );
          })}
        </SortableContext>
      </Container>
    </SortableItem>
  );
};

export default SortableContainer;
