import { UniqueIdentifier, useDroppable } from '@dnd-kit/core';
import { Box, Typography } from '@mui/material';
import { Tag } from '../../utils/interfaces';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import TestSortableItem, { TestItem } from './TestSortableItem';
import { ReactNode, forwardRef } from 'react';

interface TestContainerProps {
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
        margin: 2,
        flex: 1,
        alignSelf: 'stretch',
        minHeight: 50,
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      <Typography>hello</Typography>
      {children}
    </Box>
  );
});

const TestContainer = ({ id, getTags }: TestContainerProps) => {
  const tags = getTags(id);

  const tagIds = tags.map((tag) => tag.id);

  //   const index = tags.findIndex((tag) => tag.id === id);

  const { setNodeRef } = useDroppable({
    id: 'droppable-1',
  });

  return (
    <TestSortableItem id={id}>
      <Container ref={setNodeRef}>
        <SortableContext items={tagIds} strategy={verticalListSortingStrategy}>
          {tags.map((tag) => {
            const child = <TestItem name={tag.name} />;

            if (tag.container) {
              return (
                <TestContainer key={tag.id} id={tag.id} getTags={getTags} />
              );
            }

            return (
              <TestSortableItem key={tag.id} id={tag.id}>
                {child}
              </TestSortableItem>
            );
          })}
        </SortableContext>
      </Container>
    </TestSortableItem>
  );
};

export default TestContainer;
