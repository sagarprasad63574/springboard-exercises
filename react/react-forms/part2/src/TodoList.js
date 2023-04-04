import React, {useState} from 'react';
import Todo from './Todo.js';
import NewTodoForm from './NewTodoForm.js';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const addTodo = (newTodo) => {
        setTodos(todos => [...todos, newTodo]);
    }

    const removeTodo = (id) => {
        setTodos(todos => todos.filter(todo => todo.id !== id));
    }

    return (
        <div>
            <h3>Todo App</h3>
            <NewTodoForm addTodo={addTodo} />
            <div>
                {todos.map(
                    ({id, text}) => 
                    <Todo 
                        key={id}
                        id={id}
                        text={text} 
                        handleRemove={removeTodo} />)}
            </div>
        </div>
    )
}

export default TodoList; 