import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


class EditorContainer extends React.Component {
  state = {
    editorState: EditorState.createEmpty(),
  };
  onEditorStateChange: Function = (editorState) => {
    this.setState({ editorState });
  };
  
  uploadImageCallBack(file) {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.imgur.com/3/image');
        xhr.setRequestHeader('Authorization', 'Client-ID 0106ae853bbc201');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }
  
  render() {
    const { editorState } = this.state;
    return (
      <Editor
      wrapperClassName="demo-wrapper"
      editorClassName="demo-editor"
      toolbar={{
        inline: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true },
        history: { inDropdown: true },
        image: { uploadCallback: this.uploadImageCallBack, alt: { present: true}}
      }}
      />
    );
  }
}

function App() {
  return (
    <div className="App">
      <h2>React Wysiwyg Rich Editor using Draft.js</h2>
      <EditorContainer />
    </div>
  );
}

export default App;
