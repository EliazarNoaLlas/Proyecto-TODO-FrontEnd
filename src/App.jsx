import React, { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import axios from "axios";
import { baseURL } from "./utils/constant";
import Popup from "./components/Popup";

const App = () => {
  // Estado para almacenar la lista de tareas
  const [toDos, setToDos] = useState([]);
  // Estado para el valor del input de nueva tarea
  const [input, setInput] = useState("");
  // Estado para forzar la actualización de la interfaz de usuario
  const [updateUI, setUpdateUI] = useState(false);
  // Estado para controlar la visibilidad del pop-up
  const [showPopup, setShowPopup] = useState(false);
  // Estado para el contenido del pop-up
  const [popupContent, setPopupContent] = useState({});

  // Efecto que se ejecuta cuando cambia el estado 'updateUI'
  useEffect(() => {
    // Realiza una solicitud GET para obtener la lista de tareas desde el backend
    axios
      .get(`${baseURL}/get`)
      .then((res) => setToDos(res.data))
      .catch((err) => console.log(err));
  }, [updateUI]);

  // Función para guardar una nueva tarea
  const saveToDo = () => {
    axios
      .post(`${baseURL}/save`, { toDo: input })
      .then((res) => {
        console.log(res.data);
        // Actualiza el estado 'updateUI' para forzar la recarga de tareas
        setUpdateUI((prevState) => !prevState);
        // Limpia el input después de guardar la tarea
        setInput("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <main>
      <div className="container">
        <h1 className="title">Todo App</h1>

        <div className="input_holder">
          {/* Input para ingresar nuevas tareas */}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Añadir una tarea..."
          />
          {/* Botón para agregar una nueva tarea */}
          <button onClick={saveToDo}>Add</button>
        </div>

        <div className="list">
          {/* Mapea la lista de tareas y renderiza el componente ToDo para cada tarea */}
          {toDos.map((el) => (
            <ToDo
              key={el._id}
              text={el.toDo}
              id={el._id}
              setUpdateUI={setUpdateUI}
              setShowPopup={setShowPopup}
              setPopupContent={setPopupContent}
            />
          ))}
        </div>
      </div>

      {/* Renderiza el componente Popup si 'showPopup' es true */}
      {showPopup && (
        <Popup
          setShowPopup={setShowPopup}
          popupContent={popupContent}
          setUpdateUI={setUpdateUI}
        />
      )}
    </main>
  );
};

export default App;
