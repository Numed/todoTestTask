import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoList: [],
  todosStatus: "idle",
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todosFetching: (state) => {
      state.todosStatus = "Fetching";
    },
    todosFetched: (state, action) => {
      state.todosStatus = "idle";
      state.todoList = action.payload;
    },
    todosError: (state) => {
      state.todosStatus = "Error";
    },
    todosChange: (state, action) => {
      state.todoList = state.todoList.filter((todo) => {
        if (todo.id === action.payload) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
    },
    todosCreated: (state, action) => {
      state.todoList.push(action.payload);
    },
    todosDeleted: (state, action) => {
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload
      );
    },
  },
});

const { actions, reducer } = todoSlice;

export default reducer;

export const {
  todosFetching,
  todosFetched,
  todosError,
  todosCreated,
  todosDeleted,
  todosChange,
} = actions;
