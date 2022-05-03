import { useEffect, useState, useRef } from "react";
import ContentEditable from "react-contenteditable";
import { PopOver } from "./PopOver";
import { FONTS } from "./constants";
import "./styles.css";

export const EditorExec = () => {
  const [textInput, setTextInput] = useState(
    "This is using <b>document.exec</b> command on the selected text"
  );

  const contentRef = useRef();

  const transformText = (type) => {
    switch (type) {
      case FONTS.bold:
        document.execCommand("bold");
        break;
      case FONTS.italic:
        document.execCommand("italic");
        break;
      case FONTS.underline:
        document.execCommand("underline");
        break;
      case FONTS.strike:
        document.execCommand("strikethrough");
        break;
      default:
      // do nothing to the text;
    }
  };

  const handleKeyDown = (event) => {
    if (event.metaKey) {
      if (Object.values(FONTS).includes(event.key)) {
        event.preventDefault();
        transformText(event.key);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <>
      <ContentEditable
        className="app__editable"
        tagName="pre"
        html={textInput}
        innerRef={contentRef}
        onChange={(event) => setTextInput(event.target.value)}
      />
      <PopOver contentRef={contentRef} onSelect={transformText} />
    </>
  );
};
