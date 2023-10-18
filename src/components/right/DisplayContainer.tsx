import { Box, Typography } from "@mui/material";
import { DroppableSection } from "../middle/DroppableSection";
import { DndContext, closestCenter } from "@dnd-kit/core";


const DisplayContainer = () => {
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleSortDragEnd}
    >
      <Box
        sx={{
          bgcolor: 'lightsteelblue',
          width: '100%',
          height: '100%',
        }}
      >
        <Box
          sx={{
            bgcolor: 'lightgoldenrodyellow',
            textAlign: 'center',
          }}
        >
          <Typography variant='h6'>Box</Typography>
        </Box>
        <DroppableSection tags={tags} />
      </Box>
    </DndContext>
  );
};

export default DisplayContainer;
