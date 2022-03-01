import React, { useEffect, useRef, useState } from 'react'
import { Todo } from './model'
import {AiFillEdit, AiFillDelete} from "react-icons/ai";
import {MdDone} from "react-icons/md";
import './styles.css';

interface Props {
    todoItem: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({todoItem, todos, setTodos}) => {

  const [editMode, setEditMode] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todoItem.todo);

  const handleDone = (id: number) => {
      setTodos(
        todos.map( (todoItem) => 
            todoItem.id === id ? { ...todoItem, isDone: !todoItem.isDone} : todoItem)
      )
        
  }  

  const handleDelete = (id: number) => {
    setTodos(
      todos.filter( (todoItem) => todoItem.id !== id )
    )
      
  }
  
  const handleEdit = (e:React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(todos.map(
        (todoItem) => (todoItem.id === id ? {...todoItem, todo: editTodo} : todoItem)
    ));
    setEditMode(false);
  }

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect( () => {
    inputRef.current?.focus();
  }, [editMode]);

  return <>
    <form onSubmit={(e) => handleEdit(e, todoItem.id)} className="todos__single">

        {
            editMode ? (
                <input ref={inputRef} type="text" value={editTodo} onChange={ (e) => setEditTodo(e.target.value)} className="editTodoItem" />
            ) : (
                todoItem.isDone ? (
                    <s className="todos__single__text">{todoItem.todo}</s>
                ) : (
                    <span className="todos__single__text">{todoItem.todo}</span>
                )
            )
        }

        
        
        <div>
            <span 
                className="icon"
                onClick={ () => {
                    if(!editMode && !todoItem.isDone) {
                        setEditMode(!editMode);
                    }
                }}    
            >
                <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todoItem.id)}> 
                <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todoItem.id)}>
                <MdDone /> 
            </span>
        </div>
    </form>
  </>
}

export default SingleTodo