import { Key, DragEvent } from "react";

interface HTMLTagProps {
  name: string;
  key: Key | null | undefined;
  handleOnDrag(e: DragEvent<HTMLDivElement> | undefined, tagType: string): void;
}

const HTMLTag = ({ name, handleOnDrag }: HTMLTagProps): JSX.Element => {
  return (
    <div
      className="
            bg-red-500
            grid
            grid-flow-col
            auto-cols-max
            m-2
        "
        draggable
        onDragStart={(e) => handleOnDrag(e, name)}
    >
      <p>{name}</p>
    </div>
  );
};

export default HTMLTag;
