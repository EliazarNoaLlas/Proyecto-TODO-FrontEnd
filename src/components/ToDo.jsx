import axios from "axios";
import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { baseURL } from "../utils/constant";

const ToDo = ({ text, id, setUpdateUI, setShowPopup, setPopupContent }) => {
  // Función para eliminar una tarea mediante una solicitud DELETE a la API
  const deleteTodo = () => {
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      console.log(res.data);
      // Actualiza el estado de la UI para forzar la recarga de datos
      setUpdateUI((prevState) => !prevState);
    });
  };
  // Función para preparar el pop-up de actualización con los datos de la tarea
  const updateToDo = () => {
    // Establece el contenido del pop-up con los datos de la tarea actual
    setPopupContent({ text, id });
    // Muestra el pop-up
    setShowPopup(true);
  };

  return (
    <div className="toDo">
      {text}
      <div className="icons">
        <AiFillEdit className="icon" onClick={updateToDo} data-testid="edit-icon" />
        <RxCross1 className="icon" onClick={deleteTodo} data-testid="delete-icon"/>
      </div>
    </div>
  );
};

export default ToDo;
