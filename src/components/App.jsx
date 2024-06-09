import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = React.useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  React.useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setNotes(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  function addNote(newNote) {
    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNotes([...notes, data]);
      })
      .catch(error => {
        console.error(error);
      });
  }

  function deleteNote(id) {
    fetch(apiUrl + `/${id}`, { method: "DELETE" })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setNotes((prevValue) => {
          return prevValue.filter((note) => note.id !== data.id);
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  function updateNote(id, updatedNote) {
    fetch(apiUrl + `/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedNote)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNotes((prevValue) => {
          return prevValue.map((note) => {
            return (note.id !== id ? note : data);
          });
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          onDelete={deleteNote}
          onUpdate={updateNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;