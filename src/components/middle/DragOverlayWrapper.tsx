import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import { DraggableItemOverlay } from "./DraggableItem";

const DragOverlayWrapper = () => {
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

    let node = <div>no drag overlay</div>
    const isDraggableItem = draggedItem?.data?.current?.isDraggableItem;

    if (isDraggableItem) {
        const itemName = draggedItem?.data?.current?.name;
        node = <DraggableItemOverlay>{itemName}</DraggableItemOverlay>;
    }

    return (
        <DragOverlay>
            {node}
        </DragOverlay>
    );
};

export default DragOverlayWrapper;