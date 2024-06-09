import React from "react";
import Modal from "./Modal";

function Note(props) {
  const [isModalOpen, setModalOpen] = React.useState(false);

  return (
    <>
      <div className="note">
        <h1>{props.title}</h1>
        <p>{props.content}</p>
        <button
          onClick={() => {
            props.onDelete(props.id)
          }}
        >
          DELETE
        </button>
        <button
          onClick={() => {
            setModalOpen(true);
          }}
        >
          EDIT
        </button>
      </div>
      <Modal open={isModalOpen} id={props.id} title={props.title} content={props.content} onUpdate={props.onUpdate} onClose={() => {
        setModalOpen(false);
      }} />
    </>
  );
}

export default Note;