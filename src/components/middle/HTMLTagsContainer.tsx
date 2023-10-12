import { useState, DragEvent, useRef } from "react";
import HTMLTag from "./HTMLtag";
// import Display from "../right/Display";

const HTMLTagsContainer = (): JSX.Element => {
  const [tags, setTags] = useState<string[]>([]);
  console.log("TAGS", tags);

  const handleOnDrag = (
    e: DragEvent<HTMLDivElement> | undefined,
    tagType: string
  ): void => {
    e?.dataTransfer.setData("tagType", tagType);
  };

  const handleOnDrop = (e: DragEvent): void => {
    const tagType = e.dataTransfer.getData("tagType") as string;
    // console.log("tagtype", tagType);
    if (tagType) {
      setTags([...tags, tagType]);
    }
  };

  const handleDragOver = (e: DragEvent): void => {
    e.preventDefault();
  };

  const htmlTags: string[] = ["div", "img", "p", "form", "button", "link"];

  const arrayOfTags: JSX.Element[] = [];

  for (let i = 0; i < htmlTags.length; i++) {
    arrayOfTags.push(
      <HTMLTag
        name={htmlTags[i]}
        key={`${htmlTags[i]}`}
        handleOnDrag={handleOnDrag}
      />
    );
  }

  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);

//   console.log('dragItem', dragItem)
//   console.log('dragOverItem', dragOverItem)

  const handleSort = () => {

    console.log('dragItem', dragItem)
    console.log('dragOverItem', dragOverItem)

    const _tags = [...tags];

    const draggedItemContent = _tags.splice(dragItem.current, 1)[0];

    _tags.splice(dragOverItem.current, 0, draggedItemContent);

    dragItem.current = null;
    dragOverItem.current = null;

    setTags(_tags);
  };

  return (
    <div className="flex align-middle">
      <div
        className="
            bg-mainBackgroundColor
            w-[350px]
            h-[400px]
            max-h-[400px]
            rounded-md
            flex
            flex-col
            "
      >
        <div
          className="
                bg-blue-500
            "
        >
          <p
            className="
                    text-center
                "
          >
            HTML Tags
          </p>
        </div>
        <div>{arrayOfTags}</div>
      </div>
      <div
        className="
            bg-amber-200
            w-[350px]
            h-[400px]
            max-h-[400px]
        "
        onDrop={handleOnDrop}
        onDragOver={handleDragOver}
      >
        <div
          className="
            bg-lime-200
        "
        >
          <p
            className="
                text-center
            "
          >
            Box
          </p>
        </div>
        <div>
          {tags.map((tag, index) => (
            <div
              className="
              bg-green-400 
              grid
              grid-flow-col
              auto-cols-max
              m-2"
              key={index}
              draggable
              onDragStart={() => (dragItem.current = index)}
              onDragEnter={() => (dragOverItem.current = index)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HTMLTagsContainer;
