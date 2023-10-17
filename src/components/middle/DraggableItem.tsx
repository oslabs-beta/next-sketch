import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";


interface DraggableItemProps {
  id: string | number;
  children: string;
}

export const DraggableItem = ({ id, children }: DraggableItemProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { title: children }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };
  // console.log('id', id);
  // console.log('ID drag', children)

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} >
      <div
        className="
              bg-red-500
              grid
              grid-flow-col
              auto-cols-max
              m-2
          "
      >
        {children}
      </div>
    </div>
  );
};
