import { useState } from "react";
// import HTMLTag from "./HTMLtag";
// import Display from "../right/Display";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { DroppableSection } from "./DroppableSection";
import { DraggableItem } from "./DraggableItem";
import { Tag } from "../../types";

const id_gen = (() => {
  let id = 1;
  return () => id++;
})()

const TagsContainer = (): JSX.Element => {

  const staticTags: Tag[] = [
    {
      id: id_gen(),
      name: 'div',
    },
    {
      id: id_gen(),
      name: 'img',
    },
    {
      id: id_gen(),
      name: 'p',
    },
    {
      id: id_gen(),
      name: 'form',
    },
    {
      id: id_gen(),
      name: 'button',
    },
    {
      id: id_gen(),
      name: 'link',
    },
  ];

  const [tags, setTags] = useState<Tag[]>([]);
  // console.log("TAGS", tags);

  const handleSortDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    // console.log(event);
    // console.log("ACTIVE", active);
    // console.log("over", over);
    // console.log(tags.findIndex(tag => tag.id === active.id))
    // console.log("ACTIVE ID", active.id);
    // console.log("OVER ID", over.id);
    if (active.id !== over?.id) {
      setTags((tags) => {
        const activeIndex = tags.findIndex(tag => tag.id === active.id);
        const overIndex = tags.findIndex(tag => tag.id === over?.id);
        // console.log("activeIndex", activeIndex);
        // console.log("overIndex", overIndex);
        // console.log(arrayMove(tags, activeIndex, overIndex));
        return arrayMove(tags, activeIndex, overIndex);
      });
    }
  };

  const addTagToBox = (event: DragEndEvent) => {
    const { active } = event;
    // console.log(event);
    const newTag = {
      id: active.id,
      name: active.data.current?.title
    };
    // console.log("newTag", newTag);
    // if (over?.id !== "droppable" || !newTag) return;
    setTags([...tags, newTag]);
  };

  return (
    <div className="flex align-middle">
      <DndContext onDragEnd={addTagToBox}>
        <div className="bg-mainBackgroundColor w-[350px] h-[400px] max-h-[400px]">
          <div className="bg-blue-500">
            <p className="text-center">HTML Tags</p>
          </div>
          <div>
            {staticTags.map((staticTag) => (
              <DraggableItem key={`${staticTag.name}-${staticTag.id}`} id={staticTag.id}>
                {staticTag.name}
              </DraggableItem>
            ))}
          </div>
        </div>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleSortDragEnd}
        >
          <div className="bg-amber-200 w-[350px] h-[400px] max-h-[400px]">
            <div className="bg-lime-200">
              <p className="text-center">Box</p>
            </div>
            <DroppableSection tags={tags} />
          </div>
        </DndContext>
      </DndContext>
    </div>
  );
};

export default TagsContainer;
