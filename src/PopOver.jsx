import { FONTS } from "./constants";
import Popover from "react-text-selection-popover";
import "./styles.css";

export const PopOver = ({ contentRef, onSelect }) => {
  return (
    <Popover selectionRef={contentRef}>
      <div className="popover">
        <button
          className="popover__button"
          onClick={() => onSelect(FONTS.bold)}
        >
          <b>B</b>
        </button>
        <button
          className="popover__button"
          onClick={() => onSelect(FONTS.italic)}
        >
          <i>I</i>
        </button>
        <button
          className="popover__button"
          onClick={() => onSelect(FONTS.underline)}
        >
          <u>U</u>
        </button>
        <button
          className="popover__button"
          onClick={() => onSelect(FONTS.strike)}
        >
          <del>S</del>
        </button>
      </div>
    </Popover>
  );
};
