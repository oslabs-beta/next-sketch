import { useDroppable } from "@dnd-kit/core";
import { Tag } from "../../types";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableTagItem } from "./SortableTagItem";
import { TagItem } from "./TagItem";

interface DroppableSectionProps {
  tags: Tag[];
}

export const DroppableSection = ({ tags }: DroppableSectionProps) => {
  const { setNodeRef } = useDroppable({
    id: "droppable",
  });

  // console.log('tags', tags)

  return (
    <SortableContext items={tags} strategy={verticalListSortingStrategy}>
      <div ref={setNodeRef}>
        {tags.map((tag, index) => (
          <SortableTagItem key={`${tag}-${index}`} id={tag.id} >
            <TagItem tag={tag}/>
          </SortableTagItem>
        ))}
      </div>
    </SortableContext>
  );
};


