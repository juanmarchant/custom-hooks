import { todoReducer } from "../08-useReducer/todoReducer"
import { useEffect, useReducer } from "react"


const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodo = () => {
    const [todos, dispatch] = useReducer(todoReducer, [], init);

    // Efecto secundario al momento de que los todos cambien, estos tambien son disparados con el componente es creado por primera vez
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])

    const handleNewTodo = (todo) => {
        dispatch({
            type: '[TODO] Add Todo',
            payload: todo
        })
    }

    const handleDeleteTodo = (id) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        })
    }

    const handleToggleTodo = (id) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        })
    }


    // const todosCount = () => {
    //     return todos.length;
    // }

    // const pendingTodosCount = ()=>{
    //     return todos.filter(todo => !todo.done).length;
    // }

    return {
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo => !todo.done).length,
        handleDeleteTodo,
        handleNewTodo,
        handleToggleTodo
    }
}
