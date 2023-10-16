import { useState, DragEvent } from "react";
// import HTMLTag from "./HTMLtag";
// import Display from "../right/Display";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { DroppableSection } from "./DroppableSection";
import { DraggableItem } from "./DraggableItem";
import { Tag } from "../../types";

const HTMLTagsContainer = (): JSX.Element => {
  const staticTags: string[] = ["div", "img", "p", "form", "button", "link"];

  const [tags, setTags] = useState<Tag[]>([]);
  // console.log("TAGS", tags);


  const handleSortDragEnd = (event: any) => {
    const { active, over } = event;
    console.log('ACTIVE', active.id);
    console.log('OVER', over.id);
    if (active.id !== over.id) {
      setTags((tags) => {
        const activeIndex = tags.indexOf(active.id);
        const overIndex = tags.indexOf(over.id);
        console.log(arrayMove(tags, activeIndex, overIndex))
        return arrayMove(tags, activeIndex, overIndex);
      });
    }
  };

  const addTagToBox = (event: any) => {
    const { active, over } = event;
    const newTag = active.data.current?.title;
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
              <DraggableItem key={staticTag} id={staticTag}>
                {staticTag}
              </DraggableItem>
            ))}
          </div>
        </div>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleSortDragEnd}>
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

export default HTMLTagsContainer;
