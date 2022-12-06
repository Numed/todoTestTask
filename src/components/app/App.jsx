import { useState, useRef } from "react";
import HeaderNav from "../headerNav/HeaderNav";
import ToDoContainer from "../toDoContainer/ToDoContainer";
import Popup from "../popup/Popup";
import Context from "../context/Context";

const App = () => {
  const [editingId, setEditingId] = useState(0);
  const popupRef = useRef();

  return (
    <div className="App">
      <HeaderNav />
      <Context.Provider value={{ editingId, setEditingId, popupRef }}>
        <ToDoContainer />
        <Popup />
      </Context.Provider>
    </div>
  );
};

export default App;
