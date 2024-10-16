import { useEffect } from "react";

export default function OutSideClick(ref, fn) {
  useEffect(() => {
    let click = (e) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return false;
      }
      fn();
    };
    document.addEventListener("mousedown", click);
    document.addEventListener("touchstart", click);

    return () => {
      document.removeEventListener("mousedown", click);
      document.removeEventListener("touchstart", click);
    };
  }, [ref, fn]);
}
