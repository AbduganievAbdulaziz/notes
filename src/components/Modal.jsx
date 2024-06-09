import React from "react";

function Modal(props) {
  const [title, setTitle] = React.useState(props.title);
  const [content, setContent] = React.useState(props.content);

  if (!props.open) return null;

  return (
    <div className="overlay">
      <form onSubmit={(e) => {
        e.preventDefault();
        props.onClose();
        props.onUpdate(props.id, { title: title, content: content });
      }}>
        <input
          onChange={(e) => { setTitle(e.target.value); }}
          name="title"
          placeholder="Title"
          value={title}
        />
        <textarea
          onChange={(e) => { setContent(e.target.value); }}
          name="content"
          placeholder="Take a note..."
          value={content}
          rows="3"
        />
        <button>Save</button>
      </form>
    </div>
  );
}

export default Modal;