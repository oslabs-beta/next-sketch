import { Tag } from "../../types";

interface TagItemProps {
  tag: Tag;
}

export const TagItem = ({ tag }: TagItemProps): JSX.Element => {
  return (
    <div>
      <div
        className="
      bg-green-400 
      grid
      grid-flow-col
      auto-cols-max
      m-2"
      >
        {tag}
      </div>
    </div>
  );
};
