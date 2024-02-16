/* eslint-disable no-undef */
import  { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import modalImg from "../assets/quiz-complete.png";

export default function SummaryModal() {
  const dialog = useRef();
  useEffect(() => {
    dialog.current.showModal();
  }, []);

  return createPortal(
    <dialog id="summary" ref={dialog}>
      <img src={modalImg}></img>
    </dialog>,
    document.getElementById("modal"),
  );
}
