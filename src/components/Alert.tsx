export function Alert({
  children,
  onClickOverlay,
}: {
  children: JSX.Element;
  onClickOverlay?: () => void;
}) {
  return (
    <>
      <div className="fixed inset-0 z-10 bg-black opacity-50"></div>

      <div
        className="fixed inset-0 z-20 flex items-center justify-center"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            onClickOverlay?.();
          }
        }}
      >
        {children}
      </div>
    </>
  );
}
