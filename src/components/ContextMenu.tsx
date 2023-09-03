export function ContextMenu({
  children,
  onClickOut,
}: {
  children: JSX.Element;
  onClickOut: () => void;
}) {
  return (
    <>
      <div
        className="fixed inset-0 z-10"
        onClick={(event) => {
          event.stopPropagation();
          onClickOut();
        }}
      ></div>

      <div className="absolute left-[calc(50%-64px)] top-[80%] z-20 w-32">
        {children}
      </div>
    </>
  );
}
