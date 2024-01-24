import axios from "axios";
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { baseURL } from "../utils/constant";

const Popup = ({ setShowPopup, popupContent, setUpdateUI }) => {
  // Estado local para almacenar el valor del input
  const [input, setInput] = useState(popupContent.text);

  // Función para actualizar la tarea mediante una solicitud PUT a la API
  const updateToDo = () => {
    axios
      .put(`${baseURL}/update/${popupContent.id}`, { toDo: input })
      .then((res) => {
        console.log(res.data);
        // Actualiza el estado de la UI para forzar la recarga de datos
        setUpdateUI((prevState) => !prevState);
        // Cierra el pop-up
        setShowPopup(false);
      });
  };

  return (
    <div className="backdrop">
      <div className="popup">
        <RxCross1 className="cross" onClick={() => setShowPopup(false)} />
        <h1>Update ToDo</h1>

        <div className="popup__input_holder">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Actualizar tarea..."
          />
          <button onClick={updateToDo}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
