import { useState, DragEvent } from "react";
// import HTMLTag from "./HTMLtag";
// import Display from "../right/Display";

const HTMLTagsContainer = (): JSX.Element => {
  const [tags, setTags] = useState<string[]>([]);

  const handleOnDrag = (
    e: DragEvent,
    tagType: string
  ): void => {
    e.dataTransfer.setData("tagType", tagType);
  };

  const handleOnDrop = (e: DragEvent): void => {
    const tagType = e.dataTransfer.getData("tagType") as string;
    console.log('tagtype', tagType)
    setTags([...tags, tagType]);
  };

  const handleDragOver = (e: DragEvent): void => {
    e.preventDefault();
  };

//   const htmlTags: string[] = ["div", "img"];

//   const arrayOfTags: JSX.Element[] = [];

//   for (let i = 0; i < htmlTags.length; i++) {
//     arrayOfTags.push(
//       <HTMLTag
//         name={htmlTags[i]}
//         key={`${htmlTags[i]}`}
//         handleOnDrag={handleOnDrag}
//       />
//     );
//   }

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
        {/* <div>{arrayOfTags}</div> */}
        <div
          className="
              bg-red-500
              w-10
              m-1
          "
          draggable
          onDragStart={(e) => handleOnDrag(e, "<div>")}
        >
          {`<div>`}
        </div>
        <div
          className="
              bg-red-500
              w-8
              m-1
          "
          draggable
          onDragStart={(e) => handleOnDrag(e, "img")}
        >
          img
        </div>
      </div>
      <div
        className="
            bg-amber-200
            w-[350px]
            h-[400px]
            max-h-[400px]
        "
        onDrop={handleOnDrop} onDragOver={handleDragOver}
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
            <div className="bg-green-400 w-10 m-1" key={index}>{tag}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HTMLTagsContainer;
