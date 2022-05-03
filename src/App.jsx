import { Editor } from "./Editor";
import { EditorExec } from "./EditorExec";
import "./styles.css";

export default function App() {
  return (
    <div className="app">
      <Editor />
      <EditorExec />
    </div>
  );
}
