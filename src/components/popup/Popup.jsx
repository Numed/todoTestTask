import { useState, useContext } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useSelector, useDispatch } from "react-redux";
import {
  SaveButton,
  InputText,
  LabelInput,
  InputSection,
  PopUpTitle,
  ButtonClose,
  PopUpForm,
  PopUpInner,
  PopUp,
} from "./style";
import Context from "../context/Context";
import { todosFetched } from "../toDoContainer/toDoSlice";

const Popup = () => {
  const [title, setTitle] = useState("");
  const { request } = useHttp();
  const { editingId, popupRef } = useContext(Context);
  const todos = [...useSelector((state) => state.todoList)];
  const dispatch = useDispatch();

  const editTodo = () => {
    if (editingId !== 0 && title !== "") {
      const id = editingId;
      request(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        "PUT",
        JSON.stringify({
          id,
          title,
        })
      )
        .then(onEditTodos)
        .catch(new Error("Some error"));
    }
  };

  const onEditTodos = (newTodo) => {
    todos[newTodo.id - 1] = newTodo;
    dispatch(todosFetched(todos));
    popupRef.current.classList.remove("show");
    setTitle("");
  };

  const closePopup = (e) => {
    if (e.target.classList.contains("button-close__popup")) {
      e.preventDefault();
      popupRef.current.classList.remove("show");
    } else if (e.target.classList.contains("pop-up__inner")) {
      popupRef.current.classList.remove("show");
    }
  };

  return (
    <PopUp ref={popupRef} className="pop-up" onClick={(e) => closePopup(e)}>
      <PopUpInner className="pop-up__inner">
        <PopUpForm>
          <ButtonClose
            className="button-close__popup"
            onClick={(e) => closePopup(e)}
          />
          <PopUpTitle className="popup-title">{"Edit todo"}</PopUpTitle>
          <InputSection>
            <LabelInput htmlfor="title">Enter title: </LabelInput>
            <InputText
              data-title
              className="input-title"
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            ></InputText>
          </InputSection>
          <SaveButton onClick={editTodo}>Save</SaveButton>
        </PopUpForm>
      </PopUpInner>
    </PopUp>
  );
};

export default Popup;
