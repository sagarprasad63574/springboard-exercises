import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import TodoList from "./TodoList";

function addTodo(todolist, text = "new todo") {
  const taskInput = todolist.getByLabelText("Text");
  fireEvent.change(taskInput, { target: { value: text } });
  const button = todolist.getByText("Add Todo");
  fireEvent.click(button);
}

it("renders without crashing", function() {
  render(<TodoList />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<TodoList />);
  expect(asFragment()).toMatchSnapshot();
});

it("can add a new todo", function() {
  const todolist = render(<TodoList />);

  expect(todolist.queryByText("X")).not.toBeInTheDocument();

  addTodo(todolist);

  const removeButton = todolist.getByText("X");
  expect(removeButton).toBeInTheDocument();
  expect(todolist.queryByText("new todo")).toBeInTheDocument();

});

it("can remove a todo", function() {
  const todolist = render(<TodoList />);
  addTodo(todolist);

  const removeButton = todolist.getByText("X");

  fireEvent.click(removeButton);
  expect(removeButton).not.toBeInTheDocument();
});
