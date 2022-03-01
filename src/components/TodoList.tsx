import React from 'react';
import './styles.css';
import { Todo } from './model';
import SingleTodo from './SingleTodo';

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({todos, setTodos}) => {
  return <>
        <div className="todosList">
            {todos.map( todoItem => (
                <SingleTodo key={todoItem.id} todoItem={todoItem} todos={todos} setTodos={setTodos} />
            ))}
        </div>
    </>
}

export default TodoList;