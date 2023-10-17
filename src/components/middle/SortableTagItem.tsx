import { ReactNode } from 'react'
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableTagItemProps {
  id: string | number;
  children: ReactNode;
}

export const SortableTagItem = ({ id, children }: SortableTagItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ 
      id: id,
      animateLayoutChanges: () => false,
     });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // console.log('id', id);
  // console.log('children', children);

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {children}
    </div>
  );
};