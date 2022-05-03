import { useEffect, useState, useRef } from "react";
import ContentEditable from "react-contenteditable";
import { FONTS } from "./constants";
import { PopOver } from "./PopOver";
import "./styles.css";

export const Editor = () => {
  const [textInput, setTextInput] = useState(
    "<b>Hello,</b> How are you doing?"
  );

  const contentRef = useRef();

  const getSelectedHtml = () => {
    const selection = window.getSelection();
    var content = "",
      range;
    if (selection.rangeCount > 0) {
      range = selection.getRangeAt(0);
      var clonedSelection = range.cloneContents();
      var div = document.createElement("div");
      div.appendChild(clonedSelection);
      content = div.innerHTML;
    }
    return content;
  };

  const transformText = (type) => {
    const selectedHtml = getSelectedHtml();
    if (!selectedHtml.length) return;
    var text = `${textInput}`;
    switch (type) {
      case FONTS.bold:
        text = text.replace(selectedHtml, `<b>${selectedHtml}</b>`);
        break;
      case FONTS.italic:
        text = text.replace(selectedHtml, `<i>${selectedHtml}</i>`);
        break;
      case FONTS.underline:
        text = text.replace(selectedHtml, `<u>${selectedHtml}</u>`);
        break;
      case FONTS.strike:
        text = text.replace(selectedHtml, `<del>${selectedHtml}</del>`);
        break;
      default:
      // do nothing to the text;
    }
    setTextInput(text);
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
