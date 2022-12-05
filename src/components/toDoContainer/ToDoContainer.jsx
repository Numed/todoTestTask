import { useState, useEffect, useRef } from "react";
import { useHttp } from "../../hooks/http.hook";
import { setDate } from "../../helpers/dateFunc";
import Spinner from "../spinner/Spinner";
import {
  SectionTitle,
  SectionInner,
  ToDoInner,
  Ul,
  Label,
  ButtonContainer,
  EditButton,
  RemoveButton,
  Form,
  InputAdd,
  AddButton,
} from "./style";
import Popup from "../popup/Popup";

const ToDoContainer = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(0);
  const { request } = useHttp();

  const onChangeHandler = (value) => {
    setInputValue(value);
  };

  useEffect(() => {
    onRequest();
    // eslint-disable-next-line
  }, []);

  const onRequest = () => {
    request("https://jsonplaceholder.typicode.com/todos/?&_limit=5")
      .then(onToDoLoaded)
      .catch(onError);
  };

  const onToDoLoaded = (newTodos) => {
    setTodos([...todos, ...newTodos]);
    setError(false);
    setLoading(false);
  };

  const onError = () => {
    setError(true);
  };

  const changeCompleted = (id) => {
    const todoElements = todos.filter((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos([...todoElements]);
  };

  const addTodo = (e) => {
    e.preventDefault();
    setLoading(true);
    request(
      "https://jsonplaceholder.typicode.com/todos",
      "POST",
      JSON.stringify({
        title: inputValue,
      })
    )
      .then(onAddNewTodos)
      .catch(onError);
  };

  const onAddNewTodos = (newTodo) => {
    return setTodos([...todos, newTodo]), setLoading(false), setInputValue("");
  };

  const deleteTodo = (id) => {
    request(`https://jsonplaceholder.typicode.com/todos/${id}`, "DELETE");
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const openPopup = (e, id) => {
    setEditingId(id);
    if (e.target.classList.contains("edit-btn")) {
      popupRef.current.classList.add("show");
    }
  };

  const View = ({ todos }) => {
    const todoTasks = todos.map((todo, i) => {
      return (
        <ToDoInner key={i}>
          <Label
            htmlFor={todo.id}
            style={
              todo.completed
                ? { textDecoration: "line-through" }
                : { textDecoration: "none" }
            }
          >
            <input
              type="checkbox"
              name=""
              id={todo.id}
              onChange={() => changeCompleted(todo.id)}
              checked={todo.completed}
            />
            <li>{todo.title}</li>
          </Label>
          <ButtonContainer>
            <EditButton
              className="edit-btn"
              onClick={(e) => openPopup(e, todo.id)}
            />
            <RemoveButton onClick={() => deleteTodo(todo.id)} />
          </ButtonContainer>
        </ToDoInner>
      );
    });
    return <Ul>{todoTasks}</Ul>;
  };

  const date = setDate();
  const errorMessage = error ? "Error" : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(error || spinner || !todos) ? <View todos={todos} /> : null;

  return (
    <main>
      <SectionTitle>{date}</SectionTitle>
      <SectionInner>
        {errorMessage}
        {spinner}
        {content}
        <Form onSubmit={(e) => addTodo(e)}>
          <InputAdd
            type="text"
            placeholder="New task"
            value={inputValue}
            onChange={(e) => onChangeHandler(e.target.value)}
          />
          <AddButton
            type="submit"
            disabled={loading}
            style={
              loading
                ? { background: "rgba(168, 218, 220, .6)" }
                : { background: "#a8dadc" }
            }
          >
            +
          </AddButton>
        </Form>
      </SectionInner>
      <Popup editingId={editingId} />
    </main>
  );
};

export default ToDoContainer;
