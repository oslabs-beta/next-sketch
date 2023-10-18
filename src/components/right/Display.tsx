interface DisplayProps {
    name: string;
    key: Key | null | undefined;
    handleOnDrag(e: DragEvent<HTMLDivElement> | undefined, tagType: string): void;
  }

const Display = () => {
  return (
    <div
      className="
            bg-amber-200
            w-[350px]
            h-[400px]
            max-h-[400px]
        "
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
    </div>
  );
};

export default Display;
