import {
  type Dispatch,
  type MutableRefObject,
  type SetStateAction,
  useMemo,
  useEffect,
  useRef,
} from "react";
import { classNames } from "~/utils/classNames";

export function SelectableReadingText({
  setSelectedTextIndex,
  selectedTextElement,
  readingText,
  selectedTextIndex,
  selectedTextLength,
}: {
  setSelectedTextIndex: Dispatch<SetStateAction<number | null>>;
  selectedTextElement: MutableRefObject<HTMLElement | null>;
  readingText: string;
  selectedTextIndex: number | null;
  selectedTextLength: number;
}) {
  const readingTextChars = useMemo(() => readingText.split(""), [readingText]);

  const paragraphRef = useRef<null | HTMLParagraphElement>(null);

  useEffect(() => {
    const closePopupIfClickIsOutsideParagraph = (e: MouseEvent) => {
      if (!paragraphRef.current) return;
      if (!selectedTextElement.current) return;
      if (paragraphRef.current.contains(e.target as Node)) return;
      setSelectedTextIndex(null);
      selectedTextElement.current = null;
    };

    window.addEventListener("click", closePopupIfClickIsOutsideParagraph);

    return () => {
      window.removeEventListener("click", closePopupIfClickIsOutsideParagraph);
    };
  }, [selectedTextElement, setSelectedTextIndex]);

  return (
    <p
      className="grow px-4 pb-48 pt-12 text-2xl"
      ref={paragraphRef}
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        setSelectedTextIndex(null);
        selectedTextElement.current = null;
      }}
    >
      {readingTextChars.map((char, i) => {
        const key = `${char}-${i}`;

        if (char === `\n`) {
          return <br key={key} />;
        }

        return (
          <button
            key={key}
            onClick={(e) => {
              if (selectedTextIndex !== null) {
                setSelectedTextIndex(null);
                selectedTextElement.current = null;
                return;
              }
              setSelectedTextIndex(i);
              selectedTextElement.current = e.target as HTMLButtonElement;
            }}
            className={classNames(
              selectedTextIndex !== null &&
                selectedTextIndex <= i &&
                i < selectedTextIndex + selectedTextLength &&
                "bg-blue-600 text-white",
            )}
          >
            {char}
          </button>
        );
      })}
    </p>
  );
}
