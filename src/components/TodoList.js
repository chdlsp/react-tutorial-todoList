import React from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";
import { useTodoState } from "../TodoContext";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  ppadding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList() {
  const state = useTodoState();
  console.log("state : " + state);

  return (
    <TodoListBlock>
      <TodoItem text="프로젝트 생성하기1" done={true}></TodoItem>
      <TodoItem text="프로젝트 생성하기2" done={true}></TodoItem>
      <TodoItem text="프로젝트 생성하기3" done={false}></TodoItem>
      <TodoItem text="프로젝트 생성하기4" done={false}></TodoItem>
    </TodoListBlock>
  );
}
export default TodoList;
