import React, { useReducer, createContext, useContext, useRef } from "react";

const initialTodos = [
  {
    id: 1,
    text: "프로젝트 생성하기1",
    done: true,
  },
  {
    id: 2,
    text: "프로젝트 생성하기2",
    done: true,
  },
  {
    id: 3,
    text: "프로젝트 생성하기3",
    done: false,
  },
  {
    id: 4,
    text: "프로젝트 생성하기4",
    done: false,
  },
];

/*
 * 총 3개의 액션 작성
 * CREATE, TOGGLE, REMOVE
 */
function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return state.concat(action.todo);
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case "RMOVE":
      return state.filter((todo) => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const TodoStateContext = createContext(); // state 용 context
const TodoDispatchContext = createContext(); // dispatch 용 context
const TodoNextIdContext = createContext(); // nextId 용 context

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(initialTodos.length + 1);
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error(`Cannot find ` + TodoStateContext);
  }
  return useContext(TodoStateContext);
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error(`Cannot find ` + TodoDispatchContext);
  }
  return useContext(TodoDispatchContext);
}

export function useTodoNextid() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error(`Cannot find ` + TodoNextIdContext);
  }
  return useContext(TodoNextIdContext);
}
