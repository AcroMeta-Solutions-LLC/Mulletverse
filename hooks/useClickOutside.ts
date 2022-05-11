import { RefObject, useEffect } from "react";

export function useClickOutside(ref: RefObject<HTMLElement>, callback?: () => void, shouldClose = true): void {
  const handleClick = (e: MouseEvent): void => {
    if (!!callback && ref.current && !ref.current.contains(e.target as HTMLElement) && shouldClose) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick, true);
    return (): void => {
      document.removeEventListener("click", handleClick, true);
    };
  });
}
