import { useState, useEffect, useContext } from "react";
import { useHttp } from "../../hooks/http.hook";
import { setDate } from "../../helpers/dateFunc";
import Spinner from "../spinner/Spinner";
import { useSelector, useDispatch } from "react-redux";
import Context from "../context/Context";
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
import {
  todosChange,
  todosFetched,
  todosError,
  todosCreated,
  todosDeleted,
} from "./toDoSlice";

const ToDoContainer = () => {
  const [inputValue, setInputValue] = useState("");
  const { setEditingId, popupRef } = useContext(Context);
  const todos = [...useSelector((state) => state.todoList)];
  const todoStatus = useSelector((state) => state.todosStatus);
  const { request } = useHttp();
  const dispatch = useDispatch();

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
    dispatch(todosFetched([...newTodos]));
  };

  const onError = () => {
    todosError();
  };

  const changeCompleted = (id) => {
    dispatch(todosChange(id));
  };

  const addTodo = (e) => {
    e.preventDefault();
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
    return dispatch(todosCreated(newTodo)), setInputValue("");
  };

  const deleteTodo = (id) => {
    request(`https://jsonplaceholder.typicode.com/todos/${id}`, "DELETE");
    dispatch(todosDeleted(id));
  };

  const openPopup = (e, id) => {
    setEditingId(id);
    if (e.target.classList.contains("edit-btn")) {
      popupRef.current.classList.add("show");
    }
  };

  const View = ({ todos }) => {
    if (todos.length > 0) {
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
    }
  };

  const date = setDate();
  const errorMessage = todoStatus === "Error" ? "Error" : null;
  const spinner = todoStatus === "Fetching" ? <Spinner /> : null;
  const content = !(todoStatus === "Error" || spinner || !todos) ? (
    <View todos={todos} />
  ) : null;

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
            disabled={todoStatus === "Fetching"}
            style={
              todoStatus === "Fetching"
                ? { background: "rgba(168, 218, 220, .6)" }
                : { background: "#a8dadc" }
            }
          >
            +
          </AddButton>
        </Form>
      </SectionInner>
    </main>
  );
};

export default ToDoContainer;
